const DeleteButton = ({ onDelete, itemType }) => {
  const handleClick = (e) => {
    e.stopPropagation()
    onDelete()
  }

  return (
    <button
      className="delete-button"
      onClick={handleClick}
      aria-label={`Delete ${itemType}`}
      tabIndex="0"
    >
      Delete
    </button>
  )
}



export default DeleteButton
