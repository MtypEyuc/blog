---
sidebar_position: 4
title: "week 4. Mocking"
description: BE 클린 코드, 테스트 코드
authors: [MtypEyuc]
tags: [BE]
hide_table_of_contents: false
date: "2025-03-30"
---

**작성일:** {frontMatter.date}

![banner.webp](../../../static/img/BE%20-%20%EB%B0%B1%EC%97%94%EB%93%9C%20%ED%81%B4%EB%A6%B0%20%EC%BD%94%EB%93%9C%2C%20%ED%85%8C%EC%8A%A4%ED%8A%B8%20%EC%BD%94%EB%93%9C/banner.webp)

## 1. <span style={{ color: '#3d69ff' }}> 강의 진도표 </span>
>### BE (~3/30)
#### Day 15 Spring & JPA 기반 테스트: Presentation Layer (과제必)
-  [테스트] Section 6. Presentation Layer (2)
#### Day 16 Mock을 마주하는 자세
-  [테스트] Section 7
#### Day 17 더 나은 테스트를 작성하기 위한 구체적 조언 (과제必)
-  [테스트] Section 8
#### Day 18 학습 테스트 | REST Docs
-  [테스트] Section 9-10
#### Day 19 중간 점검
- 온라인 세션

---
## 2. <span style={{ color: '#3d69ff' }}> Presentation Layer </span>
![01.webp](../../../static/img/BE%20-%20%EB%B0%B1%EC%97%94%EB%93%9C%20%ED%81%B4%EB%A6%B0%20%EC%BD%94%EB%93%9C%2C%20%ED%85%8C%EC%8A%A4%ED%8A%B8%20%EC%BD%94%EB%93%9C/04/01.webp)  
![02.webp](../../../static/img/BE%20-%20%EB%B0%B1%EC%97%94%EB%93%9C%20%ED%81%B4%EB%A6%B0%20%EC%BD%94%EB%93%9C%2C%20%ED%85%8C%EC%8A%A4%ED%8A%B8%20%EC%BD%94%EB%93%9C/04/02.webp)  
계층형 아키텍쳐에서 서버 통신을 수행하는 계층을 의미합니다. MVC 패턴에서는 컨트롤러 계층에 위치하게 됩니다. 서버 통신을 위한 데이터의 형태가 제대로 반환되거나 받을 수 있는지 검수하고, 서버 통신에 사용되는 속성값을 확인해야 합니다.

---
## 3. <span style={{ color: '#3d69ff' }}> Mocking </span>

Mocking: 테스트에서 실제 객체 대신 **가짜 객체(mock object)**를 만들어 사용하는 기법입니다. 실제 코드를 감싸면 테스트 객체를 사용할 수 있게 됩니다.

@Mock : 테스트에 사용할 Mock 객체를 생성하기 위해 사용하는 어노테이션입니다.

@MockBean : Spring 에서 Mock 객체에 대한 의존성을 주입하는 어노테이션입니다.

@Spy : 실제 객체를 부분적으로 Mocking 할 수 있게 합니다.

@SpyBean : Spring의 Bean에 대해 Spy를 적용합니다. 테스트 중 일부 메서드만 Mocking 하거나 실제로 호출할 수 있습니다.

@InjectMocks : Mock 객체로 선언된 클레스에 의존성을 주입하는 어노테이션입니다. 테스트 대상 객체에 Mock 객체들이 주입됩니다.

![03.webp](../../../static/img/BE%20-%20%EB%B0%B1%EC%97%94%EB%93%9C%20%ED%81%B4%EB%A6%B0%20%EC%BD%94%EB%93%9C%2C%20%ED%85%8C%EC%8A%A4%ED%8A%B8%20%EC%BD%94%EB%93%9C/04/03.webp)  
![04.webp](../../../static/img/BE%20-%20%EB%B0%B1%EC%97%94%EB%93%9C%20%ED%81%B4%EB%A6%B0%20%EC%BD%94%EB%93%9C%2C%20%ED%85%8C%EC%8A%A4%ED%8A%B8%20%EC%BD%94%EB%93%9C/04/04.webp)  

