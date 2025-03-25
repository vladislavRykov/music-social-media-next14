import React from 'react';
import ContentLoader, { IContentLoaderProps } from 'react-content-loader';

interface ImgLoaderProps extends IContentLoaderProps {
  width: string;
  height: string;
}

const ImgLoader: React.FC<ImgLoaderProps> = ({ width, height, ...rest }) => (
  <ContentLoader
    speed={1.5}
    width={width}
    height={height}
    viewBox={`0 0 ${width} ${height}`}
    backgroundColor="#454868"
    foregroundColor="#7074a1"
    {...rest}>
    <rect x="0" y="0" rx="5" ry="5" width={width} height={height} />
  </ContentLoader>
);

export default ImgLoader;
