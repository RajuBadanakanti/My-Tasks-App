import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import TaskItem from './components/TaskItem'

import './App.css'

// These are the lists used in the application. You can move them to any component needed.

const tagsList = [
  {
    optionId: 'HEALTH',
    displayText: 'Health',
  },
  {
    optionId: 'EDUCATION',
    displayText: 'Education',
  },
  {
    optionId: 'ENTERTAINMENT',
    displayText: 'Entertainment',
  },
  {
    optionId: 'SPORTS',
    displayText: 'Sports',
  },
  {
    optionId: 'TRAVEL',
    displayText: 'Travel',
  },
  {
    optionId: 'OTHERS',
    displayText: 'Others',
  },
]

// Replace your code here
class App extends Component {
  state = {
    taskValue: '',
    tagValue: tagsList[0].optionId,
    myTasksList: [],
    activeTab: 'INITIAL',
    isActiveTab: false,
  }

  onChangeTaskInput = event => {
    this.setState({taskValue: event.target.value})
  }

  onChangeSelectTag = event => {
    this.setState({tagValue: event.target.value})
  }

  onSubmitForm = event => {
    event.preventDefault()
    const {taskValue, tagValue} = this.state
    if (taskValue !== '') {
      const newData = {
        id: uuidv4(),
        taskName: taskValue,
        tagName: tagValue,
      }

      this.setState(prevState => ({
        myTasksList: [...prevState.myTasksList, newData],
        taskValue: '',
        tagValue: tagsList[0].optionId,
      }))
    }
  }

  /* create List and Add Form  */
  onClickTagButton = event => {
    this.setState({activeTab: event.target.value})
    this.setState(prevState => ({isActiveTab: !prevState.isActiveTab}))
  }

  render() {
    const {myTasksList, taskValue, tagValue} = this.state
    const {activeTab, isActiveTab} = this.state

    /* I found Logic +  */
    const isActiveTabButton = isActiveTab ? activeTab : 'INITIAL'
    console.log(isActiveTab)

    const filteredList = myTasksList.filter(
      eachItem => eachItem.tagName === activeTab,
    )

    const isNoTasks = myTasksList.length === 0
    const newList = isActiveTab ? filteredList : myTasksList

    return (
      <div className="bg-App-container">
        <div className="content-container">
          {/* create-a-task-content  */}
          <div className="create-a-task-container">
            <h1 className="create-task-heading">Create a task!</h1>
            <form className="form-container" onSubmit={this.onSubmitForm}>
              {/* task - input */}
              <div className="create-task-input-div">
                <label htmlFor="task" className="label-text">
                  Task
                </label>
                <input
                  id="task"
                  className="input-element"
                  placeholder="Enter the task here"
                  value={taskValue}
                  onChange={this.onChangeTaskInput}
                />
              </div>
              {/* tag - select */}
              <div className="create-tag-select-div">
                <label htmlFor="tag" className="label-text">
                  Tags
                </label>
                <select
                  id="tag"
                  className="select-element"
                  value={tagValue}
                  onChange={this.onChangeSelectTag}
                >
                  {tagsList.map(eachItem => (
                    <option key={eachItem.optionId} value={eachItem.optionId}>
                      {eachItem.displayText}
                    </option>
                  ))}
                </select>
              </div>
              <button type="submit" className="add-task-button">
                Add Task
              </button>
            </form>
          </div>
          {/*  added-task-content  */}

          <div className="added-task-container">
            <h1 className="tags-heading">Tags</h1>
            <ul className="tags-list-container">
              {tagsList.map(eachTag => {
                const isActive = eachTag.optionId === isActiveTabButton
                const activeTabBtn = isActive
                  ? 'tag-item-active-button'
                  : 'tag-item-button'
                return (
                  <li className="tag-item-container" key={eachTag.optionId}>
                    <button
                      type="button"
                      className={activeTabBtn}
                      onClick={this.onClickTagButton}
                      onChange={this.onChangeTagBtn}
                      value={eachTag.optionId}
                    >
                      {eachTag.displayText}
                    </button>
                  </li>
                )
              })}
            </ul>
            <h1 className="tags-heading">Tasks</h1>
            {isNoTasks ? (
              <div className="no-tasks-container">
                <p className="no-task-message">No Tasks Added Yet</p>
              </div>
            ) : (
              <ul className="added-task-list-container">
                {newList.map(eachTask => (
                  <TaskItem key={eachTask.id} taskDetails={eachTask} />
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    )
  }
}

export default App
