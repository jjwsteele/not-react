import NotReact, { Component } from '../../src/NotReact'

class TextInput extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return NotReact.createElement('input', { type: 'text' })
  }
}

export default TextInput
