type IconProps = {
  fill?: string,
  width?: number,
  height?: number,
  strokeColor?: string
}

const IconClearGuides: React.FC<IconProps> = ({ fill, strokeColor, width, height }) => {
  return (
    <svg
      width={width || 20}
      height={height || 20}
      viewBox="0 0 32 32"
      fill={fill || "currentColor"}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M.671.671a2.285 2.285 0 013.236 0L16.001 12.77 28.094.671a2.287 2.287 0 113.236 3.236L19.232 16.001 31.33 28.094a2.287 2.287 0 11-3.236 3.236L16.001 19.232 3.907 31.33a2.288 2.288 0 11-3.236-3.236L12.77 16.001.671 3.907a2.285 2.285 0 010-3.236z"
        style={{ stroke: strokeColor }}
      />
    </svg>
  )
}

export default IconClearGuides
