import { Button } from "@shared/ui-web"
import { useNavigate } from "react-router-dom"

export function OkButton({ route }) {
  const location = useNavigate()
  const goTo = () => location(route)
  return (
    <Button className="mt-[var(--spacing-vertical-medium)] w-[var(--size-relative-small)]" onClick={goTo}>Login</Button>
  )
}
