---
sidebar_position: 13
title: "[Day 13] 조건부 타입, 유틸리티 타입, 강의 후기"
description: 한 입 크기로 잘라먹는 타입스크립트
authors: [MtypEyuc]
tags: [typescript]
date: "2025-03-14"
---
**작성일:** {frontMatter.date}

## 1.  <span style={{ color: '#ffd33d' }}> 조건부 타입 </span>
```ts
type A = number extends string ? number : string;
```
- 삼항 연산자를 이용해 조건에 따라 각각 다른 타입을 정의하도록 하는 타입입니다.
```ts
type ObjA = {
  a: number;
};

type ObjB = {
  a: number;
  b: number;
};

type B = ObjB extends ObjA ? number : string;
```
- B는 ObjB는 ObjA의 서브 타입 이므로 조건식이 참이되어 number 타입이 됩니다.
---
>### 1. 제네릭 조건부 타입
```ts
type StringNumberSwitch<T> = T extends number ? string : number;

let varA: StringNumberSwitch<number>;
// string

let varB: StringNumberSwitch<string>;
// number
```
- T에 할당되는 타입에 따라 조건식에 만족하는 타입이 됩니다.

```ts
function removeSpaces<T>(text: T): T extends string ? string : undefined;
function removeSpaces(text: any) {
  if (typeof text === "string") {
    return text.replaceAll(" ", "");
  } else {
    return undefined;
  }
}

let result = removeSpaces("hi im winterlood");
// string

let result2 = removeSpaces(undefined);
// undefined
```
- 조건부 타입의 결과는 함수 내부에서 확인할 수 없기 때문에 타입 단언을 사용하거나 함수 오버로딩을 사용해서 구현해야 합니다.

---

>### 2.  분산적인 조건부 타입

```ts
// 분산을 방지하고 싶다면 
// type StringNumberSwitch<T> = [T] extends [number] ? string : number;

type StringNumberSwitch<T> = T extends number ? string : number;

let a: StringNumberSwitch<number | string>;

// string | number

// StringNumberSwitch<number> -> string

// StringNumberSwitch<string> -> number

let b: StringNumberSwitch<boolean | number | string>;

// StringNumberSwitch<boolean> > number

// StringNumberSwitch<number> -> string

// StringNumberSwitch<string> -> number
```
- 조건부 타입에 유니온 타입을 할당해 두 타입이 분리되어 전달되며, 분리된 결과 값은 각각 유니온 타입으로 묶어줍니다.

```ts
type Exclude<T, U> = T extends U ? never : T;

type A = Exclude<number | string | boolean, string>;

// Exclude<number, string> > number
// Exclude<string, string> > never
// Exclude<boolean, string> > boolean
```
- 결과 타입 A는` number | never | boolean`이지만, 유니온 타입에 never 타입이 포함되어 있으면 자동으로 제거해줍니다.

```ts
type Extract<T, U>  = T extends U ? T: never;

type A = Extract<number | string | boolean , string>

// Extract<number, string>
// Extract<string, string>
// Extract<boolean, string>
```
- 결과 타입 A는` never | string | never` 이기 때문에 string 타입이 되는 것을 확인할 수 있습니다.

----

>### 3. infer
```ts
type FuncA = () => string;

type FuncB = () => number;

type ReturnType<T> = T extends () => infer R ? R : never;

type A = ReturnType<FuncA>;
// string

type B = ReturnType<FuncB>;
// number

type C = ReturnType<number>;
// 조건식을 만족하는 R추론 불가능
// never
```
- 특정 함수 타입에서 반환값의 타입만 추출하는 특수한 조건부 타입을 제작하는데 사용됩니다.



- `infer R`은 이 조건식을 참이 되도록 만들 수 있는 최적의 R 타입을 추론하라는 의미입니다.
- 
```ts
type PromiseUnpack<T> = T extends Promise<infer R> ? R : never;
// 1. T는 프로미스 타입이어야 한다.
// 2. 프로미스 타입의 결과값 타입을 반환해야 한다.

type PromiseA = PromiseUnpack<Promise<number>>; // Promise<number> 의 서브타입의 조건에 합당하는 R을 구해야 한다.
// number

type PromiseB = PromiseUnpack<Promise<string>>;
// string
```
- Promise의 resolve 타입을 infer를 이용해 추출할 수 있습니다.

---

## 2.  <span style={{ color: '#ffd33d' }}> 유틸리티 타입 </span>
>### 1. Partial
 ```ts
interface Post {
  title: string;
  tags: string[];
  content: string;
  thumbnailURL?: string;
}
const draft: Partial<Post> = {
  title: "제목 나중에 짓자",
  content: "초안...",
};
```
- 타입 변수 T로 전달한 객체 타입의 모든 프로퍼티를 다 선택적 프로퍼티로 변환합니다.

