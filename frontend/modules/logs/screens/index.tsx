import { FlatList, Text } from 'react-native'
export default function Index() {
  return (

   <>
   <Text className='text-dark text-lg'>Hi</Text>
   <FlatList data={['test', 'test 2']} renderItem={({item}) => (<Text>{item}</Text>)} />
   </>
  )
}
