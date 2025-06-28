import { useState, useEffect } from "react"
import { CheckCircle, Brain, ChevronDown, Calendar, Tag, ArrowRight, X } from "lucide-react"
import type { FileUploadSuccessProps } from "../interfaces/interfaces"
import type { Course } from "../interfaces/interfaces"

export default function FileUploadSuccess({ uploadedFile, courses, onAssociate, onCancel }: FileUploadSuccessProps) {
    const [selectedCourse, setSelectedCourse] = useState<string>("")
    const [aiSuggestion, setAiSuggestion] = useState<Course | null>(null)
    const [isAnalyzing, setIsAnalyzing] = useState(true)
    const [showDropdown, setShowDropdown] = useState(false)
    const [hasAcceptedSuggestion, setHasAcceptedSuggestion] = useState(false)
    const [isAssociating, setIsAssociating] = useState(false)

    // AI analysis to suggest course based on filename
    useEffect(() => {
        const analyzeFileName = async () => {
            setIsAnalyzing(true)

            // Simulate AI analysis delay
            await new Promise((resolve) => setTimeout(resolve, 2000))

            const fileName = uploadedFile.name.toLowerCase()
            let suggestedCourse: Course | null = null

            // AI logic to match filename with courses
            if (
                fileName.includes("psych") ||
                fileName.includes("psychology") ||
                fileName.includes("brain") ||
                fileName.includes("cognitive")
            ) {
                suggestedCourse = courses.find((c) => c.name.toLowerCase().includes("psychology")) || null
            } else if (
                fileName.includes("math") ||
                fileName.includes("calculus") ||
                fileName.includes("algebra") ||
                fileName.includes("equation")
            ) {
                suggestedCourse = courses.find((c) => c.name.toLowerCase().includes("math")) || null
            } else if (
                fileName.includes("ml") ||
                fileName.includes("machine") ||
                fileName.includes("learning") ||
                fileName.includes("neural") ||
                fileName.includes("ai")
            ) {
                suggestedCourse = courses.find((c) => c.name.toLowerCase().includes("machine learning")) || null
            } else if (fileName.includes("physics") || fileName.includes("quantum") || fileName.includes("mechanics")) {
                suggestedCourse = courses.find((c) => c.name.toLowerCase().includes("physics")) || null
            } else if (
                fileName.includes("cs") ||
                fileName.includes("computer") ||
                fileName.includes("programming") ||
                fileName.includes("code")
            ) {
                suggestedCourse = courses.find((c) => c.name.toLowerCase().includes("computer science")) || null
            }

            setAiSuggestion(suggestedCourse)
            setIsAnalyzing(false)
        }

        analyzeFileName()
    }, [uploadedFile.name, courses])

    const handleAcceptSuggestion = () => {
        if (aiSuggestion) {
            setSelectedCourse(aiSuggestion.id)
            setHasAcceptedSuggestion(true)
        }
    }

    const handleManualSelection = (courseId: string) => {
        setSelectedCourse(courseId)
        setHasAcceptedSuggestion(false)
        setShowDropdown(false)
    }

    const handleAssociate = async () => {
        if (!selectedCourse) return

        setIsAssociating(true)

        // Simulate association process
        await new Promise((resolve) => setTimeout(resolve, 1500))

        onAssociate(uploadedFile.id, selectedCourse)
    }

    const getFileIcon = (type: string) => {
        switch (type) {
            case "pdf":
                return "📄"
            case "doc":
            case "docx":
                return "📝"
            case "ppt":
            case "pptx":
                return "📊"
            case "jpg":
            case "jpeg":
            case "png":
                return "🖼️"
            case "mp4":
            case "avi":
                return "🎥"
            default:
                return "📁"
        }
    }

    const selectedCourseData = courses.find((c) => c.id === selectedCourse)

    return (
        <div className="min-h-screen bg-background flex items-center justify-center p-4">
            <div className="bg-card rounded-lg shadow-lg max-w-2xl w-full p-8">
                {/* Success Header */}
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <CheckCircle className="w-8 h-8 text-green-600" />
                    </div>
                    <h1 className="text-2xl font-bold text-foreground mb-2">File Uploaded Successfully!</h1>
                    <p className="text-muted-foreground">Your file has been uploaded and is ready to be associated with a course.</p>
                </div>

                {/* File Information */}
                <div className="bg-muted rounded-lg p-4 mb-6">
                    <div className="flex items-center gap-4">
                        <div className="text-3xl">{getFileIcon(uploadedFile.type)}</div>
                        <div className="flex-1">
                            <h3 className="font-semibold text-foreground">{uploadedFile.name}</h3>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                                <span>{uploadedFile.size}</span>
                                <div className="flex items-center gap-1">
                                    <Calendar className="w-4 h-4" />
                                    <span>Uploaded {uploadedFile.uploadTime}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* AI Analysis Section */}
                <div className="mb-6">
                    <div className="flex items-center gap-2 mb-4">
                        <Brain className="w-5 h-5 text-purple-600" />
                        <h2 className="text-lg font-semibold text-foreground">AI Course Analysis</h2>
                    </div>

                    {isAnalyzing ? (
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                            <div className="flex items-center gap-3">
                                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
                                <span className="text-blue-800">Analyzing file name to suggest relevant course...</span>
                            </div>
                        </div>
                    ) : aiSuggestion ? (
                        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                            <div className="flex items-start justify-between">
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Brain className="w-4 h-4 text-purple-600" />
                                        <span className="text-sm font-medium text-purple-800">AI Suggestion</span>
                                    </div>
                                    <h3 className="font-semibold text-foreground">{aiSuggestion.name}</h3>
                                    <p className="text-sm text-muted-foreground">{aiSuggestion.instructor}</p>
                                    <p className="text-xs text-purple-700 mt-1">Based on filename analysis: "{uploadedFile.name}"</p>
                                </div>
                                {!hasAcceptedSuggestion && selectedCourse !== aiSuggestion.id && (
                                    <button
                                        onClick={handleAcceptSuggestion}
                                        className="px-4 py-2 bg-purple-600 text-white rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors"
                                    >
                                        Accept Suggestion
                                    </button>
                                )}
                            </div>
                            {hasAcceptedSuggestion && selectedCourse === aiSuggestion.id && (
                                <div className="mt-3 flex items-center gap-2 text-sm text-green-700">
                                    <CheckCircle className="w-4 h-4" />
                                    <span>AI suggestion accepted</span>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="bg-muted border border-border rounded-lg p-4">
                            <div className="flex items-center gap-2 text-muted-foreground">
                                <Brain className="w-4 h-4" />
                                <span className="text-sm">No specific course suggestion found based on filename</span>
                            </div>
                        </div>
                    )}
                </div>

                {/* Manual Course Selection */}
                <div className="mb-6">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-semibold text-foreground">Select Course</h2>
                        {aiSuggestion && <span className="text-muted-foreground text-sm">Or choose a different course manually</span>}
                    </div>

                    <div className="relative">
                        <button
                            onClick={() => setShowDropdown(!showDropdown)}
                            className="w-full flex items-center justify-between px-4 py-3 border border-border rounded-lg bg-card hover:border-border transition-colors"
                        >
                            <span className={selectedCourse ? "text-foreground" : "text-muted-foreground"}>
                                {selectedCourseData ? selectedCourseData.name : "Select a course..."}
                            </span>
                            <ChevronDown
                                className={`w-5 h-5 text-muted-foreground transition-transform ${showDropdown ? "rotate-180" : ""}`}
                            />
                        </button>

                        {showDropdown && (
                            <div className="absolute top-full left-0 right-0 mt-1 bg-card border border-border rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto">
                                {courses.map((course) => (
                                    <button
                                        key={course.id}
                                        onClick={() => handleManualSelection(course.id)}
                                        className={`w-full text-left px-4 py-3 hover:bg-muted transition-colors border-b border-border last:border-b-0 ${selectedCourse === course.id ? "bg-blue-50 text-blue-900" : ""}`}
                                    >
                                        <div className="font-medium text-foreground">{course.name}</div>
                                        <div className="text-sm text-muted-foreground">{course.instructor}</div>
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Selected Course Display */}
                {selectedCourse && (
                    <div className="mb-6">
                        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                            <div className="flex items-center gap-2 mb-2">
                                <Tag className="w-4 h-4 text-green-600" />
                                <span className="text-sm font-medium text-green-800">Selected Course</span>
                                {hasAcceptedSuggestion && (
                                    <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">AI Suggested</span>
                                )}
                            </div>
                            <h3 className="font-semibold text-foreground">{selectedCourseData?.name}</h3>
                            <p className="text-sm text-muted-foreground">{selectedCourseData?.instructor}</p>
                        </div>
                    </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-3">
                    <button
                        onClick={onCancel}
                        className="flex-1 px-6 py-3 border border-border text-foreground rounded-lg font-medium hover:bg-muted transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleAssociate}
                        disabled={!selectedCourse || isAssociating}
                        className="flex-1 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 disabled:bg-muted disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
                    >
                        {isAssociating ? (
                            <>
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-foreground"></div>
                                Associating...
                            </>
                        ) : (
                            <>
                                Associate File
                                <ArrowRight className="w-4 h-4" />
                            </>
                        )}
                    </button>
                </div>

                {/* Close button */}
                <button
                    type="button"
                    aria-label="Close"
                    onClick={onCancel}
                    className="absolute top-4 right-4 p-2 text-muted-foreground hover:text-foreground transition-colors"
                >
                    <X className="w-5 h-5" />
                </button>
            </div>
        </div>
    )
}
