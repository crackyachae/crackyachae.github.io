---
layout  : article
title   : "Express Tutorial Part 4: 라우트와 컨트롤러 (Routes and controllers)"
summary : 
date    : 2022-01-09 14:43:27 +0900
updated : 2022-01-10 00:24:05 +0900
tag     : draft
toc     : true
public  : true
parent  : [[mdn-learn-web-server-3]]
latex   : false
---
* TOC
{:toc}

> 이 글은 MDN Learn web development의 [Express web framework (Node.js/JavaScript)](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs) 중 [Express Tutorial Part 4: Routes and controllers](https://developer.mozilla.org/ko/docs/Learn/Server-side/Express_Nodejs/routes)의 내용을 번역 및 정리한 글입니다.
>
> * 제가 필요한 부분 위주로 확인하면서 정리하고 있어 글에 덜 작성된 부분이 있을 수 있습니다.
> * 글 작성 후 원문의 내용이 수정되거나 내용을 이해하기 위한 개인적인 설명이나 해석이 있을 수 있습니다. 되도록 원문을 참고해주시길 바랍니다.
> * 잘못된 부분이 있다면 댓글이나 그 외 편하신 방법으로 알려주시면 감사하겠습니다.

## 개요 (Overview)

[이전 튜토리얼](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/mongoose)에서는 데이터베이스와 상호작용할 수 있도록 Mongoose 모델을 정의하고 (독립적인) 스크립트를 사용해 초기 라이브러리 레코드를 생성했다.

이제 사용자에게 정보를 보여주기 위한 코드를 작성할 수 있다.

* 우선 해야 할 것은 웹 페이지에 표시할 수 있는 정보를 결정하고,
* 해당 리소스를 반환하기 위한 적절한 URL을 정의하는 것이다.
* 그다음에 그 페이지들을 표시하기 위한 라우트 (URL 핸들러)와 뷰 (템플릿)을 생성해야 한다.

아래의 다이어그램은 HTTP 요청/응답을 처리할 때 구현해야 하는 사항과 데이터의 주요 흐름을 상기시키기 위한 것이다. 뷰와 라우트 외에도 다이어그램에서 "컨트롤러(controllers)" - 실제로 요청을 처리하는 코드 - 에서 요청을 라우트하는 코드를 분리하는 함수를 볼 수 있다.

모델은 이미 만들었으므로, 앞으로 작성해야 할 주요 사항은:

* 지원되는 요청(및 요청 URL로 인코딩된 모든 정보)을 적절한 컨트롤러 함수로 전달하기 위한 "라우트"
* 요청한 데이터를 모델에서 가져와, 데이터를 표시할 HTML 페이지를 생성해, 이를 브라우저에서 볼 수 있도록 사용자에게 반환하는 컨트롤러 함수
* 컨트롤러가 데이터를 렌더링하는 데 사용하는 뷰(템플릿)

궁극적으로 레코드를 생성, 수정, 삭제하는 페이지와 함께 책, 장르, 저자, 북 인스턴스의 목록과 세부 정보를 보여주는 페이지를 만들(have) 것이다. 이를 하나의 글에서 다루(document)기에는 너무 많아서, 이 글의 대부분은 라우트와 컨트롤러가 "더미(dummy)" 콘텐츠를 반환하도록 설정하는데 집중할 것이다. 뒤의 글에서 모델 데이터를 다룰 수 있도록 컨트롤러 메소드를 확장할 예정이다.

아래의 첫 번째 섹션은 Express [라우터](https://expressjs.com/en/4x/api.html#router)를 미들웨어를 사용하는 방법에 대한 간략한 "입문서"를 제공한다. 그리고 다음 섹션에서 지역 도서관 라우트를 설정할 때 이 지식을 사용할 것이다.

## 라우트 입문 (Routes primer)

라우트는 HTTP 동사(`GET`, `POST`, `PUT`, `DELETE` 등), URL 경로/패턴, 해당 패턴을 처리하기 위해 호출되는 함수를 연결하는 Express 코드의 일부(section)이다.

라우트를 생성하는 몇 가지 방법이 있다. [`express.Router`](https://expressjs.com/en/guide/routing.html#express-router) 미들웨어는 사이트의 특정 부분에 대한 라우트 핸들러를 함께 묶어, 공통의 라우트-접두사를 사용해 이에 접근할 수 있도록 해주기 때문에 이 튜토리얼에서는 `express.Router`를 사용할 것이다. 도서관에 관련된 라우트는 모두 "카탈로그(catalog)" 모듈에 보관(keep)할 것이고, 사용자 계정을 다른 함수를 처리하기 위한 라우트를 추가한다면 별도로 묶어 보관할 수도 있다.

이 섹션의 나머지에서는 `Router`를 사용하여 라우트를 정의하는 방법에 대한 개요를 제공한다.

### 개별 라우트 모델을 정의하고 사용하기 (Defining and using separate route modules)

아래의 코드는 라우트 모듈을 만들고 *Express* 애플리케이션에서 이를 사용하는 방법에 대한 구체적인 예시를 제공한다.

먼저 **wiki.js**라는 모듈에 wiki를 위한 라우트를 작성한다. 이 코드는

* 우선 Express 애플리케이션 객체를 불러오고,
* `Router` 객체를 얻기 위해 이를 사용한 뒤,
* `get()` 메소드를 사용해 여기에 몇 개의 라우트를 추가한다.
* 모듈의 남은 부분은 `Router` 객체를 내보내는 코드이다.

```js
// wiki.js - Wiki route module.

var express = require('express');
var router = express.Router();

// 홈(Home)페이지 라우트
router.get('/', function (req, res) {
  res.send('Wiki home page');
})

// 소개(About) 페이지 라우트
router.get('/about', function (req, res) {
  res.send('About this wiki');
})

module.exports = router;
```

> Note: 위에서 라우트 핸들러의 콜백을 라우터 함수 안에 직접 정의했다. 지역 도서관 예제에서는 이 콜백을 별도의 컨트롤러 모듈에 정의할 것이다.

메인 앱(app) 파일에서 해당 라우터 모듈을 사용하기 위해서, 우선 라우트 모듈(**wiki.js**)을 `require()` 한다. 그다음 *Express* 애플리케이션에서 `use()`를 호출해 라우트를 미들웨어 처리 경로(middleware handlig path)에 추가하고 'wiki'의 URL 경로를 지정한다.

```js
var wiki = require('./wiki.js');
// ...
app.use('/wiki', wiki);
```

그러면 wiki 라우트 모듈에 정의된 두 개의 라우트는 `/wiki/`와 `/wiki/about/`에서 접근할 수 있다.

### 라우트 함수 (Route functions)

위의 모듈은 몇 개의 전형적인 라우트 함수를 정의한다.

(아래에 재현된) "about" 라우트는 HTTP GET 요청에만 응답하는 `Router.get()` 메소드를 사용해 정의한다.

* 이 메소드의 첫 번째 인자는 URL 경로이고,
* 두 번째 인자는 해당 경로와 함께 HTTP GET 요청이 수신됐을 때 호출되는 콜백 함수이다.

```js
router.get('/about', function (req, res) {
  res.send('About this wiki');
})
```

콜백은 HTTP 요청 객체, HTTP 응답, 미들웨어 체인의 *next* 함수를 포함하는 세 개의 인자(일반적으로 다음과 같이 `req`, `res`, `next`로 명명된다)를 사용한다.

> Note: 라우터 함수는 [Express 미들웨어](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/Introduction#using_middleware)로, 이는 이들이 체인에서 요청을 완료(요청에 응답)하거나 `next` 함수를 호출해야 한다는 것을 의미한다. 위의 경우에서는 `send()`를 사용해 요청을 완료해, `next` 인자를 사용하지 않는(그리고 이를 특정하지 않기로 선택한)다.
>
> 위의 라우터 함수는 하나의 콜백을 사용하지만, 원하는 만큼 많은 콜백 인자나 콜백 함수의 배열을 지정할 수도 있다. 각 함수는 미들웨어 체인의 일부이고, (앞의 함수가 요청을 완료하지 않는 이상) 체인에 추가되는 순서대로 호출될 것이다.

여기의 콜백 함수는

* 경로 ('`/about`')과 함께 GET 요청을 수신했을 때
* 응답에서 `send()`를 호출하고
* "About this wiki"라는 문자열을 반환한다.

요청/응답 주기를 종료하기 위한 [여러 다른 응답 메소드](https://expressjs.com/en/guide/routing.html#response-methods)도 있다. 예를 들어,

* `res.json()`을 호출해 JSON 응답을 전달하거나,
* `res.sendFile()`을 호출해 파일을 보낼 수 있다.

도서관을 만들기 위해 가장 자주 사용할 응답 메소드는 템플릿과 데이터를 사용해 HTML 파일을 만들고 반환하는 `render()`일 것이다 - 이후의 글에서 훨씬 많이 얘기할 것이다.

### HTTP 동사 (HTTP verbs)

위의 예제 라우트에서는 특정 경로에서의 HTTP GET 요청에 응답하기 위해 `Router.get()` 메소드를 사용했다.

또한 `Router`는 모든 다른 HTTP 동사에 대한 라우트 메소드를 제공하며 대부분 정확히 같은 방식으로 사용된다: `post()`, `put()`, `delete()`, `options()`, `trace()`, `copy()`, `lock()`, `mkcol()`, `move()`, `purge()`, `propfind()`, `proppatch()`, `unlock()`, `report()`, `mkactivity()`, `checkout()`, `merge()`, `m-search()`, `notify()`, `subscribe()`, `unsubscribe()`, `patch()`, `search()`, `connect()`.

예를 들어, 아래의 코드는 이전의 `/about` 라우트처럼 동작하지만, HTTP POST 요청에만 응답한다.

```js
router.post('/about', function (req, res) {
  res.send('About this wiki');
})
```

### 라우트 경로 (Route paths)

라우트 경로는 요청이 만들어지는 엔드 포인트(end point)를 정의한다. 지금까지 살펴본 예제는 문자열뿐이었고, 정확히 작성한 대로 사용했다: '/', '/about', '/book', '/any-random.path'

라우트 경로는 문자열 패턴일 수도 있다. 문자열 패턴은 정규 표현식 구문의 형태를 사용해 일치할 엔드 포인트의 *패턴*을 정의한다. 해당 구문은 아래에 목록으로 나열되어 있다 (하이픈(`-`)과 온점(`.`)은 그대로 문자열 기반의 경로로 해석된다는 것에 유의하자).

* `?`: 엔드 포인트에 앞선 문자(혹은 그룹)가 0 또는 1개 있어야 한다.
    * e.g. `'/ab?cd'`의 라우트 경로는 엔드 포인트 `acd`나 `abcd`와 일치한다.
* `+`: 엔드 포인트에 앞선 문자(혹은 그룹)가 1개 이상 있어야 한다.
    * e.g. `'/ab+cd'`의 라우트 경로는 엔드 포인트 `abcd`, `abbcd`, `abbbcd` 등과 일치한다.
* `*`: 엔드 포인트는 `*`가 위치한 자리에 임의의 문자열을 가질 수 있다.
    * e.g. `'/ab*cd'`의 라우트 경로는 엔드 포인트 `abcd`, `abXcd`, `abSOMErandomTEXTcd` 등과 일치한다.
* `()`: 다른 연산을 수행하기 위해 문자 모음에서 일치시킬 항목을 묶는(group)다.
    * e.g. `'/ab(cd)?e'`는 그룹 `(cd)`에 `?` 연산(match)을 수행한다 - `abe`와 `abcde`와 일치한다.

라우트 경로는 자바스크립트 [정규 표현식](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions)이 될 수도 있다. 예를 들어, 아래의 라우트 경로는 `catfish`, `dogfish`와 일치하지만, `catflap`, `catfishhead` 등과는 일치하지 않는다. 정규 표현식을 위한 경로는 정규 표현식 구문을 사용한다는 것에 유의하자 (이전과 같은 따옴표로 감싸진 문자열이 아니다).

```js
app.get(/.*fish$/, function (req, res) {
  ...
})
```

> Note: 지역 도서관을 위한 대부분의 라우트는 정규 표현식이 아닌 문자열을 사용한다. 또한 다음 섹션에서 얘기 할 라우트 매개변수도 사용 할 것이다.

### 라우트 매개변수 (Route parameters)

라우트 매개변수는 URL의 특정 위치에서 값을 캡처하는 데 사용되는 *명명된(named) URL 조각(segment)*이다. 명명된 조각은 앞에 콜론과 이름이 접두사로 붙는다 (e.g. `/:your_parameter_name/`). 캡처값은 `req.params` 객체 안에 저장되고 매개변수 이름을 키(key)로 사용한다 (e.g. `req.params.your_parameter_name`).

그래서 예를 들어, 사용자와 책에 대한 정보를 포함하기 위해 인코딩된 URL을 생각해 보자: `http://localhost:3000/users/34/books/8989`. `userId`와 `bookId` 경로 매개변수를 사용해 아래와 같이 이 정보를 추출할 수 있다.

```js
app.get('/users/:userId/books/:bookId', function (req, res) {
  // Access userId via: req.params.userId
  // Access bookId via: req.params.bookId
  res.send(req.params);
})
```

라우트 매개변수의 이름은 "단어 문자"(A-Z, a-z, 0-9, _)로만 이루어져 있어야 한다.

> Note: URL */book/create*는 `/book/:bookId`와 같은 라우트와 일치할 것이다 ("bookId" 값을 `'create'`로 추출할 것이다). 들어오는 URL과 일치하는 첫 라우트가 사용되므로, `book/create` URL을 별도로 처리하려면, `book/:bookId` 라우트 이전에 라우트 핸들러를 정의해야 한다.

이것이 라우트를 시작하기 위해 필요한 전부다 - 필요하다면 Express 문서에서 더 많은 정보를 찾을 수 있다: [기본 라우팅](https://expressjs.com/en/starter/basic-routing.html)과 [라우팅 가이드](https://expressjs.com/en/guide/routing.html). 다음 섹션에서는 지역 도서관을 위한 라우트와 컨트롤러를 설정하는 법을 보여줄 것이다.

## 지역 도서관을 위해 필요한 라우트 (Routes needed for the LocalLibrary)

현재 웹 페이지를 위해 궁극적으로 필요한 URL 목록이 아래 나열되어 있다. 여기서 *객체(object)*는 각 모델(책, 책 인스턴스, 장르, 저자)의 이름으로 대체된다. *objects*는 object의 복수형이며, *id*는 각 Mongoose 모델 인스턴스에 기본으로 주어지는 고유한 인스턴스 필드(`_id`)이다.

* `catalog/` — home/index 페이지.
* `catalog/<objects>/` — 모든 책, 책 인스턴스, 장르, 저자의 목록.
    * e.g. `/catalog/books/`, `/catalog/genres/`, etc.
* `catalog/<object>/<id>` — 지정된 `_id` 필드 값의 특정 책, 책 인스턴스, 장르, 저자의 상세 페이지.
    * e.g. `/catalog/book/584493c1f4887f06c0e67d37)`
* `catalog/<object>/create` — 새로운 책, 책 인스턴스, 장르, 저자를 만드는 양식.
    * e.g. `/catalog/book/create`
* `catalog/<object>/<id>/update` — 지정 `_id` 필드 값의 특정 책, 책 인스턴스, 장르, 저자를 수정(update)하는 양식
    * e.g. `/catalog/book/584493c1f4887f06c0e67d37/update`
* `catalog/<object>/<id>/delete` — 지정 `_id` 필드 값의 특정 책, 책 인스턴스, 장르, 저자를 삭제하는 양식
    * e.g. `/catalog/book/584493c1f4887f06c0e67d37/delete`

처음 홈페이지와 목록 페이지는 어떤 추가적인 정보도 인코딩하지 않는다. 반환된 결과는 모델의 종류와 데이터베이스의 내용에 따라 다르지만, 정보를 얻기 위해 실행되는 쿼리는 항상 동일하다 (비슷하게 객체를 만드는데 실행되는 코드도 항상 비슷하다).

반면에 다른 URL은 특정 문서/모델 인스턴스에서 동작(act)하는 데 사용된다 - 이들은 해당 항목의 아이덴티티(identity)를 (위에서 `<id>`로 나타나는 것처럼) URL에 인코딩한다. 경로 매개변수를 사용해 인코딩된 정보를 추출하여, 라우트 핸들러에 전달한다 (그리고 이후의 글에서 이를 사용해 데이터베이스에서 어떤 정보를 가져올지 동적으로(dynamically) 결정할 것이다). URL의 정보를 인코딩하므로 특정 유형의 모든 리소스에 대해 하나의 라우트만 필요하다 (e.g. 모든 단일 책 항목을 표시하는 것을 처리하는 데 하나의 라우트만 필요).

> Note: Express를 사용하면 원하는 어떤 방식으로든 URL을 구성할 수 있다 - 위와 같이 정보를 URL의 본문(body)에 인코딩하거나 URL `GET` 매개변수를 사용할 수도 있다 (e.g. `/book/?id=6`). 어떤 방식을 사용하든 URL은 깔끔하고, 논리적이며, 읽기 쉽게 유지되어야 한다 ([W3C 권고 사항을 여기서 확인해보자](https://www.w3.org/Provider/Style/URI)).

다음으로는 라우트 핸들러 콜백 함수와 위의 URL을 위한 라우트 코드를 만들 것이다.

## 라우트 핸들러 콜백 함수 생성하기 (Create the route-handler callback functions)

라우트를 정의하기 전에, 우선 라우트 함수가 호출할 더미/뼈대 콜백 함수를 만들 것이다. 콜백은 책, 책 인스턴스, 장르, 저자를 위한 별도의 "컨트롤러" 모듈에 저장될 것이다 (어떤 파일/모듈 구성을 사용해도 되지만, 이 정도 세분화(granularity)가 이 프로젝트에 적합해 보인다).

프로젝트 루트 폴더에 컨트롤러를 위한 폴더(**/controllers**)를 만드는 것을 시작으로 각 모델을 처리하기 위한 별개의 컨트롤러 파일/모듈을 생성한다.

```
/express-locallibrary-tutorial  //the project root
  /controllers
    authorController.js
    bookController.js
    bookinstanceController.js
    genreController.js
```

### 저자 컨트롤러 (Author controller)

**/controllers/authorController.js**를 열어 다음의 코드를 작성한다:

```js
var Author = require('../models/author');

// 모든 저자 목록을 표시한다.
exports.author_list = function(req, res) {
    res.send('NOT IMPLEMENTED: Author list');
};

// 특정 저자의 상세 페이지를 표시한다.
exports.author_detail = function(req, res) {
    res.send('NOT IMPLEMENTED: Author detail: ' + req.params.id);
};

// GET에서 저자 생성 양식을 표시한다.
exports.author_create_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Author create GET');
};

// POST에서 저자 생성을 처리한다.
exports.author_create_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Author create POST');
};

// GET에서 저자 제거 양식을 표시한다.
exports.author_delete_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Author delete GET');
};

// POST에서 저자 제거를 처리한다.
exports.author_delete_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Author delete POST');
};

// GET에서 저자 수정 양식을 표시한다.
exports.author_update_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Author update GET');
};

// POST에서 저자 수정을 처리한다.
exports.author_update_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Author update POST');
};
```

우선 모듈에는 나중에 데이터에 접근하고 이를 수정하는 데 사용할 모델이 필요하다. 그다음 처리하려는 각 URL에 대한 함수를 내보낸다 (생성, 수정, 삭제 기능은 양식을 사용하고, 그러므로 양식 post 요청을 위한 추가적인 메소드를 갖는다 - 이 메소드에 대해서는 이후에 "양식 글"에서 다룰 것이다).

모든 함수에는 요청 및 응답에 대한 인자와 함께 *Express 미들웨어 함수*의 표준 양식이 있다. 또한 메소드가 요청 주기를 완료하지 않았을 때 호출할 `next` 함수도 포함하지만, 이 경우에는 항상 그러기(요청 주기를 완료하기) 때문에 생략한다. 메소드는 연관된 페이지가 아직 생성되지 않았다는 것을 나타내는 문자열을 반환한다. 컨트롤러 함수가 경로 매개 변수를 수신하는 경우에는 매개 변수가 메시지 문자열로 출력된다 (위의 `req.params.id`를 참고하자).

### 책 인스턴스 컨트롤러 (BookInstance controller)

**/controllers/bookinstanceController.js** 파일을 열고 다음의 코드를 복사해 넣자 (`Author` 컨트롤러 모듈과 같은 패턴을 따른다).

```js
var BookInstance = require('../models/bookinstance');

// 모든 책 인스턴스 목록을 표시한다.
exports.bookinstance_list = function(req, res) {
    res.send('NOT IMPLEMENTED: BookInstance list');
};

// 특정 책 인스턴스의 상세 페이지를 표시한다.
exports.bookinstance_detail = function(req, res) {
    res.send('NOT IMPLEMENTED: BookInstance detail: ' + req.params.id);
};

// GET에서 책 인스턴스 생성 양식을 표시한다.
exports.bookinstance_create_get = function(req, res) {
    res.send('NOT IMPLEMENTED: BookInstance create GET');
};

// POST에서 책 인스턴스 생성을 처리한다.
exports.bookinstance_create_post = function(req, res) {
    res.send('NOT IMPLEMENTED: BookInstance create POST');
};

// GET에서 책 인스턴스 제거 양식을 표시한다.
exports.bookinstance_delete_get = function(req, res) {
    res.send('NOT IMPLEMENTED: BookInstance delete GET');
};

// POST에서 책 인스턴스 제거를 처리한다.
exports.bookinstance_delete_post = function(req, res) {
    res.send('NOT IMPLEMENTED: BookInstance delete POST');
};

// GET에서 책 인스턴스 수정 양식을 표시한다.
exports.bookinstance_update_get = function(req, res) {
    res.send('NOT IMPLEMENTED: BookInstance update GET');
};

// POST에서 책 인스턴스 수정을 처리한다.
exports.bookinstance_update_post = function(req, res) {
    res.send('NOT IMPLEMENTED: BookInstance update POST');
};
```

### Genre controller

**/controllers/genreController.js** 파일을 열고 다음의 코드를 복사해 넣자 (`Author`와 `BookInstance` 파일과 같은 패턴을 따른다).

```js
var Genre = require('../models/genre');

// 모든 장르 목록을 표시한다.
exports.genre_list = function(req, res) {
    res.send('NOT IMPLEMENTED: Genre list');
};

// 특정 장르 상세 페이지를 표시한다.
exports.genre_detail = function(req, res) {
    res.send('NOT IMPLEMENTED: Genre detail: ' + req.params.id);
};

// GET에서 장르 생성 양식을 표시한다.
exports.genre_create_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Genre create GET');
};

// POST에서 장르 생성을 처리한다.
exports.genre_create_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Genre create POST');
};

// GET에서 장르 삭제 양식을 표시한다.
exports.genre_delete_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Genre delete GET');
};

// POST에서 장르 삭제를 처리한다.
exports.genre_delete_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Genre delete POST');
};

// GET에서 장르 수정 양식을 표시한다.
exports.genre_update_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Genre update GET');
};

// POST에서 장르 수정을 처리한다.
exports.genre_update_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Genre update POST');
};
```

### 책 컨트롤러 (Book controller)

**/controllers/bookController.js** 파일을 열고 다음의 코드를 복사해 넣자. 다른 컨트롤러 모듈과 같은 패턴을 따르지만, 추가로 사이트의 환영 페이지를 표시하기 위한 `index()` 함수를 갖는다.

```js
var Book = require('../models/book');

exports.index = function(req, res) {
    res.send('NOT IMPLEMENTED: Site Home Page');
};

// 모든 책 목록을 표시한다.
exports.book_list = function(req, res) {
    res.send('NOT IMPLEMENTED: Book list');
};

// 특정 책 상세 페이지를 표시한다.
exports.book_detail = function(req, res) {
    res.send('NOT IMPLEMENTED: Book detail: ' + req.params.id);
};

// GET에서 책 생성 양식을 표시한다.
exports.book_create_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Book create GET');
};

// POST에서 책 생성을 처리한다.
exports.book_create_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Book create POST');
};

// GET에서 책 삭제 양식을 표시한다.
exports.book_delete_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Book delete GET');
};

// POST에서 책 삭제를 처리한다.
exports.book_delete_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Book delete POST');
};

// GET에서 책 수정 양식을 표시한다.
exports.book_update_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Book update GET');
};

// POST에서 책 수정을 처리한다.
exports.book_update_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Book update POST');
};
```

## 카탈로그 라우트 모듈을 생성하기 (Create the catalog route module)

다음으로 이전 섹션에서 정의한 컨트롤러 함수를 호출하는 [지역 도서관 웹사이트에 필요한](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/routes#routes_needed_for_the_locallibrary) 모든 URL의 *라우트*를 생성한다.

뼈대 사이트는 이미 *인덱스(index)*와 *사용자(users)*의 라우트를 포함하는 **./routes** 폴더를 갖는다. 나타난 것과 같이 또 다른 라우트 파일 - **catalog.js** - 을 폴더 안에 생성한다.

```
/express-locallibrary-tutorial //the project root
  /routes
    index.js
    users.js
    catalog.js
```

**/routes/catalog.js**를 열어 아래의 코드를 복사해 넣는다.

```js
var express = require('express');
var router = express.Router();

// Require controller modules.
var book_controller = require('../controllers/bookController');
var author_controller = require('../controllers/authorController');
var genre_controller = require('../controllers/genreController');
var book_instance_controller = require('../controllers/bookinstanceController');

/// 책 라우트 ///

// 카탈로그 홈페이지를 GET 한다.
router.get('/', book_controller.index);

// 책을 생성하기 위한 GET 요청. (id를 사용해) 책을 표시하는 라우트 전에 와야 한다는 것을 명심하자.
router.get('/book/create', book_controller.book_create_get);

// 책을 생성하기 위한 POST 요청.
router.post('/book/create', book_controller.book_create_post);

// 책을 삭제하기 위한 GET 요청.
router.get('/book/:id/delete', book_controller.book_delete_get);

// 책을 삭제하기 위한 POST 요청.
router.post('/book/:id/delete', book_controller.book_delete_post);

// 책을 수정하기 위한 GET 요청.
router.get('/book/:id/update', book_controller.book_update_get);

// 책을 수정하기 위한 POST 요청.
router.post('/book/:id/update', book_controller.book_update_post);

// 하나의 책을 위한 GET 요청.
router.get('/book/:id', book_controller.book_detail);

// 모든 책 항목의 목록을 위한 GET 요청.
router.get('/books', book_controller.book_list);

/// 저자 라우트 ///

// 저자를 생성하기 위한 GET 요청. id를 위한 라우트 (i.e. 저자 표시) 이전에 위치해야 한다.
router.get('/author/create', author_controller.author_create_get);

// 저자를 생성하기 위한 POST 요청.
router.post('/author/create', author_controller.author_create_post);

// 저자를 삭제하기 위한 GET 요청.
router.get('/author/:id/delete', author_controller.author_delete_get);

// 저자를 삭제하기 위한 POST 요청.
router.post('/author/:id/delete', author_controller.author_delete_post);

// 저자를 수정하기 위한 GET 요청.
router.get('/author/:id/update', author_controller.author_update_get);

// 저자를 수정하기 위한 POST 요청.
router.post('/author/:id/update', author_controller.author_update_post);

// 하나의 저자를 위한 GET 요청.
router.get('/author/:id', author_controller.author_detail);

// 모든 저자 항목의 목록을 위한 GET 요청.
router.get('/authors', author_controller.author_list);

/// 장르 라우트 ///

// 책을 생성하기 위한 GET 요청. (id를 사용해) 장르를 표시하는 라우트 전에 와야 한다는 것을 명심하자.
router.get('/genre/create', genre_controller.genre_create_get);

// 장르를 생성하기 위한 POST 요청.
router.post('/genre/create', genre_controller.genre_create_post);

// 장르를 삭제하기 위한 GET 요청.
router.get('/genre/:id/delete', genre_controller.genre_delete_get);

// 장르를 삭제하기 위한 POST 요청.
router.post('/genre/:id/delete', genre_controller.genre_delete_post);

// 장르를 수정하기 위한 GET 요청.
router.get('/genre/:id/update', genre_controller.genre_update_get);

// 장르를 수정하기 위한 POST 요청.
router.post('/genre/:id/update', genre_controller.genre_update_post);

// 하나의 장르를 위한 GET 요청.
router.get('/genre/:id', genre_controller.genre_detail);

// 모든 장르 항목의 목록을 위한 GET 요청.
router.get('/genres', genre_controller.genre_list);

/// 책 인스턴스 라우트 ///

// 책 인스턴스를 생성하기 위한 GET 요청. (id를 사용해) 책 인스턴스를 표시하는 라우트 전에 와야 한다는 것을 명심하자.
router.get('/bookinstance/create', book_instance_controller.bookinstance_create_get);

// 책 인스턴스 생성하기 위한 POST 요청.
router.post('/bookinstance/create', book_instance_controller.bookinstance_create_post);

// 책 인스턴스 삭제하기 위한 GET 요청.
router.get('/bookinstance/:id/delete', book_instance_controller.bookinstance_delete_get);

// 책 인스턴스 삭제하기 위한 POST 요청.
router.post('/bookinstance/:id/delete', book_instance_controller.bookinstance_delete_post);

// 책 인스턴스 수정하기 위한 GET 요청.
router.get('/bookinstance/:id/update', book_instance_controller.bookinstance_update_get);

// 책 인스턴스 수정하기 위한 POST 요청.
router.post('/bookinstance/:id/update', book_instance_controller.bookinstance_update_post);

// 하나의 책 인스턴스를 위한 GET 요청.
router.get('/bookinstance/:id', book_instance_controller.bookinstance_detail);

// 모든 책 인스턴스 항목의 목록을 위한 GET 요청.
router.get('/bookinstances', book_instance_controller.bookinstance_list);

module.exports = router;
```

모들은 Express를 필요로하고 이를 사용해 `Router` 객체를 만든다. 라우트는 모두 라우터에 설정한 뒤 내보내진다.

라우트는 라우터 객체에 `.get()`이나 `.post()` 메소드를 사용해 정의한다. 모든 경로는 문자열을 사용해 (문자열 패턴이나 정규 표현식을 사용하지 않는다) 정의한다. 특정 리소스(e.g. 책)에서 실행되는 라우트는 경로 매개변수를 사용해 URL에서 객체 id를 얻는다.

핸들러 함수는 이전 섹션에서 만든 컨트롤러 모듈에서 가져온다.

### 인덱스 라우트 모듈을 수정하기 (Update the index route module)

새 라우트를 모두 설정했지만, 기존(original) 페이지로 이동하는 라우트가 아직 남아있다. 이걸 (기존 페이지) 대신 '/catalog' 경로에 만든 새로운 인덱스 페이지로 향하도록(redirect) 해보자.

**/routes/index.js**를 열고 존재하는 라우트를 아래의 함수로 바꾸자.

```js
// GET home page.
router.get('/', function(req, res) {
  res.redirect('/catalog');
});
```

> Note: 이것이 [redirect()](https://expressjs.com/en/4x/api.html#res.redirect) 응답 메소드를 처음 사용해보는 것이다. 이 메소드는 HTTP 상태 코드 "302 Found"를 기본적으로 전송해 지정된 페이지로 향한(redirect)다. 필요하다면 반환되는 상태 코드를 바꾸고, 적대 혹은 상대 경로를 제공할 수 있다.

### app.js를 수정하기 (Update app.js)

마지막 단계는 라우트를 미들웨어 체인에 추가하는 것이다. 이것은 `app.js`에서 한다

**app.js**를 열고 catalog 라우트를 다른 라우트 아래에 포함한다 (아래 보이는 세 번째 줄을 다른 두 코드 아래에 추가한다).

```js
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var catalogRouter = require('./routes/catalog');  // 사이트의 "catalog" 영역을 위한 라우트를 불러오기.
```

다음으로, catalog 라우트를 다른 라우트 아래의 미들웨어 스택에 추가한다 (아래 보이는 세 번째 줄을 다른 두 코드 아래에 추가한다)

```js
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/catalog', catalogRouter);  // 미들웨어 체인에 catalog 라우트를 추가.
```

이게 전부이다. 이제 지역 도서관 웹사이트에서 최종적으로 지원할 모든 URL에서 라우트와 뼈대 함수를 사용할 수 있다(enabled).

### 라우트를 테스트하기 (Testing the routes)

라우트를 테스트하려면, 우선 일반적인 방식으로 웹사이트를 시작한다.

* 기본 방식

    ```
    // Windows
    SET DEBUG=express-locallibrary-tutorial:* & npm start

    // macOS or Linux
    DEBUG=express-locallibrary-tutorial:* npm start
    ```

* 이전에 nodemon을 설정했다면 대신 다음을 사용한다:

    ```
    // Windows
    SET DEBUG=express-locallibrary-tutorial:* & npm run devstart

    // macOS or Linux
    DEBUG=express-locallibrary-tutorial:* npm run devstart
    ```

그런 다음 몇 개의 지역 도서관 URL로 이동해, 에러 페이지(HTTP 404)가 표시되지 않는지 확인하자. 편의를 위해 아래에 약간의 URL 모음이 나열되어있다:

* http://localhost:3000/
* http://localhost:3000/catalog
* http://localhost:3000/catalog/books
* http://localhost:3000/catalog/bookinstances/
* http://localhost:3000/catalog/authors/
* http://localhost:3000/catalog/genres/
* http://localhost:3000/catalog/book/5846437593935e2f8c2aa226
* http://localhost:3000/catalog/book/create
