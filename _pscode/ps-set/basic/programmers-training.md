---
layout  : article
title   : Programmers_코딩 기초 트레이닝
summary : 
date    : 2023-08-16 22:11:18 +0900
updated : 2023-08-16 23:10:07 +0900
tag     : ps-js
toc     : true
public  : true
parent  : [[/ps-set/basic]]
latex   : true
---
* TOC
{:toc}

> 이 글은 프로그래머스의 [코딩 기초 트레이닝](https://school.programmers.co.kr/learn/challenges/training) 문제를 자바스크립트(JavaScript)으로 풀이한 것을 모아놓은 글입니다.
>
> 일종의 연습 기록이며 제가 정답을 받은 코드와 참고할만한 다른 코드를 같이 기록합니다. 필요한 경우 코드에 대한 해설을 기록합니다만 코드는 통과했어도 해설은 틀릴 수 있기 때문에 가볍게 참고해주시길 부탁드립니다. 피드백은 편하신 방법으로 자유롭게 주시면 감사하겠습니다.
>
> 정렬은 문제번호를 기준으로 되어있으며 문제명으로 검색해서 조회하는 것을 추천드립니다.
>

### 문제 목록

## 181933 - flag에 따라 다른 값 반환하기

```js
function solution(a, b, flag) {
    return flag ? a + b : a - b;
}
```

## 181934 - 조건 문자열

```js
function solution(ineq, eq, n, m) {
    if (eq === '=' && n === m) return 1
    if (ineq === '<' && n < m) return 1
    if (ineq === '>' && n > m) return 1
    return 0
}
```

* `n`과 `m`이 같은 경우를 먼저 처리하면 케이스를 한 개 줄일 수 있다.

### 참고 답안 1

```js
const operations = {
    ">=": (n, m) => n >= m,
    "<=": (n, m) => n <= m,
    ">!": (n, m) => n > m,
    "<!": (n, m) => n < m,
};

function solution(ineq, eq, n, m) {
    const op = operations[ineq + eq];
    return Number(op(n, m));
}
```

* 연산 기호를 key로 하고 수행할 비교 연산의 화살표 함수를 value로 하는 객체를 생성해 수행할 연산을 깔끔하게 가져올 수 있다.

### 참고 답안 2

```js
function solution(ineq, eq, n, m) {
    const str = (n + ineq + eq + m).replace("!", "");
    return answer = eval(str) ? 1 : 0;
}
```

* `replace`와 `eval`을 사용해 주어진 연산기호 자체를 수식으로 이용한다.

## 181935 - 홀짝에 따라 다른 값 반환하기

```js
function solution(n) {
    return n % 2 ? ((n + 1) / 2) ** 2 : (n * (n + 1) * (n / 2 + 1)) / 3;
}
```

### 아이디어 & 풀이

자연수의 합과 제곱수의 합의 공식을 사용한다.

$$
\sum_{k=1}^{n} k = n(n+1) / 2 \\
\sum_{k=1}^{n} k^2 = n(n+1)(2n+1) / 6
$$

* n(n은 홀수) 이하의 홀수의 합을 구하는 식은 다음과 같이 구할 수 있다.

    $$
    \sum_{k=1}^{l} 2k - 1 \quad (l = {n + 1 \over 2}) \\
    $$

* 위 식을 계산해서 n이하의 홀수의 합을 n에 관한 식으로 정리하면

    $$
    \sum_{k=1}^{l} 2k - 1 = 2 \sum_{k=1}^{l}k - \sum_{k=1}^{l}1 = 2 \times {l(l+1) \over 2} - l = l^2 = ({n + 1 \over 2})^2
    $$

* 같은 방식으로 n(n은 짝수) 이하의 짝수의 제곱의 합을 n에 관한 식으로 정리하면

    $$
    \sum_{k=1}^{l} (2k)^2 = 4 \sum_{k=1}^{l}k^2 = 4 \times {l(l+1)(2l+1) \over 6} = {2 \over 3} \times ({n\over 2})({n\over 2}+1)(l+1) = ({l \over 3})({l\over 2}+1)(l+1)
    $$

n의 나머지를 확인해서 짝/홀수 여부를 확인한 뒤 각 경우에 따른 계산 값을 반환하면 된다.

## 181936 - 공배수

```js
function solution(number, n, m) {
    return number % n === 0 && number % m === 0 ? 1 : 0;
}
```

### 참고 답안

```js
function solution(number, n, m) {
    return +!(number % n || number % m);
}
```

* `number`가 `n`과 `m`의 공배수일 경우에만 `(number % n || number % m)`의 구문이 `0`을 반환한다.
* 위는 조건과 반대의 결과를 반환하므로 `!`를 사용해서 결과를 뒤집는다.
* 위 과정에서 `0`은 `true`로 `1`은 `false`로 변환되므로 이를 다시 `+`로 숫자로 변환한다.
    * `Number(true) === 1`, `Number(false) === 0` 이다.

## 181937 - n의 배수

```js
function solution(num, n) {
  return num % n ? 0 : 1;
}
```

## 181938 - 두 수의 연산값 비교하기

```js
function solution(a, b) {
    const ab = `${a}${b}`;
    return Math.max(ab, 2 * a * b);
}
```

## 181939 - 더 크게 합치기

```js
function solution(a, b) {
    const str_a = a.toString();
    const str_b = b.toString();

    return Math.max(str_a + str_b, str_b + str_a);
}
```

### 참고 답안

```js
function solution(a, b) {
    return Math.max(Number(`${a}${b}`), Number(`${b}${a}`));
}
```

## 181940 - 문자열 곱하기

```js
function solution(my_string, k) {
    return Array(k).fill(my_string).join("");
}
```

### 참고 답안

```js
function solution(my_string, k) {
    return my_string.repeat(k);
}
```

## 181941 - 문자 리스트를 문자열로 변환하기

```js
function solution(arr) {
    return arr.join("");
}
```

## 181942 - 문자열 섞기

```js
function solution(str1, str2) {
    let answer = "";
    const l = str1.length;

    for (let i = 0; i < l; i += 1) {
        answer += str1[i] + str2[i];
    }

    return answer;
}
```

### 참고 답안

```js
function solution(str1, str2) {
    return [...str1].map((x, i) => x + str2[i]).join("");
}
```

* `map`과 `join`을 이용해서 간결하게 작성한 풀이.

## 181943 - 문자열 겹쳐쓰기

```js
function solution(my_string, overwrite_string, s) {
    let answer = [...my_string];
    const len = overwrite_string.length;

    for (let i = 0; i < len; i += 1) {
        answer[i + s] = overwrite_string[i];
    }

    return answer.join("");
}
```

## 181944 - 홀짝 구분하기

### 문제 풀이에 앞서

181944번 부터 181952번 문제의 답변은 입출력을 위한 템플릿을 제외하고 다음 코드의 `{code}` 부분만 작성합니다.

```js
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let input = [];

rl.on('line', function (line) {
    // 입력받은 line을 적절한 input으로 처리하는 코드.
    // 문제마다 다르므로 참고를 위해 주석으로 작성합니다.
    input = line.split(' ');
}).on('close', function () {
    // {code}
});
```

### 181944 문제 답변

```js
// input = line.split(' ');

n = Number(input[0]);
console.log(`${n} is ${n % 2 ? "odd" : "even"}`);
```

## 181945 - 문자열 돌리기

```js
// input = [line];

str = input[0];
console.log([...str].join("\n"));

```

## 181946 - 문자열 붙여서 출력하기

```js
// input = line.split(' ');

str1 = input[0];
str2 = input[1];
console.log(str1 + str2);

```

## 181947 - 덧셈식 출력하기

```js
// input = line.split(" ");

console.log(`${input[0]} + ${input[1]} = ${Number(input[0]) + Number(input[1])}`);
```

## 181948 - 특수문자 출력하기

```js
console.log("!@#$%^&*(\\'\"<>?:;");
```

## 181949 - 대소문자 바꿔서 출력하기

```js
// input = [line];

str = input[0];
let converted = "";

str.split("").forEach((char) => {
    const upperChar = char.toUpperCase();
    // char is upper
    if (char === upperChar) {
        converted += char.toLowerCase();
        // char is lower
    } else {
        converted += upperChar;
    }
});

console.log(converted);

```

### 참고 답안

```js
// input = [...line];

console.log(
    input.map((char) => (/[a-z]/.test(char) ? char.toUpperCase() : char.toLowerCase())).join("")
);
```

* 대소문자 여부 확인을 정규표현식을 이용해서 했다.
* 로직분리에 삼항연산자를 사용해서 보다 간결하게 작성했다.

## 181950 - 문자열 반복해서 출력하기

```js
// input = line.split(' ');

str = input[0];
n = Number(input[1]);

const strs = Array(n).fill(str).join("");
console.log(strs);
```

## 181951 - a와 b 출력하기

```js
// input = line.split(' ');

console.log(`a = ${input[0]}\nb = ${input[1]}`);
```

## 181952 - 문자열 출력하기

```js
// input = [line];

str = input[0];
console.log(str);
```
