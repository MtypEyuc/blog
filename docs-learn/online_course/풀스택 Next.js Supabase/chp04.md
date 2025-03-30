---
sidebar_position: 4
title: "week 4. Infstagram, vercel 배포"
description: Supabase
authors: [MtypEyuc]
tags: [FullStack]
hide_table_of_contents: false
date: "2025-03-30"
---
**작성일:** {frontMatter.date}

![banner.webp](../../../static/img/%ED%92%80%EC%8A%A4%ED%83%9D%20Next.js%20Supabase/banner.webp)

## 1. <span style={{ color: '#3d69ff' }}> 강의 진도표 </span>

>### Full-Stack (~3/30)
#### Day 11 인스타그램 클론 - 프로젝트 준비
- Section 6 (강의 소개, Git 설정)
#### Day 12 인스타그램 클론 - 로그인 & 회원가입 구현
- Section 6 (인증 구현)
#### Day 13 인스타그램 클론 - 채팅 기능 구현
- Section 7 (채팅 UI, Realtime 채팅)
#### Day 14 인스타그램 클론 - RLS 적용
- Section 7 (RLS 심화 강의)
#### Day 15 웹사이트 배포하기 - Vercel 배포, AWS EC2 배포, 도메인 등록
- Section 8 (도메인 등록, Vercel, AWS 배포)

---
## 2.  <span style={{ color: '#3d69ff' }}> Supabase 실습 week 4 </span>
>### 1. 인증 기능 구현
#### 메일 인증하기
![01.webp](../../../static/img/%ED%92%80%EC%8A%A4%ED%83%9D%20Next.js%20Supabase/04/01.webp)  
Supabase에서 제공하는 다양한 기능 중 하나인 메일 인증 기능입니다. 이메일 인증시 보내는 메세지를 작성할 수 있습니다.  

![02.webp](../../../static/img/%ED%92%80%EC%8A%A4%ED%83%9D%20Next.js%20Supabase/04/02.webp)  
![03.webp](../../../static/img/%ED%92%80%EC%8A%A4%ED%83%9D%20Next.js%20Supabase/04/03.webp)    
인증페이지 구현 후 메일이 온 것을 확인할 수 있습니다.  
![04.webp](../../../static/img/%ED%92%80%EC%8A%A4%ED%83%9D%20Next.js%20Supabase/04/04.webp)  
![05.webp](../../../static/img/%ED%92%80%EC%8A%A4%ED%83%9D%20Next.js%20Supabase/04/05.webp)  
로그인 완료 페이지를 구현한 뒤 데이터 베이스 유저 인증 목록에서 인증된 아이디를 확인할 수 있습니다.  

#### OTT 인증하기
![06.webp](../../../static/img/%ED%92%80%EC%8A%A4%ED%83%9D%20Next.js%20Supabase/04/06.webp)  
Supabase에서 제공하는 다양한 기능 중 하나인 OTT 인증 기능입니다. 메일 인증 시 링크 대신 6자리의 비밀번호가 생성됩니다.  

![07.webp](../../../static/img/%ED%92%80%EC%8A%A4%ED%83%9D%20Next.js%20Supabase/04/07.webp)  
![08.webp](../../../static/img/%ED%92%80%EC%8A%A4%ED%83%9D%20Next.js%20Supabase/04/08.webp)  
인증페이지 구현 후 메일이 온 것을 확인할 수 있습니다.  


>### 2. 실시간 채팅 기능
#### postgresql realtime
![09.webp](../../../static/img/%ED%92%80%EC%8A%A4%ED%83%9D%20Next.js%20Supabase/04/09.webp)  
![10.webp](../../../static/img/%ED%92%80%EC%8A%A4%ED%83%9D%20Next.js%20Supabase/04/10.webp)  
Supabase는 **PostgreSQL**을 기반으로 하며, **Realtime** 기능을 통해 실시간 데이터베이스 변경을 감지하고 구독할 수 있습니다. 

![gsg.gif](../../../static/img/%ED%92%80%EC%8A%A4%ED%83%9D%20Next.js%20Supabase/04/gsg.gif)  

![11.webp](../../../static/img/%ED%92%80%EC%8A%A4%ED%83%9D%20Next.js%20Supabase/04/11.webp)  
입력한 대화 내용이 데이터 베이스에 등록된 것을 확인할 수 있고, 채팅 등록 기준으로 유저 스테이터스(Time)가 변경됩니다.


