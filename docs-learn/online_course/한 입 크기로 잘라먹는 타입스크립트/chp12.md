---
sidebar_position: 12
title: "[Day 12] 타입 조작하기"
description: 한 입 크기로 잘라먹는 타입스크립트
authors: [MtypEyuc]
tags: [typescript]
hide_table_of_contents: false
---

## 1.  <span style={{ color: '#ffd33d' }}> 인덱스드 엑세스 타입 </span>
객체의 프로퍼티에 접근할 때 해당 프로퍼티의 타입을 동적으로 추출할 수 있도록 도와준다.

---
>### 1. 객체 프로퍼티의 타입 추출하기
```tsx
type T = { [key: string]: number };
type V = T['someKey']; // V는 number 타입
```
- T는 key: string 형태로 프로퍼티를 가질 수 있는 객체 타입이다.

----
```tsx
interface Post {
  title: string;
  content: string;
  author: {
    id: number;
    name: string;
    age: number;
  };
}
function printAuthorInfo(author: Post["author"]) {
	// author 매개변수의 타입은 number 타입이 됨
  console.log(`${author.id} - ${author.name}`);
}
```
- 대괄호 속에 들어가는 String Literal 타입을 인덱스라고 하며 값이 아닌 타입만 들어갈 수 있다.

---
>### 2. 배열 요소의 타입 추출하기
배열타입으로부터 요소를 추출할 수 있다. n 번째 항에서 특정 요소를 추출한다는 뜻으로, number 또는 Number Literal 값을 넣어도 된다.
```tsx
type PostList = {
  title: string;
  content: string;
  author: {
    id: number;
    name: string;
    age: number;
  };
}[];
const post: PostList[number] = {
    title: "게시글 제목",
    content: "게시글 본문",
    author: {
        id: 1,
        name: "이정환",
        age: 27,
    },
};
```

---
>### 3. 튜플의 요소 타입 추출하기
튜플의 요소도 인덱스드 엑세스 타입으로 추출 가능하다.
```tsx
type Tup = [number, string, boolean];

type Tup0 = Tup[0];
// number

type Tup1 = Tup[1];
// string

type Tup2 = Tup[2];
// boolean

type Tup3 = Tup[number]
// number | string | boolean
```

---
## 2.  <span style={{ color: '#ffd33d' }}> keyof & typeof 연산자 </span>
>### 1. Keyof 연산자
객체 타입으로부터 프로퍼티의 모든 key들을 String Literal Union 타입으로 추출하는 연산자이다.
```tsx
interface Person {
  name: string;
  age: number;
  location: string; // 추가
}
// function getPropertyKey(person: Person, key: "name" | "age" | "location") {
//
//     return person[key];
//
// }
function getPropertyKey(person: Person, key: keyof Person) {
  return person[key];
}

const person: Person = {
  name: "이정환",
  age: 27,
};
```
- "name" | "age" | "location" 같이 매개변수의 타입을 바꿔줘야 하면 함수가 많아지면 많아질수록 불편해진다.   



- keyof Person의 결과값은 “name” | “age” | “location”이 된다.

----
>### 2. Typeof와 Keyof 함께 사용하기
특정 변수의 타입을 추출하고 사용할 수 있다.
```tsx
type Person = typeof person;
// 결과
// {name: string, age: number, location:string}
function getPropertyKey(person: Person, key: keyof typeof person) {
    return person[key];
}

const person: Person = {
    name: "이정환",
    age: 27,
};
```

---
## 3.  <span style={{ color: '#ffd33d' }}> 맵드 타입 </span>
간단한 한줄의 코드 만으로 중복 없이 기존 타입을 변환할 수 있다.

---
```tsx
interface User {
  id: number;
  name: string;
  age: number;
}

type PartialUser = {
  [key in "id" | "name" | "age"]?: User[key];
};
function fetchUser(): User {
    return {
        id: 1,
        name: "이정환",
        age: 27,
    };
}
function updateUser(user: User) {
    // ... 유저 정보 수정 기능
}
```
- 대 괄호 뒤에 선택적 프로퍼티를 의미하는 물음표를 붙여 모든 프로퍼티를 선택적 프로퍼티로 만든다.

---
```tsx
interface User {
  id: number;
  name: string;
  age: number;
}

type PartialUser = {
  [key in keyof User]?: User[key];
};

type ReadonlyUser = {
  readonly [key in keyof User]: User[key];
};
```
- keyof 연산자를 이용해 한번 더 업그레이드 할 수 있다.



- readonly를 사용해 읽기 전용으로 만들 수 있다.

---
## 4.  <span style={{ color: '#ffd33d' }}> 템플릿 리터럴 타입 </span>
특정 패턴을 갖는 String 타입을 만드는 기능이다.

---
```tsx
type Color = "red" | "black" | "green";
type Animal = "dog" | "cat" | "chicken";

type ColoredAnimal = `red-dog` | 'red-cat' | 'red-chicken' | 'black-dog' | `....`

type ColoredAnimal = `${Color}-${Animal}`;
```
- Color나 Animal 타입에 String Literal 타입이 추가되어 경우의 수가 많아질 수록 ColoredAnimal 타입에 추가해야하는 타입이 점점 많아지게 된다. 이 때 템플릿 리터럴 타입을 사용하면 좋다.

---

## 5.  <span style={{ color: '#ffd33d' }}> 과제 </span>
![01.webp](../../../static/img/%ED%95%9C%20%EC%9E%85%20%ED%81%AC%EA%B8%B0%EB%A1%9C%20%EC%9E%98%EB%9D%BC%EB%A8%B9%EB%8A%94%20%ED%83%80%EC%9E%85%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8/12/01.webp)
![04.webp](../../../static/img/%ED%95%9C%20%EC%9E%85%20%ED%81%AC%EA%B8%B0%EB%A1%9C%20%EC%9E%98%EB%9D%BC%EB%A8%B9%EB%8A%94%20%ED%83%80%EC%9E%85%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8/12/04.webp)
![02.webp](../../../static/img/%ED%95%9C%20%EC%9E%85%20%ED%81%AC%EA%B8%B0%EB%A1%9C%20%EC%9E%98%EB%9D%BC%EB%A8%B9%EB%8A%94%20%ED%83%80%EC%9E%85%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8/12/02.webp)
![05.webp](../../../static/img/%ED%95%9C%20%EC%9E%85%20%ED%81%AC%EA%B8%B0%EB%A1%9C%20%EC%9E%98%EB%9D%BC%EB%A8%B9%EB%8A%94%20%ED%83%80%EC%9E%85%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8/12/05.webp)
![03.webp](../../../static/img/%ED%95%9C%20%EC%9E%85%20%ED%81%AC%EA%B8%B0%EB%A1%9C%20%EC%9E%98%EB%9D%BC%EB%A8%B9%EB%8A%94%20%ED%83%80%EC%9E%85%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8/12/03.webp)
![06.webp](../../../static/img/%ED%95%9C%20%EC%9E%85%20%ED%81%AC%EA%B8%B0%EB%A1%9C%20%EC%9E%98%EB%9D%BC%EB%A8%B9%EB%8A%94%20%ED%83%80%EC%9E%85%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8/12/06.webp)
