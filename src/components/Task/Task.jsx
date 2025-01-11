import React from 'react'
import { useState, useEffect } from "react"
import StatusBadge from "./StatusBadge"
import DeleteButton from "../shared/DeleteButton"
import styles from './Task.module.sass'

const Task = ({ id, description, status, onUpdate, onDelete, isListExpanded }) => {
  const [isEditing, setIsEditing] = useState(!description)
  const [isTaskOpen, setIsTaskOpen] = useState(false)
  const [taskText, setTaskText] = useState(description || "")

  useEffect(() => {
    if (isEditing) {
      setTaskText(description || "")
    }
  }, [isEditing, description])

  const handleTaskClose = () => {
    setIsTaskOpen(false)
    setIsEditing(false)
  }

  const handleTaskOpen = () => {
    setIsTaskOpen(true)
    setIsEditing(true)
  }
  
  const handleSubmit = () => {
    const trimmedText = taskText.trim()
    if (trimmedText) {
      onUpdate({ description: trimmedText })
      handleTaskClose()
    }
  }

  // Submits task changes when focus leaves input field, unless focus moves to delete button
  const handleInputBlur = (e) => { 
    if (!e.relatedTarget?.closest('.delete-button')) {
      // Only close task if we're not tabbing to the next element
      if (!e.relatedTarget) {
        handleSubmit()
      }
      // If we're tabbing to the next element, keep task open
      else if (e.relatedTarget) {
        handleSubmit()
        setIsTaskOpen(true)
      }
    }
  }

  const handleTaskBlur = (e) => {
    if (!e.relatedTarget?.closest(`[data-task-id="${id}"]`)) {
          handleTaskClose()
        }
  }

  const handleTaskClick = (e) => {
    if (!e.target.closest(".status-badge") && !e.target.closest(".delete-button")) {
      handleTaskOpen()
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !isEditing && e.target === e.currentTarget) {
      e.preventDefault()
      handleTaskOpen()
    }
    if (e.key === 'Escape' && isTaskOpen) {
      e.preventDefault()
      e.stopPropagation()
      handleTaskClose()
    }
  }

  return (
    <div
      className={styles.task}
      data-task-id={id}
      onClick={handleTaskClick}
      onKeyDown={handleKeyDown}
      role="listitem"
      aria-label={`Task: ${description}, Status: ${status}`}
      tabIndex={isListExpanded ? "0" : "-1"}
      onBlur={handleTaskBlur}
    >
      <div className={styles.taskContent}>
        {isEditing ? (
          <form className={styles.taskText} aria-label="Edit task description" onSubmit={handleSubmit}>
            <input
              type="text"
              value={taskText}
              onChange={(e) => setTaskText(e.target.value)}
              onBlur={handleInputBlur}
              aria-label="Edit task description"
              placeholder="Task description"
              autoFocus
            />
          </form>
        ) : (
          <div className={styles.taskText}>{description}</div>
        )}
        <StatusBadge
          status={status}
          onStatusChange={(newStatus) => onUpdate({ status: newStatus })}
          isListExpanded={isListExpanded}
        />
      </div>
      {isTaskOpen && (
        <div className={styles.deleteContainer}>
          <DeleteButton onDelete={onDelete} itemType="task" />
        </div>
      )}
    </div>
  )
}

export default Task
