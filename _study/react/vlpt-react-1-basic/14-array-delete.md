---
layout  : article
title   : 14. 배열에 항목 제거하기
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

> 이 글은 벨로퍼트와 함께하는 모던 React중 [14. 배열에 항목 제거하기](https://react.vlpt.us/basic/14-array-remove.html)의 내용을 복습하기위해 핵심 내용을 요약 정리한 글입니다.
>
> * 제가 필요한 부분 위주로 확인하면서 정리하고 있어 글에 덜 작성된 부분이 있을 수 있습니다.
> * 글 작성 후 원문의 내용이 수정되거나 내용을 이해하기 위한 개인적인 설명이나 해석이 있을 수 있습니다. 되도록 원문을 참고해주시길 바랍니다.
> * 잘못된 부분이 있다면 댓글이나 그 외 편하신 방법으로 알려주시면 감사하겠습니다.

항목 제거 기능을 만들기에 앞서, `UserList` 에서 각 `User` 컴포넌트를 보여줄 때, 삭제 버튼을 함께 렌더링해주자.

`User` 컴포넌트에서는 `onRemove` 함수를 props 로 받아온 뒤 삭제 버튼이 클릭 될 때마다 `onRemove`를 호출한다.

* 아직 구현하지는 않았지만 `onRemove`는 "id 가 __인 객체를 삭제" 하는 역할을 하며,
* 파라미터로 `user.id` 값을 전달한다. (i.e, 위의 __)
* `onRemove` 함수는 `App`에서 `UserList`로 전달받아 이를 그대로 `User` 컴포넌트에게 전달한다.

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

* 이를 위해서는 배열 내장 함수인 `filter`를 사용하는것이 가장 편하다.
* `filter`는 배열에서 특정 조건이 만족하는 원소들만 추출하여 새로운 배열을 만들어준다.

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
