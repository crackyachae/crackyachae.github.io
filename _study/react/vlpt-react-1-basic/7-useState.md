---
layout  : article
title   : 7. useState 를 통해 컴포넌트에서 바뀌는 값 관리하기
summary : 
date    : 2021-01-01 21:02:52 +0900
updated : 2021-01-01 21:36:49 +0900
tag     : draft
toc     : true
public  : true
parent  : [[/react/vlpt-react-1-basic]]
latex   : false
---
* TOC
{:toc}

> 이 글은 벨로퍼트와 함께하는 모던 React중 [7. useState 를 통해 컴포넌트에서 바뀌는 값 관리하기](https://react.vlpt.us/basic/07-useState.html)의 내용을 복습하기위해 핵심 내용을 요약 정리한 글입니다.
>
> * 제가 필요한 부분 위주로 확인하면서 정리하고 있어 글에 덜 작성된 부분이 있을 수 있습니다.
> * 글 작성 후 원문의 내용이 수정되거나 내용을 이해하기 위한 개인적인 설명이나 해석이 있을 수 있습니다. 되도록 원문을 참고해주시길 바랍니다.
> * 잘못된 부분이 있다면 댓글이나 그 외 편하신 방법으로 알려주시면 감사하겠습니다.

Hooks 라는 기능이 도입되면서 함수형 component에서도 state를 관리할 수 있게 되었다.

이번에는 React의 Hooks 중 하나인 `useState` 라는 함수를 사용해 버튼을 누르면 숫자가 바뀌는 `Counter` component를 만들어보자.

```js
/* Counter.js */

function Counter() {
  return (
    <div>
      <h1>0</h1>
      <button>+1</button>
      <button>-1</button>
    </div>
  );
}
```

## 이벤트 설정

우선 `Counter` 에서 버튼이 클릭되는 이벤트가 발생 했을 때, 특정 함수가 호출되도록 설정을 해보자.

```js
function Counter() {
  // onIncrease 함수 생성
  const onIncrease = () => {
    console.log('+1')
  }
  // onDecrease 함수 생성
  const onDecrease = () => {
    console.log('-1');
  }
  return (
    <div>
      <h1>0</h1>
      {/* 버튼에 onClick 이벤트로 각각 onIncrease, onDecrease 설정 */}
      <button onClick={onIncrease}>+1</button>
      <button onClick={onDecrease}>-1</button>
    </div>
  );
}
```

`onClick` 이벤트로 함수'형태'를 넣어주어야 하지, 함수를 다음과 같이 실행하지 않도록 주의해야한다.

* 이렇게 하면 렌더링되는 시점에서 함수가 호출되버린다.

```js
onClick={onIncrease()}
```

## 동적인 값 끼얹기, useState

이제 `useState`를 사용하여 숫자를 state로 관리해보자.

```js
/* Counter.js */

// useState를 import
import React, { useState } from 'react';

function Counter() {
  // useState의 parameter: 상태의 기본값
  // number의 기본값은 0
  const [number, setNumber] = useState(0);

  // onIncrease가 호출되면
  const onIncrease = () => {
    // number를 현재 값에서 1 증가한 값으로 설정.
    setNumber(number + 1);
  }

  // onDecrease가 호출되면
  const onDecrease = () => {
    // number를 현재 값에서 1 감소한 값으로 설정.
    setNumber(number - 1);
  }

  return (
    //...
  );
}
```

* `useState` 를 사용 할 때에는 상태의 기본값을 파라미터로 넣어서 호출한다.
* `useState`를 호출하면 배열이 반환되는데,
    * 첫번째 원소는 현재 상태,
    * 두번째 원소는 Setter 함수이다.

이것도 비구조화 할당을 배열에 적용한 것으로 원래는 다음과 같이 작성한다.

```js
// useState는 함수고 0은 state의 기본값 
const numberState = useState(0);
// useState가 return한 배열의 첫번째 원소: 현재상태
const number = numberState[0];
// Setter 함수
const setNumber = numberState[1];
```

## 함수형 업데이트

업데이트 하고 싶은 새로운 값을 Setter 함수의 parameter로 넣어주는 대신 기존 값을 어떻게 업데이트 할 지에 대한 함수를 등록하는 방식으로도 값을 업데이트 할 수 있다.

```js
/* Counter.js */

function Counter() {
  //...

  const onIncrease = () => {
    // prevNumber를 parameter로 받아서 1 증가시킨 값을 반환하는 함수
    setNumber(prevNumber => prevNumber + 1);
  }

  const onDecrease = () => {
    // prevNumber를 parameter로 받아서 1 감소시킨 값을 반환하는 함수
    setNumber(prevNumber => prevNumber - 1);
  }

  return (
    //...
  );
}
```
