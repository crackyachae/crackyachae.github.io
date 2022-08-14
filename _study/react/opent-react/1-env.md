---
layout  : article
title   : 1. 개발환경
summary : 
date    : 2020-11-29 16:26:10 +0900
updated : 2020-12-15 02:20:43 +0900
tag     : draft
toc     : true
public  : true
parent  : [[/react/opent-react]]
latex   : false
---
* TOC
{:toc}

> 이 글은 생활코딩의 [개발환경](https://opentutorials.org/module/4058/24666) 강의내용을 복습하기 위해 작성한 글입니다.
>
> * 제가 필요한 부분 위주로 확인하면서 정리하고 있어 글에 덜 작성된 부분이 있을 수 있습니다.
> * 글 작성 후 원문의 내용이 수정되거나 내용을 이해하기 위한 개인적인 설명이나 해석이 있을 수 있습니다. 되도록 원문을 참고해주시길 바랍니다.
> * 잘못된 부분이 있다면 댓글이나 그 외 편하신 방법으로 알려주시면 감사하겠습니다.

## 커버페이지 소개

조금의 정보를 표현하기 위한 HTML 태그의 양이 많기 때문에 웹 사이트의 복잡도는 매우 빠르게 증가한다.

이를 해결하기 위해 React를 이용하면

* 현재 웹 사이트를 구성하고 있는 element (e.g., top, sidebar)의 복잡한 코드를 해당 웹 페이지 밖으로 빼내와서
* 새로운 파일에 사용자 정의 태그로 정의한 뒤 (e.g., `<top>`, `<sidebar>`) 기존의 웹 페이지에서 사용한다.
* 이렇게 만든 사용자 정의 태그를 **_component_** 라고 한다.
  
Component를 구성해서 사용하면 해당 component의 재사용 및 유지 보수가 용이해진다.

## 오리엔테이션

전체 프로세스 중 핵심적인 (본질적인) 부분에만 집중

* Coding: 개발환경을 세팅하고 코드를 수정할 부분을 파악하는 법
* Run: 작성한 코드를 실행해서 결과를 조회하는 법
* Deploy: 개발이 끝나고 프로그램을 소비자에게 전달하는 법

## React.js 개발환경의 종류

[공식 문서](https://ko.reactjs.org/docs/getting-started.html)의 'Get Started'를 참고

* Online Playground: 온라인상에서 react application을 구현하고 테스트 해볼 수 있다.
* Add React to a Website: 이미 만들어진 웹 사이트에 react를 사용. 뒤로 갈수록 까다로워짐
* Create a New React App
    * Tool Chian: 해당 프로그램을 이용해 개발할 때 필요한 개발 환경 도구 등을 일괄적으로 제공해주는 것.
    * [리엑트에서 제공하는 문서](https://ko.reactjs.org/docs/create-a-new-react-app.html)를 참고
    * Recommended Toolchians 에서 `Create React App`을 사용할 예정.

`Create React App`을 설치 할 때 해당 패키지에서 안내해주는 방법이 아닌 npm을 이용해서 설치할 예정

* `npm`: `node.js`를 이용해서 만든 프로그램을 쉽게 설치할 수 있게 해주는 앱스토어 같은 역할.

## npm을 이용해서 create-react-app 설치

node.js를 먼저 설치. 공식 사이트에 방문해서 설치한다.

* LTS: 안정화 버전
* Current: 최신 버전

`npm -v` 를 입력해서 `npm`의 설치 여부를 확인

* 설치가 잘 되었으면 설치된 버전이 확인된다.

`npm`을 이용해서 `create-react-app`을 설치하는 방법

```
npm install -g create-react-app
```

* `npm`을 이용해서 `create-react-app`을 설치

* `-g` 컴퓨터 전체에서 사용할 수 있도록 설치
* 설치중 권한이 없으면 에러 발생하는데 이 경우 앞에 `sudo`를 붙여서 다시 명령어를 관리자 권한으로 실행
* 설치가 완료되었으면 `create-react-app -V`를 입력해서 설치 여부와 버전을 확인한다.

+)

`npx` 명령어를 이용해서 설치하는 방법 (공식적으로 권하는 방법)

* `npx`: 해당 프로그램을 임시로 설치해서 한 번만 사용한 뒤 삭제
    * 항상 최신 상태의 프로그램을 이용할 수 있고
    * 불필요하게 컴퓨터의 용량을 차지하지 않는다.

## create-react-app 을 이용해서 개발환경 구축

프로젝트 폴더에 개발 환경을 설정.

프로젝트 폴더로 이동

```zsh
cd [프로젝트 폴더의 경로]
```

현재 폴더에서 `create-react-app`을 실행.

```zsh
create-react-app .
```

* `.`: 현재폴더

## 샘플 앱 실행하기

```zsh
npm run start
```

위의 명령어를 입력하면 브라우저가 실행되면서 react가 최소한으로 구현해 놓은 샘플 앱이 실행

종료하기 위해서는 `^C`를 누르면 된다.

## JavaScript 코딩하는 법

### 디렉토리 구조

* `public`: `index.html`이 있는 곳.

`index.html`는 react를 실행했을 때 열리는 페이지

* `create-react-app`의 경우 생성된 모든 component가 이 파일의

  ```html
  <div id="root"></div>
  ```

  안에 위치하도록 설정되어있다.

실제로 샘플 `index.html` 파일에서는 저 영역 안에 아무 내용도 작성되어있지 않지만,

앱 페이지의 element를 조회해보면 `<div id="root"></div>` 안에 미리 생성해놓은 component들이 위치해 있는 것을 볼 수 있다.

```html
<div className="App">
  <header className="App-header">
    <img src={logo} className="App-logo" alt="logo" />
    <p>
      Edit <code>src/App.js</code> and save to reload.
    </p>
    <a
      className="App-link"
      href="https://reactjs.org"
      target="_blank"
      rel="noopener noreferrer"
    >
      Learn React
    </a>
  </header>
</div>
```

이 componenet들은 대부분 `src` 폴더안에 위치한다.

진입 파일은 `src` 폴더 안의 `index.js`를 보면

```js
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
```

이 존재하는데 `id`가 `root`인 element를 가리키고 있음을 확인할 수 있다.

여기의 `<App />` 이 사용자 정의 태그, component를 의미한다

위를 확인하면 `./App` (i.e., 현재 폴더의 `App.js`)로 부터 `App`을 `import` 해 온 것을 알 수 있다.

```js
import App from './App';
```

이 때 import 뒤에 온 App과 ReactDOM.render의 첫 번째 인자인 <App />은 같은 단어를 사용해야 하고
첫 문자는 대문자이여야 한다.

`App.js` 파일이 function type으로 작성되어있다면 class type으로 바꾸는 것을 권장한다.

```js
// function type

function App() {
  return (
    <div className="App">
      ...
    </div>
  );
}

export default App;

// class type

// React가 갖는 Component라는 class를 상속받는 class App을 생성
class App extends Component {
  // App class는 render라는 method를 갖는다
  render() {
    return (
      <div className="App">
        ...
      </div>
    );
  }
}

export default App;
```

확인해보면 `App.js`에 작성되어있는 이 component가 아까 확인했던 <div id="root"> 안에 구현되어 있던 element와 일치한다는 것을 알 수 있다.

다만, react는 생성할 component가 반드시 하나의 태그 안에 있어야 하므로 주의해야한다.

## CSS 코딩하는 법

`index.js` 에

```html
import `./index.css`
```

가 있기 때문에

`index.css` 파일을 수정하면 `index.html` 의 CSS를 수정할 수 있다.

component의 css의 경우
App.js 를 확인하면 App.css를 import 하는 것을 확인할 수 있는데 component의 css는 App.css에서 수장할 수 있음을 알 수 있다.

## 배포하는 법

현재 만들어진 React 프로젝트의 페이지를 reload 하면 생각보다 용량이 크다는 것을 확인할 수 있다.

이는 개발에 필요한 여러 파일들이 포함되어있기 때문이다.

production 용도의 application을 만들 때, 즉 build 할 때는

```zsh
npm run build
```

를 입력한다.

위의 명령어를 입력하면 build 디렉토리가 생기면서 production용 파일을 그 안에 형성한다.

terminal에 표시된
`serve -s build` 는 `serve`는 웹 서버를 사용할 수 있는 패키지로 `npx`를 통해서 일회성으로 설치해 사용할 수도 있으며

`npx serve -s build` 라고 입력하면
`build` 디렉토리를 server의 root로 해서 (`-s`) 서버를 구동힌다.

실제로 build한 것을 서버로 구동하면 용량이 상당량 줄어있다는 것을 확인할 수 있다.
