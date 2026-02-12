import {LoginRequest, LoginResponse} from "../../../shared/auth/login.schema";
import {SignupRequest, SignupResponse} from "../../../shared/auth/signup.schema";
import {MeResponse} from "../../../shared/auth/me.schema";
import {setToken} from "@/modules/auth/logic/storage";

export async function login(input: LoginRequest): Promise<LoginResponse> {
  try {
    const res = await fetch(`${process.env.EXPO_PUBLIC_SERVER_URL}/auth/login`, {
      method: 'POST',
      body: JSON.stringify(input)
    })
    if (!res.ok) throw new Error('Could not send request.')

    const data = await res.json() as LoginResponse

    if (!data.accessToken) throw new Error('Could not get the JWT from the server')

    setToken(data.accessToken)

    return data

  } catch (err) {
    console.error(err)
    throw err
  }
}

export async function signup(input: SignupRequest): Promise<SignupResponse> {
  try {
    const res = await fetch(`${process.env.EXPO_PUBLIC_SERVER_URL}/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(input)
    })
    if (!res.ok) throw new Error('Could not send request.')
    return await res.json() as SignupResponse
  } catch (err) {
    console.error(err)
    throw err
  }
}

export async function fetchMe(token: string): Promise<MeResponse> {
  try {
    const res = await fetch(`${process.env.EXPO_PUBLIC_SERVER_URL}/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
    if (!res.ok) throw new Error('Could not send request.')
    return await res.json() as MeResponse
  } catch (err) {
    console.error(err)
    throw err
  }
}
