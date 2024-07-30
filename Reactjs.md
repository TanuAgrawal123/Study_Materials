Package-lock.json: to lock dependency with its stable version.

React js is single page application that it has only one main HTML file which loads

### Writing custom react

```jsx
function customRender(reactElement, container){
    /*
    const domElement = document.createElement(reactElement.type)
    domElement.innerHTML = reactElement.children
    domElement.setAttribute('href', reactElement.props.href)
    domElement.setAttribute('target', reactElement.props.target)

    container.appendChild(domElement)
    */

    const domElement = document.createElement(reactElement.type)
    domElement.innerHTML = reactElement.children
    for (const prop in reactElement.props) {
        if (prop === 'children') continue;
        domElement.setAttribute(prop, reactElement.props[prop])
    }
    container.appendChild(domElement)
}

const reactElement = {
    type: 'a',
    props: {
        href: 'https://google.com',
        target: '_blank'
    },
    children: 'Click me to visit google'
}

const mainContainer = document.querySelector('#root')

customRender(reactElement, mainContainer)

```

The app is a function that converts into a tree (object) behind the scenes, and then it goes for rendering. Babel injects everything.

- Curly brace syntax is used to treat the content inside as a variable in JSX.
- Expression in JSX should be the evaluated outcome, not the whole JavaScript code

```jsx
const reactElement = React.createElement(
    'a',
    {href: 'https://google.com',target: '_blank' },
    'click me to visit google',
    anotherElement
)
```

BABEL = CONVERT MODERN JS TO Brower readable js, like converting jsx to pure js

hese are the steps for creating a React app:

