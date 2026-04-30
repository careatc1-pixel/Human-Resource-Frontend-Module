"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { BarChart3,  ChevronRight,  Clock, CheckCircle2, AlertCircle,Circle,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  stats,
  recentActivity,
  pendingTasks,
  type ActivityStatus,
} from "@/data/crmDashboardData";

function ActivityIcon({ status }: { status: ActivityStatus }) {
  if (status === "success")
    return <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />;
  if (status === "alert")
    return <AlertCircle className="h-4 w-4 text-rose-500 shrink-0" />;
  return <Circle className="h-4 w-4 text-amber-400 shrink-0" />;
}

export default function DashboardPage() {
  const params = useParams<{ lang?: string }>();
  const lang = typeof params?.lang === "string" ? params.lang : "en";
  const withLang = (path: string) =>
    `/${lang}${path.startsWith("/") ? path : `/${path}`}`;

  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="space-y-8 pb-10">
      {/* Header */}
      <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">
            Good morning, Hemant 👋
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">{today}</p>
        </div>
        <Button asChild variant="outline" size="sm" className="w-fit">
          <Link href={withLang("/crm/reports")}>
            <BarChart3 className="h-4 w-4 mr-2" />
            View Reports
          </Link>
        </Button>
      </div>

      {/* KPI Stats */}
      <section aria-label="Key metrics">
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {stats.map((s) => (
            <Card key={s.label} className="border border-border/60">
              <CardContent className="p-4">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="text-xs text-muted-foreground truncate">
                      {s.label}
                    </p>
                    <p className="text-3xl font-semibold tracking-tight mt-1">
                      {s.value}
                    </p>
                    <p
                      className={`text-xs mt-1 ${
                        s.deltaPositive === true
                          ? "text-emerald-600 dark:text-emerald-400"
                          : s.deltaPositive === false
                            ? "text-rose-500"
                            : "text-muted-foreground"
                      }`}
                    >
                      {s.delta}
                    </p>
                  </div>
                  <div className={`rounded-lg p-2 shrink-0 ${s.bg}`}>
                    <s.icon
                      className={`h-5 w-5 ${s.color}`}
                      aria-hidden="true"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Main grid: Tasks + Activity */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
        {/* Pending Tasks — wider */}
        <Card className="lg:col-span-3 border border-border/60">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium">
                Pending Tasks
              </CardTitle>
              <Button
                asChild
                variant="ghost"
                size="sm"
                className="text-xs h-7 px-2 text-muted-foreground"
              >
                <Link href={withLang("/crm/task")}>
                  View all <ChevronRight className="h-3 w-3 ml-1" />
                </Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent className="pt-0 space-y-1">
            {pendingTasks.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-10 text-center gap-2">
                <CheckCircle2 className="h-8 w-8 text-emerald-400" />
                <p className="text-sm text-muted-foreground">
                  All caught up! No pending tasks.
                </p>
              </div>
            ) : (
              pendingTasks.map((task, i) => (
                <div key={task.id}>
                  <div className="flex items-start gap-3 py-2.5">
                    <Clock
                      className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm leading-snug text-foreground">
                        {task.label}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge
                          variant="secondary"
                          className="text-xs px-1.5 py-0 font-normal"
                        >
                          {task.tag}
                        </Badge>
                        <span
                          className={`text-xs ${
                            task.urgent
                              ? "text-rose-500 font-medium"
                              : "text-muted-foreground"
                          }`}
                        >
                          Due {task.due}
                        </span>
                      </div>
                    </div>
                  </div>
                  {i < pendingTasks.length - 1 && <Separator />}
                </div>
              ))
            )}
          </CardContent>
        </Card>

        {/* Recent Activity — narrower */}
        <Card className="lg:col-span-2 border border-border/60">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0 space-y-0">
            {recentActivity.length === 0 ? (
              <p className="text-sm text-muted-foreground py-8 text-center">
                No recent activity.
              </p>
            ) : (
              recentActivity.map((item, i) => (
                <div key={item.id}>
                  <div className="flex items-start gap-3 py-2.5">
                    <Avatar className="h-7 w-7 shrink-0 text-xs">
                      <AvatarFallback className="text-[10px] bg-muted">
                        {item.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium leading-tight text-foreground">
                        {item.name}
                      </p>
                      <p className="text-xs text-muted-foreground leading-snug mt-0.5 truncate">
                        {item.action}
                      </p>
                    </div>
                    <div className="flex flex-col items-end gap-1 shrink-0">
                      <ActivityIcon status={item.status} />
                      <span className="text-[10px] text-muted-foreground whitespace-nowrap">
                        {item.time}
                      </span>
                    </div>
                  </div>
                  {i < recentActivity.length - 1 && <Separator />}
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
