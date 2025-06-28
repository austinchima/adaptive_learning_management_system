import type { PersonalisedRecommendationsProps } from "../interfaces/interfaces"

export function PersonalisedRecommendations({ studentProfile }: PersonalisedRecommendationsProps) {
  const recommendedPaths = [
    {
      id: 1,
      title: "Data Science Fundamentals",
      description: "Master the basics of data analysis, machine learning, and data visualization.",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCNzlZXV_S-hnD49Lal9rc9BnNaA6AX7RpK689OcEciycxkX--jaHXSV5RFau0TU2CbD5fr2zZIWZBDssj975RgwCMaZxl0t6Vclna5I82QRbaqQKUEWFRSAnVvZovP6jSultmLBPTabNtafVcn_ha0MlE5hP_R3E4rnJewpcPUaIdbgJ5_ZVJuyr6QtY2gSeJviHBp3VbMiN7gI4khLxK3dZ2N0t4SM0f5Dxt45L0uuy4uFTdH6XkpQWIUUeLezf1MyU4rH9wCW4W2",
    },
    {
      id: 2,
      title: "Creative Writing Workshop",
      description: "Develop your storytelling skills and explore different writing genres.",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCmpkZ8CvvR6WGQogeoveo60NneGSCOewZFSKM0IBhmi62y9jPZhx3aOpHOXtTrJAyi9qB9aEItglsd1TZEuY9GVZT_1sWz1nARUWPt5bhlUs3ITHprzC9xU20stJVGWsIZ95Aj-d5WiGAw7tmD4fYxCmVatHBQYk5cAGAd8J8ja4TvMF3pSNoucYzDa-aUoiqiC-bKyjeqfS9oxYbsvxeoke6RLtzK3bqYuRIz4NqBQj8CEF2ApUoBuLVpLGSgnGDFsyfZFdzMHOQT",
    },
  ]

  const suggestedCourses = [
    {
      id: 1,
      title: "Advanced Python Programming",
      description: "Dive deeper into Python with advanced concepts and practical applications.",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCZ4WVZEOmrYckXJzLjpaPnyVJQkTwtRW7mwJPEgcRqSDpWG7915xxgdsnUZfiuNTvMowZbILv-YsZ6ZvtS4RN0DmgvxWnZOfHExT5gaKpbv1b91vhzK0-LyRUlDU1LV2iH-7L42rc6A4JNR42WnmKTETaqqv3hprCJWvFYTpa6vAStRHz83zZU0iruS4HTF6NdwUct5QuWtnGkvmHuQcmIxQ81RhIWlSGjjyoHehxsUwxiM_36GsytJIfpRNtD0Gw4XtfXQN5AnKzX",
    },
    {
      id: 2,
      title: "Digital Marketing Strategies",
      description: "Learn the latest digital marketing techniques to grow your online presence.",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDQ6mceH9YVZdZ0eAlYl3ao4JLgzDPjXIJAEHdjwxIEWozYvvZLQC5WudwhA1y4glxk3FRvHs1wa2_-jKSlVJbOQQLprfpo4z3FOre-MQlZYxNR1vNf3y34VOUf2WAhFAm7O8KOIiu2DALOn-CIALnzUMPRGiNc2lbE5z162bbI9-7Tbbg3gUKANKVulAW6s4fFs0OmJgHjOAkWMhhXewMoNN8OPWhSvXnhAGrr-qEvrLq65Awb8icpe3HaRubwftHEW5EyjrFcv0yt",
    },
  ]

  return (
    <div className="px-40 flex flex-1 justify-center py-5 bg-background text-foreground">
      <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
        <div className="flex flex-wrap justify-between gap-3 p-4">
          <div className="flex min-w-72 flex-col gap-3">
            <p className="text-foreground tracking-light text-[32px] font-bold leading-tight">
              Personalized Learning Paths for {studentProfile.name}
            </p>
            <p className="text-muted-foreground text-sm font-normal leading-normal">
              Based on your progress and interests, we've curated these learning paths to help you achieve your goals.
            </p>
          </div>
        </div>
        <h3 className="text-foreground text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">
          Recommended Paths
        </h3>
        {recommendedPaths.map((path) => (
          <div key={path.id} className="p-4">
            <div className="flex items-stretch justify-between gap-4 rounded-lg bg-card p-4 shadow-sm border border-border">
              <div className="flex flex-[2_2_0px] flex-col gap-4">
                <div className="flex flex-col gap-1">
                  <p className="text-foreground text-base font-bold leading-tight">{path.title}</p>
                  <p className="text-muted-foreground text-sm font-normal leading-normal">{path.description}</p>
                </div>
                <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-8 px-4 flex-row-reverse bg-muted text-foreground text-sm font-medium leading-normal w-fit">
                  <span className="truncate">Explore</span>
                </button>
              </div>
              <div
                className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-lg flex-1"
                style={{ backgroundImage: `url(${path.image})` }}
              />
            </div>
          </div>
        ))}
        <h3 className="text-foreground text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">
          Suggested Courses
        </h3>
        {suggestedCourses.map((course) => (
          <div key={course.id} className="p-4">
            <div className="flex items-stretch justify-between gap-4 rounded-lg bg-card p-4 shadow-sm border border-border">
              <div className="flex flex-[2_2_0px] flex-col gap-4">
                <div className="flex flex-col gap-1">
                  <p className="text-foreground text-base font-bold leading-tight">{course.title}</p>
                  <p className="text-muted-foreground text-sm font-normal leading-normal">{course.description}</p>
                </div>
                <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-8 px-4 flex-row-reverse bg-muted text-foreground text-sm font-medium leading-normal w-fit">
                  <span className="truncate">Enroll</span>
                </button>
              </div>
              <div
                className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-lg flex-1"
                style={{ backgroundImage: `url(${course.image})` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
