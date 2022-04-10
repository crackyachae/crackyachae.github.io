---
layout  : article
title   : 유용한 문자열 메소드 (Useful string methods)
summary : 
date    : 2021-12-03 20:42:53 +0900
updated : 2021-12-05 12:05:53 +0900
tag     : draft
toc     : true
public  : true
parent  : [[mdn-learn-web-js]]
latex   : false
---
* TOC
{:toc}

> 이 글은 MDN Learn web development의 [JavaScript First Step](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/First_steps) 중 [Useful string methods](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/First_steps/Useful_string_methods)의 내용을 번역 및 정리한 글입니다.
>
> * 제가 필요한 부분 위주로 확인하면서 정리하고 있어 글에 덜 작성된 부분이 있을 수 있습니다.
> * 글 작성 후 원문의 내용이 수정되거나 내용을 이해하기 위한 개인적인 설명이나 해석이 있을 수 있습니다. 되도록 원문을 참고해주시길 바랍니다.
> * 잘못된 부분이 있다면 댓글이나 그 외 편하신 방법으로 알려주시면 감사하겠습니다.

## 객체로서의 문자열 (Strings as objects)

자바스크립트에서 대부분은 객체이다. 예를 들어 다음의 코드로 문자열을 만들면,

```js
const string = 'This is my string';
```

변수는 문자열 객체 인스턴스가 되고 그 결과로 수많은 속성과 메소드를 사용할 수 있게 된다. [`String`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) 객체 페이지로 이동해 페이지 측면의 목록을 내려 보면 이들을 확인할 수 있다.

## 문자열의 길이를 찾기 (Finding the length of a string)

`length` 속성을 사용한다.

```js
const browserType = 'mozilla';
browserType.length;
```

## 문자열의 특정 문자를 가져오기 (Retrieving a specific string character)

관련해서, **대괄호 표기법(square bracket notation)**으로 문자열 안의 어떤 문자든 반환할 수 있다 - 대괄호 표기법은 변수명 끝에 대괄호(`[]`)를 포함하는 것을 의미한다. 대괄호 안에는 반환하고 싶은 문자의 번호를 포함하므로 예를 들어 첫 번째 문자를 가져오고 싶다면 이렇게 한다:

```js
browserType[0];
```

기억하자: 컴퓨터는 1이 아니라 0부터 수를 센다!

## 문자열이 (특정) 하위 문자열을 포함하는지 확인하기 (Testing if a string contains a substring)

종종 (특정) 작은 문자열이 더 큰 문자열 안에 있는지(일반적으로 하위 문자열이 문자열 안에 있는지 라고 얘기한다)를 확인하고 싶을 것이다. 한 개의 매개 변수 - 찾고 싶은 하위 문자열을 사용하는 `includes()` 메소드를 사용해서 확인할 수 있다.

그 하위 문자열을 포함한다면 `true`를 그렇지 않다면 `false`를 반환한다.

```js
const browserType = 'mozilla';

if (browserType.includes('zilla')) {
  console.log('Found zilla!');
} else {
  console.log('No zilla here!');
}
```

종종 문자열이 특정 하위 문자열로 시작하거나 끝나는지도 확인하고 싶을 것이다. 이를 위한 두 특별한 메소드가 있을 정도로 충분히 일반적인 요구이다: `startsWith()`와 `endsWith()`

```js
const browserType = 'mozilla';

if (browserType.startsWith('zilla')) {
  console.log('Found zilla!');
} else {
  console.log('No zilla here!');
}
```

```js
const browserType = 'mozilla';

if (browserType.endsWith('zilla')) {
  console.log('Found zilla!');
} else {
  console.log('No zilla here!');
}
```

## 문자열에서 하위 문자열을 추출하기 (Extracting a substring from a string)

`slice()` 메소드로 문제열에서 하위 문자열을 추출할 수 있다. 메소드로 다음의 것을 전달한다:

* 추출하기 시작할 지점의 인덱스
* 추출을 끝낼 지점의 인덱스. 이는 제외되는(exclusive) 것으로, 이 인덱스 번째의 문자는 추출된 하위 문자열에 포함되지 않는다.

예를 들어:

```js
const browserType = 'mozilla';
console.log(browserType.slice(1, 4)); // "ozi"
```

특정 문자 다음의 나머지 문자를 모두 추출하고 싶다면, 두 번째 매개 변수는 포함하지 않아도 된다. 대신 문자열에서 나머지 문자를 추출할 위치만 포함하면 된다. 다음을 시도해보자:

```js
browserType.slice(2); // "zilla"
```

## 대소문자를 바꾸기 (Changing case)

문자열 메소드 `to LowerCase()`와 `toUpperCase()`는 문자열을 받아(take) 모든 문자를 각각 소문자 혹은 대문자로 바꾼다. 이는 모든 사용자 입력 데이터를 데이터베이스에 저장하기 전에 표준화시키고 싶은 경우에 유용하다.

아래의 줄들을 입력해서 어떤 일이 일어나는지 봐보자:

```js
const radData = 'My NaMe Is MuD';
console.log(radData.toLowerCase());
console.log(radData.toUpperCase());
```

## 문자열 일부를 수정하기 (Updating parts of a string)

`replace()` 메소드로 문자열 안의 한 하위 문자열을 바꿀 수 있다.

이 예제에서, 두 개의 매개 변수를 전달(provide)한다 - 바꾸고 싶은 문자열과 그 문자열을 대신할 문자열:

```js
const browserType = 'mozilla';
const updated = browserType.replace('moz','van');

console.log(updated);      // "vanilla"
console.log(browserType);  // "mozilla"
```

`replace`는, 다른 문자열 메소드와 마찬가지로, 이 메소드를 호출한 문자열을 (직접) 바꾸지 않고, 새로운 문자열을 반환한다는 것에 유의하자. 기존 `browserType` 변수를 바꾸고 싶다면, 다음처럼 해야 할 것이다:

```js
let browserType = 'mozilla';
browserType = browserType.replace('moz','van');

console.log(browserType);  // "vanilla"
```
