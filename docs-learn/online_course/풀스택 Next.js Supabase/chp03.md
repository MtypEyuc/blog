---
sidebar_position: 3
title: "week 3. TMDBFLIX"
description: Supabase
authors: [MtypEyuc]
tags: [FullStack]
hide_table_of_contents: false
date: "2025-03-23"
---
**작성일:** {frontMatter.date}

![banner.webp](../../../static/img/%ED%92%80%EC%8A%A4%ED%83%9D%20Next.js%20Supabase/banner.webp)

## 1. <span style={{ color: '#ffd33d' }}> 강의 진도표 </span>

>### Full-Stack (3/17~ 3/23)
#### Day 11 Netflix 클론 - 프로젝트 준비
- Section 5 (강의 소개, Git 설정)
#### Day 12 Netflix 클론 - UI 구축 (선택)
- Section 5 (UI 구축)
#### Day 13 Netflix 클론 - 검색 & 상세 페이지
- Section 5 (검색 기능, 상세 페이지)
#### Day 14 Netflix 클론 - 무한 스크롤 & SEO
- Section 5 (무한 스크롤, SEO)
#### Day 15 Netflix 클론 - 추가 기능 구현
- 사용자 즐겨찾기 기능 추가 등

---
## 2.  <span style={{ color: '#ffd33d' }}> Supabase 실습 week 3 </span>

![20250323_054035.webp](../../../static/img/%ED%92%80%EC%8A%A4%ED%83%9D%20Next.js%20Supabase/03/20250323_054035.webp)
![20250323_054759.webp](../../../static/img/%ED%92%80%EC%8A%A4%ED%83%9D%20Next.js%20Supabase/03/20250323_054759.webp)

웹 요청이 아닌 Supabase 테이블에 직접 데이터를 입력해 앱과 연동하는 기능을 제작했습니다. week 1 TODO-LIST 에서 배웠던 조회 기능을 사용해 데이터를 출력하는 앱을 제작했습니다. week 2 DropBox 에서 배웠던 recoil 상태관리 라이브러리를 사용해 검색 기능을 구현해 데이터 필터링 방식이 아닌 실시간 요청으로 제작되었습니다.



---
## 3.  <span style={{ color: '#ffd33d' }}> Supabase 과제 week 3 </span>


>### 1. 요구 사항
- 사용자가 특정 영화를 “찜”할 수 있도록 Supabase를 활용해 즐겨찾기 리스트 구현하세요.
  - favorite_movie 테이블을 생성
  - favorite 칼럼을 추가하고 bool 값으로 구분
![20250323_115139.webp](../../../static/img/%ED%92%80%EC%8A%A4%ED%83%9D%20Next.js%20Supabase/03/20250323_115139.webp)

![20250323_133813.webp](../../../static/img/%ED%92%80%EC%8A%A4%ED%83%9D%20Next.js%20Supabase/03/20250323_133813.webp)

Supabase 기능을 사용하면 프론트에서 쿼리 제작이 가능해 요구 사항에 맞는 기능을 빠르게 제작할 수 있게 됩니다.

- 찜한 영화를 영화 리스트 화면의 최상단으로 보여주도록 정렬하세요.
  - favorite-movie-card-list.tsx 에서 컴포넌트 제작 후 호출하는 방식으로 제작했습니다.

![gsg.gif](../../../static/img/%ED%92%80%EC%8A%A4%ED%83%9D%20Next.js%20Supabase/03/gsg.gif)

---
## <span style={{ color: '#ffd33d' }}> 후기 </span>
<details>
<summary> 펼치기 </summary>

**Liked** : 좋았던 점은 무엇인가?
- 훅을 사용한 기능 구현
    - 스크롤 기능을 구현하기 위한 복잡한 과정 없이 간단하게 작성하는 방법을 알게 되었습니다.

**Lacked** : 아쉬웠던 점, 부족한 점은 무엇인가?
- 연동 오류 
    - 가입 기간이 길어져 새로운 저장소 ID를 배정받았은 것 같은데 처음에는 원인을 알 수 없었기 때문에 찾기 힘들었습니다. 프로젝트를 수행하며 얻은 오류 지식으로 해결했습니다. 

**Learned** : 배운 점은 무엇인가? (깨달은것, 인사이트, 기억하고 싶은 것 등)
- 저장소 활용
    - 데이터에 필요한 속성값을 지정하고 쿼리를 통해 조건문을 넣는 경험을 통해 원하는 데이터를 뽑아내는 방법을 알게 되었습니다.


**Longed for** : 앞으로 바라는 것은 무엇인가? (앞으로 어떤 행동을 할것인지)
- 리포지토리 프로젝트 리펙토링
    - 인프런 기간이 종료되면 다른 강의에서 사용했던 프로젝트에 Supabase를 적용해보려고 합니다.
</details>