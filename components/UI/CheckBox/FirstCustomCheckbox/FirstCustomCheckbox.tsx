import React from 'react';
import s from './FirstCustomCheckbox.module.scss';
import styled from 'styled-components';
import { Checkmark, CustomCheckboxContainer, Input } from './FirstCustomCheckbox.styled';

type FirstCustomCheckboxProps = {
  isSelected: boolean;
  colors?: {
    iconColor?: string;
    backgroundColor?: string;
    hoverColor?: string;
  };
  action: () => void;
};

const FirstCustomCheckbox: React.FC<FirstCustomCheckboxProps> = ({
  colors,
  isSelected,
  action,
}) => {
  return (
    <CustomCheckboxContainer>
      <Input type="checkbox" onChange={action} checked={isSelected} />
      <Checkmark colors={colors}></Checkmark>
    </CustomCheckboxContainer>
  );
};

export default FirstCustomCheckbox;
