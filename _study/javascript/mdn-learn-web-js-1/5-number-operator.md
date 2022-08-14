---
layout  : article
title   : 자바스크립트의 기본적인 연산 - 숫자와 연산자 (Basic math in JavaScript — numbers and operators)
summary : 
date    : 2021-12-03 12:21:00 +0900
updated : 2021-12-03 15:43:36 +0900
tag     : draft
toc     : true
public  : true
parent  : [[/javascript/mdn-learn-web-js-1]]
latex   : false
---
* TOC
{:toc}

> 이 글은 MDN Learn web development의 [JavaScript First Step](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/First_steps) 중 [Basic math in JavaScript — numbers and operators](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/First_steps/Math)의 내용을 번역 및 정리한 글입니다.
>
> * 제가 필요한 부분 위주로 확인하면서 정리하고 있어 글에 덜 작성된 부분이 있을 수 있습니다.
> * 글 작성 후 원문의 내용이 수정되거나 내용을 이해하기 위한 개인적인 설명이나 해석이 있을 수 있습니다. 되도록 원문을 참고해주시길 바랍니다.
> * 잘못된 부분이 있다면 댓글이나 그 외 편하신 방법으로 알려주시면 감사하겠습니다.

## 모두가 수학을 좋아한다 (Everybody loves math)

### 숫자의 종류 (Types of numbers)

### 나에겐 전부 숫자(일뿐이)야 (It's all numbers to me)

### 유용한 숫자 메소드 (Useful Number methods)

자바스크립트에서 사용할 모든 표준 숫자를 나타내는 인스턴스인 Number 객체는 숫자를 다루기 위한 몇 개의 유용한 메소드를 제공한다. 이 글을 간단한 안내서로 유지하고, 정말 필요한 기초만을 다루고 싶기 때문에 이 글에서 이런 메소드들을 자세하게 다루지는 않을 것이다; 하지만 이 모듈을 몇 번 읽고 나면 객체 참조 페이지로 이동해 사용할 수 있는 메소드들에 대해 자세히 알아보는 것도 추천한다.

예를 들어, 현재 숫자를 고정된 소수점 자리의 수로 반올림(round)하려면, `toFixed()` 메소드를 사용한다. 브라우저의 콘솔에 다음의 코드를 입력해보자.

```js
let lotsOfDecimal = 1.766584958675746364;
lotsOfDecimal; // 1.766584958675746364
let twoDecimalPlaces = lotsOfDecimal.toFixed(2);
twoDecimalPlaces; // 1.76
```

### 숫자 데이터 유형으로 변환하기 (Converting to number data types)

가끔은 문자열 유형으로 저장되어있어 계산을 수행하기 어려운 숫자를 마주칠(end up) 수도 있다. 이런 일은 데이터가 양식 입력창에 입력되고 입력 유형이 문자(text)일 때 가장 일반적으로 발생한다. 이 문제를 해결할 방법이 있다 - 문자열 값을 `Number()` 생성자로 전달해 동일한 값의 숫자 버전을 반환받는 것이다.

예를 들어, 콘솔에 이 코드들을 입력해보자:

```js
let myNumber = '74';
myNumber += 3;
```

`myNumber`가 실제로 문자열로 정의되었기 때문에 결과는 77이 아닌 743이 된다. 다음의 코드로 이를 확인할 수 있다.

```js
typeof myNumber;
```

계산을 수정하려면 이렇게 하면 된다:

```js
Number(myNumber) + 3;
```

## Arithmetic operators

### 연산자 우선순위 (Operator precedence)

자바스크립트에서 연산자의 우선순위는 학교 수학 수업에서 배운 것과 같다 - 곱셈과 나눗셈을 항상 먼저 끝내고 그다음에 덧셈과 뺄셈을 한다 (합계는 항상 왼쪽에서 오른쪽으로 계산된다).

연산자의 우선순위를 다시 정하고 싶으면 명시적으로 처음으로 계산(dealt with)할 부분 주변에 괄호를 놓으면 된다. 그러므로 6을 결과로 얻고 싶으면 이렇게 하면 된다:

```js
(num2 + num1) / (8 + 2);
```

## 증감 연산자 (Increment and decrement operators)

콘솔에서 이것을 갖고 놀아보자. 우선 이 연산자를 숫자에 직접 적용할 수 없다는 것에 유의하자. 이상해 보일 수 있지만, 변수에 새로운 값을 할당하는 것이지 변수의 값 자체를 연산하는 것이 아니다. 다음의 코드는 오류가 발생한다:

```js
3++
```

존재하는 변수만 증가시킬 수 있다. 다음을 시도해보자:

```js
let num1 = 4;
num1++;
```

이상한 점 두 번째! 위의 코드를 실행하면, 값이 4로 반환된다 - 이는 브라우저가 현재 값을 반환한 다음에 변수의 값을 증가시키기 때문이다. 변수의 값을 다시 반환시키면 값이 증가한 것을 볼 수 있다:

```js
num1
```

## 대입 연산자 (Assignment operators)

## 활동적 학습: 캔버스 상자의 크기를 조정하기 (Active learning: sizing a canvas box)

## 비교 연산자 (Comparison operators)

> Note: 일부 사람들이 동치 비교 테스트를 위해 `==`와 `!=`를 사용하는 것을 볼 수 있다. 이것은 자바스크립트에서 유효한 연산자이긴 하지만 `===`/`!==`와는 다르다. 앞의 버전은 값이 같은지는 확인하지만, 값의 데이터 유형이 같은지는 확인하지 않는다. 엄격한 버전인 후자는 값과 데이터 유형 모두가 같은지 확인한다. 엄격한 버전이 더 적은 오류를 발생시키기 때문에 이것을 사용하는 것을 추천한다.

비교 연산자를 사용한 로직을 구현한 코드는 이후의 글에서 조건문을 볼 때 확인할 것이다. 지금은 빠르게 예제를 봐보자:

```html
<button>Start machine</button>
<p>The machine is stopped.</p>
```

```js
const btn = document.querySelector('button');
const txt = document.querySelector('p');

btn.addEventListener('click', updateBtn);

function updateBtn() {
  if (btn.textContent === 'Start machine') {
    btn.textContent = 'Stop machine';
    txt.textContent = 'The machine has started!';
  } else {
    btn.textContent = 'Start machine';
    txt.textContent = 'The machine is stopped.';
  }
}
```

`updateBtn()` 함수 안에서 동치 연산자가 쓰인 것을 볼 수 있다.

* 이 경우, 두 수학 표현식이 같은 값을 갖는지 확인하지는 않는다 - 버튼의 텍스트 콘텐츠가 특정 문자열을 포함하고 있는지 확인하지만 - 여전히 같은 원리로 작동하긴 한다.
* 만약 버튼이 눌렸을 때 "Start machine"이라고 말하고 있다면, 그 라벨을 "Stop machine"으로 바꾸고 라벨을 적절히 수정한다.
* 버튼이 눌렸을 때 "Stop machine" 이라고 말하고 있으면 화면을 다시 돌려(swap back)놓는다.
