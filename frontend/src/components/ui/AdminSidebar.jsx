"use client";
import React from "react";
import { cn } from "@/lib/utils";
import { House } from "lucide-react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

const adminMenuItems = [
  { key: "admin-home", label: "Dashboard", href: "/admin-dashboard", icon: <House className="w-5 h-5" /> },
];

export function AdminSidenav({ className }) {
  const location = useLocation?.() || { pathname: "/" };

  return (
    <aside className={cn("h-screen w-72 bg-white border-r border-amber-100 px-4 py-6 flex flex-col justify-between", className)}>
      <div>
        <header className="mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-amber-600 font-semibold text-lg">Admin User</h2>
              <p className="text-sm text-neutral-500">Administrator</p>
            </div>
          </div>
          <div className="mt-4 border-t border-amber-50" />
        </header>

        <nav aria-label="Admin Navigation" className="space-y-1">
          {adminMenuItems.map((item) => {
            const active = location.pathname === item.href;
            return (
              <Link
                key={item.key}
                to={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition",
                  active
                    ? "bg-amber-50 text-amber-600 ring-1 ring-amber-100"
                    : "text-neutral-700 hover:bg-amber-50 hover:text-amber-600"
                )}
              >
                <span className={cn(
                  "transition",
                  active ? "text-amber-600" : "text-neutral-400 hover:text-amber-500"
                )}>
                  {item.icon}
                </span>
                <span className="truncate">{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="mt-6">
        <Link
          to="/admin-dashboard"
          className="block w-full text-center rounded-md px-4 py-2 bg-amber-600 text-white text-sm font-semibold hover:bg-amber-700 transition"
        >
          Admin Panel
        </Link>
      </div>
    </aside>
  );
}

export default AdminSidenav;