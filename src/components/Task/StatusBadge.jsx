import styles from './StatusBadge.module.sass'

const StatusBadge = ({ status, onStatusChange, isListExpanded }) => {
  return (
    <select
      className={`status-badge ${styles.statusBadge} ${styles[status]}`}
      value={status}
      onChange={(e) => onStatusChange(e.target.value)}
      aria-label="Task status"
      tabIndex={isListExpanded ? "0" : "-1"}
    >
      <option value="todo">TODO</option>
      <option value="doing">DOING</option>
      <option value="done">DONE</option>
    </select>
  )
}

export default StatusBadge
