"use client";

import * as React from "react";
import { ArrowUpDown, LayoutGrid, List, Search, SlidersHorizontal } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";

import type { EmployeeDomain, StaffEmployee } from "@/data/staffEmployees";
import { staffCompanies, staffDomains } from "@/data/staffEmployees";

type SortKey = "name" | "employeeId" | "role" | "company" | "salary" | "domain";
type SortDirection = "asc" | "desc";
type Density = "comfortable" | "compact";

type StaffTableProps = {
  employees: StaffEmployee[];
};

const domainToneClasses: Record<EmployeeDomain, string> = {
  "Ed-Tech": "border-sky-200 bg-sky-50 text-sky-700",
  Fintech: "border-emerald-200 bg-emerald-50 text-emerald-700",
  HealthTech: "border-violet-200 bg-violet-50 text-violet-700",
  Logistics: "border-amber-200 bg-amber-50 text-amber-700",
  SaaS: "border-rose-200 bg-rose-50 text-rose-700",
};

function formatSalary(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
}

function getPageNumbers(page: number, totalPages: number) {
  const pages: (number | "ellipsis")[] = [];
  const delta = 1;
  const left = Math.max(2, page - delta);
  const right = Math.min(totalPages - 1, page + delta);

  pages.push(1);

  if (left > 2) {
    pages.push("ellipsis");
  }

  for (let index = left; index <= right; index += 1) {
    pages.push(index);
  }

  if (right < totalPages - 1) {
    pages.push("ellipsis");
  }

  if (totalPages > 1) {
    pages.push(totalPages);
  }

  return pages;
}

function toggleValue(values: string[], value: string) {
  return values.includes(value) ? values.filter((item) => item !== value) : [...values, value];
}

function SortableHead({
  label,
  active,
  direction,
  onClick,
}: {
  label: string;
  active: boolean;
  direction: SortDirection;
  onClick: () => void;
}) {
  return (
    <Button
      type="button"
      variant="ghost"
      size="xs"
      className="h-auto px-0 text-xs font-medium text-muted-foreground hover:text-foreground"
      onClick={onClick}
    >
      {label}
      <ArrowUpDown className={cn("ml-1 h-3.5 w-3.5", active && "text-foreground")} />
      <span className="sr-only">
        Sort by {label}, currently {active ? direction : "inactive"}
      </span>
    </Button>
  );
}

