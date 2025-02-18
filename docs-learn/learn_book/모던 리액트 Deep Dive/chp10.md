---
sidebar_position: 10
title: "10장 리액트 17과 18의 변경 사항 살펴보기"
description: 리액트 17과 18의 변경 사항 살펴보기
authors: [MtypEyuc]
tags: [React]
hide_table_of_contents: false
---

## 1. 리액트 16 → 17버전 살펴보기
변경된 10만개의 컴포넌트 중 호환성이 깨지는 영향을 받은 것이 20개 미만일 정도로 기존에 사용하던 코드 수정을 필요로 하는 변경을 최소화 하였기 때문에 부담없이 버전 업그레이드가 가능하다.
### 1. 리액트의 점진적인 업그레이드
#### 1.  주 버전 업데이트(Major Update)
버전의 앞 자리가 바뀌는 형식이며 기존 버전과 호환되지 않는 변경이 포함된다. 리액트 16 → 17 처럼 업데이트 이후 사용할 수 없는 기능이 생기게 된다.
#### 2.  수 버전 업데이트(Minor Update)
버전의 뒷 자리가 바뀌는 형식이며 새로운 기능을 추가하면서 기존 코드 호환성을 유지한다. 16.7 → 16.8 버전 업은 리액트 훅이라는 신규 기능을 추가한 것이다.
#### 3. 점진적 업그레이드(Gradual Upgrade)
리액트 17 버전 부터 도입된 방식으로, 주 버전 업데이트의 단점을 보완한다. 일부 컴포넌트만 신규 버전으로 실행 가능하게 만들 수 있게 되어 기존 기능을 유지하면서 단계적으로 도입 가능해졌다. 한 애플리케이션에 여러 버전의 리액트가 존재한다는 뜻이다.
### 2. 이벤트 위임 방식의 변경
기존 버전은 모든 이벤트가 `document`에서 처리되었지만, 17 버전 이후 컴포넌트 최상단 요소에서 처리하게 된다. 이 수정을 통해 버전 문제를 해결하고 이벤트를 컴포넌트 트리 수준으로 격리해 이벤트 버블링을 방지할 수 있다. 

이러한 위임 방식의 변경으로 인해 16 버전을 기준으로 작성된 코드가 있다면 수정이 필요하게 되었다.
### 3. import React from 'react'가 더 이상 필요 없다 새로운 JSX transform
17 버전 부터 불필요한 `import` 구문을 작성하지 않아도 된다.
```jsx
const Component = (
    <div>
        <span>hello world</span>
    </div>
    )
// 리액트 16에서는 이렇게 변환된다.
var Component = React.createElement(
    'div',
    null,
    React.createElement('span', null, 'hello world'),
 )
```
- 16 버전은 React.createElement를 수행할 때 필요한 import React from 'react'가 필요하다.
```jsx
'use strict'

var _jsxRuntime = require('react/jsx-runtime') 

var Component = (0, _jsxRuntime.jsx)('div', {
    children: (0, _jsxRuntime.jsx)('span', {
     children: 'hello world',
    }),
 })
```
- require 구문이 react/jsx-runtime을 불러와 JSX를 변환해준다.
### 4. 그 밖의 주요 변경 사항
- 이벤트 풀링 제거

- useEffect 클린업 함수의 비동기 실행

- 컴포넌트의 undefined 반환에 대한 일관적인 처리

## 2. 리액트 17 → 18 버전 살펴보기
### 1. 새로 추가된 훅 살펴보기
#### 1. useId
컴포넌트별로 유니크한 값을 생성하는 새로운 훅이다. 클라이언트와 서버에서 동일한 ID를 보장하기 때문에 SSR 환경에서 유용하다.
```tsx
import { useId } from "react";

function MyComponent() {
  const id = useId(); 

  return (
    <div>
      <label htmlFor={id}>이름</label>
      <input id={id} type="text" />
    </div>
  );
}
```
#### 2. useTransition
UI 변경을 가로막지 않고 상태를 업데이트할 수 있는 리액트 훅이다. `setText()`와 `startTransition()` 을 사용해 우선 순위를 정할 수 있다.
```tsx
import { useState, useTransition } from "react";

function MyComponent() {
  const [isPending, startTransition] = useTransition(); // isPending: startTransition 업데이트 진행 확인
  const [text, setText] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);

  const handleChange = (e) => {
    setText(e.target.value); //  긴급한 업데이트 (입력값 변경)

    startTransition(() => {
      //  덜 긴급한 업데이트 (목록 필터링)
      setFilteredItems(items.filter((item) => item.includes(e.target.value)));
    });
  };

  return (
    <div>
      <input type="text" value={text} onChange={handleChange} />
      {isPending && <p>로딩 중...</p>}
      <ul>
        {filteredItems.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
```
#### 3. useDeferredValue
컴포넌트 트리에서 리렌더링이 급하지 않은 부분을 지연할 수 있게 도와주는 훅이다. UI가 즉각적으로 반응하면서도 무거운 업데이트를 지연시킬 수 있다.
```tsx
import { useState, useDeferredValue } from "react";

const items = Array.from({ length: 10000 }, (_, i) => `Item ${i + 1}`);

export default function FilterList() {
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query); //  검색어 업데이트 지연

  const filteredList = items.filter((item) => item.includes(deferredQuery)); // UI가 느려지지 않도록 처리

  return (
    <div>
      <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} />
      <ul>
        {filteredList.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
```
#### 4. useSyncExternalStore
18 버전의 렌더링 최적화 기능 사용이 가능해지면서 동시성 이슈가 발생할 가능성이 생겼는데 `useState`나 `useReducer`가 아닌 모든 것들(외부 상태값)에 동시성 처리가 추가돼 있지 않다면 서로 다른 값을 기준으로 렌더링 하는 티어링 현상이 생길 가능성이 있는데 그 문제를 해결하기 위해 만들어졌다.
```tsx
import { useSyncExternalStore } from "react";

function subscribe(callback) {
  window.addEventListener("resize", callback);
  return () => window.removeEventListener("resize", callback);
}

function getSnapshot() {
  return window.innerWidth;
}

export default function WindowSize() {
  const width = useSyncExternalStore(subscribe, getSnapshot);

  return <p>현재 창 너비: {width}px</p>;
}
```
외부 상태값에 변화가 생기면 구독자에게 알림을 주고 최신값을 가져와 동기적인 상태 업데이트를 보장한다.

