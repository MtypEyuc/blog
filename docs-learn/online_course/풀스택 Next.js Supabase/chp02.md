---
sidebar_position: 2
title: "week 2. Dropbox"
description: Supabase
authors: [MtypEyuc]
tags: [FullStack]
hide_table_of_contents: false
date: "2025-03-14"
---
**작성일:** {frontMatter.date}

![banner.webp](../../../static/img/%ED%92%80%EC%8A%A4%ED%83%9D%20Next.js%20Supabase/banner.webp)

## 1. <span style={{ color: '#ffd33d' }}> 강의 진도표 </span>

>### Full-Stack (3/10~3/14)
#### Day 6 Dropbox 클론 - 프로젝트 준비
- Section 4 (강의 소개, Git 설정)
#### Day 7 Dropbox 클론 - UI 구축(선택)
- Section 4 (UI 구축)
#### Day 8 Dropbox 클론 - 파일 업로드 구현
- Section 4 (Supabase Storage, 업로드 기능)
#### Day 9 Dropbox 클론 - 파일 삭제 & 멀티 업로드
- Section 4 (파일 제거, Drag & Drop)
#### Day 10 중간 점검
- 온라인 세션
---
## 2.  <span style={{ color: '#ffd33d' }}> 중간 점검 </span>
![01.webp](../../../static/img/%ED%92%80%EC%8A%A4%ED%83%9D%20Next.js%20Supabase/02/01.webp)
![02.webp](../../../static/img/%ED%92%80%EC%8A%A4%ED%83%9D%20Next.js%20Supabase/02/02.webp)

금요일 예정이었던 온라인 중간 점검이 목요일로 변경되었습니다. 프론트엔드 개발자 면접에 필요한 지식과 설문조사를 통한 Q&A 방식으로 진행했으며,
포트폴리오 작성에 도움이 되는 정보들을 공유하는 시간이었습니다.

---
## 3.  <span style={{ color: '#ffd33d' }}> Supabase 실습 week 2 </span>
![04.webp](../../../static/img/%ED%92%80%EC%8A%A4%ED%83%9D%20Next.js%20Supabase/02/04.webp)
![03.webp](../../../static/img/%ED%92%80%EC%8A%A4%ED%83%9D%20Next.js%20Supabase/02/03.webp)

먼저 UI와 필수 기능을 구성하고 이후 Supabase Storage 연동을 통해 이미지 파일을 업로드 하고 화면에 리스트를 출력할 수 있는 기능을 제작했습니다.
오라클 같은 데이터베이스를 사용할 때 파일 형식의 데이터는 복잡한 방식으로 저장했어야 했는데, Supabase의 기능을 사용하니 아주 손쉽게 기능을 구현할 수 있었습니다.

---
## 3.  <span style={{ color: '#ffd33d' }}> 기능 </span>

![fn.gif](../../../static/img/%ED%92%80%EC%8A%A4%ED%83%9D%20Next.js%20Supabase/02/fn.gif)

---
## <span style={{ color: '#ffd33d' }}> 후기 </span>
<details>
<summary> 펼치기 </summary>

**Liked** : 좋았던 점은 무엇인가?
- 파일 객체 사용
    - List와 image를 출력하는 단순 기능이 아닌 파일 객체를 사용해 기능을 구현하는 과정을 배울 수 있었습니다.

**Lacked** : 아쉬웠던 점, 부족한 점은 무엇인가?
- 기본 지식 부족
    - 부트 캠프에서 스프링을 사용해 파일 저장 기능을 구현했을 때, 당시에는 너무 복잡하고 어려운 방식의 커리큘럼 때문에 정보를 공유할 사람이 적어 제대로 배우지 못했었는데, 파일 관련해서 더 깊게 공부 했으면 강의를 더 쉽게 이해했을 것 같았습니다.

**Learned** : 배운 점은 무엇인가? (깨달은것, 인사이트, 기억하고 싶은 것 등)
- 스토리지 연동
    - Supabase Storage를 사용해 파일을 저장하거나 데이터를 가져오는 방법을 배웠습니다.


**Longed for** : 앞으로 바라는 것은 무엇인가? (앞으로 어떤 행동을 할것인지)
- 필요할 때 참조할 수 있게 만들기
    - Dropbox에서 구현한 기능은 현업에서 어떤 방식으로든 사용되는 기능이기 때문에 저장된 리포지토리를 기억하고 필요한 일이 있으면 참조할 수 있게 만들 것입니다.
</details>



