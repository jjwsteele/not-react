import render from 'not-react/NotReactDom'
import { createElement } from 'not-react/NotReact'
import TodoList from './TodoList'

const tasks = [
  {
    name: 'Wash clothes',
    description: 'Use the cold wash setting on the machine',
  },
  {
    name: 'Mow the lawn',
    description: 'The mower is in the shed',
  },
  {
    name: 'Clean your teeth',
    description: 'In the morning and at night!'
  }
]

const todoList = createElement(
  TodoList,
  { tasks },
  null
)

render(todoList, document.getElementById('root'))
