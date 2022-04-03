---
layout  : article
title   : 저자 상세 페이지 (Author detail page)
summary : 
date    : 2022-02-26 17:11:52 +0900
updated : 2022-02-26 20:19:32 +0900
tag     : draft
toc     : true
public  : true
parent  : [[mdn-learn-web-server-3-7-express-tutorial-5]]
latex   : false
---
* TOC
{:toc}

> 이 글은 MDN Learn web development의 [Express web framework (Node.js/JavaScript)](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs) 중 [Author detail page](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/Displaying_data/Author_detail_page)의 내용을 번역 및 정리한 글입니다.
>
> * 제가 필요한 부분 위주로 확인하면서 정리하고 있어 글에 덜 작성된 부분이 있을 수 있습니다.
> * 글 작성 후 원문의 내용이 수정되거나 내용을 이해하기 위한 개인적인 설명이나 해석이 있을 수 있습니다. 되도록 원문을 참고해주시길 바랍니다.
> * 잘못된 부분이 있다면 댓글이나 그 외 편하신 방법으로 알려주시면 감사하겠습니다.

저자 *상세(detail)* 페이지는 특정 `Author`의 정보를, 해당 저자의 (자동으로 생성된) `_id` 필드 값을 식별자로 사용해서, 해당 `Author`와 관련된 `Book` 객체의 목록과 함께 표시한다.

## 컨트롤러 (Controller)

**/controllers/authorController.js**을 연다.

*async*와 *Book* 모듈을 불러오기 위해서 다음의 코드를 파일의 가장 위에 추가한다 (저자 상세 페이지를 위해 필요하다).

```js
var async = require('async');
var Book = require('../models/book');
```

내보내진 `author_detail()` 컨트롤러 메소드를 찾아서 다음의 코드로 대체한다.

```js
// Display detail page for a specific Author.
exports.author_detail = function(req, res, next) {

    async.parallel({
        author: function(callback) {
            Author.findById(req.params.id)
              .exec(callback)
        },
        authors_books: function(callback) {
          Book.find({ 'author': req.params.id },'title summary')
          .exec(callback)
        },
    }, function(err, results) {
        if (err) { return next(err); } // Error in API usage.
        if (results.author==null) { // No results.
            var err = new Error('Author not found');
            err.status = 404;
            return next(err);
        }
        // Successful, so render.
        res.render('author_detail', { title: 'Author Detail', author: results.author, author_books: results.authors_books } );
    });

};
```

이 메소드는 `async.parallel()`을 사용해서 `Author`와 그에 연관된 `Book` 인스턴스를 병렬적으로 가져오고, 두 요청이 성공적으로 완료(된다면)될 때 페이지를 렌더링한다. 이 방식은 위의 *장르 상세 페이지*에서 설명한 것과 정확히 같다.

## 뷰 (View)

**/views/author_detail.pug**를 만들어 다음의 코드를 채워 넣자:

```pug
extends layout

block content

  h1 Author: #{author.name}
  p #{author.date_of_birth} - #{author.date_of_death}

  div(style='margin-left:20px;margin-top:20px')

    h4 Books

    dl
      each book in author_books
        dt
          a(href=book.url) #{book.title}
        dd #{book.summary}

      else
        p This author has no books.
```

이 템플릿의 모든 것은 이전 섹션에서 다뤘었다.

## 어떻게 보일까? (What does it look like?)

애플리케이션을 실행시키고, 브라우저에서 `http://localhost:3000/`를 열자. *All Authors* 링크를 선택하고, 저자 중 하나를 선택하자. 만약 모든 게 올바르게 갖춰졌다면, 사이트는 다음의 스크린샷처럼 보일 것이다.

![author detail page screenshot](/post-img/mdn-learn-web-server-3-7-11-author-detail-page/locallibary_express_author_detail.png)

> Note: 저자의 *생몰 주기(lifespan)* 날짜의 모습이 지저분하다! 이 글의 마지막 도전에서 이를 처리할 것이다.
