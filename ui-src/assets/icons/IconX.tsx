type IconProps = {
  fill?: string,
  width?: number,
  height?: number,
  strokeColor?: string
}

const IconX: React.FC<IconProps> = ({ fill, strokeColor, width, height }) => {
  return (
    <svg
      width={width || 20}
      height={height || 20}
      viewBox="0 0 32 32"
      fill={fill || "currentColor"}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M16 0C7.164 0 0 7.164 0 16s7.164 16 16 16 16-7.164 16-16S24.836 0 16 0zm2.94 23.738L16 18.46l-3.107 5.277h-3.76l4.977-7.885-4.735-7.59h3.864l2.76 5.04 2.836-5.04h3.737l-4.735 7.464 5.03 8.011H18.94z" />
    </svg>
  )
}

export default IconX
