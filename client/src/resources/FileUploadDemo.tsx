/**
 * FileUploadDemo.tsx
 *
 * Demonstrates file upload functionality and related features.
 * - Shows AI course suggestions, manual override, and visual feedback.
 * - Designed for extensibility and demo purposes.
 * - Uses TSDoc for all exported functions/components.
 */

import type {UploadedFile } from "../interfaces/interfaces"
import { useState } from "react"
import FileUploadSuccess from "./FileUploadSuccess"
import { Upload, Plus } from "lucide-react"

/**
 * FileUploadDemo
 *
 * Renders the file upload demo UI, including feature highlights and upload logic.
 * Handles file selection, upload, and feedback display.
 */
export default function FileUploadDemo() {
  const [showSuccessPage, setShowSuccessPage] = useState(false)
  const [uploadedFile, setUploadedFile] = useState<unknown>(null)

  const courses = [
    {
      id: "psych-101",
      name: "Introduction to Psychology",
      code: "PSYC 101",
      instructor: "Dr. Olivia Bennett",
    },
    {
      id: "math-201",
      name: "Advanced Mathematics",
      code: "MATH 201",
      instructor: "Prof. Michael Lee",
    },
    {
      id: "cs-301",
      name: "Machine Learning",
      code: "CS 301",
      instructor: "Dr. Elena Garcia",
    },
    {
      id: "phys-201",
      name: "Quantum Physics",
      code: "PHYS 201",
      instructor: "Dr. James Wilson",
    },
    {
      id: "cs-101",
      name: "Computer Science Fundamentals",
      code: "CS 101",
      instructor: "Prof. Sarah Kim",
    },
  ]

  const sampleFiles = [
    {
      id: "1",
      name: "Psychology_Research_Methods.pdf",
      size: "2.3 MB",
      type: "pdf",
      uploadTime: "just now",
    },
    {
      id: "2",
      name: "Calculus_Problem_Set_3.pdf",
      size: "1.8 MB",
      type: "pdf",
      uploadTime: "just now",
    },
    {
      id: "3",
      name: "ML_Neural_Networks_Notes.docx",
      size: "1.2 MB",
      type: "docx",
      uploadTime: "just now",
    },
    {
      id: "4",
      name: "Quantum_Mechanics_Lab_Report.pdf",
      size: "3.1 MB",
      type: "pdf",
      uploadTime: "just now",
    },
    {
      id: "5",
      name: "Programming_Assignment_Final.py",
      size: "45 KB",
      type: "py",
      uploadTime: "just now",
    },
  ]

  const handleFileUpload = (file: unknown) => {
    setUploadedFile(file)
    setShowSuccessPage(true)
  }

  const handleAssociate = (fileId: string, courseId: string) => {
    const course = courses.find((c) => c.id === courseId)
    const file = sampleFiles.find((f) => f.id === fileId)
    alert(`File "${file?.name}" has been successfully associated with "${course?.name}"!`)
    setShowSuccessPage(false)
    setUploadedFile(null)
  }

  const handleCancel = () => {
    setShowSuccessPage(false)
    setUploadedFile(null)
  }

  if (showSuccessPage && uploadedFile) {
    return (
      <FileUploadSuccess
        uploadedFile={uploadedFile as UploadedFile}
        courses={courses}
        onAssociate={handleAssociate}
        onCancel={handleCancel}
      />
    )
  }

  return (
    <div className="min-h-screen bg-background text-foreground p-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-card rounded-lg shadow-sm border border-border p-6 mb-6">
          <h1 className="text-2xl font-bold text-foreground mb-2">File Upload Demo</h1>
          <p className="text-muted-foreground mb-6">
            Click on any sample file below to simulate the upload success page with AI course suggestions.
          </p>

          {/* Upload Area */}
          <div className="border-2 border-dashed border-border rounded-lg p-8 text-center mb-6">
            <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">Upload your files</h3>
            <p className="text-muted-foreground mb-4">Drag and drop files here or click to browse</p>
            <button className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors">
              <Plus className="w-4 h-4" />
              Choose Files
            </button>
          </div>

          {/* Sample Files */}
          <div>
            <h2 className="text-lg font-semibold text-foreground mb-4">Sample Files (Click to Test)</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {sampleFiles.map((file) => (
                <button
                  key={file.id}
                  onClick={() => handleFileUpload(file)}
                  className="text-left p-4 border border-border rounded-lg hover:border-primary hover:bg-muted transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">{file.type === "pdf" ? "📄" : file.type === "docx" ? "📝" : "📁"}</div>
                    <div className="flex-1">
                      <h3 className="font-medium text-foreground">{file.name}</h3>
                      <p className="text-muted-foreground text-sm">{file.size}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Feature Highlights */}
        <div className="bg-card rounded-lg shadow-sm border border-border p-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">Features Demonstrated</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-purple-600">🧠</span>
              </div>
              <div>
                <h3 className="font-medium text-foreground">AI Course Suggestions</h3>
                <p className="text-muted-foreground text-sm">Analyzes filename to suggest relevant courses</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-blue-600">📋</span>
              </div>
              <div>
                <h3 className="font-medium text-foreground">Manual Override</h3>
                <p className="text-muted-foreground text-sm">Dropdown to manually select any course</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-green-600">✅</span>
              </div>
              <div>
                <h3 className="font-medium text-foreground">Visual Feedback</h3>
                <p className="text-muted-foreground text-sm">Clear status indicators and confirmation</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-orange-600">🎯</span>
              </div>
              <div>
                <h3 className="font-medium text-foreground">Smart Analysis</h3>
                <p className="text-muted-foreground text-sm">Keyword matching for accurate suggestions</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
