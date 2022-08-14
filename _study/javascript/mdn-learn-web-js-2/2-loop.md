---
layout  : article
title   : 코드를 반복하기 (Looping code)
summary : 
date    : 2021-12-06 15:36:45 +0900
updated : 2021-12-07 16:37:49 +0900
tag     : draft
toc     : true
public  : true
parent  : [[/javascript/mdn-learn-web-js-2]]
latex   : false
---
* TOC
{:toc}

> 이 글은 MDN Learn web development의 [JavaScript building blocks](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks) 중 [Looping code](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Looping_code)의 내용을 번역 및 정리한 글입니다.
>
> * 제가 필요한 부분 위주로 확인하면서 정리하고 있어 글에 덜 작성된 부분이 있을 수 있습니다.
> * 글 작성 후 원문의 내용이 수정되거나 내용을 이해하기 위한 개인적인 설명이나 해석이 있을 수 있습니다. 되도록 원문을 참고해주시길 바랍니다.
> * 잘못된 부분이 있다면 댓글이나 그 외 편하신 방법으로 알려주시면 감사하겠습니다.

## 반복문은 왜 유용할까 (Why are loops useful?)

반복문(loops)은 같은 일을 계속 여러번 하는 것이다. 종종 각 반복마다 코드가 살짝 달라지거나, 코드는 같지만 변수가 다를 수 있다.

### 코드 반복 예제 (Looping code example)

`<canvas>` 요소에 100개의 임의의 원을 그리고 싶다고 가정하자.

이 예제를 구현하기 위한 자바스크립트 코드는 다음과 같다:

```js
const btn = document.querySelector('button');
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const WIDTH = document.documentElement.clientWidth;
const HEIGHT = document.documentElement.clientHeight;

canvas.width = WIDTH;
canvas.height = HEIGHT;

function random(number) {
  return Math.floor(Math.random()*number);
}

function draw() {
  ctx.clearRect(0,0,WIDTH,HEIGHT);
  for (let i = 0; i < 100; i++) {
    ctx.beginPath();
    ctx.fillStyle = 'rgba(255,0,0,0.5)';
    ctx.arc(random(WIDTH), random(HEIGHT), random(50), 0, 2 * Math.PI);
    ctx.fill();
  }
}

btn.addEventListener('click',draw);
```

### 반복문이 있을 때와 없을 때 (With and without a loop)

모든 코드를 이해할 필요는 없지만, 실제로 100개의 원을 그리는 코드 부분을 봐보자:

```js
for (let i = 0; i < 100; i++) {
  ctx.beginPath();
  ctx.fillStyle = 'rgba(255,0,0,0.5)';
  ctx.arc(random(WIDTH), random(HEIGHT), random(50), 0, 2 * Math.PI);
  ctx.fill();
}
```

여기서 기본 개념을 얻어야 한다 - 반복문으로 페이지의 임의 위치에 원을 그리는 코드를 100번 반복(iteration)해 실행한다. 100개, 1,000개, 혹은 10,000개의 원을 그리든 필요한 코드의 양은 같을 것이다. 오직 숫자 하나만 바뀌면 된다.

만약 여기서 반복을 사용하지 않았다면, 그리고 싶은 모든 원에 대해 다음의 코드를 반복해야 했을 것이다:

```js
ctx.beginPath();
ctx.fillStyle = 'rgba(255,0,0,0.5)';
ctx.arc(random(WIDTH), random(HEIGHT), random(50), 0, 2 * Math.PI);
ctx.fill();
```

## 컬렉션에서 반복하기 (Looping through a collection)

컬렉션의 한 유형 중 하나로 이 과정의 [Arrays](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/First_steps/Arrays) 장에서 살펴본 `배열`이 있다. 하지만 자바스크립트에는 `집합(set)`과 `맵(map)`을 포함한 다른 컬렉션도 있다.

### for...of 반복문 (The for...of loop)

