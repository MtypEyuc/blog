---
sidebar_position: 8
title: "[Day 8] 함수 오버로딩, 인터페이스 "
description: 한 입 크기로 잘라먹는 타입스크립트
authors: [MtypEyuc]
tags: [typescript]
hide_table_of_contents: false
---

## 1. <span style={{ color: '#ffd33d' }}> 함수 오버로딩 </span>
하나의 함수에서 매개 변수의 개수나 타입에 따라 여러가지 버전으로 만드는 문법이다.
```tsx
// 버전들 -> 오버로드 시그니쳐
function func(a: number): void;
function func(a: number, b: number, c: number): void;

// 실제 구현부 -> 구현 시그니쳐
function func(a: number, b?: number, c?: number) {
  if (typeof b === "number" && typeof c === "number") {
    console.log(a + b + c);
  } else {
    console.log(a * 20);
  }
}

func(1);        // ✅ 버전 1 - 오버로드 시그니쳐
func(1, 2);     // ❌ 
func(1, 2, 3);  // ✅ 버전 3 - 오버로드 시그니쳐
```
- 구현부 없이 선언부만 만들어 놓은  `오버로드 시그니쳐`를 만들어 구현부에서 사용한다. 


- 구현 시그니쳐의 매개변수 타입은 모든 오버로드 시그니쳐와 호환되도록 만들어야 한다.


----

## 2. <span style={{ color: '#ffd33d' }}> 사용자 정의 타입가드 </span> 
참 또는 거짓을 반환하는 함수를 사용해 타입가드를 만들어 타입을 좁힌다.

```tsx
type Dog = {

    name: string;

    isBark: boolean;

};


type Cat = {

    name: string;

    isScratch: boolean;

};


type Animal = Dog | Cat;

// Dog 타입인지 확인하는 타입 가드
function isDog(animal: Animal): animal is Dog {
  return (animal as Dog).isBark !== undefined;
}

// Cat 타입인지 확인하는 타입가드
function isCat(animal: Animal): animal is Cat {
  return (animal as Cat).isScratch !== undefined;
}

function warning(animal: Animal) {
  if (isDog(animal)) {
    console.log(animal.isBark ? "짖습니다" : "안짖어요");
  } else {
    console.log(animal.isScratch ? "할큅니다" : "안할퀴어요");
  }
}
```
- warning 함수에서 isDog 함수를 호출해 매개변수의 값이 Dog 타입인지 확인하고 타입을 좁힐 수 있다.


---

## 3. <span style={{ color: '#ffd33d' }}> 인터페이스 확장 </span>
인터페이스 확장을 통한 코드 재활용으로 중복 코드를 줄일 수 있다.
```tsx
interface Animal {
  name: string;
  color: string;
}

interface Dog extends Animal {
  breed: string;
}

interface Cat extends Animal {
  isScratch: boolean;
}

interface Chicken extends Animal {
  isFly: boolean;
}
```
- 확장 대상 타입인 Animal은 Dog 타입의 슈퍼타입이 된다.

---
>### 1. 프로퍼티 재 정의하기

```tsx
interface Animal {
  name: string;
  color: string;
}

interface Dog extends Animal {
  name: "doldol"; // 타입 재 정의
  breed: string;
}

interface Cat extends Animal {
    name: number; // ❌ Animal의 멤버와 호환되지 않는 재정의
    breed: string;
}
```
- 부모를 슈퍼타입으로 하는 조건으로 타입을 재 정의 할 수 있다. 
---
>### 2. 다중 확장
여러 개의 인터페이스를 확장하는 것도 가능하다.
```tsx
interface DogCat extends Dog, Cat {}

const dogCat: DogCat = {
    name: "",
    color: "",
    breed: "",
    isScratch: true,
};
```

---

## 4. <span style={{ color: '#ffd33d' }}> 인터페이스 선언 합치기 </span>
타입 별칭과 다르게 동일한 스코프에서 중복 선언이 가능하다.
```tsx
type Person = {
  name: string;
};

type Person = { ❌
  age: number;
};

interface Person {
    name: string;
}

interface Person { // ✅
    age: number;
}

const person: Person = { // ✅
    name: "이정환",
    age: 27,
};
```

- 중복된 이름으로 선언된 인터페이스는 합쳐져서 하나의 인터페이스가 된다.

----

## 5. <span style={{ color: '#ffd33d' }}> 과제 </span> 

![04.webp](../../../static/img/%ED%95%9C%20%EC%9E%85%20%ED%81%AC%EA%B8%B0%EB%A1%9C%20%EC%9E%98%EB%9D%BC%EB%A8%B9%EB%8A%94%20%ED%83%80%EC%9E%85%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8/08/04.webp)
![07.webp](../../../static/img/%ED%95%9C%20%EC%9E%85%20%ED%81%AC%EA%B8%B0%EB%A1%9C%20%EC%9E%98%EB%9D%BC%EB%A8%B9%EB%8A%94%20%ED%83%80%EC%9E%85%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8/08/07.webp)

---
![05.webp](../../../static/img/%ED%95%9C%20%EC%9E%85%20%ED%81%AC%EA%B8%B0%EB%A1%9C%20%EC%9E%98%EB%9D%BC%EB%A8%B9%EB%8A%94%20%ED%83%80%EC%9E%85%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8/08/05.webp)
![08.webp](../../../static/img/%ED%95%9C%20%EC%9E%85%20%ED%81%AC%EA%B8%B0%EB%A1%9C%20%EC%9E%98%EB%9D%BC%EB%A8%B9%EB%8A%94%20%ED%83%80%EC%9E%85%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8/08/08.webp)

---
![06.webp](../../../static/img/%ED%95%9C%20%EC%9E%85%20%ED%81%AC%EA%B8%B0%EB%A1%9C%20%EC%9E%98%EB%9D%BC%EB%A8%B9%EB%8A%94%20%ED%83%80%EC%9E%85%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8/08/06.webp)
![09.webp](../../../static/img/%ED%95%9C%20%EC%9E%85%20%ED%81%AC%EA%B8%B0%EB%A1%9C%20%EC%9E%98%EB%9D%BC%EB%A8%B9%EB%8A%94%20%ED%83%80%EC%9E%85%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8/08/09.webp)
