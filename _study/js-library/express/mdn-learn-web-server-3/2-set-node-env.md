---
layout  : article
title   : 노드 개발 환경을 설정하기 (Setting up a Node development environment)
summary : 
date    : 2021-11-29 20:23:43 +0900
updated : 2021-11-29 22:37:40 +0900
tag     : draft
toc     : true
public  : true
parent  : [[/js-library/express/mdn-learn-web-server-3]]
latex   : false
---
* TOC
{:toc}

> 이 글은 MDN Learn web development의 [Express web framework (Node.js/JavaScript)](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs) 중 [Setting up a Node development environment](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/development_environment)의 내용을 번역 및 정리한 글입니다.
>
> * 제가 필요한 부분 위주로 확인하면서 정리하고 있어 글에 덜 작성된 부분이 있을 수 있습니다.
> * 글 작성 후 원문의 내용이 수정되거나 내용을 이해하기 위한 개인적인 설명이나 해석이 있을 수 있습니다. 되도록 원문을 참고해주시길 바랍니다.
> * 잘못된 부분이 있다면 댓글이나 그 외 편하신 방법으로 알려주시면 감사하겠습니다.

## Express 개발 환경 개요 (Express development environment overview)

이 섹션은

* 어떤 도구가 필요한지에 대한 개요를 제공하고
* Ubuntu, macOS, Windows에 Node (와 Express)를 설치하는 가장 간단한 방법을 설명하고
* 설치 여부를 어떻게 확인할 것인지 보여준다.

### Express 개발 환경이란? (What is the Express development environment?)

*Express* 개발 환경은 *Nodejs*, *NPM 패키지 매니저*, 그리고 (선택적으로) *Express 애플리케이션 생성기*를 로컬 컴퓨터에 설치하는 것을 포함한다.

### 지원 OS (What operating systems are supported?)

