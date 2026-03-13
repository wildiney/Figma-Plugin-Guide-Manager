const IconHeight = ({ height = 20 }: { height?: number }) => {
  return (
    <svg
      height={height}
      viewBox="0 0 16 34"
      fill="none"
      stroke="currentColor"
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
