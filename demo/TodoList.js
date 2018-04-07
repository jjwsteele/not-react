import { createElement } from 'not-react/NotReact'
import TodoListItem from './TodoListItem'

const TodoList = ({ tasks }) => createElement(
  'ul',
  null,
  ...tasks.map(task => createElement(TodoListItem, { task }, null))
)

export default TodoList
