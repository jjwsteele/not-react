import NotReact, { Component } from '../src/NotReact'

describe('createElement', () => {
  it('should be able to create basic virtual DOM elements', () => {
    const element = NotReact.createElement('h1', null, 'Hello world!')

    expect(element).toEqual({
      type: 'h1',
      props: {
        children: 'Hello world!',
      },
    })
  })

  it('should be able to create virtual DOM elements with props', () => {
    const element = NotReact.createElement('h1', { className: 'big' }, 'Hello world!')

    expect(element).toEqual({
      type: 'h1',
      props: {
        className: 'big',
        children: 'Hello world!',
      },
    })
  })

  it('should create be able to handle stateless functional components', () => {
    const Button = ({ onClick, children }) => NotReact.createElement(
      'button',
      { onClick },
      ...children
    )
    const handleClick = () => {}
    const element = NotReact.createElement(Button, { onClick: handleClick }, 'Click me!')

    expect(element).toEqual({
      type: Button,
      props: {
        onClick: handleClick,
        children: 'Click me!',
      },
    })
  })

  it('should be able to handle class componenets', () => {
    class Button extends Component {
      constructor(props) {
        super(props)
      }

      render() {
        const { onClick, children } = this.props
        return NotReact.createElement('button', { onClick }, 'Click me!')
      }
    }
    const handleClick = () => {}

    const element = NotReact.createElement(Button, { onClick: handleClick }, 'Click me!')

    expect(element).toEqual({
      type: Button,
      props: {
        onClick: handleClick,
        children: 'Click me!',
      },
    })
  })
})
