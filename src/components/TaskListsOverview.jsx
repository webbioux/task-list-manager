import { useState } from "react"
import TaskList from "./TaskList"

const TaskListsOverview = () => {
    const [taskLists] = useState([{
        id: "list-1",
        name: "My First List",
        tasks: [
            { id: "list-1-task-1", description: "Sample task", status: "todo" }
        ]
    }])

    return (
        <div>
            <h1>My Task Lists</h1>
            {taskLists.map(list => (
                <TaskList key={list.id} {...list} />
            ))}
        </div>
    )
}

export default TaskListsOverview
