---
sidebar_position: 1
title: "1장: 리액트 개발을 위해 꼭 알아야 할 자바스크립트"
description: 리액트 개발을 위해 꼭 알아야 할 자바스크립트
authors: [MtypEyuc]
tags: [React]
hide_table_of_contents: false
---


## 동등 비교
### 자바스크립트에서의 동등 비교
#### 자바스크립트의 데이터 타입
데이터 타입을 구분하는 가장 큰 차이점은 값을 저장하는 방식이며 이 방식의 차이가 동등 비교를 할 때 차이를 만드는 원인이 된다.  
원시타입은 불변형의 값으로 저장되며, 이 값은 변수 할당 시점에 메모리 영역을 차지하고 저장된다. 객체는 프로퍼티를 삭제, 추가,   
수정할 수 있으므로 원시의 값과 다르게 변경 가능한 형태로 저장되며, 값을 복사할 때도 값이 아닌 참조를 전달하게 된다. 

- 원시 타입  
  ○ boolean  
  ○ null  
  ○ undefined  
  ○ number  
  ○ string  
  ○ symbol  
  ○ bigint 

````javascript
//느슨한 비교
console.log(5 == "5");  // true
console.log(0 == false); // true
console.log(null == undefined); // true

//엄격한 비교
let bar1 = 'hello world'
let bar2 = bar1
console.log(bar1 === bar2) // true
````

- 객체 타입  
  ○ object
```javascript
var foo1 = {
    bar: 'hello',
}

var foo2 = {
    bar:'hello',
}

console.log(foo1 ===foo2) //false

console.log(foo1.bar ===foo2.bar) //true
```
- Object.is()와 ===의 차이점  
```javascript
//NaN 비교
console.log(NaN === NaN); // false
console.log(Object.is(NaN, NaN)); // true

const value = NaN;
console.log(value === NaN); // false
console.log(Object.is(value, NaN)); // true


//+0 vs -0 비교
console.log(+0 === -0); // true
console.log(Object.is(+0, -0)); // false

const balance = -0;
if (Object.is(balance, -0)) {
  console.log("Negative zero detected!");
}

```
변수를 비교하거나 음수를 구별해야 하는 상황에 유용하게 쓰인다.

### 리액트에서의 동등 비교

- object.is() 활용
```tsx
import { useState } from "react";

function App() {
  const [count, setCount] = useState(0);

  console.log(Object.is(count, -0)); // 함수를 호출하면 Object.is(0, -0) 비교가 수행됨 0 !== -0이므로 리렌더링 발생

  return (
    <div>
      <button onClick={() => setCount(-0)}>Set -0</button>
    </div>
  );
}

```
변수와 함수에 조건식을 붙여 다양한 방식으로 활용이 가능하다.

- shallowEqual() 개념  
1 depth(객체의 속성값이 원시값) 까지의 비교가 가능해진다.  
2 depth(객체안의 다른 객체) 의 경우 `false`를 반환한다.
```tsx
import React from "react";
//memo를 사용해서 느슨한 비교를 수행하고 비교 후 신규 데이터 입력시(false) 렌더링.
const MyComponent = React.memo(({ data }) => {
  console.log("Rendered!");
  return <div>{data.hello}</div>;
});

export default function App() {
  const obj1 = { hello: "world" };
  const obj2 = { hello: "world" };

  return (
    <>
      <MyComponent data={obj1} /> {/* 최초 렌더링 */} //true
      <MyComponent data={obj2} /> {/* 주소가 다르기 때문에 리렌더링 */} //false
      <MyComponent data={{ hello: "world" }} /> {/* 새로운 객체 → 렌더링 발생 */} //false
    </>
  );
}

```

## 함수

### 함수 선언문
값이 표현되지 않았기 때문에 표현식이 아닌 일반문으로 분류되며, 선언 전에 호출이 가능하고 function 키워드를 사용해 별도로 선언한다.
```javascript
hello(); //정상 실행

function hello() {
  console.log('hello world')
}

hello(); //정상 실행
```


### 함수 표현식

```javascript
hello(); //오류 발생 (Cannot access 'hello' before initialization)

const hello = function () {
  console.log('hello world')
}

hello(); //정상 실행
```
변수를 선언하고 함수를 값으로 할당하며 선언 후에만 호출이 가능하다. 표현식은 함수 내부에서만 유효한 식별자이기 때문에 가독성을 위해 이름을 붙이지 않는다.

### 화살표 함수

