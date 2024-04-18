import { Button } from "@ducen/ui-web"
import { useNavigate } from "react-router-dom"
import styles from './styles.module.css'

export function OkButton({ route }) {
  const location = useNavigate()
  const goTo = () => location(route)
  return (
    <Button className={styles.ok__button} onClick={goTo}>Login</Button>
  )
}
