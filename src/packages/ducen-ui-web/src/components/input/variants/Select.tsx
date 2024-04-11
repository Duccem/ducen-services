import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { InputHTMLAttributes, useRef, useState } from "react";
import { useAutocomplete } from "../../../hooks/useAutocomplete";
import useOutsideClick from "../../../hooks/useClickOutside";
import { useKeyboardShortcut } from "../../../hooks/useKeyboardShortcut";
import { InputContainer } from "../components/Container";
import styles from '../input.module.css';
export type SelectProps = { onChange?: (value: string) => void; options?: { icon: any; label: string; value: string }[]; autocomplete?: boolean };
export const SelectInput = ({ placeholder, options, onChange , autocomplete, ...props }: InputHTMLAttributes<HTMLInputElement> & SelectProps) => {
  const [innerValue, setInnerValue] = useState('');
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState(0);
  const wrapperRef = useRef(null);
  const { filtered } = useAutocomplete(options, innerValue, autocomplete)
  useKeyboardShortcut(
    ["arrowdown"],
    () => {
      setActive((pa) => (pa === filtered.length - 1 ? 0 : pa + 1));
    },
    open
  );
  useKeyboardShortcut(
    ["arrowup"],
    () => {
      setActive((pa) => (pa <= 0 ? options.length - 1 : pa - 1));
    },
    open
  );

  useKeyboardShortcut(
    ["enter"],
    () => {
      const value = options[active]?.value;

      if (value !== undefined) {
        setInnerValue(value);
        onChange && onChange(value);
        setOpen(false);
        setActive(-1);
      }
    },
    open
  );

  useKeyboardShortcut(
    ["escape"],
    () => {
      setOpen(false);
      setActive(-1);
    },
    open
  );
  useOutsideClick(wrapperRef, () => {
    setOpen(false);
  });
  const handleClick = (newValue: string) => {
    setOpen(!open)
    setInnerValue(newValue)
    onChange && onChange(newValue)
  }
  return (
    <InputContainer ref={wrapperRef} placeholder={placeholder} {...props} icon={<SelectIcon />} iconAction={() => setOpen(!open)}>
      <input
        className={styles.input__input}
        type="text"
        autoComplete="off"
        placeholder="&nbsp;"
        value={innerValue}
        onChange={(event) => setInnerValue(event.target.value)}
        onClick={() => setOpen(!open)}
        data-autocomplete-disabled={!autocomplete}
      />
      <div className={styles.input__select__wrapper} style={{display: open ? 'block' : 'none'}}>
        <div className={styles.input__select__options}>
          {
            filtered.map((option, index) => (
              <div
                className={styles.input__select__option}
                key={option.value + index.toString()}
                style={{ backgroundColor: index === active ? 'var(--color-core-primary-violet)' : 'var(--color-background-secondary-white)' }}
                onClick={() => handleClick(option.value)}
              >
                { option.icon && <img className={styles.input__select__image} src={option.icon}/> }
                <span className={styles.input__select__span}>{option.label}</span>
              </div>
            ))
          }
        </div>
      </div>
    </InputContainer>
  );
}

const SelectIcon = () => (
  <FontAwesomeIcon icon={faAngleDown}/>
)
