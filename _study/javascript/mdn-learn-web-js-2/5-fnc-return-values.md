---
layout  : article
title   : Function return values
summary : 
date    : 2021-12-08 11:44:22 +0900
updated : 2021-12-08 12:47:23 +0900
tag     : draft
toc     : true
public  : true
parent  : [[/javascript/mdn-learn-web-js-2]]
latex   : false
---
* TOC
{:toc}

> 이 글은 MDN Learn web development의 [JavaScript building blocks](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks) 중 [Function return values](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Return_values)의 내용을 번역 및 정리한 글입니다.
>
> * 제가 필요한 부분 위주로 확인하면서 정리하고 있어 글에 덜 작성된 부분이 있을 수 있습니다.
> * 글 작성 후 원문의 내용이 수정되거나 내용을 이해하기 위한 개인적인 설명이나 해석이 있을 수 있습니다. 되도록 원문을 참고해주시길 바랍니다.
> * 잘못된 부분이 있다면 댓글이나 그 외 편하신 방법으로 알려주시면 감사하겠습니다.

## 반환 값이란? (What are return values?)

**반환 값(return value)**이란 그냥 말 그대로이다 — 함수의 실행이 완료되었을 때 함수가 반환하는 값이다.

(이 시리즈의 [이전 글](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Functions#built-in_browser_functions)에서 가져온) 익숙한 예제로 돌아가 보자:

```js
let myText = 'The weather is cold';
let newString = myText.replace('cold', 'warm');
console.log(newString); // "The weather is warm"을 출력
// replace() 문자열 함수는 문자열을 가져다,
// 하위 문자열을 다른 것으로 바꾸고,
// 그 문자열이 교체된 새 문자열을 반환한다
```

함수가 완료됐을(실행이 끝났을) 때, 함수는 일부 문자열이 교체된 새로운 문자열 값을 반환한다. 위의 코드에서, 반환 값의 결과는 변수 `newString`에 저장된다.

`replace()` 함수 MDN 참고 페이지를 보면, [return value](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace#return_value) 라는 영역을 보게 될 것이다. 가능한 모든 곳에 이 정보를 사용해 보기 위해, 어떤 값이 함수에 의해 반환되는지 이해하고 아는 것은 매우 유용하다.

### 자신의 함수에서 반환 값 사용하기 (Using return values in your own functions)

사용자 정의(custom) 함수에서 값을 반환하기 위해서는, return 키워드가 필요하다.

최근에 이것을 [random-canvas-circles.html](https://github.com/mdn/learning-area/blob/main/javascript/building-blocks/loops/random-canvas-circles.html) 예제에서 봤다. `draw()` 함수는 무작위의 원 100개를 HTML `<canvas>`에 그린다:

```js
function draw() {
  ctx.clearRect(0, 0, WIDTH, HEIGHT);
  for (let i = 0; i < 100; i++) {
    ctx.beginPath();
    ctx.fillStyle = 'rgba(255,0,0,0.5)';
    ctx.arc(random(WIDTH), random(HEIGHT), random(50), 0, 2 * Math.PI);
    ctx.fill();
  }
}
```

각 반복에서, 현재 원의 *x 좌표*, *y 좌표*, *반지름*에 대한 무작위 값을 생성하기 위해, `random()` 함수가 세 번 호출되었다. `random()` 함수는 한 개의 매개변수 — 정수 — 를 받아 0과 그 숫자 사이의 무작위 정수를 반환한다. 이 함수는 다음과 같다:

```js
function random(number) {
  return Math.floor(Math.random() * number);
}
```

이것은 다음과 같이 쓸 수도 있다:

```
function random(number) {
  const result = Math.floor(Math.random() * number);
  return result;
}
```

하지만 첫 번째 코드가 더 빠르게 작성할 수 있고, 간결하다.

함수가 호출될 때마다 `Math.floor(Math.random() * number)` 계산의 결과를 반환한다. 이 반환 값은 함수가 호출될 때 나타나고, 코드는 계속 진행된다.

그래서 다음을 실행했을 때:

```
ctx.arc(random(WIDTH), random(HEIGHT), random(50), 0, 2 * Math.PI);
```

만약 세 개의 `random()` 호출이 각각 값 `500`, `200`, `35`를 반환했다면, 이 줄은 실제로는 다음처럼 실행될 것이다:

```
ctx.arc(500, 200, 35, 0, 2 * Math.PI);
```

함수 호출이 먼저 실행되고, 그다음으로 코드 줄 자체가 실행되기 전에 함수의 반환 값이 함수 호출(식)을 대신한다.
