type IconProps = {
  fill?: string,
  width?: number,
  height?: number
}

function IconWarning ({ fill, width, height }: IconProps) {
  return (
    <svg
      width={width || 12}
      height={height || 12}
      viewBox="0 0 24 24"
      fill={fill || "currentColor"}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M23.73 19.556c.769 1.333-.196 3-1.733 3H2.002c-1.539 0-2.5-1.67-1.732-3l9.998-17.334c.77-1.334 2.696-1.332 3.464 0l9.998 17.334zM12 15.972a1.917 1.917 0 100 3.834 1.917 1.917 0 000-3.834zm-1.82-6.89l.31 5.667a.5.5 0 00.499.473h2.022a.5.5 0 00.5-.473l.309-5.666a.5.5 0 00-.5-.527h-2.64a.5.5 0 00-.5.527z" />
    </svg>
  )
}

export default IconWarning
