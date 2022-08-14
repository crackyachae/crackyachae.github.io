---
layout  : article
title   : 책 생성 양식 (Create Book form)
summary : 
date    : 2022-03-29 16:52:29 +0900
updated : 2022-03-29 21:40:39 +0900
tag     : draft
toc     : true
public  : true
parent  : [[/js-library/express/mdn-learn-web-server-3/8-express-tutorial-6]]
latex   : false
---
* TOC
{:toc}

> 이 글은 MDN Learn web development의 [Express web framework (Node.js/JavaScript)](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs) 중 [Create Book form](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/forms/Create_book_form)의 내용을 번역 및 정리한 글입니다.
>
> * 제가 필요한 부분 위주로 확인하면서 정리하고 있어 글에 덜 작성된 부분이 있을 수 있습니다.
> * 글 작성 후 원문의 내용이 수정되거나 내용을 이해하기 위한 개인적인 설명이나 해석이 있을 수 있습니다. 되도록 원문을 참고해주시길 바랍니다.
> * 잘못된 부분이 있다면 댓글이나 그 외 편하신 방법으로 알려주시면 감사하겠습니다.

## 유효성 검사와 수정 메소드 가져오기 (Import validation and sanitization methods)

**/controllers/genreController.js**를 열고, 다음의 코드를 파일의 가장 위에 추가한다:

```js
const { body,validationResult } = require("express-validator");
```

## 컨트롤러 - get 라우트 (Controller—get route)

내보내진 `book_create_get()` 컨트롤러 메소드를 찾아 다음의 코드로 대체한다.

```js
// GET에서 책 생성 양식을 표시한다.
exports.book_create_get = function(req, res, next) {

    // 책을 추가하는데 사용할 모든 저자와 장르를 얻어온다.
    async.parallel({
        authors: function(callback) {
            Author.find(callback);
        },
        genres: function(callback) {
            Genre.find(callback);
        },
    }, function(err, results) {
        if (err) { return next(err); }
        res.render('book_form', { title: 'Create Book', authors: results.authors, genres: results.genres });
    });

};
```

이 코드는 `Author`와 `Genre` 객체를 얻기 위해 ([Express Tutorial Part 5: 도서관 데이터 표시하기](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/Displaying_data)에서 설명한) async 모듈을 사용한다. 그다음 두 객체는 `authors`와 `genres`라는 변수로 (페이지 `title`과 함께) `book_form.pug` 뷰에 전달된다.

## 컨트롤러 - post 라우트 (Controller—post route)

내보내진 `book_create_post()` 컨트롤러 메소드를 찾아서 다음의 코드로 대체한다.

```js
// POST에서 책 생성을 다룬다.
exports.book_create_post = [
    // 장르를 배열로 바꾼다.
    (req, res, next) => {
        if(!(req.body.genre instanceof Array)){
            if(typeof req.body.genre ==='undefined')
            req.body.genre = [];
            else
            req.body.genre = new Array(req.body.genre);
        }
        next();
    },

    // 필드의 유효성 검사와 수정을 진행한다.
    body('title', 'Title must not be empty.').trim().isLength({ min: 1 }).escape(),
    body('author', 'Author must not be empty.').trim().isLength({ min: 1 }).escape(),
    body('summary', 'Summary must not be empty.').trim().isLength({ min: 1 }).escape(),
    body('isbn', 'ISBN must not be empty').trim().isLength({ min: 1 }).escape(),
    body('genre.*').escape(),

    // 유효성 검사와 수정 이후 요청을 처리한다.
    (req, res, next) => {

        // 요청에서 유효성 검사 오류를 가져온다.
        const errors = validationResult(req);

        // 이스케이프 되고 공백이 제거된 데이터로 책 객체를 생성한다.
        var book = new Book(
          { title: req.body.title,
            author: req.body.author,
            summary: req.body.summary,
            isbn: req.body.isbn,
            genre: req.body.genre
           });

        if (!errors.isEmpty()) {
            // 에러가 존재한다. 수정된 값과 에러 메시지와 함께 양식을 다시 렌더링한다.

            // 양식에서 모든 저자와 데이터를 얻어온다.
            async.parallel({
                authors: function(callback) {
                    Author.find(callback);
                },
                genres: function(callback) {
                    Genre.find(callback);
                },
            }, function(err, results) {
                if (err) { return next(err); }

                // 선택된 장르에 체크 표시를 한다.
                for (let i = 0; i < results.genres.length; i++) {
                    if (book.genre.indexOf(results.genres[i]._id) > -1) {
                        results.genres[i].checked='true';
                    }
                }
                res.render('book_form', { title: 'Create Book',authors:results.authors, genres:results.genres, book: book, errors: errors.array() });
            });
            return;
        }
        else {
            // 양식 데이터가 유효하다. 책을 저장한다.
            book.save(function (err) {
                if (err) { return next(err); }
                   // 성공하면 - 새로운 책 레코드로 이동한다.
                   res.redirect(book.url);
                });
        }
    }
];
```

이 코드의 구조와 동작은 `Genre`나 `Author` 객체를 만들 때와 대부분 정확히 같다. 먼저 데이터의 유효성을 검증하고 수정한다. 만약 데이터가 유효하지 않으면 사용자가 기존에 입력한 데이터와 오류 메시지 목록과 함께 양식을 다시 표시한다. 데이터가 유효하면, 새로운 `Book` 레코드를 저장하고 해당 책 상세 페이지로 이동한다.

