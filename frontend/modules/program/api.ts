import {CreateProgramRequest, CreateProgramResponse} from "../../../shared/program/index.schema";

export async function createProgram(input: CreateProgramRequest, token: string): Promise<CreateProgramResponse> {
  try {
    const res = await fetch(`${process.env.EXPO_PUBLIC_SERVER_URL}/program`, {
      method: 'POST',
      body: JSON.stringify(input),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
    if (!res.ok) throw new Error('Could not send request.')

    const data = await res.json() as CreateProgramResponse
    return data
  } catch (err) {
    console.error(err)
    throw err
  }
}
