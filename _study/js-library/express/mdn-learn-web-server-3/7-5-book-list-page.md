---
layout  : article
title   : 책 목록 페이지 (Book list page)
summary : 
date    : 2022-02-17 12:02:16 +0900
updated : 2022-02-17 15:13:47 +0900
tag     : draft
toc     : true
public  : true
parent  : [[/js-library/express/mdn-learn-web-server-3/7-express-tutorial-5]]
latex   : false
---
* TOC
{:toc}

> 이 글은 MDN Learn web development의 [Express web framework (Node.js/JavaScript)](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs) 중 [Book list page](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/Displaying_data/Book_list_page)의 내용을 번역 및 정리한 글입니다.
>
> * 제가 필요한 부분 위주로 확인하면서 정리하고 있어 글에 덜 작성된 부분이 있을 수 있습니다.
> * 글 작성 후 원문의 내용이 수정되거나 내용을 이해하기 위한 개인적인 설명이나 해석이 있을 수 있습니다. 되도록 원문을 참고해주시길 바랍니다.
> * 잘못된 부분이 있다면 댓글이나 그 외 편하신 방법으로 알려주시면 감사하겠습니다.

다음으로 책 목록 페이지를 구현할 것이다. 이 페이지에는 데이터베이스의 모든 책이 책 목록과 저자와 함께 표시되어야 하며, 각 책의 제목은 책의 상세 페이지로 연결된 하이퍼링크여야 한다.

## 컨트롤러 (Controller)

책 목록 컨트롤러 함수는 모든 `Book` 객체의 목록을 데이터베이스에서 얻어와서, 이들을 정렬하고, 그다음에 이들을 렌더링하기 위해 템플릿으로 전달해야 한다.

**/controllers/bookController.js**를 열자. 내보내진 `book_list()` 컨트롤러 메소드를 찾아서 다음의 코드로 대체하자.

```js
// Display list of all Books.
exports.book_list = function(req, res, next) {

  Book.find({}, 'title author')
    .sort({title : 1})
    .populate('author')
    .exec(function (err, list_books) {
      if (err) { return next(err); }
      //Successful, so render
      res.render('book_list', { title: 'Book List', book_list: list_books });
    });

};
```

* 이 메소드는 모델의 `find()` 함수를 사용해 모든 `Book` 객체를 반환하고,
* 다른 필드(`_id`와 가상(virtual) 필드도 함께 반환된다)는 필요하지 않기 때문에 `title`과 `author` 만을 반환하도록 선택한 다음,
* `sort()` 메소드를 사용해서 제목의 알파벳순으로 결과를 정렬한다.
* 또한 여기에서는 `author` 필드를 지정하여 `Book`에서 `populate()`를 호출한다
    * 이는 저장된 책 저자의 id를 전체 저자 상세 정보로 교체할 것이다.

## 뷰 (View)

**/views/book_list.pug**를 만들어 아래의 텍스트를 복사해 넣자.

```pug
extends layout

block content
  h1= title

  ul
    each book in book_list
      li
        a(href=book.url) #{book.title}
        |  (#{book.author.name})

    else
      li There are no books.
```

이 뷰는 **layout.pug** 기본 템플릿을 확장해서 **'content'**라는 `block`을 재설정한다. 이 뷰는 (`render()` 메소드를 통해) 컨트롤러에서 전달한 `title` `title`을 표시하고, `boo_list` 변수를 `each`-`in`-`else` 문법을 이용해 순회한다. 각 책의 제목과 책의 상세 페이지로 향하는 링크, 그 뒤에 저자 이름을 표시하고 있는 책 목록 항목이 생성된다. `book_list`에 아무 책도 존재하지 않으면 `else` 절이 실행되고, 'There are no books'라는 문장이 표시된다.

> Note: 각 책의 상세 레코드에 대한 링크를 제공하기 위해 `book.url`을 사용했다 (해당 라우트는 구현했지만, 페이지는 아직 구현하지 않았다). 이는 `Book` 모델의 가상 속성으로 모델 인스턴스의 `_id` 필드를 사용해 고유한 URL 경로를 생성한다.

역서 흥미로운 것은 각 책이 두 번째 줄에는 파이프를 사용해 두 줄에 걸쳐 정의되었다는 것이다. 이전 줄에서 저자의 이름이 이전 줄에 있으면 하이퍼링크의 일부가 될 수도 있어서 이런 방식이 필요하다.

## 어떻게 보일까? (What does it look like?)

애플리케이션을 실행시키고 (관련 명령에 관해서는 [Testing the routes](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/routes#testing_the_routes)를 참고하자) 브라우저에서 `http://localhost:3000/`를 열어보자. 그다음에 *All books* 링크를 선택한다. 만약 모든 게 올바르게 갖춰졌다면, 사이트는 다음의 스크린샷처럼 보일 것이다.

![book list page screenshot](/post-img/mdn-learn-web-server-3-7-5-book-list-page/new_book_list.png)
