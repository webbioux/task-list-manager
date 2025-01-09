import { useState, useEffect } from "react"
import Task from "../Task/Task"
import StatusFilter from "./StatusFilter"
import DeleteButton from "../shared/DeleteButton"

const TaskList = ({ id, name, tasks, onDelete, onUpdateName, onAddTask, onUpdateTask, onDeleteTask }) => {
  // Default state for TaskList is "overview" showing only number of tasks specified in numberOfVisibleTasksInOverview.
  // Changing state from "overview" to "expanded" will show all tasks.
  const [isExpanded, setIsExpanded] = useState(false)
  const [editingName, setEditingName] = useState(!name)
  const [currentStatusFilter, setCurrentStatusFilter] = useState("all")
  const [listName, setListName] = useState(name)
  // Number of tasks shown when the list is not expanded
  const numberOfVisibleTasksInOverview = 3

  useEffect(() => {
    if (!isExpanded) {
      setCurrentStatusFilter("all")
    }
  }, [isExpanded])
  
  const handleListClick = (e) => {
    if (!e.target.closest(".task") && !isExpanded) {
      setIsExpanded(true)
    }
  }

  const visibleTasks = tasks
    .filter(task => currentStatusFilter === "all" || task.status === currentStatusFilter)
    .sort((a, b) => a.status === "done" ? 1 : b.status === "done" ? -1 : 0)

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

  return (
    <>
      {isExpanded && (
        <div 
          className="modal-overlay"
          onClick={() => setIsExpanded(false)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.5)',
            zIndex: 100
          }}
        />
      )}
      <div 
        className={`task-list ${isExpanded ? "expanded" : ""}`}
        onClick={handleListClick}
        data-list-id={id}
        role="region"
        aria-label={`Task list: ${name}`}
        style={{
          position: isExpanded ? 'fixed' : 'relative',
          zIndex: isExpanded ? 101 : 1,
          background: 'white',
          ...(isExpanded && {
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            maxWidth: '80%',
            maxHeight: '80vh',
            overflowY: 'auto'
          })
        }}
      >
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
              <h2 onClick={handleNameClick}
                style={{
                  width: '200px',
                  height: '50px',
                }}>{name}</h2>
          )}
          {isExpanded && (
            <>
              <StatusFilter value={currentStatusFilter} onChange={setCurrentStatusFilter} />
              <button
                onClick={() => setIsExpanded(false)}
                aria-label="Close task list"
              >Close</button>
            </>
          )}
        </header>

        <div role="list" className="tasks">
          {visibleTasks.slice(0, isExpanded ? undefined : numberOfVisibleTasksInOverview).map(task => (
            <Task
              key={task.id}
              {...task}
              onUpdate={(updates) => onUpdateTask(id, task.id, updates)}
              onDelete={() => onDeleteTask(id, task.id, task.description, name)}
            />
          ))}
        </div>
        
        {!isExpanded && tasks.length > numberOfVisibleTasksInOverview && <div>...</div>}

        <footer>
          <button
            onClick={() => onAddTask(id)}
            aria-label={`Add new task to ${name}`}
          >Add Task</button>
          {isExpanded && <DeleteButton onDelete={() => onDelete(id, name)} itemType="task list" />}
        </footer>
      </div>
    </>
  )
}

export default TaskList
