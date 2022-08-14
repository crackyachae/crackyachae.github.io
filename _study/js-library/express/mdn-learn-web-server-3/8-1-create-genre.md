---
layout  : article
title   : 장르 생성 양식 (Create genre form)
summary : 
date    : 2022-03-28 22:28:59 +0900
updated : 2022-03-29 00:28:29 +0900
tag     : draft
toc     : true
public  : true
parent  : [[/js-library/express/mdn-learn-web-server-3/8-express-tutorial-6]]
latex   : false
---
* TOC
{:toc}

> 이 글은 MDN Learn web development의 [Express web framework (Node.js/JavaScript)](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs) 중 [Create genre form](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/forms/Create_genre_form)의 내용을 번역 및 정리한 글입니다.
>
> * 제가 필요한 부분 위주로 확인하면서 정리하고 있어 글에 덜 작성된 부분이 있을 수 있습니다.
> * 글 작성 후 원문의 내용이 수정되거나 내용을 이해하기 위한 개인적인 설명이나 해석이 있을 수 있습니다. 되도록 원문을 참고해주시길 바랍니다.
> * 잘못된 부분이 있다면 댓글이나 그 외 편하신 방법으로 알려주시면 감사하겠습니다.

이 하위 글은 `Genre` 객체를 생성하기 위한 페이지를 정의하는 방법을 보여준다 (`Genre`는 한 개의 필드만을 갖고, 그것은 `name`이며 다른 의존성을 갖지 않기 때문에 시작하기 좋다). 다른 많은 페이지와 같이 라우트, 컨트롤러, 뷰를 설정해야 한다.

## 유효성 검사와 수정 메소드 가져오기 (Import validation and sanitization methods)

express-validator를 컨트롤러에서 사용하기 위해 **'express-validator'** 모듈에서 사용하고 싶은 함수를 포함해야 한다.

**/controllers/genreController.js**를 열고, 다음의 코드를 파일의 가장 위에 추가한다:

```js
const { body,validationResult } = require("express-validator");
```

> Note: 이 구문은 아래의 post 라우트 섹션에서 볼 수 있는 것처럼 `body`와 `validationResult`를 연관된 미들웨어 함수처럼 사용할 수 있게 해준다. 이것은 다음과 동일하다:
>
>   ```js
>   validator = require("express-validator");
>   body = validator.body();
>   validationResult = validator.validationResult();
>   ```

## 컨트롤러 - get 라우트 (Controller—get route)

내보내진 `genre_create_get()` 컨트롤러 메소드를 찾아 다음의 코드로 대체한다. 이 코드는 제목 변수를 전달해 **genre_form.pug** 뷰를 렌더링한다.

```js
// GET에서 양식에서 만들어진 장르를 표시
exports.genre_create_get = function(req, res, next) {
  res.render('genre_form', { title: 'Create Genre' });
};
```

## 컨트롤러 - post 라우트 (Controller—post route)

내보내진 `genre_create_post()` 컨트롤러 메소드를 찾아 다음의 코드로 대체한다.

```js
// POST에서 생성된 장르를 처리한다.
exports.genre_create_post =  [

  // 이름 필드의 유효성을 검사하고 수정한다.
  body('name', 'Genre name required').trim().isLength({ min: 1 }).escape(),

  // 유효성 검사 및 수정 이후의 요청을 처리한다.
  (req, res, next) => {

    // 요청에서 유효성 검사 오류를 가져온다.
    const errors = validationResult(req);

    // 이스케이프 되고 공백을 제거한 데이터로 장르 객체를 만든다.
    var genre = new Genre(
      { name: req.body.name }
    );

    if (!errors.isEmpty()) {
      // 에러가 존재한다. 수정된 값과 에러 메시지와 함께 양식을 다시 렌더링한다.
      res.render('genre_form', { title: 'Create Genre', genre: genre, errors: errors.array()});
      return;
    }
    else {
      // 양식 데이터가 유효하면
      // 같은 이름의 장르가 이미 존재하는지 확인한다.
      Genre.findOne({ 'name': req.body.name })
        .exec( function(err, found_genre) {
           if (err) { return next(err); }

           if (found_genre) {
             // 장르가 존재하면, 상세 페이지로 다시 이동한다.
             res.redirect(found_genre.url);
           }
           else {

             genre.save(function (err) {
               if (err) { return next(err); }
               // 장르가 저장된다. 장르 상세 페이지로 다시 이동한다.
               res.redirect(genre.url);
             });

           }

         });
    }
  }
];
```

