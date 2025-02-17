---
sidebar_position: 9
title: "9장 모던 리액트 개발 도구로 개발 및 배포 환경 구축하기"
description: 모던 리액트 개발 도구로 개발 및 배포 환경 구축하기
authors: [MtypEyuc]
tags: [React]
hide_table_of_contents: false
---

## 1. Next.js로 리액트 개발 환경 구축하기
### 1. create-next-app 없이 하나씩 구축하기
보통 명령어를 사용하거나 IDE 프로젝트 생성을 통해 기본 환경을 구축하는데 애플리케이션을 온전히 이해하기 위해 `package.json` 부터 차례대로 필요한 파일을 직접 만들어 보는 것이 좋다. 
```
npm init
```
package.json 파일을 생성한다.
```
npm i react react-dom next
```
핵심 라이브러리를 설치한다.
```
npm i @types/node @types/react @types/react-dom eslint eslint-config-next typescript --save-dev
```
의존 패키지를 설치한다.
### 2. [tsconfig.json 작성하기](https://www.typescriptlang.org/ko/tsconfig/)

```json
"$schema": "https://json.schemastore.org/tsconfig.json",
"compilerOptions": {
"target": "es5",
"lib": ["dom", "dom.iterable", "esnext"],
"allowJs": true,
"skipLibCheck": true,
"strict": true,
"forceConsistentCasingInFileNames": true,
"noEmit": true,
"esModuleInterop": true,
"module": "esnext",
"moduleResolution": "node",
"resolveJsonModule": true,
"isolatedModules": true,
"jsx": "preserve",
"incremental": true,
"baseUrl": "src",
"paths": {
"#pages/*": ["pages/*"],
"#hooks/*": ["hooks/*"],
"#types/*": ["types/*"],
"#components/*": ["components/*"],
"#utils/*": ["utils/*"]
}
},
"include": ["next-env.d.ts", "**/*.ts", "**/*.tsx"],
"exclude": ["node_modules"]
}
```
- **compilerOptions**: 타입스크립트를 자바스크립트로 컴파일할 때 사용하는 옵션이다.


- **target**: 타입스크립트가 변환을 목표로 하는 언어의 버전을 의미한다.


- **lib**: 해당 환경 라이브러리를 포함하겠다고 정의하는 것을 의미한다.


- **allowJs**: 타입스크립트가 자바스크립트 파일 또한 컴파일할지를 결정한다.


- **skipLibCheck**: 라이브러리에서 제공하는 d.ts에 대한 검사 여부를 결정한다.


- **strict**: 타입스크립트 컴파일러의 엄격 모드를 제어한다


- **forceConsistentCasingInFileNames**: 파일 이름의 대소문자를 구분하도록 강제한다


- **noEmit**: 컴파일을 하지 않고, 타입 체크만 한다. Next.js는 `swc`가 타입스크립트 파일을 매우 빠른 속도로 컴파일 한다.


- **esModuleInterop**: CommonJS 방식으로 보낸 모듈을 ES 모듈 방식의 import로 가져올 수 있게 해준다


-  **module**: 모듈 시스템을 설정한다. commonjs는 `require`를 사용하고, esnext 는 `import`를 사용한다.


- **moduleResolution**: 모듈을 해석하는 방식을 설정한다.


- **resolveJsonModule**: JSON 파일을 import할 수 있게 해준다. 이 옵션을 켜두면 allowJs 옵션도 자동으로 켜진다


- **isolatedModules**: 다른 모듈 시스템과 연계되지 않고 단독으로 있는 파일의 생성을 막기 위한 옵션이다.


- **jsx**: .tsx 파일 내부에 있는 JSX를 어떻게 컴파일할지 설정한다


- **incremental** :타입스크립트에서 마지막 컴파일 정보를.tsbuildinfo 파일 형태로 만들어 디스크에 저장한다.


- **baseUrl**: 모듈을 찾을 때 기준이 되는 디렉터리를 지정한다.


-  **paths**: 상대 경로에 별칭을 지정해 사용하기 편하게 만들 수 있다. `#`나 `$` 같은 특수문자 접두사와 함께 자주 사용된다


- **include**: 타입스크립트 컴파일 대상에서 포함시킬 파일 목록을 의미한다.


- **exclude**: 타입스크립트 컴파일 대상에서 제외시킬 파일 목록을 의미한다.


### 3. next.config.js 작성하기
```js
/** @type {import('next').NextConfig} */
const nextConfig = {
reactStrictMode: true,
poweredByHeader: false,
eslint: {
ignoreDuringBuilds: true,
},
}
module.exports = nextConfig
```

