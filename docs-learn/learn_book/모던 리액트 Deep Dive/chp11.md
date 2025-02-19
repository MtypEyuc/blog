---
sidebar_position: 11
title: "11장 Next.js 13과 리액트 18"
description: Next.js 13과 리액트 18
authors: [MtypEyuc]
tags: [React]
hide_table_of_contents: false
---

## 1. app 디렉터리의 등장
12 버전 까지 페이지 공통 레이아웃을 유지하기 위한 작업은 _app에서 밖에 할 수 없었다. 그로 인해 각 페이지 별로 다른 레이아웃을 적용할 수가 없었고, 제한적인 환경의 한계를 극복하기 위해 app 레이아웃을 개발했다.
### 1. 12 버전 까지의 기능
- _document: 페이지에서 쓰이는 `<html>`과 `<body>` 태그를 수정하거나, 서버 사이드 렌더링 시 styled-components 같은 일부 CSS-in-JS를 지원하기 위한 코드를 삽입하는 제한적인 용도로 사용된다. 오직 서버에서만 작동하므로 onClick 같은 이벤트 핸들러를 붙이거나 클라이언트 로직을 붙이는 것을 금지하고 있다.


- _app: 페이지를 초기화하기 위한 용도로 사용되며, 다음과 같은 작업이 가능하다고 명시돼 있다.

    - 페이지 변경 시에 유지하고 싶은 레이아웃
    - 페이지 변경 시 상태 유지
    - ComponentDidCatch를 활용한 에러 핸들링
    - 페이지간 추가적인 데이터 삽입
    - global CSS 주입
    
### 2. 라우팅
`/pages`로 정의하던 라우팅 방식이 `/app` 디렉터리로 이동했다.
#### 1. 라우팅을 정의하는 법
- Next.js 12 이하: /pages/a/b.tsx 또는 /pages/a/b/index.tsx는 모두 동일한 주소로 변환된다. 즉, 파일명이index라
  면 이 내용은 무시된다.
- Next.js 13 app: /app/a/b는 /a/b로 변환되며, 파일명은 무시된다. 폴더명까지만 주소로 변환된다.
#### 2. layout.js
페이지의 기본적인 레이아웃을 구성하는 요소다. 해당 폴더에 layout이 있다면 그 하위 폴더 및 주소에 모두 영향을 미친다.
```tsx
// app/layout.tsx
import { ReactNode } from 'react'
export default function AppLayout({ children }: { children: ReactNode }) {
return (
<html lang="ko">
<head>
<title>안녕하세요!</title>
</head>
<body>
<h1>웹페이지에 오신 것을 환영합니다.</h1>
<main>{children}</main>
</body>
</html>
)
}
// app/blog/layout.tsx
import { ReactNode } from 'react'
export default function BlogLayout({ children }: { children: ReactNode }) {
    return <section>{children}</section>
}
```
- 공통 UI를 포함할 수 있으며, 공통 코드는 자신과 자식 라우팅에만 미치게 된다. 하위 페이지에 추가된 레이아웃은 해당 주소 하위에만 적용된다.
##### 주의할 점

- layout은 app 디렉터리 내부에서는 예약어다. 무조건 layout.{js|jsx|ts|tsx}로 사용해야 하며, 레이아웃 이외의 다른 목적으로는 사용할 수 없다.


- layout은 children을 props로 받아서 렌더링해야 한다. 레이아웃이므로 당연히 그려야 할 컴포넌트를 외부에서 주입받고 그려야 한다.


- layout 내부에는 반드시 export default로 내보내는 컴포넌트가 있어야 한다.


- layout 내부에서도 API 요청과 같은 비동기 작업을 수행할 수 있다. 

#### 3. page.js 
layout을 기반으로 리액트 컴포넌트를 노출한다. 앱 디렉토리 구조에서 URL 경로에 해당하는 페이지를 정의한다.
```jsx
// app/page.js
'use client'; 

import { useState } from 'react';

export default function Home() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h1>Welcome to Next.js 13!</h1>
      <p>Counter: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
```
##### 주의할 점
- 일반적으로 별도의 속성값을 받지 않고 라우팅 시 `[...id]`와 같은 파라미터 값이 들어온다.


