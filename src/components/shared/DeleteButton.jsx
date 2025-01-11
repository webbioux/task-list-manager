import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'
import styles from './DeleteButton.module.sass'

const DeleteButton = ({ onDelete, itemType }) => {
  const handleClick = (e) => {
    e.stopPropagation()
    onDelete()
  }

  return (
    <button
      className={styles.deleteButton}
      onClick={handleClick}
      aria-label={`Delete ${itemType}`}
      tabIndex="0"
    >
      <FontAwesomeIcon icon={faTrashCan} aria-hidden="true" className="icon-spacing" />{`Delete ${itemType}`}
    </button>
  )
}



export default DeleteButton
