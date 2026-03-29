import { EllipsisVertical } from "lucide-react-native";

export function Header(props: {title: string}) {
    return (
      <div className="flex justify-between">
        <h1 className="text-[1.5em] font-bold mb-2">{props.title}</h1>
        <span><EllipsisVertical /></span>
      </div>
    )
}
