---
sidebar_position: 3
title: "week 3. Layered Architecture"
description: BE 클린 코드, 테스트 코드
authors: [MtypEyuc]
tags: [BE]
hide_table_of_contents: false
date: "2025-03-23"
---

**작성일:** {frontMatter.date}

![banner.webp](../../../static/img/BE%20-%20%EB%B0%B1%EC%97%94%EB%93%9C%20%ED%81%B4%EB%A6%B0%20%EC%BD%94%EB%93%9C%2C%20%ED%85%8C%EC%8A%A4%ED%8A%B8%20%EC%BD%94%EB%93%9C/banner.webp)

## 1. <span style={{ color: '#ffd33d' }}> 강의 진도표 </span>
>### BE (3/17~ 3/23)
#### Day 10 테스트 코드 적용 실습 (과제必)
-  지뢰찾기, 스터디카페 중 하나를 골라, 단위 테스트를 작성해 봅시다
#### Day 11 Spring & JPA 기반 테스트: Persistence Layer
-  [테스트] 섹션 6. Persistence Layer
#### Day 12 Spring & JPA 기반 테스트: Business Layer
-  [테스트] 섹션 6. Business Layer (1-2)
#### Day 13 Spring & JPA 기반 테스트: Business Layer
-  [테스트] 섹션 6. Business Layer (3)
#### Day 14 Spring & JPA 기반 테스트: Presentation Layer
-  [테스트] 섹션 6. Presentation Layer (1)

---

## 2. <span style={{ color: '#ffd33d' }}> 키오스크 테스트 (과제) </span>
![20250318_185353.webp](../../../static/img/BE%20-%20%EB%B0%B1%EC%97%94%EB%93%9C%20%ED%81%B4%EB%A6%B0%20%EC%BD%94%EB%93%9C%2C%20%ED%85%8C%EC%8A%A4%ED%8A%B8%20%EC%BD%94%EB%93%9C/03/20250318_185353.webp)
![03.webp](../../../static/img/BE%20-%20%EB%B0%B1%EC%97%94%EB%93%9C%20%ED%81%B4%EB%A6%B0%20%EC%BD%94%EB%93%9C%2C%20%ED%85%8C%EC%8A%A4%ED%8A%B8%20%EC%BD%94%EB%93%9C/03/03.webp)  

개념으로 배웠던 테스팅 코드를 실습하기 위해 간단한 테스트 코드를 작성해보는 시간을 가지게 되었습니다. 호출한 함수가 제대로 값을 반환하는 지 확인하고, 출력 값과 다르지 않은지, 계산이 혹시 틀리지는 않는지 확인하는 작업을 거치는 테스트 코드를 작성했습니다.

---
## 3. <span style={{ color: '#ffd33d' }}> H2 콘솔을 이용한 데이터 확인 </span>
![20250321_063216.webp](../../../static/img/BE%20-%20%EB%B0%B1%EC%97%94%EB%93%9C%20%ED%81%B4%EB%A6%B0%20%EC%BD%94%EB%93%9C%2C%20%ED%85%8C%EC%8A%A4%ED%8A%B8%20%EC%BD%94%EB%93%9C/03/20250321_063216.webp)
![20250321_063250.webp](../../../static/img/BE%20-%20%EB%B0%B1%EC%97%94%EB%93%9C%20%ED%81%B4%EB%A6%B0%20%EC%BD%94%EB%93%9C%2C%20%ED%85%8C%EC%8A%A4%ED%8A%B8%20%EC%BD%94%EB%93%9C/03/20250321_063250.webp)
![20250321_063418.webp](../../../static/img/BE%20-%20%EB%B0%B1%EC%97%94%EB%93%9C%20%ED%81%B4%EB%A6%B0%20%EC%BD%94%EB%93%9C%2C%20%ED%85%8C%EC%8A%A4%ED%8A%B8%20%EC%BD%94%EB%93%9C/03/20250321_063418.webp)  

H2 콘솔을 이용해 테이블에 데이터를 입력하고 해당 데이터의 상태를 확인할 수 있습니다.

