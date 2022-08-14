---
layout  : article
title   : 15. 리팩토링 (Refactoring)
summary : 
date    : 2020-05-01 12:01:17 +0900
updated : 2020-05-04 22:58:01 +0900
tag     : draft
toc     : true
public  : true
parent  : [[/javascript/opent-web2-js]]
latex   : false
---
* TOC
{:toc}

> 이 글은 생활코딩의 [리팩토링(refactoring)](https://opentutorials.org/course/3085/18801) 강의내용을 복습하기 위해 강의 자료를 기반으로 작성한 글입니다.
>
> * 제가 필요한 부분 위주로 확인하면서 정리하고 있어 글에 덜 작성된 부분이 있을 수 있습니다.
> * 글 작성 후 원 강의의 내용이 수정되거나 내용을 이해하기 위한 개인적인 설명이나 해석이 있을 수 있습니다. 되도록 원 강의를 참고해주시길 바랍니다.
> * 잘못된 부분이 있다면 댓글이나 그 외 편하신 방법으로 알려주시면 감사하겠습니다.

## 15. 리팩토링 (Refactoring)

코드를 일차적으로 완성한 뒤 비 효율적인 부분을 제거하고 코드를 개선하는 작업.

전 강의에서 작성한 코드를 보면 중복된 부분이 많다.

```js
if (document.querySelector('#night_day').value === night) {
    document.querySelector('body').style.backgroundColor = 'black';
    document.querySelector('body').style.color = 'white';
    document.querySelector('#night_day').value = 'day';
}
else {
    document.querySelector('body').style.backgroundColor = 'white';
    document.querySelector('body').style.color = 'black';
    document.querySelector('#night_day').value = 'night';
}
```

* `document.querySelector('#night_day')`: 3번 중복
* `document.querySelector('body')`: 4번 중복

1. 자신을 참조하는 경우 `this`로 표현할 수 있다.
   * id 값은 문서에서 1개여야 하므로 동일한 코드를 사용할 때 id를 새로 지정해주지 않으면 id가 최초로 사용된 element만 변경된다.
   * `this`를 이용하면 별도의 id 지정 없이 현재 위치한 element를 가리키므로 이런 문제를 해결 할 수 있다.
2. 중복되는 구문은 변수를 정의해서 축소할 수 있다.

```js
/* target 변수 정의 */
var target = document.querySelector('body');

/* document.querySelector('#night_day')대신 this 사용 */
/* document.querySelector('body')대신 target 사용 */
if (this.value === night) {
    target.style.backgroundColor = 'black';
    target.style.color = 'white';
    this.value = 'day';
}
```
