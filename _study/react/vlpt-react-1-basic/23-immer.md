---
layout  : article
title   : 23. Immer 를 사용한 더 쉬운 불변성 관리
summary : 
date    : 2021-03-28 16:41:24 +0900
updated : 2021-03-29 00:22:53 +0900
tag     : draft
toc     : true
public  : true
parent  : [[/react/vlpt-react-1-basic]]
latex   : false
---
* TOC
{:toc}

> 이 글은 벨로퍼트와 함께하는 모던 React중 [23. Immer 를 사용한 더 쉬운 불변성 관리](https://react.vlpt.us/basic/23-immer.html)의 내용을 복습하기위해 핵심 내용을 요약 정리한 글입니다.
>
> * 제가 필요한 부분 위주로 확인하면서 정리하고 있어 글에 덜 작성된 부분이 있을 수 있습니다.
> * 글 작성 후 원문의 내용이 수정되거나 내용을 이해하기 위한 개인적인 설명이나 해석이 있을 수 있습니다. 되도록 원문을 참고해주시길 바랍니다.
> * 잘못된 부분이 있다면 댓글이나 그 외 편하신 방법으로 알려주시면 감사하겠습니다.

리액트에서 배열이나 객체를 업데이트 해야 할 때는 불변성을 지켜주면서 업데이트를 해주어야 한다.

예를 들어 다음과 같이 객체를 직접 수정하면 안되고

```js
// 기존의 객체
const object = {
  a: 1,
  b: 2
};

// object의 b에 직접 3을 대입.
object.b = 3;
```

다음과 같이 ... 연산자를 사용해 새로운 객체를 만들어야 한다.

```js
const object = {
  a: 1,
  b: 2
};

const nextObject = {
  // object 객체를 복사한 뒤
  ...object,
  // b의 값을 3으로 바꾼 '새로운' 객체를 생성
  b: 3
};
```

배열도 마찬가지로, `push`, `splice` 등의 함수를 사용하거나 n번째 항목을 직접 수정하면 안되고, `concat`, `filter`, `map` 등의 함수를 사용해야 한다.

```js
// 기존의 배열
const todos = [
  {
    id: 1,
    text: '할 일 #1',
    done: true
  },
  {
    id: 2
    text: '할 일 #2',
    done: false
  }
];

// concat 으로 기존 배열에서 새로운 객체를 추가한 '새로운' 배열을 생성
const inserted = todos.concat({
  id: 3,
  text: '할 일 #3',
  done: false
});

// filter 로 기존 배열에서 특정 객체를 걸러낸 '새로운' 배열을 생성
const filtered = todos.filter(todo => todo.id !== 2);

// map 으로 기존 배열의 값을 변경한 '새로운' 배열을 생성
const toggled = todos.map(
  todo => todo.id === 2
    ? {
      ...todo,
      done: !todo.done,
    }
    : todo
);
```

대부분의 경우 ... 연산자 또는 배열 내장함수를 사용하는건 어렵지 않지만 데이터의 구조가 까다로워지면 불변성을 지켜가면서 새로운 데이터를 생성해내는 코드가 조금 복잡해진다.

예를 들어 다음과 같은 객체가 있을 때

```js
const state = {
  posts: [
    {
      id: 1,
      title: '제목입니다.',
      body: '내용입니다.',
      comments: [
        {
          id: 1,
          text: '와 정말 잘 읽었습니다.'
        }
      ]
    },
    {
      id: 2,
      title: '제목입니다.',
      body: '내용입니다.',
      comments: [
        {
          id: 2,
          text: '또 다른 댓글 어쩌고 저쩌고'
        }
      ]
    }
  ],
  selectedId: 1
};
```

`posts` 배열 안의 id 가 1 인 `post` 객체를 찾아서, `comments` 에 새로운 댓글 객체를 추가해줘야 한다고 가정해보자.

그렇다면, 업데이트는 다음과 같이 해야한다.

```js
const nextState = {
  ...state,
  posts: state.posts.map(post =>
    post.id === 1
      ? {
          ...post,
          comments: post.comments.concat({
            id: 3,
            text: '새로운 댓글'
          })
        }
      : post
  )
};
```

구현 자체가 어려운 것은 아니지만 코드의 구조가 복잡해져 코드를 한 눈에 파악하기 어렵다.

이럴 때, immer 라는 라이브러리를 사용하면 코드를 더 깔끔하게 구현 할 수 있다.

```js
const nextState = produce(state, draft => {
  const post = draft.posts.find(post => post.id === 1);
  post.comments.push({
    id: 3,
    text: '와 정말 쉽다!'
  });
});
```

Immer 를 사용하면 상태를 업데이트 할 때, 불변성을 신경쓰지 않고 업데이트를 해도 Immer 가 불변성 관리를 대신 해준다.

## Immer 사용법

이번 섹션에서는 기존에 만들었던 사용자 관리 프로젝트에 Immer 를 적용해보면서 Immer 의 사용법을 알아보자.

우선 프로젝트에서 다음 명령어를 실행하여 Immer 를 설치한다.

```shell
yarn add immer
```

Immer 를 사용하기 위해서는 먼저 코드의 상단에서 immer 를 불러와야 한다. 보통 `produce` 라는 이름으로 불러온다.

```js
import produce from 'immer';
```

`produce` 함수를 사용 할 때에는

* 첫번째 파라미터에는 수정하고 싶은 상태,
* 두번째 파라미터에는 상태를 어떻게 업데이트할지 정의하는 함수를 넣어준다.
    * 이 함수에서는 불변성을 고려하지 않은채 상태를 업데이트 하는 것이 가능하다.

```js
const state = {
  number: 1,
  dontChangeMe: 2
};

const nextState = produce(state, draft => {
  // 불변성을 고려하지 않고 number state를 수정
  draft.number += 1;
});

console.log(nextState);
// { number: 2, dontChangeMe: 2 }
```

## Reducer에서 Immer 사용하기

사용하기에 앞서, Immer 를 사용해서 업데이트 코드가 간단해지도 하지만 오히려 코드가 길어지기도 한다.

예를 들어 지금까지 만들었던 프로젝트의 상태는 `users` 배열이 객체의 깊은곳에 위치하지 않기 때문에 새 항목을 추가하거나 제거 할 때 Immer 보다 `concat` 과 `filter` 를 사용하는것이 더 간결하고 편하다.

하지만, 사용법을 배우기 위해 우선 모든 업데이트를 Immer 를 사용하여 처리해보자.

```jsx
/* App.js */

//...
// immer 에서 produce를 import
import produce from 'immer';

function countActiveUsers(users) { /* ... */ }

const initialState = { /* ... */ };

function reducer(state, action) {
  switch (action.type) {
    case 'CREATE_USER':
      return produce(state, draft => {
        // concat 대신 push 사용
        draft.users.push(action.user);
      });
    case 'TOGGLE_USER':
      return produce(state, draft => {
        const user = draft.users.find(user => user.id === action.id);
        // user의 active 상태를 직접 수정
        user.active = !user.active;
      });
    case 'REMOVE_USER':
      return produce(state, draft => {
        const index = draft.users.findIndex(user => user.id === action.id);
        // filter 대신 splice 사용
        draft.users.splice(index, 1);
      });
    default:
      return state;
  }
}

export const UserDispatch = React.createContext(null);

function App() {
  
  // ...

  return ( /* ... */ );
}

export default App;
```

`TOGGLE_USER` 액션은 확실히 코드가 깔끔해졌지만 나머지의 경우에는 오히려 코드가 좀 복잡해진 것을 볼 수 있다. Immer 를 사용한다고 해서 모든 업데이트 로직에서 사용을 하실 필요는 없고 상황에 따라 잘 선택하여 사용면 된다.

## Immer 와 함수형 업데이트

이전에 `useState` 를 사용 할 때 함수형 업데이트를 배웠다.

예를 들면, `setTodo` 의 파라미터로 상태를 업데이트를 해주는 '함수'를 넣어서, `useCallback` 을 사용하는 경우 두번째 파라미터인 `deps` 배열에 `todo` 를 넣지 않아도 되게 된다.

```jsx
const [todo, setTodo] = useState({
  text: 'Hello',
  done: false
});

const onClick = useCallback(() => {
  setTodo(todo => ({
    ...todo,
    done: !todo.done
  }));
}, []);
```

이렇게 함수형 업데이트를 하는 경우에, Immer 를 사용하면 상황에 따라 더 편하게 코드를 작성 할 수 있다.

`produce` 함수에

* 두 개의 파라미터를 넣어주면 첫번째 파라미터에 넣은 상태를 불변성을 유지하면서 새로운 상태를 만들어주지만
* 첫 번째 파라미터를 생략하고 바로 업데이트 함수를 넣어주면, 반환 값은 상태를 업데이트 해주는 '함수'가 된다.

코드를 보면 조금 더 쉽게 이해할 수 있다.

```jsx
const todo = {
  text: 'Hello',
  done: false
};

// updater: 상태를 업데이트 해주는 함수
const updater = produce(draft => {
  draft.done = !draft.done;
});

// todo를 인자로 전달해서 todo의 done을 업데이트
const nextTodo = updater(todo);

console.log(nextTodo);
// { text: 'Hello', done: true }
```

`produce` 가 '업데이트 함수'를 반환하기 때문에 `useState` 의 업데이트 함수를 다음과 같이 구현 할 수 있다.

```jsx
const [todo, setTodo] = useState({
  text: 'Hello',
  done: false
});

const onClick = useCallback(() => {
  setTodo(
    produce(draft => {
      draft.done = !draft.done;
    })
  );
}, []);
```

Immer 은 분명히 편한 라이브러리 이지만 확실히 알아둘 점은, 성능적으로는 Immer 를 사용하지 않은 코드가 더 빠르다는 점 이다.

50,000개의 원소중에서 5,000 개의 원소를 업데이트 하는 코드를 비교 했을때

* Immer 의 경우 31ms 걸리는 작업이 (map 을 사용하는) Native Reducer 에서는 6ms 걸린다.
* 25ms 의 차이는, 사실 그렇게 큰 차이가 아니기 때문에 걱정할 필요는 없다. 심지어, 데이터가 50,000개 가량 있는게 아니라면 성능 차이는 거의 없을 것이기 때문에 더더욱 걱정하지 않아도 된다.
* 단, Immer 는 JavaScript 엔진의 Proxy 라는 기능을 사용하는데 이를 지원하지 않는 구형 브라우저 및 react-native 같은 환경에서는 ES5 fallback 이라는 대안을 사용하기 때문에 191ms 정도로 꽤나 느려지게 된다. 물론, 데이터가 별로 없다면 여전히 크게 걱정 할 필요는 없다.

Immer 라이브러리는 확실히 편하기 때문에, 데이터의 구조가 복잡해지고 불변성을 유지하기위한 코드가 복잡해지는 상황이 온다면, 이를 사용하는 것이 좋다.

* 다만, 무조건 사용하는 것보다 우선 가능하면 데이터의 구조가 복잡해지게 되는 것을 방지하고
* 어쩔 수 없을 때 '필요한 곳'에만 Immer 를 사용하되
* 간단히 처리 될 수 있는 곳에서는 그냥 일반 JavaScript 로 구현하는 것을 권장한다.
