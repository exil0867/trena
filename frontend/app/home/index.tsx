import CreateProgramForm from "@/modules/program/components/create-program-form";
import { View, Text } from "react-native";

export default function Home() {
  return (
    <View>
      <Text>Welcome to the Home page.</Text>
      <CreateProgramForm></CreateProgramForm>
    </View>
  )
}
