/**
 * CoursesListPage.tsx
 *
 * Displays a list of all available courses for the student.
 * - Allows course selection, addition, and material upload.
 * - Designed for extensibility (e.g., filtering, searching, future features).
 * - Uses TSDoc for all exported functions/components.
 */

import { useState } from "react"
import { Search, Grid, List, Plus, Upload, BookOpen } from "lucide-react"
import type { StudentProfile, CourseContent } from "../interfaces/interfaces"

interface CoursesListPageProps {
  studentProfile: StudentProfile
  onCourseSelect: (course: CourseContent) => void
  onAddCourse: () => void
  onUploadMaterial: () => void
}

/**
 * CoursesListPage
 *
 * Renders the list of courses, with options to select, add, or upload materials.
 * Handles business logic for course selection and extensibility for future features.
 */
export function CoursesListPage({ 
  studentProfile, 
  onCourseSelect, 
  onAddCourse,
  onUploadMaterial 
}: CoursesListPageProps) {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [searchTerm, setSearchTerm] = useState("")
  const [filterCategory, setFilterCategory] = useState("all")

  const courses: CourseContent[] = [
    {
      id: "psych-101",
      title: "Introduction to Psychology",
      description: "This course provides a comprehensive introduction to the fundamental concepts and principles of psychology.",
      subject: "Psychology",
      topics: ["Research Methods", "Biological Bases", "Sensation and Perception", "Learning and Memory", "Cognition"],
      resources: [],
      learningPath: {
        objectives: [
          "Understand basic psychological concepts",
          "Apply research methods",
          "Analyze human behavior"
        ],
        estimatedDuration: "12 weeks",
        recommendedOrder: ["Research Methods", "Biological Bases", "Sensation and Perception"]
      },
      assignments: [
        {
          id: "a1",
          title: "Research Methods Assignment",
          dueDate: "2024-04-15",
          status: "pending",
          type: "manual"
        }
      ],
      studyPreferences: {
        preferredLearningStyle: "visual",
        studySchedule: ["Monday", "Wednesday", "Friday"],
        focusAreas: ["Research Methods", "Memory"]
      },
      lastStudied: "2024-03-20",
      progress: {
        topicsCompleted: ["Research Methods"],
        currentTopic: "Biological Bases",
        nextRecommendedTopic: "Sensation and Perception"
      }
    },
    {
      id: "math-201",
      title: "Advanced Mathematics",
      description: "This advanced calculus course covers multivariable calculus, vector calculus, and differential equations.",
      subject: "Mathematics",
      topics: ["Multivariable Calculus", "Vector Calculus", "Differential Equations"],
      resources: [],
      learningPath: {
        objectives: [
          "Master multivariable calculus",
          "Understand vector calculus",
          "Solve differential equations"
        ],
        estimatedDuration: "16 weeks",
        recommendedOrder: ["Multivariable Calculus", "Vector Calculus", "Differential Equations"]
      },
      assignments: [],
      progress: {
        topicsCompleted: [],
        currentTopic: "Multivariable Calculus",
        nextRecommendedTopic: "Vector Calculus"
      }
    },
    {
      id: "cs-301",
      title: "Machine Learning",
      description: "This course introduces students to machine learning algorithms and their applications in real-world scenarios.",
      subject: "Computer Science",
      topics: ["Supervised Learning", "Unsupervised Learning", "Neural Networks", "Deep Learning"],
      resources: [],
      learningPath: {
        objectives: [
          "Understand ML algorithms",
          "Implement ML solutions",
          "Apply deep learning"
        ],
        estimatedDuration: "14 weeks",
        recommendedOrder: ["Supervised Learning", "Unsupervised Learning", "Neural Networks"]
      },
      assignments: [],
      progress: {
        topicsCompleted: [],
        currentTopic: "Supervised Learning",
        nextRecommendedTopic: "Unsupervised Learning"
      }
    },
    {
      id: "phys-201",
      title: "Quantum Physics",
      description: "Explore the fascinating world of quantum mechanics and its applications in modern physics.",
      subject: "Physics",
      topics: ["Quantum Mechanics", "Wave Functions", "Schrödinger Equation", "Quantum Entanglement"],
      resources: [],
      learningPath: {
        objectives: [
          "Understand quantum principles",
          "Apply wave functions",
          "Analyze quantum systems"
        ],
        estimatedDuration: "18 weeks",
        recommendedOrder: ["Quantum Mechanics", "Wave Functions", "Schrödinger Equation"]
      },
      assignments: [],
      progress: {
        topicsCompleted: [],
        currentTopic: "Quantum Mechanics",
        nextRecommendedTopic: "Wave Functions"
      }
    }
  ]

  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.subject.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterCategory === "all" || course.subject.toLowerCase() === filterCategory.toLowerCase()
    return matchesSearch && matchesFilter
  })

  const categories = ["all", "Psychology", "Mathematics", "Computer Science", "Physics"]

  return (
    <div className="flex flex-col h-full bg-background text-foreground">
      <div className="p-4 border-b border-border">
        <h1 className="text-2xl font-bold">Welcome back, {studentProfile.name}</h1>
        <p className="text-muted-foreground">Manage your study materials and courses</p>
      </div>
      <div className="p-4 space-y-6">
        {/* Header */}
        <div className="flex flex-wrap justify-between gap-3">
          <div className="flex min-w-72 flex-col gap-3">
            <h1 className="text-foreground tracking-light text-[32px] font-bold leading-tight">My Courses</h1>
            <p className="text-muted-foreground text-sm font-normal leading-normal">Organize and track your learning journey</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={onUploadMaterial}
              className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90"
            >
              <Upload className="w-4 h-4" />
              Upload Material
            </button>
            <button
              onClick={onAddCourse}
              className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90"
            >
              <Plus className="w-4 h-4" />
              Add Course
            </button>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-wrap gap-4 items-center justify-between">
          <div className="flex gap-4 items-center">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <input
                type="text"
                placeholder="Search courses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-card text-foreground"
              />
            </div>

            <select
              title="Filter by Subject"
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-4 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-card text-foreground"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category === "all" ? "All Subjects" : category}
                </option>
              ))}
            </select>
          </div>

          <div className="flex gap-2">
            <button
              title="Switch to Grid View"
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded-lg ${viewMode === ("grid" as const) ? "bg-muted" : ""}`}
            >
              <Grid className="w-5 h-5 text-foreground" />
            </button>
            <button
              title="Switch to List View"
              onClick={() => setViewMode("list")}
              className={`p-2 rounded-lg ${viewMode === ("list" as const) ? "bg-muted" : ""}`}
            >
              <List className="w-5 h-5 text-foreground" />
            </button>
          </div>
        </div>

        {/* Courses Display */}
        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course) => (
              <div
                key={course.id}
                className="bg-card rounded-lg shadow-sm border border-border overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => onCourseSelect(course)}
              >
                <div className="p-4 space-y-3">
                  <div>
                    <h3 className="text-foreground text-lg font-semibold leading-tight">{course.title}</h3>
                    <p className="text-muted-foreground text-sm">{course.subject}</p>
                  </div>

                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <BookOpen className="w-3 h-3" />
                      <span>{course.topics.length} topics</span>
                    </div>
                    {course.lastStudied && (
                      <div className="flex items-center gap-1">
                        <span>Last studied: {new Date(course.lastStudied).toLocaleDateString()}</span>
                      </div>
                    )}
                  </div>

                  <p className="text-muted-foreground text-sm line-clamp-2">{course.description}</p>

                  {course.assignments.length > 0 && (
                    <div className="pt-2">
                      <p className="text-xs text-muted-foreground">
                        {course.assignments.filter(a => a.status === 'pending').length} pending assignments
                      </p>
                    </div>
                  )}

                  {course.progress && (
                    <div className="pt-2">
                      <p className="text-xs text-muted-foreground">
                        Current topic: {course.progress.currentTopic}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredCourses.map((course) => (
              <div
                key={course.id}
                className="bg-card rounded-lg shadow-sm border border-border p-4 hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => onCourseSelect(course)}
              >
                <div className="flex gap-4">
                  <div className="flex-1 space-y-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-foreground text-lg font-semibold">{course.title}</h3>
                        <p className="text-muted-foreground text-sm">{course.subject}</p>
                      </div>
                    </div>

                    <p className="text-muted-foreground text-sm line-clamp-2">{course.description}</p>

                    <div className="flex items-center gap-6 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <BookOpen className="w-3 h-3" />
                        <span>{course.topics.length} topics</span>
                      </div>
                      {course.lastStudied && (
                        <div className="flex items-center gap-1">
                          <span>Last studied: {new Date(course.lastStudied).toLocaleDateString()}</span>
                        </div>
                      )}
                    </div>

                    {course.assignments.length > 0 && (
                      <div className="pt-2">
                        <p className="text-xs text-muted-foreground">
                          {course.assignments.filter(a => a.status === 'pending').length} pending assignments
                        </p>
                      </div>
                    )}

                    {course.progress && (
                      <div className="pt-2">
                        <p className="text-xs text-muted-foreground">
                          Current topic: {course.progress.currentTopic}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {filteredCourses.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">No courses found matching your criteria.</p>
            <button
              onClick={onAddCourse}
              className="mt-4 flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 mx-auto"
            >
              <Plus className="w-4 h-4" />
              Add Your First Course
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
