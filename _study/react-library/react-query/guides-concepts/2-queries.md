---
layout  : article
title   : Queries
summary : 
date    : 2023-04-09 18:01:23 +0900
updated : 2023-04-09 19:02:20 +0900
tag     : draft
toc     : true
public  : true
parent  : [[/react-library/react-query/guides-concepts]]
latex   : false
---
* TOC
{:toc}

> 이 글은 TanStack Query의 React Guide & Concept 문서 중 [Queries](https://tanstack.com/query/v5/docs/react/guides/queries)의 내용을 복습하기위해 핵심 내용을 번역 정리한 글입니다.
>
> 내용을 이해하기 위한 개인적인 설명이나 해석이 있을 수 있기 때문에 되도록 원문을 참고해주시길 바랍니다.
> 잘못된 부분이 있다면 댓글이나 그 외 편하신 방법으로 알려주시면 감사하겠습니다.

## 쿼리의 기본 (Query Basics)

쿼리는 **고유한 키(key)**에 연결(tied)된 비동기 데이터 소스에 대한 선언적(declarative) 종속성(dependency)[^declarative-dependency]입니다. 쿼리는 (GET 과 POST 메서드를 포함한) 모든 Promise 기반 메서드를 함께 사용해 서버에서 데이터를 가져올 수 있습니다. 서버의 데이터를 수정하는 메소드에는 쿼리대신 [뮤테이션(Mutations)](https://tanstack.com/query/v5/docs/react/guides/mutations)을 사용하는 것이 권장됩니다.

컴포넌트 또는 custom hooks에서 쿼리를 구독(subscribe)[^subscribe]하려면 다음의 최소한의 요소를 사용하여 `useQuery` hook을 호출해야 합니다:

* **쿼리에 대한 고유(unique) 키**
* promise를 반환하는 다음과 같은 함수
    * 데이터를 반환(resolve)하거나
    * 오류를 던지는 함수

```tsx
import { useQuery } from '@tanstack/react-query'

function App() {
  const info = useQuery({ queryKey: ['todos'], queryFn: fetchTodoList })
}
```

사용자가 제공한 **고유 키**는 애플리케이션 내부적으로 애플리케이션 전체에서 쿼리를 다시 가져오고, 캐싱하고, 공유하는데 사용됩니다.

`useQuery`가 반환하는 쿼리 결과는 템플릿을 생성하거나 그외의 방법으로 데이터를 사용하기 위해 필요한 쿼리에 대한 모든 정보를 포함합니다:

```tsx
const result = useQuery({ queryKey: ['todos'], queryFn: fetchTodoList })
```

`result` 객체에는 생산성을 높이기 위해 알아야 할 몇 가지 매우 중요한 상태(state)가 포함되어 있습니다. 쿼리는 특정(given) 순간에 다음 중 하나의 상태에만 해당됩니다:

* `isPending` 또는 `status === 'pending'` - 쿼리에 아직 데이터가 없음
* `isError` 또는 `status === 'error'` - 쿼리에서 오류가 발생
* `isSuccess` 또는 `status === 'success'` - 쿼리하는 데 성공해 데이터를 사용할 수 있음

이러한 기본 상태 외에도 쿼리 상태에 따라 더 많은 정보를 사용할 수 있습니다:

* `error` - 쿼리가 `isError` 상태인 경우 `error` 속성을 통해 오류 정보를 사용할 수 있습니다.
* `data` - 쿼리가 `isSuccess` 상태인 경우 `data` 속성을 통해 데이터 정보를 사용할 수 있습니다.

**대부분**의 쿼리는 일반적으로 `isPending` 상태를 확인하고, `isError` 상태를 확인하고 나면, 마지막으로 데이터를 사용할 수 있다고 가정해 성공상태를 렌더링하면 됩니다:

```tsx
function Todos() {
  const { isPending, isError, data, error } = useQuery({
    queryKey: ['todos'],
    queryFn: fetchTodoList,
  })

  // isPending 상태를 확인하고
  if (isPending) {
    return <span>Loading...</span>
  }

  // isError 상태를 확인하면
  if (isError) {
    return <span>Error: {error.message}</span>
  }

  // 이 지점에서는 `isSuccess === true`라는 것을 가정할 수 있다
  return (
    <ul>
      {data.map((todo) => (
        <li key={todo.id}>{todo.title}</li>
      ))}
    </ul>
  )
}
```

부울(e.g, `isError`, `isPending`)값을 사용하는 것이 마음에 들지 않는다면 언제든지 `status` 상태를 사용할 수도 있습니다:

```tsx
function Todos() {
  const { status, data, error } = useQuery({
    queryKey: ['todos'],
    queryFn: fetchTodoList,
  })

  if (status === 'pending') {
    return <span>Loading...</span>
  }

  if (status === 'error') {
    return <span>Error: {error.message}</span>
  }

  // 위처럼 status === 'success'인 상태이지만 "else" 로직을 사용해도 된다
  return (
    <ul>
      {data.map((todo) => (
        <li key={todo.id}>{todo.title}</li>
      ))}
    </ul>
  )
}
```

데이터에 액세스하기 전에 `pending`과 `error`를 확인했다면 TypeScript는 `data`의 타입을 올바르게 좁힐 것입니다.

## 가져오기 상태 (FetchStatus)

`status` 필드, `result` 객체 외에도 다음과 같은 옵션이 있는 `fetchStatus` 속성을 추가로 얻을 수 있습니다:

* `fetchStatus === 'fetching'` - 현재 쿼리를 불러오는 중입니다.
* `fetchStatus === 'paused'` - 쿼리를 가져오려고 했지만 일시 중지되었습니다. 이에 대한 자세한 내용은 [네트워크 모드 (Network Mode)](https://tanstack.com/query/v5/docs/react/guides/network-mode) 가이드를 참고하세요.
* `fetchStatus === 'idle'` - 쿼리가 현재 아무 작업도 수행하지 않습니다.

## 왜 두 개의 다른 상태를 사용하나요? (Why two different states?)

백그라운드에서 데이터를 다시 가져오고(refetches) 유효성 검사 중 오래된 값을 사용하는(stale-while-revalidate) 로직을 사용하면 `status`와 `fetchStatus`에 대한 모든 조합이 가능합니다. 예를 들어

* `success` 상태의 쿼리는 일반적으로 `idle` fetchStatus에 있지만, 백그라운드에서 데이터를 다시 가져오고 있는 경우에는 `fetching` 중일 수도 있습니다.
* 쿼리가 마운트되고 데이터가 없는 경우는 일반적으로 `pending` 상태이며 `fetching` fetchStatus를 갖지만, 네트워크 연결이 없는 경우 `paused` 상태일 수도 있습니다.

따라서 쿼리는 실제로 데이터를 가져오지 않고도 `pending` 상태에 있을 수도 있다는 것을 명심하세요. 경험상:

* `status`는 `data`에 대한 정보를 제공합니다: 데이터가 있습니까, 없습니까?
* `fetchStatus`는 `queryFn`에 대한 정보를 제공합니다: 실행 중입니까, 아닙니까?

## 읽을거리 (Further Reading)

상태 확인을 수행하기 위한 다른 방법은 [커뮤니티 리소스(Community Resources)](https://tanstack.com/query/v5/docs/react/community/tkdodos-blog#4-status-checks-in-react-query)를 참고하세요.

## 주석

[^declarative-dependency]: TODO
[^subscribe]: TODO
