"use client"

import { useState, type ElementType } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { AlertCircle, Building2, CalendarCheck2, Clock3, Users } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Sheet,SheetContent,SheetDescription, SheetHeader, SheetTitle,} from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import StatusBadge from "@/components/StatusBadge"
import { departments, employees, leaveRequests, todayStats, avatarColors, monthlyStatsConfig, type Employee } from "@/data/attendanceData"

interface Props {
  employee: Employee | null
  open: boolean
  onClose: () => void
}

function Detail({ icon: Icon, label, value }: { icon: ElementType; label: string; value: string }) {
  return (
    <div className="flex items-center gap-3 py-3">
      <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-muted shrink-0">
        <Icon className="h-4 w-4 text-muted-foreground" />
      </div>
      <div className="min-w-0">
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="text-sm font-medium truncate">{value}</p>
      </div>
    </div>
  )
}

export function EmployeeDetailSheet({ employee, open, onClose }: Props) {
  if (!employee) return null
  const colorClass = avatarColors[employee.initials] ?? "bg-slate-100 text-slate-700"

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent className="w-90 sm:w-100">
        <SheetHeader className="pb-4">
          <SheetTitle className="sr-only">Employee Attendance Detail</SheetTitle>
          <SheetDescription className="sr-only">Detailed attendance information for {employee.name}</SheetDescription>
          <div className="flex items-center gap-4 pt-2">
            <Avatar className="h-14 w-14">
              <AvatarFallback className={`text-base font-semibold ${colorClass}`}>
                {employee.initials}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="text-base font-semibold">{employee.name}</p>
              <p className="text-sm text-muted-foreground">{employee.role}</p>
              <div className="mt-1">
                <StatusBadge variant="attendance" status={employee.status} />
              </div>
            </div>
          </div>
        </SheetHeader>

        <Separator />

        <div className="py-2">
          <Detail icon={Building2} label="Employee ID" value={employee.id} />
          <Separator />
          <Detail icon={Building2} label="Department"   value={employee.department} />
          <Separator />
          <Detail icon={Building2} label="Role"         value={employee.role} />
          <Separator />
          <Detail icon={Clock3}    label="Punch In"     value={employee.punchIn ?? "—"} />
          <Separator />
          <Detail icon={Clock3}    label="Punch Out"    value={employee.punchOut ?? "—"} />
          <Separator />
          <Detail icon={Clock3}    label="Work Hours"   value={employee.workHours != null ? `${employee.workHours} hrs` : "—"} />
        </div>

        <Separator />

        <div className="pt-4">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">This Month</p>
          <div className="grid grid-cols-3 gap-2">
            {monthlyStatsConfig.map((s) => (
              <div key={s.label} className="rounded-lg bg-muted p-3 text-center">
                <p className={`text-xl font-semibold ${s.color}`}>{s.value}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}

export default function AttendancePage() {
  const params = useParams<{ lang?: string }>()
  const lang = typeof params?.lang === "string" ? params.lang : "en"
  const withLang = (path: string) => `/${lang}${path.startsWith("/") ? path : `/${path}`}`

  const [selectedDepartment, setSelectedDepartment] = useState<string>("All")
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null)

  const visibleEmployees =
    selectedDepartment === "All"
      ? employees
      : employees.filter((employee) => employee.department === selectedDepartment)

  const pendingRequests = leaveRequests.filter((request) => request.status === "pending")

  // Stats configuration
  const stats = [
    { label: "Total Employees", value: todayStats.total, icon: Users, accent: "text-slate-600", tone: "bg-slate-100" },
    { label: "Present", value: todayStats.present, icon: CalendarCheck2, accent: "text-emerald-600", tone: "bg-emerald-100" },
    { label: "Late", value: todayStats.late, icon: Clock3, accent: "text-amber-600", tone: "bg-amber-100" },
    { label: "On Leave", value: todayStats.onLeave, icon: AlertCircle, accent: "text-violet-600", tone: "bg-violet-100" },
  ]

  return (
    <div className="space-y-6 pb-10">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm text-muted-foreground">Attendance</p>
          <h1 className="text-2xl font-semibold tracking-tight">Daily punch-in overview</h1>
          <p className="text-sm text-muted-foreground mt-1">Track staff presence, late marks, and leave requests.</p>
        </div>
        <Button asChild variant="outline" size="sm" className="w-fit">
          <Link href={withLang("/crm")}>Back to CRM</Link>
        </Button>
      </div>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="border-border/60">
            <CardContent className="flex items-start justify-between p-4">
              <div>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
                <p className="mt-1 text-3xl font-semibold tracking-tight">{stat.value}</p>
              </div>
              <div className={`rounded-lg p-2 ${stat.tone}`}>
                <stat.icon className={`h-5 w-5 ${stat.accent}`} aria-hidden="true" />
              </div>
            </CardContent>
          </Card>
        ))}
      </section>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
        <Card className="border-border/60">
          <CardHeader className="flex flex-row items-center justify-between gap-4 pb-3">
            <CardTitle className="text-base font-medium">Employee attendance</CardTitle>
            <div className="flex flex-wrap gap-2">
              {departments.map((department) => (
                <Button
                  key={department}
                  type="button"
                  variant={selectedDepartment === department ? "default" : "outline"}
                  size="sm"
                  className="h-8"
                  onClick={() => setSelectedDepartment(department)}
                >
                  {department}
                </Button>
              ))}
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Employee</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Punch In</TableHead>
                  <TableHead>Punch Out</TableHead>
                  <TableHead className="text-right">Hours</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {visibleEmployees.map((employee) => (
                  <TableRow
                    key={employee.id}
                    className="cursor-pointer"
                    onClick={() => setSelectedEmployee(employee)}
                  >
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>{employee.initials}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium leading-none">{employee.name}</p>
                          <p className="text-xs text-muted-foreground mt-1">{employee.role}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{employee.department}</TableCell>
                    <TableCell>
                      <StatusBadge variant="attendance" status={employee.status} />
                    </TableCell>
                    <TableCell>{employee.punchIn ?? "—"}</TableCell>
                    <TableCell>{employee.punchOut ?? "—"}</TableCell>
                    <TableCell className="text-right">{employee.workHours != null ? `${employee.workHours} hrs` : "—"}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card className="border-border/60">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-medium">Pending leave requests</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {pendingRequests.map((request, index) => (
                <div key={request.id}>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-medium leading-none">{request.name}</p>
                      <p className="text-xs text-muted-foreground mt-1">{request.department} - {request.type} leave</p>
                    </div>
                    <Badge variant="secondary">{request.days} days</Badge>
                  </div>
                  {index < pendingRequests.length - 1 && <Separator className="mt-4" />}
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="border-border/60">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-medium">Quick summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              <p>{visibleEmployees.length} employees visible in the current filter.</p>
              <p>{todayStats.absent} people are marked absent today.</p>
              <p>{pendingRequests.length} leave requests still need review.</p>
            </CardContent>
          </Card>
        </div>
      </div>

      <EmployeeDetailSheet
        employee={selectedEmployee}
        open={selectedEmployee !== null}
        onClose={() => setSelectedEmployee(null)}
      />
    </div>
  )
}