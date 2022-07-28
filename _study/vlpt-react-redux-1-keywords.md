---
layout  : article
title   : 1. 리덕스에서 사용되는 키워드 숙지하기
summary : 
date    : 2022-07-28 22:31:26 +0900
updated : 2022-07-28 22:56:40 +0900
tag     : draft
toc     : true
public  : true
parent  : [[vlpt-react-redux]]
latex   : false
---
* TOC
{:toc}

> 이 글은 [벨로퍼트와 함께하는 모던 React](https://react.vlpt.us) 중 [1. 리덕스에서 사용되는 키워드 숙지하기](https://react.vlpt.us/redux/01-keywords.html)의 내용을 복습하기위해 핵심 내용을 요약 정리한 글입니다.
>
> * 제가 필요한 부분 위주로 확인하면서 정리하고 있어 글에 덜 작성된 부분이 있을 수 있습니다.
> * 글 작성 후 원문의 내용이 수정되거나 내용을 이해하기 위한 개인적인 설명이나 해석이 있을 수 있습니다. 되도록 원문을 참고해주시길 바랍니다.
> * 잘못된 부분이 있다면 댓글이나 그 외 편하신 방법으로 알려주시면 감사하겠습니다.

리덕스에서 사용하는 키워드들을 알아본다. 대부분은 리액트의 `useReducer`를 사용해볼 때 접해본 개념이기도 하다.

## 액션 (Action)

상태의 변화를 일으키는 주체. 액션을 "발생 시킨다"라고 표현한다. 다음과 같은 형식의 객체로 표현된다.

```js
{
  type: "TOGGLE_VALUE"
}
```

* `type` 필드는 필수
* 그 외의 값은 개발자가 자유롭게 넣을 수 있다.

```js
// example 1
{
  // 필수값
  type: "ADD_TODO",
  // 자유값
  data: {
    id: 0,
    text: "리덕스 배우기"
  }
}
```

```js
// example 2
{
  // 필수값
  type: "CHANGE_INPUT",
  // 자유값
  text: "안녕하세요"
}
```

## 액션 생성함수 (Action Creator)

액션을 만드는 함수. 매개변수를 받아와서 객체 형태인 액션을 반환.

```js
// data 매개변수를 받아와서
export function addTodo(data) {
  // data를 값으로 갖는 객체 형태의 액션을 반환
  return {
    type: "ADD_TODO",
    data
  };
}

// 화살표 함수로도 만들 수 있다.
export const changeInput = text => ({ 
  type: "CHANGE_INPUT",
  text
});
```

* 컴포넌트에서 더 쉽게 액션을 발생시키기 위함.
* 보통 하나의 모듈로 만들어서 다른 파일에서 불러와 사용햔다.

## 리듀서 (Reducer)

변화를 일으키는 함수. 상태(state)와 액션(action) 두 개의 매개변수를 받는다.

```js
function reducer(state, action) {
  // 상태 업데이트 로직
  return alteredState;
}
```

* 현재 상태와 전달 받은 액션으로 새로운 상태를 만들어 반환한다.
* `useReducer`를 사용할 때 작성하는 리듀서와 같은 형태를 갖는다.
* `default` 값 지정하는 방식이 `useReducer`와 다르다.
    * `useReducer`: 에러를 발생시키도록 처리 (e.g. `throw new Error('Unhandled Action')`)
    * Redux reducer: 기존 `state`를 그대로 반환하도록 처리

예시: 카운터를 위한 리듀서

```js
function counter(state, action) {
  // 액션의 타입에 따라서
  switch (action.type) {
    case 'INCREASE':
      // 다르게 변한 state 값을 반환
      return state + 1;
    case 'DECREASE':
      return state - 1;
    default:
      // 기존 값을 그대로 반환
      return state;
  }
}
```

여러 개의 리듀서를 만들고 이를 합쳐서 루트 리듀서(Root Reducer)를 만들 수 있다.

* 이 때 루트 리듀서를 구성하는 작은 단위의 리듀서는 서브 리듀서(Sub reducer)라고 한다.

## 스토어 (Store)

현재 앱의 상태 값과, 리듀서를 포함하는 곳. 한 애플리케이션에 하나의 스토어를 갖는다.

* 추가로 몇 가지 내장 함수들이 포함되어있다.

### 디스패치 (Dispatch)

스토어의 내장함수 중 하나로 액션을 발생시킨다.

* 액션을 매개변수로 전달 받는다. (e.g. `dispatch(action)`)
* 위처럼 액션을 호출하면 (전달 받은 액션을 처리하는 로직이 있는 경우) 스토어가 리듀서 함수를 실행시켜 새로운 상태를 만든다.

### 구독 (Subscribe)

또 다른 스토어의 내장함수.

* 함수를 매개변수로 전달 받아
* 디스패치로 액션이 실행될 때마다 전달해준 함수가 호출된다.

* 해당 함수를 직접 사용하기보다 react-redux 라ㅇ브러리에서 제공하는 `connect` 함수나 `useSelector` Hook을 사용해 리덕스 스토어의 상태를 구독한다.
