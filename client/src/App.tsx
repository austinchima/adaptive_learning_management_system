/**
 * App.tsx
 *
 * Main entry point for the Adaptive Learning Platform client UI.
 * - Handles global layout, navigation, and theme state.
 * - Ensures content is always horizontally centered regardless of sidebar state.
 * - Sidebar overlays content and does not affect centering.
 * - All main routes/components are rendered based on activeTab.
 * - Theme is persisted in localStorage and applied to the document root.
 */
import { useState, useEffect } from "react"
import AppNavbar from "./navbar/AppNavbar"
import { StudentDashboard } from "../src/home/StudentDashboard"
import { ProgressAnalytics } from "../src/home/ProgressAnalytics"
import { PersonalisedRecommendations } from "../src/home/PersonalisedRecommendations"
import { ProfileSettings } from "../src/settings/ProfileSettings"
import { CourseContentDisplay } from "../src/courses/CourseContentDisplay"
import { CoursesListPage } from "../src/courses/CoursesListPage"
import { ResourcesPage } from "../src/resources/ResourcesPage"
import { AssessmentsPage } from "../src/courses/AssessmentsPage"
import type { CourseContent } from "./interfaces/interfaces"
import { sampleCourses } from "./data/sample/courses"

/**
 * AdaptiveLearningPlatform
 *
 * Root React component for the app. Manages global state (active tab, selected course, theme, sidebar collapse).
 * Ensures content is always centered and sidebar overlays content.
 */
export default function AdaptiveLearningPlatform() {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [selectedCourse, setSelectedCourse] = useState<CourseContent | undefined>(undefined)
  const [theme, setTheme] = useState<'light' | 'dark'>('light')
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)

  useEffect(() => {
    // Persist theme and apply to document root
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  /**
   * Handles course selection from anywhere in the app.
   * Also sets the active tab to 'courses'.
   * Accepts undefined to clear selection.
   */
  const handleCourseSelect = (course?: CourseContent) => {
    setSelectedCourse(course);
    setActiveTab("courses");
  };

  // Demo student profile (replace with real user data in production)
  const studentProfile = {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
    level: "Undergraduate"
  };

  return (
    <div className="flex min-h-screen bg-background text-foreground overflow-x-hidden">
      <AppNavbar
        studentProfile={studentProfile}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        courses={sampleCourses}
        selectedCourse={selectedCourse}
        onCourseSelect={handleCourseSelect}
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
      />
      <main className="flex-1 w-full min-w-0">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 max-w-[1400px]">
          <div className="w-full max-w-full">
            {activeTab === "dashboard" && (
              <StudentDashboard
                studentProfile={studentProfile}
                onCourseSelect={handleCourseSelect}
              />
            )}
            {activeTab === "courses" && selectedCourse && (
              <CourseContentDisplay
                course={selectedCourse}
                studentProfile={studentProfile}
                onBack={() => setSelectedCourse(undefined)}
              />
            )}
            {activeTab === "courses" && !selectedCourse && (
              <CoursesListPage
                studentProfile={studentProfile}
                onCourseSelect={handleCourseSelect}
                onAddCourse={() => {}}
                onUploadMaterial={() => {}}
              />
            )}
            {activeTab === "assessments" && <AssessmentsPage studentProfile={studentProfile} themeProp={theme} />}
            {activeTab === "progress" && <ProgressAnalytics studentProfile={studentProfile} themeProp={theme} />}
            {activeTab === "recommendations" && (
              <PersonalisedRecommendations studentProfile={studentProfile} />
            )}
            {activeTab === "resources" && <ResourcesPage studentProfile={studentProfile} />}
            {activeTab === "profile" && (
              <ProfileSettings
                studentProfile={studentProfile}
                onToggleTheme={() => setTheme(theme === 'light' ? 'dark' : 'light')}
                currentTheme={theme}
              />
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
