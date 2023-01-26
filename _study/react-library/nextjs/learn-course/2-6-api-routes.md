---
layout  : article
title   : API 라우트 (API Routes)
summary : 
date    : 2023-01-23 11:10:49 +0900
updated : 2023-01-23 13:33:12 +0900
tag     : 
toc     : true
public  : true
parent  : [[/react-library/nextjs/learn-course]]
latex   : false
---
* TOC
{:toc}

> 이 글은 Next.js에서 제공하는 learn course의 [CREATE YOUR FIRST APP](https://nextjs.org/learn/basics/create-nextjs-app) 중 [API Routes](https://nextjs.org/learn/basics/api-routes)의 내용을 번역 및 정리한 글입니다.
>
> * 제가 필요한 부분 위주로 확인하면서 정리하고 있어 글에 덜 작성된 부분이 있을 수 있습니다.
> * 글 작성 후 원문의 내용이 수정되거나 내용을 이해하기 위한 개인적인 설명이나 해석이 있을 수 있습니다. 되도록 원문을 참고해주시길 바랍니다.
> * 잘못된 부분이 있다면 댓글이나 그 외 편하신 방법으로 알려주시면 감사하겠습니다.

Next.js는 Node.js serverless 함수로 쉽게 API 엔드 포인트를 작성하도록 해주는 [API 라우트](https://nextjs.org/docs/api-routes/introduction)를 지원합니다. 우리의 블로그 앱에는 필요 없지만, 이 강의에서 이를 사용하는 방법에 대해서 간단하게 얘기해봅시다.

### 이 강의에서 배울 것

이 강의에서는, 다음과 같은 내용을 배웁니다:

* API 라우트를 만드는 방법.
* [API 라우트](https://nextjs.org/docs/api-routes/introduction)에 대한 유용한 정보들.

**이전 강의를 이어서 보고 있다면**, 이(다음) 부분을 넘어가도 괜찮습니다.

## 시작 코드를 다운로드 (선택적)

이전 강의에서 이어서 보고 있는 것이 아니라면, 당신은 이 강의를 위한 코드를 아래에서 다운로드, 설치, 실행할 수 있습니다. 이 코드는 이전 강의의 결과와 동일한 `nextjs-blog`라는 디렉터리를 추가(set up)합니다.

다시 말하자면, 이전 강의를 막 끝마쳤다면 이 과정은 필요하지 않습니다.

```
npx create-next-app@latest nextjs-blog --use-npm --example "https://github.com/vercel/next-learn/tree/master/basics/api-routes-starter"
```

그다음 출력된 명령의 지침을 따르세요. (디렉터리로 이동(`cd`)하고 개발 서버를 시작합니다)

또한 다음의 파일을 업데이트해야 합니다:

* `public/images/profile.jpg`를 당신의 사진으로 (추천 값: 400px width/height).
* `components/layout.js`의 `const name = '[Your Name]'`을 당신의 이름으로.
* `pages/index.js`의 `<p>[Your Self Introduction]</p>`를 당신의 자기소개로.

## API 라우트를 생성하기

[API 라우트](https://nextjs.org/docs/api-routes/introduction)를 사용하면 Next.js 앱 안에 API 엔드 포인트를 만들 수 있습니다. `pages/api` 디렉터리 안에 다음과 같은 **함수**를 작성해 이를 수행할 수 있습니다:

```js
// req = HTTP incoming message, res = HTTP server response
export default function handler(req, res) {
  // ...
}
```

> [API 라우트 문서](https://nextjs.org/docs/api-routes/introduction)에서 요청 핸들러에 대해서 더 알아보세요.

이들은 (Lammda라고도 알려진) Serverless 함수로 배포할 수 있습니다.

### 간단한 API 엔드 포인트 생성하기

한번 시도해 봅시다. `pages/api`에 다음의 코드로 `hello.js`라는 파일을 생성하세요:

```js
export default function handler(req, res) {
  res.status(200).json({ text: 'Hello' });
}
```

http://localhost:3000/api/hello에서 이것에 접근해보세요. `{"text":"Hello"}`를 볼 수 있을 것입니다. 다음의 내용을 확인하세요:

* `req`는 [http.IncomingMessage](https://nodejs.org/api/http.html#http_class_http_incomingmessage)에 미리 구축된 [미들웨어](https://nextjs.org/docs/api-routes/api-middlewares)를 더한 것의 인스턴스입니다.
* `req`는 [http.ServerResponse](https://nodejs.org/api/http.html#http_class_http_serverresponse)에 몇몇 [헬퍼 함수](https://nextjs.org/docs/api-routes/response-helpers)를 더한 것의 인스턴스입니다.

이상입니다! 이 강의를 마무리하기 전에 다음 페이지에서 [API 라우트](https://nextjs.org/docs/api-routes/introduction)를 사용하기 위한 몇 가지 팁에 대해 알아봅시다.

## API 라우트 세부 사항

[API 라우트](https://nextjs.org/docs/api-routes/introduction)에 대해 알아야 할 필수 정보들은 다음과 같습니다.

### API 라우트를 `getStaticProps`나 `getStaticPath`에서 가져오지 마세요

[`getStaticProps`](https://nextjs.org/docs/basic-features/data-fetching#getstaticprops-static-generation)나 [`getStaticPaths`](https://nextjs.org/docs/basic-features/data-fetching#getstaticpaths-static-generation)에서 API 라우트를 가져오면 **안**됩니다. 대신 서버 측 코드는 [`getStaticProps`](https://nextjs.org/docs/basic-features/data-fetching#getstaticprops-static-generation)나 [`getStaticPaths`](https://nextjs.org/docs/basic-features/data-fetching#getstaticpaths-static-generation)에 직접 작성하세요 (또는 헬퍼 함수를 호출하세요).

그 이유는 다음과 같습니다: [`getStaticProps`](https://nextjs.org/docs/basic-features/data-fetching#getstaticprops-static-generation)와 [`getStaticPaths`](https://nextjs.org/docs/basic-features/data-fetching#getstaticpaths-static-generation)는 서버 측에서만 실행되고 클라이언트 측에서는 절대 실행되지 않습니다. 게다가, 이 함수는 브라우저의 JS 번들에도 포함되지 않습니다. 즉, 데이터베이스에 직접 데이터를 요청하는 것과 같은 코드를 브라우저에 보내지 않고도 작성할 수 있다는 것을 의미합니다. 더 알아보고 싶다면 [서버 측 코드 작성하기](https://nextjs.org/docs/basic-features/data-fetching/get-static-props#write-server-side-code-directly) 문서를 읽어보세요.

### 좋은 예: 양식 입력 다루기

API 라우트의 좋은 예는 양식 입력을 다루는 것입니다. 예를 들어, 페이지에 양식을 생성하고 API 라우트에 `POST` 요청을 보내도록 할 수 있습니다. 그러면 다음으로 이를 데이터베이스에 직접 저장하는 코드를 작성할 수 있습니다. API 라우트 코드는 클라이언트 번들의 일부가 되지 않으므로, 서버 측 코드를 안전하게 작성할 수 있습니다.

```js
export default function handler(req, res) {
  const email = req.body.email;
  // Then save email to your database, etc...
}
```

### 미리보기 모드

[정적 생성](https://nextjs.org/docs/basic-features/pages#static-generation-recommended)은 페이지가 headless CMS에서 데이터를 가져올 때 유용합니다. 그러나, 이 방식은 headless CMS에서 초안을 작성하고, 페이지에서 즉시 초안의 **미리 보기**를 원하는 경우에는 적합(ideal)하지 않습니다. 당신은 Next.js가 빌드타임이 아닌 **요청 시간(request time)**에 이런 페이지를 렌더링하고 게시된 내용 대신 초안의 내용을 가져오기를 원합니다. 당신은 이 특정한 케이스에만 Next.js가 정적 생성을 하지 않고 넘기기를 바랍니다.

Next.js에는 위의 문제를 해결하는 **미리보기 모드(Preview Mode)**라는 기능이 있으며, 이는 [API 라우트](https://nextjs.org/docs/api-routes/introduction)를 활용합니다. 더 알아보고 싶다면 [미리보기 모드] 문서를 읽어보세요.

### 동적 API 라우트

API 라우트는 일반 페이지처럼 동적일 수 있습니다. 더 알아보고 싶다면 [동적 API 라우트](https://nextjs.org/docs/api-routes/dynamic-api-routes) 문서를 읽어보세요.

### 이상입니다

다음의 그리고 마지막 기본 강의에서는, Next.js 앱을 프로덕션에 배포하는 방법에 대해 알아보겠습니다.
