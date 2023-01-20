---
layout  : article
title   : 동적 경로 (Dynamic Routes)
summary : 
date    : 2023-01-20 16:02:56 +0900
updated : 2023-01-20 19:22:26 +0900
tag     : draft
toc     : true
public  : true
parent  : [[/react-library/nextjs/learn-course]]
latex   : false
---
* TOC
{:toc}

> 이 글은 Next.js에서 제공하는 learn course의 [CREATE YOUR FIRST APP](https://nextjs.org/learn/basics/create-nextjs-app) 중 [Dynamic Routes](https://nextjs.org/learn/basics/dynamic-routes)의 내용을 번역 및 정리한 글입니다.
>
> * 제가 필요한 부분 위주로 확인하면서 정리하고 있어 글에 덜 작성된 부분이 있을 수 있습니다.
> * 글 작성 후 원문의 내용이 수정되거나 내용을 이해하기 위한 개인적인 설명이나 해석이 있을 수 있습니다. 되도록 원문을 참고해주시길 바랍니다.
> * 잘못된 부분이 있다면 댓글이나 그 외 편하신 방법으로 알려주시면 감사하겠습니다.

인덱스 페이지를 블로그 데이터로 채워 넣었습니다, 하지만 아직 개별 블로그 페이지를 만들지 않았죠([예상 결과](https://next-learn-starter.vercel.app)). 우리는 이 페이지들의 URL이 블로그의 데이터를 기반(depends on)으로 하길 원하는데, 이는 우리가 [동적 경로](https://nextjs.org/docs/routing/dynamic-routes)를 사용해야 한다는 것을 의미합니다.

### 이 강의에서 배울 것

이 강의에서는, 다음과 같은 내용을 배웁니다.

* [`getStaticPaths`](https://nextjs.org/docs/basic-features/data-fetching/overview#getstaticpaths-static-generation)를 사용해 [동적 경로](https://nextjs.org/docs/routing/dynamic-routes)를 갖는 페이지를 정적으로 생성하는 방법.
* 각 블로그 게시물의 데이터를 가져오기 위해 [`getStaticPaths`](https://nextjs.org/docs/basic-features/data-fetching/overview#getstaticpaths-static-generation)를 작성하는 방법.
* [`remark`](https://github.com/remarkjs/remark)를 사용해 마크다운을 렌더링하는 방법.
* 날짜 문자열을 예쁘게 출력하는 방법.
* [동적 경로](https://nextjs.org/docs/routing/dynamic-routes)로 페이지를 연결하는 방법.
* [동적 경로](https://nextjs.org/docs/routing/dynamic-routes)에 대한 유용한 정보들.

**이전 강의를 이어서 보고 있다면**, 이(다음) 부분을 넘어가도 괜찮습니다.

## 시작 코드를 다운로드 (선택적)

이전 강의에서 이어서 보고 있는 것이 아니라면, 당신은 이 강의를 위한 코드를 아래에서 다운로드, 설치, 실행할 수 있습니다. 이 코드는 이전 강의의 결과와 동일한 `nextjs-blog`라는 디렉터리를 추가(set up)합니다.

다시 말하자면, 이전 강의를 막 끝마쳤다면 이 과정은 필요하지 않습니다.

```
npx create-next-app@latest nextjs-blog --use-npm --example "https://github.com/vercel/next-learn/tree/master/basics/dynamic-routes-starter"
```

그다음 출력된 명령의 지침을 따르세요. (디렉터리로 이동(`cd`)하고 개발 서버를 시작합니다)

또한 다음의 파일을 업데이트해야 합니다:

* `public/images/profile.jpg`를 당신의 사진으로 (추천 값: 400px width/height).
* `components/layout.js`의 `const name = '[Your Name]'`을 당신의 이름으로.
* `pages/index.js`의 `<p>[Your Self Introduction]</p>`를 당신의 자기소개로.

## 외부 데이터에 의존하는 페이지 경로

이전 강의에서, **페이지 내용**이 외부 데이터에 의존하는 경우를 다뤘습니다. [`getStaticProps`](https://nextjs.org/docs/basic-features/data-fetching/overview#getstaticprops-static-generation)를 사용해 인덱스 페이지를 렌더링하는 데 필요한 데이터를 가져왔습니다.

이 강의에서는, 각 **페이지 경로**가 외부 데이터에 의존하는 경우에 대해서 설명할 것입니다. Next.js를 사용하면 외부 데이터에 의존적인 경로를 갖는 페이지를 정적으로 생성할 수 있습니다. 이렇게 하면 Next.js에서 **동적 URL**을 사용할 수 있습니다.

![page path depends on external data](https://nextjs.org/static/images/learn/dynamic-routes/page-path-external-data.png)

## 동적 경로를 갖는 페이지를 정적으로 생성하는 방법

우리의 예제에서는, 블로그 게시물을 위한 [동적 경로](https://nextjs.org/docs/routing/dynamic-routes)를 생성해야 합니다:

* 각 게시물의 경로가 `/posts/<id>`여야 합니다, `<id>`는 최상위 `posts` 디렉터리 안(under)의 마크다운 파일명입니다.
* `ssg-ssr.md`와 `pre-rendering.md` 파일이 있으므로, 경로는 `/posts/ssg-ssr`과 `/posts/pre-rendering`이어야 합니다.

### 각 단계의 개요

다음 단계를 수행하여 위의 작업을 할 수 있습니다. **아직은 이렇게 변경할 필요가 없습니다** - 모두 다음 섹션에서 진행할 것입니다.

먼저, **`[id.js]`**라는 페이지를 만듭니다. Next.js에서 `[`로 시작해서 `]`로 끝나는 페이지는 [동적 경로](https://nextjs.org/docs/routing/dynamic-routes)입니다.

`pages/posts/[id].js`에 게시믈 페이지를 렌더링하는 코드를 작성할 것입니다 - 우리가 이전에 만든 다른 페이지처럼 말이죠.

```jsx
import Layout from '../../components/layout';

export default function Post() {
  return <Layout>...</Layout>;
}
```

이제, 새로운 것은 다음과 같습니다: 이 페이지에서 [`getStaticPaths`](https://nextjs.org/docs/basic-features/data-fetching/overview#getstaticpaths-static-generation)라는 async 함수를 내보낼 것입니다. 이 함수에서, `id`로 **사용할 수 있는(possible) 값**의 목록을 반환해야 합니다.

```jsx
import Layout from '../../components/layout';

export default function Post() {
  return <Layout>...</Layout>;
}

export async function getStaticPaths() {
  // id로 사용할 수 있는 값의 목록 반환
}
```

마지막으로, [`getStaticProps`](https://nextjs.org/docs/basic-features/data-fetching/overview#getstaticprops-static-generation)를 다시 사용(implement)해야 합니다 - 이번에는, 주어진 `id`의 블로그 게시물에 필요한 데이터를 가져옵니다. (파일명이 `[id].js` 이므로) [`getStaticProps`](https://nextjs.org/docs/basic-features/data-fetching/overview#getstaticprops-static-generation)에는 `id`를 포함하는 `params`가 주어집니다.

```jsx
import Layout from '../../components/layout';

export default function Post() {
  return <Layout>...</Layout>;
}

export async function getStaticPaths() {
  // id로 사용할 수 있는 값의 목록 반환
}

export async function getStaticProps({ params }) {
  // params.id를 사용하는 블로그 게시물에 필요한 데이터를 가져옴
}
```

방금 다룬 내용을 요약한 이미지는 다음과 같습니다:

![how to dynamic routes](https://nextjs.org/static/images/learn/dynamic-routes/how-to-dynamic-routes.png)

다음 섹션에서 이를 시도해봅시다!

## getStaticPaths 사용(implement)

먼저 파일을 설정합시다:

* `pages/posts` 디렉터리 안에 **`[id].js`**라는 파일을 만듭니다.
* 또한, `pages/posts` 디렉터리 안에서 **`first-post.js`를 제거**합니다 - 더는 사용하지 않을 예정입니다.

다음으로, `pages/posts/[id].js`를 에디터에서 열어서 다음의 코드를 붙여 넣습니다. `...` 부분은 이후에 작성할 예정입니다:

```jsx
import Layout from '../../components/layout';

export default function Post() {
  return <Layout>...</Layout>;
}
```

다음으로, `lib/posts.js`를 열어 다음의 `getAllPostIds` 함수를 하단에 추가합니다. 이 함수는 `posts` 디렉터리 안의 파일명 목록을 (`.md` 없이) 반환합니다.

```jsx
export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory);

  // 다음과 같이 보이는 배열을 반환:
  // [
  //   {
  //     params: {
  //       id: 'ssg-ssr'
  //     }
  //   },
  //   {
  //     params: {
  //       id: 'pre-rendering'
  //     }
  //   }
  // ]
  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, ''),
      },
    };
  });
}
```

**중요:** 반환된 목록은 단순한 문자열 배열이 *아닙니다* - 위의 주석에 보이는 것처럼 객체의 배열**이어야 합니다**. 각 객체는 `params` key를 갖고 `id` key가 있는 객체를 포함합니다 (`[id]`를 파일명에 사용했기 때문입니다). 그렇지 않으면 [`getStaticPaths`](https://nextjs.org/docs/basic-features/data-fetching/overview#getstaticpaths-static-generation)가 실패합니다.

마지막으로, `getAllPostIds` 함수를 import해 [`getStaticPaths`](https://nextjs.org/docs/basic-features/data-fetching/overview#getstaticpaths-static-generation) 안에서 사용합니다. `pages/posts/[id].js`를 열어 다음의 코드를 복사해 export 된 `Post` 컴포넌트 위에 붙여 넣습니다:

```jsx
import { getAllPostIds } from '../../lib/posts';

export async function getStaticPaths() {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
}
```

* `paths`는 `getAllPostIds()`가 반환한 알려진 경로의 배열을 포함합니다. 여기에는 `pages/posts/[id].js`에서 정의된 매개변수가 포함됩니다. [`paths` key 문서](https://nextjs.org/docs/basic-features/data-fetching/overview#the-paths-key-required)에서 더 많은 것을 배워보세요.
* [`fallback: false`](https://nextjs.org/docs/basic-features/data-fetching/overview#fallback-false)는 지금은 무시하시길 바랍니다 - 나중에 설명할 예정입니다.

이제 거의 다 끝났습니다 - 하지만 여전히 [`getStaticProps`](https://nextjs.org/docs/basic-features/data-fetching/overview#getstaticprops-static-generation)를 사용해야 합니다. 다음 섹션에서 이를 해봅시다!

## getStaticProps 사용

주어진 `id` 값의 게시물을 렌더링하는 데 필요한 데이터를 가져와야 합니다.

그러려면, `lib/posts.js`를 다시 열고 다음의 `getPostData` 함수를 하단에 추가하세요. 이 함수는 `id`를 기반으로 게시물 데이터를 반환할 것입니다.

```jsx
export function getPostData(id) {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  // 게시물의 메타데이터 부분을 파싱하기 위해 gray-matter를 사용
  const matterResult = matter(fileContents);

  // 데이터를 id와 연결(combine)
  return {
    id,
    ...matterResult.data,
  };
}
```

다음으로, `pages/posts/[id]/js`를 열어 이 코드를:

```js
import { getAllPostIds } from '../../lib/posts';
```

다음의 코드로 교체하세요:

```jsx
import { getAllPostIds, getPostData } from '../../lib/posts';

export async function getStaticProps({ params }) {
  const postData = getPostData(params.id);
  return {
    props: {
      postData,
    },
  };
}
```

이제 게시물 페이지는 `getStaticProps` 안에서 `getPostData` 함수를 사용해 게시물 데이터를 가져오고 props로 반환합니다.

이제, `Post` 컴포넌트를 `postData`를 사용하도록 수정해봅시다. `pages/posts/[id].js`에서 export 하는 `Post` 컴포넌트를 다음의 코드로 바꾸세요:

```jsx
export default function Post({ postData }) {
  return (
    <Layout>
      {postData.title}
      <br />
      {postData.id}
      <br />
      {postData.date}
    </Layout>
  );
}
```

끝났습니다! 다음의 페이지를 방문해보세요:

* http://localhost:3000/posts/ssg-ssr
* http://localhost:3000/posts/pre-rendering

각 페이지의 블로그 데이터를 볼 수 있을 것입니다:

![blog data post page](https://nextjs.org/static/images/learn/dynamic-routes/blog-data-post-page.png)

훌륭합니다! [동적 경로](https://nextjs.org/docs/routing/dynamic-routes)를 성공적으로 생성해냈습니다.

### 무언가 잘못되었나요?

오류가 발생한다면, 올바른 코드를 입력(have)했는지 확인해보세요.

* `pages/posts/[id].js`는 [다음과 같아야 합니다](https://github.com/vercel/next-learn/blob/master/basics/dynamic-routes-step-1/pages/posts/%5Bid%5D.js).
* `lib/posts.js` [다음과 같아야 합니다](https://github.com/vercel/next-learn/blob/master/basics/dynamic-routes-step-1/lib/posts.js).
* (여전히 제대로 동작하지 않는다면) 나머지 코드는 [다음과 같아야 합니다](https://github.com/vercel/next-learn/tree/master/basics/dynamic-routes-step-1).

### 요약

다시, 지금까지 한 내용의 요약 이미지는 다음과 같습니다:

![how to dynamic routes](https://nextjs.org/static/images/learn/dynamic-routes/how-to-dynamic-routes.png)

우리는 여전히 블로그의 **마크다운 콘텐츠**는 게시(display)하지 않았습니다. 이를 다음에 해 봅시다.

## 마크다운 렌더링

> TODO

## 게시물 페이지 다듬기

> TODO

## 인덱스 페이지 다듬기

> TODO

## 동적 경로 세부 사항

다음은 [동적 경로](https://nextjs.org/docs/routing/dynamic-routes)에 대해 알아야 할 몇 가지 필수 정보입니다:

### 외부 API를 가져오거나 데이터베이스에 정보를 요청(query)

[`getStaticProps`](https://nextjs.org/docs/basic-features/data-fetching/overview#getstaticprops-static-generation)처럼, [`getStaticPaths`](https://nextjs.org/docs/basic-features/data-fetching/overview#getstaticpaths-static-generation)는 어떤 데이터 소스에서든 데이터를 가져올 수 있습니다. 우리 예제에서는, ([`getStaticPaths`](https://nextjs.org/docs/basic-features/data-fetching/overview#getstaticpaths-static-generation))에서 사용되는) `getAllPostIds`가 외부 API 엔드포인트에서 데이터를 가져올 수도 있습니다.

```jsx
export async function getAllPostIds() {
  // 파일 시스템 대신,
  // 외부 API 엔드포인트로부터 게시물 데이터를 가져옴
  const res = await fetch('..');
  const posts = await res.json();
  return posts.map((post) => {
    return {
      params: {
        id: post.id,
      },
    };
  });
}
```

### 개발 vs. 프로덕션

* **개발** (`npm run dev` 또는 `yarn dev`)에서는 [`getStaticPaths`](https://nextjs.org/docs/basic-features/data-fetching/overview#getstaticpaths-static-generation)가 *요청마다* 실행됩니다.
* **프로덕션**에서는, [`getStaticPaths`](https://nextjs.org/docs/basic-features/data-fetching/overview#getstaticpaths-static-generation)가 *빌드 타임*에만 실행됩니다.

## 대안(폴백)

[`getStaticPaths`](https://nextjs.org/docs/basic-features/data-fetching/overview#getstaticpaths-static-generation)에서 `fallback: false`를 반환했던 것을 떠올려봅시다. 이것은 어떤 의미일까요?

만약 [`fallback`이 `false`이면](https://nextjs.org/docs/basic-features/data-fetching/overview#fallback-false), [`getStaticPaths`](https://nextjs.org/docs/basic-features/data-fetching/overview#getstaticpaths-static-generation)에서 반환하지 않은 모든 경로는 **404 페이지**로 이어집니다.

만약 [`fallback`이 `true`이면](https://nextjs.org/docs/basic-features/data-fetching/overview#fallback-true), [`getStaticPaths`](https://nextjs.org/docs/basic-features/data-fetching/overview#getstaticpaths-static-generation)의 동작이 달라집니다:

* [`getStaticPaths`](https://nextjs.org/docs/basic-features/data-fetching/overview#getstaticpaths-static-generation)에서 반환된 경로는 빌드 타임에 HTML로 렌더링 됩니다.
* 빌드 타임에 생성되지 않은 경로는 404 페이지로 이어지지 않습니다. 대신, Next.js가 해당 경로의 첫 요청 때 해당 페이지의 "대안 페이지"를 제공합니다.
* 백그라운드에서 Next.js는 요청된 경로를 정적으로 생성합니다. 동일한 경로에 대한 후속 요청에 대해서는 빌드 타임에 사전 렌더링 된 다른 페이지처럼 생성된 페이지를 제공합니다.

만약 [`fallback`이 `blocking`이면](https://nextjs.org/docs/basic-features/data-fetching/overview#fallback-blocking), 새로운 경로는 `getStaticProps`로 서버 측에서 렌더링 되고, 미래의 요청을 위해 이를 캐싱되어 경로당 한 번만 발생하도록 합니다.

우리의 강의 범위를 벗어나긴 하지만, [`fallback` 문서](https://nextjs.org/docs/api-reference/data-fetching/get-static-paths#fallback-false) 에서 `fallback: true`와 `fallback: 'blocking'`에 대해서 더 알아볼 수 있습니다.

## 경로를 Catch-all 하기

대괄호 안에 말줄임표 (`...`)를 추가해 동적 경로가 모든 경로를 포착(catch all)하도록 확장할 수 있습니다. 예를 들어:

* `pages/posts/[...ids].js`는 `/posts/a`, `/posts/a/b`, `/posts/a/b/c` 등 모두에 일치합니다.

이렇게 하면, [`getStaticPaths`](https://nextjs.org/docs/basic-features/data-fetching/overview#getstaticpaths-static-generation)에서는, `id` key의 값으로 다음과 같은 배열을 반환해야 합니다:

```jsx
return [
  {
    params: {
      // /posts/a/b/c를 정적으로 생성
      id: ['a', 'b', 'c'],
    },
  },
  //...
];
```

그리고 [`getStaticProps`](https://nextjs.org/docs/basic-features/data-fetching/overview#getstaticprops-static-generation)에서 `params.id`는 배열일 것입니다.

```jsx
export async function getStaticProps({ params }) {
  // params.id는 ['a', 'b', 'c']와 같음
}
```

더 많은 정보는 [모든 경로를 포착하기 문서](https://nextjs.org/docs/routing/dynamic-routes#catch-all-routes)를 살펴보세요.

### 라우터

만약 Next.js 라우터에 접근하고 싶다면 [`next/router`](https://nextjs.org/docs/api-reference/next/router)에서 [`useRouter`](https://nextjs.org/docs/api-reference/next/router#userouter) 훅을 가져와 사용할 수 있습니다.

### 404 페이지

[개인 404 페이지](https://nextjs.org/docs/advanced-features/custom-error-page#404-page)를 만들려면, `pages/404.js`를 생성하세요. 이 파일은 빌드 파임에 정적으로 생성됩니다.

```jsx
// pages/404.js
export default function Custom404() {
  return <h1>404 - Page Not Found</h1>;
}
```

더 많은 정보는 [오류 페이지](https://nextjs.org/docs/advanced-features/custom-error-page) 문서를 살펴보세요.

### 더 많은 예제

[`getStaticProps`](https://nextjs.org/docs/basic-features/data-fetching/overview#getstaticprops-static-generation)와 [`getStaticPaths`](https://nextjs.org/docs/basic-features/data-fetching/overview#getstaticpaths-static-generation)를 설명하기 위해 몇 개의 예제를 만들어 보았습니다 - 추가 학습을 하고 싶다면 다음의 소스 코드를 살펴보세요:

* [마크다운 파일을 사용한 블로그 스타터](https://github.com/vercel/next.js/tree/canary/examples/blog-starter) ([Demo](https://next-blog-starter.vercel.app))
* [WordPress 예제](https://github.com/vercel/next.js/tree/canary/examples/cms-wordpress) ([Demo](https://next-blog-wordpress.vercel.app))
* [DatoCMS 예제](https://github.com/vercel/next.js/tree/canary/examples/cms-datocms) ([Demo](https://next-blog-datocms.vercel.app))
* [TakeShape 예제](https://github.com/vercel/next.js/tree/canary/examples/cms-takeshape) ([Demo](https://next-blog-takeshape.vercel.app))
* [Sanity 예제](https://github.com/vercel/next.js/tree/canary/examples/cms-sanity) ([Demo](https://next-blog-sanity.vercel.app))

### 이상입니다

다음 강의에서는 Next.js의 [API 라우트](https://nextjs.org/docs/api-routes/introduction)에 대해서 다룰 예정입니다.
