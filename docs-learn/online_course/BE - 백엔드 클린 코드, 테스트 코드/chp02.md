---
sidebar_position: 2
title: "week 2. 코드 리팩토링, 테스트 코드"
description: BE 클린 코드, 테스트 코드
authors: [MtypEyuc]
tags: [BE]
hide_table_of_contents: false
date: "2025-03-16"
---
**작성일:** {frontMatter.date}

![banner.webp](../../../static/img/BE%20-%20%EB%B0%B1%EC%97%94%EB%93%9C%20%ED%81%B4%EB%A6%B0%20%EC%BD%94%EB%93%9C%2C%20%ED%85%8C%EC%8A%A4%ED%8A%B8%20%EC%BD%94%EB%93%9C/banner.webp)

## 1. <span style={{ color: '#ffd33d' }}> 강의 진도표 </span>
>### BE (3/10~3/14)
#### Day 5 리팩토링: 코드 다듬기
- [클린코드] Section 6
#### Day 6 클린코드 리팩토링 실습
-  미션 진행
#### Day 7 리팩토링 연습 | 기억하면 좋은 조언들
- [클린코드] Section 7~9
#### Day 8 단위 테스트 | TDD | 테스트는 [  ] 다
-  [테스트] Section 1~5
#### Day 9 중간 점검
-  온라인 세션

---

## 1. <span style={{ color: '#ffd33d' }}> 중간점검 + 키오스크 리팩토링 </span>
![01.webp](../../../static/img/BE%20-%20%EB%B0%B1%EC%97%94%EB%93%9C%20%ED%81%B4%EB%A6%B0%20%EC%BD%94%EB%93%9C%2C%20%ED%85%8C%EC%8A%A4%ED%8A%B8%20%EC%BD%94%EB%93%9C/02/01.webp)
![02.webp](../../../static/img/BE%20-%20%EB%B0%B1%EC%97%94%EB%93%9C%20%ED%81%B4%EB%A6%B0%20%EC%BD%94%EB%93%9C%2C%20%ED%85%8C%EC%8A%A4%ED%8A%B8%20%EC%BD%94%EB%93%9C/02/02.webp)

다른 사람들이 작성한 키오스크 리팩토링 결과물을 살펴보니 리팩토링에 익숙한 모습들이 보였습니다. 템플릿이 있는건가? 이 강의는 다시 복습하게 되겠지만, 코드를 작성할 때 더 깊게 생각하고 만들어 보아야 겠다고 생각했습니다.

---

## 2. <span style={{ color: '#ffd33d' }}> 테스팅 코드 </span>

![03.webp](../../../static/img/BE%20-%20%EB%B0%B1%EC%97%94%EB%93%9C%20%ED%81%B4%EB%A6%B0%20%EC%BD%94%EB%93%9C%2C%20%ED%85%8C%EC%8A%A4%ED%8A%B8%20%EC%BD%94%EB%93%9C/02/03.webp)

테스트 주도 개발이라고 해서 생소했었는데, 평소에 하던 것들이었습니다. 먼저 구현하기 위한 함수나 이벤트를 선언하고, 그 내용을 채워나가기 위해 기능을 구현한 후 추상화 시키기 위한 리팩토링 하는 과정입니다.
하지만 이것을 검증 도구를 사용해 테스트를 하려고 하니 많은 경우의 수를 생각해야했고, 시나리오와 검증의 품질도 생각해야 했기 때문에 재수강이 필요하다고 느꼈습니다.

---
## 3. <span style={{ color: '#ffd33d' }}> 클린코드 스타일 </span>
테스팅 코드 학습을 진행하다 보니 클린코드에서 보던 내용들이 나왔습니다. 책에서 배운 내용으론 각주를 사용하지 않고 메서드에 when,then 등을 사용해 이해를 돕는 것으로 알고있었는데 스프링에서는 다른 방식으로 테스트 하고 있었습니다.


---
## <span style={{ color: '#ffd33d' }}> 후기 </span>
<details>
<summary> 펼치기 </summary>

**Liked** : 좋았던 점은 무엇인가?
- 높은 품질의 강의
    - 왜 다른 강의에 비해 백엔드에 사람이 몰려있는지 알게되었습니다. 전문학원에서 들을 수 없었던 내용도 포함되어 있었고 리팩토링은 여러 번 실습 해야 하기 때문에 이전에 수강했던 인원이 다시 찾아오는 이유를 깨닫게 되었습니다.

**Lacked** : 아쉬웠던 점, 부족한 점은 무엇인가?
- 이해 부족
    - 보통 검증은 콘솔 메세지를 확인하고 데이터 값을 입력하는 방식으로 진행했기 때문에, 왜 단위 테스트가 필요한지 몰랐었는데, 좋은 코드들이 이러한 테스트 과정을 거친다는 것을 알고 다시 배우게 되었습니다.

**Learned** : 배운 점은 무엇인가? (깨달은것, 인사이트, 기억하고 싶은 것 등)
- 테스트 도구 종류와 테스트 개념
    - 개발자들이 테스트를 진행하는 이유와 사용하는 도구에 대해 알게되었습니다.


**Longed for** : 앞으로 바라는 것은 무엇인가? (앞으로 어떤 행동을 할것인지)
- 복습 필요
    - 이번 내용은 바로 이해할 수 없는 내용이었기 때문에 개념을 명확하게 잡기 위해서라도 다시 듣고 제대로 이해햐아 하겠다고 생각하고 있습니다.
</details>