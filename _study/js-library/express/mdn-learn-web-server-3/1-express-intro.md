---
layout  : article
title   : Express/Node 소개 (Express/Node introduction)
summary : 
date    : 2021-11-26 16:34:48 +0900
updated : 2021-11-29 20:20:59 +0900
tag     : draft
toc     : true
public  : true
parent  : [[/js-library/express/mdn-learn-web-server-3]]
latex   : false
---
* TOC
{:toc}

> 이 글은 MDN Learn web development의 [Express web framework (Node.js/JavaScript)](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs) 중 [Express/Node introduction](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/Introduction)의 내용을 번역 및 정리한 글입니다.
>
> * 제가 필요한 부분 위주로 확인하면서 정리하고 있어 글에 덜 작성된 부분이 있을 수 있습니다.
> * 글 작성 후 원문의 내용이 수정되거나 내용을 이해하기 위한 개인적인 설명이나 해석이 있을 수 있습니다. 되도록 원문을 참고해주시길 바랍니다.
> * 잘못된 부분이 있다면 댓글이나 그 외 편하신 방법으로 알려주시면 감사하겠습니다.

## Node 소개 (Introducing Node)

Node(더 공식적으로 하면 Node.js)는 개발자들이 자바스크립트로 모든 종류의 서버 측 도구와 애플리케이션을 만들 수 있도록 해주는 오픈소스, 크로스 플랫폼 런타임 환경이다. 이 런타임은 (자바스크립트를) 브라우저 환경 밖에서 사용하기(i.e 컴퓨터나 서버 OS에서 직접 실행하기) 위한 것이다. 따라서, 이 환경에서는 브라우저 전용(browser-specific) 자바스크립트 API는 생략되고 HTTP와 파일 시스템 라이브러리와 같은 전통적인 OS API를 지원이 추가된다.

### 안녕 Node.js (Hello Node.js)

다음 예제에서는 URL `http://127.0.0.1:8000/`에서 모든 종류의 HTTP 요청을 수신(listen)하는 웹 서버를 만든다. 요청을 받으면 스크립트가 "Hello World"라는 텍스트(string)로 응답할 것이다. 이미 Node를 설치했다면 다음의 단계를 수행해 예제를 시도할 수 있다.

1. 터미널을 연다 (윈도에서는 커맨드 라인 도구를 연다).
2. 프로그램을 저장할 폴더를 만들고 (예를 들어 `test-node`) 다음의 명령을 터미널에 입력해 해당 폴더로 이동한다.

    ```bash
    cd test-node
    ```

3. 선호하는 텍스트 에디터를 사용해 `hello.js`라는 파일을 생성한 뒤 아래의 코드를 파일에 붙여넣는다.

    ```js
    // HTTP 모듈을 불러온다
    const http = require("http");

    const hostname = "127.0.0.1";
    const port = 8000;

    // HTTP 서버를 생성한다
    const server = http.createServer(function(req, res) {

       // 응답의 HTTP 헤더에 HTTP 상태와 콘텐츠 유형을 설정한다
       res.writeHead(200, {'Content-Type': 'text/plain'});

       // 응답 본문인 "Hello World"를 전달(send)한다
       res.end('Hello World\n');
    });

    // 서버가 수신을 시작하면 로그를 출력한다
    server.listen(port, hostname, function() {
       console.log(`Server running at http://${hostname}:${port}/`);
    })
    ```

4. 위에서 생성한 폴더에 파일을 저장한다.
5. 터미널로 돌아가 다음 명령을 입력한다.

    ```bash
    node hello.js
    ```

마지막으로, 웹 브라우저에서 `http://localhost:8000`를 살펴보자. 비어있었을 웹 페이지 왼쪽 위에 "**Hello World**"라는 텍스트가 표시될 것이다.

## 웹 프레임워크 (Web Frameworks)

Node 자체는 다른 일반적인 웹 개발 기능을 지원하지 않는다. 만약