>### 3. RLS 정책
**RLS(Row Level Security)**는 Supabase에서 사용자별 데이터 접근을 제한하는 보안 기능입니다. 활성 상태에서는 기본적으로 아무런 데이터도 접근할 수 없기 때문에 사용하지 않거나 권한을 부여해야 합니다.

#### 권한 부여하기
![12.webp](../../../static/img/%ED%92%80%EC%8A%A4%ED%83%9D%20Next.js%20Supabase/04/12.webp)  
![13.webp](../../../static/img/%ED%92%80%EC%8A%A4%ED%83%9D%20Next.js%20Supabase/04/13.webp)  
전용 쿼리나 사용자 쿼리를 사용해 폴리시 등록 후 RLS에 접근할 수 있습니다.

>### 4. Vercel 배포하기
![14.webp](../../../static/img/%ED%92%80%EC%8A%A4%ED%83%9D%20Next.js%20Supabase/04/14.webp)
![15.webp](../../../static/img/%ED%92%80%EC%8A%A4%ED%83%9D%20Next.js%20Supabase/04/15.webp)
![16.webp](../../../static/img/%ED%92%80%EC%8A%A4%ED%83%9D%20Next.js%20Supabase/04/16.webp)

Git 레포지토리 연동 후 최신 커밋 내용 또는 선택한 커밋을 배포할 수 있습니다. 민감한 정보는 설정 페이지에서 작성 후 배포 환경에서 사용할 수 있습니다.

---
## 3.  <span style={{ color: '#3d69ff' }}> Supabase 프로젝트 목록 </span>
>### [Supabase-Todo](https://supabase-todo-pi-sepia.vercel.app/)
![17.webp](../../../static/img/%ED%92%80%EC%8A%A4%ED%83%9D%20Next.js%20Supabase/04/17.webp)  
>### [Supabase-DropBox](https://inflearn-supabase-dropbox-clone-phi.vercel.app/)  
![18.webp](../../../static/img/%ED%92%80%EC%8A%A4%ED%83%9D%20Next.js%20Supabase/04/18.webp)  
>### [Supabase-TMDBFLIX](https://inflearn-supabase-netflix-clone-blond.vercel.app/)  
![19.webp](../../../static/img/%ED%92%80%EC%8A%A4%ED%83%9D%20Next.js%20Supabase/04/19.webp)  
>### [Supabase-Infstagram](https://inflearn-supabase-instagram-clone-snowy.vercel.app/)  
![20.webp](../../../static/img/%ED%92%80%EC%8A%A4%ED%83%9D%20Next.js%20Supabase/04/20.webp)  


## <span style={{ color: '#3d69ff' }}> 4L 회고 </span>

**Liked** : 좋았던 점은 무엇인가?
- Supabase 활용과 완주
  - 개념적으로만 알고있던 Supabase를 실습 위주의 강의를 통해 자세하게 알게 되었고, 4주간의 커리큘럼을 진행하며 프로젝트 완성에 필요한 시간 관리와 문제 해결 능력이 향상되었습니다.

**Lacked** : 아쉬웠던 점, 부족한 점은 무엇인가?
- 오타가 문제
    - 클론 코딩을 진행하다 보면 에러가 가끔 발생하게 되는데, 집중력 문제로 인한 오타인 경우가 많습니다. 클론 코딩을 할 때도 집중해서 코드를 작성하고 어떤 내용을 만들고 있었는지 잊지 말하야 하는 것을 느꼈습니다.

**Learned** : 배운 점은 무엇인가? (깨달은것, 인사이트, 기억하고 싶은 것 등)
- Supabase와 로직
    - Supabase 기능만을 배운 것이 아니라 페이지를 만들 때 사용되는 로직을 더 많이 배우게 되었습니다. 실제 사용할 수 있는 코드가 많았기 때문에 더 좋은 강의였습니다.


**Longed for** : 앞으로 바라는 것은 무엇인가? (앞으로 어떤 행동을 할것인지)
- 데이터 크롤링 배우기
    - Supabase와 데이터 크롤링을 활용한 데이터 관리 능력이 필요하기 때문에 파이썬과 데이터 크롤링을 주제로 더 공부할 것입니다.
