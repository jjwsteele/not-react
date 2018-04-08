function createElement(type, props, ...children) {
  return {
    type,
    props: {
      ...props,
      children: children.length === 1 ? children[0] : children,
    },
  }
}

export class Component {
  constructor(props) {
    this.state = {}
    this.props = props
    this.update = () => {} // set by renderer (NotReactDOM)
    this.setState = this.setState.bind(this)
  }

  setState(newState) {
    this.state = {
      ...this.state,
      ...newState,
    }
    this.update()
  }
}

export default {
  createElement,
}
