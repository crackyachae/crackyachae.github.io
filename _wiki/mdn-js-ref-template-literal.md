---
layout  : wiki
title   : Template Literal
summary : 
date    : 2020-12-14 22:54:25 +0900
updated : 2020-12-14 23:03:29 +0900
tag     : rough
toc     : true
public  : true
parent  : [[mdn-js-ref]]
latex   : false
---
* TOC
{:toc}

> 이 글은 MDN Reference중 [template literals](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals)의 내용을 복습하기위해 핵심 내용을 요약 정리한 글입니다.
>
> 내용을 이해하기 위한 개인적인 설명이나 해석이 있을 수 있기 때문에 되도록 원문을 참고해주시길 바랍니다.
> 잘못된 부분이 있다면 댓글이나 그 외 편하신 방법으로 알려주시면 감사하겠습니다.

내부에 expression을 포함할 수 있는 string literal. Double이나 single quote 대신 backtick(`)으로 감싸져있다. (backtick 대신 grave accent라고 하기도 함)

+ Expression interpolation : `${expression}` 을 사용.
  + `${}`를 placeholder 라고 부르는 것 같다.
  
+ multiline string을 표시하는 것이 가능하다.
  ```js
  /* 두 코드의 결과는 동일 */

  console.log('string text line 1\n' +
    'string text line 2');
    // "string text line 1
    // string text line 2"

  /* using template literals */
  console.log(`string text line 1
    string text line 2`);
    // "string text line 1
    // string text line 2"
  ``` 

## Nesting templates
placeholder를 중첩해서 nested된 코드를 간결하게 표현할 수 있다.

```js
/* without nesting */
const classes = `header ${ isLargeScreen() ? '' :
  (item.isCollapsed ? 'icon-expander' : 'icon-collapser') }`;

/* with nesting */
const classes = `header ${ isLargeScreen() ? '' :
  `icon-${item.isCollapsed ? 'expander' : 'collapser'}` }`;
```

## Tagged template literal
Expression preceding template literal.

Template literal이 expression을 본인 앞에 'tag'로 달았기 때문에 tagged template litereal 이라 표현하는 것 같다. 

+ "tagged template literal"의 value는 함수의 return 값이 된다.
  ```js
  let person = 'Mike';
  let age = 28;

  function myTag(strings, personExp, ageExp) {
    let str0 = strings[0]; // "That "
    let str1 = strings[1]; // " is a "

    // There is technically a string after
    // the final expression (in our example),
    // but it is empty (""), so disregard.
    // let str2 = strings[2];

    let ageStr;
    if (ageExp > 99){
      ageStr = 'centenarian';
    } else {
      ageStr = 'youngster';
    }

    // We can even return a string built using a template literal
    return `${str0}${personExp}${str1}${ageStr}`;
  }

  let output = myTag`That ${ person } is a ${ age }`;

  console.log(output);
  // That Mike is a youngster
  ```
+ string literal은 placeholder를 기준으로 구분되어서 하나의 string array로 전달되는 듯.
+ The first argument of a tag function contains an array of string values. 

## Raw strings
+ ES6의 built-in tag function `String.raw()`
+ Backslash escape을 수행하지 않고 backtick 안의 text를 반환한다.
+ ```js
  `\n`.length           // => 1: 하나의 newline 문자
  String.raw`\n`.length // => 2: backslash 문자와 n
  ```

Tagged template의 escape sequence는 버전마다 계속 수정사항이 생기는 것 같으니 별도로 확인해보기.