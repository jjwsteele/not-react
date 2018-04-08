import NotReact, { Component } from '../src/NotReact'

class TodoListItem extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isExpanded: false,
    }

    this.toggleExpanded = this.toggleExpanded.bind(this)
  }

  toggleExpanded() {
    this.setState({
      isExpanded: !this.state.isExpanded,
    })
  }

  render() {
    return NotReact.createElement(
      'li',
      { onClick: this.toggleExpanded },
      this.props.task.name,
      this.state.isExpanded && NotReact.createElement(
        'ul',
        null,
        NotReact.createElement('li', null, this.props.task.description),
      )
    )
  }
}

export default TodoListItem
