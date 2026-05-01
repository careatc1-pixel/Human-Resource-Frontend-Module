"use client";
import CardPagination from "@/global/elements/table/CardPagination";
import AdminPanelTable from "./_components/AdminPanelTable";
import { companiesData } from "@/data/companies";
import { Plus } from "lucide-react";

const page = () => {
  return (
    <>
      <div className="flex flex-col gap-6 p-6 bg-gradient-to-br from-slate-50 to-slate-100 ">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">
              Organizations
            </h1>
            <p className="text-sm text-muted-foreground">
              Manage all registered companies in your HRM system
            </p>
          </div>

          <button className="px-4 py-2 flex bg-black text-white rounded-lg text-sm hover:opacity-90">
            <Plus className="w-4 h-4 mr-2" />
            Add Organization
          </button>
        </div>

        <div className="bg-white flex flex-col gap-4 rounded-2xl shadow-sm border border-slate-200 p-4">
          <AdminPanelTable companiesData={companiesData} />
          <div>
            <CardPagination
              page={1}
              totalPages={10}
              onClick={() => {}}
              limit={10}
              onLimitChange={() => {}}
              pageSizeOptions={[5, 10, 20, 30, 40, 50]}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
