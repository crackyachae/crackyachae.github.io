---
layout  : article
title   : "Express Tutorial Part 2: 뼈대 웹사이트를 생성하기 (Creating a skeleton website)"
summary : 
date    : 2021-12-03 22:42:51 +0900
updated : 2021-12-08 00:08:32 +0900
tag     : draft
toc     : true
public  : true
parent  : [[mdn-learn-web-server-3]]
latex   : false
---
* TOC
{:toc}

> 이 글은 MDN Learn web development의 [Express web framework (Node.js/JavaScript)](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs) 중 [Express Tutorial Part 2: Creating a skeleton website](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/skeleton_website)의 내용을 번역 및 정리한 글입니다.
>
> * 제가 필요한 부분 위주로 확인하면서 정리하고 있어 글에 덜 작성된 부분이 있을 수 있습니다.
> * 글 작성 후 원문의 내용이 수정되거나 내용을 이해하기 위한 개인적인 설명이나 해석이 있을 수 있습니다. 되도록 원문을 참고해주시길 바랍니다.
> * 잘못된 부분이 있다면 댓글이나 그 외 편하신 방법으로 알려주시면 감사하겠습니다.

## 개요 (Overview)

이 글은 Express 애플리케이션 생성 도구를 이용해 사이트별 라우트, 뷰/템플릿, 데이터베이스 호출 등을 작성해 넣은(populate with) "뼈대" 웹사이트를 만드는 법을 보여준다. 이 경우 도구를 사용해 지역 도서관 웹사이트의 프레임워크를 만들고 나중에 사이트에 필요한 코드를 추가할 것이다. 이 과정은 매우 간단해 명령줄에서 새로운 프로젝트 이름으로 생성기를 호출하고 필요하다면(optionally) 사이트의 템플릿 엔진과 CSS 생성기를 지정하면 된다.

다음의 섹션은 애플리케이션 생성기를 호출하는 방법을 보여주고 다른 뷰/CSS 옵션에 대한 약간의 설명을 제공한다. 뼈대 웹사이트가 어떤 구조인지도 설명한다. 마지막으로, 웹사이트가 동작하는지 확인하기 위해 웹사이트를 실행하는 방법을 보여준다.

> Note: 이 튜토리얼은 *Express 애플리케이션 생성기*가 만든 **Package.json**에 정의된 버전의 *Express*를 사용한다. 최신 버전이 아니다!

## 애플리케이션 생성기를 사용하기 (Using the application generator)

[setting up a Node development environment](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/development_environment)의 일부로 이미 생성기를 설치했을 것이다. 잠깐 상기하자면, 다음과 같이 NPM 패키지 관리자를 사용해 사이트 전체에 생성 도구를 설치했다:

```zsh
npm install express-generator -g
```

생성기에는 `--help` (또는 `-h`) 명령을 사용해 명령줄에서 확인할 수 있는 여러 옵션이 있다.

```zsh
> express --help

    Usage: express [options] [dir]

  Options:

        --version        output the version number
    -e, --ejs            add ejs engine support
        --pug            add pug engine support
        --hbs            add handlebars engine support
    -H, --hogan          add hogan.js engine support
    -v, --view <engine>  add view <engine> support (dust|ejs|hbs|hjs|jade|pug|twig|vash) (defaults to jade)
        --no-view        use static html instead of view engine
    -c, --css <engine>   add stylesheet <engine> support (less|stylus|compass|sass) (defaults to plain css)
        --git            add .gitignore
    -f, --force          force on non-empty directory
    -h, --help           output usage information
```

Express가 *현재* 디렉토리 안에 *Jade* 뷰 엔진과 일반 CSS를 사용해 프로젝트를 만들도록 지정할 수 있다 (디렉토리 이름을 지정하면 프로젝트는 그 이름의 하위 폴더에 생성된다).

```zsh
express
```

또한 `--view`를 사용해서 뷰(템플릿) 엔진을 선택하고/거나 `--css`를 사용해서 CSS 생성 엔진을 선택할 수 있다.

### 어떤 뷰 엔진을 사용해야 할까 (What view engine should I use?)