첫 번째로 살펴봐야 할 것은 컨트롤러가 단일 미들웨어 함수(`(req, res, next)` 인자와 함께) 대신 미들웨어 함수의 배열을 지정했다는 것이다. 해당 배열은 라우터 함수로 전달되고 각 메소드는 순서대로 호출된다.

> Note: 유효성 검사는 미들웨어 함수이므로 이 접근 방식이 필요하다.

배열의 첫 번째 메소드는 필드의 유효성을 검사하고 수정하는 본문(body) 유효성 검사(`body()`)를 정의한다. 이 메소드는 `trim()`을 사용해 앞선/뒤따르는 공백을 제거하고, name 필드가 비어있지 않는지 확인한 뒤, 그다음 `escape()`를 사용해 위험한 HTML 문자를 제거한다.

```js
// 유효성 검사 및 수정 이후의 요청을 처리한다.
body('name', 'Genre name required').trim().isLength({ min: 1 }).escape(),
```

유효성 검사를 지정한 다음 유효성 검사 오류를 가져(extract)올 미들웨어 함수를 생성한다. `isEmpty()`를 사용해 유효성 검사 결과에 오류가 있는지 확인한다. 오류가 있다면 수정한 장르 객체와 오류 메시지 배열(`errors.array()`)을 전달해 양식을 다시 렌더링한다.

```js
// 유효성 검사 및 수정 이후의 요청을 처리한다.
(req, res, next) => {

  // 유효성 검사 오류를 요청에서 가져온다.
  const errors = validationResult(req);

  // 이스케이프 되고 공백을 제거한 데이터로 장르 객체를 만든다.
  var genre = new Genre(
    { name: req.body.name }
  );

  if (!errors.isEmpty()) {
    // 에러가 존재한다. 수정된 값과 에러 메시지와 함께 양식을 다시 렌더링한다.
    res.render('genre_form', { title: 'Create Genre', genre: genre, errors: errors.array()});
  return;
  }
  else {
    // 양식 데이터가 유효하다.
    ... <save the result/> ...
  }
};
```

장르 name 데이터가 유효하면, 같은 이름을 갖는 `Genre`가 이미 존재하는지 확인한다 (중복으로 생성하긴 원하지 않아서). 만약 그렇다면, 존재하는 장르의 상세 페이지로 이동(redirect)한다. 만약 존재하지 않으면, 새로운 `Genre`를 저장하고 해당 장르의 상세 페이지로 이동한다.

```js
// 같은 이름의 장르가 이미 존재하는지 확인한다.
Genre.findOne({ 'name': req.body.name })
  .exec( function(err, found_genre) {
  if (err) { return next(err); }
    if (found_genre) {
      // 장르가 존재하면, 상세 페이지로 다시 이동한다.
      res.redirect(found_genre.url);
      }
    else {
      genre.save(function (err) {
        if (err) { return next(err); }
          // 장르가 저장된다. 장르 상세 페이지로 다시 이동한다.
          res.redirect(genre.url);
        });
    }
});
```

이런 패턴은 모든 post 컨트롤러에서 사용된다: 유효성 검사를 실행한 뒤 (sanitizer로), 그다음 오류가 있는지 확인하고 양식을 오류 정보와 함께 다시 렌더링하거나 데이터를 저장한다.

## 뷰 (View)

