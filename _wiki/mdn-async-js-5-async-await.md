---
layout  : wiki
title   : 5. Making asynchronous programming easier with async and await
summary : 
date    : 2020-12-15 00:41:39 +0900
updated : 2020-12-15 00:45:24 +0900
tag     : rough
toc     : true
public  : true
parent  : [[mdn-async-js]]
latex   : false
---
* TOC
{:toc}

> 이 글은 MDN Asynchronous JavaScript Tutorial중 [Making asynchronous programming easier with async and await](https://developer.mozilla.org/ko/docs/Learn/JavaScript/Asynchronous/Async_await)의 내용을 복습하기위해 핵심 내용을 요약 정리한 글입니다.
>
> 내용을 이해하기 위한 개인적인 설명이나 해석이 있을 수 있기 때문에 되도록 원문을 참고해주시길 바랍니다.
> 잘못된 부분이 있다면 댓글이나 그 외 편하신 방법으로 알려주시면 감사하겠습니다.

promise를 보다 쉽게 사용할 수 있도록 하는 문법이다.
+ [async function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function) by MDN reference
+ [await](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await) by MDN reference
+ `function` 앞에 `async` keyword를 붙이면 그 함수는 promise를 return한다. 
+ `await`은 `async` function 안에서만 사용할 수 있다. `await` keyword를 pomise-based인 async function 앞에 붙이면 promise가 fulfill 될 때 까지 코드를 멈추고 기다린 뒤 결과를 return한다. 

## The downsides of async/await
+ `await` keyword는 promise가 fulfill 될 때 까지 그 후의 코드가 실행되는 것을 block 하기 때문에 `await`이 정의되어있는 block의 code는 실제로는 synchronous 하게 동작한다.
+ 다른 task는 계속 실행되더라도 async await keyword를 이용해서 작성한 코드는 여러 promise에 의해 느려질 수 있다.
+ 모든 promise 객체를 각각 변수에 저장한 뒤 사용 가능할 때 변수를 사용하는 방식으로 이 문제를 완화시킬 수 있다.