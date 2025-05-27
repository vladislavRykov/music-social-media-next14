import React from "react"
import ContentLoader from "react-content-loader"

const BrowseLinearMusicItemLoader = (props) => (
  <ContentLoader 
    speed={1.5}
    width={395}
    height={81}
    viewBox="0 0 395 81"
    backgroundColor="#454868"
    foregroundColor="#7074a1"
    {...props}
  >
    <rect x="0" y="0" rx="5" ry="5" width="70" height="70" /> 
    <rect x="80" y="10" rx="1" ry="1" width="100" height="14" /> 
    <rect x="80" y="29" rx="1" ry="1" width="80" height="14" /> 
    <rect x="80" y="53" rx="0" ry="0" width="156" height="13" /> 
    <rect x="288" y="53" rx="0" ry="0" width="104" height="13" />
  </ContentLoader>
)

export default BrowseLinearMusicItemLoader