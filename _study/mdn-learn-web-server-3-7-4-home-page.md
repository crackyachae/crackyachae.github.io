---
layout  : article
title   : 홈페이지 (Home page)
summary : 
date    : 2022-02-09 14:52:56 +0900
updated : 2022-02-09 21:11:49 +0900
tag     : 
toc     : true
public  : true
parent  : [[mdn-learn-web-server-3-7-express-tutorial-5]]
latex   : false
---
* TOC
{:toc}

> 이 글은 MDN Learn web development의 [Express web framework (Node.js/JavaScript)](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs) 중 [Home page](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/Displaying_data/Home_page)의 내용을 번역 및 정리한 글입니다.
>
> * 제가 필요한 부분 위주로 확인하면서 정리하고 있어 글에 덜 작성된 부분이 있을 수 있습니다.
> * 글 작성 후 원문의 내용이 수정되거나 내용을 이해하기 위한 개인적인 설명이나 해석이 있을 수 있습니다. 되도록 원문을 참고해주시길 바랍니다.
> * 잘못된 부분이 있다면 댓글이나 그 외 편하신 방법으로 알려주시면 감사하겠습니다.

처음으로 만들 페이지는 사이트(`'/'`)나 catalog(`catalog`) 루트에서 접근할 수 있는 웹사이트의 홈페이지이다. 홈페이지는 사이트를 설명하는 정적 텍스트와 함께, 데이터베이스에서 다른 유형의 레코드 "개수"를 동적으로 계산해서 보여준다.

홈페이지의 라우트는 이미 만들었다. 페이지를 완성하기 위해서, 데이터베이스의 레코드 "개수"를 가져오는 컨트롤러 함수를 갱신하고, 페이지를 렌더링하는데 사용할 뷰(템플릿)를 만들어야 한다.

## Route

[이전 튜토리얼]에서 인덱스 페이지의 라우트를 만들었다. 다시 말하자면, 모든 라우트 함수는 **/routes/catalog.js**에 정의되어 있다.:

```js
// GET catalog home page.
router.get('/', book_controller.index);  //This actually maps to /catalog/ because we import the route with a /catalog prefix
```

콜백 함수 매개변수(`book_controller.index`)는 **/controllers/bookController.js**에 정의되어 있다:

```js
exports.index = function(req, res, next) {
    res.send('NOT IMPLEMENTED: Site Home Page');
}
```

우리는 모델에서 정보를 얻은 다음 템플릿(뷰)을 사용해 이를 렌더링 할 수 있도록 이 컨트롤러 함수를 확장한다.

## 컨트롤러 (Controller)

인덱스 컨트롤러 함수는

* 데이터베이스에 있는 `Book`, `BookInstance`, 가능한 `BookInstance`, `Author`, `Genre` 레코드의 개수에 대한 정보를 불러오고,
* 이 데이터를 HTML 페이지를 만들기 위해 템플릿에서 렌더링한 뒤,
* 이를 HTTP 응답으로 반환해야 한다.

