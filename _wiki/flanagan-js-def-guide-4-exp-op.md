---
layout  : wiki
title   : Chatper 4. Expressions and Operators
summary : 
date    : 2020-09-29 10:26:13 +0900
updated : 2020-12-18 16:25:39 +0900
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

+ *expression*: 값을 생성하기 위해 evaluate 되는 JavaScript의 phrase
  + e.g., constant, variable (simple expressions)
  + e.g., array access expression, function invoacation expression (complex expressions)
+ *operator*: operand의 값을 결합하고 새로운 값으로 evaluate.

## 4.1 Primary Expressions
'홀로' 사용되는 expression

+ literals: program에 사용되는 constant value
  + e.g., `1.23`, `hello`
+ JavaScript's reserved words
  + e.g., `true`, `false`, `this`
+ varaible, constant의 reference
  + e.g., `i`, `sum`
+ global object의 property
  + e.g, `undefined`

## 4.2 Object and Array Initializers
생성된 값이 새 object나 array인 expression

+ object / array literal 이라고 부르기도 한다.
+ 여러개의 subexpression을 포함. (primary expression이 아니다.)

### Array initializer
+ square braket `[]` 안에 expression들이 comma로 구분되어 있는 (comma-seperated) 형태.
+ 새로 생성된 array가 initializer의 값이 된다.
+ comma로 구분된 각 expression 들이 array의 element가 된다.

```js
[] // empty array
[1+2,3+4] // 2-element array
```

+ array를 element로 갖는 nested array를 생성하거나
+ array에 undefined element를 포함할 수도 있다.

```js
let matrix = [[1,2,3], [4,5,6], [7,8,9]];
let sparseArray = [1,,,,5];
```

### Object initializer
+ array initializer와 유사한 형태이지만 square bracket이 curly bracket `{}`으로 바뀐다 
+ subexpression 앞에 property 이름과 colon으로 prefix가 존재한다.

```js
let p = { x: 2.3, y: -1.2 }; // object with 2 properties
let q = {}; // empty object
```

+ ES6에서 object literal의 feature가 더 다양해졌다. (6.10)

## 4.3 Function Definition Expressions
JavaScript function을 정의하는 expression, 새로 정의된 function을 값으로 갖는다.

+ `function` keyword와
+ 괄호안에 있는 0개 이상의 comma-separated identifier (i.e., parameter 이름)
+ curly braces 안의 JavaScript code block 순으로 구성되어있다.

```js
/*
 * function keyword: function
 * identifier: (x)
 * code block: {return x * x;}
 */

let square =  function(x) {return x * x;};
```

+ function statement나 ES6부터 등장한 "arrow function" syntax를 이용해서 function을 정의할 수도 있다.

## 4.4. Property Access Expressions

