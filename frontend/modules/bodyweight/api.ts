import { CreateBodyweightRequest } from "../../../shared/bodyweight/index.schema"

export async function getUserWeightHistory(token: string | null) {
  try {
    const res = await fetch(`${process.env.EXPO_PUBLIC_SERVER_URL}/bodyweight`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
    if (!res.ok) throw new Error('Could not send resquest.')
    return await res.json()
  } catch (err) {
    console.error(err)
    throw err
  }
}

export async function postUserWeight(input: CreateBodyweightRequest, token: string | null){
  try {
    const res = await fetch(`${process.env.EXPO_PUBLIC_SERVER_URL}/bodyweight`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(input)
    })
    if (!res.ok) throw new Error('Could not send request.')
    return await res.json()
  }
  catch (err) {

  }
}
