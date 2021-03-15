---
layout  : wiki
title   : Chapter 2. Lexical Structure
summary : 
date    : 2020-05-31 16:59:19 +0900
updated : 2020-07-06 22:20:09 +0900
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

Lexical Structure: 해당 언어로 프로그램을 작성하기 위해 특정한 기본적인 규칙.

## 2.1 Character Set
+ JavaScript 프로그램은 Unicode character set을 이용해서 적는다.

### 2.1.1 Case Sensitivity
+ JavaScript는 case-sensitive 하다.
+ HTML은 case-sensitive 하지 '않기' 때문에 주의해야한다.

### 2.1.2 Whitespace, Line Breaks, and Format Control Characters
+ JavaScript는 프로그램의 token 사이에 나타나는 space와 대부분의 line breaks를 무시한다.
+ 일반적인 space character (`\u0020`)나 line breaks 외에도 다른 같은 문자를 whitespace나 line terminator로 인식한다. 목록은 서적 참고.
+ Format control character는
  + comment, string literals, regular expression literals에는 사용할 수 있지만
  + identifiers (e.g., variable names)에는 사용할 수 없다.

### 2.1.3 Unicode Escape Sequences
+ Unicode를 지원하지 않거나 일부만 지원하는 경우를 위해 JavaScript는 모든 16-bit Unicode codepoint를 나타낼 수 있는 여섯 자리의 ASCII문자를 정의해놨다.
+ `\u`로 시작하고 네 개의 16진수 숫자로 이루어져있다. 

```js
"café" === "caf\u00e9" // => true
```

### 2.1.4 Normalization
+ Unicode는 동일한 문자가 여러 방식으로 encoding되어 있을 수 있기 때문에 Unicode standard는 보다 원활한 비교를 위해 선호되는 encoding과 text를 canonical form으로 변환하는 normalization 과정을 정해놨다.
+ JavaScript는 interpret하는 소스 코드가 이미 nomalized되어 있다고 가정한다.

## 2.2 Comments
JavaScript의 주석(comments)은 두 가지 방법으로 작성할 수 있다.
+ `//`와 문장 끝 사이의 text는 주석처리.
+ `/*`와 `*/` 사이의 text는 주석처리.

## 2.3 Literals
**Literal** 프로그램에 직접 명시되는 데이터 값.

|Example|설명|
|---|---|
|`12`|숫자 12|
|`1.2`|숫자 1.2|
|`"hello world"`|문자열 (`""`사용)|
|`'Hi'`|다른 문자열 표기법 (`''`사용)|
|`true`|Boolean 값|
|`false`|다른 Boolean 값|
|`\javascript\gi`|정규표현식(Regular expression)|
|`null`|object가 존재하지 않을 때|

## 2.4 Identifiers and Reserved Words

**Identifier** 간단하게는 이름이다. 변수(variables)나 함수(functions)나 반복문(loops)에 이름을 제공할 때 사용된다.

+ JavaScript의 identifier는 letter, underscore (`_`), dollar sign (`$`)으로 시작해야한다.
+ 이어지는 문자로는 위의 세 개에 숫자(digits)까지 사용 할 수 있다.
+ 숫자와 문자는 모든 Unicode character set을 포함한다.

### 2.4.1 Reserved Words

몇 개의 identifier는 이미 JavaScript의 언어 자체의 keywords로 사용되고 있어 자신이 만든 프로그램의 identifier로 사용할 수 없다.

자세한 사항과 목록은 서적 참고.

## 2.5 Optional Semicolons

JavaScript는 statement를 구분하기 위해서 semicolon (`;`)을 사용한다. Semicolon을 표기하는 것은 자신의 코드의 의미를 명확하게 만드는데 중요하다.

프로그래머마다 semicolon을 표기하는 법이 다르며
+ 모든 statement에 명시적(explicitly)으로 semicolon을 찍어주는 경우가 많지만
+ 필요한 곳에만(optionally) semicolon을 표기해주기도 한다.

Optional하게 semicolon을 사용하기 위해서는 다음의 몇 가지 사항을 이해하고 있어야한다.

+ JavaScript는 모든 line break를 semicolon으로 취급하지 않는다. 일반적으로 semicolon없이 코드 구문을 해석할 수 없을때만 line break를 semicolon으로 취급한다.

  ```js
  var a
  a
  =
  3
  console.log(a)

  // how JavaScript interprets
  var a; a = 3; console.log(a)
  ```

+ 이런 규칙때문에 일부 코드는 의도와 다르게 인식될 수 있다.

  ```js
  var y = x + f
  (a+b).toString()

  // can be interpreted as
  var y = x + f(a+b).toString();
  ```

+ 일반적으로 statement가 `(`, `[`, `/`, `+`, `-` 등으로 시작하면 statement가 이전 statement와 연속되어 있다고 인식될 수 있다.


+ `return`, `break`, `continue` statement 뒤에 바로 오는 line break는 항상 semicolon으로 인식한다. (+ `throw`, `yield`)
  ```js
  x
  ++
  y

  // interpreted as
  x; ++y;
  // not as
  x++; y;
  ```
+ "arrow" syntax를 사용해서 정의한 function.

## 참고
Token
+ [Lexical Token](https://en.wikipedia.org/w/index.php?title=Lexical_token) by Wikipedia

Unicode
+ [Fileformat.info - Unicode](http://www.fileformat.info/info/unicode/index.htm)

Control Characters
+ [Control Characters](https://en.wikipedia.org/wiki/Control_character) by Wikipedia
+ [특수문자모음](https://johngrib.github.io/wiki/special-chars/) by 기계인간
+ [제어문자](https://zetawiki.com/wiki/제어_문자) by 제타위키

Unicode Normalization
+ [Unicode Normalization](https://en.wikipedia.org/?title=Unicode_normalization) by Wikipedia
+ [유니코드 정규화](https://ko.wikipedia.org/wiki/유니코드_정규화) by 위키백과
