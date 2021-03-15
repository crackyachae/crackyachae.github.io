---
layout  : wiki
title   : Chapter 3. Types, Values, and Variable
summary : 
date    : 2020-06-23 11:15:50 +0900
updated : 2020-12-09 16:25:01 +0900
tag     : rough
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

+ *Type*: 프로그래밍 언어에서 표현하고 처리할 수 있는 값들의 '종류'
+ *Variable*: 나중에 사용할 값을 저장해놓는 곳.

+ 프로그래밍 언어의 fundamental characteristic
  + 지원하는 'type'의 종류
  + 'Variable'이 동작하는 방식

### JavaScript의 type
+ *Primitive type*
  + numbers, strings, booleans (3.1-3.3)
  + null and undefined: JavaScript의 special value (3.4)
  + /addition/ Symbol: ES6부터 등장한 new special-purpose type (최신판의 3.6)
+ *Object type*
  + Primitive type이 아닌 value는 모두 object (3.5, Chapter 6) 
  + *Array*: 번호(index)가 부여된 값들이 정렬되어 모여있는 형태의 object (Chapter 7)
  + *Function*: 실행할 수 있는 코드를 갖는 object (Chapter 8)

### Constructor, Classes
+ *Constructor*: 새로 생성된 object를 초기화하기 위해 사용하는 function
  + Constructor는 해당 object의 class를 정의한다.
+ *Class*: constuctor에 의해 초기화된 object의 모임이다
  + Class는 object의 subtype으로 생각할 수 있다.

Array와 function의 class 외에도 JavaScript는 세 가지 유용한 class를 정의하고 있다.
  + Date: 날짜를 표시
  + RegExp: regular expressions (Chapter 10)
  + Error: syntax, runtime error를 표시

Addition
  + Set: value들의 set으로 이루어진 object
  + Map: key를 value에 mapping한 object
  + Typed array: bytes나 binary data로 이루어진 array의 연산을 용이하게 함

적절한 constructor function으로 나만의 class를 만들 수도 있다.

JavaScript interpreter은 메모리 관리를 위한 garbage collection을 자동으로 하기 때문에 object의 destruction이나 deallocation을 신경 쓸 필요가 없다.

JavaScript는 객체 지향적 언어(object-oriented language)이다.
+ Globally defined function이 아닌 type에 값을 다룰 *method*를 정의해 각 type의 value를 이용한다.
+ e.g., Array `a`의 element를 정리하기 위해:
  + `a`를 `sort()` 에게 전달하는 것이 아니라
  + `a`의 `sort()` method를 불러온다. (`a.sort()`)

+ JavaScript에서는 object만 method를 불러올 수 있지만
+ Number, string, boolean value들도 method를 갖는 것 처럼 행동한다.
+ null과 undefined만 method를 불러올 수 없다.

### JavaScript type의 구분

+ Primitive type vs. Object type
+ *Mutable* vs. *Immutable* (3.7)
  + mutable: 바뀔 수 있는 값. objects and arrays
  + immutable: 바뀔 수 없는 값. numbers, booleans, null, undefined, and 'string'

JavaScript는 자유롭게 type을 바꿀 수 있다. (3.8)
+ JavaScript의 variable은 *untyped* 되어있다. 어떤 값이라도 대입할 수 있고 나중에 다른 type을 다시 대입할 수도 있다.
  + `var` keyword를 이용해서 선언한다.

JavaScript는 *lexical scoping*을 사용한다. (3.9)
+ *Global variables*: function의 밖에서 선언된 variable. 프로그램 어디서든 쓸 수 있다.
+ *Function scope*: function안에서 선언된 variable. function안의 코드에서만 볼 수 있다.


## 3.1 Numbers
JavaScript의 모든 number는 floating-point value이다. (Integer와의 구분이 없음)
+ 64-bit floating-point format을 사용한다.

JavaScript 프로그램에 직접 나타나는 number를 *numeric literal*이라고 한다.
+ 앞에 minus sign (-)을 붙이면 해당 number를 negative로 만들 수 있다.

### 3.1.1 Integer Literals
+ 10진수의 정수: 각 자릿수를 순차적으로 나열해서 표기
  + e.g., 0, 3, 1000
+ 16진수의 값: '0x'나 '0X'로 시작하며 그 뒤에 16진수의 자릿수(0~9, A~F)를 이용해 표기한다.
  + e.g., 0xff (10진수로 255)
+ ECMAscript의 표준은 아니지만 8진수를 이용해서 표기할 수도 있다. 0으로 시작하고 8진수의 자릿수 (0~7)를 이용해 표기한다.
  + e.g., 0377 (10진수로 255)
  + 그렇기 때문에 그 외의 경우 0으로 시작하는 정수를 적는 것은 삼가해야한다.

/Addition/
+ ES6부터 2진수와 8진수를 이용해서 표기가 가능
  + 2진수: '0b' 혹은 '0B'로 시작
  + 8진수: '0o' 혹은 '0O'로 시작

### 3.1.2 Floating-Point Literals
+ Floating point literal은 decimal point를 포함하며 일반적으로 실수를 표기하는 전통적인 방법을 따른다.
  + e.g., 3.14, .333
