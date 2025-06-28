/**
 * ProfileSettings.tsx
 *
 * User profile and preferences settings for the Adaptive Learning Platform.
 * - Allows editing/viewing of personal info, theme, notifications, and security settings.
 * - Theme selection logic ensures idempotent switching and system preference support.
 * - Uses TSDoc for all exported functions/components.
 */
import type { ProfileSettingsProps } from "../interfaces/interfaces"
import { useState } from "react"
import { Moon, Sun, Bell, Lock, User, Palette } from "lucide-react"

/**
 * ProfileSettings
 *
 * Renders the profile settings page, including theme, notification, and security preferences.
 * Handles idempotent theme switching and disables redundant toggles.
 */
export function ProfileSettings({ studentProfile, onToggleTheme, currentTheme }: ProfileSettingsProps) {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true)
  const [emailNotifications, setEmailNotifications] = useState(true)

  const handleThemeChange = (theme: "light" | "dark") => {
    if (theme !== currentTheme) {
      onToggleTheme(theme)
    }
  }

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="flex flex-wrap justify-between gap-3">
        <div className="flex min-w-72 flex-col gap-3">
          <h1 className="text-foreground tracking-light text-[32px] font-bold leading-tight">Profile Settings</h1>
          <p className="text-muted-foreground text-sm font-normal leading-normal">
            Manage your profile, preferences, and notifications.
          </p>
        </div>
      </div>

      {/* Profile Information */}
      <div className="bg-card border border-border rounded-lg shadow-sm p-6">
        <div className="flex items-center gap-4 mb-6">
          <User className="w-6 h-6 text-foreground" />
          <h2 className="text-lg font-semibold text-foreground">Personal Information</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-muted-foreground mb-1">
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              value={studentProfile.name}
              className="w-full px-3 py-2 border border-border rounded-lg bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              readOnly
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-muted-foreground mb-1">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={studentProfile.email}
              className="w-full px-3 py-2 border border-border rounded-lg bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              readOnly
            />
          </div>
        </div>
      </div>

      {/* Theme Settings */}
      <div className="bg-card border border-border rounded-lg shadow-sm p-6">
        <div className="flex items-center gap-4 mb-6">
          <Palette className="w-6 h-6 text-foreground" />
          <h2 className="text-lg font-semibold text-foreground">Theme Settings</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
            onClick={() => handleThemeChange("light")}
            className={`flex flex-col items-center justify-center p-4 border rounded-lg transition-colors ${currentTheme === "light" ? "border-primary bg-muted" : "border-border bg-background hover:bg-muted"}`}
          >
            <Sun className={`w-6 h-6 mb-2 ${currentTheme === 'dark' ? 'text-white' : 'text-black'}`} />
            <span className={`text-sm font-medium ${currentTheme === 'dark' ? 'text-white' : 'text-black'}`}>Light</span>
          </button>
          <button
            onClick={() => handleThemeChange("dark")}
            className={`flex flex-col items-center justify-center p-4 border rounded-lg transition-colors ${currentTheme === "dark" ? "border-foreground bg-muted" : "border-border bg-background hover:bg-muted"}`}
          >
            <Moon className={`w-6 h-6 mb-2 ${currentTheme === 'dark' ? 'text-white' : 'text-black'}`} />
            <span className={`text-sm font-medium ${currentTheme === 'dark' ? 'text-white' : 'text-black'}`}>Dark</span>
          </button>
        </div>
      </div>

      {/* Notification Settings */}
      <div className="bg-card border border-border rounded-lg shadow-sm p-6">
        <div className="flex items-center gap-4 mb-6">
          <Bell className="w-6 h-6 text-foreground" />
          <h2 className="text-lg font-semibold text-foreground">Notification Preferences</h2>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label htmlFor="toggleNotifications" className="text-foreground font-medium cursor-pointer">
              Enable all notifications
            </label>
            <input
              type="checkbox"
              id="toggleNotifications"
              checked={notificationsEnabled}
              onChange={() => setNotificationsEnabled(!notificationsEnabled)}
              className="sr-only peer"
              aria-label="Toggle all notifications"
            />
            <div className="relative w-11 h-6 bg-muted-foreground peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary rounded-full peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:border-gray-300 after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary" />
          </div>
          <div className="flex items-center justify-between">
            <label htmlFor="emailNotifications" className="text-foreground font-medium cursor-pointer">
              Email Notifications
            </label>
            <input
              type="checkbox"
              id="emailNotifications"
              checked={emailNotifications}
              onChange={() => setEmailNotifications(!emailNotifications)}
              className="sr-only peer"
              disabled={!notificationsEnabled} // Disable if all notifications are off
              aria-label="Toggle email notifications"
            />
            <div
              className={`relative w-11 h-6 rounded-full peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:border-gray-300 after:rounded-full after:h-5 after:w-5 after:transition-all ${
                notificationsEnabled
                  ? "bg-muted-foreground peer-checked:bg-primary peer-checked:after:translate-x-full peer-checked:after:border-white"
                  : "bg-gray-200 cursor-not-allowed"
              }`}
            />
          </div>
        </div>
      </div>

      {/* Security Settings */}
      <div className="bg-card border border-border rounded-lg shadow-sm p-6">
        <div className="flex items-center gap-4 mb-6">
          <Lock className="w-6 h-6 text-foreground" />
          <h2 className="text-lg font-semibold text-foreground">Security</h2>
        </div>
        <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors">
          Change Password
        </button>
      </div>
    </div>
  )
}
