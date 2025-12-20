import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";
import { z } from "zod";

const ACCESS_TOKEN_KEY = "access_token";
const REFRESH_TOKEN_KEY = "refresh_token";

const envSchema = z.object({
    EXPO_PUBLIC_API_URL: z.string().url(),
});

const env = envSchema.parse(process.env);

export async function saveTokens(access: string, refresh: string) {
  await AsyncStorage.multiSet([
    [ACCESS_TOKEN_KEY, access],
    [REFRESH_TOKEN_KEY, refresh],
  ]);
  console.log([
    [ACCESS_TOKEN_KEY, access],
    [REFRESH_TOKEN_KEY, refresh],
  ], 'saveTokens')
}

export async function getAccessToken() {
  return AsyncStorage.getItem(ACCESS_TOKEN_KEY);
}

export async function getRefreshToken() {
  return AsyncStorage.getItem(REFRESH_TOKEN_KEY);
}

export async function clearTokens() {
  await AsyncStorage.multiRemove([ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY]);
}


interface TokenPayload {
  sub: string;
  email: string;
  role: string;
  exp: number;
}

export async function getCurrentUser() {
  const token = await getAccessToken();
  if (!token) return null;
  try {
    return jwtDecode<TokenPayload>(token);
  } catch {
    return null;
  }
}

export async function signIn(email: string, password: string) {
  const response = await fetch(`${env.EXPO_PUBLIC_API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    throw new Error("Login failed");
  }

  const data = await response.json();
  await saveTokens(data.accessToken, data.refreshToken);
  return data;
}

export async function signUp(email: string, password: string) {
  const response = await fetch(`${env.EXPO_PUBLIC_API_URL}/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    throw new Error("Signup failed");
  }

  const data = await response.json();
  console.log(data, 'signUp')
  await saveTokens(data.accessToken, data.refreshToken);
  return data;
}

export async function signOut() {
  // Optionally: call your backend to revoke the refresh token
  // await fetch(`${env.EXPO_PUBLIC_API_URL}/auth/logout`, {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //     "Authorization": `Bearer ${await getAccessToken()}`
  //   },
  //   body: JSON.stringify({ refreshToken: await getRefreshToken() })
  // });

  // Clear tokens locally
  await clearTokens();
}