export function StaffTable({ employees }: StaffTableProps) {
  const [query, setQuery] = React.useState("");
  const [page, setPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(10);
  const [density, setDensity] = React.useState<Density>("comfortable");
  const [selectedCompanies, setSelectedCompanies] = React.useState<string[]>([]);
  const [selectedDomains, setSelectedDomains] = React.useState<string[]>([]);
  const [selectedRoles, setSelectedRoles] = React.useState<string[]>([]);
  const [sortKey, setSortKey] = React.useState<SortKey>("name");
  const [sortDirection, setSortDirection] = React.useState<SortDirection>("asc");

  const roles = React.useMemo(
    () => Array.from(new Set(employees.map((employee) => employee.role))).sort(),
    [employees]
  );

  React.useEffect(() => {
    setPage(1);
  }, [query, pageSize, selectedCompanies, selectedDomains, selectedRoles, sortKey, sortDirection]);

  const filteredEmployees = React.useMemo(() => {
    const loweredQuery = query.trim().toLowerCase();

    const filtered = employees.filter((employee) => {
      const matchesQuery =
        loweredQuery.length === 0 ||
        [
          employee.name,
          employee.employeeId,
          employee.role,
          employee.company,
          employee.contactEmail,
          employee.location,
          employee.domain,
        ]
          .join(" ")
          .toLowerCase()
          .includes(loweredQuery);

      const matchesCompany =
        selectedCompanies.length === 0 || selectedCompanies.includes(employee.company);
      const matchesDomain =
        selectedDomains.length === 0 || selectedDomains.includes(employee.domain);
      const matchesRole = selectedRoles.length === 0 || selectedRoles.includes(employee.role);

      return matchesQuery && matchesCompany && matchesDomain && matchesRole;
    });

    return filtered.sort((left, right) => {
      const leftValue = left[sortKey];
      const rightValue = right[sortKey];

      if (typeof leftValue === "number" && typeof rightValue === "number") {
        return sortDirection === "asc" ? leftValue - rightValue : rightValue - leftValue;
      }

      const comparison = String(leftValue).localeCompare(String(rightValue), "en", {
        numeric: true,
        sensitivity: "base",
      });

      return sortDirection === "asc" ? comparison : -comparison;
    });
  }, [employees, query, selectedCompanies, selectedDomains, selectedRoles, sortDirection, sortKey]);

  const totalPages = Math.max(1, Math.ceil(filteredEmployees.length / pageSize));

  React.useEffect(() => {
    if (page > totalPages) {
      setPage(totalPages);
    }
  }, [page, totalPages]);

  const paginatedEmployees = React.useMemo(() => {
    const start = (page - 1) * pageSize;
    return filteredEmployees.slice(start, start + pageSize);
  }, [filteredEmployees, page, pageSize]);

  const activeFilterCount =
    selectedCompanies.length + selectedDomains.length + selectedRoles.length;

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDirection((current) => (current === "asc" ? "desc" : "asc"));
      return;
    }

    setSortKey(key);
    setSortDirection("asc");
  };

  return (
    <section className="rounded-2xl border border-border/60 bg-card shadow-sm">
      <div className="flex flex-col gap-4 border-b border-border/60 p-4 sm:p-5 lg:flex-row lg:items-center lg:justify-between">
        
        
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-xl font-semibold tracking-tight text-foreground">Employee Data</h2>
            <Badge variant="secondary" className="rounded-full px-2.5 py-0.5">
              {filteredEmployees.length} employees
            </Badge>
          </div>
         
        

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative w-full sm:w-[280px]">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search employee, role, email..."
              className="h-9 pl-9"
            />
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-9 justify-start gap-2">
                <SlidersHorizontal className="h-4 w-4" />
                Filter
                {activeFilterCount > 0 ? (
                  <Badge variant="secondary" className="ml-1 h-5 rounded-full px-1.5 text-[10px]">
                    {activeFilterCount}
                  </Badge>
                ) : null}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-64">
              <DropdownMenuLabel>Companies</DropdownMenuLabel>
              {staffCompanies.map((company) => (
                <DropdownMenuCheckboxItem
                  key={company}
                  checked={selectedCompanies.includes(company)}
                  onCheckedChange={() => setSelectedCompanies((current) => toggleValue(current, company))}
                >
                  {company}
                </DropdownMenuCheckboxItem>
              ))}

              <DropdownMenuSeparator />

              <DropdownMenuLabel>Domains</DropdownMenuLabel>
              {staffDomains.map((domain) => (
                <DropdownMenuCheckboxItem
                  key={domain}
                  checked={selectedDomains.includes(domain)}
                  onCheckedChange={() => setSelectedDomains((current) => toggleValue(current, domain))}
                >
                  {domain}
                </DropdownMenuCheckboxItem>
              ))}

              <DropdownMenuSeparator />

              <DropdownMenuLabel>Roles</DropdownMenuLabel>
              {roles.map((role) => (
                <DropdownMenuCheckboxItem
                  key={role}
                  checked={selectedRoles.includes(role)}
                  onCheckedChange={() => setSelectedRoles((current) => toggleValue(current, role))}
                >
                  {role}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <div className="inline-flex rounded-lg border border-border/60 p-0.5">
            <Button
              type="button"
              variant={density === "comfortable" ? "secondary" : "ghost"}
              size="icon-sm"
              className="rounded-md"
              onClick={() => setDensity("comfortable")}
              aria-label="Comfortable density"
            >
              <List className="h-4 w-4" />
            </Button>
            <Button
              type="button"
              variant={density === "compact" ? "secondary" : "ghost"}
              size="icon-sm"
              className="rounded-md"
              onClick={() => setDensity("compact")}
              aria-label="Compact density"
            >
              <LayoutGrid className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <Table className="min-w-[980px]">
          <TableHeader className="bg-muted/30">
            <TableRow className="hover:bg-transparent">
              <TableHead className="w-[260px]">
                <SortableHead
                  label="Profile"
                  active={sortKey === "name"}
                  direction={sortDirection}
                  onClick={() => handleSort("name")}
                />
              </TableHead>
              <TableHead className="w-[140px]">
                <SortableHead
                  label="Employee ID"
                  active={sortKey === "employeeId"}
                  direction={sortDirection}
                  onClick={() => handleSort("employeeId")}
                />
              </TableHead>
              <TableHead className="w-[180px]">
                <SortableHead
                  label="Role"
                  active={sortKey === "role"}
                  direction={sortDirection}
                  onClick={() => handleSort("role")}
                />
              </TableHead>
              <TableHead className="w-[100px]">
                <SortableHead
                  label="Company"
                  active={sortKey === "company"}
                  direction={sortDirection}
                  onClick={() => handleSort("company")}
                />
              </TableHead>
              <TableHead className="w-[260px]">Contact</TableHead>
              <TableHead className="w-[130px]">
                <SortableHead
                  label="Salary"
                  active={sortKey === "salary"}
                  direction={sortDirection}
                  onClick={() => handleSort("salary")}
                />
              </TableHead>
              <TableHead className="w-[140px]">
                <SortableHead
                  label="Domain"
                  active={sortKey === "domain"}
                  direction={sortDirection}
                  onClick={() => handleSort("domain")}
                />
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedEmployees.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="h-32 text-center text-sm text-muted-foreground">
                  No employees match your search and filters.
                </TableCell>
              </TableRow>
            ) : (
              paginatedEmployees.map((employee) => (
                <TableRow
                  key={employee.id}
                  className={cn(density === "compact" ? "h-14" : "h-16", "hover:bg-muted/40")}
                >
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9">
                        <AvatarFallback className="bg-muted text-xs font-semibold text-foreground">
                          {employee.initials}
                        </AvatarFallback>
                      </Avatar>
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium text-foreground">
                          {employee.name}
                        </p>
                        <p className="truncate text-xs text-muted-foreground">
                          Age {employee.age} | {employee.location}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm font-medium text-foreground">
                    {employee.employeeId}
                  </TableCell>
                  <TableCell className="text-sm text-foreground">{employee.role}</TableCell>
                  <TableCell className="text-sm text-foreground">{employee.company}</TableCell>
                  <TableCell>
                    <div className="min-w-0 space-y-0.5">
                      <p className="truncate text-sm text-foreground">{employee.contactEmail}</p>
                      <p className="text-xs text-muted-foreground">{employee.contactPhone}</p>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm font-medium text-foreground">
                    {formatSalary(employee.salary)}/yr
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={cn("rounded-full border px-2.5 py-0.5", domainToneClasses[employee.domain])}
                    >
                      {employee.domain}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex flex-col gap-4 border-t border-border/60 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
        <p className="text-sm text-muted-foreground">
          Showing {filteredEmployees.length === 0 ? 0 : (page - 1) * pageSize + 1}-
          {Math.min(page * pageSize, filteredEmployees.length)} of {filteredEmployees.length} employees
        </p>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Items per page:</span>
            <Select value={String(pageSize)} onValueChange={(value) => setPageSize(Number(value))}>
              <SelectTrigger className="h-9 w-[92px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {[5, 10, 15].map((value) => (
                  <SelectItem key={value} value={String(value)}>
                    {value}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Pagination className="justify-start sm:justify-end">
            <PaginationContent>
              {page > 1 ? (
                <PaginationItem>
                  <PaginationPrevious
                    onClick={(event) => {
                      event.preventDefault();
                      setPage((current) => Math.max(1, current - 1));
                    }}
                  />
                </PaginationItem>
              ) : null}

              {getPageNumbers(page, totalPages).map((value, index) => (
                <PaginationItem key={`${value}-${index}`}>
                  {value === "ellipsis" ? (
                    <PaginationEllipsis />
                  ) : (
                    <PaginationLink
                      isActive={value === page}
                      onClick={(event) => {
                        event.preventDefault();
                        setPage(value);
                      }}
                    >
                      {value}
                    </PaginationLink>
                  )}
                </PaginationItem>
              ))}

              {page < totalPages ? (
                <PaginationItem>
                  <PaginationNext
                    onClick={(event) => {
                      event.preventDefault();
                      setPage((current) => Math.min(totalPages, current + 1));
                    }}
                  />
                </PaginationItem>
              ) : null}
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </section>
  );
}