+ Exponential notation으로도 표기할 수 있다. (실수 + e의 표기)
  + e.g., 6.02e23 (6.02 x 10$^{23}$)

### 3.1.3 Arithmetic in JavaScript
+ JavaScript 프로그램에서는 arithmetic operator를 사용해서 number를 계산할 수 있다.

|operator|operation|
|---|---|
|+|addition|
|-|subtraction|
|*|multiplication|
|/|division|
|%|modulo|

+ 보다 복잡한 계산도 `Math` object에 정의된 property를 이용해 할 수 있다. 자세한 사항은 서적 참고.

JavaScript는 overflow, underflow, 0으로 나누는 경우에도 error를 발생시키지 않는다.

+ Overflow: 연산의 결과가 표시할 수 있는 number보다 큰 경우
  + 결과로 특별한 infinity value를 반환한다. 표기는 `Infinity`
  + 음의 값의 경우 `-Infinity` 반환
  + 0으로 나누는 경우에도 위와 같은 값을 반환한다.
+ Underflow: 연산의 결과가 표현할 수 있는 수보다 0에 가까운 경우
  + 결과로 `0`을 반환한다.
  + 음의 값에서 발생하는 경우 특별한 'negative zero'를 반환한다.
  + negative zero는 일반 zero와 구분이 거의 불가능하다.

+ 예외: zero를 zero로 나누는 경우.
  + 정확히 정의된 value를 반환하지 못한다.
  + 이 때, 반환되는 value는 not-a-number value인 `NaN`이다.

다음과 같은 경우에도 `NaN`이 반환된다.
+ Infinity를 infinity로 나누는 경우
+ 음수에 square root를 취하는 경우
+ Number type으로 바뀔 수 없는 non-numeric한 value에 arithmetic operator를 이용한 경우.

Not-a-number value의 특이한 점은 자신을 포함해서 그 어떤 value와도 동등하게 비교되지 않는다는 것이다.

+ `x`가 `NaN`인지 확인하려면 `x == NaN` 대신 `x != x`를 이용해야 한다.
+ `isNaN()` function을 이용하거나
  + /Addition/ `Number.isNaN(x)` 사용 가능
+ `isFinite()` function을 이용해서 판단할 수도 있다. 

비슷하게 negative zero도 positive zero와 동등하게 비교된다는 특이한 점이 있다.
+ `0 === -0`는 `true`를 반환
+ Infinity와 -infinity는 다르기 때문에 `1/0 === 1/-0`는 `false`를 반환한다.

### 3.1.4 Binary Floating-Point and Rounding Errors
JavaScript로 표현할 수 있는 수가 한정적이기 때문에 JavaScript에 표시되는 많은 실수 값이 실제 값에서 근사된 값이다.

JavaScript에서 사용하는 floating point representation은 binary representation이다.
+ `1/2`, `1/8`등의 값은 정확히 표시할 수 있지만,
+ `0.1`과 같은 값을 정확하게 표시하지 못한다.
+ 이런 부정확성은 연산과정에서 문제를 일으킬 수 있다. (예시는 서적 참고)

### /Addition/ Arbitrary Precision Integers with BigInt
ES2020부터 새로운 numeric type인 `BigInt`가 도입.

+ `BigInt`: 64-bit integer를 나타내기위해 도입된 value가 integer인 numeric type.
+ 연속된 숫자뒤에 소문자 `n`을 적어서 표기
  + 기본적으로 10진수지만 2, 8, 16진수로도 표기 가능
  + e.g., `1234n`, `0x80000000000000n`

+ `BigInt()` function을 이용해 regular JavaScript number를 BigInt value로 바꿀 수 있다.
+ regular JavaScript number처럼 arithmetic operation이 가능하다.
  + Division operation의 경우 나머지를 버리고 내림한다 차이가 있다.
  + Operation을 할 때, operand에 BigInt와 regular number를 혼용하지 않도록 해야한다.
+ Comparison operator를 사용할 때는 두 numeric type을 섞어서 사용할 수 있다.

### 3.1.5 Dates and Times
JavaScript는 날짜와 시간을 표시하는 object를 만드는 `Date()` constructor를 포함한다.

이를 사용하기 위한 quick tutorial. 자세한 목록은 서적 참고.

## 3.2 Text
+ String: 16-bit value들의 immutable ordered sequence.
  + 각각은 Unicode character를 나타낸다.
+ String은 JavaScritp에서 text를 나타내는 type이다.
+ Zero-based indexing을 사용한다. (첫 번째 16-bit value가 position 0)
+ String 한 글자만 나타내는 별도의 type은 존재하지 않는다.

### Characters, Codepoints, and JavaScript Strings
+ JavaScript는 UTF-16 encoding을 사용.
+ 16-bit로 표현할 수 없는 문자는 두 개의 연속된 16-bit value로 나타낸다.

