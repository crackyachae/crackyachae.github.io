---
layout  : article
title   : 7. 웹 브라우저 제어 / 9. 제어할 태그 선택하기
summary : 
date    : 2020-05-01 10:19:56 +0900
updated : 2020-05-01 10:36:05 +0900
tag     : draft
toc     : true
public  : true
parent  : [[/javascript/opent-web2-js]]
latex   : false
---
* TOC
{:toc}

> 이 글은 생활코딩의 [웹브라우저 제어](https://opentutorials.org/course/3085/18872), [제어할 태그 선택하기](https://opentutorials.org/course/3085/18792) 강의내용을 복습하기 위해 강의 자료를 기반으로 작성한 글입니다.
>
> * 제가 필요한 부분 위주로 확인하면서 정리하고 있어 글에 덜 작성된 부분이 있을 수 있습니다.
> * 글 작성 후 원 강의의 내용이 수정되거나 내용을 이해하기 위한 개인적인 설명이나 해석이 있을 수 있습니다. 되도록 원 강의를 참고해주시길 바랍니다.
> * 잘못된 부분이 있다면 댓글이나 그 외 편하신 방법으로 알려주시면 감사하겠습니다.

## 7. 웹 브라우저 제어

웹 페이지의 디자인은 `CSS`를 이용해서 바꿀 수 있다.

```html
<!-- body의 배경색(backgroundColor)과 글씨색(color)을 바꿈 -->
<body style = "backgroundColor: black'; color: white;">
```

위처럼 작성하면 웹 페이지는 항상 검정색 배경과 하얀색 글씨를 유지한다.

웹 브라우저의 테마(배경과 글씨 색)를 '클릭했을 때'만 바꾸고 싶다면 다음 두 가지를 실행해야한다.

1. `CSS`로 변경할 디자인을 작성
2. `JavaScript`로 제어하려는 태그를 선택해서 `CSS`를 변경

## 8. CSS 기초

이전에 CSS 강의를 별도로 수강했으므로 생략.

## 9. 제어할 태그 선택하기

웹 페이지의 테마(day & night)를 바꾸기 위한 버튼은 다음과 같이 만들 수 있다. Night 버튼만.

1. 제어 버튼을 생성

   ```html
   <!-- night이 써져있는 버튼 -->
   <input type = "button" value = "night">
   ```

2. 클릭했을 때 전환을 주기 위해 `onclick` 값으로 JavaScript를 입력한다.

   ```html
   <input type = "button" value = "night" onclick = "">
   ```

3. 태그를 선택해서 CSS를 변경

   ```html
   <input type = "button" value = "night" onclick = "
    document.querySelector('body').style.backgroundColor = 'black';
    document.querySelector('body').style.color = 'white';
   ">
   ```

3번의 `onclick`안의 코드를 구체적으로 보면 다음과 같다.

* `document`: 문서의
* `querySelector('body')`: `body`태그를 선택해서 (괄호안에 원하는 선택자를 넣으면 된다.)
* `.style`: `style`속성에 접근한 뒤
* `backgroundColor = 'black'` 배경색을 검정(`black`)으로 바꾼다.
* `color = 'white'`: 글자색을 흰색(`white`)로 바꾼다.

Day 버튼은 버튼의 `value`와 배경색, 글자색 값만 바꿔서 동일하게 작성하면 된다.
