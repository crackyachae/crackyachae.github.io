---
layout  : article
title   : 문자열 다루기 — 문자열 (Handling text — strings in JavaScript)
summary : 
date    : 2021-12-03 15:44:05 +0900
updated : 2021-12-03 20:42:17 +0900
tag     : draft
toc     : true
public  : true
parent  : [[/javascript/mdn-learn-web-js-1]]
latex   : false
---
* TOC
{:toc}

> 이 글은 MDN Learn web development의 [JavaScript First Step](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/First_steps) 중 [Handling text — strings in JavaScript](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/First_steps/Strings)의 내용을 번역 및 정리한 글입니다.
>
> * 제가 필요한 부분 위주로 확인하면서 정리하고 있어 글에 덜 작성된 부분이 있을 수 있습니다.
> * 글 작성 후 원문의 내용이 수정되거나 내용을 이해하기 위한 개인적인 설명이나 해석이 있을 수 있습니다. 되도록 원문을 참고해주시길 바랍니다.
> * 잘못된 부분이 있다면 댓글이나 그 외 편하신 방법으로 알려주시면 감사하겠습니다.

## 단어의 힘 (The power of words)

## 문자열의 기초 (Strings — the basics)

문자열은 처음에는 숫자와 비슷하게 다뤄지는 것처럼 보이지만, 더 깊게 파고들면 눈에 띄는 차이점 들을 발견할 수 있다.

### 문자열 만들기 (Creating a string)

### 작은따옴표 vs 큰따옴표 (Single quotes vs. double quotes)

1. 자바스크립트에서는 작은따옴표와 큰따옴표 중 원하는 것을 골라 문자열을 감싸는 데 사용할 수 있다. 다음의 두 코드 모두 문제없이 작동한다:

    ```js
    var sgl = 'Single quotes.';
    var dbl = "Double quotes";
    sgl; // Single quotes.
    dbl; // Double quotes
    ```

2. 두 종류의 따옴표는 차이가 거의 없어 개인에 선호에 따라 사용하면 된다. 하지만 둘 중 한 종류만 계속 사용해야 하며 다른 따옴표로 묶인 코드는, 특히 같은(하나의) 문자열에 두 개의 다른 따옴표를 사용할 경우 헷갈릴 수 있다. 다음의 코드는 오류를 반환할 것이다:

    ```js
    var badQuotes = 'What on earth?";
    ```

3. 문자열을 감싸기(contain) 위해 사용하지 않은 다른 종류의 따옴표는 문자열 안에 쓰일 수 있어서 브라우저가 문자열이 끝나지 않았다고 인식한다. 예를 들어 이것은 모두 괜찮다:

    ```js
    var sglDbl = 'Would you eat a "fish supper"?';
    var dblSgl = "I'm feeling blue.";
    sglDbl;
    dblSgl;
    ```

4. 그러나 문자열을 감싸기 위해 쓰인 따옴표와 같은 종류의 따옴표는 문자열 안에 포함될 수 없다. 다음의 코드는 문자열이 어디서 끝나는지 브라우저를 혼동시키기 때문에 에러가 발생한다:

    ```js
    var bigmouth = 'I've got no right to take my place...';
    ```

### 문자열에서 문자를 이스케이프 시키기 (Escaping characters in a string)

## 문자열 연결하기 (Concatenating strings)

### 특정 상황에서의 문자열 연결 (Concatenation in context)

실제로 쓰이는 문자열 연결을 살펴보자:

```html
<button>Press me</button>
```

```js
const button = document.querySelector('button');

function greet() {
  const name = prompt('What is your name?');
  alert(`Hello ${name}, nice to see you!`);
}

button.addEventListener('click', greet);
```

* 여기서는 사용자에게 팝업 대화창을 통해 질문에 대한 답을 요청하고 입력된 값을 지정된 변수에 - 이 경우`name`에 저장하는 `window.prompt()` 함수를 사용한다.
* 다음으로 `window.alert()` 함수를 사용해 일반적인 환영 메시지에 사용자의 이름을 집어넣은 문자열이 포함된 다른 팝업을 표시한다.

