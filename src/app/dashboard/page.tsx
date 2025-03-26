"use client";
import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Navbar from "@/components/dashboard/Navbar";
import Sidebar from "@/components/dashboard/Sidebar";
import {DataTable} from "@/components/dashboard/DataTable";

export default function Dashboard() {
  const { user, logout } = useAuthContext();
  const router = useRouter();

  if (!user) {
    router.push("/login");
    return null;
  }

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6">
        <Navbar />
        <h2 className="text-2xl font-bold my-4">Welcome, {user.email}</h2>
        <DataTable />
      </div>
    </div>
  );
}
