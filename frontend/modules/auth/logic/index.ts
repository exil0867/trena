
import {clearToken, getToken} from "@/modules/auth/logic/storage";
import {fetchMe} from "@/modules/auth/api";

export async function validateSession() {
  const token = getToken()
  if (!token) return false
  const res = await fetchMe(token)
  if (res) {
    return true
  } else  {
    clearToken()
    return false
  }
}

export function logout() {
  clearToken()
}


