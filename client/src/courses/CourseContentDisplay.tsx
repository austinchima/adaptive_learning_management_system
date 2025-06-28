/**
 * CourseContentDisplay.tsx
 *
 * Displays the content for a selected course, including topics, progress, and navigation.
 * - Handles topic completion, current topic, and progress visualization.
 * - Designed for modularity and future extensibility (e.g., topic resources, quizzes).
 * - Uses TSDoc for all exported functions/components.
 */

import type { CourseContentDisplayProps } from "../interfaces/interfaces"
// import type { Course } from "../interfaces/interfaces"
import { useState } from "react"
import { ArrowLeft, BookOpen, Calendar, Target, Brain } from "lucide-react"

/**
 * CourseContentDisplay
 *
 * Renders the content and progress for a selected course.
 * Handles topic navigation, completion, and progress display.
 */
export function CourseContentDisplay({ course, onBack }: CourseContentDisplayProps) {
  const [activeTab, setActiveTab] = useState("overview")

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "learning-path", label: "Learning Path" },
    { id: "assignments", label: "Assignments" },
    { id: "resources", label: "Resources" }
  ]

  if (!course) {
    return (
      <div className="flex flex-col h-full bg-background text-foreground p-4">
        <p className="text-muted-foreground">No course selected</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full bg-background text-foreground">
      <div className="p-4 border-b border-border">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Courses
        </button>
      </div>

      <div className="p-4 space-y-6">
        {/* Course Header */}
        <div>
          <h1 className="text-2xl font-bold mb-2">{course.title}</h1>
          <p className="text-muted-foreground">{course.description}</p>
        </div>

        {/* Course Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-card p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <BookOpen className="w-4 h-4 text-primary" />
              <span className="font-medium">Subject</span>
            </div>
            <p className="text-muted-foreground">{course.subject}</p>
          </div>

          {course.lastStudied && (
            <div className="bg-card p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="w-4 h-4 text-primary" />
                <span className="font-medium">Last Studied</span>
              </div>
              <p className="text-muted-foreground">{new Date(course.lastStudied).toLocaleDateString()}</p>
            </div>
          )}

          {course.studyPreferences && (
            <div className="bg-card p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Brain className="w-4 h-4 text-primary" />
                <span className="font-medium">Learning Style</span>
              </div>
              <p className="text-muted-foreground capitalize">{course.studyPreferences.preferredLearningStyle}</p>
            </div>
          )}
        </div>

        {/* Tabs */}
        <div className="border-b border-border">
          <div className="flex gap-4">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`pb-2 px-1 ${
                  activeTab === tab.id
                    ? "border-b-2 border-primary text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="space-y-6">
          {activeTab === "overview" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold mb-4">Topics</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {course.topics?.map((topic, index) => (
                    <div
                      key={index}
                      className={`p-4 rounded-lg ${
                        course.progress?.topicsCompleted?.includes(topic)
                          ? "bg-green-50 text-green-700"
                          : topic === course.progress?.currentTopic
                          ? "bg-blue-50 text-blue-700"
                          : "bg-card"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <Target className="w-4 h-4" />
                        <span className="font-medium">{topic}</span>
                      </div>
                      {topic === course.progress?.currentTopic && (
                        <p className="text-sm mt-2">Current Topic</p>
                      )}
                      {course.progress?.topicsCompleted?.includes(topic) && (
                        <p className="text-sm mt-2">Completed</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {course.studyPreferences && (
                <div>
                  <h2 className="text-xl font-semibold mb-4">Study Preferences</h2>
                  <div className="bg-card p-4 rounded-lg space-y-4">
                    <div>
                      <h3 className="font-medium mb-2">Study Schedule</h3>
                      <div className="flex flex-wrap gap-2">
                        {course.studyPreferences.studySchedule?.map((day, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-muted rounded-full text-sm"
                          >
                            {day}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h3 className="font-medium mb-2">Focus Areas</h3>
                      <div className="flex flex-wrap gap-2">
                        {course.studyPreferences.focusAreas?.map((area, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-muted rounded-full text-sm"
                          >
                            {area}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === "learning-path" && course.learningPath && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold mb-4">Learning Objectives</h2>
                <div className="space-y-3">
                  {course.learningPath.objectives?.map((objective, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                        <span className="text-primary text-sm">{index + 1}</span>
                      </div>
                      <p className="text-muted-foreground">{objective}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-4">Recommended Order</h2>
                <div className="space-y-3">
                  {course.learningPath.recommendedOrder?.map((topic, index) => (
                    <div
                      key={index}
                      className={`p-4 rounded-lg ${
                        course.progress?.topicsCompleted?.includes(topic)
                          ? "bg-green-50 text-green-700"
                          : topic === course.progress?.currentTopic
                          ? "bg-blue-50 text-blue-700"
                          : "bg-card"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                          <span className="text-primary text-sm">{index + 1}</span>
                        </div>
                        <span className="font-medium">{topic}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-4">Estimated Duration</h2>
                <p className="text-muted-foreground">{course.learningPath.estimatedDuration}</p>
              </div>
            </div>
          )}

          {activeTab === "assignments" && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold mb-4">Assignments</h2>
              {course.assignments?.length > 0 ? (
                <div className="space-y-4">
                  {course.assignments.map((assignment) => (
                    <div
                      key={assignment.id}
                      className="bg-card p-4 rounded-lg space-y-2"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">{assignment.title}</h3>
                          {assignment.dueDate && (
                            <p className="text-sm text-muted-foreground">
                              Due: {new Date(assignment.dueDate).toLocaleDateString()}
                            </p>
                          )}
                        </div>
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            assignment.status === "completed"
                              ? "bg-green-100 text-green-700"
                              : assignment.status === "in-progress"
                              ? "bg-blue-100 text-blue-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {assignment.status}
                        </span>
                      </div>
                      {assignment.type === "ai-suggested" && (
                        <p className="text-sm text-muted-foreground">
                          AI-suggested based on your learning progress
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground">No assignments yet</p>
              )}
            </div>
          )}

          {activeTab === "resources" && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold mb-4">Resources</h2>
              {course.resources?.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {course.resources.map((resource) => (
                    <div
                      key={resource.id}
                      className="bg-card p-4 rounded-lg space-y-2"
                    >
                      <h3 className="font-medium">{resource.title}</h3>
                      <p className="text-sm text-muted-foreground">{resource.description}</p>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span className="capitalize">{resource.type}</span>
                        {resource.difficulty && (
                          <>
                            <span>•</span>
                            <span className="capitalize">{resource.difficulty}</span>
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground">No resources uploaded yet</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
