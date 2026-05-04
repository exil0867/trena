
import {Redirect, Stack, Tabs, usePathname, useRouter} from "expo-router";
import React, {ReactNode} from "react";
import {ScrollView, Text, View} from 'react-native'
import {AuthProvider} from "@/modules/auth/context";
import {useAuth} from "@/modules/auth/hooks/use-auth";
import { Navbar } from "@/components/navbar";
import { SymbolView } from 'expo-symbols'

// export default function Layout() {
//   return <>
//     <AuthProvider>
//       <LayoutBase>
//         <Stack screenOptions={{
//           headerShown: false
//         }}/>
//         </LayoutBase>
//         </AuthProvider>
//   </>;
// }

export default function Layout() {
  const {user, loading} = useAuth()
  if (loading) return <Text>Validating user...</Text>
  console.log('user', user)
  if (!user) {
    return <Redirect href={'/login'}/>
  }
  return <>
    <Tabs>
      <Tabs.Screen name='bodyweight/index' options={{
        title: 'Bodyweight',
        headerTitle: 'Bodyweight',
        tabBarIcon: () => {
          return (
            <SymbolView name={{android: 'weight'}} />
          )
        }
      }}>

      </Tabs.Screen>
      <Tabs.Screen name='home/index'  options={{
          title: 'Home',
          headerTitle: 'Home',
          tabBarIcon: () => {
          return (
            <SymbolView name={{android: 'home'}} />
          )
        }
      }}></Tabs.Screen>

      <Tabs.Screen name='insights/index'  options={{
          title: 'Insights',
          headerTitle: 'Insights',
          tabBarIcon: () => {
          return (
            <SymbolView name={{android: 'chart_data'}} />
          )
        }
      }}></Tabs.Screen>

      <Tabs.Screen name='routines/index'  options={{
          title: 'Routines',
          headerTitle: 'Routines',
          tabBarIcon: () => {
          return (
            <SymbolView name={{android: 'loop'}} />
          )
        }
      }}></Tabs.Screen>

    </Tabs>
  </>
}

