import styled from 'styled-components';

export const StyledSwitch = styled.label<{ activeText: string; disableText: string }>`
  position: relative;
  display: inline-block;
  width: 120px;
  height: 34px;

  input {
    display: none;
  }

  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: ${(props) => props.theme.colors.white};
    border: 2px solid ${(props) => props.theme.colors.black};
    box-shadow: 3px 3px #282825;
    -webkit-transition: 0.4s;
    transition: 0.4s;
    border-radius: 34px;
    &:hover {
      transform: translateX(-4px) translateY(-4px);
      box-shadow: 7px 7px #282825;
    }
    transition-property: all;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 0.15s;
  }

  .slider:before {
    position: absolute;
    content: '';
    height: 20px;
    width: 20px;
    left: 4px;
    bottom: 6px;
    background-color: white;
    -webkit-transition: 0.4s;
    transition: 0.4s;
    border-radius: ${(props) => props.theme.radii.full};
    border: 2px solid ${(props) => props.theme.colors.black};
  }

  input:checked + .slider {
    background-color: #9747ff;
  }

  input:focus + .slider {
    box-shadow: 0 0 1px #2196f3;
  }

  input:checked + .slider:before {
    -webkit-transform: translateX(26px);
    -ms-transform: translateX(26px);
    transform: translateX(85px);
  }

  .slider:after {
    content: '${(props) => props.disableText}';
    color: #000;
    display: block;
    position: absolute;
    transform: translate(-50%, -50%);
    top: 50%;
    left: 50%;
    font-size: 10px;
    font-weight: 700;
    font-family: Verdana, sans-serif;
  }

  input:checked + .slider:after {
    content: '${(props) => props.activeText}';
  }
`;
