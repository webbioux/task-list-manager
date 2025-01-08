import TaskListsOverview from "./components/TaskListsOverview"
import { useState } from "react"

const App = () => {
  const [dialog, setDialog] = useState({ isOpen: false, message: "", onConfirm: null })
  const [toast, setToast] = useState({ isOpen: false, message: "" })

  return (
    <TaskListsOverview />
  )
}

export default App
