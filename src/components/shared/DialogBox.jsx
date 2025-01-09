const DialogBox = ({ message, onConfirm, onClose }) => {
  return (
    <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="dialog-title"
    >
        <h2 id="dialog-title">{message}</h2>
        <button aria-label="Confirm action" onClick={onConfirm}>Confirm</button>
        <button aria-label="Cancel action" onClick={onClose}>Cancel</button>
    </div>
  )
}

export default DialogBox
