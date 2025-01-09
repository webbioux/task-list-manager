import { useState, useEffect } from "react"
import StatusBadge from "./StatusBadge"
import DeleteButton from "../shared/DeleteButton"

const Task = ({ id, description, status, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(!description)
  const [taskText, setTaskText] = useState(description || "")

  useEffect(() => {
    if (isEditing) {
      setTaskText(description || "")
    }
  }, [isEditing, description])

  const handleSubmit = (e) => {
    e.preventDefault()
    const trimmedText = taskText.trim()
    if (trimmedText) {
      onUpdate({ description: trimmedText })
      setIsEditing(false)
    }
  }

  // Submits task changes when focus leaves input field, unless focus moves to delete button
  const handleBlur = (e) => {
    if (!e.relatedTarget?.closest('.delete-button')) {
      handleSubmit(e)
    }
  }

  const handleTaskClick = (e) => {
    if (!e.target.closest(".status-badge") && !e.target.closest(".delete-button")) {
      setIsEditing(true)
    }
  }

  return (
    <div
      className="task"
      onClick={handleTaskClick}
      role="listitem"
      aria-label={`Task: ${description}, Status: ${status}`}
    >
      {isEditing ? (
        <form aria-label="Edit task description" onSubmit={handleSubmit}>
          <input
            type="text"
            value={taskText}
            onChange={(e) => setTaskText(e.target.value)}
            onBlur={handleBlur}
            aria-label="Task description"
            placeholder="Task description"
            autoFocus
          />
        </form>
      ) : (
        <div>{description}</div>
      )}
      <StatusBadge 
        status={status} 
        onChange={(newStatus) => onUpdate({ status: newStatus })} 
      />
      {isEditing && <DeleteButton onDelete={onDelete} itemType="task"/>}
    </div>
  )
}

export default Task
