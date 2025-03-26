"use client";
import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaUserCircle } from "react-icons/fa";

export default function Navbar() {
  const { user, logout } = useAuthContext();
  const router = useRouter();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  const handleDeleteAccount = () => {
    // Fetch all registered users from local storage
    const users = JSON.parse(localStorage.getItem("users") || "[]");

    // Remove the currently logged-in user from the users array
    const updatedUsers = users.filter((u: { email: string }) => u.email !== user?.email);

    // Update the local storage
    localStorage.setItem("users", JSON.stringify(updatedUsers));

    // Clear current user session and redirect to signup
    logout();
    router.push("/signup");
    alert("Account deleted successfully!");
  };

  return (
    <nav className="flex justify-between items-center p-4 bg-gray-100 shadow-md relative">
      {/* Logo */}
      <h1 className="text-xl font-bold">MyBank</h1>

      {/* User Icon with Dropdown */}
      {user && (
        <div className="relative">
          <FaUserCircle
            size={28}
            className="cursor-pointer"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          />

          {/* Dropdown Menu */}
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-md p-2 z-10">
              <p className="text-gray-700 font-medium mb-2">{user.email}</p>
              <button
                onClick={handleLogout}
                className="block w-full text-left text-red-500 hover:bg-gray-100 px-2 py-1 rounded"
              >
                Logout
              </button>
              <button
                onClick={handleDeleteAccount}
                className="block w-full text-left text-red-500 hover:bg-gray-100 px-2 py-1 rounded"
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
