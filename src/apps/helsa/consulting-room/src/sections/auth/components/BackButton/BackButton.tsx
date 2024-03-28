import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useLocation } from "react-router-dom";
import styles from './styles.module.css';
export function BackButton({ text, to }) {
  const location = useLocation()
  if (location.pathname == '/auth/login') return null;
  return (
    <>
    <Link to={to} className={styles.back__button}>
      <FontAwesomeIcon className='' icon ={faAngleLeft}/>
      <span className={styles.back__button__span}>
        {text}
      </span>
    </Link>
  </>
  )
}
