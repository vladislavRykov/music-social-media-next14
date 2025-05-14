import React from 'react';
import ContentLoader from 'react-content-loader';

const BrowseMusicItemLoader = (props) => (
  <ContentLoader 
    speed={1.5}
    width={200}
    height={248}
    viewBox="0 0 200 248"
    backgroundColor="#454868"
    foregroundColor="#7074a1"
    {...props}
  >
    <rect x="0" y="0" rx="5" ry="5" width="200" height="200" /> 
    <rect x="0" y="210" rx="1" ry="1" width="145" height="14" /> 
    <rect x="0" y="234" rx="1" ry="1" width="120" height="14" />
  </ContentLoader>
);

export default BrowseMusicItemLoader;
