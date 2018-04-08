import { Component } from '../src/NotReact'

let rootElement
let rootContainer

/*
 * This is a bit silly, and will likely not work when the DOM structure changes
 * between renders
 */
const instanceTracker = {
  instanceMap: {},
  counter: 0,
  getNext: () => instanceTracker.instanceMap[++instanceTracker.counter],
  setCurrent: (instance) => {
    instanceTracker.instanceMap[instanceTracker.counter] = instance
  },
  reset: () => {
    instanceTracker.counter = 1
  },
}

function isClass(element) {
  return element.type
    && typeof element.type === 'function'
    && /class/.test(element.type.toString())
}

function isStatelessComponent(element) {
  return typeof element.type === 'function'
}

function getClassInstance(element) {
  const instance = instanceTracker.getNext() || new element.type(element.props)
  instance.update = update
  instanceTracker.setCurrent(instance)

  return instance
}

function refine(element) {
  if (typeof element === 'string') {
    return element
  } else if (isClass(element)) {
    return refine(getClassInstance(element).render())
  } else if (isStatelessComponent(element)) {
    return refine(element.type(element.props))
  }

  if (Array.isArray(element.props.children)) {
    element.props.children = element.props.children.filter(child => child).map(refine)
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

  addEventsToDomElement(domElement, props)
  
  return domElement
}

function addChildToDomElement(domElement, child) {
  if (typeof child === 'object') {
    domElement.appendChild(virtualDomToReal(child))
  } else {
    domElement.innerHTML += child
  }
}

function addEventsToDomElement(domElement, props) {
  const handlerProps = Object.keys(props).filter(propName => propName.slice(0, 2) === 'on')

  handlerProps.forEach(propName => {
    domElement.addEventListener(propName.slice(2).toLowerCase(), props[propName])
  })
}

function update() {
  instanceTracker.reset()
  const refinedElement = refine(rootElement)
  const domElement = virtualDomToReal(refinedElement)

  while (rootContainer.firstChild) {
    rootContainer.removeChild(rootContainer.firstChild);
  }
  rootContainer.appendChild(domElement)

  return domElement
}

function render(element, container) {
  rootElement = element
  rootContainer = container

  return update()
}

export {
  render,
}
