---
layout  : article
title   : 테스팅 (Testing)
summary : 
date    : 2023-04-17 16:27:55 +0900
updated : 2023-04-17 18:02:07 +0900
tag     : 
toc     : true
public  : true
parent  : [[/react-library/react-query]]
latex   : false
---
* TOC
{:toc}

> 이 글은 TanStack Query의 React Guide & Concept 문서 중 [Testing](https://tanstack.com/query/v4/docs/react/guides/testing)의 내용을 복습하기위해 핵심 내용을 번역 정리한 글입니다.
>
> 내용을 이해하기 위한 개인적인 설명이나 해석이 있을 수 있기 때문에 되도록 원문을 참고해주시길 바랍니다.
> 잘못된 부분이 있다면 댓글이나 그 외 편하신 방법으로 알려주시면 감사하겠습니다.

React Query는 훅-react query 자체적으로 제공하거나 이를 감싸는 커스텀 훅-을 통해 작동합니다.

React 17 이나 그 이전 버전에서는 [React Hooks Testing Library](https://react-hooks-testing-library.com) 라이브러리를 사용해서 이 커스텀 훅의 단위 테스트를 작성할 수 있었습니다.

React Hooks Testing Library를 설치하려면 다음을 실행하세요:

```bash
npm install @testing-library/react-hooks react-test-renderer --save-dev
```

(`react-test-renderer` 라이브러리는 `@testing-library/react-hooks`를 peer dependency로 필요로하며 현재 사용하는 React 버전과 일치해야 합니다.)

참고: React 18 이나 그 이후 버전을 사용한다면 `@testing-library/react` 패키지를 통해 직접 `renderHook`을 사용할 수 있으며, `@testing-library/react-hooks`는 필요하지 않습니다.

## 첫 번째 테스트 (Our First Test)

설치했다면, 간단한 테스트를 작성해볼 수 있습니다. 다음의 커스텀 훅에 대해:

```tsx
export function useCustomHook() {
  return useQuery({ queryKey: ['customHook'], queryFn: () => 'Hello' });
}
```

React 17 이나 그 이전 버전을 사용한다면 위의 훅에 대한 테스트를 다음과 같이 작성할 수 있습니다:

```tsx
const queryClient = new QueryClient();
const wrapper = ({ children }) => (
  <QueryClientProvider client={queryClient}>
    {children}
  </QueryClientProvider>
);

const { result, waitFor } = renderHook(() => useCustomHook(), { wrapper });

await waitFor(() => result.current.isSuccess);

expect(result.current.data).toEqual("Hello");
```

React 18 이나 그 이후 버전을 사용한다면, `waitFor`에 대한 시멘틱(semantic)이 바뀌었으므로 테스트를 다음과 같이 수정해주어야 합니다:

```tsx
import { renderHook, waitFor } from "@testing-library/react";

...

const { result } = renderHook(() => useCustomHook(), { wrapper });

await waitFor(() => expect(result.current.isSuccess).toBe(true));
```

`QueryClient` 와 `QueryClientProvider`를 빌드하는 커스텀 wrapper를 사용하고 있다는 것에 유의하세요. 이 wrapper는 해당 테스트가 다른 테스트로부터 완전히 분리(isolate) 될 수 있도록 해줍니다.

이 wrapper를 한 번만 작성할 수도 있지만, 그렇다면 모든 테스트 전에 `QueryClient`를 확실히 지워 테스트가 병렬로 실행되지 않도록 해야 합니다. 그렇지 않으면 한 테스트가 다른 테스트의 결과에 영향을 미치게 됩니다.

## 재시도를 막기 (Turn off retries)

라이브러리는 기본적으로 exponential backoff[^exponential-backoff]를 사용해 세 번의 재시도를 하도록 지정되어있습니다. 이는 오류가 있는 쿼리를 테스트할 때 테스트 시간이 초과될 수도 있다는 것을 의미합니다. 재시도를 하지 않도록 하는 가장 쉬운 방법은 `QueryClientProvider`를 이용하는 것입니다. 위의 예제에 다음을 추가해봅시다:

```tsx
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // ✅ turns retries off
      retry: false,
    },
  },
})
const wrapper = ({ children }) => (
  <QueryClientProvider client={queryClient}>
    {children}
  </QueryClientProvider>
);
```

위 코드는 컴포넌트 트리의 모든 쿼리에 대한 기본값을 "재시도 없음"으로 설정할 것입니다. 이 설정은 useQuery를 사용할 때 재시도 횟수를 명시하지 않는 경우에만 적용된다는 것을 알아야 합니다. 기본값은 fallback으로서 사용되므로 재시도 횟수를 5번으로 지정한 쿼리가 있다면 해당 재시도 횟수가 우선됩니다.

## 네트워크 오류 기록을 끄기 (Turn off network error logging)

테스팅을 할 때 네트워크 오류가 콘솔에 기록되는 것을 방지하고 싶을 것입니다. 이를 위해 `QueryClient`에 커스텀 logger를 전달할 수 있습니다:

```tsx
import { QueryClient } from '@tanstack/react-query'

const queryClient = new QueryClient({
  logger: {
    log: console.log,
    warn: console.warn,
    // ✅ no more errors on the console for tests
    error: process.env.NODE_ENV === 'test' ? () => {} : console.error,
  },
})
```

## Jest에서 cacheTime을 무한으로 설정하기 (Set cacheTime to Infinity with Jest)

만약 Jest를 사용한다면,`cacheTime`을 `Infinity`로 설정해 "Jest did not exit one second after the test run completed" 오류를 방지할 수 있습니다. 이는 서버의 기본 동작이며 `cacheTime`을 명시적으로 설정하는 경우에면 설정하면 됩니다.

## 네트워크 호출을 테스트하기 (Testing Network Calls)

React Query의 가장 큰 목적(primary use)은 네트워크 요청을 캐싱하는 것이므로, 우리의 코드가 올바른 네트워크 요청을 하고있는지 우선적으로 테스트해야 합니다.

네트워크 요청을 테스트하는 방법은 정말 많지만, 이 예제에서는 [nock](https://www.npmjs.com/package/nock)을 사용할 것입니다.

다음의 커스텀 훅에 대해:

```tsx
function useFetchData() {
  return useQuery({
    queryKey: ['fetchData'],
    queryFn: () => request('/api/data'),
  });
}
```

다음과 같이 테스트를 작성할 수 있습니다.

```tsx
const queryClient = new QueryClient();
const wrapper = ({ children }) => (
  <QueryClientProvider client={queryClient}>
    {children}
  </QueryClientProvider>
);

const expectation = nock('http://example.com')
  .get('/api/data')
  .reply(200, {
    answer: 42
  });

const { result, waitFor } = renderHook(() => useFetchData(), { wrapper });

await waitFor(() => {
  return result.current.isSuccess;
});

expect(result.current.data).toEqual({answer: 42});
```

여기서는 `wairFor`를 사용해서 쿼리 status가 요청이 성공했음을 나타낼 때까지 기다립니다. 이런 방법으로 우리는 우리가 작성한 훅이 완료됐으며 올바른 데이터를 갖고있다는 것을 알 수 있습니다. 참고: React 18을 사용한다면 위에서 얘기했던과 같이 `waitFor`에 대한 semantic을 바꿔주어야 합니다.

## 더보기 / 무한 스크롤을 테스트하기 (Testing Load More / Infinite Scroll)

우선 API 응답을 모킹해야 합니다.

```tsx
function generateMockedResponse(page) {
  return {
    page: page,
    items: [...]
  }
}
```

그 다음으로 응답을 페이지에 따라 구분할 수 있도록 `nock` 설정을 수정해야 하며, 이를 위해 `uri`를 사용할 것입니다. 이 예제에서 `uri` 값은 `"/?page=1`나 `/?page=2`와 같습니다.

```tsx
const expectation = nock('http://example.com')
  .persist()
  .query(true)
  .get('/api/data')
  .reply(200, (uri) => {
    const url = new URL(`http://example.com${uri}`);
    const { page } = Object.fromEntries(url.searchParams);
    return generateMockedResponse(page);
  });
```

(이 엔드포인트에서 호출을 여러번 할 것이므로 `.persist()`에 주목하세요.)

이제 우리는 안전하게 테스트를 실행할 수 있으며, 여기서 할 일(trick)은 데이터 검증(assertion)이 통과되기를 기다리는 것입니다:

```tsx
const { result, waitFor } = renderHook(
  () => useInfiniteQueryCustomHook(),
  { wrapper },
);

await waitFor(() => result.current.isSuccess);

expect(result.current.data.pages).toStrictEqual(generateMockedResponse(1));

result.current.fetchNextPage();

await waitFor(() =>
  expect(result.current.data.pages).toStrictEqual([
    ...generateMockedResponse(1),
    ...generateMockedResponse(2),
  ]),
);

expectation.done();
```

참고: React 18을 사용한다면 위에서 얘기했던과 같이 `waitFor`에 대한 semantic을 바꿔주어야 합니다.

## 더 읽어볼 것

추가적인 팁이나 `mock-service-worker`을 대신 이용한 설정을 알고싶다면 Community Resource의 [Testing React Query](https://tanstack.com/query/v4/docs/react/community/tkdodos-blog#5-testing-react-query)를 살펴보세요.

## 주석

[^exponential-backoff]: 허용 가능한 속도를 점진적으로 찾기 위해 일부 프로세스의 속도를 곱셈적으로 줄이는 알고리즘 (https://en.wikipedia.org/wiki/Exponential_backoff)
