---
layout  : article
title   : 함수 - 다시 사용 가능한 코드 블럭 (Functions — reusable blocks of code)
summary : 
date    : 2021-12-07 16:38:22 +0900
updated : 2021-12-07 21:23:16 +0900
tag     : draft
toc     : true
public  : true
parent  : [[/javascript/mdn-learn-web-js-2]]
latex   : false
---
* TOC
{:toc}

> 이 글은 MDN Learn web development의 [JavaScript building blocks](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks) 중 [Functions — reusable blocks of code](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Functions)의 내용을 번역 및 정리한 글입니다.
>
> * 제가 필요한 부분 위주로 확인하면서 정리하고 있어 글에 덜 작성된 부분이 있을 수 있습니다.
> * 글 작성 후 원문의 내용이 수정되거나 내용을 이해하기 위한 개인적인 설명이나 해석이 있을 수 있습니다. 되도록 원문을 참고해주시길 바랍니다.
> * 잘못된 부분이 있다면 댓글이나 그 외 편하신 방법으로 알려주시면 감사하겠습니다.

## 함수는 어디서 찾을 수 있을까? (Where do I find functions?)

## 브라우저 내장 함수 (Built-in browser functions)

이미 이 코스에서 브라우저에 내장된 함수를 많이 사용했다. 예를 들어, 매번 텍스트 문자열을 조작할 때마다:

```js
const myText = 'I am a string';
const newString = myText.replace('string', 'sausage');
console.log(newString);
// replace() 문자열 함수는 기존(source) 문자열과 대상 문자열을 가져다,
// 기존 문자열을 바꿀 문자열로 바꾸고, 
// 새로 형성된 문자열을 반환한다
```

또는 매번 배열을 조작할 때마다:

```js
const myArray = ['I', 'love', 'chocolate', 'frogs'];
const madeAString = myArray.join(' ');
console.log(madeAString);
// join() 함수는 하나의 배열을 가져다,
// 모든 배열 항목을 하나의 문자열로 합치고,
// 이 새로운 문자열을 반환한다
```

또는 매번 무작위의 숫자를 생성할 때마다:

```js
const myNumber = Math.random();
// random() 함수는 0과 1 사이(이지만 1은 포함하지 않는)의
// 임의의 수를 생성하고 그 수를 반환한다
```

... 함수를 사용하고 있었다!

