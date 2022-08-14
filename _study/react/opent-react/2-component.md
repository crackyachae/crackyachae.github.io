---
layout  : article
title   : 2. 컴포넌트 제작
summary : 
date    : 2020-11-29 21:16:32 +0900
updated : 2020-12-27 21:35:50 +0900
tag     : draft
toc     : true
public  : true
parent  : [[/react/opent-react]]
latex   : false
---
* TOC
{:toc}

> 이 글은 생활코딩의 [컴포넌트 제작](https://opentutorials.org/module/4058/24737) 강의내용을 복습하기 위해 작성한 글입니다.
>
> * 제가 필요한 부분 위주로 확인하면서 정리하고 있어 글에 덜 작성된 부분이 있을 수 있습니다.
> * 글 작성 후 원문의 내용이 수정되거나 내용을 이해하기 위한 개인적인 설명이나 해석이 있을 수 있습니다. 되도록 원문을 참고해주시길 바랍니다.
> * 잘못된 부분이 있다면 댓글이나 그 외 편하신 방법으로 알려주시면 감사하겠습니다.

React의 핵심기능인 component를 제작하는 방법.

Component가 없다면 문서를 수정할 때 코드의 구조나 범위를 파악하기 힘들고 수정이 어렵다.

## 컴포넌트 만들기

React 없이 직접 작성한 html 문서를 react로 바꿔가보자.

```html
<!-- pure.html -->
<html>
  <body>
    <header>
      <h1>WEB</h1>
      world wide web!
    </header>        

    <nav>
      <ul>
        <li><a href="1.html">HTML</a></li>
        <li><a href="2.html">CSS</a></li>
        <li><a href="3.html">JavaScript</a></li>
      </ul>
    </nav>

    <article>
      <h2>HTML</h2>
      HTML is HyperText Markup Language.
    </article>
  </body>
 </html> 
```

### 새 component 생성하기

`<header>`, `<nav>`, `<article>` 영역을 각 component로 만들자.

`App.js`에 다음의 component를 새로 만든다.

* `Subject`: `<header>` element에 해당하는 component
* `TOC`: `<nav>` element에 해당하는 component
* `Content`: `<article>` element에 해당하는 component

```jsx
// App.js

// react component를 만들기 위해 react library에서 Component class를 import 해준다.
import React, { Component } from 'react';
// logo.svg 파일은 샘플 페이지를 표시할 때 필요한 파일이므로 제거
// import logo from './logo.svg'; 
import './App.css';

// Subject component
class Subject extends Component {
  render() {
    return (
      <header>
        <h1>WEB</h1>
        world wide web!
      </header>        
    );
  }
}

// TOC component
class TOC extends Component {
  render() {
    return (
      <nav>
        <ul>
          <li><a href="1.html">HTML</a></li>
          <li><a href="2.html">CSS</a></li>
          <li><a href="3.html">JavaScript</a></li>
        </ul>
      </nav>
    );
  }
}

// Content component
class Content extends Component {
  render() {
    return (
      <article>
        <h2>HTML</h2>
        HTML is HyperText Markup Language.
      </article>
    );
  }
}
```

Component를 만들 때 지켜야할 규칙이 있다.

* component로 만드는 class 이름의 시작은 반드시 대문자여야 하고
* component는 반드시 하나의 최상위 태그로 이루어져있어야 한다.

### 기존의 component를 새 하위 component로 구성하기

하단의 `App` component의 `<header>`, `<nav>`, `<article>` element를 내부를 위에서 만든 component로 대체해 마무리한다.

```jsx
// App.js
class App extends Component {
  render() {
    return (
      <div className="App">
        <Subject></Subject>
        <TOC></TOC>
        <Content></Content>
      </div>        
    );
  }
}

export default App
```

component를 사용하면 전체적인 구성과 각 element를 보다 쉽게 파악할 수 있다.

### JSX

위의 코드에 주목해보자.

현재 사용하고 있는 코드의 문법은 JavaScript와 유사한 형태를 하고 있지만 세부적인 부분이 다르다.

JavaScript 안에 html element를 작성할 때 JavaScript 문법을 지키는 것이 까다롭기 때문에 React에서는 일반적인 html코드 처럼 작성한 뒤 이를 React가 실제 JavaScript 코드로 변환시켜주는 방식을 사용한다.

예를 들어 `return` 안에 html element를 작성할 때 JavaScript 에서는 문법상 제약사항이 (e.g., 따옴표 표기 등) 많지만 위의 코드에서는 깔끔하게 적혀있다.

이처럼 create-react-app 에서 사용하는 JavaScript와 유사한 언어를 JSX 라고 한다.

## Props

위에서 만든 component는 항상 똑같은 값만을 출력할 수 있다. 이는 component의 재사용과 확장성 면에서 매우 아쉽다.

`Props`를 사용하면 전체 component를 유지한 채 원하는 부분의 내용만 바꿀 수 있다.

### HTML tag and Props

`Props`를 이해하기 위해 익숙한 html의 tag에서 시작해보자.

html element 동일한 tag를 사용하면서 속성값을 다르게 줄 수 있다. 기본적인 역할은 비슷하면서 세부적인 부분을 다르게 수행할 수 있다.

```html
<!-- example -->
<!-- two <a> element has different href attribute -->
<!-- 둘 다 특정한 곳으로 이동하는 링크를 제공하지만 이동하는 목적지는 다르다. -->
<a href="/html">HTML</a>
<a href="/css">CSS</a>
```

이 개념을 component에 적용할 수 있다.

* `Component`: html의 태그에 해당한다.
* `Props`: html의 attribute에 해당한다.

### Props 사용하기

Props를 사용하기 위해서는

* Component를 만들 때 component 마다 변화를 주고 싶은 부분을 `{this.props.{probs 이름}}` 으로 입력한다.
* 그 component를 사용할 때 `<Component {probs 이름}={넣고싶은 값}>`으로 작성한다.

앞의 `Subject` component를 props를 이용해서 수정해보자.

```js
class Subject extends Component {
  render() {
    return (
      <header>
        {/* before: <h1>WEB</h1> */}
        <h1>{this.props.title}</h1>
        {/* before: world wide web! */}
        {this.props.sub}
      </header>        
    );
  }
}

// ...

class App extends Component {
  render() {
    return (
      <div className="App">
        {/* title과 sub props 입력 */}
        <Subject title="WEB" sub="world wide web!"></Subject>
        <TOC></TOC>
        <Content></Content>
      </div>        
    );
  }
}

export default App
```

### React Developer Tool

React 홈페이지의 [Community - Tools]로 가면 React로 개발할 때 유용한 도구들이 모여있다.

그 중 Debugging 항목의 'React Developer Tool'은 React의 component를 쉽게 탐색할 수 있는 도구로 Chrome developer tool을 사용하는 것 처럼 compile 전의 react element를 탐색할 수 있도록 해준다.

브라우저에 맞게 다운로드해 설치한 뒤 Chorome 개발자 도구에 들어가면 'React'탭이 추가되어있고 변환 되기 전의 React componenet로 이루어진 문서의 구조를 볼 수 있다.

## Component를 개별 파일로 분리하기

component가 복잡해지고 그 수가 많아지면 이를 정리해주어야 한다. 가장 보편적인 방법은 component를 개별 파일로 분리하는 것이다.

앞의 `Subject` component를 새로운 파일로 분리시켜보자.

기존의 `App.js`에서 Subject component를 분리해 새로운 파일 (i.e., `Subject.js`)을 만들어 붙여넣어준다.

```js
/* Subject.js */

import React, { Component } from 'react';

class Subject extends Component {
  render() {
    return (
      <header>
        <h1>{this.props.title}</h1>
        {this.props.sub}
      </header>        
    );
  }
}

// `export`는 이 문서에 정의되어 있는 function, class 등을 문서 외부에서 사용할 수 있도록 해준다.
// Subject component를 export
export default Subject;
```

`App.js`에서 `Subject.js` 에서 정의한 class를 사용할 수 있도록 import 해준다

```js
/* App.js */

// 현재 폴더 안의 component 폴더 안의  Subject.js에서 Subject class를 import.
// js 파일은 확장자를 따로 적어주지 않아도 괜찮다.
import Subject from "./components/Subject"

// ...

// 그대로 작성
class App extends Component {
  render() {
    return (
      <div className="App">
        <Subject title="WEB" sub="world wide web!"></Subject>
        <TOC></TOC>
        <Content></Content>
      </div>        
    );
  }
}

export default App
```
