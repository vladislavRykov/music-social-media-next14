import React from "react"
import ContentLoader from "react-content-loader"

const PostItemLoader = (props) => (
  <ContentLoader 
    speed={1.5}
    width={700}
    height={427}
    viewBox="0 0 700 427"
    backgroundColor="#454868"
    foregroundColor="#7074a1"
    {...props}
  >
    <rect x="10" y="10" rx="1" ry="1" width="680" height="300" /> 
    <rect x="240" y="320" rx="1" ry="1" width="220" height="22" /> 
    <rect x="20" y="353" rx="1" ry="1" width="660" height="28" /> 
    <rect x="288" y="390" rx="8" ry="8" width="124" height="24" />
  </ContentLoader>
)

export default PostItemLoader