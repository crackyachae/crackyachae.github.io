---
layout  : wiki
title   : 4. Graceful asynchronous programming with Promises
summary : 
date    : 2020-12-14 23:37:03 +0900
updated : 2020-12-15 00:43:16 +0900
tag     : rough
toc     : true
public  : true
parent  : [[mdn-async-js]]
latex   : false
---
* TOC
{:toc}

> 이 글은 MDN Asynchronous JavaScript Tutorial중 [Graceful asynchronous programming with Promises](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Promises)의 내용을 복습하기위해 핵심 내용을 요약 정리한 글입니다.
>
> 내용을 이해하기 위한 개인적인 설명이나 해석이 있을 수 있기 때문에 되도록 원문을 참고해주시길 바랍니다.
> 잘못된 부분이 있다면 댓글이나 그 외 편하신 방법으로 알려주시면 감사하겠습니다.

## Promise
Promise 객체를 사용하는 주된 방법중 하나는 Promise를 반환하는 웹API를 이용하는 것이다.
+ [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) by MDN reference

### Chaining the blocks toghter
+ [Promise.prototype.then()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/then) by MDN reference
+ [Promise.prototype.catch()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/catch) by MDN reference
+ 각 `.then()` block에서 return된 값이 다음 `.then()` block의 argument로 전달된다.

### Promise terminology
+ Promise가 생성되었을 때 상태는 pending 이라고 하며 성공도 실패도 아닌 상태이다.
+ Promise 결과가 반환되면 결과에 상관 없이 resolved 상태라고 한다.
  + fulfilled: 성공적으로 처리된 Promise의 상태로 Promise 체인의 다음 `.then()` 블럭에서 사용할 수 있는 값이 반환된다. 이어서 `.then()` 블럭 내부의 executor 함수에 Promise에서 반환된 값이 parameter로 전달됩니다.
  + rejected: 실패한 Promise의 상태로 Promise가 rejected 된 이유를 나타내는 에러 메시지를 포함한 결과가 반환된다. Promise 체이닝의 제일 마지막 `.catch()` 에서 상세한 에러 메시지를 확인할 수 있다.

## promise.all()
+ promise의 array를 input parameter로 받는다. 
+ 전달된 모든 promise가 fulfilled 상태이면 `.then()` block의 함수의 parameter로 모든 promise의 결과가 담긴 array를 전달한다.

## .finally()
+ [Promise.prototype.finally()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/finally) by MDN reference
+ 보다 최근의 browser 에서는 `.finally()` method를 사용해 성공 여부에 상관없이 promise가 완료된 후 실행할 코드를 작성할 수 있다.
+ 일반적인 promise chain 가장 마지막에 붙여 작성한다. 

## Promise() constructor
+ [Promise() constructor](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/Promise) by MDN reference
  + [Promise.resolve()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/resolve) by MDN references
  + [Promise.reject()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/reject) by MDN references
+ `Promise()` constructor를 이용해 스스로 promise를 만들 수 있으며 주로 promise base가 아닌 이전의 asynchronous API를 사용할 때 사용한다.
+ 원래는 promise 를 반환하는 API는 API니까 fullfill 됐을 때랑 reject됐을 경우가 정해져있는데 그걸 resolve랑 reject 함수를 이용해서 직접 정하는 것으로 이해했다.
