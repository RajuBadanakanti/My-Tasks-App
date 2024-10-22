import './index.css'

const TaskItem = props => {
  const {taskDetails} = props
  const {taskName, tagName} = taskDetails

  return (
    <li className="task-item-container">
      <p className="task-name">{taskName}</p>
      <p className="tag-name">{tagName}</p>
    </li>
  )
}

export default TaskItem
