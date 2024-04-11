import { PropsWithChildren } from "react";
import styles from './backdrop.module.css';

export function Backdrop({ children, open }: PropsWithChildren<{ open: boolean }>) {
  if(!open) return null
  return (
    <div className={styles.backdrop}>
      {children}
    </div>
  )
}
