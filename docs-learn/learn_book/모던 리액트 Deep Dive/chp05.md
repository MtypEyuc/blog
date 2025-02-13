---
sidebar_position: 5
title: "5장 리액트와 상태 관리 라이브러리"
description: 리액트와 상태 관리 라이브러리
authors: [MtypEyuc]
tags: [React]
hide_table_of_contents: false
---

## 1. 상태 관리는 왜 필요한가?
`UI`, `URL`, `FORM`, 서버에서 받은 `데이터` 등의 상태의 일관성을 유지하고 성능을 최적화 시켜 유지보수를 용이하게 만든다.
### 1. 리액트 상태 관리의 역사
#### 1. Flux 패턴의 등장   
웹 애플리케이션이 비대해지고 상태가 많아짐에 따라 상태의 추적이 어려워 데이터의 흐름을 단순화 시키기 위해 만들어졌다.
`Action` → `Dispatcher` → `Model` → `View` 의 단방향 데이터 흐름을 가진다.
#### 2. 리덕스의 등장
하나의 상태 객체를 스토어에 저장해 두고, 이 객체를 업데이트하는 작업을 디스패치해 업데이트를 수행한다. `proops`를 전역으로 관리해 하위 컴포넌트에 전파할 수 있다.
#### 3. Context API와 useContext  
`proops`의 단순 상태 참조시 리덕스 사용 부담이 컸기 때문에 만들어졌다. `Context`를 생성하고 훅을 사용해 호출한다. 
#### 4. 훅의 탄생, 그리고 React Query와 SWR
훅의 발전으로 함수 컴포넌트의 사용이 많아지게 되었고 상태 관리가 쉬워지게 되었다. 이에 따라 데이터를 불러오는데 특화된 라이브러리가 등장하게 된다.
```tsx
import React from 'react'
import useSWR from 'swr'
const fetcher = (url) => fetch(url).then((res) => res.json())
export default function App() {
const { data, error } = useSWR(
'https://api.github.com/repos/vercel/swr',
fetcher,
)
if (error) return 'An error has occurred.'
if (!data) return 'Loading...'
return (
<div>
<p>{JSON.stringify(data)}</p>
</div>
)
}
```
## 2. 리액트 훅으로 시작하는 상태 관리
### 1. useSubscription
스토어를 생성 후 훅을 사용해 상태를 구독하고 상태가 변하면 UI를 업데이트 하는 방식이다.
```javascript
// store.js 
const store = {
  state: { count: 0 },
  listeners: new Set(),
    
  setState(newState) {
    this.state = { ...this.state, ...newState };
   
    this.listeners.forEach(listener => listener(this.state));
  },


  subscribe(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);  
  },
};

export default store;

```
```javascript
// useSubscription.js 
import { useState, useEffect } from "react";
import store from "./store";

const useSubscription = () => {
  const [state, setState] = useState(store.state);

  useEffect(() => {

    const unsubscribe = store.subscribe(setState);

   
    return () => unsubscribe();
  }, []);

  return state;
};

export default useSubscription;

```
```javascript
import React from "react";
import { useSubscription } from "./useSubscription";
import store from "./store";

const Counter = () => {
  const { count } = useSubscription();  

  const increment = () => {
    store.setState({ count: count + 1 });  
  };

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>Increment</button>
    </div>
  );
};

export default Counter;
```
### 2. useState와 Context를 동시에 사용해 보기
컴포넌트는 하나의 스토어만 가질 수 있는데 이 문제를 해결하기 위해 스토어를 여러개 만들고 데이터를 공유하게 할 수 있는 방법이다. 
```typescript          
export const useCounterContextSelector = <State extends unknown>(
selector: (state: CounterStore) => State,
) => {
const store = useContext(CounterStoreContext)
// useStoreSelector를 사용해도 동일하다.
const subscription = useSubscription(
useMemo(
() => ({
getCurrentValue: () => selector(store.get()),
subscribe: store.subscribe,
}),
[store, selector],
),
)
return [subscription, store.set] as const
}
```
```tsx
const ContextCounter = () => {
const id = useId()
    const [counter, setStore] = useCounterContextSelector(
        useCallback((state: CounterStore) => state.count, []),
    )
    function handleClick() {
        setStore((prev) => ({ ...prev, count: prev.count + 1 }))
    }
    useEffect(() => {
        console.log(`${id} Counter Rendered`)
    })
    return (
        <div>
            {counter} <button onClick={handleClick}>+</button>
        </div>
)
}
const ContextInput = () => {
    const id = useId()
    const [text, setStore] = useCounterContextSelector(
        useCallback((state: CounterStore) => state.text, []),
    )
    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        setStore((prev) => ({ ...prev, text: e.target.value }))
    }
    useEffect(() => {
        console.log(`${id} Counter Rendered`)
    })
    return (
        <div>
            <input value={text} onChange={handleChange} />
    </div>
)
}

export default function App() {
    return (
        <>
            {/* 0 */}
            <ContextCounter />
            {/* hi */}
            <ContextInput />
            <CounterStoreProvider initialState={{ count: 10, text: 'hello' }}>
                {/* 10 */}
                <ContextCounter />
                {/* hello */}
                <ContextInput />
                <CounterStoreProvider initialState={{ count: 20, text: 'welcome' }}>
                    {/* 20 */}
                    <ContextCounter />
                    {/* welcome */}
                    <ContextInput />
                </CounterStoreProvider>
            </CounterStoreProvider>
        </>
    )
}
```
각 컴포넌트 트리에서 상태를 독립적으로 관리하며 다른 컴포넌트에서 동적상태를 업데이트 할 수 있게 된다. 
### 4. 상태 관리 라이브러리 Recoil, Jotai, Zustand 살펴보기
#### 1. Recoil
`Atoms` 라는 기본 단위를 사용하며 상태를 정의하고 `selector`로 파생 상태를 계산한다. 최상위 컴포넌트에 `RecoilRoot`로 애플리케이션을 감싸서 사용한다.
```tsx
const counterState = atom({
key: 'counterState',
default: 0,
})
function Counter() {
const [, setCount] = useRecoilState(counterState)
    function handleButtonClick() {
        setCount((count) => count + 1)
    }
    return (
        <>
            <button onClick={handleButtonClick}>+</button>
        </>
    )
}
// atom을 기반으로 또 다른 상태를 만들 수 있다.
const isBiggerThan10 = selector({
    key: 'above10State',
    get: ({ get }) => {
        return get(counterState) >= 10
    },
})
function Count() {
    const count = useRecoilValue(counterState)
    const biggerThan10 = useRecoilValue(isBiggerThan10)
    return (
        <>
            <h3>{count}</h3>
            <p>count is bigger than 10: {JSON.stringify(biggerThan10)}</p>
        </>
    )
}
export default function App() {
    return (
        <RecoilRoot>
            <Counter />
            <Count />
        </RecoilRoot>
    )
}
```
#### 2. Jotai
`Recoil`의 `atom` 모델에 영감을 받아 만들어진 상태 관리 라이브러리다. 직관적인 `API`를 제공하며 `UseAtom` 훅을 사용한다.
```tsx
import { atom, useAtom, useAtomValue } from 'jotai'
const counterState = atom(0)
function Counter() {
const [, setCount] = useAtom(counterState)
function handleButtonClick() {
setCount((count) => count + 1)
}
return (
<>
<button onClick={handleButtonClick}>+</button>
</>
)
}
const isBiggerThan10 = atom((get) => get(counterState) > 10)
function Count() {
    const count = useAtomValue(counterState)
    const biggerThan10 = useAtomValue(isBiggerThan10)
    return (
        <>
            <h3>{count}</h3>
            <p>count is bigger than 10: {JSON.stringify(biggerThan10)}</p>
        </>
    )
}
export default function App() {
    return (
        <>
            <Counter />
            <Count />
        </>
    )
}
```
#### 3. Zustand
리덕스에 영감을 받아 만들어졌다. 간단한 `API`를 제공해 적고 가벼운 코드로 작성 가능하다.
```tsx
import { create } from 'zustand'
const useCounterStore = create((set) => ({
count: 1,
inc: () => set((state) => ({ count: state.count + 1 })),
dec: () => set((state) => ({ count: state.count - 1 })),
}))
function Counter() {
const { count, inc, dec } = useCounterStore()
return (
<div class="counter">
<span>{count}</span>
<button onClick={inc}>up</button>
<button onClick={dec}>down</button>
</div>
)
}
```

## 작성하고 느낀 점
좋았던 점: 리덕스를 배울 때 왜 이렇게 복잡한 방식으로 `API`를 불러와야 하는지 이해가 어려웠었는데 오히려 이런 방식이 익숙해지면 안전하게 사용할 수 있다는 것을 알게 되었다.

배운 점: 상태 관리 라이브러리의 사용법을 배웠다.

아쉬웠던 점: 복잡한 내용을 어떻게든 전달하려는 의도가 느껴지지만 예제가 어렵다 보니 제대로 된 이해를 위해서 외부 정보를 이용해야 했다.

향후 계획: 리엑트 개발 도구로 디버깅 하는 방법에 대해 알아볼 것이다.