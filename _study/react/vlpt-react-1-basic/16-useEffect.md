---
layout  : article
title   : 16. useEffect를 사용하여 마운트/언마운트/업데이트시 할 작업 설정하기
summary : 
date    : 2021-01-01 23:11:52 +0900
updated : 2021-01-02 00:42:10 +0900
tag     : draft
toc     : true
public  : true
parent  : [[/react/vlpt-react-1-basic]]
latex   : false
---
* TOC
{:toc}

> 이 글은 벨로퍼트와 함께하는 모던 React중 [4. JSX의 기본 규칙 알아보기](https://react.vlpt.us/basic/04-jsx.html)의 내용을 복습하기위해 핵심 내용을 요약 정리한 글입니다.
>
> * 제가 필요한 부분 위주로 확인하면서 정리하고 있어 글에 덜 작성된 부분이 있을 수 있습니다.
> * 글 작성 후 원문의 내용이 수정되거나 내용을 이해하기 위한 개인적인 설명이나 해석이 있을 수 있습니다. 되도록 원문을 참고해주시길 바랍니다.
> * 잘못된 부분이 있다면 댓글이나 그 외 편하신 방법으로 알려주시면 감사하겠습니다.

`useEffect` 라는 Hook 을 사용하면 component 가 마운트 됐을 때 (처음 나타났을 때), 언마운트 됐을 때 (사라질 때), 그리고 업데이트 될 때 (특정 props가 바뀔 때) 특정 작업을 처리할 수 있다.

## 마운트 / 언마운트

`[deps]` 항목을 입력하지 않았을 때.

```js
function User({ user, onRemove, onToggle }) {
  useEffect(() => {
    console.log('컴포넌트가 화면에 나타남');
    return () => {
      console.log('컴포넌트가 화면에서 사라짐');
    };
  }, []);
  return (
    <div>
      { /* ... */ }
    </div>
  );
}
```

`useEffect` 를 사용 할 때에는

* 첫번째 파라미터에는 함수,
* 두번째 파라미터에는 의존값이 들어있는 배열 (deps)을 넣는다.
    * 만약에 deps 배열을 비우면, 컴포넌트가 처음 나타날때에만 `useEffect` 에 등록한 함수가 호출된다.

`useEffect` 에서는 함수를 반환 할 수 있는데 이를 `cleanup` 함수라고 한다.

* `cleanup` 함수는 `useEffect` 에 대한 뒷정리를 해준다고 이해할 수 있으며,
* deps 가 비어있는 경우에는 컴포넌트가 사라질 때 `cleanup` 함수가 호출된다.

마운트 시에 주로 하는 작업들

* props 로 받은 값을 컴포넌트의 로컬 상태로 설정
* 외부 API 요청 (REST API 등)
* 라이브러리 사용 (D3, Video.js 등...)
* setInterval 을 통한 반복작업 혹은 setTimeout 을 통한 작업 예약

언마운트 시에 주로 하는 작업들

* setInterval, setTimeout 을 사용하여 등록한 작업들 clear 하기 (clearInterval, clearTimeout)
* 라이브러리 인스턴스 제거

## deps 에 특정 값 넣기

deps 에 특정 값이 있다면,

* 'component'가 처음 마운트 될 때 뿐만 아니라 지정한 값이 바뀔 때에도 호출이 된다.
* `cleanup` 함수도 언마운트시에 호출이 될 때 외에도 지정한 값이 바뀌기 직전에도 호출이 된다.

```js
function User({ user, onRemove, onToggle }) {
  useEffect(() => {
    console.log('user 값이 설정됨');
    console.log(user);
    return () => {
      console.log('user 가 바뀌기 전..');
      console.log(user);
    };
  }, [user]);
  return (
    <div>
      { /* ... */ }
    </div>
  );
}
```

## deps 파라미터를 생략하기

deps 파라미터를 생략한다면, 컴포넌트가 리렌더링될 때마다 호출이 된다.

```js
function User({ user, onRemove, onToggle }) {
  useEffect(() => {
    console.log(user);

  // deps를 입력하지 않은 것과 다름.
  // deps를 입력하지 않은 경우: useEffect(function, []);
  // deps를 생략한 경우: useEffect(function);
  });

  return (
    <div>
      { /* ... */ }
    </div>
  );
}
```

useEffect는 첫 문장에 나와있듯이

1. 화면이 처음 떴을때 실행.
    * deps에 [] 빈배열을 넣을 떄.
    * life cycle중 componentDidmount처럼 실행
2. 화면이 사라질때 실행(clean up함수).
    * componentWillUnmount처럼 실행
3. deps에 넣은 파라미터값이 업데이트 됬을때 실행.
    * componentDidUpdate처럼 실행.
이렇게 이해하시면 되구요. 혹시 이해가 안되신다면 클래스형 컴포넌트와 리액트 라이프사이클을 보고오시면 다시 설명을 보시면 이해가 되실꺼 같습니다.

그리고 저는 개인적으로 어느정도 이해가 됬을때
https://rinae.dev/posts/a-complete-guide-to-useeffect-ko
이 글을 읽고 더 이해가 잘 됬습니다. useEffect는 동기화라는 말이 참 와닿더라구요
ps. 혹시 제 글에 잘못된 점이 있거나 하면 알려주세요!
