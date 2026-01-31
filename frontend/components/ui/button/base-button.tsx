import { theme } from "@/lib/theme"
import { Pressable, StyleSheet, Text, TextStyle, ViewStyle } from "react-native"

export type ButtonProps = {
  label: string
  onPress: () => void
  disabled?: boolean
}

export default function BaseButton({label, disabled = false, style, textStyle, onPress} :{
  label: string,
  onPress: () => void,
  disabled?: boolean,
  style?: ViewStyle,
  textStyle?: TextStyle
}) {
  return <Pressable onPress={onPress} disabled={disabled}
    style={({pressed}) => [
      styles.base,
      pressed && styles.pressed,
      disabled && styles.disabled,
      style
    ]}>
      <Text style={[styles.text, textStyle]}>{label}</Text>
  </Pressable>
}

const styles = StyleSheet.create({
  base: {
    height: 48,
    borderRadius: 8,
    backgroundColor: theme.colors.background,
    justifyContent: 'center',
    marginBottom: 24
  },
  pressed: {
    opacity: 0.85
  },
  disabled: {
    opacity: 0.5
  },

  text: {
    marginLeft: 12,
    color: theme.colors.text,
    fontSize: 16,
    fontWeight: '500'
  }
})
