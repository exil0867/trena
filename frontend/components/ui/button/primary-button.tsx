import { theme } from "@/src/utils/theme"
import { StyleSheet,} from "react-native"
import BaseButton, { ButtonProps } from "./base-button"



export default function PrimaryButton(props : ButtonProps) {
  return <BaseButton {...props} style={styles.primary} textStyle={styles.text} />
}

const styles = StyleSheet.create({
  primary: {
    backgroundColor: theme.colors.primary
  },
  text: {
    color: theme.colors.primaryText
  }
})
