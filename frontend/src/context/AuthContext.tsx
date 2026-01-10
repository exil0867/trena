import React, { createContext, useState, useEffect, useContext } from "react";
import { getAccessToken, getCurrentUser, signOut as apiSignOut } from "@/api/auth";

interface User {
  sub: string;
  email: string;
  role: string;
  exp: number;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  signOut: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  signOut: async () => {},
  refreshUser: async () => {},
});

export function useAuth() {
  return useContext(AuthContext);
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const bootstrap = async () => {
    try {
      const token = await getAccessToken();
      if (!token) {
        setUser(null);
        return;
      }

      const payload = await getCurrentUser();
      if (payload && payload.exp * 1000 > Date.now()) {
        setUser(payload);
      } else {
        await apiSignOut();
        setUser(null);
      }
    } catch (err) {
      console.error("Auth bootstrap error:", err);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    bootstrap();
  }, []);

  const signOut = async () => {
    await apiSignOut();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        signOut,
        refreshUser: bootstrap,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
