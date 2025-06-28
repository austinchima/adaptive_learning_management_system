/**
 * AppNavbar.tsx
 *
 * Sidebar navigation for the Adaptive Learning Platform.
 * - Fixed/overlay sidebar that does not affect main content centering.
 * - Supports collapse/expand for more screen space.
 * - Handles mobile and desktop navigation, including profile and tab switching.
 * - Courses navlink shows all courses as a page (no dropdown).
 */
import type { AppNavbarProps } from "../interfaces/interfaces"
import { Home, BookOpen, FileText, BarChart2, Lightbulb, User, Menu, X, ChevronLeft, ChevronRight } from "lucide-react"
import { useState } from "react"

/**
 * AppNavbar
 *
 * Renders the sidebar navigation. Handles collapse/expand, mobile menu, and tab switching.
 * Sidebar overlays content and does not push or shift the main content.
 */
export default function AppNavbar({ 
  studentProfile, 
  activeTab, 
  onTabChange, 
  onCourseSelect,
  isCollapsed = false,
  onToggleCollapse 
}: AppNavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: Home },
    { id: "courses", label: "Courses", icon: BookOpen },
    { id: "assessments", label: "Assessments", icon: FileText },
    { id: "progress", label: "Progress", icon: BarChart2 },
    { id: "recommendations", label: "Recommendations", icon: Lightbulb },
    { id: "resources", label: "Resources", icon: FileText },
    { id: "profile", label: "Profile", icon: User },
  ]

  // Helper for Courses nav: always navigates to the Courses List page and clears selection
  const handleCoursesNav = () => {
    onTabChange("courses")
    if (onCourseSelect) onCourseSelect(undefined)
    setIsMobileMenuOpen(false)
  }

  return (
    <>
      {/* Mobile Menu Button (shows/hides sidebar on small screens) */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="lg:hidden fixed top-4 right-4 z-50 p-2 rounded-lg bg-primary text-primary-foreground"
        aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
      >
        {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Sidebar (fixed/overlay, does not push content) */}
      <div className={`
        fixed lg:static inset-y-0 left-0 z-40
        ${isCollapsed ? 'w-20' : 'w-[280px] sm:w-64'} transform transition-all duration-200 ease-in-out
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        bg-background border-r border-border overflow-hidden
      `}>
        <div className="flex flex-col h-full">
          {/* Profile Section (hidden when collapsed) */}
          <div className={`p-4 border-b border-border ${isCollapsed ? 'hidden lg:block' : ''}`}>
            <div className="flex items-center gap-3 min-w-0">
              <img
                src={studentProfile.avatar}
                alt={studentProfile.name}
                className="w-10 h-10 rounded-full object-cover flex-shrink-0"
              />
              <div className="min-w-0">
                <h2 className="text-foreground font-medium truncate">{studentProfile.name}</h2>
              </div>
            </div>
          </div>

          {/* Collapse Toggle Button (desktop only) */}
          <button
            onClick={onToggleCollapse}
            className="hidden lg:flex items-center justify-center p-2 hover:bg-muted transition-colors"
            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {isCollapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
          </button>

          {/* Navigation */}
          <nav className="flex-1 p-4 overflow-y-auto">
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => {
                      if (item.id === "courses") {
                        handleCoursesNav()
                      } else {
                        onTabChange(item.id)
                        setIsMobileMenuOpen(false)
                      }
                    }}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                      activeTab === item.id ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                    }`}
                    title={isCollapsed ? item.label : undefined}
                  >
                    <item.icon className="w-5 h-5 flex-shrink-0" />
                    {!isCollapsed && <span className="truncate">{item.label}</span>}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      {/* Overlay for mobile */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  )
}


