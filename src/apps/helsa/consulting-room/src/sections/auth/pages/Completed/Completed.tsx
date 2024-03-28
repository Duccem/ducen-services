import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { OkButton } from "../../components/OkButton/OkButton";
import styles from './styles.module.css';

export function Completed() {
  return (
    <>
      <div className={styles.completed__page}>
        <div className={styles.completed__container}>
          <div className={styles.completed__box}>
            <div className={styles.completed__icon}>
              <FontAwesomeIcon icon={faCheck}/>
            </div>
            <p className={styles.completed__title}>
              SignUp completed
            </p>
            <p className={styles.completed__subtitle}>
              You can go to login
            </p>
            <OkButton route={'/auth/login'}></OkButton>
          </div>
        </div>
      </div>
    </>
  )
}
