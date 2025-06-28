/**
 * ProgressAnalytics.tsx
 *
 * Provides a comprehensive analytics dashboard for student academic progress.
 * - Tabbed interface for overall progress, course breakdown, CGPA, and predictions.
 * - Receives themeProp for dark/light mode styling.
 * - Contains business logic for grade, trend, and prediction calculations.
 * - Tab navigation styling is the design reference for other analytics pages.
 */
import type { ProgressAnalyticsProps, CourseProgress } from "../interfaces/interfaces"

import { useState } from "react"
import { TrendingUp, Target, Award, Calendar, Brain, BookOpen, TrendingDown, Minus } from "lucide-react"

/**
 * ProgressAnalytics
 *
 * Renders the analytics dashboard for a student, including progress, CGPA, and predictions.
 * Handles tab switching, data transformation, and dark/light mode styling.
 */
export function ProgressAnalytics({ studentProfile, themeProp }: ProgressAnalyticsProps) {
  // console.log("ProgressAnalytics component rendering...")
  // console.log("Student Profile:", studentProfile)
  // console.log("Current Theme:", themeProp)

  const [activeTab, setActiveTab] = useState("overall")

  // Default subjects if none are provided
  const defaultSubjects = ["Mathematics", "Physics", "Computer Science"]
  const subjects = studentProfile.subjects || defaultSubjects

  // Transform student profile data into course progress format
  const courseProgress: CourseProgress[] = subjects.map(subject => {
    const progress = studentProfile.progress?.[subject.toLowerCase()] || 0
    // Calculate grade based on progress
    const gradePoints = progress >= 90 ? 4.0 :
      progress >= 80 ? 3.7 :
        progress >= 70 ? 3.3 :
          progress >= 60 ? 2.7 : 2.0
    const grade =
      progress >= 90 ? "A" :
        progress >= 80 ? "B+" :
          progress >= 70 ? "B" :
            progress >= 60 ? "C+" : "C"

    return {
      id: subject.toLowerCase().replace(/\s+/g, '-'),
      studentId: studentProfile.id,
      courseId: subject.toLowerCase().replace(/\s+/g, '-'),
      name: subject,
      progress,
      currentGrade: grade,
      gradePoints,
      credits: 3, // Default credits, should come from actual course data
      assignments: {
        completed: Math.floor(progress / 10),
        total: 10,
        avgScore: progress
      },
      quizzes: {
        completed: Math.floor(progress / 15),
        total: 6,
        avgScore: progress
      },
      exams: {
        completed: Math.floor(progress / 30),
        total: 2,
        avgScore: progress
      },
      participation: progress,
      trend: progress >= 80 ? "improving" :
        progress >= 60 ? "stable" :
          "needs_attention",
      topicsCompleted: [],
      currentTopic: "Introduction",
      nextRecommendedTopic: "Advanced Concepts",
      lastStudied: new Date().toISOString(),
      timeSpent: progress * 10 // Estimate based on progress
    }
  })

  // Calculate projected CGPA
  const calculateCGPA = () => {
    const totalGradePoints = courseProgress.reduce((sum, course) => sum + course.gradePoints * course.credits, 0)
    const totalCredits = courseProgress.reduce((sum, course) => sum + course.credits, 0)
    return (totalGradePoints / totalCredits).toFixed(2)
  }

  // Study habits analysis based on learning style
  const studyHabits = {
    weeklyHours: studentProfile.streakDays ? studentProfile.streakDays * 2 : 0, // Estimate based on streak
    averageSessionLength: 2.5, // This should come from actual study session data
    preferredStudyTime: "Evening (6-9 PM)", // This should come from actual study time data
    mostProductiveDay: "Tuesday", // This should come from actual productivity data
    consistency: studentProfile.streakDays ? studentProfile.streakDays * 5 : 0, // Estimate based on streak
    focusScore: Math.min(100, studentProfile.totalPoints ? studentProfile.totalPoints / 100 : 0), // Estimate based on total points
  }

  // Performance predictions based on current progress
  const predictions = {
    semesterCGPA: parseFloat(calculateCGPA()),
    improvementAreas: courseProgress
      .filter(course => course.progress < 70)
      .map(course => course.name),
    strengths: courseProgress
      .filter(course => course.progress >= 85)
      .map(course => course.name),
    recommendedStudyTime: Math.max(20, studentProfile.streakDays ? studentProfile.streakDays * 2.5 : 0),
    projectedGrades: Object.fromEntries(
      courseProgress.map(course => [
        course.name,
        course.progress >= 90 ? "A" :
          course.progress >= 80 ? "B+" :
            course.progress >= 70 ? "B" :
              course.progress >= 60 ? "C+" : "C"
      ])
    ),
  }

  const tabs = [
    { id: "overall", label: "Overall Progress" },
    { id: "courses", label: "Course Breakdown" },
    { id: "cgpa", label: "CGPA Analysis" },
    { id: "predictions", label: "Predictions" },
  ]

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "improving":
        return <TrendingUp className="w-5 h-5 text-green-500" />
      case "stable":
        return <Target className="w-5 h-5 text-blue-500" />
      case "needs_attention":
        return <TrendingDown className="w-5 h-5 text-red-500" />
      default:
        return <Minus className="w-5 h-5 text-yellow-500" />
    }
  }

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case "improving":
        return "text-green-500"
      case "stable":
        return "text-blue-500"
      case "needs_attention":
        return "text-red-500"
      default:
        return "text-yellow-500"
    }
  }

  const getGradeColor = (grade: string) => {
    const gradeValue = parseFloat(grade)
    if (gradeValue >= 3.5) return "text-green-500"
    if (gradeValue >= 2.5) return "text-yellow-500"
    return "text-red-500"
  }

  // console.log("Active Tab:", activeTab)
  // console.log("Course Progress:", courseProgress)

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="flex flex-wrap justify-between gap-3">
        <div className="flex min-w-72 flex-col gap-3">
          <h1 className="text-foreground tracking-light text-[32px] font-bold leading-tight">Progress Analytics</h1>
          <p className="text-muted-foreground text-sm font-normal leading-normal">
            Comprehensive analysis of your academic performance and projections
          </p>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-purple-600" />
            <div>
              <p className="text-2xl font-bold text-foreground">{calculateCGPA()}</p>
              <p className="text-sm text-muted-foreground">Current CGPA</p>
            </div>
          </div>
        </div>
        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-blue-600" />
            <div>
              <p className="text-2xl font-bold text-foreground">{courseProgress.length}</p>
              <p className="text-sm text-muted-foreground">Active Courses</p>
            </div>
          </div>
        </div>
        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-green-600" />
            <div>
              <p className="text-2xl font-bold text-foreground">{studyHabits.weeklyHours}h</p>
              <p className="text-sm text-muted-foreground">Weekly Study Time</p>
            </div>
          </div>
        </div>
        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center gap-2">
            <Brain className="w-5 h-5 text-orange-600" />
            <div>
              <p className="text-2xl font-bold text-foreground">{predictions.semesterCGPA}</p>
              <p className="text-sm text-muted-foreground">Projected CGPA</p>
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
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === "overall" && (
        <div className="space-y-6">
          {/* Overall Progress Chart */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-foreground text-lg font-semibold mb-4">Overall Academic Progress</h3>
            <div className="space-y-4">
              {courseProgress.map((course) => (
                <div key={course.id} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-foreground font-medium">{course.name}</span>
                    <div className="flex items-center gap-2">
                      {getTrendIcon(course.trend)}
                      <span className={`text-sm font-medium ${getTrendColor(course.trend)}`}>{course.progress}%</span>
                    </div>
                  </div>
                  <div className="w-full bg-border rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full transition-all duration-300"
                      style={{ width: `${course.progress}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Study Habits */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-foreground text-lg font-semibold mb-4">Study Habits Analysis</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Weekly Study Hours</span>
                  <span className="text-foreground font-medium">{studyHabits.weeklyHours}h</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Avg Session Length</span>
                  <span className="text-foreground font-medium">{studyHabits.averageSessionLength}h</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Preferred Study Time</span>
                  <span className="text-foreground font-medium">{studyHabits.preferredStudyTime}</span>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Most Productive Day</span>
                  <span className="text-foreground font-medium">{studyHabits.mostProductiveDay}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Consistency Score</span>
                  <span className="text-foreground font-medium">{studyHabits.consistency}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Focus Score</span>
                  <span className="text-foreground font-medium">{studyHabits.focusScore}%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "courses" && (
        <div className="space-y-4">
          {courseProgress.map((course) => (
            <div key={course.id} className="bg-card border border-border rounded-lg p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-foreground text-lg font-semibold">{course.name}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`text-lg font-bold ${getGradeColor(course.currentGrade)}`}>
                      {course.currentGrade}
                    </span>
                    <span className="text-muted-foreground text-sm">({course.gradePoints} GPA)</span>
                    {getTrendIcon(course.trend)}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-foreground">{course.progress}%</div>
                  <div className="text-sm text-muted-foreground">Complete</div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                <div className="text-center p-3 bg-muted rounded-lg">
                  <div className="text-lg font-bold text-foreground">
                    {course.assignments.completed}/{course.assignments.total}
                  </div>
                  <div className="text-sm text-muted-foreground">Assignments</div>
                  <div className="text-xs text-muted-foreground">Avg: {course.assignments.avgScore}%</div>
                </div>
                <div className="text-center p-3 bg-muted rounded-lg">
                  <div className="text-lg font-bold text-foreground">
                    {course.quizzes.completed}/{course.quizzes.total}
                  </div>
                  <div className="text-sm text-muted-foreground">Quizzes</div>
                  <div className="text-xs text-muted-foreground">Avg: {course.quizzes.avgScore}%</div>
                </div>
                <div className="text-center p-3 bg-muted rounded-lg">
                  <div className="text-lg font-bold text-foreground">
                    {course.exams.completed}/{course.exams.total}
                  </div>
                  <div className="text-sm text-muted-foreground">Exams</div>
                  <div className="text-xs text-muted-foreground">
                    Avg: {course.exams.avgScore > 0 ? `${course.exams.avgScore}%` : "N/A"}
                  </div>
                </div>
                <div className="text-center p-3 bg-muted rounded-lg">
                  <div className="text-lg font-bold text-foreground">{course.participation}%</div>
                  <div className="text-sm text-muted-foreground">Participation</div>
                  <div className="text-xs text-muted-foreground">Class Engagement</div>
                </div>
              </div>

              <div className="w-full bg-border rounded-full h-3">
                <div
                  className="bg-primary h-3 rounded-full transition-all duration-300"
                  style={{ width: `${course.progress}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === "cgpa" && (
        <div className="space-y-6">
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-foreground text-lg font-semibold mb-4">CGPA Breakdown</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="text-center mb-4">
                  <div className="text-4xl font-bold text-foreground mb-2">{calculateCGPA()}</div>
                  <div className="text-muted-foreground">Current CGPA</div>
                </div>
                <div className="space-y-2">
                  {courseProgress.map((course) => (
                    <div key={course.id} className="flex justify-between items-center">
                      <span className="text-muted-foreground text-sm">{course.name}</span>
                      <div className="flex items-center gap-2">
                        <span className={`font-medium ${getGradeColor(course.currentGrade)}`}>
                          {course.currentGrade}
                        </span>
                        <span className="text-muted-foreground text-sm">({course.gradePoints})</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="text-foreground font-semibold mb-3">Grade Distribution</h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total Credits</span>
                    <span className="text-foreground font-medium">
                      {courseProgress.reduce((sum, course) => sum + course.credits, 0)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Grade Points Earned</span>
                    <span className="text-foreground font-medium">
                      {courseProgress.reduce((sum, course) => sum + course.gradePoints * course.credits, 0).toFixed(1)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Projected Semester CGPA</span>
                    <span className="text-foreground font-medium">{predictions.semesterCGPA}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "predictions" && (
        <div className="space-y-6">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 dark:bg-blue-900 dark:border-blue-700 dark:text-blue-100">
            <div className="flex items-center gap-2 mb-2">
              <Brain className="w-5 h-5 text-blue-600 dark:text-blue-300" />
              <h3 className="text-blue-900 font-semibold dark:text-blue-100">AI-Powered Academic Predictions</h3>
            </div>
            <p className="text-blue-800 text-sm dark:text-blue-200">
              Based on your study habits, quiz results, assignment scores, and test outcomes, here are our predictions
              for your academic performance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-foreground text-lg font-semibold mb-4">Projected Final Grades</h3>
              <div className="space-y-3">
                {Object.entries(predictions.projectedGrades).map(([course, grade]) => (
                  <div key={course} className="flex justify-between items-center">
                    <span className="text-muted-foreground text-sm">{course}</span>
                    <span className={`font-medium ${getGradeColor(grade)}`}>{grade}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-foreground text-lg font-semibold mb-4">Recommendations</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="text-foreground font-medium mb-2">Improvement Areas</h4>
                  <div className="space-y-1">
                    {predictions.improvementAreas.map((area, index) => (
                      <div key={index} className="text-muted-foreground text-sm">
                        • {area}
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-foreground font-medium mb-2">Your Strengths</h4>
                  <div className="space-y-1">
                    {predictions.strengths.map((strength, index) => (
                      <div key={index} className="text-muted-foreground text-sm">
                        • {strength}
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-foreground font-medium mb-2">Recommended Study Time</h4>
                  <p className="text-muted-foreground text-sm">
                    Increase to {predictions.recommendedStudyTime} hours/week for optimal performance
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
