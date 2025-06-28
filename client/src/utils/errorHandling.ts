import { ERROR_MESSAGES } from '../config/constants'

export class AppError extends Error {
  constructor(
    message: string,
    public statusCode: number,
    public code: string
  ) {
    super(message)
    this.name = 'AppError'
  }
}

export const handleApiError = (error: unknown): AppError => {
  if (error instanceof AppError) {
    return error
  }

  if (error instanceof Error) {
    if (error.message.includes('Network Error')) {
      return new AppError(ERROR_MESSAGES.NETWORK_ERROR, 503, 'NETWORK_ERROR')
    }
    if (error.message.includes('401')) {
      return new AppError(ERROR_MESSAGES.UNAUTHORIZED, 401, 'UNAUTHORIZED')
    }
    if (error.message.includes('500')) {
      return new AppError(ERROR_MESSAGES.SERVER_ERROR, 500, 'SERVER_ERROR')
    }
    if (error.message.includes('404')) {
      return new AppError(ERROR_MESSAGES.NOT_FOUND, 404, 'NOT_FOUND')
    }
  }

  return new AppError(ERROR_MESSAGES.FETCH_ERROR, 500, 'UNKNOWN_ERROR')
}

export const validateStudentProfile = (profile: unknown): boolean => {
  if (!profile || typeof profile !== 'object') return false

  const requiredFields = ['id', 'name', 'email', 'level', 'subjects', 'learningStyle', 'progress']
  return requiredFields.every(field => field in profile)
}

export const validateCourseContent = (course: unknown): boolean => {
  if (!course || typeof course !== 'object') return false

  const requiredFields = ['id', 'title', 'instructor', 'description', 'objectives', 'schedule']
  return requiredFields.every(field => field in course)
}

export const validateAssessment = (assessment: unknown): boolean => {
  if (!assessment || typeof assessment !== 'object') return false

  const requiredFields = ['id', 'title', 'course', 'type', 'dueDate', 'dueTime', 'duration', 'status']
  return requiredFields.every(field => field in assessment)
}

export const validateResource = (resource: unknown): boolean => {
  if (!resource || typeof resource !== 'object') return false

  const requiredFields = ['id', 'name', 'type', 'size', 'uploadDate', 'uploadTime', 'course', 'category']
  return requiredFields.every(field => field in resource)
}

export const handleValidationError = (data: unknown, validator: (data: unknown) => boolean): void => {
  if (!validator(data)) {
    throw new AppError(ERROR_MESSAGES.VALIDATION_ERROR, 400, 'VALIDATION_ERROR')
  }
} 