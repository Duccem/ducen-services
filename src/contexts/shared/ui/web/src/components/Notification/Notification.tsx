import { faClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './styles.module.css';
export const Notification = ({ children, closeAction = () => {} }) => {
  const close = () => closeAction();
  return (
    <div className={styles.notification__wrapper}>
      <div className={styles.notification__notification}>
        <div className={styles.notification__header__close} onClick={close}>
          <FontAwesomeIcon icon={faClose} />
        </div>
        {children}
      </div>
    </div>
  );
};

Notification.Header = ({ children }) => {
  return <div className={styles.notification__header}>{children}</div>;
};

Notification.Content = ({ children }) => {
  return <div className={styles.notification__content}>{children}</div>;
};

Notification.Footer = ({ children }) => {
  return <div className={styles.notification__actions}>{children}</div>;
};
