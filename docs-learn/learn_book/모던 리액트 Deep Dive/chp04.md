---
sidebar_position: 4
title: "4장: 서버 사이드 렌더링"
description: 서버 사이드 렌더링
authors: [MtypEyuc]
tags: [React]
hide_table_of_contents: false
---

## 1. 서버 사이드 렌더링이란?
### 1. 싱글 페이지 애플리케이션의 세상
서버에서 모든 데이터를 불러오고 `history.pushState`와 `history.replaceState`를 사용해 페이지를 작업한다. 서버의 부담을 사용자가 나눠 가지기 때문에 속도가 빠르지만 초기 로딩에 시간이 걸린다.
### 2. 서버 사이드 렌더링이란?
클라이언트 요청시 서버에서 `HTML` 파일을 미리 렌더링한 후 전달하는 방식이다.
#### 1. 장점
- 최초 페이지 진입이 빠르다.
- 검색 엔진과 SNS 공유 등 메타데이터 제공이 쉽다.
- 누적 레이아웃 이동이 적다.
- 사용자 디바이스 성능에 비교적 자유롭다.
- 보안에 좀 더 안전하다.
#### 2. 단점 
- 소스코드를 작성할 때 항상 서버를 고려해야 한다.
- 적절한 서버가 구축돼 있어야 한다.
- 서버에서 렌더링을 완료해야 화면을 출력하기 때문에 서비스가 지연될 수 있다.
### 3. SPA와 SSR을 모두 알아야 하는 이유
#### 1. 서버 사이드 렌더링 역시 만능이 아니다.
우선순위와 목적에 따라 효율적인 사용법을 익힐 필요가 있다.
#### 2. 싱글 페이지 애플리케이션과 서버 사이드 렌더링 애플리케이션
- 가장 뛰어난 싱글 페이지 애플리케이션은 가장 뛰어난 멀티 페이지 애플리케이션보다 낫다.
- 평균적인 싱글 페이지 애플리케이션은 평균적인 멀티 페이지 애플리케이션보다 느리다.
#### 3. 현대의 서버 사이드 렌더링
서버 사이드 렌더링 프레임워크를 사용해 싱글 페이지 애플리케이션과 유사한 사용자 경험을 제공한다.
## 2. 서버 사이드 렌더링을 위한 리액트 API 살펴보기
### 1. renderToString
리액트 컴포넌트를 `HTML` 문자열로 변환하여 서버 측 렌더링을 가능하게 만든다.
```javascript
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import MyComponent from './MyComponent';

const html = ReactDOMServer.renderToString(<MyComponent />);
```
훅과 이벤트 함수를 클라이언트에서 처리하는 형식으로 사용된다.
### 2. renderToStaticMarkup
리액트 컴포넌트를 `HTML` 문자열로 변환하여 서버 측 렌더링을 가능하게 만든다. 리액트 기능을 포함하지 않은 순수 `HTML` 형식으로 변환해 정적인 페이지를 만든다. 블로그 글이나 상품의 약관 등의 페이지를 제작할 때 사용된다.
### 3. renderToNodeStream
`HTML`을 조각 형식으로 서버에 보내 초기 속도를 높인다. 
### 4. renderToStaticNodeStream
`renderToNodeStream` 사용시 순수 `HTML`을 반환해야할 때 사용된다.
### 5. hydrate
렌더링 된 `HTML` 결과물에 자바스크립트 헨들러나 이벤트를 붙이는 역할을 수행한다.
## 3. Next.js 톺아보기

### 2. Next.js 시작하기
`next.config.js`, `pages/_app.tsx`, `pages/_document.tsx`, `pages/_error.tsx`, `pages/404.tsx`, `pages/500.tsx`, `pages/index.tsx` 등을 조작해 보여주고 싶은 페이지를 정의할 수 있다.
### 3. Data Fetching
#### 1. getStaticProps
빌드 시에 데이터를 가져와 정적인 페이지를 만든다. 
```tsx
// pages/index.tsx
export async function getStaticProps() {
  const res = await fetch('https://api.example.com/data');
  const data = await res.json();

  return {
    props: {
      data, 
    },
  };
}

function HomePage({ data }) {
  return (
    <div>
      <h1>Static Site Generation Example</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}

export default HomePage;
```
#### 2. getServerSideProps
요청 마다 페이지를 서버에서 렌더링 한다. 실시간 데이터를 가져오는 데 사용된다.
```tsx
// pages/index.tsx
export async function getServerSideProps() {
  const res = await fetch('https://api.example.com/data');
  const data = await res.json();

  return {
    props: {
      data, 
    },
  };
}

function HomePage({ data }) {
  return (
    <div>
      <h1>Server Side Rendering Example</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}

export default HomePage;
```
#### 3. 클라이언트 사이드 
동적으로 데이터를 받아오는 가장 많이 사용되는 방법이다.
```tsx
import { useEffect, useState } from 'react';

function HomePage() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('https://api.example.com/data');
      const data = await res.json();
      setData(data);
    };
    fetchData();
  }, []);

  return (
    <div>
      <h1>Client-Side Data Fetching Example</h1>
      {data ? <pre>{JSON.stringify(data, null, 2)}</pre> : <p>Loading...</p>}
    </div>
  );
}

export default HomePage;
```
### 4. 스타일 적용하기
#### 1. 전역 스타일
애플리케이션 전체에 공통으로 적용하고 싶은 스타일이 있다면 `_app.tsx`에 필요한 스타일을 직접 `import`로 불러오면 애플리케이션 전체에 영향을 미칠 수 있다
```tsx
import type { AppProps } from 'next/app'
// 적용하고 싶은 글로벌 스타일
import '../styles.css'
// 혹은 node_modules에서 바로 꺼내올 수도 있다.
import 'normalize.css/normalize.css'
export default function MyApp({ Component, pageProps }: AppProps) {
return <Component {...pageProps} />
}
```
#### 2. 컴포넌트 레벨 CSS
`[name].module.css` 와 같은 명명 규칙만 준수하면 되며, 이 컴포넌트 레벨 `CSS`는 다른 컴포넌트의 클래스명과 겹쳐서 스타일에 충돌이 일어나지 않도록 고유한 클래스명을 제공한다
```css
.button {
  background-color: #0070f3;
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.button:hover {
  background-color: #005bb5;
}
```
```tsx
import styles from './Button.module.css'; // CSS 모듈 임포트

const Button = () => {
  return (
    <button className={styles.button}>Click Me</button>
  );
};

export default Button;
```
## 작성하고 느낀 점
좋았던 점: 과거 SSR의 단점을 보완하기 위한 SPA의 단점을 보완하기 위한 현대 SSR 까지의 발전 과정이 재미있었다.

배운 점: 서버 사이드 렌더링의 특징과 NEXT.js의 사용법을 배웠다.

아쉬운 점: 실무 위주의 설명보단 개념 위주의 정리인 내용이다.

향후 계획: 리액트 상태 관리 라이브러리의 필요성과 작동 방식을 배울 것이다.
