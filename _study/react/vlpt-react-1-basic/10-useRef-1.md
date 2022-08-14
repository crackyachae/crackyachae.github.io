---
layout  : article
title   : 10. useRef 로 특정 DOM 선택하기
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

> 이 글은 벨로퍼트와 함께하는 모던 React중 [10. useRef 로 특정 DOM 선택하기](https://react.vlpt.us/basic/10-useRef.html)의 내용을 복습하기위해 핵심 내용을 요약 정리한 글입니다.
>
> * 제가 필요한 부분 위주로 확인하면서 정리하고 있어 글에 덜 작성된 부분이 있을 수 있습니다.
> * 글 작성 후 원문의 내용이 수정되거나 내용을 이해하기 위한 개인적인 설명이나 해석이 있을 수 있습니다. 되도록 원문을 참고해주시길 바랍니다.
> * 잘못된 부분이 있다면 댓글이나 그 외 편하신 방법으로 알려주시면 감사하겠습니다.

## 10. useRef 로 특정 DOM 선택하기

React를 사용하는 프로젝트에서도 가끔씩 DOM 을 직접 선택해야 할 때가 있다.

그럴 땐, React에서 `ref` 라는 것을 사용하는데, 함수형 component에서는 `useRef` 라는 Hook 함수로 `ref` 를 사용 할 수 있다.

* `useRef()` 를 사용하여 Ref 객체를 만들고,
* 이 객체를 우리가 선택하고 싶은 DOM 에 ref 값으로 설정해준다.
* 그러면, `Ref` 객체의 `.current` 값이 우리가 원하는 DOM 을 가르킨다.

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

  const onChange = e => { /* ... */ };

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

* `onReset` 함수에서 `input` 에 포커스를 하는 `focus()` DOM API 를 호출해준다.
