import { useState } from "react"
import { v4 as uuidv4 } from "uuid"
import TaskListsOverview from "./components/TaskListsOverview"
import DialogBox from "./components/shared/DialogBox"
import Toast from "./components/shared/Toast"
import { truncateText } from "./utils/textUtils"
import useLocalStorage from "./hooks/useLocalStorage"

const App = () => {
  const [taskLists, setTaskLists] = useLocalStorage("taskLists", [])
  const [dialog, setDialog] = useState({ isOpen: false, message: "", onConfirm: null })
  const [toast, setToast] = useState({ isOpen: false, message: "" })

    const addTaskList = () => {
        const newList = {
            id: uuidv4(),
            name: "",
            tasks: []
        }
        setTaskLists(prev => [...prev, newList])
    }

  const deleteTaskList = (listId, listName) => {
    const showConfirm = () => {
      setDialog({
        isOpen: true,
        message: `Delete task list "${truncateText(listName)}"?`,
        onConfirm: () => {
          setTaskLists(prev => prev.filter(list => list.id !== listId))
          setDialog({ isOpen: false })
          showToast(`Deleted task list ${truncateText(listName)}`)
        }
      })
    }
    showConfirm()
  }
    
    // Validate task list name requirements:
    // - Max 60 characters
    // - Only letters and numbers allowed
    // - No duplicate names
    const updateListName = (listId, newName) => {
        const trimmedName = newName.trim()

        if (trimmedName.length === 0) {
            showToast("Task list must have a name")
            return
        }

        if (trimmedName.length > 60) {
            showToast("Task list name must be at most 60 characters long")
            return
        }

        if (!/^[\p{L}\p{N}\s]+$/u.test(trimmedName)) {
            showToast("Task list name can only contain letters and numbers")
            return
        }

        if (taskLists.some(list => list.id !== listId && list.name === trimmedName)) {
            showToast(`Task list "${trimmedName}" already exists`)
            return
        }

        setTaskLists(prev => prev.map(list =>
            list.id === listId
                ? { ...list, name: trimmedName }
                : list
        ))
        return true
    }
  const addTask = (listId, description) => {
    setTaskLists(prev => prev.map(list => 
      list.id === listId 
        ? {
            ...list,
            tasks: [...list.tasks, {
              id: uuidv4(),
              description,
              status: "todo"
            }]
          }
        : list
    ))
  }

  const updateTask = (listId, taskId, updates) => {
    setTaskLists(prev => prev.map(list => 
      list.id === listId 
        ? {
            ...list,
            tasks: list.tasks.map(task =>
              task.id === taskId
                ? { ...task, ...updates }
                : task
            )
          }
        : list
    ))
  }

  const deleteTask = (listId, taskId, taskDesc, listName) => {
    setTaskLists(prev => prev.map(list =>
      list.id === listId
        ? {
            ...list,
            tasks: list.tasks.filter(task => task.id !== taskId)
          }
        : list
    ))
    showToast(`Deleted task "${truncateText(taskDesc)}" from task list "${truncateText(listName)}"`)
  }

  const showToast = (message) => {
    setToast({ isOpen: true, message })
    setTimeout(() => setToast({ isOpen: false, message: "" }), 3000)
  }

  return (
    <>
        <TaskListsOverview
            taskLists={taskLists}
            onAddList={addTaskList}
            onDeleteList={deleteTaskList}
            onUpdateListName={updateListName}
            onAddTask={addTask}
            onUpdateTask={updateTask}
            onDeleteTask={deleteTask}
            showToast={showToast}
          />
      {dialog.isOpen && (
        <DialogBox
          message={dialog.message}
          onConfirm={dialog.onConfirm}
          onClose={() => setDialog({ isOpen: false })}
        />
      )}
      {toast.isOpen && (
        <Toast message={toast.message} />
      )}
    </>
  )
}

export default App
