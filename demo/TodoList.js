import NotReact from '../src/NotReact'
import TodoListItem from './TodoListItem'

const TodoList = ({ tasks }) => NotReact.createElement(
  'ul',
  null,
  ...tasks.map(task => NotReact.createElement(TodoListItem, { task }, null))
)

export default TodoList
