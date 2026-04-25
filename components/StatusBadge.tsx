import { Badge } from "./ui/badge"

export default function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    Active: "bg-green-100 text-green-700",
    Trial: "bg-yellow-100 text-yellow-700",
    Churned: "bg-red-100 text-red-700",
    Suspended: "bg-gray-200 text-gray-700",
  }

  return (
    <Badge
      className={`rounded-full  font-bold inline-block ${styles[status]}  flex items-center justify-center `}
    >
      {status}
    </Badge>
  )
}