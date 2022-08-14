---
layout  : article
title   : 5. props 를 통해 컴포넌트에게 값 전달하기 
summary : 
date    : 2020-12-30 23:58:41 +0900
updated : 2020-12-31 15:31:20 +0900
tag     : draft
toc     : true
public  : true
parent  : [[/react/vlpt-react-1-basic]]
latex   : false
---
* TOC
{:toc}

> 이 글은 벨로퍼트와 함께하는 모던 React중 [5. props 를 통해 컴포넌트에게 값 전달하기](https://react.vlpt.us/basic/05-props.html)의 내용을 복습하기위해 핵심 내용을 요약 정리한 글입니다.
>
> * 제가 필요한 부분 위주로 확인하면서 정리하고 있어 글에 덜 작성된 부분이 있을 수 있습니다.
> * 글 작성 후 원문의 내용이 수정되거나 내용을 이해하기 위한 개인적인 설명이나 해석이 있을 수 있습니다. 되도록 원문을 참고해주시길 바랍니다.
> * 잘못된 부분이 있다면 댓글이나 그 외 편하신 방법으로 알려주시면 감사하겠습니다.

`props` 는 `properties` 의 줄임말로 우리가 어떠한 값을 'Component'에게 전달해줘야 할 때, `props` 를 사용한다.

## props 의 기본 사용법

컴포넌트에게 전달되는 `props` 는 component의 parameter를 통하여 조회 할 수 있다.

* props 는 객체 형태로 전달되며,
* 만약 name 값을 조회하고 싶다면 `props.name` 을 조회하면 된다.

```js
/* App.js */

import React from 'react';
import Hello from './Hello';

function App() {
  // react라는 name을 Hello로 전달.
  return (
    <Hello name="react" />
  );
}

export default App;
```

```js
/* Hello.js */

import React from 'react';

// Parameter로 props를 받아옴
function Hello(props) {
  // <div>안녕하세요 react</div> 출력.
  return <div>안녕하세요 {props.name}</div>
}

export default Hello;
```

> 이후의 예시 코드에서 `import`와 `export`문은 신경쓸만한 변동사항이 없는 이상 작성을 생략합니다.
>
> * `import`는 대부분 다음과 같이 작성합니다.
>     * `react`에서 `React`와 해당 예시에서 사용하는 API를 import (e.g., `import React from 'react'`)
>     * 해당 예시에서 사용할 컴포넌트 파일을 import (e.g., `import Hello from './Hello'`)
> * `export`는
>     * 그 파일의 컴포넌트를 내보내는 역할인데
>     * 해당 파일 명을 컴포넌트 이름과 똑같이 지정하기 때문에 `export default {파일명 (확장자 제외)}` 로 작성합니다.

## 여러개의 props, 비구조화 할당

함수의 파라미터에서 비구조화 할당 문법을 사용하면 조금 더 코드를 간결하게 작성 할 수 있다.

```js
/* App.js */

function App() {
  return (
    <Hello name="react" color="red"/>
  );
}
```

```js
/* Hello.js */

// props = { name: react, color: red };
// { color, name } = props;
function Hello({ color, name }) {
  return <div style={{ color }}>안녕하세요 {name}</div>
}
```

## defaultProps 로 기본값 설정

컴포넌트에 `props` 를 지정하지 않았을 때 기본적으로 사용 할 값을 설정하고 싶다면 'Component'에 `defaultProps` 라는 값을 설정하면 됩니다.

```js
/* Hello.js */

function Hello({ color, name }) {
  return <div style={{ color }}>안녕하세요 {name}</div>
}

// name props가 지정되지 않은 Hello component는 
// 기본값으로 이름없음을 지정
Hello.defaultProps = {
  name: '이름없음'
}
```

```js
/* App.js */

function App() {
  return (
    <>
      <Hello name="react" color="red"/>
      {/* <div style=pink>안녕하세요 이름없음</div> 출력 */}
      <Hello color="pink"/>
    </>
  );
}
```

## props.children

Component 태그 사이의 값을 조회하고 싶을 땐, `props.children` 을 조회하면 된다.

```js
/* App.js */

function App() {
  return (
    // Wrapper 사이의 두 Hello component는 브라우저에서 보이지 않음.
    <Wrapper>
      <Hello name="react" color="red"/>
      <Hello color="pink"/>
    </Wrapper>
  );
}
```

내부의 내용이 보여지게 하기 위해서는 `Wrapper` 에서 `props.children` 을 렌더링해주어야 한다.

```js
/* Wrapper.js */

// props = { childeren: ... }
// {children} = props
function Wrapper({ children }) {
 
  return (
    <div style={style}>
      {/* render childeren */}
      {children}
    </div>
  )
}
```
