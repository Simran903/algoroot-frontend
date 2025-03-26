"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import bcrypt from "bcryptjs";

interface User {
  email: string;
  password: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  register: (newUser: User) => boolean;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("currentUser") || "null");
    if (storedUser) setUser(storedUser);
  }, []);

  // Register user with password encryption
  const register = (newUser: User) => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");

    const existingUser = users.find((user: User) => user.email === newUser.email);
    if (existingUser) {
      alert("User already exists! Please log in.");
      return false;
    }

    // Hash the password before storing
    const hashedPassword = bcrypt.hashSync(newUser.password, 10);
    users.push({ email: newUser.email, password: hashedPassword });

    localStorage.setItem("users", JSON.stringify(users));
    return true;
  };

  // Login with password verification
  const login = (email: string, password: string) => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");

    const matchedUser = users.find(
      (user: User) => user.email === email && bcrypt.compareSync(password, user.password)
    );

    if (matchedUser) {
      setUser(matchedUser);
      localStorage.setItem("currentUser", JSON.stringify(matchedUser));
      return true;
    } else {
      alert("Invalid email or password!");
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem("currentUser");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for accessing auth context
export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
};
