import { Header } from "@/components/header";
import { View } from "react-native";
import Bodyweight from '@/modules/bodyweight/screens'
import { SafeAreaView } from "react-native-safe-area-context";

export  default function BodyweightApp() {
  return (
      <>
      <Header title='Bodyweight'/>
      <Bodyweight />
      </>
  )
}
