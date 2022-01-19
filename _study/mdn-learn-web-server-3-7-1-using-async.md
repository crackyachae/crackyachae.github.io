---
layout  : article
title   : Async를 사용한 비동기 흐름 제어 (Asynchronous flow control using async)
summary : 
date    : 2022-01-19 20:45:30 +0900
updated : 2022-01-19 23:50:20 +0900
tag     : 
toc     : true
public  : true
parent  : [[mdn-learn-web-server-3-7-express-tutorial-5]]
latex   : false
---
* TOC
{:toc}

> 이 글은 MDN Learn web development의 [Express web framework (Node.js/JavaScript)](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs) 중 [Asynchronous flow control using async](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/Displaying_data/flow_control_using_async)의 내용을 번역 및 정리한 글입니다.
>
> * 제가 필요한 부분 위주로 확인하면서 정리하고 있어 글에 덜 작성된 부분이 있을 수 있습니다.
> * 글 작성 후 원문의 내용이 수정되거나 내용을 이해하기 위한 개인적인 설명이나 해석이 있을 수 있습니다. 되도록 원문을 참고해주시길 바랍니다.
> * 잘못된 부분이 있다면 댓글이나 그 외 편하신 방법으로 알려주시면 감사하겠습니다.

일부 지역 도서관 페이지의 컨트롤러 코드는 여러 비동기 요청의 결과에 의존할 것이며, 특정 순서 또는 병렬적으로 실행되어야 할 수도 있다. 그 흐름 제어를 관리하고, 필요한 모든 정보가 가능할 때 페이지를 렌더링하기 위해서, 유명한 노드의 [async](https://www.npmjs.com/package/async) 모듈을 사용할 것이다.

> 자바스크립트에는 상대적으로 최신 자바스크립트 기능인 Promises를 포함해서 비동기 동작 흐름 제어를 관리하는 몇 가지 다른 방법이 있다.

## 이것이 왜 필요한가 (Why is this needed?)

*Express*의 대부분의 메소드는 비동기적이다 - 수행할 동작을 지정해서 콜백으로 전달한다. 메소드는 즉시 반환되고, 요청된 동작이 완료되면 콜백이 호출된다. 관습적으로 *Express*에서 콜백 함수는 *error* 값(혹은 성공했을 때는 `null`)을 첫 매개 변수로 함수의 결과(값이 있다면)를 두 번째 매개 변수로 전달한다.

만약 컨트롤러가 페이지를 렌더링하기 위해 필요한 정보를 얻는데 **하나의** 비동기 동작만 수행해도 된다면 구현은 쉬워진다 - 콜백에서 템플릿을 렌더링하면 된다. 아래의 코드 조각은 이를 모델 `SomeModel`의 개수를 렌더링하는 함수에 대해 보여준다 (Mongoose의 [`coutDocuments`](https://mongoosejs.com/docs/api.html#model_Model.countDocuments) 메소드를 사용한다).

```js
exports.some_model_count = function(req, res, next) {

  SomeModel.countDocuments({ a_model_field: 'match_value' }, function (err, count) {
    // ... 오류가 있으면 조치

    // 성공하면, count를 렌더 함수에 전달해 결과를 렌더링한다 (여기서는, 변수 'data'로 전달).
    res.render('the_template', { data: count } );
  });
}
```

만약 **여러 개의** 비동기 쿼리를 만들어야 하고, 그 동작이 완료될 때까지 페이지를 렌더링하지 못하면 어떨까? 단순하게 구현하면 요청을 "데이지 체인" 해, 이전 요청의 콜백에서 이후의 요청을 시작하고, 마지막 콜백에서 응답을 렌더링할 수 있다. 이 방법의 문제점은 요청을 병렬적으로 실행하는 게 효율적이더라도, 요청을 순차적으로 실행해야 한다는 것이다. 또한, 이 방법은 보통 [콜백 지옥](http://callbackhell.com)이라고 하는 복잡한 중첩 코드를 생성될 수도 있다.

더 나은 방법은 모든 요청을 병렬적으로 실행한 뒤 모든 쿼리가 완료됐을 때 실행되는 하나의 콜백을 갖는 것이다. Async 모듈을 통해 이런 종류의 흐름 작업을 더 쉽게 할 수 있다.

## 병렬 비동기 작업 (Asynchronous operations in parallel)

[`async.parallel()`](https://caolan.github.io/async/v3/docs.html#parallel) 메소드는 여러 개의 비동기 작업을 병렬로 실행하는 데 사용된다.

`async.parallel()`의 첫 번째 인자는 실행할 비동기 함수의 모음이다 (배열, 객체, 또는 다른 순회 가능한 항목). 각 함수는 완료 시 오류 `err`(`null`일 수 있다)와 선택적인 결괏값과 함께 호출되는 `callback(err, result)`을 전달한다.

`async.parallel()`의 선택적인 두 번째 인자는 첫 번째 인자의 모든 함수가 완료됐을 때 실행되는 콜백 함수이다. 해당 콜백은 오류 인자와 비동기 작업의 결과들을 포함하는 결과 모음과 함께 호출된다. 결과 모음은 첫 번째 인자와 같은 유형이다 (i.e. 비동기 함수 배열을 전달했으면, 마지막 콜백은 결과의 배열과 함께 호출된다). 만약 병렬 함수 중 하나라도 오류를 보고하면 콜백은 (오류 값과 함께) 일찍 호출된다.

아래의 예제는 첫 번째 인자로 객체를 전달했을 때 이것이 어떻게 작동하는지 보여준다. 아래에서 볼 수 있듯이 결과는 전달된 원본 함수와 같은 속성 이름과 함께 객체로 *반환*된다.

```js
async.parallel({
  one: function(callback) { ... },
  two: function(callback) { ... },
  ...
  something_else: function(callback) { ... }
  },
  // 추가 콜백
  function(err, results) {
    // 현재 'results'는 {one: 1, two: 2, ..., something_else: some_value} 와 같다.
  }
);
```

만약 함수의 배열을 대신 첫 번째 인자로 전달했으면, 결과는 배열(배열의 순서는 선언된 함수의 기존 순서와 일치한다 - 완료된 순서가 아니라)일 것이다

## 직렬(순차) 비동기 작업 (Asynchronous operations in series)

[`async.series()`](https://caolan.github.io/async/v3/docs.html#series) 메소드는 이후의 함수가 이전 함수의 결과에 의존하지 않을 때, 여러 개의 비동기 작업을 순차적으로 실행하는데 사용된다. 이는 `async.parallel()`과 본질적으로 같은 방식으로 선언되고 동작한다.

```js
async.series({
  one: function(callback) { ... },
  two: function(callback) { ... },
  ...
  something_else: function(callback) { ... }
  },
  // 마지막 비동기 함수가 완료된 이후의 추가 콜백
  function(err, results) {
    // 현재 'results'는 {one: 1, two: 2, ..., something_else: some_value} 와 같다.
  }
);
```

> Note: ECMAScript (자바스크립트) 언어의 스펙에는 객체의 열거(enumeration) 순서가 정해져 있지 않다고 명시되어 있어, 모든 플랫폼에서 지정한 것과 동일한 순서로 함수가 호출되지 않을 수도 있다. 만약 순서가 매우 중요하면 아래 보이는 것처럼 객체 대신 배열로 전달해야 한다.

```js
async.series([
  function(callback) {
    // 어떤 일을 실행하고 ...
    callback(null, 'one');
  },
  function(callback) {
    // 다른 일을 더 실행 ...
    callback(null, 'two');
  }
 ],
  // 추가 콜백
  function(err, results) {
  // 현재 results는 ['one', 'two']와 같다.
  }
);
```

## 직렬(순차) 의존적 비동기 작업 (Dependent asynchronous operations in series)

[`async.waterfall()`](https://caolan.github.io/async/v3/docs.html#waterfall) 메소드는 이후의 함수가 이전 작업의 결과에 의존적일 때 여러 개의 비동기 작업을 순차적으로 실행하는 데 사용된다.

각 비동기 함수에 의해 호출되는 콜백은 첫 번째 인자로 `null`을 포함하고 후속 인자를 생성한다. 연속된(in the series) 각 함수는 첫 매개 변수로 이전 콜백의 결과 인자를 사용하고, 그리고 콜백 함수를 다음으로 사용한다. 모든 작업이 완료되었을 때, 마지막 콜백은 마지막 작업의 결과와 함께 호출된다. 이것이 동작하는 방법은 아래의 코드 조각을 보면(consider) 더 명료해질 것이다 (이 예제는 *async* 문서에서 가져왔다):

```js
async.waterfall([
  function(callback) {
    callback(null, 'one', 'two');
  },
  function(arg1, arg2, callback) {
    // 현재 arg1은 'one'이고 arg2는 'two'이다.
    callback(null, 'three');
  },
  function(arg1, callback) {
    // 현재 arg1은 'three'다.
    callback(null, 'done');
  }
], function (err, result) {
  // 현재 result는 'done'이다.
}
);
```

## async 설치하기 (Installing async)

NPM 패키지 매니저를 사용해서 async 모듈을 설치해 현재 코드에서 이를 사용할 수 있도록 하자. 이것은 일반적인 방법, *지역 도서관* 프로젝트의 루트 폴더에서 프롬프터를 열어 다음의 명령을 입력하는 것으로 할 수 있다:

```
npm install async
```
