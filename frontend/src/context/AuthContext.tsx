// context/AuthContext.tsx

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
  // Optionally signIn if you want to wrap fetch & save
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  signOut: async () => {},
});

export function useAuth() {
  return useContext(AuthContext);
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  async function bootstrap() {
    try {
      const token = await getAccessToken();
      if (token) {
        const payload = await getCurrentUser();  // you already have this
        console.log(payload)
        if (payload && payload.exp * 1000 > Date.now()) {
          setUser(payload);
        } else {
          // expired or invalid
          await apiSignOut();
          setUser(null);
        }
      } else {
        setUser(null);
      }
    } catch (err) {
      console.error("Auth bootstrap error:", err);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    bootstrap();
  }, []);

  const signOut = async () => {
    await apiSignOut();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