---
## 4. <span style={{ color: '#ffd33d' }}> HTTP 요청을 이용한 데이터 확인 </span>
![20250321_144226.webp](../../../static/img/BE%20-%20%EB%B0%B1%EC%97%94%EB%93%9C%20%ED%81%B4%EB%A6%B0%20%EC%BD%94%EB%93%9C%2C%20%ED%85%8C%EC%8A%A4%ED%8A%B8%20%EC%BD%94%EB%93%9C/03/20250321_144226.webp)  

프로젝트 내부에 HTTP 파일을 생성하고 컨트롤러에 생성한 코드를 테스트 할 수 있습니다.

---
## 5. <span style={{ color: '#ffd33d' }}> Persistence Layer </span>
![20250321_070935.webp](../../../static/img/BE%20-%20%EB%B0%B1%EC%97%94%EB%93%9C%20%ED%81%B4%EB%A6%B0%20%EC%BD%94%EB%93%9C%2C%20%ED%85%8C%EC%8A%A4%ED%8A%B8%20%EC%BD%94%EB%93%9C/03/20250321_070935.webp)  

계층형 아키텍처에서 데이터 베이스와 상호작용하는 계층을 의미합니다. MVC 패턴에서는 Model 계층에 위치하게 됩니다. 주로 값을 비교하거나 데이터를 확인합니다.



---
## 6. <span style={{ color: '#ffd33d' }}> Business Layer </span>
![20250321_135819.webp](../../../static/img/BE%20-%20%EB%B0%B1%EC%97%94%EB%93%9C%20%ED%81%B4%EB%A6%B0%20%EC%BD%94%EB%93%9C%2C%20%ED%85%8C%EC%8A%A4%ED%8A%B8%20%EC%BD%94%EB%93%9C/03/20250321_135819.webp)
![20250321_135845.webp](../../../static/img/BE%20-%20%EB%B0%B1%EC%97%94%EB%93%9C%20%ED%81%B4%EB%A6%B0%20%EC%BD%94%EB%93%9C%2C%20%ED%85%8C%EC%8A%A4%ED%8A%B8%20%EC%BD%94%EB%93%9C/03/20250321_135845.webp)  

계층형 아키텍쳐에서 비즈니스 로직을 수행하는 계층을 의미합니다. MVC 패턴에서는 서비스 계층에 위치하게 됩니다. 통합 테스트 코드 작성을 위한 단위 테스트를 먼저 진행합니다.


## <span style={{ color: '#ffd33d' }}> 후기 </span>
<details>
<summary> 펼치기 </summary>

**Liked** : 좋았던 점은 무엇인가?
- 생각하기
    - 테스트를 진행할 때 단순히 값을 받아오는 것에만 치중하지 않고, 왜 이 테스트를 진행해야만 하는지 생각하게 되었습니다.

**Lacked** : 아쉬웠던 점, 부족한 점은 무엇인가?
- 테스트를 위한 코드를 만드는 이유
    - 테스트를 진행하기 위해 전용 로직을 생성해야 합니다. 처음에는 이 복잡한 코드를 만들어야 하는 과정이 이해가지 않았습니다. 스프링 프레임워크를 사용해 빠르게 데이터를 API로 쏘고 프로젝트를 완성시키는 것에만 집중했었는데, 왜 테스트를 해야 하는지 알지 못하면 이해할 수 없는 부분입니다.

**Learned** : 배운 점은 무엇인가? (깨달은것, 인사이트, 기억하고 싶은 것 등)
- 테스팅 코드의 흐름
    - 테스트는 기능을 보증하는 것입니다. 프로젝트 생성에도 왜 이 프로젝트를 진행해야 하는지 설명하는 문서가 존재하듯, 이 코드가 존재하는 이유와 기능을 알리고 여러 상황에서의 테스트를 통해 코드의 안정성을 검증합니다.

**Longed for** : 앞으로 바라는 것은 무엇인가? (앞으로 어떤 행동을 할것인지)
- 계속 생각하기
    - 실제로 TDD를 적용해 프로젝트를 진행하는 회사나 조직을 찾기는 힘들 것입니다. 하지만 기능이 존재하는 이유를 생각하지 않고 만들면 의미를 알 수 없는 프로젝트가 만들어 질 수 있습니다.
</details>