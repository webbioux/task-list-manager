const TaskList = ({ name, tasks }) => {
  return (
    <div>
      <h2>{name}</h2>
      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            {task.description} - {task.status}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default TaskList
