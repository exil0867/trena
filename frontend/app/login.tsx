import AuthError from "@/modules/auth/components/auth-error";
import AuthHeader from "@/modules/auth/components/auth-header";
import PrimaryButton from "@/components/ui/button/primary-button";
import LinkText from "@/components/ui/link-text";
import Screen from "@/components/ui/screen";
import Input from "@/components/ui/text-input";
import { useRouter } from "expo-router";
import { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import InputError from "@/components/ui/form/input-error";
import { ControlledInput } from "@/components/ui/form/controlled-input";
import { loginSchema, LoginFormValues } from '../../shared/auth/login.schema'
import AuthLoading from "@/modules/auth/components/auth-loading";
import AuthSwitch from "@/modules/auth/components/auth-switch";
import {login} from "@/modules/auth/api";

export default function Login() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<null | string>(null)

  const { handleSubmit, control, formState: { errors }} = useForm({
    resolver: zodResolver(loginSchema),
    mode: 'onBlur',
    reValidateMode: 'onChange',
    defaultValues: {
      'email': '',
      'password': '',
    }
  })


  async function onSubmit( data: LoginFormValues) {
    try {
      setError(null)
      setLoading(true)
      const res = await login(data)
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

        <ControlledInput control={control} name={'email'} render={(field) => <Input placeholder="email@example.com" value={field.value} onChangeText={field.onChange} onBlur={field.onBlur} autoCapitalize="none"/> }/>

        <ControlledInput control={control} name={'password'} render={(field) => <Input placeholder="Password" value={field.value} onChangeText={field.onChange} onBlur={field.onBlur} secureTextEntry />} />

      </View>

      <PrimaryButton label={"Login"} onPress={handleSubmit(onSubmit)} disabled={loading} />

      <AuthSwitch current={"login"} />
      <AuthLoading loading={loading} message={'Logging in...'} />
      <AuthError message={error} />
    </Screen>
  )
}

const styles = StyleSheet.create({
  form: {
    marginBottom: 24
  },
})
