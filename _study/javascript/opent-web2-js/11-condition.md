---
layout  : article
title   : 11-14. 조건문
summary : 
date    : 2020-05-01 11:22:46 +0900
updated : 2020-05-01 12:01:49 +0900
tag     : draft
toc     : true
public  : true
parent  : [[/javascript/opent-web2-js]]
latex   : false
---
* TOC
{:toc}

> 이 글은 생활코딩의 [조건문 예고](https://opentutorials.org/course/3085/18879), [비교 연산자와 Boolean 데이터 타입](https://opentutorials.org/course/3085/18798), [조건문](https://opentutorials.org/course/3085/18800), [조건문의 활용](https://opentutorials.org/course/3085/18878) 강의내용을 복습하기 위해 강의 자료를 기반으로 작성한 글입니다.
>
> * 제가 필요한 부분 위주로 확인하면서 정리하고 있어 글에 덜 작성된 부분이 있을 수 있습니다.
> * 글 작성 후 원 강의의 내용이 수정되거나 내용을 이해하기 위한 개인적인 설명이나 해석이 있을 수 있습니다. 되도록 원 강의를 참고해주시길 바랍니다.
> * 잘못된 부분이 있다면 댓글이나 그 외 편하신 방법으로 알려주시면 감사하겠습니다.

## 11. 조건문 예고

프로그래밍 언어를 이용하면 조건에 따라 다른 순서로 기능을 실행할 수 있다.

조건문을 이용하면 이전에 만들었던 `day & night` 버튼을 1개의 버튼으로 합칠 수 있다.

## 12. 비교 연산자와 Boolean 데이터 타입

두 개의 값을 비교할 수 있은 연산자가 있다. 이를 **비교 연산자**라고 한다.

`a === b`는 `a`와 `b`가 같은 값인지 비교한다.

* `a`와 `b`가 같으면 `true`를 반환한다. (e.g `1 === 1`)
* `a`와 `b`가 다르면 `false`를 반환한다. (e.g `1 === 2`)

`a < b`는 `a`가 `b`보다 작은 값인지 비교한다.

* `a`가 `b`보다 작으면 `true`를 반환한다. (e.g `1 < 2`)
* `a`가 `b`보다 작지 않으면 `false`를 반환한다. (e.g `2 < 1`)

이처럼 반환 값으로 `true` 혹은 `false` 둘 중 하나를 반환하는 data type을 **Boolean**이라고 한다.

## 13. 조건문

조건문은 boolean값에 따라 코드가 다르게 실행된다.

```js
/* 1, 2가 출력 */
document.write('1 <br>')

if (true) {
    document.write('2 <br>')
}
else {
    document.write('3 <br>')
}

/* 1, 3이 출력 */
document.write('1 <br>')

if (false) {
    document.write('2 <br>')
}
else {
    document.write('3 <br>')
}
```

* `1`은 조건에 들어있지 않으므로 조건에 상관없이 항상 출력된다.
* 조건이 `true`일 경우 조건에 nesting 되어있는 코드가 실행된다.
* 조건이 `false`인 경우 else에 nesting 되어있는 코드가 실행된다.

## 14. 조건문의 활용

조건문을 이용해서 `day & night` 버튼을 1개의 버튼으로 합칠 수 있다.

```html
<!-- night 버튼 -->
<input type = "button" value = "night" onclick = "
    document.querySelector('body').style.backgroundColor = 'black';
    document.querySelector('body').style.color = 'white';
">

<!-- day 버튼 -->
<input type = "button" value = "day" onclick = "
    document.querySelector('body').style.backgroundColor = 'white';
    document.querySelector('body').style.color = 'black';
">
```

위의 두 버튼을 조건문을 이용해서 하나로 합치기 위해서는 다음 두 가지를 해주어야한다.

1. 버튼의 `value`을 이용해서 `night`조건을 만든다. (`day`는 `night`의 `else`로 처리)
2. 조건문을 이용해서 `day`일 때 코드와 `night`일 때 코드를 한 번에 작성한다.

조건을 명확히 기재하기 위해서는 버튼의 `value`를 알아야한다: console에서 `.value`를 이용해 알아낼 수 있다.

```html
<!-- 버튼을 보다 쉽게 가리키기 위해 html파일의 버튼에 id값을 추가 -->
<input id = "night_day" type = "button" value = "night" onclick = "">
```

```js
/* id 값을 night_day로 갖는 요소의 value값을 반환: 'night' */
document.querySelector('#night_day').value
```

버튼의 `value`가 `night`이므로 이를 이용해서 조건을 작성한다.

```js
/* 문서의 night_day id를 갖는 요소 (버튼)의 value가 night일 경우 */
/* night 버튼을 클릭 할 경우 */
if (document.querySelector('#night_day').value === night) {
    /* 웹 페이지 테마를 night으로 바꾼다 */
    document.querySelector('body').style.backgroundColor = 'black';
    document.querySelector('body').style.color = 'white';
}

/* 그 외: day 버튼을 클릭 할 경우 */
else {
    /* 웹 페이지 테마를 day로 바꾼다 */
    document.querySelector('body').style.backgroundColor = 'white';
    document.querySelector('body').style.color = 'black';
}
```

이 경우 웹 페이지 테마가 `night`으로 바뀌었더라도 버튼의 `value`는 항상 `night`이기 때문에 `day` 테마로 바꿀 수 없다.

이를 해결하기 위해서는 웹 페이지의 테마를 `night`으로 바꾸면 `value`값을 `night`이 아닌 값으로 바꿔줘야한다. 물론 반대로 `day` 테마로 바꿀 때 `value`를 `night`으로 바꾸는 코드도 같이 작성해줘야한다.

```js
/* night 버튼을 클릭 할 경우 */
if (document.querySelector('#night_day').value === night) {
    document.querySelector('body').style.backgroundColor = 'black';
    document.querySelector('body').style.color = 'white';

    /* night_day id를 갖는 요소의 value를 day로 바꿈 */
    document.querySelector('#night_day').value = 'day'
}

/* 그 외: day 버튼을 클릭 할 경우 */
else {
    document.querySelector('body').style.backgroundColor = 'white';
    document.querySelector('body').style.color = 'black';

    document.querySelector('#night_day').value = 'night'
}
```
