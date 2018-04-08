const isStatelessComponent = el => typeof el === 'function'

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
    this.props = props
  }
}

export default {
  createElement
}
