---
sidebar_position: 2
title: "2장: 리액트 핵심 요소 깊게 살펴보기"
description: 리액트 핵심 요소 깊게 살펴보기
authors: [MtypEyuc]
tags: [React]
hide_table_of_contents: false
---
## JSX란?
트랜스파일 과정을 거쳐`JavaScript` 코드 안에 `HTML`, `XML`과 유사한 구문을 작성할 수 있도록 한다.
### JSX의 정의
- JSXElement:
`JSX`를 구성하는 가장 기본 요소로 `HTML`의 `element`와 비슷한 역할을 한다.
```jsx
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

const element = <Welcome name="Sara" />;
```
`JSX`는 요소가 시작되고 종료되는 형태여야 하고, 해당 요소는 같은 단계에 선언되어야 한다.

**JSXIdentifier**: `JSX` 내부에서 사용할 수 있는 식별자를 의미하며 숫자로 시작하거나 `$`와 `_`외의 다른 특수 문자로는 시작할 수 없다.

**JSXNamespacedName**: `JSXIdentifier`의 조합. `:`를 사용하여 다른 식별자를 이어주는 것도 하나의 식별자로 취급되며 하나의 식별자만 묶을 수 있다.

```jsx
const element = <svg xmlns="http://www.w3.org/2000/svg">
  <svg:circle cx="50" cy="50" r="40" />
</svg>;
```
**JSXMemberExpression**: `JSXIdentifier`의 조합. `.`를 사용하여 여러 개의 식별자를 묶을 수 있다.`JSXNamespacedName`과 이어서 사용하는 것은 불가능하다.

```jsx
const uiComponents = {
    buttons: {
        Submit: function() {
            return <button>Submit</button>;
        },
        Cancel: function() {
            return <button>Cancel</button>;
        },
    },
    headers: {
        MainHeader: function() {
            return <h1>Main Header</h1>;
        },
        SubHeader: function() {
            return <h2>Sub Header</h2>;
        },
    },
};

const submitButton = <uiComponents.buttons.Submit />;
const cancelButton = <uiComponents.buttons.Cancel />;
const mainHeader = <uiComponents.headers.MainHeader />;
const subHeader = <uiComponents.headers.SubHeader />;
```

- JSXAttributes:
`JsxElement`에 부여할 수 있는 속성을 의미하며 필수값이 아니기 때문에 존재하지 않아도 에러를 발생시키지 않는다.

**JSXAttributeName**
```jsx
const element = <div className="container" id="main-container">Hello World</div>;
```
속성의 키 값이다.  

**JSXAttributeValue**
```jsx
const buttonText = "Click Me!";
const isEnabled = true;

const element = <button disabled={!isEnabled}>{buttonText}</button>;
```
속성의 키에 할당할 수 있는 값으로 다음 중 하나의 값을 만족해야 한다.  
○ "큰따옴표로 구성된 문자열"  
○ '작은따옴표로 구성된 문자열'  
○  AssignmentExpression : 값을 할당하는 표현식이 필요하다.  
○ JSXElement

- JSXChildren: `JSX`에서 요소의 자식을 나타내는 표현이며 0개 이상의 자식을 가질 수 있다. 다른 요소나 텍스트도 자식으로 포함할 수 있다.
```jsx
const element = (
  <div>
    <h1>Welcome to My Website</h1>
    <p>This is a paragraph inside a div.</p>
  </div>
);
```
- JSXStrings: `JSX`의 표현식 내에서 문자열을 다룰 때 사용하는 방식. `HTML`에서 사용가능한 문자열은 모두 사용가능하다.
```jsx
const title = "Welcome to My Website";
const element = (
  <div>
    <h1>{title}</h1>
    <p>Here is some additional content.</p>
  </div>
);
```
### JSX 자바스크립트 변환
```jsx
const element = <h1>Hello, World!</h1>;
```
```jsx
const element = React.createElement('h1', null, 'Hello, World!');
```
`React.createElement` 함수를 호출하고 요소, 속성, 자식의 순서로 객체를 생성하게 된다.

## 가상 DOM과 리액트 파이버
### DOM
`Document Object Model`의 약자로 브라우저가 보여주는 웹페이지의 구성 정보를 담고 있다.
### 가상 DOM
깜빡임 없는 자연스러운 웹페이지 조작을 위해 실제 `DOM`을 조작하기 전에 리액트에서 메모리를 사용하여 웹페이지에 표시해야할 부분을 미리 작업해 두는 것.
### 리액트 파이버
작업을 분할하고 우선순위를 관리할 수 있는 비동기 랜더링을 지원한다. 그로 인해 애플리케이션이 멈추지 않고 반응성을 유지할 수 있다.

