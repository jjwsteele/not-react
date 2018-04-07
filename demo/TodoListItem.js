import { createElement } from 'not-react/NotReact'

const TodoListItem = ({ task }) => createElement(
  'li',
  null,
  task.name,
  createElement(
    'ul',
    null,
    createElement('li', null, task.description),
  )
)

export default TodoListItem
