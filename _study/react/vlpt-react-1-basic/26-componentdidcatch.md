---
layout  : article
title   : 26. componentDidCatch 로 에러 잡아내기 / Sentry 연동
summary : 
date    : 2021-03-28 17:48:03 +0900
updated : 2021-03-28 23:07:57 +0900
tag     : 
toc     : true
public  : true
parent  : [[/react/vlpt-react-1-basic]]
latex   : false
---
* TOC
{:toc}

> 이 글은 벨로퍼트와 함께하는 모던 React중 [26. componentDidCatch 로 에러 잡아내기 / Sentry 연동](https://react.vlpt.us/basic/26-componentDidCatch-and-sentry.html)의 내용을 복습하기위해 핵심 내용을 요약 정리한 글입니다.
>
> * 제가 필요한 부분 위주로 확인하면서 정리하고 있어 글에 덜 작성된 부분이 있을 수 있습니다.
> * 글 작성 후 원문의 내용이 수정되거나 내용을 이해하기 위한 개인적인 설명이나 해석이 있을 수 있습니다. 되도록 원문을 참고해주시길 바랍니다.
> * 잘못된 부분이 있다면 댓글이나 그 외 편하신 방법으로 알려주시면 감사하겠습니다.

`componentDidCatch` 라는 생명주기 메서드를 사용해 리액트 애플리케이션에서 발생하는 에러를 처리하는 방법을 알아보자.

먼저, 이번 튜토리얼을 진행 하기 위해 새로운 프로젝트를 만든다.

```shell
npx create-react-app error-catch
```

그 다음에, 해당 디렉터리를 에디터로 열고, 개발 서버를 시작한다.

```shell
cd error-catch
yarn start
```

## 리액트 앱에서 에러가 발생하는 상황

먼저, 어떤 상황에서 리액트 앱에 에러가 발생하는지 알아보자.

`User.js` 라는 파일을 src 디렉터리에 생성하여 다음과 같이 컴포넌트를 작성한다. 이 컴포넌트는 `user` 라는 props 를 받아와서 해당 데이터의 `id` 와 `username` 값을 보여준다.

```jsx
/* User.js */

import React from 'react';

// user props를 받아와서
function User({ user }) {
  return (
    <div>
      <div>
        { /* user의 id와 */ }
        <b>ID</b>: {user.id}
      </div>
      <div>
        { /* user의 username 값을 보여준다. */ }
        <b>Username:</b> {user.username}
      </div>
    </div>
  );
}

export default User;
```

이 컴포넌트를 다음과 같이 App 컴포넌트에서 사용하면

```jsx
/* App.js */

import React from 'react';
// User 컴포넌트를 가져온다.
import User from './User';

function App() {
  const user = {
    id: 1,
    username: 'velopert'
  };
  // User 컴포넌트 사용.
  // Props로 위에서 정의한 user 값을 넘겨준다.
  return <User user={user} />;
}

export default App;
```

아래와 같은 결과가 나타난다.

![User component shows successfully]( /post-img/26-componentdidcatch/112747403-3c359680-8ff0-11eb-8474-4a597281c595.png )

만약에 다음과 같이 `user` props 를 제대로 설정하지 않으면

```js
/* App.js */

import React from 'react';
import User from './User';

function App() {
  const user = {
    id: 1,
    username: 'velopert'
  };
  // Props로 값을 제대로 넘겨주지 않았다.
  return <User />;
}

export default App;
```

아래와 같은 에러가 발생한다.

![Error show up because of missing props]( /post-img/26-componentdidcatch/112747411-45266800-8ff0-11eb-9ef6-356a8e887569.png )

이 화면은 개발환경에서만 보여지는 에러화면으로, 실제 환경에서는 아무것도 렌더링되지 않고 흰 페이지만 나타나게 된다. 우측 상단의 X 버튼을 누르면 실제 환경에서 보여지는 화면이 나타난다.

![black page shows up]( /post-img/26-componentdidcatch/112747422-4b1c4900-8ff0-11eb-953a-82c77180dce2.png )

실제 서비스에서 사용자에게 이런 상황은 상당히 당황스럽기 때문에, 이번 튜토리얼을 통해 에러가 발생했을 때 흰 화면 대신에 에러가 발생했다는 것을 알려줄 수 있도록 해보자.

먼저 이런 에러가 발생하는 다양한 상황과, 각 상황에서 에러를 방지 할 수 있는 방법에 대해서 알아보자.

일단, 방금과 같은 에러는 `User` 컴포넌트를 다음과 같이 작성해 방지할 수 있다.

```jsx
/* User.js */

import React from 'react';

function User({ user }) {
  // user가 존재하지 않으면 (props가 제대로 전달되지 않으면)
  if (!user) {
    // null을 렌더링한다.
    return null;
  }

  return (
    <div>
      <div>
        <b>ID</b>: {user.id}
      </div>
      <div>
        <b>Username:</b> {user.username}
      </div>
    </div>
  );
}

export default User;
```

* `User` 안의 첫 코드는 `user` 값이 존재하지 않는다면 `null` 을 렌더링한다.
* 리액트 컴포넌트에서 `null` 을 렌더링하면 아무것도 나타나지 않는다. 이런 방식을 "null checking" 이라고 부른다.

코드를 이렇게 작성하면, 화면에 아무것도 보이지 않는것은 마찬가지이지만, 적어도 에러는 발생하지 않는다. 보통 네트워크 요청을 통해 데이터를 나중에 받아오게 되는 상황에서 데이터가 없을 경우 이렇게 `null` 을 보여주거나, 아니면 `<div>로딩중</div>`과 같은 결과물을 렌더링한다.

다음과 같이 컴포넌트에 `users` 값을 설정해주지 않았을 때에도 렌더링 과정에서 오류가 발생한다. `users` 가 `undefined` 이면 당연히 배열의 내장함수 `map` 또한 존재하지 않기 때문이다.

```jsx
function Users({ users }) {
  return (
    // users is undefined
    <ul>
      {users.map(user => (
        <li key={user.id}>{user.username}</li>
      ))}
    </ul>
  );
}
```

이처럼 `users` 의 값이 없는 경우에도 이전 경우와 유사하게 다른 결과물을 반환하는 작업을 해주어야 한다.

```jsx
function Users({ users }) {
  // users의 값이 정의되지 않았으면 null을 렌더링한다.
  if (!users) return null;

  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>{user.username}</li>
      ))}
    </ul>
  );
}
```

다음과 같은 상황에서 컴포넌트에 `onToggle` props 를 전달받지 못해도 에러가 발생한다.

```jsx
function Users({ users, onToggle }) {
  if (!users) return null;

  return (
    <ul>
      {users.map(user => (
        <li key={user.id} onClick={() => onToggle(user.id)}>
          {user.username}
        </li>
      ))}
    </ul>
  );
}
```

이런 에러를 방지하기 위해선 다음과 같이 `defaultProps` 설정을 해줄 수 있다.

```jsx
function Users({ users, onToggle }) {
  if (!users) return null;

  return (
    <ul>
      {users.map(user => (
        <li key={user.id} onClick={() => onToggle(user.id)}>
          {user.username}
        </li>
      ))}
    </ul>
  );
}

// props의 기본값을 설정한다.
Users.defaultProps = {
  // onToggle의 기본값은
  onToggle: () => {
    // 콘솔에 onToggle을 입력하지 않았다는 경고메시지를 출력하는 것이다.
    console.warn('onToggle is missing!');
  }
};
```

다른 해결방법으로 `PropTypes` 라는 것을 사용할 수도 있다. `PropTypes` 를 사용하면 필요한 데이터를 넣지 않았을 때 개발 단계에서 경고를 볼 수 있기 때문에 실수로 props 설정을 하지 않는 일을 방지 할 수 있다. 단, 사용법이 좀 번거롭기 때문에 `PropTypes` 보다는 나중에 TypeScript 또는 Flow 를 사용해서 관리 하는 것을 권장하는 편이다. (이 강좌에서는 추후 TypeScript 를 사용한다.)

## componentDidCatch 로 에러 잡아내기

이번에는 `componentDidCatch` 생명주기 메서드를 사용하여 우리가 사전에 예외처리를 하지 않은 에러가 발생 했을 때 사용자에게 에러가 발생했다고 알려주는 화면을 보여줘보자.

우선, src 디렉터리에 ErrorBoundary 라는 컴포넌트를 만든다.

```jsx
/* ErrorBoundary.js */

import React, { Component } from 'react';

class ErrorBoundary extends Component {
  // error state의 기본값: false
  state = {
    error: false
  };

  componentDidCatch(error, info) {
    console.log('에러가 발생했습니다.');
    console.log({
      error,
      info
    });
    // error state를 true로 설정
    this.setState({
      error: true
    });
  }

  render() {
    // error state 값이 true 이면
    if (this.state.error) {
      // 에러가 발생했다는 문구를 렌더.
      return <h1>에러 발생!</h1>;
    }
    // 그렇지 않으면 현재 컴포넌트의 children을 렌더.
    return this.props.children;
  }
}

export default ErrorBoundary;
```

`componentDidCatch` 메서드에는 두 개의 파라미터를 사용한다.

* 첫번째 파라미터는 에러의 내용,
* 두번째 파라미터에서는 에러가 발생한 위치를 알려준다.

에러가 발생하면 이 메서드에서 현재 컴포넌트 상태 `error` 를 `true` 로 설정을 해준다.

`render()` 메서드에서는

* 만약 `this.state.error` 값이 `true` 라면 에러가 발생했다는 문구를,
* 그렇지 않다면 `this.props.children` 을 렌더링하도록 한다.

그 다음에 App 컴포넌트에서 `<User />` 컴포넌트를 감싸준다.

```jsx
/* App.js */

import React from 'react';
import User from './User';
import ErrorBoundary from './ErrorBoundary';

function App() {
  const user = {
    id: 1,
    username: 'velopert'
  };
  return (
    // ErrorBoundary 컴포넌트의 children이 User 컴포넌트
    <ErrorBoundary>
      <User />
    </ErrorBoundary>
  );
}

export default App;
```

이전에 User 컴포넌트에서 null checking 을 하는 코드를 주석처리해서 마무리 한다.

```jsx
/* User.js */

import React from 'react';

function User({ user }) {
  // if (!user) {
  //   return null;
  // }

  return (
    <div>
      <div>
        <b>ID</b>: {user.id}
      </div>
      <div>
        <b>Username:</b> {user.username}
      </div>
    </div>
  );
}

export default User;
```

그리고 나서 브라우저를 열어 우측 상단의 X 버튼을 눌러 에러 화면을 닫으면 흰 화면이 아닌 "에러 발생!" 이라는 문구가 보이게 된다.

![에러 발생! shows up instead of black page]( /post-img/26-componentdidcatch/112753857-5da87980-9014-11eb-8ab9-436a34cbc0b3.png )

## Sentry 연동

`componentDidCatch` 를 사용해서 앱에서 에러가 발생했을 때 사용자에게 에러가 발생했다는 것을 인지시켜줄 수 는 있지만, `componentDidCatch` 가 실제로 호출되는 일은 서비스에서 "없어야 하는게" 맞다. 만약에 놓진 에러가 있다면, 이를 알아내어 예외 처리를 해주어야 한다.

놓친 오류를 사용자가 발견했을 때 `componentDidCatch` 의 `error` 와 `info` 값을 네트워크를 통하여 다른 곳으로 전달을 해주면 이를 알아채고 대응할 수 있다.

다만 이를 위해서 따로 서버를 만드는건 굉장히 번거로운 작업이기 때문에 대안으로, [Sentry](https://sentry.io/welcome/) 라는 상용서비스가 존재한다. 무료 모델도 사용하기에는 충분하기 때문에 장기적으로 작업하는 프로젝트에 적용하는 것을 권장한다.

![main page of Sentry]( /post-img/26-componentdidcatch/112754016-32725a00-9015-11eb-91ef-3dcb4804356f.png )

[Sentry](https://sentry.io/welcome/) 에서 회원가입 및 로그인을 하고 새 프로젝트를 생성한다. 회원가입 과정에서 팀 이름은 실제로 속해있는 곳이 없어도 임의로 입력하면 된다.

![create a new project]( /post-img/26-componentdidcatch/112754020-343c1d80-9015-11eb-84af-ddf36be2f7ff.png )

React 를 선택 후 프로젝트에 이름을 작성하면 다음과 같이 Sentry 를 현재 프로젝트에 적용하는 방법이 나타난다.

![image]( /post-img/26-componentdidcatch/112754084-7c5b4000-9015-11eb-8cf4-bce4dbcf63b6.png )

프로젝트에 적용해보자.

프로젝트 디렉터리에서 `@sentry/browser` 를 설치한다.

```shell
yarn add @sentry/browser
```

그리고 Sentry 페이지의 Instruction 대로 작업을 해주면 된다.

```jsx
/* index.js */

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import *as Sentry from '@sentry/browser';
import* as serviceWorker from './serviceWorker';

Sentry.init({
  // 자신의 dns 값을 입력한다.
  dsn: 'https://87fba3b585d940f58806848807325ffb@sentry.io/1493504'
});

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
```

`Sentry.init()` 을 사용 할 때 넣는 `dsn` 값은 프로젝트마다 다르니, 자신의 `dsn` 값을 넣어야한다.

작업을 완료 후, 리액트 앱을 브라우저에서 새로고침을 하면 이렇게 실시간으로 현재 상태를 확인할 수 있다.

![error appeared in error-catch page]( /post-img/26-componentdidcatch/112754340-8fbadb00-9016-11eb-8558-258610c479fc.png )

![error detail]( /post-img/26-componentdidcatch/112754341-947f8f00-9016-11eb-8f04-6c668a939756.png )

개발모드일땐 별도의 작업을 하지 않아도 에러가 발생 했을 때 Sentry 쪽으로 전달이 잘 되지만, 프로젝트를 완성하여 실제 배포를 하게 됐을 때는 `componentDidCatch` 로 이미 에러를 잡아줬다면 Sentry 에게 자동으로 전달이 되지 않는다.

이를 전달받기 위해서는 ErrorBoundary 를 다음과 같이 수정해야 한다.

```js
/* ErrorBoundary.js */

import React, { Component } from 'react';
import * as Sentry from '@sentry/browser';

class ErrorBoundary extends Component {
  state = {
    error: false
  };

  componentDidCatch(error, info) {
    console.log('에러가 발생했습니다.');
    console.log({
      error,
      info
    });
    this.setState({
      error: true
    });
    // 프로덕션 (배포) 환경일 경우
    if (process.env.NODE_ENV === 'production') {
      // captureException 을 사용.
      Sentry.captureException(error, { extra: info });
    }
  }

  render() {
    if (this.state.error) {
      return <h1>에러 발생!</h1>;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
```

`componentDidCatch` 에서 `process.env.NODE_ENV` 값을 조회해 현재 환경이 개발 환경인지 프로덕션 환경인지 (production / development) 확인 할 수 있다. 개발 환경에서는 `captureException` 을 사용 할 필요가 없으므로 프로덕션 환경에서만 이 작업을 해준다.

## 프로덕션 환경에서 잘 작동하는지 확인하기

프로덕션 환경에서도 잘 작동하는지 확인하기 위해서는 다음 명령어를 실행해 프로젝트를 빌드한다.

```shell
yarn build
```

조금 기다리면 결과물이 build 디렉터리에 나타난다. build 디렉터리에 있는 파일들을 제공하는 서버를 실행하기 위해서는 다음 명령어를 실행한다.

```shell
npx serve ./build
```

`serve` 는 웹서버를 열어서 특정 디렉터리에 있는 파일을 제공해주는 도구이다.

브라우저로 http://localhost:5000/ 에 들어가본 뒤, Sentry 에 새로운 항목이 추가됐는지 확인한다.

![error appeared again in error-catch page]( /post-img/26-componentdidcatch/112754649-fe4c6880-9017-11eb-9c09-84fdaa5c31c4.png )

![error detail]( /post-img/26-componentdidcatch/112754652-02788600-9018-11eb-8f16-1d42403c0410.png )

이번에는 아까와 달리 에러가 어디서 발생했는지 상세한 정보를 알아보기 쉽지가 않은데, 이는 빌드 과정에서 코드가 minify 되면서 이름이 c, Xo, Ui, qa 이런식으로 축소됐기 때문이다.

만약에 코드 위치를 제대로 파악을 하고 싶다면 이 [링크](https://docs.sentry.io/platforms/javascript/sourcemaps/#webpack) 를 참조하면 된다.

Sentry 에서 minified 되지 않은 이름을 보려면 Sourcemap 이란것을 사용해야 하는데, 빌드를 할 때마다 자동으로 업로드 되도록 설정 할 수 있고, 직접 업로드 할 수도 있고, Sourcemap 파일이 공개 되어 있다면 별도의 설정 없이 바로 minified 되지 않은 이름을 볼 수 있다.
