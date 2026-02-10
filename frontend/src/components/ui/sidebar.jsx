"use client";
import React from "react";
import { cn } from "@/lib/utils";
import { House, FileText, Clipboard, CheckCircle, User } from "lucide-react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

const menuItems = [
  { key: "home", label: "Home", href: "/home", icon: <House className="w-5 h-5" /> },
  { key: "lor", label: "Request LOR", href: "/request/lor", icon: <FileText className="w-5 h-5" /> },
  { key: "bonafide", label: "Request Bonafide Certificate", href: "/request/bonafide", icon: <Clipboard className="w-5 h-5" /> },
  { key: "nodues", label: "Request No-Dues Certificate", href: "/request/no-dues", icon: <CheckCircle className="w-5 h-5" /> },
  { key: "char", label: "Request Character Certificate", href: "/request/character", icon: <User className="w-5 h-5" /> },
  { key: "profile", label: "Profile View", href: "/profile", icon: <User className="w-5 h-5" /> },
];

export function Sidenav({ className }) {
  const location = useLocation?.() || { pathname: "/" };

  return (
    <aside className={cn("h-screen w-72 bg-white border-r border-amber-100 px-4 py-6 flex flex-col justify-between", className)}>
      <div>
        <header className="mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-amber-600 font-semibold text-lg">Samar Raj</h2>
              <p className="text-sm text-neutral-500">Student</p>
            </div>
          </div>
          <div className="mt-4 border-t border-amber-50" />
        </header>

        <nav aria-label="Main Navigation" className="space-y-1">
          {menuItems.map((item) => {
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
          to="/profile"
          className="block w-full text-center rounded-md px-4 py-2 bg-amber-600 text-white text-sm font-semibold hover:bg-amber-700 transition"
        >
          View Profile
        </Link>
      </div>
    </aside>
  );
}

export default Sidenav;
