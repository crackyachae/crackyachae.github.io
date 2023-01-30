---
layout  : article
title   : 리액트 테스트
summary : 
date    : 2023-01-27 12:09:14 +0900
updated : 2023-01-27 17:16:25 +0900
tag     : draft
toc     : true
public  : true
parent  : [[/react]]
latex   : false
---
* TOC
{:toc}

## 테스트 기본

> * [[Testing] 0. React Testing 시리즈를 들어가며](https://jbee.io/react/testing-0-react-testing-intro/) by JBEE.io
>     * 테스트 정의 및 종류, 방법 전체를 다루는 글 시리즈
> * [벨로퍼트와 함께하는 리액트 테스팅](https://learn-react-test.vlpt.us/#/) by velopert
>     * 기초 개념부터 테스팅 전반을 다루는 강의 글
>     * Enzyme, React-testing-library 라이브러리를 다룬다.
> * [단위 테스트 vs 통합 테스트 vs 인수 테스트](https://tecoble.techcourse.co.kr/post/2021-05-25-unit-test-vs-integration-test-vs-acceptance-test/) by 3기_다니 @Tecoble
> * [Testing Strategies in a Microservice Architecture](https://martinfowler.com/articles/microservice-testing/) by Toby Clemson

단위 테스트 (Unit Test)

* 응용 프로그램에서 테스트할 수 있는 가장 작은 단위의 소프트웨어가 예상대로 동작하는지 확인하는 테스트
* 일반적으로 클래스 또는 메소드 수준을 테스트.

통합 테스트 (Integragation Test)

* 여러 모듈을 모아 모듈이 의도대로 협력하는지 확인. 단위 테스트보다 더 큰 규모의 테스트이다.
* 개발자가 변경할 수 없는 부분(e.g., 외부 라이브러리)까지 묶어서 검증할 때 사용.
* DB에 접근하거나 프로그램의 환경이 제대로 동작하는지 확인하는 것을 포함한 모든 작업을 수행할 수 있다.

인수 테스트 (Acceptance Test)

* User story에 맞춰 수행하는 테스트. 비즈니스 쪽에 중점을 두고 수행한다.
* 사용자 동작은 API를 중심으로 나타나기 때문에 (누가, 어떤 목적으로, 무엇을 하는가) 주로 API를 테스트하는 경우가 많다.
* 주로 e2e(end-to-end) 방식을 이용해서 하는 경우가 많다.

### TDD (Test Driven Development)

> * [[기술면접] TDD(Test-Driven-Development) 방법론에 대해서](https://wooaoe.tistory.com/33) by wooaoe
> * [TDD (테스트 주도 개발) 에 대하여](https://hudi.blog/test-driven-development/) by Hudi's Blog
>     * TDD의 핵심에 대해서 간결하게 다룬 글
> * [[Agile] TDD(테스트 주도 개발)란](https://gmlwjd9405.github.io/2018/06/03/agile-tdd.html) by heejung Kwon
>     * TDD을 애자일 관점에서 조금 더 자세하게 다룬다.
> * [선택이 아닌 필수 TDD](https://ahea.wordpress.com/2018/09/10/선택이-아닌-필수-tdd/) by gmun0929 @Ahea Team Study Blog
>     * TDD의 프로세스와 원칙에 대해서 다룬다.

TDD 란

* Test Driven Development의 약자로 테스트 주도 개발이라고 한다. 작은 단위의 테스트 케이스를 작성하고 이를 통과하는 코드를 추가하는 단계를 반복하여 구현한다.
* 테스트 코드 작성 -> 테스트를 통과하는 토드 작성 -> 리팩토링 의 과정을 반복한다.
* 디자인(설계) 단계에서 프로그래밍의 목적과 테스트 항목을 미리 정의해야만 한다. 테스트 코드를 작성하는 도중에 발생하는 예외 사항(버그, 수정사항)들은 테스트 케이스에 추가하고 설계를 개선한다.
* 불확실성이 높은 상황일 수록 더 필요하다.

TDD의 규칙 (나노 주기)

1. 먼저 실패하는 테스트 코드를 작성한다.
1. 컴파일은 실패하지 않으면서 실행이 실패하는 정도로만 테스트 코드를 작성한다.
1. 현재 실패하는 테스트 코드가 통과된 코드만 실제 코드에 작성한다.

* 위처럼 코드의 행 단위의 개발 및 테스트를 진행하면 초 단위의 반복적인 테스트 주기가 발생하는데 이를 나노주기라고 한다.
* 한 사이클은 10~60초

RGR 주기 (단위 테스트(Unit Test)마다 발생된다)

1. Red: 실패하는 단위 테스트 만들기
1. Grean: 테스트가 통과하도록 작성하기
1. Refactor: 통과된 테스트 코드를 리팩토링하기

## 테스트 원칙

> * [좋은 테스트 원칙](https://chrome-axolotl-f33.notion.site/cdd3f75a4c9b46d187859fc0484408d8?v=b1696d4913374185ac86d118a871c9e7&p=aa8adfdfdcbd49488b668d3e8589ef23&pm=s) by NAM JY
>     * 각 내용의 출처가 없어서 찾아서 보충해야 함.

### 단위 테스트의 원칙: FIRST 규칙

* Fast: 단위 테스트는 빨라야 한다.
* Independent: 단위 테스트는 독립적으로 작성한다.
* Repeatable: 단위 테스트는 어느 환경에서든 반복 가능해야 한다.
* Self-Validating: 단위 테스트는 자체검증이 되어야 한다.
* Timely: 단위 테스트는 실제 코드를 작성하기 전에 작성해야 한다.

### 좋은 테스트 커버리지 (CORRECT)

* Conformance: 특정 포멧을 준수 하는지 확인 (전화번호, 이메일, 아이디, 확장자)
* Ordering: 순서 조건 확인 (순서가 중요한 경우)
* Range: 숫자의 범위 (범위를 벗어났을 때 확인)
* Reference: 외부 의존성 유무, 특정한 조건의 유무 ( ~일때, ~가 되었을 때, 어떤 특정한 상황/상태일때 이런 동작을 한다)
* Existence: 값이 존재 하지 않을 때 어떻게 동작 (null, undefined, ‘’, 0)  
* Cardinality: 0-1-N 법칙에 따라 검증 (하나도 없을 때, 하나만 있을 때, 많이 있을 때)
* Time: 상대, 절대, 동시의 일들 (순서가 맞지 않을 때, 소비한 시간, 지역 시간이 다를때)

### 무엇을 테스트 해야 할지 모를 때 (BICEP)

* 기본: 모든 요구 사항이 정상 동작 하는지 확인 - 모든 결과가 정확한지 확인
* Boundary conditions: 모든 엣지 케이스
    * 0명, null, undefined, 큰 수, 작은 수, 잘못된 포맷 등
* Inverse relationship: 역관계를 적용해서 결과값 확인
    * 덧셈 → 뺼셈 , 추가 → 제거
* Cross-check: 다른 수단을 이용해서 결과값이 맞는지 확인
    * A 알고리즘 == B 알고리즘
* Error conditions: 네트워크 에러, 메모리 부족, DB 중지 시 등 오류 사항에서 에러 처리
* Performance characteristics: 성능 확인은 테스트를 통해 정확한 수치로 확인
    * 개선 전 → 개선 후 성능 데이터를 통해 확인

## 테스트 작성 방법

### 일반론 (컨벤션)

* [13 Tips for Writing Useful Unit Tests](https://betterprogramming.pub/13-tips-for-writing-useful-unit-tests-ca20706b5368)
* [Jest Testing like a Pro - Tips and tricks](https://dev.to/dvddpl/jest-testing-like-a-pro-tips-and-tricks-4o6f)

### Given-When-Then

> * [https://martinfowler.com/bliki/GivenWhenThen.html](https://martinfowler.com/bliki/GivenWhenThen.html)
> * [Structuring tests using Given-When-Then](https://www.newthings.co/blog/structuring-tests-using-given-when-then/)

준비-실행-검증의 프로세스로 테스트를 작성

* Given(준비): 테스트에서 구체화하고자 하는 행동을 시작하기 전에 테스트 상태를 설명하는 부분
* When(실행): 구체화하고자 하는 그 행동
* Then(검증): 어떤 특정한 행동 때문에 발생할거라고 예상되는 변화에 대한 설명

생각보다 오래된 방법론이고 주로 TDD나 BDD를 위해 사용하는 것 같다.

### It should vs GWT

> * [Naming Your Unit Tests: It Should vs. Given/When/Then](https://markus.oberlehner.net/blog/naming-your-unit-tests-it-should-vs-given-when-then/)

* GWT가 it should에 비해서 상황을 더 간결하게 설명할 수 있다.
* `describe`(Given에 대응)와 `it`(When에 대응)을 더 잘 활용할 수 있음.
* Given, When, Then을 억지로 구문 안에 집어넣는 것 보다 상황을 간결하게 설명하는 것이 더 도움이 될 수도 있다.

### AAA(Arrange Act Assert) vs GWT(Given When Then)

> * [TEST 개발할 때, AAA와 GWT의 차이를 알아보자](https://berrrrr.github.io/programming/2020/09/07/aaa-vs-gwt/)
> * [TDD HEURISTICS: GIVEN-WHEN-THEN OR ARRANGE-ACT-ASSERT](https://www.qwan.eu/2021/09/02/tdd-given-when-then.html)
> * [Differences between Given When Then (GWT) and Arrange Act Assert (AAA)?](https://softwareengineering.stackexchange.com/questions/308160/differences-between-given-when-then-gwt-and-arrange-act-assert-aaa)

* 각 항목을 1:1 대응할 수 있을 정도로 거의 유사함
* GWT가 조금 더 일반적인 상황 설명에 가깝고 (BDD와 연관), AAA는 더 테스트와 직접적으로 연관되어있는 용어 (TDD와 연관)

## React 테스트

### React에서는 무엇을 테스트 해야 하는가

> * [테스팅 방안](https://ko.reactjs.org/docs/testing-recipes.html) by React

기본

* 렌더링: 주어진 props에 따라 컴포넌트 렌더링이 제대로 되었는지 테스트한다.
* 더미 데이터 가져오기: 실제 API를 호출하는 대신에 요청을 모의해서 더미 데이터를 가져올 수 있다.
* 이벤트 검증: DOM 요소에 실제 DOM 이벤트를 전달한 다음 결과를 검증
* 스냅샷 테스트

> * [React 프로젝트에 TDD 적용하기 (Using react-testing-library)](https://shylog.com/tdd-in-react-using-react-testing-library/) by SHYLOG

컴포넌트 단위에서 확인이 필요한 케이스

* Props가 잘 받아와 졌는가?
* State가 의도한 대로 잘 관리되고 있는가?
* Props나 State를 토대로 Component가 잘 rendering 되고 있는가?
* event handler가 잘 동작 하는가?
* lifecycle에 맞게 동작하는가?

비즈니스 로직에서 확인해봐야 하는 케이스

* 비즈니스 로직은 React의 테스트와는 결이 다른 관계로 다루지 않는다.

### 라이브러리

공식 문서

* [테스팅 개요](https://ko.reactjs.org/docs/testing.html)
* [테스팅 도구](https://ko.reactjs.org/docs/test-utils.html)

사용할 수 있는 라이브러리

* Jest
    * 공식에서 추천하고 가장 사용빈도가 많은 테스팅 라이브러리
* Enzyme
    * Enzyme 을 사용하여 테스트 코드를 작성 할 때에는 컴포넌트의 내부 기능을 자주 접근
    * e.g. 컴포넌트가 지니고 있는 props, state 를 확인, 컴포넌트의 내장 메서드를 호출
* React Testing Library
    * 렌더링 결과에 조금 더 집중
    * 컴포넌트의 인스턴스보다 실제 DOM 에 대해서 신경을 더 많이 쓰고, 실제 화면에 무엇이 보여지는지, 그리고 어떠한 이벤트가 발생했을때 화면에 원하는 변화가 생겼는지 이런 것을 확인하기에 조금 더 최적화

#### Jest

Test Runner와 Test Matcher 그리고 Test Mock 모두를 제공하는 프레임워크

> * [Jest로 기본적인 테스트 작성하기](https://www.daleseo.com/jest-basic/)
> * [Jest로 테스트 전/후 처리하기](https://www.daleseo.com/jest-before-after/)
> * [[Jest] jest.fn(), jest.spyOn() 함수 모킹](https://www.daleseo.com/jest-fn-spy-on/)

테스트 실행

* `describe`로 실행할 테스트 함수를 묶고 각 그룹이 테스팅하는 함수를 설명한다.
* 각 그룹에서 테스트를 여러개 할 경우에는 `it`을 이용해서 설명을 추가할 수 있다.

```jsx
test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});
```

* `toBe`는 primitive 값에만 사용.
* 객체의 값을 비교하고 싶으면 `toEqual` 사용.
* 특정 값이 아닌 것은 `not.toBe` 사용

확인할 수 있는 값 종류

* `null`, `undefined`, `truthy`, `falsy`도 테스트 가능.
* `string`: `toMatch`로 regex에 match 되는지 확인 가능, `toHaveLength`로 길이 확인 가능
* `iterable`: `toContain`으로 특정 항목을 포함하는지 확인 가능.
* `error`: `toThrow`로 에러를 던지는지 확인 가능.

여러번 해야하는 동작

* 매 테스트 전후로 반복적으로 해야하는 동작에는 `beforeEach()`, `afterEach()` hook 사용.
    * e.g., 데이터베이스 접속과 해제
* 전체 테스트 전후로 해야하는 동작에는 `beforeAll()`, `afterAll()` 사용
    * 테스트를 `describe`로 묶으면 `beforeAll()`과 `afterAll()`은 해당 `describe` 블록에만 적용.

예외 케이스 처리

* 특정 테스트만 실행하고 싶을 때 `only()` 사용.
    * 예를 들어 특정 테스트만 실패해서 해당 테스트만 실행하고 싶을 때
    * e.g., `testName.only("describe", () => {})`
* 특정 테스트만 제외하고 싶을 때 `skip()` 사용.

Mocking: 서로 의존하고 있는 여러 함수를 필요한 부분만 간단하게 테스트하기 위한 방법

* 실제 객체와 같이 행동하는 가상의 객체를 생성하는 것.

#### React Testing Library

React Native 컴포넌트 테스트, 컴포넌트가 렌더링하는 컴포넌트 트리 검증, 이들과의 상호작용 등을 테스트할 수 있는 라이브러리.

* [React Testing Library를 이용한 선언적이고 확장 가능한 테스트](https://ui.toast.com/weekly-pick/ko_20210630) by Toast UI
* [React Testing Library 사용법](https://www.daleseo.com/react-testing-library/) by DaleSeo

### 실제 사례

* [프론트엔드 개발자의 TDD 적응하기](https://blog.wadiz.kr/프론트엔드-개발자의-tdd-적응하기/)
    * 관점 부분은 이미 대부분의 소개글이 agile 관점에서 소개하고 있어서 넘겨도 괜찮을 것 같다.
    * 테스트 컴포넌트의 의존성을 해결하기 위해 사용한 방법을 다루고 있다.
* [프론트엔드 테스트 팁](https://tech.madup.com/front-test-tips/) by Willy @MADTECH
* [An in-depth beginner's guide to testing React applications in 2020](https://jkettmann.com/beginners-guide-to-testing-react) by Johannes Kettmann
    * [[번역] 초보자를 위한 React 어플리케이션 테스트 심층 가이드 (1)](https://blog.rhostem.com/posts/2020-10-14-beginners-guide-to-testing-react-1) by blog.rhostem.com
    * [[번역] 초보자를 위한 React 어플리케이션 테스트 심층 가이드 (2)](https://blog.rhostem.com/posts/2020-10-15-beginners-guide-to-testing-react-2) blog.rhostem.com
    * 사용자 관점에서 리액트로 구현한 주요 기능의 테스트를 작성하는 예시를 다룬다.
* [Next.js Head 테스트 작성하기 w/ Next.js router mock](https://www.hyesungoh.xyz/test-nextjs-head-with-mocking-router) by Cometin'
* [Jest + react testing library로 react 테스트 코드 작성하기](https://cocoder16.tistory.com/73) by 기분따라 코딩
    * Jest와 RTL을 이용해 리덕스와 ajax에 의존하는 컴포넌트의 테스트를 작성하는 예시를 다룬다.
* [How to Write Unit Tests in React](https://www.freecodecamp.org/news/how-to-write-unit-tests-in-react/) by Kunal Nalawade @freeCodeCamp
* [React Testing Library Tutorial – How to Write Unit Tests for React Apps](https://www.freecodecamp.org/news/write-unit-tests-using-react-testing-library/) by Yogesh Chavan @freeCodeCamp
