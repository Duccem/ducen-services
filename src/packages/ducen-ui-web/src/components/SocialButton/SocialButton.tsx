import styles from './SocialButton.module.css';
import { SocialButtonProps } from "./SocialButton.props";
export function SocialButton({ image, children }: SocialButtonProps) {
  return (
    <div className={ styles.social__social }>
      { children ? children : (<img src={image} alt="" className="image"/>) }
    </div>
  )
}
