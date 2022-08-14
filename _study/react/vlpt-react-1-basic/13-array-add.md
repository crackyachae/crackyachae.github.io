---
layout  : article
title   : 13. 배열에 항목 추가하기
summary : 
date    : 2021-03-03 17:29:49 +0900
updated : 2021-03-04 21:14:32 +0900
tag     : draft
toc     : true
public  : true
parent  : [[/react/vlpt-react-1-basic]]
latex   : false
---
* TOC
{:toc}

> 이 글은 벨로퍼트와 함께하는 모던 React중 [13. 배열에 항목 추가하기](https://react.vlpt.us/basic/04-jsx.html)의 내용을 복습하기위해 핵심 내용을 요약 정리한 글입니다.
>
> * 제가 필요한 부분 위주로 확인하면서 정리하고 있어 글에 덜 작성된 부분이 있을 수 있습니다.
> * 글 작성 후 원문의 내용이 수정되거나 내용을 이해하기 위한 개인적인 설명이나 해석이 있을 수 있습니다. 되도록 원문을 참고해주시길 바랍니다.
> * 잘못된 부분이 있다면 댓글이나 그 외 편하신 방법으로 알려주시면 감사하겠습니다.

상태관리를 `CreateUser`가 아닌 부모 컴포넌트인 `App` 에서 한 뒤, input 의 값 및 이벤트로 등록할 함수들을 props 로 넘겨받아서 사용하도록 코드를 수정해보자.

우선 다음과 같이 `CreateUser` 컴포넌트를 생성해 `App` 에서 `UserList` 위에 렌더링한다.

```js
/* CreateUser.js */

function CreateUser({ username, email, onChange, onCreate }) {
  return (
    <div>
      <input
        name="username"
        placeholder="계정명"
        onChange={onChange}
        value={username}
      />
      <input
        name="email"
        placeholder="이메일"
        onChange={onChange}
        value={email}
      />
      <button onClick={onCreate}>등록</button>
    </div>
  );
}
```

```js
/* App.js */

import CreateUser from './CreateUser'; // CreateUser 컴포넌트 import

function App() {
  // ...
  return (
    <>
      <CreateUser /> {/* 위에서 만든 CreateUser 컴포넌트 */}
      <UserList users={users} />
    </>
  );
}

export default App;
```

CreateUser 컴포넌트에게 필요한 props 를 App 에서 준비한다.

* `username`, `email`
* `onChange`, `onCreate` 함수

8-9강에서 작성한 `InputSamples.js`와 유사하다.

```js
/* App.js */

function App() {
  // inputs: username, email을 하나의 state로 관리
  const [inputs, setInputs] = useState({
    username: '',
    email: ''
  });
  // username, email
  // 비구조화 할당을 통해 값 추출
  const { username, email } = inputs;
  // onChange
  const onChange = e => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value
    });
  };

  const users = [ /* ... */ ];
  const nextId = useRef(4);

  // onCreate
  const onCreate = () => {
    // 나중에 구현 할 배열에 항목 추가하는 로직
    // ...

    setInputs({
      username: '',
      email: ''
    });
    nextId.current += 1;
  };
  return (
    <>
      {/* Creater에 props로 넘겨줌 */}
      <CreateUser
        username={username}
        email={email}
        onChange={onChange}
        onCreate={onCreate}
      />
      <UserList users={users} />
    </>
  );
}
```

다음으로, `users` 도 `useState`를 사용하여 컴포넌트의 상태로 관리한다.

```js
/* App.js */

function App() {
  // ...

  // 기존에 상수로 선언한 users의 내용으로 state를 초기화
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

  return ( /* ... */);
}
```

이제 새로운 `user` 정보를 생성해서 `users` 배열에 변화를 줘 보자.

객체와 마찬가지로, 배열에 변화를 줄 때에는 불변성을 지켜주어야 한다. 그렇기 때문에, 배열의 `push`, `splice`, `sort` 등의 함수를 사용하면 안된다. 만약에 사용해야 한다면, 기존의 배열을 한번 복사하고 나서 사용해야한다.

두 가지 방법으로 불변성을 지키면서 배열에 새 항목을 추가할 수 있다.

첫 번째는 spread 연산자를 사용하는 것 이다.

```js
/* App.js */

function App() {
  // ...

  const onCreate = () => {
    const user = {
      id: nextId.current,
      username,
      email
    };
    setUsers([...users, user]); // spread 연산자로 users의 원소를 복사한 뒤 user를 추가

    //...
  };
  return ( /* ... */);
}
```

또 다른 방법은 `concat` 함수를 사용하는 것 이다. `concat` 함수는 기존의 배열을 수정하지 않고, 새로운 원소가 추가된 새로운 배열을 만든다.

```js
/* App.js */

function App() {
  // ...

  const onCreate = () => {
    const user = {
      id: nextId.current,
      username,
      email
    };
    setUsers(users.concat(user)); // users 배열에 user를 추가한 배열을 새로 반환

    //...
  };
  return ( /* ... */);
}
```
