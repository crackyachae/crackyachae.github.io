---
layout  : article
title   : 취준생을 위한 프론트엔드 기초지식
summary : 면접을 위해 작성해보는 프론트엔드 기초지식 질문 및 답변 모음
date    : 2023-09-22 22:42:44 +0900
updated : 2024-04-18 00:52:23 +0900
tag     : draft
toc     : true
public  : true
parent  : [[/cs-basic/tech-interview]]
latex   : false
---
* TOC
{:toc}

## 브라우저

### ✅ BOM과 DOM에 대해 설명해주세요

* DOM(Document Object Model)은 HTML, XML과 같은 문서, 즉 웹페이지를 제어할 할 수 있도록 문서를 구조화 해 논리 트리로 나타낸 것입니다. 트리는 객체를 포함하는 여러 노드로 구성되어 있습니다.
    * DOM을 통해 프로그래밍적으로 문서의 요소에 접근해 문서의 구조, 스타일, 콘텐츠 등을 변경할 수 있습니다.
* BOM(Browser Object Model)은 브라우저에서 문서 이외의 것, 즉 브라우저의 창이나 프레임을 프로그래밍적으로 제어할 수 있게 해주는 객체 모델 입니다.
    * 대표적인 예로 `location`, `navigator`, `document`, `screen`, `history` 객체 등이 있습니다.
        * `location` 객체는 현재 URL을 읽고 변경할 수 있도록 해줍니다.
        * `navigator` 객체는 브라우저와 운영체제에 대한 정보를 제공합니다.
    * 예를 들어 부라우저의 새 창을 열거나 다른 문서로 이동하는 등의 기능을 실행시킬 수 있습니다.
* 참고: [브라우저 환경과 다양한 명세서](https://ko.javascript.info/browser-environment) (모던 JavaScript 튜토리얼), [DOM 소개](https://developer.mozilla.org/ko/docs/Web/API/Document_Object_Model) (mdn web docs)

### 브라우저는 어떻게 동작 하나요?

### ⭐ 브라우저 렌더링 과정을 설명해주세요

### ⭐ 리플로우와 리페인트에 대해 설명해주세요

> 아래의 성능 최적화와 관련해서 설명할 수 있어야 한다.

#### 리플로우와 리페인트의 발생 조건에 대해 설명해주세요

#### visibility 속성은 리플로우를 발생시킬까요?

## API

### ⭐ REST API에 대해 설명해주세요

## 인증 및 보안

### ✅ 인증(Authentication)과 인가(Authorization)에 대해 설명해주세요

* 인증(Authentication)은 사용자의 신원을 검증하는 프로세스 입니다. ID와 비밀번호를 입력하는 로그인 과정이 대표적인 인증의 예시 입니다.
* 인가(Authorization)는 리소스에 대한 접근 권한을 지정하고 확인하는 프로세스 입니다. 인증 이후에 이뤄지는 경우가 많습니다.
* 참고: [Authentication](https://en.wikipedia.org/wiki/Authentication) (Wikipedia), [Authorization](https://en.wikipedia.org/wiki/Authorization) (Wikipedia), [👨‍💻 쉽게 이해하는 Authentication vs Authorization 차이](https://inpa.tistory.com/entry/CS-%F0%9F%91%A8%E2%80%8D%F0%9F%92%BB-Authentication-vs-Authorization-%EC%B0%A8%EC%9D%B4-%EC%97%84%EC%B2%AD-%EC%89%BD%EA%B2%8C-%EC%84%A4%EB%AA%85) (Inpa Dev)
* 추가자료: [인증/인가는 어디에 어떻게 구현해야 할까?](https://dev.gmarket.com/45) (지마켓 기술블로그)

### ⭐ 쿠키, 세션, 웹스토리지의 차이에 대해 설명해주세요

#### 브라우저에서 탭 이동 혹은 탭 종료 시에는 세션 스토리지에 어떤 영향을 끼치나요?

### ⭐ 로그인 처리를 할 때 쿠키와 세션을 어떻게 사용하시나요?

### ⭐ 토큰 기반 인증 방식에 대해 설명해주세요

### ⭐ JWT 토큰을 쿠키에 저장했을 때 취약점에 대해 설명해주세요

### XSS와 CSRF에 대해 설명해주세요

### ⭐ CORS와 해결 경험을 말씀해주세요

## 웹 접근성

### ⭐ SEO에 대해 설명해주세요

### ⭐ SEO는 어떤 식으로 신경쓰셨나요?

> SEO를 최적화하는 방법에 대해 설명해주세요

### ⭐ CSR과 SSR의 차이는 무엇인가요?

### SPA와 MPA에 대해 설명해주세요

### ⭐ 크로스 브라우징에 대해 설명해주세요

### 크로스 브라우징 이슈를 해결했던 경험을 말씀해주세요

> 크로스 브라우징 이슈를 해결하는 방법에 대해 설명해주세요

## 성능 최적화

### ⭐ 어플리케이션의 성능은 어떤식으로 측정하셨나요?

### LightHouse 결과가 좋지 않을 때, 프로젝트에서 병목 현상은 어떻게 해결할 수 있을까요?

### 웹사이트 성능 최적화에는 어떤 방법이 있나요?

### bundle의 사이즈를 줄이려면 어떻게 해야 하나요?

## 프로젝트 관리 및 배포

### ESLint와 Prettier에 대해 설명해주세요

### Webpack, Babel, Polyfill에 대해 설명해주세요

### package.json에서 private에 대해 설명해주세요

### dependencies 와 devDependencies 차이에 대해 설명해주세요

### 프로젝트를 npm에 배포하려면 어떤 설정이 필요할까나요?

## Git

### Git Flow에 대해 설명해주세요
