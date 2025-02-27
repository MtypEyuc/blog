---
sidebar_position: 3
title: "3장: 고급 타입"
description: 고급 타입
authors: [MtypEyuc]
tags: [typescript]
hide_table_of_contents: false
---

## 들어가기 전에
2장에서 배운 내용으로 객체타입이 아닌 것을  원시 타입과 고급 타입으로 나눌 수 있다.

| **분류**      | **타입**      | **설명**                  |
|--------------|-------------|-------------------------|
| **원시 타입** | `string`    | 문자열                     |
|              | `number`    | 숫자                      |
|              | `boolean`   | 참/거짓                    |
|              | `bigint`    | 큰 정수                    |
|              | `symbol`    | 고유한 값                   |
|              | `null`      | 값이 없음                   |
|              | `undefined` | 정의되지 않음                 |
| **고급 타입** | 교차타입        | 둘 이상의 타입을 만족하는 객체를 생성   |
|              | 유니온 타입      | 여러 타입 중 하나의 타입을 가질 수 있음 |
|              | 인덱스 시그니처    | 키와 값을 지정할 수 있음          |
|              | 인덱스 엑세스 타입 | 객체나 배열에서 속성의 타입을 추출     |
|              | 맵드 타입  | 객체의 모든 속성을 변환 가능        |
|              | 템플릿 리터럴 타입  | 동적 타입 생성                |
|              | 제네릭  | 타입을 매개변수로 받고 재사용 가능     |


하지만 이 외에도 특정 목적을 가지고 사용하는 특수한 타입들이 존재하는데 `enum`, `array`, `never`, `void`, `unknown`, `any` 등과 같은 타입들을 말한다.

### any 타입

자바스크립트에 존재하는 모든 값을 오류 없이 받을 수 있다.
```ts
let value: any;

value = 42;       // number
value = "hello";  // string
value = true;     // boolean
value = {};       // object
value = null;     // null
value = undefined; // undefined

// `any` 타입의 변수는 어떤 메서드나 속성도 호출할 수 있음
value.someMethod();  // 에러 없음
value.toUpperCase(); // 에러 없음
```
주로 개발 단계에서 임시로 값을 지정하거나 어떤 값을 받아올지 또는 넘겨줄지 정할 수 없을 때 암묵적으로 사용하게 된다.

```ts
async function fetchData(url: string): Promise<any> {
  const response = await fetch(url);
  const data = await response.json();
  return data;  // any 타입을 반환
}

async function getUserInfo() {
  const url = "https://jsonplaceholder.typicode.com/users/1";
  const data = await fetchData(url);

  console.log(data.name);  // `any` 타입이라 타입 검사가 없음
  console.log(data.email); // `any` 타입이라 타입 검사가 없음
}
```

### unknown 타입
`any`와 유사하게 작동해 어떤 타입도 뱐수에 할당 가능하지만 할당 전 타입 검사를 실행하기 때문에 안정성을 보장한다. 타입 검사를 하지 않는 `any` 타입에는 할당 가능하다.
```ts
let value: unknown = "Hello";

console.log(value.toUpperCase());  // Object is of type 'unknown'

// 타입 검사를 거친 후 사용 가능
if (typeof value === "string") {
  console.log(value.toUpperCase());  // 정상 작동
}
```
### void 타입
함수가 어떤 값을 반환하지 않는 경우 지정하여 사용한다.
```ts
function fetchData(callback: (data: string) => void): void {
  const data = "Hello, World!";
  callback(data);  
}

fetchData((data) => {
  console.log(data);  
});
```
### never 타입
함수가 값의 반환이 불가능한 경우 지정하여 사용한다. 에러를 던지거나 무한 루프를 실행하는 경우에 해당.
```ts
function throwError(message: string): never {
  throw new Error(message);
}

throwError("Something went wrong!");
```
```ts
function infiniteLoop(): never {
    while (true) {
        console.log("This will run forever...");
    }
}

infiniteLoop();
```
### array 타입
타입스크립트에서 배열은 특별한 객체로써 여러 타입을 적용하거나 길이를 고정시킬 수 있다.
```ts
let tuple: [string, number, boolean] = ["hello", 42, true];
```
```ts
const [items, setItems] = useState<string[]>(['apple', 'banana', 'cherry']);
```
### enum 타입
상수 값을 관리할 때 사용한다. 상수를 그룹화 하고 이름을 붙여 가독성을 높이고 유지보수를 용이하게 한다. 비즈니스 로직이나 상태 관리가 필요한 곳이 사용함.
```ts
enum Role {
  Admin = 'ADMIN',
  User = 'USER',
  Guest = 'GUEST'
}

function assignRole(role: Role) {
  if (role === Role.Admin) {
    console.log('Admin role assigned');
  } else if (role === Role.User) {
    console.log('User role assigned');
  } else {
    console.log('Guest role assigned');
  }
}

assignRole(Role.User);
```

