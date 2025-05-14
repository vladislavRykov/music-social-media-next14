import React from "react"
import ContentLoader from "react-content-loader"

const LibraryItemLoader = (props) => (
  <ContentLoader 
    speed={1.5}
    width={162}
    height={235}
    viewBox="0 0 162 235"
    backgroundColor="#454868"
    foregroundColor="#7074a1"
    {...props}
  >
    <rect x="6" y="6" rx="10" ry="10" width="150" height="150" /> 
    <rect x="6" y="163" rx="1" ry="1" width="110" height="16" /> 
    <rect x="6" y="185" rx="1" ry="1" width="150" height="14" /> 
    <rect x="6" y="200" rx="1" ry="1" width="90" height="14" />
  </ContentLoader>
)

export default LibraryItemLoader