---
sidebar_position: 1
title: "week 1. TODO-LIST"
description: Supabase
authors: [MtypEyuc]
tags: [FullStack]
hide_table_of_contents: false
---
![banner.webp](../../../static/img/%ED%92%80%EC%8A%A4%ED%83%9D%20Next.js%20Supabase/banner.webp)

## 1. <span style={{ color: '#ffd33d' }}> 강의 진도표 </span>

>### Full-Stack (3/4~3/8)
#### Day 1 오리엔테이션
- Section 1
#### Day 2 Next.js 기본기
- Section 2 (Next.js Part 1,2)
#### Day 3 TailWindCSS & Recoil
- Section 2 (TailWindCSS, Recoil)
#### Day 4 React Query & Supabase 소개
- Section 2 (React Query)
- Section 3 (강의 소개)
#### Day 5 TODO List 클론 - 프로젝트 설정 & CRUD 구현
- Section 3 (Git설정, Supabase연동, CRUD 구현)

---
## 2.  <span style={{ color: '#ffd33d' }}> 강의 진행 방식 </span>
![01.webp](../../../static/img/%ED%92%80%EC%8A%A4%ED%83%9D%20Next.js%20Supabase/01/01.webp)

- 클론 코딩 형식으로 진행하며, 노션에 등록된 자료를 참조할 수 있게 만들어져 있다. 말 그대로 해당 코드를 따라 치기만 하면 완성품이 생성되는 형식이다.

>### 1. 트러블
그냥 시작하자마자 오류가 생겼다. 강의는 `material-tailwind/react`라는 css 컴포넌트를 사용하고 있었는데 버전 문제로 인해 의존성 오류가 발생하고 있었다.
처음 프로젝트에 적용할 때는 간단히 import 되어 있으니까 파일 경로를 불러오고 export 해서 오류를 잡았었는데, 섹션을 진행하면서 애플리케이션이 먹통이 되는 정도의 오류가 발생하게 되었다.

---
>### 2. 해결
당시에는 문제가 왜 일어났는지 알 수 없었기 때문에 NEXT와 노드 버전을 바꾸기도 하고 레딧과 구글에서 정보를 찾아보았지만, 방법이 나오지 않아서 결국 강사가 깃허브에 올린 파일을 뜯었다.
`package.json` 파일에서 버전을 확인하고 비교한 뒤 적용시키고 문제를 해결했다. 생각해보면 다른 CSS 쓰면 되는 건데 오기가 생겨버려서 리포지토리를 계속 갈아엎으면서 진행했던 것 같다. 클론 코딩 컨텐츠니까 반드시 클론 코딩을 해야 한다는 강박에서 비롯된 것 같다.

---
## 3.  <span style={{ color: '#ffd33d' }}> Supabase 실습 week 1 </span>
![02.webp](../../../static/img/%ED%92%80%EC%8A%A4%ED%83%9D%20Next.js%20Supabase/01/02.webp)
![03.webp](../../../static/img/%ED%92%80%EC%8A%A4%ED%83%9D%20Next.js%20Supabase/01/03.webp)
![04.webp](../../../static/img/%ED%92%80%EC%8A%A4%ED%83%9D%20Next.js%20Supabase/01/04.webp)

Supabase 회원가입 후 프로젝트에 API_KEY를 기입하고 IDE 로그인을 통해 토큰을 부여받은 뒤 사용할 수 있다. 이후 데이터가 CRUD 되는 것을 확인할 수 있게 된다.

---
## <span style={{ color: '#ffd33d' }}> 후기 </span>
<details>
<summary> 펼치기 </summary>

1. **좋았던 점**: 인터넷에 널려있는 단순 TODO 연동방식이 아닌 프로젝트 구조와 사용해야 하는 기능을 예를 들어 이해에 도움을 준다.


2. **배운 점**: Supabase를 연동하는 방법과 버전 문제가 일어났을 때 어떻게 행동해야 하는지 하나 더 알게 되었다.


3. **어려웠던 점**: 깃허브 사용에 익숙하지 않아 프로젝트에 문제가 생겼을때 왜 나에게 문제가 일어났는지 생각하고 해결하는 것이 미숙함을 알게되었다. 인프런 스터디를 이것 외에 4개를 더 진행하고 있기 때문에 문제가 일어났을 때 빠르게 처리하지 않으면 계획에 차질이 생길 것이다.


4. **향후 계획**: 계획을 설계하고 실천하는 것만 중요한 줄 알았는데 문제를 해결하지 못하면 더 큰 문제가 생기는 것을 뼈저리게 느낀다. 안정적인 프로젝트를 생성하기 위해 더 치밀하게 계획해서 문제 발생 가능성을 줄여야 한다.
</details>



