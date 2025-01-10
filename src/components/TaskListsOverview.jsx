import TaskList from "./TaskList/TaskList"

const TaskListsOverview = ({ taskLists, onAddList, onDeleteList, onUpdateListName, onAddTask, onUpdateTask, onDeleteTask }) => {
    return (
        <main>
            <header role="banner">
                <h1>Task List Manager</h1>
            </header>
            <button
                onClick={() => onAddList()}
                aria-label="Create a new task list"
                className="sr-only"
            >Add List</button>  
            <div role="main" aria-label="Task Lists">
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
            <button
                onClick={() => onAddList()}
                aria-label="Create a new task list"
            >Add List</button>
        </main>
    )
}


export default TaskListsOverview
