"use client";
import ColumnVisibilityMenu from "@/global/elements/table/ColumnVisibilityMenu";
import { UniversalTable } from "@/global/elements/table/UniversalTable";
import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { toast } from "react-toastify";
type Status = "Active" | "Trial" | "Churned" | "Suspended";

type Company = {
  id: string;
  name: string;
  industry: string;
  amount: number;
  date: string;
  status: Status;
  employees: number;
};
type Column<T> = {
  key: string;
  label: string;
  cell: (row: T) => React.ReactNode;
  stickyRight?: boolean;
  sortable?: boolean;
};
type AdminPanelTableProps = {
  companiesData: Company[];
};
const AdminPanelTable = ({ companiesData }: AdminPanelTableProps) => {
  const companyColumns: Column<Company>[] = [
    {
      key: "id",
      label: "ID",
      cell: (row) => <span className="text-sm">{row.id}</span>,
    },

    {
      key: "company",
      label: "Company",
      cell: (row) => (
        <div className="flex items-center gap-3">
          <div
            className="w-9 h-9 flex items-center justify-center rounded-full 
bg-slate-900 text-white text-sm font-semibold shadow-sm"
          >
            {" "}
            {row.name?.charAt(0)}
          </div>
          <div className="flex flex-col">
            <span className="font-medium">{row.name}</span>
            <span className="text-xs text-muted-foreground">
              {row.industry}
            </span>
          </div>
        </div>
      ),
    },

    {
      key: "amount",
      label: "Amount",
      cell: (row) => (
        <span className="font-medium">${row.amount.toLocaleString()}</span>
      ),
    },

    {
      key: "date",
      label: "Date",
      cell: (row) => <span>{row.date}</span>,
    },

    {
      key: "status",
      label: "Status",
      cell: (row) => {
        const statusStyles = {
          Active: "bg-green-50 text-green-600 border border-green-200",
          Trial: "bg-yellow-50 text-yellow-600 border border-yellow-200",
          Churned: "bg-red-50 text-red-600 border border-red-200",
          Suspended: "bg-gray-100 text-gray-600 border border-gray-200",
        };

        return (
          <span
            className={`px-2.5 py-1 text-xs rounded-full font-medium ${statusStyles[row.status]}`}
          >
            {row.status}
          </span>
        );
      },
    },

    {
      key: "employees",
      label: "Employees",
      cell: (row) => <span>{row.employees}</span>,
    },

    {
      key: "actions",
      label: "Actions",
      stickyRight: true,
      sortable: false,
      cell: (row: Company) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            {/* View */}
            <DropdownMenuItem
              onClick={() => {
                console.log("View", row);
              }}
            >
              View
            </DropdownMenuItem>

            {/* Copy ID */}
            <DropdownMenuItem
              onClick={() => {
                navigator.clipboard.writeText(row.id);
                toast.success("ID copied");
              }}
            >
              Copy ID
            </DropdownMenuItem>

            {/* Edit */}
            <DropdownMenuItem
              onClick={() => {
                console.log("Edit", row);
              }}
            >
              Edit
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            {/* Delete */}
            <DropdownMenuItem
              className="bg-destructive/80 hover:bg-destructive text-white font-semibold"
              onClick={() => {
                console.log("Delete", row);
              }}
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];
  const [visibleColumns, setVisibleColumns] = useState<string[]>(
    companyColumns.map((c) => c.key as string),
  );

  const toggleColumn = (key: string) => {
    setVisibleColumns((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key],
    );
  };

  const fields = companyColumns.filter((col) =>
    visibleColumns.includes(col.key as string),
  );
  return (
    <>
      {" "}
      <div className="space-y-3">
        <div className="flex justify-end">
          <ColumnVisibilityMenu
            allColumns={companyColumns}
            visibleColumns={visibleColumns}
            toggleColumn={toggleColumn}
          />
        </div>

        <UniversalTable<Company>
          initialPageSize={10}
          data={[...companiesData].sort(
            (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
          )}
          fields={fields}
          searchColumnKey="name"
        />
      </div>
    </>
  );
};

export default AdminPanelTable;
