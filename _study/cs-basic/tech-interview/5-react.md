---
layout  : article
title   : 취준생을 위한 React 기초지식
summary : 면접을 위해 작성해보는 React 기초지식 질문 및 답변 모음
date    : 2023-09-01 18:35:33 +0900
updated : 2023-10-06 11:55:25 +0900
tag     : draft
toc     : true
public  : true
parent  : [[/cs-basic/tech-interview]]
latex   : false
---
* TOC
{:toc}

## React 기본

### React에 대해 설명해주세요

* React는 사용자 인터페이스를 구축하기 위한 자바스크립트 라이브러리입니다.
* 참고: [React](https://react.dev) (React 랜딩 페이지의 설명)

> 아래의 원리 및 특징 간단하게 요약해서 추가하기

### React의 원리, 특징, 장단점이 무엇인가요?

### Virtual DOM 이 무엇인지 설명해주세요

### Virtual DOM 작동 원리에 대해 설명해주세요

### React 18 버전 업데이트 내용에 대해 말씀해주세요

## React 컴포넌트

### JSX에 대해 설명해주세요

### 엘리먼트와 컴포넌트의 차이에 대해 설명해주세요

### 리액트에서 컴포넌트를 어떻게 생성하나요?

## 리스트와 key

### ⭐ Key Props를 사용하는 이유에 대해 설명해주세요

## React Form

### 제어 컴포넌트와 비제어 컴포넌트의 차이에 대해 설명해주세요

### React에서 Form 이벤트는 어떻게 제어하셨나요?

### React Hook Form 를 사용해보셨나요?

## 상태

### ✅ State에 대해 설명해주세요

* 컴포넌트는 상호 작용의 결과로 화면의 내용을 변경해야 하는 경우가 많습니다. State는 이를 위한 React의 컴포넌트 별 메모리로 볼 수 있습니다. 컴포넌트가 렌더링 사이에 어떤 값을 "기억"해야할 때 state를 사용합니다.
    * 예를 들어 폼의 입력 창에 값을 작성했을 때 입력 필드를 업데이트 하기 위해 state를 사용할 수 있습니다.
* 함수형 컴포넌트에서는 `useState` hook을, 클래스형 컴포넌트에서는 `setState`를 사용해 state를 관리할 수 있습니다.
* 참고: [State: A Component's Memory](https://react.dev/learn/state-a-components-memory) (React.dev)

### ✅ Props에 대해 설명해주세요

* Props는 React의 컴포넌트가 서로 통신하기 위한 수단입니다. 모든 부모 컴포넌트는 자식 컴포넌트에 props를 전달하여 일부 정보를 전달할 수 있습니다.
* Props가 컴포넌트 사이에 전달될 때 props는 수정할 수는 없으며 immutable 합니다.
* 참고: [Passing Props to a Component](https://react.dev/learn/passing-props-to-a-component) (React.dev)

#### 데이터를 자식에서 부모로도 전달할 수 있나요?

### Props와 State의 차이에 대해 설명해주세요

* props 와 state는 모두 일반 JavaScript 객체입니다. 두 객체 모두 렌더링 결과물에 영향을 주는 정보를 갖고 있는데 props는 (함수 매개변수처럼) 컴포넌트에 전달되는 반면 state는 (함수 내에 선언된 변수처럼) 컴포넌트 안에서 관리됩니다.
* 참고: [state와 props의 차이점은 무엇인가요?](https://ko.legacy.reactjs.org/docs/faq-state.html#what-is-the-difference-between-state-and-props) (React Legacy Docs), [props vs state](https://github.com/uberVU/react-guide/blob/master/props-vs-state.md) (uberVU/react-guide), [ReactJS: Props vs. State](https://lucybain.com/blog/2016/react-state-vs-pros/) (luckybain)

> 참고글이 대부분 꽤나 전에 작성된 글이다.

### ✅ Props Drilling과 해결방법에 대해 설명해주세요

* 일부 props를 컴포넌트 트리 깊숙이 전달해야 하거나 여러 컴포넌트에 동일한 props가 필요한 경우에 가장 가까운 공통 조상 컴포넌트가 데이터가 필요한 컴포넌트에서 멀리 떨어져 있을 수 있습니다. 이를 위해 상태를 높이 올렸을 때 props 전달이 장황하고 불편해질 수 있습니다. 이를 Props Drilling이라고 합니다.
* React의 Context API나 전역 상태를 관리할 수 있는 외부 라이브러리를 사용해 상위 컴포넌트가 그 아래 트리 전체에 데이터를 제공하도록 할 수 있습니다.
* 참고: [Passing Data Deeply with Context](https://react.dev/learn/passing-data-deeply-with-context) (React.dev)

### Context API에 대해 설명해주세요

### React에서 State를 어떻게 관리하나요?

### React 에서 상태 변화가 생겼을 때, 변화를 어떻게 알아채는지에 대해 설명해주세요

### 왜 state를 직접 바꾸지 않고 setState(useState)를 사용해야 하나요?

> React에서 State의 불변성은 어떻게 유지할 수 있나요?

### setState는 동기적으로 동작하나요? 아니면 비동기적으로 동작하나요?

## 함수형 컴포넌트와 클래스형 컴포넌트

### 클래스형 컴포넌트를 사용해보셨나요?

### 클래스형 컴포넌트와 함수형 컴포넌트의 차이에 대해 설명해주세요

* Props Drilling
* Props Capturing

### ⭐ 라이프사이클에 대해 설명해주세요

### ✅ 생명주기(Lifecycle) 메소드에 대해 설명해주세요 (⭐)

* 컴포넌트는 브라우저상에 나타나고(마운트), 업데이트 되고, 사라질 때 (언마운트) 실행되는 여러 종류의 “생명주기 메소드”를 가집니다. 이 메서드를 오버라이딩하여 특정 시점에 코드가 실행되도록 설정할 수 있습니다.
* 대표적인 라이프 사이클 메소드는 다음과 같습니다.
    * `constructor()`: React 컴포넌트의 생성자로 해당 컴포넌트가 마운트되기 전에 호출됩니다. 주로 다음의 두 목적을 위해 사용합니다.
        * `this.state`에 객체를 할당하여 지역 state를 초기화
        * 인스턴스에 이벤트 처리 메소드를 바인딩

        ```js
        constructor(props) {
          super(props);
          // 여기서 this.setState()를 호출하면 안 됩니다!
          this.state = { counter: 0 };
          this.handleClick = this.handleClick.bind(this);
        }
        ```

    * `render()`: props와 state값을 활용해 다양한 값을 반환합니다. 실질적으로 컴포넌트의 가상 DOM을 반환하는 메소드로 클래스형 컴포넌트에서 반드시 구현해야 하는 유일한 메서드입니다.
    * `componentDidMount`: 컴포넌트의 첫번째 렌더링을 마치고 컴포넌트가 화면에 나타났을 때 호출되는 메소드로 DOM을 사용하거나 조작하는 동작들을 주로 수행합니다.
    * `shouldComponentUpdate`: 컴포넌트의 리렌더링 여부를 결정하는 메소드로 주로 최적화 할 때 사용합니다.
    * `componentDidUpdate` : 리렌더링을 마치고 화면에 변화가 모두 반영됐을 때 호출되는 메소드.
    * `componentWillUnmount` : 컴포넌트가 화면에서 사라지기 직전에 호출되는 메소드. 주로 DOM에 등록했던 이벤트를 제거하는 등의 동작을 수행합니다.
* 참고: [컴포넌트 생명주기](https://ko.legacy.reactjs.org/docs/react-component.html#the-component-lifecycle) (React Legacy Docs), [25. LifeCycle Method](https://react.vlpt.us/basic/25-lifecycle.html) (벨로퍼트와 함께하는 모던 리액트), [[React] 컴포넌트 라이프사이클 및 메서드](https://chanhuiseok.github.io/posts/react-9/) (ChanBLOG)

### ✅ shouldComponentUpdate에 대해 설명해주세요

* `shouldComponentUpdate()`는 props 또는 state가 새로운 값으로 갱신되어서 렌더링이 발생하기 직전에 호출됩니다. 기본적으로 `true`를 반환하는데 `false`를 반환하면 리렌더링이 일어나지 않습니다. 즉 `render()`와 `componentDidUpdate()`가 호출되지 않습니다.
* 참고: [shouldComponentUpdate](https://react.dev/reference/react/Component#shouldcomponentupdate) (React.dev), [[React] Pure Component란?](https://velog.io/@dolarge/Pure-Component란) (dolarge)

### ✅ Pure Component에 대해 설명해주세요

* `PureComponent`는 `Component`와 비슷하지만 동일한 props와 state에 대해 리렌더링을 하지 않아 불필요한 리렌더링을 줄일 수 있습니다.
* `PureComponent`는 `Component`의 sub class로 내부에 props와 state를 얕게 비교하는 커스텀 `shouldComponentUpdate` 메소드가 정의되어있는 것과 같습니다. 현재의 props, state와 새로운 props, state를 얕게 비교해서 변경된 것이 있을 때는 `shouldComponentUpdate`가 `true`를 없을 때는 `false`를 반환합니다.
* 참고: [PureComponent](https://react.dev/reference/react/PureComponent#purecomponent) (React.dev), [[React] Pure Component란?](https://velog.io/@dolarge/Pure-Component란) (dolarge)

### ✅ 함수형 컴포넌트의 장점에 대해 설명해주세요

> React Hooks의 장점과 헷갈리지 않아야 한다.

* 함수형 컴포넌트는 props를 인자로 받아 React 엘리먼트를 반환하는 일반적인 JavaScript 함수이므로 `React.Component`를 extend해 React 엘리먼트를 반환하는 `render` 함수를 작성해야하는 클래스형 컴포넌트보다 간단하고 직관적으로 작성할 수 있습니다.
* 함수형 컴포넌트는 state를 포함하지 않습니다. 어떤 방식으로든 조작되는 state가 없으므로 코드를 더 쉽게 읽고 이해할 수 있습니다.
* 기존의 클래스형 컴포넌트에서는 호출하는 시점에 따라 업데이트 된 값을 받아올 수 있도록 `this`를 사용합니다. 하지만 `this`는 mutable하며 이는 상황에 따라서는 예상치 못한 결과로 이어질 수 있습니다. 반면 함수형 컴포넌트에서 사용하는 `props`는 인자로 전달되므로 immutable 하고 렌더링 결과를 보장할 수 있습니다.
* 참고: [Functional vs Class-Components in React](https://djoech.medium.com/functional-vs-class-components-in-react-231e3fbd7108) (David Jöch), [3 advantages of React functional components on an ecommerce site](https://blog.logrocket.com/react-functional-components-3-advantages-and-why-you-should-use-them-a570c83adb5e/) (Sunil Sandhu @LogRocket)
* 추가자료: [함수형 컴포넌트와 클래스, 어떤 차이가 존재할까?](https://overreacted.io/ko/how-are-function-components-different-from-classes/) (overreacted), [왜 함수형 컴포넌트(Functional Component)를 사용하는가](https://velog.io/@dianaleee_/왜-함수형-컴포넌트Functional-Component를-사용하는가) (dianaleee_)

## React Hooks

### ✅ React Hooks에 대해 설명해주세요 (⭐)

* React Hooks은 클래스형 컴포넌트를 작성하지 않고 React의 다양한 기능을 사용할 수 있도록 하는 API입니다. 대표적으로 `useState`를 이용해 함수형 컴포넌트에서도 state를 사용하거나 `useEffect`를 사용해 생명주기 메소드와 유사한 동작을 구현할 수 있습니다.
* React Hooks을 사용하면 다음과 같은 기존의 문제들을 개선할 수 있습니다.
    * 클래스형 컴포넌트에서는 컴포넌트 사이에서 상태 로직을 재사용하기 어려웠습니다. Hook을 사용하면 컴포넌트에서 상태 관련 로직을 추상화할 수 있습니다. 즉 Hook은 계층의 변화 없이 상태 관련 로직을 재사용할 수 있도록 돕습니다.
    * 각 생명주기 메소드에는 관련 없는 로직이 자주 섞여들어가 컴포넌트를 작게 분리하거나 테스트하기 어려웠습니다. Hook을 통해 서로 비슷한 것을 하는 작은 함수의 묶음으로 컴포넌트를 나눌 수 있습니다.
    * 클래스형 컴포넌트를 사용하기 위해서는 JavaScript의 `this` 키워드가 어떻게 작동하는 지 알아야 하고 `this`는 사용자의 혼란을 쉽게 야기했습니다. 또한 클래스를 사용하기 위해서는 이벤트 핸들러가 등록되는 방법을 정확히 파악해야 하고 이 때문에 코드가 장황해지기 쉬웠습니다. 그래서 Hook을 통해 클래스 없이 React의 기능을 사용할 수 있도록 했습니다.
* 몇 가지 사용 규칙이 있습니다.
    * 최상위에서만 호출해야 합니다. 반복문, 조건문, 중첩된 함수 내에서 실행하면 안된다.
    * 함수 컴포넌트 내에서만 Hook을 호출해야 합니다.
* 참고: [Built-in React Hooks](https://react.dev/reference/react) (React.dev), [Hook의 개요_동기](https://ko.legacy.reactjs.org/docs/hooks-intro.html#motivation) (React Legacy Docs)

### 기억나는 Hook의 종류를 설명해주세요

> 현재 공식문서 보고 재정리

* `useState`: 상태를 저장 할 때 사용, 값이 변경되면 리 렌더링이 일어남.
    * 현재의 stats 값과 이 값을 업데이트 하는 함수를 제공한다.
    * 인자로 초기 state 값을 전달 받는다.
    * 값을 업데이트 하는 함수에는 값 대신 업데이트 하는 함수를 파라미터로 넣어줄 수도 있다.
    * 객체와 같이 여러 값을 포함하는 값을 수정해야 할 때는 해당 멤버를 직접 수정하면 안 된다. 불변성을 지켜 업데이트 해야만 업데이트를 최신 상태로 유지할 수 있다. 주로 spread 문법을 사용해서 새 객체를 생성한 뒤 이를 수정한다.
* `useReducer`: reducer pattern을 사용하는 useState.
    * reducer는 현재 상태와 액션 객체를 인자로 받아와 새로운 상태로 반환해준다.
* `useRef`: 상태을 저장 할 때 사용, 값이 변경됐을 때 리렌더링이 일어나지않음.
    * 조작이 필요한 DOM을 직접 선택할 수 있다.
    * 값이 변경됐을 떄 리렌더링이 일어나지 않기 때문에 컴포넌트 안에서 조회와 수정할 수 있는 변수를 만들어 관리할 수 있다.
* `useEffect`: 사이드 이펙트들을 핸들링 할 때 사용
    * 컴포넌트 안에서 데이터를 가져오거나 DOM을 조작하는 작업 등이 이에 해당한다 (마운트, 언마운트, 특정 값의(deps) 업데이트)
    * 브라우저에 React DOM이 페인팅 된 뒤 비동기적으로 `useEffect`의 콜백함수가 실행됨
    * class 컴포넌트에서 `componentDidMount`나 `componentDidUpdate`에 들어갔던 로직들
* `useLayoutEffect`: useEffect와 거의 동일하지만 React DOM이 변경 된 뒤 "동기적"으로 실행
    * 실제 브라우저에 "페인팅 하기 전" 동기적으로 호출되기 때문에 헤비한 작업을 할 경우 일정 시간 렌더 블로킹이 발생함
    * DOM을 측정하거나 수정해야 할 때 `useEffect` 대신 사용
* `useMemo`: 의존성 배열 안 요소들의 값이 바뀌기 전까진 동일한 reference의 return value를 반환함.
    * 다른 값에 의해 리렌더링 됐을 때 해당 연산이 불필요하게 수행되는 것을 방지한다.
* `useCallback`: 의존성 배열 안 요소들의 값이 바뀌기 전까진 동일한 reference의 함수를 반환함
    * 함수들은 컴포넌트가 리렌더링 될 때마다 새로 만들어진다. 이런 과정이 불필요하게 일어나는 것을 방지
* `useContext`: 인자로 받은 context객체의 현재 값을 반환함.

### ✅ 함수형 컴포넌트에서 클래스형 컴포넌트의 라이프 사이클 메소드를 비슷하게 사용하는 방법에 대해 설명해주세요. (⭐)

* Effect Hooks를 사용합니다. Effect를 사용하면 특정 이벤트가 아닌 렌더링 자체로 인해 발생하는 side-effect를 지정할 수 있습니다. 대표적으로 `useEffect`, `useLayoutEffect` 등이 있습니다.
* Effect는 화면이 업데이트된 후 commit이 끝날 때 실행되며 이는 `componentDidMount`와 `componentDidUpdate`가 실행되는 시점과 동일합니다. Effect는 마운트 시점과 업데이트 시점을 구분하지 않는다는 점에서 코드의 중복을 방지할 수도 있습니다.
* 또한 Effect hooks 내부에서 반환하는 cleanup 함수를 작성하면 컴포넌트가 DOM에서 제거된 후 해당 로직을 실행하며 이는 `componentWillUnmount`가 실행되는 시점과 같습니다.
    * Cleanup 함수는 리렌더링이 될 때마다 설정 함수를 실행하기 직전에도 실행됩니다.
* 참고: [Effect Hooks](https://react.dev/reference/react#effect-hooks) (React.dev), [Synchronizing with Effects](https://react.dev/learn/synchronizing-with-effects) (React.dev), [Using the Effect Hook](https://ko.legacy.reactjs.org/docs/hooks-effect.html) (React Legacy Docs)

### ✅ useEffect와 useLayoutEffect의 차이점에 대해 설명해주세요

* `useEffect`는 렌더링으로 인해 발생하는 side-effect를 다룰 때 사용하는 hooks 입니다. 브라우저에 React DOM이 페인팅 된 뒤 비동기적으로 `useEffect`의 콜백함수가 실행됩니다.
* `useLayoutEffect`는 useEffect와 거의 동일하지만 브라우저가 스크린을 repaint 하기 전에 실행됩니다.
    * 주로 DOM을 측정하거나 수정해야 할 때 `useEffect` 대신 사용합니다.
    * 다만 동기적으로 호출되기 때문에 무거운 작업을 할 경우 일정 시간 렌더 블로킹이 발생할 수 있어 되도록 `useEffect`를 사용하는 것이 권장됩니다.
* 참고: [Effect Hooks](https://react.dev/reference/react#effect-hooks) (React.dev), [useLayoutEffect](https://react.dev/reference/react/useLayoutEffect) (React.dev)

### Ref의 용도에 대해 설명해주세요

## 성능 최적화

### 메모이제이션에 대해 설명해주세요

### ⭐ 리액트에서 메모이제이션을 어떤 방식으로 활용할 수 있나요?

### ⭐ useMemo와 useCallback에 대해 설명해주세요

### React.memo와 useMemo의 차이에 대해 설명해주세요

### 리액트의 렌더링 성능 향상을 위해 어떻게 해야 하나요?

---

### HTML과 React의 이벤트 처리 차이점에 대해 설명해주세요

### HOC (Higher-Order Components)에 대해 설명해주세요

### React.Fragment에 대해 설명해주세요

### Portal에 대해 설명해주세요

### 에러 바운더리에 대해 설명해주세요

### React에서 컴포넌트 A가 사용하는 CSS파일과 컴포넌트 B가 사용하는 CSS파일의 선택자가 겹치는 이유가 뭘까요?

> 컴포넌트 A와 컴포넌트 B에서 동일한 이름의 선택자를 사용할 수 있는 이유에 대해서 묻는 것 같습니다.

* CSS module로 작성한 스타일은 실제 DOM에 로드할때 `.{컴포넌트 이름}_{클래스 이름}__{해시}` 형식으로 고유한 클래스 이름이 부여됩니다. 이 특성을 이용하면 각 컴포넌트에 해당하는 .module.css 파일을 만들어 기술 이름 그대로 CSS를 모듈화 할 수 있습니다. 그러므로 이름 중복에 대한 걱정 없이 `.button`, `.title`처럼 좀 더 일반적인 클래스 이름을 지을 수 있습니다.
* [리액트 컴포넌트에 CSS 적용하기 - 많이 사용하는 4가지 기술 정리](https://www.couchcoding.kr/blogs/couchcoding/리액트%20컴포넌트에%20CSS%20적용하기%20-%20많이%20사용하는%204가지%20기술%20%10정리), [02. CSS Module](https://react.vlpt.us/styling/02-css-module.html)