* 다른 HTTP 메소드와(verbs) (e.g. `GET`, `POST`, `DELETE` 등)에 대한 특정 처리를 추가하거나
* 서로 다른 URL 경로("라우터")를 사용해 요청을 개별적으로 처리하거나
* 정적 파일을 제공하거나
* 템플릿을 사용하여 응답을 동적으로 생성하고 싶을 때

Node 자체는 큰 도움이 되지 않는다.

코드를 직접 작성해야 할 수도 있지만, 바퀴를 직접 만드는(기본적인 것을 직접 구현하는) 대신 웹 프레임워크를 사용할 수도 있다.

## Express 소개 (Introducing Express)

Express는 가장 유명한 *Node* 웹 프레임워크로, 다른 많은 인기 있는 Node 웹 프레임워크의 기본 라이브러리이다.

Express는 다음과 같은 메커니즘을 제공한다:

* 다른 URL 경로(routes)에서의 다른 HTTP 메소드를 담은 요청에 대한 핸들러를 만든다.
* 템플릿에 데이터를 넣는 방식으로 응답을 만들기 위해 "뷰" 렌더링 엔진과 결합(integrate)한다.
* 접속을 위한 포트나 응답 렌더링을 위한 템플릿의 위치 같은 일반적인 웹 애플리케이션 설정을 한다.
* 핸들링 파이프라인(request handling pipeline) 중 어떤 곳에든 추가적인 미들웨어 처리 요청을 추가한다.

