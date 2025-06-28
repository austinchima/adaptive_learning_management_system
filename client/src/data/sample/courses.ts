import type { CourseContent } from '../../interfaces/interfaces'

export const sampleCourses: CourseContent[] = [
  {
    id: "course-001",
    title: "Introduction to Mathematics",
    description: "A comprehensive introduction to fundamental mathematical concepts and their applications in real-world scenarios.",
    subject: "Mathematics",
    topics: ["Algebra", "Calculus", "Functions", "Problem Solving"],
    resources: [],
    learningPath: {
      objectives: [
        "Understand basic algebraic concepts",
        "Master fundamental calculus principles",
        "Apply mathematical concepts to real-world problems",
        "Develop problem-solving skills"
      ],
      estimatedDuration: "12 weeks",
      recommendedOrder: ["Algebra", "Functions", "Calculus", "Problem Solving"]
    },
    assignments: [
      {
        id: "a1",
        title: "Algebra Problem Set 1",
        dueDate: "2024-04-15",
        status: "pending",
        type: "manual"
      },
      {
        id: "a2",
        title: "Functions Practice",
        dueDate: "2024-04-22",
        status: "pending",
        type: "ai-suggested"
      }
    ],
    studyPreferences: {
      preferredLearningStyle: "visual",
      studySchedule: ["Monday", "Wednesday", "Friday"],
      focusAreas: ["Algebra", "Problem Solving"]
    },
    lastStudied: "2024-03-20",
    progress: {
      topicsCompleted: ["Algebra"],
      currentTopic: "Functions",
      nextRecommendedTopic: "Calculus"
    }
  },
  {
    id: "course-002",
    title: "Advanced Physics",
    description: "An in-depth exploration of advanced physics concepts, including quantum mechanics and relativity.",
    subject: "Physics",
    topics: ["Quantum Mechanics", "Relativity", "Modern Physics", "Applications"],
    resources: [],
    learningPath: {
      objectives: [
        "Understand quantum mechanics principles",
        "Master relativity concepts",
        "Apply physics principles to modern technology"
      ],
      estimatedDuration: "16 weeks",
      recommendedOrder: ["Quantum Mechanics", "Relativity", "Modern Physics", "Applications"]
    },
    assignments: [
      {
        id: "a1",
        title: "Quantum Mechanics Lab Report",
        dueDate: "2024-04-18",
        status: "pending",
        type: "manual"
      }
    ],
    studyPreferences: {
      preferredLearningStyle: "practical",
      studySchedule: ["Tuesday", "Thursday", "Saturday"],
      focusAreas: ["Quantum Mechanics", "Applications"]
    },
    lastStudied: "2024-03-19",
    progress: {
      topicsCompleted: [],
      currentTopic: "Quantum Mechanics",
      nextRecommendedTopic: "Relativity"
    }
  }
] 