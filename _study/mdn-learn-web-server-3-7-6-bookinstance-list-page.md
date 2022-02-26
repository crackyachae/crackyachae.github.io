---
layout  : article
title   : 책 인스턴스 목록 페이지 (BookInstance list page)
summary : 
date    : 2022-02-17 15:12:45 +0900
updated : 2022-02-17 16:57:28 +0900
tag     : 
toc     : true
public  : true
parent  : [[mdn-learn-web-server-3-7-express-tutorial-5]]
latex   : false
---
* TOC
{:toc}

> 이 글은 MDN Learn web development의 [Express web framework (Node.js/JavaScript)](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs) 중 [BookInstance list page](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/Displaying_data/BookInstance_list_page)의 내용을 번역 및 정리한 글입니다.
>
> * 제가 필요한 부분 위주로 확인하면서 정리하고 있어 글에 덜 작성된 부분이 있을 수 있습니다.
> * 글 작성 후 원문의 내용이 수정되거나 내용을 이해하기 위한 개인적인 설명이나 해석이 있을 수 있습니다. 되도록 원문을 참고해주시길 바랍니다.
> * 잘못된 부분이 있다면 댓글이나 그 외 편하신 방법으로 알려주시면 감사하겠습니다.

다음으로 도서관 안에 있는 모든 책 사본(책 인스턴스)의 목록을 구현할 것이다. 이 페이지는 책의 상태, 출판사(imprint), 각 복사본의 고유한 id 등을 포함한 `BookInstance` 모델의 다른 정보와 함께 각 `BookInstance`에 연관된 `Book`의 제목을 (자신의 상세 페이지로 연결됨) 포함해야 한다. `BookInstance`의 상세 페이지에는 고유한 id 텍스트가 연결되어야 한다.

## 컨트롤러 (Controller)

`BookInstance` 목록 컨트롤러 함수는 모든 책 인스턴스의 목록을 얻고, 연관된 책 정보를 채운 뒤, 렌더링을 위해 그 목록을 템플릿에 전달해야 한다.

`/controllers/bookinstanceController.js`를 열자. 내보내진 `bookinstance_list()` 컨트롤러 메소드를 찾아서 다음의 코드로 대체하자.

```js
// Display list of all BookInstances.
exports.bookinstance_list = function(req, res, next) {

  BookInstance.find()
    .populate('book')
    .exec(function (err, list_bookinstances) {
      if (err) { return next(err); }
      // Successful, so render
      res.render('bookinstance_list', { title: 'Book Instance List', bookinstance_list: list_bookinstances });
    });

};
```

* 이 메소드는 모델의 `find()` 함수를 사용해 모든 `BookInstance` 객체를 반환한다.
* 그다음으로 데이지 체인으로 `book` 필드로 `populate`를 호출한다.
    * 이는 각 `BookInstance`마다 저장된 책 id를 전체 `Book` 문서로 교체할 것이다.

## 뷰 (View)

**/views/bookinstance_list.pug**를 생성해 아래의 텍스트를 복사해 넣자.

```pug
extends layout

block content
  h1= title

  ul
    each val in bookinstance_list
      li
        a(href=val.url) #{val.book.title} : #{val.imprint} -
        if val.status=='Available'
          span.text-success #{val.status}
        else if val.status=='Maintenance'
          span.text-danger #{val.status}
        else
          span.text-warning #{val.status}
        if val.status!='Available'
          span  (Due: #{val.due_back} )

    else
      li There are no book copies in this library.
```

이 뷰는 다른 모든 뷰와 매우 유사하다. 레이아웃을 확장해 사용하고, *content* 블록을 교체하고, 컨트롤러에서 전달받은 `title`을 표시하고, `bookinstance_list`의 모든 책 사본을 순회한다. 각 사본에 대해 사본의 상태(컬러 코딩된)와, 책을 빌리는 게 불가능한 경우에는 예상 반납일을 표시한다. 새로운 기능이 하나 도입된다 - 클래스를 할당하기 위해 태그 다음에 점 표기법을 사용할 수 있다. 즉 `span.text.-success`는 `<span class="text-success">`로 컴파일될 것이다 (또한 Pug에 `span(class="text-success")`라고 작성될 수도 있다).

## 어떻게 보일까? (What does it look like?)

애플리케이션을 실행시키고, 브라우저에서 `http://localhost:3000/`를 연 다음, *All book-instances* 링크를 선택한다. 만약 모든 게 올바르게 갖춰졌다면, 사이트는 다음의 스크린샷처럼 보일 것이다.

![book instance list page screenshot](../post-img/mdn-learn-web-server-3-7-6-bookinstance-list-page/locallibary_express_bookinstance_list.png)
