---
layout  : article
title   : 4. Object Model
summary : 
date    : 2020-05-27 21:23:58 +0900
updated : 2020-05-27 22:00:03 +0900
tag     : draft
toc     : true
public  : true
parent  : [[/javascript/opent-client-web-js]]
latex   : false
---
* TOC
{:toc}

> 이 글은 생활코딩의 [Object Model](https://opentutorials.org/course/1375/6622) 강의내용을 복습하기 위해 강의 자료를 기반으로 작성한 글입니다.
>
> * 제가 필요한 부분 위주로 확인하면서 정리하고 있어 글에 덜 작성된 부분이 있을 수 있습니다.
> * 글 작성 후 원 강의의 내용이 수정되거나 내용을 이해하기 위한 개인적인 설명이나 해석이 있을 수 있습니다. 되도록 원 강의를 참고해주시길 바랍니다.
> * 잘못된 부분이 있다면 댓글이나 그 외 편하신 방법으로 알려주시면 감사하겠습니다.

JavaScript가 제어의 역할을 한다는 것은 JavaScript가 제어할 수 있는 '무언가'가 존재한다는 뜻이다. Object(객체)를 그 '무언가'로 생각하면 편하다.

* Object Model: 브라우저와 웹 페이지의 여러 구성 요소들을 object로 만들어 제공하는 것.
* 웹 페이지의 element를 JavaScript가 제어할 수 있도록 브라우저가 웹 페이지를 읽는 과정에서 element에 해당하는 object를 생성한다.

### Example

```js
/* <img> 태그를 제어할 수 있는 object 찾기 */

/* getElementByTagName을 이용하면 해당하는 Tag Element들을 list로 return */
var imgs = document.getElementByTagName('img');

/* 웹 페이지의 첫 ([0]) img태그의 width를 변경 */
imgs[0].style.width = '300px';
```

## Object Model 분류

![Window Objects](/post-img/opent-client-web-js-4-object-model/111182768-97c85300-85f2-11eb-9c19-f3b7d40146bd.png)

가장 큰 범주로 window object가 있고 두 가지로 측면에서 볼 수 있다.

* 웹 브라우저와 페이지를 제어하기 위한 object로 Documnet Object Model, Browser Object Model을 포함한다 (전역객체).
* JavaScript 언어 자체적으로 window object를 갖는다.

* DOM (Document Object Model)
    * `window` 객체의 여러 property중, `document` property (i.e `window.document`)에 저장된 object이다.
    * 웹 페이지 문서 내의 주요 element (e.g `<body>`), `<img>`등)을 제어한다.
* BOM (Browser Object Model)
    * 웹 브라우저 자체와 관련된 element를 제어한다.
    * `window` 객체의 property중, `navigator`, `screen`, `location` 등이 해당된다.
* JavaScript Core
    * JavaScript 언어 자체에 존재하는 object.
    * `array`, `function` 등을 포함한다.
    * 브라우저 host 환경에서만 존재하는 DOM, BOM과 다르게 어떤 host 환경에서도 사용 가능하다.
