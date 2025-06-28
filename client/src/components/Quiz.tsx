/**
 * Quiz.tsx
 *
 * Handles the quiz-taking experience for a student.
 * - Displays questions, collects answers, and provides feedback/hints.
 * - Handles loading, error, and feedback states.
 * - Uses TSDoc for all exported functions/components.
 */

import React, { useState, useEffect, useCallback } from 'react'
import { rlService } from '../services/rlService'
import { llmService } from '../services/llmService'
import type { QuestionResponse, QuizAttempt, RLState } from '../interfaces/interfaces'

interface QuizProps {
  studentId: string
  subject: string
  topic: string
  onComplete: (attempt: QuizAttempt) => void
}

/**
 * Quiz
 *
 * Renders the quiz UI, manages answer state, and provides feedback and hints.
 * Handles error/loading/feedback logic and user input.
 */

export const Quiz: React.FC<QuizProps> = ({
  studentId,
  subject,
  topic,
  onComplete,
}) => {
  const [question, setQuestion] = useState<string>('')
  const [correctAnswer, setCorrectAnswer] = useState<string>('')
  const [answer, setAnswer] = useState<string>('')
  const [feedback, setFeedback] = useState<string>('')
  const [hint, setHint] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>('')
  const [currentAttempt, setCurrentAttempt] = useState<QuizAttempt | null>(null)
  const [currentTopic, setCurrentTopic] = useState<string>(topic)
  const [rlState, setRlState] = useState<RLState>({
    studentId,
    currentTopic: topic,
    performanceHistory: [],
    learningStyle: 'visual',
    timeSpent: 0,
  })

  const loadQuestion = useCallback(async () => {
    try {
      setIsLoading(true)
      setError('')
      const result = await llmService.generateQuestion({
        subject,
        topic: currentTopic,
        learningStyle: rlState.learningStyle,
      })
      setQuestion(result.question)
      setCorrectAnswer(result.correctAnswer)
    } catch (error) {
      setError('Unable to load question. Please try again.')
      console.error('Error loading question:', error)
    } finally {
      setIsLoading(false)
    }
  }, [subject, currentTopic, rlState.learningStyle])

  useEffect(() => {
    loadQuestion()
  }, [loadQuestion])

  const handleSubmit = async () => {
    if (!answer.trim()) {
      setError('Please provide your answer')
      return
    }

    try {
      setIsLoading(true)
      setError('')

      const response: QuestionResponse = {
        id: crypto.randomUUID(),
        quizAttemptId: currentAttempt?.id || crypto.randomUUID(),
        question,
        studentAnswer: answer,
        correctAnswer,
        isCorrect: false,
        answeredAt: new Date().toISOString(),
      }

      const feedbackResult = await llmService.generateFeedback({
        question,
        studentAnswer: answer,
        correctAnswer,
        learningStyle: rlState.learningStyle,
      })
      setFeedback(feedbackResult.feedback)
      setHint(feedbackResult.hint)

      // Update RL state and model
      const isCorrect = answer.toLowerCase().trim() === correctAnswer.toLowerCase().trim()
      const reward = isCorrect ? 1 : -0.5
      const updatedState = {
        ...rlState,
        performanceHistory: [
          ...rlState.performanceHistory,
          {
            topic: currentTopic,
            score: isCorrect ? 1 : 0,
            attempts: 1,
            lastAttempt: new Date().toISOString(),
          },
        ],
      }
      setRlState(updatedState)
      await rlService.updateModel(updatedState, reward)

      // Get next action from RL
      const nextAction = await rlService.getNextAction(updatedState)
      setCurrentTopic(nextAction.nextTopic)

      // Update the quiz attempt
      if (currentAttempt) {
        const updatedAttempt = {
          ...currentAttempt,
          responses: [...currentAttempt.responses, response],
        }
        setCurrentAttempt(updatedAttempt)
        onComplete(updatedAttempt)
      }
    } catch (error) {
      setError('Unable to submit answer. Please try again.')
      console.error('Error submitting answer:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleGetHint = async () => {
    try {
      setIsLoading(true)
      setError('')
      const result = await llmService.generateFeedback({
        question,
        studentAnswer: answer,
        correctAnswer,
        learningStyle: rlState.learningStyle,
      })
      setHint(result.hint)
    } catch (error) {
      setError('Unable to get hint. Please try again.')
      console.error('Error getting hint:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleNextQuestion = async () => {
    try {
      setIsLoading(true)
      setError('')
      const nextAction = await rlService.getNextAction(rlState)
      
      // Update topic
      setCurrentTopic(nextAction.nextTopic)
      
      // Reset state for next question
      setQuestion('')
      setAnswer('')
      setFeedback('')
      setHint('')
      
      // Load new question
      await loadQuestion()
    } catch (error) {
      setError('Unable to load next question. Please try again.')
      console.error('Error loading next question:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      {error && (
        <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      )}

      {isLoading ? (
        <div className="flex justify-center items-center h-32">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <>
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Study Question</h2>
            <p className="text-gray-700">{question}</p>
          </div>

          <div className="mb-6">
            <label htmlFor="answer" className="block text-sm font-medium text-gray-700 mb-2">
              Your Response
            </label>
            <textarea
              id="answer"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={4}
              placeholder="Type your response here..."
            />
          </div>

          {hint && (
            <div className="mb-6 p-4 bg-blue-50 rounded-md">
              <h3 className="text-sm font-medium text-blue-800 mb-2">Study Tip</h3>
              <p className="text-blue-700">{hint}</p>
            </div>
          )}

          {feedback && (
            <div className="mb-6 p-4 bg-green-50 rounded-md">
              <h3 className="text-sm font-medium text-green-800 mb-2">Learning Feedback</h3>
              <p className="text-green-700">{feedback}</p>
            </div>
          )}

          <div className="flex justify-between">
            <button
              onClick={handleGetHint}
              className="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-800"
              disabled={isLoading || !answer.trim()}
            >
              Get Study Tip
            </button>

            <div className="space-x-4">
              <button
                onClick={handleSubmit}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                disabled={isLoading || !answer.trim()}
              >
                Check Answer
              </button>

              <button
                onClick={handleNextQuestion}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                disabled={isLoading || !feedback}
              >
                Next Question
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
} 