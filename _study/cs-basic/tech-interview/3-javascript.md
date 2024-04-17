---
layout  : article
title   : 취준생을 위한 JavaScript 기초지식 
summary : 면접을 위해 작성해보는 JavaScript 기초지식 질문 및 답변 모음
date    : 2023-09-01 18:35:07 +0900
updated : 2024-04-17 21:56:29 +0900
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
* 참고: [this](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Operators/this) (mdn web docs), [[JavaScript] this 개념 정리 및 연습 문제](https://www.timegambit.com/blog/js/this) (TIME GAMBIT)

#### ✅ call, apply, bind에 대해 설명해주세요

* 세 메소드 모두 `Function.prototype`에 정의되어 있는 메소드로 `this`에 원하는 객체를 직접 바인딩하는 데 사용됩니다.

* `apply`는 `call`과 거의 유사하지만 함수를 호출하는 데 필요한 인수를 목록이 아닌 배열의 형태로 전달받습니다.
* `bind`는 함수를 바로 호출하지 않고 새로운 객체를 바인딩한 함수를 생성해 반환하기만 합니다. 인자를 받는 방식은 `call`과 유사합니다. 첫 인자를 `this`에 바인딩한 뒤 이어지는 인자는 함수의 인수로 제공됩니다.
    * 바인딩한 함수는 원본 함수 객체를 감싸는 함수로 바인딩한 함수를 호출하면 일반적으로 래핑된 함수가 호출됩니다.
    * 한 번 `bind`를 사용해 특정 객체를 바인딩하면 이후에 바뀌지 않습니다.
* 참고: [Function.prototype.call()](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Function/call) (mdn web docs), [Function.prototype.apply()](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Function/apply) (mdn web docs), [Function.prototype.bind()](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Function/bind) (mdn web docs), [[JS] 📚 Call & Bind & Apply 함수 정리](https://inpa.tistory.com/entry/JS-📚-Call-Bind-Apply) (Inpa Dev)

### ✅ 생성자 함수(Constructor Function)에 대해 설명해주세요

* 개발을 하다 보면 유사한 구조의 객체를 여러 개 만들어야 할 필요가 생기기도 합니다. 이때, `new` 연산자와 생성자 함수를 사용하면 유사한 객체 여러 개를 쉽게 만들 수 있습니다.
* 생성자 함수는 일반 함수와 유사하지만 함수 이름의 첫 글자는 대문자로 시작하고 반드시 `new` 연산자를 붙여 실행한다는 관례를 따릅니다.
* 생성자 함수를 실행하면 우선 빈 객체를 만들어 `this`에 할당한 뒤 함수 본문을 실행합니다. 보통 이 과정에서 `this`에 새로운 프로퍼티를 추가합니다. 마지막으로 `this`를 반환합니다. 명시적으로 반환문을 써주지 않아도 `this`는 자동으로 반환됩니다.
* [new 연산자와 생성자 함수](https://ko.javascript.info/constructor-new) (모던 JavaScript 튜토리얼)

## 함수

### ✅ 실행 컨텍스트(Execution Context)에 대해 설명해주세요

* 실행되는 코드를 위한 환경 정보들을 모아놓은 객체입니다. 코드를 실행하기 위해서는 다양한 종류의 변수와 이의 유효범위, 선언된 함수, `this` 등과 같은 다양한 정보가 필요하며 이런 정보들이 영향을 미치는 범위를 추상화하기 위해 객체 형태로 만들어놓은 것을 실행 컨텍스트라고 합니다.
* 실행 컨텍스트는 크게 세 종류로 구분할 수 있습니다.
    * 전역 실행 컨텍스트: 함수 내부에 없는 코드는 전역 컨텍스트에서 실행됩니다.
    * 함수의 실행 컨텍스트: 함수가 호출될 때마다 각 함수에 대한 새로운 실행 컨텍스트가 생성됩니다.
    * `Eval` 함수 실행 컨텍스트: `eval` 함수 내에서 실행되는 별도의 실행 컨텍스트를 가집니다.
* 실행 컨텍스트들은 호출 스택(call stack)이라고 하는 실행 스택에 쌓이고 순차적으로 실행됩니다. 스택은 LIFO(Last In, First Out) 구조로 나중에 생성된 실행 컨텍스트가 먼저 제거됩니다. 일반적으로 코드를 실행했을 때 호출 스택 내에서의 동작은 다음과 같이 이뤄집니다.
    * 처음 코드를 실행하면 전역 컨텍스트가 호출 스택에 담깁니다. 이 전역 컨텍스트는 프로그램 실행이 종료될 때까지 유지됩니다.
    * 코드를 순차적으로 실행하면서 함수가 호출될 때마다 해당 함수에 대한 환경 정보를 수집해서 해당 함수에 대한 새로운 실행 컨텍스트를 생성해 이미 쌓여있는 컨텍스트 스택 위에 차례로 쌓습니다.
        * 예를 들어 `foo()`라는 함수 안에서 `bar()`라는 함수가 실행된다면 `foo()`의 실행 컨텍스트가 쌓인 뒤 `bar()`의 실행 컨텍스트가 쌓입니다.
    * 최상단에 쌓여있는 함수의 실행 컨텍스트부터 해당 함수의 실행이 종료되면 해당 함수에 실행 컨텍스트는 스택에서 제거됩니다.
        * 위의 예시의 경우 `bar()` 함수의 실행 컨텍스트가 쌓인 뒤 함수의 실행이 끝나고 `bar()` 함수의 실행 컨텍스트가 제거됩니다. 이후, `foo()` 함수의 남은 코드를 실행한 뒤 `foo()` 함수의 실행 컨텍스트도 제거합니다.
    * 전역 공간에 실행할 코드가 남아있지 않다면 호출 스택에서 전역 컨텍스트가 제거된 뒤 실행이 종료됩니다.
* 실행 컨텍스트는 세 하위 항목을 갖습니다.
    * `LexicalEnvironment`: 변수나 함수와 같은 식별자에 대한 정보를 갖고있는 객체입니다. 현재 컨텍스트의 내부 식별자에 관한 정보를 갖는 `EnvironmentRecord`와 호출된 함수가 선언될 당시의 (즉 현재 함수 컨텍스트 직전 컨텍스트의) `LexicalEnvironment`를 참조하는 `OuterEnvironmentReference`로 구성됩니다.
    * `VariableEnvironment`: `LexicalEnvironment`와 유사하지만 변경 사항이 실시간으로 적용되는 `LexicalEnvironment`와 달리 생성시 초기 상태를 유지합니다. 컨텍스트가 생성될 때, 초기 정보를 `VariableEnvironment`에 저장한 뒤 `LexicalEnvironment`에 복사하며, 이후 코드가 진행되면 `VariableEnvironment`는 초기 상태를 유지한 채 `LexicalEnvironment`를 최신 상태로 업데이트 합니다.
    * `ThisBinding`: 현재 컨텍스트에서 `this`가 참조하고 있는 객체를 나타내는 항목입니다.
        * ES6부터는 바인딩이 `EnvironmentRecord` 내부에서 이뤄지도록 변경되었습니다.
* 참고: [실행 컨텍스트 (Execution Context)](https://github.com/baeharam/Must-Know-About-Frontend/blob/main/Notes/javascript/execution-context.md) (baeharam/Must-Know-About-Frontend), [JS Execution Context (실행 컨텍스트) 란?](https://blog.gamguma.dev/post/2022/04/js_execution_context) (감구마), [자바스크립트의 실행 컨텍스트 (execution context)](https://velog.io/@ggong/%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8%EC%9D%98-%EC%8B%A4%ED%96%89-%EC%BB%A8%ED%85%8D%EC%8A%A4%ED%8A%B8-execution-context#2-%EC%8B%A4%ED%96%89-%EC%BB%A8%ED%85%8D%EC%8A%A4%ED%8A%B8%EC%9D%98-%EA%B5%AC%EC%84%B1) (ggong)

### ✅ 렉시컬 환경(Lexical Environment)에 대해 설명해주세요

> 위의 실행 컨텍스트에서 설명한 항목과 동일합니다.

* `LexicalEnvironment`는 변수나 함수와 같은 식별자에 대한 정보를 갖고있는 객체입니다.
* `EnvironmentRecord`와 `OuterEnvironmentReference`로 구성됩니다.
    * `EnvironmentRecord`는 현재 컨텍스트의 내부 식별자에 관한 정보를 저장합니다. 실행 컨텍스트를 처음부터 끝까지 확인하며 식별자 정보를 순서대로 저장합니다.
    * `OuterEnvironmentReference`는 호출된 함수가 선언될 당시의 (즉 현재 함수 컨텍스트 직전 컨텍스트의) `LexicalEnvironment`를 참조합니다. 이를 통해 중첩된 자바스크립트 코드에서 이전 컨텍스트에서 정의된 식별자를 탐색해나갈 수 있습니다.
* 참고: [JS Execution Context (실행 컨텍스트) 란?](https://blog.gamguma.dev/post/2022/04/js_execution_context) (감구마), [자바스크립트 함수 (3) - Lexical Environment](https://ui.toast.com/weekly-pick/ko_20171006) (TOAST UI)
* 추가자료: [변수의 유효범위와 클로저 #렉시컬 환경](https://ko.javascript.info/closure#ref-475) (모던 JavaScript 튜토리얼)

### ✅ 스코프(Scope)에 대해 설명해주세요

> 일반적으로는 전역(global) 스코프와 지역(local) 스코프로 구분하며 함수 스코프나 블록 스코프가 지역 스코프에 해당한다고 볼 수 있을 것 같다.

* 스코프는 값과 표현식을 "볼 수 있거나(visible)" 참조할 수 있는 현재의 실행 컨텍스트를 의미합니다. 즉, 이들이 유효한 범위를 나타내며 변수나 표현식이 현재 스코프에 존재하지 않는다면 해당 항목을 사용할 수 없습니다.
* 스코프는 계층적인 구조를 가지기 때문에 하위 스코프에서 상위 스코프에 접근할 수 있습니다. 하지만 반대로는 불가능합니다.
* 자바스크립트의 스코프는 크게 세 가지로 구분할 수 있습니다.
    * 전역 스코프: 스크립트 모드에서 실행되는 모든 코드의 기본 범위입니다.
    * 모듈 스코프: 모듈 모드에서 실행되는 코드의 범위입니다.
    * 함수 스코프: `function` 키워드로 생성된 코드의 범위입니다.
* 추가적으로 `let`이나 `const` 키워드로 선언된 변수는 블록 스코프라는 중괄호 쌍(i.e., 블록)으로 생성된 추가적인 범위에 속하게 됩니다.
* 참고: [Scope](https://developer.mozilla.org/en-US/docs/Glossary/Scope) (mdn web docs)

#### ✅ 렉시컬 스코프(Lexical Scope)에 대해 설명해주세요

* 변수나 함수의 스코프가 해당 변수나 상수가 '선언'된 위치에 의해 결정되면 이들을 렉시컬 스코프 갖는다고 합니다. 처음 선언될 때 결정된 스코프가 이후 코드가 실행되면서 변하지 않아 정적 스코프(static scope)라고도 합니다.
* 자바스크립트는 렉시컬 스코프를 따릅니다.
* 반대의 개념으로 함수의 '호출' 위치에 따라 스코프가 결정되는 동적 스코프(dynamic scope)가 있습니다.
* 참고: [Closures #Lexical scopin](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures#lexical_scoping) (mdn web docs), [Lexical Scope (렉시컬 스코프) 란? (자바스크립트의 스코핑 방식)](https://jake-seo-dev.tistory.com/180) (제이크서 위키 블로그)

#### ✅ 스코프 체인(Scope Chain)에 대해 설명해주세요

* 특정 식별자의 정보를 검색할 때 해당 정보가 현재 스코프에 존재하지 않는다면 상위 스코프에 연쇄적으로 접근해 이를 찾아나가는 방식을 말합니다.
* 실행 컨텍스트의 `LexicalEnvironment`에는 선언 시점을 기준으로 상위 스코프의 `LexicalEnvironment`을 가리키는 `OuterEnvironmentReference`가 존재하므로 이와 같은 동작이 가능합니다.
* `OuterEnvironmentReference`가 `null` 일 때까지 탐색을 계속하며 마지막 스코프에서도 정보를 찾지 못하면 참조 에러가 발생합니다.
* 참고: [실행 컨텍스트 (Execution Context)](https://github.com/baeharam/Must-Know-About-Frontend/blob/main/Notes/javascript/execution-context.md) (baeharam/Must-Know-About-Frontend)

### ✅ 호이스팅(Hoisting)이 발생하는 이유에 대해 설명해주세요 (⭐)

* 자바스크립트 엔진은 코드를 실행하기 전, 실행 컨텍스트를 구성하면서 `EnvironmentRecord`에 식별자의 정보를 수집합니다. 즉, 코드가 실행되기 전에 자바스크립트 엔진은 이미 실행 컨텍스트에 속한 식별자를 알고 있게 됩니다.
* 이런 동작 방식을 추상화 해 "아직 선언되지 않은 식별자를 해당 범위의 최상단으로 끌어 올리는 현상"인 것처럼 설명한 것이 호이스팅입니다.
* 참고: [자바스크립트 실행 컨텍스트 #environmentRecord와 Hoisting(호이스팅)](https://junilhwang.github.io/TIL/Javascript/Domain/Execution-Context/#_3-environmentrecord%E1%84%8B%E1%85%AA-hoisting-%E1%84%92%E1%85%A9%E1%84%8B%E1%85%B5%E1%84%89%E1%85%B3%E1%84%90%E1%85%B5%E1%86%BC) (개발자 황준일), [호이스팅](https://developer.mozilla.org/ko/docs/Glossary/Hoisting) (mdn web docs)

### ✅ var, let, const 차이를 설명해주세요 (⭐)

* 모두 변수를 선언하기 위한 키워드입니다.
* `let`과 `const`는 ES6때 등장한 키워드로 기존의 `var`와 몇몇 차이를 보입니다.
    * `var`는 함수나 전역 스코프를 갖는 반면 `let`과 `const`는 블록 스코프를 갖습니다.
    * `var`는 스코프의 최상단으로 호이스팅 되고 선언과 동시에 `undefined`로 초기화 되는 반면 `let`과 `const`는  선언부에 다다를 때 까지는 값에 접근할 수 없습니다. 이런 이유로 `let`과 `const`는 호이스팅 되지 않는 것으로 여겨집니다.
    * (Strict mode가 아니라는 가정 하에) `var`는 최상단에서 선언되었을 때 `globalThis`에 바인딩 되지만 `let`과 `const`는 바인딩 되지 않습니다.
    * 동일한 스코프 안에서 `var`는 재선언이 가능하지만 `let`과 `const`는 재선언이 불가합니다.
* `var`과 `let`은 변수를 선언하기 위한 키워드로 이후에 재할당이 가능하지만 `const`는 재할당이 불가능해 상수와 같은 고정값을 선언할 때 사용합니다.
* 참고: [let](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let) (mdn web docs), [var vs let vs const](https://github.com/baeharam/Must-Know-About-Frontend/blob/main/Notes/javascript/var-let-const.md) (baeharam/Must-Know-About-Frontend)

#### ✅ TDZ에 대해 설명해주세요

* `let`, `const`, `class` 등을 사용해 변수를 선언한 경우 해당 변수가 선언된 블록 스코프의 시작 지점부터 변수가 선언된 지점 사이에서는 해당 변수에 접근하려 시도하면 참조 오류가 발생합니다. 이 구간을 TDZ(Temporal Dead Zone)라고 합니다.
* 참고: [let #Temporal dead zone (TDZ)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let#temporal_dead_zone_tdz) (mdn web docs)

### ✅ 클로저(Closure)에 대해 설명해주세요 (⭐)

* 함수가 주변 상태 즉, 렉시컬 환경에 대한 참조와 함께 묶어 결합된 것을 말합니다. 클로저는 렉시컬 환경을 기억하므로 해당 스코프 밖에서 실행될 때도 그 스코프에 접근할 수 있게 됩니다.
    * 예를 들어 `foo()` 함수와 `bar()` 함수가 중첩되어 있고 `bar()` 함수 내부에서 `foo()` 함수에서 선언된 변수를 사용할 때, `bar()` 함수가 그 환경 정보를 기억하기 때문에 `foo()`의 함수 스코프 외에서 `foo()`를 호출하는 경우에도 문제없이 해당 변수를 참조할 수 있습니다다. 이 때 `bar()`가 클로저에 해당합니다.
* 자바스크립트에서 대부분[^new-function]의 함수는 각자의 실행 컨텍스트에서 렉시컬 환경을 참조하고 있으므로 (실제로는 `[[Environment]]`라는 숨김 프로퍼티에 저장됩니다) 자바스크립트의 모든 함수는 클로저라고 할 수 있습니다.
* 클로저를 활용하는 예로 자바스크립트 내에서 `private` 메소드를 구현할 수 있습니다.
* 참고: [클로저](https://developer.mozilla.org/ko/docs/Web/JavaScript/Closures) (mdn web docs), [변수의 유효범위와 클로저](https://ko.javascript.info/closure) (모던 JavaScript 튜토리얼)

### 함수 선언형과 함수 표현식의 차이에 대해 설명해주세요

### 즉시 실행 함수(IIFE)에 대해 설명해주세요

> IIFE는 Immediately-Invoked Function Expression 입니다.

### Rest 연산자와 Spread 연산자에 대해 설명해주세요

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

## 주석

[^new-function]: 대부분이라고 한 이유는 `new` 키워드를 사용해 함수를 만들면 함수의 `[[Environment]]` 프로퍼티가 현재 렉시컬 환경이 아닌 전역 렉시컬 환경을 참조하기 때문입니다 ([new Function 문법 #클로저](https://ko.javascript.info/new-function#ref-419) by 모던 JavaScript 튜토리얼).
