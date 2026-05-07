import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const allocatedLeaves = [
  { label: "Casual Leave", balance: 8, used: 4, tone: "bg-sky-500/10 text-sky-700 dark:text-sky-300" },
  { label: "Earned Leave", balance: 12, used: 3, tone: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300" },
  { label: "Sick Leave", balance: 6, used: 1, tone: "bg-amber-500/10 text-amber-700 dark:text-amber-300" },
  { label: "Leave Without Pay", balance: 0, used: 0, tone: "bg-rose-500/10 text-rose-700 dark:text-rose-300" },
];

export function AllocatedLeavesCard() {
  return (
    <Card className="border border-border/60 shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-base">Allocated Leaves</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 pt-0">
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
          {allocatedLeaves.map((leave) => (
            <div key={leave.label} className={`rounded-xl p-3 ${leave.tone}`}>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-medium">{leave.label}</p>
                  <p className="text-xs opacity-80">Current balance</p>
                </div>
                <Badge variant="secondary" className="bg-background/80 text-foreground">
                  {leave.balance} days
                </Badge>
              </div>
              <Separator className="my-3 bg-current/15" />
              <div className="flex items-center justify-between text-xs">
                <span>Used: {leave.used} days</span>
                <span>Available: {Math.max(leave.balance - leave.used, 0)} days</span>
              </div>
            </div>
          ))}
        </div>

        <div className="rounded-xl border border-dashed border-border/70 bg-muted/30 p-3">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Leave policy note
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            Leave balance is validated against the selected leave type before submission.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
