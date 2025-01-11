import React from 'react'
import TaskList from "./TaskList/TaskList"
import styles from './TaskListsOverview.module.sass'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

const TaskListsOverview = ({ taskLists, onAddList, onDeleteList, onUpdateListName, onAddTask, onUpdateTask, onDeleteTask }) => {
    return (
        <main>
            <header role="banner" className={styles.header}>
                <h1>Task List Manager</h1>
            </header>
            <button
                onClick={() => onAddList()}
                aria-label="Create a new task list"
                className="sr-only"
            >Add List</button>  
            <div
                role="main"
                aria-label="Task Lists"
                className={styles.taskListsContainer}
            >
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
                <button
                    className={styles.addTaskListButton} 
                    onClick={() => onAddList()}
                    aria-label="Create a new task list"
                >
                    <FontAwesomeIcon icon={faPlus} aria-hidden="true" className={styles.addTaskListIcon} />
                    <span>Add list</span>
                </button>
            </div>
        </main>
    )
}


export default TaskListsOverview
