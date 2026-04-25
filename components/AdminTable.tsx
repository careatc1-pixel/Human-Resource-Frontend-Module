"use client";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Eye, Pencil, Trash2 } from "lucide-react";
import StatusBadge from "./StatusBadge";

import AddCompany from "@/components/AddCompany"

type Row = {
  id: string;
  name: string;
  subText: string;
  amount?: string;
  date?: string;
  status: string;
};

export default function AdminTable({ data }: { data: Row[] }) {
  return (
    <div className="rounded-xl border bg-white shadow-sm overflow-hidden">
      <div className="p-4 border-b bg-white flex justify-between items-center">
        <Input placeholder="Search companies..." className="max-w-sm" />

        <AddCompany />
      </div>

      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50">
            <TableHead className="w-10">
              <Checkbox />
            </TableHead>
            <TableHead>ID</TableHead>
            <TableHead>Company</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {data.map((row) => (
            <TableRow key={row.id} className="hover:bg-gray-50">
              <TableCell>
                <Checkbox />
              </TableCell>

              <TableCell className="font-medium">{row.id}</TableCell>

              {/* COMPANY */}
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8 ">
                    <AvatarFallback >
                      {row.name[0]}
                    </AvatarFallback>
                  </Avatar>

                  <div className="leading-tight">
                    <p className="font-medium ">{row.name}</p>
                 <p className="text-muted-foreground text-xs">{row.subText}</p>
                  </div>
                </div>
              </TableCell>

              <TableCell>{row.amount}</TableCell>

              <TableCell>{row.date}</TableCell>

              <TableCell>
                <StatusBadge status={row.status} />
              </TableCell>

              <TableCell>
                <div className="flex gap-3">
                  <Eye className="w-4 h-4 text-gray-500 hover:text-black cursor-pointer" />
                  <Pencil className="w-4 h-4 text-blue-500 cursor-pointer" />
                  <Trash2 className="w-4 h-4 text-red-500 cursor-pointer" />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Pagination className="py-6">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>

          <PaginationItem>
            <PaginationLink href="#" isActive>
              1
            </PaginationLink>
          </PaginationItem>

          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
