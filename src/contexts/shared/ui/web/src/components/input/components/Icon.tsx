import styles from '../input.module.css';
export const InputIcon = ({ icon, iconAction }) => {
  if(!icon) return null;
  return (
    <div onClick={iconAction} className={styles.input__icon}>
      {icon}
    </div>
  )
}
