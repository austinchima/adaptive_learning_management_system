import { API_ENDPOINTS } from '../config/constants'
import { handleApiError, handleValidationError, validateStudentProfile, validateCourseContent, validateAssessment, validateResource } from '../utils/errorHandling'
import type { StudentProfile, CourseContent, Assessment, Resource, LearningProgress, QuizAttempt, QuestionResponse } from '../interfaces/interfaces'

class ApiService {
  private baseUrl: string

  constructor() {
    this.baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'
  }

  private async fetchWithErrorHandling<T>(endpoint: string, options?: RequestInit): Promise<T> {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options?.headers,
        },
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      return data as T
    } catch (error) {
      throw handleApiError(error)
    }
  }

  // Student endpoints
  async getStudentProfile(id: string): Promise<StudentProfile> {
    const data = await this.fetchWithErrorHandling<StudentProfile>(`/api/student/${id}`)
    handleValidationError(data, validateStudentProfile)
    return data
  }

  async createStudent(profile: Partial<StudentProfile>): Promise<StudentProfile> {
    const data = await this.fetchWithErrorHandling<StudentProfile>('/api/student', {
      method: 'POST',
      body: JSON.stringify(profile),
    })
    handleValidationError(data, validateStudentProfile)
    return data
  }

  async updateStudent(id: string, profile: Partial<StudentProfile>): Promise<StudentProfile> {
    const data = await this.fetchWithErrorHandling<StudentProfile>(`/api/student/${id}`, {
      method: 'PUT',
      body: JSON.stringify(profile),
    })
    handleValidationError(data, validateStudentProfile)
    return data
  }

  async getLearningProgress(id: string): Promise<LearningProgress[]> {
    return await this.fetchWithErrorHandling<LearningProgress[]>(`/api/student/${id}/progress`)
  }

  async getQuizAttempts(id: string): Promise<QuizAttempt[]> {
    return await this.fetchWithErrorHandling<QuizAttempt[]>(`/api/student/${id}/quizzes`)
  }

  // Quiz endpoints
  async getQuestion(subject: string, topic: string, difficultyLevel: string): Promise<{ question: string }> {
    return await this.fetchWithErrorHandling<{ question: string }>(
      `/api/quiz/question?subject=${subject}&topic=${topic}&difficultyLevel=${difficultyLevel}`
    )
  }

  async submitAnswer(response: QuestionResponse): Promise<{ feedback: string }> {
    return await this.fetchWithErrorHandling<{ feedback: string }>('/api/quiz/submit', {
      method: 'POST',
      body: JSON.stringify(response),
    })
  }

  async getNextTopic(studentId: string): Promise<{ topic: string; difficultyLevel: string }> {
    return await this.fetchWithErrorHandling<{ topic: string; difficultyLevel: string }>(
      `/api/quiz/next-topic?studentId=${studentId}`
    )
  }

  async getHint(question: string, studentAnswer: string): Promise<{ hint: string }> {
    return await this.fetchWithErrorHandling<{ hint: string }>(
      `/api/quiz/hint?question=${encodeURIComponent(question)}&studentAnswer=${encodeURIComponent(studentAnswer)}`
    )
  }

  async getCourses(): Promise<CourseContent[]> {
    const data = await this.fetchWithErrorHandling<CourseContent[]>(API_ENDPOINTS.COURSES)
    data.forEach(course => handleValidationError(course, validateCourseContent))
    return data
  }

  async getAssessments(): Promise<Assessment[]> {
    const data = await this.fetchWithErrorHandling<Assessment[]>(API_ENDPOINTS.ASSESSMENTS)
    data.forEach(assessment => handleValidationError(assessment, validateAssessment))
    return data
  }

  async getResources(): Promise<Resource[]> {
    const data = await this.fetchWithErrorHandling<Resource[]>(API_ENDPOINTS.RESOURCES)
    data.forEach(resource => handleValidationError(resource, validateResource))
    return data
  }

  async updateProgress(courseId: string, progress: number): Promise<void> {
    await this.fetchWithErrorHandling(`${API_ENDPOINTS.PROGRESS}/${courseId}`, {
      method: 'PUT',
      body: JSON.stringify({ progress }),
    })
  }

  async uploadResource(file: File, courseId: string): Promise<Resource> {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('courseId', courseId)

    const data = await this.fetchWithErrorHandling<Resource>(API_ENDPOINTS.RESOURCES, {
      method: 'POST',
      body: formData,
    })
    handleValidationError(data, validateResource)
    return data
  }
}

export const apiService = new ApiService() 