## 클래스 컴포넌트와 함수 컴포넌트
### 클래스 컴포넌트
리액트 컴포넌트 작성 방식 중 하나로 상태와 생명주기 메서드를 사용할 수 있으며 컴포넌트 내부의`render` 매서드를 통해 `JSX`를 반환한다.
```jsx
import React, { Component } from 'react';

class MyComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      count: 0
    };
  }
  
  handleClick = () => {
    this.setState({ count: this.state.count + 1 });
  }

  render() {
    return (
      <div>
        <h1>Count: {this.state.count}</h1>
        <button onClick={this.handleClick}>Increment</button>
      </div>
    );
  }
}

export default MyComponent;
```
컴포넌트 내부에 `constructor`함수가 있다면 컴포넌트가 초기화되는 시점에서 호출되며 `state`를 초기화할 수 있다.
- 클래스 컴포넌트의 생명주기 매서드   
생명주기 매서드가 실행되는 시점은 크게 3가지로 나눌 수 있다.  
  ○ mount: 컴포넌트가 마운팅(생성)되는 시점  
  ○ update: 이미 생성된 컴포넌트의 내용이 변경(업데이트)되는 시점  
  ○ unmount: 컴포넌트가 더 이상 존재하지 않는 시점  
  ○ render(): 클래스 컴포넌트의 필수 값으로 항상 쓰이며 컴포넌트가 UI를 랜더링 하기 위해 사용되고 `mount`와`update` 과정에서 일어난다. 입력값과 같은 결과값을 반환해야 한다.  
  ○ componentDidMount():`mount`작업 완료 후 준비가 됐다면 즉시 실행되며, 성능 문제 가능성이 있지만 `state`를 변경할 수 있다.   
  ○ componentWillUnmount():컴포넌트가 `unmount`되거나 더 이상 사용되지 않기 직전에 호출해 메모리 누수나 불필요한 작동을 막을 수 있다.   
  ○ shouldComponentUpdate(): `state`나 `props`의 변경시 리렌더링 을 막고 싶을 때 사용한다.   
  ○ static getDerivedStateFromProps(): `componentWill ReceiveProps`를 대체할 수 있는 메서드로 `staic`로 선언되어 `this`로 접근할 수 없고 반환 객체의 내용은 모두 `state`로 들어가게 된다.  
  ○ getSnapShotBeforeUpdate(): `componentWillUpdate()`를 대체할 수 있는 메서드로 반환되는 값은 `componentDidUpdate`로 전달된다. 렌더링 이전에 윈도우 크기를 조정하거나 스크롤 위치를 조정하는 작업을 처리하는데 유용함.  
  ○ getDerivedStateFromError(): 에러 발생시 실행되는 메서드로 `error`을 인수로 빋고 반드시 `state`값을 반환해야 한다.  
  ○ componentDidCatch: `getDerivedStateFromError()`에서 반환된 `error`와 컴포넌트 `info`를 인수로 받는다.


- 클래스 컴포넌트의 단점 : 기능을 익히는 것이 어렵고, 데이터 추적과 내부로직 재사용이 어렵다는 단점이 있으며 기능이 많아질수록 컴포넌트 크기가 커진다.
### 함수 컴포넌트 
리액트 16.8에서 훅이 등장하면서 함수 컴포넌트에서도 상태와 생명주기를 사용할 수 있게 되어 사용률이 높아지게 되었다. 본인도 리액트 18을 사용해 리액트를 배웠기 때문에 클래스 컴포넌트 보다는 함수 컴포넌트 쪽이 더 익숙하다.
```jsx
import React, { useState } from 'react';

function Counter() {

  const [count, setCount] = useState(0);

 
  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1);

  return (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
    </div>
  );
}

export default Counter;
```
- 특징  
○ 클래스 컴포넌트보다 간결하다. 상태나 생명주기를 사용하지 않으면 간단한 함수로 정의할 수도 있다.  
○ `React Hooks`를 사용해 관리할 수 있다.  
○ `return`을 사용해 `JSX`를 반환한다.  
○ `this`를 사용하지 않아 직관적이고 깔끔한 코드.
## 렌더링
### 리액트의 렌더링이 일어나는 이유
처음 에플리케이션에 진입할 때 또는 `state`, `props`, `Context API`, **컴포넌트의 생명주기**의 변화, `forceUpdate()` 호출이 발생했을 때 일어난다.
### 렌더링 과정
```jsx
const element = <h1 className="greeting">Hello, React!</h1>;
```
```javascript
const element = React.createElement(
  'h1',
  { className: 'greeting' },
  'Hello, React!'
);
```
```javascript
{
  type: 'h1',
          props: {
    className: 'greeting',
            children: 'Hello, React!'
  },
  key: null
}
```

### 렌더와 커밋
- 렌더: 컴포넌트를 렌더링하고 변경사항을 계산하는 모든 작업. 크개 `type`, `props`, `key`를 비교하며, 하나라도 변경된 것이 있으면 변경이 필요한 컴포넌트로 체크해둔다.


- 커밋: 렌더의 변경사항을 `DOM`에 적용하는 과정. 업데이트 이후 리액트의 내부 참조를 업데이트 하고 생명주기 매서드를 호출한다.
## 메모제이션
이전의 연산 결과를 저장하여 동일한 입력이 주어졌을 때 불필요한 렌더를 방지하기 위해 저장된 값을 기억하는 최적화 기법 중 하나.

## 작성하며 느낀 점
- 좋았던 점 : 리액트 18을 배웠을 때 알지 못했던 리액트의 깊이 있는 내용을 알게 되었다.


- 배운 점 : `JSX`의 세부적인 개념을 배우고 컴포넌트와 생명주기 매서드의 역할을 배웠다.


- 부족했던 점 : 리액트 18을 기준으로 배워서 클래스 컴포넌트에 대한 이해가 부족했다.


- 다음 목표 : 리액트에서 성능을 최적화하는 방법에 대해 배울 것이다.