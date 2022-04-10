---
layout  : article
title   : 자바스크립트에 발 담그기 (A first splash into JavaScript) 
summary : 
date    : 2021-11-03 14:48:47 +0900
updated : 2021-11-04 15:48:46 +0900
tag     : draft
toc     : true
public  : true
parent  : [[mdn-js-tutorials-beginners]]
latex   : false
---
* TOC
{:toc}

> 이 글은 MDN Learn web development의 [JavaScript First Step](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/First_steps) 중 [A first splash into JavaScript](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/First_steps/A_first_splash)의 내용을 번역 및 정리한 글입니다.
>
> * 제가 필요한 부분 위주로 확인하면서 정리하고 있어 글에 덜 작성된 부분이 있을 수 있습니다.
> * 글 작성 후 원문의 내용이 수정되거나 내용을 이해하기 위한 개인적인 설명이나 해석이 있을 수 있습니다. 되도록 원문을 참고해주시길 바랍니다.
> * 잘못된 부분이 있다면 댓글이나 그 외 편하신 방법으로 알려주시면 감사하겠습니다.

지금까지 자바스크립트의 이론적인 내용들을 배웠다. 이걸로 할 수 있는 것은 실례(practical tutorial)를 따라 간단한 자바스크립트 프로그램을 만드는 과정이 어떻게 되는지 배우는 것이다. 지금부터 차근차근 '숫자 맞추기' 게임을 만들어 보자.

## 프로그래머처럼 사고하기 (Thinking like a programmer)

## 예제-숫자맞추기 (Example — Guess the number game)

가장 먼저 할 수 있는 것은 (최대한 프로그래머의 마음가짐으로) 위의 문제를 간단한 일로 쪼개기 시작하는 것이다.

```
1. 1과 100사이의 숫자 중 무작위로 추출한다.
2. 플레이어의 차례(turn number)를 기록한다. 1에서 시작한다.
3. 플레이어에게 숫자를 맞출 수 있는 방법을 제공한다.
4. 숫자를 맞추면 어딘가에 저장하고, 사용자는 이전의 추측한 숫자를 볼 수 있도록 한다.
5. 그다음, 숫자가 일치한지 확인한다.
5. 만약 일치한다면:
    1. 축하 메시지를 표시한다.
    2. 플레이어가 더는 추측 값을 입력하지 못하게 막는다 (게임이 지저분해질 것이다).
    3. 플레이어가 다시 게임을 시작할 수 있도록 조작 버튼을 표시한다.
7. 숫자가 틀렸고, 차례가 남아있다면:
    1. 플레이어에게 답이 틀렸다는 것과 추측 값이 너무 높거나 낮은지 표시한다.
    2. 플레이어가 다른 값을 입력할 수 있도록 한다.
    3. 차례를 1 증가시킨다.
8. 숫자가 틀렸고, 차례가 없다면:
    1. 게임이 종료되었음을 알린다.
    2. 플레이어가 더는 추측 값을 입력하지 못하게 막는다 (게임이 지저분해질 것이다).
    3. 플레이어가 다시 게임을 시작할 수 있도록 조작 버튼을 표시한다.
9. 게임이 재시작 되면, 게임의 로직과 UI를 확실하게 초기화 시키고, step 1로 돌아간다.
```

### 초기 구성 (Initial setup)

```html
<!-- number-guessing-game-start.html  -->
<!DOCTYPE html>
<html>
  <head>
    <!-- ... -->
  </head>

  <body>
    <h1>Number guessing game</h1>

    <p>We have selected a random number between 1 and 100. See if you can guess it in 10 turns or fewer. We'll tell you if your guess was too high or too low.</p>

    <div class="form">
      <label for="guessField">Enter a guess: </label>
      <input type="text" id="guessField" class="guessField">
      <input type="submit" value="Submit guess" class="guessSubmit">
    </div>

    <div class="resultParas">
      <p class="guesses"></p>
      <p class="lastResult"></p>
      <p class="lowOrHi"></p>
    </div>

    <script>

      // Your JavaScript goes here

    </script>
  </body>
</html>
```

### 데이터 저장을 위한 변수 추가 (Adding variables to store our data)

먼저 `<script>` 요소 안에 아래의 코드를 추가하자.

