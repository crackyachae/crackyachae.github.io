---
layout  : article
title   : "6. DOM (Document Object Model): 제어 대상을 찾기, jQuery, 제어 대상을 찾기(jQuery)"
summary : 
date    : 2020-06-11 14:54:20 +0900
updated : 2020-07-26 21:52:58 +0900
tag     : draft
toc     : true
public  : true
parent  : [[/javascript/opent-client-web-js]]
latex   : false
---
* TOC
{:toc}

> 이 글은 생활코딩의 [DOM](https://opentutorials.org/course/1375/6655) 강의내용을 복습하기 위해 강의 자료를 기반으로 작성한 글입니다.
>
> * 제가 필요한 부분 위주로 확인하면서 정리하고 있어 글에 덜 작성된 부분이 있을 수 있습니다.
> * 글 작성 후 원 강의의 내용이 수정되거나 내용을 이해하기 위한 개인적인 설명이나 해석이 있을 수 있습니다. 되도록 원 강의를 참고해주시길 바랍니다.
> * 잘못된 부분이 있다면 댓글이나 그 외 편하신 방법으로 알려주시면 감사하겠습니다.

DOM: window에 로드된 문서를 제어하기 위한 object model

## 제어 대상을 찾기

DOM으로 문서를 제어하기위해 가장 먼저 해야할 일: 제어대상을 찾기

### document.getElementsByTagName

Tag의 이름이 전달한 argument와 같은 element들을 가져옴.

```js
var list = document.getElementsByTagName('li');
```

* 문서 내의 `<li>` 태그들을 유사 배열로 가져와서 list 변수에 담는다.
* 유사 배열: Nodelist, 실제로 배열은 아니지만 배열처럼 접근이 가능하다.

특정한 태그 (e.g., `<ul>`) 아래의 태그 (e.g., `<li>`)만 선택하고 싶으면:

* 상위 태그를 먼저 받아서 변수에 저장한 뒤, 그 객체에서 다시 하위 element를 받는다.

```js
/* 태그 이름이 ul인 element를 가져와서 변수 ul에 저장 */
var ul = document.getElementsByTagName('ul')[0];
/* ul에 담겨있는 element에서 태그 이름이 li인 element를 가져와서 변수 list에 저장 */
var list = ul.getElementsByTagName('li');
```

### document.getElementsByClassName

Class 이름이 전달한 argument와 같은 element들을 가져옴.

```js
/* class 이름이 active인 element를 가져와서 변수 list에 저장 */
var list = document.getElementsByClassName('active');
```

### document.getElementById

id 이름이 전달한 argument와 같은 element를 가져옴.

* 해당 id를 갖는 element는 한 개이기 때문에 한 개의 객체만 반환한다.
* 다른 `getElement` method와는 다르게 `Elements`가 아니라 `Element`라고 표기
* 반환한 객체가 한 개이므로 index없이 접근 가능하다

```js
/* id 이름이 active인 element를 가져와서 변수 list에 저장 */
var list = document.getElementById('active')
```

### document.querySelector

CSS 선택자 문법을 이용해서 조건에 맞는 첫 element 하나만을 가져온다.

```js
/* <li>에 해당하는 첫 element */
var li - document.querySelector('li');
/* class가 active인 첫 element */
var li - document.querySelector('.active');
```

## jQuery

### 라이브러리와 jQuery

* 라이브러리(Library): 자주 사용하는 로직(logic)을 재 사용할 수 있도록 고안된 소프트웨어.

* 주로 element를 조회하고 제어하는 것을 보다 용이하게 할 수 있도록 도와준다.
* jQuery는 강의시범(2014년)에서 가장 유명한 javaScript 라이브러리

### jQuery의 사용

우선 jQuery파일을 HTML로 로드해야한다.

[jQuery](https://jquery.com) 사이트로 접속한 뒤

1. jQuery with CDN
   * CDN: Contents Delivery Network, 운영하는 서버 중 가장 가짜운 서버에서 파일을 가져와 실행하는 방식
   * 사이트에서 제공하는 코드를 jQuery를 사용할 `html`문서에 붙여넣는다.

     ```html
     <script src = "//code.jquery.com ... "></script>
     ```

2. download jQuery
   * 파일을 직접 다운로드해서 사용

     ```html
     <script src = "다운받은 파일의 파일경로"></script>
     ```

jQuery는 다음과 같이 사용한다.

```js
jQuery( document ).ready(function( $ ) {
    /* 전후 부분은 일단 기계적으로 작성 */
    $('body').prepend('<h1>Hello world</h1>');
});
```

* `$('body')`: body 태그를 선택해서

* `prepend('<h1>Hello world</h1>')`: 그 아래 h1 header를 추가

## 제어대상을 찾기 (jQuery)

### jQuery의 기본문법

```js
/* 모든 li element의 color를 red로 지정 */
$('li').css('color', 'red')
```

* `$()`: jQuery function.
    * 여러 argument를 가질 수 있지만 대표적으로 CSS selector를 많이 사용한다
    * jQuery function은 jQuery 객체를 반환한다.

* `css()`: jQuery 객체의 method
    * css외에도 다양한 method가 존재한다.
    * css method: 선택한 element의 첫 번째 argument의 값을 두 번째 argument로 지정

### jQuery 사용예제

Dom vs. jQuery: `<li>` 태그의 글씨 색상을 빨간색으로 바꾸기.

```js
/* By Tag Name */
/* DOM */
var lis = document.getElementsByTagName('li');
for(var i = 0; i < lis.length; i++) {
    lis[i].style.color = 'red';
}

/* jQuery */
$('li').css('color', 'red')


/* By Class Name */
/* DOM */
var lis = document.getElementsByClassName('active');
for(var i = 0; i < lis.length; i++) {
    lis[i].style.color = 'red';
}

/* jQuery */
$('.active').css('color', 'red')
```

* jQuery를 이용하면 element 선택이 간단해지고

* 반복문 없이 선택된 element 전체를 바꿀 수 있다.

```js
/* By id */
/* DOM */
var li = document.getElementByid('active');
li.style.color = 'red';
li.style.textDecoration = 'underline';

/* jQuery */
$('#active').css('color', 'red').css('textDecoration', 'underline')
```

* Chaining: jQuery method가 jQuery 객체를 다시 return하기 때문에 jQuery 객체에 속한 method를 연속적으로 호출할 수 있다.