*Node*는 Windows, macOS, 다양한 종류의 Linux, Docker 등에서 실행할 수 있다. 전체 리스트는 nodejs [다운로드](https://nodejs.org/en/download/) 페이지에 있다.

*Express*는 *Node* 환경에서 실행되므로, *Node*를 실행할 수 있는 모든 플랫폼에서 실행할 수 있다.

### 사용할 Node/Express 버전 (What version of Node/Express should you use?)

### 데이터베이스와 그 외 의존성 라이브러리 (What about databases and other dependencies?)

데이터베이스 드라이버, 템플릿 엔진, 사용자 인증 엔진 등의 다른 의존성 라이브러리는 애플리케이션의 일부로, NPM 패키지 매니저를 사용해 애플리케이션 환경에 불러올 수 있다.

나중에 애플리케이션별(app-specific) 글에서 더 다룰(discuss) 예정이다.

## Node 설치하기 (Installing Node)

### macOS and Windows

### Ubuntu 20.04

### Nodejs와 NPM 설치를 확인하기 (Testing your Nodejs and NPM installation)

약간 더 흥미로운 테스트로 브라우저에서 올바른 URL에 접속했을 때 "Hello World"를 브라우저에 출력하는 매우 기본적인 "순수한 node" 서버를 만들어보자.

1. 아래의 텍스트를 **hellonode.js**라는 파일로 복사한다. 이 코드는 순수한 *Node* 기능(Express의 기능 없이)과 약간의 ES6 문법만 사용한다:

    ```js
    //HTTP 모듈을 불러온다
    const http = require("http");
    const hostname = '127.0.0.1';
    const port = 3000;

    //HTTP 서버를 만들고 3000번 포트에서 요청을 수신한다
    const server = http.createServer((req, res) => {

      //응답의 HTTP 헤더에 HTTP 상태와 콘텐츠 종류를 설정한다
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/plain');
      res.end('Hello World\n');
    });

    //3000번 포트의 요청을 수신하고, 콜백 함수로 포트가 로그인된 상태가 되도록(have the port listened on logged) 한다.
    server.listen(port, hostname, () => {
      console.log(`Server running at http://${hostname}:${port}/`);
    });
    ```

    * 코드는 "http" 모듈을 불러오고 3000번 포트에서 HTTP 요청을 수신하는 서버를 만드는데(`createServer()`) 사용한다.
    * 다음으로 스크립트가 서버를 테스트하기 위해 어떤 브라우저 URL을 사용할 수 있는지를 콘솔에 출력한다.
    * `createServer()` 함수는 HTTP 요청을 받았을 때 호출되는 콜백 함수를 인자로 갖는다.
        * 이 콜백 함수는 HTTP 상태 코드 200("OK")과 일반 텍스트 "Hello World"를 포함한 응답을 반환한다.
2. 다음과 같이 명령 프롬프트에서 `hellonode.js` 파일과 같은 디렉토리로 이동한 후 스크립트 이름과 함께 node를 호출해 서버를 시작한다:

    ```bash
    >node hellonode.js
    Server running at http://127.0.0.1:3000/
    ```

3. URL [http://127.0.0.1:3000](http://127.0.0.1:3000)로 이동하자. 모든 것이 작동하고 있으면 브라우저는 문자열 "Hello World"를 보여줄 것이다.

## NPM 사용하기 (Using NPM)

NPM은 *Node* 자체 다음으로, *Node* 애플리케이션 작업에 가장 중요한 도구이다. NPM은 애플리케이션을 개발, 테스트 및/또는 제작에 필요한 패키지(자바스크립트 라이브러리)를 가져오는 데 사용되며 개발 과정에서 사용되는 테스트와 도구를 실행하는데 사용될 수도 있다.

NPM을 직접(manually) 사용해 필요한 각 패키지를 각각 불러올 수도 있다. 하지만 일반적으로는 package.json 이라고 하는 일반-텍스트 정의 파일을 사용해 의존성 라이브러리를 관리한다.

### 의존성 라이브러리를 추가하기 (Adding dependencies)

다음의 단계들은 패키지를 다운로드하고, 프로젝트 의존성 라이브러리에 저장한 다음 Node 애플리케이션에 이를 포함하기 위해 NPM을 사용하는 방법을 보여준다.

1. 우선 새로운 애플리케이션을 위한 디렉토리를 만들고 그 안으로 이동한다.

    ```bash
    mkdir myapp
    cd myapp
    ```

2. npm `init` 명령어를 사용해 애플리케이션을 위한 **package.json** 파일을 만든다. 이 명령은 프로그램의 이름 및 버전, 초기 진입점 파일의 이름(기본적으로 index.js)을 포함해 여러 가지 사항을 묻는 메시지를 표시한다. 지금은 기본값을 그대로 사용한다.

    ```bash
    npm init
    ```

    만약 **package.json** 파일을 열면 (`cat package.json`) 라이센스 값으로 끝나는 방금 수락한 기본값들을 확인할 수 있다.

    ```json
    {
      "name": "myapp",
      "version": "1.0.0",
      "description": "",
      "main": "index.js",
      "scripts": {
        "test": "echo \"Error: no test specified\" && exit 1"
      },
      "author": "",
      "license": "ISC"
    }
    ```

3. 이제 `myapp` 디렉토리에 Express를 설치하고 이를 **package.json** 파일의 의존성 라이브러리 목록에 추가한다.

    ```bash
    npm install express
    ```

    이제 **package.json**의 의존성 라이브러리 섹션이 **package.json** 파일을 마지막에 나타나고 Express를 포함한다.

    ```json
    {
      "name": "myapp",
      "version": "1.0.0",
      "description": "",
      "main": "index.js",
      "scripts": {
        "test": "echo \"Error: no test specified\" && exit 1"
      },
      "author": "",
      "license": "ISC",
      "dependencies": {
      "express": "^4.17.1"
    }
    ```

4. Express 라이브러리를 사용하려면 index.js 파일에서 `require()` 함수를 호출해 (라이브러리를) 프로그램에 포함한다. 지금 이 파일을 "myapp" 애플리케이션 디렉토리의 루트에 만들어 아래의 내용을 작성한다:

    ```js
    const express = require('express')
    const app = express();
    const port = 8000;

    app.get('/', (req, res) => {
      res.send('Hello World!')
    });

    app.listen(port, () => {
      console.log(`Example app listening on port ${port}!`)
    });
    ```

    * 이 코드는 최소한의 "HelloWorld" Express 웹 애플리케이션을 나타낸다.
    * 이 코드는 `require()`을 사용해 "express" 모듈을 불러오고 8000번 포트에서 HTTP를 요청을 수신해 이 서버를 테스트하는데 사용할 수 있는 브라우저 URL을 설명하는 메시지를 콘솔 창에 출력하는 서버(`app`)를 만든다.
    * `app.get()` 함수는 지정된 URL 경로('/')와 함께 HTTP `GET` 요청에만 응답한다. 이 경우엔 함수를 호출해 *Hello World!* 메시지를 보낸다.
5. 명령 프롬프트에 스크립트로 노드를 호출해 서버를 시작할 수 있다.

    ```bash
    >node index.js
    Example app listening on port 8000
    ```

6. URL (http://127.0.0.1:8000/)을 살펴보자. 모든 것이 작동하면 브라우저가 문자열 "Hello World!"를 출력해야 한다.

### 개발 의존성 라이브러리 (Development dependencies)

의존성 라이브러리가 개발 중에만 사용된다면 (패키지 사용자가 운영 환경(production) 안에는 패키지를 설치하지 않도록) 패키지를 "개발 의존성 라이브러리(development dependency)"로 저장해야 한다.

예를 들어, 유명한 자바스크립트 linting 도구인 eslint를 설치할 때 NPM을 다음과 같이 호출해야 한다.

```bash
npm install eslint --save-dev
```

다음 항목이 애플리케이션의 **package.json**에 추가된다.

```json
  "devDependencies": {
    "eslint": "^7.10.0"
  }
```

### 작업을 실행하기 (Running tasks)

## Express 애플리케이션 생성기를 설치하기 (Installing the Express Application Generator)

[Express 애플리케이션 생성](https://expressjs.com/en/starter/generator.html) 도구는 Express 애플리케이션의 "뼈대"를 생성한다. 다음과 같이 NPM을 이용해 생성기를 설치할 수 있다.

```bash
npm install express-generator -g
```

> Note: Ubuntu나 macOS에서는 이 코드 앞에 접두사 `sudo`가 필요할 수도 있다. `-g` 플래그는 어디서든 이를 호출할 수 있도록 도구를 전역적으로 설치한다.

기본 설정값으로 "helloworld" *Express* 앱을 생성하려면 앱을 생성하고 싶은 곳으로 이동해서 다음과 같이 앱을 실행한다:

```bash
express helloworld
```

> Note: 사용할 템플릿 라이브러리나 기타 여러 설정을 지정할 수도 있다. 모든 옵션을 확인하려면 `help` 명령어를 사용한다:
>
> ```bash
> express --help
> ```
>
> Note: **버전 > 8.2.0 또는 최신*의 NodeJS를 사용하면 설치를 생략하고 express-generator를 `npx`로 실행할 수 있다:
>
> ```bash
> npx express-generator helloworld
> ```
>
> * `npx`는 `express`를 설치하고 실행하는 것과 동일한 효과가 있지만, 시스템에 패키지를 설치하지는 않는다.
> * 하지만 이는 다른 곳에서는 `express`를 호출할 수 없다는 것을 의미한다.

NPM은 현재 위치의 하위 폴더에 새로운 Express 앱을 만들고, 콘솔에 빌드 과정을 보여준다. 빌드가 완료되면, Node 의존성 라이브러리를 설치하고 앱을 시작하기 위해 입력해야 할 명령어가 표시된다.

> Note: 새로운 앱은 루트 디렉토리에 **package.json** 파일을 갖는다. 이 파일을 열어 Express와 템플릿 라이브러리인 Jade를 포함해 어떤 의존성 라이브러리가 설치됐는지 확인할 수 있다.

```json
{
  "name": "helloworld",
  "version": "0.0.0",
  "private": true,
  "scripts": {
    "start": "node ./bin/www"
  },
  "dependencies": {
    "cookie-parser": "~1.4.3",
    "debug": "~2.6.9",
    "express": "~4.16.0",
    "http-errors": "~1.6.2",
    "jade": "~1.11.0",
    "morgan": "~1.9.0"
  }
}
```

다음과 같이 NPM을 이용해 helloworld 앱을 위한 모든 의존성 라이브러리를 설치한다:

```bash
cd helloworld
npm install
```

그리고 다음과 같이 앱을 실행한다 (Windows와 Linux/macOS를 위한 명령어가 살짝 다르다):

```bash
# 명령 프롬프트를 이용해 helloworld를 Windows에서 실행
SET DEBUG=helloworld:* & npm start

# PowerShell을 이용해 helloworld를 Windows에서 실행
SET DEBUG=helloworld:* | npm start

# Linux/macOS에서 helloworld를 실행
DEBUG=helloworld:* npm start
```

DEBUG 명령어는 다음과 같은 결과물을 남기는 유용한 로그를 만든다.

```bash
>SET DEBUG=helloworld:* & npm start

> helloworld@0.0.0 start D:\Github\expresstests\helloworld
> node ./bin/www

  helloworld:server Listening on port 3000 +0ms
```

브라우저를 열어 http://127.0.0.1:3000 로 이동해 기본 Express 환영 페이지를 확인한다.