```javascript
const hello = () => {
  console.log("Hello, world!");
};

hello(); // 정상 실행
```
ES6에서 새롭게 추가된 함수 생성방식으로, function 대신 => 화살표를 사용해서 코드 길이를 줄여 간결하게 표현하였다.

```javascript
const person = {
  name: "Alice",
  sayHello: () => {
    console.log(`Hello, ${this.name}`);
  }
};

person.sayHello(); // Hello, undefined
```
`this`가 필요한 객체 메서드에는 부적합하다.

```javascript
const func = () => {
  console.log(arguments);
};

func(1, 2, 3); // ReferenceError: arguments is not defined
```

```javascript
const func = (...args) => {
  console.log(args);
};

func(1, 2, 3); // [1, 2, 3]
```
arguments 객체를 지원하지 않는다.
```javascript
import React, { Component } from "react";

class App extends Component {
  state = {
    count: 0,
  };

  render() {
    return (
      <div>
        <h1>Count: {this.state.count}</h1>
        <button onClick={() => this.setState({ count: this.state.count + 1 })}>
          +
        </button>
      </div>
    );
  }
}

export default App;
```
화살표 함수를 사용하면 `this`를 별도로 바인딩 할 필요 없이 사용가능하기 때문에 안정적으로 `setState`를 호출할 수 있다.

### 다양한 함수 살펴보기

- 즉시 실행 함수: 함수를 정의하고 그 순간 실행되는 함수이며 재호출이 불가능하다. 이 특성을 이용해서 독립적 함수 스코프를 운용할 수 있다.
```javascript
(function () {
  console.log("hello world");
})();

(() => {
  console.log("hello world");
})();
```
- 고차 함수: 함수를 인수로 받거나 새로움 함수를 반환시킬 수 있다.  리액트에서는 컴포넌트를 인수로 받아 새로운 함수 컴포넌트로 반환한다.
```javascript
const squares = numbers.map(num => num * num);
console.log(squares); // [1, 4, 9, 16, 25]

const evens = numbers.filter(num => num % 2 === 0);
console.log(evens); // [2, 4]
```

```javascript
function applyOperation(a, b, operation) {
  return operation(a, b);
}

function add(x, y) {
  return x + y;
}

function multiply(x, y) {
  return x * y;
}

console.log(applyOperation(5, 3, add)); // 8
console.log(applyOperation(5, 3, multiply)); // 15
```


- 함수를 만들 때 주의사항  
○ 함수의 부수 효과를 최대한 억제하라. (외부에 끼치는 영향을 억제하고 실행 결과를 예측가능하게 만들어야 한다.)  
○ 코드의 길이를 줄여라. 하나의 함수가 너무 많은 일을 하지 않아야 함수의 원래 목적인 재사용성을 높일 수 있다.  
○ 함수의 이름을 간결하고 이해하기 쉽게 만들어라.

## 클래스
생성자, 속성, 함수를 모아 정의하는 템플릿이며 하나만 존재할 수 있다.

```javascript
class Person {
  constructor(name, age) {
    this.name = name; 
    this.age = age;   
  }
}

const alice = new Person("Alice", 25);
console.log(alice.name); // "Alice"
console.log(alice.age);  // 25
```

### getter 와 setter
클래스의 속성값을 안전하게 읽고 수정할 수 있게 만들어 주는 메서드이다.
- `getter`: 
클래스에서 무언가 값을 가져올 때 사용한다.
- `setter`: 클래스 필드에 값을 할당할 때 사용한다.
```javascript
class Person {
  constructor(name) {
    this._name = name; 
  }

  get name() {
    return this._name.toUpperCase(); 
  }

  set name(newName) {
    if (newName.length < 3) {
      console.log("이름은 3글자 이상이어야 합니다.");
      return;
    }
    this._name = newName;
  }
}

const user = new Person("Tom");
console.log(user.name); // "TOM"

user.name = "Al"; // "이름은 3글자 이상이어야 합니다."
user.name = "Alice"; // 정상적으로 변경
console.log(user.name); // "ALICE"
```