#### 5. useInsertionEffect
CSS-in-js 라이브러리를 위한 훅이다. DOM이 실제로 변경되기 전에 동기적으로 실행되기 때문에 깜빡임 없이 자연스러운 스타일 삽입이 가능해진다.
### 2. react-dom/ client
#### 1. createRoot
18 버전의 기능을 활성화 하려면 사용해야 한다. 렌더링을 최적화 하고 여러 상태 업데이트가 한번에 처리된다.
```tsx
import ReactDOM from "react-dom/client";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```
#### 2. hydrateRoot
SSR 애플리케이션에서 하이드레이션을 처리하기 위한 신규 메서드다. 리액트 DOM 서버 API와 함께 사용된다.
```tsx
import ReactDOM from 'react-dom'
import App from 'App'
const container = document.getElementById('root')
const root = ReactDOM.hydrateRoot(container, <App />)
```
### 3. react-dom/ server
#### 1. renderToPipeableStream
스트림을 지원하는 메서드로, HTML을 점진적으로 렌더링하고 클라이언트에서는 중간에script를 삽입하는 등의 작업을 할 수 있다. 
```tsx
function handleRequest(req, res) {
  const stream = renderToPipeableStream(<App />, {
    onShellReady() {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/html');
      stream.pipe(res);
    },
    onError(error) {
      console.error(error);
      res.status(500).send('Something went wrong');
    },
  });
}
```
App 컴포넌트를 서버 측에서 렌더링하고 스트리밍 한다. 클라이언트 코드에서는 `hydrateRoot`를 사용해 재사용 가능하다.
### 4. 자동 배치 (Automatic Batching)
여러 상태 업데이트를 하나의 리렌더링으로 묶어서 불필요한 렌더링을 줄여 성능을 향상시키는 방법을 의미한다.
```tsx
function Counter() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('');

  const handleClick = () => {
    setCount(count + 1); 
    setName('Alice');  
  };

  return (
    <div>
      <p>Count: {count}</p>
      <p>Name: {name}</p>
      <button onClick={handleClick}>Update</button>
    </div>
  );
}
```
### 5. Suspense 기능 강화
리액트 16.6 버전에서 실험 버전으로 도입된 기능으로, 컴포넌트를 동적으로 가져올 수 있게 도와주는 기능이다.
```tsx
import React from 'react';
import { hydrateRoot } from 'react-dom/client';
import App from './App';

const container = document.getElementById('root');

hydrateRoot(container, 
  <Suspense fallback={<div>Loading...</div>}>
    <App />
  </Suspense>
);
```
- 비동기 데이터 로딩 시 클라이언트에서 로딩 상태를 표시하도록 처리한다.
### 6. 인터넷 익스플로러 지원 중단에 따른 추가 폴리필 필요
Promise, Symbol, Object.assign 같은 최신 자바스크립트 기능을 사용할 수 있다는 가정하에 배포된다. 이 세 가지 폴리필이 설치돼 있지 않다면 리액트는 정상적으로 작동하지 않을 수도 있다.

## 작성하고 느낀 점
좋았던 점: 리액트의 버전이 바뀌면서 어떤 점이 변경되고 최적화 되었는지 알게 되었다.


배운 점: 17버전 이후 추가된 기능들과 18버전에서 사용하는 유용한 기능을 배웠다.


아쉬운 점: 애플리케이션의 성능을 최적화 하는 것은 지금 수준에서는 사용하기 어렵기 때문에 실무를 경험하지 않는 이상 이해하기 힘들다.


향후 계획: 넥스트 13에서 사용된 리액트 18 기능을 알아보고 애플리케이션 제작 시 도움을 주는 기능을 알아볼 것이다.
