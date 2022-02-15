---
layout  : article
title   : 자바스크립트 문제해결 (What went wrong? Troubleshooting JavaScript)
summary :
date    : 2021-11-18 22:44:46 +0900
updated : 2021-12-02 00:12:09 +0900
tag     :
toc     : true
public  : true
parent  : [[mdn-learn-web-js]]
latex   : false
---

* TOC
{:toc}

> 이 글은 MDN Learn web development의 [JavaScript First Step](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/First_steps) 중 [What went wrong? Troubleshooting JavaScript](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/First_steps/What_went_wrong)의 내용을 번역 및 정리한 글입니다.
>
> * 제가 필요한 부분 위주로 확인하면서 정리하고 있어 글에 덜 작성된 부분이 있을 수 있습니다.
> * 글 작성 후 원문의 내용이 수정되거나 내용을 이해하기 위한 개인적인 설명이나 해석이 있을 수 있습니다. 되도록 원문을 참고해주시길 바랍니다.
> * 잘못된 부분이 있다면 댓글이나 그 외 편하신 방법으로 알려주시면 감사하겠습니다.

## 오류의 종류 (Types of error)

#### 구문 오류(Syntax errors)

* 코드의 철자(spelling) 오류이다. 이 오류로 프로그램이 아예 실행되지 않거나 중간에 작동을 멈추게 된다.
* 일반적으로 오류 메시지도 같이 출력되므로 확인할 수 있다.
* 올바른 도구(편집기)를 사용하는 데 익숙하고 사용하고 오류 메시지의 의미를 알고 있다면 충분히 고칠 수 있다.

#### 논리 오류(Logic errors)

* 구문은 올바르지만, 코드가 의도한 대로 작동하지 않을 때 발생하는 오류로
* 프로그램은 정상적으로 실행되지만, 잘못된 결과를 내놓게 된다.
* 오류의 직접적인 원인이 되는 오류 메시지가 표시되지 않아서 일반적으로 구문 오류 수정이 어렵다.

### 오류의 예제 (An erroneous example)

시작으로, 이전의 숫자 맞추기 게임으로 돌아가 보자. 이번엔 고의로 오류를 만든 버전을 살펴볼 것이다.

