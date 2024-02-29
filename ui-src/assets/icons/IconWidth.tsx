type IconProps = {
  fill?: string,
  width?: number,
  height?: number,
  strokeColor?: string
}

const IconWidth: React.FC<IconProps> = ({ fill, strokeColor, width, height }) => {
  return (
    <svg
      width={width || 20}
      viewBox="0 0 34 16"
      fill={fill || "currentColor"}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M33 8H1m32 0l-6.4 6.4M33 8l-6.4-6.4M1 8l6.4 6.4M1 8l6.4-6.4"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default IconWidth
