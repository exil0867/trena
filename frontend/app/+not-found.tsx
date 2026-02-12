import { Link, Stack } from "expo-router";
import { View } from 'react-native'

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{title: 'Page not found'}}/>
        <View>
          <Link href='/'>Go back</Link>
        </View>
    </>
  )
}

