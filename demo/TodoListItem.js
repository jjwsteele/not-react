import NotReact from '../src/NotReact'

const TodoListItem = ({ task }) => NotReact.createElement(
  'li',
  null,
  task.name,
  NotReact.createElement(
    'ul',
    null,
    NotReact.createElement('li', null, task.description),
  )
)

export default TodoListItem
