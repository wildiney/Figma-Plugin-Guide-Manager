type IconProps = {
  fill?: string,
  width?: number,
  height?: number,
  strokeColor?: string
}
const AddIcon = ({ fill, strokeColor, width, height }: IconProps) => {
  return (
    <svg
      width={width || 20}
      height={height || 20}
      viewBox="0 0 32 32"
      fill={fill || "currentColor"}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M.671 16a1.616 1.616 0 011.618-1.618l12.096.002-.002-12.095a1.618 1.618 0 113.236 0l-.003 12.095 12.096-.002a1.618 1.618 0 110 3.236l-12.096-.002.003 12.095a1.617 1.617 0 11-3.236 0l.002-12.095-12.096.002A1.616 1.616 0 01.671 16z"
        fill="#fff"
      />
    </svg>
  )
}

export default AddIcon