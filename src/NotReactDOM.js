import { Component } from '../src/NotReact'

function isClass(element) {
  return element.type
    && typeof element.type === 'function'
    && /class/.test(element.type.toString())
}

function isStatelessComponent(element) {
  return typeof element.type === 'function'
}

function refine(element) {
  if (typeof element === 'string') {
    return element
  } else if (isClass(element)) {
    const instance = new element.type(element.props)
    return refine(instance.render())
  } else if (isStatelessComponent(element)) {
    return refine(element.type(element.props))
  }

  if (Array.isArray(element.props.children)) {
    element.props.children = element.props.children.map(refine)
  } else {
    element.props.children = refine(element.props.children)
  }

  return element
}

function virtualDomToReal({ type, props }) {
  const domElement = document.createElement(type)

  if (Array.isArray(props.children)) {
    props.children.forEach(child => addChildToDomElement(domElement, child))
  } else {
    addChildToDomElement(domElement, props.children)
  }
  
  return domElement
}

function addChildToDomElement(domElement, child) {
  if (typeof child === 'object') {
    domElement.appendChild(virtualDomToReal(child))
  } else {
    domElement.innerHTML += child
  }
}

function render(element, container) {
  const refinedElement = refine(element)
  const domElement = virtualDomToReal(refinedElement)

  container.appendChild(domElement)

  return domElement
}

export {
  render,
}
