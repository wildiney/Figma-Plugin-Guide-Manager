const IconGuides = ({ width = 20, height = 20 }: { width?: number; height?: number }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path strokeWidth={3} d="M7.5 0v32" />
      <path strokeWidth={3} d="M24.5 0L24.5 32" />
      <path strokeWidth={3} d="M0 24.5L32 24.5" />
      <path strokeWidth={3} d="M0 7.5L32 7.5" />
    </svg>
  )
}

export default IconGuides
