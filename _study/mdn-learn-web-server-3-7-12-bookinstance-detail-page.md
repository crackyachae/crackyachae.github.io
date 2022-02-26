---
layout  : article
title   : 책 인스턴스 상세 페이지와 도전 (BookInstance detail page and challenge)
summary : 
date    : 2022-02-26 20:21:56 +0900
updated : 2022-02-26 20:42:47 +0900
tag     : draft
toc     : true
public  : true
parent  : [[mdn-learn-web-server-3-7-express-tutorial-5]]
latex   : false
---
* TOC
{:toc}

> 이 글은 MDN Learn web development의 [Express web framework (Node.js/JavaScript)](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs) 중 [BookInstance detail page and challenge](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/Displaying_data/BookInstance_detail_page_and_challenge)의 내용을 번역 및 정리한 글입니다.
>
> * 제가 필요한 부분 위주로 확인하면서 정리하고 있어 글에 덜 작성된 부분이 있을 수 있습니다.
> * 글 작성 후 원문의 내용이 수정되거나 내용을 이해하기 위한 개인적인 설명이나 해석이 있을 수 있습니다. 되도록 원문을 참고해주시길 바랍니다.
> * 잘못된 부분이 있다면 댓글이나 그 외 편하신 방법으로 알려주시면 감사하겠습니다.

## 책 인스턴스 상세 페이지 (BookInstance detail page)

`BookInstance` 상세 페이지는 (자동으로 생성된) `_id` 필드 값으로 식별되는, 각 `BookInstance`에 대한 정보를 표시한다. 이는 레코드의 다른 정보와 함께 `Book` 이름 (*책 상세 페이지*의 링크로)를 포함할 것이다.

### 컨트롤러 (Controller)

**/controllers/bookinstanceController.js**을 연다. 내보내진 `bookinstance_detail()` 컨트롤러 메소드를 찾아서 다음의 코드로 대체한다.

```js
// Display detail page for a specific BookInstance.
exports.bookinstance_detail = function(req, res, next) {

    BookInstance.findById(req.params.id)
    .populate('book')
    .exec(function (err, bookinstance) {
      if (err) { return next(err); }
      if (bookinstance==null) { // No results.
          var err = new Error('Book copy not found');
          err.status = 404;
          return next(err);
        }
      // Successful, so render.
      res.render('bookinstance_detail', { title: 'Copy: '+bookinstance.book.title, bookinstance:  bookinstance});
    })

};
```

이 메소드는 (라우트를 사용해) URL에서 추출한 특정 책 인스턴스의 ID와 함께 `BookInstance.findById()`를 호출하고, 요청 매개변수를 통해 컨트롤러 안에 접근한다: `req.params.id`. 그다음 `populate()`를 호출해 관련 `Book`의 세부 정보를 얻는다.

### 뷰 (View)

**/views/bookinstance_detail.pug**를 만들어 아래의 내용을 복사해 넣자:

```pug
extends layout

block content

  h1 ID: #{bookinstance._id}

  p #[strong Title:]
    a(href=bookinstance.book.url) #{bookinstance.book.title}
  p #[strong Imprint:] #{bookinstance.imprint}

  p #[strong Status:]
    if bookinstance.status=='Available'
      span.text-success #{bookinstance.status}
    else if bookinstance.status=='Maintenance'
      span.text-danger #{bookinstance.status}
    else
      span.text-warning #{bookinstance.status}

  if bookinstance.status!='Available'
    p #[strong Due back:] #{bookinstance.due_back}
```

이 템플릿의 거의 모든 것은 이전 섹션에서 다뤘었다.

### 어떻게 보일까? (What does it look like?)

애플리케이션을 실행시키고, 브라우저에서 `http://localhost:3000/`를 열자. *All book-instances* 링크를 선택하고, 책 인스턴스 중 하나를 선택하자. 만약 모든 게 올바르게 갖춰졌다면, 사이트는 다음의 스크린샷처럼 보일 것이다.

![book instance detail page screenshot](../post-img/mdn-learn-web-server-3-7-12-bookinstance-detail-page/locallibary_express_bookinstance_detail.png)

## 도전 (Challenge)

지금 사이트에 표시된 대부분의 *날짜*는 기본 자바스크립트 형식을 사용한다 (e.g. Tue Oct 06 2020 15:49:58 GMT+1100 (AUS Eastern Daylight Time)). 이 글에서의 도전은 `Author`의 생몰 주기 정보(사망/탄생의 날짜)와 *책 인스턴스 상세*페이지를 표시하는 날짜의 모습을 다음의 형식을 사용해 개선하는 것이다: Oct 6th, 2016.

> Note: *책 인스턴스 목록* 페이지에서 사용한 것과 같은 방식(`Author` 모델에 생몰 주기를 위한 가상 속성을 추가하고 [luxon](https://www.npmjs.com/package/luxon)을 사용해 날짜 문자열의 형식을 지정하는 것)을 사용할 수 있다.

이 도전을 완료하려면 반드시:

1. *책 인스턴스 상세* 페이지에서 `due_back` 변수를 `due_back_formatted`로 교체한다.
1. `Author` 모델에 생몰 주기 가상 속성이 추가되도록 `Author` 모델을 갱신한다. 생몰 주기는 다음과 같이 보여야 하고: *태어_난_날짜 - 사망_한_날짜*, 두 값 모두 `BookInstance.due_back_formatted`와 같은 날짜 형식이어야 한다.
1. 현재 명시적으로 `date_of_birth`와 `date_of_death`를 사용하고 있는 모든 뷰에서 `Author.lifespan`을 사용한다.
