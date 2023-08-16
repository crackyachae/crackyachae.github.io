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
latex   : false
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

## 181952 문자열 출력하기

```js
// input = [line];

str = input[0];
console.log(str);
```
