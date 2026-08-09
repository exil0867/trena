import { Link, LinkProps } from "expo-router";
import { StyleSheet } from "react-native";

export default function LinkText({children, url}: {children: React.ReactNode, url: LinkProps['href']}) {
  return <Link className="text-black" href={url}>{children}</Link>
}