새로운 `Genre`를 생성할 때 (그리고 이후에 `Genre`를 수정할 때도) `GET`, `POST` 컨트롤러/라우트에서 같은 뷰가 렌더링 된다. `GET`의 경우 양식은 비어있고, 제목 변수만 전달한다. `POST`의 경우에는 사용자가 이전에 입력한 유효하지 않은 데이터를 갖고 - `genre` 변수 안에는 입력된 데이터의 수정된 버전을 다시 전달하고, `error` 변수 안에는 오류 메시지의 배열을 다시 전달한다.

```js
res.render('genre_form', { title: 'Create Genre'});
res.render('genre_form', { title: 'Create Genre', genre: genre, errors: errors.array()});
```

**/views/genre_form.pug**를 생성해 아래의 코드를 복사해 넣는다.

```pug
extends layout

block content
  h1 #{title}

  form(method='POST' action='')
    div.form-group
      label(for='name') Genre:
      input#name.form-control(type='text', placeholder='Fantasy, Poetry etc.' name='name' value=(undefined===genre ? '' : genre.name))
    button.btn.btn-primary(type='submit') Submit

  if errors
   ul
    for error in errors
     li!= error.msg
```

이 템플릿의 많은 부분이 이전 튜토리얼로 인해 익숙할 것이다. 먼저, **layout.pug** 기본 템플릿을 확장해서 **'content'**라고 하는 `block`을 재지정한다. 그다음 컨트롤러에서 (`render()` 메소드를 통해) 전달한 `title`과 함께 헤딩을 표시(have)한다.

다음으로, `POST` `method`를 사용해 데이터를 서버로 보내는 HTML 양식을 위한 pug 코드가 있고, `action`이 빈 문자열이므로, 데이터를 현재 페이지와 같은 URL로 보낼 것이다.

양식은 "name"이라고 하는 "text" 타입의 필요한 단일 필드를 정의한다. 필드의 기본값은 `genre` 변수가 정의되었는가에 따라서 달라진다. `GET` 라우트에서 호출된다면 새로운 양식이므로 비어있을 것이다. `POST` 라우트에서 호출된다면 사용자가 처음(originally) 입력한 (유효하지 않은) 값이 포함된다.

이 페이지의 마지막 부분은 오류 코드이다. 이 부분은 오류 변수가 정의됐다면 오류 목록을 출력한다 (즉, 이 부분은 템플릿이 `GET` 메소드에서 렌더링 됐다면 나타나지 않는다).

> Note: 이것은 오류를 렌더링하는 한 가지 방법일 뿐이다. 오류 변수에서 영향을 받은 필드의 이름도 얻을 수 있고, 이를 사용해 오류 메시지가 렌더링 되는 위치나 사용자 정의 CSS 적용 여부 등을 조작할 수도 있다.

## 어떻게 보일까? (What does it look like?)

애플리케이션을 실행시키고, 브라우저에서 `http://localhost:3000/`를 연 다음, 새로운 장르 생성하기 링크를 선택한다. 만약 모든 게 올바르게 갖춰졌다면, 사이트는 다음의 스크린샷처럼 보일 것이다. 값을 입력한 다음에는 이 값이 저장되고 해당 장르의 상세 페이지로 이동될 것이다.

![local library express genre create empty](/post-img/mdn-learn-web-server-3-8-1-create-genre/locallibary_express_genre_create_empty.png)

서버 측에서 검사할 수 있는 유일한 오류는 장르 필드가 비어있지 않아야 한다는 것이다. 아래의 스크린샷은 장르를 입력(supply)하지 않았을 때 오류 목록이 어떻게 보일지 나타낸다 (빨간색으로 강조되어있다).

![local library express genre create error](/post-img/mdn-learn-web-server-3-8-1-create-genre/locallibary_express_genre_create_error.png)

> Note: 현재 유효성 검사는 `trim()`을 사용해 공백을 장르 이름으로 받아들일 수 없도록 한다. 또한 `required='true'` 값을 양식의 필드 정의에 추가해 클라이언트 측에서 필드가 비어있지 않는다는 것을 검사할 수도 있다.
>
>   ```js
>   input#name.form-control(type='text', placeholder='Fantasy, Poetry etc.' name='name' value=(undefined===genre ? '' : genre.name), required='true' )
>   ```
