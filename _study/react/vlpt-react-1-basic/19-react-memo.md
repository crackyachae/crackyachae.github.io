---
layout  : article
title   : 19. React.memo 를 사용한 컴포넌트 리렌더링 방지
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

> 이 글은 벨로퍼트와 함께하는 모던 React중 [19. React.memo 를 사용한 컴포넌트 리렌더링 방지](https://react.vlpt.us/basic/19-React.memo.html)의 내용을 복습하기위해 핵심 내용을 요약 정리한 글입니다.
>
> * 제가 필요한 부분 위주로 확인하면서 정리하고 있어 글에 덜 작성된 부분이 있을 수 있습니다.
> * 글 작성 후 원문의 내용이 수정되거나 내용을 이해하기 위한 개인적인 설명이나 해석이 있을 수 있습니다. 되도록 원문을 참고해주시길 바랍니다.
> * 잘못된 부분이 있다면 댓글이나 그 외 편하신 방법으로 알려주시면 감사하겠습니다.

`React.memo`는, 컴포넌트의 props 가 바뀌지 않았다면, 리렌더링을 방지하여 컴포넌트의 리렌더링 성능 최적화를 해줄 수 있는 함수다.

* 즉, 컴포넌트에서 리렌더링이 필요한 상황에서만 리렌더링을 하도록 설정해줄 수 있다.

`React.memo`를 사용하는 법은 간단하다. component를 `React.memo`로 감싸주면 된다.

```js
/* CreateUser.js */

import React from 'react'; 

const CreateUser = ({ username, email, onChange, onCreate }) => {
  return ( /* ... */ );
};

export default React.memo(CreateUser); // export 할 때 React.memo로 컴포넌트를 감싸줌
```

```js
/* UserList.js */

import React from 'react';

// 별도로 export하지 않는 컴포넌트는 선언할 때 감싸서 선언.
const User = React.memo(function User({ user, onRemove, onToggle }) {
  return ( /* ... */ );
});

function UserList({ users, onRemove, onToggle }) {
  return ( /* ... */ );
}

export default React.memo(UserList);
```

적용을 다 하고 input을 수정하면 `onChange` 함수가 호출되는데 이를 props로 갖지 않는 `UserList`는 리렌더링이 되지 않는것을 확인할 수 있다.

반면에, `User` 중 하나라도 수정되면 모든 `User` 들이 리렌더링되고, `CreateUser`도 리렌더링된다. 이는 `users` 배열이 바뀔때마다 이를 `useCallback` deps로 갖는 `onCreate`, `onToggle`, `onRemove` 모두 새로 만들어지기 때문이다.

```js
const onCreate = useCallback(() => { /* ... */ }, [users, username, email]);

const onRemove = useCallback( /* ... */ }, [users]
);
```

이것까지 최적화하고 싶다면

* deps 에서 `users` 를 지우고,
* 함수들에서 현재 `useState` 로 관리하는 `users` 를 참조하지 않게 해야한다.
* 이는 `useState`의 함수형 업데이트를 이용해 할 수 있다.

함수형 업데이트를 하게 되면, `setUsers` 에 등록하는 콜백함수의 파라미터에서 최신 `users` 를 참조 할 수 있기 때문에 deps 에 `users` 를 넣지 않아도 된다.

* `onChange` 의 경우엔 함수형 업데이트를 해도 영향은 가지 않지만, 연습삼아 수정.

```js
/* App.js */

function countActiveUsers(users) { /* ... */ }

function App() {
  // ...

  const onCreate = useCallback(() => {
    // ...
    setUsers(users => users.concat(user)); // 기존 코드: setUsers(users.concat(user));
    // ...
  }, [username, email]);

  const onRemove = useCallback(id => {
    setUsers(users => users.filter(user => user.id !== id));
  }, []);

  const onToggle = useCallback(id => {
    setUsers(users =>
      users.map(user =>
        user.id === id ? { ...user, active: !user.active } : user
      )
    );
  }, []);

  // ...
  return ( /* ... */ );
}
```

`useCallback`, `useMemo`, `React.memo` 는 컴포넌트의 성능을 실제로 개선할수있는 상황에서만 사용하도록 주의하자.

* 예를 들어, `User` 컴포넌트의 `<b>` 와 `<button>` 에 `onClick` 으로 설정해준 함수들은, `useCallback` 으로 재사용한다고 해서 리렌더링을 막을 수 없기 때문에 굳이 그렇게 할 필요 없다.
* 추가로, 렌더링 최적화 하지 않을 컴포넌트에 `React.memo` 를 사용하는것은, 불필요한 props 비교만 하는 것이기 때문에 실제로 렌더링을 방지할 수있는 상황에만 사용해야한다.
