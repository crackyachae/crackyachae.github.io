---
layout  : article
title   : 21. 커스텀 Hooks 만들기
summary : 
date    : 2021-03-27 20:38:16 +0900
updated : 2021-03-28 00:55:24 +0900
tag     : draft
toc     : true
public  : true
parent  : [[/react/vlpt-react-1-basic]]
latex   : false
---
* TOC
{:toc}

{% raw %}

> 이 글은 벨로퍼트와 함께하는 모던 React중 [21. 커스텀 Hooks 만들기](https://react.vlpt.us/basic/21-custom-hook.html)의 내용을 복습하기위해 핵심 내용을 요약 정리한 글입니다.
>
> * 제가 필요한 부분 위주로 확인하면서 정리하고 있어 글에 덜 작성된 부분이 있을 수 있습니다.
> * 글 작성 후 원문의 내용이 수정되거나 내용을 이해하기 위한 개인적인 설명이나 해석이 있을 수 있습니다. 되도록 원문을 참고해주시길 바랍니다.
> * 잘못된 부분이 있다면 댓글이나 그 외 편하신 방법으로 알려주시면 감사하겠습니다.

컴포넌트를 만들다보면, 로직이 반복되는 경우가 자주 있다. 예를 들어 input 을 관리하는 코드는 매 번 비슷한 코드가 반복된다. 이번에는 커스텀 Hooks 를 만들어서 반복되는 로직을 쉽게 재사용하는 방법을 알아보자.

우선 useInputs.js라는 파일을 만든다.

* 커스텀 Hooks 를 만들 때는 보통 `use` 라는 키워드로 시작하는 파일을 만들고 그 안에 함수를 작성한다.
* 만든 커스텀 Hooks들은 `src` 디렉터리에 `hooks` 라는 디렉터리를 만들어 따로 관리하는 경우가 많다.

커스텀 Hooks 를 만드는 방법은 굉장히 간단하다. 만든 커스텀 Hooks 파일 안에서 `useState`, `useEffect`, `useReducer`, `useCallback` 과 같은 Hooks 를 사용하여 원하는 기능을 구현해주고, 컴포넌트에서 사용하고 싶은 값들을 반환해주면 된다.

```js
/* useInputs.js */

import { useState, useCallback } from 'react';

function useInputs(initialForm) {
  // useState를 이용해 form을 관리
  // 이전의 inputs, setInputs와 동일한 역할이다.
  const [form, setForm] = useState(initialForm);

  // onChange 구현
  // 이전과 동일하게 target의 name과 value를 받아와서 form을 업데이트 한다.
  const onChange = useCallback(e => {
    const { name, value } = e.target;
    setForm(form => ({ ...form, [name]: value }));
  }, []);

  // reset 함수. form의 값을 초기값으로 돌린다.
  const reset = useCallback(() => setForm(initialForm), [initialForm]);
  return [form, onChange, reset];
}

export default useInputs;
```

useInputs.js를 `useReducer`를 이용해서 만들수도 있다.

```js
/* useInputs.js */

import { useReducer, useCallback } from 'react';

// reducer 구현
function reducer(state, action) {
  switch (action.type) {
    // onChange용 action
    case 'CHANGE':
      return {
        ...state,
        [action.name]: action.value
      };
    // 값 초기화를 위한 action
    case 'RESET':
      return Object.keys(state).reduce((acc, current) => {
        acc[current] = '';
        return acc;
      }, {});
    default:
      return state;
  }
}

function useInputs(initialForm) {
  const [form, dispatch] = useReducer(reducer, initialForm);
  // change
  const onChange = useCallback(e => {
    const { name, value } = e.target;
    dispatch({ type: 'CHANGE', name, value });
  }, []);
  const reset = useCallback(() => dispatch({ type: 'RESET' }), []);
  return [form, onChange, reset];
}

export default useInputs;
```

이제 `useInputs` Hook 을 App.js 에서 사용해보자.

먼저 `useReducer` 쪽에서 사용하는 `inputs` 를 없애고 이에 관련된 작업을 `useInputs` 로 대체해주어야 한다. 새로운 항목을 추가 할 때 `input` 값을 초기화해야 하므로 데이터 등록 후 `reset()` 을 호출한다.

```js
/* App.js */

import React, { useRef, useReducer, useMemo, useCallback } from 'react';
// ...
// useInputs를 import
import useInputs from './hooks/useInputs';

function countActiveUsers(users) { /* ... */ }

const initialState = {
  // inputs 제거
  /* 
   * inputs: {
   * username: '',
   * email: ''
   * },
   */
  users: [ /* ... */ ]
};

function reducer(state, action) {
  switch (action.type) {
  // CHANGE_INPUT 제거
  /*
   * case 'CHANGE_INPUT':
   * return {
   *    ...state,
   *    inputs: {
   *      ...state.inputs,
   *      [action.name]: action.value
   *    }
   *  };
   * default:
   *   return state;
   */
    case 'CREATE_USER':
      return {
        // initialState에서 inputs를 제거했으므로 아래의 코드를 삭제한다.
        // inputs 초기화는 useInputs에서 가져온 reset 함수로 대체한다.
        // inputs: initialState.inputs,
        users: state.users.concat(action.user)
      };
    case 'TOGGLE_USER':
      return { /* ... */ };
    case 'REMOVE_USER':
      return { /* ... */ };
    default:
      return state;
  }
}

function App() {
  // useInputs에서 inputs, onChange, reset을 받아온다.
  // inputs는 username, email로 구조 분해 할당해서 받아온다.
  const [{ username, email }, onChange, reset] = useInputs({
    username: '',
    email: ''
  });

  // ...

  // initialState에서 inputs를 제거했으므로 아래의 코드를 삭제한다.
  // username, email은 위의 useInputs에서 받아온다.
  // const { username, email } = state.inputs;

  // onChange 제거
  /*
   * const onChange = useCallback(e => {
   *   const { name, value } = e.target;
   *   dispatch({
   *     type: 'CHANGE_INPUT',
   *     name,
   *     value
   *   });
   * }, []);
   */

  const onCreate = useCallback(() => {
    dispatch({ /* ... */ });
    reset(); // 생성을 끝내면 입력 form을 초기화한다.
    nextId.current += 1;
  }, [username, email, reset]);

  const onToggle = useCallback(id => { /* ... */ }, []);
  const onRemove = useCallback(id => { /* ... */ }, []);

  // ...

  return ( /* ... */ );
}

export default App;
```

이렇게 커스텀 Hook 을 만들어 컴포넌트의 로직을 분리시키고 필요 할 때 쉽게 재사용 할 수도 있다.

## 참고

> 읽어보고 정리

useInput.js에서 궁금한게 있습니다.

setForm(form => ({ ...form, [name]: value }));
이 코드에서...
form => 저는 이것을 arrow function으로 생각해서 {{...form, [name]...로 생각했는데, 왜 괄호를 (로 감싸는건가요?

https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Functions/%EC%95%A0%EB%A1%9C%EC%9A%B0_%ED%8E%91%EC%85%98

위 싸이트에 답이 있네요(저도 왜그런가 몰라서 찾아봤어요..)

// 객체 리터럴 표현을 반환하기 위해서는 함수 본문(body)을 괄호 속에 넣음:
params => ({foo: bar})

괄호를 안쓰면 인터프리터에서 함수 선언부로 인식해서 그렇습니다.
객체 반환으로 명시하기위해선 괄호를 써야합니다.

원래 함수형 업데이트를 할 때는 값을 리턴 해줘야 하는 건가요?

{% endraw %}
