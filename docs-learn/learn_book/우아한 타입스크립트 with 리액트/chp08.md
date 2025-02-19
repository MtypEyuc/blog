---
sidebar_position: 7
title: "8장 JSX에서 TSX로"
description: JSX에서 TSX로
authors: [MtypEyuc]
tags: [typescript]
image: https://i.imgur.com/mErPwqL.png
hide_table_of_contents: false
---

## 1. 리액트 컴포넌트의 타입
### 1. 클래스 컴포넌트 타입

```ts
interface Component<P = {}, S = {}, SS = any> extends ComponentLifecycle<P, S, SS> {}
class Component<P, S> { }
class PureComponent<P = {}, S = {}, SS = any> extends Component<P, S, SS> { }
``` 
생명주기 메서드를 상속받으며  `Props`와 `state`를 제네릭 타입으로 지정해 안정성을 보장한다.


### 2. 함수 컴포넌트 타입
```ts
// 함수 선언을 사용한 방식
function Welcome(props: WelcomeProps): JSX.Element {}
```
````ts
// 함수 표현식을 사용한 방식 - React.FC 사용
const Welcome: React.FC<WelcomeProps> = ({ name }) => {};
````
````ts
// 함수 표현식을 사용한 방식 - React.VFC 사용
const Welcome: React.VFC<WelcomeProps> = ({ name }) => {};
````

```ts
// 함수 표현식을 사용한 방식 - JSX.Element를 반환 타입으로 지정
const Welcome = ({ name }: WelcomeProps): JSX.Element => {};
type FC<P = {}> = FunctionComponent<P>;
interface FunctionComponent<P = {}> {
// props에 children을 추가
(props: PropsWithChildren<P>, context?: any): ReactElement <any, any > | null;
propTypes?: WeakValidationMap<P> | undefined;
contextTypes?: ValidationMap<any> | undefined;
defaultProps?: Partial<P> | undefined;
displayName?: string | undefined;
}
type VFC<P = {}> = VoidFunctionComponent<P>;
interface VoidFunctionComponent<P = {}> {
// children 없음
(props : P, context?: any): ReactElement<any, any> | null;
propTypes?: WeakValidationMap<P> | undefined;
contextTypes?: ValidationMap<any> | undefined;
defaultProps?: Partial<P> | undefined;
displayName?: string | undefined;
}
```
FC 또는 VFC의 형태를 가장 많이 볼 수 있으며 18버전 이후 VFC가 삭제되고 React.FC에서 Children이 사라졌다. React.FC 또는 속성값을 반환해야 사용할 수 있다.
### 3. Children props 타입 지정
```ts
type PropsWithChildren <P> = P & { children?: ReactNode | undefined };
// example 1 특정 문자열
type WelcomeProps = {
children : "천생연분" | "더 귀한 분" | "귀한 분" | "고마운 분";
};
// example 2 문자열
type WelcomeProps = {
children : string;
};
// example 3 JSX요소
type WelcomeProps = {
children : ReactElement;
};
```
Children에 대한 타입을 지정할 수 있고, 더 구체적으로 제한하는 것이 가능하다.
### 4. render 메서드와 함수 컴포넌트의 반환
#### 1. ReactElement
```tsx
interface ReactElement<P = any, T extends string | JSXElementConstructor<any> = string | JSXElementConstructor<any>> {
  type: T;   // 요소의 타입, 예를 들면 'div', 'button', 또는 컴포넌트 이름
  props: P;  // 해당 요소의 속성(props)
  key: Key | null;  // 리액트의 리스트 렌더링에서 사용되는 고유 키
}
```
리엑트에서 렌더링 가능한 항목을 나타내는 타입이다. JSX로 작성된 요소들이 React.createElement 를 통해 반환된 후 가상 DOM에서 ReactElement 형태로 저장된다.
#### 2. JSX.Element
```tsx
declare global {
  namespace JSX {
    interface Element extends React.ReactElement<any, any> {}
  }
}
```
JSX 문법을 사용할 때 필요하며, ReactElement를 상속하고 있기 때문에 동일한 역할을 수행할 수 있다.
#### 3. ReactNode
```tsx
/**
 * @deprecated
 * 현재는 ReactText, ReactChild, ReactFragment 모두 삭제되었다.
 */
type ReactText = string | number; // 문자열이나 숫자
type ReactChild = ReactElement | ReactText; // ReactElement 또는 ReactText
type ReactFragment = {} | Iterable<ReactNode>; // 리액트 조각
/**
 * 책엔 아래와 같이 정의되어 있지만, 실제 ReactNode 타입 정의 내용도 조금 변경되었다.
 */
type ReactNode =
  | ReactChild
  | ReactFragment
  | ReactPortal
  | boolean
  | null
  | undefined;
```
ReactElement 뿐만 아니라 다양한 타입을 포함할 수 있다. 더 넓은 범위의 타입을 다루기 위해 사용된다.
### 5. ReactElement, ReactNode, JSX.Element 활용하기
#### 1. JSX.Element
```tsx
interface Props {
    icon: JSX.Element;
}
const Item = ({ icon }: Props) => {
// prop으로 받은 컴포넌트의 props에 접근할 수 있다
    const iconSize = icon.props.size;
    return (<li>{icon}</li>);
};
// icon prop에는 JSX.Element 타입을 가진 요소만 할당할 수 있다
const App = () => {
    return <Item icon={<Icon size={14} />} />
};
```
icon prop을 JSX.Element 타입으로 선언함으로써 해당 prop에는 JSX 문법만 삽입할 수 있다. 또한 icon.props에 접근하여 prop으로 넘겨받은 컴포넌트의 상세한 데이터를 가져올 수 있다.
#### 2. ReactElement
```tsx
interface IconProps {
    size: number;
}
interface Props {
// ReactElement의 props 타입으로 IconProps 타입 지정
    icon: React.ReactElement<IconProps>;
}
const Item = ({ icon }: Props) => {
// icon prop으로 받은 컴포넌트의 props에 접근하면, props의 목록이 추론된다
    const iconSize = icon.props.size;
    return <li>{icon}</li>;
};
```
원하는 컴포넌트의 props를 ReactElement의 제네릭으로 지정해줄 수 있다.
#### 3. ReactNode
```tsx
interface MyComponentProps {
    children?: React.ReactNode;
// ...
}
```
컴포넌트가 렌더링 할 수 있는 어떤 타입의 속성값이든 받을 수 있게 만들 수 있다.
```tsx
type PropsWithChildren<P = unknown> = P & {
    children?: ReactNode | undefined;
};
interface MyProps {
// ...
}
type MyComponentProps = PropsWithChildren<MyProps>;
```
이런 식으로 컴포넌트가 다양한 형태를 가질 수 있게 하고 싶을 때 사용된다.

