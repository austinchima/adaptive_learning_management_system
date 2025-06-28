import { useState } from "react"
import { Play, ArrowRight } from "lucide-react"
import type { InteractiveLessonProps } from "../interfaces/interfaces"

export function InteractiveLesson({ lessonData }: InteractiveLessonProps) {
  const [lessonProgress] = useState(lessonData.progress)
  const [activeTab, setActiveTab] = useState("content")

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "content", label: "Content" },
    { id: "assessment", label: "Assessment" },
  ]

  const keyConcepts = lessonData.keyConcepts || [
    {
      id: 1,
      title: "Core Concept",
      description: "Description of the core concept",
      icon: "📚",
    },
    {
      id: 2,
      title: "Key Principle",
      description: "Description of the key principle",
      icon: "🎯",
    },
    {
      id: 3,
      title: "Main Application",
      description: "Description of the main application",
      icon: "💡",
    },
    {
      id: 4,
      title: "Advanced Topic",
      description: "Description of the advanced topic",
      icon: "🚀",
    },
  ]

  return (
    <div className="flex flex-col max-w-[960px] flex-1 bg-background text-foreground">
      <div className="flex flex-wrap gap-2 p-4">
        <a className="text-muted-foreground text-base font-medium leading-normal" href="#">
          Home
        </a>
        <span className="text-muted-foreground text-base font-medium leading-normal">/</span>
        <span className="text-foreground text-base font-medium leading-normal">Lessons</span>
      </div>
      <h2 className="text-foreground tracking-light text-[28px] font-bold leading-tight px-4 text-left pb-3 pt-5">
        Lesson: {lessonData.title}
      </h2>
      <div className="flex flex-col gap-3 p-4">
        <div className="flex gap-6 justify-between">
          <p className="text-foreground text-base font-medium leading-normal">Lesson Progress</p>
          <p className="text-foreground text-sm font-normal leading-normal">{lessonProgress}%</p>
        </div>
        <div className="rounded bg-border">
          <div className="h-2 rounded bg-primary" style={{ width: `${lessonProgress}%` }} />
        </div>
      </div>
      <div className="pb-3">
        <div className="flex border-b border-border px-4 gap-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-col items-center justify-center border-b-[3px] pb-[13px] pt-4 ${
                activeTab === tab.id ? "border-b-primary text-primary-foreground" : "border-b-transparent text-muted-foreground"
              }`}
            >
              <p className="text-sm font-bold leading-normal tracking-[0.015em]">{tab.label}</p>
            </button>
          ))}
        </div>
      </div>

      {activeTab === "content" && (
        <>
          <h2 className="text-foreground text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
            Module 1: {lessonData.title}
          </h2>
          <p className="text-foreground text-base font-normal leading-normal pb-3 pt-1 px-4">
            {lessonData.description}
          </p>
          <div className="flex w-full grow bg-card p-4">
            <div className="w-full gap-1 overflow-hidden bg-card aspect-[3/2] rounded-lg flex">
              <div
                className="w-full bg-center bg-no-repeat bg-cover aspect-auto rounded-none flex-1"
                style={{
                  backgroundImage:
                    'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDyXiS-jARYfC9e1K3nsrxhM9AVQ3dGFOVhVWNLgH3Zm4zJonWkUIR5Qrx2U64TCNx4X31oef0moMotncr-oHr6CJbVjrKPHHLox8_Qp7VS8vNqUEDDZnIAVos1BK1x3yEetsB9U92HjgrNwOXarAAkYPU1EEV_GTM3ZTWL5Vm1NI5MUxtWPeRa-0T5NpnOcOQTTsCjza83x3ML8WIZBouPDIPaq0-FqQpN_Tg4ABkX3KJn49OPCARgtsR0ZrcJ_0ifNrVxhieMn_t_")',
                }}
              />
            </div>
          </div>
          <h2 className="text-foreground text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
            Key Concepts
          </h2>
          {keyConcepts.map((concept) => (
            <div key={concept.id} className="flex items-center gap-4 bg-card px-4 min-h-[72px] py-2">
              <div className="text-foreground flex items-center justify-center rounded-lg bg-muted shrink-0 size-12">
                <span className="text-2xl">{concept.icon}</span>
              </div>
              <div className="flex flex-col justify-center">
                <p className="text-foreground text-base font-medium leading-normal line-clamp-1">{concept.title}</p>
                <p className="text-muted-foreground text-sm font-normal leading-normal line-clamp-2">{concept.description}</p>
              </div>
            </div>
          ))}
          <h2 className="text-foreground text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
            Interactive Example
          </h2>
          <div className="p-4">
            <div
              className="relative flex items-center justify-center bg-primary-foreground bg-cover bg-center aspect-video rounded-lg p-4"
              style={{
                backgroundImage:
                  'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCKwf5_KfG9aE4bz0oOFBakUyM3maXQ5ui-ndK7uanGsJE-6fKbF7FgR93z0PyRUmlNA-F578gQL-bHGWexcMtR4uuTOS1eK52HvoRL0KEylELBVfO2_6mAtbM33K7hgSQr4vPJfJpzBOl8uxUcoVlmfu6X5b1qSLlZ6XXINnYdm-ZKLklcRRQfXkdpu39iflzLPF4R-VLJx4VgQPxQ9yW2SAbIKewP3ePrOLLYQ5o0Hb_3JdpCdulZKPyi1dMSfT-H2Dm7d7uT8Yxi")',
              }}
            >
              <button title="Play Video" className="flex shrink-0 items-center justify-center rounded-full size-16 bg-primary/40 text-primary-foreground">
                <Play className="w-6 h-6" />
              </button>
            </div>
          </div>
          <div className="flex px-4 py-3 justify-end">
            <button title="Next Content" className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-primary text-primary-foreground text-sm font-bold leading-normal tracking-[0.015em]">
              <span className="truncate">Next Module</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </button>
          </div>
        </>
      )}

      {activeTab === "overview" && (
        <div className="p-4">
          <h2 className="text-foreground text-[22px] font-bold leading-tight tracking-[-0.015em] pb-3">
            Course Overview
          </h2>
          <p className="text-muted-foreground text-base leading-normal">
            This comprehensive introduction to Artificial Intelligence covers fundamental concepts, applications, and
            real-world examples. You'll learn about machine learning, neural networks, and how AI is transforming
            various industries.
          </p>
        </div>
      )}

      {activeTab === "assessment" && (
        <div className="p-4">
          <h2 className="text-foreground text-[22px] font-bold leading-tight tracking-[-0.015em] pb-3">Assessment</h2>
          <p className="text-muted-foreground text-base leading-normal mb-4">
            Test your understanding of the concepts covered in this lesson.
          </p>
          <button className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium">Start Assessment</button>
        </div>
      )}
    </div>
  )
}
