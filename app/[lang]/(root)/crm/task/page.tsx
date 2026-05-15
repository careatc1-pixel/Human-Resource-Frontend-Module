"use client";

import {
  AlertCircle,
  Building2,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Flag,
  MoreHorizontal,
  Plus,
  Search,
  SlidersHorizontal,
  TrendingUp,
} from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const tasks = [
  {
    id: "TASK-001",
    title: "Improve frontend performance",
    employee: "Shivam Ghosh",
    department: "Engineering",
    priority: "High",
    status: "In Progress",
    progress: 70,
    dueDate: "28 May 2026",
  },
  {
    id: "TASK-002",
    title: "Design onboarding flow",
    employee: "Ritika Sharma",
    department: "Design",
    priority: "Medium",
    status: "To Do",
    progress: 20,
    dueDate: "02 Jun 2026",
  },
  {
    id: "TASK-003",
    title: "Fix payroll bugs",
    employee: "Aman Verma",
    department: "HR Tech",
    priority: "Critical",
    status: "Review",
    progress: 90,
    dueDate: "Today",
  },
  {
    id: "TASK-004",
    title: "Quarterly KPI review",
    employee: "Neha Singh",
    department: "Operations",
    priority: "Low",
    status: "Completed",
    progress: 100,
    dueDate: "Completed",
  },
];

const completedTasks = [
  {
    id: "TASK-006",
    title: "Fix authentication bugs",
    employee: "Karan Mehta",
  },
  {
    id: "TASK-007",
    title: "HR dashboard redesign",
    employee: "Neha Singh",
  },
  {
    id: "TASK-008",
    title: "Optimize payroll reports",
    employee: "Ritika Sharma",
  },
  {
    id: "TASK-009",
    title: "Employee onboarding flow",
    employee: "Rahul Jain",
  },
  {
    id: "TASK-010",
    title: "Attendance system fixes",
    employee: "Aman Verma",
  },
];

