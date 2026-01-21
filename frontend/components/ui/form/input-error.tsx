import { theme } from "@/src/utils/theme";
import { FieldError } from "react-hook-form";
import { Text } from "react-native";

export default function InputError({error}: {error?: FieldError}) {
  if (!error) return null
  return <>
    <Text style={{color: theme.colors.dangerText, marginBottom: 16}}>{error.message}</Text>
  </>
}
