export interface StudentProfile {
    id: string
    name: string
    email: string
    avatar?: string
    level: string
    subjects?: string[]
    progress?: Record<string, number>
    streakDays?: number
    totalPoints?: number
    studyPreferences?: {
        preferredLearningStyle: string
        studySchedule: string[]
        focusAreas: string[]
    }
}

export interface LearningProgress {
    id: string
    studentId: string
    subject: string
    topic: string
    performanceHistory: {
        score: number
        attempts: number
        lastAttempt: string
    }[]
    timeSpent: number
    lastStudied: string
}

export interface QuizAttempt {
    id: string
    studentId: string
    subject: string
    topic: string
    startedAt: string
    completedAt?: string
    responses: QuestionResponse[]
    performance: {
        score: number
        timeSpent: number
    }
}

export interface QuestionResponse {
    id: string
    quizAttemptId: string
    question: string
    studentAnswer: string
    correctAnswer: string
    isCorrect: boolean
    answeredAt: string
}

export interface RLState {
    studentId: string
    currentTopic: string
    performanceHistory: {
        topic: string
        score: number
        attempts: number
        lastAttempt: string
    }[]
    learningStyle: string
    timeSpent: number
}

export interface RLAction {
    nextTopic: string
    learningStyle: string
}

export interface Assessment {
    id: string
    title: string
    course: string
    type: "quiz" | "assignment" | "exam" | "project"
    dueDate: string
    dueTime: string
    duration: string
    status: "upcoming" | "in-progress" | "completed" | "overdue"
    difficulty: "low" | "medium" | "high"
    topics: string[]
    estimatedScore: number
    description: string
    subject: string
    topic: string
    masteryLevel: string
    questions: QuestionResponse[]
}

export interface AssessmentsPageProps {
    studentProfile: StudentProfile
    themeProp?: string
}

export interface ProgressAnalyticsProps {
    studentProfile: StudentProfile
    themeProp: string
}

export interface AppNavbarProps {
    studentProfile: StudentProfile
    activeTab: string
    onTabChange: (tab: string) => void
    courses?: CourseContent[]
    selectedCourse?: CourseContent
    onCourseSelect?: (course: CourseContent | undefined) => void
    isCollapsed?: boolean
    onToggleCollapse?: () => void
}

// onCourseSelect callback should return a CourseContent object containing:
// - course details (id, title, description)
// - instructor information
// - course schedule
// - learning objectives
// - multimedia resources
// - progress tracking data
export interface StudentDashboardProps {
    studentProfile: StudentProfile
    onCourseSelect?: (course: CourseContent) => void
}

export interface PersonalisedRecommendationsProps {
    studentProfile: StudentProfile
}

export interface ResourcesPageProps {
    studentProfile: StudentProfile
}

export interface Resource {
    id: string
    title: string
    description: string
    type: 'document' | 'video' | 'quiz' | 'exercise' | 'pdf' | 'ppt' | 'xlsx' | 'other' | 'image' | 'audio' | 'link' | 'code' | 'doc' | 'docx'
    url?: string
    size: string
    uploadTime: string
    uploadDate: string
    course: string
    category: 'reference' | 'notes' | 'assignment' | 'exercise' | 'quiz' | 'project' | 'other'
    subject?: string
    topic?: string
    difficulty?: 'easy' | 'medium' | 'hard'
    tags?: string[]
    createdAt?: string
    lastAccessed?: string
}

export interface Course {
    id: string
    name: string
    code: string
    instructor: string
}

export interface UploadedFile {
    id: string
    name: string
    size: string
    type: string
    uploadTime: string
}

export interface FileUploadSuccessProps {
    uploadedFile: UploadedFile
    courses: Course[]
    onAssociate: (fileId: string, courseId: string) => void
    onCancel: () => void
}

export interface ProfileSettingsProps {
    studentProfile: StudentProfile
    onToggleTheme: (theme: "light" | "dark" | "system") => void
    currentTheme: string
}

export interface CoursesListPageProps {
    studentProfile: StudentProfile
    onCourseSelect: (course: CourseContent) => void
    onAddCourse: () => void
    onUploadMaterial: () => void
}

export interface CourseObjective {
    id: string
    text: string
    completed: boolean
}

export interface ScheduleItem {
    week: string
    topic: string
    readings: string
    assignments: string
}

export interface CourseContent {
    id: string
    title: string
    description: string
    subject: string
    topics: string[]
    resources: Resource[]
    learningPath?: {
        objectives: string[]
        estimatedDuration: string
        recommendedOrder: string[]
    }
    assignments: {
        id: string
        title: string
        dueDate?: string
        status: 'pending' | 'in-progress' | 'completed'
        type: 'manual' | 'ai-suggested'
    }[]
    studyPreferences?: {
        preferredLearningStyle: string
        studySchedule: string[]
        focusAreas: string[]
    }
    lastStudied?: string
    progress: {
        topicsCompleted: string[]
        currentTopic: string
        nextRecommendedTopic: string
    }
}

export interface CourseContentDisplayProps {
    course: CourseContent
    studentProfile?: {
        name: string
        avatar: string
    }
    onBack: () => void
}

export interface CourseProgress {
    id: string
    studentId: string
    courseId: string
    name: string
    progress: number
    currentGrade: string
    gradePoints: number
    credits: number
    assignments: {
        completed: number
        total: number
        avgScore: number
    }
    quizzes: {
        completed: number
        total: number
        avgScore: number
    }
    exams: {
        completed: number
        total: number
        avgScore: number
    }
    participation: number
    trend: string
    topicsCompleted: string[]
    currentTopic: string
    nextRecommendedTopic: string
    lastStudied: string
    timeSpent: number
}

export interface KeyConcept {
    id: number
    title: string
    description: string
    icon: string
}

export interface LessonData {
    progress: number
    title: string
    description: string
    keyConcepts: KeyConcept[]
}

export interface InteractiveLessonProps {
    lessonData: LessonData
}
