---
layout  : article
title   : 취준생을 위한 네트워크 기초지식
summary : 면접을 위해 작성해보는 네트워크 기초지식 질문 및 답변 모음
date    : 2023-09-22 22:45:51 +0900
updated : 2023-12-10 23:46:44 +0900
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

#### ✅ HTTP의 `PUT`, `PATCH`를 비교 설명해주세요

* `PUT` 메소드는 특정 리소스가 요청에 포함된 정보에 정의된대로 해당 리소스의 상태를 생성하거나 업데이트하도록 요청합니다.
    * 클라이언트가 서버상에서 대상의 위치를 지정한다는 점이 `POST`와 다르며,
    * `PUT`은 멱등성을 보장해 이를 한번 호출하든 여러번 호출하든 같은 결과를 보장하지만, `POST`는 동일한 호출이더라도 여러번 반복해 호출하면 같은 주문을 여러번 하는 것처럼 추가적인 영향이 생길 수 있습니다.
* `PATCH` 메소드는 특정 리소스가 요청에 포함된 정보에 정의된 부분 업데이트에 따라 해당 리소스의 상태를 수정하도록 요청합니다.파일이나 문서를 전부가 아닌 일부만 전송해 업데이트할 수 있으므로 대역폭을 절약할 수 있습니다.
* `PUT`은 클라이언트가 제공한 데이터로 리소스를 완전히 교체하는 데 반해, `PATCH`는 클라이언트가 제공한 일부 변경 사항만을 적용하고 나머지는 그대로 유지합니다.
* 항상 멱등성을 보정하는 `PUT`에 비해 `PATCH`는 멱등성을 보장할 수도 있지만 항상 그러는 것은 아니기 때문에 주의해야 합니다.
* 참고: [HTTP #HTTP/1.1 request messages](https://en.wikipedia.org/wiki/HTTP#HTTP/1.1_request_messages) (wikipedia), [PUT](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/PUT) (mdn web docs), [PATCH](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/PATCH) (mdn web docs), [[ 기술 스터디 ] PUT과 PATCH 차이] (긍정적자기부정.log)

### ✅ HTTP의 Status Code에 대해 설명해주세요

* 상태 코드는 서버가 클라이언트의 요청을 이행하려고 시도한 결과를 나타내는 세 자리 정수로 이루어진 코드입니다.
* 클라이언트는 상태 코드를 우선적으로 고려해 응답을 처리하는 방식을 결정합니다.
* 모든 HTTP 응답 상태 코드는 5개의 클래스(또는 카테고리)로 구분됩니다. 상태 코드의 첫 번째 숫자는 응답의 클래스를 정의하며, 표준으로는 다음과 같은 다섯 가지 클래스가 정의되어 있습니다
    * `1xx` (정보): 요청을 받아들였으며 프로세스를 진행 중입니다.
    * `2xx` (성공): 요청을 성공적으로 받아들여, 이해하고, 수락되었습니다.
    * `3xx` (리다이렉션): 요청을 완료하기 위해서는 추가적인 조치가 필요합니다.
    * `4xx` (클라이언트 오류): 요청이 문법적 오류를 포함하고 있거나 요청을 처리할 수 없습니다.
    * `5xx` (서버 오류): 서버가 겉보기에는 유효한 요청을 처리하는 데 실패했습니다.
* 남은 두 숫자 역시 각각 다른 응답 상태를 나타내지만 첫 번째 숫자와 다르게 분류 또는 범주화 역할을 하지는 않습니다.
* 참고: [HTTP #HTTP/1.1 response messages](https://en.wikipedia.org/wiki/HTTP#HTTP/1.1_response_messages) (wikipedia), [List of HTTP status codes](https://en.wikipedia.org/wiki/List_of_HTTP_status_codes) (wikipedia)

#### 참고

<details>
<summary>주요 상태 코드</summary>

| 상태코드 | 이름 | 의미 |
| --- | --- | --- |
| **2xx** | | |
| 200 | OK | 요청 성공 - GET |
| 201 | Create | 생성 성공 - POST |
| 202 | Accepted | 요청은 접수되었으나 리소스 처리를 못함 |
| 204 | No Contents | 요청은 성공했으나 내용이 없음 |
| **3xx** | | |
| 300 | Multiple Choice | 요청 URI에 여러 리소스가 존재 |
| 301 | Move Permanently | 요청 URI가 새 위치로 옮겨감 |
| 304 | Not Modified | 요청 URI의 내용이 변경X |
| **4xx** | | |
| 400 | Bad Request | API에서 정의되지 않은 요청 들어옴 |
| 401 | Unauthorized | 인증 오류 |
| 403 | Forbidden | 권한 밖의 접근 시도 |
| 404 | Not Found | 요청 URI에 대한 리소스 존재X |
| 405 | Method Not Allowed | API에서 정의되지 않은 메소드 호출 |
| 406 | Not Acceptable | 처리 불가 |
| 408 | Request Timeout | 요청 대기 시간 초과 |
| 409 | Conflict | 모순 |
| 429 | Too Many Request | 요청 횟수 상한 초과 |
| **5xx** | | |
| 500 | Internal Server Error | 서버 내부 오류 |
| 502 | Bad Gateway | 게이트웨이 오류 |
| 503 | Service Unavailable | 서비스 이용 불가 |
| 504 | Gateway Timeout | 게이트웨이 시간 초과 |

</details>

> TODO: 위의 출처 보고 설명 상태코드별 추가하기

### ✅ HTTP와 HTTPS의 차이점에 대해 설명해주세요

* HTTPS(Hypertext Transfer Protocol Secure)는 HTTP의 확장으로, 컴퓨터 네트워크 간에 통신할 때 보안을 위해 TLS(Transport Layer Security) 혹은 SSL(Secure Sockets Layer) 암호화 프로토콜을 사용해 통신을 암호화 합니다.
* HTTP는 암호화되지 않으므로 공격자가 웹사이트 계정과 민감한 정보에 접근하거나 웹페이지를 수정하여 멀웨어나 광고를 삽입하는 등의 공격에 취약하지만 HTTPS는 이러한 공격을 방지할 수 있도록 설계되었으며, 이러한 공격에 대해 비교적 안전합니다.
* (참고) HTTPS URL은 `https://`로 시작하고 기본적으로 포트 443을 사용하는 반면, HTTP URL은 `http://`로 시작하고 기본적으로 포트 80을 사용합니다.
* [HTTPS](https://en.wikipedia.org/wiki/HTTPS) (wikipedia)

### ✅ HTTPS의 동작 방식에 대해 설명해주세요

* HTTPS의 보안 프로토콜은 비대칭 공개 키 방식과 대칭 키 방식의 암호화를 혼용해 통신을 보호합니다.
* 비대칭 공개 키 방식에서는 두 개의 서로 다른 키를 사용합니다.
    * 공개 키는 서버의 SSL/TLS 인증서를 통해 클라이언트와 공유되며 서버와 상호작용하려는 모든 사람이 사용할 수 있습니다.
    * 개인 키는 웹 서버에 저장되어 공개 키로 암호화된 정보를 해독하는 데 사용됩니다. 비공개로 유지되며 웹 사이트의 소유자가 관리합니다.
    * 공개 키와 개인 키는 검증된 인증 기관(Certificate Authority, CA)을 통해 관리합니다. CA는 클라이언트와 서버가 두 키를 사용해 통신할 수 있도록 서버에 인증서를 발급하며 이는 CA에서 제공하는 공개 키로 복호화할 수 있습니다.
* 클라이언트와 서버는 통신하는 과정에서 공개 키와 개인 키를 사용해 대칭 키(i.e. 세션 키)라는 새 키를 만들어 이후 둘 사이의 통신을 암호화합니다. 모든 HTTP 요청과 응답이 대칭 키로 암호화 되므로 이를 가로채더라도 정보에 직접 접근하지 못하고 암호화된 문자열만 보게 됩니다.
* 자세한 동작 과정은 다음과 같습니다.
    1. 브라우저의 주소 표시줄에 `https://` URL 형식을 입력하여 HTTPS 웹 사이트를 방문합니다.
    1. 브라우저는 사이트의 신뢰성을 검증하기 위해 서버에 SSL/TLS 인증서를 요청합니다.
    1. 서버는 CA에서 발급받은 SSL/TLS 인증서를 회신합니다. 인증서에는 서버의 공개 키가 포함되어 있습니다.
    1. 브라우저는 회신된 인증서를 CA의 공개 키로 복호화해 검증합니다. 검증이 완료되면 서버와 주고받은 데이터를 이용해 대칭 키를 만듭니다. 인증서에 포함된 서버의 공개 키를 사용하여 대칭 키를 암호화해 서버로 전송합니다.
    1. 서버는 개인 키를 사용하여 브라우저가 전송한 대칭 키를 복호화합니다. 그런 다음, 대칭 키를 암호화하고 브라우저에 승인 메시지를 전송합니다.
    1. 이후로는 브라우저와 서버가 동일한 대칭 키를 사용하여 메시지를 안전하게 주고 받습니다.
    1. 세션이 종료되면 대칭키를 폐기합니다.
* 참고: [HTTP와 HTTPS의 차이점은 무엇인가요? #HTTPS 프로토콜은 어떻게 작동하나요?](https://aws.amazon.com/ko/compare/the-difference-between-https-and-http/) (amazon web service), [HTTPS란 무엇입니까?](https://www.cloudflare.com/ko-kr/learning/ssl/what-is-https/) (cloudflare), [HTTPS란?](https://velog.io/@gotaek/HTTPS란) (gotaek.log)

## 네트워크 계층 모델

### ✅ TCP와 UDP를 비교 설명해주세요

* TCP(Transmission Control Protocol)
    * TCP는 네트워크를 통해 통신하는 과정에서 패킷의 전송을 제어해 신뢰성을 보장합니다. 전달되는 패킷의 오류를 확인하고 패킷을 순서에 맞춰 안정적으로 전달합니다.
    * 또한 TCP는 연결 지향형 프로토콜로 데이터를 전송하기 전에 클라이언트와 서버 간의 연결을 설정합니다. 그 과정에서 Three-way handshake, 재전송, 오류 감지 등을 통해 안정성을 높일 수 있습니다.
    * 위의 과정을 통해 데이터를 안전하게 전송할 수 있지만 거쳐야 하는 과정이 많아 속도에 근본적인 한계가 있습니다.
    * 주로 순서나 데이터 무결성이 중요한 이메일, 원격 제어, 파일 전송 등이 TCP를 기반으로 하고 있습니다.
* UDP(User Datagram[^datagram] Protocol)
    * UDP는 최소한의 프로토콜 메커니즘을 갖춘 단순한 비연결 통신 모델로 패킷 간의 순서가 존재하지 않는 독립적인 패킷을 사용합니다. UDP의 헤더는 데이터 무결성을 위한 체크섬과, 데이터의 출발지와 목적지의 포트 번호, 데이터의 길이로만 구성되어 있습니다.
    * UDP는 통신 채널이나 데이터 경로를 설정하기 위한 사전 통신이나 handshake 과정을 거치지 않아 더 빠른 속도로 데이터를 주고받을 수 있습니다.
    * 반면에 handshake의 과정이 없으므로 애플리케이션이 기반 네트워크의 불안정성에 노출될 수 있으며, 데이터의 전송, 순서, 중복에 대한 보호가 이뤄지지 않습니다.
    * 실시간 영상 스트리밍과 같이 고용량 데이터를 다루면서 안정성보다 시간이 우선시 되는 애플리케이션의 경우 UDP를 기반으로 하기도 합니다.
* 참고: [Transmission Control Protocol](https://en.wikipedia.org/wiki/Transmission_Control_Protocol) (wikipedia), [User Datagram Protocol](https://en.wikipedia.org/wiki/User_Datagram_Protocol) (wikipedia), [아직도 모호한 TCP / UDP 개념 쉽게 이해하자](https://inpa.tistory.com/entry/NW-🌐-아직도-모호한-TCP-UDP-개념-❓-쉽게-이해하자) (Inpa Dev)

### ✅ TCP가 신뢰성을 보장하는 방법에 대해 설명해주세요

> TCP의 전송제어 기법에 초점을 맞춰 답변을 작성합니다.

* 데이터의 순차적 전송: 모든 데이터 세그먼트에 시퀀스 번호와 확인 응답 번호가 할당되어있어 데이터를 수신하는 호스트가 시퀀스 번호에 따라 세그먼트를 재배열합니다.
* 손실된 패킷의 재전송: 시퀀스 번호와 확인 응답 번호를 통해 데이터 수신 여부를 확인할 수 있고 확인되지 않은 누적 스트림은 모두 재전송됩니다.
* 오류없는 데이터 전송: 손상된 패킷은 손실된 것으로 처리되어 재전송되므로 오류없이 데이터를 전송할 수 있습니다.
* 흐름 제어: 안정적인 전송을 보장하기 위해 발신자가 데이터를 전송하는 속도를 제한합니다. 수신자는 발신자에게 수신할 수 있는 데이터의 양을 지속적으로 알려줍니다. 수신 호스트의 버퍼가 가득 차면 다음 `ACK`가 전송을 중단하고 버퍼의 데이터를 처리할 수 있도록 합니다.
* 혼잡 제어: (데이터 혼잡으로 인해 발생한 것으로 추정되는) 패킷 손실이 발생하면 데이터 전송 속도를 감소시킵니다.
* 참고: [Transmission Control Protocol #Data transfer](https://en.wikipedia.org/wiki/Transmission_Control_Protocol#Data_transfer) (wikipedia), [아직도 모호한 TCP / UDP 개념 쉽게 이해하자](https://inpa.tistory.com/entry/NW-🌐-아직도-모호한-TCP-UDP-개념-❓-쉽게-이해하자) (Inpa Dev)

### ✅ TCP의 three-way handshake와 four-way handshake에 대해 설명해주세요

* Three-way handshake와 four-way handshake는 클라이언트와 서버가 본격적인 통신을 시작하거나 종료하기 전에 서로 준비가 되어있는지 확인하는 과정입니다. 주고 받는 패킷[^packet] 내부에 들어있는 인증 플래그 값들을 확인하여 클라이언트와 서버가 서로 보낸 패킷을 제대로 받았는지, 그 순서는 올바른지를 검증합니다.
* Three-way handshake는 통신을 시작할 때 four-way handshake는 통신을 종료할 때 이뤄집니다.
* Three-way handshake의 구체적인 과정은 다음과 같습니다.
    1. 클라이언트는 접속을 요청하는 `SYN(a)`[^syn] 패킷을 보냅니다. 클라이언트는 `SYN_SENT` 상태로 변해 응답을 기다립니다.
    1. `LISTEN` 상태였던 서버는 `SYN(a)` 요청을 받으면, 클라이언트에게 요청을 수락한다는 의미의 `ACK(a+1)`[^ack] 패킷과 클라이언트에 연결을 요청하는 `SYN(b)` 패킷을 보냅니다. 그리고 `SYN_RCVD(SYN_RECEIVED)` 상태로 변해 클라이언트의 `ACK` 패킷을 기다립니다.
    1. 클라이언트가 다시 서버에 `ACK(b+1)` 패킷을 보내고 `ESTABLISHED` 상태로 바뀌면 데이터 통신이 가능하게 됩니다.
* Four-way handshake[^four-way-handshake]의 구체적인 과정은 다음과 같습니다.
    1. 클라이언트가 접속을 끊기 위해 `CLOSE()` 함수를 호출하고 서버로 `FIN` 플래그를 보냅니다. 클라이언트는 `FIN_WAIT1` 상태로 변합니다.
    1. 서버가 `FIN`을 수신해 클라이언트의 `CLOSE()`를 인지하면 `CLOSE_WAIT` 상태로 바뀐 뒤 `ACK` 플래그를 전송합니다. `ACK`를 받은 클라이언트는 `FIN_WAIT2` 상태로 바뀝니다.
    1. 서버 역시 `CLOSE()` 함수를 호출하고 `FIN` 플래그를 클라이언트에게 보냅니다. 이때 서버에 클라이언트로 보낼 데이터가 남아있다면 `CLOSE()`를 호출하기 전에 모두 전송합니다.
    1. 클라이언트가 서버도 연결을 닫았다는 신호를 수신하면 서버에 `ACK` 플래그를 보냅니다. 서버가 `ACK`를 수신하면 서버는 `CLOSED` 상태로 전환됩니다. 클라이언트는 `TIME_WAIT` 상태로 전환되어 잔여 데이터를 기다리다가 `CLOSED` 상태로 전환됩니다. 이상태에서는 로컬 포트를 새로 연결하는 것이 불가능해지므로 `ACK`가 전송중 소실되어도 클라이언트가 마지막 `ACK`를 재전송하는 것이 가능합니다.
* 참고: [아직도 모호한 TCP / UDP 개념 쉽게 이해하자](https://inpa.tistory.com/entry/NW-🌐-아직도-모호한-TCP-UDP-개념-❓-쉽게-이해하자) (Inpa Dev), [Transmission Control Protocol #Protocol operation](https://en.wikipedia.org/wiki/Transmission_Control_Protocol#Protocol_operation) (wikipedia), [Handshake (computing)](https://en.wikipedia.org/wiki/Handshake_(computing)) (wikipedia)

## 주석

[^hypermedia]: 하이퍼텍스트가 확장된 개념으로 그래픽, 오디오, 비디오, 일반 텍스트 및 하이퍼링크 등을 포함하는 정보 매체입니다 ([Hypermedia](https://en.wikipedia.org/wiki/Hypermedia) by wikipedia).
[^idempotence]: 연산을 여러 번 적용하더라도 결과가 달라지지 않는 성질을 말합니다 ([Idempotence](https://en.wikipedia.org/wiki/Idempotence) by wikipedia).
[^datagram]: 패킷 교환 네트워크와 관련된 기본 전송 단위로 패킷 교환 네트워크에서 연결이 필요없는 통신 서비스를 제공합니다. ([Datagram](https://en.wikipedia.org/wiki/Datagram) by wikipedia).
[^packet]: 패킷 교환 네트워크에서 전달되는 형식화된 데이터 단위로 제어 정보와 페이로드라고 하는 사용자 데이터로 구성됩니다. ([Network packet](https://en.wikipedia.org/wiki/Network_packet) by wikipedia).
[^syn]: Synchronize sequence numbers. 접속요청을 할 때 가장 먼저 보내는 패킷입니다. 데이터를 네트워크로 전달하기 위해 분할한 조각을 세그먼트라고 하는데 시퀀스 번호(sequence number)는 세그먼트의 순서를 나타내는 번호입니다. `SYN(a)`는 세그먼트의 시퀀스 번호가 임의의 값 `a`임을 의미합니다.
[^ack]: Acknowledgment number. 상대방으로부터 패킷을 수신했다는 것을 알려주기 위한 패킷입니다. 확인 응답 번호(acknowledgement number)의 값은 ACK가 예상하는 발신자의 시퀀스 번호 바로 다음 값으로, `ACK`는 자신의 이전 바이트의 수신 여부를 확인해 전달합니다. 예를 들어 `SYN(a)`의 수신 여부는 `ACK(a+1)`로 확인합니다.
[^four-way-handshake]: Four-way handshake에서는 서버와 클라이언트가 각각 독립적으로 연결을 종료합니다. 클라이언트와 서버 각각이 연결을 종료하기 위해 두 단계에 걸쳐 패킷을 주고 받아야 하므로 총 네 단계에 걸쳐 연결을 종료하게 됩니다.
