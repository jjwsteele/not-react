const isStatelessComponent = el => typeof el === 'function'

function createElement(type, props, ...children) {
  if (isStatelessComponent(type)) {
    return type({ ...props, children })
  }

  const element = document.createElement(type)

  children.forEach(child => {
    if (typeof child === 'object') {
      element.appendChild(child)
    } else {
      element.innerHTML += child
    }
  })

  return element
}

export {
  createElement,
}
