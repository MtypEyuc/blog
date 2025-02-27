---
sidebar_position: 5
title: "[Day 5] 객체 타입의 호환성, 대수 타입, 타입 추론 "
description: 타입 스크립트 강의
authors: [MtypEyuc]
tags: [typescript]
hide_table_of_contents: false
---

## 1. 객체 타입의 호환성
타입스크립트는 any 타입을 제외하고 다운캐스팅을 직접적으로 허용하지 않는다.
```tsx
type Book = {
  name: string;
  price: number;
};

type ProgrammingBook = {
  name: string;
  price: number;
  skill: string;
};

let book: Book;
let programmingBook: ProgrammingBook = {
  name: "한 입 크기로 잘라먹는 리액트",
  price: 33000,
  skill: "reactjs",
};

book = programmingBook; // ✅ OK
programmingBook = book; // ❌ NO
```
 - Book은 부모타입이기 때문에 다운캐스팅에 해당하므로 오류가 발생한다.

```tsx
type Book = {
  name: string;
  price: number;
};

type ProgrammingBook = {
  name: string;
  price: number;
  skill: string;
};


let book2: Book = { // 오류 발생
  name: "한 입 크기로 잘라먹는 리액트",
  price: 33000,
  skill: "reactjs",
};
```
- 변수를 객체 리터럴로 초기화 해서 초과 프로퍼티 검사가 오류를 발생시킨다. 이 기능은 타입에 정의된 프로퍼티 외의 다른 초과된 프로퍼티를 갖는 객체를 변수에 할당할 수 없도록 막는다.

```tsx
//...
let book3: Book = programmingBook;
```
-  값을 별도의 다른 변수에 보관한 다음 변수 값을 초기화 값으로 사용하면 발생하지 않는다.

```tsx
function func(book: Book) {}  

func({ // 오류 발생  //func(programmingBook)는 오류를 발생시키지 않는다.
  name: "한 입 크기로 잘라먹는 리액트",
  price: 33000,
  skill: "reactjs",
});
```
- 함수 매개변수에 인수로 값을 전달하는 과정도 변수를 초기화하는 과정과 동일해 오류를 발생시킨다. 마찬가지로 변수에 값을 담고 변수값을 전달하면 오류를 피할 수 있다.


---
## 2. 대수 타입
여러개의 타입을 합성해서 만드는 타입이다.

---

### 1. 합집합(Union) 타입
```tsx
let a: string | number | boolean;

a = 1;
a = "hello";
a = true;

let arr: (number | string | boolean)[] = [1, "hello", true];
```
- | 형태이며 참여하는 타입들의 개수에 제한이 없다.

```tsx
let union1: Union1 = { // ✅
  name: "",
  color: "",
};

let union2: Union1 = { // ✅
  name: "",
  language: "",
};

let union3: Union1 = { // ✅
  name: "",
  color: "",
  language: "",
};


let union4: Union1 = { // ❌
    name: "",
};
```
![01.webp](../../../static/img/한%20입%20크기로%20잘라먹는%20타입스크립트/05/01.webp)

---

### 2. 교집합(Intersection) 타입
```tsx
let variable: number & string; 
// never 타입으로 추론된다
```

- 대다수의 기본타입은 서로 교집합을 공유하지 않는다.


```tsx
type Dog = {
  name: string;
  color: string;
};

type Person = {
  name: string;
  language: string;
};

type Intersection = Dog & Person;

let intersection1: Intersection = {
  name: "",
  color: "",
  language: "",
};
```
![02.webp](../../../static/img/한%20입%20크기로%20잘라먹는%20타입스크립트/05/02.webp)
- &의 형태이며, 객체타입에 주로 사용된다.

---

## 3. 타입 추론
```tsx
let a = 10;
// number 타입으로 추론

function func(param){ // 오류

}
```
- 타입이 정의되지 않은 변수를 자동으로 추론한다. 함수의 매개변수 타입은 추론할 수 없다.

---
### 1. 타입 추론이 가능한 상황들
#### 1. 변수 선언

```tsx
let a = 10;
// number 타입으로 추론

let b = "hello";
// string 타입으로 추론

let c = {
  id: 1,
  name: "이정환",
  profile: {
    nickname: "winterlood",
  },
  urls: ["https://winterlood.com"],
};
// id, name, profile, urls 프로퍼티가 있는 객체 타입으로 추론
```

---

#### 2. 구조 분해 할당
```tsx
let { id, name, profile } = c;

let [one, two, three] = [1, "hello", true];
```

---

#### 3. 함수의 반환값
```tsx
function func() {
  return "hello";
}
// 반환값이 string 타입으로 추론된다
```
- 함수 반환값의 타입은 return 문을 기준으로 추론한다.

---
#### 4. 기본값이 설정된 매개변수
```tsx
function func(message = "hello") {
  return "hello";
}
```
- 기본값이 설정된 매개변수의 타입은 기본값을 기준으로 추론한다.

### 2. 주의해야 할 상황들
#### 1. 암시적으로 any 타입으로 추론
```tsx
let d;
// 암시적인 any 타입으로 추론
```
- 일반 변수의 타입이 암시적 any 타입으로 추론되는 상황은 오류로 판단하지 않는다.
```tsx
let d;
d = 10;
d.toFixed();

d = "hello";
d.toUpperCase();
d.toFixed(); // 오류 
```
- 변수에 값을 할당하면 그 다음 라인부터 any 타입이 해당 값의 타입으로 변화하는데 any의 진화라고 표현하기도 한다.

---
#### 2. const 상수의 추론

```tsx
const num = 10;
// 10 Number Literal 타입으로 추론

const str = "hello";
// "hello" String Literal 타입으로 추론
```
- 상수는 초기화 때 설정한 값을 변경할 수 없기 때문에 특별히 가장 좁은 타입으로 추론된다.


---
### 3. 최적 공통 타입(Best common Type)
```tsx
let arr = [1, "string"];
// (string | number)[] 타입으로 추론
```
- 다양한 타입의 요소를 담은 배열을 변수의 초기값으로 설정하면, 최적의 공통 타입으로 추론한다.

---


## 4. 과제
![04.webp](../../../static/img/한%20입%20크기로%20잘라먹는%20타입스크립트/05/04.webp)
![03.webp](../../../static/img/한%20입%20크기로%20잘라먹는%20타입스크립트/05/03.webp)

**출처** : [한 입 크기로 잘라먹는 타입스크립트 - 이정환](https://www.inflearn.com/course/%ED%95%9C%EC%9E%85-%ED%81%AC%EA%B8%B0-%ED%83%80%EC%9E%85%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8/dashboard)
