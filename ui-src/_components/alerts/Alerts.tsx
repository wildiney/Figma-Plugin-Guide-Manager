// import iconWarning from '../../assets/icons/icon_warning.svg'
import IconWarning from '../../assets/icons/IconWarning'
import styles from './Alerts.module.css'

function Alerts () {
  return (
    <div className={styles.warning}>
      <p><IconWarning /> Select frame</p>
    </div>
  )
}

export default Alerts