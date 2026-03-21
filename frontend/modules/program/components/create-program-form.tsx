import {useRouter} from "expo-router";
import {useState} from "react";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {CreateProgram as CreateProgramType, CreateProgramRequest} from "../../../../shared/program/index.schema";
import {signup} from "@/modules/auth/api";
import {StyleSheet, View} from "react-native";
import {ControlledInput} from "@/components/ui/form/controlled-input";
import Input from "@/components/ui/text-input";
import PrimaryButton from "@/components/ui/button/primary-button";
import {createProgram} from "@/modules/program/api";
import {getToken} from "@/modules/auth/logic/storage";
import {useAuth} from "@/modules/auth/hooks/use-auth";

export default function CreateProgramForm() {
  const router = useRouter()
  const {user} = useAuth()
  if (!user) {
    throw new Error('User object is not available')
  }
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<null | string>(null)
  const token = getToken()

  const { handleSubmit, control, formState: { errors }} = useForm({
    resolver: zodResolver(CreateProgramType),
    mode: 'onBlur',
    reValidateMode: 'onChange',
    defaultValues: {
      userId: user.id,
      title: '',
    }
  })


  async function onSubmit( data: CreateProgramRequest) {
    try {
      setError(null)
      setLoading(true)

      if (!token) return false
      const res = await createProgram(data, token)
      if (!res) setError(`Could not login, please check your credentials.`)
      // router.replace('/login')
    } catch (err) {
      setError(`Could not login, please check your credentials.`)
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <View style={styles.form}>

        <ControlledInput control={control} name={'title'} render={(field) => <Input placeholder="Program title" value={field.value} onChangeText={field.onChange} onBlur={field.onBlur} autoCapitalize="none"/> }/>

      </View>

      <PrimaryButton label={"Create Program"} onPress={handleSubmit(onSubmit)} disabled={loading} />
    </>
  )
}

const styles = StyleSheet.create({
  form: {
    marginBottom: 24
  },
})
