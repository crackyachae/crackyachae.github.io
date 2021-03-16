---
layout  : wiki
title   : 10. useRef 로 특정 DOM 선택하기 / 11. 배열 렌더링하기 / 12. useRef 로 컴포넌트 안의 변수 만들기
summary : 
date    : 2020-01-01 22:17:39 +0900
updated : 2021-01-01 23:06:20 +0900
tag     : rough
toc     : true
public  : true
parent  : [[vlpt-react-basic]]
latex   : false
---
* TOC
{:toc}

> 이 글은 벨로퍼트와 함께하는 모던 React중 [10. useRef 로 특정 DOM 선택하기](https://react.vlpt.us/basic/10-useRef.html), [11. 배열 렌더링하기](https://react.vlpt.us/basic/11-render-array.html), [12. useRef 로 컴포넌트 안의 변수 만들기](https://react.vlpt.us/basic/12-variable-with-useRef.html)의 내용을 복습하기위해 핵심 내용을 요약 정리한 글입니다.
>
> 내용을 이해하기 위한 개인적인 설명이나 해석이 있을 수 있기 때문에 되도록 원문을 참고해주시길 바랍니다.
> 잘못된 부분이 있다면 댓글이나 그 외 편하신 방법으로 알려주시면 감사하겠습니다.

## 10. useRef 로 특정 DOM 선택하기

React를 사용하는 프로젝트에서도 가끔씩 DOM 을 직접 선택해야 할 때가 있다.

그럴 땐, React에서 `ref` 라는 것을 사용하는데, 함수형 component에서는 `useRef` 라는 Hook 함수로 `ref` 를 사용 할 수 있다.
+ `useRef()` 를 사용하여 Ref 객체를 만들고,
+ 이 객체를 우리가 선택하고 싶은 DOM 에 ref 값으로 설정해준다.
+ 그러면, `Ref` 객체의 `.current` 값이 우리가 원하는 DOM 을 가르킨다.

초기화 버튼을 클릭했을 때 이름 input 에 포커스가 잡히도록 useRef 를 사용하여 기능을 구현해보자.

```js
/* InputSample.js */

// useRef를 import
import React, { useState, useRef } from 'react';

function InputSample() {
  const [inputs, setInputs] = useState({ /* ... */ });

  // useRef로 nameInput 이라는 ref 객체를 생성
  const nameInput = useRef();

  const { name, nickname } = inputs;

  const onChange = e => { /* ... */ });
  };

  const onReset = () => {
    setInputs({ /* ... */ });
    // nameInput.current: nameInput을 ref로 갖는 input element
    // focus() API를 이용해 input에 focus
    nameInput.current.focus();
  };

  return (
    <div>
      <input
        name="name"
        placeholder="이름"
        onChange={onChange}
        value={name}
        // nameInput을 ref로 추가
        ref={nameInput}
      />
      {/* ... */}
    </div>
  );
}
```

+ `onReset` 함수에서 `input` 에 포커스를 하는 `focus()` DOM API 를 호출해준다.

## 11. 배열 렌더링하기

동적인 배열을 렌더링해야 할 때에는 자바스크립트 배열의 내장함수 `map()` 을 사용한다.

리액트에서 배열을 렌더링 할 때에는 `key` 라는 `props` 를 설정해야한다.
+ `key` 값은 각 원소들마다 가지고 있는 고유값이어야 한다.
+ 지금 경우는 각 `user`의 `id` 가 고유값

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

## 12. useRef 로 컴포넌트 안의 변수 만들기

`useRef` Hook 은 DOM 을 선택하는 용도 외에도, 컴포넌트 안에서 조회 및 수정 할 수 있는 변수를 관리하는 용도로 사용할 수 있다.
+ `useRef` 로 관리하는 변수는 값이 바뀐다고 해서 component가 rerendering 되지 않는다. 
+ React component의 'state'는 상태를 바꾸는 함수를 호출하고 나서 그 다음 rendering 이후로 업데이트 된 상태를 조회 할 수 있는 반면,
+ `useRef` 로 관리하고 있는 변수는 설정 후 바로 조회 할 수 있다.

앞으로 users 배열에 새 항목을 추가할 때 사용 할 예정인데 이때 사용 할 고유 id를 App 컴포넌트에서 `useRef` 를 사용하여 관리해보자.

우선 UserList 컴포넌트 내부에서 직접 선언해서 사용하고 있는 user 배열을 App 에서 선언하고 UserList 에게 props 로 전달을 해주도록 변경시켜주어야 한다.
 
```js
/* App.js */

function App() {
  const users = [ /* ... */ ];
  return <UserList users={users} />;
}
```

```js
/* UserList.js */

// 아래서 user={user}로 넘긴 props
function User({ user }) {
  return (
    <div>
      <b>{user.username}</b> <span>({user.email})</span>
    </div>
  );
}

// App.js 에서 넘어온 props
function UserList({ users }) {
  return (
    <div>
      {users.map(user => (
        <User user={user} key={user.id} />
      ))}
    </div>
  );
}
```

이제 App 에서 `useRef()` 를 사용하여 `nextId` 라는 변수를 만들어보자.

```js
/* App.js */

function App() {
  const users = [ /* ... */ ];

  const nextId = useRef(4);

  const onCreate = () => {
    // 나중에 구현 할 배열에 항목 추가하는 로직
    // ...

    nextId.current += 1;
  };

  return <UserList users={users} />;
}
```

+ `useRef()` 를 사용 할 때 parameter를 넣어주면, 이 값이 `.current` 값의 기본값이 된다.
+ 이 값을 수정하거나 조회 할때에는 `.current` 값을 수정하거나 조회하면 된다.

### 참고 (-ing)
useRef는 일반적인 자바스크립트 객체입니다 즉 heap 영역에 저장됩니다
그래서 어플리케이션이 종료되거나 가비지 컬렉팅 될 때 까지 참조할 때 마다 같은 메모리 주소를 가지게 되고
같은 메모리 주소를 가지기 때문에 === 연산이 항상 true를 반환하고, 값이 바뀌어도 리렌더링 되지 않습니다.
하지만 함수 컴포넌트 내부에 변수를 선언한다면, 렌더링 될 때마다 값이 초기화 됩니다.
그래서 해당 방법을 지양하는 것 같습니다 :)
