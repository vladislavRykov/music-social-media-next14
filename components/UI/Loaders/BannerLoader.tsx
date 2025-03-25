import React from 'react';
import ContentLoader from 'react-content-loader';

const BannerLoader = (props) => (
  <div style={{ height: '350px' }}>
    <ContentLoader
      width={'100%'} // Ширина 100% от родительского элемента
      speed={2}
      {...props}
      height={350}
      backgroundColor="#d9d9d9"
      foregroundColor="#ffffff"
      {...props}>
      <rect x="0" y="0" rx="0" ry="0" width="100%" height="350" />
    </ContentLoader>
  </div>
);

export default BannerLoader;
