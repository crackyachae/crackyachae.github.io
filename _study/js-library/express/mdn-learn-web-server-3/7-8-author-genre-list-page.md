---
layout  : article
title   : 저자 목록 페이지와 장르 목록 페이지 만들어보기 (Author list page and Genre list page challenge)
summary : 
date    : 2022-02-18 16:01:17 +0900
updated : 2022-02-26 15:51:56 +0900
tag     : draft
toc     : true
public  : true
parent  : [[/js-library/express/mdn-learn-web-server-3/7-express-tutorial-5]]
latex   : false
---
* TOC
{:toc}

> 이 글은 MDN Learn web development의 [Express web framework (Node.js/JavaScript)](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs) 중 [Author list page and Genre list page challenge](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/Displaying_data/Author_list_page)의 내용을 번역 및 정리한 글입니다.
>
> * 제가 필요한 부분 위주로 확인하면서 정리하고 있어 글에 덜 작성된 부분이 있을 수 있습니다.
> * 글 작성 후 원문의 내용이 수정되거나 내용을 이해하기 위한 개인적인 설명이나 해석이 있을 수 있습니다. 되도록 원문을 참고해주시길 바랍니다.
> * 잘못된 부분이 있다면 댓글이나 그 외 편하신 방법으로 알려주시면 감사하겠습니다.

다음으로 도서관 안에 있는 모든 책 사본(책 인스턴스)의 목록을 구현할 것이다. 이 페이지는 책의 상태, 출판사(imprint), 각 복사본의 고유한 id 등을 포함한 `BookInstance` 모델의 다른 정보와 함께 각 `BookInstance`에 연관된 `Book`의 제목을 (자신의 상세 페이지로 연결됨) 포함해야 한다. `BookInstance`의 상세 페이지에는 고유한 id 텍스트가 연결되어야 한다.

저자 목록 페이지에는 데이터베이스의 모든 저자의 목록이 표시되어야 하며, 각 저자명은 연관된 저자의 상세 페이지로 연결되어야 한다. 태어난 날과 사망한 날은 이름과 같은 줄 상에서 이름 다음에 표시해야 한다.

## 컨트롤러 (Controller)

저자 목록 컨트롤러 함수는 모든 `Author` 인스턴스의 목록을 얻은 다음, 렌더링을 위해 그 목록을 템플릿으로 전달해야 한다.

`/controllers/authorController.js`를 열자. 파일의 가장 위쪽 근처에서 내보내진 `author_list()` 컨트롤러 메소드를 찾아서 다음의 코드로 대체하자.

```js
// Display list of all Authors.
exports.author_list = function(req, res, next) {

  Author.find()
    .sort([['family_name', 'ascending']])
    .exec(function (err, list_authors) {
      if (err) { return next(err); }
      //Successful, so render
      res.render('author_list', { title: 'Author List', author_list: list_authors });
    });

};
```

* 이 메소드는 모델의 `find()`, `sort()`, `exec()` 함수를 사용해 알파벳 순의 `family_name`으로 정렬된 모든 `Author` 객체를 반환한다.
* `exec()` 메소드로 전달된 콜백은 발생한 오류(혹은 `null`)를 첫 번째 매개변수로, 혹은 성공 시 모든 저자의 목록을 매개변수로 호출된다. 오류가 있으면 콜백은 오류 값과 함께 다음 미들웨어 함수를 호출하고, 그렇지 않으면 (오류가 없으면), 페이지의 `title`과 저자의 목록(`author_list`)을 전달해 **author_list**(.pug) 템플릿을 렌더링한다.

## 뷰 (View)

**/views/author_list.pug**를 생성해 아래의 텍스트로 내용을 교체하자.

```pug
extends layout

block content
  h1= title

  ul
    each author in author_list
      li
        a(href=author.url) #{author.name}
        |  (#{author.date_of_birth} - #{author.date_of_death})

    else
      li There are no authors.
```

애플리케이션을 실행시키고 브라우저에서 `http://localhost:3000/`를 열어보자. 그다음에 *All authors* 링크를 선택한다. 만약 모든 게 올바르게 갖춰졌다면, 사이트는 다음의 스크린샷처럼 보일 것이다.

![book instance list page screenshot](/post-img/mdn-learn-web-server-3-7-8-author-genre-list-page/locallibary_express_author_list.png)

> Note: 저자의 *생몰연대(lifespan)*의 모습이 지저분하다! 이를 `BookInstance` 목록에서 사용한 방법과 [같은 방법](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/Displaying_data/Date_formatting_using_moment)으로 (생몰연대에 대한 가상 속성을 `Author` 모델에 추가하기) 개선할 수 있다.
>
> 그러나, 저자가 사망하지 않았거나 태어난/사망한 날이 누락될 수도 있고, 이 경우에는 누락된 날짜나 존재하지 않는 속성에 대한 참조를 무시해야 한다. 이를 처리하는 한 가지 방법은 속성이 정의되었냐에 따라 형식화된 날짜나 빈 문자열을 반환하는 것이다. 예를 들어:
> `return this.date_of_birth ? DateTime.fromJSDate(this.date_of_birth).toLocaleString(DateTime.DATE_MED) : '';`

## 장르 목록 페이지-도전! (Genre list page—challenge!)

이 섹션에서는 자신만의 장르 목록 페이지를 구현해야 한다. 이 페이지는 데이터베이스의 모든 장르의 목록이 표시되어야 하며, 각 장르는 연관된 상세 페이지로 연결되어야 한다. 예상 결과 페이지의 스크린샷은 아래와 같다.

![genre page screenshot](/post-img/mdn-learn-web-server-3-7-8-author-genre-list-page/locallibary_express_genre_list.png)

장르 목록 컨트롤러 함수는 모든 `Genre` 인스턴스의 목록을 가져와, 렌더링을 위해 이를 템플릿에 전달해야 한다.

1. **/controllers/genreController.js**의 `genre_list()`를 수정해야 한다.
1. 장르 컨트롤러 구현은 `author_list()` 컨트롤러와 거의 정확히 같다.
    * 이름의 오름차순으로 정렬하자.
1. 렌더링 되는 템플릿의 이름은 **genre_list.pug**이다.
1. 렌더링 되는 템플릿은 `title` ('장르 목록')과 `genre_list` (`Genre.find()` 콜백 함수에서 반환되는 장르 목록) 변수를 전달받아야 한다.
1. 뷰는 위의 스크린샷/요구사항과 일치해야 한다 (이 뷰는 장르는 날짜를 갖지 않는다는 것을 제외하고는 저자 목록 뷰와 매우 유사한 구조/형식을 가질 것이다).
