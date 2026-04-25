"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";

export default function AddCompanyDialog() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* BUTTON */}
      <DialogTrigger asChild>
        <Button>
          <Plus className="w-4 h-4" />
          Add Company
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader className="space-y-1">
          <DialogTitle>Add Company</DialogTitle>
          <p className="text-sm text-muted-foreground">
            Create a new company record.
          </p>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <div className="space-y-1">
            <Label>Company Name</Label>
            <Input placeholder="Acme Corp" required />
          </div>

          <div className="space-y-1">
            <Label>Industry</Label>
            <Input placeholder="Fintech" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <Label>Plan</Label>
              <Input placeholder="Pro" />
            </div>

            <div className="space-y-1">
              <Label>Revenue</Label>
              <Input placeholder="$5000" />
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline">Cancel</Button>
          <Button>Add Company</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
