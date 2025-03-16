---
sidebar_position: 2
title: "week 2. 리액트 사용하기"
description: 프론트엔드
authors: [MtypEyuc]
tags: [FE]
hide_table_of_contents: false
date: "2025-03-16"
---
**작성일:** {frontMatter.date}

![banner.webp](../../../static/img/FE%20-%20%ED%94%84%EB%A1%A0%ED%8A%B8%EC%97%94%EB%93%9C%20JS%2CREACT/banner.webp)
## 1. <span style={{ color: '#ffd33d' }}> 강의 진도표 </span>

> ### FE (3/10~3/14)
#### Day 5 Iterator, Generator, Design Pattern (과제必)
- Section 8~9
#### Day 6 프로젝트 만들기 (과제必)
- Section 10
#### Day 7 중간 점검
- 온라인 세션
#### Day 8 리액트 기본 및 Todo 앱 만들기 (과제必)
- Section 2~4
#### Day 9 리액트로 Netflix 만들기 (과제必)
- Section 5~6

---
## 2.  <span style={{ color: '#ffd33d' }}> TODO-LIST </span>
앱을 익히기 위해 TODO-LIST 앱을 만들면서 설명하고 있습니다. 커리큘럼을 따라가면 리액트 기본 사용 방법을 이해할 수 있는 과정입니다.

>### 1. 클래스 컴포넌트를 함수 컴포넌트로 리팩토링하기
클래스 컴포넌트를 리팩토링 하며 함수 컴포넌트와의 차이점을 이해하고, 수정하는 과정을 이해하며 함수 컴포넌트가 어떻게 파생되는지 알 수 있습니다.

>### 2. ReactHooks 사용하기
ReactHooks를 사용해 성능이 더욱 좋아지며, 함수 컴포넌트를 간결하게 작성 가능합니다.

>### 3. 컴포넌트 분리하기
하나의 페이지에 작성한 기능을 컴포넌트로 분리해 가독성을 향상시킬 수 있습니다.

>### 4. Tailwind CSS 사용하기
Tailwind CSS를 사용해 직관적이고 빠르게 스타일링 할 수 있습니다.

>### 5. 모듈 설치하기
구현해야 할 특정 기능을 위해 모듈을 선택할 수 있습니다. 모듈을 사용할 때는 버전 충돌을 주의해야 합니다.

>### 6. 기능
![fn1.gif](../../../static/img/FE%20-%20%ED%94%84%EB%A1%A0%ED%8A%B8%EC%97%94%EB%93%9C%20JS%2CREACT/02/fn1.gif)

---
## 3.  <span style={{ color: '#ffd33d' }}> NETFLIX-CLONE </span>

>### 1. API 받아오기
![01.webp](../../../static/img/FE%20-%20%ED%94%84%EB%A1%A0%ED%8A%B8%EC%97%94%EB%93%9C%20JS%2CREACT/02/01.webp)
![02.webp](../../../static/img/FE%20-%20%ED%94%84%EB%A1%A0%ED%8A%B8%EC%97%94%EB%93%9C%20JS%2CREACT/02/02.webp)
TMDB의 API를 받아오기 위해 회원가입 후 키를 받아온 뒤 axios를 사용해 데이터를 호출할 수 있습니다.

>### 2. 컴포넌트를 먼저 만들기
페이지에 필요한 요소를 확인하고 컴포넌트 형식으로 제작 후 호출하면 단계별로 작업할 수 있습니다.

>### 3. Props 내려주기
![03.webp](../../../../Downloads/02/03.webp)
컴포넌트 형식으로 생성해야 할 때 페이지에 필요한 Props를 컴포넌트에 내려주고 해당 컴포넌트에서 사용할 수 있게 만듭니다.

>### 4. styled components 사용하기
![04.webp](../../../../Downloads/02/04.webp)
컴포넌트 내부에 css를 설정해 독립적으로 사용할 수 있습니다. Props를 이용해 동적으로 스타일 변경이 가능해집니다.

>### 5. React Router Dom
동적 페이지를 구현하기 위해 사용하는 기능입니다. useNavigate(), useLocation() 등을 사용해 위치 변경을 적용할 수 있습니다.

>### 6. 배포하기
cli 명령어를 사용해 깃헙 아이디와 리포지토리 주소를 포함한 애플리케이션을 배포할 수 있습니다.
- [넷플릭스 앱](https://mtypeyuc.github.io/React-netflix-clone/)

>### 7. 기능 
![fn2.gif](../../../static/img/FE%20-%20%ED%94%84%EB%A1%A0%ED%8A%B8%EC%97%94%EB%93%9C%20JS%2CREACT/02/fn2.gif)

---
## 4.  <span style={{ color: '#ffd33d' }}> 중간 점검 </span>
![05.webp](../../../static/img/FE%20-%20%ED%94%84%EB%A1%A0%ED%8A%B8%EC%97%94%EB%93%9C%20JS%2CREACT/02/05.webp)
![06.webp](../../../static/img/FE%20-%20%ED%94%84%EB%A1%A0%ED%8A%B8%EC%97%94%EB%93%9C%20JS%2CREACT/02/06.webp)
![07.webp](../../../static/img/FE%20-%20%ED%94%84%EB%A1%A0%ED%8A%B8%EC%97%94%EB%93%9C%20JS%2CREACT/02/07.webp)

과제로 만들어야 할 앱을 작성하는 방법과 Q&A를 진행했습니다. 

---
## <span style={{ color: '#ffd33d' }}> 후기 </span>
<details>
<summary> 펼치기 </summary>

**Liked** : 좋았던 점은 무엇인가?
- 자세한 리액트 사용법
    - 클래스 컴포넌트부터 작성해 리팩토링 하며 컴포넌트화 하는 과정에서 리액트를 이해할 수 있게 만듭니다.

**Lacked** : 아쉬웠던 점, 부족한 점은 무엇인가?
- 워크 플로우 이해
    - 리액트 흐름을 이해해야 강의를 따라갈 수 있습니다. 처음 보는 기능 구현에는 헤맬 수 있습니다.

**Learned** : 배운 점은 무엇인가? (깨달은것, 인사이트, 기억하고 싶은 것 등)
- 리액트에서 자주 사용하는 것들
    - 강의는 리액트 18 버전을 사용해 훅과 Tailwind CSS, styled components 등을 사용하고 Props 데이터를 컴포넌트에서 사용할 수 있게 만드는 방법 등을 배울 수 있었습니다. 


**Longed for** : 앞으로 바라는 것은 무엇인가? (앞으로 어떤 행동을 할것인지)
- 다른 환경 적응
    - 프로젝트가 다른 버전을 사용하거나 언어, 프레임워크가 달라지더라도 바로 투입될 수 있게 여러가지 라이브러리와 프레임워크를 배워 적응하는 방법을 배울 것입니다.
</details>
