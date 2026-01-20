import { theme } from "@/src/utils/theme"
import { StyleSheet,} from "react-native"
import BaseButton, { ButtonProps } from "./base-button"



export default function SecondaryButton(props : ButtonProps) {
  return <BaseButton {...props} style={styles.secondary} textStyle={styles.text} />
}

const styles = StyleSheet.create({
  secondary: {
    backgroundColor: theme.colors.secondary
  },
  text: {
    color: theme.colors.secondaryText
  }
})
