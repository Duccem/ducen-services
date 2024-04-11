
import { HTMLAttributes } from "react";
import styles from './switch.module.css';

export function Switch({ activeText, disableText, className, ...props }: HTMLAttributes<HTMLInputElement> & { activeText: string, disableText: string }) {
  return <>
    <label className={styles.switch__switch + ' ' + className}>
      <input type="checkbox" name="" id="" {...props}/>
      <span className={styles.slider} data-disabled-content={disableText} data-active-content={activeText}></span>
    </label>
  </>
}
