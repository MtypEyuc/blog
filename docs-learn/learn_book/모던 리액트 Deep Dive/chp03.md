---
sidebar_position: 3
title: "3장: 리액트 훅 깊게 살펴보기"
description: 리액트 훅 깊게 살펴보기
authors: [MtypEyuc]
tags: [React]
hide_table_of_contents: false
---
## 리액트의 모든 훅 파헤치기
### useState
- useState 구현 살펴보기
```jsx
import { useState } from 'react'
const [state, setState] = useState(initialState)
```
인수로 사용할 `state`의 초깃값을 넘겨주고 값이 없을 경우 `undefined`가 된다. 반환값은 배열이며 배열의 첫 번째 원소로 `state` 값을 사용하거나 `setState`를 사용해 값을 변경할 수 있다. 

```jsx
function Component() {
    const [, triggerRender] = useState()

    let state = 'hello'

    function handleButtonClick() {
        state = 'hi'
        triggerRender()
    }

    return (
        <>
            <h1>{state}</h1>
            <button onClick={handleButtonClick}>hi</button>
        </>
    )
}
```
해당 코드는 `triggerRender()`를 통해 렌더링을 하지만 함수가 새롭게 실행되기 때문에 `state`의 값이 `hello`로 초기화 된다.
```jsx
import { useState } from 'react';

function Component() {
  
  const [state, setState] = useState("hello");

  function handleButtonClick() {
    setState("hi"); 
  }

  return (
    <>
      <h1>{state}</h1>
      <button onClick={handleButtonClick}>hi</button>
    </>
  );
}
```
`setState`가 클로저를 활용해 `state`값을 참조하고 변수를 업데이트 한다.`useState("hello")`로 초기 렌더링 값을 설정하고 상태를 관리할 수 있다.
- 게으른 초기화  
초깃값이 복잡하거나 무거운 연산을 포함하고 있을 때 사용한다. 비용이 크고 계산이 오래 걸리니 실제로 필요할 때까지 계산을 미룬다는 뜻.
```jsx
import { useState } from "react";

function Component() {
  
  const [state, setState] = useState(() => {
    console.log("초기값을 계산합니다.");
    return expensiveComputation();
  });

  function expensiveComputation() {
    
    return 42;
  }

  return <h1>{state}</h1>;
}
```
첫 렌더링에서 초기값으로 무거운 함수가 한 번 호출되며, 결과가 바뀌지 않는다면 호출되지 않는다.데이터가 변경되지 않는 `API`를 호출하는 경우 사용된다.

### useEffect
```jsx
function Component() {
// ...
useEffect(() => {
// do something
}, [props, state])
// ...
}
```
의존성 배열을 통해 이전 값과 현제 값을 비교하고, 변경된 경우에 콜백을 실행한다.
- `useEffect`란  
컴포넌트 렌더링 후 부수 효과를 처리할 때 유용한 훅이다. 콜백이 실행될 때 이전의 클린업 함수가 존재한다면 클린업 함수를 실행한 뒤에 콜백을 실행한다. 이로인해 특정 이벤트 핸들러가 무한히 추가되는 것을 방지할 수 있다.


