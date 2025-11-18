import { Outlet } from "react-router-dom";
import { Sidenav } from "./ui/sidebar";

export function Layout() {
  return (
    <div className="flex h-screen w-full bg-gray-50">
      <Sidenav />
      <main className="flex-1 flex flex-col overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
