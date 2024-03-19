import { faImage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { InputHTMLAttributes } from "react";
import { useFile } from "../../..";
import { InputContainer } from "../components/Container";
import styles from '../input.module.css';

type AcceptFile = 'images/*' | 'audio/*' | 'video/*' | '.pdf' | '.doc,.docx' | '.xlsx' | '.xml';
type FileProps = InputHTMLAttributes<HTMLInputElement> & { onChange?: (value: string) => void, accept: AcceptFile };
const FileIcon = ()=> (
  <FontAwesomeIcon icon={faImage}/>
)

export const File = ({ placeholder, onChange, accept, ...props }: FileProps) => {
  const { handleChange } = useFile(onChange)
  return (
    <InputContainer placeholder={placeholder} icon={<FileIcon/>} {...props}>
      <input className={styles.input__input} placeholder="&nbsp;" type="file" {...props} accept={accept} onChange={handleChange}/>
    </InputContainer>
  )
}
