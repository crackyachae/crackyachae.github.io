---
layout  : article
title   : 15. 배열에 항목 수정하기
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

> 이 글은 벨로퍼트와 함께하는 모던 React중 [15. 배열에 항목 수정하기](https://react.vlpt.us/basic/15-array-modify.html)의 내용을 복습하기위해 핵심 내용을 요약 정리한 글입니다.
>
> * 제가 필요한 부분 위주로 확인하면서 정리하고 있어 글에 덜 작성된 부분이 있을 수 있습니다.
> * 글 작성 후 원문의 내용이 수정되거나 내용을 이해하기 위한 개인적인 설명이나 해석이 있을 수 있습니다. 되도록 원문을 참고해주시길 바랍니다.
> * 잘못된 부분이 있다면 댓글이나 그 외 편하신 방법으로 알려주시면 감사하겠습니다.

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

* 이를 위해 `map` 함수를 사용한다. `map` 함수를 사용해도 배열의 불변성을 유지할 수 있다.

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
