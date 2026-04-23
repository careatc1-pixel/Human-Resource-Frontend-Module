"use client";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { Bell, ChevronDown, LogOut, Settings, User, Clock } from "lucide-react";

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isPunchedIn, setIsPunchedIn] = useState(false);

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 w-[90%] max-w-6xl z-50">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center justify-center px-6 py-3 w-[20%]
          rounded-2xl gap-2 bg-card/70 backdrop-blur-xl 
          border border-border shadow-lg text-lg font-semibold tracking-wide text-foreground">
          <div className="bg-black text-white rounded-md px-2 py-1 font-bold text-sm">
            AT
          </div>
          <span className="font-semibold text-lg">Atharv</span>
        </div>

        <div className="flex items-center justify-end md:justify-between gap-4 px-6 py-2 w-[80%]
          rounded-2xl bg-card/70 backdrop-blur-xl 
          border border-border shadow-lg">
          <div className="hidden md:flex items-center gap-6 text-sm text-muted-foreground">
            <button className="hover:text-foreground transition">Overview</button>
            <button className="hover:text-foreground transition">Attendance</button>
            <button className="hover:text-foreground transition">Tasks</button>
            <button className="hover:text-foreground transition">Leave</button>
            <button className="hover:text-foreground transition">Reports</button>
          </div>

          <div className="flex items-center gap-3">

            {/* Bell */}
            <button className="relative p-1.5 rounded-full hover:bg-muted transition">
              <Bell className="w-4 h-4 text-muted-foreground" />
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full" />
            </button>

            {/* Punch In/Out Button */}
            <Button
              size="sm"
              onClick={() => setIsPunchedIn(!isPunchedIn)}
              className={`flex items-center gap-1.5 rounded-xl px-3 py-4 text-sm font-medium transition-all ${
                isPunchedIn
                  ? "bg-orange-500 hover:bg-orange-600 text-white"
                  : "bg-green-600 hover:bg-green-700 text-white"
              }`}
            >
              <Clock className="w-3.5 h-3.5" />
              {isPunchedIn ? "Punch Out" : "Punch In"}
            </Button>

            {/* Avatar + Dropdown */}
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-1.5 hover:opacity-80 transition"
              >
                <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-white text-sm font-bold">
                  HB
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-muted-foreground" />
              </button>

              {/* Dropdown Menu */}
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-xl bg-card border border-border shadow-xl py-1 text-sm">
                  <div className="px-4 py-2 border-b border-border">
                    <p className="font-semibold text-foreground">Hemant Bhatnagar</p>
                    <p className="text-xs text-muted-foreground">HR Admin</p>
                  </div>
                  <button className="w-full flex items-center gap-2 px-4 py-2 hover:bg-muted transition text-left">
                    <User className="w-4 h-4" /> My Profile
                  </button>
                  <button className="w-full flex items-center gap-2 px-4 py-2 hover:bg-muted transition text-left">
                    <Settings className="w-4 h-4" /> My Settings
                  </button>
                  <div className="border-t border-border mt-1" />
                  <button className="w-full flex items-center gap-2 px-4 py-2 hover:bg-muted transition text-left text-red-500">
                    <LogOut className="w-4 h-4" /> Logout
                  </button>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;