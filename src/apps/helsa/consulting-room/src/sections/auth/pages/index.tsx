import { Outlet } from 'react-router-dom';
import banner from '../../../assets/images/banner2-removebg.png';
import { UserProvider } from '../../../modules/user/state/UserContext';
import { BackButton } from '../components/BackButton/BackButton';
import styles from './index.module.css';
export function AuthIndex() {
  return (
    <>
      <UserProvider>
        <div className={styles.auth_layout}>
          <div className={styles.auth_layout__left}>
            <div className={styles.auth_layout__header}>
              <h1 className={styles.auth_layout__logo}>Helsa</h1>
              <BackButton to={'/auth/login'} text={'Back to login'}></BackButton>
            </div>
            <div className={styles.auth_layout__content}>
              <Outlet/>
            </div>
          </div>
          <div className={styles.auth_layout__right}>
            <div className={styles.auth_layout__banner}>
              <img src={banner} alt="banner" className={styles.auth_layout__image}></img>
            </div>
          </div>
        </div>
      </UserProvider>
    </>
  );
}
