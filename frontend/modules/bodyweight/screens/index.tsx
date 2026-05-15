import { ControlledInput } from '@/components/ui/form/controlled-input'
import Screen from '@/components/ui/screen'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { FlatList, TextInput, View, Text } from 'react-native'
import {bodyweightSchema, CreateBodyweightRequest} from '@trena/shared'
import Input from '@/components/ui/text-input'
import { useAuth } from '@/modules/auth/hooks/use-auth'
import { useEffect, useState } from 'react'
import PrimaryButton from '@/components/ui/button/primary-button'
import { getUserWeightHistory, postUserWeight } from '../api'
import { getToken } from '@/modules/auth/logic/storage'


export default function Index() {
  const {user, token} = useAuth()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<null | string>(null)
  const [history, setHistory] = useState([])
  const [dialogActive, setDialogActive] = useState(false)
  const [input, setInput] = useState('')
  const { handleSubmit, control, formState: {errors}} = useForm({
  resolver: zodResolver(bodyweightSchema),
    mode: 'onBlur',
    reValidateMode: 'onChange',
    defaultValues: {
      weight: 0,
      userId: user?.id
    }
  })
  useEffect(() => {
    const run = async () => {
      const res = await getUserWeightHistory(token)
      if (!res) setError('Could not get the user history of bodyweight, please try again.')
      console.log(res)
      setHistory(res)
    }
    run()
  }, [])
  async function onSubmit(data: CreateBodyweightRequest) {
    try {
      setError(null)
      setLoading(true)
      console.log('logging')
      const res = await postUserWeight({
        userId: user?.id as string,
        weight: Number(data.weight)
      }, token)
      if (!res) setError('Could not log the bodyweight, please try again!')
    }
    catch (err) {
      setError('Could not log bodyweight.')
      console.error(err)
    }
    finally {
      setLoading(false)
    }
  }
  return (
    <Screen>
      <View className='flex-1 mb-12'>
          <ControlledInput  control={control} name='weight' render={(field) => <TextInput className='border-1 text-red py-4 h-12' keyboardType='numeric' placeholder='Weight' value={field.value} onChangeText={field.onChange} onBlur={field.onBlur} />}/>
          <PrimaryButton label='Log Bodyweight' onPress={handleSubmit(onSubmit)} disabled={loading} />

      <FlatList keyExtractor={(item) => item.id} className='flex-1'  data={history} ListEmptyComponent={<View><Text>List is empty or loading</Text></View>} renderItem={( {item} ) => ( <View className='p-2'><Text style={{color: 'black'}} className='text-lg text-red-500'> Weight: {item.weight} </Text></View> )} />
      </View>
    </Screen>
  )
}
