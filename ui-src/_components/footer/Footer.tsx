import styles from './Footer.module.css'

function Footer () {
  return (
    <footer className={styles.footer}>

      <div><a href='http://www.wildiney.com' target='_blank'>www.wildiney.com</a></div>
      <div>v.3.0.0</div>

    </footer>
  )
}

export default Footer