- **reactStrictMode**: 리액트의 엄격 모드를 활성화한다.

- **poweredByHeader**: 일반적으로 보안 취약점으로 취급되는 X-Powered-By 헤더를 제거한다

- **eslint.ignoreDuringBuilds**: 빠른 빌드를 위해 빌드 시 ESLint를 무시한다.
### 4. [ESLint와 Prettier 설정하기](https://github.com/titicacadev/triple-config-kit#eslint-config-triple)
```
npm i @titicaca/eslint-config-triple --save-dev
```
```ts
const path = require('path')
const createConfig = require('@titicaca/eslint-config-triple/create-config')
const { extends: extendConfigs, overrides } = createConfig({
type: 'frontend',
project: path.resolve(__dirname, './tsconfig.json'),
})
module.exports = {
extends: [...extendConfigs, 'next/core-web-vitals'],
overrides,
}
```
잠재적 문제 확인을 위한`eslint-config-next`와 코드 스타일링을 위한 `eslint-config-triple`이 함께 작동하게 하려면 별도의 설정이 필요하다.

### 5. 애플리케이션 코드 작성
- **pages**: Next.js에서 예약어로 지정해 두고 사용하는 폴더로, 이 폴더 하위의 내용은 모두 실제 라우터가 된다.


- **components**: 페이지 내부에서 사용하는 컴포넌트를 모아둔 폴더다.


- **hooks**: 직접 만든 훅을 모아둔 폴더다.


- **types**: 서버 응답 타입 등 공통으로 사용하는 타입을 모아둔 폴더다.


- **utils**: 애플리케이션 전역에서 공용으로 사용하는 유틸성 파일을 모아둔 폴더다.



## 2. 깃허브 100% 활용하기
### 1. 깃허브 액션으로 CI 환경 구축하기
#### 1. CI (Continuous Integration)
- 지속적 통합이란 뜻으로, 중앙 저장소에서 코드의 변화가 있을 때마다 전체 정합성을 확인하기 위한 작업을 자동으로 실행한다.
#### 2. CD (Continuous Delivery / Continuous Deployment)
- 지속적 전달 : CI 이후 자동으로 배포 준비를 완료해주며 개발자의 승인 후 배포된다.
- 지속적 배포: CI 이후 테스트를 통과하면 자동으로 별도의 승인 없이 배포된다.
### 2. 깃허브 액션의 기본 개념
- **runner**: 파일로 작성된 깃허브 액션이 실행되는 서버를 의미한다.
- **action**: 러너에서 실행되는 하나의 작업 단위를 의미한다. yaml 파일로 작성된 내용을 하나의 액션으로 볼 수 있다
- **event**: 깃허브 액션의 실행을 일으키는 이벤트를 의미한다. pull request, push 등이 해당된다.
- **jobs**: 하나의 러너에서 실행되는 여러 스텝의 모음을 의미한다.
- **steps**: 잡 내부에서 일어나는 하나하나의 작업을 의미한다.
### 3. 깃허브 액션 작성하기
저장소 루트에 .github/workflows 폴더를 생성하고 build.yaml 파일을 작성한다.
```yaml
name: chapter7 build
run-name: ${{ github.actor }} has been added new commit.

on:
  push:
    branches-ignore:
      - 'main'

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3

      - uses: actions/setup-node@v3
        with:
          node-version: 16

      - name: 'Install dependencies'
        working-directory: ./chapter7/my-app
        run: npm ci

      - name: 'Build'
        working-directory: ./chapter7/my-app
        run: npm run build
```
- **name**: 액션을 구분하는 데 필요한 이름을 지정할 수 있다. 


- **run-name**: 액션 실행을 구별하는 타이틀 명이다. 누가 어떤 액션을 트리거 했는지 정도를 구별한다.


