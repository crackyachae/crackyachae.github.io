---
layout  : article
title   : 28. 라이브러리와 프레임워크
summary : 
date    : 2020-05-07 22:13:42 +0900
updated : 2020-05-07 22:34:55 +0900
tag     : draft
toc     : true
public  : true
parent  : [[/javascript/opent-web2-js]]
latex   : false
---
* TOC
{:toc}

> 이 글은 생활코딩의 [라이브러리와 프레임워크](https://opentutorials.org/course/3085/18886) 강의내용을 복습하기 위해 강의 자료를 기반으로 작성한 글입니다.
>
> * 제가 필요한 부분 위주로 확인하면서 정리하고 있어 글에 덜 작성된 부분이 있을 수 있습니다.
> * 글 작성 후 원 강의의 내용이 수정되거나 내용을 이해하기 위한 개인적인 설명이나 해석이 있을 수 있습니다. 되도록 원 강의를 참고해주시길 바랍니다.
> * 잘못된 부분이 있다면 댓글이나 그 외 편하신 방법으로 알려주시면 감사하겠습니다.

## 28. 라이브러리와 프레임워크

소프트웨어를 만들 때 다른 사람들이 미리 만들어 놓은 소프트웨어의 도움을 받는 방법.

* 라이브러리(Library): 사용할 수 있는 단편적인 기능을 정리해 놓은 것 (부품)
* 프레임워크(Framework): 만들고 싶은 소프트웨어의 기초적인 공통 부분을 구축해 놓은 것 (반제품)

## jQuery

JavaScript의 대표적인 라이브러리이다.

[jQuery 홈페이지](https://jquery.com)에 가서 파일을 다운로드 한 뒤 직접 프로젝트에 포함시키거나 CDN을 이용하여 웹 페이지에 첨부한다.

**CDN (Content Download Network)** : 서비스 제공자의 서버에 저장된 파일을 `<script src = " ">`를 이용해 가져와 사용하는 방식.

* jQuery에서 제공하는 `<Script>` 코드를 복사해서 html 파일의 `<head>`영역에 붙여넣어 사용한다.
* jQuery를 이용하려는 `.js`파일보다 위에 위치해야 한다.

이전에 작성했던 코드를 jQuery를 이용해서 보다 쉽게 작성할 수 있다.

```js
/* jQuery를 사용하지 않고 모든 <a> 태그의 color를 바꾸는 함수 */
function linksSetColor(color) {
    var alist = document.querySelectorAll('a');

    var i = 0;
    while (i < alist.length) {
        alist[i].style.color = color;
        i = i + 1;
    }
}

/* jQuery의 css 기능을 이용해서 모든 <a> 태그의 color를 바꾸는 함수 */
function linkSetColor(color) {
    /* 모든 <a>태그를 선택해서 css중 'color'의 값을 매개변수 color로 바꾼다. */
    $('a').css('color', color);
}
```

* `$('')`: `''`안의 대상을 jQuery로 선택한다.
* `.css(par1, par2)`: 선택한 대상의 css를 수정한다. `par1`에 변경하고 싶은 속성을, `par2`에 속성 값을 적는다.

나머지 기능에도 적용

```js
/* Body의 Color를 매개변수 color로 변경 */
function bodySetColor(color) {
    document.querySelector('body').style.color = color;
}

/* Body의 backgroundColor를 매개변수 color로 변경 */
function bodySetBackgroundColor(color) {
    document.querySelector('body').style.backgroundColor = color;
}

/* with jQuery */
function bodySetColor(color) {
    $('body').css('color'. color);
}

function bodySetBackgroundColor(color) {
    $('body').css('backgroundColor'. color);
}
```
