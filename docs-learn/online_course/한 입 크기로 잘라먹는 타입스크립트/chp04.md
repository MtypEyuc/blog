---
sidebar_position: 4
title: "[Day 4] Any, Unknown, Void, Never, 타입계층도 이해하기 "
description: 타입 스크립트 강의
authors: [MtypEyuc]
tags: [typescript]
hide_table_of_contents: false
---

## 1. any
타입스크립트에서만 제공되는 특별한 타입으로 타입 검사를 받지 않는 특수한 타입이다. 
```ts
let anyVar: any = 10;
anyVar = "hello";

anyVar = true;
anyVar = {};

anyVar.toUpperCase();
anyVar.toFixed();
anyVar.a;
```
- 모든 타입의 값을 받을 수 있지만 컴파일 오류가 발생할 수 있기 때문에 어쩔 수 없는 상황을 제외하면 사용하지 않는 것을 권장한다.

## 2. unknown  
모든 타입을 받을 수 있지만, 자신의 타입 값은 어떤 타입의 변수에도 사용할 수 없다. 즉 값을 저장하는 행위밖에 할 수 없다.

```ts
let num: number = 10;

let unknownVar: unknown;
unknownVar = "";
unknownVar = 1;
unknownVar = () => {};

num = unknownVar; // 오류 !
unknownVar * 2 // 오류!

if (typeof unknownVar === "number") {
    // 이 조건이 참이된다면 unknownVar는 number 타입으로 볼 수 있음
    unknownVar * 2;
}
```
- 모든 타입의 값을 받을 수 있다. 하지만 다른 타입의 변수에 사용할 수 없고, 연산과 메서드도 사용할 수 없다. 이를 활용해 타입을 좁힐 수 있다.

## 3. void
아무런 값도 없음을 의미하는 타입이다. **strictNullChecks** 옵션을 해제하면 null 값을 받을 수 있다.
```ts
function func2(): void {
  console.log("hello");
}
```
- 아무런 값을 반환하지 않는 함수의 반환값 타입을 지정할 때 사용한다.
```ts
let value: void;

function setValue(): void {
    value = undefined; // void 타입 변수에는 undefined만 할당 가능
}

setValue();
```
- 일부 API나 라이브러리에서 void를 반환하는 콜백 함수에서 변수를 저장할 필요가 있을 때 변수에 타입을 지정하는 경우가 있다. 실용적인 예는 찾기 힘들다.

## 4. never
불가능을 의미하는 타입이다.

```ts
function throwError(message: string): never {
    throw new Error(message); // 이 함수는 절대 값을 반환하지 않음
}

function infiniteLoop(): never {
    while (true) {
        console.log("무한 루프 실행 중...");
    }
}
```
- 타입스크립트가 never을 반환한다는 것을 알기 때문에 해당 함수 이후 코드가 실행되지 않는다. 무한루프를 방지하거나 에러메세지를 출력해야 할 때 사용한다.

## 5. 타입스크립트 이해하기
첫 프로젝트를 Next.js + TypeScript 를 사용했었는데 시간이 촉박한 상태에서 API를 계속해서 받아 와야 하다 보니 any를 남발하는 상황이 자주 발생해 타입스크립트를 제대로 이해하지 못했었다.
그런 사람들을 위해 [cheatsheets](https://www.typescriptlang.org/cheatsheets/)를 제공하지만 이해가 부족하면 여기서 변수가 발생하게 될 시 타입스크립트를 사용할 수 없기 때문에
깊은 이해가 필요하다.

## 6. 타입은 집합이다.
다른 타입을 포함하는 타입을 슈퍼 타입(부모 타입) 이라고 부르며 반대는 서브 타입(자식 타입) 이라고 부른다 이 관계를 계층처럼 표시하면 타입 계층도가 완성된다.
### 1.  타입 호환성
A와 B 두개의 타입이 존재할 때 A 타입의 값을 B 타입으로 취급해도 괜찮은지 판단하는 것을 의미한다. 타입스크립트에서는 슈퍼 타입의 값을 서브 타입을 취급하는 것을 허용하지 않고 반대의 경우는 허용한다.
![](../../../static/img/한%20입%20크기로%20잘라먹는%20타입스크립트/04/01.webp)

## 7. 타입 계층도와 함께 기본타입 살펴보기
![](../../../static/img/한%20입%20크기로%20잘라먹는%20타입스크립트/04/02.webp)
- unknown : 모든 타입의 부모 타입이기 때문에 모든 타입은 unknown 타입으로 업 캐스팅 가능하다.
- never: 모든 타입의 자식 타입이기 때문에 값이 존재할 수 없고, 모든 타입으로 업 캐스팅 가능하다. 해당 타입이 불가능함을 표현할 때 사용한다.
- void:  undefined와 never 인 자식 타입을 가지기 때문에 해당 타입 외에 다른 값을 할당할 수 없다.
- any: 타입 검사를 무시하는 특수한 타입으로 never을 제외한 모든 타입으로의 업 캐스팅과 다운 캐스팅이 가능하다.

## 8. 과제
![](../../../static/img/한%20입%20크기로%20잘라먹는%20타입스크립트/04/03.webp)


**출처** : [한 입 크기로 잘라먹는 타입스크립트 - 이정환](https://www.inflearn.com/course/%ED%95%9C%EC%9E%85-%ED%81%AC%EA%B8%B0-%ED%83%80%EC%9E%85%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8/dashboard)
