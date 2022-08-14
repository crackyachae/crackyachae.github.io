---
layout  : article
title   : 지역 도서관 기본 템플릿 (LocalLibrary base template)
summary : 
date    : 2022-01-22 16:20:43 +0900
updated : 2022-01-22 21:07:01 +0900
tag     : draft
toc     : true
public  : true
parent  : [[/js-library/express/mdn-learn-web-server-3/7-express-tutorial-5]]
latex   : false
---
* TOC
{:toc}

> 이 글은 MDN Learn web development의 [Express web framework (Node.js/JavaScript)](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs) 중 [LocalLibrary base template](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/Displaying_data/LocalLibrary_base_template)의 내용을 번역 및 정리한 글입니다.
>
> * 제가 필요한 부분 위주로 확인하면서 정리하고 있어 글에 덜 작성된 부분이 있을 수 있습니다.
> * 글 작성 후 원문의 내용이 수정되거나 내용을 이해하기 위한 개인적인 설명이나 해석이 있을 수 있습니다. 되도록 원문을 참고해주시길 바랍니다.
> * 잘못된 부분이 있다면 댓글이나 그 외 편하신 방법으로 알려주시면 감사하겠습니다.

이제 Pug를 사용해 템플릿을 확장하는 방법을 이해했으니, 프로젝트를 위한 기본 템플릿을 만들어보자. 이 템플릿은 튜토리얼 글을 지나면서 만들려는 페이지(e.g. 책, 장르, 저자 등을 표시하고 생성할)에 대한 링크가 있는 사이드바와 개별 페이지에서 재정의할 메인 콘텐츠 영역을 가질 것이다.

**/views/layout.pug**를 열어 내용을 아래의 코드로 바꾸자.

```pug
doctype html
html(lang='en')
  head
    title= title
    meta(charset='utf-8')
    meta(name='viewport', content='width=device-width, initial-scale=1')
    link(rel="stylesheet", href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css", integrity="sha384-JcKb8q3iqJ61gNV9KGb8thSsNjpSL0n8PARn9HuZOnIxN0hoP+VmmDGMN5t9UJ0Z", crossorigin="anonymous")
    script(src="https://code.jquery.com/jquery-3.5.1.slim.min.js", integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj", crossorigin="anonymous")
    script(src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js", integrity="sha384-B4gt1jrGC7Jh4AgTPSdUtOBvfO8shuf57BaghqFfPlYxofvL8/KUEfYiJOMMV+rV", crossorigin="anonymous")
    link(rel='stylesheet', href='/stylesheets/style.css')
  body
    div(class='container-fluid')
      div(class='row')
        div(class='col-sm-2')
          block sidebar
            ul(class='sidebar-nav')
              li
                a(href='/catalog') Home
              li
                a(href='/catalog/books') All books
              li
                a(href='/catalog/authors') All authors
              li
                a(href='/catalog/genres') All genres
              li
                a(href='/catalog/bookinstances') All book-instances
              li
                hr
              li
                a(href='/catalog/author/create') Create new author
              li
                a(href='/catalog/genre/create') Create new genre
              li
                a(href='/catalog/book/create') Create new book
              li
                a(href='/catalog/bookinstance/create') Create new book instance (copy)

        div(class='col-sm-10')
          block content
```

이 템플릿은 HTML 페이지의 레이아웃과 표현을 개선하기 위해 자바스크립트와 [부트스트랩(Bootstrap)](https://getbootstrap.com)의 CSS를 사용(하고 포함)한다. 부트스트랩 혹은 다른 클라이언트 측 웹 프레임워크를 사용하면 다른 브라우저 사이즈에 맞춰 잘 확장될 수 있는 매력적인 페이지를 빠르게 만들 수 있으며, 세부사항을 고려할(get into) 필요 없이 페이지 표현을 잘 처리할 수 있다 - 여기서는 서버 측 코드에만 집중하길 원한다!

위의 [템플릿 입문서](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/Displaying_data#template_primer)를 읽었다면 레이아웃은 제법 명확할 것이다. 각 페이지의 콘텐츠가 위치할 자리 표시자로 `block content`를 사용한다는 것을 확인하자.

또한 베이스 템플릿은 약간의 추가적인 스타일링을 제공하는 지역 css 파일(**style.css**)을 참조한다. **/public/stylesheets/style.css**을 열고 그 내용을 다음의 CSS 코드로 바꾸자:

```css
.sidebar-nav {
    margin-top: 20px;
    padding: 0;
    list-style: none;
}
```

이제 사이드바가 있는 페이지를 만들기 위한 기본 템플릿이 존재한다. 다음 섹션에서 이를 개별 페이지를 정의하는 데 사용할 것이다.
