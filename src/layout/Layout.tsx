import { Toaster } from "@/components/ui/toaster";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="p-6 w-[1100px] h-[600px] rounded-xl shadow-2xl">
        <Outlet />
        <Toaster />
      </div>
    </div>
  );
}
