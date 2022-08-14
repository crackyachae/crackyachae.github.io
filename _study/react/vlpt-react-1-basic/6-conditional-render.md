---
layout  : article
title   : 6. 조건부 렌더링
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

> 이 글은 벨로퍼트와 함께하는 모던 React중 [6. 조건부 렌더링](https://react.vlpt.us/basic/06-conditional-rendering.html)의 내용을 복습하기위해 핵심 내용을 요약 정리한 글입니다.
>
> * 제가 필요한 부분 위주로 확인하면서 정리하고 있어 글에 덜 작성된 부분이 있을 수 있습니다.
> * 글 작성 후 원문의 내용이 수정되거나 내용을 이해하기 위한 개인적인 설명이나 해석이 있을 수 있습니다. 되도록 원문을 참고해주시길 바랍니다.
> * 잘못된 부분이 있다면 댓글이나 그 외 편하신 방법으로 알려주시면 감사하겠습니다.

조건부 렌더링: 특정 조건에 따라 다른 결과물을 렌더링 하는 것

```js
/* App.js */

function App() {
  return (
    <Wrapper>
      { /* isSpecial props 추가 */ }
      <Hello name="react" color="red" isSpecial={true}/>
      <Hello color="pink" />
    </Wrapper>
  )
}
```

`Hello` 컴포넌트에서 `isSpecial` 이 `true` 일 때 컴포넌트의 좌측에 * 표시를 보여줘보자.

가장 기본적인 방법은, 삼항연산자를 사용한다.

```js
/* Hello.js */

function Hello({ color, name, isSpecial }) {
  return (
    <div style={{ color }}>
      { /* 조건 ? true일때 : false일때 */ }
      { isSpecial ? <b>*</b> : null }
      안녕하세요 {name}
    </div>
  );
}
```

* JSX 에서 `null`, `false`, `undefined` 를 렌더링하면 아무것도 나타나지 않게된다.

위처럼 단순히 특정 조건이 `true` 이면 보여주고, 그렇지 않다면 숨겨주는 상황에서는 `&&` 연산자를 사용해서 처리하는 것이 더 간편하다.

* `A && B`
    * `A` 가 truthy 한 값이면, `B`를 return
    * `A` 가 falsy 한 값이라면 `A`(==`false`)를 return

```js
/* Hello.js */

function Hello({ color, name, isSpecial }) {
  return (
    <div style={{ color }}>
      {isSpecial && <b>*</b>}
      안녕하세요 {name}
    </div>
  );
}
```

만약 컴포넌트의 `props` 이름만 작성하고 값 설정을 생략한다면, 이를 `true` 로 설정한 것으로 간주한다.
