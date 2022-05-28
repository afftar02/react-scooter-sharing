import React from "react"
import ContentLoader from "react-content-loader"

const CardSkeleton = (props) => (
  <ContentLoader 
    speed={2}
    width={330}
    height={400}
    viewBox="0 0 270 340"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="75" y="30" rx="5" ry="5" width="105" height="170" /> 
    <rect x="58" y="215" rx="5" ry="5" width="140" height="17" /> 
    <rect x="28" y="252" rx="5" ry="5" width="80" height="20" /> 
    <rect x="164" y="250" rx="5" ry="5" width="65" height="25" /> 
    <rect x="70" y="289" rx="10" ry="10" width="120" height="35" />
  </ContentLoader>
)

export default CardSkeleton;