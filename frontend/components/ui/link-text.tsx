import { Link, LinkProps } from "expo-router";
import { StyleSheet } from "react-native";

export default function LinkText({children, url}: {children: React.ReactNode, url: LinkProps['href']}) {
  return <Link style={styles.link} href={url}>{children}</Link>
}

const styles = StyleSheet.create({
  link: {
    color: '#fff'
  }
})
