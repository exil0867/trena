import { theme } from "@/src/utils/theme"
import { StyleSheet,} from "react-native"
import BaseButton, { ButtonProps } from "./base-button"



export default function DangerButton(props : ButtonProps) {
  return <BaseButton {...props} style={styles.danger} textStyle={styles.text} />
}

const styles = StyleSheet.create({
  danger: {
    backgroundColor: theme.colors.danger
  },
  text: {
    color: theme.colors.dangerText
  }
})
