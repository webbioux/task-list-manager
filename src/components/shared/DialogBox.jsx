import React from 'react'
import styles from './DialogBox.module.sass'
import { useEffect, useRef } from 'react'

const DialogBox = ({ message, onConfirm, onClose }) => {
    const dialogRef = useRef(null)
    const firstButtonRef = useRef(null)

    useEffect(() => {
        firstButtonRef.current?.focus()

        const handleTab = (e) => {
            const focusableElements = dialogRef.current?.querySelectorAll('button')
            const firstElement = focusableElements[0]
            const lastElement = focusableElements[focusableElements.length - 1]

            if (e.key === 'Tab') {
                if (e.shiftKey && document.activeElement === firstElement) {
                    e.preventDefault()
                    lastElement.focus()
                } else if (!e.shiftKey && document.activeElement === lastElement) {
                    e.preventDefault()
                    firstElement.focus()
                }
            }
        }

        document.addEventListener('keydown', handleTab)
        return () => document.removeEventListener('keydown', handleTab)
    }, [])

    return (
        <div className={styles.dialogOverlay}>
            <div
                ref={dialogRef}
                className={styles.dialog}
                role="dialog"
                aria-modal="true"
                aria-labelledby="dialog-title"
            >
                <h2 id="dialog-title">{message}</h2>
                <div className={styles.buttons}>
                    <button ref={firstButtonRef} onClick={onClose}>Cancel</button>
                    <button onClick={onConfirm}>Confirm</button>
                </div>
            </div>
        </div>
    )
}


export default DialogBox
