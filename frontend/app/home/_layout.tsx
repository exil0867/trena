
import { validateSession } from "@/features/auth/logic";
import { Redirect, Stack } from "expo-router";
import { useEffect, useState } from "react";
import { Text } from 'react-native'

export default function Layout() {
  const [valid, setValid] = useState<boolean | null>(null)
  useEffect(() => {
    async function run() {
      const valid = await validateSession()
      setValid(valid)
    }
    run()

  }, [])
  if (valid === null) return <Text>Validating user...</Text>
  if (!valid) {
    return <Redirect href={'/login'}/>
  }
  return <Stack/>;
}
