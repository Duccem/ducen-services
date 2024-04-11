import { useUserContext } from "@/modules/user/state/UserContext";
import { Button } from "@ducen/ui-web";
import { UserRoles } from "@helsa/modules";
import { useNavigate } from "react-router-dom";
import doctorImage from '../../../../assets/images/nutritionist.png';
import patientImage from '../../../../assets/images/ophthalmology.png';
import styles from './styles.module.css';

export function SelectRegister() {
  const navigate = useNavigate();
  const { setRegisterType, setPartialUser, userState: { registerType } } = useUserContext()
  const selectAndGoToRegister = (type: 'DOCTOR' | 'PATIENT') => {
    setRegisterType(type);
    setPartialUser({
      role: type as UserRoles
    });
  }
  return (
    <>
      <div className={styles.choose__page}>
        <div className={styles.choose__header}>
          <p className={styles.choose__title}>How you want to register?</p>
        </div>

        <div className={styles.choose__cards__container}>
          <div
            className={styles.choose__card + ' ' + (registerType === 'DOCTOR' ? styles.choose__card__active : '')}
            onClick={() => selectAndGoToRegister('DOCTOR')}
          >
              <img src={doctorImage} className={styles.choose__card__image} alt="" />
              <p className={styles.choose__card__title}>Doctor</p>
              <p className={styles.choose__card__subtitle}>Professional health personnel, determined to improve and save lives</p>
          </div>
          <div
            className={styles.choose__card + ' ' + (registerType === 'PATIENT' ? styles.choose__card__active : '')}
            onClick={() => selectAndGoToRegister('PATIENT')}
          >
            <img src={patientImage} className={styles.choose__card__image} alt="" />
              <p className={styles.choose__card__title}>Patient</p>
              <p className={styles.choose__card__subtitle}>I need help to improve my health</p>
          </div>
        </div>
        <Button className={styles.choose__button} onClick={() => navigate('/auth/register-user')}>Start</Button>
      </div>
    </>
  );
}
