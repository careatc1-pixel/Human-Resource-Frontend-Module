import data from "@/data/companies.json"
import AdminTable from "@/components/AdminTable"

export default function Page() {

  const tableData = data.map((c) => ({
    id: c.id,
    name: c.name,
    subText: c.industry,
    amount: c.revenue,
    date: c.joined,
    employees: c.employees,
    status: c.status,
  }))

  return (
    <div className="p-6">
      <AdminTable data={tableData} />
    </div>
  )
}