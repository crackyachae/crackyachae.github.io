---
layout  : article
title   : 취준생을 위한 JavaScript 기초지식 
summary : 면접을 위해 작성해보는 JavaScript 기초지식 질문 및 답변 모음
date    : 2023-09-01 18:35:07 +0900
updated : 2024-04-04 00:29:16 +0900
tag     : draft
toc     : true
public  : true
parent  : [[/cs-basic/tech-interview]]
latex   : false
---
* TOC
{:toc}

## 자바스크립트 기본

### 자바스크립트는 무슨 언어인가요?

### 자바스크립트가 동적 언어인 이유는 무엇인가요?

### 엄격 모드에 대해 설명해주세요

### 변수 선언, 초기화, 할당의 차이점에 대해 설명해주세요

### undefined, null, undeclared를 비교해주세요

### 데이터 타입에 대해 설명해주세요

### 자바스크립트에서 일어나는 데이터 형변환에 대해 설명해주세요

### ES6에서 새로 생긴 기능을 아는대로 말씀해주세요

### map과 forEach, reduce에 대해 설명해주세요

### 깊은 복사와 얕은 복사에 대해 설명해주세요

### 불변성을 유지하려면 어떻게 해야하나요?

## 객체

### ✅ this에 대해 설명해주세요 (⭐)

* JavaScript에서 `this`는 호출되는 컨텍스트에 의해 값이 달라지는 키워드입니다.
* 기본적으로, 전역 컨텍스트에서 `this`는 엄격 모드에 상관 없이 전역 객체를 가리킵니다. 예를들어, 브라우저의 경우 `window` 객체를 Node.js의 경우 `global` 객체를 가리킵니다.
* 함수 컨텍스트, 즉 함수 내부에서 `this`의 값은 호출한 방법에 따라 결정됩니다.
    * 함수를 단순히 호출했을 때, 함수 내 `this`는 전역 객체를 가리킵니다. 엄격 모드에서는 `this`가 실행 컨텍스트에 진입하며 설정되는 값을 유지하므로 그 값이 `undefined`로 남아있게 됩니다.
    * `obj.method()`와 같이 함수를 특정 객체의 메소드로 호출하는 경우, `this`는 해당 메소드를 '호출'한 객체입니다.
    * `Function.prototype`에 정의되어 있는 `apply`, `call`, `bind` 메소드를 이용해 `this`를 직접 바인딩해줄 수도 있습니다. 이 경우 함수 내의 `this`는 인수로 전달된 객체를 가리킵니다.
    * `new` 키워드를 통해 생성자 함수를 호출할 때, 생성자 함수 내부의 `this`는 새로 생성되는 객체를 가리킵니다.
    * 위의 규칙 중 다수가 적용되면 더 우선순위가 높은 규칙을 적용해 `this`값을 설정합니다. 나중에 작성된 항목일수록 우선순위가 높습니다.
