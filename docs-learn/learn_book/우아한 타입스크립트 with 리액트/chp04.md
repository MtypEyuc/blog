---
sidebar_position: 4
title: "4장 타입 확장하기 좁히기"
description: 타입 확장하기 좁히기
authors: [MtypEyuc]
tags: [typescript]
image: https://i.imgur.com/mErPwqL.png
hide_table_of_contents: false
---

## 1.타입 확장하기
기본 제공 타입이나 사용자 정의 타입, 라이브러리 제공 타입 등의  이미 존재하는 타입을 바탕으로 새로운 타입을 만드는 것이다. 타입을 변형해 동적 타입을 만드는 고급 타입과 사용법이 다르다.

```typescript
interface BaseMenuItem {
itemName: string | null;
itemImageUrl: string | null;
itemDiscountAmount: number;
stock: number | null;
};

interface BaseCartItem extends BaseMenuItem {
    quantity: number;
}
```

```typescript
type BaseMenuItem = {
    itemName: string | null;
    itemImageUrl: string | null;
    itemDiscountAmount: number;
    stock: number | null;
};

type BaseCartItem = {
    quantity: number;
} & BaseMenuItem;
```

```typescript
interface EditableCartItem extends BaseCartItem {
    isSoldOut: boolean;
    optionGroups: SelectableOptionGroup[];
}

interface EventCartItem extends BaseCartItem {
 orderable: boolean;
}
```
요구사항에 의해 변동이 생길 때마다 필요한 타입으로 확장하여 생성한다. 코드 중복을 줄이고 명시적인 코드 형태로 만들 수 있다는 장점이 있다.

### 1. 교차 타입 확장

- extend
```typescript
interface A {
  x: string;
}

interface B {
  y: number;
}

type C = A & B;

interface D extends C {
  z: boolean;
}
```
- 유니온 조합
```typescript
interface Animal {
  name: string;
}

interface Dog {
  breed: string;
}

interface Cat {
  color: string;
}

type Pet = (Dog | Cat) & Animal;
```
- 제네릭 활용
```typescript
interface Base {
  id: number;
}

type ExtendWith<T> = Base & T;

interface User {
  name: string;
  age: number;
}

type ExtendedUser = ExtendWith<User>;
```


## 2.타입 좁히기 - 타입 가드
변수나 값이 특정 타입을 가지는지 확인해 코드 안정성을 높이는 방법이다. 컴파일 하면 타입 정보가 사라지기 때문에 `if`문을 사용해 처리할 수 없어, 자바스크립트 연산자를 사용해 처리한다.
### 1. typeOf
원시 타입을 좁히는 용도로 사용한다.
```typescript
function example(x: number | string) {
  if (typeof x === 'string') {
    console.log(x.toUpperCase());
  } else {
    console.log(x.toFixed(2));
  }
}

```
### 2. instanceOf
인스턴스화된 객체 타입을 판별할 때 사용한다.
```typescript
function Car(make, model, year) {
  this.make = make;
  this.model = model;
  this.year = year;
}
const auto = new Car('Honda', 'Accord', 1998);

console.log(auto instanceof Car);
// Expected output: true

console.log(auto instanceof Object);
// Expected output: true
```
### 3. in
객체의 속성 유무에 따라 boolean 값을 반환한다.
```tsx
interface BasicNoticeDialogProps {
noticeTitle: string;
noticeBody: string;
}
interface NoticeDialogWithCookieProps extends BasicNoticeDialogProps {
cookieKey: string;
noForADay?: boolean ;
neverAgain?: boolean ;
}
export type NoticeDialogProps =
| BasicNoticeDialogProps
| NoticeDialogWithCookieProps;

const NoticeDialog: React.FC<NoticeDialogProps> = (props) => {
    if ("cookieKey" in props) return <NoticeDialogWithCookie {...props} />;
    return <NoticeDialogBase {...props} />;
};
```
### 4. is
`A is B` 형식의 사용자 정의 타입 가드 A는 매개변수 이름이고 B는 타입이다. 값이 참일 경우 A의 타입을 B로 취급한다.
```typescript
function isString(value: number | string): value is string {
  return typeof value === 'string';
}

function example(value: number | string) {
  if (isString(value)) {
    console.log(value.toUpperCase());
  } else {
    console.log(value.toFixed(2));
  }
}
```
## 3.타입 좁히기 - 식별할 수 있는 유니온

```typescript
type ToastError = {
    type: "toast"; 
    errorCode: string;
    errorMessage: string;
    toastShowDuration: number;
};

type AlertError = {
    type: "alert"; 
    errorCode: string;
    errorMessage: string;
    onConfirm: () => void;
};

type ErrorFeedbackType = ToastError | AlertError;

const errorArr: ErrorFeedbackType[] = [
    { type: "toast", errorCode: '100', errorMessage: '토스트', toastShowDuration: 3000 },
    { type: "alert", errorCode: '200', errorMessage: '앨럿', onConfirm: () => {} }
];
```
유니온 타입을 교차 타입으로 사용하면 객체 타입을 구별할 수 없기 때문에 새로운 필드(판별자)를 추가하여 타입을 구분할 수 있게 만들어 주어야 한다. 판별자로 사용할 수 있는 타입은 리터럴 타입 또는 유닛 타입이어야 한다.

## 4. 완전성 검사
타입에 대한 철저한 분기 처리가 필요할 때 모든 케이스에 대해 타입을 검사해 안정성을 높이는 방법이다. 예상치 못한 런타임 에러를 방지하거나 요구사항 변경시 생길 수 있는 위험성을 줄일 수 있다.
```typescript
type Fruit = "apple" | "banana" | "orange";

function getFruitColor(fruit: Fruit): string {
  switch (fruit) {
    case "apple":
      return "red";
    case "banana":
      return "yellow";
    // "orange"는 처리되지 않음
  }
  // "orange"가 처리되지 않아서 컴파일 타임에 오류 발생
  return assertNever(fruit); // (apple, banana, orange)를 처리했는지 체크
}

function assertNever(value: never): never {
  throw new Error(`Unexpected value: ${value}`);
}
//Argument of type '"orange"' is not assignable to parameter of type 'never'.
```

## 작성하고 느낀 점

좋았던 점: 타입스크립트의 장점을 활용해 필요한 결과물을 만드는 과정이 보기 좋았다.

배운 점: 타입을 확장하거나 좁혀 분기 처리 하는 과정을 배웠다.

아쉬웠던 점: 내가 페이지를 만들 당시에 데이터를 받을 경우 타입 에러에 대한 처리를 하지 제대로 하지 않았었기 때문에 심화 과정의 이해가 어려웠다.

향후 계획: 조건문을 사용하여 타입을 활용하는 방법을 배울 것이다.