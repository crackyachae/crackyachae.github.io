---
layout  : wiki
title   : Chatper 8. Functions
summary : 
date    : 2020-12-09 17:03:19 +0900
updated : 2020-12-18 16:25:50 +0900
tag     : draft
toc     : true
public  : true
parent  : [[flanagan-js-def-guide]]
latex   : false
---
* TOC
{:toc}

> 이 글은 David Flanagan의 The Definitive Guide 내용을 복습하기위해 핵심 내용을 요약 정리한 글입니다.
>
> 내용을 이해하기 위한 개인적인 설명이나 해석이 있을 수 있기 때문에 되도록 원서적을 참고해주시길 바랍니다.
> 잘못된 부분이 있다면 댓글이나 그 외 편하신 방법으로 알려주시면 감사하겠습니다.

### 8.1.3 Arrow Functions

함수를 정의하는 compact syntax

괄호 안에 comma(,)로 구분된 parameter list, 화살표 (`=>`), curly braces ({}) 안에 적힌 function body로 구성.
```js
const sum = (x, y) => { return x + y; };
```

더 compact 하게도 작성할 수 있다.
+ function body가 single `return` statement면 `return` keyword를 생략할 수 있다.
  ```js
  const sum = (x, y) => x + y;
  ```
+ function이 단 한개의 parameter만 갖는다면 parameter의 괄호를 생략할 수 있다.
  ```js
  const polynomial = x => x*x + 2*x +3;
  ```

몇 가지 주의해야 할 상황이 있다.
+ parameter가 없다면 parameter 부분에 빈 괄호를 반드시 적어주어야 한다.
  ```js
  const constantFunc = () => 42;
  ```
+ parameter와 arrow 사이에 새로운 행이 있으면 안된다. 각각을 별개의 statement로 인식할 수 있기 때문이다.
  ```js
  /* assignment statement로 인식 */
  const polynomial = x
  => x*x + 2*x +3;
  ```
+ object literal을 반환하는 경우 사용하는 curly braces (`{}`)가 function body의 curly braces와 헷갈리지 않도록 괄호로 감싸주어야 한다.
  + to avoid syntactic ambiguity
  ```js
  const g = x => ({ value: x}); // Good
  const g = x => { value: x};   // Bad
  ```

Arrow function의 간결한 문법은 하나의 function을 다른 function 으로 pass할 때 굉장히 유용하게 쓰인다.
+ 주로 array method에 사용.

Arrow function이 다른 방식으로 정의된 function과 가장 크게 다른점은 (in one critical way) `this` keyword의 값을 정하는 방식이다.
+ 자체의 invocation context를 정의하는 다른 함수들과 다르게 
+ arrow function은 자신이 정의된 environment의 값을 상속받는다.

또한 arrow function은 prototype property가 없어 constructor function으로 사용하지 못한다.
