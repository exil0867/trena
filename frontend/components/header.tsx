import { EllipsisVertical, View, Text } from "lucide-react-native";

export function Header(props: {title: string}) {
    return (
      <View className="flex justify-between">
        {/* <Text className="text-[1.5em] font-bold mb-2">{props.title}</Text> */}
        <View><EllipsisVertical /></View>
      </View>
    )
}
