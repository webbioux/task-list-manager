import { useState } from "react"
import TaskList from "./TaskList/TaskList"

const TaskListsOverview = ({ taskLists, onAddList, onDeleteList, onUpdateListName, onAddTask, onUpdateTask, onDeleteTask }) => {
    return (
        <main>
            <h1>Task List Manager</h1>
            <div role="region" aria-label="Task Lists">
                {taskLists.map(list => (
                    <TaskList
                        key={list.id}
                        {...list}
                        onDelete={onDeleteList}
                        onUpdateName={onUpdateListName}
                        onAddTask={onAddTask}
                        onUpdateTask={onUpdateTask}
                        onDeleteTask={onDeleteTask}
                    />
                ))}
            </div>
            <button onClick={() => onAddList()} aria-label="Create new task list">Add List</button>
        </main>
    )
}


export default TaskListsOverview
