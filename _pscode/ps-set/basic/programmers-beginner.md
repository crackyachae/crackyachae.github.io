---
layout  : article
title   : Programmers_코딩 테스트 입문
summary : 
date    : 2023-08-16 22:11:27 +0900
updated : 2023-08-16 22:11:27 +0900
tag     : ps-js
toc     : true
public  : true
parent  : [[/ps-set/basic]]
latex   : false
---
* TOC
{:toc}

> 이 글은 프로그래머스의 [코딩테스트 입문](https://school.programmers.co.kr/learn/challenges/beginner) 문제를 자바스크립트(JavaScript)으로 풀이한 것을 모아놓은 글입니다.
>
> 일종의 연습 기록이며 제가 정답을 받은 코드와 참고할만한 다른 코드를 같이 기록합니다. 필요한 경우 코드에 대한 해설을 기록합니다만 코드는 통과했어도 해설은 틀릴 수 있기 때문에 가볍게 참고해주시길 부탁드립니다. 피드백은 편하신 방법으로 자유롭게 주시면 감사하겠습니다.
>
> 정렬은 문제번호를 기준으로 되어있으며 문제명으로 검색해서 조회하는 것을 추천드립니다.

### 문제 목록

## 120802 - 두 수의 합

```js
function solution(num1, num2) {
    return num1 + num2;
}
```

## 120803 - 두 수의 차

```js
function solution(num1, num2) {
    return num1 - num2;
}
```

## 120804 - 두 수의 곱

```js
function solution(num1, num2) {
    return num1 * num2;
}
```

## 120805 - 몫 구하기

```js
function solution(num1, num2) {
    return Math.floor(num1 / num2);
}
```

### 참고 답안

```js
function solution(num1, num2) {
    return Math.trunc(num1 / num2);
}
```

* `trunc`는 소숫점 아래를 절삭하는 메소드이다. 계산 결과가 음수일 때 소숫점 아래를 절삭하기에 `floor`보다 유용하다.

## 120806 - 두 수의 나눗셈

```js
function solution(num1, num2) {
    return Math.trunc((num1 / num2) * 1000);
}
```

## 120807 - 숫자 비교하기

```js
function solution(num1, num2) {
    return num1 === num2 ? 1 : -1;
}
```

## 120808 - 분수의 덧셈

```js
// a > b
function getGcd(a, b) {
    if (b === 0) {
        return a;
    } else {
        return getGcd(b, a % b);
    }
}

function reduction(numer, denom) {
    const gcd = getGcd(Math.max(numer, denom), Math.min(numer, denom));

    return [numer / gcd, denom / gcd];
}

function solution(numer1, denom1, numer2, denom2) {
    const denom = denom1 * denom2;
    const numer = numer1 * denom2 + numer2 * denom1;

    const [newNumer, newDenom] = reduction(numer, denom);

    return [newNumer, newDenom];
}
```

### 아이디어 & 풀이

예외 케이스를 생각하지 못해 일부 테스트 통과가 되지 않는 경우가 많은 문제이다. 계산 결과가 기약 분수(분자와 분모 사이에 1이 아닌 공약수가 없는 분수)아니거나 `numer`와 `denom`이 약분이 안된 채로 주어지는 경우 등을 고려해야 한다. 다음과 같은 반례를 테스트 해보면 좋다.

|`numer1`|`denom1`|`numer2`|`denom2`|`result`|
| --- | --- | --- | --- | --- |
| 4 | 4 | 4 | 4 | [2, 1] |
| 60 | 3 | 500 | 50 | [30, 1] |

가장 간단한 방법으로는 분수끼리의 덧셈까지는 공약수를 고려하지 않고 계산한 뒤 마지막에 약분해주면 된다.

* 약분은 분자와 분모의 최대공약수를 구한 뒤 각각을 최대공약수로 나눈 값을 반환하면 된다.
* 최대공약수를 구하는 데는 유클리드 호제법을 사용했다.

## 120809 - 배열 두배 만들기

```js
function solution(numbers) {
    return numbers.map((n) => n * 2);
}
```

## 120810 - 나머지 구하기

```js
function solution(num1, num2) {
    return num1 % num2;
}
```

## 120811 - 중앙값 구하기

```js
function solution(array) {
    return array.sort((a, b) => b - a)[(array.length + 1) / 2 - 1];
}
```

## 120812 - 최빈값 구하기

```js
function solution(array) {
    const count = {};
    const max = [0, 0];

    array.forEach((n) => {
        count[n] ? (count[n] += 1) : (count[n] = 1);
        if (count[n] == max[1]) {
            max[1] = -1;
        } else if (count[n] > max[1]) {
            max[0] = n;
            max[1] = count[n];
        }
    });
    return max[1] === -1 ? -1 : max[0];
}
```

## 120813 - 짝수는 싫어요

```js
function solution(n) {
    return Array(Math.ceil(n / 2))
        .fill(0)
        .map((n, i) => 2 * i + 1);
}
```

### 참고 답안

```js
function solution(n) {
    const answer = [];
    for (let i = 1; i <= n; i += 2) {
        answer.push(i);
    }

    return answer;
}
```

## 120814 - 피자 나눠 먹기 (1)

```js
function solution(n) {
    return Math.ceil(n / 7);
}
```

## 120815 - 피자 나눠 먹기 (2)

```js
function getGcd(a, b) {
    return b === 0 ? a : getGcd(b, a % b);
}

function solution(n) {
    const gcd = getGcd(n, 6);
    return n / gcd;
}
```

### 아이디어 & 풀이

피자 6조각을 n명이 나누어 떨어지게 먹으려면 피자 조각수는 6과 n의 최소공배수여야 한다.

* 최소공배수는 `n * 6 / 최대공약수` 이다.
* 피자 수는 조각수를 6으로 나눈 값이므로 구하려는 값은 `n / 최대공약수`이다.
* 최대공약수는 유클리드 호제법을 이용해 구한다.

### 참고 답안

```js
function solution(numbers) {
    let piece = 6;

    while (true) {
        if (piece % numbers === 0) {
            break;
        }
        piece += 6;
    }

    return piece / 6;
}
```

* 문제 요구를 조금 더 직접적으로 구현한 풀이인 것 같다.

## 120816 - 피자 나눠 먹기 (3)

```js
function solution(slice, n) {
    return Math.ceil(n / slice);
}
```

## 120817 - 배열의 평균값

```js
function solution(numbers) {
    return numbers.reduce((acc, curr) => acc + curr) / numbers.length;
}
```
