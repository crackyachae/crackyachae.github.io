---
layout  : article
title   : 16-20. 배열과 반복문
summary : 
date    : 2020-05-04 22:58:00 +0900
updated : 2020-05-04 23:48:13 +0900
tag     : draft
toc     : true
public  : true
parent  : [[/javascript/opent-web2-js]]
latex   : false
---
* TOC
{:toc}

> 이 글은 생활코딩의 [반복문 예고](https://opentutorials.org/course/3085/18881), [배열](https://opentutorials.org/course/3085/18825), [반복문](https://opentutorials.org/course/3085/18827), [배열과 반복문](https://opentutorials.org/course/3085/18828), [배열과 반복문의 활용](https://opentutorials.org/course/3085/18850) 강의내용을 복습하기 위해 강의 자료를 기반으로 작성한 글입니다.
>
> * 제가 필요한 부분 위주로 확인하면서 정리하고 있어 글에 덜 작성된 부분이 있을 수 있습니다.
> * 글 작성 후 원 강의의 내용이 수정되거나 내용을 이해하기 위한 개인적인 설명이나 해석이 있을 수 있습니다. 되도록 원 강의를 참고해주시길 바랍니다.
> * 잘못된 부분이 있다면 댓글이나 그 외 편하신 방법으로 알려주시면 감사하겠습니다.

## 16. 반복문 예고

링크의 색상도 테마에 맞춰서 바꾸고 싶을 때 (day: blue, night: powderblue) 반복문을 이용해서 모든 링크 element `<a>`의 색상을 바꾸는 작업을 반복할 수 있다.

## 17. 배열 (Array)

* 프로그래밍은 많은 데이터를 다루기 때문에

* 연관된 데이터를 정리해서 담을 수 있는 수납함 역할을 하는 **배열(array)** 이 존재한다.

배열은 대괄호(`[]`)를 사용해서 만든다.

```js
/* 변수 coworkers에 배열을 대입 */
/* 배열을 이루는 elements는 comma를 이용해 구분 */
var coworkers = ['egoing', 'leezche']
```

배열안의 각 데이터는 `index`를 이용해 호출한다.

```js
/* 첫 번째 요소: egoing을 출력 */
document.write(coworkers[0]);

/* 두 번째 요소: leezche를 출력 */
document.write(coworkers[1]);
```

배열을 이루는 element의 개수를 세고싶으면 `.length`를 이용한다.

```js
/* 배열 element 개수인 2 출력 */
document.write(coworkers.length)
```

배열에 element를 추가하고 싶으면 `.push`를 이용한다.

```js
/* 배열에 'duru'를 element로 추가 */
/* coworkers 배열은 다음과 같이 변한다: ['egoing', 'leezche', 'duru'] */
coworkers.push('duru');
```

그 외의 기능 및 명령어는 검색을 통해 찾아볼 수 있다.

## 18. 반복문

동일한 코드를 반복해야 할 때, 단순히 복사-붙여넣기를 이용하면 코드 작성 및 수정이 어렵다.

반복문을 이용해서 동일한 코드를 반복해서 작성할수 있다.

```js
/* 조건이 true일 동안 2, 3을 <li> element로 만드는 코드를 반복 실행*/
while (true) {
    document.write('<li>2</li>')
    document.write('<li>3</li>')
}

document.write('<li>4</li>')
```

* 반복문이 실행되는 조건은 다음과 같다:
  괄호 `()` 안 조건의 `true or false` 여부 체크 → `true`일 경우 `{}`안의 코드 실행 → 다시 괄호 안 조건 체크 → 실행 반복
* 위 처럼 조건을 `true`로 작성하면 코드가 무한히 반복된다.

원하는 횟수만큼 반복하고 싶으면 조건이 원하는 시점에서 `true`에서 `false`로 넘어갈 수 있도록 지정해주어야 한다.

일반적으로 반복한 횟수를 기록해 놓는 변수 `i`를 지정해서 사용한다.

```js
/* 반복 횟수를 기록할 변수 i를 선언 */
var i - 0;

/* 실행을 세 번 반복하는 코드 */
while(i < 3) {
    document.write('<li>2</li>')
    document.write('<li>3</li>')

    /* 실행을 한 번 더 했으므로 i를 1 증가시킴 */
    i = i + 1;
}

/* 아후 코드 순차적으로 실행 */
document.write('<li>4</li>')
```

위 코드의 실행 순서는 다음과 같다:

* `i = 0` 지정
* `i = 0 < 3`이므로 조건이 `true` → list 2, 3 출력 & `i = 1`
* `i = 1 < 3`이므로 조건이 `true` → list 2, 3 출력 & `i = 2`
* `i = 2 < 3`이므로 조건이 `true` → list 2, 3 출력 & `i = 3`
* `i = 3 < 3`이므로 조건이 `false`
* 반복문을 탈출해서 list 4를 출력

## 19. 배열과 반복문

항목이 많고 수정이 빈번하게 일어나는 목록(`<li>`)을 배열과 반복문을 이용해서 작성할 수 있다.

1. List에 쓰일 element를 배열로 선언

   ```js
   var coworkers = ['egoing', 'leezche', 'duru', 'taeho']
   ```

2. 반복문을 이용해서 배열의 element를 list로 출력한다.

   ```js
   var i = 0;

   /* i < 4 처럼 반복 횟수를 '수'로 지정하면 element의 개수가 변했을 때 대응이 어렵다. */
   /* 반복 횟수를 'coworkers의 element 개수'로 지정해서 해결할 수 있다. */
   while (i < coworkers.length) {
       document.write('<li>' + 'coworkers[i]' + '</li>')
       i = i + 1;
   }
   ```

## 20. 배열과 반복문의 활용

배열과 반복문을 이용하여 모든 링크 element `<a>`의 색상을 바꾸는 작업을 반복

1. 우선 `<a>` 태그 전부를 선택:
`document.querySelectorAll('a')`를 이용하면 웹 페이지의 모든 `<a>`를 배열로 반환한다. `[a, a, a, a]`

   console에서 배열의 element로 있는 각 `<a>`태그를 확인할 수 있다.

   ```js
   /* 보다 쉬운 사용을 위해 배열을 alist 변수에 대입 */
   var alist = document.querySelectorAll('a');
   
   console.log(alist[0]);
   ```

   * `alist[0]`: 첫 번째 `<a>`태그인 `<a herf = "index.html">WEB</a>` 출력
   * `alist.length`: element의 개수, 즉 웹 페이지 내의 `<a>`태그의 총 개수를 출력

2. 반복문을 이용해서 모든 `<a>`태그의 `color`를 `powderblue`로 바꿀 수 있다.

   ```js
   var alist = document.querySelectorAll('a')

   i = 0;
   while(i < alist.length) {

      /* 첫 번째 <a> 태그부터 순차적으로 color가 powderblue가 되도록 style 속성 값을 변경 */
      alist[i].style.color = 'powderblue';
      i = i + 1;
   }
   ```
