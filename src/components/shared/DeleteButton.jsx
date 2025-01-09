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
    >
      Delete
    </button>
  )
}



export default DeleteButton
