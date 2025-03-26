"use client";
import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Navbar from "@/components/dashboard/Navbar";
import Sidebar from "@/components/dashboard/Sidebar";
import { DataTable } from "@/components/dashboard/DataTable";

export default function Dashboard() {
  const { user, logout } = useAuthContext();
  const router = useRouter();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      router.push("/login");
    } else {
      setIsLoading(false);
    }
  }, [user, router]);

  if (isLoading) {
    return null;
  }

  const toggleMobileSidebar = () => {
    setMobileSidebarOpen(!mobileSidebarOpen);
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Sidebar */}
      <Sidebar 
        mobile={mobileSidebarOpen} 
        onClose={() => setMobileSidebarOpen(false)} 
      />

      {/* Main Content */}
      <div className="flex-1">
        <Navbar onMenuToggle={toggleMobileSidebar} />
        <div className="p-4 md:p-6 md:ml-64 transition-all duration-300">
          <h2 className="text-xl md:text-2xl font-bold my-4">
            Welcome, {user?.email}
          </h2>
          <DataTable />
        </div>
      </div>
    </div>
  );
}