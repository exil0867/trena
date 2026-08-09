import { Header } from "@/components/header";
import CreateProgramForm from "@/modules/program/components/create-program-form";
import Workout from "@/modules/workout/screens";
import { EllipsisVertical } from "lucide-react-native";
import { View, Text } from "react-native";

export default function Home() {
  return (
    <>
      <Header title='Home'/>
      <Workout />
    </>
  )
}