```js
let randomNumber = Math.floor(Math.random() * 100) + 1;

const guesses = document.querySelector('.guesses');
const lastResult = document.querySelector('.lastResult');
const lowOrHi = document.querySelector('.lowOrHi');

const guessSubmit = document.querySelector('.guessSubmit');
const guessField = document.querySelector('.guessField');

let guessCount = 1;
let resetButton;
```

위의 예제에서

#### 코드 설명

```js
let randomNumber = Math.floor(Math.random() * 100) + 1;
```

* `randomNumber`는 수학적 알고리즘으로 계산된 1과 100사이의 임의의 수를 저장한다.

```html
<!-- HTML중 결과 문단 -->
<div class="resultParas">
  <p class="guesses"></p>
  <p class="lastResult"></p>
  <p class="lowOrHi"></p>
</div>
```

```js
// <p class="guesses"></p> 참조
const guesses = document.querySelector('.guesses');
// <p class="lastResult"></p> 참조
const lastResult = document.querySelector('.lastResult');
// <p class="lowOrHi"></p> 참조
const lowOrHi = document.querySelector('.lowOrHi');
```

* 위의 세 상수는 각각 HTML의 결과 문단(`<p>`)의 참조를 저장하기 위해 만들어졌다.
* 나중에 문단 안에 (결괏)값을 집어넣는데 사용된다.
* 세 요소는 `<div>` 요소 안에 있고, 나중에 게임을 다시 시작할 때 초기화를 위해 세 요소를 모두 선택할 때 사용된다.

```html
<!-- HTML중 입력 폼 -->
<label for="guessField">Enter a guess: </label>
<input type="text" id="guessField" class="guessField">
<input type="submit" value="Submit guess" class="guessSubmit">
```

```js
// <input type="submit" value="Submit guess" class="guessSubmit"> 참조
const guessSubmit = document.querySelector('.guessSubmit');
// <input type="text" id="guessField" class="guessField"> 참조
const guessField = document.querySelector('.guessField');
```

* 위의 두 상수는 텍스트 입력 폼과 제출 버튼의 참조를 저장한다.
* 이후에 추측값을 제출하는 것을 조작하기 위해 사용된다.

```js
let guessCount = 1;
let resetButton;
```

* 마지막 두 변수는 추측 횟수 1과
    * 플레이어가 추측을 몇 회 했는지 추적하는데 사용된다.
* 아직 존재하지 않는 (이후에 만들 예정인) 초기화 버튼의 참조를 저장한다.

### 함수 (Functions)

본격적으로 추측이 맞는지 확인하는 기능을 만들어보자.

### 연산자 (Operators)

### 조건문 (Conditionals)

`checkGuess()` 함수로 돌아가서, 우리가 원하는 것은 단순히 placeholder 메시지(위에서 사용된 "I am a placeholder")를 내뱉는 게 아니다. 이 함수는 플레이어의 추측이 맞거나 틀린지 확인하고 적절하게 응답해야 한다.

그러면 현재의 `checkGuess()` 함수를 다음의 버전으로 바꿔보자.

```js
function checkGuess() {
  let userGuess = Number(guessField.value);
  if (guessCount === 1) {
    guesses.textContent = 'Previous guesses: ';
  }
  guesses.textContent += userGuess + ' ';

  if (userGuess === randomNumber) {
    lastResult.textContent = 'Congratulations! You got it right!';
    lastResult.style.backgroundColor = 'green';
    lowOrHi.textContent = '';
    setGameOver();
  } else if (guessCount === 10) {
    lastResult.textContent = '!!!GAME OVER!!!';
    lowOrHi.textContent = '';
    setGameOver();
  } else {
    lastResult.textContent = 'Wrong!';
    lastResult.style.backgroundColor = 'red';
    if(userGuess < randomNumber) {
      lowOrHi.textContent = 'Last guess was too low!';
    } else if(userGuess > randomNumber) {
      lowOrHi.textContent = 'Last guess was too high!';
    }
  }

  guessCount++;
  guessField.value = '';
  guessField.focus();
}
```

#### 코드 설명
  
```js
let userGuess = Number(guessField.value);
```

