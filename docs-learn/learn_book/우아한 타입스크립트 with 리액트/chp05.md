---
sidebar_position: 4
title: "5장 타입 활용하기"
description: 타입 활용하기
authors: [MtypEyuc]
tags: [typescript]
image: https://i.imgur.com/mErPwqL.png
hide_table_of_contents: false
---

## 1. 조건부 타입
조건에 따라 다른 타입의 형태를 반환해야 할 때 사용한다.`Condition ? A : B` 삼항 연산자의 형태를 가진다. 중복되는 타입 코드를 제거하고 정확한 타입 추론을 할 수 있다.
### 1. extend와 제네릭을 활용한 조건부 타입
`T extends U ? X : Y` 타입 `T`를 `U`에 할당할 수 있으면 `X` 타입, 아니면 `Y` 타입으로 결정됨을 의미한다.
- 제너릭을 활용해 넘길 수 있는 값을 제한한다.
```typescript
interface Bank {
financialCode: string;
companyName: string;
name: string;
fullName: string;
}

interface Card {
    financialCode: string;
    companyName: string;
    name: string;
    appCardType?: string;
}
type PayMethod<T> = T extends "card" ? Card : Bank;
type CardPayMethodType = PayMethod<"card">;
type BankPayMethodType = PayMethod<"bank">;
```
- 제네릭을 사용해 타입을 제한하고 `extend`를 사용해 제네릭이 받을 수 있는 타입을 제한한다.
```typescript
type PayMethodType<T extends "card" | "appcard" | "bank"> = T extends
| "card"
| "appcard"
? Card
: Bank;
export const useGetRegisteredList = <T extends "card" | "appcard" | "bank">(
type: T
): UseQueryResult<PayMethodType<T>[]> => {
const url = `baeminpay/codes/${type === "appcard" ? "card" : type}`;
const fetcher = fetcherFactory<PayMethodType<T>[]>({
onSuccess: (res) => {
const usablePocketList =
res?.filter(
(pocket: PocketInfo<Card> | PocketInfo<Bank>) =>
pocket?.useType === "USE"
) ?? [];
return usablePocketList;
},
});
const result = useCommonQuery<PayMethodType<T>[]>(url, undefined, fetcher);
return result;
};
```

### 2. infer를 활용해서 타입 추론하기
`extend` 사용시 `infer` 키워드를 사용해 특정 타입을 추론해 새로운 타입으로 사용할 수 있다. 어떤 값을 넘겨받을지 알 수 없을 때 사용하며, 타입스크립트가 추론한 값을 받고 반환한다.

`type Example<T> = T extends infer U ? U : never;` 의 삼항 연산자 형태로 `T`의 타입을 `U`로 추론하고 반환한다.
```typescript
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : never;

function getNumber(): number {
  return 42;
}

type Num = ReturnType<typeof getNumber>; // Num = number
```


## 2. 템플릿 리터럴 활용하기
가독성과 생산성을 향상시키고, 재사용성을 높여 유지보수가 용이해진다.
```typescript
type HeaderTag = "h1" | "h2" | "h3" | "h4" | "h5";
```
```typescript
type HeadingNumber = 1 | 2 | 3 | 4 | 5 ;
type HeaderTag = `h${HeadingNumber}`;
```
```typescript
type Direction =
  | 'top'
  | 'topLeft'
  | 'topRight'
  | 'bottom'
  | 'bottomLeft'
  | 'bottomRight';

type Vertical = 'top' | 'bottom';
type Horizon = 'left' | 'right';

type Direction2 = Vertical | `${Vertical}${Capitalize<Horizon>}`;
```

