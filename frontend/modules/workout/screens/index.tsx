import { useAuth } from '@/modules/auth/hooks/use-auth'
import { Text, View } from 'react-native'
import Screen from '@/components/ui/screen'

export default function Workout() {
  const {user, token} = useAuth()
  return (
    <Screen>
      <View>
      </View>
    </Screen>
  )
}