* 화살표 함수의 경우 위의 규칙과는 별개로 정의 시점에 상위 스코프의 `this`를 가리키는 정적인 방식으로 `this`가 결정됩니다.
* 참고: [this](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Operators/this) (MDN), [[JavaScript] this 개념 정리 및 연습 문제](https://www.timegambit.com/blog/js/this) (TIME GAMBIT)

#### ✅ call, apply, bind에 대해 설명해주세요

* 세 메소드 모두 `Function.prototype`에 정의되어 있는 메소드로 `this`에 원하는 객체를 직접 바인딩하는 데 사용됩니다.

* `apply`는 `call`과 거의 유사하지만 함수를 호출하는 데 필요한 인수를 목록이 아닌 배열의 형태로 전달받습니다.
* `bind`는 함수를 바로 호출하지 않고 새로운 객체를 바인딩한 함수를 생성해 반환하기만 합니다. 인자를 받는 방식은 `call`과 유사합니다. 첫 인자를 `this`에 바인딩한 뒤 이어지는 인자는 함수의 인수로 제공됩니다.
    * 바인딩한 함수는 원본 함수 객체를 감싸는 함수로 바인딩한 함수를 호출하면 일반적으로 래핑된 함수가 호출됩니다.
    * 한 번 `bind`를 사용해 특정 객체를 바인딩하면 이후에 바뀌지 않습니다.
* 참고: [Function.prototype.call()](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Function/call) (MDN), [Function.prototype.apply()](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Function/apply) (MDN), [Function.prototype.bind()](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Function/bind) (MDN), [[JS] 📚 Call & Bind & Apply 함수 정리](https://inpa.tistory.com/entry/JS-📚-Call-Bind-Apply) (Inpa Dev)

### ✅ 생성자 함수(constructor function)에 대해 설명해주세요

* 개발을 하다 보면 유사한 구조의 객체를 여러 개 만들어야 할 필요가 생기기도 합니다. 이때, `new` 연산자와 생성자 함수를 사용하면 유사한 객체 여러 개를 쉽게 만들 수 있습니다.
* 생성자 함수는 일반 함수와 유사하지만 함수 이름의 첫 글자는 대문자로 시작하고 반드시 `new` 연산자를 붙여 실행한다는 관례를 따릅니다.
* 생성자 함수를 실행하면 우선 빈 객체를 만들어 `this`에 할당한 뒤 함수 본문을 실행합니다. 보통 이 과정에서 `this`에 새로운 프로퍼티를 추가합니다. 마지막으로 `this`를 반환합니다. 명시적으로 반환문을 써주지 않아도 `this`는 자동으로 반환됩니다.
* [new 연산자와 생성자 함수](https://ko.javascript.info/constructor-new) (모던 JavaScript 튜토리얼)

## 함수

### 실행 컨텍스트에 대해 설명해주세요

### 즉시 실행 함수 (IIFE)에 대해 설명해주세요

### Rest 연산자와 Spread 연산자에 대해 설명해주세요

### 스코프 (Scope)에 대해 설명해주세요

#### 스코프 체인에 대해 설명해주세요

### 렉시컬 환경(Lexical Environment)에 대해 설명해주세요

### ⭐ 클로져(Closure)에 대해 설명해주세요

### ⭐ var, let, const 차이를 설명해주세요

#### TDZ에 대해 설명해주세요

### ⭐ 호이스팅이 발생하는 이유에 대해 설명해주세요

### 함수 선언형과 함수 표현식의 차이에 대해 설명해주세요

## 프로토타입과 클래스

### 객체 지향 프로그래밍이란 무엇인가요?

#### 객체 지향 프로그래밍의 특징에 대해 말씀해주세요

#### 객체 지향 프로그래밍의 장단점에 대해 말씀해주세요

### 프로토타입에 대해 설명해주세요

### 클래스에 대해 설명해주세요

### 클래스의 Static에 대해 설명해주세요

### 클래스의 Public, Private, Protected에 대해 설명해주세요

## 비동기

### ⭐ 동기와 비동기에 대해 설명해주세요

#### 비동기적으로 실행되는 것을 동기적으로 코딩하는 방법이 있나요?

### ⭐ 콜백 함수에 대해 설명해주세요

#### ⭐ 콜백 지옥을 해결하는 방법을 설명해주세요

### ⭐ Promise에 대해 설명해주세요

#### Promise.all() 에 대해 설명해주세요

### ⭐ Async, Await와 사용 방법을 설명해주세요

### ⭐ Callback, Promise, Async, Await를 비교 설명해주세요

### AJAX에 대해 설명해주세요

## 제너레이터와 비동기 이터레이션

### 제너레이터에 대해 설명해주세요

### 이터러블과 이터레이터 프로토콜에 대해 설명해주세요

## 이벤트

### ⭐ 이벤트 버블링과 캡처링에 대해 설명해주세요

### ⭐ 이벤트 위임에 대해서 설명해주세요

* 캡처링과 버블링을 활용해 공통 조상 한 개에만 이벤트 핸들러를 할당해서 “유사한 동작”이 필요한 “여러 개의 하위요소”를 다루는 이벤트 핸들링 패턴
* 참고: [이벤트 위임](https://ko.javascript.info/event-delegation)

### 이벤트 위임의 동작 방식에 대해서 설명해주세요

## 메모리 관리

### 자바스크립트의 메모리 관리에 대해 아는 대로 설명해주세요

## 이벤트 루프

### Blocking과 Non-Blocking에 대해 설명해주세요

### 자바스크립트를 멀티 쓰레드처럼 사용하는 방법이 뭔가요?

### 자바스크립트에서 비동기 로직이 어떻게 동작하는지 설명해주세요. (이벤트 루프)

### 콜 스택 (Call Stack)과 힙 (Heap)에 대해 설명해주세요

### 태스크 큐와 마이크로 태스트 큐에는 어떤 함수가 들어가나요?

### requestAnimationFrame에 대해 설명해주세요
