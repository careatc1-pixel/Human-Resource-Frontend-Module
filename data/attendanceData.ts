export type AttendanceStatus = "present" | "absent" | "late" | "half-day" | "on-leave" | "holiday"

export interface Employee {
  id: string
  name: string
  initials: string
  department: string
  role: string
  punchIn: string | null
  punchOut: string | null
  status: AttendanceStatus
  workHours: number | null
  avatar?: string
}

export interface AttendanceRecord {
  date: string
  employees: Employee[]
}

export const departments = ["All", "Engineering", "Design", "HR", "Finance", "Marketing", "Operations"]

export const todayStats = {
  total: 124,
  present: 108,
  absent: 5,
  late: 7,
  onLeave: 4,
}

export const employees: Employee[] = [
  { id: "E001", name: "Priya Sharma",    initials: "PS", department: "Engineering", role: "Sr. Developer",   punchIn: "09:02", punchOut: "18:14", status: "present",  workHours: 9.2  },
  { id: "E002", name: "Rahul Mehta",     initials: "RM", department: "Engineering", role: "Frontend Dev",    punchIn: "09:47", punchOut: "18:30", status: "late",     workHours: 8.7  },
  { id: "E003", name: "Anita Desai",     initials: "AD", department: "HR",          role: "HR Manager",      punchIn: "09:00", punchOut: "17:58", status: "present",  workHours: 9.0  },
  { id: "E004", name: "Kiran Rao",       initials: "KR", department: "Finance",     role: "Accountant",      punchIn: null,    punchOut: null,    status: "absent",   workHours: null },
  { id: "E005", name: "Suresh Kumar",    initials: "SK", department: "Operations",  role: "Ops Lead",        punchIn: "09:05", punchOut: null,    status: "present",  workHours: null },
  { id: "E006", name: "Divya Nair",      initials: "DN", department: "Design",      role: "UX Designer",     punchIn: "09:01", punchOut: "13:30", status: "half-day", workHours: 4.5  },
  { id: "E007", name: "Amit Joshi",      initials: "AJ", department: "Marketing",   role: "Marketing Exec",  punchIn: null,    punchOut: null,    status: "on-leave", workHours: null },
  { id: "E008", name: "Sneha Pillai",    initials: "SP", department: "Engineering", role: "Backend Dev",     punchIn: "08:58", punchOut: "18:02", status: "present",  workHours: 9.1  },
  { id: "E009", name: "Vikram Singh",    initials: "VS", department: "Finance",     role: "Finance Head",    punchIn: "10:12", punchOut: "18:45", status: "late",     workHours: 8.5  },
  { id: "E010", name: "Neha Gupta",      initials: "NG", department: "Design",      role: "Graphic Designer", punchIn: "09:03", punchOut: "18:00", status: "present", workHours: 9.0  },
  { id: "E011", name: "Arjun Reddy",     initials: "AR", department: "Engineering", role: "DevOps",          punchIn: "09:00", punchOut: "18:30", status: "present",  workHours: 9.5  },
  { id: "E012", name: "Meera Iyer",      initials: "MI", department: "HR",          role: "HR Executive",    punchIn: null,    punchOut: null,    status: "absent",   workHours: null },
  { id: "E013", name: "Rohan Patel",     initials: "RP", department: "Marketing",   role: "Content Lead",    punchIn: "09:15", punchOut: "18:10", status: "present",  workHours: 8.9  },
  { id: "E014", name: "Kavita Sharma",   initials: "KS", department: "Operations",  role: "Coordinator",     punchIn: null,    punchOut: null,    status: "on-leave", workHours: null },
  { id: "E015", name: "Deepak Nair",     initials: "DN2",department: "Engineering", role: "QA Engineer",     punchIn: "10:31", punchOut: "18:00", status: "late",     workHours: 7.5  },
]

export const weeklyData = [
  { day: "Mon", present: 112, absent: 8, late: 4 },
  { day: "Tue", present: 115, absent: 5, late: 4 },
  { day: "Wed", present: 108, absent: 6, late: 10 },
  { day: "Thu", present: 110, absent: 7, late: 7  },
  { day: "Fri", present: 108, absent: 5, late: 7  },
]

export const leaveRequests = [
  { id: "L001", name: "Suresh Kumar",  initials: "SK", department: "Operations", type: "Casual",   days: 2, from: "Apr 30", to: "May 1",  status: "pending"  },
  { id: "L002", name: "Neha Gupta",    initials: "NG", department: "Design",      type: "Sick",     days: 1, from: "May 2",  to: "May 2",  status: "pending"  },
  { id: "L003", name: "Arjun Reddy",   initials: "AR", department: "Engineering", type: "Earned",   days: 5, from: "May 5",  to: "May 9",  status: "pending"  },
  { id: "L004", name: "Rohan Patel",   initials: "RP", department: "Marketing",   type: "Casual",   days: 1, from: "May 3",  to: "May 3",  status: "approved" },
]

// Avatar color mapping for initials
export const avatarColors: Record<string, string> = {
  PS: "bg-violet-100 text-violet-700",
  RM: "bg-blue-100 text-blue-700",
  AD: "bg-emerald-100 text-emerald-700",
  KR: "bg-rose-100 text-rose-700",
  SK: "bg-amber-100 text-amber-700",
  DN: "bg-pink-100 text-pink-700",
  AJ: "bg-indigo-100 text-indigo-700",
  SP: "bg-teal-100 text-teal-700",
  VS: "bg-orange-100 text-orange-700",
  NG: "bg-cyan-100 text-cyan-700",
  AR: "bg-lime-100 text-lime-700",
  MI: "bg-fuchsia-100 text-fuchsia-700",
  RP: "bg-sky-100 text-sky-700",
  KS: "bg-red-100 text-red-700",
}

// Employee monthly stats (placeholder - replace with API data)
export const employeeMonthlyStats = {
  present: 18,
  absent: 1,
  late: 2,
}

// Monthly stats configuration for detail sheet
export const monthlyStatsConfig = [
  { label: "Present", value: employeeMonthlyStats.present, color: "text-emerald-600" },
  { label: "Absent", value: employeeMonthlyStats.absent, color: "text-rose-500" },
  { label: "Late", value: employeeMonthlyStats.late, color: "text-amber-500" },
]