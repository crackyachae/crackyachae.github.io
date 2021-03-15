---
layout  : wiki
title   : Chapter 1. Introduction to JavaScript
summary : 
date    : 2020-05-31 15:26:39 +0900
updated : 2020-07-06 21:51:20 +0900
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

+ JavaScript는 Web을 위한 프로그래밍 언어이다.
+ JavaScript의 문법은 Java로부터, first-class function은 Scheme으로부터, prototype-based inheritance는 Self로부터 왔다.

### JavaScript: Names and Versions

+ JavaScript는 Netscape에서 처음 만들었고 당시 이 언어를 표준화(standardization)를 위해 ECMA에 제출하면서 ECMAScript라는 이름을 갖게되었다.
+ 책에서 주로 다루게 되는 버전은 ECMAScript version 3과 5이다. (Version 4는 문제가 많아 출시되지 않음)
+ 가끔 JavaScript version을 적어놓는 경우도 있는데 이는 Mozilla의 version number이고 기본적으로 version 1.5가 ECMAScript 3를 의미한다.

/addition/
+ 2015년에 ES6가 출시되면서 class와 module syntax를 포함해 주요한 새 기능들이 추가되었다.
+ ES6부터 버전을 출시연도에 따라 명명한다.
+ 이전 버전의 호환성 때문에 legacy feature을 삭제하지는 못했지만 ES5부터 초기 언어 실수가 많이 수정되도록 JavaScript *strict mode*를 선택할 수 있다.

+ Core JavaScript는 최소한의 API를 이루고 있으며 어떤 input / output functionality도 포함하지 않는다.
+ Input / output 기능들은 주로 'host environment'의 몫이며 일반적으로 web browser가 그 역할을 한다.

/addition/
+ 2010년 부터 web browser 외에 Node라는 새 host environment가 등장했다.
+ Node를 통해 JavaScript를 이용해서 operating system 전체에 접근할 수 있게 되었다.

이 책은 위의 두 주제를 큰 축으로 하고있다:
+ Part I: Core JavaScript. JavaScript 언어 자체와 최소한으로 내장된 API.
+ Part II: Client-side JavaScript. Web browser에서 JavaScript가 쓰이는 방식과 browser based API.
+ Part III: Core API reference.
+ Part VI: Client-side API reference.

## 1.1 Core JavaScript
**Part I**은 JavaScript 언어에 대한 것으로 다음과 같은 내용들을 다룬다.

JavaScript의 가장 기본적인(lowest) 내용.
+ Chapter 2 Lexial Structure: 기본적인 notation. Comments, semicolons, and the Unicode character set.
+ Chapter 3 Types, Values, and Variables: JavaScript의 variables와 values.

+ Chapter 4 Expression and Operators
+ Chapter 5 Statements

JavaScript의 type중에서 굉장히 중요한 두 개의 type, Objects와 Arrays는 별개의 chapter로 다룬다.
+ Chapter 6 Objects
+ Chapter 7 Arrays

Function은 코드를 작성한 뒤 이름과 parameter를 정해서 반복해서 사용할 수 있는 기능이다.
+ Chapter 8 Functions

JavaScript는 객체지향적(object-oriented) 언어이지만 다른 대부분의 언어와 약간 다룬다. Chapter 9에서는 JavaScriptd에서의 객체 지향적 프로그래밍에 대해 다룬다.
+ Chapter 9 Classes and Modules

Chapter 9이 Part I의 climax이며 이 이후로는 추가적인 내용이다.
+ Chapter 10 Pattern Matching with Regular Expressions
+ Chapter 11 JavaScript Subsets and Extensions
+ Chapter 12 Server-Side JavaScript

## 1.2 Client-Side JavaScript
**Part II**는 Web browser에서 JavaSript를 다루는 법에 대해 다룬다.

첫 번째로 JavaScript를 web browser에서 사용하기 위한 방법을 다룬다.
+ Chapter 13 JavaScript in Web Browsers

Web browser를 scripting하는 방법과 clien-side JavaScript의 몇 가지 중요한 global function에 대해 다룬다.
+ Chapter 14 The Window Objects

+ Chapter 15 Scripting Documents
+ Chapter 16 Scripting CSS
+ Chapter 17 Handling Events

프로그래머들은 위의 Chapter에서 사용된 API들을 보다 쉽게 사용할 수 있도록 client-side library나 framework를 사용한다. 그 중에서 가장 유명한 jQuery에 대해서 다룬다. 
+ Chapter 19 The jQuery Library

+ Chapter 18 Scripted HTTP
+ Chapter 20 Client-Side Storage
+ Chapter 21 Scripted Media and Graphics

마지막으로 HTML5와 관련된 새로운 web app API에 대해 다룬다
+ Chapter 22 HTML5 APIs

**Scripting**
+ [Scripting language](https://en.wikipedia.org/wiki/Scripting_language) by Wikipedia
+ [What’s the difference between Scripting and Programming Languages?](https://www.geeksforgeeks.org/whats-the-difference-between-scripting-and-programming-languages/) by GeeksforGeeks
+ [Difference Between Programming, Scripting, and Markup Languages](https://www.geeksforgeeks.org/difference-between-programming-scripting-and-markup-languages/?ref=rp) by GeeksforGeeks