* `userGuess` 변수를 선언하고
* 텍스트 필드(`guessField`)에서 입력된 현재 값(`value`)들을 변수의 값으로 지정한다.
* 입력받은 값을 숫자로 확신할 수 있도록 내장 `Number()` 생성자를 사용한다.

```js
if (guessCount === 1) {
    guesses.textContent = 'Previous guesses: ';
}
```

* 조건: `guessCount` 변수의 값이 1과 같은지 (현재 게임이 처음인지 아닌지를 판단하는 조건)
* 위의 조건이 참이면 `guesses`의 텍스트(`textContent`)의 값이 `Previous guesses:`가 된다.

```js
guesses.textContent += userGuess + ' ';
```

* 현재 `userGuess` 값을 `guesses` 문단 마지막에 추가한다.
* 거기에 공백(띄어쓰기)을 추가해 각 추측값 사이가 떨어져있도록 해준다.

```js
if (userGuess === randomNumber) {
    // lastResult의 텍스트 값을 축하 메시지로 지정한다.
    lastResult.textContent = 'Congratulations! You got it right!';
    // lastResult의 배경 색을 초록색으로 지정한다.
    lastResult.style.backgroundColor = 'green';
    // lowOrHi의 텍스트 값을 빈문자로 지정한다.
    lowOrHi.textContent = '';
    setGameOver();
}
```

* 처음에 지정한 `randomNumber`과 사용자가 추측한 값(`userGuess`)이 같은지 확인한다.
* 참이면 플레이어가 숫자를 맞춰 게임에 이긴 것이 된다.
* 그러므로 플레이어에게
    * 초록색 축하 메시지를 보여주고,
    * low/high 여부를 알려주는 안내 박스의 내용을 초기화 한 뒤,
    * 이후에 작성할 `setGameOver()` 함수를 실행한다.

```js
else if (guessCount === 10) {
    // lastResult의 텍스트 값을 게임오버 메시지로 지정한다.
    lastResult.textContent = '!!!GAME OVER!!!';
    // 이전 블록과 동일
    lowOrHi.textContent = '';
    setGameOver();
}
```

* 이번 차례가 사용자의 마지막 차례(10)인지 확인한다.
* 참이면 프로그램이 축하 메시지 대신 게임 오버 메시지를 띄우는 것 외에는 이전 블록과 똑같이 동작한다.

```js
else {
    // lastResult의 텍스트 값을 틀렸다는 메시지로 지정한다.
    lastResult.textContent = 'Wrong!';
    // lastResult의 배경 색을 초록색으로 지정한다.
    lastResult.style.backgroundColor = 'red';
    // userGuess의 값이 randomNumber(정답)보다 작으면
    if(userGuess < randomNumber) {
        // lowOrHi의 텍스트 값을 추측값이 작다는 메시지로 지정한다.
        lowOrHi.textContent = 'Last guess was too low!';
    // userGuess의 값이 randomNumber(정답)보다 크면
    } else if(userGuess > randomNumber) {
        // lowOrHi의 텍스트 값을 추측값이 크다는 메시지로 지정한다.
        lowOrHi.textContent = 'Last guess was too high!';
        }
}
```

* 마지막 블록은 앞선 두 조건이 모두 거짓일 때 실행된다. (i.e. 숫자를 맞추지 못했지만 차례가 남았을 때)
* 이 경우 플레이어에게 틀렸다고 말해주고,
* 추측값이 정답보다 큰지 작은지를 알려주기 위해 또 다른 조건을 확인해 적절한 메시지를 표시한다.

```js
guessCount++;
guessField.value = '';
guessField.focus();
```

* 다음에 제출될 추측을 준비하기 위한 코드이다.
* 플레이어가 자신의 차례를 소비하도록 `guessCount` 변수에 1을 더하고
* 폼의 텍스트 영역의 값을 초기화 한 뒤 여기에 집중 효과를 준다.

### 이벤트 (Events)

`checkGuess()` 함수를 잘 구현했지만 아직 호출하지 않아 아무런 역할을 하지 않는다.

"Submit guess" 버튼을 눌렀을 때 함수를 실행하고 싶기 때문에 **이벤트**를 사용해야 한다.

