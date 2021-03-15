---
layout  : wiki
title   : 2. Introducing asynchronous JavaScript
summary : 
date    : 2020-12-14 23:26:33 +0900
updated : 2020-12-14 23:31:49 +0900
tag     : rough
toc     : true
public  : true
parent  : [[mdn-async-js]]
latex   : false
---
* TOC
{:toc}

> 이 글은 MDN Asynchronous JavaScript Tutorial중 [Introducing asynchronous JavaScript](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Introducing)의 내용을 복습하기위해 핵심 내용을 요약 정리한 글입니다.
>
> 내용을 이해하기 위한 개인적인 설명이나 해석이 있을 수 있기 때문에 되도록 원문을 참고해주시길 바랍니다.
> 잘못된 부분이 있다면 댓글이나 그 외 편하신 방법으로 알려주시면 감사하겠습니다.

## Async callback
+ Async callback은 다른 함수의 argument로 전달되는 함수로, 그 (callback을 argument로 받는) 함수가 호출되어 background에서 실행되기 시작할 때 특정(specified)된다.
+ 다른 함수가 호출될 때, callback 함수의 reference가 argument로 전달될 뿐 실제로 바로 실행되지는 않는다.
+ 그 후에 자신을 포함하는 다른 함수의 body에서 비동기적으로 다시 호출 (called back) 된다.
+ callback 은 비동기의 수단이지 모든 callback 함수가 비동기적인 것은 아니다.

## Promise
+ Promise는 async operation의 완료나 실패를 나타내는 '객체'이다. 엄밀히는 완료와 실패를 결정하기 전의 중간 상태를 나타내며 "요청에 대한 결과를 최대한 빠르게 가져오겠다는 약속"을 의미한다고 할 수 있다.
+ 요청을 완료하는데 성공했을 경우 `then()` method가 실행된다. `then()` block은 주로 callback 함수를 포함하고 있으며 각 callback은 성공한 이전 operation의 결과 (i.e. 반환값)을 input으로 받는다.

## Promises vs callbacks
+ Promises는 callback 함수를 연계한(attach) returned object라는 점에서 old-style callback과 유사하지만 보다 많은 장점이 있다.
+ 여러개의 `.then()`을 사용해 multiple async operation을 보다 간결하게 구현할 수 있다. ([callback hell](http://callbackhell.com) 탈출)
+ Promise callbacks은 event queue에 담긴(placed) 순서를 엄격히 지켜 호출된다. 
+ Error handling이 훨씬 쉽다. 모든 error를 하나의 `.catch()` block에서 해결할 수 있다.
+ Promises avoid inversion of control, unlike old-style callbacks, which lose full control of how the function will be executed when passing a callback to a third-party library.

## The nature of asynchronous code
```js
console.log ('Starting');
let image;

fetch('coffee.jpg').then((response) => {
  console.log('It worked :)')
  return response.blob();
}).then((myBlob) => {
  // ...
}).catch((error) => {
  console.log('There has been a problem with your fetch operation: ' + error.message);
});

console.log ('All done!');
```
실행순서: `Starting` → `All done!` → `It worked :)`
+ `fetch()`는 blocking 없이 비동기적으로 실행되므로 코드는 promise-related 코드 다음으로 넘어가 계속 실행되어 아래 `console.log()`인 `All done!`이 먼저 출력된다. 
+ `fetch()` 이 실행되고 결과를 `.then()`으로 전달해야 두 번째 `console.log()` 메시지인 `It worked :)`가 출력된다.

Promise 자체는 전달되는 'object'고 그걸 반환하는 (비동기에 사용할 수 있는) 함수들이 정해져있거나 그걸 만들어서 사용하는 것 같다.
