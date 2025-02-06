---
sidebar_position: 1
title: 타입
description: 타입
authors: [MtypEyuc]
tags: [typescript]
hide_table_of_contents: false
---

# 타입

## 강타입과 약타입
### 강타입
- 타입의 변환이 엄격해 서로 다른 타입과의 변환이 자동으로 이루어지지 않거나 제한적으로 허용됨.
````typescript
let num: number = 10;
let str: string = "20";

//console.log(num + str); // ❌ 오류: number와 string을 더할 수 없음

// 명시적 변환이 필요
console.log(num + Number(str)); // ✅ 30 (명시적 변환 후 연산)
````
### 약타입
- 타입의 변환이 자동으로 이루어져 코드가 유연해지지만 오류 발생 확률이 높음.
````javascript
let num = 10;
let str = "20";

console.log(num + str); // ❗ "1020" (자동 형 변환, 숫자가 문자열로 변환됨)
console.log(num - str); // ✅ -10 (문자열이 숫자로 변환됨)


````

| 특징    | 강타입                          | 약타입             |
|-------|------------------------------|-----------------|
| 엄격성   | 엄격함                          | 유연함             |
| 자동변환  | 없음 (명시적변환 필요)                | 있음 (암시적 변환)     |
| 안정성   | 높음                           | 낮을 가능성 있음       |
| 대표 언어 | TypeScript, Python, Java, C# | JavaScript, PHP |

## 타입스크립트의 계층 구조


TypeScript는 원시 타입과 객체 타입을 구분해서 안정성을 확보하고 예상치 못한 참조 문제를 해결할 수 있다고 한다.
하지만 이 말을 이해하려면 먼저 원시 타입과 객체 타입이 무엇인지 알아야 한다.

원시 타입과 객체 타입을 나누는 이유에는 메모리 처리 방식의 차이도 있지만 여기서는 값과 비교방식의 차이만 알아보자.

### 원시 타입
JavaScript의 원시타입과 동일하지만 TypeScript에서는 이를 명시적으로 지정할 수 있다.

| 타입       | 설명                          | 예제 코드 |
|-----------|-----------------------------|-----------|
| `number`  | 숫자 (정수, 부동소수점 포함) | `let num: number = 42;` |
| `string`  | 문자열                        | `let str: string = "Hello";` |
| `boolean` | 참/거짓 값                    | `let isDone: boolean = true;` |
| `null`    | 값이 없음(의도적)             | `let n: null = null;` |
| `undefined` | 값이 할당되지 않음           | `let u: undefined = undefined;` |
| `bigint`  | 큰 정수 값 (ES2020 이상)      | `let big: bigint = 9007199254740991n;` |
| `symbol`  | 고유한 값 생성 (ES2015 이상)  | `let sym: symbol = Symbol("key");` |

- 변수
````typescript
let age: number = 25;    // 숫자 타입
let name: string = "Alice"; // 문자열 타입
let isStudent: boolean = true; // 불리언 타입
````

### 객체 타입
TypeScript에서 객체 타입은 특정 속성과 해당 속성의 타입을 정의하여 구조적으로 타입을 검증할 수 있다.

| 개념            | 설명                                       | 예제 코드 |
|----------------|----------------------------------------|-----------|
| **기본 객체 타입** | `{ key: type }` 형태로 정의                 | `{ name: string; age: number }` |
| **선택적 속성**  | `?`를 사용하여 속성을 선택적으로 설정         | `{ name: string; age?: number }` |
| **읽기 전용 속성** | `readonly`를 사용하여 수정 불가              | `{ readonly id: number }` |
| **type 사용**    | 객체 타입을 별칭으로 정의                    | `type User = { name: string; age: number }` |
| **interface 사용** | 객체 타입을 정의 (확장 가능)                | `interface User { name: string; age: number }` |
| **extends**     | 인터페이스 확장                              | `interface Employee extends Person {}` |
| **인덱스 타입**  | 키를 동적으로 설정 가능                      | `{ [key: string]: string }` |
| **유니언 타입**  | 여러 타입 중 하나 가능                      | `let pet: Dog \| Cat;` |
| **인터섹션 타입** | 모든 속성을 포함해야 함                     | `let worker: Programmer & Designer;` |


- 배열
```typescript
let numbers: number[] = [1, 2, 3, 4, 5]; // 숫자 배열
let names: string[] = ["Alice", "Bob", "Charlie"]; // 문자열 배열
```

````typescript
let numbers: Array<number> = [1, 2, 3, 4, 5];
````

- 객체
````typescript
let person: { name: string; age: number; isStudent: boolean } = {
  name: "Alice",
  age: 25,
  isStudent: true
};
````
- 함수

(1) 매개변수와 반환값 타입 지정
````typescript
function add(a: number, b: number): number {
  return a + b;
}

console.log(add(10, 20)); // 30
// console.log(add(10, "20")); // ❌ 오류 발생
````
(2) 반환값이 없는 함수 (void 타입)
````typescript
function greet(name: string): void {
  console.log(`Hello, ${name}!`);
}

greet("Alice"); // "Hello, Alice!"
````
- 콜백 함수
````typescript
type MathOperation = (x: number, y: number) => number;

const multiply: MathOperation = (a, b) => a * b;

console.log(multiply(5, 3)); // 15
````

- 인터페이스
````typescript
interface Person {
  name: string;
  age: number;
  isStudent?: boolean; // 선택적 속성
}

const user: Person = {
  name: "Bob",
  age: 30
};
````
- 제너릭
```typescript
function identity<T>(value: T): T {
  return value;
}

console.log(identity<string>("Hello")); // "Hello"
console.log(identity<number>(42)); // 42
```
- 유니온
```typescript
let id: number | string; // 숫자 또는 문자열 가능
id = 123;
id = "ABC123";
```

## 작성하며 느낀 점
2~3 챕터를 흝어보며 가장 기본적인 내용을 정리하는 시간을 가져보았다.
Typescript에는 리엑트를 사용하여 API를 불러올 때 기계적으로 사용했던 타입보다 훨씬 많은 사용법이 존재했다.
해당 챕터를 읽으면서 타입에 대해 더 깊게 알아보는 시간을 가지게 되었으며 기초가 부족함을 많이 느꼈다.
알고 있는 것과 활용할 수 있는 것의 차이는 크기 때문에 여러가지 패턴을 실습하는 시간을 가져야 겠다고 생각했다.



