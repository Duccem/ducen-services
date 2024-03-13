import { colors } from '../../utils/theme/colors';
import { SocialButtonProps } from "./SocialButton.props";
import { StyledSocialButton } from "./SocialButton.style";

export function SocialButton({ image, color= colors.white, children }: SocialButtonProps) {
  return (
    <StyledSocialButton color={color}>
      { children ? children : (<img src={image} alt="" className="image"/>) }
    </StyledSocialButton>
  )
}
