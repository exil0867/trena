
const TOKEN_NAME = 'access_token'

export async function login(email: string, password: string) {
  try {
    const res = await fetch(`${process.env.EXPO_PUBLIC_SERVER_URL}/auth/login`, {
    method: 'POST',
    body: JSON.stringify({
      email,
      password
    })
  })
  if (!res.ok) throw new Error('Could not send request.')

  const data = await res.json()

  if (!data.accessToken) throw new Error('Could not get the JWT from the server')

  setToken(data.accessToken)

  return true

  } catch (err) {
    console.error(err)
  }
}

export async function signup(email: string, password: string) {
  try {
    const res = await fetch(`${process.env.EXPO_PUBLIC_SERVER_URL}/auth/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      password
    })
  })
  if (!res.ok) throw new Error('Could not send request.')
  return true
  } catch (err) {
    console.error(err)
  }
}

export function logout() {
  clearToken()
}

export async function validateSession() {
  const token = getToken()
  if (!token) return false
  const res = await fetch(`${process.env.EXPO_PUBLIC_SERVER_URL}/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  })
  if (res.status === 200) {
    return true
  } else  {
    clearToken()
    return false
  }
}

export function getToken() {
  const token = localStorage.getItem(TOKEN_NAME)
  return token
}

export function setToken(token: string) {
  localStorage.setItem(TOKEN_NAME, token)
}

export function clearToken() {
  localStorage.removeItem(TOKEN_NAME)
}
