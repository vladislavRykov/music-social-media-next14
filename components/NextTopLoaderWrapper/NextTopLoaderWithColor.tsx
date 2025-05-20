'use client'
import { useCSSVariable } from '@/hooks/useCSSVariables';
import NextTopLoader, { NextTopLoaderProps } from 'nextjs-toploader';
import React, { PropsWithChildren } from 'react';

const NextTopLoaderWithColor = () => {
  const { getCssVariable } = useCSSVariable();
  return <NextTopLoader showSpinner={false} color={getCssVariable('--profile-text-color')} />;
};

export default NextTopLoaderWithColor;