- app 디렉터리 내부의 예약어다. 무조건 page.{js|jsx|ts|tsx}로 사용해야 하며, 레이아웃 이외의 다른 목적으로는 사용할 수 없다.


- 내부에서 반드시 export default로 내보내는 컴포넌트가 있어야 한다.

#### 4. error.js
기본적으로 error와 resrt 프로퍼티를 받을 수 있다. 해당 디렉토리 내에 error.js를 배치하면 레이아웃이나 페이지 수준에서 에러 처리를 할 수 있다. 

#### 4. not-found.js
404 페이지를 렌더링한다. 
#### 5.  loading.js
```jsx
// app/loading.js

export default function Loading() {
  return (
    <div className="loading-container">
      <div className="spinner">Loading...</div>
    </div>
  );
}
```
- Suspense를 기반으로 해당 컴포넌트가 불러오는 중임을 나타낼 때 사용한다.

#### 6.  route.js
라우팅을 처리하는 파일이 아니며, 라우터 관련 로직을 구현하거나 API 라우트를 처리하는 데 사용한다.
```ts
// /api/hello/route.ts
import { NextRequest } from 'next/server'
export async function GET(request: Request) {}
export async function HEAD(request: Request) {}
export async function POST(request: Request) {}
export async function PUT(request: Request) {}
export async function DELETE(request: Request) {}
export async function PATCH(request: Request) {}
export async function OPTIONS(request: Request) {}
```
```tsx
// apps/internal-api/hello/route.ts
import { NextRequest } from 'next/server'
export async function GET(request: NextRequest) {
return new Response(JSON.stringify({ name: 'hello' }), {
status: 200,
headers: {
'content-type': 'application/json',
},
})
}
```
## 2. 리액트 서버 컴포넌트
### 1. 기존 리액트 컴포넌트와 서버 사이드 렌더링의 한계
- 클라이언트 측에서 필요한 라이브러리와 컴포넌트를 모두 다운로드 해야 한다.


- 백엔드 데이터를 REST API를 통해 요청해야 한다.


- `lazy`로 코드 분할 수행 시 개발자의 실수 여지가 있다.


- 연쇄적으로 발생하는 클라이언트와 서버의 요청을 대응하기 어렵다.


- 리액트는 클라이언트에서 자바스크립트를 통해 복잡한 추상화를 다룰 수 있지만, 이로 인해 코드가 많아지고 런타임에서 오버헤드가 발생한다.
### 2. 서버 컴포넌트란?
- 하나의 언어, 하나의 프레임워크, 그리고 하나의 API와 개념을 사용하면서 서버와 클라이언트 모두에서 컴포넌트를 렌더링할 수 있는 기법을 의미한다. 


- 서버에서 할 수 있는 일은 서버가 처리하게 두고, 서버가 할 수 없는 나머지 작업은 클라이언트인 브라우저에서 수행된다. 


- 모든 컴포넌트는 서버 컴포넌트가 될 수도 있고 클라이언트 컴포넌트가 될 수도 있다. 
#### 1. 서버 컴포넌트
요청이 온 순간 서버에서만 단 한 번 실행되며, 상태관리나 생명주기 훅을 사용할 수 없다. 서버 데이터를 `async/await`로 처리하고 컴포넌트가 비동기적으로 실행된다.
#### 2. 클라이언트 컴포넌트
브라우저 환경에서만 실행되므로 서버 컴포넌트를 불러오거나, 서버 전용 훅이나 유틸리티를 불러올 수 없다. 서버에서 생성된 트리를 컴포넌트에 삽입해 중첩할 수 있으며 그 외에는 리액트 컴포넌트와 동일하다. 
#### 3. 공용 컴포넌트(shared components)
이 컴포넌트는 서버와 클라이언트 모두에서 사용할 수 있다. 공통으로 사용할 수 있는 만큼, 당연히 서버컴포넌트와 클라이언트 컴포넌트의 모든 제약을 받는 컴포넌트가 된다.
### 3. 서버 사이드 렌더링과 서버 컴포넌트의 차이
SSR에서 HTML을 빠르게 전달하고 하이드레이션을 통해 인터렉션을 처리하고, 서버 컴포넌트는 렌더링 된 컴포넌트를 전달해 클라이언트 비용을 최소화 시켜 성능을 향상 시킬 수 있는 상호보완적 관계이기 때문에 향후 결합될 가능성이 있다.
### 4. 서버 컴포넌트는 어떻게 작동하는가?
- 서버에서 렌더링 요청을 처리


