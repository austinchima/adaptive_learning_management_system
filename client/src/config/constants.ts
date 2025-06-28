export const DEFAULT_GRADES = {
  A: { min: 90, points: 4.0 },
  'B+': { min: 80, points: 3.7 },
  B: { min: 70, points: 3.3 },
  'C+': { min: 60, points: 2.7 },
  C: { min: 0, points: 2.0 },
}

export const DEFAULT_CREDITS = 3

export const DEFAULT_OBJECTIVES = [
  { id: 'obj-1', text: 'Master core concepts', threshold: 30 },
  { id: 'obj-2', text: 'Apply knowledge in practice', threshold: 60 },
  { id: 'obj-3', text: 'Complete all assignments', threshold: 90 },
  { id: 'obj-4', text: 'Achieve course goals', threshold: 100 },
]

export const DEFAULT_SCHEDULE = {
  week: 'Current Week',
  topic: 'Current Topic',
  readings: 'Required Reading',
  assignments: 'Current Assignment',
}

export const FILE_TYPES = {
  pdf: { icon: '📄', color: 'bg-red-100 text-red-800' },
  doc: { icon: '📝', color: 'bg-blue-100 text-blue-800' },
  ppt: { icon: '📊', color: 'bg-yellow-100 text-yellow-800' },
  video: { icon: '🎥', color: 'bg-purple-100 text-purple-800' },
  image: { icon: '🖼️', color: 'bg-green-100 text-green-800' },
  other: { icon: '📁', color: 'bg-gray-100 text-gray-800' },
}

export const CATEGORY_COLORS = {
  assignment: 'bg-red-100 text-red-800',
  notes: 'bg-blue-100 text-blue-800',
  reference: 'bg-green-100 text-green-800',
  project: 'bg-purple-100 text-purple-800',
  other: 'bg-gray-100 text-gray-800',
}

export const TREND_COLORS = {
  improving: 'text-green-600',
  stable: 'text-blue-600',
  needs_attention: 'text-red-600',
}

export const ERROR_MESSAGES = {
  FETCH_ERROR: 'Failed to fetch data. Please try again later.',
  INVALID_DATA: 'Invalid data received. Please contact support.',
  NETWORK_ERROR: 'Network error. Please check your connection.',
  UNAUTHORIZED: 'Unauthorized access. Please log in again.',
  SERVER_ERROR: 'Server error. Please try again later.',
  NOT_FOUND: 'Requested resource not found.',
  UNKNOWN_ERROR: 'An unknown error occurred. Please try again later.',
  VALIDATION_ERROR: 'Invalid input. Please check your data.',
}

export const API_ENDPOINTS = {
  STUDENT: '/api/student',
  STUDENT_PROGRESS: '/api/student/progress',
  STUDENT_QUIZZES: '/api/student/quizzes',
  QUIZ_QUESTION: '/api/quiz/question',
  QUIZ_SUBMIT: '/api/quiz/submit',
  QUIZ_NEXT_TOPIC: '/api/quiz/next-topic',
  QUIZ_HINT: '/api/quiz/hint',
  COURSES: '/api/courses',
  ASSESSMENTS: '/api/assessments',
  RESOURCES: '/api/resources',
  PROGRESS: '/api/progress',
  RL_NEXT_ACTION: '/api/rl/next-action',
  RL_UPDATE: '/api/rl/update',
  LLM_GENERATE_QUESTION: '/api/llm/generate-question',
  LLM_GENERATE_FEEDBACK: '/api/llm/generate-feedback',
  LLM_SUGGEST_STUDY_PLAN: '/api/llm/suggest-study-plan',
  LLM_SUGGEST_ASSIGNMENT: '/api/llm/suggest-assignment'
} as const

export const DEFAULT_AVATAR = 'https://lh3.googleusercontent.com/aida-public/default-avatar' 