import AuthError from "@/features/auth/components/auth-error";
import AuthHeader from "@/features/auth/components/auth-header";
import PrimaryButton from "@/components/ui/button/primary-button";
import LinkText from "@/components/ui/link-text";
import Screen from "@/components/ui/screen";
import Input from "@/components/ui/text-input";
import { signup } from "@/features/auth/logic";
import { useRouter } from "expo-router";
import { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import InputError from "@/components/ui/form/input-error";
import { ControlledInput } from "@/components/ui/form/controlled-input";
import AuthLoading from "@/features/auth/components/auth-loading";
import AuthSwitch from "@/features/auth/components/auth-switch";
import { FrontendSignupFormValues, frontendSignupSchema } from '../../shared/schema/signup.schema'

export default function Signup() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<null | string>(null)

  const { handleSubmit, control, formState: { errors }} = useForm({
    resolver: zodResolver(frontendSignupSchema),
    mode: 'onBlur',
    reValidateMode: 'onChange',
    defaultValues: {
      'email': '',
      'username': '',
      'password': '',
      'confirmPassword': ''
    }
  })


  async function onSubmit( data: FrontendSignupFormValues) {
    try {
      setError(null)
      setLoading(true)
      const res = await signup(data.email, data.username, data.password)
      if (!res) setError(`Could not login, please check your credentials.`)
      router.replace('/login')
    } catch (err) {
      setError(`Could not login, please check your credentials.`)
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Screen>
      <AuthHeader title="Signup" subtitle="Get started" />
      <View style={styles.form}>

        <ControlledInput control={control} name={'email'} render={(field) => <Input placeholder="email@example.com" value={field.value} onChangeText={field.onChange} onBlur={field.onBlur} autoCapitalize="none"/> }/>

        <ControlledInput control={control} name={'username'} render={(field) => <Input placeholder="Username" value={field.value} onChangeText={field.onChange} onBlur={field.onBlur} autoCapitalize="none"/> }/>

        <ControlledInput control={control} name={'password'} render={(field) => <Input placeholder="Password" value={field.value} onChangeText={field.onChange} onBlur={field.onBlur} secureTextEntry />} />

        <ControlledInput control={control} name={'confirmPassword'} render={(field) => <Input placeholder="Confirm password" value={field.value} onChangeText={field.onChange} onBlur={field.onBlur} secureTextEntry />} />

      </View>

      <PrimaryButton label={"Signup"} onPress={handleSubmit(onSubmit)} disabled={loading} />

      <AuthSwitch current={"signup"} />

      <AuthLoading loading={loading} message={'Signing up...'} />
      <AuthError message={error} />
    </Screen>
  )
}

const styles = StyleSheet.create({
  form: {
    marginBottom: 24
  },
})
