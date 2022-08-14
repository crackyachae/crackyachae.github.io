---
layout  : article
title   : 3. HTML에서 JavaScript 로드하기
summary : 
date    : 2020-05-27 16:28:22 +0900
updated : 2020-05-27 21:22:10 +0900
tag     : draft
toc     : true
public  : true
parent  : [[/javascript/opent-client-web-js]]
latex   : false
---
* TOC
{:toc}

> 이 글은 생활코딩의 [HTML에서 JavaScript 로드하기](https://opentutorials.org/course/1375/6620) 강의내용을 복습하기 위해 강의 자료를 기반으로 작성한 글입니다.
>
> * 제가 필요한 부분 위주로 확인하면서 정리하고 있어 글에 덜 작성된 부분이 있을 수 있습니다.
> * 글 작성 후 원 강의의 내용이 수정되거나 내용을 이해하기 위한 개인적인 설명이나 해석이 있을 수 있습니다. 되도록 원 강의를 참고해주시길 바랍니다.
> * 잘못된 부분이 있다면 댓글이나 그 외 편하신 방법으로 알려주시면 감사하겠습니다.

## Inline 방식 (event 이용)

HTML 태그 안에 직접 입력해서 JavaScript를 쓸 수 있다.

* 장점: JavaScript를 적용하는 HTML element를 명확하게 나타낼 수 있다.
* 단점: JavaScript가 HTML과 섞여있기 때문에 정보(HTML) 및 제어(JavaScript)의 관리가 비 효율적이다.

```html
<!-- 클릭했을 때 Hello world!라는 경고창을 띄우는 버튼-->
<!-- onclick: 클릭했을 때, JavaScript 문법으로 ""안의 내용을 실행 -->
<body>
    <input type="button" onclick="alert('hello world!')" value="hello world">
</body>
```

* `onclick`외에 여러 event가 존재한다.

## Script 방식

HTML의 `<Script>` 태그를 이용하는 방법. HTML과 JavaScript를 구분해서 사용하기 때문에 보다 관리가 효율적이다.

```html
<!--  -->
<body>
    <!-- 버튼 -->
    <input type="button" id="hw" value="Hello world" />

    <!-- JavaScript를 실행하는 Script 태그 -->
    <script type="text/javascript">
        /* id가 hw인 element를 가져와 hw에 저장한 뒤 */
        var hw = document.getElementById('hw');
        /* 클릭하면 Hello world라는 경고창을 띄우는 함수를 실행하도록 함 */
        hw.addEventListener('click', function(){
            alert('Hello world');
        })
    </script>
</body>
```

## 외부 파일로 분리

HTML과 JavaScript를 다른 파일로 분리해서 사용.

* 하나의 JavaScript 파일을 여러 웹 페이지에서 사용해 재 사용성을 높힌다.
* Cash를 통해서 (개발자 도구의 network 탭에서 확인 가능) 속도 향상 및 전송을 경량화할 수 있다.

```html
<!-- HTML 파일 -->
<body>
    <input type="button" id="hw" value="Hello world" />

    <!-- script 태그를 바로 써주는 대신 js 파일을 링크 -->
    <script type="text/javascript" src="script2.js"></script>
</body>
```

```js
/* JavaScript 파일 */
var hw = document.getElementById('hw');
hw.addEventListener('click', function(){
    alert('Hello world');
})
```

## Script 파일의 위치

### `<head>`태그 안에 위치

* JavaScript 파일을 먼저 인식한 뒤 html의 `<body>` element를 인식하기 때문에 JavaScript에서 `<body>`안의 element를 제대로 참조하지 못하는 경우가 발생한다.
* JavaScript를 모두 실행하기 전까지 아래의 코드를 실행하지 않기 때문에 웹 페이지 표시가 지연된다.

```html
<!-- HTML 파일 -->
<head>
    <!-- JavaScript 코드가 먼저 실행 -->
    <script type="text/javascript" src="script2.js"></script>
</head>
<body>
    <input type="button" id="hw" value="Hello world" />
</body>
```

```js
/* JavaScript 파일 */

/* 문서에서 id가 hw인 element를 가져와야 하는데 아직 생성되지 않아 아무것도 담기지 않음 */
var hw = document.getElementById('hw');

/* 실행 오류 */
hw.addEventListener('click', function(){
    alert('Hello world');
})
```

아래처럼 수정하면 정상적으로 동작한다.

```js
/* 웹 페이지의 모든 element가 로딩된 뒤 {} 안의 함수를 실행 */
window.onload() = function() {
    var hw = document.getElementById('hw');
    hw.addEventListener('click', function(){
        alert('Hello world');
    })
}
```

### `<body>`태그 끝나기 이전에 위치

아래처럼 element가 다 로딩된 수 JavaScript를 실행하면 위의 문제들이 발생하지 않는다.

```html
<!-- HTML 파일 -->
<body>
    <input type="button" id="hw" value="Hello world" />
    <!-- 페이지의 element가 다 로딩된 뒤 JavaScript가 실행 -->
    <script type="text/javascript" src="script2.js"></script>
</body>
```
