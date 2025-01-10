import styles from './StatusFilter.module.sass'

const StatusFilter = ({ value, onChange }) => {
  return (
    <div className={styles.filterWrapper}>
      <label htmlFor="status-filter" className={styles.label}>Filter tasks:</label>
      <select 
        id="status-filter"
        className={styles.statusFilter}
        value={value} 
        onChange={(e) => onChange(e.target.value)}
        aria-label="Filter tasks by status"
      >
        <option value="all">All</option>
        <option value="todo">Todo</option>
        <option value="doing">Doing</option>
        <option value="done">Done</option>
      </select>
    </div>
  )
}

export default StatusFilter
