---
sidebar_position: 10
title: "[Day 10] 제네릭, 메서드 타입 정의하기"
description: 한 입 크기로 잘라먹는 타입스크립트
authors: [MtypEyuc]
tags: [typescript]
hide_table_of_contents: false
---

## 1. <span style={{ color: '#ffd33d' }}> 제네릭 소개 </span>
타입스크립트의 기능으로 정의된 타입의 매개변수를 받거나 반환할 수 있게 만든다. 
```tsx
function func<T>(value: T): T {
  return value;
}

let num = func(10);
// number 타입

let arr = func<[number, number, number]>([1, 2, 3]);
```

---
-  꺽쇠를 열고 타입을 담는 변수 `T`를 설정하고 매개변수의 타입을 해당 타입 변수로 설정하고 반환값의 타입을 설정한다.
## 2.  <span style={{ color: '#ffd33d' }}> 타입 변수 응용하기 </span>
>### 1. 2개의 타입 변수
```tsx
function swap<T, U>(a: T, b: U) {
  return [b, a];
}

const [a, b] = swap("1", 2);
```
- T는 String 타입으로 U는 Number 타입으로 추론된다.
---
>### 2. 배열 타입을 인수로 받는 제네릭 함수
```tsx
function returnFirstValue<T>(data: T[]) {
  return data[0];
}

let num = returnFirstValue([0, 1, 2]);
// number

let str = returnFirstValue([1, "hello", "mynameis"]);
// number | string
```
- 배열을 인수로 전달하면 T는 배열의 요소 타입으로 할당된다.
---
>### 3. 반환값의 타입을 배열의 첫번째 요소로 지정
튜플과 ...rest 를 이용해 만든다.
```tsx
function returnFirstValue<T>(data: [T, ...unknown[]]) {
  return data[0];
}

let str = returnFirstValue([1, "hello", "mynameis"]);
// number
```
- 첫 번째 타입을 number로 추론하고 뒤에 받는 타입을 unknown[] 으로 설정해 길이도 타입도 상관 없도록 정의한다.
---
>### 4. 함수를 호출하고 인수로 전달할수 있는 값의 범위를 제한
타입 변수를 제한할 때는 extends를 사용한다. 
```tsx
function getLength<T extends { length: number }>(data: T) {
  return data.length;
}

getLength("123");            // ✅

getLength([1, 2, 3]);        // ✅

getLength({ length: 1 });    // ✅

getLength(undefined);        // ❌

getLength(null);             // ❌
```
- T는 이제  length : number 객체의 서브 타입이 된다.


- T는 무조건 Number 타입의 프로퍼티 length 를 가지고 있는 타입이 되어야 한다
---
## 3.  <span style={{ color: '#ffd33d' }}> map, forEach 메서드 타입 정의하기 </span> 
>### 1. Map 메서드 타입 정의하기
```tsx
function map(arr: unknown[], callback: (item: unknown)
    => unknown): unknown[] {}

function map<T>(arr: T[], callback: (item: T) 
    => T): T[] {}
```
- 메서드를 적용할 배열을 매개변수 arr로 받고, 콜백 함수를 매개변수 callback으로 받는 일반 함수를 먼저 만든다.


- 모든 unknown 타입을 타입 변수 T로 대체하고 함수 내부를 구현한다.
---
```tsx
const arr = [1, 2, 3];

function map<T, U>(arr: T[], callback: (item: T) => U): U[] {
    let result = [];

    for (let i = 0; i < arr.length; i++) {
        result.push(callback(arr[i]));
    }
    return result;
}

map(arr, (it) => it.toString());
// string[] 타입의 배열을 반환
// 결과 : ["1", "2", "3"]
```
- 원본 배열의 타입과 새롭게 반환하는 배열의 타입을 설정할 수 있다.
---
>### 2. ForEach 메서드 타입 정의하기
forEach 메서드는 다음과 같이 배열의 모든 요소에 콜백함수를 한번씩 수행해주는 메서드다.
```tsx
const arr2 = [1, 2, 3];

arr2.forEach((it) => console.log(it));
// 출력 : 1, 2, 3

function forEach<T>(arr: T[], callback: (item: T) => void) {
    for (let i = 0; i < arr.length; i++) {
        callback(arr[i]);
    }
}
```
- 두 개의 매개변수를 받고 callback에서 모든 배열 요소에 수행할 함수를 제공받는다. 


- forEach는 반환값이 없기 때문에 반환값 타입을 void로 정의한다.
---
### 4. 과제

![16.webp](../../../static/img/%ED%95%9C%20%EC%9E%85%20%ED%81%AC%EA%B8%B0%EB%A1%9C%20%EC%9E%98%EB%9D%BC%EB%A8%B9%EB%8A%94%20%ED%83%80%EC%9E%85%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8/10/16.webp)
![12.webp](../../../static/img/%ED%95%9C%20%EC%9E%85%20%ED%81%AC%EA%B8%B0%EB%A1%9C%20%EC%9E%98%EB%9D%BC%EB%A8%B9%EB%8A%94%20%ED%83%80%EC%9E%85%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8/10/12.webp)
![17.webp](../../../static/img/%ED%95%9C%20%EC%9E%85%20%ED%81%AC%EA%B8%B0%EB%A1%9C%20%EC%9E%98%EB%9D%BC%EB%A8%B9%EB%8A%94%20%ED%83%80%EC%9E%85%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8/10/17.webp)
![13.webp](../../../static/img/%ED%95%9C%20%EC%9E%85%20%ED%81%AC%EA%B8%B0%EB%A1%9C%20%EC%9E%98%EB%9D%BC%EB%A8%B9%EB%8A%94%20%ED%83%80%EC%9E%85%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8/10/13.webp)
![18.webp](../../../static/img/%ED%95%9C%20%EC%9E%85%20%ED%81%AC%EA%B8%B0%EB%A1%9C%20%EC%9E%98%EB%9D%BC%EB%A8%B9%EB%8A%94%20%ED%83%80%EC%9E%85%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8/10/18.webp)
![14.webp](../../../static/img/%ED%95%9C%20%EC%9E%85%20%ED%81%AC%EA%B8%B0%EB%A1%9C%20%EC%9E%98%EB%9D%BC%EB%A8%B9%EB%8A%94%20%ED%83%80%EC%9E%85%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8/10/14.webp)