## 3. 커스텀 유틸리티 타입 활용하기
### 1. PickOne 유틸리티 함수
4장에서 보았던 서로 다른 객체를 유니온 타입으로 받았을 때의 문제점을 고칠 수 있다.
```typescript
type Card = {
card: string
};
type Account = {
account: string
};
function withdraw(type: Card | Account) {
///...
}
withdraw({ card: "hyundai", account: "hana" })
```
- 판별자 사용시 불편함이 생긴다.
```typescript
type Card = {
type: "card";
card: string;
};
type Account = {
type: "account";
account: string;
};
function withdraw(type: Card | Account) {
///...
}
withdraw({ type: "card", card: "hyundai" });
withdraw({ type: "account", account: "hana" })
```
- pickOne 사용시 객체의 여러 속성중 하나만 받아오게 제한할 수 있다.
```typescript
type Card = {
card: string
};
type Account = {
account: string
};
type CardOrAccount = PickOne<Card & Account>;
function withdraw (type: CardOrAccount) {
    ///...
}
withdraw({ card: "hyundai", account: "hana" }); 
```
### 2. NonNullable 타입 검사 함수를 사용하여 간편하게 타입가드 하기
타입에서 `null`과 `undefined`를 제거해 안전한 값을 처리할 수 있다.
```typescript
async function main() {
    const results = await Promise.all([fetchData1(), fetchData2()]);

    // 🔹 NonNullable을 사용하여 null | undefined 제거
    const filteredResults: NonNullable<typeof results[number]>[] = results.filter(
        (value): value is NonNullable<typeof value> => value !== null && value !== undefined
    );

    console.log(filteredResults); // ✅ 항상 값이 존재하는 배열
}

main();
```
## 4. 불변 객체 타입으로 활용하기
상숫값을 가진 객체나 테마, 애니매이션 등의 전역으로 사용되는 객체를 관리할 때 타입을 사용해 안정성을 높일 수 있다.
컴포넌트에 디자인을 적용할 때 해당 컴포넌트에 들어갈 속성값을 제한할 수 있다.

```typescript
const theme = {
    colors: {
        primary: "#007bff",
        secondary: "#6c757d",
        success: "#28a745",
        danger: "#dc3545",
    },
} as const;

type ThemeColors = keyof typeof theme.colors;

function getColor(color: ThemeColors): string {
    return theme.colors[color];
}

console.log(getColor("primary")); // ✅ "#007bff"
console.log(getColor("random")); // ❌ Error! "random"은 허용되지 않음.
```
## 5. Record 원시 타입 키 개선하기
`Record<Key, Value>` 타입은 모든 문자열을 허용하기 때문에 잘못된 값이 들어가도 타입 검사를 통과할 수 있지만 유요하지 않은 키가 들어왔을 때 런타임 오류가 발생할 가능성이 생긴다.
- 옵셔널 체이닝 사용
`null` 또는 `undefined`에 접근할 가능성이 있는 경우 사용한다. 속성값을 일일이 지정해야 하는 번거로움이 생긴다.
```typescript
type Category = string;  // 무한한 string 값이 들어올 수 있음
interface Food {
    name: string;
}

const foodByCategory: Record<Category, Food[]> = {
    한식: [{ name: "제육덮밥" }, { name: "뚝배기 불고기" }],
    일식: [{ name: "초밥" }, { name: "텐동" }],
};

foodByCategory["양식"].map((food) => console.log(food.name)); //런타임 오류
foodByCategory["양식"]?.map((food) => console.log(food.name)); //런타임 오류를 발생시키지 않고 처리 가능
```
- 유닛 타입으로 변경
```typescript
type Category = "한식" | "일식";  
interface Food {
  name: string;
}

const foodByCategory: Record<Category, Food[]> = {
  한식: [{ name: "제육덮밥" }, { name: "뚝배기 불고기" }],
  일식: [{ name: "초밥" }, { name: "텐동" }],
};

foodByCategory["양식"].map((food) => console.log(food.name));  // 타입 오류 발생: '양식'은 'Category' 타입에 없음
```

- Partial 사용 `null` 또는 `undefined`에 접근할 가능성이 있는 경우 사용한다. 옵셔널 체이닝만 사용하는 경우와 다르게 메세지를 발생시킨다.
```typescript
type PartialRecord<K extends string, T> = Partial<Record<K, T>>;

const foodByCategory: PartialRecord<Category, Food[]> = {
  한식: [{ name: "제육덮밥" }, { name: "뚝배기 불고기" }],
  일식: [{ name: "초밥" }, { name: "텐동" }],
};

foodByCategory["양식"].map((food) => console.log(food.name));  // 오류 발생: "Object is possibly 'undefined'"
foodByCategory["양식"]?.map((food) => console.log(food.name));  // 안전하게 처리
```

## 글을 쓰고 느낀 점

좋았던 점: Record 타입을 사용해 처리하는 방법을 새로 배우게 되었다.

배운 점: 조건부 타입, 템플릿 리터럴, 커스텀 유틸리티 타입 등을 배웠다.

아쉬웠던 점: 5.5의 설명이 부족해 이해하는데 시간이 걸렸다.

향후 계획: 5장의 내용은 데이터를 호출할 때 자주 쓰인다고 하니 예제를 모아둘 것이다.

