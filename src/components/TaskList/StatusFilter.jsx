const StatusFilter = ({ value, onChange }) => {
  return (
    <select 
      value={value} 
      onChange={(e) => onChange(e.target.value)}
      aria-label="Filter tasks by status"
    >
      <option value="all">All</option>
      <option value="todo">Todo</option>
      <option value="doing">Doing</option>
      <option value="done">Done</option>
    </select>
  )
}

export default StatusFilter
