---
layout  : article
title   : 코드에서 결정을 내리기 (Making decisions in your code — conditionals)
summary : 
date    : 2021-12-06 11:26:35 +0900
updated : 2021-12-06 15:33:36 +0900
tag     : draft
toc     : true
public  : true
parent  : [[/javascript/mdn-learn-web-js-2]]
latex   : false
---
* TOC
{:toc}

> 이 글은 MDN Learn web development의 [JavaScript building blocks](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks) 중 [Making decisions in your code — conditionals](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/conditionals)의 내용을 번역 및 정리한 글입니다.
>
> * 제가 필요한 부분 위주로 확인하면서 정리하고 있어 글에 덜 작성된 부분이 있을 수 있습니다.
> * 글 작성 후 원문의 내용이 수정되거나 내용을 이해하기 위한 개인적인 설명이나 해석이 있을 수 있습니다. 되도록 원문을 참고해주시길 바랍니다.
> * 잘못된 부분이 있다면 댓글이나 그 외 편하신 방법으로 알려주시면 감사하겠습니다.

## 한 조건에서만 가질 수 있다..! (You can have it on one condition..!)

## if ... else 문 (if ... else statements)

### Basic if ... else syntax

기본 `if...else` 구문은 [의사 코드](https://developer.mozilla.org/en-US/docs/Glossary/Pseudocode)로 다음처럼 보인다:

```js
if (조건) {
  조건이 참(true)일 경우 실행할 코드
} else {
  대신 다른 코드를 실행
}
```

`else`와 두 번째 중괄호를 반드시 포함하지 않아도 된다.

```js
if (조건) {
  조건이 참(true)일 경우 실행할 코드
}

다른 코드를 실행
```

### 실제 예시 (A real example)

### else if

이전의 예제에서는 두 가지 선택과 결과가 제공됐다 - 하지만 두 개 이상을 선택하기를 원한다면 어떨까?

좀 더 관련성이 높은 예제로, 간단한 일기 예보 애플리케이션의 일부일 수 있는 다음의 예제를 확인해보자:

```html
<label for="weather">Select the weather type today: </label>
<select id="weather">
  <option value="">--Make a choice--</option>
  <option value="sunny">Sunny</option>
  <option value="rainy">Rainy</option>
  <option value="snowing">Snowing</option>
  <option value="overcast">Overcast</option>
</select>

<p></p>
```

```js
const select = document.querySelector('select');
const para = document.querySelector('p');

select.addEventListener('change', setWeather);

function setWeather() {
  const choice = select.value;

  if (choice === 'sunny') {
    para.textContent = 'It is nice and sunny outside today. Wear shorts! Go to the beach, or the park, and get an ice cream.';
  } else if (choice === 'rainy') {
    para.textContent = 'Rain is falling outside; take a rain coat and an umbrella, and don\'t stay out for too long.';
  } else if (choice === 'snowing') {
    para.textContent = 'The snow is coming down — it is freezing! Best to stay in with a cup of hot chocolate, or go build a snowman.';
  } else if (choice === 'overcast') {
    para.textContent = 'It isn\'t raining, but the sky is grey and gloomy; it could turn any minute, so take a rain coat just in case.';
  } else {
    para.textContent = '';
  }
}
```

1. 여기에는 다양한 날씨 선택지를 만들 수 있는 HTML `<select>` 요소와 간단한 문단이 있다.

    ```html
    <label for="weather">Select the weather type today: </label>
    <!-- select 요소 -->
    <select id="weather">
      <option value="">--Make a choice--</option>
      <option value="sunny">Sunny</option>
      <option value="rainy">Rainy</option>
      <option value="snowing">Snowing</option>
      <option value="overcast">Overcast</option>
    </select>

    <!-- 문단 요소 -->
    <p></p>
    ```

1. 자바스크립트 코드에서 `<select>` 와 `<p>` 요소로의 참조를 모두 저장하고 있고, `<select>`의 값이 변할 때 `setWeather()` 함수가 동작하도록 요소에 이벤트리스너를 추가했다.

    ```js
    const select = document.querySelector('select');
    const para = document.querySelector('p');

    select.addEventListener('change', setWeather);
    ```

1. 함수가 동작할 때, 먼저 `choice`라는 변수를 현재 `<select>` 요소에서 선택된 값으로 설정한다. 그다음 조건문을 사용해 `choice`의 값에 따라 문단 안에 다른 텍스트를 표시한다. `if() {...}` 블록에서 테스트 되는 첫 번째 조건을 제외한 모든 조건이 `else if() {...}` 블록에서 어떻게 테스트 되는지에 집중하자.

    ```js
    function setWeather() {
      // choice 변수 설정
      const choice = select.value;

      // 조건문
      if (choice === 'sunny') {
        para.textContent = 'It is nice and sunny outside today. Wear shorts! Go to the beach, or the park, and get an ice cream.';
      } else if (choice === 'rainy') {
        para.textContent = 'Rain is falling outside; take a rain coat and an umbrella, and don\'t stay out for too long.';
      } else if (choice === 'snowing') {
        para.textContent = 'The snow is coming down — it is freezing! Best to stay in with a cup of hot chocolate, or go build a snowman.';
      } else if (choice === 'overcast') {
        para.textContent = 'It isn\'t raining, but the sky is grey and gloomy; it could turn any minute, so take a rain coat just in case.';
      } 
      ...
    }
    ```

1. `else {...}` 안의, 가장 마지막 선택지는 기본적으로 "최후의 수단" 옵션이다 — (앞의) 어떤 조건도 `true`이지 않으면 이 안의 코드가 실행된다.

    ```js
    function setWeather() {
      ...
      else {
        para.textContent = '';
      }
    }
    ```

    * 이 예제의 경우 사용자가 아무것도 선택하지 않으면, 예를 들어, 처음에 표시한 "--Make a choice--" 플레이스홀더(placeholder) 옵션을 그대로 선택(re-select)하기로 한다면, 문단에서 텍스트를 비운다.

### 비교 연산자에 대한 참고 사항 (A note on comparison operators)

`false`, `undefined`, `null`, `0`, `NaN`, 빈 문자열(`''`)이 아닌 모든 값은 조건문으로 검사했을 때 실제로는 `true`를 반환하므로, 따라서 변수 이름을 사용해 변수가 `true`이거나 혹은 값이 존재하는지(undefined 상태가 아닌지)를 확인할 수 있다. 예를 들어:

```js
let cheese = 'Cheddar';

if (cheese) {
  console.log('Yay! Cheese available for making cheese on toast.');
} else {
  console.log('No cheese on toast for you today.');
}
```

그리고, 아이가 부모의 집안일을 해주는 이전의 예제로 돌아가면, 이처럼 작성할 수 있다:

```js
let shoppingDone = false;
let childsAllowance;

if (shoppingDone) { // don't need to explicitly specify '=== true'
  childsAllowance = 10;
} else {
  childsAllowance = 5;
}
```

### 중첩된 if ... else (Nesting if ... else)

### 논리 연산자: AND, OR, NOT (Logical operators: AND, OR and NOT)

## 스위치 문 (switch statements)

`if...else`문은 조건부 코드가 동작하게 하는 일을 잘하지만, 단점이 없는 것은 아니다. 주로 몇 개의 선택사항이 있고 각 선택 사항을 실행하는데 필요한 코드의 양이 합리적이고/거나, 조건이 복잡한 (예를 들어, 여러 논리 연산자가 필요한) 경우에 사용하기 좋다. 단지 특정 선택에 따라 변수를 설정하거나 조건에 따라 특정 문을 출력하는 경우에, 특히 선택 사항이 많은 경우에는 이 구문이 약간 번거로울(cumbersome) 수 있다.

이런 경우, switch 문이 곁에 있다 - switch 문은 하나의 표현식/값을 입력으로 받아 이와 일치하는 값을 찾을 때까지 여러 선택 사항을 살펴보고, 이에 맞는 코드를 실행한다. 감을 잡기 위한 의사 코드가 여기에 있다:

```js
switch (표현식/값) {
  case 선택사항1:
    이 코드를 실행
    break;

  case 선택사항2:
    대신 이 코드를 실행
    break;

  // 원하는 만큼 많은 case를 포함

  default:
    실제로는, 단지 이 코드만 실행
}
```

여기에 있는 것은(이 코드를 구성하고 있는 것은):

1. 키워드 `switch`. 괄호 한 쌍이 뒤에 온다.

    ```js
    switch ()
    ```

1. 그 괄호 안의 표현식 또는 값

    ```js
    switch (expression)
    ```

1. 키워드 `case`. 그 뒤에 위 표현식이나 값이 가질 수 있는 선택 사항과 콜론(colon)이 함께 온다.

    ```js
    case 선택사항1:
    ```

1. 만약 선택사항이 표현식과 일치하면 실행할 코드.

    ```js
    이 코드를 실행
    ```

1. 뒤에 세미 콜론이 오는 `break` 문

    ```js
    break;
    ```

    * 만약 이전의 선택 사항이 표현식/값과 일치한다면 브라우저는 여기서 코드 블록을 실행하는 것을 멈추고 스위치문 아래 나타나는 코드로 이동한다.
1. 원하는 만큼의 다른 케이스 (3 - 5번 단계)

    ```js
    case 선택 2:
        대신 이 코드를 실행
        break;

    // 원하는 만큼 많은 case를 포함
    ```

1. `default` 키워드.

    ```js
    default:
        실제로는, 단지 이 코드만 실행
    ```

    * `default`는 그 뒤에 선택 사항이 필요하지 않다는 것을 제외하고는 위의 선택 사항과 정확히 같은 코드 패턴을 갖는다.
    * 블록 안에서 이 이후에 더 실행할 것이 없어 `break`문도 필요하지 않다.
    * 앞의 선택사항 중 일치하는 항목이 없으면 실행되는 기본 옵션이다.

### 스위치문 예제 (A switch example)

## 삼항 연산자 (Ternary operator)

삼항 혹은 조건 연산자는 조건을 확인해 `true`라면 하나의 값/표현식을 반환하고, `false`라면 다른 하나를 반환하는 작은 구문이다. 의사 코드는 다음과 같이 생겼다:

```js
( 조건 ) ? 이 코드를 실행 : 대신 이 코드를 실행
```

간단한 예제를 봐보자:

```js
let greeting = ( isBirthday ) ? 'Happy birthday Mrs. Smith — we hope you have a great day!' : 'Good morning Mrs. Smith.';
```

`isBirthday`라는 변수가 있다.

* 만약 이 값이 `true`이면, 게스트에게 생일 축하 메시지를 전한다.
* 그렇지 않으면, 기본적인 일상 인사를 전한다.

### 삼항 연산자 예제 (Ternary operator example)
