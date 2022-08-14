---
layout  : article
title   : 17. useMemo 를 사용하여 연산한 값 재사용하기 
summary : 
date    : 2021-01-02 23:14:23 +0900
updated : 2021-03-03 23:24:06 +0900
tag     : draft
toc     : true
public  : true
parent  : [[/react/vlpt-react-1-basic]]
latex   : false
---
* TOC
{:toc}

> 이 글은 벨로퍼트와 함께하는 모던 React중 [17. useMemo 를 사용하여 연산한 값 재사용하기](https://react.vlpt.us/basic/17-useMemo.html)의 내용을 복습하기위해 핵심 내용을 요약 정리한 글입니다.
>
> * 제가 필요한 부분 위주로 확인하면서 정리하고 있어 글에 덜 작성된 부분이 있을 수 있습니다.
> * 글 작성 후 원문의 내용이 수정되거나 내용을 이해하기 위한 개인적인 설명이나 해석이 있을 수 있습니다. 되도록 원문을 참고해주시길 바랍니다.
> * 잘못된 부분이 있다면 댓글이나 그 외 편하신 방법으로 알려주시면 감사하겠습니다.

## 17. useMemo 를 사용하여 연산한 값 재사용하기

이번에는 연산된 값을 `useMemo`라는 Hook을 사용하여 재사용하고 성능을 최적화해보자.

`App` 컴포넌트에서 다음과 같이 `countActiveUsers` 라는 함수를 만든다.

* `countActiveUsers`는 `active` 값이 `true` 인 사용자의 수를 세어서 화면에 렌더링하는 함수이다.
* `countActiveUsers` 함수에서 콘솔에 메시지를 출력하도록 한 이유는, 이 함수가 호출될때마다 우리가 알수있도록 하기 위함이다.

```js
/* App.js */

// countActiveUsers 함수 생성
function countActiveUsers(users) {
  console.log('활성 사용자 수를 세는중...');
  return users.filter(user => user.active).length;
}

function App() {
  // ...

  // users를 countActiveUsers의 파라미터로 넘긴 결과를
  // count에 저장
  const count = countActiveUsers(users);
  return (
    <>
      <CreateUser { /* ... */ } />
      <UserList { /* ... */ } />
      <div>활성사용자 수 : {count}</div>
    </>
  );
}
```

구현을 마친 뒤, 다른 계정명을 눌러서 초록색으로 만들면 활성 사용자 수 또한 업데이트 되는 것을 확인할 수 있다.

그런데, 여기서 `input` 의 값을 바꿀때에도 `countActiveUsers` 함수가 호출된다는 성능적 문제가 발생한다.

* 활성 사용자 수는, `users` 에 변화가 있을때만 세야하는데,
* `input` 값이 바뀔 때에도 컴포넌트가 리렌더링 되므로 `countActiveUsers`가 불필요하게 호출되어 자원을 낭비하고 있다.

`useMemo` 라는 Hook 함수를 사용해 이를 해결할 수 있다. Memo 는 "memoized" 를 의미하는데, 이는 이전에 계산 한 값을 재사용한다는 의미를 갖는다.

```js
/* App.js */

// useMemo를 import
import React, { useRef, useState, useMemo } from 'react';

function countActiveUsers(users) { /* ... */ }

function App() {
  // ...

  const count = useMemo(() => countActiveUsers(users), [users]);
  return (
    <>
      <CreateUser { /* ... */ } />
      <UserList { /* ... */ } />
      <div>활성사용자 수 : {count}</div>
    </>
  );
}
```

`useMemo` 의

* 첫번째 파라미터에는 어떻게 연산할지 정의하는 함수를,
* 두번째 파라미터에는 `deps` 배열을 넣어주면 된다.
* `deps` 배열 안에 넣은 내용이 바뀌면 우리가 등록한 함수를 호출해서 값을 연산해주고, 만약에 내용이 바뀌지 않았다면 이전에 연산한 값을 재사용한다.