일부 내장 함수는 코어 자바스크립트 언어의 일부가 아니라는 것을 염두에 두자 - 일부는 더 많은 기능을 제공하기 위해 기본 언어 위에 구축되는 브라우저 API의 일부로 정의된다 (더 자세한 설명을 보려면 [이 코스의 앞 섹션](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/First_steps/What_is_JavaScript#so_what_can_it_really_do)을 참고하자). 브라우저 API를 방법은 이후 모듈에서 더 자세히 살펴볼 것이다.

## 함수 vs 메소드 (Functions versus methods)

프로그래머는 객체의 일부인 **함수**를 **메소드(methods)**라 부른다.

## 함수를 호출하기 (Invoking functions)

## 함수의 매개변수 (Function parameters)

일부 함수는 호출할 때 **매개변수(parameters)**를 지정해야 한다 - 매개변수는 함수가 기능을 제대로 수행하기 위해 함수의 괄호 안에 포함되어야 할 값이다.

### 선택적 매개변수 (Optional parameters)

때때로, 매개변수는 선택적이다 - 이를 반드시 지정할 필요가 없다. 값을 지정하지 않으면 함수는 일반적으로 일종의 기본 동작(behavior)을 채택할 것이다.  예를 들어, 배열의 `join()` 함수의 매개변수는 선택적이다:

```js
const myArray = ['I', 'love', 'chocolate', 'frogs'];
const madeAString = myArray.join(' ');
console.log(madeAString);
// 'I love chocolate frogs'를 반환

const madeAnotherString = myArray.join();
console.log(madeAnotherString);
// 'I,love,chocolate,frogs'를 반환
```

* 만약 매개변수로 합치거나/구분하는 문자가 포함되지 않으면, 쉼표가 기본값으로 쓰인다.

### 기본 매개변수 (Default parameters)

만약 함수를 작성해 선택적 매개변수를 지원하고 싶으면, 매개변수 이름 뒤에 `=`와 기본값을 추가해 기본값을 지정할 수 있다.

```js
function hello(name='Chris') {
  console.log(`Hello ${name}!`);
}

hello('Ari'); // Hello Ari!
hello();      // Hello Chris!
```

## 익명 함수와 화살표 함수 (Anonymous functions and arrow functions)

지금까지는 이런 방식으로 함수를 생성했다:

```js
function myFunction() {
  alert('hello');
}
```

하지만 이름이 없는 함수도 만들 수 있다.

```js
function() {
  alert('hello');
}
```

이 함수는 이름이 없어서 **익명 함수(anonymous function)** 이라고 부른다. 익명 함수는 함수가 또 다른 함수를 매개변수로 받을 때 자주 볼 수 있다. 이 경우 함수 매개변수가 종종 익명 함수의 형태로 전달된다.

### 익명 함수 예제 (Anonymous function example)

```js
function logKey(event) {
  console.log(`You pressed "${event.key}".`);
}

textBox.addEventListener('keydown', logKey);
```

별개의 `logKey()` 함수를 정의하는 대신, 익명 함수를 `addEventListener()`로 전달할 수 있다:

```js
textBox.addEventListener('keydown', function(event) {
  console.log(`You pressed "${event.key}".`);
});
```

### 화살표 함수 (Arrow functions)

만약 이처럼 익명 함수를 전달한다면, **화살표 함수(arrow function)** 라고 불리는 다른(alternative) 형태를 사용할 수도 있다. `function(event)` 대신 `(event) =>` 라고 작성한다:

```js
textBox.addEventListener('keydown', (event) => {
  console.log(`You pressed "${event.key}".`);
});
```

만약 함수 중괄호 안의 코드가 단 한 줄이면 중괄호를 생략할 수 있다:

```js
textBox.addEventListener('keydown', (event) => console.log(`You pressed "${event.key}".`));
```

만약 함수가 하나의 매개변수를 사용하면, 매개변수 주변의 괄호를 생략할 수 있다:

```js
textBox.addEventListener('keydown', event => console.log(`You pressed "${event.key}".`));
```

마지막으로 함수가 값을 반환해야 하고 단 한 줄의 코드만 포함한다면 `return` 문도 생략할 수 있다. 다음의 예제에서 배열의 `map()` 메소드를 사용해 기존 배열의 모든 값을 두 배로 증가시킨다:

```js
const originals = [1, 2, 3];

const doubled = originals.map(item => item * 2);

console.log(doubled); // [2, 4, 6]
```

위의 예제에서 `item => item * 2`는 다음과 동일한 화살표 함수이다:

```js
function doubleItem(item) {
  return item * 2;
}
```

### 화살표 함수 실시간 예제 (Arrow function live sample)

## 함수의 유효 범위와 충돌 (Function scope and conflicts)

유효 범위에 대해 조금 얘기해보자 - 함수를 다루는 데 매우 중요한 개념이다. 함수를 만들면, 변수와 그 외의 것들이 함수 안과, 별도의 **유효 범위(scope)** 안에 정의되고, 이는 이들이 별도의 구획 안에 갇혀 함수 밖의 코드에서는 접근할 수 없다는 것을 의미한다.

모든 함수 바깥의 가장 상위 레벨의 유효 범위는 **global scope(전역 범위)**라고 한다. 전역 범위에서 정의된 값을 코드 모든 곳에서 접근할 수 있다.

자바스크립트는 다양한 이유가 있지만 - 주로 안정성(security)과 구조(organization) 때문에 이를 정했다. 때로는 변수가 코드의 모든 곳에서 접근할 수 있게 되는 것을 원하지 않을 것이다 - 다른 곳에서 호출한 외부 스크립트가 코드 다른 부분의 코드와 같은 변수 이름을 사용하고 충돌을 일으키는 경우가 있기 때문에 기존 코드를 망치고 문제를 일으킬 수 있다. 이건 악의적일 수도 있고 그렇지 않으면 단지 우연일 것이다.

예를 들어, 두 개의 자바스크립트 파일을 호출하는 HTML 파일이 있다고 하자, 그리고 두 자바스크립트 파일은 모두 같은 이름을 사용하는 변수와 함수가 정의되어 있다.

```html
<!-- Excerpt from my HTML -->
<script src="first.js"></script>
<script src="second.js"></script>
<script>
  greeting();
</script>
```

```js
// first.js
const name = 'Chris';
function greeting() {
  alert(`Hello ${name}: welcome to our company.`);
}
```

```js
// second.js
const name = 'Zaptec';
function greeting() {
  alert(`Our company is called ${name}.`);
}
```

호출하려는 두 함수는 모두 `greeting()`이라고 불리지만, `firstjs` 파일의 `greeting()` 함수에만 접근할 수 있다 (두 번째는 무시당한다). 추가로, `second.js` 파일에서 `let` 키워드를 사용해 `name` 변수를 선언하려고 시도하면 오류가 발생한다.

### 직접 해보기: 유효 범위를 갖고 놀기 (Active learning: Playing with scope)

### 함수 안의 함수 (Functions inside functions)

함수는 어디서든, 다른 함수의 안에서까지도 호출할 수 있다는 것을 명심하자. 이는 종종 코드를 말끔하게 유지하는 데 사용된다 - 만약 크고 복잡한 함수가 있다면, 이를 몇 개의 하위 함수로 쪼갰을 때 더 이해하기 쉬울 것이다:

```js
function myBigFunction() {
  const myValue;

  subFunction1();
  subFunction2();
  subFunction3();
}

function subFunction1() {
  console.log(myValue);
}

function subFunction2() {
  console.log(myValue);
}

function subFunction3() {
  console.log(myValue);
}
```

함수 안에서 사용한 값이 유효 범위 안에 있는지만 확인하자. 위의 예제에서 `myValue` 변수는 하위함수 호출과 같은 유효 범위에 정의되어 있지만, 하위함수 정의 - 함수가 호출되었을 때 실제로 실행되는 코드 안에는 정의되어있지 않아 `ReferenceError: myValue is not defined` 오류가 발생한다. 이를 작동하도록 하려면 다음처럼 값을 함수의 매개변수로 전달해주어야 한다:

```js
function myBigFunction() {
  const myValue = 1;

  subFunction1(myValue);
  subFunction2(myValue);
  subFunction3(myValue);
}

function subFunction1(value) {
  console.log(value);
}

function subFunction2(value) {
  console.log(value);
}

function subFunction3(value) {
  console.log(value);
}
```
