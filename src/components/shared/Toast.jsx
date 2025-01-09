const Toast = ({ message }) => {
  return (
    <div 
      role="alert" 
      aria-live="polite"
      style={{ position: "fixed", top: "50px", right: "50%" }}
    >
      {message}
    </div>
  )
}

export default Toast
