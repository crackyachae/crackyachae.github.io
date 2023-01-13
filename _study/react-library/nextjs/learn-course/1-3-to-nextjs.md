---
layout  : article
title   : React에서 Next.js로 (From React to Next.js)
summary : 
date    : 2023-01-12 18:20:05 +0900
updated : 2023-01-13 16:49:18 +0900
tag     : 
toc     : true
public  : true
parent  : [[/react-library/nextjs/learn-course]]
latex   : false
---
* TOC
{:toc}

> 이 글은 Next.js에서 제공하는 learn course의 [FOUNDATION](https://nextjs.org/learn/foundations/) 중 [From React to Next.js](https://nextjs.org/learn/foundations/from-react-to-nextjs)의 내용을 번역 및 정리한 글입니다.
>
> * 제가 필요한 부분 위주로 확인하면서 정리하고 있어 글에 덜 작성된 부분이 있을 수 있습니다.
> * 글 작성 후 원문의 내용이 수정되거나 내용을 이해하기 위한 개인적인 설명이나 해석이 있을 수 있습니다. 되도록 원문을 참고해주시길 바랍니다.
> * 잘못된 부분이 있다면 댓글이나 그 외 편하신 방법으로 알려주시면 감사하겠습니다.

이전 강의에서는, React를 어떻게 시작하는지에 대해 논의했습니다. 이것이 최종 코드의 모습입니다. 만약 당신이 여기서부터 시작한다면, 이 코드를 코드 에디터의 `index.html` 파일에 붙여 넣으세요.

```jsx
<html>
  <body>
    <div id="app"></div>

    <script src="https://unpkg.com/react@17/umd/react.development.js"></script>
    <script src="https://unpkg.com/react-dom@17/umd/react-dom.development.js"></script>
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>

    <script type="text/jsx">
      const app = document.getElementById("app")

      function Header({ title }) {
        return <h1>{title ? title : "Default title"}</h1>
      }

      function HomePage() {
        const names = ["Ada Lovelace", "Grace Hopper", "Margaret Hamilton"]

        const [likes, setLikes] = React.useState(0)

        function handleClick() {
          setLikes(likes + 1)
        }

        return (
          <div>
            <Header title="Develop. Preview. Ship. 🚀" />
            <ul>
              {names.map((name) => (
                <li key={name}>{name}</li>
              ))}
            </ul>

            <button onClick={handleClick}>Like ({likes})</button>
          </div>
        )
      }

      ReactDOM.render(<HomePage />, app)
    </script>
  </body>
</html>
```

이제, 간단한 React 앱에서 Next.js로 어떻게 옮겨가는지 살펴보겠습니다.

## Next.js 시작하기

프로젝트에 Next.js를 추가하기 위해 더 이상 `unpkg.com`에서 `react`나 `react-dom` 스크립트를 불러올 필요가 없습니다. 대신, Node 패키지 매니저인 `npm`을 이용해서 이 패키지들을 로컬에 설치할 수 있습니다.

> Note: Node.js가 기기에 설치되어있어야 하고 ([최소 요구 사항](https://nextjs.org/docs/upgrading#minimum-nodejs-version)), [여기서 다운받을](https://nodejs.org/en/) 수 있습니다.

이렇게 하려면 빈 객체 `{}`와 함께 `package.json`이라는 새로운 파일을 만드세요.

```json
// package.json
{
}
```

터미널에서 `npm install react react-dom next`를 실행하세요. 설치가 완료되면, 당신의 `package.json` 파일에서 당신의 프로젝트 의존성(dependencies) 목록을 볼 수 있을 것입니다.

```json
// package.json
{
  "dependencies": {
    "next": "^12.1.0",
    "react": "^17.0.2",
    "react-dom": "^17.0.2"
  }
}
```

프로젝트 의존성 들의 실제 파일을 포함하고 있는 `node_modules`란 새로운 폴더가 생긴 것도 발견할 수 있을 것입니다.

`index.html`로 파일로 돌아가면, 다음의 코드를 제거할 수 있습니다:

1. `react`와 `react-dom` 스크립트. NPM으로 설치했습니다.
2. `<html>`과 `<body>` 태그. Next.js가 대신 생성해 줄 예정입니다.
3. `app` 요소와 `ReactDom.render()` 메소드와 관련된(interacts with) 코드
4. `Babel` 스크립트. Next.js는 JSX를 브라우저가 이해할 수 있는 유효한 JavaScript로 변환해주는 컴파일러가 갖습니다.
5. `<script type="text/jsx">` 태그
6. `React.useState(0)` 함수의 `React.` 부분

위의 코드를 제거하면, `import { useState } from "react"`를 파일 상단에 추가하세요. 코드는 다음과 같이 보일 것입니다:

```jsx
// index.html
import { useState } from 'react';
function Header({ title }) {
  return <h1>{title ? title : 'Default title'}</h1>;
}

function HomePage() {
  const names = ['Ada Lovelace', 'Grace Hopper', 'Margaret Hamilton'];

  const [likes, setLikes] = useState(0);

  function handleClick() {
    setLikes(likes + 1);
  }

  return (
    <div>
      <Header title="Develop. Preview. Ship. 🚀" />
      <ul>
        {names.map((name) => (
          <li key={name}>{name}</li>
        ))}
      </ul>

      <button onClick={handleClick}>Like ({likes})</button>
    </div>
  );
}
```

HTML 파일에 JSX 코드만 남게 되었으므로, 파일 유형을 `.html`에서 `.js`나 `.jsx`로 바꿀 수 있습니다.

이제, Next.js 앱으로 완전히 전환하려면 다음 세 가지를 더 수행해야 합니다:

1. `index.js` 파일을 `pages`라는 새로운 폴더로 옮겨야 합니다(이후에 더 다룰 예정입니다).
1. Next.js가 어떤 컴포넌트를 이 페이지의 메인 컴포넌트로 렌더링해야 하는지 구분할 수 있도록  메인 React 컴포넌트에 default export를 추가하세요.

```jsx
   // ...
   export default function HomePage() {
   //  ...
```

1. 개발하는 동안 Next.js 개발 서버를 실행하기 위한 스크립트를 `package.json` 파일에 추가하세요.

```json
   // package.json
   {
    "scripts": {
        "dev": "next dev"
    },
     // "dependencies": {
     //   "next": "^11.1.0",
     //   "react": "^17.0.2",
     //   "react-dom": "^17.0.2"
     // }
   }
```

### 개발 서버 실행하기

모든 것이 문제없이 실행되는지 확인하려면 터미널에서 `npm run dev`를 실행하고 브라우저에서 [localhost:3000](http://localhost:3000)로 이동해 앱을 볼 수 있다. 다음으로 코드를 약간 수정하고 저장해보세요.

파일을 저장했을 때, 브라우저가 변경 사항을 반영하기 위해 자동으로 업데이트되는 것을 확인할 수 있습니다.

이 기능은 [Fast Refresh](https://nextjs.org/docs/basic-features/fast-refresh)라고 합니다. 이것은 당신이 편집한 사항에 대한 즉각적인 피드백을 제공하며 Next.js로 미리 구성되어 제공됩니다.

요약하면, 코드는 이것으로부터...

```jsx
<html>
  <body>
    <div id="app"></div>

    <script src="https://unpkg.com/react@17/umd/react.development.js"></script>
    <script src="https://unpkg.com/react-dom@17/umd/react-dom.development.js"></script>
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>

    <script type="text/jsx">
      const app = document.getElementById("app")

      function Header({ title }) {
        return <h1>{title ? title : "Default title"}</h1>
      }

      function HomePage() {
        const names = ["Ada Lovelace", "Grace Hopper", "Margaret Hamilton"]
        const [likes, setLikes] = React.useState(0)

        function handleClick() {
          setLikes(likes + 1)
        }

        return (
          <div>
            <Header title="Develop. Preview. Ship. 🚀" />
            <ul>
              {names.map((name) => (
                <li key={name}>{name}</li>
              ))}
            </ul>

            <button onClick={handleClick}>Like ({likes})</button>
          </div>
        )
      }

      ReactDOM.render(<HomePage />, app)
    </script>
  </body>
</html>
```

이렇게 변했습니다:

```jsx
import { useState } from 'react';

function Header({ title }) {
  return <h1>{title ? title : 'Default title'}</h1>;
}

export default function HomePage() {
  const names = ['Ada Lovelace', 'Grace Hopper', 'Margaret Hamilton'];
  const [likes, setLikes] = useState(0);

  function handleClick() {
    setLikes(likes + 1);
  }

  return (
    <div>
      <Header title="Develop. Preview. Ship. 🚀" />
      <ul>
        {names.map((name) => (
          <li key={name}>{name}</li>
        ))}
      </ul>

      <button onClick={handleClick}>Like ({likes})</button>
    </div>
  );
}
```

표면적으로는 코드 몇 줄이 줄어든 것(small reduction)으로 보이지만, 다음의 내용을 강조하는 데 도움이 됩니다: React는 현대적인 인터랙티브 UI를 구축하기 위한 **필수적인** 기본 요소를 제공하는 **라이브러리**입니다. 하지만 당신이 만든 UI를 애플리케이션에 결합하기 위한 작업은 여전히 남아(involved)있습니다.

마이그레이션을 과정을 살펴보면, 이미 Next.js를 사용했을 때 얻는 이점을 파악하고 있을 수도 있습니다. Babel 스크립트를 제거해서, 더 이상 복잡한 도구 구성의 맛에 대해 생각할 필요가 없습니다. 또한 Next.js에서 기대할 수 있는 다양한 개발 경험 기능 중 고작 하나인 Fast Refresh가 작동하는 것도 보았습니다.

## 다음 단계

당신의 첫 번째 Next.js 애플리케이션을 만든 것을 축하합니다!

요약하면, 당신은 React와 Next.js를 위한 기반(foundational) 지식을 살펴(explored)보았고, 간단한 React 애플리케이션을 Next.js 애플리케이션으로 옮겨보았습니다..

이제 당신은 당신의 Next.js 여정의 다음 단계를 선택할 수 있습니다. 당신은:

1. [당신의 첫 번째 앱을 만들면서](https://nextjs.org/learn/basics/create-nextjs-app) Next.js를 사용하는 방법을 배울 수 있습니다 - 이 과정에서는 **주요한** Next.js 기능을 소개하고 더 복잡한 프로젝트를 구축하며 Next.js를 연습할 수 있습니다.
2. 이 과정을 계속 진행해 Next.js가 작동하는 방식을 더 깊게 알아볼 수 있습니다.

다음 강의에서는, 관련된 웹 개발 개념을 소개하면서 Next.js가 동작하는 방식을 알아볼 것입니다. 이런 개념에 익숙해지면 당신의 기반을 확장하고 고급 Next.js 기능을 더 쉽게 익히는 데 도움이 될 것입니다.
