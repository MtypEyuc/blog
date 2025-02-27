---
sidebar_position: 3
title: "[Day 3] 배열, 객체, 별칭과 인덱스 시그니쳐, 열거형 타입"
description: 타입 스크립트 강의
authors: [MtypEyuc]
tags: [typescript]
hide_table_of_contents: false
---

## 1. 배열과 튜플
### 1. 배열
#### 1. 배열 타입 정의 방법
```ts
let numArr: number[] = [1, 2, 3]
```
```ts
let strArr: string[] = ["hello", "im", "winterlood"];
```
변수의 이름 뒤에 콜론을 작성한 다음 배열요소타입 형식으로 배열 타입을 정의한다.
```ts
let boolArr: Array<boolean> = [true, false, true];
```
제네릭 형태로도 배열의 타입을 정의할 수 있다.
#### 2. 다양한 타입 요소를 갖는 배열 타입 정의하기
```ts
let multiArr = [1, "hello"];
```
```ts
let multiArr: (number | string)[] = [1, "hello"];
```
둘 중 하나를 만족해야 하는 유니온 타입의 배열 요소를 정의할 수 있다. 
#### 3. 다차원 배열 타입 정의하기
```ts
let doubleArr : number[][] = [
  [1, 2, 3], 
  [4, 5],
];
```
### 2. 튜플
#### 1. 튜플을 왜 쓰는 걸까?
```ts
const users: [string, number][] = [
  ["이정환", 1],
  ["이아무개", 2],
  ["김아무개", 3],
  ["박아무개", 4],
  [5, "조아무개"], // 오류 발생
];
```
들어오는 값의 순서가 중요할 때 튜플을 사용해 실수를 방지할 수 있다.

## 2. 객체
### 1. 객체 타입을 정의하는 방법
#### 1. object로 정의하기
```ts
let user: object = {
id: 1,
name: "이정환",
};

user.id; // 'object' 형식에에 'id' 프로퍼티가 없습니다.
```
타입스크립트의 object 타입은 단순 값이 객체임을 표현하는 것 외에는 아무런 정보도 제공하지 않는 타입이기 때문에 오류가 발생한다.
#### 2. 객체 리터럴 타입
```ts
let user: {
  id: number;
  name: string;
} = {
  id: 1,
  name: "이정환",
};

user.id;
```
객체 리터럴 타입을 사용햐 구조적으로 프로퍼티를 정의할 수 있다.
### 2. 특수한 프로퍼티 정의하기
#### 1. 선택적 프로퍼티(Optional Property)
```ts
let user: {
  id?: number; // 선택적 프로퍼티가 된 id
  name: string;
} = {
  id: 1,
  name: "이정환",
};

user = {
  name: "홍길동",
};
```
프로퍼티의 이름 뒤에 ?를 붙여 선택적 옵션으로 만들 수 있다. 

#### 2. 읽기 전용 프로퍼티(Readonly Property)
```ts
let user: {
  id?: number;
  readonly name: string; // name은 이제 Readonly 프로퍼티가 되었음
} = {
  id: 1,
  name: "이정환",
};

user.name = "dskfd"; // 오류 발생
```
API_KEY 같은 불변 값을 만들기 위해 readonly 키워드를 붙여 수정 불가능한 읽기 전용 프로퍼티로 만들 수 있다.

## 3. 타입 별칭과 인덱스 시그니쳐
### 1.  타입 별칭
```ts
type User = {
  id: number;
  name: string;
  nickname: string;
  birth: string;
  bio: string;
  location: string;
};
```
변수를 선언하듯 타입을 별도로 정의할 수 있다.

### 2. 인덱스 시그니쳐
```ts
type CountryCodes = {
  [key: string]: string;
};

let countryCodes: CountryCodes = {
  Korea: "ko",
  UnitedState: "us",
  UnitedKingdom: "uk",
  // (... 약 100개의 국가)
  Brazil : 'bz'
};
```
프로퍼티의 개수가 많아질 때 사용하는 방법으로 조건을 만족하는 모든 프로퍼티를 포함한다.

## 4. 열거형 타입
### 1. 열거형 타입
```ts
// enum 타입
// 여러가지 값들에 각각 이름을 부여해 열거해두고 사용하는 타입

enum Role {
    ADMIN = 0,
    USER = 1,
    GUEST = 2,
}

const user1 = {
    name: "이정환",
    role: Role.ADMIN, //관리자
};

const user2 = {
    name: "홍길동",
    role: Role.USER, // 회원
};

const user3 = {
    name: "아무개",
    role: Role.GUEST, // 게스트
};
```
여러 개의 값을 나열하고 사용할 수 있다. 값을 주지 않으면 0 또는 그 아래로 1씩 늘어나는 값으로 자동으로 할당된다.

### 2. 문자열 열거형
```ts
enum Role {
  ADMIN,
  USER,
  GUEST,
}

enum Language {
  korean = "ko",
  english = "en",
}

const user1 = {
  name: "이정환",
  role: Role.ADMIN, // 0
  language: Language.korean,// "ko"
};
```
문자열 열거형을 사용하면 값이 들어가야할 자리에 오타나 실수를 방지할 수 있다.

## 5. 과제
![](../../../static/img/한%20입%20크기로%20잘라먹는%20타입스크립트/03/01.webp)
![](../../../static/img/한%20입%20크기로%20잘라먹는%20타입스크립트/03/02.webp)
### 1. 
![](../../../static/img/한%20입%20크기로%20잘라먹는%20타입스크립트/03/03.webp)
### 2.
![](../../../static/img/한%20입%20크기로%20잘라먹는%20타입스크립트/03/04.webp)
### 3.
![](../../../static/img/한%20입%20크기로%20잘라먹는%20타입스크립트/03/05.webp)

---
**출처** : [한 입 크기로 잘라먹는 타입스크립트 - 이정환](https://www.inflearn.com/course/%ED%95%9C%EC%9E%85-%ED%81%AC%EA%B8%B0-%ED%83%80%EC%9E%85%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8/dashboard)



