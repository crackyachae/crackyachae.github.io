---
layout  : article
title   : 20. useReducer 를 사용하여 상태 업데이트 로직 분리하기
summary : 
date    : 2021-03-03 23:31:18 +0900
updated : 2021-03-04 14:35:39 +0900
tag     : draft
toc     : true
public  : true
parent  : [[/react/vlpt-react-1-basic]]
latex   : false
---
* TOC
{:toc}

> 이 글은 벨로퍼트와 함께하는 모던 React중 [20. useReducer 를 사용하여 상태 업데이트 로직 분리하기](https://react.vlpt.us/basic/20-useReducer.html)의 내용을 복습하기위해 핵심 내용을 요약 정리한 글입니다.
>
> * 제가 필요한 부분 위주로 확인하면서 정리하고 있어 글에 덜 작성된 부분이 있을 수 있습니다.
> * 글 작성 후 원문의 내용이 수정되거나 내용을 이해하기 위한 개인적인 설명이나 해석이 있을 수 있습니다. 되도록 원문을 참고해주시길 바랍니다.
> * 잘못된 부분이 있다면 댓글이나 그 외 편하신 방법으로 알려주시면 감사하겠습니다.

## useReducer 이해하기

지금까지 주요한 상태 업데이트 로직은 `App` 컴포넌트 내부에서 이루어졌다.

상태를 업데이트 할 때에는 `useState` 를 사용해서 새로운 상태를 설정해주었는데, `useReducer` 를 사용해 상태를 관리할 수도 있다.

특히, `useReducer`를 사용하면 컴포넌트의 상태 업데이트 로직을 컴포넌트에서 분리시킬 수 있다.

* 상태 업데이트 로직을 컴포넌트 바깥에 작성 할 수도 있고, 심지어 다른 파일에 작성 후 불러와서 사용 할 수도 있다.

`useReducer` Hook 함수를 사용해보기전에 우선 reducer 가 무엇인지 알아보자.

reducer 는 현재 상태와 액션 객체를 파라미터로 받아와서 새로운 상태를 반환해주는 함수이다.

```js
function reducer(state, action) {
  // 새로운 상태를 만드는 로직
  // const nextState = ...
  return nextState;
}
```

* reducer는 컴포넌트의 새로운 상태를 반환한다.
* 여기서 action 은 상태를 업데이트하기 위한 정보를 가진다.
    * 주로 type 값을 지닌 객체 형태로,
    * type 값을 대문자와 _로 구성하는 관습이 존재하기도 하지만,
    * 반드시 따라야 할 규칙이 있는 것은 아니다.

예를 들어 action은 다음과 같이 작성할 수 있다.

```js
// 카운터에 1을 더하는 액션
{
  type: 'INCREMENT'
}
// 카운터에 1을 빼는 액션
{
  type: 'DECREMENT'
}
// input 값을 바꾸는 액션
{
  type: 'CHANGE_INPUT',
  key: 'email',
  value: 'tester@react.com'
}
// 새 할 일을 등록하는 액션
{
  type: 'ADD_TODO',
  todo: {
    id: 1,
    text: 'useReducer 배우기',
    done: false,
  }
}
```

다음으로 `useReducer` 의 사용법을 알아보자. `useReducer` 의 사용법은 다음과 같다.

```js
const [state, dispatch] = useReducer(reducer, initialState);
```

* `state` 는 우리가 앞으로 컴포넌트에서 사용 할 수 있는 상태를 가르키고,
* `dispatch` 는 액션을 발생시키는 함수라고 이해하면 된다.
    * 이 함수는 다음과 같이 사용한다: `dispatch({ type: 'INCREMENT' }).`
* `useReducer` 에 넣는 첫번째 파라미터는 reducer 함수이고,
* 두번째 파라미터는 초기 상태이다.

그러면 우리가 `useState` 를 처음 배울 때 만들었던 `Counter.js` 컴포넌트를 `useReducer` 를 사용해 바꿔보자.

```js
/* Counter.js */
/* use useState */

import React, { useState } from 'react';

function Counter() {
  const [number, setNumber] = useState(0);

  const onIncrease = () => {
    setNumber(prevNumber => prevNumber + 1);
  };

  const onDecrease = () => {
    setNumber(prevNumber => prevNumber - 1);
  };

  return (
    <div>
      <h1>{number}</h1>
      <button onClick={onIncrease}>+1</button>
      <button onClick={onDecrease}>-1</button>
    </div>
  );
}

/* use useReducer */

import React, { useReducer } from 'react';

// reducer 함수를 먼저 선언
function reducer(state, action) {
  // dispatch의 인자로 넣은 객체의 type 값을 받아옴
  switch (action.type) {
    case 'INCREMENT':
      return state + 1;
    case 'DECREMENT':
      return state - 1;
    default:
      return state;
  }
}

function Counter() {
  // useReducer 사용.
  // state는 number, 초기값은 0인 것은 useState와 동일
  // setState 함수를 dispatch와 reducer를 이용해 세분화시킨 것으로 이해할 수 있을 것 같다.
  const [number, dispatch] = useReducer(reducer, 0);

  const onIncrease = () => {
    // action의 type을 INCREMENT로 지정
    dispatch({ type: 'INCREMENT' });
  };

  const onDecrease = () => {
    // action의 type을 DECREMENT로 지정
    dispatch({ type: 'DECREMENT' });
  };

  return (
    <div>
      <h1>{number}</h1>
      <button onClick={onIncrease}>+1</button>
      <button onClick={onDecrease}>-1</button>
    </div>
  );
}
```

## App 컴포넌트를 useReducer 로 구현하기

이제 `App` 컴포넌트에 있던 상태 업데이트 로직들을 `useState` 가 아닌 `useReducer` 를 사용하여 구현해보자.

우선, `App` 에서 사용 할 초기 상태를 컴포넌트 바깥으로 분리해주고, `App` 내부의 로직들을 모두 제거한다.

```js
/* App.js */

/* before */

function countActiveUsers(users) { /* ... */ }

function App() {
  const [inputs, setInputs] = useState({
    username: '',
    email: ''
  });

  // ...

  const [users, setUsers] = useState([
    {
      id: 1,
      username: 'velopert',
      email: 'public.velopert@gmail.com'
    },
    {
      id: 2,
      username: 'tester',
      email: 'tester@example.com'
    },
    {
      id: 3,
      username: 'liz',
      email: 'liz@example.com'
    }
  ]);

  // ...

  return (
    <>
      <CreateUser { /* ... */ } />
      <UserList { /* ... */ } />
      <div>활성사용자 수 : 0</div>
    </>
  );
}


/* useReducer */

function countActiveUsers(users) { /* ... */ }

// 초기 상태를 컴포넌트 바깥으로 분리
// inputs와 users를 하나의 객체로 관리한다.
const initialState = {
  inputs: {
    username: '',
    email: ''
  },
  users: [
    {
      id: 1,
      username: 'velopert',
      email: 'public.velopert@gmail.com',
      active: true
    },
    {
      id: 2,
      username: 'tester',
      email: 'tester@example.com',
      active: false
    },
    {
      id: 3,
      username: 'liz',
      email: 'liz@example.com',
      active: false
    }
  ]
};

function App() {
  // App 내부의 로직 제거
  return (
    <>
      <CreateUser />
      <UserList users={[]} />
      <div>활성사용자 수 : 0</div>
    </>
  );
}
```

먼저, `reducer` 함수의 틀만 만들어주고, `useReducer` 를 컴포넌트에서 사용하도록 수정한다.

```js
/* App.js */

// useReducer를 import
import React, { useRef, useReducer, useMemo, useCallback } from 'react';

function countActiveUsers(users) { /* ... */ }

// 초기 상태 객체
const initialState = { /* ... */ };

// reducer snippet 먼저 작성
function reducer(state, action) {
  return state;
}

function App() {
  // useReducer 사용
  const [state, dispatch] = useReducer(reducer, initialState);
  return ( /* ... */ );
}
```

다음으로, state 에서 필요한 값들을 비구조화 할당 문법을 사용하여 추출하여 각 컴포넌트에게 전달한다.

```js
/* App.js */

function countActiveUsers(users) { /* ... */ } 

const initialState = { /* ... */ } 

function reducer(state, action) {
  return state;
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  // state로 부터 users를 비구조화 할당
  const { users } = state;
  // state의 inputs로 부터 usernema과 email을 비구조화 할당
  const { username, email } = state.inputs;

  return (
    <>
      { /* 위에서 작성한 항목들을 props로 추가 */ }
      <CreateUser username={username} email={email} />
      <UserList users={users} />
      <div>활성사용자 수 : 0</div>
    </>
  );
}
```

이제 `onChange` 부터 구현해보자.

```js
/* App.js */

function countActiveUsers(users) { /* ... */ } 

const initialState = {
  inputs: {
    username: '',
    email: ''
  },
  users: [ /* ... */ ]
};

// reducer 구현
function reducer(state, action) {
  switch (action.type) {
    // onChange안의 action.type
    case 'CHANGE_INPUT':
      return {
        // state의 
        ...state,
        // inputs 값 중
        inputs: {
          ...state.inputs,
          // action의 name으로부터 받아온 값과 동일한 key를 가진 항목(e.g., usename or email)의 값을
          // action의 value로부터 받아온 값으로 수정
          [action.name]: action.value
        }
      };
    default:
      return state;
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  // ...

  const onChange = useCallback(e => {
    const { name, value } = e.target;
    dispatch({
      type: 'CHANGE_INPUT',
      // reducer로 <input> 요소의 name과 value값을 전달
      // reducer에서 action.{key}로 접근 가능하다.
      name,
      value
    });
  }, []);

  return (
    <>
      <CreateUser username={username} email={email} onChange={onChange} /> { /* onChage 추가 */ }
      <UserList users={users} />
      <div>활성사용자 수 : 0</div>
    </>
  );
}
```

* `CHANGE_INPUT` 이라는 액션 객체를 사용하여 `inputs` 상태를 업데이트해주었다.
* reducer 함수에서 새로운 상태를 만들 때에는 불변성을 지켜주어야 하기 때문에 spread 연산자를 사용한다.

다음으로 `onCreate` 를 만들어보자.

```js
/* App.js */

function countActiveUsers(users) { /* ... */ } 

const initialState = { /* ... */ };

function reducer(state, action) {
  switch (action.type) {
    case 'CHANGE_INPUT':
      return { /* ... */ };
    case 'CREATE_USER':
      return {
        // input은 초기값으로 지정 (username, email 모두 공백)
        inputs: initialState.inputs,
        // users는 현재 상태에 action의 user로 받아온 값을 추가한다.
        users: state.users.concat(action.user)
      };
    default:
      return state;
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const nextId = useRef(4); // id 관리를 위한 useRef 추가

  // ...

  const onChange = useCallback(e => { /* ... */ }, []);

  const onCreate = useCallback(() => {
    dispatch({
      type: 'CREATE_USER',
      // 새로운 user 객체를 생성해 reducer로 전달
      user: {
        id: nextId.current,
        username,
        email
      }
    });
    nextId.current += 1;
  }, [username, email]);

  return (
    <>
      <CreateUser
        username={username}
        email={email}
        onChange={onChange}
        onCreate={onCreate} { /* onCreate 추가 */ } 
      />
      <UserList users={users} />
      <div>활성사용자 수 : 0</div>
    </>
  );
}
```

이제 `onToggle` 과 `onRemove` 도 구현해보자.

```js
/* App.js */

function countActiveUsers(users) { /* ... */ }

const initialState = { /* ... */ };

function reducer(state, action) {
  switch (action.type) {
    case 'CHANGE_INPUT':
      return { /* ... */ };
    case 'CREATE_USER':
      return { /* ... */ };
    case 'TOGGLE_USER':
      return {
        // state의 
        ...state,
        // users의 각 user에 대해서
        // user의 id가 action으로 받아온 id와 같으면 active 상태를 반대로 변경
        users: state.users.map(user =>
          user.id === action.id ? { ...user, active: !user.active } : user
        )
      };
    case 'REMOVE_USER':
      return {
        // state의 
        ...state,
        // users의 각 user중 action으로 받아온 id를 갖지 않는 user만 반환해서
        // users를 업데이트
        users: state.users.filter(user => user.id !== action.id)
      };
    default:
      return state;
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  // ...

  const onChange = useCallback(e => { /* ... */ }, []);
  const onCreate = useCallback(e => { /* ... */ }, [username, email]);

  const onToggle = useCallback(id => {
    dispatch({
      type: 'TOGGLE_USER',
      // toggle된 대상의 id를 받아와서 reducer로 전달
      // users의 각 원소를 받아 생성한 User 컴포넌트에서 본인의 id 값을 파라미터로 onToggle을 실행한다.
      id
    });
  }, []);

  const onRemove = useCallback(id => {
    dispatch({
      type: 'REMOVE_USER',
      // remove된 대상의 id를 받아와서 reducer로 전달
      // onToggle과 동일한 방식으로 User 컴포넌트 안에서 실행.
      id
    });
  }, []);

  return (
    <>
      <CreateUser { /* ... */ } />
      <UserList users={users} onToggle={onToggle} onRemove={onRemove} /> { /* onToggle과 onRemove 추가 */ }
      <div>활성사용자 수 : 0</div>
    </>
  );
}
```

마지막으로 활성 사용자수 구하는것을 구현해보자. 사실 이 부분은 코드가 바뀌지 않는다.

```js
/* App.js */

function countActiveUsers(users) {
  console.log('활성 사용자 수를 세는중...');
  return users.filter(user => user.active).length;
}

const initialState = { /* ... */ };

function reducer(state, action) { /* ... */ }

function App() {
  // ...

  const count = useMemo(() => countActiveUsers(users), [users]);
  return (
    <>
      { /* ... */ }
      <div>활성사용자 수 : {count}</div>
    </>
  );
}
```

## useReducer vs useState - 뭐 쓸까?

어떨 때 `useReducer` 를 쓰고 어떨 때 `useState` 를 써야 할까? 일단, 정해진 답은 없다. 둘 다 상황에 따라 불편할때도 있고 편할 때도 있다.

컴포넌트에서 관리하는 값이 딱 하나고, 그 값이 단순한 숫자, 문자열 또는 boolean 값이라면 확실히 `useState` 로 관리하는게 편할 것이다.

```js
const [value, setValue] = useState(true);
```

하지만, 컴포넌트에서 관리하는 값이 여러개가 되어서 상태의 구조가 복잡해진다면 `useReducer로` 관리하는 것이 편할 수도 있다.

결국, 스스로가 `useState`, `useReducer` 를 자주 사용해보고 맘에드는 방식을 선택해야한다.

예를 들어 setter 를 한 함수에서 여러번 사용해야 하는 일이 발생한다면

```js
setUsers(users => users.concat(user));
setInputs({
  username: '',
  email: ''
});
```

`useReducer` 를 쓸지 고민하기 시작한다. `useReducer` 를 썼을때 편해질 것 같으면 `useReducer` 를 쓰고, 그럴 것같지 않으면 `useState` 를 유지한다.

## 참고

`[action.name]` 관련

* https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer
* https://stackoverflow.com/questions/6500573/dynamic-keys-for-object-literals-in-javascript
