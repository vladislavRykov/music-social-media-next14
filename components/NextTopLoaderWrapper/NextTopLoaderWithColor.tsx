'use client';
import { useTextColor } from '@/context/TextColorProvider';
import { useCSSVariable } from '@/hooks/useCSSVariables';
import NextTopLoader, { NextTopLoaderProps } from 'nextjs-toploader';
import React, { PropsWithChildren } from 'react';

const NextTopLoaderWithColor = () => {
  const { getCssVariable } = useCSSVariable();
  // const {
  //   textColor,
  // }= useTextColor()
  return (
    <NextTopLoader
      showSpinner={false}
      // color={textColor}
      color={getCssVariable('--profile-text-color')}
    />
  );
};

export default NextTopLoaderWithColor;