### "+"를 사용한 문자열 결합 (Concatenation using "+")

`+` 연산자를 사용해서 문자열을 결합할 수도 있다.

```js
const greeting = "Hello";
const name = "Chris";
console.log(greeting + ", " + name); // "Hello, Chris"
```

하지만, 가독성이 높은 코드를 위해 일반적으로 템플릿 리터럴(template literals)을 사용한다.

```js
const greeting = "Hello";
const name = "Chris";
console.log(`${greeting}, ${name}`); // "Hello, Chris"
```

## 숫자 vs 문자열 (Numbers vs. strings)

그래서 문자열과 숫자를 결합하려고 하면 어떤 일이 일어날까? 다음을 콘솔에서 시도해보자:

```js
const name = "Front ";
const number = 242;
console.log(`${name}${number}`); // "Front 242"
```

이 코드는 오류를 반환할 것 같지만 멀쩡하게 작동한다. 문자열을 숫자로 나타내려는 것은 말이 되지 않지만, 숫자를 문자열로 나타내는 것은 가능하기 때문에 브라우저는 숫자를 문자열로 변환해 두 문자열을 결합한다.

문자열로 바꾸고 싶지만 다른 것(값 자체)은 그대로 두고 싶은 숫자 변수가 있거나, 숫자로 바꾸고 싶지만 다른 것은 그대로 두고 싶은 문자열 변수가 있을 때 다음 두 구조를 사용할 수 있다:

* `Number` 객체는 가능하다면 전달받은 어떤 값이든 숫자로 바꾼다. 다음을 시도해보자:

    ```js
    const myString = '123';
    const myNum = Number(myString);
    console.log(typeof myNum);
    ```

* 반대로, 모든 숫자는 그 값을 동등한 문자열로 바꿔주는 `toString()`이란 메소드를 갖는다. 이것을 시도해보자:

    ```js
    const myNum2 = 123;
    const myString2 = myNum2.toString();
    console.log(typeof myString2);
    ```

이 생성자들은 일부 상황에서 정말 유용할 수 있다. 예를 들어, 만약 사용자가 양식의 텍스트 필드에 숫자를 입력하면, 그 값은 문자열이다. 하지만 만약 이 숫자를 특정 값에다 더하고 싶다면, 이 입력값이 숫자여야 하므로 `Number()` 에 이 값을 전달해 문제를 해결할 수 있다. 이미 [숫자 맞추기 게임 54번째 줄](https://github.com/mdn/learning-area/blob/main/javascript/introduction-to-js-1/first-splash/number-guessing-game.html#L54) 에서 정확히 이 일을 이미 했었다.

## 문자열에 표현식을 포함하기 (Including expressions in strings)

자바스크립트 표현식과 간단한 변수가 템플릿 리터럴 안에 포함할 수 있고, 그(표현식과 변수의) 결괏값이 반환 값에 포함된다:

```js
const song = 'Fight the Youth';
const score = 9;
const highestScore = 10;
const output = `I like the song ${song}. I gave it a score of ${score/highestScore * 100}%.`;
console.log(output);  // "I like the song Fight the Youth. I gave it a score of 90%."
```

## 여러 줄의 문자열 (Multiline strings)

템플릿 리터럴은 소스 코드에서 줄 바꿈을 인정(respect)하므로 다음과 같이 여러 줄에 걸친 문자열을 작성할 수 있다:

```js
const output = `I like the song.
I gave it a score of 90%.`;
console.log(output);  // I like the song.
                      // I gave it a score of 90%.
```

일반 문자열을 사용해서 같은 결과를 도출하려면 개행 문자(`\n`)를 문자열에 포함해야 한다:

```js
const output = 'I like the song.\nI gave it a score of 90%.';
console.log(output);  // I like the song".
                      // I gave it a score of 90%.
```
