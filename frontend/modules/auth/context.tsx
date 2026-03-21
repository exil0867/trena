import {createContext, ReactNode, useEffect, useState} from "react";
import {MeResponse} from "../../../shared/auth/me.schema";
import {fetchMe} from "@/modules/auth/api";
import {getToken} from "@/modules/auth/logic/storage";

type AuthContextType = {
  user: MeResponse | null
  setUser: (user: MeResponse | null) => void
  loading: boolean
}

export const AuthContext = createContext<AuthContextType | null>(null)


export function AuthProvider({children}: { children: ReactNode}) {
  const token = getToken()
  const [user, setUser] = useState<MeResponse | null>(null)
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const run = async () => {
      if (!token) return false
      setLoading(true)
      try {
        const res = await fetchMe(token)
        if (res) {
          setUser(res)
        }
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }

    }
    run()
  }, [token])
  return <AuthContext.Provider value={{user, setUser, loading }}>
    {children}
  </AuthContext.Provider>
}

