import styles from './Footer.module.css'
import { PLUGIN_VERSION } from '../../../constants'

function Footer () {
  return (
    <footer className={styles.footer} data-testid="footer">
      <div><a href='http://www.wildiney.com' target='_blank'>www.wildiney.com</a></div>
      <div>{PLUGIN_VERSION}</div>
    </footer>
  )
}

export default Footer