import { faImage } from "@fortawesome/free-solid-svg-icons";
import { useFile } from "../../../hooks/useFile";
import { BaseInput } from "../base";
import { StyledInput } from "../style";
import { FileProps, InputProps } from "../types";

export function FileInput({ placeholder, onChange, accept = 'images/*', ...props }: InputProps & FileProps) {
  const { handleChange } = useFile(onChange)
  return (
    <BaseInput placeholder={placeholder} icon={faImage}>
      <StyledInput type="file" accept={accept} {...props} onChange={handleChange} />
    </BaseInput>
  )
}
