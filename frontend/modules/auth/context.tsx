import {createContext, ReactNode, useEffect, useState} from "react";
import {MeResponse} from "@trena/shared";
import {AuthorizedError, fetchMe} from "@/modules/auth/api";
import { clearToken, getToken } from "./logic/storage";
import { useRouter } from "expo-router";

type AuthContextType = {
  user: MeResponse | null
  setUser: (user: MeResponse | null) => void
  loading: boolean
  token: string | null
}

export const AuthContext = createContext<AuthContextType | null>(null)


export function AuthProvider({children}: { children: ReactNode}) {
  const router = useRouter()
  const [user, setUser] = useState<MeResponse | null>(null)
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState<string | null>(null)
  useEffect(() => {
    const run = async () => {
     const token = await getToken()
      if (!token) return false
      setToken(token)
      setLoading(true)
      try {
        const res = await fetchMe(token)
        if (res) {
          setUser(res)

      router.replace('/(user)/home')
        }
      } catch (err) {
        if (err instanceof AuthorizedError) {
          await clearToken()
        }
        console.error(err)
      } finally {
        setLoading(false)
      }

    }
    run()
  }, [])
  return <AuthContext.Provider value={{user, setUser, loading, token }}>
    {children}
  </AuthContext.Provider>
}

