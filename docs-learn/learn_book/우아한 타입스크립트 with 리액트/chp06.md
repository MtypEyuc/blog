---
sidebar_position: 6
title: "7장 비동기 호출"
description: 비동기 호출
authors: [MtypEyuc]
tags: [typescript]
image: https://i.imgur.com/mErPwqL.png
hide_table_of_contents: false
---

## 1. API 요청
리액트의 `fetch` 라이브러리를 이용해 데이터를 호출할 수 있지만 간결한 작성이 가능한 `Axios` 라이브러리를 주로 사용한다.
### 1. Axios 활용하기
- `apiRequester`를 사용해 서로 다른 API Entry 관리
```typescript
import apiRequester from "./apiRequester";

async function fetchPosts() {
    try {
        const response = await apiRequester.get("/posts");
        console.log(response.data);
    } catch (error) {
        console.error("API 요청 실패:", error);
    }
}

async function createPost() {
    try {
        const response = await apiRequester.post("/posts", {
            title: "New Post",
            body: "This is a new post",
            userId: 1
        });
        console.log("생성된 데이터:", response.data);
    } catch (error) {
        console.error("API 요청 실패:", error);
    }
}

fetchPosts();
createPost();
```
### 2. Axios 인터셉터 사용하기
특정 요청 방식에서 조건문을 주어 처리할 수 있다.
```typescript
import axios from "axios";

const apiRequester = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
  timeout: 5000,
  headers: { "Content-Type": "application/json" }
});

apiRequester.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


apiRequester.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    console.error("API 요청 실패:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default apiRequester;
```
### 3. 빌더 패턴
코드가 복잡한 경우 객체 생성 과정을 단순화 하여 가독성을 높일 수 있다. 필요한 설정값을 추가하거나 상황에 맞게 사용할 수 있지만 기본 요청 함수가 반복적으로 사용될 수 있디.
```typescript
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

class APIBuilder {
  private url!: string;
  private method: "get" | "post" | "put" | "delete" = "get";
  private headers: Record<string, string> = {};
  private params: Record<string, any> = {};
  private data: any = null;

  setUrl(url: string) {
    this.url = url;
    return this; // 메서드 체이닝
  }

  setMethod(method: "get" | "post" | "put" | "delete") {
    this.method = method;
    return this;
  }

  setHeaders(headers: Record<string, string>) {
    this.headers = headers;
    return this;
  }

  setParams(params: Record<string, any>) {
    this.params = params;
    return this;
  }

  setBody(data: any) {
    this.data = data;
    return this;
  }

  async send<T = any>(): Promise<AxiosResponse<T>> {
    const config: AxiosRequestConfig = {
      url: this.url,
      method: this.method,
      headers: this.headers,
      params: this.params,
      data: this.data,
    };

    return axios(config);
  }
}

async function fetchData() {
  try {
    const response = await new APIBuilder()
      .setUrl("https://jsonplaceholder.typicode.com/posts")
      .setMethod("get")
      .setHeaders({ "Content-Type": "application/json" })
      .send();

    console.log("Response Data:", response.data);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

fetchData();
```
### 4. API 응답 타입 지정하기
같은 서버에서 오는 응당 형태는 대체로 통일된 형태이기 때문에 하나의 `Response` 타입으로 묶을 수 있다.
```typescript
interface Response<T> {
    data: T;
    status: string;  
    serverDateTime: string;  
    errorCode?: string;  
    errorMessage?: string;  
}

interface FetchCartResponse {
    cartItems: CartItem[];
}

interface PostCartRequest {
    itemId: number;
    quantity: number;
}

interface PostCartResponse {
    cartItems: CartItem[];
}

const fetchCart = (): AxiosPromise<Response<FetchCartResponse>> =>
    apiRequester.get<Response<FetchCartResponse>>("cart");

const postCart = (postCartRequest: PostCartRequest): AxiosPromise<Response<PostCartResponse>> =>
    apiRequester.post<Response<PostCartResponse>>("cart", postCartRequest);
```
- `UPDATE`나 `CREATE`같이 응답이 없을 수 있는 `API`를 관리해야 한다.
```typescript
const updateCart = (updateCartRequest: any): AxiosPromise<Response<unknown>> =>
    apiRequester.put<Response<unknown>>("cart", updateCartRequest);
```
- `Response` 타입은 `apiRequester`가 모르게 관리되어야 한다. 요청 처리 로직이 구현체와 별개로 독립적으로 관리되어야 한다는 뜻이다. 알 수 없는 데이터를 사용할 땐 `unknown` 타입을 사용해 관리한다.
```typescript
interface Response {
  data: {
    cartItems: CartItem[];
    forPass: unknown;  // 알 수 없는 값
  };
}

// `forPass`의 값을 사용할 때 타입을 확인하여 사용해야 안전함
type ForPass = {
  type: "A" | "B" | "C";
};

const isTargetValue = (data: Response["data"]) => {
  const forPass = data.forPass as ForPass;  
  return forPass.type === "A";
};

// `forPass`가 어떤 타입인지는 알 수 없지만, 사용할 때 타입 검사를 통해 안전하게 처리
```
### 5. View Model 사용하기
- 사용 전: 데이터를 변환하지 않고 그대로 가져와 API 데이터가 변경되면 문제가 생길 수 있다.
```typescript
interface ListResponse {
  items: ListItem[];
}

const fetchList = async (filter?: ListFetchFilter): Promise<ListResponse> => {
  const { data } = await apiRequester
    .params({ ...filter })
    .get('/apis/get-list-summaries')
    .call<Response<ListResponse>>();

  return { data };
};
```
- 사용 후: 데이터 변경이 일어나더라도 재가공을 통해 사용이 가능하다. 요청에 따른 타입 관리가 필요하기 때문에 `API`가 많아질수록 복잡도가 증가한다.
```typescript
interface JobListItemResponse {
  name: string;
}

interface JobListResponse {
  jobItems: JobListItemResponse[];
}

class JobList {
  readonly totalItemCount: number;
  readonly items: JobListItemResponse[];

  constructor({ jobItems }: JobListResponse) {
    this.totalItemCount = jobItems.length;
    this.items = jobItems;
  }
}

const fetchJobList = async (
  filter?: ListFetchFilter
): Promise<JobListResponse> => {
  const { data } = await apiRequester
    .params({ ...filter })
    .get('/apis/get-list-summaries')
    .call<Response<JobListResponse>>();

  return new JobList(data);
};
```
### 6. Superstruct 활용하기
서버에서 받아온 데이터가 예상한 형식과 맞는지 데이터 유효성을 검사하는 도구이다.
```typescript
import { assert } from 'superstruct';

interface ListItem {
    id: string;
    content: string;
}

interface ListResponse {
    items: ListItem[];
}
const fetchList = async (filter?: ListFetchFilter): Promise<ListResponse> => {
    const { data } = await api
        .params({ ...filter })
        .get("/apis/get-list-summaries")
.call<Response<ListResponse>>();
    return { data };
};
//배열 목록을 가져와 검증
function isListItem(listItems: ListItem[]) {
    listItems.forEach((listItem) => assert(listItem, ListItem));
}
```
## 2. API 상태 관리하기
### 1. 상태 관리 라이브러리에서 호출하기
전역 상태 관리 라이브러리에서 비동기 `API`의 호출 상태를 관리하고 데이터 변화를 추적할 수 있다.
- `redux`: 미들웨어를 사용해 예측 가능한 방식으로 데이터를 엄격하고 일관성 있게 관리할 수 있다. `API`가 많아지면 그만큼 상태 관리 함수도 늘어나는 단점이 있다.
- `MobX`: 복잡한 `redux`의 단점을 보완하기 위해 직관적이고 유연한 방식으로 데이터를 관리한다. 여러 개의 컴포넌트 참조시 불필요한 리렌더링이 발생할 수 있다.
### 2. 훅으로 호출하기
사용이 간단하고 직관적이며 외부 의존성이 낮다. 하지만 중복 코드가 많아지고, 데이터를 전역으로 관리해야 할 때 그 과정이 더욱 복잡해진다.
## 3. API 에러 핸들링
### 1. 에러 바운더리
자식 컴포넌트에서 발생한 오류를 처리할 수 있는 고차 컴포넌트다. 애플리케이션 전체가 다운되지 않고 오류 메세지를 표시할 수 있다. 
```tsx
import React, { useState, useEffect } from 'react';

function useErrorBoundary() {
    const [hasError, setHasError] = useState(false);

    const catchError = (error: Error) => {
        setHasError(true);
        console.error(error);
    };

    return {
        hasError,
        catchError,
    };
}

// 함수형 컴포넌트에서 사용하기
const ErrorBoundaryWithHook = ({ children }: { children: React.ReactNode }) => {
    const { hasError, catchError } = useErrorBoundary();

    useEffect(() => {
        const handleError = (event: any) => {
            if (event.error) {
                catchError(event.error);
            }
        };
        window.addEventListener('error', handleError);
        return () => window.removeEventListener('error', handleError);
    }, []);

    if (hasError) {
        return <div>Something went wrong.</div>;
    }

    return <>{children}</>;
};

// 에러 발생 컴포넌트
const ProblematicComponent = () => {
    throw new Error('Error in ProblematicComponent!');
    return <div>This will not render.</div>;
};


const App = () => {
    return (
        <div>
            <h1>App with Error Boundary using Hooks</h1>
            <ErrorBoundaryWithHook>
                <ProblematicComponent />
            </ErrorBoundaryWithHook>
        </div>
    );
};

export default App;
```
### 2. react-query
`useQuery`와 같은 훅을 통해 `API` 요청을 하고, `data, isLoading, isError, error, isSuccess, isFetching, status, refetch` 등의 상태값을 반환한다.
[(useQuery)](https://tanstack.com/query/latest/docs/framework/react/reference/useQuery)
```tsx
import { useQuery } from 'react-query';

// API 호출 함수
const fetchData = async () => {
  const response = await fetch('/api/data');
  if (!response.ok) {
    throw new Error('API 요청 실패');
  }
  return response.json();
};

const MyComponent = () => {
  const { data, isLoading, isError, error, isSuccess } = useQuery('data', fetchData);

  // 로딩 중일 때
  if (isLoading) return <div>로딩 중...</div>;

  // 에러가 발생한 경우
  if (isError) return <div>에러 발생: {error.message}</div>;

  // 요청이 성공했을 때
  if (isSuccess) return <div>성공적으로 데이터를 가져왔습니다: {JSON.stringify(data)}</div>;

  return null;
};
```
## 4. API 모킹
테스트 데이터를 호출해 각종 시나리오에 따른 테스트를 진행한다.
### 1. JSON 파일 
```typescript
import axios from 'axios';

const fetchData = async () => {
  try {
    const response = await axios.get('/api/data'); 
    console.log('Fetched data:', response.data); 
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

fetchData();
```
### 2. NextApiHandler
파일 경로로 요청 가능하고 파일을 불러오는 중간 과정에서 응답 처리 로직을 추가할 수 있다.
```typescript
// api/mock/brand
import { NextApiHandler } from "next";

const BRANDS: Brand[] = [
 {
  id: 1,
  label: "배민스토어",
 },
 {
  id: 2,
  label: "비마트",
 },
];

const handler: NextApiHandler = (req, res) => {

 res.json(BRANDS);
};

export default handler;
```
```typescript
const fetchBrands = async () => {
  const response = await fetch("/api/mock/brand");
  const data = await response.json();
  console.log(data);
};

fetchBrands();
```
### 3. API 요청 핸들러에 분기 추가
필요한 경우에만 API 요청을 하게 만드는 조건문을 추가하는 방식.
### 4. axios-mock-adapter로 모킹
요청 함수에 분기를 추가하지 않고 만들 수 있다. 시나리오에 따른 처리가 가능하다.
```typescript
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

// 1️⃣ Axios 인스턴스 생성
const api = axios.create({
  baseURL: "https://api.example.com",
});

// 2️⃣ axios-mock-adapter 인스턴스 생성
const mock = new MockAdapter(api);

// 3️⃣ GET 요청을 가짜 데이터로 응답
mock.onGet("/users").reply(200, {
  users: [{ id: 1, name: "John Doe" }],
});

// 4️⃣ 실제 API 호출 (하지만 mock 데이터가 반환됨)
api.get("/users").then((response) => {
  console.log(response.data);
});
```
### 5. 목업 사용 여부 제어
지정 서버 환경에서 요청을 가로채는 방식으로 테스트 한다. 
```typescript
const isDev = process.env.NODE_ENV === "development";

if (isDev) {
  const mock = new MockAdapter(api);

  mock.onGet("/products").reply(200, {
    products: [{ id: 101, name: "테스트 상품" }],
  });

  console.log("✅ 개발 모드에서 Mock API 활성화");
}
```

## 작성하고 느낀 점

좋았던 점: 가장 관심있는 파트를 배울 수 있어 좋았다. 개발 환경을 빠르게 익혀야 할 때 언어 - 데이터 패칭 - 출력 순으로 이해를 시작하기 때문에 우선순위를 높게 책정한다.

배운 점: `API`를 호출하고 분기를 설정하는 다양한 방법을 배울 수 있었다.

아쉬운 점: 단위 테스트 개념이 많이 부족한데 쓸만한 예제가 나오지 않아 아쉬웠다.

향후 계획: `.TSX`를 사용해야 하는 이유에 대해 알아볼 것이다.