> Note: [`countDocuments()`](https://mongoosejs.com/docs/api.html#model_Model.countDocuments) 메소드를 사용해 각 모델의 인스턴스 개수를 얻는다. 이 메소드는 모델에서 호출되며, 첫 번째 인자로 일치해야 하는 추가적인 조건 모음을, 두 번째 인자로 콜백 함수를([(Mongoose와 함께) 데이터베이스를 사용하기](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/mongoose)에서 논의했던 것처럼, 그리고 `Query`를 반환하고 이를 나중에 콜백에서 실행할 수 있다) 받는다. 콜백은 데이터베이스가 개수를 반환할 때 호출되며, 첫 번째 매개변수로 오류를 (혹은 `null`) 그리고 두 번째 매개변수로 문서의 개수를 (혹은 오류가 있으면 `null`을) 전달한다.
>
> ```js
> SomeModel.countDocuments({ a_model_field: 'match_value' }, function (err, count) {
>  // ... do something if there is an err
>  // ... do something with the count if there was no error
>  });
> ```

**/controllers/bookController.js**를 연다. 파일의 위쪽 가까이에서 `index()` 함수를 내보내고 있는 것을 볼 수 있다.

```js
exports.index = function(req, res, next) {
 res.send('NOT IMPLEMENTED: Site Home Page');
}
```

위의 모든 코드를 다음의 코드 조각으로 바꾼다. 이 코드가 첫 번째로 하는 것은 모든 모델을 불러오는(`require()`) 것이다. 이들을 사용해서 문서의 개수를 얻을 것이기 때문에 모델을 불러와야 한다. 그다음으로는 (이전에 [Async를 사용한 비동기 흐름 제어](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/Displaying_data/flow_control_using_async)에서 논의했었던) *async* 모듈을 가져온다.

```js
var Book = require('../models/book');
var Author = require('../models/author');
var Genre = require('../models/genre');
var BookInstance = require('../models/bookinstance');

var async = require('async');

exports.index = function(req, res) {

    async.parallel({
        book_count: function(callback) {
            Book.countDocuments({}, callback); // Pass an empty object as match condition to find all documents of this collection
        },
        book_instance_count: function(callback) {
            BookInstance.countDocuments({}, callback);
        },
        book_instance_available_count: function(callback) {
            BookInstance.countDocuments({status:'Available'}, callback);
        },
        author_count: function(callback) {
            Author.countDocuments({}, callback);
        },
        genre_count: function(callback) {
            Genre.countDocuments({}, callback);
        }
    }, function(err, results) {
        res.render('index', { title: 'Local Library Home', error: err, data: results });
    });
};
```

`async.parallel()` 메소드는 각 모델의 개수를 얻기 위해 함수들과 함께 객체를 전달한다. 이 함수들은 동시에 시작한다. 모든 함수가 완료됐을 때 `results` 매개변수 안에 개수(혹은 오류)가 포함된 채 마지막 콜백이 호출된다.

성공하면 콜백 함수가 **'index'**라는 뷰(템플릿)와 여기에 삽입될 데이터(모델의 개수를 포함하는 `result` 객체를 포함한다)를 포함하는 객체를 특정하는 `res.render()`을 호출한다. 데이터는 키(key)-값 쌍으로 제공되고, 템플릿에서 키를 사용해 데이터에 접근할 수 있다.

> Note: 위 `async.parallel()`의 콜백 함수는 오류가 있는지에 상관없이 페이지를 렌더링한다는 점에서 약간 일반적이지 않다 (보통은 오류 표시를 처리하기 위해 별도의 실행 경로를 사용할 것이다).

## 뷰 (View)

**/views/index.pug**를 열고 그 내용을 아래의 텍스트로 바꾸자.

```js
extends layout

block content
  h1= title
  p Welcome to #[em LocalLibrary], a very basic Express website developed as a tutorial example on the Mozilla Developer Network.

  h1 Dynamic content

  if error
    p Error getting dynamic content.
  else
    p The library has the following record counts:

    ul
      li #[strong Books:] !{data.book_count}
      li #[strong Copies:] !{data.book_instance_count}
      li #[strong Copies available:] !{data.book_instance_available_count}
      li #[strong Authors:] !{data.author_count}
      li #[strong Genres:] !{data.genre_count}
```

뷰는 간단하다. **layout.pug** 기본 템플릿을 확장해, **'content'**라는 `block`을 재정의한다. 처음 `h1` 헤딩(heading)은 `render()` 함수로 전달된 `title` 변수의 이스케이프 된 텍스트일 것이다 - 그다음에 오는 텍스트가 자바스크립트 표현식으로 처리되도록 '`h1=`'을 사용했다는 것을 확인하자. 그다음으로는 지역 도서관을 소개하는 문단을 포함한다.

*Dynamic content* 헤딩(`h1 Dynamic content`)의 아래에서는 `render()` 함수에서 전달받은 error 변수가 정의되었는지 아닌지 확인한다. 만약 정의되었다면 오류를 알려야 한다. 그러지 않았다면, `data` 변수로부터 각 모델의 문서(copies) 개수를 얻어서 표시한다.

> Note: 개수 값이 계산되었기 때문에 개수 값은 이스케이프 하지 않는다 (i.e. `!{}` 구문을 사용한다). 만약 최종 사용자가 제공한 정보를 사용한다면, 이를 출력하기 위해서 변수를 이스케이프 해야 한다.

## 어떻게 생겼나? (What does it look like?)

이쯤이면 인덱스 페이지를 표시하는데 필요한 모든 것을 만들었어야 한다. 애플리케이션을 실행하고 브라우저에서 `http://localhost:3000/`를 열어보자. 모든 것을 알맞게 설정했다면, 사이트가 다음의 스크린샷 처럼 보일 것이다.

> Note: 아직 해당 페이지의 url, 뷰, 템플릿이 정의되지 않았기 때문에, 아직 사이드바의 링크를 사용할 수 없을 것이다. 만약 링크에 접속하려고 시도하면, 클릭한 링크에 따라 "NOT IMPLEMENTED: Book list"의 예시와 같은 오류를 마주할 것이다. 이 문자열 리터럴(이후에 적절한 데이터로 대체될)은 "controllers" 파일 안에 있는 다른 컨트롤러에 의해 결정(specified)된다.
