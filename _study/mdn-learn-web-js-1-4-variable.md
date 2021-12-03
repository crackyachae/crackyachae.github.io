---
layout  : article
title   : 필요한 정보를 저장하기 - 변수 (Storing the information you need — Variables)
summary : 
date    : 2021-12-02 00:13:55 +0900
updated : 2021-12-03 12:19:33 +0900
tag     : draft
toc     : true
public  : true
parent  : [[mdn-learn-web-js]]
latex   : false
---
* TOC
{:toc}

> 이 글은 MDN Learn web development의 [JavaScript First Step](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/First_steps) 중 [Storing the information you need — Variables](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/First_steps/Variables#initializing_a_variable)의 내용을 번역 및 정리한 글입니다.
>
> * 제가 필요한 부분 위주로 확인하면서 정리하고 있어 글에 덜 작성된 부분이 있을 수 있습니다.
> * 글 작성 후 원문의 내용이 수정되거나 내용을 이해하기 위한 개인적인 설명이나 해석이 있을 수 있습니다. 되도록 원문을 참고해주시길 바랍니다.
> * 잘못된 부분이 있다면 댓글이나 그 외 편하신 방법으로 알려주시면 감사하겠습니다.

## 필요한 도구 (Tools you need)

## 변수란 (What is a variable?)

### Variable example

변수란 합산(sum)을 위한 숫자나, 문장의 일부인 문자열 같은 값을 담는 보관함(container)이다.

### 변수 예제 (Variable example)

간단한 예제를 봐보자:

```html
<button id="button_A">Press me</button>
<h3 id="heading_A"></h3>
```

```js
const buttonA = document.querySelector('#button_A');
const headingA = document.querySelector('#heading_A');

buttonA.onclick = function() {
  let name = prompt('What is your name?');
  alert('Hello ' + name + ', nice to see you!');
  headingA.textContent = 'Welcome ' + name;
}
```

예제에서 버튼을 누르면 몇 줄의 코드가 실행된다.

* 첫 번째 줄은 사용자(reader)에게 이름을 입력해달라고 요청하는 박스를 화면에 띄우고 그 값을 변수에 저장한다.

    ```js
    let name = prompt('What is your name?');
    ```

* 두 번째 줄은 변숫값에서 가져온 사용자의 이름을 포함하는 환영 메시지를 표시하고

    ```js
    alert('Hello ' + name + ', nice to see you!');
    ```

* 세 번째 줄은 그 이름을 페이지에 표시한다.

    ```js
    headingA.textContent = 'Welcome ' + name;
    ```

### 변수를 사용하지 않으면 (Without a variable)

변수가 왜 유용한지 이해하려면, 변수를 사용하지 않고 이 예제를 작성하는 방법에 대해 생각해보자. 아마 이런 식으로 보일 것이다 :

```html
<button id="button_B">Press me</button>
<h3 id="heading_B"></h3>
```

```js
const buttonB = document.querySelector('#button_B');
const headingB = document.querySelector('#heading_B');

buttonB.onclick = function() {
    alert('Hello ' + prompt('What is your name?') + ', nice to see you!');
    headingB.textContent = 'Welcome ' + prompt('What is your name?');
}
```

만약 변수를 사용할 수 없다면 매번 사용자의 이름을 사용할 때마다 사용자에게 이름을 물어봐야 할 것이다.

<br>

변수는 완전히 의미가 있고(just make sense) 자바스크립트를 더 많이 배울수록 변수를 자연스럽게 여기게 될 것이다.

## 변수를 선언하기 (Declaring a variable)

```js
let myName;
let myAge;
```

변수의 이름을 입력해 변수의 값이 실행 환경에 존재하는지 확인할 수 있다. e.g.

```
myName;
myAge;
```

이 변수들은 지금 값을 갖지 않는다; 이들은 비어있는 보관함이다. 변수 이름을 입력하면 `undefined`라는 값이 반환된다.

변수가 존재하지 않는다면 오류 메시지가 표시된다. 다음을 입력해보자

```
scoobyDoo
```

> Note: 변수는 존재하지만, 그 값이 정의되지 않은 것과 변수가 존재 자체를 하지 않는 것을 헷갈리지 말자.

## 변수를 초기화하기 (Initializing a variable)

```js
myName = 'Chris';
myAge = 37;
```

콘솔로 돌아가서 아래의 코드를 입력해보자.

다시, 콘솔에 변수의 이름을 입력해서 변수의 값을 반환할 수 있다. 이걸 다시 입력해보자:

```
myName;
myAge;
```

다음처럼 변수의 선언과 초기화를 동시에 할 수도 있다:

```js
let myDog = 'Rover';
```

## var에 대한 참고 사항 (A note about var)

`var` 키워드를 사용해 변수를 선언하는 다른 방법을 볼 수도 있다:

```js
var myName;
var myAge;
```

자바스크립트가 처음 만들어졌을 때는 이것이 변수를 선언하는 유일한 방법이었다. `var`의 설계(design)는 헷갈리고 오류가 발생하기 쉬웠다. 그래서 최신 버전의 자바스크립트에는 `var`와 다른 방식으로 작동하는 변수들을 만들고 그 과정에서 발생하는 문제를 해결하기 위한 새로운 키워드인 `let`을 만들었다.

아래에서 몇몇 차이점을 설명한다. 지금 모든 차이점을 다루지는 않지만, 자바스크립트를 더 많이 배우면서 이들을 발견할 것이다 (지금 정말 이것에 대한 내용을 알고 싶다면 편하게 [let reference page](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let)를 확인해보자).

### 호이스팅 (Hoisting)

우선, 변수를 선언하고 초기화하는 여러 줄의 자바스크립트 프로그램을 작성할 때, 실제로 변수를 (먼저) 초기화한 다음에 `var`로 선언할 수 있고 이것은 여전히 잘 작동한다. 예를 들어:

```js
myName = 'Chris';

function logName() {
  console.log(myName);
}

logName();

var myName;
```

> Note: 각각의 줄을 자바스크립트 콘솔에 입력하지 않으면 작동하지 않는다.

이것은 **호이스팅(hoisting)** 때문에 이렇게 작동한다 - 이 주제에 대해 더 자세히 알고 싶으면 [var hoisting](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/var#var_hoisting)을 참고하자.

`let`에서는 더는 호이스팅이 작동하지 않는다. 위의 예제에서 `var`를 `let`으로 바꾸면, 오류로 작동에 실패할 것이다. 이것은 좋은 일이다 - 변수를 초기화 한 후 선언하면 헷갈리고 코드를 이해하기 어려워진다.

### 변수의 재선언

두 번째로, `var`를 사용하면 몇 번이든 같은 변수를 선언할 수 있지만 `let`을 사용하면 그러지 못한다. 다음의 코드는 잘 작동한다:

```js
var myName = 'Chris';
var myName = 'Bob';
```

하지만 다음의 코드는 두 번째 줄에서 오류가 발생할 것이다:

```js
let myName = 'Chris';
let myName = 'Bob';
```

대신 이렇게 해야 한다:

```js
let myName = 'Chris';
myName = 'Bob';
```

다시 말하지만, 이것은 언어적으로 합리적인 결정(sensible language decision)이다. (같은) 변수를 다시 선언할 이유가 없다 - 상황을 더 헷갈리게 할 뿐이다.

이런 것과 그 외의 이유로 코드에 `var` 대신 `let`을 사용하는 것을 더 추천한다. Internet Explorer 10이나 그 이전의 버전을 지원할 때를 제외하고는 `var`를 쓸 이유가 없다.

## 변수를 수정하기 (Updating a variable)

### 변수 이름 규칙에 대한 여담 (An aside on variable naming rules)

대부분 변수를 원하는 대로 부를 수 있지만, 제한은 있다. 일반적으로 라틴 문자(0-9, a-z, A-Z)와 밑줄 기호만 사용해야 한다.

* 오류가 발생하거나 전 세계 다른 사용자(audience)가 이해하기 어려울 수 있어 다른 문자를 사용하면 안 된다.
* 변수 이름의 시작에 밑줄 사용하면 안 된다 - 밑줄로 시작하는 것은 어떤 자바스크립트 구조에서 특정한 것을 의미하기 위해 쓰이기 때문에 혼동될 수 있다.
* 변수 이름의 시작에 숫자를 사용하면 안 된다. 허용되지 않고 오류가 발생한다.
* 관습적으로 안전하게 사용되어온 명명법으로 소위 "lower camel case"라고 불리는 명명법이 있다. 여러 단어를 하나로 묶고 첫 단어의 시작은 소문자를 사용하며 다음 단어들은 대문자로 시작한다. 이 문서에서 사용된 변수 이름에 이 방법을 사용해 왔다.
* 포함한 데이터를 잘 설명하도록 변수 이름을 직관적으로 지어야 한다. 단일 문자 / 숫자 또는 긴 구절을 사용하면 안 된다.
* 변수는 대소문자를 구분한다 - `myage` 와 `myAge`는 다른 변수다.
* 마지막으로 자바스크립트 예약어를 변수 이름으로 사용하면 안 된다 - 예약어는 자바스크립트의 실제 구문을 구성하는 단어들이다. 따라서 변수 이름으로 `var`, `function`, `let`, `for`과 같은 단어를 사용할 수 없다. 브라우저는 이러한 단어를 다른 코드 항목(예약어)으로 인식하고 오류가 발생할 것이다.

좋은 예시:

```
age
myAge
init
initialColor
finalOutputValue
audio1
audio2
```

안 좋은 예시:

```
1
a
_12
myage
MYAGE
var
Document
skjfndskjfnbdskjfb
thisisareallylongstupidvariablenameman
```

## 변수의 종류 (Variable types)

### 숫자 (Numbers)

### 문자열 (Strings)

### 부울 (Booleans)

### 배열 (Arrays)

### 객체 (Objects)

## 동적인 유형 지정 (Dynamic typing)

자바스크립트는 "동적 유형 언어(dynamically typed language)"로, 다른 언어와 다르게 변수에 포함될 데이터의 유형(숫자, 문자열, 배열 등)을 지정할 필요가 없다는 것을 의미한다.

예를 들어, 변수를 선언하고 따옴표로 묶인 값을 지정하면 브라우저는 변수의 문자열로 취급한다:

```js
let myString = 'Hello';
```

따옴표 안의 값이 숫자더라도 여전히 문자열로 인식하기 때문에 주의해야 한다:

```js
let myNumber = '500'; // oops, this is still a string
typeof myNumber;
myNumber = 500; // much better — now this is a number
typeof myNumber;
```

## 자바스크립트에서의 상수 (Constants in JavaScript)

변수와 같이, 상수(constant)도 선언할 수 있다. 상수는 다음의 사항을 제외하고는 변수와 비슷하다:

* 상수는 선언할 때 반드시 초기화해야 한다.
* 초기화 후에는 새로운 값을 대입할 수 없다.

예를 들어, `let`을 사용하면 초기화 하지 않고 변수를 선언할 수 있다.

```js
let count;
```

`const`를 사용해서 이 작업을 하려고 하면 오류가 표시된다:

```js
const count;
```

비슷하게, `let`은 변수를 초기화하고 새로운 값을 대입할 수 있다 (변수 재할당이라고도 한다).

```js
let count = 1;
count = 2;
```

`const`를 사용해서 이 작업을 하려고 하면 오류가 표시된다:

```js
const count = 1;
count = 2;
```

자바스크립트의 상수는 항상 같은 값을 명명하지만, 그 명명한 값의 "내용"은 바뀔 수 있다. 숫자나 부울 같은 간단한 유형에서는 이런 구별이 별 쓸모가 없지만, 객체는 이를 고려한다:

```js
const bird = { species : 'Kestrel'};
console.log(bird.species);  // "Kestrel"
```

객체의 내용이 변하더라도, 상수는 여전히 같은 객체를 가리키고 있기 때문에 `const`를 이용해 선언한 객체의 속성을 수정하거나, 추가하거나, 제거할 수 있다.

```js
bird.species = 'Striated Caracara';
console.log(bird.species);  // "Striated Caracara"
```

## const와 let은 언제 사용해야 하는가 (When to use const and when to use let)

`let`으로 할 수 있는 만큼 `const`로 할 수 없다면 왜 `let`보다 `const`를 사용하는 것을 선호할까?

사실 `const`는 매우 유용하다. 어떤 값을 명명하기 위해서 `const`를 사용하면 이는 코드를 보는 모든 사람에게 이 이름에는 절대 다른 값을 대입할 수 없다는 것을 얘기한다. 이 이름을 볼 때마다 이것이 무엇을 가리키는지 알 수 있다.

이 코스에서는 `let`과 `const`를 사용하는 때에 대해 다음과 같은 기준을 사용(adopt)한다:

*`const`를 사용할 수 있다면 사용하고 꼭 필요할 때만 `let`을 사용하자*

이는 변수를 선언할 때 초기화할 수 있고, (다른 값을) 다시 대입할 일이 없다면, 상수로 작성하라는 것을 의미한다.
