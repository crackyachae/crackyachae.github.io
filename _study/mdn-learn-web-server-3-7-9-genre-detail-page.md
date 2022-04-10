---
layout  : article
title   : 장르 상세 페이지 (Genre detail page)
summary : 
date    : 2022-02-26 12:02:57 +0900
updated : 2022-02-26 15:51:49 +0900
tag     : draft
toc     : true
public  : true
parent  : [[mdn-learn-web-server-3-7-express-tutorial-5]]
latex   : false
---
* TOC
{:toc}

> 이 글은 MDN Learn web development의 [Express web framework (Node.js/JavaScript)](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs) 중 [Genre detail page](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/Displaying_data/Genre_detail_page)의 내용을 번역 및 정리한 글입니다.
>
> * 제가 필요한 부분 위주로 확인하면서 정리하고 있어 글에 덜 작성된 부분이 있을 수 있습니다.
> * 글 작성 후 원문의 내용이 수정되거나 내용을 이해하기 위한 개인적인 설명이나 해석이 있을 수 있습니다. 되도록 원문을 참고해주시길 바랍니다.
> * 잘못된 부분이 있다면 댓글이나 그 외 편하신 방법으로 알려주시면 감사하겠습니다.

장르 *상세(detail)* 페이지는 특정 장르 인스턴스의 정보를 해당 장르의 자동으로 생성된 `_id` 필드 값을 식별자로 사용해서 표시한다. 이 페이지는 장르명과 해당 장르의 모든 책 목록이 표시되어야 하며, 책의 목록은 각 책의 상세 페이지로 연결되어야 한다.

## 컨트롤러 (Controller)

**/controllers/genreController.js**을 열고 파일의 가장 위에서 *async*와 *Book* 모듈을 불러온다.

```js
var Book = require('../models/book');
var async = require('async');
```

내보내진 `genre_detail()` 컨트롤러 메소드를 찾아서 다음의 코드로 대체한다.

```js
// Display detail page for a specific Genre.
exports.genre_detail = function(req, res, next) {

    async.parallel({
        genre: function(callback) {
            Genre.findById(req.params.id)
              .exec(callback);
        },

        genre_books: function(callback) {
            Book.find({ 'genre': req.params.id })
              .exec(callback);
        },

    }, function(err, results) {
        if (err) { return next(err); }
        if (results.genre==null) { // No results.
            var err = new Error('Genre not found');
            err.status = 404;
            return next(err);
        }
        // Successful, so render
        res.render('genre_detail', { title: 'Genre Detail', genre: results.genre, genre_books: results.genre_books } );
    });

};
```

이 메소드는 `async.parallel()`을 사용해서 장르 이름과 그에 연관된 책을 병렬적으로 가져오고, 두 요청이 성공적으로 완료(된다면)될 때 페이지를 렌더링한다.

필요한 장르 레코드의 ID는 URL 끝에 인코딩되고 라우트 정의(**/genre/:id**)를 기반으로 자동으로 추출된다. ID는 요청 매개변수를 통해 컨트롤러 안에서 접근할 수 있다: `req.params.id`. ID는 `Genre.findById()`에서 현재 장르를 얻기 위해 사용된다. 또한 각 `genre` 필드에 해당 장르 ID 값을 갖는 모든 `Book` 객체를 얻는 데 사용되기도 한다: `Book.find({ 'genre': req.params.id })`.

> Note: 만약 해당 장르가 데이터베이스에 존재하지 않으면 (i.e. 삭제되었을 수도 있다) `findById()`는 반환 값은 없이 성공적으로 반환될 것이다. 이 경우에는 "not found" 페이지를 반환하고 싶으니, `Error` 객체를 만들어 체인의 `next` 미들웨어 함수에 전달한다.
>
> ```js
> if (results.genre==null) { // No results.
>     var err = new Error('Genre not found');
>     err.status = 404;
>     return next(err);
> }
> ```
>
> 그러면 이 메시지가 오류 처리 코드로 전달될 것이다 (이는 [애플리케이션 뼈대를 생성할 때](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/skeleton_website#app.js) 설정했었다 - 더 많은 정보를 알고 싶다면 [오류 처리하기](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/Introduction#handling_errors)를 참고하자).

렌더링 된 뷰는 **genre_datail**이고 `title`, `genre`와 이 장르의 책 목록 (`genre_books`)에 대한 변수를 전달받는다.

## 뷰 (View)

**/views/genre_detail.pug**를 만들어 아래의 코드를 채워 넣자:

```pug
extends layout

block content

  h1 Genre: #{genre.name}

  div(style='margin-left:20px;margin-top:20px')

    h4 Books

    dl
      each book in genre_books
        dt
          a(href=book.url) #{book.title}
        dd #{book.summary}

      else
        p This genre has no books
```

뷰는 다른 템플릿과 매우 유사하다. 주된 차이점은 전달받은 `title`을 첫 번째 헤딩에 사용하지 않는다는 점이다 (페이지 제목을 설정하기 위해 기본 **layout.pug** 템플릿에서 사용되기는 한다).

## 어떻게 보일까? (What does it look like?)

애플리케이션을 실행시키고, 브라우저에서 `http://localhost:3000/`를 열자. *All genres* 링크를 선택하고, 장르 중 하나를 선택하자 (e.g. "Fantasy"). 만약 모든 게 올바르게 갖춰졌다면, 사이트는 다음의 스크린샷처럼 보일 것이다.

![genre detail page screenshot](/post-img/mdn-learn-web-server-3-7-9-genre-detail-page/locallibary_express_genre_detail.png)

> Note: 이것과 비슷한 오류가 발생할 수도 있다:
>
> ```js
> Cast to ObjectId failed for value " 59347139895ea23f9430ecbb" at path "_id" for model "Genre"
> ```
>
> 이것은 **req.params.id**에서 생긴(coming) mongoose 오류이다. 이 문제를 해결하기 위해서는, 먼저 이것과 같이 **genreController.js** 페이지에 mongoose를 포함해야 한다:
>
> ```js
>  var mongoose = require('mongoose');
> ```
>
> 그다음 **mongoose.Types.ObjectId()**를 사용해서 id를 사용할 수 있는 유형으로 바꾼다. 예를 들어:
>
> ```js
> exports.genre_detail = function(req, res, next) {
>     var id = mongoose.Types.ObjectId(req.params.id);
>     ...
> ```