### 인스턴스 메서드
클래스의 인스턴스에서만 호출 가능하고, 각 인스턴스마다 고유한  상태와 매서드가 존재한다. `this`를 참조하여 인스턴스의 프로퍼티를 참조하거나 변경이 가능하다.
```javascript
class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }

    greet() {
        console.log(`안녕하세요, 저는 ${this.name}이고, ${this.age}살입니다.`);
    }
}
const person = new Person("Alice", 25);
person.greet(); // "안녕하세요, 저는 Alice이고, 25살입니다."
```
- 프로토타입 체이닝
```javascript
// 부모 객체
const person = {
  firstName: "John",
  lastName: "Doe",
  fullName() {
    return `${this.firstName} ${this.lastName}`;
  }
};

// 자식 객체 (person을 상속)
const employee = Object.create(person);
employee.jobTitle = "Developer";

// 자식 객체에서 프로퍼티 찾기
console.log(employee.firstName);  // "John" (person에서 상속)
console.log(employee.jobTitle);   // "Developer" (employee에서 직접 정의)
console.log(employee.fullName()); // "John Doe" (person의 메서드 호출)
```
객체의 속성을 탐색할 때 먼저 현제 객체에서 찾고 없다면 `null`에 도달할때까지 객체를 참조하는 상위 객체에서 찾는다.

### 정적 메서드
클래스의 인스턴스가 아닌 이름으로 호출할 수 있는 메서드. `this`를 참조할 수 없지만 여러 곳에서 사용 가능하다.
```javascript
class Person {
  constructor(name) {
    this.name = name;
  }

  // 인스턴스 메서드
  greet() {
    console.log(`Hello, my name is ${this.name}`);
  }

  // 정적 메서드
  static sayHello() {
    console.log(`Hello from ${this.name}`); // 에러! 'this'는 클래스 자체를 가리킴
  }
}

const person1 = new Person("Alice");
person1.greet();  // 정상 호출: "Hello, my name is Alice"
Person.sayHello(); // 에러 발생: 'this.name'이 undefined
```


### 상속 
기존 클래스에서 상속 받아 자식 클래스에서 확장하는 방식으로 사용된다.
```javascript
// 부모 클래스
class Animal {
  constructor(name) {
    this.name = name;
  }

  speak() {
    console.log(`${this.name} makes a sound`);
  }
}


class Dog extends Animal {
  constructor(name, breed) {
    super(name); 
    this.breed = breed;
  }

  speak() {
    console.log(`${this.name} barks!`);
  }
}

const dog = new Dog("Buddy", "Golden Retriever");
dog.speak(); // "Buddy barks!"
console.log(dog.name); // "Buddy"
console.log(dog.breed); // "Golden Retriever"
```

## 클로저
함수가 자신을 포함하고 있는 함수의 외부 변수에 접근할 수 있는 환경을 구성할 수 있다.  
이를 사용하여 중요한 데이터 속성을 감추거나 콜백 함수와 비동기 등의 처리가 가능하다.
```javascript
function outer() {
  let outerVar = "I am outside!";

  function inner() {
    console.log(outerVar); // outer() 함수의 outerVar 변수에 접근
  }

  return inner; // inner 함수 반환
}

const closureFunc = outer(); // outer() 함수 실행 후 inner 함수 반환
closureFunc(); // "I am outside!" 출력
```

### 스코프
변수의 유효 범위를 뜻하며 선언된 범위만큼 사용할 수 있게 된다.

```javascript
let globalVar = "I am a global variable!"; // 전역 변수

function displayGlobalVar() {
  console.log(globalVar); // "I am a global variable!" 출력
}

displayGlobalVar();
console.log(globalVar); // "I am a global variable!" 출력
```
```javascript
function myFunction() {
  let localVar = "I am a local variable!"; // 함수 스코프 변수
  console.log(localVar); // "I am a local variable!" 출력
}

myFunction();
console.log(localVar); // ReferenceError: localVar is not defined
```
### 리액트에서 클로저 활용
함수 컴포넌트, 상태 관리, 이벤트 관리, 상태나 변수 값을 기억하거나 유지하는 것으로 사용된다.
```javascript
import React, { useState } from 'react';

function Calculator() {
  const [result, setResult] = useState(0);

  const handleClick = (operation) => {
    let currentValue = result; // 클로저로 상태 값을 기억

    return () => {
      if (operation === 'add') {
        currentValue += 5;  
      } else if (operation === 'subtract') {
        currentValue -= 3;  
      }

      setResult(currentValue);  // 상태 업데이트
    };
  };

  return (
          <div>
            <h1>Result: {result}</h1>
            <button onClick={handleClick('add')}>Add 5</button>
            <button onClick={handleClick('subtract')}>Subtract 3</button>
          </div>
  );
}

export default Calculator;
```
이전 상태를 기반으로 새로운 값을 계산할 수 있다.

