import { useState, useEffect } from "react"
import Task from "../Task/Task"
import StatusFilter from "./StatusFilter"
import DeleteButton from "../shared/DeleteButton"
import styles from './TaskList.module.sass'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsis, faPlus, faXmark } from '@fortawesome/free-solid-svg-icons'

const TaskList = ({ id, name, tasks, onDelete, onUpdateName, onAddTask, onUpdateTask, onDeleteTask }) => {
  // Default state for TaskList is "overview" showing only number of tasks specified in numberOfVisibleTasksInOverview.
  // Changing state from "overview" to "expanded" will show all tasks.
  const [isExpanded, setIsExpanded] = useState(false)
  const [editingName, setEditingName] = useState(!name)
  const [currentStatusFilter, setCurrentStatusFilter] = useState("all")
  const [listName, setListName] = useState(name)
  // Number of tasks shown when the list is not expanded
  const numberOfVisibleTasksInOverview = 8
  const filteredTasks = tasks.filter(task => currentStatusFilter === "all" || task.status === currentStatusFilter)
  const visibleTasks = filteredTasks.slice(0, isExpanded ? undefined : numberOfVisibleTasksInOverview)

  useEffect(() => {
    if (!isExpanded) {
      setCurrentStatusFilter("all")
    }
  }, [isExpanded])
  
  const handleListClick = (e) => {
    // console.log("Clicked element class:", e.target.className)
    if (e.target.closest('.icon-ellipsis')) {
      setIsExpanded(true)
    }
    else if (
      (typeof e.target?.className === 'string' &&
        (e.target.className.includes('task-list') ||
          e.target.className.includes('moreTasks') ||
          e.target.className === 'task-list-content')) &&
      !isExpanded
    ) {
      setIsExpanded(true)
    }
  }

  const handleNameClick = (e) => {
    e.stopPropagation()
    setEditingName(true)
  }
  
  const handleNameSubmit = (e) => {
    e.preventDefault()
    const trimmedName = listName.trim()
    const success = onUpdateName(id, trimmedName)
    if (success) {
      setEditingName(false)
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Escape' && isExpanded) {
      setIsExpanded(false)
    }
      if (e.key === 'Enter' && !isExpanded && e.target.className.includes('task-list')) {
      setIsExpanded(true)
    }
  }

  const handleAddTask = () => {
    if (tasks.length >= numberOfVisibleTasksInOverview) {
      setIsExpanded(true)
    }
    onAddTask(id)
  }

  return (
    <>
      {isExpanded && (
        <div
          className={styles.modalOverlay}
          onClick={() => setIsExpanded(false)}
        />
      )}
      <div
        className={`task-list ${styles.taskList} ${isExpanded ? styles.expanded : ""}`}
        onClick={handleListClick}
        data-list-id={id}
        aria-label={`Task list: ${name}`}
        aria-expanded={isExpanded}
        onKeyDown={handleKeyDown}
        tabIndex="0"
      >
        <div className="task-list-content" aria-hidden={!isExpanded}>
          <header>
            {editingName ? (
              <form onSubmit={handleNameSubmit}>
                <input
                  type="text"
                  value={listName}
                  onChange={(e) => setListName(e.target.value)}
                  onBlur={handleNameSubmit}
                  placeholder="New task list name"
                  aria-label="New task list name"
                  autoFocus
                />
              </form>
            ) : (
                <h2
                  onClick={handleNameClick}
                  className={styles.listTitle}
                >{name}</h2> 
            )}
            {isExpanded && (
              <>
                <StatusFilter value={currentStatusFilter} onChange={setCurrentStatusFilter} />
                <button
                  className={styles.closeButton}
                  onClick={() => setIsExpanded(false)}
                  aria-label="Close task list"
                ><FontAwesomeIcon icon={faXmark} aria-hidden="true" /></button>
              </>
            )}
          </header>
          
          <div
            role="list"
            aria-label="Tasks"
            aria-live="polite"  
            className="tasks">
            {visibleTasks.map(task => (
              <Task
                key={task.id}
                {...task}
                isListExpanded={isExpanded}
                onUpdate={(updates) => onUpdateTask(id, task.id, updates)}
                onDelete={() => onDeleteTask(id, task.id, task.description, name)}
              />
            ))}
          </div>
          
          {!isExpanded && tasks.length > numberOfVisibleTasksInOverview &&
            <div className={styles.moreTasks}>
              <FontAwesomeIcon icon={faEllipsis} className="icon-ellipsis" />
            </div>
          }
          
          <footer className={isExpanded ? styles.expanded : ""}>  
            <button
              onClick={handleAddTask}
              aria-label={`Add new task to ${name}`}
              tabIndex={isExpanded ? "0" : "-1"}
            >
              <FontAwesomeIcon icon={faPlus} aria-hidden="true" className="icon-spacing" /> Add task</button>
            {isExpanded && <DeleteButton onDelete={() => onDelete(id, name)} itemType="task list" />}
          </footer>
        </div>
      </div>
    </>
  )
}

export default TaskList