- 컴포넌트를 JSON으로 직렬화


- 클라이언트에서 JSON을 역직렬화하고 트리 구성


- 스트리밍으로 컴포넌트 전달


- 지연 로딩 및 번들링 분리


## 3. Next.js에서의 리액트 서버 컴포넌트
### 1.  fetch 도입
getServerSideProps, getStaticProps, getInitialProps가 삭제되고 모든 데이터 요청은 웹에서 제공하는 [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)를 기반으로 이뤄진다.
```jsx
async function getData() {
  const url = "https://example.org/products.json";
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();
    console.log(json);
  } catch (error) {
    console.error(error.message);
  }
}
```
### 2. 정적 렌더링과 동적 렌더링
정적인 라우팅에 대해서는 기본적으로 빌드 타임에 렌더링을 미리 해두고 캐싱해 재사용할 수 있게끔 해뒀고, 동적인 라우팅에 대해서는 서버에 매번 요청이 올 때마다 컴포넌트를 렌더링하도록 변경했다.
```tsx
// app/page.tsx
async function fetchData() {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts');
  const data = await res.json();
  return data;
}

export default async function Page() {
  const data: Array<any> = await fetchData();
  return (
    <ul>
      {data.map((item, key) => (
        <li key={key}>{item.id}</li>
      ))}
    </ul>
  );
}
```
- 정적으로 결정된 주소를 통해 데이터를 가져오고 렌더링한 결과를 빌드에 넣어둔다.
```tsx
async function fetchData() {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts', {
    cache: 'no-cache', // 캐싱을 비활성화하여 매번 요청 시 데이터를 새로 가져오도록 설정
  });
  const data = await res.json();
  return data;
}

export default async function Page() {
  const data: Array<any> = await fetchData();
  return (
    <ul>
      {data.map((item, key) => (
        <li key={key}>{item.id}</li>
      ))}
    </ul>
  );
}
```
- cache: 'no-cache' 옵션을 사용해 메번 서버에서 데이터를 가져오도록 설정한다. 페이지가 동적으로 개선되어야 할 때 유용하다.
### 3. 캐시와 mutating, 그리고 revalidating
Next.js는 fetch의 기본 작동을 재정의해` {next: {revalidate?: number | false}}`를 제공하는데, 시간을 두고 렌더링 하는 것이 가능하다. 캐시된 초기 요청은 `revalidate`에 선언된 값만큼 유지된다.  `router.refresh();` 를 사용하면 캐시를 무효화 한다.
### 4. 스트리밍을 활용한 점진적인 페이지 불러오기
렌더링이 끝나야 화면을 출력하는 과거 SSR 방식의 한계를 극복하기 위해 쪼개진 HTML을 점진적으로 보내는 스트리밍 기능을 활용할 수 있다.
#### 1. 경로에 loading.tsx 배치
```tsx
<Layout>
<Header />
<SideNav />
<!-- 여기에 로딩이 온다. -->
<Suspense fallback={<Loading />}>
<Page />
</Suspense>
</Layout>
```
- 렌더링이 완료되기 전에 보여줄 수 있는 컴포넌트를 배치한다. 자동으로 Suspense가 배치된다.
#### 2. Suspense 배치 
```tsx
export default function Posts() {
return (
<section>
<Suspense fallback={<Skeleton />}>
<Notes />
</Suspense>
<Suspense fallback={<Skeleton />}>
<Peoples />
</Suspense>
</section>
)
}
```
- 세분화된 작업을 위해 직접 배치하는 것도 가능하다.
## 4. 서버 액션(alpha)
API를 생성하지 않더라도 함수 수준에서 서버에 직접 접근해 데이터 요청 등을 수행할 수 있는 실험 기능이다.
### 1. form의 action
```tsx
// app/page.tsx

export default function Page() {
    // 서버 액션
    async function handleSubmit() {
        'use server'
        console.log('해당 작업은 서버에서 수행합니다. 따라서 CORS 이슈가 없습니다.')

        // 서버에서 API 호출
        const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            body: JSON.stringify({
                title: 'foo',
                body: 'bar',
                userId: 1,
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        });

        const result = await response.json();
        console.log(result);
    }

    return (
        <form action={handleSubmit}>
            <button type="submit">form 요청 보내보기</button>
        </form>
    );
}
```
서버에서 실행되는 액션을 만들어 서버가 함수를 실행시키게 만든다. 서버에서 실행되기 때문에 CROS 문제를 피할 수 있다.
### 2. input의 submit과 image의 formAction
위와 마찬가지로 `input type="submit"` 또는 `input type="image"` 옵션을 추가할 수 있다. 
### 3. startTransition과의 연동
이전과 동일한 로직을 구현하면서도 page 단위의 loading.jsx를 사용하지 않아도 된다는 장점이 있다.
```tsx
'use server'
import kv from '@vercel/kv'
import { revalidatePath } from 'next/cache'
export async function updateData(
id: string,
data: { name: string; age: number },
) {
const key = `test:${id}`
await kv.set(key, {
name: data.name,
age: data.age,
})
revalidatePath(`/server-action/form/${id}`)
}
// client-component.tsx
'use client'
import { useCallback, useTransition } from 'react'
import { updateData } from '../../server-action'
import { SkeletonBtn } from '../../app/styles/styled-components/components'
export function ClientButtonComponent({ id }: { id: string }) {
const [isPending, startTransition] = useTransition()
    const handleClick = useCallback(() => {
        startTransition(() => updateData(id, { name: '기본값', age: 0 }))
    }, [])
    return isPending ? (
        <SkeletonBtn />
    ) : (
        <button onClick={handleClick}>기본값으로 돌리기</button>
    )
}
```
- 서버 액션이 실행됐을 때 해당 버튼을 숨기고 로딩 버튼을 노출함으로써 페이지 단위의 로딩이 아닌 좀 더 컴포넌트 단위의 로딩 처리도 가능해진다. 
### 4. server mutation이 없는 작업
server mutation이 필요하다면 반드시 서버 액션을 useTransition과 함께 사용해야 하지만 별도의 server mutation을 실행하지 않는다면 바로 이벤트 핸들러에 넣어도 된다.
```tsx
export default function Page() {
async function handleClick() {
'use server'
// server mutation이 필요 없는 작업
}
return <button onClick={handleClick}>form 요청 보내보기</button>
}
```
### 5. 서버 액션 사용 시 주의할 점
- 서버 액션은 클라이언트 컴포넌트 내에서 정의될 수 없다.
- 서버 액션을 import하는 것뿐만 아니라, props 형태로 서버 액션을 클라이언트 컴포넌트에 넘기는 것 또한 가능하다. 이
  는 서버 컴포넌트가 클라이언트 컴포넌트를 불러올 수 있는 것과 동일한 원리다. 즉 서버에서만 실행될 수 있는 자원은 반
  드시 파일 단위로 분리해야 한다.

## 작성하고 느낀 점
좋았던 점: 13버전의 주요 기능과 렌더링 방법에 대한 기술을 배울 수 있었다.


배운 점: 12 버전과 13 버전의 차이점과 서버 컴포넌트의 개념, Fetch API 등을 배웠다.


아쉬운 점: 불필요한 내용이 섞여있어 설명과 예제 내용을 혼동하는 느낌을  받게 된다. 핵심 내용을 알기 위해 여러 문단을 건너 뛰며 예제와 비교해야 했다.


향후 계획: 웹 페이지를 만드는 방법에 대해 배웠고 이후 성능을 향상시키기 위한 방법에 대해 배울 것이다.