Express 자체는 상당히 미니멀하지만, 개발자들은 거의 모든 웹 개발의 문제를 해결하기 위해 호환되는 미들웨어 패키지를 만들었다. 쿠키, 세션, 사용자 로그인, URL 매개변수, `POST` 데이터, 보안 헤더, 그 외 많은 것들에 대한 라이브러리들이 존재한다. [Express Middleware](https://expressjs.com/en/resources/middleware.html)에서 (유명한 서드파티 패키지들을 포함) Express 팀이 관리하는 미들웨어 패키지 목록을 확인할 수 있다.

## Node와 Express의 유래 (Where did Node and Express come from?)

## Node와 Express의 인지도 (How popular are Node and Express?)

웹 프레임워크의 인지도는 그것이 계속 유지보수 될 수 있는지, 문서화, 추가 라이브러리, 기술 지원에 어떤 자원을 사용할 수 있는지를 나타내는 척도이기 때문에 중요하다.

다음과 같은 질문을 해보자:

* Node와 Express가 인지도가 낮은 플랫폼의 문제들을 피할 수 있을 정도로 충분히 유명한가
* 이들이 계속 발전하고 있는가
* 필요할 때 도움을 얻을 수 있는가?
* Express를 배워서 급여를 받으면서 일을 할 수 있는 기회가 있는가?

Express를 사용하는 [high profile companies](https://expressjs.com/en/resources/companies-using-express.html)의 수와 코드 베이스에 기여하는 사람의 수, 유료 및 무료 지원을 제공하는 사람의 수를 봤을 때 Express는 인지도 높은 프레임워크라고 할 수 있다!

## Express의 유연함 (Is Express opinionated?)

웹 프레임워크는 종종 "opinionated"나 "unopinionated" 하다고 불린다.

#### Opinionated

Opinionated 한 프레임워크는 특정 일을 처리하는 "정해진(올바른) 방법"에 대한 의견이 있는 프레임워크이다.

* 올바른 해결 방법은 보통 이해하기 쉽고 잘 정리(문서화)되어 있어서 이런 프레임워크는 *특정 영역* (특정 종류의 문제를 해결하는 것)에서 굉장히 빠른 개발을 지원한다.
* 하지만 주요 영역 외의 문제를 해결하는 데는 덜 유연한 편이며 사용할 수 있는 구성 요소와 접근 방식의 선택지가 적은 경향이 있다.

#### Unopinionated

반대로 Unopinionated 한 프레임워크는 목표에 도달하기 위해 구성 요소를 합치는 최선의 방법이나 심지어 어떤 요소를 사용해야 하는지에 대한 제한이 훨씬 적다. 이런 프레임워크를 사용하면,

* 개발자는 특정 작업을 완료하는 데 가장 적합한 도구를 쉽게 사용할 수 있지만
* 구성 요소를 직접 찾아야 하는 비용이 발생한다.

Express는 unopinionated 하다.

* 자신이 원하고 호환되는 미들웨어 대부분을 원하는 요청 처리 단계(chain)에 원하는 순서로 삽입할 수 있다.
* 앱을 하나의 파일이나 여러 파일에 설계할 수 있고 모든 디렉토리 구조를 사용할 수 있다.
* 가끔 너무 많은 선택지가 있다고 느낄 수도 있다.

## Express 코드의 형태 (What does Express code look like?)

전통적인 데이터 기반 웹 사이트에서

* 웹 애플리케이션은 웹 브라우저(또는 다른 클라이언트)의 HTTP 요청을 기다린다.
* 요청이 도달하면 애플리케이션은 URL 패턴과 `POST`나 `GET` 데이터에 포함된 관련 정보를 기반으로 어떤 작업이 필요한지 파악(works out)한다.
* 필요한 항목에 따라 애플리케이션은 데이터베이스에서 정보를 읽고 쓰거나 요청을 만족하기 위한 다른 일들을 수행한다.
* 애플리케이션은 웹 브라우저에 응답을 반환하고, 종종 발견한 데이터를 HTML의 자리 표시자에 삽입해 브라우저에 표시할 HTML 페이지를 동적으로 생성한다.

이 과정에서 Express는

* 특정 HTTP 메소드(e.g. `GET`, `POST`, `SET` 등)와 URL 패턴("route")에서 호출할 함수를 지정하는 메소드와
* 어떤 템플릿("뷰") 엔진을 사용할지, 어디에 템플릿 파일이 위치할지, 어떤 템플릿을 사용해 응답을 렌더링할지 정하는 메소드를 제공한다.
* 쿠키, 세션, 사용자 로그인, `POST/GET` 매개변수를 얻는 것 등에 대한 지원을 추가하는 Express 미들웨어를 사용할 수도 있다.
* Node가 지원하는 모든 데이터베이스의 메커니즘을 사용할 수 있다. (Express는 데이터베이스에 관계된 어떤 행동도 정의하지 않는다)

다음 섹션에서는 *Express*와 *Node* 를 사용할 때 일반적으로 볼 수 코드를 소개(explain)한다.

### Express의 시작 (Helloworld Express)

먼저 기본적인 Express의 [Hello World](https://expressjs.com/en/starter/hello-world.html) 예시를 살펴보자 (예시의 각 부분을 아래의 다음 섹션에서 다룰 것이다).

> Note: Node와 Express를 이미 설치했다면 (혹은 [다음 글](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/development_environment)에서 설명한 대로 설치한다면) 이 코드를 **app.js** 라는 텍스트 파일로 저장한 다음 bash 명령 프롬프터에서 다음의 명령을 사용해 실행할 수 있다.
>
> `node ./app.js`

```js
const express = require('express');
const app = express();
const port = 3000;

app.get('/', function(req, res) {
  res.send('Hello World!')
});

app.listen(port, function() {
  console.log(`Example app listening on port ${port}!`)
});
```

처음 두 줄은 express 모듈을 `require()`(포함)해 [Express 애플리케이션](https://expressjs.com/en/4x/api.html#app)을 만든다.

```js
const express = require('express');
const app = express();
```

전통적으로 `app`이라고 불리는 이 개체는 아래 일을 수행할 수 있는 메소드를 갖는다.

* HTTP 요청을 라우팅
* 미들웨어 구성
* HTML 뷰를 렌더링
* 템플릿 엔진을 등록
* 애플리케이션의 작동방식을 제어하는 애플리케이션 설정을 수정

코드의 중간 부분은 *라우터 정의(route definition)*를 보여준다.

```js
app.get('/', function(req, res) {
  res.send('Hello World!')
});
```

* `app.get()` 메소드는 사이트 루트에 대한 상대적인 경로 (`'/'`)가 있는 HTTP `GET` 요청이 있을 때 호출될 콜백 함수를 지정한다.
* 이 콜백 함수는 요청과 응답 객체를 인자로 받아 문자열 "Hello World!"를 반환하기 위해 응답에 `send()` 메소드를 호출한다.

마지막 코드 블록은 특정 포트('3000')에서 서버를 시작해 콘솔에 로그 주석(comment)을 출력한다.

```js
app.listen(port, function() {
  console.log(`Example app listening on port ${port}!`)
});
```

* 서버가 실행되는 동안 브라우저에서 `localhost:3000`에 방문하면 예제 응답이 반환된 것을 볼 수 있다.

### 모듈을 불러오고 생성하기 (Importing and creating modules)

모듈은 Node의 `require()` 함수를 이용해서 다른 코드로 불러올 수 있는 자바스크립트 라이브러리/파일이다.

*Express*는 그 자체로 우리가 *Express* 애플리케이션 안에서 사용하는 다른 미들웨어나 데이터베이스 라이브러리들과 같은 모듈이다.

아래의 코드는 *Express* 프레임워크를 예시로 사용해 이름으로 모듈을 불러오는 방법을 보여준다.

```js
const express = require('express');
const app = express();
```

* 먼저 모듈의 이름을 문자열 (`express`)로 지정해 `require()` 함수를 호출하고 반환된 객체를 호출해 Express 애플리케이션을 만든다.
* 그러면 이 애플리케이션 객체의 속성과 함수에 접근할 수 있다.

자신만의 모듈을 직접 만들어 같은 방식으로 불러올 수도 있다.

모듈 밖에서도 객체를 이용하려면 이 객체를 `exports` 객체의 추가 속성으로 표시하면 된다.

예를 들어, 아래의 `square.js` 모듈은 `area()`와 `perimeter()` 메소드를 내보내는 파일이다.

```js
// square.js
exports.area = function(width) { return width * width; };
exports.perimeter = function(width) { return 4 * width; };
```

`require()`를 이용해 모듈을 불러오고, 다음과 같이 내보내진 메소드를 호출할 수 있다.

```js
const square = require('./square'); // 여기서 .js 파일 확장자를 포함하지 않은 (선택적) 파일 이름을 require() 한다
console.log('The area of a square with a width of 4 is ' + square.area(4));
```

> Note: 모듈의 절대 경로(혹은 처음에 한 것처럼 이름)를 지정해도 된다.

각 속성을 매번 만드는 것 대신 한 번의 대입(assignment)으로 완성된 객체를 내보내고 싶다면 아래와 같이 `module.exports`에 대입한다.

```js
module.exports = {
  area: function(width) {
    return width * width;
  },

  perimeter: function(width) {
    return 4 * width;
  }
};
```

* 이 방법을 내보낸 객체의 루트를 생성자나 다른 함수를 만드는데 사용할 수도 있다.

모듈에 대한 더 많은 정보를 알고 싶다면 [Modules](https://nodejs.org/api/modules.html#modules_modules) (Node API docs)를 참고하자.

### 비동기 API를 사용하기 (Using asynchronous APIs)

### 라우트 핸들러를 생성하기 (Creating route handlers)

위의 *Hello World* Express 예제에서 사이트 루트 (`'/'`) 에 대한 HTTP `GET` 요청을 위해 (콜백) 라우트 핸들러 함수를 정의했다.

```js
app.get('/', function(req, res) {
  res.send('Hello World!')
});
```

* 콜백 함수는 요청과 응답 객체를 인자로 받는다.
* 위 예제에서는 메소드가 문자열 "Hello World!"를 반환하기 위해 응답에서 `send()` 메소드를 호출한다.
* 이외에도 [여러 다른 응답 메소드](https://expressjs.com/en/guide/routing.html#response-methods)를 사용해서 요청/응답 주기를 끝낼 수 있다.
    * `res.json()`을 호출해 JSON 응답을 보낼 수 있다.
    * `res.sendFile()`을 호출해 파일을 보낼 수 있다.

*Express 애플리케이션* 객체는 다른 HTTP 메소드의 라우트 핸들러를 정의하는 메소드도 제공하며 대부분 같은 방식으로 사용한다:

`checkout()`, `copy()`, **`delete()`**, **`get()`**, `head()`, `lock()`, `merge()`, `mkactivity()`, `mkcol()`, `move()`, `m-search()`, `notify()`, `options()`, `patch()`, **`post()`**, `purge()`, **`put()`**, `report()`, `search()`, `subscribe()`, `trace()`, `unlock()`, `unsubscribe()`.

`app.all()`은 모든 HTTP 메소드에 대한 응답으로 호출되는 특별한 라우팅 메소드로 모든 요청 메소드의 특정 경로에서 미들웨어 함수를 불러오는 데 사용된다.

```js
// From the Express documentation

app.all('/secret', function(req, res, next) {
  console.log('Accessing the secret section ...');
  next(); // pass control to the next handler
});
```

* 위의 예제에서 핸들러는 (http module이 지원한다면) 사용된 HTTP 메소드와 상관없이 `/secret`에 대한 요청을 위해 실행된다.

라우터를 사용하면

* URL의 특정 문자 패턴을 일치시키고
* URL에서 일부 값을 추출해
* 매개 변수로 (매개 변수로 전달된 요청 객체의 속성으로) 라우트 핸들러에 전달한다.

라우터를 사용할 때, 사이트의 특정 부분에 대한 라우트 핸들러를 묶어서 공통적인 라우트-접두사를 사용하는 방식이 유용하다.

* 예를 들어, 위키가 있는 사이트는 모든 위키 관련 경로를 하나의 파일에 작성하고 */wiki/* 경로 접두사를 통해 접근할 수 있다.

*Express*에서는 `express.Router` 객체를 사용하면 위와 같은 방식을 사용할 수 있다.

```js
// wiki.js - Wiki route module

const express = require('express');
const router = express.Router();

// Home page route
router.get('/', function(req, res) {
  res.send('Wiki home page');
});

// About page route
router.get('/about', function(req, res) {
  res.send('About this wiki');
});

module.exports = router;
```

* **wiki.js**라는 이름의 모듈에 모든 위키 라우트를 작성해 `Router` 객체를 내보낸다.

Main app 파일에서 라우터를 사용하려면 라우트 모듈(**wiki.js**)을 `require()` 한 뒤 *Express* 애플리케이션에서 `use()`를 호출해 미들웨어 핸들링 경로에 라우터를 추가한다. 그러면 `/wiki/`와 `/wiki/about` 두 라우트에 접근할 수 있다.

```js
const wiki = require('./wiki.js');
// ...
app.use('/wiki', wiki);
```

### 미들웨어 사용하기 (Using middleware)

미들웨어는 정적 파일을 제공하는 것부터 오류 처리, HTTP 응답을 압축하는 것까지 Express 앱에서 광범위하게 사용된다.

* 라우트 함수가 HTTP 클라이언트에 일부 응답을 반환해서 요청-응답 주기를 끝내지만
* 미들웨어 함수는 일반적으로 요청이나 응답에 대해 일부 작업을 수행하고 "스택"에서 더 많은 미들웨어나 라우트 핸들러일 수 있는 다음 함수를 호출한다.
    * 미들웨어가 호출되는 순서는 앱 개발자에게 달려있다.

> Note: 미들웨어는
>
> * 어떤 작업도 수행할 수 있고
> * 어떤 코드도 실행할 수 있고
> * 요청 및 응답 객체를 변경할 수 있고
> * 요청-응답 주기를 끝낼 수 있다.
>
> 만약 주기가 끝나지 않으면 `next()`를 호출해 다음 미들웨어 함수로 제어 권한을 전달해야 한다 (그렇지 않으면 요청이 보류된(hanging) 상태로 남아있다).

대부분의 앱은 쿠키, 세션, 사용자 인증, `POST` 요청 및 JSON 데이터에 접근, 로깅(logging) 등과 같은 일반적인 웹 개발 작업을 단순화하기 위해 서드파티 미들웨어를 사용한다. (다른 인기 있는 서드파티 패키지를 포함해) [Express 팀에서 관리하는 미들웨어 패키지 목록](https://expressjs.com/en/resources/middleware.html)이 이곳에 나와 있다. 다른 Express 패키지는 NPM 패키지 관리자에서 사용할 수 있다.

서드파티 미들웨어를 사용하려면 먼저 NPM을 사용하여 앱에 설치해야 한다.

예를 들어 HTTP 요청 로거(logger)인 morgan 미들웨어를 설치하려면 다음과 같이 입력한다.

```bash
npm install morgan
```

다음 *Express 애플리케이션 객체에* `use()`를 호출해서 스택에 이 미들웨어를 추가한다.

```js
const express = require('express');
const logger = require('morgan');
const app = express();
app.use(logger('dev'));
...
```

> Note: 미들웨어 및 라우팅 함수는 선언된 순서대로 호출된다. 일부 미들웨어는 순서가 중요하다. (예를 들어 세션 미들웨어가 쿠키 미들웨어에 의존하는 경우, 쿠키 핸들러를 먼저 추가해야 한다). 라우트를 설정하기 전에 미들웨어를 호출하는 경우가 대부분이며 그러지 않으면 미들웨어로 추가한 기능에 라우트 핸들러가 접근할 수 없을 것이다.

미들웨어 함수를 직접 작성할 수 있으며, (오류 처리 코드를 만들어야 할 때만) 그렇게 해야 할 가능성이 높다. 미들웨어 함수와 라우트 핸들러 콜백의 **유일한** 차이점은 미들웨어 함수가 요청 주기를 완료하지 못했을 때 이들에 의해 호출되는 `next`를 미들웨어 함수의 세 번째 인자로 갖는다는 것이다 (이는 미들웨어 함수를 호출할 때 반드시 호출되어야 하는 `next` 함수를 포함한다).

*모든 응답*의 경우 `app.use()`를, 특정 HTTP 메소드의 경우 연관 메소드인 `app.get()`, `app.post()`등을 사용해 미들웨어 함수를 프로세싱 체인에 추가할 수 있다. 두 경우 모드 동일한 방식으로 라우트를 지정하지만 `app.use()`를 호출할 때는 라우트가 선택사항이다.

아래의 예시는 두 방법을 이용해 라우트를 사용하거나/사용하지 않고 미들웨어 함수를 추가하는 방법을 보여준다.

```js
const express = require('express');
const app = express();

// 미들웨어 함수 예시
let a_middleware_function = function(req, res, next) {
  // ... 일부 작업을 수행
  next(); // Express가 다음 미들웨어 함수를 체인에서 호출할 수 있도록 next()를 호출
}

// 모든 라우트와 메소드에 대해 use()를 사용해서 함수를 추가
app.use(a_middleware_function);

// 특정 라우트에 대해 use()를 사용해서 함수를 추가
app.use('/someroute', a_middleware_function);

// 특정 HTTP 메소드와 라우트에 대해 미들웨어 함수를 추가
app.get('/', a_middleware_function);

app.listen(3000);
```

Epxress 공식 문서에는 Express 미들웨어를 [사용](https://expressjs.com/en/guide/using-middleware.html)하고 [작성](https://expressjs.com/en/guide/writing-middleware.html)하는 것에 대한 더 훌륭한 문서가 있다.

### 정적 파일을 제공하기 (Serving static files)

express.static 미들웨어를 사용해 이미지, CSS, 자바스크립트를 포함한 정적 파일을 제공할 수 있다(`static()`은 실제로 *Express*에 **포함(part of)** 된 유일한 미들웨어 함수이다).

예를 들어, 아래의 코드를 작성해 node를 호출하는 곳과 같은 수준(level)에 있는 **'public'**이라는 디렉토리의 이미지, CSS 파일, 자바스크립트 파일을 사용할 수 있다:

```js
app.use(express.static('public'));
```

Public 디렉토리의 모든 파일은 파일 이름(기반 "public" 디렉토리에 상대적인)을 기본 URL에 추가해 제공할 수 있다. 예를 들어:

```
http://localhost:3000/images/dog.jpg
http://localhost:3000/css/style.css
http://localhost:3000/js/app.js
http://localhost:3000/about.html
```

여러 디렉토리의 파일을 제공하기 위해 `static()`을 여러 번 호출할 수 있다. 하나의 미들웨어 함수에서 파일을 찾을 수 없으면, 해당 파일은 다음 미들웨어(미들웨어의 호출 순서는 선언 순서를 기반으로 한다)로 전달해 찾는다.

```js
app.use(express.static('public'));
app.use(express.static('media'));
```

기본 URL에 파일을 추가하는 대신 정적 URL을 위한 가상 접두사를 만들 수도 있다. 예를 들어, 아래 예제에서는 파일을 "/media" 접두사로 불러올 수 있도록 [마운트 경로를 지정](https://expressjs.com/en/4x/api.html#app.use)한다.

```js
app.use('/media', express.static('public'));
```

이러면 `public` 디렉토리의 파일을 `/media` 경로 접두사로부터 불러올 수 있다.

```
http://localhost:3000/media/images/dog.jpg
http://localhost:3000/media/video/cat.mp4
http://localhost:3000/media/cry.mp3
```

### 오류를 처리하기 (Handling errors)

오류는 한 개 이상의 특별한 미들웨어 함수로 처리한다. 이 함수는 세 개의 인자를 갖는 일반적인 함수와 다르게 (`err, req, res, next`) 네 개의 인자를 갖는다.

예를 들어:

```js
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});
```

이 함수는 필요한 모든 내용을 반환할 수 있지만, 요청 처리 과정에서 마지막 미들웨어가 될 수 있도록 다른 모든 `app.use()`와 라우트 호출 이후에 호출되어야 한다.

Express는 앱에서 발생(encounter)할 수 있는 남은 모든 오류를 관리하는 내장 에러 핸들러를 제공한다. 이 기본 오류 처리 미들웨어 함수는 미들웨어 함수 스택 마지막에 추가된다. 오류를 `next()`에 전달하고 에러 핸들러에서 처리하지 않으면, 오류는 내장 에러 핸들러에서 처리될 것이다; 이 오류는 스택 추적과 함께 클라이언트에 기록된다.

> Note: 스택 추적은 production 환경에는 포함되지 않는다. 이를 production 모드에서 실행하고 싶으면 환경변수 `NODE_ENV`를 `production`으로 설정해야 한다.

### 데이터베이스를 사용하기 (Using databases)

*Express* 앱은 *Node*가 제공하는 (*Express* 자체는 데이터베이스 관리를 위한 추가적인 특정 동작/요청을 정의하지 않는다) 모든 데이터베이스 메커니즘을 사용할 수 있다. 여기에는 PostgreSQL, MySQL, Redis, SQLite, MongoDB 등을 포함한 많은 선택지가 있다.

이 데이터베이스들을 사용하기 위해서는 먼저 NPM을 사용해 데이터베이스 드라이버를 설치해야 한다.

예를 들어, 유명한 NoSQl MongoDB의 드라이버를 설치하려면 다음의 명령어를 입력한다:

```bash
npm install mongodb
```

데이터베이스 자체는 로컬 또는 클라우드 서버에 설치될 수 있다. Express 코드에서 드라이버가 필요하고, 데이터베이스에 연결한 뒤, 생성(create), 읽기(read), 수정(update), 삭제(delete) (CRUD) 작업을 수행한다.

아래의 예시는 MongoDB를 이용해서 "mammal" 기록을 찾는 방법을 보여준다.

```js
// From the Express documentation

// 이 예시는 이전 버전의 mongodb 버전에서 작동한다. 버전 ~ 2.2.33 
const MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/animals', function(err, db) {
  if (err) throw err;

  db.collection('mammals').find().toArray(function (err, result) {
    if (err) throw err;

    console.log(result);
  });
});

// 버전 3.0 이상의 mongodb 에서 작동
const MongoClient = require('mongodb').MongoClient;
MongoClient.connect('mongodb://localhost:27017/animals', function(err, client){
   if(err) throw err;

   let db = client.db('animals');
   db.collection('mammals').find().toArray(function(err, result){
     if(err) throw err;
     console.log(result);
     client.close();
   });
});
```

다른 유명한 접근 방식은 Object Relational Mapper ("ORM")을 통해 데이터베이스에 간접적으로 접근하는 것이다. 이 방법에서는 데이터를 "object"나 "models"로 정의하고 ORM이 이들을 기존 데이터베이스 형식으로 매핑한다. 이 방식은 개발자로서 데이터베이스 체계(semantic) 대신 자바스크립트 객체의 관점에서 데이터베이스를 생각할 수 있고 불러오는 데이터를 검증하고 확인할 수 있는 명백한 장소가 있다는 장점이 있다.

### 데이터를 렌더링하기 (뷰) (Rendering data (views))

텝플릿 엔진(*Express*에서는 "뷰 엔진"이라고 부르는)을 사용하면 페이지가 생성될 때 채워질 데이터를 위한 자리 표시자를 사용해서 결과 문서의 *구조*를 템플릿에 지정할 수 있다.

템플릿은 종종 HTML을 생성하지만 다른 목록도 생성할 수 있다. Express는 [많은 템플릿 엔진](https://github.com/expressjs/express/wiki#template-engines)을 지원하고 [Comparing JavaScript Templating Engines: Jade, Mustache, Dust and More](https://strongloop.com/strongblog/compare-javascript-templates-jade-mustache-dust/)에 더 인기 있는 엔진을 비교한 유용한 내용이 있다.

아래에 보이는 것처럼 애플리케이션 설정 코드에서 사용할 템플릿 엔진과 Express가 '뷰'와 '뷰 엔진' 설정을 이용해서 템플릿을 탐색할 위치를 설정한다 (템플릿 라이브러리를 포함한 패키지도 설치해야 한다).

```js
const express = require('express');
const path = require('path');
const app = express();

// 템플릿 '뷰'를 포함한 디렉토리를 설정
app.set('views', path.join(__dirname, 'views'));

// 사용할 뷰 엔진을 설정. 이 경우 'some_template_engine_name'
app.set('view engine', 'some_template_engine_name');
```

템플릿의 형태(appearance) 사용하는 엔진에 따라 달라진다. 'title'과 'message'라는 이름의 데이터 변수를 위한 자리 표시자를 포함하는 "index.<template_extension>"이라는 템플릿이 있다고 가정했을 때, 라우트 핸들러 함수에서 `Response.render()`를 호출해 HTML 응답을 생성하고 보낸다.

```js
app.get('/', function(req, res) {
  res.render('index', { title: 'About dogs', message: 'Dogs rock!' });
});
```

### File structure

Express는 구조와 사용하는 구성 요소에 대해 어떤 가정도 하지 않는다. 라우트, 뷰, 정적 파일, 기타 애플리케이션별 로직은 어떤 디렉토리 구조 안의 어떤 수의 파일에도 존재할 수 있다. 모든 *Express* 애플리케이션을 하나의 파일에 작성하는 것도 완전히 가능하지만, 일반적으로 함수(e.g. 계정 관리, 블로그, 토론 게시판)나 아키텍처 문제 도메인(architectural problem domain) (e.g. MVC 구조를 사용하는 경우 모델, 뷰, 컨트롤러)에 기반해 애플리케이션을 여러 파일로 나누는 것이 좋다.
