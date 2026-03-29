
import {Redirect, Stack, usePathname, useRouter} from "expo-router";
import React, {ReactNode} from "react";
import {ScrollView, Text, View} from 'react-native'
import {AuthProvider} from "@/modules/auth/context";
import {useAuth} from "@/modules/auth/hooks/use-auth";
import { Navbar } from "@/components/navbar";

export default function Layout() {
  return <>
    <AuthProvider>
      <LayoutBase>
        <Stack screenOptions={{
          headerShown: false
        }}/>
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
  return <>
    <View className='flex-1 justify-center min-h-screen'>
      <View className='flex-1 w-full max-w-lg  px-4 pt-4'>

        <ScrollView className='flex-1'>{children}</ScrollView>
        <Navbar />
      </View>

    </View>
  </>
}
