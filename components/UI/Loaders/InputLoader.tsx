import React from 'react';
import ContentLoader from 'react-content-loader';

const InputLoader = (props) => (
  <ContentLoader
    speed={1.5}
    width={'100%'}
    height={40}
    backgroundColor="#c9c9c9"
    foregroundColor="#ffffff"
    {...props}>
    <rect x="0" y="0" rx="4" ry="4" width="100%" height="40" />
  </ContentLoader>
);

export default InputLoader;
