import { Link, Stack, useRouter } from "expo-router";
import { Pressable, Text, View } from "react-native";

export default function Index() {
  const router = useRouter()
  return (
      <Link asChild href={'/login'}>
        <Pressable className="mt-12 bg-red" >
          <Text className="text-lg text-red">Welcome to Trena.</Text>
        </Pressable>
      </Link>
  );
}
