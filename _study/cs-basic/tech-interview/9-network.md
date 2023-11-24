---
layout  : article
title   : 취준생을 위한 네트워크 기초지식
summary : 면접을 위해 작성해보는 네트워크 기초지식 질문 및 답변 모음
date    : 2023-09-22 22:45:51 +0900
updated : 2023-11-24 13:14:30 +0900
tag     : draft
toc     : true
public  : true
parent  : [[/cs-basic/tech-interview]]
latex   : false
---
* TOC
{:toc}

### ✅ 주소창에 주소를 입력했을 때의 흐름을 설명해주세요

> 네트워크에 초점을 맞춰서 주소를 입력해 응답을 가져오는 과정을 위주로 기술합니다.

1. 웹 부라우저에 URL을 입력하면 웹 브라우저는 주소창에 입력된 URL을 해석합니다.
    * 웹 서버와 파일명, 포트번호를 해석하고 실제 HTTP 메시지 포맷에 맞게 GET 리퀘스트 메시지를 작성합니다.
1. 웹 브라우저가 DNS 조회를 통해, 입력받은 도메인의 IP 주소를 찾습니다.
    * 이전에 조회하여 캐싱된 DNS 데이터가 존재할 경우 이를 확인해 주소를 가져옵니다.
    * 캐시 계층에서 IP 주소를 찾을 수 없는 경우 회사 네트워크 또는 ISP의 DNS 서버가 재귀적 DNS 조회를 수행합니다.
1. 웹 브라우저가 찾은 IP 주소를 기반으로 Three-Way Handshake를 통해 웹 서버와 TCP 연결을 시작합니다.
    * 통신 프로토콜이 HTTPS인 경우 보안을 위한 TLS Handshake도 이어서 진행합니다.
1. 웹 브라우저가 서버에 연결되면, 페이지의 콘텐츠를 요청하기 위해 서버에 HTTP 요청을 전송합니다.
1. 웹 서버가 요청을 처리하고 응답을 생성해 다시 웹 브라우저로 전송합니다.
1. 웹 브라우저가 전송 받은 콘텐츠를 렌더링합니다.