export default function TaskListPage() {
  return (
    <div className="min-h-screen bg-muted/30 p-6">
      <div className="mx-auto max-w-[1600px] space-y-6">

        {/* HEADER */}
        <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">

          <div>
            <p className="text-sm text-muted-foreground">
              HR / Goals / Tasks
            </p>

            <h1 className="mt-1 text-4xl font-bold tracking-tight">
              Track Tasks
            </h1>

            <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
              Define measurable goals, monitor employee progress,
              and track timelines efficiently.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              className="h-11 rounded-2xl px-5"
            >
              <CalendarDays className="mr-2 h-4 w-4" />
              Calendar View
            </Button>

            <Button className="h-11 rounded-2xl px-5">
              <Plus className="mr-2 h-4 w-4" />
              Create Goal
            </Button>
          </div>
        </div>

        {/* STATS */}
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">

          <StatsCard
            title="Total Tasks"
            value="48"
            icon={<TrendingUp className="h-5 w-5" />}
          />

          <StatsCard
            title="In Progress"
            value="18"
            icon={<Clock3 className="h-5 w-5" />}
          />

          <StatsCard
            title="Completed"
            value="20"
            icon={<CheckCircle2 className="h-5 w-5" />}
          />

          <StatsCard
            title="Overdue"
            value="10"
            icon={<AlertCircle className="h-5 w-5" />}
          />
        </div>

        {/* MAIN LAYOUT */}
        <div className="grid gap-6 xl:grid-cols-[340px_minmax(0,1fr)]">

          {/* LEFT SIDEBAR */}
          <aside className="overflow-hidden rounded-[28px] border bg-background shadow-sm">

            {/* HEADER */}
            <div className="border-b px-6 py-5">
              <div className="flex items-start justify-between">

                <div>
                  <h2 className="text-2xl font-semibold tracking-tight">
                    Completed Tasks
                  </h2>

                  <p className="mt-1 text-sm text-muted-foreground">
                    Recently completed goals
                  </p>
                </div>

                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-green-100 text-sm font-semibold text-green-700 dark:bg-green-900/30 dark:text-green-400">
                  {completedTasks.length}
                </div>
              </div>
            </div>

            {/* SEARCH */}
            <div className="border-b p-5">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                <Input
                  placeholder="Search completed..."
                  className="h-12 rounded-2xl border-0 bg-muted/50 pl-11 shadow-none"
                />
              </div>
            </div>

            {/* SCROLLABLE TASKS */}
            <ScrollArea className="h-[760px]">
              <div className="space-y-4 p-5">

                {completedTasks.map((task) => (
                  <button
                    key={task.id}
                    className="w-full rounded-3xl border bg-background p-5 text-left transition-all hover:border-green-200 hover:bg-green-50/40 hover:shadow-md dark:hover:border-green-900"
                  >
                    <div className="flex items-start gap-4">

                      {/* ICON */}
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-green-100 dark:bg-green-900/30">
                        <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />
                      </div>

                      {/* CONTENT */}
                      <div className="min-w-0 flex-1">

                        <h3 className="line-clamp-2 text-lg font-semibold leading-6 tracking-tight">
                          {task.title}
                        </h3>

                        <div className="mt-3 flex items-center gap-2">

                          <span className="rounded-lg bg-muted px-2.5 py-1 text-[11px] font-medium text-muted-foreground">
                            {task.id}
                          </span>

                          <span className="text-xs text-muted-foreground">
                            Completed
                          </span>
                        </div>

                        <div className="mt-5 flex items-center gap-3">

                          <Avatar className="h-9 w-9 border">
                            <AvatarFallback className="text-xs">
                              {task.employee
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>

                          <div className="min-w-0">
                            <p className="truncate text-sm font-medium">
                              {task.employee}
                            </p>

                            <p className="text-xs text-muted-foreground">
                              Assigned Employee
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </ScrollArea>
          </aside>

          {/* RIGHT CONTENT */}
          <div className="space-y-5">

            {/* FILTER BAR */}
            <div className="rounded-[28px] border bg-background/95 p-5 shadow-sm backdrop-blur">

              <div className="flex flex-col gap-4 2xl:flex-row 2xl:items-center 2xl:justify-between">

                {/* LEFT FILTERS */}
                <div className="flex flex-1 flex-col gap-3 xl:flex-row">

                  {/* SEARCH */}
                  <div className="relative w-full xl:max-w-md">
                    <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                    <Input
                      placeholder="Search tasks, employees, departments..."
                      className="h-12 rounded-2xl border-border/60 bg-muted/30 pl-11 pr-4 shadow-none"
                    />
                  </div>

                  {/* STATUS */}
                  <Select>
                    <SelectTrigger className="h-12 min-w-[170px] rounded-2xl bg-muted/20">
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-yellow-500" />
                        <SelectValue placeholder="Status" />
                      </div>
                    </SelectTrigger>

                    <SelectContent className="rounded-2xl">
                      <SelectItem value="all">
                        All Status
                      </SelectItem>

                      <SelectItem value="todo">
                        To Do
                      </SelectItem>

                      <SelectItem value="progress">
                        In Progress
                      </SelectItem>

                      <SelectItem value="review">
                        Review
                      </SelectItem>

                      <SelectItem value="completed">
                        Completed
                      </SelectItem>
                    </SelectContent>
                  </Select>

                  {/* PRIORITY */}
                  <Select>
                    <SelectTrigger className="h-12 min-w-[170px] rounded-2xl bg-muted/20">
                      <div className="flex items-center gap-2">
                        <Flag className="h-4 w-4 text-muted-foreground" />
                        <SelectValue placeholder="Priority" />
                      </div>
                    </SelectTrigger>

                    <SelectContent className="rounded-2xl">
                      <SelectItem value="all">
                        All Priority
                      </SelectItem>

                      <SelectItem value="low">
                        Low
                      </SelectItem>

                      <SelectItem value="medium">
                        Medium
                      </SelectItem>

                      <SelectItem value="high">
                        High
                      </SelectItem>

                      <SelectItem value="critical">
                        Critical
                      </SelectItem>
                    </SelectContent>
                  </Select>

                  {/* DEPARTMENT */}
                  <Select>
                    <SelectTrigger className="h-12 min-w-[190px] rounded-2xl bg-muted/20">
                      <div className="flex items-center gap-2">
                        <Building2 className="h-4 w-4 text-muted-foreground" />
                        <SelectValue placeholder="Department" />
                      </div>
                    </SelectTrigger>

                    <SelectContent className="rounded-2xl">
                      <SelectItem value="all">
                        All Departments
                      </SelectItem>

                      <SelectItem value="engineering">
                        Engineering
                      </SelectItem>

                      <SelectItem value="design">
                        Design
                      </SelectItem>

                      <SelectItem value="hr">
                        HR Tech
                      </SelectItem>

                      <SelectItem value="operations">
                        Operations
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* RIGHT ACTIONS */}
                <div className="flex flex-wrap items-center gap-2">

                  {/* TABS */}
                  <div className="flex items-center rounded-2xl border bg-muted/20 p-1">

                    <Button
                      size="sm"
                      className="h-9 rounded-xl px-4 shadow-none"
                    >
                      Assigned To Me
                    </Button>

                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-9 rounded-xl px-4 text-muted-foreground"
                    >
                      Created By Me
                    </Button>

                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-9 rounded-xl px-4 text-muted-foreground"
                    >
                      Archived
                    </Button>
                  </div>

                  {/* FILTER BUTTON */}
                  <Button
                    variant="outline"
                    className="h-12 rounded-2xl px-5"
                  >
                    <SlidersHorizontal className="mr-2 h-4 w-4" />
                    Filters
                  </Button>
                </div>
              </div>

              {/* ACTIVE FILTERS */}
              <div className="mt-4 flex flex-wrap items-center gap-2 border-t pt-4">

                <Badge
                  variant="secondary"
                  className="rounded-full px-3 py-1"
                >
                  In Progress
                </Badge>

                <Badge
                  variant="secondary"
                  className="rounded-full px-3 py-1"
                >
                  High Priority
                </Badge>

                <Badge
                  variant="secondary"
                  className="rounded-full px-3 py-1"
                >
                  Engineering
                </Badge>

                <button className="text-xs font-medium text-muted-foreground hover:text-foreground">
                  Clear all
                </button>
              </div>
            </div>

            {/* TASK TABLE */}
            <div className="overflow-hidden rounded-[28px] border bg-background shadow-sm">

              {/* HEADER */}
              <div className="border-b bg-muted/20 px-6 py-5">
                <div className="grid grid-cols-[2fr_1.3fr_1fr_1fr_1fr_1.2fr_1fr_60px] gap-4 text-sm font-semibold text-muted-foreground">

                  <div>Task</div>
                  <div>Employee</div>
                  <div>Department</div>
                  <div>Priority</div>
                  <div>Status</div>
                  <div>Progress</div>
                  <div>Due Date</div>
                  <div />
                </div>
              </div>

              {/* ROWS */}
              <div>
                {tasks.map((task, index) => (
                  <div
                    key={task.id}
                    className={`group px-6 py-5 transition-all hover:bg-muted/20 ${
                      index !== tasks.length - 1
                        ? "border-b"
                        : ""
                    }`}
                  >
                    <div className="grid grid-cols-[2fr_1.3fr_1fr_1fr_1fr_1.2fr_1fr_60px] items-center gap-4">

                      {/* TASK */}
                      <div>
                        <h3 className="text-base font-semibold">
                          {task.title}
                        </h3>

                        <p className="mt-1 text-sm text-muted-foreground">
                          {task.id}
                        </p>
                      </div>

                      {/* EMPLOYEE */}
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10 border">
                          <AvatarFallback>
                            {task.employee
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>

                        <p className="text-sm font-medium">
                          {task.employee}
                        </p>
                      </div>

                      {/* DEPARTMENT */}
                      <div className="text-sm text-muted-foreground">
                        {task.department}
                      </div>

                      {/* PRIORITY */}
                      <div>
                        <PriorityBadge
                          priority={task.priority}
                        />
                      </div>

                      {/* STATUS */}
                      <div>
                        <StatusBadge
                          status={task.status}
                        />
                      </div>

                      {/* PROGRESS */}
                      <div>
                        <div className="mb-2 flex items-center justify-between text-xs">
                          <span className="text-muted-foreground">
                            {task.progress}% completed
                          </span>
                        </div>

                        <div className="h-2 overflow-hidden rounded-full bg-muted">
                          <div
                            className="h-full rounded-full bg-black dark:bg-white"
                            style={{
                              width: `${task.progress}%`,
                            }}
                          />
                        </div>
                      </div>

                      {/* DATE */}
                      <div>
                        <p className="text-sm font-medium">
                          {task.dueDate}
                        </p>
                      </div>

                      {/* ACTION */}
                      <div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="rounded-xl opacity-0 transition-opacity group-hover:opacity-100"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatsCard({
  title,
  value,
  icon,
}: {
  title: string;
  value: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="rounded-[28px] border bg-background p-6 shadow-sm transition-all hover:shadow-md">
      <div className="flex items-center justify-between">

        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-muted">
          {icon}
        </div>

        <Badge variant="secondary">
          +12%
        </Badge>
      </div>

      <div className="mt-5">
        <p className="text-sm text-muted-foreground">
          {title}
        </p>

        <h3 className="mt-1 text-4xl font-bold tracking-tight">
          {value}
        </h3>
      </div>
    </div>
  );
}

function PriorityBadge({
  priority,
}: {
  priority: string;
}) {
  const styles: Record<string, string> = {
    Low: "bg-gray-100 text-gray-700",
    Medium: "bg-blue-100 text-blue-700",
    High: "bg-orange-100 text-orange-700",
    Critical: "bg-red-100 text-red-700",
  };

  return (
    <Badge
      className={`${styles[priority]} rounded-full px-3 py-1`}
      variant="secondary"
    >
      {priority}
    </Badge>
  );
}

function StatusBadge({
  status,
}: {
  status: string;
}) {
  const styles: Record<string, string> = {
    "To Do": "bg-gray-100 text-gray-700",
    "In Progress":
      "bg-yellow-100 text-yellow-700",
    Review: "bg-blue-100 text-blue-700",
    Completed: "bg-green-100 text-green-700",
  };

  return (
    <Badge
      className={`${styles[status]} rounded-full px-3 py-1`}
      variant="secondary"
    >
      {status}
    </Badge>
  );
}





