- **on**: 필수 값으로, 언제 해당 액션을 실행할지를 정의한다. [깃허브 문서](https://docs.github.com/ko/actions/writing-workflows/workflow-syntax-for-github-actions)에 자세한 내용이 있다.


- **jobs**: 필수 값으로, 해당 액션에서 수행할 잡을 의미한다. 여러 개를 설정하면 병렬로 실행된다.



- **브랜치 보호 규칙**: 머지 하기 전 수행해야 하는 액션을 설정할 수 있다. 해당 액션이 실패하면 머지할 수 없다.


### 4. 직접 작성하지 않고 유용한 액션과 깃허브 앱 가져다 쓰기
깃허브에서 제공하는 기본 액션들과 [Marketplaces](https://github.com/marketplace?type=actions) 서비스를 이용해 다른 사용자가 만든 액션을 사용할 수 있다.
### 5. Dependabot 사용하기
```yaml
# .github/dependabot.yml

version: 2
updates:
  - package-ecosystem: "npm"  # 사용할 패키지 관리자 (npm, yarn 등)
    directory: "/"  # 의존성 파일이 위치한 디렉터리 (대개 루트 디렉터리)
    schedule:
      interval: "weekly"  # 업데이트 확인 주기 (daily, weekly, monthly)
    ignore:
      - dependency-name: "express"  # 특정 패키지는 무시하고 업데이트 하지 않도록 설정
        versions: ["4.x.x"]
```
- 해당 루트 디렉토리의 의존성 파일을 매주 확인하고 패키지의 버전 업데이트를 막을 수 있다.


- 의존성 업데이트가 필요하면 자동으로 풀 리퀘스트를 생성하고 업데이트 된 파일의 의존성 버전과 해결된 취약점이 포함된다.
## 3. 리액트 애플리케이션 도커라이즈하기
### 1. 리액트 앱을 도커라이즈하는 방법
애플리케이션을 도커 이미지로 만들어 신속하게 구축해 배포할 수 있는 상태로 준비하는 것을 도커라이즈라고 한다.
#### 1. 용어
- 이미지: 컨테이너를 만드는 데 사용하는 템플릿을 의미한다. 도커 파일을 빌드하면 이미지를 만들 수 있다.


- 컨테이너: 이미지를 실행한 상태이다. 이미지가 목표하는 운영체제, 파일 시스템. 네트워크 등을 할당해 실행시킬 수 있는 독립된 공간이다.


- 도커 파일: 어떤 이미지 파일을 만들지 정의하는 파일이다.


- 태그: 이미지를 식별할 수 있는 레이블 값이다. `이름:태그명` 형태로 구성되어있다.


- 리포지터리: 태그로 지정된 이미지가 모여있는 저장소다.


- 레지스트리: `Docker Hub` 등이 있으며  리포지터리에 접근할 수 있께 해주는 서비스다. 
#### 2. create-next-app을 위한 Dockerfile 작성하기
```dockerfile
FROM node:18.12.0-alpine3.16 as deps
WORKDIR /app
COPY package.json ./package.json
COPY package-lock.json ./package-lock.json
RUN npm ci
```
프로젝트에 필요한 노드 모듈을 생성한다.
```dockerfile
FROM node:18.12.0-alpine3.16 as build
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . ./
RUN npm run build
```
앞에서 생성한 노드 모듈을 복사해서 사용하고 프로젝트를 빌드한다.
```js
/** @type {import('next').NextConfig} */
const nextConfig = {
reactStrictMode: true,
swcMinify: true,
// 이 옵션을 추가
output: 'standalone',
}
module.exports = nextConfig
```
Next.js가 프로덕션 실행에 필요한 파일을 모아서 준비해준다.
```dockerfile
FROM node:18.12.0-alpine3.16 as runner
COPY --from=build /app/public ./public
COPY --from=build /app/.next/standalone ./
COPY --from=build /app/.next/static ./.next/static
EXPOSE 3000
ENTRYPOINT ["node", "server.js"]
```
runner 단계를 만들어서 standalone으로 만들어진 Next.js를 실행한다.
```
docker build . -t next:test
```
이미지를 빌드하고 도커 데스크톱에서 실행할 수 있다.
### 2. 도커로 만든 이미지 배포하기
```
dockerhub-username/repository-name:tag

docker login

docker push myusername/my-react-app:latest
```
를 입력하면 해당 계정의 저장소에서 도커 이미지를 확인할 수 있다.

### 3. 배포한 이미지 실행하기
```
docker pull myusername/my-react-app:latest

docker run -p 80:80 myusername/my-react-app:latest
```
도커 허브에 푸시한 이미지를 받아 서버에서 실행할 수 있다.  

## 작성하고 느낀 점
좋았던 점: 리액트 앱을 배포하고 관리하는 기능들을 확인하고 자주 사용하는 도구의 깊은 내용을 배우게 되었다

배운 점: 리액트에서 사용하는 관리 도구에 대해 배웠다.

아쉬운 점: 예전 프로젝트에서 도커를 사용한 적은 있지만 제대로 활용하지 못한 점이 아쉬웠는데, 현업에서 어떤 식으로 사용되는지 이해가 부족해서 기회가 있으면 강의를 구독할 것이다.

향후 계획: 가장 많이 사용된다는 리액트 18, 넥스트 13을 배우기 위해 10장과 11장을 읽어야 한다.