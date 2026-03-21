
import { Redirect, Stack } from "expo-router";
import {ReactNode} from "react";
import { Text } from 'react-native'
import {AuthProvider} from "@/modules/auth/context";
import {useAuth} from "@/modules/auth/hooks/use-auth";



export default function Layout() {
  return <>
    <AuthProvider>
      <LayoutBase>
        <Stack/>
      </LayoutBase>
    </AuthProvider>
  </>;
}

function LayoutBase({children}: {children: ReactNode}) {
  const {user, loading} = useAuth()
  if (loading) return <Text>Validating user...</Text>
  if (!user) {
    return <Redirect href={'/login'}/>
  }
  return children
}