## 2. 타입스크립트로 리액트 컴포넌트 만들기
공통 컴포넌트에 어떤 타입의 속성이 제공되어야 하는지 알려주며, 필수 속성이 없는 경우 에러를 발생시켜 유지보수 과정에서의 실수를 사전에 막을 수 있다.
### 1. JSX로 구현된 Select 컴포넌트  
```jsx
const Select = ({ onChange, options, selectedOption }) => {
const handleChange = (e) => {
const selected = Object.entries(options)
.find(([_, value]) => value === e.target.value)?.[0];
onChange ?.(selected);
};
return (
<select
onChange ={handleChange}
value ={selectedOption && options[selectedOption]}
>
{Object.entries(options).map(([key, value]) => (
<option key={key} value={value}>
{value}
</option>
))}
</select>
);
};
```
해당 코드에서 속성 값으로 어떤 타입을 전달해야 할지 명확히 알 수 없기 때문에 추가적인 설명이 필요하다.
### 2. JSDocs로 일부 타입 지정하기
```js
/**
* Select 컴포넌트
* @param {Object} props - Select 컴포넌트로 넘겨주는 속성
* @param {Object} props.options - { [key: string]: string } 형식으로 이루어진 option 객
체
* @param {string | undefined } props .selectedOption - 현재 선택된 option의 key값
(optional)
* @param {function} props.onChange - select 값이 변경되었을 때 불리는 callBack 함수
(optional)
* @returns {JSX.Element}
*/
```
JSDocs를 활용하면 각 속성의 대략적인 타입과 어떤 역할을 하는지 파악할 수 있지만,options가 어떤 형식의 객체를 나타내는지나 onChange의 매개변수 및 반환 값에 대한 구체적인 정보를 알기 쉽지 않아서 잘못된 타입이 전달될 수 있는 위험이 존재한다
### 3. props 인터페이스 적용하기
```tsx
type Option = Record <string, string>; // {[key : string]: string}
interface SelectProps {
options: Option;
selectedOption?: string ;
onChange?: (selected?: string) => void;
}
const Select = ({ options, selectedOption, onChange }: SelectProps): JSX.Element =>{
    //...
};
```
컴포넌트에 타입을 정의할 수 있으며, 각 속성에 타입을 명확하게 정의하고 옵셔널 프로퍼티를 사용해 부모에게 onChange 속성을 받지 못해도 유연하게 사용할 수 있다.
### 4.  리액트 이벤트
리액트는 가상 DOM을 다루면서 이벤트도 별도로 관리한다. 리액트 컴포넌트(노드)에 등록되는 이벤트 리스너는 onClick, onChange 처럼 카멜 케이스로 표기한다.
```tsx
type EventHandler<Event extends React.SyntheticEvent> = (e: Event) => void | null;
type ChangeEventHandler = EventHandler<ChangeEvent<HTMLSelectElement>>;
const eventHandler1: GlobalEventHandlers["onchange"] = (e) => {
e.target; // 일반 Event는 target이 없음
};
const eventHandler2: ChangeEventHandler = (e) => {
e.target; // 리액트 이벤트(합성 이벤트)는 target이 있음
};
```
```tsx
const handleChange : React.ChangeEventHandler<HTMLSelectElement> = (e) => {
const selected = Object.entries (options).find(
([_, value]) => value === e.target.value
)?.[0];
onChange?.(selected);
};
```
### 5.  훅에 타입 추가하기
```tsx
const fruits = {
    apple: '사과',
    banana: '바나나',
    blueberry: '블루베리',
};

type Fruit = keyof typeof fruits;
const FruitSelect: VFC = () => {
    const [fruit, changeFruit] = useState<string | undefined>();
    return (
        <Select
            // Error - SetStateAction<undefined>와 맞지 않음
            // (changeFruit에는 undefined만 매개변수로 넘길 수 있음)
            onChange={changeFruit}
            options={fruits}
            selectedOption={fruit}
        />
    );
}
// 에러 발생
const func = () => {
    changeFruit('orange');
};
```
`keyof typeof obj`를 사용해 fruits 키값만 추출해서 Fruit라는 타입을 새로 만들었다. 해당 타입을 제네릭으로 활용해 다른 값이 할당되면 에러가 발생한다.
### 6. 제네릭 컴포넌트 만들기
위의 코드에서 제한된 키와 값을 가지게 만들기 위해 제네릭을 사용한 컴포넌트를 만들어야 한다.
```tsx
interface SelectProps<OptionType extends Record<string, string>> {
options: OptionType;
selectedOption?: keyof OptionType;
onChange?: (selected?: keyof OptionType ) => void;
}
const Select = <OptionType extends Record<string, string>>({
options,
selectedOption,
onChange,
}: SelectProps<OptionType>) => {
// Select component implementation
};
```
객체 형식의 타입을 받아 해당 객체의 키값을selectedOption, onChange의 매개변수에만 적용하도록 만든 예시이다.
```tsx
const fruits = {
    apple: '사과',
    banana: '바나나',
    blueberry: '블루베리',
};
const FruitSelect: VFC = () => {
// ...
// <Select<Fruit > ... />으로 작성해도 되지만, 넘겨주는 props의 타입으로 타입 추론을 해줍니다
// Type Error - Type “orange ” is not assignable to type “apple ” | “banana ” |'blueberry' | undefined
return (
<Select options={fruits} onChange={changeFruit} selectedOption='orange' />
);
};
```
Select 컴포넌트에 전달되는 props의 타입 기반으로 타입이 추론되어`<Select<추론된 타입>>` 형태의 컴포넌트가 생성된다.
### 7. HTMLAttributes, ReactProps 적용하기
```tsx
type ReactSelectProps = React.ComponentPropsWithoutRef<'select'>;
interface SelectProps<OptionType extends Record<string, string>> {
id?: ReactSelectProps['id'];
className?: ReactSelectProps['className'];
// ...
}
```
`React.ComponentPropsWithoutRef`를 통해 select의 props를 추출한다. `ReactSelectProps` 타입을 설정해 엘리면트에서 속성의 타입을 그대로 가져온다.

