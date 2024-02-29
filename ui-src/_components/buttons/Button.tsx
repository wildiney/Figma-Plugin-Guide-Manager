import styles from './Button.module.css'

type ButtonProps = {
  label: string,
  onClick: () => void,
  leftIcon?: React.ReactNode,
  rightIcon?: React.ReactNode
}

const Button: React.FC<ButtonProps> = ({ label, onClick, leftIcon, rightIcon }) => {
  return (
    <button className={styles.btn} onClick={onClick}>
      {leftIcon != null ? leftIcon : null}
      {label}
      {rightIcon != null ? rightIcon : null}
    </button>
  )
}

export default Button