### 3.2.1 String Literals
+ JavaScript에서 string을 literally 포함시키려면 string의 문자를 single 혹은 double quotes (' or ")로 감싸면 된다.
  + /Addition/ Backtick (`)으로 감싸도 된다.
  + e.g, ""(empty string), 'testing', "name"

+ Single quote를 쓸 때는 영어의 contraction이나 possessives와 혼동하지 않도록 주의해야한다. 
  + e.g., *can't*, *O'Reilly's*
  + 문자 그대로 '를 쓰고 싶을 때는 앞에 backslash(\\)를 붙여 사용한다.
+ HTML에서도 quote를 사용하기 때문에 JavaScript와 HTML 코드를 혼용해서 사용할 때는 각 언어가 특정한 style의 quote만 쓰도록 하는 것도 좋은 방법이다.

### 3.2.2. Escape Sequences in String Literals
JavaScript에서 Backslash character (\\)는 다음과 같이 사용된다.

+ 다른 character와 결합해서 문자열로 표현할 수 없는 문자를 나타낸다.
  + e.g., `\n`은 새로운 줄(개행)을 나타내는 *escape sequence*이다.
+ 문법적(?)으로 사용되는 문자들의 일반적인 사용에서 벗어날 수 있다.
  + single quote character를 string을 표현하는 용도가 아닌 문자로 사용
  + e.g., `'You\'re right, it can\'t be a quote'`
+ 그 외의 escape sequence는 서적 참고 (Table 3-1)
  + \를 목록 외의 문자와 함께 사용하면 backslash는 그냥 무시된다.

### 3.2.3 Working with Strings
+ JavaScript는 string을 연결(*concatenate*) 할 수 있다.
  + `+` operator를 사용해서 string을 순서대로 붙여나간다.
  + e.g., `"Hello, " + "world"; // => "Hello, world"`

+ String에 여러 method를 사용할 수도 있다.
  + e.g., `s.length`: string `s`의 길이를 구함.
  + String이 immutable 하기 때문에 `replace()`나 `toUpperCase()`같은 method들은 적용한 결과를 새 string으로 return해서 표시한다.
  + 그 외 예시는 서적 참고.

### /Addition/ Template Literals
+ ES6 부터는 string literal이 backticks(`)으로 구분이 가능하다.
  + ```js
    let s = `hello world`;
    ```
+ 이것이 단순히 새로운 string literal 문법이 추가된 것 이상으로 중요한 이유는 이 **_template literal_** 이 임의의 JS expression을 담을 수 있기 때문이다.
  + ```js
    let name = "Bill";
    let greeting = `Hello ${name}.`; // greeting == "Hello Bill."
    ```
  + `${ ... }` 안의 내용은 JavaScript expression으로 interpreted 된다.
+ 담을 수 있는 expression의 수는 제한이 없고 (any number of expressions) normal string으로 사용하는 어떤 escape character라도 넣을 수 있으며, 여러줄에 써도 된다 (any number of lines).
  + ```js
    let errorMessage = `\
    \u2718 Test failure at ${file}":${linenumber}:
    Stack trace:
    ${exception.stack}
    `;
    ```

#### Tagged template literals
+ 강력하지만 보다 드물게 사용되는 template literal의 feature
+ 함수의 이름(or "tag")이 opening backtick 바로 직전에 오면 template literal 안의 expression의 값이 함수로 전달된다.
+ 이 "tagged template literal"의 value는 함수의 return 값이 된다.

+ ES6에 built-in tag function이 한 개 존재: `String.raw()`
+ backslash escape을 수행하지 않고 backtick 안의 text를 반환한다.
```js
`\n`.length           // => 1: 하나의 newline 문자
String.raw`\n`.length // => 2: backslash 문자와 n
```
invocation을 위해 괄호가 사용되지 않는다.
특별한 경우 backtick character가 괄호를 대신한다.

### 3.2.4 Pattern Matching
+ JavaScript는 `RegExp()` contructor로 textual pattern을 갖는 object를 만들 수 있다.
+ 이 'pattern'은 *regular expressions*으로 표현된다.
  + Perl의 regular expression 문법을 채택했다.
+ 한 쌍의 slash (/) 사이의 text가 regular expression literal을 구성한다.
  + 한 쌍에서 뒤 쪽의 slash에 문자를 추가로 적으면 pattern의 설정(meaning)을 바꾼다.

## 3.3 Boolean Values
Boolean value는 truth나 falsehood를 나타낸다.
+ Boolean type의 value는 단 두 개이다.
+ `true`와 `false`

+ Boolean value는 주로 비교의 결과로서 사용된다.
  + e.g., `a == 4`에서 `a`가 4이면 `true`를 아니면 `false`를 반환
+ Boolean value는 JavaScript의 control struture에서 주로 사용된다.
  + e.g., `if/else`문을 사용하면 `true` `false`일 때 수행하는 action이 다르다.

+ 모든 JavaScript value가 boolean value로 바뀔 수 있다.
  + 다음의 value는 `false`처럼 동작한다: undefined, null, 0, -0, NaN, ""(empty string)
  + 이를 *falsy* value라고 한다.
  + 그 외의 value는 `true`처럼 동작하고 이를 *truthy* value라고 한다.
  + e.g, `if(o)`: variable `o`가 truthy이면 수행. null등의 falsy이면 수행하지 않는다.

+ Boolean은 그 값을 "true"나 "false"로 나타내주는 `toString()` method를 갖는다.
+ 그 외는 딱히 유용한 method가 없다.

+ 대신 세 개의 중요한 boolean operator를 갖는다.
  + `&&` operator: 'AND' operation. 두 개의 operand가 모두 truthy여야 true를 반환한다. 
  + `||` operator: 'OR' operation. 두 개의 operand 중 하나만 truthy여도 true를 반환한다. 즉, 둘 다 falsy여야 false를 반환한다. 
  + `!` operator: 'NOT' operation. operand가 falsy면 true를 truthy면 flase를 반환한다.

## 3.4 null and undefined
+ `null`: value 값이 없는 것을 나타내기위해 사용되는 special value.
  + `typeof` operator를 사용하면 object를 반환한다.
  + 'no object'를 나타내는 special object로 생각할 수도 있다.
+ `undefined`: value 값이 없는 것을 나타내는 다른 종류의 value. 더 구체적(deeper)으로 나타낸다.
  + 초기화(initialize)되지 않은 variable이나
  + element가 없는 object property나 array
  + return하는 값이 없는 function의 value
  + argument가 주어지지 않은 function parameter의 값을 나타낸다.
  + `typeof` operator를 사용하면 undefined를 반환한다.

+ `null`과 `undefined`는 다르지만 상호 호환해서 사용할 수 있다.
  + `==` operator는 두 value를 같다고 여긴다. (`===`는 아님).
  + 둘 다 falsy value이다.
  + 어떤 property나 method도 갖지 않는다.

+ `undefined`가 system-level의 예상하지 못한 error에 가까운 value의 부재를 나타낸다면
+ `null`은 program-level의 예상가능한 value의 부재를 나타낸다.
  + 둘 중 하나를 assign 한다면 많은 경우에 `null`이 적절.

## 3.5 The Global Object
One very important object

JavaScript interpreter가 시작할 때 다음의 initial property를 포함한 새 global object를 생성한다.
|property|example|
|---|---|
|global properties | `undefined`, `Infinity`, `NaN`|
|global functions | `isNaN()`, `parseInt()`, `eval()`|
|constructor function | `Date()`, `RegExp()`, `String()`, `Object()`, `Array()`|

+ Top-level code에서 global object를 참조하기 위해서 `this`라는 JavaScript keyword를 사용 할 수 있다.
+ Client-side JavaScript에서 Window object가 global object의 역할을 한다.
  + `this` 대신 자기 자신을 참조하는 `window` property를 사용한다.
+ global object는 program에서 정의된 global도 포함할 수 있다. Code가 global variableㅇ르 선언하면 global object의 property로 저장된다.

## 3.6 Wrapper Objects
새 버전에서 대부분 생략.

JavaScript의 object는 property와 named value가 모여있는 것이다.
+ property의 value는 `.` notation을 이용해 사용(refer)할 수 있다.
+ property의 value가 function일 때는 특별히 *method*라고 부른다.
  + `o`라는 object의 method `m`은 `o.m()`와 같이 사용할 수 있다.

Object가 아닌 string도 property와 method를 갖는다
```js
/* example */
var s = "hello, world!"; // String
var word = s.length; // Use string property
```
+ 이는 string `s`의 propery를 참조하려 할 때마다 JavaScript는 `new string(s)`를 호출해서 string value를 object로 변환하기 때문이다.
  + 이 object는 string method를 상속받는다
  + property를 이용하고 나면 이 object는 없어진다.

다음의 예시에서:
```js
var s = "test" // string value
s.len = 4 // property 값을 설정
var t = s.len; // => undefined
```
+ String propery를 '읽으'려고 할 떄는 object처럼 행동하지만
+ Property의 'value를 설정'하려고 한 시도는 무시된다.
+ 이는 `s.len`에 값을 입력한 object가 없어지기 때문이다. 

+ Number과 boolean도 유사한 method를 갖는다.
  + `Number()`과 `Boolean()`을 이용해서 object를 만들 수 있다.
+ `null`과 `undefined`를 위한 wrapper object는 존재하지 않는다.
  + 위 value들의 property에 접근하려고 하면 `TypeError`가 발생한다.

String, number, boolean의 property에 접근하기 위해 임시로 만드는 object를 *wrapeer object*라고 한다.
+ 실제로는 구현 세부사항으로 여기고 크게 신경쓰지 않아도 된다.

## 3.7 Immutable Primitive Values and Mutable Object References
JavaScript의 Primitive value와 Object value 사이의 fundamental한 차이점

+ Primitives는 immutable하다.
  + String 역시 애매해보이지만 immutable하다.
  + ```js
    var s = "hello";
    s.toUpperCase(); // "HELLO"를 반환하지만 s는 유지된다.
    s // => "hello"
    ```
+ Primitive는 *value*로 비교한다.
  + 두 value가 같은 값을 가질 때 두 value를 같다고 할 수 있다.
  + String의 경우 두 value가 같은 길이를 갖고 각 index의 문자가 모두 같을 때 같다고 한다.

+ 반대로 Object는 mutable하고 value로 비교되지 않는다.
  + 동일한 property와 value를 갖는 object라도 같다고 하지 않는다.
  + e.g., 두 array는 같은 element를 같은 order로 갖고 있어도 같다고 하지 않는다.
  + ```js
    var o = {x:1}, p = {x:1};
    o === p // false
    ```
+ Object는 *reference*로 비교한다.
  + Object는 가리키고(refer)있는 기본 object가 동일해야 같다고 할 수 있다.
  + ```js
    var a = [];
    var b = a; // b refers same array as a
    b[0] = 1;
    a[0] // => 1
    a === b // => true
    ```
  + 이런 이유로 Object를 reference type이라 부르기도 한다.
  + Object를 복사하고 싶으면 object의 property나 array의 element를 명시적으로 복사해야한다. (Refer하는게 아님)
  + 분리된(distinct) 두 object를 비교하고 싶으면 object 자체가 아닌 각 property나 element를 비교해야 한다.

## 3.8 Type Conversions
JavaScript는 value의 type이 유동적(flexible)이다.

+ e.g., Booleans: boolean이 필요한 경우 truthy value는 true로 falsy value는 false로 바뀐다.
+ e.g., `"7" * "4"`의 결과는 `28` (string to number)
+ 그 외의 예시와 변환 유형은 서적 참고 (Table 3-2)

### 3.8.1 Conversions and Equality
JavaScript의 value를 유동적이게 바꿀 수 있듯이 `==` equality operator 역시 유동적으로 적용된다.

```js
null == undefined
"0" == 0 // string이 비교 전에 number로 변환
0 == false // Boolean이 비교 전에 number로 변환
```

+ `==` operator로 비교하기 전에 이뤄지는 변환은 추후에 자세히 다룸
+ 두 value의 convertibility가 두 값이 항상 같다는 것을 의미하는 것이 아니라는 것을 명심해야한다.

### 3.8.2 Explicit Conversions
값을 명시적으로 변환하는 법

+ `Boolean()`, `Number()`, `String()`, `Object()` 함수를 사용해서 각 type으로 변환
+ `null`과 `undefined`를 제외한 값을 string으로 변환 할 때에는 `toString()` method를 이용할 수도 있다.
+ `null`과 `undefined`를 변환하려고 하면 TypeError가 발생
  + `Object()` function은 예외적으로 빈 object를 반환한다.

특정 JavaScript operator는 값을 암시적으로 변환한다.

| operator | 변환 내용 | example |
| --- | --- | --- |
| `+` operator | operand를 string으로 변환 | `x + ""`: x를 string으로 변환 |
| Unary `+` operator | operand를 number로 변환 | `+x`: x를 number로 변환 |
| Unary `!` operator | operand를 boolean으로 변환 | `!!x`: x을 boolean으로 변환 |

JavaScript에는 number-to-string, string-to-number 변환을 더 상세하게 할 수 있는 function과 method가 존재한다.

+ Number-to-string
  | method/function | 설명 | example |
  | --- | --- | --- |
  | `toString()` | argument로 기수('몇'진수인지)를 지정해서 변환 |`n.toString(2)`면 n을 2진수로 나타낸 것을 string으로 바꾼다 |
  | `toFixed()` | decimal point후에 표시될 자릿수를 지정 | `n.toFixed(3)`: n을 소숫점 세 자리까지 표시 |
  | `toExponential()` | exponential notation을 이용해서 변환 <br> argument로 넘기는 것은 decimal point후에 표시될 자릿수 | |
  | `toPrecision()` | 지정한 개수의 유효숫자만 표시 <br> 지정한 수가 실제 자릿수보다 부족하면 exponential notation을 사용한다 | `n = 123.45` <br> `n.toPrecision(2)`는 `"1.2e+2"` <br> `n.toPrecision(4)` 는 `"123.4"` |

+ String-to-number
  | method/function | 설명 |
  | --- | --- |
  | `Number()` | 10진수의 정수나 floating-point literal로 변환 |
  | `ParseInt()` | argument중 integer만 반환 |
  | `ParseFloat()` | argument중 integer와 floating-point number만 반환|
  
  + `ParseInt()`와 `ParseFloat()`에 대한 자세한 사항은 서적 참고.

### 3.8.3 Object to Primitive Conversions (/Addition/)
JavaScript의 object-to-primitive 변환이 복잡한 이유는 object가 한 개 이상의 primitive representation을 가질 수 있기 때문이다.

Object-to-primitive conversion에는 세 개의 fundamental algorithm이 있다.
+ *prefer-string*: String으로 변환이 가능하면 string value로 변환하는 것을 선호.
+ *prefer-number*: Number로 변환이 가능하면 number value로 변환하는 것을 선호.
+ *no-preference*: 선호되는 primitive type이 존재하지 않고 class가 자신의 변환 방식을 결정할 수 있다.

#### Object-to-boolean conversions
+ Object-to-boolean: 모든 object는 `true`로 변환.
+ 위에서 언급한 object-to-primitive 변환 algorithm을 사용할 필요 없이 변환.

#### Object-to-string conversions
+ 우선 JavaScript가 *prefer-string* algorithm을 이용해 primitive로 변환한 뒤
+ primitive value를 string으로 변환한다.

#### Object-to-number conversions
+ 우선 JavaScript가 *prefer-number* algorithm을 이용해 primitive로 변환한 뒤
+ primitive value를 number로 변환한다.

#### Special case operator conversions
+ Basic object-to-string/number 변환을 사용하지 않는 special case operators.
+ `+ operator`
  + operand 둘 중 하나가 object일 때,
  + *no-preference* algorithm을 이용해서 primitive value로 변환
+ `==` and `!= operator`
  + 하나의 operand는 object이고 나머지 operand는 primitive value일 때,
  + *no-preference* algorithm을 사용해서 object를 primitive value로 변환
+ relational operators: `<`, `<=`, `>`, `>=`
  + operand 둘 중 하나가 object일 때,
  + *prefer-number* algorithm을 이용해서 primitive value로 변환 
  + 다른 경우와 다르게 return된 primitive value를 number로 변환하지 않는다.

#### The toString() and valueOf() methods**
모든 object는 두 개의 conversion method를 갖는다.
+ `toString()`: object의 string 형태를 반환.
  + 일반적인 object는 `[object Object]`를 반환하지만 몇몇 class들은 특별한 `toString()` method 결과를 반환한다.
  + | class | 설명 |
    | --- | --- |
    | Array class | Object의 element를 ,로 구분해서 반환 |
    | Function class | implementation-defined representation(주로 사용자가 입력한 function자체)을 string으로 반환 |
    | Date class | 사람이 읽을 수 있는 형식으로 날짜와 시간을 반환 |
    | RegExp class | RegExp object를 string으로 반환. RegExp literal과 동일하게 나타난다 |
+ `valueOf()`: object를 이를 잘 나타내는 primitive value로 변환.
  + 대부분의 object는 한 종류의 primitive value로 나타낼 수 없어 기본적으로 `valueOf()`의 결과는 object 자체이다.
  + Array, Function, RegExp도 기본 method와 동일하게 object 자체를 반환한다.
  + | class | 설명 |
    | --- | --- |
    | Wrapper class | wrapped된 primitive value 반환 |
    | Date class | date를 internal representation으로 변환하여 반환 |

#### Object-to-primitive conversion algorithms
위의 두 method로 앞의 세 object-to-primitive algorithm이 작동하는 방식을 설명할 수 있다.
+ *prefer-string*
  + Object가 `toString()` method를 갖는 경우 우선적으로 호출하여 primitive value를 반환받는다.
  + `toString()` method가 존재하지 않으면 `valueOf()` method를 호출하여 primitive value를 반환받는다.
  + 반환받은 primitive value는 JavaScript가 string으로 변환한다.
  + JavaScript가 primitive value를 반환받지 못하면 TypeError가 발생한다.
+ *prefer-number*
  + *prefer-string*과 유사하게 동작하지만
  + `valueOf()`이 `toString()`보다 우선적으로 호출된다.
+ *no-preference*
  + *no-preference algorithm*은 변환되는 object의 class에 depend한다. 
  + Date object인 경우 *prefer-string*이 그 외는 *prefer-number* algorithm이 사용된다.

## 3.9 Variable Declaration (/Addition/ & Assignment)
Computer programming의 기본적인 기술 중 하나는 값(value)을 표현하는데 이름(identifier)을 사용하는 것이다.

+ 이를 위해 우선 value를 *variable*에 할당해야한다.
  + variable이란 용어는 새로운 값을 다시 할당할 수 있다는 것을 의미한다.
+ 어떤 값을 영구적으로 할당하는 경우 variable이 아닌 *constant*라고 한다.

Variable이나 constant를 사용하기 위해서는 우선 선언(*declare*)해야한다.

+ ES6 이후부터는 `let` 과 `const` keywords를 이용해 각각을 선언한다.
+ ES6 이전에는 `var` keyword를 이용해서 선언했다.

### Delcarations with let and const
+ modern JavaScript에선s variable을 `let` keyword로 선언한다.
  ```js
  let i;
  let sum;
  ```
+ 여러 variable을 한 번에 선언할 수도 있다.
  ```js
  let i, sum;
  ```
+ variable 선언과 초기화(initialization)을 동시에 할 수도 있다.
  ```js
  let message = "hello";
  let i = 0, j = 0, k = 0;
  ```
+ variable을 선언할 때 초기화 하지 않으면 value를 저장할 때 까지 variable의 값은 `undefined` 상태이다.

+ constant를 선언하고 싶으면 `let`대신에 `const`를 사용하면 된다.
  + 선언할 때 바로 초기화를 해줘야 한다는 것을 제외하고는 `let`과 비슷하게 동작한다.
  + constant는 그 값이 바뀔 수 없고 그러려고 시도하면 TypeError가 반환된다.
+ 일반적인 variable과 구분하기 위해 관례적으로 constant는 모든 단어를 대문자로 선언한다.

+ `for`, `for/in`, `for/of`등의 loop을 사용할 때 loop variable을 loop synatax의 일부로 취급한다.
  + `let`을 loop variable로 사용하면 다음과 같다.
    ```js
    for(let i = 0; len = data.length; i < len; i++);
    ```
  + `const`역시 loop variable을 선언하는데 사용할 수 있다.

#### Variable and constant scope
Variable의 *scope*는 프로그램의 전체 source code중 variable이 정의되어있는 영역이다.

+ `let`과 `const`로 선언된 variable과 constant는 *block scope*을 갖는다.
  + 이는 variable이나 constant가 `let`이나 `const` statement가 나타나는 코드 영역(block) 안에서만 정의되어 있는 것을 의미한다.
  + variable이나 constant가 curly braces 안에 선언되어 있다면 그 curly braces가 variable이나 constant가 정의된 영역을 제한한다.
  + variable이나 constant가 loop의 일부분으로 선언되어 있으면 loop body가 이들의 scope이 된다.
+ declaration이 top level (out side of any code block)에서 이뤄지면 이를 *global* varaible 혹은 constant라고 하고 이들은 global scope를 갖는다.
  + Node나 client-side에서 global variable의 scope은 그것이 정의된 파일 전체이다.
  + Traditional client-side에서는 global variable의 scope은 그것이 정의된 HTML document 내부이다.

#### Repeated declarations
+ 같은 scope 내에서 `let`이나 `const` declaration으로 같은 이름의 variable이나 constant를 선언하면 syntax error가 발생한다.
+ nested scope에서는 같은 이름의 variable이나 constant를 선언하는 것이 가능(legal)하다.

#### Declaration and types
+ 다른 type langauge와 다르게 선언시 별도의 type을 명시하지 않는다. JavaScript의 variable은 어떤 type의 value라도 저장할 수 있다.

### Variable Declarations with var
ES6 이전 버전에서는 variable은 `var` keyword를 이용해서만 선언할 수 있었다.
+ `var`의 syntax는 `let`의 syntax와 유사하다.

`var`과 `let`의 syntax는 유사하지만 중요한 차이점들이 존재한다.

+ `var`로 선언한 varaible은 block scope을 갖지 않는다.
  + 이들의 scope는 variable을 포함하는 function의 body이다.
+ `var`로 선언한 global variable은 global object의 property로 구현된다.
  + `globalThis`를 이용해서 참조할 수 있다.
  + `delete` operator로 삭제하지 못한다.
  + `let`과 `const`로 선언한 varaible은 global object의 property가 아니다.
+ `var`을 이용하면 동일한 이름의 variable을 여러번 선언하는 것이 가능하다.
+ `var` declation은 *hoisting*이라는 특이한 성질을 갖는다.
  + variable이 선언되면 해당 선언이 이를 둘러싸고 있는 함수 가장 위로 이동 (hoisted)한다.
  + initialize code가 실행되기 전이라면 variable이 `undefined`를 반환하긴 하지만 error를 발생시키지는 않는다.

#### Using Undeclared Variables
+ `let`, `const`, `var`로 선언되지 않은 name에 값을 대입하면 새로운 global variable을 생성한다.

### Destructuring Assignment
ES6에서 복합적으로 declaration and assignment하는 syntax가 새롭게 도입되었다.

+ 이를 *destructuring assignment*라고 한다.
  + 등호 오른쪽에는 array나 object가 온다.
  + 등호 왼쪽에는 array나 object의 literal syntax와 유사한(mimics) syntax를 갖는 한 개 이상의 varaible이 온다.

+ function이나 loop에서도 사용 가능하다.
+ destructuring assignment 왼쪽의 variable 수는 오른쪽의 array element와 같을 필요는 없다.
+ 오른쪽의 value중 사용하지 않거나 남은 것들을 하나의 variable에 모두 모으려면 마지막 variable에 세 개의 점 (...)을 사용한다.
+ destructuring assignment에 nested array도 사용할 수 있다.

+ destructuring의 값으로는 굳이 array가 아니더라도 어떤 *iterable* object든 올 수 있다.
+ object의 global function을 variable에 복사할 수도 있다.

---
**하단의 내용은 전부 `var` declaration에 대한 보충설명.**

### 3.9.1 Repeated and Omitted Declarations
+ 동일한 variable을 여러번 `var` statement로 선언하는 것은 문제되지 않는다.
  + 중복된(repeated) 선언이 initializer를 포함하면 assignment state처럼 동작한다.
+ 선언되지 않은(undeclared) varaible에서 값을 읽으려고 하면 JavaScript가 error를 표시한다.

## 3.10 Variable Scope
Variable의 *scope*는 프로그램의 전체 source code중 variable이 정의되어있는 영역이다.

+ *global* variable: global scope를 갖는다. 프로그램 어디에서든 접근 가능하다.
+ *local* variable: function 안에 정의된 variable로 그 function의 body 내에서만 유효하다.
  + function parameter 역시 local variable로 분류한다.

+ Function의 body내에서는 local variable이 global variable보다 우선시된다.
  + global variable과 동일한 local variable을 function내에 선언하면 global variable을 가리는(hide) 처럼 된다.
+ Global variable은 `var` statement 없이 선언 가능하지만 local variable은 반드시 `var`를 사용해야한다.
  + 자세한 예시는 서적 참고.

### 3.10.1 Function Scope and Hoisting
+ 몇몇 C-like programming langauge는 *block scope*를 형성한다.
  + Curly braces {} 안의 code block이 그 자체의 scope를 형성하는 것이다.
  + JavaScript는 해당되지 않는다.
+ JavaScript는 대신 *function scope*를 형성한다.
  + variable이 그것이 정의된 function 안에서 유효하다.
  + 그 안에 중첩된 모든 function에서도 유효하다.

이는 function안에서 선언된 모든 variable이 function 전체에서 사용가능하다(visible)는 것을 의미한다. 즉, 선언되기 전에도 variable을 사용할 수 있다.

+ JavaScript의 이런 특성을 *hoisting*이라고 한다.
+ JavaScript의 code는 function안에서 모든 varaible의 선언이 상단에 "걸려(hoisted)"있다.
+ 이러한 이유로 일부 프로그래머들은 variable을 function의 최상단에 선언하기도 한다.

### 3.10.2 Variables As Properties
Global variable을 선언하는 것은 global object의 property를 정의하는 것과 같다.

+ `var`를 사용해 variable을 선언하면 생성된 property는 nonconfigurable하다.
  + `delete` operator로 삭제가 불가능하다.
+ strict mode가 아닐 때, 선언되지 않은 varaible에 값을 할당하면 자동으로 global variable이 생성된다.
  + 이렇게 만들어진 variable의 property는 configurable하다.

이와 비슷하게 local variable은 각 function이 호출되는 것과 관련된 object의 property라는 것을 알 수 있다.

+ 이 object를 ECMAScript 3에서는 call object라고 불렀고,
+ ECMAScript5에서는 declarative environment record라고 부른다.

### 3.10.3 The Scope Chain
JavaScript는 *lexically scoped* language이다. 
+ variable의 scope를 variable이 정의된 source code line으로 생각할 수 있다.

위에서 얘기한 것 처럼 local variable을 implementation-defined object라고 생각하면 variable의 scope를 다른 방식으로 생각해볼 수 있다.

+ 각 JavaScript code 덩어리가 자신과 관련된 *scope chain*을 갖고있는 것으로 생각한다.
+ Scope chain은 variable이 "scope 안"에 있다는 것을 정의하는 object들의 연결(chain)으로 볼 수 있다.
+ 예를 들어, variable `x`의 값을 찾기 위해서 JavaScript는 scope chain의 첫 번째 object부터 chain을 따라가면서 `x`와 일치하는 property를 찾고, 찾으면 그 property의 값을 사용한다.

+ Top-level JavaScript code는 한 개의 scope chain만을 갖는다. Global object.
+ Non-nested function은 두 개의 obejct가 chain object를 이룬다. 
  + Function의 parameter와 local variable를 정의하는 object와
  + global object
+ Nested function은 세 개 이상의 object가 chain object를 이룬다.
  + Function이 정의되면 scope chain을 저장한 뒤 사용한다.
  + 그 function이 호출되면 local variable이 저장될 새 obejct를 만들어 저장한 scope chain에 이어 호출된 function의 scope을 표시한다.
  + 밖의 function이 호출될 때 마다 scope chain도 달라지고, nested function도 새로 정의되기 때문에 nested function의 code가 변하지 않아도 관련된 scope chain은 계속 달라진다.

## 참고
Code point, Code space
+ [Codepoint](http://unicode.org/glossary/#codepoint) by Unicode glossary
+ [Codespace](http://unicode.org/glossary/#codespace) by Unicode glossary
+ [Codepoint](https://en.wikipedia.org/wiki/Code_point) by Wikipedia

Unicode and Character Set
+ [The Absolute Minimum Every Software Developer Absolutely, Positively Must Know About Unicode and Character Sets](https://www.joelonsoftware.com/2003/10/08/the-absolute-minimum-every-software-developer-absolutely-positively-must-know-about-unicode-and-character-sets-no-excuses/) by JOEL ON SOFTWARE

Control Structures
+ [Control Structures in Programming Languages](https://www.geeksforgeeks.org/control-structures-in-programming-languages/) by GeeksForGeeks

String immutability
+ [객체와 변경불가성](https://poiemaweb.com/js-immutability) by Poiemaweb
+ [Are JavaScript strings immutable?...](https://stackoverflow.com/questions/51185/are-javascript-strings-immutable-do-i-need-a-string-builder-in-javascript/4717855) by stackoverflow

Reference in JavaScript
+ [Learning how references work in JavaScript](https://medium.com/@naveenkarippai/learning-how-references-work-in-javascript-a066a4e15600) by Naveen Karippai

Unary operator
+ [JavaScript Unary Operators: Simple and Useful](https://scotch.io/tutorials/javascript-unary-operators-simple-and-useful#toc-what-is-an-unary-operator-) by Esther Dama Kahindi
+ [Operators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators) by MDN
