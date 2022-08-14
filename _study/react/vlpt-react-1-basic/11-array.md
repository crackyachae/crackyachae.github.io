---
layout  : article
title   : 11. 배열 렌더링하기
summary : 
date    : 2020-01-01 22:17:39 +0900
updated : 2021-01-01 23:06:20 +0900
tag     : draft
toc     : true
public  : true
parent  : [[/react/vlpt-react-1-basic]]
latex   : false
---
* TOC
{:toc}

> 이 글은 벨로퍼트와 함께하는 모던 React중 [11. 배열 렌더링하기](https://react.vlpt.us/basic/11-render-array.html)의 내용을 복습하기위해 핵심 내용을 요약 정리한 글입니다.
>
> * 제가 필요한 부분 위주로 확인하면서 정리하고 있어 글에 덜 작성된 부분이 있을 수 있습니다.
> * 글 작성 후 원문의 내용이 수정되거나 내용을 이해하기 위한 개인적인 설명이나 해석이 있을 수 있습니다. 되도록 원문을 참고해주시길 바랍니다.
> * 잘못된 부분이 있다면 댓글이나 그 외 편하신 방법으로 알려주시면 감사하겠습니다.

동적인 배열을 렌더링해야 할 때에는 자바스크립트 배열의 내장함수 `map()` 을 사용한다.

리액트에서 배열을 렌더링 할 때에는 `key` 라는 `props` 를 설정해야한다.

* `key` 값은 각 원소들마다 가지고 있는 고유값이어야 한다.
* 지금 경우는 각 `user`의 `id` 가 고유값

```js
/* UserList.js */

// 재사용 할 수 있는 User component를 먼저 생성
// user의 name과 email을 표시하는 element
function User({ user }) {
  return (
    <div>
      <b>{user.username}</b> <span>({user.email})</span>
    </div>
  );
}

function UserList() {
  // users를 정의 
  // 각 user 객체를 담고 있는 배열
  const users = [
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
  ];
  
  return (
    <div>
      {/* users의 각 객체를 user라는 이름으로 parameter를 넘겨서 */}
      {/* user 객체 자체는 user props로 user의 id는 key props로 전달 */}
      {/* 이를 users의 element인 각 user 객체마다 반복해서 수행한다 */}
      {users.map(user => (
        <User user={user} key={user.id} />
      ))}
    </div>
  );
}
```