- Install [NodeJS](https://www.simplilearn.com/tutorials/nodejs-tutorial/what-is-nodejs) on the computer because we need npm to install the React library. Npm is the node package manager that contains many JavaScript libraries, including React.

• Install the **create-react-app** package using the command prompt or terminal.

• Synthetic events combine the response of different browser's native events into one API, ensuring that the events are consistent across different browsers.

It is mandatory for each React component to have a render() function. Render function is used to return the HTML which you want to display in a component

 it is not necessary to bind any event to 'this.' Here, the scope of 'this' is global and not limited to any calling function. So If you are using Arrow Function, there is no need to bind 'this' inside the constructor. It is also called 'fat arrow '(=>) functions.

## When component re renders

### 1. State Changes

When the state of a component changes, React will re-render that component and its children.

### 2. Props Changes

When a component receives new props from its parent, it re-renders to reflect the new data.

### 3. Parent Component Re-renders

If a parent component re-renders, all its child components will re-render, unless their rendering is optimized with techniques like `React.memo` or `shouldComponentUpdate`.

### 4. Force Update

You can force a component to re-render using `forceUpdate`, but this is generally not recommended because it bypasses React's optimization mechanisms.

### 5. Context Changes

When the value of a React Context changes, all components that consume that context will re-render.

## Lifecycle of component

**Initial Phase:** It is the birth phase of the React lifecycle when the component starts its journey on a way to the DOM. In this phase, a component contains the default Props and initial State. These default properties are done in the constructor of a component.

**Mounting Phase:** In this phase, the instance of a component is created and added into the DOM.

**Updating Phase:** It is the next phase of the React lifecycle. In this phase, we get new Props and change State. This phase can potentially update and re-render only when a prop or state change occurs. The main aim of this phase is to ensure that the component is displaying the latest version of itself. This phase repeats again and again.

**Unmounting Phase:** It is the final phase of the React lifecycle, where the component instance is destroyed and unmounted(removed) from the DOM.

### Details

- **getInitialState():** It is used to specify the default value of this.state. It is executed before the creation of the component.
- **componentWillMount():** It is executed before a component gets rendered into the DOM.0
- **componentDidMount():** It is executed when the component gets rendered and placed on the DOM. Now, you can do any DOM querying operations.
- **componentWillReceiveProps():** It is invoked when a component receives new props from the parent class and before another render is called. If you want to update the State in response to prop changes, you should compare this.props and nextProps to perform State transition by using this.setState() method.
- **shouldComponentUpdate():** It is invoked when a component decides any changes/updation to the DOM and returns true or false value based on certain conditions. If this method returns true, the component will update. Otherwise, the component will skip the updating.
- **componentWillUpdate():** It is invoked before rendering takes place in the DOM. Here, you can't change the component State by invoking this.setState() method. It will not be called, if shouldComponentUpdate() returns false.
- **componentDidUpdate():** It is invoked immediately after rendering takes place. In this method, you can put any code inside this which you want to execute once the updating occurs.
- **componentWillUnmount():** It is invoked immediately before a component is destroyed and unmounted permanently. It is used to clear up the memory spaces such as invalidating timers, event listener, canceling network requests, or cleaning up DOM elements. If a component instance is unmounted, you cannot mount it again.

## Pure Component

React normally re-renders a component whenever its parent re-renders. As an optimization, you can create a component that React will not re-render when its parent re-renders so long as its new props and state are the same as the old props and state. [Class components](https://react.dev/reference/react/Component) can opt into this behavior by extending `PureComponent`

`PureComponent` is similar to [`Component`](https://react.dev/reference/react/Component) but it skips re-renders for same props and state. Class components are still supported by React, but we don’t recommend using them in new code.

## Higher Order Component

In React, Higher Order Component is an advanced technique for reusing component logic. It is a function that takes a component and returns a new component. In other words, it is a function which accepts another function as an argument. 

## Props and state

Props are used to pass data from one component to another. The state is local data storage that is local to the component only and cannot be passed to other components.

## Element and Component

An element is a plain JavaScript object which describes the component state and DOM node, and its desired properties.

const element = React.createElement(

'div',

{id: 'login-btn'},

'Login'

)

A component is the core building block of React application. It is a class or function which accepts an input and returns a React element.

function Button ({ onLogin }) {

return React.createElement(

'div',

{id: 'login-btn', onClick: onLogin},

'Login'

)

}

Note:  Fragments are faster and consume less memory because it did not create an extra DOM node.

Ref forwarding is a feature which is used for passing a ref through a component to one of its child components. It can be performed by making use of the React.forwardRef() method. It is particularly useful with higher-order components and specially used in reusable component libraries.

## DOM

DOM stands for ‘Document Object Model’. In simple terms, it is a structured representation of the HTML elements that are present in a webpage or web app

Disadvantage of real dom

Every time the DOM gets updated, the updated element and its children have to be rendered again to update the UI of our page. For this, each time there is a component update, the DOM needs to be updated and the UI components have to be re-rendered.

**REACT ROUTER**

[**React Router**](https://www.geeksforgeeks.org/reactjs-router) is a standard library for routing in React. It enables the navigation among views of various components in a React Application, allows changing the browser URL, and keeps the UI in sync with the URL.

**ReactJS Refs** are used to access and modify the **DOM elements** in the React Application. It creates a reference to the elements and uses it to modify them.

[**Context API**](https://www.geeksforgeeks.org/explain-new-context-api-in-react) is used to pass global variables anywhere in the code. It helps when there is a need for sharing state between a lot of nested components. It is light in weight and easier to use, to create a context just need to call React.createContext(). It eliminates the need to install other dependencies or third-party libraries like redux for state management. It has two properties Provider and Consumer. 

A provider is used to provide context to the whole application whereas a consumer consume the context provided by nearest provider. In other words The Provider acts as a parent it passes the state to its children whereas the Consumer uses the state that has been passed. 

In ReactJS, [**Cross-Origin Resource Sharing (CORS)**](https://www.geeksforgeeks.org/reactjs-cors-options) refers to the method that allows you to make requests to the server deployed at a different domain. As a reference, if the frontend and backend are at two different domains, we need CORS there.

We can setup CORS evironment in frontend using two methods:

- axios
- fetch

[**Axios**](https://www.geeksforgeeks.org/axios-in-react-a-guide-for-beginners), which is a popular library is mainly used to send asynchronous HTTP requests to REST endpoints. This library is very useful to perform CRUD operations.

- This popular library is used to communicate with the backend. Axios supports the Promise API, native to JS ES6.
- Using Axios we make API requests in our application. Once the request is made we get the data in Return, and then we use this data in our project.

## React Hooks

React hooks are a powerful feature in React that allow you to add state and other features to functional components. 

### Use state

The useState hook allows you to add state to a functional component. It takes an initial value as an argument and returns an array with two elements: the current state value and a function to update it.

```jsx
function Counter() {
  const [count, setCount] = useState(0);

  const increment= () => {
    setCount(count + 1);
  }
```

### UseEffect

`useEffect` is a React Hook that lets you [synchronize a component with an external system.](https://react.dev/learn/synchronizing-with-effects)

useEffect(setup, dependencies?)

- `setup`: The function with your Effect’s logic. Your setup function may also optionally return a *cleanup* function. When your component is added to the DOM, React will run your setup function. After every re-render with changed dependencies, React will first run the cleanup function (if you provided it) with the old values, and then run your setup function with the new values. After your component is removed from the DOM, React will run your cleanup function.
- **optional** `dependencies`: The list of all reactive values referenced inside of the `setup` code. Reactive values include props, state, and all the variables and functions declared directly inside your component body.
- `useEffect` returns `undefined`.
- `useEffect` is a Hook, so you can only call it **at the top level of your component** or your own Hooks. You can’t call it inside loops or conditions.

Tree condition of dependecies

1. having some value in dependency array : your Effect runs **after the initial render *and* after re-renders with changed dependencies.**
2. empty dependency array :  it will only run **after the initial render.**
3. no dependency array: Effect runs **after every single render (and re-render)** of your component.

### useReducer

The useReducer hook allows you to manage complex state in a functional component. It’s similar to the useState hook, but instead of a simple value, it takes a reducer function and an initial state.

- `reducer`: The reducer function that specifies how the state gets updated. It must be pure, should take the state and action as arguments, and should return the next state. State and action can be of any types.
- `initialArg`: The value from which the initial state is calculated. It can be a value of any type. How the initial state is calculated from it depends on the next `init` argument.
- **optional** `init`: The initializer function that should return the initial state. If it’s not specified, the initial state is set to `initialArg`. Otherwise, the initial state is set to the result of calling `init(initialArg)`.

`useReducer` returns an array with exactly two values:

1. The current state. During the first render, it’s set to `init(initialArg)` or `initialArg` (if there’s no `init`).
2. The [`dispatch` function](https://react.dev/reference/react/useReducer#dispatch) that lets you update the state to a different value and trigger a re-render.

**Parameter of dispatch function**

1. `action`: The action performed by the user. It can be a value of any type. By convention, an action is usually an object with a `type` property identifying it and, optionally, other properties with additional information.

`dispatch` functions do not have a return value.

The `dispatch` function **only updates the state variable for the *next* render**. If you read the state variable after calling the `dispatch` function, [you will still get the old value](https://react.dev/reference/react/useReducer#ive-dispatched-an-action-but-logging-gives-me-the-old-state-value) that was on the screen before your call.

```jsx
function reducer(state,
action) {
  switch (action.type) {
    case 'incremented_age': {
      return {
        name: state.name,
        age: state.age + 1
      };
    }
    case 'changed_name': {
      return {
        name: action.nextName,
        age: state.age
      };
    }
  }
  throw Error('Unknown action: ' + action.type);
}

function Form() {
  const [state, dispatch] = useReducer(reducer, { name: 'Taylor', age: 42 });
  
  function handleButtonClick() {
    dispatch({ type: 'incremented_age' });
  }

  function handleInputChange(e) {
    dispatch({
      type: 'changed_name',
      nextName: e.target.value
    });
  }
```

### useMemo

`useMemo` is a React Hook that lets you cache the result of a calculation between re-renders.

### useRef

1. DOM Reference
2. Hold previous value between re renders
3. It can be used to store a mutable value that does not cause a re-render when updated.

example

If we tried to count how many times our application renders using the `useState` Hook, we would be caught in an infinite loop since this Hook itself causes a re-render.

```jsx
function App() {
  const [inputValue, setInputValue] = useState("");
  const count = useRef(0);

  useEffect(() => {
    count.current = count.current + 1;
  });

  return (
    <>
      <input
        type="text"value={inputValue}onChange={(e) => setInputValue(e.target.value)}/>
      <h1>Render Count: {count.current}</h1>
    </>);
}
```

`useRef()` only returns one item. It returns an Object called `current`.

### useMemo

`useMemo` Hook returns a memoized value.

memorized value is like caching expensive operation which don't need to recalculate every time on re render. 

he `useMemo`Hook accepts a second parameter to declare dependencies. The expensive function will only run when its dependencies have changed.

`useMemo` returns a memoized value 

```jsx
const App = () => {
  const [count, setCount] = useState(0);
  const [todos, setTodos] = useState([]);
  const calculation = useMemo(() => expensiveCalculation(count), [count]);

  const increment = () => {
    setCount((c) => c + 1);
  };
  const addTodo = () => {
    setTodos((t) => [...t, "New Todo"]);
  };

  return (
    <div>
      <div>
        <h2>My Todos</h2>
        {todos.map((todo, index) => {
          return <p key={index}>{todo}</p>;
        })}
        <button onClick={addTodo}>Add Todo</button>
      </div>
      <hr />
      <div>
        Count: {count}
        <button onClick={increment}>+</button>
        <h2>Expensive Calculation</h2>
        {calculation}
      </div>
    </div>);
};

const expensiveCalculation = (num) => {
  console.log("Calculating...");
  for (let i = 0; i < 1000000000; i++) {
    num += 1;
  }
  return num;
};
```

### useCallBack

The React `useCallback` Hook returns a memoized callback function

This allows us to isolate resource intensive functions so that they will not automatically run on every render.

The `useCallback` Hook only runs when one of its dependencies update.

"referential equality".

Every time a component re-renders, its functions get recreated.

```jsx
const App = () => {
  const [count, setCount] = useState(0);
  const [todos, setTodos] = useState([]);

  const increment = () => {
    setCount((c) => c + 1);
  };
  const addTodo = useCallback(() => {
    setTodos((t) => [...t, "New Todo"]);
  }, [todos]);

  return (
    <>
      <Todos todos={todos} addTodo={addTodo} />
      <hr />
      <div>
        Count: {count}
        <button onClick={increment}>+</button>
      </div>
    </>);
};
const Todos = ({ todos, addTodo }) => {
  console.log("child render");
  return (
    <>
      <h2>My Todos</h2>
      {todos.map((todo, index) => {
        return <p key={index}>{todo}</p>;
      })}
      <button onClick={addTodo}>Add Todo</button>
    </>
  );
};

```

### useContext

It can be used together with the `useState` Hook to share state between deeply nested components more easily than with `useState` alone.

In order to avoid prop drilling.

```jsx
import { useState, createContext, useContext } from "react";
import ReactDOM from "react-dom/client";

const UserContext = createContext();

function Component1() {
  const [user, setUser] = useState("Jesse Hall");

  return (
    <UserContext.Provider value={user}>
      <h1>{`Hello ${user}!`}</h1>
      <Component2 />
    </UserContext.Provider>
  );
}

function Component2() {
  return (
    <>
      <h1>Component 2</h1>
      <Component3 />
    </>
  );
}

function Component3() {
  return (
    <>
      <h1>Component 3</h1>
      <Component4 />
    </>
  );
}

function Component4() {
  return (
    <>
      <h1>Component 4</h1>
      <Component5 />
    </>
  );
}

function Component5() {
  const user = useContext(UserContext);

  return (
    <>
      <h1>Component 5</h1>
      <h2>{`Hello ${user} again!`}</h2>
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Component1 />);
```

```jsx

```

## Redux vs recoil

Redux uses a single store to hold the entire app's state where components read and update the store through actions and reducers (Centralized).

Recoil uses atoms scattered across components, each holding a specific piece of state where components can directly access and update these atoms (Decentralized).

## Redux

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/3507d505-968f-40f9-bdcf-0976cb396023/e694e75a-3200-44ad-90ce-5587bf72a92b/Untitled.png)

Action: They are plain js object that have type field . Action only tell what to do but they don't tell how to do. 

Action Creator: Pure function that create an action

```jsx
export const incCounter = (num)=>{
return {
	type: 'INCREMENT',
	payload: num
	}
}
```

Reducer : function that take current state and action as argument and return a new state result;

```jsx
const initialState = 0;
const changeNumber = (state = initialState, action) {
	switch(action.type) {
		case "INCREMENT":  return state + action.payload;
		case "DECREMENT" : return state -1;
		default: return state;
	}
}
```

Redux bring store reducer and Action together. 

**Principles**

1. We have only single store .(that is single source of truth)
2. State is read only. The only way to change it is to dispatch an Action.
3. Immutability , one way data flow
4. Changes are made from pure reducer function.
5. every redux store have single root reducer function.

```jsx
import {createStore} from "redux"

const store = createStore(rootReducers);
```

**Code for Counter**

```jsx

// Action types
//action. js
const INCREMENT = 'INCREMENT';
const DECREMENT = 'DECREMENT';

// Action creators
export const increment = (num) => ({ type: INCREMENT,  payload: num});
export const decrement = (num) => ({ type: DECREMENT, paload: num });

// reducer.js
const initialState = {
  count: 0
};

// Reducer
const counterReducer = (state = initialState, action) => {
  switch (action.type) {
    case INCREMENT:
      return { ...state, count: state.count + action.payload };
    case DECREMENT:
      return { ...state, count: state.count - action.payload };
    default:
      return state;
  }
};

// combine reducers to create rootRecuer
// rootReducer.js
import {combineReducers} from "redux"
import {counterReducer} from "reducer.js"
export const rootReducer = combinerReducer({
	countReducer: counterReducer
	// can add more reducers
})
// Create store
// store.js
import { createStore } from 'redux';
const store = createStore(rootReducer);

export default store;

```

```jsx
// App.js to provide store to root component so all child container can access it.
import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import Counter from './Counter';

const App = () => {
  return (
    <Provider store={store}>
      <Counter />
    </Provider>
  );
};

export default App;

```

```jsx
// Counter.js
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement } from './store';

const Counter = () => {
// to fetch state of store
  const count = useSelector((state) => state.count);
  // to perform dispatch action
  const dispatch = useDispatch();

  return (
    <div>
      <h1>Counter: {count}</h1>
      <button onClick={() => dispatch(increment())}>Increment</button>
      <button onClick={() => dispatch(decrement())}>Decrement</button>
    </div>
  );
};

export default Counter;

```

The `store.subscribe` method in Redux is used to listen for changes in the Redux store's state. Whenever an action is dispatched and the state is updated, the callback function passed to `store.subscribe` is called.
`store.subscribe` returns a function that you can call to unsubscribe from the store, stopping the callback function from being called on future state updates.

## Context API

Help to prevent prop drilling

```jsx
// ParentContext.js 
// creating context 
import React, { createContext, useState } from 'react';

export const ParentContext = createContext();

export const ParentProvider = ({ children }) => {
  const [count, setCount] = useState(0);

  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1);

  return (
    <ParentContext.Provider value={{ count, increment, decrement }}>
      {children}
    </ParentContext.Provider>
  );
};

```

create a component that consumes the context and displays the counter value, along with buttons to increment and decrement the count.

```jsx
// Children.js
import React from 'react';
import { ParentContext } from './ParentContext';

const Children = () => (
  <ParentContext.Consumer>
    {({ count, increment, decrement }) => (
      <div>
        <h1>Counter: {count}</h1>
        <button onClick={increment}>Increment</button>
        <button onClick={decrement}>Decrement</button>
      </div>
    )}
  </ParentContext.Consumer>
);

export default Children;

```

```jsx
// App.js
//wrap your main application component with the ParentProvider to make the context available throughout the component tree.
import React from 'react';
import { ParentProvider } from './ParentContext';
import Children from './Children';

const App = () => {
  return (
    <ParentProvider>
      <Children />
    </ParentProvider>
  );
};

export default App;

```

### Cons:

When the context value changes, all components consuming that context will re-render, which might lead to performance issues if not handled carefully, especially in large applications.

### Why useContext more better than traditional contextAPI

1. **Simpler Syntax**: `useContext` provides a cleaner and more readable way to consume context values within functional components.
2. **Direct Access**: It allows direct access to the context values without the need to wrap components in a `Consumer`.
3. **Functional Components**: With the rise of hooks, functional components have become more prevalent. `useContext` fits naturally with the hook-based approach.

## Recoil

### What is Recoil?

Recoil is a state management library for React, developed by Facebook. It provides a more efficient, flexible, and easier way to manage the state in React applications. Recoil's core concept is based on atoms and selectors which allow fine-grained control over state updates and derived state.

### Key Concepts

1. **Atoms**:
    - Atoms are units of state. They are similar to React's `useState` but are globally accessible.
    - When an atom's value changes, all components that subscribe to that atom will re-render.
    - Atoms are created using the `atom` function.
    
    ```jsx
    javascriptCopy code
    import { atom } from 'recoil';
    
    export const textState = atom({
      key: 'textState', // unique ID
      default: '', // default value
    });
    
    ```
    
2. **Selectors**:
    - Selectors represent derived state. They can compute a value based on other atoms or selectors.
    - They are similar to computed properties in other state management libraries.
    - Selectors are created using the `selector` function.
    
    ```jsx
    javascriptCopy code
    import { selector } from 'recoil';
    import { textState } from './atoms';
    
    export const charCountState = selector({
      key: 'charCountState', // unique ID
      get: ({ get }) => {
        const text = get(textState);
        return text.length;
      },
    });
    
    ```
    
3. **RecoilRoot**:
    - `RecoilRoot` is the context provider for Recoil state. It should wrap your application to provide Recoil state to all components.
    
    ```jsx
    javascriptCopy code
    import React from 'react';
    import ReactDOM from 'react-dom';
    import { RecoilRoot } from 'recoil';
    import App from './App';
    
    ReactDOM.render(
      <RecoilRoot>
        <App />
      </RecoilRoot>,
      document.getElementById('root')
    );
    
    ```
    
4. **Hooks**:
    - `useRecoilState()`: Similar to React's `useState`, it returns a stateful value and a function to update it.
    - `useRecoilValue()`: Returns the value of a Recoil state (atom or selector).
    - `useSetRecoilState()`: Returns a setter function for updating the state of an atom.
    - `useResetRecoilState()`: Returns a function to reset the state of an atom to its default value.

### Basic Example

```jsx
javascriptCopy code
// state.js
import { atom, selector } from 'recoil';

export const textState = atom({
  key: 'textState',
  default: '',
});

export const charCountState = selector({
  key: 'charCountState',
  get: ({ get }) => {
    const text = get(textState);
    return text.length;
  },
});

// TextInput.js
import React from 'react';
import { useRecoilState } from 'recoil';
import { textState } from './state';

const TextInput = () => {
  const [text, setText] = useRecoilState(textState);

  const onChange = (event) => {
    setText(event.target.value);
  };

  return (
    <div>
      <input type="text" value={text} onChange={onChange} />
      <br />
      Echo: {text}
    </div>
  );
};

export default TextInput;

// CharacterCount.js
import React from 'react';
import { useRecoilValue } from 'recoil';
import { charCountState } from './state';

const CharacterCount = () => {
  const count = useRecoilValue(charCountState);

  return <>Character Count: {count}</>;
};

export default CharacterCount;

// App.js
import React from 'react';
import TextInput from './TextInput';
import CharacterCount from './CharacterCount';

const App = () => {
  return (
    <div>
      <TextInput />
      <CharacterCount />
    </div>
  );
};

export default App;

```

### Advanced Features

1. **Asynchronous Selectors**:
    - Selectors can be asynchronous, allowing you to fetch data from an API or perform other async operations.
    
    ```jsx
    javascriptCopy code
    import { selector } from 'recoil';
    
    export const asyncDataState = selector({
      key: 'asyncDataState',
      get: async () => {
        const response = await fetch('https://api.example.com/data');
        const data = await response.json();
        return data;
      },
    });
    
    ```
    
2. **Atom Effects**:
    - Atom effects allow you to run custom logic when atoms are initialized or updated. This can be useful for syncing state with local storage or other side effects.
    
    ```jsx
    javascriptCopy code
    import { atom } from 'recoil';
    
    const localStorageEffect = (key) => ({ setSelf, onSet }) => {
      const savedValue = localStorage.getItem(key);
      if (savedValue != null) {
        setSelf(JSON.parse(savedValue));
      }
    
      onSet((newValue) => {
        localStorage.setItem(key, JSON.stringify(newValue));
      });
    };
    
    export const persistedState = atom({
      key: 'persistedState',
      default: '',
      effects_UNSTABLE: [localStorageEffect('persistedState')],
    });
    
    ```
    

### Benefits of Recoil

1. **Simplicity**: Easy to learn and use, with a minimal API surface.
2. **Fine-grained Control**: Only the components that subscribe to a particular piece of state will re-render when that state changes.
3. **Derived State**: Selectors make it easy to derive state and avoid redundant state.
4. **Concurrency**: Designed to work seamlessly with React’s concurrent mode.
5. **Flexibility**: Can manage complex state dependencies and asynchronous state effortlessly.

### Drawbacks of Recoil

1. **New Library**: Recoil is relatively new and may lack the ecosystem and community support of more established libraries like Redux.
2. **Experimental Features**: Some features (like atom effects) are still marked as unstable.

### Best Practices

1. **Keep Atoms Small**: Try to keep atoms small and focused on a single piece of state.
2. **Use Selectors for Derived State**: Use selectors to compute derived state and avoid redundant atoms.
3. **Leverage Asynchronous Selectors**: Use asynchronous selectors for data fetching and other async operations to keep your components clean.
4. **Test State Logic**: Test your state logic separately from your components to ensure it behaves as expected.

### Conclusion

Recoil offers a powerful and flexible way to manage state in React applications. Its simplicity, fine-grained control over state updates, and support for derived and asynchronous state make it an excellent choice for both small and large applications. By understanding and leveraging atoms, selectors, and Recoil’s other features, you can build robust and maintainable React applications.

4o
