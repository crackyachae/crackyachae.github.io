---
layout  : article
title   : 서버 사이드 소개 (Introduction to the server side)
summary : 
date    : 2021-11-13 12:24:52 +0900
updated : 2021-11-15 00:53:22 +0900
tag     : draft
toc     : true
public  : true
parent  : [[mdn-learn-web-server]]
latex   : false
---
* TOC
{:toc}

> 이 글은 MDN Learn web development의 [Server-side website programming first steps](https://developer.mozilla.org/en-US/docs/Learn/Server-side/First_steps) 중 [Introduction to the server-side](https://developer.mozilla.org/en-US/docs/Learn/Server-side/First_steps/Introduction)의 내용을 번역 및 정리한 글입니다.
>
> * 제가 필요한 부분 위주로 확인하면서 정리하고 있어 글에 덜 작성된 부분이 있을 수 있습니다.
> * 글 작성 후 원문의 내용이 수정되거나 내용을 이해하기 위한 개인적인 설명이나 해석이 있을 수 있습니다. 되도록 원문을 참고해주시길 바랍니다.
> * 잘못된 부분이 있다면 댓글이나 그 외 편하신 방법으로 알려주시면 감사하겠습니다.

## 서버 측 웹 사이트 프로그래밍이란 (What is server-side website programming?)

웹 브라우저는 웹 서버와 **H**yper**T**ext **T**ransfer **P**rotocol (HTTP)을 이용해 통신한다.

* 웹 페이지의 링크를 클릭하거나, 형식을 제출하거나, 검색을 수행할 때, 브라우저에서 **HTTP 요청**을 대상(target) 서버로 보내게 된다.

웹 서버는

* 클라이언트의 요청 메시지를 기다리다
* 이들이 도착하면 처리(process)한 뒤
* 웹 브라우저에 **HTTP 응답** 메시지를 돌려(reply)준다.

요청에 성공적으로 응한 응답에는 요청받은 리소스(e.g. 새로운 HTML 페이지, 이미지 등)가 포함되어 있으며 웹 브라우저에 표시될 수 있다.

### 정적 사이트 (Static sites)

정적 사이트는 어떤 리소스가 요청될 때마다 서버가 하드 코딩된 동일한 내용을 보여주는 사이트이다.

사용자가 페이지를 탐색 하고 싶어 하면 브라우저가 그 URL을 특정하는 HTTP "GET" 요청을 보낸다.

서버는

* 파일 시스템에서 요청받은 문서를 검색하고
* 해당 문서와 성공상태(success status, 보통 "200 OK")를 포함한 HTTP 응답을 반환한다.
* 만약 파일을 어떤 이유로 찾을(retrieve) 수 없으면 에러 상태(error status)가 반환된다.
    * [클라이언트 에러 응답](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status#client_error_responses)과 [서버 에러 응답](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status#server_error_responses)을 참고하자.

### 동적 사이트 (Dynamic sites)

동적 웹 사이트는 응답 콘텐츠가 필요할 때 *동적*으로 생성되는 웹 사이트이다.

일반적으로 동적 웹 사이트에서 HTML 페이지는 데이터베이스의 데이터를 HTML 템플릿의 자리 표시자(placeholders)에 넣어 생성한다.

* 이 방식이 정적 웹 사이트를 사용하는 것보다 많은 양의 콘텐츠를 저장하기에 훨씬 효율적이다.

동적 사이트는

* 사용자나 저장된 환경이 제공하는 정보를 기반으로 (동일한) URL에 다른 데이터를 반환할 수 있으며
* 응답을 반환하는 것의 일환으로 다른 동작(operation)을 수행할 수 있다. (e.g. 알림 보내기)

동적 사이트를 탐색할 때도 기본적으로는

* 브라우저는 서버에 HTTP 요청을 보내고
* 서버는 요청을 처리하고 적절한 HTTP 응답을 보낸다.

*정적* 리소스의 요청은 정적 사이트와 같은 방식으로 처리된다.

* 정적 리소스는 어떤 파일이든 "바뀌지 않는" 파일이다.
    * 일반적인 예로 CSS, 자바스크립트, 이미지, 미리 생성된 PDF 파일 등이 있다.

반면에 *동적* 리소스의 요청은 (2) 서버 측 코드(그림에서는 *웹 애플리케이션*으로 표시)로 전달된다.

"동적 응답"을 위해 서버는

* 요청을 해석하고
* 데이터베이스에서 필요한 정보를 읽은 뒤 (3)
* 검색한 데이터를 HTML 템플릿과 결합해 (4)
* 생성된 HTML을 포함한 응답을 되돌려준다 (5, 6).

## 서버 측과 클라이언트 측 프로그래밍 비교 (Are server-side and client-side programming the same?)

서버 측과 클라이언트 측 코드는 명확하게 다르다.

* 두 측면의 코드는 목적과 관심사가 다르다.
* 일반적으로 같은 프로그래밍 언어를 사용하지 않는다.
    * 예외로 자바스크립트는 서버와 클라이언트 측 모두에서 사용할 수 있다.
* 다른 운영체제 환경에서 실행된다.

클라이언트 측 코드는

* 브라우저에서 실행되는 코드로
* 주로 렌더링 된 웹 페이지의 모습(appearance)과 동작(behavior)을 개선하는 것에 관여한다.
* 위의 업무는 다음의 것들을 포함한다.
    * UI 구성 요소를 선택하고 스타일을 지정한다.
    * 레이아웃, 탐색, 양식 유효성 검사 등을 만든다.

대조적으로 서버 측 코드는

* 대부분 요청에 대한 응답으로 브라우저에 *어떤 콘텐츠*를 반환할지 선택하는 것에 관여(involve)한다.
* 다음과 같은 일들을 포함한다.
    * 제출된 데이터와 요청이 유효한지 검사한다.
    * 데이터 저장과 검색을 위한 데이터베이스 사용한다.
    * 필요에 따라서 올바른 데이터를 클라이언트에게 전달한다.

클라이언트와 서버 측 코드 모두 프레임 워크를 사용하지만, 도메인이 다르므로 프레임 워크도 다르다.

* 클라이언트 측 웹 프레임 워크는 레이아웃 및 프레젠테이션 작업을 단순화하는 반면
* 서버 측 웹 프레임 워크는 직접 구현해야 하는 많은 "공통된" 웹 서버 기능을 제공한다.
    * e.g. 세션 지원, 사용자 인증 지원, 쉬운 데이터베이스 접근, 라이브러리의 템플릿화 등

## 서버 측에서 할 수 있는 일 (What can you do on the server-side?)

### 정보의 효율적인 저장과 전달 (Efficient storage and delivery of information)

### 맞춤형 사용자 경험 (Customised user experience)

### 콘텐츠로의 접근 제한 (Controlled access to content)

### 세션과 상태 정보의 저장 (Store session/state information)

### 알림과 대화 (Notifications and communication)

### 정보 분석 (Data analysis)

## Summary