```tsx
interface SelectProps<OptionType extends Record<string, string>> 
  extends Pick<ReactSelectProps, 'id' | 'key' >
{
  // ...
}
```
 `Pick<Type, ‘key1’ | ‘key2’ ...>`는 객체 형식의 타입에서 key1, key2...의 속성만 추출하여 새로운 객체 형식의 타입을 반환한다. 여러 개의 타입을 가져와야 할 때 사용된다.
### 8. styled-components를 활용한 스타일 정의
CSS-in-JS 라이브러리인 styled-components를 사용해 직접 스타일을 적용할 수 있다.
```tsx
export const theme = {
    fontSize: {
        default: "16px",
        small: "14px",
        large: "18px",
    },
    color: {
        white: "#FFFFFF",
        black: "#000000",
    },
};

type Theme = typeof theme;
export type FontSize = keyof Theme["fontSize"];
export type Color = keyof Theme["color"];
```
```tsx
interface SelectStyleProps {
color: Color;
fontSize: FontSize;
}
const StyledSelect = styled.select<SelectStyleProps>`
color: ${({ color }) => theme.color[color]};
font-size: ${({ fontSize }) => theme.fontSize [fontSize]};
`;
```
```tsx
interface SelectProps extends Partial<SelectStyleProps> {
// ...
}
const Select = <OptionType extends Record<string, string>>({
                                                               fontSize = 'default',
color = 'black',
// ...
}: SelectProps<OptionType>) => {
// ...
    return (
        <StyledSelect
// ...
fontSize={fontSize}
color={color}
// ...
/>
);
};
```
### 9. 공변성과 반공변성
안전한 타입 가드를 위해서는 특수한 경우를 제외하고는 일반적으로 반공변적인 함수 타입을 설정하는 것이 권장된다. **함수 선언 형식을 사용하면 공변성을 띄고 화살표 함수로 선언하면 반공변성을 띈다.** 
#### 1. 공변성
출력값에 적용되며,상위 타입이 하위 타입으로 대체될 수 있다는 개념이다. 구체적인 타입이 넓은 타입으로 반환될 수 있다.
```ts
interface Box<out T> {  // out: 공변성
  value: T;
}

// Box<string>은 Box<Animal>을 대체할 수 있다
class Animal {}
class Dog extends Animal {}

const animalBox: Box<Animal> = { value: new Animal() };
const dogBox: Box<Dog> = { value: new Dog() };

// Box<Dog>는 Box<Animal>에 할당될 수 있다.
const anotherAnimalBox: Box<Animal> = dogBox;
```
- T의 하위 타입 S가 있을 때, `Box<T>는` `Box<S>`로 교환 가능해진다.
#### 2. 반공변성
입력값(인자)에 적용되며, 상위 타입이 하위 타입으로 대체될 수 없다는 개념이다. 더 넓은 타입을 좁은 타입으로 처리할 수 없다.
```ts
interface Handler<in T> {  // in: 반공변성
  handle(value: T): void;
}

// Handler<Dog>는 Handler<Animal>을 대체할 수 없다
class Animal {}
class Dog extends Animal {}

const animalHandler: Handler<Animal> = { handle: (value: Animal) => {} };
const dogHandler: Handler<Dog> = { handle: (value: Dog) => {} };

// 반공변성: Handler<Dog>는 Handler<Animal>에 할당할 수 없다
// const anotherAnimalHandler: Handler<Animal> = dogHandler; // 오류 발생
```
- T의 하위 타입 S가 있을 때, `Handler<S`>는 `Handler<T>`로 교환할 수 없다.

## 작성하고 느낀 점

좋았던 점: ReactDeepDive 1장에서 단편적으로 타입스크립트를 리액트에 적용하는 방법을 배웠었는데 더 깊이있는 내용인 컴포넌트와 요소에 타입을 적용하고 특정 타입만을 가져오게 하거나 안전하게 받아오는 방법을 배웠다.

배운 점: 리액트에서 타입스크립트를 적용하는 방법에 대해 배웠다.

아쉬운 점: 내용을 압축한 형태라 예제를 보고 바로 이해할 수 없다. 이해를 돕기 위한 외부 자료를 찾는 데 시간을 소모했다.

향후 계획: 9장 10장 11장은 ReactDeepDive에서 더 자세하게 다뤘으니 12장 타입스크립트 프로젝트 관리 파트로 진행한다.
