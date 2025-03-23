---
sidebar_position: 3
title: "week 3. 리액트와 TDD"
description: 프론트엔드
authors: [MtypEyuc]
tags: [FE]
hide_table_of_contents: false
date: "2025-03-23"
---
**작성일:** {frontMatter.date}

![banner.webp](../../../static/img/FE%20-%20%ED%94%84%EB%A1%A0%ED%8A%B8%EC%97%94%EB%93%9C%20JS%2CREACT/banner.webp)
## 1. <span style={{ color: '#ffd33d' }}> 강의 진도표 </span>

> ### FE (3/17 ~ 3/19)
#### Day 10 리액트 테스트 경험하기 (과제必)
- Section 7~8
#### Day 12 NextJS, 타입스크립트 (과제必)
- Section 9~10
#### Day 13 리덕스 학습하기 및 리액트 19 (과제必)
- Section 11~13

---

## 2. <span style={{ color: '#ffd33d' }}> TDD를 적용한 앱 제작 </span>
![20250323_175959.webp](../../../static/img/FE%20-%20%ED%94%84%EB%A1%A0%ED%8A%B8%EC%97%94%EB%93%9C%20JS%2CREACT/03/20250323_175959.webp)

React Testing Library를 사용해 테스트를 진행하며 사용자에게 보이는 화면이 중요한 프론트엔드기 때문에 이벤트 발생시 화면에 생기는 영향을 측정하는 테스트가 주로 진행됩니다.  

백엔드와 비슷하게 흘러가며 특정 속성값을 포함하고 있는지, 제대로 된 값을 반환하는지 테스트하는 단위 테스트를 작성하고 프로젝트의 신뢰도를 상승시킵니다.  

테스트 방식은 라이브러리마다 차이가 있기 때문에 팀원과 상의하여 테스팅 라이브러리를 선택하는 것이 중요합니다.

---
## 3. <span style={{ color: '#ffd33d' }}> NextJS, 타입스크립트  </span>

>### 1. NextJS
SSR을 쉽게 구현할 수 있게 만들어주는 프레임워크로, 서버에서 HTML을 완성시켜 사용자에게 전달하는 방식은 리액트에서 구현하기 힘들기 때문에 해당 프레임워크를 사용합니다.

>### 2. 타입스크립트
컴파일 시 오류 검사 기능을 제대로 수행하지 못하는 자바스크립트를 보완하기 위해 만들어진 언어로 컴파일 과정을 거치고 자바스크립트 코드로 변환됩니다.  

개발 환경에서만 활성화 되는 코드이며, 타입을 사용해 가독성을 높이고 에러 발생을 사전에 방지할 수 있습니다.

>### 3. 예제 코드
```tsx
// 게시글 데이터를 위한 TypeScript 인터페이스 정의
interface PostData {
    title: string
    date: string
    contentHtml: string
}

// 컴포넌트 Props 타입 지정
interface PostProps {
    postData: PostData
}

// 게시글 상세 페이지 컴포넌트
export default function Post({ postData }: PostProps) {
    return (
        <div>
            {/* 페이지 제목을 동적으로 설정 */}
            <Head>
                <title>{postData.title}</title>
            </Head>
            <article>
                {/* 게시글 제목 */}
                <h1 className={homeStyles.headingXl}>{postData.title}</h1>
                {/* 게시글 날짜 */}
                <div className={homeStyles.lightText}>
                    {postData.date}
                </div>
                {/* 게시글 내용 (HTML을 직접 삽입) */}
                <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
            </article>
        </div>
    )
}

// Next.js에서 동적 경로를 생성하는 함수 (정적 사이트 생성용)
export const getStaticPaths: GetStaticPaths = async () => {
    const paths = getAllPostIds() // 모든 게시글 ID 가져오기
    console.log('paths', paths)
    // 예: [ { params: { id: 'pre-rendering' } }, { params: { id: 'ssg-ssr' } } ]

    return {
        paths, // 사전에 생성할 경로 목록 반환
        fallback: false // 존재하지 않는 경로는 404 페이지로 처리
    }
}

// getStaticProps 함수의 Props 타입 지정
export const getStaticProps: GetStaticProps<PostProps> = async ({ params }) => {
    console.log('params', params)
    // 예: { id: 'ssg-ssr' }

    // params.id가 undefined일 가능성이 있어 안전하게 타입 단언 (as string)
    const postData = await getPostData(params?.id as string)

    return {
        props: {
            postData // Post 컴포넌트에 전달할 데이터
        }
    }
}
```
- 정적 분석을 통해 타입 오류를 미연에 방지할 수 있으며, 데이터 구조를 명확히 하여 가독성과 유지보수성을 향상시키고, 함수에 정확한 타입을 지정할 수 있기 때문에 안정적인 코드를 작성할 수 있습니다.


---
## 4. <span style={{ color: '#ffd33d' }}> 리덕스 </span>

![20250323_183159.webp](../../../static/img/FE%20-%20%ED%94%84%EB%A1%A0%ED%8A%B8%EC%97%94%EB%93%9C%20JS%2CREACT/03/20250323_183159.webp)

리엑트의 상태관리 라이브러리입니다. 컴포넌트 참조시 리엑트의 Props 구성 요소는 위에서 아래로 흐르기 때문에 그 특성상 복잡한 코드를 생성할 가능성이 있습니다. 이를 해결하기 위해 어디서든 참조할 수 있는 전역 상태관리 라이브리러를 사용합니다.

## <span style={{ color: '#ffd33d' }}> 후기 </span>
<details>
<summary> 펼치기 </summary>

**Liked** : 좋았던 점은 무엇인가?
- 여러 환경에서 테스트
    - 테스트 코드를 적용하고 다양한 프로젝트에 TDD를 적용하며 수업을 진행해 평소 궁금했던 테스팅 코드를 작성하는 방법을 배웠습니다.

**Lacked** : 아쉬웠던 점, 부족한 점은 무엇인가?
- 콘솔 찍는게 아님
    - 주로 백엔드 데이터를 호출하는 API를 제작하고 프론트에 출력하는 방식을 사용했었기 때문에 앞단에서 하는 일은 타입스크립트를 적용하고 데이터를 불러오는 일이 대부분이었는데 출력하는 화면을 테스트 하는 방식이나 컴포넌트 자체를 테스트 하는 방식을 새로 알게되었습니다.

**Learned** : 배운 점은 무엇인가? (깨달은것, 인사이트, 기억하고 싶은 것 등)
- TDD, NEXT, REDUX
    - 프로젝트에 어떤 방식으로 테스트를 해야 하는지 알게 되었습니다. 상태관리 라이브러리를 통해 테스트 하는 방법도 알게 되었습니다.


**Longed for** : 앞으로 바라는 것은 무엇인가? (앞으로 어떤 행동을 할것인지)
- 프로젝트 제출
    - 배운 내용으로 마감 기한까지 요구사항에 맞는 프로젝트 3개를 제작할 것입니다.
</details>

