"use client";
import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaUserCircle, FaBars } from "react-icons/fa";

export default function Navbar({ onMenuToggle }: { onMenuToggle?: () => void }) {
  const { user, logout } = useAuthContext();
  const router = useRouter();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  const handleDeleteAccount = () => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    
    const updatedUsers = users.filter((u: { email: string }) => u.email !== user?.email);
    
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    
    logout();
    router.push("/signup");
    alert("Account deleted successfully!");
  };

  return (
    <nav className="flex justify-between items-center p-4 bg-gray-100 shadow-md relative">

      <button 
        className="md:hidden mr-4"
        onClick={onMenuToggle}
      >
        <FaBars size={24} />
      </button>

      <h1 className="text-lg sm:text-2xl font-bold flex-grow">MyBank</h1>
      
      {user && (
        <div className="relative">
          <FaUserCircle
            size={28}
            className="cursor-pointer hover:text-gray-700 transition"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          />
          
          {dropdownOpen && (
            <div 
              className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-md p-2 z-50"
              onClick={() => setDropdownOpen(false)}
            >
              <p className="text-gray-700 font-medium mb-2 truncate">{user.email}</p>
              <button
                onClick={handleLogout}
                className="block w-full text-left text-red-500 hover:bg-gray-100 px-2 py-1 rounded transition"
              >
                Logout
              </button>
              <button
                onClick={handleDeleteAccount}
                className="block w-full text-left text-red-500 hover:bg-gray-100 px-2 py-1 rounded transition"
              >
                Delete Account
              </button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}