import { render } from '../src/NotReactDOM'
import Button from './testComponents/Button'
import TextInput from './testComponents/TextInput'

const dummyContainer = {
  appendChild: () => {},
}

describe('render', () => {
  it('should be able to create basic DOM elements', () => {
    const virtualDom = {
      type: 'h1',
      props: {
        children: 'Hello World!',
      },
    }
    const domElement = render(virtualDom, dummyContainer);
    
    expect(domElement).toBeInstanceOf(HTMLHeadingElement)
    expect(domElement.innerHTML).toEqual('Hello World!')
  })

  it('should be able to render nested DOM elements', () => {
    const virtualDom = {
      type: 'div',
      props: {
        children: {
          type: 'h1',
          props: {
            children: [
              {
                type: 'span',
                props: {
                  children: 'Hello',
                },
              },
              {
                type: 'h2',
                props: {
                  children: 'World!',
                },
              },
            ],
          },
        },
      },
    }
    const domElement = render(virtualDom, dummyContainer);
    
    expect(domElement).toBeInstanceOf(HTMLDivElement)
    expect(domElement.innerHTML).toEqual('<h1><span>Hello</span><h2>World!</h2></h1>')
  })

  it('should be able to render stateless functional components to DOM elements', () => {
    const virtualDom = {
      type: Button,
      props: {
        onClick: () => {},
        children: 'Click me!',
      },
    }
    const domElement = render(virtualDom, dummyContainer)

    expect(domElement).toBeInstanceOf(HTMLButtonElement)
    expect(domElement.innerHTML).toEqual('Click me!')
  })

  it('should be able to render class components to DOM elements', () => {
    const virtualDom = {
      type: TextInput,
      props: {},
    }
    const domElement = render(virtualDom, dummyContainer)

    expect(domElement).toBeInstanceOf(HTMLInputElement)
    expect(domElement.innerHTML).toEqual('')
  })

  it('should be able to render complex virtual DOMs', () => {
    const virtualDom = {
      type: 'div',
      props: {
        children: [
          {
            type: 'div',
            props: {
              children: [
                {
                  type: 'label',
                  props: {
                    children: [
                      'First',
                      'Name',
                    ],
                  },
                },
                {
                  type: TextInput,
                },
                {
                  type: Button,
                  props: {
                    children: 'Submit',
                  },
                },
              ],
            },
          },
          {
            type: Button,
            props: {
              children: 'Reset',
            },
          },
        ],
      },
    }

    const domElement = render(virtualDom, dummyContainer)

    expect(domElement).toBeInstanceOf(HTMLDivElement)
    expect(domElement.innerHTML).toEqual('<div><label>FirstName</label><input><button>Submit</button></div><button>Reset</button>')    
  })
})