### 교차 타입 
두 개 이상의 타입을 결합해 하나의 타입을 생성한다.
```typescript
type Person = {
    name: string;
    age: number;
};

type Address = {
    city: string;
    country: string;
};

type PersonWithAddress = Person & Address;
```
### 유니온 타입
여러 타입을 결합해 타입 중 하나를 가지게 한다.
```typescript
type ApiResponse = { status: "success", data: string } | { status: "error", message: string };

function handleResponse(response: ApiResponse): void {
    if (response.status === "success") {
        console.log("Data: " + response.data);
    } else {
        console.log("Error: " + response.message);
    }
}

handleResponse({ status: "success", data: "Data loaded successfully!" });  
handleResponse({ status: "error", message: "Failed to load data!" });      
```
### 인덱스 시그니처 
객체가 가질수 있는 키를 동적으로 정의하고 값에 특정한 타입을 지정할 수 있다.
```typescript
interface StringDictionary {
  [key: string]: string;
}

const dictionary: StringDictionary = {
  "name": "Alice",
  "age": "25"
};

dictionary["city"] = "New York";  
```
### 인덱스 엑세스 타입
다른 타입의 특정 속성이 가지는 타입을 조회할 수 있다. 이를 이용해 동적으로 타입을 추출하여 사용할 수 있다.
```typescript
type ObjectType = {
  name: string;
  age: number;
};

type NameType = ObjectType["name"];  

type AgeType = ObjectType["age"];   
```

### 맵드 타입
다른 타입을 기본으로 한 타입을 선언할 때 사용된다.
```typescript
interface Person {
  name: string;
  age: number;
}

type PartialPerson = {
  [K in keyof Person]?: Person[K];
};
```
```typescript
{
  name?: string;
  age?: number;
}
```
인덱스 시그니처 문법을 사용해 반복적인 타입 선언을 효과적으로 줄일 수 있다.
### 템플릿 리터럴 타입
문자열 리터럴 타입을 선언할 수 있다. 타입을 동적으로 만들고 유연성을 높인다.
```typescript
const isPrimary = true;

const buttonStyle = `
  background-color: ${isPrimary ? "blue" : "gray"};
  color: white;
  font-size: 16px;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
`;

console.log(buttonStyle);
```

### 제네릭
코드의 재사용성을 높이기 위해 사용된다.`<>` 안에 **T (Type)**, **E (Element)**, **K (Key)**, **V (Value)** 등의 한 글자로 된 이름을 많이 사용한다. 타입을 명시하지 않으면 컴파일러가 타입을 추론한다.
```typescript
function identity<T>(value: T): T {
  return value;
}
const numberResult = identity(123);  
const stringResult = identity("Hello");  
```
주로 `API`를 받아올 때 사용된다.
```typescript
interface ApiResponse<T> {
  data: T;
  status: string;
  message: string;
}

async function fetchUserData(): Promise<ApiResponse<User>> {
  const response = await fetch('https://api.example.com/user/1');
  const data = await response.json();
  return {
    data,
    status: 'success',
    message: 'User data fetched successfully',
  };
}

async function fetchProductData(): Promise<ApiResponse<Product>> {
  const response = await fetch('https://api.example.com/product/1');
  const data = await response.json();
  return {
    data,
    status: 'success',
    message: 'Product data fetched successfully',
  };
}
```

## 작성하며 느낀 점
- 좋았던 점 : 안전하게 타입 검사를 실행할 수 있는 방법을 알게 되었다.


- 배운 점 : 특수 타입과 고급 타입에 대해 배우고 예제를 통해 이해가 높아지게 되었다.


- 부족했던 점 : 익숙하지 않은 타입이 많아서 작성에 시간이 걸렸다.


- 다음 목표 : 타입을 확장하는 방법에 대해 알아볼 것이다.