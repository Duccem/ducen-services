
import { HTMLAttributes, PropsWithChildren } from "react";
import styles from './card.module.css';

export const Card = ({ children, className}: PropsWithChildren & HTMLAttributes<HTMLDivElement>) => {
  return (
    <div className={styles.card__card + ' ' + className}>
      {children}
    </div>
  )
}

Card.Header = ({ children, className }: PropsWithChildren & HTMLAttributes<HTMLDivElement>) => {
  return (
    <div className={styles.card__header + ' ' + className}>
      {children}
    </div>
  )
}

Card.Content = ({ children, className }: PropsWithChildren & HTMLAttributes<HTMLDivElement>) => {
  return (
    <div className={styles.card__content + ' ' + className}>
      {children}
    </div>
  )
}

Card.Footer = ({ children, className }: PropsWithChildren & HTMLAttributes<HTMLDivElement>) => {
  return (
    <div className={styles.card__footer + ' ' + className}>
      {children}
    </div>
  )
}

Card.Image = ({ children, className }: PropsWithChildren & HTMLAttributes<HTMLDivElement>) => {
  return (
    <div className={styles.card__image + ' ' + className}>
      {children}
    </div>
  )
}