---
## 4. <span style={{ color: '#3d69ff' }}> CQRS (명령 쿼리 책임 분리) </span> 
![05.webp](../../../static/img/BE%20-%20%EB%B0%B1%EC%97%94%EB%93%9C%20%ED%81%B4%EB%A6%B0%20%EC%BD%94%EB%93%9C%2C%20%ED%85%8C%EC%8A%A4%ED%8A%B8%20%EC%BD%94%EB%93%9C/04/05.webp)  

CQRS(Command Query Responsibility Segregation)는 소프트웨어 아키텍처 패턴 중 하나로, 명령(Command)과 조회(Query)를 분리하여 처리하는 방법론입니다. 복잡한 비즈니스 로직을 효율적으로 처리하고, 각각의 작업을 독립적으로 최적화할 수 있습니다.

---
## 5. <span style={{ color: '#3d69ff' }}> 최종 점검 </span> 
![06.webp](../../../static/img/BE%20-%20%EB%B0%B1%EC%97%94%EB%93%9C%20%ED%81%B4%EB%A6%B0%20%EC%BD%94%EB%93%9C%2C%20%ED%85%8C%EC%8A%A4%ED%8A%B8%20%EC%BD%94%EB%93%9C/04/06.webp)
![07.webp](../../../static/img/BE%20-%20%EB%B0%B1%EC%97%94%EB%93%9C%20%ED%81%B4%EB%A6%B0%20%EC%BD%94%EB%93%9C%2C%20%ED%85%8C%EC%8A%A4%ED%8A%B8%20%EC%BD%94%EB%93%9C/04/07.webp)
![08.webp](../../../static/img/BE%20-%20%EB%B0%B1%EC%97%94%EB%93%9C%20%ED%81%B4%EB%A6%B0%20%EC%BD%94%EB%93%9C%2C%20%ED%85%8C%EC%8A%A4%ED%8A%B8%20%EC%BD%94%EB%93%9C/04/08.webp)
![09.webp](../../../static/img/BE%20-%20%EB%B0%B1%EC%97%94%EB%93%9C%20%ED%81%B4%EB%A6%B0%20%EC%BD%94%EB%93%9C%2C%20%ED%85%8C%EC%8A%A4%ED%8A%B8%20%EC%BD%94%EB%93%9C/04/09.webp)

저번 중간 점검과 마찬가지로 신청한 테스트 코드를 점검하고,궁굼했던 점을 Q&A 하는 시간을 가지게 되었습니다. 다른 사람들은 어떤 생각을 가지고 코드를 분석했는지 배우게 되었고, 50분간 진행되었지만, 분석하며 즐기는 분위기 덕분에 시간이 언제 갔는지도 모르게 참여할 수 있었습니다.


## <span style={{ color: '#3d69ff' }}> 4L 회고 </span>

**Liked** : 좋았던 점은 무엇인가?
- 테스트 코드
    - 멀게만 느껴졌던 테스트 환경과 테스트 코드를 직접 접하며 많은 개발 지식을 깨우치게 되었습니다. 주위에서 TDD는 사용하지 않더라도 배우면 좋다는 이야기를 많이 들었었는데, 그 이유를 깨닫게 되었습니다. 

**Lacked** : 아쉬웠던 점, 부족한 점은 무엇인가?
- 패턴화가 필요한게 아닌지
    - 더 빠른 테스트를 위해 각종 라이브러리가 등장했지만, 테스트 환경 자체를 구성해야 하기 때문에 개발 주도 환경에 비해 속도가 느린 것은 사실입니다. 하지만 테스트를 통해 안정성을 확보한 검증된 코드 패턴을 계속 재사용 할 수 있다면 더 빠르게 개발할 수 있을 것이라 생각합니다.

**Learned** : 배운 점은 무엇인가? (깨달은것, 인사이트, 기억하고 싶은 것 등)
- 검증하기
    - 테스트 코드를 배우고 작성하기도 하며, 데이터와 기능에 대해 많은 생각을 가질 수 있게 되었습니다. 구현 상황에서 테스트가 필요한 기능을 생각하게 되었고, 각종 개발 환경에서 테스트를 임하는 자세를 배우게 되었습니다. 


**Longed for** : 앞으로 바라는 것은 무엇인가? (앞으로 어떤 행동을 할것인지)
- 파이썬 환경에서 활용하기
    - 다른 환경에서도 객체지향 방식을 적용해 리펙토링과 테스트 코드 작성을 연습해보고 싶었기 때문에 파이썬 데이터 크롤링 기초 강좌를 수강 신청했습니다.
