import styles from './Button.module.css'

type ButtonProps = {
  label: string,
  onClick: () => void,
  leftIcon?: React.ReactNode,
  rightIcon?: React.ReactNode,
  ariaLabel?: string
}

const Button: React.FC<ButtonProps> = ({ label, onClick, leftIcon, rightIcon, ariaLabel }) => {
  return (
    <button
      className={styles.btn}
      onClick={onClick}
      aria-label={ariaLabel || label}
      type="button"
    >
      {leftIcon != null ? leftIcon : null}
      {label}
      {rightIcon != null ? rightIcon : null}
    </button>
  )
}

export default Button