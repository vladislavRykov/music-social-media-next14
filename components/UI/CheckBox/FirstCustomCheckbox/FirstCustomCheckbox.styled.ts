import styled from 'styled-components';

export const CustomCheckboxContainer = styled.label`
  display: inline-block;
  vertical-align: middle;
  cursor: pointer;
  position: relative; // Для абсолютного позиционирования checkmark
  width: 20px;
  height: 20px;
`;

export const Input = styled.input`
  display: none; // Скрываем стандартный checkbox
`;

export const Checkmark = styled.span<{
  colors?: { iconColor?: string; backgroundColor?: string; hoverColor?: string };
}>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: transparent;
  outline: 1px solid ${({ colors }) => colors?.backgroundColor || '#ccc'};
  padding: 2px;

  &:hover {
    background-color: ${({ colors }) => colors?.hoverColor || 'rgba(0, 0, 0, 0.119)'};
  }

  ${Input}:checked + & {
    background-color: ${({ colors }) =>
      colors?.backgroundColor || '#ccc'}; // Используем цвет из пропсов
  }

  ${Input}:checked + &::after {
    content: '\\2713'; // Unicode символ галочки
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 14px;
    color: ${({ colors }) => colors?.iconColor || 'black'};
  }
`;
