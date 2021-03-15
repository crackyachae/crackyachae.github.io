---
layout  : wiki
title   : 3. Cooperative asynchronous JavaScript - Timeouts and intervals
summary : 
date    : 2020-12-14 23:31:52 +0900
updated : 2020-12-14 23:40:00 +0900
tag     : rough
toc     : true
public  : true
parent  : [[mdn-async-js]]
latex   : false
---
* TOC
{:toc}

> 이 글은 MDN Asynchronous JavaScript Tutorial중 [Cooperative asynchronous JavaScript: Timeouts and intervals](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Timeouts_and_intervals)의 내용을 복습하기위해 핵심 내용을 요약 정리한 글입니다.
>
> 내용을 이해하기 위한 개인적인 설명이나 해석이 있을 수 있기 때문에 되도록 원문을 참고해주시길 바랍니다.
> 잘못된 부분이 있다면 댓글이나 그 외 편하신 방법으로 알려주시면 감사하겠습니다.

## Timeout & intervals 
+ 이 함수들에 의해 실행되는 asynchronous code는 main thread에서 실행된다.
+ 하지만 `setTimeout` call한 함수가 실행되기 전이나 (interval이 경과하는 동안) `setInterval()` 의 반복 사이에 다른 코드를 실행하는 것이 가능하다. 

## setTimeout()
+ [setTimeout](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/setTimeout) by MDN reference
+ `setTimeout()` 내에서 실행되는 함수에 전달하려는 모든 argument는 `setTimeout()` parameter 목록 끝에 추가하여 전달해야 한다.
+ 아래 예제처럼, 전달된 argument를 이용해 사람 이름이 추가된 문장을 표시할 수 있다.
  ```js
  function sayHi(who) {
    alert('Hello ' + who + '!');
  }
  ```
+ Say hello의 대상이 되는 사람이름은 `setTimeout()`의 세번째 매개변수로 함수에 전달된다.
  ```js
  let myGreeting = setTimeout(sayHi, 2000, 'Mr. Universe');
  ```
  
## setInterval()
+ [setInterval](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/setInterval) by MDN reference
+ 코드를 특정 시간마다 반복해서 실행해야 할 경우 사용.
+ fixed time delay between each call

## Things to keep in mind about setTimeout() and setInterval()
+ `setInverval`은 코드를 호출하는 것 사이의 interval을 지정하는거라 코드를 실행하는 시간도 interval에 포함되기 때문에 실제 interval이 달라질 수 있다.
+ recursive `setTimeout`의 interval값은 코드 실행이 끝나고 다음 코드 실행이 시작될 때 까지 시간이므로 다음 iteration을 시작할 때 까지 delay가 달라질 수 있다. 
+ 이거 코드 작성해서 확인해보면 좋을듯

## Immediate timeouts 
```js
// Hello 이후에 바로 World 경고창 표시
setTimeout(function() {
  alert('World');
}, 0);

alert('Hello');
```

이 함수들은 main thread에서 실행되기 때문에 과도한 callback은 페이지를 느리게 할 수 있으며 과하지 않게 사용해야한다.