---
>### 2. Required
```ts
interface Post {
  title: string;
  tags: string[];
  content: string;
  thumbnailURL?: string;
}
const withThumbnailPost: Required<Post> = { // ❌
  title: "한입 타스 후기",
  tags: ["ts"],
  content: "",
  // thumbnailURL: "https://...",
};
```
- 타입 변수 T로 전달한 객체 타입의 모든 프로퍼티를 다 필수 프로퍼티로 변환합니다.

---
>### 3. Readonly
```ts
interface Post {
  title: string;
  tags: string[];
  content: string;
  thumbnailURL?: string;
}
const readonlyPost: Readonly<Post> = {
  title: "보호된 게시글입니다.",
  tags: [],
  content: "",
};
readonlyPost.content = '해킹당함'; // ❌
```
- 타입 변수 T로 전달한 객체 타입의 모든 프로퍼티를 다 읽기 전용 프로퍼티로 변환합니다.

---
>### 4. Pick
```ts
interface Post {
  title: string;
  tags: string[];
  content: string;
  thumbnailURL?: string;
}
const legacyPost: Pick<Post, "title" | "content"> = {
  title: "",
  content: "",
};
// 추출된 타입 : { title : string; content : string }
```
- 타입 변수 T로 전달한 객체 타입의 프로퍼티를 새로운 타입으로 정의해 필요한 속성만 선택적으로 사용할 수 있게 만들 수 있습니다.

---
>### 5. Omit
```ts
interface Post {
  title: string;
  tags: string[];
  content: string;
  thumbnailURL?: string;
}
const noTitlePost: Omit<Post, "title"> = {
    content: "",
    tags: [],
    thumbnailURL: "",
};
```
- 타입 변수 T로 전달한 객체 타입의 프로퍼티를 특정 속성을 제거한 새로운 타입으로 정의해 필요한 속성만 선택적으로 사용할 수 있게 만들 수 있습니다.

---
>### 6. Record
```ts
// type ThumbnailLegacy = {
//   large: {
//     url: string;
//   };
//   medium: {
//     url: string;
//   };
//   small: {
//     url: string;
//   };
// };

type Thumbnail = Record<
    "large" | "medium" | "small",
    { url: string; size:number }
>;
```
- 객체 타입을 생성하는 유틸리티 타입으로써, 특정 프로퍼티를 지속적으로 추가해야 할 때 중복 코드를 방지할 수 있습니다.

---
>### 7. Exclude
```ts
type Exlcude<T, U> = T extends U ? never : T;

type A = Exclude<string | boolean, string>;
// boolean
```
- T로부터 U를 제거하는 타입입니다.

---
>### 8. Extract
```ts
type Extract<T, U> = T extends U ? T : never;

type B = Extract<string | boolean, boolean>;
// boolean
```
- T로부터 U를 추출하는 타입입니다.

---

>### 9. ReturnType
```ts
type ReturnType<T extends (...args: any) => any> = T extends (
  ...agrs: any
) => infer R
  ? R
  : never;

function funcA() {
  return "hello";
}

function funcB() {
  return 10;
}

type ReturnA = ReturnType<typeof funcA>;
// string
type ReturnB = ReturnType<typeof funcB>;
// number
```
- 타입변수 T에 할당된 함수 타입의 반환값 타입을 추출하는 타입입니다.

---

## <span style={{ color: '#ffd33d' }}> 후기 </span>
<details>
<summary> 펼치기 </summary>

**Liked** : 좋았던 점은 무엇인가?
- 간결한 강의 노트와 예제 코드
    - 강의를 들으며 참조할 수 있는 강의 노트 내용이 알차게 구성되어있고, 커리큘럼마다 진행하는 미션의 예제 코드를 통해 배운 내용을 실습할 수 있었습니다.

**Lacked** : 아쉬웠던 점, 부족한 점은 무엇인가?
- 실무를 이해하려면 기본 지식 필요
    - 타입스크립트 템플릿을 사용하거나 이미 있는 코드를 사용해 프로젝트에 적용하는 식으로 사용하고 있었는데, 이번 강의를 통해 작성자의 의도를 파악하고 이후 자바스크립트 형식의 프로젝트에서 점진적으로 적용할 수 있는 방법을 배우게 되었습니다.

**Learned** : 배운 점은 무엇인가? (깨달은것, 인사이트, 기억하고 싶은 것 등)
- 타입스크립트의 기초
    - 기초적인 방법을 더 깊게 배우는 형식의 강의로 진행되었습니다. 기본 이해가 부족했었는데 개념이 넓게 확립되었습니다.


**Longed for** : 앞으로 바라는 것은 무엇인가? (앞으로 어떤 행동을 할것인지)
- 자연스럽게 사용하기 위해 복습하기
    - 프로젝트에서 사용된 코드가 아니라 직접 API를 만들 때 막히지 않고 자연스럽게 내용을 구상할 수 있도록 주기적으로 복습할 것입니다.
</details>