* 참고: [웹 브라우저에 URL을 입력하면 어떤 일이 생기나요?](https://aws.amazon.com/ko/blogs/korea/what-happens-when-you-type-a-url-into-your-browser/) (Channy Yun @Amazon Web Services 한국 블로그), [웹페이지를 표시한다는 것: 브라우저는 어떻게 동작하는가](https://developer.mozilla.org/ko/docs/Web/Performance/How_browsers_work) (mdn web docs)
* 추가자료: [브라우저 주소창에 URL을 치면 일어나는 일들](https://maxkim-j.github.io/posts/packet-travel/) (김맥스 블로그)

## 웹 프로토콜(Web Protocol)

### ✅ 웹 프로토콜(Web Protocol)에 대해 설명해주세요

* 웹 프로토콜은 웹 브라우저와 웹 서버간의 통신을 위한 통신 프로토콜입니다. 통신 프로토콜이란 통신 시스템 안의 여러 장비 사이에서 정보를 전송할 수 있도록 하는 양식과 규칙 체계 입니다.
* 즉, 웹 프로토콜은 웹 브라우저와 웹 서버 사이에 정보를 전송할 수 있도록 하는 양식과 규칙 체계라고 할 수 있습니다.
* 대표적인 예로 HTTP(Hyper Text Transfer Protocol), FTP(File Transfer Protocol), SMTP(Simple Mail Transfer Protocol) 등이 있습니다.
* [Communication protocol](https://en.wikipedia.org/wiki/Communication_protocol) (wikipedia)

### ✅ HTTP에 대해 설명해주세요

* HTTP(Hypertext Transfer Protocol)은 하이퍼미디어[^hypermedia] 정보 시스템을 위한 프로토콜입니다.
* 주로 HTML 문서를 전달하는 데 쓰이며 텍스트, 하이퍼링크, 이미지, 동영상 스크립트 등이 이에 포함됩니다.
* 월드 와이드 웹 내에서 발생하는 모든 데이터 통신의 기반이며 클라이언트/서버 사이에 이뤄지는 요청/응답 프로토콜로 일반적으로 클라이언트인 웹 브라우저에 의해 요청이 시작됩니다.
* 참고: [HTTP](https://en.wikipedia.org/wiki/HTTP) (wikipedia), [An overview of HTTP](https://developer.mozilla.org/en-US/docs/Web/HTTP/Overview) (mdn web docs)

### ✅ HTTP 메소드에 대해 설명해주세요

* HTTP 메소드는 식별된 리소스에 대해 수행해야 할 작업을 나타냅니다.
    * 여기서 리소스란 일반적으로 미리 생성되어 있거나 동적으로 생성된 데이터를 말하며 서버의 구현에 따라 달라집니다.
    * 또한 파일이나 실행 가능한 서버에 있는 결과물이 이에 해당하기도 합니다.
* 현재 정의된 HTTP 메소드에는 `GET`, `HEAD`, `POST`, `PUT`, `DELETE`, `CONNECT`, `OPTIONS`, `TRACE`, `PATCH`가 있습니다.
    * 정의할 수 있는 메소드 수는 제한이 없으므로 기존 인프라를 중단하지 않고도 메소드를 추가로 정의할 수 있습니다.
* 참고: [HTTP #Request methods](https://en.wikipedia.org/wiki/HTTP#HTTP/1.1_request_messages) (wikipedia)

#### ✅ HTTP의 `GET`, `POST`를 비교 설명해주세요

* `GET` 메소드는 특정 리소스의 상태 정보를 요청합니다. 즉, 데이터를 읽거나 검색할 때 사용하는 메소드입니다. `GET` 요청은 오로지 데이터를 읽거나 검색하기만 해야하며 다른 영향을 미치지 않아야 합니다.
* `POST` 메소드는 특정 리소스가 해당 리소스의 시멘틱에 따라 요청 안에 포함된 정보(representation)를 처리하도록 요청합니다. 주로 리소스를 생성하거나 업데이트 하는 데 사용합니다.
* `GET` 메소드로 요청시 필요한 정보가 있다면 URL의 끝에 쿼리 스트링(Query String)이라고 하는 파라미터로 포함시켜 전달할 수 있습니다. 파라미터들이 URL의 일부로 전달되기 때문에 `GET` 요청은 다음과 같은 특징을 갖습니다.
    * 브라우저 히스토리에 남으며 북마크 및 공유가 가능합니다.
    * 전달할 수 있는 데이터의 형태와 길이가 제한됩니다. 문자로만 전달할 수 있으며 길이 제한은 브라우저와 서버에 따라 다릅니다.
    * 브라우저 히스토리에 저장될 뿐만 아니라 브라우저에 전달하는 값이 그대로 노출되므로 보안에 취약합니다. 민감한 정보를 전달해서는 안됩니다.
* `POST` 메소드로 요청시 필요한 정보는 HTTP message body에 포함해 전달되므로 데이터를 비교적 적은 제약으로 보다 안전하게 전달할 수 있습니다.
* `GET` 메소드는 멱등성(idempotence)[^idempotence]을 보장하는 반면 `POST` 메소드는 이를 보장하지 않습니다.
    * 이때문에 `GET` 요청의 경우 응답을 캐싱할 수 있으며
    * 뒤로 가기나 새로 고침을 통해 요청이 다시 발생해도 데이터를 재제출하지 않을 수 있습니다.
* 참고: [HTTP #Request methods](https://en.wikipedia.org/wiki/HTTP#HTTP/1.1_request_messages) (wikipedia), [[HTTP] HTTP Method 정리 / GET vs POST 차이점] (Code Playground), [Get과 Post의 차이를 아시나요?](https://velog.io/@songyouhyun/Get과-Post의-차이를-아시나요) (syh.log)

#### HTTP의 `PUT`, `PATCH`를 비교 설명해주세요

### ⭐ HTTP의 Status Code에 대해 설명해주세요

### ⭐ HTTP와 HTTPS의 차이점에 대해 설명해주세요

### HTTPS의 동작 방식에 대해 설명해주세요

## 네트워크 계층 모델

### TCP와 UDP를 비교 설명해주세요

### TCP가 신뢰성을 보장하는 방법에 대해 설명해주세요

### TCP의 3-Way-Handshake와 4-Way-Handshake에 대해 설명해주세요

## 주석

[^hypermedia]: 하이퍼텍스트가 확장된 개념으로 그래픽, 오디오, 비디오, 일반 텍스트 및 하이퍼링크 등을 포함하는 정보 매체입니다 ([Hypermedia](https://en.wikipedia.org/wiki/Hypermedia) by wikipedia).
[^idempotence]: 연산을 여러 번 적용하더라도 결과가 달라지지 않는 성질을 말합니다 ([Idempotence](https://en.wikipedia.org/wiki/Idempotence) by wikipedia).
