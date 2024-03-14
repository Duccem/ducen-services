import { Button } from "@shared/ui-web"
import { useNavigate } from "react-router-dom"

export function OkButton({ route }) {
  const location = useNavigate()
  const goTo = () => location(route)
  return (
    <Button width={'percent.small'} className="mt-[20px]" onClick={goTo}>Login</Button>
  )
}
