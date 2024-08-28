import IconWarning from '../../assets/icons/IconWarning'
import styles from './Alerts.module.css'

const Alerts = () => {
  return (
    <div role='alert' className={styles.warning}>
      <p><IconWarning /> Select frame</p>
    </div>
  )
}

export default Alerts