뷰 옵션을 지정하지 않으면 Jade를 기본으로 선택하기는 하지만, *Express 애플리케이션 생성기*를 사용하면 EJS, Hbs, Pug (Jade), Twig, and Vash 를 포함해 유명한 여러 뷰/템플릿 엔진을 구성할 수 있다. 또한 Express는 그 자체로 [즉시 사용이 가능한](https://github.com/expressjs/express/wiki#template-engines) 다른 수많은 템플릿 언어를 지원할 수 있다.

> Note: 생성기에 의해 지원되지 않는 템플릿 엔진을 사용하고 싶다면 [Using template engines with Express](https://expressjs.com/en/guide/using-template-engines.html) (Express 문서)와 해당 뷰 엔진의 공식 문서를 참고하자.

이 프로젝트에서는 가장 유명한 Express/자바스크립트 템플릿 언어 중 하나로 생성기가 바로(out of box) 지원하기 때문에 Pug 템플릿 엔진(최근에 이름이 변경된 기존의 Jade 엔진)을 사용한다.

### 어떤 CSS 스타일 시트를 사용해야 할까 (What CSS stylesheet engine should I use?)

*Express 애플리케이션 생성기*로 가장 일반적인 CSS 스타일 시트 엔진: LESS, SASS, Compass, Stylus를 사용하도록 구성한 프로젝트를 만들 수 있다.

### 어떤 데이터베이스를 사용해야 할까 (What database should I use?)

생성기는 어떤 데이터베이스도 사용하거나/포함하지 않는다. *Express* 앱은 *Node*가 지원하는 어떤 데이터베이스 메커니즘이든 사용할 수 있다 (*Express* 자체는 데이터베이스 관리를 위한 어떤 특별한 추가 행동/요구사항도 정의하지 않는다).

데이터베이스를 결합하는 방법은 이후의 글에서 다룰 것이다.

## 프로젝트를 생성하기 (Creating the project)

앞으로 만들 *지역 도서관* 앱 예제를 위해 *express-locallibrary-tutorial* 이라는 프로젝트를 만들 것이다 *Pug* 템플릿 라이브러리를 사용하고 CSS 엔진은 사용하지 않는다.

우선, 프로젝트를 만들 곳으로 이동한 뒤 *Express 애플리케이션 생성기*를 다음과 같이 명령 프롬프트에서 실행한다:

```
express express-locallibrary-tutorial --view=pug
```

생성기가 프로젝트 파일을 생성(하고 목록을 나열)할 것이다.

```js
   create : express-locallibrary-tutorial\
   create : express-locallibrary-tutorial\public\
   create : express-locallibrary-tutorial\public\javascripts\
   create : express-locallibrary-tutorial\public\images\
   create : express-locallibrary-tutorial\public\stylesheets\
   create : express-locallibrary-tutorial\public\stylesheets\style.css
   create : express-locallibrary-tutorial\routes\
   create : express-locallibrary-tutorial\routes\index.js
   create : express-locallibrary-tutorial\routes\users.js
   create : express-locallibrary-tutorial\views\
   create : express-locallibrary-tutorial\views\error.pug
   create : express-locallibrary-tutorial\views\index.pug
   create : express-locallibrary-tutorial\views\layout.pug
   create : express-locallibrary-tutorial\app.js
   create : express-locallibrary-tutorial\package.json
   create : express-locallibrary-tutorial\bin\
   create : express-locallibrary-tutorial\bin\www

   change directory:
     > cd express-locallibrary-tutorial

   install dependencies:
     > npm install

   run the app (Bash (Linux or macOS))
     > DEBUG=express-locallibrary-tutorial:* npm start

   run the app (PowerShell (Windows))
     > $ENV:DEBUG = "express-locallibrary-tutorial:*"; npm start

   run the app (Command Prompt (Windows)):
     > SET DEBUG=express-locallibrary-tutorial:* & npm start
```

출력이 끝날 때, 생성기가 (**package.json** 파일에 나열된) 의존 라이브러리를 설치하는 방법과 애플리케이션을 실행하는 방법을 제공한다.

## 뼈대 웹사이트를 실행하기 (Running the skeleton website)

이 시점에서, 뼈대 프로젝트는 완벽하다. 실제로 웹사이트는 그다지 많은 것을 *하고 있지는* 않지만, 이것이 작동한다는 것을 보여주기 위해 작동시켜볼 가치가 있다.

1. 우선, 의존성 라이브러리를 설치한다 (`install` 명령어는 프로젝트의 **package.json** 파일에 나열된 모든 의존성 라이브러리 패키지를 가져올 것이다).

```
cd express-locallibrary-tutorial
npm install
```

1. 다음으로 애플리케이션을 실행한다.
    * 윈도우의 CMD 프롬프트에서는, 이 명령을 사용한다:

        ```
        SET DEBUG=express-locallibrary-tutorial:* & npm start
        ```

    * 윈도우의 Powershell에서는, 이 명령을 사용한다:

        ```
        $ENV:DEBUG = "express-locallibrary-tutorial:*"; npm start
        ```

    * macOS나 Linux에서는, 이 명령을 사용한다:

        ```
        DEBUG=express-locallibrary-tutorial:* npm start
        ```

1. 그리고 앱에 접근하기 위해 브라우저에서 http://localhost:3000/를 불러온다.

> Note: `npm start` 명령만 사용해도 앱을 시작할 수 있다. 나타난 것처럼 DEBUG 변수를 지정하면 콘솔의 로깅/디버깅이 가능하다. 예를 들어, 위의 페이지를 방문하면 디버그 결과가 이렇게 나타나는 것이 보일 것이다:
>
> ```
> >SET DEBUG=express-locallibrary-tutorial:* & npm start
>
> > express-locallibrary-tutorial@0.0.0 start D:\github\mdn\test\exprgen\express-locallibrary-tutorial
> > node ./bin/www
>
>   express-locallibrary-tutorial:server Listening on port 3000 +0ms
> GET / 304 490.296 ms - -
> GET /stylesheets/style.css 200 4.886 ms - 111
> ```

## 파일이 바뀌면 서버가 재시작할 수 있게 하기 (Enable server restart on file changes)

Express 웹사이트의 모든 변경사항은 서버를 재시작할 때까지 표시되지 않는다. 변경사항이 생길 때마다 서버를 멈추고 재시작하는 것은 빠르게 매우 귀찮아질 것이므로, 필요할 때 서버를 자동으로 재시작할 수 있도록 하는 데 시간을 할애할 가치가 충분하다.

이 목적을 위한 편리한 도구 중 하나로 nodemon이 있다. 이건 보통 ("도구(tool)"로서) 전역적으로 설치되지만, 여기서는 *개발자 의존성 라이브러리*로 지역적으로 설치하고 사용해 프로젝트를 작업(working)하는 모든 개발자가 애플리케이션을 설치했을 때 자동으로 얻을 수 있도록 할 것이다. 다음의 명령어를 뼈대 프로젝트의 루트 디렉토리에서 사용해 보자:

```
npm install --save-dev nodemon
```

여전히 nodemon을 프로젝트의 **package.json** 파일 뿐만 아니라 자신의 기기에 전역적으로 설치하고 싶다면:

```
npm install -g nodemon
```

프로젝트의 **package.json** 파일을 열면 다음의 의존성 라이브러리가 있는 새로운 영역이 보일 것이다:

```json
 "devDependencies": {
    "nodemon": "^2.0.4"
}
```

이 도구를 전역적으로 설치하지 않았기 때문에 (이를 경로에 추가하지 않는 이상) 명령줄에서 실행할 수는 없지만, NPM은 설치된 패키지의 모든 것을 알기 때문에 NPM 스크립트로는 호출할 수 있다. package.json의 `scripts` 영역을 찾자. 처음에는 `"start"`로 시작하는 한 줄만 있을 것이다. 해당 줄 끝에 쉼표를 찍고 `"devstart"`와 `"serverstart"` 줄을 추가해 이를 수정하자:

* Linux나 macOS 에서, 스크립트 영역은 이처럼 보일 것이다:

    ```json
    "scripts": {
      "start": "node ./bin/www",
      "devstart": "nodemon ./bin/www",
      "serverstart": "DEBUG=express-locallibrary-tutorial:* npm run devstart"
    },
    ```

* 윈도우에서는, 대신 이 명령어를 사용한다:

    ```json
    SET DEBUG=express-locallibrary-tutorial:* & npm run devstart
    ```

이전과 거의 정확히 같은 방법으로 서버를 시작할 수 있지만, 대신에 `devstart` 명령을 사용한다.

> Note: 프로젝트의 임의의 파일을 수정하면 서버는 재시작된다 (혹은 `rs`를 명령 프롬프터에 입력해 언제든 서버를 재시작할 수 있다). 여전히 페이지를 새로 고침 하기 위해서는 브라우저를 다시 로드해야 한다.
>
> "start"는 실제로는 이미 존재하는(named) 스크립트에 매핑된 NPM 명령이기 때문에 이제 `npm start` 대신 "`npm run <scriptname>`"을 호출해야 한다. *start* 스크립트의 명령을 대체할 수도 있겠지만 개발 중에는 *nodemon*만 사용하길 원하므로, 새로운 스크립트 명령을 만드는 것이 낫다.
>
> **package.json** 안의 스크립트에 추가한 `servestart` 명령이 매우 좋은 예시이다. 이런 접근 방식을 사용하면 더는 서버를 시작하기 위해 긴 명령을 입력할 필요가 없다. 다만 스크립트에 추가된 특정 명령은 macOS와 Linux에서만 작동한다는 것을 유의하자.

## 생성된 프로젝트 (The generated project)

이제 방금 만든 프로젝트를 살펴보자

### 디렉토리 구조 (Directory structure)

이제 의존성 라이브러리를 설치한 생성된 프로젝트는 다음의 파일 구조를 갖는다 (파일은 "/"로 시작하지 **않는** 항목이다).

* **package.json** 파일은 애플리케이션의 의존성 라이브러리와 다른 정보를 정의한다. 또한 애플리케이션의 진입(entry) 포인트인 **/bin/www** 자바스크립트 파일을 호출하는 시작(startup) 스크립트를 정의한다.
* 애플리케이션 오류 처리를 설정하고 나머지 작업을 위해 **app.js**를 불러온다.
* 앱 라우트는 **routes/** 디렉토리 아래 개별적(separate) 모듈로 저장되어 있다.
* 템플릿은 **/views** 디렉토리 아래에 저장된다.

```
express-locallibrary-tutorial
    app.js
    /bin
        www
    package.json
    package-lock.json
    /node_modules
        [about 6700 subdirectories and files]
    /public
        /images
        /javascripts
        /stylesheets
            style.css
    /routes
        index.js
        users.js
    /views
        error.pug
        index.pug
        layout.pug
```

다음의 영역들은 파일들을 좀 더 자세히 설명한다.

### package.json

**package.json** 파일은 애플리케이션의 의존성 라이브러리와 다른 정보를 정의한다:

```json
{
  "name": "express-locallibrary-tutorial",
  "version": "0.0.0",
  "private": true,
  "scripts": {
    "start": "node ./bin/www"
  },
  "dependencies": {
    "cookie-parser": "~1.4.4",
    "debug": "~2.6.9",
    "express": "~4.16.1",
    "http-errors": "~1.6.3",
    "morgan": "~1.9.1",
    "pug": "2.0.0-beta11"
  },
  "devDependencies": {
    "nodemon": "^2.0.4"
  }
}
```

의존성 라이브러리는 *express* 패키지와 선택한 뷰 엔진 (*pug*) 패키지를 포함한다. 추가로, 많은 웹 애플리케이션에서 유용한 다음의 패키지들도 포함한다:

* cookie-parser: 쿠키 헤더를 해석(parse)하고 (쿠키 정보에 접근할 수 있는 편리한 방법을 제공하는) `req.cookies`를 도입(populate)한다.
* debug: node 코어의 디버깅 기술을 모델로 한 작은 node 디버깅 도구.
* morgan: 노드를 위한 HTTP 요청 로거 미들웨어.
* http-errors: (express 오류 처리를 위해) 필요한 곳에 HTTP 오류를 생성.

스크립트 영역은 서버를 시작하기 위해 `npm start`를 호출해 불러오는 "*start*" 스크립트를 먼저 정의한다 (이 스크립트는 *Express 애플리케이션 생성기*에 의해 추가됐다). 스크립트 정의에서 이 명령어는 실제로 자바스크립트 파일 **./bin/www**를 *node*로 실행(start)시킨다는 것을 볼 수 있다.

```json
  "scripts": {
    "start": "node ./bin/www",
    "devstart": "nodemon ./bin/www",
    "serverstart": "DEBUG=express-locallibrary-tutorial:* npm run devstart"
  },
```

*devstart*와 *serverstart* 스크립트는 같은 **./bin/www** 파일을 *node* 대신 *nodemon*으로 실행시킨다 (이 예시는 Linux와 macOS를 위한 것으로 위의 [파일이 바뀌면 서버가 재시작할 수 있게 하기](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/skeleton_website#enable_server_restart_on_file_changes)에서 다뤘다).

### www 파일 (www file)

**/bin/www* 파일은 애플리케이션의 진입점이다! 이 파일이 가장 먼저 하는 것은 `express()`를 설정하고 반환하는 "실제" 애플리케이션 진입점(프로젝트 루트의 **app.js**)을 `require()` 하는 것이다.

```js
#!/usr/bin/env node

/**
 * Module dependencies.
 */

const app = require('../app');
```

> Note: `require()`는 모듈을 현재 파일로 가져오는 전역 node 함수이다. 여기서는 상대 경로를 사용하고 선택적인 (**.js**) 파일 확장자를 생략해 **app.js** 모듈을 지정한다.

이 파일의 나머지 코드는 `app`으로 특정 포트(환경 변수에 정의하거나 변수가 지정되지 않았을 경우 3000)로 설정된 node HTTP 서버를 설정하고 서버의 오류와 연결 상태를 수신하고 보고하기 시작한다. 지금은 이 코드에 대해서 아무것도 알 필요가 없지만 (이 파일의 모든 것은 "상용구(boilerplate)"다), 관심이 있다면 얼마든지 살펴봐도 된다.

### app.js

이 파일은 `expresss` 애플리케이션 객체(관례로 `app`이라고 부른다)를 만들고, 다양한 설정과 미들웨어로 애플리케이션을 설정하고, 모듈에서 앱을 내보낸다. 아래의 코드는 app 객체를 만들고 내보내는 파일 일부를 보여준다:

```js
const express = require('express');
const app = express();
...
module.exports = app;
```

위의 **www** 진입점 파일로 돌아가면, 이 파일을 불러왔을 때 `module.exports` 객체가 호출자(caller)에게 제공된다.

**app.js** 파일을 더 자세히 봐보자.

우선, 이전에 NPM을 이용해서 애플리케이션을 위해 다운 받아놓은 `http-errors`, `express`, `morgan`, `cookie-parser`를 포함해 유용한 node 라이브러리를 `require()`을 사용해 파일에 불러온다.

```js
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
```

그리고 라우트 디렉토리에서 모듈을 `require()` 한다. 이런 모듈/파일에는 특정 관련 "라우트" (URL 경로)의 모음을 다루는 코드가 포함되어 있다. 뼈대 애플리케이션을 확장할 때, 예를 들어 도서관의 모든 책의 목록을 나열하기 위해 책과 관련된 라우트를 다루는 새로운 파일을 추가할 것이다.

```js
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
```

다음으로, 불러온 *express* 모듈을 사용하는 `app` 객체를 만들고, 뷰(템플릿) 엔진을 설정하는 데 이를 사용한다.

엔진은 두 부분으로 나눠서 설정한다.

* 첫 번째로, '`views`' 값을 설정해 템플릿이 저장될 폴더를 정한다 (이 경우 subfolder/*views*).
* 그리고 '`view engine`' 값을 설정해 템플릿 라이브러리를 지정한다 (이 경우 "pug").

```js
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
```

다음 함수 모음은 `app.use()`를 호출해 *미들웨어* 라이브러리를 요청 처리 단계(chain)에 추가한다. 이전에 가져온 서드파티 라이브러리 외에도 `express.static` 미들웨어를 사용해 *Express*가 프로젝트 루트의 **/public** 디렉토리 안에 있는 모든 정적 파일을 제공하도록 할 수 있다.

```js
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));
```

이제 다른 미들웨어가 모두 설정되었으므로 (이전에 가져온) 라우트 핸들링 코드를 요청 처리 과정(chain)에 추가한다.

```js
app.use('/', indexRouter);
app.use('/users', usersRouter);
```

> Note: 위에서 지정된 경로 (`'/'` and `'/users'`)는 불러온 파일에서 정의된 라우트의 접두사로 여겨진다. 그래서 예를 들어, 만약 불러온 **users** 모듈이 `/profile`을 위한 라우트를 정의하면, 이 라우트에 `/users/profile`로 접근할 수 있다. 라우트에 대해서는 이후 글에서 더 얘기할 것이다.

파일의 마지막 미들웨어는 오류와 HTTP 404 응답의 핸들러 메소드를 추가한다.

```js
// 404를 잡아서 에러 핸들러에 전달(forward)한다
app.use(function(req, res, next) {
  next(createError(404));
});

// 에러 핸들러
app.use(function(err, req, res, next) {
  // 개발 과정의 에러만 제공하는 locals를 설정
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // 오류 페이지를 렌더링
  res.status(err.status || 500);
  res.render('error');
});
```

Express 애플리케이션 객체(app)를 이제 전부 구성했다. 마지막 단계는 모듈 내보내기(module exports)에 이걸 추가하는 것이다 (이것이 이 파일을 **/bin/www** 에서 불러올 수 있도록 해준다).

```js
module.exports = app;
```

### 라우트 (Routes)

라우트 파일 **/routes/users/js** 는 아래 보이는 것과 같다 (라우트 파일은 비슷한 구조를 공유하므로, **index.js**도 보여줄 필요는 없다).

* 우선, *express* 모듈을 불러와 이를 사용해 `express.Router` 객체를 얻는다.
* 그리고 그 객체에 경로를 지정하고,
* 마지막으로 모듈에서 라우트를 내보낸다 (이것이 **app.js** 에서 이 파일을 불러올 수 있게 해준다).

```js
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
```

라우트는 적합한(correct) 패턴의 HTTP `GET` 요청이 감지될 때마다 호출되는 콜백을 정의한다.

* 여기서 일치하는 패턴은 모듈을 가져올 때 지정한 라우트('`/users`')에 이 파일에 정의된 모든 것('`/`')을 더한 것이다.
* 즉, 이 라우트는 `/users/` URL을 받았을 때 사용된다.

> Note: node로 서버를 실행하고 브라우저에서 URL에 방문해서: http://localhost:3000/users/ 이를 시도해보자. 메시지가 보일 것이다: 'respond with a resource'.

위에서 흥미로운 것 중 하나는 콜백 함수가 세 번째 인자 '`next`'를 가지고 있기 때문에 단순한 라우트 콜백이 아닌 미들웨어 함수라는 것이다. 코드가 `next` 인자를 사용하지 않더라도, 미래에 여러 라우트 핸들러를 `'/'` 라우트 경로에 추가하고 싶을 때 유용할 수도 있다.

### 뷰 (템플릿) (Views (templates))

뷰(템플릿)는 (**app.js**에 쓰여있는 것처럼) **/views** 디렉토리 안에 저장되어있고 **.pug** 확장자를 갖는다. `Response.render()` 메소드는 지정 템플릿을 객체에서 전달된 명명된 변숫값과 함께 렌더링하고 그 결과를 응답으로 보내는 데 사용된다. 아래 **/rountes/index.js**의 코드에서 라우트가 템플릿 변수 "title"을 전달하는 템플릿 "index"를 사용해 어떻게 응답을 렌더링하는지 볼 수 있다.

```js
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
```

위의 라우트에 응답하는 템플릿이 아래 주어져 있다 (**index.pug**). 구문에 대해서는 나중에 더 얘기할 것이다. 지금 알아야 할 것은 (`'Express'` 값과 함께인) `title` 변수가 템플릿의 지정된 곳에 삽입된다는 것이다.

```pug
extends layout

block content
  h1= title
  p Welcome to #{title}
```