## 이벤트 루프와 비동기 통신의 이해
자바스크립트는 싱글 스레드이기 때문에 함수가 동기식으로 순차적으로 수행된다. 하지만 이것은 처리 속도에 따라서 단점이 될 수 있기 때문에 
성능 향상과 사용자 경험 개선을 위해 각종 작업을 동시에 처리하는 비동기식으로 처리하기도 한다.
```javascript

console.log('Start');

setTimeout(() => {
  console.log('Timeout 1');
}, 0);

Promise.resolve().then(() => {
  console.log('Promise 1');
});

console.log('End');

```
동기 코드는 콜 스택에 들어가 순차적으로 실행된다.  
비동기 코드는 테스크 큐에 넣어두고, 콜 스택이 비었을 때 순차적으로 처리된다.


출력 결과 
> Start  
End  
Promise 1  
Timeout 1
## 리액트에서 자주 사용하는 자바스크립트 문법
### 구조 분해 할당
배열이나 객체의 속성을 분해하여 개별 변수에 할당할 수 있게 된다.

- 배열 구조 분해 할당
```jsx
function Profile({ user }) {
  const { name, age } = user;

  return (
    <div>
      <h1>{name}</h1>
      <p>Age: {age}</p>
    </div>
  );
}

const userInfo = { name: "Alice", age: 25 };


<Profile user={userInfo} />;
```
- 객체 구조 분해 할당
```jsx
const response = {
  data: {
    user: {
      id: 1,
      name: "Alice",
      email: "alice@example.com"
    }
  }
};

const {
  data: {
    user: { id, name, email }
  }
} = response;

console.log(id);    // 1
console.log(name);  // Alice
console.log(email); // alice@example.com
```
### 전개 구문
배열 객체 등의 요소를 개별 값으로 펼쳐서 사용이 가능하며 배열 복사 및 병합, 객체 병합, 함수 인자 전달 등의 작업을 수행할 수 있다.
- 배열 전개 구문
```javascript
const numbers = [2, 3, 4];
const newNumbers = [1, ...numbers, 5];

console.log(newNumbers); // [1, 2, 3, 4, 5]
```
```javascript
const arr = [1, 2, 3, 3, 4, 5, 5];

const uniqueArr = [...new Set(arr)]; 

console.log(uniqueArr); // [1, 2, 3, 4, 5]
```
- 객체 전개 구문
```javascript
const user = { name: "Alice", age: 25 };

const updatedUser = { ...user, age: 30 };

console.log(updatedUser); // { name: "Alice", age: 30 }
```
### 객체 초기자
객체를 선언할 때 객체에 넣고자 하는 키와 값을 가지고 있는 변수가 이미 존재한다면 해당 값을 간결하게 넣어줄 수 있다.
```javascript
const person = {
  name: "Alice",
  age: 25,
  job: "Developer"
};

console.log(person.name); // "Alice"
console.log(person.age); // 25
console.log(person.job); // "Developer"
```
별도의 작업을 거치지 않고 간편하게 사용할 수 있기 때문에 유용하다.

### Array 프로토타입의 메서드: map, filter, reduce, forEach
배열을 사용해서 원하는 값을 불러오는 특성상 `mpp, filter, reduce` 메서드가 자주 사용된다. 기존 값을 건드리지 않고 새로운 값을 만들어 내기 때문에
안전하게 사용할 수 있다. `forEach`는 배열을 순회하며 콜백 함수를 실행하기만 하는 메서드이다.
```javascript
const users = [
  { name: "Alice", age: 25 },
  { name: "Bob", age: 17 },
  { name: "Charlie", age: 30 }
];


const adultNames = users
  .filter(user => user.age >= 18) // [{ name: "Alice", age: 25 }, { name: "Charlie", age: 30 }]
  .map(user => user.name);        // ["Alice", "Charlie"]

console.log(adultNames); // ["Alice", "Charlie"]
```
`filter + map` 조합 : 코드 가독성이 높다. 두 번 순회하고 값을 불러온다.
```javascript
const adultNames = users.reduce((acc, user) => {
  if (user.age >= 18) {
    acc.push(user.name);
  }
  return acc;
}, []);

console.log(adultNames); // ["Alice", "Charlie"]
```

`reduce`:  코드 가독성이 떨어지지만 한 번 순회하여 값을 불러오기 때문에 성능이 높아진다.

