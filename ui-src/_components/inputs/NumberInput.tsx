import styles from './NumberInput.module.css'

type NumberInputProps = {
  id: string
  label: string
  value: string
  min?: number
  placeholder?: string
  onChange: (value: string) => void
}

export default function NumberInput ({ id, label, value, min = 0, placeholder, onChange }: NumberInputProps) {
  return (
    <div className={styles.wrapper}>
      <label htmlFor={id} className={styles.label}>{label}</label>
      <input
        id={id}
        type="number"
        min={min}
        value={value}
        placeholder={placeholder ?? '0'}
        className={styles.input}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  )
}
