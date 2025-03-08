---
sidebar_position: 1
title: "week 1. 자료구조와 알고리즘, 운영체제"
description: CS 전공지식 온라인 강의
authors: [MtypEyuc]
tags: [CS]
hide_table_of_contents: false
---
![banner.webp](../../../static/img/CS%20-%20%EC%9E%90%EB%A3%8C%EA%B5%AC%EC%A1%B0%EC%99%80%20%EC%95%8C%EA%B3%A0%EB%A6%AC%EC%A6%98%2C%20%EC%9A%B4%EC%98%81%EC%B2%B4%EC%A0%9C/banner.webp)

## 1. 강의 진도표
>### CS (3/3~3/7)
#### Day 1 운영체제 들어가기
- 알고리즘 Section 1
- 운영체제 Section 1
#### Day 2 프로세스와 쓰레드
- 알고리즘 Section 2 (1~3),
- 운영체제 Section 2 (1~4)
#### Day 3 프로세스와 쓰레드
- 알고리즘 Section 2 (4~8)
- 운영체제 Section 2 (5~7)
#### Day 4 CPU 스케줄링
- 알고리즘 Section 2 (9~10)
- 운영체제 Section 3 (1~4)
#### Day 5 CPU 스케줄링 (과제必)
- 알고리즘 Section 2 (11)
- 운영체제 Section 3 (5~7)
----

## 2. <span style={{ color: '#ffd33d' }}> 운영체제 week 1  </span>
컴퓨터가 기능을 수행하는 과정을 직관적인 시각자료와 간단한 예시를 통해 설명하고 있다. 시간은 평균 3분 정도로, 식사를 하거나 시간이 날 때 하나씩 들으며 진행했다.

---
>### 1. 운영체제 들어가기
운영체제의 개요와 역사, 구조에 대해 설명하고 컴퓨터의 구성 요소에 대한 기본적인 내용이다. 
- 인터럽트 : 입출력 작업에서 CPU가 명령을 내리고 다른 일을 처리하는 것으로, 비동기적으로 처리하기 때문에 성능이 향상된다.
```java
interrupt keyPressed(Key key){
    if(key == KEY>ENTER)
    {
        print("Enter 눌림!!");
    }
}
```
---
>### 2. 프로세스와 쓰레드
#### 프로세스
프로세스는 프로그램이 명령한 내용이 메모리에 올라갔을 때 실행중인 프로그램을 뜻한다. 

---
#### 멀티 프로그래밍과 멀티 프로세스
- 멀티 프로그래밍은 메모리에 프로세스를 여러 개 올리고 I/O 작업을 만났을 때 다른 프로세스를 실행시켜 CPU 효율을 향상시킨다.


- 멀티 태스킹은 메모리에 프로세스를 여러 개 올리고 하나씩 짧게 실행시키는 방식으로 모든 프로세스를 동시에 실행시키는 것처럼 느끼게 만든다. 여러 개의 CPU가 이 과정을 처리하는 것이 멀티프로세싱이다.  

---
#### PCB (Process Control Block)
프로세스의 정보를 저장한 공간으로 연결리스트라는 자료구조로 저장된다. 운영체제는 PCB의 프로세스 상태값을 읽고 기능을 수행한다.

---
#### 컨텍스트 스위칭
프로세스 실행 후 인터럽트가 일어날 때 프로세스 상태를 PCB에 저장하고 다른 프로세스를 실행한다. 프로세스의 점유율이 높아지면 일어난다.

---
#### 쓰레드
작업 처리마다 프로세스를 생성하면 메모리가 무거워지기 때문에 프로세스 내부에서 영역을 공유하는 쓰레드를 생성해 성능을 향상시킬 수 있다.

---
>### 3. CPU 스케줄링
운영체제가 프로세스에게 CPU를 할당/해제하는 것을 뜻한다. 프로세스에게 CPU 사용 권한과 점유율을 할당하며 컴퓨터 성능에 큰 영향을 미치는 작업이다.

---

## 3.  <span style={{ color: '#ffd33d' }}> 알고리즘 week 1 </span>
앞서 배운 운영체제를 복습하며 더 깊게 이해하는 과정이다. 성능 향상이라는 추상적인 개념을 코드를 통해 자세하게 이해할 수 있게 진행하고 있다.

---
>### 1. 개요
프로세스 실행 순서(코드의 배치) 를 정리하는 것이 자료구조다. 이 구조에 따라 성능이 바뀌며, 성능이 좋다는 것은 속도가 빠르다는 것을 뜻한다. 최악의 경우의 수에서 가장 높은 성능을 내는 것이 중요하다.

---
>### 2. 자료 구조 
#### 연결리스트
데이터를 참조해야 하는 경우 배열을 사용하는 것이 좋지만, 데이터의 수가 자주 바뀌게 된다면 연결리스트를 사용해 성능을 향상시킬 수 있다.

- 배열(Array) : 크기가 일정한 데이터를 연속된 메모리 주소에 할당한다.


- 연결 리스트(Linked List) : 크기가 정해지지 않은 데이터를 노드에 할당하고 참조할 수 있다. 

---
#### 스택(Stack)
가장 마지막에 들어온 데이터가 먼저 나가게 된다. 이 기능을 이용해 사용자가 입력한 작업 내용을 되돌리는 등의 역할을 수행할 수 있다.

---
#### 큐(Queue) 
가장 먼저 들어온 데이터가 먼저 나가게 된다. 운영체제에서 프로세스를 대기열을 순서대로 처리할 때 사용한다.

