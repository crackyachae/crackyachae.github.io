---
layout  : wiki
title   : 17. useMemo 를 사용하여 연산한 값 재사용하기 / 18. useCallback 를 사용하여 함수 재사용하기 / 19. React.memo 를 사용한 컴포넌트 리렌더링 방지
summary : 
date    : 2021-01-02 23:14:23 +0900
updated : 2021-03-03 23:24:06 +0900
tag     : rough
toc     : true
public  : true
parent  : [[vlpt-react-basic]]
latex   : false
---
* TOC
{:toc}

> 이 글은 벨로퍼트와 함께하는 모던 React중 [17. useMemo 를 사용하여 연산한 값 재사용하기](https://react.vlpt.us/basic/17-useMemo.html), [18. useCallback 을 사용하여 함수 재사용하기](https://react.vlpt.us/basic/18-useCallback.html), [19. React.memo 를 사용한 컴포넌트 리렌더링 방지](https://react.vlpt.us/basic/19-React.memo.html)의 내용을 복습하기위해 핵심 내용을 요약 정리한 글입니다.
>
> 내용을 이해하기 위한 개인적인 설명이나 해석이 있을 수 있기 때문에 되도록 원문을 참고해주시길 바랍니다.
> 잘못된 부분이 있다면 댓글이나 그 외 편하신 방법으로 알려주시면 감사하겠습니다.

## 17. useMemo 를 사용하여 연산한 값 재사용하기

이번에는 연산된 값을 `useMemo`라는 Hook을 사용하여 재사용하고 성능을 최적화해보자.

`App` 컴포넌트에서 다음과 같이 `countActiveUsers` 라는 함수를 만든다.
+ `countActiveUsers`는 `active` 값이 `true` 인 사용자의 수를 세어서 화면에 렌더링하는 함수이다.
+ `countActiveUsers` 함수에서 콘솔에 메시지를 출력하도록 한 이유는, 이 함수가 호출될때마다 우리가 알수있도록 하기 위함이다.

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
+ 활성 사용자 수는, `users` 에 변화가 있을때만 세야하는데, 
+ `input` 값이 바뀔 때에도 컴포넌트가 리렌더링 되므로 `countActiveUsers`가 불필요하게 호출되어 자원을 낭비하고 있다.

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
+ 첫번째 파라미터에는 어떻게 연산할지 정의하는 함수를,
+ 두번째 파라미터에는 `deps` 배열을 넣어주면 된다. 
+ `deps` 배열 안에 넣은 내용이 바뀌면 우리가 등록한 함수를 호출해서 값을 연산해주고, 만약에 내용이 바뀌지 않았다면 이전에 연산한 값을 재사용한다.

## 18. useCallback 를 사용하여 함수 재사용하기

`useCallback` 은 특정 함수를 새로 만들지 않고 재사용하고 싶을때 사용한다.

React 안에 구현한 함수들은 컴포넌트가 리렌더링될 때 마다 새로 만들어진다. 그 자체 만으로는 큰 부하가 생길일은 없지만, 최적화 측면에서 한번 만든 함수를 필요할때만 새로 만들고 재사용하는 것은 여전히 중요하다.

`useCallback` 은 이런식으로 사용한다.

```js
/* App.js */

// useCallback을 import
import React, { useRef, useState, useMemo, useCallback } from 'react';

function countActiveUsers(users) { /* ... */ }

function App() {
  // ...

  // useCallback 사용
  // useCallback (기존에 작성한 함수, [deps]) 꼴로 작성
  const onChange = useCallback(
    e => { /* 기존의 onChange 함수 */ },
    [inputs] // deps: inputs, inputs가 변할 때 마다 함수를 재생성
  );

  // ...

  // useCallback 사용
  const onCreate = useCallback(
    () => { /* 기존의 onCreate 함수 */ },
    [users, username, email] // deps: users, username, email
  );

  // useCallback 사용
  const onRemove = useCallback(
    id => { /* 기존의 onRemove 함수 */ },
    [users] // deps: users
  );

  // useCallback 사용
  const onToggle = useCallback(
    id => { /* 기존의 onToggle 함수 */ },
    [users] // deps: users
  );

  //...
  return (
    <>
      {/* ... */}
    </>
  );
}
```

함수 안에서 사용하는 상태 혹은 `props` 가 있다면 반드시, `deps` 배열안에 포함시켜야 된다.
+ `deps` 배열 안에 함수에서 사용하는 값을 넣지 않게 된다면, 함수 내에서 해당 값들을 참조할때 가장 최신 값을 참조하지 않을 수도 있다.
+ `props` 로 받아온 함수가 있다면, 이 역시 `deps` 에 넣어주어야 한다.

### React DevTools
렌더링되고 있는 component를 확인하기 위해서 React DevTools를 사용한다.

구글에 React DevTools 를 검색해서 크롬 웹스토어에 들어간뒤, [크롬 확장 프로그램](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=ko)을 설치하면 React 탭이 개발자 도구에 뜬다.

톱니바퀴 아이콘을 누르고, 'Highlight Updates'에 체크하면 rerendering 되는 컴포넌트에 사각형 형태로 하이라이트되어 보여진다.

### 참고
DevTools이 업데이트 되면서 해당 기능이 사라진 것 같다.
https://blog.woolta.com/categories/1/posts/159 참고하시면 도움이 될거 같습니다. :)

## 19. React.memo 를 사용한 컴포넌트 리렌더링 방지

`React.memo`는, 컴포넌트의 props 가 바뀌지 않았다면, 리렌더링을 방지하여 컴포넌트의 리렌더링 성능 최적화를 해줄 수 있는 함수다.
+ 즉, 컴포넌트에서 리렌더링이 필요한 상황에서만 리렌더링을 하도록 설정해줄 수 있다.

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
+ deps 에서 `users` 를 지우고,
+ 함수들에서 현재 `useState` 로 관리하는 `users` 를 참조하지 않게 해야한다.
+ 이는 `useState`의 함수형 업데이트를 이용해 할 수 있다.

함수형 업데이트를 하게 되면, `setUsers` 에 등록하는 콜백함수의 파라미터에서 최신 `users` 를 참조 할 수 있기 때문에 deps 에 `users` 를 넣지 않아도 된다.
+ `onChange` 의 경우엔 함수형 업데이트를 해도 영향은 가지 않지만, 연습삼아 수정.

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
+ 예를 들어, `User` 컴포넌트의 `<b>` 와 `<button>` 에 `onClick` 으로 설정해준 함수들은, `useCallback` 으로 재사용한다고 해서 리렌더링을 막을 수 없기 때문에 굳이 그렇게 할 필요 없다.
+ 추가로, 렌더링 최적화 하지 않을 컴포넌트에 `React.memo` 를 사용하는것은, 불필요한 props 비교만 하는 것이기 때문에 실제로 렌더링을 방지할 수있는 상황에만 사용해야한다.
