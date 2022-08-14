---
layout  : article
title   : 책 상세 페이지 (Book detail page)
summary : 
date    : 2022-02-26 15:57:10 +0900
updated : 2022-02-26 17:11:15 +0900
tag     : draft
toc     : true
public  : true
parent  : [[/js-library/express/mdn-learn-web-server-3/7-express-tutorial-5]]
latex   : false
---
* TOC
{:toc}

> 이 글은 MDN Learn web development의 [Express web framework (Node.js/JavaScript)](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs) 중 [Book detail page](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/Displaying_data/Book_detail_page)의 내용을 번역 및 정리한 글입니다.
>
> * 제가 필요한 부분 위주로 확인하면서 정리하고 있어 글에 덜 작성된 부분이 있을 수 있습니다.
> * 글 작성 후 원문의 내용이 수정되거나 내용을 이해하기 위한 개인적인 설명이나 해석이 있을 수 있습니다. 되도록 원문을 참고해주시길 바랍니다.
> * 잘못된 부분이 있다면 댓글이나 그 외 편하신 방법으로 알려주시면 감사하겠습니다.

책 *상세(detail)* 페이지는 (자동으로 생성된 `_id` 필드 값으로 식별되는) 특정 `Book`의 정보를 도서관 안의 각 관련 사본에 대한 정보(`BookInstance`)와 함께 표시한다. 저자, 장르, 또는 책 인스턴스를 표시하는 어느 곳이든, 이는 해당 항목에 대한 관련 상세 페이지로 연결되어야 한다.

## 컨트롤러 (Controller)

**/controllers/bookController.js**을 열고 내보내진 `book_detail()` 컨트롤러 메소드를 찾아서 다음의 코드로 대체한다.

```js
// Display detail page for a specific book.
exports.book_detail = function(req, res, next) {

    async.parallel({
        book: function(callback) {

            Book.findById(req.params.id)
              .populate('author')
              .populate('genre')
              .exec(callback);
        },
        book_instance: function(callback) {

          BookInstance.find({ 'book': req.params.id })
          .exec(callback);
        },
    }, function(err, results) {
        if (err) { return next(err); }
        if (results.book==null) { // No results.
            var err = new Error('Book not found');
            err.status = 404;
            return next(err);
        }
        // Successful, so render.
        res.render('book_detail', { title: results.book.title, book: results.book, book_instances: results.book_instance } );
    });

};
```

> *async*와 *BookInstance* 모듈은 홈페이지 컨트롤러를 구현할 때 불러왔기 때문에 이번 단계에서는 이 두 모듈을 포함할 필요가 없다.

이 메소드는 `async.parallel()`을 사용해서 `Book`과 관련 사본을 복사 병렬적으로 찾는다. 이 방식은 [장르 상세 페이지](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/Displaying_data/Genre_detail_page)에서 설명한 것과 정확히 같은 방식이다. 'title' 키(key)가 웹페이지의 이름을 부여하기 위해 사용됐기 때문에 ('layout.pug'의 헤더에 정의된 것처럼), 이번에는 웹페이지를 렌더링하는 동안 `results.book.title`을 전달한다.

## 뷰 (View)

**/views/book_detail.pug**를 만들어 아래의 코드를 채워 넣자:

```pug
extends layout

block content
  h1 Title: #{book.title}

  p #[strong Author:]
    a(href=book.author.url) #{book.author.name}
  p #[strong Summary:] #{book.summary}
  p #[strong ISBN:] #{book.isbn}
  p #[strong Genre:]
    each val, index in book.genre
      a(href=val.url) #{val.name}
      if index < book.genre.length - 1
        |,

  div(style='margin-left:20px;margin-top:20px')
    h4 Copies

    each val in book_instances
      hr
      if val.status=='Available'
        p.text-success #{val.status}
      else if val.status=='Maintenance'
        p.text-danger #{val.status}
      else
        p.text-warning #{val.status}
      p #[strong Imprint:] #{val.imprint}
      if val.status!='Available'
        p #[strong Due back:] #{val.due_back}
      p #[strong Id:]
        a(href=val.url) #{val._id}

    else
      p There are no copies of this book in the library.
```

이 템플릿의 거의 모든 것은 이전 섹션에서 다뤘었다.

> Note: 책과 연관된 장르의 목록은 아래의 템플릿에 구현되었다. 이 코드는 마지막 것을 제외하고 책에 관련된 모든 장르 다음에 쉼표를 추가한다.
>
> ```pug
>   p #[strong Genre:]
>     each val, index in book.genre
>       a(href=val.url) #{val.name}
>       if index < book.genre.length - 1
>         |,
> ```

## 어떻게 보일까? (What does it look like?)

애플리케이션을 실행시키고, 브라우저에서 `http://localhost:3000/`를 열자. *All books* 링크를 선택하고, 책 중 하나를 선택하자. 만약 모든 게 올바르게 갖춰졌다면, 사이트는 다음의 스크린샷처럼 보일 것이다.

![book detail page screenshot](/post-img/mdn-learn-web-server-3-7-10-book-detail-page/locallibary_express_book_detail.png)
