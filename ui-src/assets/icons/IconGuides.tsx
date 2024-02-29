type IconProps = {
  fill?: string,
  width?: number,
  height?: number,
  strokeColor?: string
}

const IconGuides: React.FC<IconProps> = ({ fill, strokeColor, width, height }) => {
  return (
    <svg
      width={width || 20}
      height={height || 20}
      viewBox="0 0 32 32"
      fill={fill || "currentColor"}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path strokeWidth={3} style={{ stroke: strokeColor }} d="M7.5 0v32" />
      <path strokeWidth={3} style={{ stroke: strokeColor }} d="M24.5 6.55671e-8L24.5 32" />
      <path strokeWidth={3} style={{ stroke: strokeColor }} d="M0 24.5L32 24.5" />
      <path strokeWidth={3} style={{ stroke: strokeColor }} d="M0 7.5L32 7.5" />
    </svg>
  )
}

export default IconGuides