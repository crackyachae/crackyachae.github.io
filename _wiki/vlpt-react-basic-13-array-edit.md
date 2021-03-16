---
layout  : wiki
title   : 13. 배열에 항목 추가하기 / 14. 배열에 항목 제거하기 / 15. 배열에 항목 수정하기
summary : 
date    : 2021-03-03 17:29:49 +0900
updated : 2021-03-04 21:14:32 +0900
tag     : rough
toc     : true
public  : true
parent  : [[vlpt-react-basic]]
latex   : false
---
* TOC
{:toc}

> 이 글은 벨로퍼트와 함께하는 모던 React중 [13. 배열에 항목 추가하기](https://react.vlpt.us/basic/04-jsx.html), [14. 배열에 항목 제거하기](https://react.vlpt.us/basic/14-array-remove.html), [15. 배열에 항목 수정하기](https://react.vlpt.us/basic/15-array-modify.html)의 내용을 복습하기위해 핵심 내용을 요약 정리한 글입니다.
>
> 내용을 이해하기 위한 개인적인 설명이나 해석이 있을 수 있기 때문에 되도록 원문을 참고해주시길 바랍니다.
> 잘못된 부분이 있다면 댓글이나 그 외 편하신 방법으로 알려주시면 감사하겠습니다.

## 13. 배열에 항목 추가하기

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
+ `username`, `email`
+ `onChange`, `onCreate` 함수

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

## 14. 배열에 항목 제거하기

항목 제거 기능을 만들기에 앞서, `UserList` 에서 각 `User` 컴포넌트를 보여줄 때, 삭제 버튼을 함께 렌더링해주자.

`User` 컴포넌트에서는 `onRemove` 함수를 props 로 받아온 뒤 삭제 버튼이 클릭 될 때마다 `onRemove`를 호출한다. 
+ 아직 구현하지는 않았지만 `onRemove`는 "id 가 __인 객체를 삭제" 하는 역할을 하며,
+ 파라미터로 `user.id` 값을 전달한다. (i.e, 위의 __)
+ `onRemove` 함수는 `App`에서 `UserList`로 전달받아 이를 그대로 `User` 컴포넌트에게 전달한다.

```js
/* UserList.js */

function User({ user, onRemove }) {
  return (
    <div>
      <b>{user.username}</b> <span>({user.email})</span>
      <button onClick={() => onRemove(user.id)}>삭제</button> { /* 삭제버튼 생성 */ }
    </div>
  );
}

// 삭제 버튼에 들어갈 onRemove 함수를 App에서 받아와 User에 props로 전달
function UserList({ users, onRemove }) {
  return (
    <div>
      {users.map(user => (
        <User user={user} key={user.id} onRemove={onRemove} />
      ))}
    </div>
  );
}
```

이제, `onRemove` 함수를 구현해보자.

추가할떄와 마찬가지로, 배열에 있는 항목을 제거할 때에는 불변성을 지켜가면서 업데이트를 해주어야 한다. 
+ 이를 위해서는 배열 내장 함수인 `filter`를 사용하는것이 가장 편하다. 
+ `filter`는 배열에서 특정 조건이 만족하는 원소들만 추출하여 새로운 배열을 만들어준다.

`App` 컴포넌트에서 `onRemove` 를 다음과 같이 구현후, `UserList` 에게 전달한다.

```js
/* App.js */

function App() {
  // ...

  const onRemove = id => {
    // user.id 가 파라미터로 일치하지 않는 원소만 추출해서 새로운 배열을 만듬
    // = user.id 가 id 인 것을 제거함
    setUsers(users.filter(user => user.id !== id));
  };
  return (
    <>
      <CreateUser { /* ... */ } />
      <UserList users={users} onRemove={onRemove} />
    </>
  );
}
```

## 15. 배열에 항목 수정하기

`User` 컴포넌트에 계정명을 클릭했을때 색상이 초록색으로 바뀌고, 다시 누르면 검정색으로 바뀌도록 구현을 해보자.

우선, `App` 컴포넌트의 `users` 배열 안의 객체 안에 `active` 라는 속성을 추가한다.

```js
/* App.js */

function App() {
  // ...
  const [users, setUsers] = useState([
    {
      id: 1,
      username: 'velopert',
      email: 'public.velopert@gmail.com',
      // active 속성 추가
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
  ]);

  // ...

  return (
    <>
      <CreateUser { /* ... */ } />
      <UserList users={users} onRemove={onRemove} onToggle={onToggle} />
    </>
  );
}
```

다음으로 `User` 컴포넌트에서 방금 넣어준 `active` 값에 따라 폰트의 색상을 바꿔주도록 구현한다. 추가로, cursor 필드를 설정하여 마우스를 올렸을때 커서가 손가락 모양으로 변하도록 하자.

```js
/* UserList.js */

function User({ user, onRemove }) {
  return (
    <div>
      <b
        style={{
          cursor: 'pointer',
          color: user.active ? 'green' : 'black'
        }}
      >
        {user.username}
      </b>

      { /* ... */ }
    </div>
  );
}

function UserList({ users, onRemove }) {
  return ( /* ... */ );
}
```

다음으로 `App.js` 에서 `onToggle` 함수를 구현해보자. `onToggle`은 `id` 값을 비교해서 `id` 가 다르다면 그대로 두고, 같다면 `active` 값을 반전시키도록 하는 함수이다.
+ 이를 위해 `map` 함수를 사용한다. `map` 함수를 사용해도 배열의 불변성을 유지할 수 있다.

작성한 `onToggle` 함수는 `UserList` 컴포넌트에게 전달한다.

```js
/* App.js */

function App() {
  // ...

  // id를 인자로 받는 함수
  const onToggle = id => {
    setUsers(
      // users의 각 user에 대해서
      users.map(user =>
        // user의 id와 인자로 받은 id가 같으면 active 값을 반전
        user.id === id ? { ...user, active: !user.active } : user
      )
    );
  };
  return (
    <>
      <CreateUser { /* ... */ } />
      <UserList users={users} onRemove={onRemove} onToggle={onToggle} /> { /* UserList로 onToggle 함수 전달 */ }
    </>
  );
}
```

다음에는 `UserList` 컴포넌트에서 `onToggle`를 받아와서 `User` 에게 전달해주고, `onRemove`처럼 `onToggle`에 `id` 를 넣어서 호출해주자.

```js
/* UserList.js */

function User({ user, onRemove, onToggle }) {
  return (
    <div>
      <b
        style={{
          cursor: 'pointer',
          color: user.active ? 'green' : 'black'
        }}
        onClick={() => onToggle(user.id)}
      >
        {user.username}
      </b>
      { /* ... */ }
    </div>
  );
}

function UserList({ users, onRemove, onToggle }) {
  return (
    <div>
      {users.map(user => (
        <User
          user={user}
          key={user.id}
          onRemove={onRemove}
          onToggle={onToggle} {/* onToggle 추가 */}
        />
      ))}
    </div>
  );
}
```
