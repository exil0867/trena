import AuthError from "@/components/auth/auth-error";
import AuthHeader from "@/components/auth/auth-header";
import PrimaryButton from "@/components/ui/button/primary-button";
import LinkText from "@/components/ui/link-text";
import Screen from "@/components/ui/screen";
import Input from "@/components/ui/text-input";
import { login } from "@/src/session";
import { theme } from "@/src/utils/theme";
import { useRouter } from "expo-router";
import { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

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
      const res = await login(email, password)
      if (!res) setError(`Could not login, please check your credentials.`)
      router.replace('/home')
    } catch (err) {
      setError(`Could not login, please check your credentials.`)
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Screen>
      <AuthHeader title="Login" subtitle="Welcome back" />
      <View style={styles.form}>
        <Input placeholder="email@example.com" value={email} onChangeText={setEmail} autoCapitalize="none"/>
        <Input placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry/>
        <AuthError message={error} />
      </View>

      <PrimaryButton label={"Login"} onPress={handleSubmit} disabled={loading} />

      <LinkText url="/signup">Don&apos;t have an account? Sign up instead.</LinkText>
      {loading && <Text>Logging in...</Text>}
    </Screen>
  )
}

const styles = StyleSheet.create({
  form: {
    marginBottom: 24
  },
})