Github에 가서 [number-game-errors.html](https://github.com/mdn/learning-area/blob/master/javascript/introduction-to-js-1/troubleshooting/number-game-errors.html)을 로컬 저장소에 복사한다. ([여기서 실제 실행 예제를](https://mdn.github.io/learning-area/javascript/introduction-to-js-1/troubleshooting/number-game-errors.html)을 참고하자)

1. 먼저, 본인이 선호하는 텍스트 에디터와 브라우저에서 위에서 저장한 파일을 연다.
1. 게임을 시작해본다. "제출(submit) 버튼"을 눌렀을 때, 정상적으로 실행되지 않는 것을 확인할 수 있다.

## 구문 오류 고치기 (Fixing syntax errors)

브라우저의 자바스크립트 엔진이 구문 오류가 발생할 때마다 오류 메시지를 콘솔에 던져준다.

1. `number-game-errors.html`이 열려있는 탭으로 이동한 후 자바스크립트 콘솔 창을 연다. 다음 줄(콘솔 창)에서 오류 메시지를 볼 수 있다.
1. 이는 원인을 찾기(track down) 꽤 쉬운 오류로 브라우저가 해결을 도울 수 있는 몇몇 유용한 정보를 제공한다 (위의 스크린샷은 FireFox 브라우저를 캡처한 것이지만, 다른 브라우저도 비슷한 정보를 제공한다). 왼쪽부터 살펴보면,
    * 빨간색 "x"는 오류임을 나타낸다.
    * 오류 메시지는 무엇이 잘못됐는지 알려준다: "TypeError: guessSubmit.addeventListener is not a function"
    * "Learn More" 링크는 이 오류가 어떤 의미인지 더 자세하게 설명하는 MDN 페이지로 연결된다.
    * 자바스크립트 파일의 이름은 개발자 도구의 디버거 탭으로 연결된다. 이 링크를 따라가면, 오류가 발생한 정확한 위치를 찾을 수 있다.
    * 오류가 발생한 줄번호와 그 줄에서 오류가 처음 발견된 줄에서의 문자 위치(앞에서 몇 번째 문자인지)를 알려준다. 예시에서는 86번째 줄, 앞에서 3번째 문자이다.
1. 코드 에디터에서 86번 줄을 보면 다음의 코드를 발견할 수 있다:

    ```js
    guessSubmit.addeventListener('click', checkGuess);
    ```

1. "guessSubmit.addeventListener is not a function"이라는 오류 메시지는
    * 자바스크립트 인터프리터가 아직 호출한 함수를 인식하지 못했다는 것을 의미한다.
    * 종종, 이 오류 메시지는 실제로 철자를 잘못 적었다는 것을 의미하기도 한다.
    * 구문의 정확한 철자를 모르겠다면 MDN에서 기능을 찾아보는 것도 좋다.
    * 현재 이를 해결하는 가장 좋은 방법은 선호하는 검색 엔진에 "*mdn name-of-feature*"를 검색하는 것이다.
    * 여기, 시간을 절약할 수 있는 지름길이 있다: [addEventListener()](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener)
1. 이 페이지를 살펴보면, 함수 이름의 철자를 잘못 적어서 오류가 발생했다는 것을 알 수 있다. 자바스크립트는 대소문자를 구분하기 때문에 철자나 대소문자의 약간의 차이로 오류가 발생한다는 것을 기억하자. `addeventListener`를 `addEventListener`로 바꾸면 오류를 고칠 수 있다. 지금 고쳐보자.

### 구문 오류 2라운드 (Syntax errors round two)

1. 이번 오류는 "TypeError: lowOrHi is null"이라고 78번 줄에 표시(reported)됐다.

    > Note: Null은 "아무것도 아니(nothing)"거나 "값이 없음(no value)"을 의미하는 특별한 값이다. 즉 `lowOrHi`가 선언되고 초기화되었지만 아직 어떤 의미 있는 값이 지정되지 않았다(변수의 종류나 값이 없다)는 것을 의미한다.

1. 78번 줄을 보면 다음의 코드를 발견할 수 있다:

    ```js
    lowOrHi.textContent = 'Last guess was too high!';
    ```

1. 이 줄은 상수 `lowOrHi`의 `textContent` 속성을 텍스트 문자열로 설정하기 위한 코드이지만 `lowOrHi`에 필요한 속성이 포함되어 있지 않아서 작동하지 않는다. 이런 일이 발생하는 이유를 알기 위해 `lowOrHi`를 코드 다른 곳에서 찾아보자. 자바스크립트에서 가장 빨리 나타나는 것은 48번 줄에 있다.

    ```js
    const lowOrHi = document.querySelector('lowOrHi');
    ```

1. 위 코드는 변수에 문서의 HTML 요소에 대한 참조를 저장하려고 한다. 이 코드가 실행된 뒤에 그 값이 `null`인지 확인해보자. 다음의 코드를 49번 줄에 추가한다.

    ```js
    console.log(lowOrHi);
    ```

    > `console.log()`는 값을 콘솔에 표시해주는 굉장히 유용한 디버깅 함수이다. 그러므로 48번 줄에서 값을 설정한 직후의 `lowOrHi`의 값을 표시할 수 있다.
1. 저장 후 새로고침 하면 `console.log()`의 결과를 콘솔에서 확인할 수 있다. 당연히(sure enough), `lowOrHi`의 값이 현재 `null`이므로 분명히 48번 줄에 문제가 있다.
1. 무엇이 문제인지 생각해보자. 48번 줄은 CSS 선택자로 요소를 선택해 그 참조를 얻는 `document.querySelector()` 메소드를 사용한다. 파일의 더 위쪽을 보면 해당 문단을 찾을 수 있다.

    ```html
    <p class="lowOrHi"></p>
    ```

1. 따라서 여기에는(이 요소를 선택하기 위해서는) 점(.)으로 시작하는 클래스 선택자가 필요하지만 지금 48번째 줄에서 `querySelector()` 메소드로 전달된 선택자는 점을 포함하지 않는다. 이것이 문제가 된다. 48번째 줄의 `lowOrHi`를 `.lowOrHi`로 바꿔보자.
1. 저장 후 다시 새로 고침 하면 `console.log()`의 문이 우리가 원하는 `<p>` 요소를 반환한다. `console.log()` 코드는 지금 지워도 되고 이후에 참고하기 위해 남겨놔도 된다.

### 구문 오류 3라운드 (Syntax errors round three)

1. 이제 게임을 다시 해보면 성공적으로 게임을 반복하는 횟수가 많아질 것이다. 게임은 숫자를 맞게 추측하거나 추측 횟수를 모두 소진해 게임이 끝날 때까지 완벽하게 작동해야 한다.
1. 이 지점에서(게임이 끝날 때), 게임은 다시 실패하고, 처음 보았던 것과 같은 오류가 발생한다 - "TypeError: resetButton.addeventListener is not a function"! 이번에는 94번 줄에서 오류가 발생했다고 표시된다.
1. 94번 줄을 보면, 이전과 같은 실수를 했다는 것을 쉽게 알 수 있다. 이전처럼 `addeventListener`를 `addEventListener` 로 바꾸기만 하면 된다.

## 논리 오류 (A logic error)

이제 프로그램은 문제없이 작동해야 한다. 하지만 게임을 몇 번 하고 나면 의심할 여지 없이 맞춰야(guess) 할 "임의의" 수가 항상 1이라는 것을 알 수 있다. 이것은 우리가 원하는 게임 방식이 아니다!

명백히 게임 로직 어딘가에 문제가 있다 -  게임이 오류를 반환하지는 않는다. 단지 맞게 실행되지 않을 뿐이다.

1. `randomNumber` 변수와 임의의 수를 처음으로 지정한 줄을 찾는다. 게임을 시작할 때 추측해야 하는 임의의 수를 저장하는 인스턴스는 44번 줄 근처에 있어야 한다.

```js
let randomNumber = Math.floor(Math.random()) + 1;
```

2. 그리고 매번 다음 게임이 시작되기 전에 임의의 수를 생성하는 부분은 113번 줄 근처에 있다.

```js
randomNumber = Math.floor(Math.random()) + 1;
```

3. 위 줄들에서 문제가 발생했는지 확인하기 위해 우리의 친구 `console.log()`로 다시 돌아가 보자 - 다음 줄을 앞선 두 줄 바로 아래에 작성(insert)하자.

```js
console.log(randomNumber);
```

4. 파일을 저장하고, 새로고침해 게임을 몇 번 해보자 - 콘솔에 기록된 각 지점에서 `randomNumer`가 항상 1이라는 것을 알 수 있다.

### 로직을 다루기 (Working through the logic)

이걸 수정하기 위해 각 줄이 어떻게 작동하는지 생각해보자. 우선 0과 1 사이의 임의의 십진수(e.g. 0.5675493843)를 생성하는 `Math.random()`을 호출한다.

```js
Math.random()
```

다음으로, `Math.random()`을 호출한 결괏값을 전달받은 숫자를 가장 가까운 정수로 내림하는 `Math.floor()`에 전달한다. 그리고 1을 그 결과에 더한다:

```js
Math.floor(Math.random()) + 1
```

0과 1 사이의 임의의 십진수를 내림하면 항상 0을 반환하므로, 거기에 1을 더하면 항상 1을 반환 할 것이다. 임의의 수를 내림하기 전에 100을 곱해줘야 한다. 다음의 코드는 0과 99 사이의 임의의 수를 제공한다.

```js
Math.floor(Math.random()*100);
```

따라서 여기에 1을 더해서 1과 100 사이의 임의의 값을 얻을 수 있도록 한다.

```js
Math.floor(Math.random()*100) + 1;
```

두 줄을 이처럼 수정한 뒤 저장하고 새로 고침 해보자 - 의도한 대로 게임을 할 수 있을 것이다!

## 그 외의 일반적인 오류들 (Other common errors)

코드에서 자주 발생하는 다른 오류들이 있다. 그중 대부분을 이 섹션에서 다룬(highlight)다.

### 구문 오류: 문 이전에 ;이 없을 때 (SyntaxError: missing ; before statement)

이 오류는 일반적으로 코드의 줄 끝에 세미 콜론이 없다는 것을 의미하지만, 때에 따라 더 많은 것을 숨기고 있을(cryptic) 수 있다.

예를 들어, 만약 `checkGuess()` 함수 안의 이 줄을:

```js
let userGuess = Number(guessField.value);
```

에서

```js
let userGuess === Number(guessField.value);
```

로 바꾸면 코드로 뭔가 다른 것을 하려고 한다고 생각하기 때문에 이 오류가 발생한다. 변수를 값과 같게 지정하는 대입 연산자 (`=`)와 서로의 값이 같은지 확인해서 `true/false`를 반환하는 일치 연산자 (혹은 엄격한 동등 연산자, `===`)를 혼동하지 않도록 주의해야 한다.

> Note: 이 에러에 대해 더 자세히 알고 싶다면 [SyntaxError: missing ; before statement](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Errors/Missing_semicolon_before_statement) 페이지를 참고하자

### 어떤 값을 입력해도 프로그램이 맞다고 할 때 (The program always says you've won, regardless of the guess you enter)

대입 연산자와 일치 연산자를 혼동할 때 또 다른 문제가 발생할 수 있다.

예를 들어, `checkGuess()` 함수 안의 이 줄을

```js
if (userGuess === randomNumber) {
```

에서

```js
if (userGuess = randomNumber) {
```

로 바꾸면 테스트가 `true`를 반환해 프로그램이 게임을 이겼다고 보고할 것이다. 조심하자!

### 구문 오류: 인자 목록 다음에 )이 없을 때 (SyntaxError: missing ) after argument list)

이 오류는 꽤 간단하다. 일반적으로 함수나 메소드의 호출 끝의 닫는 괄호를 빠뜨렸다는 것을 의미한다.

> Note: 이 에러에 대해 더 자세히 알고 싶다면 [SyntaxError: missing ) after argument list](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Errors/Missing_parenthesis_after_argument_list) 페이지를 참고하자

