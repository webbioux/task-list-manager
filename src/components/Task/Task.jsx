import styles from "./TaskListItem.module.sass"

export const TaskListItem = ({ name, tasks }) => {
  return (
    <div className={styles.item}>
      {name}
    </div>
  )
}