```js
const cats = ['Leopard', 'Serval', 'Jaguar', 'Tiger', 'Caracal', 'Lion'];

for (const cat of cats) {
  console.log(cat);
}
```

### map()과 filter() (map() and filter())

자바스크립트에는 컬렉션을 위한 특별한 반복문이 더 있고, 그중 두 개를 여기서 다룰 것이다.

컬렉션의 각 항목에 어떤 작업을 하고 바뀐 항목들을 포함하는 새로운 컬렉션을 생성하고 싶으면 `map()`을 사용할 수 있다:

```js
function toUpper(string) {
  return string.toUpperCase();
}

const cats = ['Leopard', 'Serval', 'Jaguar', 'Tiger', 'Caracal', 'Lion'];

const upperCats = cats.map(toUpper);

console.log(upperCats);
// [ "LEOPARD", "SERVAL", "JAGUAR", "TIGER", "CARACAL", "LION" ]
```

컬렉션의 각 항목을 확인해서 조건과 일치하는 항목만 포함하는 새로운 컬렉션을 생성하고 싶으면 `filter()`를 사용할 수 있다:

```js
function lCat(cat) {
  return cat.startsWith('L');
}

const cats = ['Leopard', 'Serval', 'Jaguar', 'Tiger', 'Caracal', 'Lion'];

const filtered = cats.filter(lCat);

console.log(filtered);
// [ "Leopard", "Lion" ]
```

`map()`과 `filter()` 모두 [함수](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Functions) 모듈에서 배울 *함수 표현식*과 자주 함께 쓰인다는 것을 참고하자. 함수 표현식을 사용하면 위의 예제를 훨씬 더 간결하게 작성할 수 있다:

```js
const cats = ['Leopard', 'Serval', 'Jaguar', 'Tiger', 'Caracal', 'Lion'];

const filtered = cats.filter((cat) => cat.startsWith('L'));
console.log(filtered);
// [ "Leopard", "Lion" ]
```

## 반복문의 표준 (The standard for loop)

```js
for (초기화 식; 조건; 마지막 표현식) {
  // 실행 코드
}
```

### 제곱을 계산하기 (Calculating squares)

### for 반복문으로 컬렉션에서 반복하기 (Looping through collections with a for loop)

컬렉션을 반복할 때 `for...of` 반복문 대신 `for` 반복문을 사용할 수도 있다.

위의 `for...of` 예제를 다시 봐보자:

```js
const cats = ['Leopard', 'Serval', 'Jaguar', 'Tiger', 'Caracal', 'Lion'];

for (const cat of cats) {
  console.log(cat);
}
```

이 코드를 다음처럼 다시 작성할 수 있다:

```js
const cats = ['Leopard', 'Serval', 'Jaguar', 'Tiger', 'Caracal', 'Lion'];

for (let i = 0; i < cats.length; i++) {
  console.log(cats[i]);
}
```

하지만 이 방법은 코드에 버그가 생길 기회가 더 많기 때문에 대부분은 사용할 수 있다면 `for...of`를 사용하는 게 가장 좋다.

때때로 배열을 반복하기 위해 `for` 반복문을 사용할 필요가 있을 수도 있다. 예를 들어, 아래의 코드에서는 고양이의 목록을 나열하는 메시지 로그를 남기려 한다:

```js
const cats = ['Pete', 'Biggles', 'Jasmin'];

let myFavoriteCats = 'My cats are called ';

for (const cat of cats) {
  myFavoriteCats = `${myFavoriteCats}${cat}, `
}

console.log(myFavoriteCats); // "My cats are called Pete, Biggles, Jasmin, "
```

마지막에 출력된 문장은 형식이 그다지 잘 갖춰지지 않았다:

```
My cats are called Pete, Biggles, Jasmin,
```

마지막 고양이는 이렇게 다르게 처리하려고 한다:

