import { usePathname, useRouter } from "expo-router"
import { ChartArea, Rows2, Ruler } from "lucide-react-native"
import { Pressable, View, Text } from "react-native"

const navItems = [
  {
    label: 'Home', href: '/home', icon: Rows2
  },
  {
    label: 'Routines', href: '/routines', icon: Rows2
  },
  {
    label: 'Bodyweight', href: '/bodyweight', icon: Ruler
  },
  {
    label: 'Insights', href: '/insights', icon: ChartArea
  },
]
export function Navbar() {

    const router = useRouter()
    const pathname = usePathname()
  return (
    <View className='h-20 bg-[#0c0c0c] flex-row'>


          {navItems.map((item) => {
            const isActive = pathname === item.href
            const textClassName = 'text-sm text-white '
            return (
              // @ts-ignore
              <Pressable onPress={() => router.push(item.href)} key={item.href} className='flex-1  items-center justify-center '>
                <item.icon  className="mb-1 text-white" />
                <Text className={isActive ? `${textClassName} text-white`: `${textClassName} text-natural-400`}>{item.label}</Text>
              </Pressable>
            )
          })}
        </View>
  )
}