* 이벤트가 발생했을 때 이를 듣는 구조체를 **이벤트 리스터(event listenrs)**라 하고
* 이에 반응해 실행되는 코드 블록을 **이벤트 핸들러(event handler)**라고 한다.

다음의 코드를 `checkGuess()` 함수 다음에 추가해보자.

```js
guessSubmit.addEventListener('click', checkGuess);
```

이제 버튼을 누르면 예제가 실행된다.

이제 남은 문제는 아직 게임이 끝났을 때 실행되어야 할 `setGameOver()`를 정의하지 않아, 정답을 맞추거나 추측 횟수를 모두 소진했을 때 게임이 고장(break)난다는 것이다. 필요한 코드를 작성하고 예제의 기능을 완성해보자.

### 게임 기능을 종료하기 (Finishing the game functionality)

`setGameOver()` 함수를 현재 코드 가장 아래에 추가해보자.

```js
function setGameOver() {
  guessField.disabled = true;
  guessSubmit.disabled = true;
  resetButton = document.createElement('button');
  resetButton.textContent = 'Start new game';
  document.body.append(resetButton);
  resetButton.addEventListener('click', resetGame);
}
```

#### 코드 설명
  
```js
// guessField의 disabled 속성을 true로 지정
guessField.disabled = true;
// guessSubmit의 disabled 속성을 true로 지정
guessSubmit.disabled = true;
```

* 텍스트 입력 폼과 버튼의 diabled 속성을 `true`로 지정해 이 둘을 비활성화 한다.
* 그렇지 않으면 사용자들이 게임이 종료된 후에도 계속 정답을 제출해 프로그램이 망쳐질 수 있다.
  
```js
resetButton = document.createElement('button');
resetButton.textContent = 'Start new game';
document.body.append(resetButton);
```

* 새로운 `<button>` 요소를 생성하고,
* 라벨(텍스트 콘텐츠)을 "Start new game"으로 지정해
* 현재 HTML의 마지막에 추가한다.

```js
resetButton.addEventListener('click', resetGame);
```

* 새 버튼에 이벤트 리스너를 지정해 클릭하면 `resetGame()` 함수가 실행되도록 한다.

`resetGame()`도 역시 구현해야 한다. 다시 자바스크립트 코드 마지막에 다음 코드를 추가해보자.

```js
function resetGame() {
  guessCount = 1;

  const resetParas = document.querySelectorAll('.resultParas p');
  for (let i = 0 ; i < resetParas.length ; i++) {
    resetParas[i].textContent = '';
  }

  resetButton.parentNode.removeChild(resetButton);

  guessField.disabled = false;
  guessSubmit.disabled = false;
  guessField.value = '';
  guessField.focus();

  lastResult.style.backgroundColor = 'white';

  randomNumber = Math.floor(Math.random() * 100) + 1;
}
```

#### 코드 설명
  
```js
guessCount = 1;
```

* `guessCount` 변수를 1로 지정한다.

```js
const resetParas = document.querySelectorAll('.resultParas p');
for (let i = 0 ; i < resetParas.length ; i++) {
    resetParas[i].textContent = '';
}
```

* 결과 문단의 모든 텍스트를 초기화 한다.
* `<div class="resultParas"></div>` 안의 모든 문단을 선택한 뒤 이들의 `textContent` 값을 빈문자로 지정한다.

```js
resetButton.parentNode.removeChild(resetButton);
```

* 초기화 버튼 요소를 코드(HTML)에서 제거한다.

```js
guessField.disabled = false;
guessSubmit.disabled = false;
guessField.value = '';
guessField.focus();
```

* 폼 요소를 다시 활성화 시키고
* 폼의 텍스트 영역의 값을 빈문자로 초기화 시킨 뒤 여기에 집중효과를 줘 새로운 추측값을 입력받을 준비를 한다.

```js
lastResult.style.backgroundColor = 'white';
```

* `lastResult`의 색상을 제거한다(흰색으로 변경).

```js
randomNumber = Math.floor(Math.random() * 100) + 1;
```

* 임의의 수를 다시 생성해 이전과 같은 값을 추측하지 않도록 한다.

### 반복문 (Loops)

### 객체에 대한 간단한 고찰 (A small discussion on objects)

### 브라우저 객체 다루기 (Playing with browser objects)
