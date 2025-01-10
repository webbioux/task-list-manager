import styles from './Toast.module.sass'

const Toast = ({ message }) => {
  return (
    <div 
      role="alert" 
      aria-live="polite"
      className={styles.toast}
    >
      {message}
    </div>
  )
}

export default Toast