```javascript
const numbers = [1, 2, 3, 4, 5];

numbers.forEach((num, index) => {
  console.log(`Index ${index}: ${num}`);
});

// forEach 사용 (변경 불가능)
const result1 = numbers.forEach(num => num * 2);
console.log(result1); // undefined

// map 사용 (새 배열 반환)
const result2 = numbers.map(num => num * 2);
console.log(result2); // [2, 4, 6, 8, 10]
```
### 삼항 조건 연산자
단순값을 할당할 때 사용하며 `true/false`를 판별할 수 있는 조건문이 들어가고 물음표 뒤에는 반환할 값을 지정한다. 예측하기 쉬운 코드가 중요하기 때문에 가급적이면 중첩하지 않는것이 좋다.  
```javascript
const age = 18;
const status = age >= 18 ? "성인" : "미성년자";

console.log(status); // "성인"

// 간결한 방식

const num = 10;
const result = num % 2 === 0 ? "짝수" : "홀수";

console.log(result); // "짝수"
```
## 선택이 아닌 필수, 타입스크립트
### 리액트 코드를 효과적으로 작성하기 위한 타입스크립트 활용법
- `any` 대신 `unknown` 사용하기  
`any`는 타입 검사를 무시하지만 `unknown`은 사용하기 전에 타입 검사를 강제하기 때문에 예상치 못한 버그를 막을 수 있다.
```typescript
let value: any;

value = "Hello";
value = 42;
value = true;

const length: number = value.length; // 런타임 오류 가능
```
```typescript
let value: unknown;

value = "Hello";
value = 42;
value = true;

if (typeof value === "string") {
  const length: number = value.length; // 안전하게 사용 가능
}
```

- 타입 가드를 적극 활용하자  
`if (typeof value ===...)` `if (var instanceof...)` `if ("var" in ...)` `if (isVar(value))` 처럼 조건문과 함께 사용해 타입을 좁히는 표현들을 타입 가드라고 부른다.
이를 활용하면 타입을 효과적으로 좁힐 수 있어 조금 더 명확하게 변수나 함수를 사용할 수 있다.
- 제네릭  
제네릭을 사용하는 함수형 컴포넌트를 만들어 다양한 타입의 속성을 받아올 수 있다. 재사용성이 높아지고 타입 안정성이 증가한다.
```tsx
function identity<T>(arg: T): T {
  return arg;
}

console.log(identity<string>("Hello")); // "Hello"
console.log(identity<number>(42));      // 42
```
```tsx
import React from "react";

type ListProps<T> = {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
};

const List = <T,>({ items, renderItem }: ListProps<T>) => {
  return (
    <ul>
      {items.map((item, index) => (
        <li key={index}>{renderItem(item)}</li>
      ))}
    </ul>
  );
};

export default function App() {
  return (
    <>
      <List 
        items={["Apple", "Banana", "Cherry"]} 
        renderItem={(item) => <strong>{item}</strong>} 
      />
      
      <List 
        items={[1, 2, 3]} 
        renderItem={(item) => <span>{item * 10}</span>} 
      />
    </>
  );
}
```
- 인덱스 시그니처  
객체의 키와 값에 제약을 걸어 안정성을 높일 수 있고 동적으로 속성을 추가해서 유연한 코드를 작성할 수 있다.
```typescript
interface Product {
  [key: string]: string | number;  
}

const item: Product = {
  name: "Laptop",
  price: 999.99,
  stock: 100
};

item.color = "Black";  // 동적으로 새로운 속성 추가 가능
console.log(item.color); // "Black"
```
- 덕 타이핑을 활용한 타입 추론  
객체의 타입 이름보다 구조를 통해 타입을 판별하는 방식으로 특정 프로퍼티를 가지고 있으면 그 타입으로 취급하는 방식으로 동작한다.
```typescript
interface Car {
  brand: string;
  model: string;
  year: number;
}

const car: Car = {
  brand: "Toyota",
  model: "Corolla",
  year: 2021,
};

const carKeys = Object.keys(car) as (keyof Car)[];
console.log(carKeys); // ["brand", "model", "year"]
```
### 타입스크립트 전환 가이드
- [공식 문서](https://www.typescriptlang.org/ko/docs/handbook/tsconfig-json.html)

## 작성하며 느낀 점
- 좋았던 점 : 리액트 개발을 위한 필수적인 개념을 학습하게 되었다. 여러가지 개념을 알게 된 것이 좋았다.


- 배운 점 : 객체의 타입 비교, 함수 표현 방식, 코드 실행 순서 등을 배웠다.


- 부족했던 점 : 정형화된 코드만을 기계적으로 작성하다 보니 실제로 만드는 것에 문제가 있었다. 


- 다음 목표 : 리액트에서 자주 사용하는 문법의 예시를 사용해 볼 것이다.