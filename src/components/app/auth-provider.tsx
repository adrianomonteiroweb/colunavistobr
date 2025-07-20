"use client";

import type React from "react";
import { createContext, useContext, useEffect, useState } from "react";

import { loginAdmin } from "@/actions/loginAdmin";

interface AuthContextType {
  user: any | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Restaura usuário do localStorage ao carregar
  useEffect(() => {
    const stored =
      typeof window !== "undefined" ? localStorage.getItem("admin_user") : null;
    if (stored) {
      setUser(JSON.parse(stored));
    } else {
      setUser(null);
    }
    setIsLoading(false);
  }, []);

  const login = async (
    username: string,
    password: string
  ): Promise<boolean> => {
    setIsLoading(true);
    const user = await loginAdmin(username, password);
    if (user) {
      setUser(user);
      if (typeof window !== "undefined") {
        localStorage.setItem("admin_user", JSON.stringify(user));
      }
      setIsLoading(false);
      return true;
    }
    setIsLoading(false);
    return false;
  };

  const logout = async () => {
    setUser(null);
    if (typeof window !== "undefined") {
      localStorage.removeItem("admin_user");
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
