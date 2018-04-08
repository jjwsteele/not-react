import NotReact from '../../src/NotReact'

const Button = ({ onClick, children }) => NotReact.createElement(
  'button',
  { onClick },
  ...children
)

export default Button
