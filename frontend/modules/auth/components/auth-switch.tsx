import { theme } from "@/lib/theme"
import { Text } from "react-native"
import LinkText from "../../../components/ui/link-text"
import { LinkProps } from "expo-router"

export function Switch({url, tip}: {url: LinkProps['href'], tip: string}) {
  return <LinkText url={url}>{tip}</LinkText>
}

export default function AuthSwitch({ current }: { current: 'login' | 'signup',}) {
  if (current === 'signup') {
    return <Switch url={'/login'} tip="Don&apos;t have an account? Sign up instead."/>
  } else {
    return <Switch url={'/signup'} tip="Have an account? Signup instead."/>
  }
}
