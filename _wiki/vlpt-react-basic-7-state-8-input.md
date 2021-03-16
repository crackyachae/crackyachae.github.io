---
layout  : wiki
title   : 7. useState 를 통해 컴포넌트에서 바뀌는 값 관리하기 / 8-9. (여러개의) input 상태 관리하기
summary : 
date    : 2021-01-01 21:02:52 +0900
updated : 2021-01-01 21:36:49 +0900
tag     : rough
toc     : true
public  : true
parent  : [[vlpt-react-basic]]
latex   : false
---
* TOC
{:toc}

> 이 글은 벨로퍼트와 함께하는 모던 React중 [7. useState 를 통해 컴포넌트에서 바뀌는 값 관리하기](https://react.vlpt.us/basic/07-useState.html), [8. input 상태 관리하기](https://react.vlpt.us/basic/08-manage-input.html), [9. 여러개의 input 상태 관리하기](https://react.vlpt.us/basic/09-multiple-inputs.html)의 내용을 복습하기위해 핵심 내용을 요약 정리한 글입니다.
>
> 내용을 이해하기 위한 개인적인 설명이나 해석이 있을 수 있기 때문에 되도록 원문을 참고해주시길 바랍니다.
> 잘못된 부분이 있다면 댓글이나 그 외 편하신 방법으로 알려주시면 감사하겠습니다.

## 7. useState 를 통해 컴포넌트에서 바뀌는 값 관리하기

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

### 이벤트 설정

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
  + 이렇게 하면 렌더링되는 시점에서 함수가 호출되버린다.

```js
onClick={onIncrease()}
```

### 동적인 값 끼얹기, useState

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

+ `useState` 를 사용 할 때에는 상태의 기본값을 파라미터로 넣어서 호출한다.
+ `useState`를 호출하면 배열이 반환되는데,
  + 첫번째 원소는 현재 상태,
  + 두번째 원소는 Setter 함수이다.

이것도 비구조화 할당을 배열에 적용한 것으로 원래는 다음과 같이 작성한다.
```js
// useState는 함수고 0은 state의 기본값 
const numberState = useState(0);
// useState가 return한 배열의 첫번째 원소: 현재상태
const number = numberState[0];
// Setter 함수
const setNumber = numberState[1];
```

### 함수형 업데이트

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

## 8. input 상태 관리하기

사용자가 값을 입력하는 `input` 태그의 state 관리.

input 에 입력하는 값이 하단에 나타나게 하고, 초기화 버튼을 누르면 input 이 값이 비워지도록 구현을 해보자.

```js
/* InputSample.js */

function InputSample() {
  return (
    <div>
      <input />
      <button>초기화</button>
      <div>
        <b>값: </b>
      </div>
    </div>
  );
}
```

```js
/* App.js */

function App() {
  return (
    <InputSample />
  );
}
```

이를 위해 `input` 의 `onChange` 라는 이벤트를 사용한다. 

이벤트에 등록하는 함수에서는 이벤트 객체 `e` 를 파라미터로 받아와서 사용 할 수 있다. 
+ 이 객체의 `e.target` 은 이벤트가 발생한 DOM 인 input DOM 을 가르킨다.
+ 이 DOM 의 `value` 값, 즉 `e.target.value` 를 조회하면 현재 input 에 입력 되어있는 값이 무엇인지 알 수 있습니다.

```js
/* InputSample.js */

function InputSample() {
  // text의 기본값은 blank
  const [text, setText] = useState('');

  const onChange = (e) => {
    // text를 event target의 value 값으로 설정
    setText(e.target.value);
  };

  const onReset = () => {
    // text를 초기화: text를 다시 초기값 (blank)로 설정
    setText('');
  };

  return (
    <div>
      {/* input에 변화가 발생하면 onChange 함수를 실행해서 text를 업데이트 */}
      {/* input의 value가 text이므로 text가 업데이트 되면 바로 입력창에 변경사항이 반영된다 */}
      <input onChange={onChange} value={text}  />
      {/* 버튼을 누르면 onReset 함수를 실행해서 입력창을 초기화 */}
      <button onClick={onReset}>초기화</button>
      <div>
        <b>값: {text}</b>
      </div>
    </div>
  );
}
```

## 9. 여러개의 input 상태 관리하기

input 의 개수가 여러개가 됐을때는, input 에 name 을 설정하고 이벤트가 발생했을 때 이 값을 참조하는 것이 좋다.

더불어, `useState` 에서는 문자열이 아니라 객체 형태로 state를 관리해주어야 한다.

```js
/* InputSample.js */

function InputSample() {
  // inputs의 초기값: {name: '', nickname: ''}
  // inputs.name과 inputs.nickname 모두 공백
  const [inputs, setInputs] = useState({
    name: '',
    nickname: ''
  });

  // 비구조화 할당을 통해 값 추출
  const { name, nickname } = inputs; 

  const onChange = (e) => {
    // 우선 e.target 에서 name 과 value 를 추출
    // 이 때 name은 위에서 추출한 name이 아니라 input의 name property의 값이다.
    // 아래의 name과 헷갈리는 것을 막기 위해 input_name으로 수정.
    const { value, input_name } = e.target;
    setInputs({
      // 기존의 input 객체를 복사한 뒤
      ...inputs, 
      // inputs 객체에서 input_name 키를 가진 값을 value 로 설정
      // e.g., 이벤트가 첫 번째 input에서 발생했으면 input_name이 name이기 때문에
      // inputs중 name의 값을 value로 변경. 
        // name이 이미 inputs 안에 존재하는 값이라 새로운 key: value 값이 추가되는 것이 아니라 기존의 값을 변경
      // 변경된 값은 rendering 되면서 바로 반영된다.
      [input_name]: value 
    });
  };

  const onReset = () => {
    // inputs를 초기화: name과 nickname 값을 다시 초기값 (blank)로 설정
    setInputs({
      name: '',
      nickname: '',
    })
  };

  return (
    <div>
      <input name="name" placeholder="이름" onChange={onChange} value={name} />
      <input name="nickname" placeholder="닉네임" onChange={onChange} value={nickname}/>
      <button onClick={onReset}>초기화</button>
      <div>
        <b>값: </b>
        {name} ({nickname})
      </div>
    </div>
  );
}
```

+ React 에서 객체를 수정할 때는 `inputs[name] = value` 처럼 직접 수정하면 안된다.
+ 대신에, 새로운 객체를 만들어서 새로운 객체를 수정한 뒤, 이를 state로 사용해주어야 한다.
+ 만약에 기존 상태를 직접 수정하게 되면, 값을 바꿔도 리렌더링이 되지 않는다. 

### 참고 (-ing)
자바스크립트라는 언어의 메모리 구조 때문이라고 생각됩니다.
https://junwoo45.github.io/2019-11-04-memory_model/
배열같은경우, push 를 해도 해당 객체의 메모리 주소는 변하지 않습니다. 그래서 리액트가 객체의 변화를 식하지 못한다고 생각되네요. 그래서 기존 객체를 직접 수정하지 않고, 복사본을 만들어 새로운 객체를 할당하는게 아닐까요?

어떤 프로그래밍 언어 / 런타임이든지 "변경" 감지에 대한 패턴은 여러가지가 있습니다. 단순히 자바스크립트라서 불가능한 것 / 메모리 주소가 바뀌지 않아서 불가능한 것은 아닙니다.
리액트는 좀 더 단순하고 직관적인 방향으로 변경감지를 하고 싶었던 것 같으며, 다른 angular 혹은 vue와 다르게 setState 함수 혹은 useState의 setValue 인자 함수를 이용하여 변경감지를 합니다. 해당 함수가 호출되는 즉시 상태에 대한 변경이 일어낫다고 판단하는 것 같습니다.
번외로 vue나 angular는 내부적으로 프로퍼티에 getter setter를 사용하여 runtime proxy를 생성하여 해당 프로퍼티에 setter가 호출되면 변경이 되었다고 인식하는 형태로 되어있습니다.
* https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Functions/set
* https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy
* https://hyunseob.github.io/2016/08/17/javascript-proxy/