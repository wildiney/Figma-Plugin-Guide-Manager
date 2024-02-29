type IconProps = {
  fill?: string,
  width?: number,
  height?: number,
  strokeColor?: string
}

const IconHeight: React.FC<IconProps> = ({ fill, strokeColor, width, height }) => {
  return (
    <svg
      width={width || 20}
      viewBox="0 0 16 34"
      fill={fill || "currentColor"}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8 1l6.4 6.4M8 33V1v32zm0 0l-6.4-6.4L8 33zm0 0l6.4-6.4L8 33zM8 1L1.6 7.4 8 1z"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default IconHeight
