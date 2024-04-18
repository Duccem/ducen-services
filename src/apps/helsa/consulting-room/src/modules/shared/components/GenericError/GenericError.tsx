import { faBan } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Button, Notification } from "@ducen/ui-web"
import styles from './styles.module.css'
export const GenericError = ({ error, action }) => {
  return (
    <Notification closeAction={action}>
      <Notification.Header>
        <div className={styles.generic__header}>
          <p className={styles.generic__title}>{error.message}</p>
          <FontAwesomeIcon icon={faBan} color="#ea3a3d"/>
        </div>
      </Notification.Header>
      <Notification.Content>
        <p>Ha ocurrido un error ejecutando la acción, por favor vuelva a intentarlo mas tarde</p>
      </Notification.Content>
      <Notification.Footer>
        <Button onClick={action} className={styles.generic__button}>
          Ok
        </Button>
      </Notification.Footer>
    </Notification>
  )
}