```
My cats are called Pete, Biggles, and Jasmin.
```

하지만 이렇게 하려면 반복문을 마지막으로 반복하는 때가 언제인지 알아야 하고, 이렇게 하기 위해 `for` 반복문을 사용해 `i`의 값을 확인(examine)할 수 있다.

```js
const cats = ['Pete', 'Biggles', 'Jasmin'];

let myFavoriteCats = 'My cats are called ';

for (let i = 0; i < cats.length; i++) {
  if (i === cats.length - 1) {   // We are at the end of the array
    myFavoriteCats = `${myFavoriteCats}and ${cats[i]}.`
  } else {
    myFavoriteCats = `${myFavoriteCats}${cats[i]}, `
  }
}

console.log(myFavoriteCats);     // "My cats are called Pete, Biggles, and Jasmin."
```

## break로 반복문을 끝내기 (Exiting loops with break)

## continue로 반복문 건너뛰기 (Skipping iterations with continue)

## while과 do ... while (while and do ... while)

### while 반복문

`for`만이 자바스크립트에서 유일하게 사용할 수 있는 반복문 유형인 것은 아니다. 실제로 다른 유형도 많고, 이것을 지금 모두 이해할 필요는 없지만, 작업할 때 같은 기능(feature)을 조금 다른 방식으로 인식할 수 있도록 몇몇 구조는 살펴볼 가치가 있다.

우선, while 반복문을 살펴보자. 이 반복문의 구문은 다음과 같이 보인다:

```js
초기화 식
while (조건) {
  // 실행 코드

  마지막 표현식
}
```

초기화 변수와 마지막 표현식이 괄호 안에 포함된 대신, 초기화 변수는 반복문 이전에 설정하고, 마지막 표현식은 반복문 안 실행 코드 다음에 포함되어있는 것을 제외하면 `for` 반복문과 매우 비슷한 방식으로 작동한다. 조건은 괄호 안에 포함되고, `for` 대신 `while` 키워드가 그 앞에 온다.

다시 고양이 목록 예제를, 하지만 while 반복문을 사용하기 위해 다시 작성한 것으로 살펴보자:

```js
const cats = ['Pete', 'Biggles', 'Jasmin'];

let myFavoriteCats = 'My cats are called ';

let i = 0;

while (i < cats.length) {
  if (i === cats.length - 1) {
    myFavoriteCats += `and ${cats[i]}.`;
  } else {
    myFavoriteCats += `${cats[i]}, `;
  }

  i++;
}

console.log(myFavoriteCats);     // "My cats are called Pete, Biggles, and Jasmin."
```

### do ... while 반복문

do...while 반복문은 매우 비슷하지만, while 구조에서 약간의 변화가 있다:

```js
초기화 식
do {
  // 실행 코드

  마지막 표현식
} while (조건) 
```

`do...while` 반복문과 `while` 반복문의 가장 주요한 차이점은 *`do...while` 반복문 안의 코드는 항상 최소한 한번 실행된다*는 것이다. 이는 조건이 반복문 안의 코드보다 나중에 오기 때문이다. 그래서 항상 그 코드를 실행하고, 그다음 그 코드를 다시 실행해야 하는지 보기 위해 조건을 확인한다. `while`과 `for` 반복문에서는, 조건 확인을 먼저 해서, 코드가 전혀 실행되지 않을 수도 있다.

고양이 목록 예제를 `do...while` 반복문을 사용해서 다시 작성해보자:

```js
const cats = ['Pete', 'Biggles', 'Jasmin'];

let myFavoriteCats = 'My cats are called ';

let i = 0;

do {
  if (i === cats.length - 1) {
    myFavoriteCats += `and ${cats[i]}.`;
  } else {
    myFavoriteCats += `${cats[i]}, `;
  }

  i++;
} while (i < cats.length);

console.log(myFavoriteCats);     // "My cats are called Pete, Biggles, and Jasmin."
```
