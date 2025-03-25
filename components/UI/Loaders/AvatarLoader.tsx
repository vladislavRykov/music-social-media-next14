import React from 'react';
import ContentLoader from 'react-content-loader';

const AvatarLoader = (props) => (
  <ContentLoader
    speed={2}
    width={320}
    height={160}
    viewBox="0 0 320 160"
    backgroundColor="#5c5c5c"
    foregroundColor="#ffffff"
    {...props}>
    <rect x="0" y="4" rx="4" ry="4" width="160" height="164" />
    <rect x="185" y="118" rx="4" ry="4" width="90" height="20" />
  </ContentLoader>
);

export default AvatarLoader;
