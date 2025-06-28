import type { ResourcesPageProps, Resource } from "../interfaces/interfaces"
import { useState } from "react"
import { FileText, Download, Eye, Calendar, Search, Upload, Plus } from "lucide-react"


export function ResourcesPage({ studentProfile }: ResourcesPageProps) {
    const [searchTerm, setSearchTerm] = useState("")
    const [filterType, setFilterType] = useState("all")
    const [filterCourse, setFilterCourse] = useState("all")
    const [sortBy, setSortBy] = useState("date-desc")

    const [resources] = useState<Resource[]>([
        {
            id: "1",
            name: "Psychology Research Methods Guide.pdf",
            type: "pdf",
            size: "2.3 MB",
            uploadDate: "2024-05-15",
            uploadTime: "14:30",
            course: "Introduction to Psychology",
            category: "reference",
            description: "Comprehensive guide to research methodologies in psychology",
        },
        {
            id: "2",
            name: "Calculus Problem Set 3.pdf",
            type: "pdf",
            size: "1.8 MB",
            uploadDate: "2024-05-14",
            uploadTime: "09:15",
            course: "Advanced Mathematics",
            category: "assignment",
            description: "Problem set covering integration techniques",
        },
        {
            id: "3",
            name: "ML Algorithm Implementation.py",
            type: "other",
            size: "45 KB",
            uploadDate: "2024-05-13",
            uploadTime: "16:45",
            course: "Machine Learning",
            category: "project",
            description: "Python implementation of linear regression algorithm",
        },
        {
            id: "4",
            name: "Quantum Physics Lecture Notes.docx",
            type: "doc",
            size: "3.2 MB",
            uploadDate: "2024-05-12",
            uploadTime: "11:20",
            course: "Quantum Physics",
            category: "notes",
            description: "Detailed notes from quantum mechanics lectures",
        },
        {
            id: "5",
            name: "Brain Anatomy Diagram.png",
            type: "image",
            size: "1.5 MB",
            uploadDate: "2024-05-11",
            uploadTime: "13:10",
            course: "Introduction to Psychology",
            category: "reference",
            description: "Detailed diagram of brain structures and functions",
        },
        {
            id: "6",
            name: "Vector Calculus Presentation.pptx",
            type: "ppt",
            size: "4.7 MB",
            uploadDate: "2024-05-10",
            uploadTime: "10:30",
            course: "Advanced Mathematics",
            category: "notes",
            description: "Presentation slides on vector field analysis",
        },
        {
            id: "7",
            name: "Neural Network Tutorial.mp4",
            type: "video",
            size: "125 MB",
            uploadDate: "2024-05-09",
            uploadTime: "15:45",
            course: "Machine Learning",
            category: "reference",
            description: "Video tutorial on building neural networks from scratch",
        },
        {
            id: "8",
            name: "Lab Report Template.docx",
            type: "doc",
            size: "890 KB",
            uploadDate: "2024-05-08",
            uploadTime: "08:20",
            course: "Quantum Physics",
            category: "assignment",
            description: "Template for physics lab report submissions",
        },
    ])

    const getFileIcon = (type: string) => {
        switch (type) {
            case "pdf":
                return "📄"
            case "doc":
                return "📝"
            case "ppt":
                return "📊"
            case "video":
                return "🎥"
            case "image":
                return "🖼️"
            default:
                return "📁"
        }
    }

    const getCategoryColor = (category: string) => {
        switch (category) {
            case "assignment":
                return "bg-red-100 text-red-800"
            case "notes":
                return "bg-blue-100 text-blue-800"
            case "reference":
                return "bg-green-100 text-green-800"
            case "project":
                return "bg-purple-100 text-purple-800"
            default:
                return "bg-gray-100 text-gray-800"
        }
    }

    const formatDateTime = (date: string, time: string) => {
        const dateObj = new Date(`${date}T${time}`)
        return {
            date: dateObj.toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
            }),
            time: dateObj.toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
            }),
        }
    }

    const filteredResources = resources
        .filter((resource) => {
            const matchesSearch =
                resource.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                resource.course.toLowerCase().includes(searchTerm.toLowerCase()) ||
                resource.description?.toLowerCase().includes(searchTerm.toLowerCase())
            const matchesType = filterType === "all" || resource.type === filterType
            const matchesCourse = filterCourse === "all" || (filterCourse === "my-subjects" ? studentProfile.subjects.includes(resource.course) : resource.course === filterCourse)
            return matchesSearch && matchesType && matchesCourse
        })
        .sort((a, b) => {
            switch (sortBy) {
                case "date-desc":
                    return (
                        new Date(`${b.uploadDate}T${b.uploadTime}`).getTime() -
                        new Date(`${a.uploadDate}T${a.uploadTime}`).getTime()
                    )
                case "date-asc":
                    return (
                        new Date(`${a.uploadDate}T${a.uploadTime}`).getTime() -
                        new Date(`${b.uploadDate}T${b.uploadTime}`).getTime()
                    )
                case "name-asc":
                    return a.name.localeCompare(b.name)
                case "name-desc":
                    return b.name.localeCompare(a.name)
                case "size-desc":
                    return Number.parseFloat(b.size) - Number.parseFloat(a.size)
                case "size-asc":
                    return Number.parseFloat(a.size) - Number.parseFloat(b.size)
                default:
                    return 0
            }
        })

    const courses = Array.from(new Set(resources.map((r) => r.course)))
    const fileTypes = Array.from(new Set(resources.map((r) => r.type)))

    return (
        <div className="p-4 space-y-6">
            {/* Header */}
            <div className="flex flex-wrap justify-between gap-3">
                <div className="flex min-w-72 flex-col gap-3">
                    <h1 className="text-foreground tracking-light text-[32px] font-bold leading-tight">Resources</h1>
                    <p className="text-muted-foreground text-sm font-normal leading-normal">
                        Manage your uploaded documents and course materials
                    </p>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors">
                    <Upload className="w-4 h-4" />
                    Upload File
                </button>
            </div>

            {/* Upload Area */}
            <div className="border-2 border-dashed border-border rounded-lg p-6 text-center bg-card">
                <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-foreground text-base font-medium mb-1">Upload new resources</p>
                <p className="text-muted-foreground text-sm mb-3">Drag and drop files here or click to browse</p>
                <button className="flex items-center gap-2 mx-auto px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium">
                    <Plus className="w-4 h-4" />
                    Choose Files
                </button>
            </div>

            {/* Search and Filters */}
            <div className="flex flex-wrap gap-4 items-center">
                <div className="relative flex-1 min-w-64">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <input
                        type="text"
                        placeholder="Search resources..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-card text-card-foreground"
                    />
                </div>

                <select
                    aria-label="Filter by type"
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                    className="px-4 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-card text-card-foreground"
                >
                    <option value="all">All Types</option>
                    {fileTypes.map((type) => (
                        <option key={type} value={type}>
                            {type.toUpperCase()}
                        </option>
                    ))}
                </select>

                <select
                    value={filterCourse}
                    onChange={(e) => setFilterCourse(e.target.value)}
                    className="px-4 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-card text-card-foreground"
                    aria-label="Filter by course"
                >
                    <option value="all">All Courses</option>
                    <option value="my-subjects">My Subjects</option>
                    {courses.map((course) => (
                        <option key={course} value={course}>
                            {course}
                        </option>
                    ))}
                </select>

                <select
                    aria-label="Sort by"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-4 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-card text-card-foreground"
                >
                    <option value="date-desc">Newest First</option>
                    <option value="date-asc">Oldest First</option>
                    <option value="name-asc">Name A-Z</option>
                    <option value="name-desc">Name Z-A</option>
                    <option value="size-desc">Largest First</option>
                    <option value="size-asc">Smallest First</option>
                </select>
            </div>

            {/* Resources List */}
            <div className="space-y-3">
                {filteredResources.map((resource) => {
                    const { date, time } = formatDateTime(resource.uploadDate, resource.uploadTime)
                    return (
                        <div
                            key={resource.id}
                            className="bg-card border border-border rounded-lg p-4 hover:shadow-sm transition-shadow"
                        >
                            <div className="flex items-center gap-4">
                                <div className="text-2xl">{getFileIcon(resource.type)}</div>

                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-1">
                                        <h3 className="text-foreground font-medium truncate">{resource.name}</h3>
                                        <span
                                            className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(resource.category)}`}
                                        >
                                            {resource.category}
                                        </span>
                                    </div>
                                    *
                                    <p className="text-muted-foreground text-sm mb-2 line-clamp-1">{resource.description}</p>

                                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                        <span className="font-medium">{resource.course}</span>
                                        <span>{resource.size}</span>
                                        <div className="flex items-center gap-1">
                                            <Calendar className="w-3 h-3" />
                                            <span>
                                                {date} at {time}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2">
                                    <button
                                        className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors"
                                        title="View resource"
                                        aria-label="View resource"
                                    >
                                        <Eye className="w-4 h-4" />
                                    </button>
                                    <button
                                        className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors"
                                        title="Download resource"
                                        aria-label="Download resource"
                                    >
                                        <Download className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>

            {filteredResources.length === 0 && (
                <div className="text-center py-12 bg-card rounded-lg border border-border">
                    <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground text-lg">No resources found matching your criteria.</p>
                    <p className="text-muted-foreground text-sm">Try adjusting your search or filters.</p>
                </div>
            )}

            {/* Summary Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-6 border-t border-border">
                <div className="text-center bg-card p-4 rounded-lg shadow-sm">
                    <p className="text-2xl font-bold text-foreground">{resources.length}</p>
                    <p className="text-sm text-muted-foreground">Total Files</p>
                </div>
                <div className="text-center bg-card p-4 rounded-lg shadow-sm">
                    <p className="text-2xl font-bold text-foreground">
                        {Math.round(resources.reduce((sum, r) => sum + Number.parseFloat(r.size), 0))} MB
                    </p>
                    <p className="text-sm text-muted-foreground">Total Size</p>
                </div>
                <div className="text-center bg-card p-4 rounded-lg shadow-sm">
                    <p className="text-2xl font-bold text-foreground">{courses.length}</p>
                    <p className="text-sm text-muted-foreground">Courses</p>
                </div>
                <div className="text-center bg-card p-4 rounded-lg shadow-sm">
                    <p className="text-2xl font-bold text-foreground">
                        {resources.filter((r) => r.uploadDate === "2024-05-15").length}
                    </p>
                    <p className="text-sm text-muted-foreground">Today</p>
                </div>
            </div>
        </div>
    )
}