다른 양식 처리 코드와 주된 차이점은 장르 정보를 수정하는 방식이다. 양식은 `Genre` 항목의 배열을 반환한다 (반면에 다른 필드는 문자열을 반환한다). 해당 정보의 유효성을 검증하기 위해서는 우선 요청을 배열로 바꿔야 한다 (다음 단계를 위해 필요하다).

```js
// 장르를 배열로 변환한다.
(req, res, next) => {
    if(!(req.body.genre instanceof Array)){
        if(typeof req.body.genre === 'undefined')
        req.body.genre = [];
        else
        req.body.genre = new Array(req.body.genre);
    }
    next();
},
```

그다음 sanitizer 안에서 와일드카드(`*`)를 사용해 각 장르 배열의 항목의 유효성을 검증한다. 아래의 코드는 그 방법을 보여준다 - 이것은 "`genre` 키 아래의 모든 항목을 수정"한다라고 이해(translate)할 수도 있다.

```js
body('genre.*').escape(),
```

다른 양식 처리 코드와의 마지막 차이점은 존재하는 모든 장르와 저자를 양식에 전달해야 한다는 점이다. 사용자가 체크한 장르를 표시하려면 모든 장르를 순회하면서 `checked='true'` 매개변수를 post 데이터에 추가한다 (아래 코드 조각에 재생성된 것처럼).

```js
// 선택된 장르에 체크 표시.
for (let i = 0; i < results.genres.length; i++) {
    if (book.genre.indexOf(results.genres[i]._id) > -1) {
        // Current genre is selected. Set "checked" flag.
        results.genres[i].checked = 'true';
    }
}
```

## 뷰 (View)

**/views/book_form.pug**를 생성하고 아래의 코드를 복사해 넣자.

```js
extends layout

block content
  h1= title

  form(method='POST' action='')
    div.form-group
      label(for='title') Title:
      input#title.form-control(type='text', placeholder='Name of book' name='title' required='true' value=(undefined===book ? '' : book.title) )
    div.form-group
      label(for='author') Author:
      select#author.form-control(type='select', placeholder='Select author' name='author' required='true' )
        - authors.sort(function(a, b) {let textA = a.family_name.toUpperCase(); let textB = b.family_name.toUpperCase(); return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;});
        for author in authors
          if book
            option(value=author._id selected=(author._id.toString()===book.author._id.toString() ? 'selected' : false) ) #{author.name}
          else
            option(value=author._id) #{author.name}
    div.form-group
      label(for='summary') Summary:
      textarea#summary.form-control(type='textarea', placeholder='Summary' name='summary' required='true') #{undefined===book ? '' : book.summary}
    div.form-group
      label(for='isbn') ISBN:
      input#isbn.form-control(type='text', placeholder='ISBN13' name='isbn' value=(undefined===book ? '' : book.isbn) required='true')
    div.form-group
      label Genre:
      div
        for genre in genres
          div(style='display: inline; padding-right:10px;')
            input.checkbox-input(type='checkbox', name='genre', id=genre._id, value=genre._id, checked=genre.checked )
            label(for=genre._id) #{genre.name}
    button.btn.btn-primary(type='submit') Submit

  if errors
    ul
      for error in errors
        li!= error.msg
```

뷰 구조와 동작은 **genre_form.pug** 템플릿과 대부분 거의 동일하다.

주된 차이점은 선택(selection) 유형의 필드를 구현한 방식이다: `Author`와 `Genre`

* 장르 모음은 체크 박스로 표시되고, 컨트롤러에서 설정한 `checked` 값을 사용해 체크 박스를 선택해야 하는지 여부를 결정한다.
* 저자 모음은 알파벳 순서로 정렬된 단일 선택 드롭다운 목록으로 표시된다. 사용자가 이전에 책 저자를 선택했으면 (i.e. 첫 제출 이후 유효하지 않은 필드 값을 고정하거나, 책 상세 정보를 갱신할 때) 저자는 양식이 표시될 때 다시 선택된다. 여기서는 현재 저자 옵션의 아이디를 이전에 사용자가 입력한 것(`book` 변수를 통해 전달)과 비교하여 선택할 저자를 결정한다. 이 내용은 위에 강조되어있다!

> Note: 만약 제출된 양식에 오류가 있으면, 그다음에 양식이 다시 렌더링 됐을 경우, 새로운 책 저자의 id와 존재하는 책의 저자 아이디는 `Schema.Types.ObjectId` 유형이다. 그러므로 이들을 비교하기 위해서는 먼저 문자열로 바꿔야 한다.

## 어떻게 보일까? (What does it look like?)

애플리케이션을 실행시키고, 브라우저에서 `http://localhost:3000/`를 연 다음, 새로운 책 생성하기 링크를 선택한다. 만약 모든 게 올바르게 갖춰졌다면, 사이트는 다음의 스크린샷처럼 보일 것이다. 유효한 책을 제출한 후에는 그 값이 저장되고, 책 상세 페이지로 이동할 것이다.

![local library express book create empty](/post-img/mdn-learn-web-server-3-8-3-create-book/locallibary_express_book_create_empty.png)
