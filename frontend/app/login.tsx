import { login } from "@/src/session";
import { useRouter } from "expo-router";
import { useState } from "react";
import { View, Text, Button, TextInput } from "react-native";

export default function Login() {
  const router = useRouter()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<null | string>(null)

  async function handleSubmit() {
    try {
      setError(null)
      setLoading(true)
      console.log(`Submitted data:`, {email, password})
      const res = login(email, password)
      if (!res) setError(`Could not login, please check your credentials.`)
      router.replace('/home')
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <View>
      <Text>Welcome to the Login.</Text>
      <TextInput placeholder="name@example.com" value={email} onChangeText={setEmail} autoCapitalize="none"></TextInput>
      <TextInput placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry></TextInput>
      <Button title="Submit" onPress={handleSubmit} />
      {loading && <Text>Logging in...</Text>}
      {error && <Text>${error}</Text>}
    </View>
  )
}
