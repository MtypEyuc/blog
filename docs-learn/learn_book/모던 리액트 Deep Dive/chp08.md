---
sidebar_position: 8
title: "8장 좋은 리액트 코드 작성을 위한 환경 구축하기"
description: 좋은 리액트 코드 작성을 위한 환경 구축하기
authors: [MtypEyuc]
tags: [React]
hide_table_of_contents: false
---
## 1. ESLint를 활용한 정적 코드 분석
자바스크립트에서 사용하는 정적 코드 분석 도구이다. 버그 발생 가능성이 있는 코드를 찾아내 수정할 수 있다.
### 1. ESLint 살펴보기
#### 1. ESLint는 어떻게 코드를 분석할까?
- 자바스크립트 코드를 문자열로 읽는다.
```js
const x = 10;
console.log(x);
```
```json
{
  "type": "Program",
  "body": [
    {
      "type": "VariableDeclaration",
      "declarations": [
        {
          "type": "VariableDeclarator",
          "id": { "type": "Identifier", "name": "x" },
          "init": { "type": "Literal", "value": 10 }
        }
      ],
      "kind": "const"
    },
    {
      "type": "ExpressionStatement",
      "expression": {
        "type": "CallExpression",
        "callee": { "type": "MemberExpression", "object": { "type": "Identifier", "name": "console" }, "property": { "type": "Identifier", "name": "log" } },
        "arguments": [{ "type": "Identifier", "name": "x" }]
      }
    }
  ]
}
```
- 자바스크립트 코드를 분석할 수 있는 파서(parser)로 코드를 구조화한다
- 구조화한 트리를 AST(Abstract Syntax Tree)라 하며, 이 구조화된 트리를 기준으로 각종 규칙과 대조한다.
```js
module.exports = {
  create(context) {
    return {
      CallExpression(node) {
        if (node.callee.type === "MemberExpression" &&
            node.callee.object.name === "console") {
          context.report({
            node,
            message: "console.log 사용 금지"
          });
        }
      }
    };
  }
};
```
- 규칙과 대조했을 때 이를 위반한 코드를 알리거나(report) 수정한다(fix)
```js
console.log("Hello World");
```
```pgsql
2:1  warning  Unexpected console statement  no-console
```
### 2. eslint-plugin과 eslint-config
#### 1. eslint-plugin
해당 접두사로 시작하는 플러그인은 앞의 규칙을 모아둔 패키지이다.[eslint-plugin-import](https://www.npmjs.com/package/eslint-plugin-import) 패키지를 예를 들었을 때 `import`와 관련된 여러 규칙을 제공한다. 
#### 2. eslint-config
프로젝트에 필요한 `eslint-plugin`을 한데 묶어서 완전한 세트로 제공하는 패키지다. 만드는 것은 굉장히 번거로운 일이기 때문에 개인 개발자가 만드는 일은 드물고, 일
부 IT 기업들에서 공개한 패키지를 설치해 사용하는 것이 일반적이다. 대표적으로 `eslint-config-airbnb`, `@titicaca/triple-config-kit`, `eslint-config-next` 등이 있다.
### 3. 나만의 ESLint 규칙 만들기
기존 패키지에서 규칙을 제거하거나 새로운 규칙을 만들 수 있다.  
```js
module.exports = {
    rules: {
        'no-restricted-imports': [
            'error',
            {
                name: 'lodash',
                message:
                    'lodash는 CommonJS로 작성돼 있어 트리쉐이킹이 되지 않아 번들 사이즈를 크게 합니다. lo-dash //* 형식으로 import 해주세요.',
            },
                ],
            },
        }
```
### 4. 주의할 점

#### 1. 규칙에 대한 예외 처리, 그리고 react-hooks/no-exhaustive-deps
`eslint-disable-` 주석을 사용해 규칙 대상에서 제외시킬 수 있다.
```js
// 특정 줄만 제외
console.log('hello world') // eslint-disable-line no-console

// 다음 줄 제외
// eslint-disable-next-line no-console
console.log('hello world')

// 특정 여러 줄 제외
/* eslint-disable no-console */
console.log('JavaScript debug log')
console.log('eslint is disabled now')
/* eslint-enable no-console */

// 파일 전체에서 제외
/* eslint-disable no-console */
console.log('hello world')
```
#### 2. ESLint 버전 충돌
- 전역(Global) 설치된 ESLint와 로컬(Local) 설치된 ESLint가 다름
- 프로젝트 의존성 버전 불일치
- ESLint 플러그인 또는 공유 설정의 버전 불일치
- Node.js 버전이 맞지 않음
```sh
npm install eslint@8 eslint-config-airbnb@latest eslint-plugin-react@latest --save-dev
```
공식 문서에서는 `peerDependencies`로 설정해 해결하라고 한다.
## 2. 리액트 팀이 권장하는 리액트 테스트 라이브러리
### 1. 자바스크립트 테스트의 기초
`Jest`, `Mocha`, `Karma`, `Jasmine` 등의 테스팅 프레임워크를 사용한다.
- 테스트할 함수나 모듈을 선정한다.
- 함수나 모듈이 반환하길 기대하는 값을 적는다.
- 함수나 모듈의 실제 반환 값을 적는다.
- 3번의 기대에 따라 2번의 결과가 일치하는지 확인한다.
- 기대하는 결과를 반환한다면 테스트는 성공이며, 만약 기대와 다른 결과를 반환하면 에러를 던진다
```js
const { sum } = require('./math')
test('두 인수가 덧셈이 되어야 한다.', () => {
expect(sum(1, 2)).toBe(3)
})
test('두 인수가 덧셈이 되어야 한다.', () => {
expect(sum(2, 2)).toBe(3) // 에러
})
```
```sh
$ npm run test
```
```sh
> jest
FAIL lessons/jest.test.js
✓ 두 인수가 덧셈이 되어야 한다.
✕ 두 인수가 덧셈이 되어야 한다. (3 ms)
● 두 인수가 덧셈이 되어야 한다.
expect(received).toBe(expected) // Object.is equality
Expected: 3
Received: 4
6 |
7 | test('두 인수가 덧셈이 되어야 한다.', () => {
> 8 | expect(sum(2, 2)).toBe(3)
| ^
9 | })
at Object.<anonymous> (lessons/jest.test.js:8:21)
Test Suites: 1 failed, 1 total
Tests: 1 failed, 1 passed, 2 total
Snapshots: 0 total
Time: 0.241 s, estimated 1 s
Ran all test suites related to changed files
```
### 2. 리액트 컴포넌트 테스트 코드 작성하기
- 컴포넌트를 렌더링한다.
- 필요하다면 컴포넌트에서 특정 액션을 수행한다.
- 컴포넌트 렌더링과 2번의 액션을 통해 기대하는 결과와 실제 결과를 비교한다.
#### 1. 정적 컴포넌트
결과를 반환하기만 하기 때문에 어렵지 않게 테스팅 할 수 있다. 원하는 컴포넌트를 렌더링 한 후 테스트 요소를 수행하면 된다.
```tsx
import { render, screen } from '@testing-library/react'
import StaticComponent from './index'
beforeEach(() => { 
render(<StaticComponent />)
})

describe('링크 확인', () => {
    it('링크가 3개 존재한다.', () => {
        const ul = screen.getByTestId('ul')
        expect(ul.children.length).toBe(3)
    })})
```
- beforeEach: 테스트 수행 전 컴포넌트를 렌더링 한다.
- describe: 비슷한 속성을 가지느 테스트를 하나의 그룹으로 묶는다. 테스트 해야할 코드가 많을 때 사용한다.
- it: test의 축약어다. 가독성을 높이기 위해 문어체 같이 표현한다.
- testId: 웹에서 사용하는querySelector([data-testid="${yourId}"])와 동일한 역할을 한다
#### 2. 동적 컴포넌트
일반적으로 리엑트 테스팅 라이브러리(`RTL`)와 `jest`를 조합해 사용한다.
##### 1. useState
`fireEvent`를 사용해 이벤트 테스트를 진행한다.
```jsx
import { useState } from "react";

const AdminPanel = () => <div>Admin Panel</div>;
const UserPanel = () => <div>User Panel</div>;

export default function DynamicComponent() {
    const [isAdmin, setIsAdmin] = useState(false);

    return (
        <div>
            <button onClick={() => setIsAdmin(!isAdmin)}>
                {isAdmin ? "Switch to User" : "Switch to Admin"}
            </button>
            {isAdmin ? <AdminPanel /> : <UserPanel />}
        </div>
    );
}
```
````jsx
import { render, screen, fireEvent } from "@testing-library/react";
import DynamicComponent from "./DynamicComponent";

test("초기에 User Panel이 렌더링되어야 한다", () => {
  render(<DynamicComponent />);
  expect(screen.getByText("User Panel")).toBeInTheDocument();
});

test("버튼 클릭 시 Admin Panel로 변경되어야 한다", () => {
  render(<DynamicComponent />);
  
  // 버튼 가져오기
  const button = screen.getByRole("button", { name: "Switch to Admin" });

  // 버튼 클릭
  fireEvent.click(button);

  // Admin Panel이 나타나는지 확인
  expect(screen.getByText("Admin Panel")).toBeInTheDocument();
});
````
##### 2. useEffect
`waitFor()`를 사용해 비동기 상태 변경을 감지한다.
```jsx
import { useState, useEffect } from "react";

export default function AsyncComponent() {
  const [data, setData] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      setData("Loaded Data");
    }, 1000);
  }, []);

  return <div>{data ? data : "Loading..."}</div>;
}
```
```tsx
import { render, screen, waitFor } from "@testing-library/react";
import AsyncComponent from "./AsyncComponent";

test("비동기 데이터가 로드되면 컴포넌트가 변경되어야 한다", async () => {
  render(<AsyncComponent />);

  // 초기 "Loading..." 문구 확인
  expect(screen.getByText("Loading...")).toBeInTheDocument();

  // 데이터가 로드될 때까지 기다린 후 확인
  await waitFor(() => expect(screen.getByText("Loaded Data")).toBeInTheDocument());
});
```
### 4. 테스트를 작성하기에 앞서 고려해야 할 점
애플리케이션에서 가장 취약하거나 중요한 부분을 파악하는 것이 중요하다. 소프트웨어가 얼마나 테스트 되었는지 나타내는 커버리지라는 지표가 있으며 수치가 높을수록 좋다. 하지만 테스트 주도 개발 방법론을 차용하더라도 모든 상황을 커버할 수 없기 때문에 QA에 의존해 개발속도를 높이기도 한다.

### 5. 그 밖에 해볼 만한 여러 가지 테스트
- 유닛 테스트: 개별 컴포넌트가 독립적으로 의도한 대로 작동하는지 검증한다.
- 통합 테스트: 여러 유닛을 조합하여 하나의 기능이 정상적으로 동작하는지 확인한다.
- 엔드 투 엔드(E2E) 테스트: 실제 사용자처럼 애플리케이션을 사용하며 전체적인 기능을 검증한다.
## 작성하며 느낀 점
좋았던 점: 관심 있었던 테스트 기능에 대해 알아보게 되었다.  
배운 점: ESLint와 테스트 도구에 대해 배웠다.  
아쉬운 점: 실무에서 테스트 도구를 사용한 경험이 있는지 질문을 받은 적이 있었는데 관련 지식이 부족해 제대로 대답하지 못했었던 기억이 난다. 어떤 식으로 사용하는지 더 알아볼 계획이다.  
향후 계획: 리액트 개발 도구를 활용하여 개발 및 배포 환경을 구축하는 방법을 배울 계획이다.