### 구문 오류: 속성 아이디 다음에 :가 없을 때 (SyntaxError: missing : after property id)

이 오류는 주로 잘못된 형식으로 작성한 자바스크립트 객체와 관련이 있지만, 이 경우

```js
function checkGuess() {
```

를

```js
function checkGuess( {
```

로 바꿔서 발생시켰다. 이 오류 때문에 브라우저가 함수의 내용을 함수의 인자로 전달한다고 생각하게 된다. 괄호들을 조심하도록 하자!

### SyntaxError: missing } after function body

이 오류는 쉽다. 주로 함수나 조건문 구조(conditional struction)의 중괄호 중 하나를 빠트렸다는 것을 의미한다. 이 오류는 `checkGuess()` 함수 바닥 근처에 있는 닫는 중괄호 중 하나를 삭제해서 발생했다.

### 구문 오류: 식 대신 문자열이 사용됐을 때 또는 구문 오류: 끝나지 않은 문자열 리터럴 (SyntaxError: expected expression, got 'string' or SyntaxError: unterminated string literal)

이 오류는 보통 문자열 값의 열거나 닫는 따옴표를 생략했을 때 발생한다. 위의 첫 번째 오류를 보면, *문자열*이 브라우저가 문자열의 시작에서 따옴표 대신 발견한 예상치 못한 문자로 대체된다. 두 번째 오류는 문자열이 따옴표로 끝나지 못했다는 것을 의미한다.

이 모든 오류에 대해 지금까지 본 예제를 어떻게 다뤘(tackled)는지 생각해보자. 오류가 발생하면, 안내된 줄의 번호를 보고, 그 줄로 이동해서 잘못된 부분을 찾을 수 있는지 살펴본다. 오류가 반드시 그 줄에 있지 않을 수도 있다는 것과 위에서 다뤘던 것과 정확히 같은 문제로 오류가 발생한 것이 아닐 수도 있다는 것을 염두에 두자.

> Note: 이 에러에 대해 더 자세히 알고 싶다면 [SyntaxError: Unexpected token](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Errors/Unexpected_token)과 [SyntaxError: unterminated string literal](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Errors/Unterminated_string_literal) 페이지를 참고하자.
