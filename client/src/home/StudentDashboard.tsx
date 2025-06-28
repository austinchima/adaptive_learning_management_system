"use client"

import { useState } from "react"
import { FileText, Calendar, Bell, Upload, Plus, ArrowRight } from "lucide-react"
import type { StudentDashboardProps, CourseContent } from "../interfaces/interfaces"

export function StudentDashboard({ studentProfile, onCourseSelect }: StudentDashboardProps) {
  const [currentCourses] = useState<CourseContent[]>([
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
    }
  ])

  const [achievements] = useState([
    {
      id: 1,
      title: "Perfect Score on Math Quiz",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCEb9T0vwIoNeV4Az6PcaFJXzXVJMt-fUSZorI6d-5gMpTyU0eF8tZtq8SdQ0ELHnW0mqDc5rDdSf_goj-8cXu3kj8hxfB4D8P54Brse4pfbOXm72QHIUlNOKG0UgYLBMjY3Rlz8_OGU_hNmlSk3poYeL0NQSmaMw_2CBQ1hK4mTkuJ3pZobblin4fUujQ1AVle7PYxh_slMB8jm5ThXKHhRc1DCgHg2O4wg2zE1pjWmD_TZfi3tvnZad5IEpKjVsVKOtKR7U0Uae2En",
    },
    {
      id: 2,
      title: "Completed History Project",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDz0KmZ-KcqWRNz6BOu2603K-W5wzYTlnxbZnSl0zRF30Pf5bwm7l_uUyPfqJikLSqU6-unVsSeTWWjBlvhxL-E0GUXH4uhpL7c4CQJAvbSqYGv64FOl4a7fb4QT0a5MM6RJd09ilSN1yUTwHNnsXK3jV6DR9N6k9DxMUq8j8PtEWxlKy7RRrGGdQECh4Yi_n8E6E6rYdYzpIqZcdDY6dbDwwMwP1bx2z7EHFn-X6LsTwS0s7QCS4L9LUCGhucTsmlaYeZx_gDXI4ND",
    },
    {
      id: 3,
      title: "Science Exam Passed",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAQ1fLpAn25eRezkKfpm-EN2k-q1EvR6V5JsqPl2JUajYhBhy6oIw507DB4X6JbcIjE6REAooHvHGnJLgxyETq2PLj97DWQRybueqh91ccjp_xtMXHtt7rVU06B4M30yxrTT5JOA8ajPCva5MWNwbGRzHYGGDJ2RHEbYvFzwO3JrBncvHSY3RRsem0XamRG6yhcy5vDHziwpRwqs2Qm7tvykxMBK4Y57WKdpYAYZSP9RkzEAgzkuvLyJzKdpi1rUHRKCXm_vSUWl3Cu",
    },
  ])

  const [upcomingTasks] = useState([
    {
      id: 1,
      title: "Math Assignment",
      dueDate: "May 15, 2024",
      type: "assignment",
      icon: FileText,
    },
    {
      id: 2,
      title: "History Test",
      dueDate: "May 20, 2024",
      type: "exam",
      icon: Calendar,
    },
  ])

  const [reminders] = useState(["Review Chapter 3 for Math", "Prepare for History presentation"])

  const [uploadedFiles] = useState([
    { id: 1, name: "Math_Notes_Chapter5.pdf", size: "2.3 MB", uploadDate: "2024-05-10" },
    { id: 2, name: "Physics_Lab_Report.docx", size: "1.8 MB", uploadDate: "2024-05-08" },
    { id: 3, name: "CS_Project_Code.zip", size: "5.2 MB", uploadDate: "2024-05-05" },
  ])

  const overallProgress = Math.round(
    currentCourses.reduce((acc, course) => {
      const courseProgress = Math.round((course.progress.topicsCompleted.length / course.topics.length) * 100)
      return acc + courseProgress
    }, 0) / currentCourses.length
  )

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="flex flex-wrap justify-between gap-3">
        <div className="flex min-w-72 flex-col gap-3">
          <h1 className="text-foreground tracking-light text-[32px] font-bold leading-tight">Dashboard</h1>
          <p className="text-muted-foreground text-sm font-normal leading-normal">Welcome back, {studentProfile.name}!</p>
        </div>
      </div>

      {/* Current Courses */}
      <div>
        <div className="flex justify-between items-center pb-3 pt-5">
          <h2 className="text-foreground text-[22px] font-bold leading-tight tracking-[-0.015em]">
            Current Courses
          </h2>
          {currentCourses.length > 3 && (
            <button
              onClick={() => onCourseSelect?.(currentCourses[0])}
              className="flex items-center gap-2 text-primary hover:text-primary/80"
            >
              See all
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
        <div className="flex overflow-y-auto gap-3">
          {currentCourses.slice(0, 3).map((course) => (
            <div
              key={course.id}
              className="flex h-full flex-1 flex-col gap-4 rounded-lg min-w-40 cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => onCourseSelect?.(course)}
            >
              <div className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-lg flex flex-col bg-muted" />
              <div>
                <p className="text-foreground text-base font-medium leading-normal">{course.title}</p>
                <p className="text-muted-foreground text-sm font-normal leading-normal">{course.subject}</p>
                <div className="mt-2">
                  <div className="flex justify-between text-xs text-muted-foreground mb-1">
                    <span>Progress</span>
                    <span>{Math.round((course.progress.topicsCompleted.length / course.topics.length) * 100)}%</span>
                  </div>
                  <div className="w-full bg-border rounded-full h-1.5">
                    <div
                      className="bg-primary h-1.5 rounded-full transition-all duration-300"
                      style={{ width: `${Math.round((course.progress.topicsCompleted.length / course.topics.length) * 100)}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Progress */}
      <div>
        <h2 className="text-foreground text-[22px] font-bold leading-tight tracking-[-0.015em] pb-3 pt-5">Progress</h2>
        <div className="flex flex-col gap-3">
          <div className="flex gap-6 justify-between">
            <p className="text-foreground text-base font-medium leading-normal">Overall Progress</p>
            <p className="text-foreground text-sm font-normal leading-normal">{overallProgress}%</p>
          </div>
          <div className="rounded bg-border">
            <div className="h-2 rounded bg-primary" style={{ width: `${overallProgress}%` }} />
          </div>
        </div>
      </div>

      {/* File Upload Section */}
      <div>
        <h2 className="text-foreground text-[22px] font-bold leading-tight tracking-[-0.015em] pb-3 pt-5">
          Course Materials
        </h2>
        <div className="space-y-4">
          <div className="border-2 border-dashed border-border rounded-lg p-6 text-center bg-card">
            <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
            <p className="text-foreground text-base font-medium mb-1">Upload course materials</p>
            <p className="text-muted-foreground text-sm">Drag and drop files here or click to browse</p>
            <button className="mt-3 flex items-center gap-2 mx-auto px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium">
              <Plus className="w-4 h-4" />
              Choose Files
            </button>
          </div>

          <div className="space-y-2">
            <h3 className="text-foreground text-lg font-medium">Recent Uploads</h3>
            {uploadedFiles.map((file) => (
              <div key={file.id} className="flex items-center gap-4 p-3 bg-muted rounded-lg">
                <FileText className="w-5 h-5 text-muted-foreground" />
                <div className="flex-1">
                  <p className="text-foreground text-sm font-medium">{file.name}</p>
                  <p className="text-muted-foreground text-xs">
                    {file.size} • Uploaded {file.uploadDate}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Achievements */}
      <div>
        <h2 className="text-foreground text-[22px] font-bold leading-tight tracking-[-0.015em] pb-3 pt-5">
          Achievements
        </h2>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(158px,1fr))] gap-3">
          {achievements.map((achievement) => (
            <div key={achievement.id} className="flex flex-col gap-3 pb-3 bg-card rounded-lg p-4">
              <div
                className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-lg"
                style={{ backgroundImage: `url(${achievement.image})` }}
              />
              <p className="text-foreground text-base font-medium leading-normal">{achievement.title}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Upcoming */}
      <div>
        <h2 className="text-foreground text-[22px] font-bold leading-tight tracking-[-0.015em] pb-3 pt-5">Upcoming</h2>
        <div className="space-y-2">
          {upcomingTasks.map((task) => {
            const Icon = task.icon
            return (
              <div key={task.id} className="flex items-center gap-4 bg-card min-h-[72px] py-2">
                <div className="text-foreground flex items-center justify-center rounded-lg bg-muted shrink-0 size-12">
                  <Icon className="w-6 h-6" />
                </div>
                <div className="flex flex-col justify-center">
                  <p className="text-foreground text-base font-medium leading-normal line-clamp-1">{task.title}</p>
                  <p className="text-muted-foreground text-sm font-normal leading-normal line-clamp-2">Due: {task.dueDate}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Reminders */}
      <div>
        <h2 className="text-foreground text-[22px] font-bold leading-tight tracking-[-0.015em] pb-3 pt-5">Reminders</h2>
        <div className="space-y-2">
          {reminders.map((reminder, index) => (
            <div key={index} className="flex items-center gap-4 bg-card min-h-14">
              <div className="text-foreground flex items-center justify-center rounded-lg bg-muted shrink-0 size-10">
                <Bell className="w-6 h-6" />
              </div>
              <p className="text-foreground text-base font-normal leading-normal flex-1 truncate">{reminder}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
