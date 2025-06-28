import type { Resource } from '../../interfaces/interfaces'

export const sampleResources: Resource[] = [
  {
    id: "res-001",
    title: "Algebra Textbook",
    type: "document",
    size: "15.2MB",
    uploadDate: "2024-03-01",
    uploadTime: "10:30",
    course: "Introduction to Mathematics",
    category: "reference",
    description: "Complete textbook covering all algebra topics"
  },
  {
    id: "res-002",
    title: "Calculus Notes",
    type: "document",
    size: "2.5MB",
    uploadDate: "2024-03-05",
    uploadTime: "14:15",
    course: "Introduction to Mathematics",
    category: "notes",
    description: "Comprehensive lecture notes on calculus"
  },
  {
    id: "res-003",
    title: "Physics Lab Manual",
    type: "pdf",
    size: "8.7MB",
    uploadDate: "2024-03-10",
    uploadTime: "09:45",
    course: "Advanced Physics",
    category: "reference",
    description: "Detailed laboratory procedures and guidelines"
  },
  {
    id: "res-004",
    title: "Quantum Mechanics Presentation",
    type: "ppt",
    size: "12.3MB",
    uploadDate: "2024-03-12",
    uploadTime: "16:20",
    course: "Advanced Physics",
    category: "notes",
    description: "Lecture slides on quantum mechanics"
  },
  {
    id: "res-005",
    title: "Problem Set Solutions",
    type: "pdf",
    size: "4.1MB",
    uploadDate: "2024-03-15",
    uploadTime: "11:00",
    course: "Introduction to Mathematics",
    category: "assignment",
    description: "Detailed solutions to practice problems"
  }
]
