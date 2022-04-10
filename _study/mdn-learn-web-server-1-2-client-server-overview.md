---
layout  : article
title   : 클라이언트-서버 훑어보기 (Client-Server overview)
summary : 
date    : 2021-11-15 13:51:10 +0900
updated : 2021-11-16 00:40:22 +0900
tag     : draft
toc     : true
public  : true
parent  : [[mdn-learn-web-server]]
latex   : false
---
* TOC
{:toc}

> 이 글은 MDN Learn web development의 [Server-side website programming first steps](https://developer.mozilla.org/en-US/docs/Learn/Server-side/First_steps) 중 [Client-Server overview](https://developer.mozilla.org/en-US/docs/Learn/Server-side/First_steps/Client-Server_overview)의 내용을 번역 및 정리한 글입니다.
>
> * 제가 필요한 부분 위주로 확인하면서 정리하고 있어 글에 덜 작성된 부분이 있을 수 있습니다.
> * 글 작성 후 원문의 내용이 수정되거나 내용을 이해하기 위한 개인적인 설명이나 해석이 있을 수 있습니다. 되도록 원문을 참고해주시길 바랍니다.
> * 잘못된 부분이 있다면 댓글이나 그 외 편하신 방법으로 알려주시면 감사하겠습니다.

## Web servers and HTTP (a primer)

웹 브라우저는 **H**yper**T**ext **T**ransfer **P**rotocol (HTTP)를 사용해 웹 서버와 통신한다. 웹 페이지의 링크를 클릭하거나, 형식을 전송하거나, 검색할 때 웹 브라우저는 *HTTP 요청*을 서버에 보낸다.

이 요청은 다음의 것들을 포함한다:

#### 대상 서버와 리소스를 식별하는 URL

대상 서버와 리소스를 식별하는 URL을 포함한다.

* e.g. HTML 파일, 서버의 특정 데이터 요소(point), 실행 도구

#### 필요한 동작을 정의한 메소드

필요한 동작을 정의한 메소드를 포함한다.

* e.g. 파일을 얻거나 어떤 데이터를 저장하거나 수정하는 동작 등

여러 종류(different)의 메소드/단어(verbs)와 이에 관련된 동작들은 다음과 같다:

* `GET`: 특정 리소스를 얻는다.
    * e.g. 제품과 제품의 목록에 관한 정보를 담고 있는 HTML 파일
* `POST`: 새로운 리소스를 만든다.
    * e.g. 위키에 새로운 글을 추가한다.
    * e.g. 데이터베이스에 새로운 연결을 추가한다.
* `HEAD`: 특정 리소스의 `GET`을 통해 얻는 내용(body) 부분을 제외한 메타 데이터 정보를 얻는다.
    * 예를 들어 `HEAD` 요청을 사용해 리소스가 마지막으로 업데이트된 시간을 확인한 다음 리소스가 변경됐을 때만 (더 비싼) `GET` 요청을 사용해 리소스를 다운로드할 수 있다.
* `PUT`: 이미 존재하는 리소스를 업데이트한다. (존재하지 않을 때는 새로운 것을 생성한다)
* `DELETE`: 특정 리소스를 지운다.
* `TRACE`, `OPTIONS`, `CONNECT`, `PATCH`: 이 단어들은 덜 흔한 고급 작업을 위한 것으로 여기서 다루지 않는다.

#### 추가 정보

추가 정보가 요청과 함께 인코딩될 수도 있다.

* e.g HTML 양식 데이터

다음의 것들이 추가 정보로 인코딩될 수 있다.

* URL 매개변수: `GET` 요청이 이름/값 쌍을 URL의 끝에 추가해 서버에 보낸 URL 안의 데이터를 인코딩한다.
    * 예를 들어 `http://mysite.com?name=Fred&age=11`을 봐보자
        * URL 매개변수와 나머지 URL을 분리하는데 물음표(`?`)를
        * 매개변수의 이름과 값을 분리하는데 등호(`=`)를
        * 각 (이름/값) 쌍을 분리하는 데는 앤드 기호(`&`)를 항상 사용한다.
    * URL 매개변수는 사용자가 수정하고 다시 제출할 수 있기 때문에 본질적으로 "안전하지 않고"
    * 그러므로 URL 매개변수/`GET` 요청은 서버의 데이터를 업데이트하기 위한 요청에는 사용되지 않는다.
* `POST` 데이터: `POST` 요청은 요청 본문 안에서 인코딩된 새로운 리소스를 추가한다.
* 클라이언트 측 쿠키: 쿠키는 서버가 로그인 상태나 리소스에 대한 허가/접근 여부를 판단할 수 있는 키를 포함해 클라이언트에 관련된 세션 데이터를 저장(contain)한다.

### GET request/response example

링크를 클릭하거나 (검색 엔진 홈페이지와 같은) 사이트에서 검색하면 간단한 `GET` 요청을 만들 수 있다.

예를 들어, MDN에서 "클라이언트 서버 개요"로 검색했을 때 전송되는 HTTP 요청은 아래의 텍스트와 매우 유사할 것이다.

* 메시지의 일부가 브라우저/설정에 따라 다르므로 똑같지는 않다.

#### The request

각 줄의 요청은 그것에 관련된 정보를 포함한다. 이와 같은 첫 부분을 **header**라고 하고 요청에 관련된 유용한 정보들을 포함한다.

* HTML head가 HTML 문서의 유용한 정보를 포함하지만, 본문에 있는 자신의 실제 내용을 포함하지는 않는 것과 같은 방식을 사용한다.

```
GET /en-US/search?q=client+server+overview&topic=apps&topic=html&topic=css&topic=js&topic=api&topic=webdev HTTP/1.1
Host: developer.mozilla.org
Connection: keep-alive
Pragma: no-cache
Cache-Control: no-cache
Upgrade-Insecure-Requests: 1
User-Agent: Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2743.116 Safari/537.36
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8
Referer: https://developer.mozilla.org/en-US/
Accept-Encoding: gzip, deflate, sdch, br
Accept-Charset: ISO-8859-1,UTF-8;q=0.7,*;q=0.7
Accept-Language: en-US,en;q=0.8,es;q=0.6
Cookie: sessionid=6ynxs23n521lu21b1t136rhbv7ezngie; csrftoken=zIPUJsAZv6pcgCBJSCj1zU6pQZbfMUAT; dwf_section_edit=False; dwf_sg_task_completion=False; _gat=1; _ga=GA1.2.1688886003.1471911953; ffo=true
```

첫 번째 줄과 두 번째 줄이 위에서 얘기했던 대부분의 정보를 포함하고 있다.

```
GET /en-US/search?q=client+server+overview&topic=apps&topic=html&topic=css&topic=js&topic=api&topic=webdev HTTP/1.1
Host: developer.mozilla.org
```

* 요청의 종류 (`GET`)
* 대상 리소스의 URL (`/en-US/search`)
* URL 매개변수 (`q=client%2Bserver%2Boverview&topic=apps&topic=html&topic=css&topic=js&topic=api&topic=webdev`)
* 대상/호스트 웹 사이트 (developer.mozilla.org)
* 첫 번째 줄의 마지막에는 특정 프로토콜 버전을 식별하는 짧은 문자열이 포함되어있다. (`HTTP/1.1`)

마지막 줄은 클라이언트 측의 쿠키에 대한 정보를 포함한다.

```
Cookie: sessionid=6ynxs23n521lu21b1t136rhbv7ezngie; csrftoken=zIPUJsAZv6pcgCBJSCj1zU6pQZbfMUAT; dwf_section_edit=False; dwf_sg_task_completion=False; _gat=1; _ga=GA1.2.1688886003.1471911953; ffo=true
```

* 위의 경우 쿠키가 세션을 관리하는 id를 포함하고 있는 것을 볼 수 있다.

나머지 줄은 브라우저 정보와 브라우저가 다룰 수 있는 요청들에 대한 정보를 포함한다.

```
Connection: keep-alive
Pragma: no-cache
Cache-Control: no-cache
Upgrade-Insecure-Requests: 1
User-Agent: Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2743.116 Safari/537.36
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8
Referer: https://developer.mozilla.org/en-US/
Accept-Encoding: gzip, deflate, sdch, br
Accept-Charset: ISO-8859-1,UTF-8;q=0.7,*;q=0.7
Accept-Language: en-US,en;q=0.8,es;q=0.6
```

예를 들어, 여기서 볼 수 있는 정보는 다음과 같다:

* 현재 브라우저 (`User-Agent`)는 Mozilla의 파이어폭스 (`Mozilla/5.0`) 이다.
* 이 브라우저는 gzip 방식으로 압축된 정보를 받을 수 있다. (`Accept-Encoding: gzip`)
* 특정 문자 집합 (`Accept-Charset: ISO-8859-1,UTF-8;q=0.7,*;q=0.7`)과 언어(`Accept-Language: de,en;q=0.7,en-us;q=0.3`)를 받을 수 있다.
* `Referer` 줄은 이 리소스로 향하는 링크(i.e. 요청의 시작점, `https://developer.mozilla.org/en-US/`)를 포함하고 있던 웹 페이지의 주소를 나타낸다.

HTTP 요청이 본문을 포함할 수도 있지만 이번 경우에는 비어있다.

#### The response

위의 요청에 대한 응답의 첫 부분은 다음과 같다.

```
HTTP/1.1 200 OK
Server: Apache
X-Backend-Server: developer1.webapp.scl3.mozilla.com
Vary: Accept,Cookie, Accept-Encoding
Content-Type: text/html; charset=utf-8
Date: Wed, 07 Sep 2016 00:11:31 GMT
Keep-Alive: timeout=5, max=999
Connection: Keep-Alive
X-Frame-Options: DENY
Allow: GET
X-Cache-Info: caching
Content-Length: 41823

<!DOCTYPE html>
<html lang="en-US" dir="ltr" class="redesign no-js"  data-ffo-opensanslight=false data-ffo-opensans=false >
<head prefix="og: http://ogp.me/ns#">
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=Edge">
  <script>(function(d) { d.className = d.className.replace(/\bno-js/, ''); })(document.documentElement);</script>
  ...
```

위의 헤더는 다음의 정보를 포함한다:

```
HTTP/1.1 200 OK
...
Content-Type: text/html; charset=utf-8
...
Content-Length: 41823
```

* 첫 번째 줄은 요청이 성공적이었다는 것을 알려주는 응답 코드 `200 OK`를 포함한다.
* 응답이 `text/html` 형식이었다는 것과 (`Content-Type`).
* UTF-8 문자 집합을 이용했다는 것을 (`Content-Type: text/html; charset=utf-8`) 확인할 수 있다.
* 또한 응답의 크기가 얼마나 큰지 알려준다 (`Content-Length: 41823`).

메시지 끝에는 요청에 따라 반환되는 실제 HTML을 포함한 본문 내용을 확인할 수 있다.

```
<!DOCTYPE html>
<html lang="en-US" dir="ltr" class="redesign no-js"  data-ffo-opensanslight=false data-ffo-opensans=false >
<head prefix="og: http://ogp.me/ns#">
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=Edge">
  <script>(function(d) { d.className = d.className.replace(/\bno-js/, ''); })(document.documentElement);</script>
  ...
```

응답 헤더의 나머지 부분은 다음의 정보를 포함하고 있다:

* 응답에 대한 정보 (e.g. 언제 생성되었는지)
* 서버에 대한 정보
* 브라우저가 페이지를 다루는 방식
    * e.g. `X-Frame-Options: DENY`는 브라우저가 현재 페이지를 다른 사이트의 `<iframe>` 안에 포함하는 것을 허락하지 않도록 지시한다.

### POST request/response example

HTTP `POST`는 서버에 저장해야 하는 정보를 포함한 양식을 작성해 제출할 때 생성된다.

### The request

아래의 텍스트는 사용자가 새로운 프로필 정보를 사이트에 제출할 때 만들어지는 HTTP 요청을 나타낸다.

이 요청에 대한 형식은 첫 줄이 이 요청을 `POST`로 나타내고 있다는 것을 빼고는 이전 `GET` 요청 예시와 거의 비슷해 보인다.

```
POST /en-US/profiles/hamishwillee/edit HTTP/1.1
Host: developer.mozilla.org
Connection: keep-alive
Content-Length: 432
Pragma: no-cache
Cache-Control: no-cache
Origin: https://developer.mozilla.org
Upgrade-Insecure-Requests: 1
User-Agent: Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2743.116 Safari/537.36
Content-Type: application/x-www-form-urlencoded
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8
Referer: https://developer.mozilla.org/en-US/profiles/hamishwillee/edit
Accept-Encoding: gzip, deflate, br
Accept-Language: en-US,en;q=0.8,es;q=0.6
Cookie: sessionid=6ynxs23n521lu21b1t136rhbv7ezngie; _gat=1; csrftoken=zIPUJsAZv6pcgCBJSCj1zU6pQZbfMUAT; dwf_section_edit=False; dwf_sg_task_completion=False; _ga=GA1.2.1688886003.1471911953; ffo=true

csrfmiddlewaretoken=zIPUJsAZv6pcgCBJSCj1zU6pQZbfMUAT&user-username=hamishwillee&user-fullname=Hamish+Willee&user-title=&user-organization=&user-location=Australia&user-locale=en-US&user-timezone=Australia%2FMelbourne&user-irc_nickname=&user-interests=&user-expertise=&user-twitter_url=&user-stackoverflow_url=&user-linkedin_url=&user-mozillians_url=&user-facebook_url=
```

가장 큰 차이점은 URL이 어떤 매개변수도 갖지 않는다는 것이다. 위에서 확인할 수 있는 것처럼, 양식에서 넘어온 정보들은 요청의 본문(body)에 인코딩되어있다.

* 예를 들어, 새 사용자의 전체 이름은 `&user-fullname=Hamish+Willee`을 이용해 설정한다.

### The response

요청에서 온 응답은 아래와 같이 나타난다.

```
HTTP/1.1 302 FOUND
Server: Apache
X-Backend-Server: developer3.webapp.scl3.mozilla.com
Vary: Cookie
Vary: Accept-Encoding
Content-Type: text/html; charset=utf-8
Date: Wed, 07 Sep 2016 00:38:13 GMT
Location: https://developer.mozilla.org/en-US/profiles/hamishwillee
Keep-Alive: timeout=5, max=1000
Connection: Keep-Alive
X-Frame-Options: DENY
X-Cache-Info: not cacheable; request wasn't a GET or HEAD
Content-Length: 0
```

* "`302 Found`"의 상태 코드는 브라우저에 post가 성공했고, `Location` 필드에서 지정된 페이지를 불러오기 위해 두 번째 HTTP 요청을 실행해야 한다는 것을 알려준다.
* 그 외의 정보는 `GET` 요청에 대한 응답 정보와 비슷하다.

## Static sites

*정적 사이트*는 어떤 리소스가 요청될 때마다 서버가 하드 코딩된 동일한 내용을 보여주는 사이트이다.

예를 들어 `/static/myproduct1.html`에 제품에 대한 페이지가 존재한다면 이 페이지는 모든 사용자에게 동일하게 반환된다.

* 만약 비슷한 제품을 사이트에 추가하고 싶으면 다른 페이지를 계속 추가해야 한다. (e.g. `myproduct2.html`)
* 이 경우 점점 굉장히 비효율적이게 된다.
    * 만약 제품 페이지가 수천 개가 된다면,
    * 각 페이지에 많은 코드(기본 페이지 템플릿, 구조 등)를 반복해서 작성해야 한다.
    * 또한 페이지 구조를 바꾸고 싶으면 (예를 들어 새롭게 "관련된 제품" 섹션을 추가하는 경우) 각 페이지를 각각 바꿔줘야 한다.

정적 사이트의 서버는 수정할 수 있는 데이터를 저장하지 않기 때문에 `GET` 요청만 처리할 수 있으면 된다. 또한 HTTP 요청 데이터(e.g. URL 매개변수나 쿠키)에 따라 응답을 바꿀 필요도 없다.

## Dynamic sites

*동적 사이트*는 (특정 URL에 대해 항상 동일한 하드 코딩된 파일을 반환하는 것 대신) 특정 요청 URL과 데이터에 따라 내용을 생성하고 반환할 수 있다.

제품 사이트 예시를 (다시) 사용하면,

* 서버는 개별 제품에 대한 HTML 파일을 만들기보다 데이터베이스에 제품 "데이터"를 저장할 것이다.
* 제품을 위한 HTTP `GET` 요청을 받았을 때
    * 서버는 제품 ID를 결정하고
    * 데이터베이스에서 데이터를 가져온 뒤
    * HTML 템플릿에 가져온 데이터를 집어넣어 응답을 위한 HTML 페이지를 생성한다.

이것은 정적 사이트와 비교해 주된 장점이 있다:

* 데이터베이스를 사용하면 제품정보를 쉽게 확장하고, 수정하고, 검색할 수 있는 방식으로 효율적으로 저장할 수 있다.
* HTML 템플릿을 사용하면 잠재적인 몇천 개의 정적 페이지가 아닌 하나의 템플릿에서 수정하면 되기 때문에 HTML 구조를 매우 쉽게 바꿀 수 있다.

### Anatomy of a dynamic request

"실제처럼 하기 위해(keep things real)"

* 코치가 팀 이름과 크기를 HTML 양식으로 선택하고
* 다음 게임을 위한 "최상의 라인업"을 추천받는

스포츠팀 관리 웹 사이트라는 상황을 가정(use)해보자.

아래 그림은 "팀 코치" 웹 사이트의 주요 요소와 코치가 "최고의 팀" 목록에 접근할 때 일어나는 동작 순서의 번호를 보여준다.

사이트를 동적으로 만드는 부분들은

* *웹 애플리케이션*: HTTP 요청을 처리하고 HTTP 응답을 반환하는 서버 측 코드를 참조하는 방법이다.
* *데이터베이스*: 선수, 팀, 코치의 정보와 그 관계를 포함하고 있다.
* *HTML 템플릿*이다.

코치가 팀 이름과 플레이어의 수를 포함한 폼을 전송했을 때 작업 단계는 다음과 같다:

1. 웹 브라우저는 리소스를 위한 기본 URL(`/best`)을 이용하고 팀과 플레이어의 수를 URL 매개변수(e.g. `/best?team=my_team_name&show=11`)나 URL 패턴(e.g. /best/my_team_name/11/)으로 인코딩해 HTTP `GET` 요청을 생성하고 서버에 요청한다. 이 요청은 (데이터를 수정하지 않고) 데이터를 가져오는 데만 사용하므로 `GET` 요청을 사용한다.
1. *웹 서버*는 이 요청이 "동적"임을 감지하고 처리를 위해 웹 애플리케이션에 전달한다.
    * 웹 서버는 설정에 정의된 패턴 매칭 규칙을 기반으로 다양한 URL을 처리하는 방법을 결정한다.
1. *웹 애플리케이션*은 URL(`/best/`)에 기반해 이 요청의 *의도*가 "최고의 팀 목록"을 얻는 것인지 확인(identify)하고 URL에서 필요한 팀 이름과 플레이어의 수를 찾는다.
    * *웹 애플리케이션*은 데이터베이스에서 필요한 정보를 얻는다.
    * "내부의" 인자들을 추가로 사용해 어떤 플레이어가 "최고"인지 정의하고
    * 클라이언트 측 쿠키에서 로그인한 코치의 아이디(identity)를 확인할 수도 있다.
1. *웹 애플리케이션*은 HTML 템플릿의 자리 표시자에 (데이터베이스에서 가져온) 데이터를 넣어 HTML 페이지를 동적으로 생성한다.
1. *웹 애플리케이션*은 생성된 HTML을 HTTP 상태 코드 200 ("성공")와 함께 (웹 서버를 경유하여) 웹 브라우저에 반환한다.
    * 만약 어떤 문제로 HTML이 제대로 반환되지 않으면 *웹 애플리케이션*은 다른 코드를 반환한다.
        * 예를 들어 "404"는 해당 팀이 존재하지 않는다는 것을 의미한다.
1. 웹 브라우저는 반환된 HTML을 처리하고 HTML이 참조하는 다른 CSS나 자바스크립트 등의 파일을 얻기 위한 각각의(separate) 요청을 보낸다 (7단계를 확인하자).
1. 웹 사이트는 파일 시스템에 있는 정적 파일들을 불러오고 브라우저에 바로(directly) 반환한다.
    * 위에서 언급했듯이, 올바른 파일 처리는 설정 규칙과 URL 패턴 매칭을 기반으로 한다.

브라우저의 HTTP 요청이 데이터베이스 업데이트처럼 `POST` 요청으로 인코딩되어야 한다는 것을 제외하고는 데이터베이스에 기록을 업데이트하는 작업도 이와 비슷하게 처리된다.

### Doing other work

### Returning something other than HTML

## Web frameworks simplify server-side web programming

서버 측 웹 프레임워크는 위에서 설명한 작업을 쉽게 다루는 코드를 훨씬 쉽게 작성할 수 있도록 해준다.

이들이 수행하는 가장 중요한 작업 중 하나는 다양한 리소스/페이지에 대한 URL을 특정한 핸들러(handler) 함수에 매핑하는 간단한 메커니즘을 제공하는 것이다.

* 이는 각 종류의 리소스에 관련된 코드를 더 쉽게 분리된 채로 유지할 수 있도록 해준다.
* 또한, 핸들러 함수를 수정하지 않고도 한 곳에서 특정 기능을 전달하는 데 사용되는 URL을 변경할 수 있어서 유지보수 측면에서도 이점이 있다.

예를 들어, 두 개의 URL 패턴을 두 개의 뷰(view) 함수에 매핑하는 다음의 Django(Python) 코드를 봐보자.

```python
# file: best/urls.py
#

from django.conf.urls import url

from . import views

urlpatterns = [
    # example: /best/
    url(r'^$', views.index),
    # example: /best/junior/
    url(r'^junior/$', views.junior),
]
```

* 첫 번째 패턴은 리소스 URL이 `/best` 인 HTTP 요청이 `views` 모듈 안의 이름이 `index()`인 함수에 확실히 전달되도록 해준다.
* 반면에 "`/best/junior`" 패턴을 가진 요청은 `junior()` view 함수로 전달된다.

> Note: `url()` 함수의 첫 번째 매개 변수는 "정규 표현식"(RegEx 또는 RE)이라는 패턴 매칭 기술을 사용하기 때문에 조금 이상하게 (e.g. `r'^junior/$'`) 보일 수 있다.
>
> 지금은 정규 표현식이 어떻게 작동하는지 알 필요는 없으며 다음의 내용만 알고 있으면 된다.
>
> * 정규 표현식은 (위의 하드 코딩된 값 대신) URL에서 패턴을 일치시킬 수 있도록 해주고
> * 이를 view 함수에서 매개변수로 사용할 수 있다.
>
> 예를 들어, 정말 간단한 정규 표현식은 "하나의 대문자와 일치하고 그 뒤에 4~7 개의 소문자가 온다"라는 것을 의미하기도 한다.

웹 프레임워크는 또한 뷰 함수가 데이터베이스의 정보를 쉽게 가져올 수 있게 해준다.

데이터 구조는 기본(underlying) 데이터베이스에 저장될 필드를 정의하는 Python 클래스인 모델(models)에서 정의된다.

* "*team_type*" 필드를 가진 *Team* 이라는 이름의 모델이 있다면 간단한 쿼리 문법을 사용해 특정 유형의 팀을 모두 찾을 수 있다.

아래 예제는 `team_type`이 정확히(대소문자 구분) "junior"인 모든 팀의 목록을 가져온다.

```python
#best/views.py

from django.shortcuts import render

from .models import Team


def junior(request):
    list_teams = Team.objects.filter(team_type__exact="junior")
    context = {'list': list_teams}
    return render(request, 'best/index.html', context)
```

* 필드 이름(`team_type`) 뒤에 두 개의 밑줄과 사용할 일치 유형(이 경우 `exact`)이 따라오는 형식을 취하고 있다는 것을 확인하자.
    * 다른 종류의 경기가 많고 이들을 데이지 체인 방식으로 엮을 수 있다. 또한 반환된 결과의 순서와 수를 제어할 수 있다.
* `junior()` 함수가 주니어 팀 목록을 얻은 후에 `render()` 함수를 호출한다.
    * `render()` 함수에 기존의 `HttpRequest`, HTML 템플릿, 템플릿에 포함될 정보를 정의하는 "context" 객체를 전달한다.
    * `render()` 함수는 context와 HTML 템플릿을 사용하여 HTML을 생성하고 이를 `HttpResponse` 객체에 반환하는 편리한 함수이다.
