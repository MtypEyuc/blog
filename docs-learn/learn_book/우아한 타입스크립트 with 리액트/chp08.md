---
sidebar_position: 8
title: "12장 타입스크립트 프로젝트 관리"
description: 타입스크립트 프로젝트 관리
authors: [MtypEyuc]
tags: [typescript]
image: https://i.imgur.com/mErPwqL.png
hide_table_of_contents: false
---

## 1. <span style={{ color: '#ffd33d' }}> 앰비언트 타입 활용하기 </span>
>### 1. 앰비언트 타입 선언
자바스크립트에는 타입 정보가 없기 때문에 타입스크립트 외부 라이브러리 사용시 **정의되지 않은 객체 오류**가 발생할 수 있는데, 타입 선언만 할 수 있는 `.d.ts` 확장자를 가진 파일에서 `declare` 키워드를 사용해 컴파일러에 타입스크립트 객체 정보를 미리 제공해 에러를 방지한다.

---
>### 2. 주의점

- 타입스크립트 라이브러리 사용시 tsconfig.json의 declaration을 true로 설정하면 자동으로 .d.ts 파일을 생성해준다.


- 서로 다른 라이브러리에서 동일한 이름의 앰비언트 타입 선언을 하면 충돌이 발생한다.


- 전역에서 사용가능하기 때문에 임포트나 익스포트가 없어 의존 관계가 명확하지 않아 유지보수에 어려움을 겪을 수 있다.

---
>### 3. 앰비언트 타입 활용하기
#### 1. 임포트 없이 전역으로 공유
```tsx
// src/index.d.ts
type Optional <T extends object , K extends keyof T = keyof T > = Omit <T , K > &
Partial <Pick<T, K>>;
// src/components.ts
type Props = { name: string; age: number; visible: boolean };
type OptionalProps = Optional <Props >; // Expect : { name ?: string ; age ?: number ; visible ?: boolean; }
```
- 앰비언트 타입 선언은 전역 변수와 같은 역할을 한다.

----
#### 2. declare type 활용하기
```tsx
declare type Nullable<T> = T | null;
const name: Nullable<string> = 'woowa';
```
- 커스텀 유틸리티 타입을 declare type으로 선언하여 전역에서 사용할 수 있다.


----
#### 3. declare module 활용하기
```tsx
//...
const theme = {
fontSizes,
colors,
depths
};
declare module 'styled-components' {
type Theme = typeof theme;
export interface DefaultTheme extends Theme {}
}
// 로컬 이미지나 외부 파일
declare module '*.gif' {
    const src: string;
    export default src;
}
```
- CSS-in-JS 또는 파일을 모듈로 인식하여 사용할 수 있게 만든다.
----

#### 4. declare namespace 활용하기
```tsx
  declare namespace NodeJS {
    interface ProcessEnv {
    readonly API_URL: string;
    readonly API_INTERNAL_URL: string ;
// ...
  }
}
```
- .nev 파일을 사용할 때 설정값을 전역으로 사용할 수 있게 만든다.

----
#### 5. declare global 활용하기
```tsx
declare global {
    interface Window {
        webkit?: {
            messageHandlers?: Record<
                string,
                {
                    postMessage?: (parameter: string) => void;
                }
            >;
        };
    }
}
```
- 전역 변수인 Window 객체에 자동완성 기능을 추가해 실수를 줄일 수 있다.
----
>### 4. declare와 번들러의 시너지
전역 변수 선언을 통해 컴파일러에 정보를 알려주지만, 실제 데이터는 존재하지 않기 때문에 번들 시점에 추가하는 방식으로 안전하게 사용할 수 있다.
```tsx
// data.ts
export const color = {
    white: "#ffffff",
    black: "#000000",
} as const;

// type.ts
import { color } from "./data";
type ColorSet = typeof color;
declare global {
    const _color: ColorSet;

}
// rollup.config.js
import inject from "@rollup/plugin-inject";
import typescript from "@rollup/plugin-typescript";

export default [
    {
        input: "index.ts",
        output: [
            {
                dir: "lib",
                format: "esm",
            },
        ],
        plugins: [
            typescript(),
            inject({
                _color: ["./data", "color"], // _color를 data.ts의 color로 주입
            }),
        ],
    },
];
```

