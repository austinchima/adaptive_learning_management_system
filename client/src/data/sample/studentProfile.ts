import type { StudentProfile } from '../../interfaces/interfaces'

export const sampleStudentProfile: StudentProfile = {
  id: "student-001",
  name: "Austin Chima",
  email: "austinchima@example.com",
  level: "Beginner",
  subjects: ["Mathematics", "Physics", "Computer Science"],
  progress: {
    mathematics: 85,
    physics: 72,
    computerScience: 90,
  },
  streakDays: 15,
  totalPoints: 3200,
  avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuCTpqiXZXy_c9mroVpGABoi1Jpjc3pbhzyeWqu-9zyFDOmTD6swEPoxd86zozietrvJcTOGGeYFyNM5hjbEnth8X7L9UjOjf1Frzwl8IA7s8eQ66Hv41nflrWO2vl3UEs8QDTQYH9I7zJC0nhoVVXVs5R5npJ__Abk87_wljICEFQ4WVVxXzcm3BZwHozIWo8BZcHD2CHVlzOxFHNI6DFE30k56flRPkAQFAFWPe9w22oF3IdOyr7McK8wcqodoDwuTj4aLvJA_m7Gn"
} 