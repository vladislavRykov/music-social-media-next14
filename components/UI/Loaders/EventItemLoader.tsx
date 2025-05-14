import React from "react"
import ContentLoader, { IContentLoaderProps } from "react-content-loader"

const EventItemLoader = (props:IContentLoaderProps) => (
  <ContentLoader 
    speed={1.5}
    width={300}
    height={337}
    viewBox="0 0 300 337"
    backgroundColor="#454868"
    foregroundColor="#7074a1"
    {...props}
  >
    <rect x="8" y="8" rx="1" ry="1" width="284" height="200" /> 
    <rect x="13" y="218" rx="1" ry="1" width="252" height="30" /> 
    <rect x="13" y="252" rx="1" ry="1" width="274" height="42" /> 
    <rect x="13" y="299" rx="1" ry="1" width="142" height="22" />
  </ContentLoader>
)

export default EventItemLoader