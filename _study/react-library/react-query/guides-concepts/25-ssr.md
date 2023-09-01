---
layout  : article
title   : SSR
summary : 
date    : 2023-04-11 17:19:50 +0900
updated : 2023-04-16 15:50:42 +0900
tag     : 
toc     : true
public  : true
parent  : [[/react-library/react-query/guides-concepts]]
latex   : false
---
* TOC
{:toc}

> 이 글은 TanStack Query의 React Guide & Concept 문서 중 [SSR](https://tanstack.com/query/v5/docs/react/guides/ssr)의 내용을 복습하기위해 핵심 내용을 번역 정리한 글입니다.
>
> 내용을 이해하기 위한 개인적인 설명이나 해석이 있을 수 있기 때문에 되도록 원문을 참고해주시길 바랍니다.
> 잘못된 부분이 있다면 댓글이나 그 외 편하신 방법으로 알려주시면 감사하겠습니다.

React Query는 서버에서 데이터를 미리 가져와서 queryClient에 전달하는 두 가지 방법을 지원합니다.

* 데이터를 직접 미리 가져와서 `initialData`로 전달하기
    * 간단한 경우에는 이 방법을 이용해 빠르게 설정할 수 있습니다.
    * 몇 가지 주의할 점이 있습니다.
* 서버에서 쿼리를 미리 가져오고 캐시를 dehydrate한 후 클라이언트에서 다시 hydrate 합니다.
    * 프론트에 약간 더 설정을 해야 합니다.

## Next.js 사용하기 (Using Next.js)

이러한 메커니즘의 정확한 구현은 플랫폼마다 다를 수 있지만 다음 [두 가지 형태의 사전 렌더링](https://nextjs.org/docs/basic-features/data-fetching/overview)을 지원하는 Next.js로 시작해보는 것을 권장합니다:

* 정적 생성 (Static Generation, SSG)
* 서버 사이드 렌더링 (Server-side Rendering, SSR)

React Query는 사용 중인 플랫폼에 관계없이 위 두 가지 형태의 사전 렌더링을 모두 지원합니다.

> 참고: Next.js의 새로운 베타 `/app`-folder와 연결(integrate)하는 방법은 이 가이드의 아래쪽을 참고하세요.

### `initialData` 사용하기 (Using `initialData`)

Next.js의 [`getStaticProps`](https://nextjs.org/docs/basic-features/data-fetching/overview#getstaticprops-static-generation) 또는 [`getServerSideProps`](https://nextjs.org/docs/basic-features/data-fetching/overview#getserversideprops-server-side-rendering)와 함께, 두 메서드에서 가져온 데이터를 `useQuery`의 `initialData` 옵션에 전달할 수 있습니다. React Query의 관점에서 볼 때, 이들은 아래에 보이는 `getStaticProps`와 동일한 방식으로 연결됩니다:

```tsx
export async function getStaticProps() {
  const posts = await getPosts()
  return { props: { posts } }
}

function Posts(props) {
  const { data } = useQuery({
    queryKey: ['posts'],
    queryFn: getPosts,
    // SSG가 넘겨준 posts 데이터를
    // useQuery의 initialData로 설정
    initialData: props.posts,
  })

  // ...
}
```

이 방식은 최소한의 설정만을 필요로 해 일부 경우에는 빠른 해결책이 될 수 있지만, 전체 접근 방식과 비교할 때 **고려해야 할 몇 가지 단점**이 존재합니다:

* 컴포넌트 트리의 깊은 곳의 컴포넌트에서 `useQuery`를 호출하는 경우 `initialData`를 해당 지점까지 전달해야 합니다.
* 여러 위치에서 동일한 쿼리로 `useQuery`를 호출하는 경우 `initialData`를 해당하는 모든 위치에 전달해야 합니다.
* 서버에서 언제 쿼리를 가져왔는지 알 수 있는 방법이 없으므로, `dataUpdatedAt`과 쿼리를 다시 가져와야 하는지 여부는 페이지가 로드된 시점을 대안으로 기준 삼아야 합니다.

### Hydration을 사용하기 (Using Hydration)

React Query는 Next.js에서 서버의 여러 쿼리를 미리 불러온 다음 해당 쿼리를 queryClient로 *dehydrate*시키는 것을 지원합니다. 이는 서버가 페이지가 로드 되자마자 즉시 사용할 수 있는 마크업은 미리 렌더링하고, 이후 JS를 사용할 수 있게 됐을 때 React Query가 라이브러리의 전체 기능으로 해당 쿼리를 업그레이드하거나 *hydrate*할 수 있다는 것을 의미합니다. 이 과정은 쿼리가 서버에서 렌더링된 이후 오래되었을 경우 클라이언트에서 해당 쿼리를 다시 가져오는 것을 포함합니다.

서버에서 쿼리 캐싱을 지원하고 hydration을 설정하려면:

* **앱 내부 및 인스턴스 참조 (또는 React 상태)**에서 새 QueryClient 인스턴스를 생성합니다. **이렇게 하면 다른 사용자와 요청 간에 데이터가 공유되지 않고 컴포넌트 수명 주기당 QueryClient가 한 번만 생성됩니다.**
* app 컴포넌트를 `<QueryClientProvider>`로 감싸고 클라이언트 인스턴스를 전달합니다.
* app 컴포넌트를 `<HydrationBoundary>`로 감싸고 `pageProps`에서 `dehydratedState` prop을 전달합니다.

```tsx
// _app.jsx
import { HydrationBoundary, QueryClient, QueryClientProvider } from '@tanstack/react-query'

export default function MyApp({ Component, pageProps }) {
  // 새 QueryClient를 생성
  const [queryClient] = React.useState(() => new QueryClient())

  return (
    // 앱 컴포넌트를 QueryClientProvider로 감싸고
    // 클라이언트 인스턴스 전달
    <QueryClientProvider client={queryClient}>
      // 앱 컴포넌트를 HydrationBoundary로 감싸고
      // pageProps의 dehydratedState 전달
      <HydrationBoundary state={pageProps.dehydratedState}>
        <Component {...pageProps} />
      </HydrationBoundary>
    </QueryClientProvider>
  )
}
```

이제 `getStaticProps` (SSG 용) 또는 `getServerSideProps` (SSR 용)를 사용해 페이지에서 일부 데이터를 미리 가져올 준비가 되었습니다. React Query의 관점에서 볼 때, 이들은 `getStaticProps`가 아래에 내타난것과 같은 방식으로 연결됩니다.

* **각 페이지 요청에 대해** 새로운 `QueryClient` 인스턴스를 생성합니다. **이렇게 하면 사용자와 요청 간에 데이터가 공유되지 않습니다.**
* 클라이언트의 `prefetchQuery` 메서드를 사용하여 데이터를 미리 가져오고 완료될 때까지 기다립니다.
* `dehydrate`를 사용하여 쿼리 캐시를 dehydrate 하고 `dehydratedState` props을 통해 페이지에 전달합니다. 이것은 `_app.js`에서 캐시가 선택되는 것과 동일한 prop입니다.

```tsx
// pages/posts.jsx
import { dehydrate, QueryClient, useQuery } from '@tanstack/react-query'

export async function getStaticProps() {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery(['posts'], getPosts)

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  }
}

function Posts() {
  // 이 useQuery는 "Posts" 페이지의 더 깊은 하위 항목에서 발생할 수도 있으며
  // 데이터는 어느 쪽이든 즉시 사용할 수 있습니다
  const { data } = useQuery({ queryKey: ['posts'], queryFn: getPosts })

  // 이 쿼리는 서버에서 미리 가져오지 않으며
  // 클라이언트에서 두 패턴을 섞기에 충분할 때까지 가져오는 것을 시작하지 않습니다
  const { data: otherData } = useQuery({
    queryKey: ['posts-2'],
    queryFn: getPosts,
  })

  // ...
}
```

데모에서 보았듯이 일부 쿼리는 미리 가져오고 다른 쿼리는 queryClient에서 가져오도록 하는 것도 괜찮습니다. 즉, 특정 쿼리에 대해 `prefetchQuery`를 추가하거나 제거하여 콘텐츠 서버가 무엇을 렌더링하고 하지 않을지 여부를 조정할 수 있습니다.

### Next.js 재작성 시 주의 사항 (Caveat for Next.js rewrites)

[Next.js의 재작성 기능](https://nextjs.org/docs/api-reference/next.config.js/rewrites)을 [자동 정적 최적화](https://nextjs.org/docs/advanced-features/automatic-static-optimization) 또는 `getStaticProps`와 함께 사용하는 경우 한 가지 주의해야 할 점이 있습니다: React Query에 의해 두 번째 hydration이 발생한다는 것입니다.
이는 [Next.js는 확실하게 클라이언트에서 재작성을 파싱하고](https://tanstack.com/query/v5/docs/react/guides/ssr) hydration 후에는 매개변수를 모아 `router.query`로 제공할 수 있도록 해야 하기 때문입니다.

그 결과 모든 hydration 데이터에 대한 참조 동일성(refrential equality)이 누락되며, 예를 들어 데이터가 컴포넌트의 props로 사용되거나 `useEffect`/`useMemo`의 종속성 배열에서 사용되는 모든 곳에서 트리거됩니다.

## Remix 사용하기 (Using Remix)

### Using `initialData`

### Using Hydration

## Using Other Frameworks or Custom SSR Frameworks

### On the Server

### Client

## Using Experimental `app` Directory in Next.js 13

### `<QueryClientProvider>` is required by both the `initialData` and `<Hydrate>` prefetching approaches

### Using `initialData`

### Using `<Hydrate>`

### Streaming, Suspense and server-side fetching

## Custom SSR with suspense

### Client

## Tips, Tricks and Caveats

### Only successful queries are included in dehydration

### Staleness is measured from when the query was fetched on the server

### High memory consumption on server