- 클린업 함수  
`useEffect`의 콜백함수가 실행될 때마다 이전에 설정한 부수효과(이벤트 리스너,타이머,외부리소스 등)를 **정리(cleanup)** 할 때 사용된다.
```jsx
useEffect(() => {
  const controller = new AbortController();
  
  const fetchData = async () => {
    const response = await fetch("https://api.example.com", {
      signal: controller.signal, 
    });
    const data = await response.json();
    console.log(data);
  };

  fetchData();

  
  return () => {
    controller.abort();
  };
}, []);
```
[AbortController()](https://developer.mozilla.org/ko/docs/Web/API/AbortController)를 사용해 언마운트시 클린업 함수를 실행한다. 

- 의존성 배열   
빈 배열을 둔다면 최초 렌더링 실행 후 더 이상 실행되지 않으며, 아무런 값도 넘겨주지 않는다면 렌더링 할 때마다 실행된다.
```jsx
// 1
function Component() {
console.log('렌더링됨')
}
// 2
function Component() {
useEffect(() => {
console.log('렌더링됨')
})
}
```
○ 1번 사용시 동기적으로 수행되기 때문에 컴포넌트의 반환을 지연시키게 된다.   
○ 2번 사용시 클라이언트에서 실행하기 때문에 비동기 처리가 가능해지므로 지연 없이 호출이 가능해진다.

- `useEffect`를 사용할 때 주의할 점  
○ 빈 배열을 의존성으로 하고 있기 때문에 의도치 않은 오류를 방지하기 위해 주석 사용을 최대한 자제해야 한다.  
○ `useEffect`의 첫 번째 인수에 함수명을 부여하라.
```jsx
useEffect(() => {
logging(user.id)
}, [user.id])
```
내부에서 사용된 변수나 상태가 있다면 의존성 배열에 추가해야 한다. 그렇지 않으면 최신 값이 반영되지 않을 수 있다. 만약 배열을 비워두고 내부에서 상태를 변경하면 무한루프가 발생할 수 있다.

### useMemo
비용이 큰 연산에 대한 결과값을 저장하고 반환하는 훅이다.
```jsx
import { useMemo } from 'react'
const memoizedValue = useMemo(() => expensiveComputation(a, b), [a, b])
```
첫 번째 인수로 값을 반환하는 생성 함수를, 두 번째 인수로는 해당 함수가 의존하는 값의 배열을 전달한다. 의존성 배열의 값이 변경됐다면 첫 번째 인수의 함수를 실행한 후에 그 값을 반환하고 다시 기억해둔다.
- React.memo  
값의 계산을 최적화 하는 `useMemo`와 다르게 컴포넌트의 리렌더링을 최적화 한다. 
```jsx
const ExpensiveChildComponent = React.memo(function ExpensiveChildComponent({ name }) {
    console.log('ExpensiveChildComponent 렌더링');
    return <div>{name}</div>;
});

function ParentComponent() {
    const [count, setCount] = useState(0);
    const [name, setName] = useState('Alice');

    return (
        <div>
            <ExpensiveChildComponent name={name} />
            <button onClick={() => setCount(count + 1)}>Increase Count</button>
        </div>
    );
}
```
`ParentComponent()`가 리렌더링 되더라도 `name`이 변경되지 않으면 리렌더링 되지 않는다.

### useCallback
인수로 넘겨받은 콜백 함수를 기억하고 재사용 할 수 있다. 자식 함수에서 생성되는 콜백 함수가 새로 생성되는 것을 방지한다.
```jsx
import React, { useState, useCallback } from 'react';

function Parent() {
    const [count, setCount] = useState(0);
    
    const handleClick = useCallback(() => {
        setCount(count + 1);
    }, [count]); 

    return (
        <div>
            <button onClick={handleClick}>Click me</button>
            <Child onClick={handleClick} />
        </div>
    );
}

function Child({ onClick }) {
    console.log('Child re-rendered');
    return <button onClick={onClick}>Child Button</button>;
}
```
`count`가 변경될 때만 새로운 함수를 생성하고 그렇지 않으면 기존의 함수가 재사용된다.
- `useMemo`로 구현하기  
각 훅의 차이점은 기억하는 대상이 함수냐 변수의 차이이기 때문에 구현이 가능하지만 코드의 길이가 불필요하게 길어지고 가독성이 떨어진다.
```jsx
import React, { useState, useMemo } from 'react';

function Parent() {
  const [count, setCount] = useState(0);
  
  const handleClick = useMemo(() => {
    return () => {
      setCount(count + 1);
    };
  }, [count]); 

  return (
    <div>
      <button onClick={handleClick}>Click me</button>
      <Child onClick={handleClick} />
    </div>
  );
}

function Child({ onClick }) {
  console.log('Child re-rendered');
  return <button onClick={onClick}>Child Button</button>;
}
```

### useRef
`useState`처럼 컴포넌트 내부에서 렌더링이 일어나도 변경 가능한 상태값을 저장할 수 있다. 렌더링을 하지 않고 값을 변경할 수 있다는 차이가 있다.
```jsx
import React, { useState, useRef } from 'react';

function Timer() {
  const [count, setCount] = useState(0);
  const prevCountRef = useRef(0);
  
  const handleClick = () => {
    prevCountRef.current = count;
    setCount(count + 1);
  };

  return (
    <div>
      <p>Current count: {count}</p>
      <p>Previous count: {prevCountRef.current}</p>
      <button onClick={handleClick}>Increment</button>
    </div>
  );
}
```
`current`를 사용해 DOM 엘리먼트에 접근하며 값이 변경되도라도 저장되며, 렌더링을 하지 않게 된다.

### useContext
상위 컴포넌트에서 하위 컴포넌트로 데이터를 쉽게 전달할 수 있게 한다. `Context API`와 함께 사용한다. 
- `Context`란?  
컴포넌트간의 거리에 따라 데이터를 넘겨주는 코드가 복잡해지게 되는데 이를 극복하기 위해 만들어졌다.
```javascript
<A props={something}>
  <B props={something}>
    <C props={something}>
      <D props={something}/>
    </C>
  </B>
</A>
```
A에서 D까지 `props`를 내려주기 위해 하위 컴포넌트로 계속 넘겨줘야 한다.

```jsx
import React, { createContext, useContext } from 'react';

const MyContext = createContext();

function Parent() {
  const value = "This is context data!";
  
  return (
    <MyContext.Provider value={value}>
      <Child />
    </MyContext.Provider>
  );
}

function Child() {
  
  const contextValue = useContext(MyContext);
  
  return <div>{contextValue}</div>; 
}

export default Parent;
```
`Context`를 생성하고 `useContext`로 값을 사용할 수 있다. `Provider`로 감싸진 컴포넌트에서만 정상적으로 사용이 가능하다.  
`props`를 하위로 전달하는 역할만을 수행하며 렌더링 최적화에는 역할을 수행하지 않는다. 그렇기 때문에 자주 변경되는 값을 전달하지 않는 것이 좋다.

### useReducer
상태를 관리하는 훅이다, `useState`와 다르게 2개에서 3개의 인수를 필요로 하며 복잡한 상태값을 시나리오에 따라 관리할 때 사용한다.
```js
const [state, dispatch] = useReducer(reducer, initialState);
```
`reducer`: `state`와 `action`을 받아 새로운 `state`로 반환한다.  
`initialState`: 상태의 초기값.  
`state`: 현재 상태.  
`dispatch`: 액션을 발생시킬 수 있는 함수. 액션을 전달하여 상태를 업데이트.
```tsx
import React, { useReducer } from 'react';

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { ...state, count: state.count + 1 };
    case 'decrement':
      return { ...state, count: state.count - 1 };
    case 'setName':
      return { ...state, name: action.payload };
    default:
      return state;
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, { count: 0, name: 'John' });

  return (
    <div>
      <p>Count: {state.count}</p>
      <button onClick={() => dispatch({ type: 'increment' })}>Increment</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>Decrement</button>
      <p>Name: {state.name}</p>
      <button onClick={() => dispatch({ type: 'setName', payload: 'Jane' })}>Change Name</button>
    </div>
  );
}

export default App;
```

### useImperativeHandle
`useRef` 훅으로 생성한 `ref`를 활용하여 부모가 자식의 `DOM요소`에 접근할 수 있게 한다. `forwardRef` 형식으로 사용한다.
```tsx
import React, { useRef, forwardRef } from 'react';

const Child = forwardRef((props, ref) => {
  return <div ref={ref}>Hello, I am a Child Component!</div>;
});

function Parent() {
  const childRef = useRef();

  const focusChild = () => {
 
    console.log(childRef.current);
  };

  return (
    <div>
      <Child ref={childRef} />
      <button onClick={focusChild}>Focus on Child</button>
    </div>
  );
}

export default Parent;
```
- `useImperativeHandle`이란?  
자식이 `useImperativeHandle`를 통해 메서드를 노출하면. 부모는 `ref`를 사용해 컴포넌트의 메서드나 속성에 접근할 수 있다.
```tsx
import React, { useRef, useImperativeHandle, forwardRef, useState } from 'react';

const Child = forwardRef((props, ref) => {
  const [count, setCount] = useState(0);
  
  useImperativeHandle(ref, () => ({
    increment: () => setCount(count + 1)
  }));

  return <div>Count: {count}</div>;
});

function Parent() {
  const childRef = useRef();

  const handleClick = () => {
    childRef.current.increment();
  };

  return (
    <div>
      <Child ref={childRef} />
      <button onClick={handleClick}>Increment from Parent</button>
    </div>
  );
}

export default Parent;
```
`forwardRef`를 사용해 `ref`를 전달받고 `useImperativeHandle`를 사용해서 increment 메서드를 노출해 `childRef.current.increment`를 통해 자식 컴포넌트의 메서드를 호출할 수 있다.

### useLayoutEffect
`useEffect와` 사용법이 동일하지만, 콜백 함수 실행이 동기적으로 발생하기 때문에 화면에 반영되기 전에 하고싶은 작업을이 있을 때 사용하며, `DOM요소`를 기본으로 하는 애니메이션, 스크롤 위치 제어 등을 자연스럽게 만들 수 있다.
```tsx
import React, { useState, useLayoutEffect, useRef } from 'react';

function App() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const boxRef = useRef(null);

  useLayoutEffect(() => {
    if (scrollPosition > 100) {
      const box = boxRef.current;
      box.style.transition = 'transform 0.5s ease-out';
      box.style.transform = 'translateX(200px)';
    }
  }, [scrollPosition]);

  const handleScroll = () => {
    setScrollPosition(window.scrollY);
  };

  useLayoutEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div style={{ height: '2000px' }}>
      <div
        ref={boxRef}
        style={{
          width: '100px',
          height: '100px',
          backgroundColor: 'skyblue',
          transform: 'translateX(0)',
        }}
      >
        Box
      </div>
      <p>스크롤을 내리면 박스가 애니메이션을 시작합니다.</p>
    </div>
  );
}

export default App;
```
### useDebugValue
다버깅 하고 싶은 정보를 리액트 개발자 도구에서 볼 수 있다.
```tsx
import { useState, useDebugValue } from 'react';

function useCustomHook() {
  const [count, setCount] = useState(0);
  
  useDebugValue(count);

  return [count, setCount];
}

function Component() {
  const [count, setCount] = useCustomHook();

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
```
`count`의 값을 리액트 개발자 도구에서 볼 수 있다.

### [훅의 규칙](https://ko.legacy.reactjs.org/docs/hooks-rules.html)

- 최상위에서만 훅을 호출해야 한다. 반복문이나 조건문, 중첩된 함수 내에서 훅을 실행할 수 없다.
```tsx
function MyComponent() {
  if (someCondition) {
    const [count, setCount] = useState(0);  // 조건문 안에서 훅 사용은 안됨
  }
  return <div></div>;
}
```
- 훅을 호출할 수 있는 것은 리액트 함수 컴포넌트, 혹은 사용자 정의 훅의 두 가지 경우뿐이다. 일반 자바스크립트 함수에서
  는 훅을 사용할 수 없다.
```tsx
function someFunction() {
  const [count, setCount] = useState(0);  // 일반 함수에서 훅 사용 X
}
```
## 커스텀 훅과 고차 컴포넌트 중 무엇을 써야 할까
### 커스텀 훅
다른 훅을 내부에서 호출하고 조합하여 재사용 가능한 로직을 만들 수 있다. 리액트 훅의 규칙을 따른다.
```tsx
import React, { useState, useEffect, useContext } from 'react';

const UserContext = React.createContext();

function useUserData() {
    const [user, setUser] = useState(null); 
    const [loading, setLoading] = useState(true); 
    const { theme } = useContext(UserContext); 
    
    useEffect(() => {
        async function fetchUserData() {
            try {
                const response = await fetch('https://api.example.com/user');
                const data = await response.json();
                setUser(data); 
            } catch (error) {
                console.error('Error fetching user data:', error);
            } finally {
                setLoading(false); 
            }
        }

        fetchUserData();
    }, []); 

    return { user, loading, theme }; 
}

function UserProfile() {
    const { user, loading, theme } = useUserData(); 

    if (loading) return <div>Loading...</div>; 

    return (
        <div style={{ background: theme === 'dark' ? '#333' : '#fff', color: theme === 'dark' ? '#fff' : '#000' }}>
            <h1>User Profile</h1>
            <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>
        </div>
    );
}

function App() {
    const userContextValue = { theme: 'dark' }; 

    return (
        <UserContext.Provider value={userContextValue}>
            <UserProfile />
        </UserContext.Provider>
    );
}

export default App;
```
평소에 볼 수 있는 데이터를 받아오는 형태이다. 각종 훅을 사용하여 데이터를 화면에 출력한다.
### 고차 컴포넌트
컴포넌트 자체의 로직을 재사용하기 위해 컴포넌트를 인자로 받고 새 컴포넌트를 변환하는 방법이다.
```tsx
import React from 'react';

const withBorder = (WrappedComponent) => {
  return (props) => (
    <div style={{ border: '2px solid blue', padding: '10px' }}>
      <WrappedComponent {...props} />
    </div>
  );
};

// 일반 컴포넌트
const HelloWorld = ({ message }) => <h2>{message}</h2>;

// 고차 컴포넌트 적용
const EnhancedHelloWorld = withBorder(HelloWorld);

function App() {
  return <EnhancedHelloWorld message="Hello, HOC!" />;
}

export default App;
```
기존의 컴포넌트 기능을 확장하거나 반복되는 UI 로직을 개선할 수 있다.

### 정리
렌더링의 결과물에 영향을 끼치는 공통 로직이라면 고차 컴포넌트를 사용해서 처리하는 것이 좋은 방법이다. 하지만 코드의 복잡성이 증가할 수 있기 때문에 신중하게 사용해야 한다.

## 작성하며 느낀 점
- 좋았던 점 : 배우지 않았던 훅의 사용법을 배우고 나니 기존 훅의 개념이 더 명확해졌다.


- 배운 점 :  자주 사용하는 훅의 기본 원리와 응용 방법을 복습하며, 각 훅의 특징 및 활용 방법을 보다 깊이 이해할 수 있었다. 


- 부족했던 점 : 정형화된 템플릿에 의존하다 보니 상황에 맞게 유연하게 적용하는 데 한계가 있었다.


- 다음 목표 : 재사용성과 최적화를 배우기 위해 렌더의 깊은 내용과 페이징에 대해 알아볼 것이다.
