---
layout  : article
title   : 18. useCallback 를 사용하여 함수 재사용하기
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

> 이 글은 벨로퍼트와 함께하는 모던 React중 [18. useCallback 을 사용하여 함수 재사용하기](https://react.vlpt.us/basic/18-useCallback.html)의 내용을 복습하기위해 핵심 내용을 요약 정리한 글입니다.
>
> * 제가 필요한 부분 위주로 확인하면서 정리하고 있어 글에 덜 작성된 부분이 있을 수 있습니다.
> * 글 작성 후 원문의 내용이 수정되거나 내용을 이해하기 위한 개인적인 설명이나 해석이 있을 수 있습니다. 되도록 원문을 참고해주시길 바랍니다.
> * 잘못된 부분이 있다면 댓글이나 그 외 편하신 방법으로 알려주시면 감사하겠습니다.

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

* `deps` 배열 안에 함수에서 사용하는 값을 넣지 않게 된다면, 함수 내에서 해당 값들을 참조할때 가장 최신 값을 참조하지 않을 수도 있다.
* `props` 로 받아온 함수가 있다면, 이 역시 `deps` 에 넣어주어야 한다.

## React DevTools

렌더링되고 있는 component를 확인하기 위해서 React DevTools를 사용한다.

구글에 React DevTools 를 검색해서 크롬 웹스토어에 들어간뒤, [크롬 확장 프로그램](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=ko)을 설치하면 React 탭이 개발자 도구에 뜬다.

톱니바퀴 아이콘을 누르고, 'Highlight Updates'에 체크하면 rerendering 되는 컴포넌트에 사각형 형태로 하이라이트되어 보여진다.

## 참고

* DevTools이 업데이트 되면서 해당 기능이 사라진 것 같다.
* https://blog.woolta.com/categories/1/posts/159 참고하시면 도움이 될거 같습니다. :)
