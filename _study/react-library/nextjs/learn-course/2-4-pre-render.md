---
layout  : article
title   : 사전 렌더링과 데이터 가져오기 (Pre-rendering and Data Fetching)
summary : 
date    : 2023-01-14 17:31:16 +0900
updated : 2023-01-18 22:39:44 +0900
tag     : 
toc     : true
public  : true
parent  : [[/react-library/nextjs/learn-course]]
latex   : false
---
* TOC
{:toc}

> 이 글은 Next.js에서 제공하는 learn course의 [CREATE YOUR FIRST APP](https://nextjs.org/learn/basics/create-nextjs-app) 중 [Pre-rendering and Data Fetching](https://nextjs.org/learn/basics/data-fetching)의 내용을 번역 및 정리한 글입니다.
>
> * 제가 필요한 부분 위주로 확인하면서 정리하고 있어 글에 덜 작성된 부분이 있을 수 있습니다.
> * 글 작성 후 원문의 내용이 수정되거나 내용을 이해하기 위한 개인적인 설명이나 해석이 있을 수 있습니다. 되도록 원문을 참고해주시길 바랍니다.
> * 잘못된 부분이 있다면 댓글이나 그 외 편하신 방법으로 알려주시면 감사하겠습니다.

블로그를 만들려고 합니다([예상 결과](https://next-learn-starter.vercel.app)는 다음과 같습니다), 하지만 지금까지 블로그 콘텐츠를 추가하지 않았습니다. 이 강의에서는, 외부 블로그 데이터를 안으로 가져오는 방법을 배울 것입니다. 우리는 블로그 콘텐츠를 파일 시스템에 저장할 예정이지만, 콘텐츠를 다른곳(e.g. 데이터베이스, [헤드리스 CMS](https://en.wikipedia.org/wiki/Headless_content_management_system)에 저장해도)에 저장하는 경우에도 잘 작동합니다.

### 이 강의에서 배울 것

이 강의에서는, 다음과 같은 내용을 배웁니다.

* Next.js의 [사전 렌더링](https://nextjs.org/docs/basic-features/pages#pre-rendering) 기능.
* 사전 렌더링의 두 가지 형태: [정적 생성](https://nextjs.org/docs/basic-features/pages#static-generation-recommended)과 [서버 측 렌더링](https://nextjs.org/docs/basic-features/pages#server-side-rendering).
* [데이터가 있는 경우](https://nextjs.org/docs/basic-features/pages#static-generation-with-data), 그리고 [데이터가 없는 경우](https://nextjs.org/docs/basic-features/pages#static-generation-without-data)의 정적 생성.
* [`getStaticProps`](https://nextjs.org/docs/basic-features/data-fetching/overview#getstaticprops-static-generation)와 이를 사용해 외부의 블로그 데이터를 인덱스 페이지로 가져오는 방법.
* [`getStaticProps`](https://nextjs.org/docs/basic-features/data-fetching/overview#getstaticprops-static-generation)와 관련된 유용한 정보.

**이전 강의를 이어서 보고 있다면**, 이(다음) 부분을 넘어가도 괜찮습니다.

## 시작 코드를 다운로드 (선택적)

이전 강의에서 이어서 보고 있는 것이 아니라면, 당신은 이 강의를 위한 코드를 아래에서 다운로드, 설치, 실행할 수 있습니다. 이 코드는 이전 강의의 결과와 동일한 `nextjs-blog`라는 디렉터리를 추가(set up)합니다.

다시 말하자면, 이전 강의를 막 끝마쳤다면 이 과정은 필요하지 않습니다.

```
npx create-next-app@latest nextjs-blog --use-npm --example "https://github.com/vercel/next-learn/tree/master/basics/data-fetching-starter"
```

그다음 출력된 명령의 지침을 따르세요. (디렉터리로 이동(`cd`)하고 개발 서버를 시작합니다)

또한 다음의 파일을 업데이트해야 합니다:

* `public/images/profile.jpg`를 당신의 사진으로 (추천 값: 400px width/height).
* `components/layout.js`의 `const name = '[Your Name]'`을 당신의 이름으로.
* `pages/index.js`의 `<p>[Your Self Introduction]</p>`를 당신의 자기소개로.

## 사전 렌더링

[데이터 가져오기](https://nextjs.org/docs/basic-features/data-fetching/overview)에 대해 얘기하기 전에, Next.js의 가장 중요한 개념에 대해서 이야기해봅시다: **[사전 렌더링](https://nextjs.org/docs/basic-features/pages#pre-rendering)**

기본적으로, Next.js는 모든 페이지를 미리 렌더링(pre-render)합니다. 이것은 Next.js가 클라이언트 측 자바스크립트에 의해 모든 작업을 수행하는 대신에 *각 페이지의 HTML을 미리 생성*한다는 것을 의미합니다. 사전 렌더링을 수행하면 성능과 [SEO](https://en.wikipedia.org/wiki/Search_engine_optimization)가 향상될 수 있습니다.

생성된 각 HTML은 해당 페이지를 위한 최소한의 JavaScript 코드와 연결되어있습니다. Browser에서 페이지를 불러왔을 때, 해당 페이지의 JavaScript 코드가 실행되고 페이지가 완전히 상호작용할 수 있게 됩니다. (이 과정을 **hydration**이라고 합니다.)

### 사전 렌더링이 일어나는지 확인하기

다음의 과정을 통해 사전 렌더링이 일어나는지 확인할 수 있습니다.

* 브라우저의 JavaScript를 비활성화시킵니다. ([Chrome에서 하는 방법](https://developer.chrome.com/docs/devtools/javascript/disable/))
* [이 페이지에 접근하려고 해 보세요](https://next-learn-starter.vercel.app) (이 튜토리얼의 최종 결과물).

당신의 앱이 JavaScript 없이도 렌더링 되는 것을 확인할 수 있습니다. 이것은 Next.js가 앱을 정적 HTML의 안에 미리 렌더링하여 JavaScript를 실행하지 않고도 앱 UI를 볼 수 있기 때문입니다.

> **Note:** 당신은 위의 과정을 `localhost`에서도 시도해볼 수 있지만 JavaScript를 비활성화하면 CSS를 불러올 수 없을 것입니다.

만약 당신의 앱이 평범(plain)한 React.js 앱이라면 (Next.js 없이), [사전 렌더링](https://nextjs.org/docs/basic-features/pages#pre-rendering)이 없으므로, JavaScript를 비활성화하면 앱을 볼 수 없을 것입니다. 예를 들어:

* 브라우저에서 JavaScript를 활성화하고 [이 페이지를 확인해보세요](https://create-react-template.vercel.app). 이것은 [Create React App](https://create-react-app.dev)으로 만든 일반 React.js 앱입니다.
* 이제, JavaScript를 비활성화하고 [같은 페이지](https://create-react-template.vercel.app)에 다시 접근해보세요.
* 더는 앱을 볼 수 없을 것입니다 - 대신, "이 앱을 실행하려면 JavaScript를 활성화해야 합니다"라고 적혀있을 것입니다. 이것은 앱이 정적 HTML로 사전 렌더링 되지 않았기 때문입니다.

### 요약: 사전 렌더링 vs 비 사전 렌더링

다음은 간단한(quick) 그래픽 요약입니다:

![사전 렌더링 (Next.js 사용)](https://nextjs.org/static/images/learn/data-fetching/pre-rendering.png)

![비 사전 렌더링 (일반 React.js 앱)](https://nextjs.org/static/images/learn/data-fetching/no-pre-rendering.png)

다음으로, Next.js 사전 렌더링의 두 가지 형태에 대해서 얘기해 봅시다.

## 사전 렌더링의 두 가지 형태

Next.js에는 두 가지 형태의 사전 렌더링이 있습니다: **[정적 생성(Static Generation)](https://nextjs.org/docs/basic-features/pages#static-generation-recommended)**과 **[서버 측 렌더링(Server-side Rendering)](https://nextjs.org/docs/basic-features/pages#server-side-rendering)**. 두 방식 차이는 페이지의 HTML을 생성**할 때** 생깁니다 (when it generates the HTML for a page).

* **[정적 생성](https://nextjs.org/docs/basic-features/pages#static-generation-recommended)**은 **빌드 타임(build-time)**[^build-time]에 HTML을 생성하는 사전 렌더링 방식입니다. 사전 렌더링 된 HTML은 요청마다 *재사용*됩니다.
* **[서버 측 렌더링(Server-side Rendering)](https://nextjs.org/docs/basic-features/pages#server-side-rendering)**은 **매 요청**마다 HTML을 생성하는 사전 렌더링 방식입니다.

![정적 생성](https://nextjs.org/static/images/learn/data-fetching/static-generation.png)
![서버 측 렌더링](https://nextjs.org/static/images/learn/data-fetching/server-side-rendering.png)

> 개발 모드(당신이 `npm run dev`나 `yarn dev`를 실행할 때)에서는, 페이지가 요청마다 [사전 렌더링](https://nextjs.org/docs/basic-features/pages#pre-rendering) 됩니다. 이는 더 쉽게 개발할 수 있도록 [정적 생성](https://nextjs.org/docs/basic-features/pages#static-generation-recommended)에도 똑같이 적용됩니다. 프로덕션에서는, 정적 생성이 매 요청이 아닌 빌드 타임에 한 번 발생합니다.

### 페이지 기반 (Per-page Basis)

중요한 것은 Next.js에서는 각 페이지에 사용할 사전 렌더링을 방식을 **선택**할 수 있다는 것입니다. 당신은 대부분 페이지에서는 [정적 생성(Static Generation)](https://nextjs.org/docs/basic-features/pages#static-generation-recommended)을 그리고 나머지 페이지에는 [서버 측 렌더링(Server-side Rendering)](https://nextjs.org/docs/basic-features/pages#server-side-rendering)을 사용해서 "하이브리드" Next.js 앱을 만들 수 있습니다.

![per-page basis](https://nextjs.org/static/images/learn/data-fetching/per-page-basis.png)

### [정적 생성(Static Generation)](https://nextjs.org/docs/basic-features/pages#static-generation-recommended) vs [서버 측 렌더링(Server-side Rendering)](https://nextjs.org/docs/basic-features/pages#server-side-rendering)를 사용해야 하는 경우

페이지가 한 번만 작성(build)되고 CDN으로 제공되는 것이 요청마다 서버가 페이지를 렌더링 하는 것보다 훨씬 빠르므로 가능하다면 **[정적 생성(Static Generation)](https://nextjs.org/docs/basic-features/pages#static-generation-recommended)**을 (데이터를 포함하거나 데이터 없이) 사용하는 것을 추천합니다.

다음을 포함해서, 다양한 유형의 페이지에 [정적 생성(Static Generation)](https://nextjs.org/docs/basic-features/pages#static-generation-recommended)을 사용할 수 있습니다:

* 마케팅 페이지
* 블로그 게시물
* 전자 상거래 제품 목록
* 도움말 페이지와 문서

당신은 스스로 다음과 같이 물어야 합니다: "사용자의 요청에 **앞서** 이 페이지를 미리 렌더링할 수 있는가?". 만약 답이 그렇다 이면, [정적 생성(Static Generation)](https://nextjs.org/docs/basic-features/pages#static-generation-recommended)을 선택해야 합니다.

반면에, 사용자 요청에 앞서 페이지를 미리 렌더링할 수 없다면 [정적 생성(Static Generation)](https://nextjs.org/docs/basic-features/pages#static-generation-recommended)은 좋은 생각(idea)이 **아닙니다**. 페이지의 데이터가 자주 변경(update)되고 페이지 내용이 요청마다 바뀔 수도 있습니다.

이런 경우에는, **[서버 측 렌더링(Server-side Rendering)](https://nextjs.org/docs/basic-features/pages#server-side-rendering)**을 사용할 수 있습니다. 이 방식은 더 느리지만 사전 렌더링 된 페이지는 항상 최신일 것입니다. 혹은 사전 렌더링을 건너뛰고 클라이언트 측 JavaScript를 사용하여 자주 변경되는 데이터를 채울 수 있습니다.

### 정적 생성에 집중합니다

이 강의에서는 [정적 생성(Static Generation)](https://nextjs.org/docs/basic-features/pages#static-generation-recommended)에 집중할 것입니다. 다음 페이지에서는 **데이터를 포함하고 포함하지 않는** [정적 생성(Static Generation)](https://nextjs.org/docs/basic-features/pages#static-generation-recommended)에 대해 다룰 것입니다.

## 데이터를 포함하고 포함하지 않는 정적 생성

[정적 생성(Static Generation)](https://nextjs.org/docs/basic-features/pages#static-generation-recommended)은 데이터 유무에 상관없이 이뤄질 수 있습니다.

지금까지, 우리가 만든 모든 페이지는 외부 데이터를 가져올 필요가 없었습니다. 이 페이지들은 앱이 프로덕션을 위해 구축될 때 자동으로 정적 생성됩니다.

![데이터가 없는 정적 생성](https://nextjs.org/static/images/learn/data-fetching/static-generation-without-data.png)

하지만, 일부 페이지의 경우, 외부 데이터 일부를 먼저(first) 가져오지 않고는 HTML을 렌더링할 수 없습니다. 아마도 파일 시스템에 접근해, 외부 API를 가져오거나, 빌드 타임 때 데이터베이스에 정보를 요청(query)해야 할 수 있습니다. Next.js는 이 경우 - [**데이터가 포함된** 정적 생성](https://nextjs.org/docs/basic-features/pages#static-generation-with-data) - 를 즉시 지원합니다.

![데이터를 포함한 정적 생성](https://nextjs.org/static/images/learn/data-fetching/static-generation-with-data.png)

### `getStaticProps`를 사용한 데이터 포함 정적 생성

이것은 어떻게 가능(work)할까요? Next.js 에서는 페이지 컴포넌트를 내보낼 때, [`getStaticProps`](https://nextjs.org/docs/basic-features/data-fetching/overview#getstaticprops-static-generation) 라는 `async` 함수도 내보낼 수 있습니다. 이렇게 하면, 다음과 같은 일이 발생합니다:

* [`getStaticProps`](https://nextjs.org/docs/basic-features/data-fetching/overview#getstaticprops-static-generation)가 프로덕션 빌드 타임에 실행됩니다, 그리고...
* 함수 안에서, 외부 데이터를 가져와 페이지의 props로 보낼 수 있습니다.

```jsx
export default function Home(props) { ... }

export async function getStaticProps() {
  // Get external data from the file system, API, DB, etc.
  const data = ...

  // The value of the `props` key will be
  //  passed to the `Home` component
  return {
    props: ...
  }
}
```

기본적으로, [`getStaticProps`](https://nextjs.org/docs/basic-features/data-fetching/overview#getstaticprops-static-generation)는 Next.js에게 다음과 같이 말할 수 있게 해줍니다:  "이봐, 이 페이지는 데이터 의존성이 있어 - 따라서 이 페이지를 빌드 타임에 미리 렌더링하려면 그 데이터를 먼저 해결(resolve)해야 해!"

> **Note:** 개발 모드에서는, [`getStaticProps`](https://nextjs.org/docs/basic-features/data-fetching/overview#getstaticprops-static-generation)가 요청마다 실행됩니다.

### `getStaticProps`를 사용해봅시다

직접 해보면서 배우기가 더 쉽습니다, 그러므로 다음 페이지부터 우리의 블로그를 구현하는 데 [`getStaticProps`](https://nextjs.org/docs/basic-features/data-fetching/overview#getstaticprops-static-generation)를 사용할 것입니다.

## 간단한 블로그 구조 만들기

예제의 블로그 게시물들은 (외부 데이터 소스에서 가져오는 것이 아니라) 애플리케이션 디렉터리에 로컬 마크다운으로 저장될 것이므로, 우리는 파일 시스템에서 데이터를 읽어와야 합니다.

이 섹션에서는, 파일 시스템에서 마크다운 데이터를 읽어오는 블로그를 만드는 과정을 거칠 것입니다.

### 마크다운 파일 만들기

먼저, 루트 폴더에 `posts`라는 최상단 디렉터리를 만듭니다 (`pages/posts`와는 다릅니다). `posts` 안에 파일 두 개를 만듭니다: `pre-rendering.md`와 `ssg-ssr.md`.

이제, 다음의 코드를 `posts/pre-rendering.md` 파일에 복사합니다:

```
---
title: 'Two Forms of Pre-rendering'
date: '2020-01-01'
---

Next.js has two forms of pre-rendering: **Static Generation** and **Server-side Rendering**. The difference is in **when** it generates the HTML for a page.

- **Static Generation** is the pre-rendering method that generates the HTML at **build time**. The pre-rendered HTML is then _reused_ on each request.
- **Server-side Rendering** is the pre-rendering method that generates the HTML on **each request**.

Importantly, Next.js lets you **choose** which pre-rendering form to use for each page. You can create a "hybrid" Next.js app by using Static Generation for most pages and using Server-side Rendering for others.

```

다음으로, 다음의 코드를 `posts/ssg-ssr.md` 파일에 복사합니다:

```
---
title: 'When to Use Static Generation v.s. Server-side Rendering'
date: '2020-01-02'
---

We recommend using **Static Generation** (with and without data) whenever possible because your page can be built once and served by CDN, which makes it much faster than having a server render the page on every request.

You can use Static Generation for many types of pages, including:

- Marketing pages
- Blog posts
- E-commerce product listings
- Help and documentation

You should ask yourself: "Can I pre-render this page **ahead** of a user's request?" If the answer is yes, then you should choose Static Generation.

On the other hand, Static Generation is **not** a good idea if you cannot pre-render a page ahead of a user's request. Maybe your page shows frequently updated data, and the page content changes on every request.

In that case, you can use **Server-Side Rendering**. It will be slower, but the pre-rendered page will always be up-to-date. Or you can skip pre-rendering and use client-side JavaScript to populate data.

```

> 각 마크다운 파일 상단에 `title`과 `date`가 포함된 메타데이터 섹션이 있다는 것을 알아챘을 것입니다. 이는 YAML Front Matter라고 하며 [gray-matter](https://github.com/jonschlinkert/gray-matter)라는 라이브러리를 사용해서 파싱할 수 있습니다.

### gray-matter 설치하기

우선 각 마크다운 파일의 메타데이터를 파싱해줄 [gray-matter](https://github.com/jonschlinkert/gray-matter)를 설치합니다.

```bash
npm install gray-matter
```

### 파일 시스템을 읽어오는 유틸리티 함수 생성하기

다음으로, 파일 시스템의 데이터를 파싱할 유틸리티 함수를 만들 것입니다. 이 유틸리티 함수로 우리는 다음의 일을 수행합니다:

* 각 마크다운 파일을 파싱해서 `title`, `date`, (게시물 URL을 위한 `id`로 사용될) 파일명을 가져옵니다.
* 데이터의 목록을 인덱스 페이지에 작성하고, 날짜로 정렬합니다.

루트 디렉터리에 `lib`이라는 최상단 디렉터리를 만듭니다. 다음으로, `lib` 안에, `posts.js`라는 파일을 만들어 이 코드를 복사해 붙여 넣습니다:

```js
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'posts');

export function getSortedPostsData() {
  // /posts 아래의 파일명들을 얻음
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {
    // 파일 이름에서 ".md"를 제거하고 id를 얻음
    const id = fileName.replace(/\.md$/, '');

    // 마크다운 파일을 문자열로 읽음
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // gray-matter를 사용해 게시물의 메타데이터 섹션을 파싱
    const matterResult = matter(fileContents);

    // 데이터를 id와 결합
    return {
      id,
      ...matterResult.data,
    };
  });
  // 게시물을 날짜로 정렬
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}
```

> **Note:**
>
> Next.js를 학습하기 위해 위의 코드가 무엇을 하는지 이해할 필요는 없습니다, 위의 함수는 블로그 예제를 기능적으로 만들기 위함입니다. 하지만 더 배우고 싶다면:
>
> * [`fs`](https://nodejs.org/api/fs.html#fsreaddirsyncpath-options)는 파일을 파일 시스템에서 읽을 수 있도록 해주는 Node.js 모듈입니다.
> * [`path`](https://nodejs.org/api/path.html#pathjoinpaths)는 파일 경로를 다룰 수 있도록 해주는 Node.js 모듈입니다.
> * [`matter`](https://www.npmjs.com/package/gray-matter)은 각 마크다운 파일의 메타데이터를 파싱해주는 라이브러리입니다.
> * Next.js에서 `lib` 폴더는 `pages` 폴더처럼 할당된 이름을 갖는 것은 아니므로, 어떤 이름을 사용해도 상관없습니다. 주로 관습적으로 `lib`이나 `utils`를 사용합니다.

### 블로그 데이터를 가져오기

블로그 데이터를 파싱했으므로, 이를 인덱스 페이지(`pages/index.js`)에 추가해야 합니다. [`getStaticProps()`](https://nextjs.org/docs/basic-features/data-fetching/overview#getstaticprops-static-generation)라는 Next.js 데이터 가져오기 메소드를 통해 할 수 있습니다. 다음 섹션에서는 `getStaticProps()`를 구현하는 방법을 배울 것입니다.

![index page with getStaticProps](https://nextjs.org/static/images/learn/data-fetching/index-page.png)

다음 섹션에서 해봅시다!

## getStaticProps 구현하기

### Next.js에서의 사전 렌더링

Next.js에는 두 가지 형태의 사전 렌더링이 있습니다: **정적 생성**과 **서버 측 렌더링**. 두 방식 차이는 페이지의 HTML을 생성**할 때** 생깁니다.

* **정적 생성**은 **빌드 타임(build-time)**에 HTML을 생성하는 사전 렌더링 방식입니다. 사전 렌더링 된 HTML은 요청마다 *재사용*됩니다.
* **서버 측 렌더링**은 **매 요청**마다 HTML을 생성하는 사전 렌더링 방식입니다.

중요한 것은 Next.js에서는 각 페이지에 사용할 사전 렌더링을 방식을 **선택**할 수 있다는 것입니다. 당신은 대부분 페이지에서는 정적 생성을 그리고 나머지 페이지에는 서버 측 렌더링을 사용해서 "하이브리드" Next.js 앱을 만들 수 있습니다.

### 정적 생성을 사용하기 (`getStaticProps()`)

이제 `getSortedPostsData`를 위한 import 문을 추가하고, 이를 `pages/index.js`의 [`getStaticProps()`](https://nextjs.org/docs/basic-features/data-fetching/overview#getstaticprops-static-generation)의 안에서 호출해야 합니다.

에디터에서 `pages/index.js`를 연 뒤 다음의 코드를 내보내진 `Home` 컴포넌트의 위에 추가하세요:

```jsx
import { getSortedPostsData } from '../lib/posts';

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}
```

`getStaticProps` 에서 `props` 객체 안에 `allPostsData`를 반환하면, 블로그 게시물이 Home 컴포넌트의 prop으로 전달됩니다. 이제 다음과 같이 블로그 포스트에 접근할 수 있습니다:

```js
export default function Home ({ allPostsData }) { ... }
```

블로그 포스트를 표시하기 위해서, 자기소개를 포함한 섹션 아래의 데이터와 함께 다른 `<section>` 태그를 추가하도록 `Home` 컴포넌트를 업데이트해 봅시다. Props를 `()`에서 `({allPostsData})`로 바꾸는 것도 잊지 마세요:

```jsx
export default function Home({ allPostsData }) {
  return (
    <Layout home>
      {/* Keep the existing code here */}

      {/* Add this <section> tag below the existing <section> tag */}
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              {title}
              <br />
              {id}
              <br />
              {date}
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}
```

이제 http://localhost:3000에 접근하면 블로그 데이터를 볼 수 있을 것입니다.

![blog data](https://nextjs.org/static/images/learn/data-fetching/blog-data.png)

축하합니다! 성공적으로 외부 데이터를 (파일 시스템에서) 가져오고 이 데이터로 인덱스 페이지를 미리 렌더링했습니다.

![index page](https://nextjs.org/static/images/learn/data-fetching/index-page.png)

다음 섹션에서는 [`getStaticPRops`](https://nextjs.org/docs/basic-features/data-fetching/overview#getstaticprops-static-generation)를 사용하기 위한 몇 가지 팁에 대해 얘기해봅시다.

## getStaticProps 세부 사항

다음은 [`getStaticPRops`](https://nextjs.org/docs/basic-features/data-fetching/overview#getstaticprops-static-generation)에 대해 알아야 할 몇 가지 필수 정보입니다.

### 외부 API를 가져오거나 데이터베이스에 정보를 요청(query)하기

`lib/posts.js`에서 파일 시스템에서 데이터를 가져오는 `getSortedPostsData`를 구현했습니다. 그러나 외부 API 엔드 포인트와 같은 다른 소스에서도 데이터를 가져올 수 있으며, 잘 작동할 것입니다:

```jsx
export async function getSortedPostsData() {
  // 파일 시스템 대신,
  // 게시물 데이터를 외부 API 엔드포인트에서 가져옴
  const res = await fetch('..');
  return res.json();
}
```

> **Note:** Next.js는 [fetch()](https://nextjs.org/docs/basic-features/supported-browsers-features)를 클라이언트와 서버 모두에서 polyfill 합니다. Import 할 필요가 없습니다.

또한 직접적으로 데이터베이스에 정보를 요청해 가져올 수 있습니다:

```jsx
import someDatabaseSDK from 'someDatabaseSDK'

const databaseClient = someDatabaseSDK.createClient(...)

export async function getSortedPostsData() {
  // 파일 시스템 대신,
  // 게시물 데이터를 데이터베이스에서 가져옴
  return databaseClient.query('SELECT posts...')
}
```

이것은 [`getStaticProps`](https://nextjs.org/docs/basic-features/data-fetching/overview#getstaticprops-static-generation)가 **서버 측에서만 실행되기** 때문에 가능합니다. `getStaticProps`는 클라이언트 측에서는 절대 실행되지 않습니다. 브라우저의 JS 번들에 포함되지도 않을 것입니다. 즉, 직접적인(direct) 데이터베이스 쿼리와 같은 코드를 브라우저에 전송하지 않고 작성할 수 있다는 것을 의미합니다.

### 개발 vs. 프로덕션

* **개발** (`npm run dev` 또는 `yarn dev`)에서는 [`getStaticProps`](https://nextjs.org/docs/basic-features/data-fetching/overview#getstaticprops-static-generation)가 *요청마다* 실행됩니다.
* **프로덕션**에서는, [`getStaticProps`](https://nextjs.org/docs/basic-features/data-fetching/overview#getstaticprops-static-generation)가 *빌드 타임*에만 실행됩니다. 하지만, 이 동작은 [`getStaticProps`](https://nextjs.org/docs/basic-features/data-fetching/overview#getstaticprops-static-generation)가 반환하는 [`fallback` key](https://nextjs.org/docs/api-reference/data-fetching/get-static-paths#fallback-false)를 사용해 향상할 수 있습니다.

빌드 타임에 실행되게 되어있기 때문에, 쿼리 매개변수 또는 HTTP 헤더와 같이 요청 시간 중에만 사용할 수 있는 데이터는 사용할 수 없습니다.

### 페이지에서만 허용됩니다

[`getStaticProps`](https://nextjs.org/docs/basic-features/data-fetching/overview#getstaticprops-static-generation)는 **[`page`](https://nextjs.org/docs/basic-features/pages)**에서만 export 할 수 있습니다. 페이지가 아닌 파일에서는 `getStaticProps`를 export 할 수 없습니다.

이런 제한의 이유 중 하나는 페이지가 렌더링 되기 전에 React에 필요한 모든 데이터가 있어야 하기 때문입니다.

### 요청 시간에 데이터를 가져와야 하면 어떡하나요?

[정적 생성](https://nextjs.org/docs/basic-features/pages#static-generation-recommended)은 빌드 타임에 한 번 발생하므로, 자주 업데이트되거나 사용자 요청마다 바뀌는 데이터에는 적합하지 않습니다.

이렇게, 데이터가 변하기 쉬운 경우에는, **[서버 측 렌더링](https://nextjs.org/docs/basic-features/pages#server-side-rendering)**을 사용할 수 있습니다. 다음 섹션에서 서버 측 렌더링에 대해서 더 자세히 배워봅시다.

## 요청 시간에 데이터 가져오기

만약 빌드 타임 대신에 **요청 시간**에 데이터를 가져와야 한다면, **[서버 측 렌더링](https://nextjs.org/docs/basic-features/pages#server-side-rendering)**를 사용해볼 수 있습니다:

![server side rendering with data](https://nextjs.org/static/images/learn/data-fetching/server-side-rendering-with-data.png)

[서버 측 렌더링](https://nextjs.org/docs/basic-features/pages#server-side-rendering)을 사용하려면, 페이지에서 [`getStaticProps`](https://nextjs.org/docs/basic-features/data-fetching/overview#getstaticprops-static-generation) 대신에 [`getServerSideProps`](https://nextjs.org/docs/basic-features/data-fetching/overview#getserversideprops-server-side-rendering)를 export 시켜야 합니다.

### `getServerSideProps` 사용하기

다음은 [`getServerSideProps`](https://nextjs.org/docs/basic-features/data-fetching/overview#getserversideprops-server-side-rendering)의 시작 코드입니다. 이 코드는 우리의 블로그 예제에는 필요 없으므로 이를 사용(implement)하지는 않을 것입니다.

```jsx
export async function getServerSideProps(context) {
  return {
    props: {
      // props for your component
    },
  };
}
```

[`getServerSideProps`](https://nextjs.org/docs/basic-features/data-fetching/overview#getserversideprops-server-side-rendering)는 요청 시간에 호출되므로, 그 매개변수(`context`)에는 요청에 따라 다른(request specific) 매개변수가 포함되어 있습니다.

[`getServerSideProps`](https://nextjs.org/docs/basic-features/data-fetching/overview#getserversideprops-server-side-rendering)는 데이터를 요청 시간에 가져와야 하는 페이지를 미리 렌더링해야 하는 경우에만 사용해야 합니다. 서버가 매 요청에 대해 결과를 계산해야 하고, 추가 구성없이는 그 결과를 [CDN](https://vercel.com/docs/concepts/edge-network/overview)으로 캐싱할 수 없기 때문에 첫 바이트가 로드되는데 걸리는 시간([TTFB](https://developer.chrome.com/docs/lighthouse/performance/time-to-first-byte/))이 [`getStaticProps`](https://nextjs.org/docs/basic-features/data-fetching/overview#getstaticprops-static-generation)보다 느립니다.

### 클라이언트 측 렌더링

사전 렌더링 데이터가 **필요 없는** 경우, 다음의 전략을 사용할 수도 있습니다 (**[클라이언트 측 렌더링](https://nextjs.org/docs/basic-features/data-fetching/overview#fetching-data-on-the-client-side)**이라고 합니다):

* 외부 데이터를 필요로하지 않는 페이지의 일부를 정적으로 생성(사전 렌더링)합니다.
* 페이지를 불러오면, JavaScript를 사용해 외부 데이터를 가져오고 남은 부분을 채워 넣습니다.

![client side rendering](https://nextjs.org/static/images/learn/data-fetching/client-side-rendering.png)

이 방식은 예를 들어, 사용자 대시보드 페이지에서 잘 동작합니다. 대시보드는 개인적이고, 사용자에게 특정된 페이지이므로, SEO와 크게 관련이 없고(not relavant), 해당 페이지는 [사전 렌더링](https://nextjs.org/docs/basic-features/pages#pre-rendering)될 필요가 없습니다. 반면에 데이터가 자주 업데이트되므로 요청 시간에 데이터를 가져오는 것이 필요합니다.

### SWR

Next.js 뒤의 팀은 **[SWR](https://swr.vercel.app/ko)**이라는 데이터를 가져오기 위한 React hook을 만들어두었습니다. 클라이언트 측에서 데이터를 가져온다면 이를 사용해보는 것을 강력히 추천합니다. SWR은 캐싱(caching), 재검토(revalidation), 포커스 추적(focus tracking), 일정 간격으로 다시 가져오기(refetching on interval)를 처리합니다. 여기서는 세부 사항을 다루지 않지만, 용례는 다음과 같습니다:

```jsx
import useSWR from 'swr';

function Profile() {
  const { data, error } = useSWR('/api/user', fetch);

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;
  return <div>hello {data.name}!</div>;
}
```

더 자세히 배우고 싶다면 [SWR 문서](https://swr.vercel.app/ko)를 확인하세요.

### 여기까지

다음 강의에서는 **[동적 경로](https://nextjs.org/docs/routing/dynamic-routes)**를 사용해 각 블로그 게시글을 위한 페이지를 만들 예정입니다.

> 다시 한번, [데이터 가져오기 문서](https://nextjs.org/docs/basic-features/data-fetching/overview)에서 [`getStaticProps`](https://nextjs.org/docs/basic-features/data-fetching/overview#getstaticprops-static-generation)와 [`getServerSideProps`](https://nextjs.org/docs/basic-features/data-fetching/overview#getserversideprops-server-side-rendering)에 대한 더 자세한 정보를 얻을 수 있습니다.

## 주석

[^build-time]: [Build Time and Runtime](https://nextjs.org/learn/foundations/how-nextjs-works/buildtime-and-runtime) by Next.js Docs
