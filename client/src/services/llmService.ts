import { API_ENDPOINTS } from '../config/constants'

interface QuestionGenerationParams {
  subject: string
  topic: string
  learningStyle: string
}

interface FeedbackParams {
  question: string
  studentAnswer: string
  correctAnswer: string
  learningStyle: string
}

class LLMService {
  private baseUrl: string

  constructor() {
    this.baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'
  }

  async generateQuestion(params: QuestionGenerationParams): Promise<{ question: string; correctAnswer: string }> {
    try {
      const response = await fetch(`${this.baseUrl}${API_ENDPOINTS.LLM_GENERATE_QUESTION}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error('Error generating question:', error)
      throw error
    }
  }

  async generateFeedback(params: FeedbackParams): Promise<{ feedback: string; hint: string }> {
    try {
      const response = await fetch(`${this.baseUrl}${API_ENDPOINTS.LLM_GENERATE_FEEDBACK}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error('Error generating feedback:', error)
      throw error
    }
  }

  async suggestStudyPlan(params: { subject: string; topics: string[]; learningStyle: string }): Promise<{
    recommendedOrder: string[]
    estimatedDuration: string
    focusAreas: string[]
  }> {
    try {
      const response = await fetch(`${this.baseUrl}${API_ENDPOINTS.LLM_SUGGEST_STUDY_PLAN}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error('Error suggesting study plan:', error)
      throw error
    }
  }

  async suggestAssignment(params: { subject: string; topic: string; learningStyle: string }): Promise<{
    title: string
    description: string
    type: 'manual' | 'ai-suggested'
  }> {
    try {
      const response = await fetch(`${this.baseUrl}${API_ENDPOINTS.LLM_SUGGEST_ASSIGNMENT}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error('Error suggesting assignment:', error)
      throw error
    }
  }
}

export const llmService = new LLMService() 