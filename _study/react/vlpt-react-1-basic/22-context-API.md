---
layout  : article
title   : 22. Context API 를 사용한 전역 값 관리
summary : 
date    : 2021-03-28 00:57:50 +0900
updated : 2021-03-28 16:40:57 +0900
tag     : 
toc     : true
public  : true
parent  : [[/react/vlpt-react-1-basic]]
latex   : false
---
* TOC
{:toc}

> 이 글은 벨로퍼트와 함께하는 모던 React중 [22. Context API 를 사용한 전역 값 관리](https://react.vlpt.us/basic/22-context-dispatch.html)의 내용을 복습하기위해 핵심 내용을 요약 정리한 글입니다.
>
> * 제가 필요한 부분 위주로 확인하면서 정리하고 있어 글에 덜 작성된 부분이 있을 수 있습니다.
> * 글 작성 후 원문의 내용이 수정되거나 내용을 이해하기 위한 개인적인 설명이나 해석이 있을 수 있습니다. 되도록 원문을 참고해주시길 바랍니다.
> * 잘못된 부분이 있다면 댓글이나 그 외 편하신 방법으로 알려주시면 감사하겠습니다.

{% raw %}

현재 만들고 있는 프로젝트를 봐보자.

* App 컴포넌트에 `onToggle`, `onRemove` 가 구현이 되어있고 이 함수들은 `UserList` 컴포넌트를 거쳐서 각 `User` 컴포넌트들에게 전달된다.
* 여기서 `UserList` 컴포넌트는 `onToggle` 과 `onRemove` 를 전달하기 위한 중간 다리역할로 쓰이고 해당 함수들을 직접 사용하지도 않는다.

```js
/* UserList.js */

function UserList({ users, onRemove, onToggle }) {
  return (
    <div>
      {users.map(user => (
        <User
          user={user}
          key={user.id}
          onRemove={onRemove}
          onToggle={onToggle}
        />
      ))}
    </div>
  );
}
```

리액트로 개발을 하다보면 이처럼 함수를 특정 컴포넌트를 거쳐서 원하는 컴포넌트에게 전달하는 작업이 자주 발생 할 수 있는데, 만약 거쳐야 하는 컴포넌트가 3~4개 이상으로 많아진다면 매우 번거로울 것이다.

리액트의 Context API 와 이전 섹션에서 배웠던 dispatch 를 함께 사용하면 이런 복잡한 구조를 해결 할 수 있다.

리액트의 Context API 를 사용하면, 프로젝트 안에서 전역적으로 사용 할 수 있는 "값"을 관리 할 수 있다. 여기서 "값"은 꼭 "상태"를 가르키지 않아도 된다.

* 이 값은 함수일수도 있고,
* 어떤 외부 라이브러리 인스턴스일수도 있고
* 심지어 DOM 일 수도 있다.

물론, Context API 를 사용해서 프로젝트의 상태를 전역적으로 관리 할 수도 있다. 이에 대해서는 나중에 더 자세히 알아볼 예정이다.

우선, Context API 를 사용해여 새로운 Context 를 만드는 방법을 알아보자.

Context 를 만들 땐 `React.createContext()` 라는 함수를 사용한다.

```jsx
// UserDispatch라는 Context를 생성
// 기본값은 null
const UserDispatch = React.createContext(null);
```

`createContext` 의 파라미터에는 Context 의 기본값을 설정할 수 있다. 이 값은 Context의 값을 따로 지정하지 않고 사용할 때 기본값으로 사용된다.

Context 안에는 Provider 라는 컴포넌트가 들어있는데 이 컴포넌트를 통하여 Context 의 값을 정할 수 있다. Context의 값을 정하려면 이 컴포넌트를 사용할 때, `value` 라는 값을 설정해주면 된다.

```jsx
// UserDispatch Context의 값을
// UserDispatch.Provider 컴포넌트를 이용해 설정
<UserDispatch.Provider value={dispatch}>...</UserDispatch.Provider>
```

이렇게 설정해주고 나면 Provider로 감싼 컴포넌트에서는 어디서든 Context 의 값을 다른 곳에서 바로 조회해서 사용 할 수 있다. 조회하는 방법은 잠시 후에 알아본다.

우선은 App 컴포넌트에서 Context 를 만들고, 사용하고, 내보내보자.

```jsx
/* App.js */

// ...

function countActiveUsers(users) { /* ... */ }

const initialState = { /* ... */ };

function reducer(state, action) { /* ... */ }

// Context를 만들어 UserDispatch 라는 이름으로 내보낸다.
export const UserDispatch = React.createContext(null);

function App() {

  // ...

  const onCreate = useCallback(() => { /* ... */ }, [username, email, onReset]);

  const onToggle = useCallback(id => { /* ... */ }, []);

  const onRemove = useCallback(id => { /* ... */ }, []);

  const count = useMemo(() => countActiveUsers(users), [users]);

  return (
    { /* UserDispatch의 Provider 컴포넌트로 기존의 컴포넌트들을 감싸준다. */ }
    <UserDispatch.Provider value={dispatch}>
      <CreateUser
        username={username}
        email={email}
        onChange={onChange}
        onCreate={onCreate}
      />
      <UserList users={users} onToggle={onToggle} onRemove={onRemove} />
      <div>활성사용자 수 : {count}</div>
    </UserDispatch.Provider>
  );
}

export default App;
```

지금 작성한 것은 UserDispatch 라는 Context 를 만들어 어디서든지 `dispatch` 를 꺼내 쓸 수 있도록 준비를 한 것이다.

UserDispatch 를 만들 때 다음과 같이 내보내주는 작업을 했는데

```jsx
export const UserDispatch = React.createContext(null);
```

이러면 UserDispatch 를 원할 때 다음과 같이 불러와서 사용 할 수 있다.

```jsx
import { UserDispatch } from './App';
```

Context 를 다 만들었으면, App 에서 `onToggle` 과 `onRemove` 를 지우고, `UserList` 에게 props를 전달하는것도 지운다.

```jsx
/* App.js */

// ...

function countActiveUsers(users) { /* ... */ }

const initialState = { /* ... */ };

function reducer(state, action) { /* ... */ }

// UserDispatch
export const UserDispatch = React.createContext(null);

function App() {

  // ...

  const onCreate = useCallback(() => { /* ... */ }, [username, email, reset]);
  
  // onToggle, onRemove 제거
  // const onToggle = useCallback(id => { /* ... */ }, []);
  // const onRemove = useCallback(id => { /* ... */ }, []);

  const count = useMemo(() => countActiveUsers(users), [users]);

  return (
    <UserDispatch.Provider value={dispatch}>
      <CreateUser
        username={username}
        email={email}
        onChange={onChange}
        onCreate={onCreate}
      />
      <UserList users={users} /* props로 전달한 onToggle, onRemove 제거 */ />
      <div>활성사용자 수 : {count}</div>
    </UserDispatch.Provider>
  );
}

export default App;
```

UserList 컴포넌트에서도 `onToggle` 과 `onRemove` 와 관련된 코드를 지운다.

```jsx
/* UserList.js */

import React from 'react';

const User = React.memo(function User({ user /*, onRemove, onToggle 제거 */ }) {
  return (
    <div>
      <b
        style={{ /* ... */ }}
        // onToggle 함수를 제거
        // onClick={() => onToggle(user.id)}
        onClick={() => {}}
      >
        {user.username}
      </b>

      { /* ... */ }

      <button
        // onRemove 함수를 제거
        // onClick={() => onRemove(user.id)}
        onClick={() => {}}
      >
        삭제
      </button>
    </div>
  );
});

function UserList({ users /*, onRemove, onToggle 제거 */ }) {
  return (
    <div>
      {users.map(user => (
        <User user={user} key={user.id} /*, onRemove, onToggle 제거 */ />
      ))}
    </div>
  );
}

export default React.memo(UserList);
```

이제, User 컴포넌트에서 바로 `dispatch` 를 사용해보자. 이를 위해서 `useContext` 라는 Hook 을 사용해서 우리가 만든 UserDispatch Context 를 조회해야한다.

```js
/* UserList.js */

// useContext 사용
import React, { useContext } from 'react';
// UserDispatch를 가져옴
import { UserDispatch } from './App';

const User = React.memo(function User({ user }) {
  // useContext로 UserDispatch Context를 조회
  const dispatch = useContext(UserDispatch);

  return (
    <div>
      <b
        style={{ /* ... */ }}
        onClick={() => {
          // 기존의 onToggle 에서 user.id를 파라미터로 넘기는 대신
          // dispatch 의 action의 id 값으로 user.id를 전달한다.
          dispatch({ type: 'TOGGLE_USER', id: user.id });
        }}
      >
        {user.username}
      </b>

      { /* ... */ }

      <button
        onClick={() => {
          // 기존의 onRemove 에서 user.id를 파라미터로 넘기는 대신
          // dispatch 의 action의 id 값으로 user.id를 전달한다.
          dispatch({ type: 'REMOVE_USER', id: user.id });
        }}
      >
        삭제
      </button>
    </div>
  );
});

function UserList({ users }) {
  return (
    <div>
      {users.map(user => (
        <User user={user} key={user.id} />
      ))}
    </div>
  );
}

export default React.memo(UserList);
```

CreateUser 컴포넌트에서도 `dispatch` 를 직접 사용하도록 구현을 해보자.

* `useInputs`, `nextId` 모두 id 생성에 관여하기 때문에 `onCreate`와 같이 CreateUser 에서 사용할 수 있도록 옮긴다.
* 이 둘을 옮기면서 App 컴포넌트에서 더 이상 사용하지 않는 `useRef`와 `useCallback`는 import 하지 않도록 수정한다.

```jsx
/* App.js */

// useRef, useCallback 제거
import React, { /* useRef, */ useReducer, useMemo /*, useCallback */ } from 'react';
import UserList from './UserList';
import CreateUser from './CreateUser';
// useInputs를 CreateUser로 옮긴다.
// import useInputs from './hooks/useInputs';

function countActiveUsers(users) { /* ... */ }

const initialState = { /* ... */ };

function reducer(state, action) { /* ... */ }

// UserDispatch
export const UserDispatch = React.createContext(null);

function App() {

  // useInputs를 CreateUser로 옮긴다.
  /*
   * const [{ username, email }, onChange, reset] = useInputs({
   *   username: '',
   *   email: ''
   * });
   */
  const [state, dispatch] = useReducer(reducer, initialState);
  // nextId도 CreateUser로 옮긴다.
  // const nextId = useRef(4);

  const { users } = state;


  // onCreate 제거
  // const onCreate = useCallback(() => { /* ... */ }, [username, email, reset]);

  const count = useMemo(() => countActiveUsers(users), [users]);

  return (
    <UserDispatch.Provider value={dispatch}>
      <CreateUser
        // 모든 props를 제거한다.
      />
      <UserList users={users}/>
      <div>활성사용자 수 : {count}</div>
    </UserDispatch.Provider>
  );
}

export default App;
```

CreateUser 컴포넌트에서 `onCreate`와 관련된 코드가 `dispatch`를 직접 참조하도록 수정한다.

```jsx
/* CreateUser.js */

import React, { useRef, useContext } from 'react';
import useInputs from './hooks/useInputs';
import { UserDispatch } from './App';

// username, email, onChange는 useInputs 째로 옮겨왔고
// onCraete는 dispatch를 직접 참조하기 때문에 props로 아무것도 전달받지 않는다.
const CreateUser = () => {

  // App 컴포넌트에서 옮겨온 useInputs와 nextId
  const [{ username, email }, onChange, reset] = useInputs({
    username: '',
    email: ''
  });

  const nextId = useRef(4);

  // useContext로 UserDispatch Context를 조회
  const dispatch = useContext(UserDispatch);

  return (
    <div>
      <input /* ... */ />
      <input /* ... */ />
      <button
        onClick={() => {
          dispatch({
            type: 'CREATE_USER',
            user: {
                id: nextId.current,
                username,
                email
            }
          reset();
          nextId.current += 1;            
          })
        }}
      >
        등록
      </button>
    </div>
  );
}
```

## 정리

Constext API 를 활용하면 `useState` 를 사용하는 것과 `useReducer` 를 사용하는 것의 큰 차이가 생긴다. `useReducer`를 사용하면 `dispatch` 를 Context API 를 이용해 전역적으로 사용 할 수 있게 되고 컴포넌트에게 함수를 전달해줘야 하는 상황에서 코드의 구조를 훨씬 깔끔하게 유지할 수 있다.

깊은 곳에 위치하는 컴포넌트에 여러 컴포넌트를 거쳐서 함수를 전달해야 하는 상황에서는 이렇게 Context API 를 사용하면 된다.

{% endraw %}
