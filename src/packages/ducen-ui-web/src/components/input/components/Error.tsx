import styles from '../input.module.css';

export const InputError = ({ error }: { error: string }) =>  {
  if (!error) return null;
  return (
    <ul className={styles.input__error}>
      {
        error
      }
    </ul>
  )
}