---
#### 덱(Deque)
스택과 큐의 특성을 종합한 구조를 가진다. 데이터의 순서에 상관없이 원하는 방향으로 데이터를 유연하게 처리할 수 있다.

---
#### 해시 테이블(Hash Table)
데이터를 키와 값으로 저장하는 방식으로 빠른 데이터 검색과 효율적인 삽입 삭제가 가능하지만 메모리 사용량이 높다.

---
#### 셋(Set)
해시 테이블을 사용한다고 해서 해시 셋이라고도 한다. 값을 제외하고 키만 사용해서 저장하기 때문에 중복된 원소를 자동으로 삭제하므로, 중복을 허용하지 않는다.

---
## 3.  <span style={{ color: '#ffd33d' }}> 과제 week 1 </span>

>### 1. 운영체제
#### 1. 코드 수정
```
 while(true){
      wait(1); // 1초 멈춤
      bool isActivated = checkSkillActivated(); // 체크
    }
```
- 해당 코드의 성능을 개선해야 한다.
---
```javascript
    isActivated = checkSkillActivated();
    if (isActivated)
    {
        actionSkillActivated();
    }
```
- 조건문을 넣어 스킬이 사용됐을 때만 특정 행동을 하도록 만들었다.
---

#### 2. 프로그램과 프로세스는 어떻게 다른가요?
프로세스는 프로그램이 명령한 내용이 메모리에 올라갔을 때 실행중인 프로그램을 뜻한다.

---
#### 3. 멀티 프로그램과 멀티 프로세싱이 어떻게 다른가요?

멀티 프로그래밍은 I/O 작업이 일어나는 조건으로 다른 프로그램을 실행하고, 멀티 프로세싱은 여러 개의 프로그램을 짧은 시간에 한번씩 수행해 동시에 작업이 일어나는 것처럼 보이게 하는 방식을 여러 CPU에서 사용한다.

---
#### 4. 컨텍스트 스위칭이란 뭔가요?
프로세스 실행 후 인터럽트가 일어날 때 프로세스 상태를 PCB에 저장하고 다른 프로세스를 실행한다.

---

>### 2. 알고리즘 
#### 1. 교실의 학생 정보를 저장하고 열람할 수 있는 관리 프로그램을 개발하기 위한 자료구조 선택
데이터가 바뀌게 된다고 해도 구조가 아닌 내용이 바뀌게 되기 때문에 일반적인 상황에서 자주 바뀌지 않는다. 데이터 구조가 정적이기 때문에 배열을 사용할 것이다.

----
#### 2. 고객의 주문을 순서대로 처리하는 프로그램의 자료구조 선택
대기열을 순서대로 처리하는 방식이면 큐(Queue)를 사용해 처리하는 것이 바람직하다.

---
#### 3. 스택을 출구쪽으로 데이터가 삽입되고 나오는 구조로 변경
```javascript
class Stack{
    constructor(){
        this.list = new LinkedList();
    }
    push(data){
        this.list.insertAt(0, data);
    }
    pop(){
        try{
            return this.list.deleteAt(0);
        } catch(e){
            return null;
        }
    }
    peek(){
        return this.list.getNodeAt(0);
    }
    isEmpty(){
        return (this.list.count == 0);
    }
}
```
 - 기존 구조는 입구쪽으로 데이터가 삽입되고 나오는 구조이다.
 - LinkedList는 insertAt(index, data), insertLast(data), deleteAt(index), deleteLast(), getNodeAt(index)의 자료구조를 가진다.

---
```javascript
class Stack{
    constructor(){
        this.list = new LinkedList();
    }
    push(data){
        this.list.insertLast(data);
    }
    pop(){
        try{
            return this.list.deleteLast();
        } catch(e){
            return null;
        }
    }
    peek(){
        return this.list.getNodeAt(this.list.count - 1);
    }
    isEmpty(){
        return (this.list.count === 0);
    }
}
```

----
#### 선수 해시 테이블을 등번호가 아닌 이름을 이용해 데이터를 골고루 분산시키는 코드로 수정
- 힌트: charCodeAt() 함수를 이용
- 예시: name1 = "이운재"   
- name1.charCodeAt(0); // 51060  이운재의 0번 인덱스 ‘이’의 유니코드 출력
```javascript
class HashTable{
 hashFunction(number){
        return number % 10;
    }
 }
```
- 이 코드에서 name 프로퍼티를 사용해야 한다.

---
```javascript
class HashTable{
    hashFunction(name){
        let hash = 0;
        for (let i = 0; i < name.length; i++) {
            hash += name.charCodeAt(i);
        }
    }
 }
```
---
## <span style={{ color: '#ffd33d' }}> 후기 </span>
<details>
<summary> 펼치기 </summary>

1. **좋았던 점**: CS 관련 지식이 없는 비전공자도 쉽게 이해할 수 있는 강의이다. 


2. **배운 점**: 자료 구조와 알고리즘, 운영체제의 기초를 배웠다.


3. **어려웠던 점**: 컴퓨터가 좋아진 시대에 살고 있기 때문에 대용량 데이터 등을 처리하는 방식이 아니라면 성능 변동을 체감하기 함들 것 같다고 생각한다.


4. **향후 계획**: 자료 구조와 알고리즘은 클린 코드에도 영향을 끼친다고 생각한다. 목적에 맞는 자료구조를 선택할 때 고민 할 필요가 있다.
</details>