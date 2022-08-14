---
layout  : article
title   : 8. input 상태 관리하기
summary : 
date    : 2021-01-01 21:02:52 +0900
updated : 2021-01-01 21:36:49 +0900
tag     : draft
toc     : true
public  : true
parent  : [[/react/vlpt-react-1-basic]]
latex   : false
---
* TOC
{:toc}

> 이 글은 벨로퍼트와 함께하는 모던 React중 [8. input 상태 관리하기](https://react.vlpt.us/basic/08-manage-input.html)의 내용을 복습하기위해 핵심 내용을 요약 정리한 글입니다.
>
> * 제가 필요한 부분 위주로 확인하면서 정리하고 있어 글에 덜 작성된 부분이 있을 수 있습니다.
> * 글 작성 후 원문의 내용이 수정되거나 내용을 이해하기 위한 개인적인 설명이나 해석이 있을 수 있습니다. 되도록 원문을 참고해주시길 바랍니다.
> * 잘못된 부분이 있다면 댓글이나 그 외 편하신 방법으로 알려주시면 감사하겠습니다.

사용자가 값을 입력하는 `input` 태그의 state 관리.

input 에 입력하는 값이 하단에 나타나게 하고, 초기화 버튼을 누르면 input 이 값이 비워지도록 구현을 해보자.

```js
/* InputSample.js */

function InputSample() {
  return (
    <div>
      <input />
      <button>초기화</button>
      <div>
        <b>값: </b>
      </div>
    </div>
  );
}
```

```js
/* App.js */

function App() {
  return (
    <InputSample />
  );
}
```

이를 위해 `input` 의 `onChange` 라는 이벤트를 사용한다.

이벤트에 등록하는 함수에서는 이벤트 객체 `e` 를 파라미터로 받아와서 사용 할 수 있다.

* 이 객체의 `e.target` 은 이벤트가 발생한 DOM 인 input DOM 을 가르킨다.
* 이 DOM 의 `value` 값, 즉 `e.target.value` 를 조회하면 현재 input 에 입력 되어있는 값이 무엇인지 알 수 있습니다.

```js
/* InputSample.js */

function InputSample() {
  // text의 기본값은 blank
  const [text, setText] = useState('');

  const onChange = (e) => {
    // text를 event target의 value 값으로 설정
    setText(e.target.value);
  };

  const onReset = () => {
    // text를 초기화: text를 다시 초기값 (blank)로 설정
    setText('');
  };

  return (
    <div>
      {/* input에 변화가 발생하면 onChange 함수를 실행해서 text를 업데이트 */}
      {/* input의 value가 text이므로 text가 업데이트 되면 바로 입력창에 변경사항이 반영된다 */}
      <input onChange={onChange} value={text}  />
      {/* 버튼을 누르면 onReset 함수를 실행해서 입력창을 초기화 */}
      <button onClick={onReset}>초기화</button>
      <div>
        <b>값: {text}</b>
      </div>
    </div>
  );
}
```
