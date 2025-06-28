/**
 * AssessmentsPage.tsx
 *
 * Displays all assessment-related data for a student, including upcoming/completed assessments, AI recommendations, and reminders.
 * - Uses tab navigation for different assessment views.
 * - Tab navigation styling matches ProgressAnalytics for visual consistency.
 * - Receives themeProp for dark/light mode styling.
 * - Handles business logic for transforming student data into assessment objects.
 */
import type { AssessmentsPageProps, Assessment } from "../interfaces/interfaces"
import { useState } from "react"
import { Calendar, Clock, AlertCircle, CheckCircle, Brain, Target, TrendingUp, BookOpen } from "lucide-react"

/**
 * AssessmentsPage
 *
 * Renders the main assessments dashboard for a student.
 * Handles tab switching, data transformation, and dark/light mode styling.
 */
export function AssessmentsPage({ studentProfile, themeProp }: AssessmentsPageProps) {
  const [activeTab, setActiveTab] = useState("upcoming")

  // Default subjects if none are provided
  const defaultSubjects = ["Mathematics", "Physics", "Computer Science"]
  const subjects = studentProfile.subjects || defaultSubjects

  // Transform student subjects into assessments
  const upcomingAssessments: Assessment[] = subjects.map((subject: string) => {
    const progress = studentProfile.progress?.[subject] || 0
    const dueDate = new Date()
    dueDate.setDate(dueDate.getDate() + 7) // Example: due in 7 days

    return {
      id: `${subject.toLowerCase().replace(/\s+/g, '-')}-assessment`,
      title: `${subject} Assessment`,
      course: subject,
      type: progress < 30 ? "quiz" : progress < 60 ? "assignment" : "exam",
      dueDate: dueDate.toISOString().split('T')[0],
      dueTime: "14:00",
      duration: progress < 30 ? "45 minutes" : progress < 60 ? "N/A" : "2 hours",
      status: "upcoming",
      difficulty: progress < 30 ? "low" : progress < 60 ? "medium" : "high",
      topics: ["Core Concepts", "Applications", "Advanced Topics"],
      estimatedScore: Math.min(100, progress + 10),
      description: `Comprehensive assessment covering key topics in ${subject}`,
      subject: subject,
      topic: "Core Concepts",
      masteryLevel: progress < 30 ? "beginner" : progress < 60 ? "intermediate" : "advanced",
      questions: []
    }
  })

  const completedAssessments = [
    {
      id: "5",
      title: "Statistics Problem Set",
      course: "Advanced Mathematics",
      type: "assignment",
      completedDate: "2024-05-10",
      score: 88,
      maxScore: 100,
      feedback: "Excellent work on probability distributions. Consider reviewing hypothesis testing.",
    },
    {
      id: "6",
      title: "Cognitive Psychology Quiz",
      course: "Introduction to Psychology",
      type: "quiz",
      completedDate: "2024-05-08",
      score: 92,
      maxScore: 100,
      feedback: "Great understanding of memory processes. Well done!",
    },
    {
      id: "7",
      title: "Linear Regression Project",
      course: "Machine Learning",
      type: "project",
      completedDate: "2024-05-05",
      score: 95,
      maxScore: 100,
      feedback: "Outstanding implementation and analysis. Excellent documentation.",
    },
  ]

  const aiRecommendations = [
    {
      id: "1",
      type: "study-plan",
      title: "Focus on Integration Techniques",
      description:
        "Based on your recent quiz performance, spend extra time on integration by parts and substitution methods.",
      priority: "high",
      estimatedTime: "3 hours",
      course: "Advanced Mathematics",
    },
    {
      id: "2",
      type: "practice",
      title: "Neural Network Practice Problems",
      description: "Your visual learning style would benefit from interactive neural network simulations.",
      priority: "medium",
      estimatedTime: "2 hours",
      course: "Machine Learning",
    },
    {
      id: "3",
      type: "review",
      title: "Psychology Research Methods Review",
      description: "Review statistical analysis methods before your research paper submission.",
      priority: "high",
      estimatedTime: "1.5 hours",
      course: "Introduction to Psychology",
    },
    {
      id: "4",
      type: "preparation",
      title: "Quantum Mechanics Visualization",
      description: "Use interactive quantum simulators to better understand wave-particle duality.",
      priority: "medium",
      estimatedTime: "2.5 hours",
      course: "Quantum Physics",
    },
  ]

  const reminders = [
    {
      id: "1",
      title: "Submit Psychology Research Paper",
      dueDate: "2024-05-18",
      priority: "high",
      type: "deadline",
    },
    {
      id: "2",
      title: "Review Calculus Notes",
      dueDate: "2024-05-19",
      priority: "medium",
      type: "study",
    },
    {
      id: "3",
      title: "Attend ML Study Group",
      dueDate: "2024-05-17",
      priority: "low",
      type: "event",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "upcoming":
        return "bg-blue-100 text-blue-800"
      case "in-progress":
        return "bg-yellow-100 text-yellow-800"
      case "completed":
        return "bg-green-100 text-green-800"
      case "overdue":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "high":
        return "bg-red-100 text-red-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "exam":
        return <BookOpen className="w-4 h-4" />
      case "assignment":
        return <Target className="w-4 h-4" />
      case "project":
        return <TrendingUp className="w-4 h-4" />
      case "quiz":
        return <Brain className="w-4 h-4" />
      default:
        return <BookOpen className="w-4 h-4" />
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  const getDaysUntilDue = (dueDate: string) => {
    const today = new Date()
    const due = new Date(dueDate)
    const diffTime = due.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  const tabs = [
    { id: "upcoming", label: "Upcoming" },
    { id: "completed", label: "Completed" },
    { id: "recommendations", label: "AI Recommendations" },
    { id: "reminders", label: "Reminders" },
  ]

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="flex flex-wrap justify-between gap-3">
        <div className="flex min-w-72 flex-col gap-3">
          <h1 className="text-foreground tracking-light text-[32px] font-bold leading-tight">Assessments</h1>
          <p className="text-muted-foreground text-sm font-normal leading-normal">
            Track your assignments, tests, and get AI-powered recommendations
          </p>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-blue-600" />
            <div>
              <p className="text-2xl font-bold text-foreground">{upcomingAssessments.length}</p>
              <p className="text-sm text-muted-foreground">Upcoming</p>
            </div>
          </div>
        </div>
        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <div>
              <p className="text-2xl font-bold text-foreground">{completedAssessments.length}</p>
              <p className="text-sm text-muted-foreground">Completed</p>
            </div>
          </div>
        </div>
        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center gap-2">
            <Brain className="w-5 h-5 text-purple-600" />
            <div>
              <p className="text-2xl font-bold text-foreground">{aiRecommendations.length}</p>
              <p className="text-sm text-muted-foreground">AI Suggestions</p>
            </div>
          </div>
        </div>
        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-orange-600" />
            <div>
              <p className="text-2xl font-bold text-foreground">
                {Math.round(completedAssessments.reduce((sum, a) => sum + a.score, 0) / completedAssessments.length)}%
              </p>
              <p className="text-sm text-muted-foreground">Avg Score</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-border">
        <div className="flex gap-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-3 pt-2 border-b-[3px] font-medium text-sm ${
                activeTab === tab.id
                  ? themeProp === 'dark' ? 'border-white text-foreground' : 'border-black text-foreground'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === "upcoming" && (
        <div className="space-y-4">
          {upcomingAssessments.map((assessment) => {
            const daysUntil = getDaysUntilDue(assessment.dueDate)
            return (
              <div key={assessment.id} className="bg-card border border-border rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-muted rounded-lg">{getTypeIcon(assessment.type)}</div>
                    <div>
                      <h3 className="text-foreground font-semibold">{assessment.title}</h3>
                      <p className="text-muted-foreground text-sm">{assessment.course}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(assessment.status)}`}>
                      {assessment.status}
                    </span>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(assessment.difficulty)}`}
                    >
                      {assessment.difficulty}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    <span>
                      Due: {formatDate(assessment.dueDate)} at {assessment.dueTime}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    <span>Duration: {assessment.duration}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Target className="w-4 h-4" />
                    <span>Predicted Score: {assessment.estimatedScore}%</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex flex-wrap gap-1">
                    {assessment.topics.map((topic, index) => (
                      <span key={index} className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded">
                        {topic}
                      </span>
                    ))}
                  </div>
                  <div
                    className={`text-sm font-medium ${daysUntil <= 1 ? "text-red-600" : daysUntil <= 3 ? "text-yellow-600" : "text-green-600"}`}
                  >
                    {daysUntil === 0 ? "Due Today" : daysUntil === 1 ? "Due Tomorrow" : `${daysUntil} days left`}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {activeTab === "completed" && (
        <div className="space-y-4">
          {completedAssessments.map((assessment) => (
            <div key={assessment.id} className="bg-card border border-border rounded-lg p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-foreground font-semibold">{assessment.title}</h3>
                    <p className="text-muted-foreground text-sm">{assessment.course}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-foreground">
                    {assessment.score}/{assessment.maxScore}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {Math.round((assessment.score / assessment.maxScore) * 100)}%
                  </div>
                </div>
              </div>

              <div className="mb-3">
                <p className="text-sm text-muted-foreground mb-1">Completed: {formatDate(assessment.completedDate)}</p>
                <p className="text-sm text-foreground">{assessment.feedback}</p>
              </div>

              <div className="w-full bg-border rounded-full h-2">
                <div
                  className="bg-green-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(assessment.score / assessment.maxScore) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === "recommendations" && (
        <div className="space-y-4">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 dark:bg-blue-900 dark:border-blue-700 dark:text-blue-100 mb-4">
            <div className="flex items-center gap-2 mb-2">
              <Brain className="w-5 h-5 text-blue-600 dark:text-blue-300" />
              <h3 className="text-blue-900 font-semibold dark:text-blue-100">AI-Powered Learning Recommendations</h3>
            </div>
            <p className="text-blue-800 text-sm dark:text-blue-200">
              Based on your learning style ({studentProfile.studyPreferences?.preferredLearningStyle || 'Not specified'}), performance patterns, and upcoming
              assessments, here are personalized recommendations to optimize your study approach.
            </p>
          </div>

          {aiRecommendations.map((recommendation) => (
            <div key={recommendation.id} className="bg-card border border-border rounded-lg p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-foreground font-semibold">{recommendation.title}</h3>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(recommendation.priority)}`}
                    >
                      {recommendation.priority} priority
                    </span>
                  </div>
                  <p className="text-muted-foreground text-sm mb-2">{recommendation.description}</p>
                  <p className="text-muted-foreground text-xs">Course: {recommendation.course}</p>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-foreground">{recommendation.estimatedTime}</div>
                  <div className="text-xs text-muted-foreground">estimated time</div>
                </div>
              </div>
              <button className="w-full py-2 px-4 rounded-lg border text-center font-medium bg-white text-black dark:bg-black dark:text-white transition-colors">
                Start Recommendation
              </button>
            </div>
          ))}
        </div>
      )}

      {activeTab === "reminders" && (
        <div className="space-y-4">
          {reminders.map((reminder) => (
            <div key={reminder.id} className="bg-card border border-border rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className={`p-2 rounded-lg ${reminder.priority === "high" ? "bg-red-100" : reminder.priority === "medium" ? "bg-yellow-100" : "bg-green-100"}`}
                  >
                    <AlertCircle
                      className={`w-4 h-4 ${reminder.priority === "high" ? "text-red-600" : reminder.priority === "medium" ? "text-yellow-600" : "text-green-600"}`}
                    />
                  </div>
                  <div>
                    <h3 className="text-foreground font-semibold">{reminder.title}</h3>
                    <p className="text-muted-foreground text-sm">Due: {formatDate(reminder.dueDate)}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(reminder.priority)}`}>
                    {reminder.priority}
                  </span>
                  <span className="px-2 py-1 rounded-full text-xs font-medium bg-muted text-muted-foreground">
                    {reminder.type}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
