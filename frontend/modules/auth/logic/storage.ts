
import * as SecureStore from 'expo-secure-store'
const TOKEN_NAME = 'access_token'

export function getToken() {
  return SecureStore.getItemAsync(TOKEN_NAME)
}

export async function setToken(token: string) {
  await SecureStore.setItemAsync(TOKEN_NAME, token)
}

export async function clearToken() {
  await SecureStore.deleteItemAsync(TOKEN_NAME)
}
