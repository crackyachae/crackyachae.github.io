---
layout  : article
title   : 페이지 사이를 탐색하기
summary : 
date    : 2023-01-13 17:07:41 +0900
updated : 2023-01-14 17:25:46 +0900
tag     : 
toc     : true
public  : true
parent  : [[/react-library/nextjs/learn-course]]
latex   : false
---
* TOC
{:toc}

> 이 글은 Next.js에서 제공하는 learn course의 [CREATE YOUR FIRST APP](https://nextjs.org/learn/basics/create-nextjs-app) 중 [Navigate Between Pages](https://nextjs.org/learn/basics/navigate-between-pages)의 내용을 번역 및 정리한 글입니다.
>
> * 제가 필요한 부분 위주로 확인하면서 정리하고 있어 글에 덜 작성된 부분이 있을 수 있습니다.
> * 글 작성 후 원문의 내용이 수정되거나 내용을 이해하기 위한 개인적인 설명이나 해석이 있을 수 있습니다. 되도록 원문을 참고해주시길 바랍니다.
> * 잘못된 부분이 있다면 댓글이나 그 외 편하신 방법으로 알려주시면 감사하겠습니다.

지금까지, 우리가 만든 Next.js 앱은 단 하나의 페이지만 갖고 있습니다. 웹 사이트와 웹 애플리케이션은 일반적으로 많은 다른 페이지들을 갖습니다.

## 이 강의에서 배울 내용

이 강의에서 당신은:

* 통합된 [파일 시스템 라우팅](https://nextjs.org/docs/routing/introduction)을 사용해 새로운 페이지를 생성합니다.
* `Link` 컴포넌트를 사용하여 페이지 간의 클라이언트 사이드 탐색을 가능하게 하는 방법을 배웁니다.
* 코드 분할 및 미리 가져오기(prefetch)를 위한 기본 제공 지원에 대해 배웁니다.

> 만약 Next.js 라우팅에 대한 상세 문서를 찾는다면 [라우팅 문서](https://nextjs.org/docs/routing/introduction)를 살펴보세요.

**이전 강의를 이어서 보고 있다면**, 이(다음) 부분을 넘어가도 괜찮습니다.

## 시작 코드를 다운로드 (선택적)

이전 강의에서 이어서 보고 있는 것이 아니라면, 당신은 이 강의를 위한 코드를 아래에서 다운로드, 설치, 실행할 수 있습니다. 이 코드는 이전 강의의 결과와 동일한 `nextjs-blog`라는 디렉터리를 추가(set up)합니다.

다시 말하자면, 이전 강의를 막 끝마쳤다면 이 과정은 필요하지 않습니다.

```
npx create-next-app@latest nextjs-blog --use-npm --example "https://github.com/vercel/next-learn/tree/master/basics/navigate-between-pages-starter"
```

그다음 출력된 명령의 지침을 따르세요. (디렉터리로 이동(`cd`)하고 개발 서버를 시작합니다).

## Next.js의 페이지

Next.js에서, 페이지는 [`pages` 디렉토리](https://nextjs.org/docs/basic-features/pages) 안의 파일에서 export 된 React 컴포넌트입니다.

페이지는 **파일 이름**을 기준으로 경로와 연결(associated)됩니다. 예를 들어 개발에서:

* `pages.index.js`는 `/` 경로와 연결됩니다.
* `pages/posts/first-post.js`는 `/posts/first-post.js`와 연결됩니다.

우리는 이미 `pages/index.js` 파일을 가졌으므로, `pages/posts/first-post.js`를 생성해 이것이 어떻게 동작하는지 살펴봅시다.

### 새 페이지 생성

`posts` 디렉터리를 `pages` 하위에 만드세요.

`posts` 디렉토리 안에 `first-post.js`이라는 파일을 다음의 콘텐츠와 함께 만드세요.

```js
export default function FirstPost() {
  return <h1>First Post</h1>;
}
```

컴포넌트는 어떤 이름을 사용해도 괜찮지만 반드시 `default` export 되어야 합니다.

이제, 개발 서버가 실행중인지 확인한 뒤 http://localhost:3000/posts/first-post에 방문해보세요. 다음의 페이지를 볼 수 있을 것입니다:

![흰 바탕에 First Post라는 제목만 적혀있는 First Post 페이지](https://nextjs.org/static/images/learn/navigate-between-pages/first-post.png)

이것이 Next.js에서 다른 페이지를 만드는 방법입니다.

간단하게 [`pages` 디렉토리](https://nextjs.org/docs/basic-features/pages)에 JS 파일을 만들고, 해당 파일로의 경로가 URL 경로가 됩니다.

어떤 면에서, 이 방법은 HTML과 PHP 파일을 사용해서 웹사이트를 구축하는 것과 비슷합니다. HTML을 작성하는 대신 JSX를 작성하고 React 컴포넌트를 사용합니다.

새로 추가된 페이지에 링크를 추가해 홈페이지에서 이 페이지를 탐색할 수 있게 해봅시다.

## 링크 컴포넌트

웹 사이트에서 두 페이지 사이를 연결할 때는, `<a>` HTML 태그를 사용합니다.

Next.js에서는, `Link` 컴포넌트 [next/link](https://nextjs.org/docs/api-reference/next/link)를 사용해 애플리케이션의 페이지 사이를 연결할 수 있습니다. `<Link>`를 사용하면 클라이언트 측 탐색을 수행할 수 있으며, 탐색 동작을 더 잘 제어할 수 있도록 해주는 props를 사용(accept)합니다.

### `<Link>` 사용하기

첫 번째로, `pages/index.js`를 열고, 다음의 코드를 상단에 추가해 [next/link](https://nextjs.org/docs/api-reference/next/link)에서 `Link` 컴포넌트를 불러옵니다:

```jsx
import Link from 'next/link';
```

다음으로 이렇게 생긴 `h1`를 찾습니다:

```jsx
<h1 className="title">
  Welcome to <a href="https://nextjs.org">Next.js!</a>
</h1>
```

그리고 다음과 같이 바꿉니다:

```jsx
<h1 className="title">
  Read <Link href="/posts/first-post">this page!</Link>
</h1>
```

다음으로, `open pages/posts/first-post.js`를 열어 내용을 다음과 같이 수정(replace)합니다:

```jsx
import Link from 'next/link';

export default function FirstPost() {
  return (
    <>
      <h1>First Post</h1>
      <h2>
        <Link href="/">Back to home</Link>
      </h2>
    </>
  );
}
```

보시다시피, `Link` 컴포넌트는 `<a>` 태그를 사용하는 것과 유사하지만, `<a href="…">` 댜신에, `<Link href="…">`를 사용합니다.

> Note: Next.js 12.2 이전 버전에서는 `Link` 컴포넌트를 `<a>` 태그로 감싸주어야 했지만, [12.2 이상의 버전에서는 필요하지 않습니다](https://nextjs.org/blog/next-12-2#:~:text=next/link%20no%20longer%20requires%20manually%20adding%20%3Ca%3E%20as%20a%20child.%20You%20can%20now%20opt%20into%20this%20behavior%20in%20a%20backward%2Dcompatible%20way.).

링크가 동작하는지 확인해봅시다. 이제 각 페이지에 서로 다른 페이지(back and forth)로 이동할 수 있는 링크가 있을 것입니다.

![홈페이지와 First Post 사이를 링크로 클릭해서 이동하는 움직이는 사진](https://nextjs.org/static/images/learn/navigate-between-pages/links.gif)

## 클라이언트 측 탐색

[`Link`](https://nextjs.org/docs/api-reference/next/link) 컴포넌트를 사용하면 동일한 Next.js 앱에서 두 페이지 사이의 **클라이언트 측 탐색**이 가능합니다.

클라이언트 측 탐색은 페이지 전환이 *JavaScript를 사용하여* 발생한다는 것을 의미하고, 이는 브라우저에서 수행하는 기본 탐색보다 빠릅니다.

이를 간단하게 증명할 방법이 있습니다:

* 브라우저의 개발자 도구를 사용해 `<html>`의 `background` CSS 속성을 `yellow`로 바꿉니다.
* 링크를 클릭해 두 페이지 사이를 왔다갔다 해봅니다.
* 그러면 노란 배경이 페이지 전환 사이에 유지(persist)되는 것을 확인할 수 있을 것입니다.

이는 브라우저가 페이지 전체를 불러오는 것이 *아니고* 클라이언트 측 캄색이 이뤄진다는 것을 보여줍니다.

![`background` 속성을 `yellow`로 바꾼 뒤 핑크를 클릭했을 때 페이지가 이동해도 배경색이 노란색으로 유지된다](https://nextjs.org/static/images/learn/navigate-between-pages/client-side.gif)

만약 `<Link href="…">` 대신에 `<a href="…">`를 사용한다면, 링크를 클릭했을 때 브라우저가 화면 전체를 새로고치므로 배경색이 지워질 것입니다.

### 코드 분할과 미리 가져오기(prefetching)

Next.js는 자동으로 코드 분할을 수행하므로 각 페이지는 해당 페이지에 필요한 부분만 불러옵니다. 이는 홈페이지가 렌더링될 때, 다른 페이지를 위한 코드는 처음에 제공되지 않는다는 것을 의미합니다.

이는 홈페이지가 수백 페이지로 이루어져 있더라도 홈페이지를 빠르게 불러올 수 있다는 것을 의미(ensure)합니다.

요청한 페이지의 코드만 불러오는 것은 또한 페이지가 고립되어있다는 것을 의미합니다. 특정 페이지에서 에러를 던지더라도, 애플리케이션의 나머지는 여전이 동작할 것입니다.

또한, Next.js로 만들어진 제품(production build)은 [`Link`](https://nextjs.org/docs/api-reference/next/link) 컴포넌트가 브라우저의 뷰포트에 나타날 때마다, Next.js는 백그라운드에서 링크된 페이지의 코드를 자동으로 미리 가져옵니다(prefetch). 링크를 클릭할 때 쯤에는, 대상(destination) 페이지를 위한 코드가 이미 백그라운드에 볼러져온 상태이며, 페이지 전환이 거의 즉각적으로 이뤄질 것입니다!

### 요약

Next.js는 (프로덕션에서) 코드 분할, 클라이언트 측 탐색, 미리 불러오기를 통해 당신의 애플리케이션이 최고의 성능을 낼 수 있도록 자동으로 최적화합니다.

당신은 [`pages`](https://nextjs.org/docs/basic-features/pages)에서 파일로 경로를 생성하고, 기본 [`Link`](https://nextjs.org/docs/api-reference/next/link) 컴포넌트를 사용합니다. 라우틸 라이브러리는 필요하지 않습니다.

`Link` 컴포넌트에 대한 자세한 내용은 [`next/link`에 대한 API 레퍼런스에서](https://nextjs.org/docs/api-reference/next/link), 일반적인 라우팅은 [라우팅 문서에서](https://nextjs.org/docs/routing/introduction) 배울 수 있습니다.

> Note: Next.js 앱 바깥의 *외부* 페이지로의 링크가 필요하다면, 그냥 `Link` 없이 `<a>` 태그를 사용하면 됩니다.