---
## 2. <span style={{ color: '#ffd33d' }}> 스크립트와 설정파일 활용하기 </span>
>### 1. 스크립트 활용으로 실시간 타입검사
```
yarn tsc --noEmit --incremental -w

-  noEmit: 자바스크립트로 된 출력 파일을 생성하지 않도록 설정
-  incremental: 증분 컴파일을 활성화하여 컴파일 시간을 단
-  w: 파일 변경 사항을 모니터링

npx type-coverage --detail 

- 프로젝트 전체에서 타입을 제대로 사용하고 있는지 확인할 수 있다.
```
- 이 스크립트는 프로젝트의 타입 스크립트 컴파일러를 실행한다.

---
>### 2. 설정 파일 활용으로 컴파일 속도 올리기
``` tsx
// tsconfig에 추가

    {
    "compilerOptions": {
    ...
    incremental: true
    }
 }
 
// yarn tsc --noEmit --incremental --diagnostic 과 같음.
```

----

## 3. <span style={{ color: '#ffd33d' }}> 타입스크립트 마이그레이션 </span>
기존 프로젝트를 마이그레이션 하는 것 보다 새로 설계해 프로젝트를 구축하는 것이 더 효율적일 수 있다. 비즈니스 요구 사항과 프로젝트 특성을 고려해 마이그레이션 여부를 신중하게 결정해야 한다.

---
> ### 1. 점진적인 마이그레이션
프로젝트의 규모가 큰 경우 참여자와 함께 우선순위를 설정해 작은 부분부터 점진적으로 진행하는 것이 좋다. 

---
>### 2.  마이그레이션 진행하기
1. 타입스크립트 개발환경 설정 후 빌드 파이프라인에 컴파일러를 통합한다.



2. tsconfig.json 파일에서 allowJS를 true로 noImplicitAny를 false로 설정한다.



3. 작성된 자바스크립트 파일을 타입스크립트 파일로 변환한다. 필요한 타입과 인터페이스를 하나씩 정의하며 함수 시그니처를 추가해나간다.



4. 작업이 완료되었다면 tsconfig.json 파일에서 allowJS를 false로 변경하고, noImplicitAny를 true로 설정한다.

----
## 4. <span style={{ color: '#ffd33d' }}> 모노레포 </span>
>### 1. 장점
여러 프로젝트를 하나의 레포지토리로 통합해 관리해 불필요한 코드 중복을 줄인다. 모듈 관리 시 별도의 관리가 필요 없어 의존성 관리를 쉽게 할 수 있다.

---
>### 2.단점
시간의 흐름에 따라 레포지토리가 거대해질 수 있으며, 이해관계에 의해 소유권과 권한 관리가 복잡해질 수 있으므로 모듈의 소유권을 명확히 정의하고 규칙을 설정해야 하는 과정이 별도로 필요하다.

----

## <span style={{ color: '#ffd33d' }}> 작성 후기 </span>

1. 좋았던 점: 설정에 사용되는 속성값을 전역으로 사용하면 편리할 수 있다는 것을 알게되었다.


2. 배운 점: 타입 선언한 객체를 전역으로 사용하는 방법에 대해 배웠다.


3. 아쉬운 점: CSS 같은 경우 TailWind를 사용하고 타입스크립트 설정도 대부분 자동완성을 지원하기 때문에 전역으로 API를 관리하지 않는 이상 사용하기 힘들 것 같다.


4. 향후 계획: declare는 타입만 정의하고 실제 구현은 다른 곳에서 처리할 때 사용하기 때문에 외부 라이브러리를 사용해 처리하는 예시를 살펴보아야 할 것이다.

