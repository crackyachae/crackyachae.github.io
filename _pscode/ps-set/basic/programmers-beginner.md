---
layout  : article
title   : Programmers_코딩 테스트 입문
summary : 
date    : 2023-08-16 22:11:27 +0900
updated : 2023-10-20 01:12:17 +0900
tag     : ps-js
toc     : true
public  : true
parent  : [[/ps-set/basic]]
latex   : true
---
* TOC
{:toc}

> 이 글은 프로그래머스의 [코딩테스트 입문](https://school.programmers.co.kr/learn/challenges/beginner) 문제를 자바스크립트(JavaScript)으로 풀이한 것을 모아놓은 글입니다.
>
> 일종의 연습 기록이며 제가 정답을 받은 코드와 참고할만한 다른 코드를 같이 기록합니다. 필요한 경우 코드에 대한 해설을 기록합니다만 코드는 통과했어도 해설은 틀릴 수 있기 때문에 가볍게 참고해주시길 부탁드립니다. 피드백은 편하신 방법으로 자유롭게 주시면 감사하겠습니다.
>
> 정렬은 문제번호를 기준으로 되어있으며 문제명으로 검색해서 조회하는 것을 추천드립니다.

### 문제 목록

## 120583 - 중복된 숫자 개수

```js
function solution(array, n) {
    return array.filter((v) => v === n).length;
}
```

## 120585 - 머쓱이보다 키 큰 사람

```js
function solution(array, height) {
    return array.filter((h) => h > height).length;
}
```

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

## 120818 - 옷가게 할인 받기

```js
function solution(price) {
    if (price >= 500000) {
        return Math.trunc(price * 0.8);
    }
    if (price >= 300000) {
        return Math.trunc(price * 0.9);
    }
    if (price >= 100000) {
        return Math.trunc(price * 0.95);
    }

    return price;
}
```

## 120819 - 아이스 아메리카노

```js
function solution(money) {
    return [Math.trunc(money / 5500), money % 5500];
}
```

## 120820 - 나이 출력

```js
function solution(age) {
    return 2022 - age + 1;
}
```

## 120821 - 배열 뒤집기

```js
function solution(num_list) {
    return num_list.reverse();
}
```

## 120822 - 문자열 뒤집기

```js
function solution(my_string) {
    return [...my_string].reverse().join("");
}
```

## 120823 - 직각삼각형 출력하기

```js
const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

let input = [];

rl.on("line", function (line) {
    input = line.split(" ");
}).on("close", function () {
    const n = Number(input);
    console.log(
        Array(n)
            .fill(0)
            .map((c, i) =>
                Array(i + 1)
                    .fill("*")
                    .join("")
            )
            .join("\n")
    );
});
```

### 참고 답안

```js
const n = Number(input);
console.log(
    Array(n)
        .fill("*")
        .map((c, i) => c.repeat(i + 1))
        .join("\n")
);
```

* `repeat` 메소드를 사용하면 더 간단하게 작성할 수 있다.

## 120824 - 짝수 홀수 개수

```js
function solution(num_list) {
    const oddCount = num_list.filter((n) => n % 2).length;
    return [num_list.length - oddCount, oddCount];
}
```

### 참고 답안

```js
function solution(num_list) {
    const answer = [0, 0];

    for (let a of num_list) {
        answer[a % 2] += 1;
    }

    return answer;
}
```

* 2로 나눈 나머지 값을 단순히 구분 조건이 아니라 반환하는 `answer` 배열의 인덱스로 사용한 풀이이다.

## 120825 - 문자 반복 출력하기

```js
function solution(my_string, n) {
    return [...my_string].map((c) => c.repeat(n)).join("");
}
```

## 120826 - 특정 문자 제거하기

```js
function solution(my_string, letter) {
    return [...my_string].filter((c) => c !== letter).join("");
}
```

### 참고 답안

```js
function solution(my_string, letter) {
    const answer = my_string.split(letter).join("");
    return answer;
}
```

* 지정된 문자로 `split` 하면 해당 문자가 제거되면서 해당 문자를 기준으로 문자열이 나눠지므로 다시 `join` 하기만 하면 된다.

## 120829 - 각도기

```js
function solution(angle) {
    return angle % 90 ? [1, 3][Math.trunc(angle / 90)] : [2, 4][angle / 90 - 1];
}
```

### 참고 답안

```js
function solution(angle) {
    return [0, 90, 91, 180].filter((x) => angle >= x).length;
}
```

## 120830 - 양꼬치

```js
function solution(n, k) {
    return n * 12000 + (k - Math.trunc(n / 10)) * 2000;
}
```

### 참고 답안

```js
function solution(n, k) {
    k -= ~~(n / 10);
    if (k < 0) k = 0;
    return n * 12000 + k * 2000;
}
```

* tile (`~`) 연산자를 두 번 사용해 소숫점 이하를 절삭한 풀이이다.
    * [Bitwise NOT (~)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Bitwise_NOT) by MDN
    * 해당 수를 이진수로 변환한 뒤 각 자리의 1 혹은 0을 반대로 전환하는 연산자로 `~n`의 결과값은 `-(n + 1)`과 같다. 변환 과정에서 소숫점 아래는 절삭되므로 "양수"의 경우 이를 두 번 반복하면 소숫점 아래를 절삭한 값을 얻을 수 있다.

## 120831 - 짝수의 합

```js
function solution(n) {
    return (Math.trunc(n / 2)) * (Math.trunc(n / 2) + 1);
}
```

## 120833 - 배열 자르기

```js
function solution(numbers, num1, num2) {
    return numbers.slice(num1, num2 + 1);
}
```

## 120834 - 외계행성의 나이

```js
const PRO = {
    0: "a",
    1: "b",
    2: "c",
    3: "d",
    4: "e",
    5: "f",
    6: "g",
    7: "h",
    8: "i",
    9: "j",
};

function solution(age) {
    return [...`${age}`].map((c) => PRO[c]).join("");
}
```

### 참고 답안

```js
function solution(age) {
    return [...age.toString()].map((v) => "abcdefghij"[v]).join("");
}
```

* 숫자-문자간 변환을 직접 하지 않고 문자열로 작성한 뒤 문자열의 인덱스를 이용했다.

## 120835 - 진료 순서 정하기

```js
function solution(emergency) {
    const sorted = [...emergency].sort((a, b) => b - a);
    return emergency.map((n) => sorted.indexOf(n) + 1);
}
```

## 120836 - 순서쌍의 개수

```js
function getPrime(n) {
    const r = Math.trunc(n ** 0.5);
    const prime = Array(r + 1).fill(0);
    let i = 2;

    while (i <= r) {
        while (!(n % i)) {
            prime[i] += 1;
            n /= i;
        }
        i += 1;
    }

    if (n > 1) {
        // r의 범위를 넘어가는 소수가 남을 수 있으므로
        // 그냥 idx 0을 해당 수로 생각하고 약수의 개수를 증가시킨다.
        prime[0] += 1;
    }

    return prime;
}

function solution(n) {
    if (n === 1) {
        return 1;
    }

    return getPrime(n)
        .filter((n) => n)
        .map((n) => n + 1)
        .reduce((acc, curr) => acc * curr);
}
```

### 참고 풀이

```js
function solution(n) {
    let ans = 0;
    for (let i = 1; i < Math.sqrt(n); i++) if (n % i === 0) ans += 2;

    return Number.isInteger(Math.sqrt(n)) ? ans + 1 : ans;
}
```

* [TODO] 추후에 확인해보기.

## 120837 - 개미 군단

```js
function solution(hp) {
    return Math.trunc(hp / 5) + Math.trunc((hp % 5) / 3) + ((hp % 5) % 3);
}
```

## 120838 - 모스부호 (1)

```js
const morse = { 
    '.-':'a','-...':'b','-.-.':'c','-..':'d','.':'e','..-.':'f',
    '--.':'g','....':'h','..':'i','.---':'j','-.-':'k','.-..':'l',
    '--':'m','-.':'n','---':'o','.--.':'p','--.-':'q','.-.':'r',
    '...':'s','-':'t','..-':'u','...-':'v','.--':'w','-..-':'x',
    '-.--':'y','--..':'z'
}

function solution(letter) {
    return letter.split(" ").map(c => morse[c]).join("");
}
```

## 120839 - 가위 바위 보

```js
const rspWin = {
    0: "5",
    2: "0",
    5: "2",
};

function solution(rsp) {
    return [...rsp].map((c) => rspWin[c]).join("");
}
```

## 120840 - 구슬을 나누는 경우의 수

```js
function factorial(n) {
    if (n === 0 || n === 1) {
        return BigInt(1);
    }

    return Array.from(Array(n), (_, i) => i + 1).reduce((acc, curr) => BigInt(acc) * BigInt(curr));
}

function solution(balls, share) {
    return factorial(balls) / factorial(balls - share) / factorial(share);
}
```

### 아이디어 & 풀이

* 질문 목록중 [문제 해결에 놓치기 쉬운 내용 간단 정리_코드x](https://school.programmers.co.kr/questions/42602)을 참고하면 좋다.
* 팩토리얼을 그냥 계산하면 주어진 최대 인풋인 30!의 경우 기존 `Number` 자료형의 범위를 넘어가므로 `BigInt`형으로 변환해주어야 한다.
    * [BigInt](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/BigInt) by MDN
    * `BigInt` 자료형은 숫자 뒤에 `n`을 붙여서 표현하며 `Number` 자료형과 혼용하여 계산할 수 없다.
* `n === 0`인 경우에만 `BigInt(1)`이 반환되도록 하면 `n`이 1일 때 `reduce`에서 초기값인 숫자 1만 반환하므로 계산에서 오류가 난다.
    * 위의 풀이처럼 `n === 1`인 경우에도 예외처리를 해주거나
    * 처음 `Array.from`으로 배열을 만들 때 반환 값을 `i + 1`이 아닌 `BigInt(i + 1)`로 반환하면 된다.

### 참고 답안

```js
function factorial(num) {
    return num === 0 ? 1 : num * factorial(num - 1);
}

function solution(balls, share) {
    return Math.round(factorial(balls) / factorial(balls - share) / factorial(share));
}
```

* 팩토리얼을 재귀를 이용해서 구현했다.
* `BigInt`형으로 변환해서 계산하지 않고 계산 결과에 `Math.round` 처리를 해주었다. 답안 댓글을 보면 `Math.floor`가 아닌 `Math.round`만 제대로 계산하는 것 같다.

## 120841 - 점의 위치 구하기

```js
function solution(dot) {
    const [x, y] = dot;

    if (y > 0) {
        if (x > 0) {
            return 1;
        } else {
            return 2;
        }
    } else {
        if (x < 0) {
            return 3;
        } else {
            return 4;
        }
    }
}
```

## 120842 - 2차원으로 만들기

```js
function solution(num_list, n) {
    const answer = Array.from(Array(num_list.length / n), () => []);
    num_list.forEach((num, i) => {
        answer[Math.trunc(i / n)].push(num);
    });

    return answer;
}
```

### 참고 답안

```js
function solution(num_list, n) {
    return Array(num_list.length / n)
        .fill([])
        .map(() => num_list.splice(0, n));
}
```

## 120843 - 공 던지기

```js
function solution(numbers, k) {
    return numbers[(k * 2 - 2) % numbers.length];
}
```

### 피드백

* `(k - 1) * 2`로 푸는 경우가 더 많다.

## 120844 - 배열 회전시키기

```js
function solution(numbers, direction) {
    return direction[0] === "l" ? [...numbers.slice(1), numbers[0]] : [numbers.pop(), ...numbers];
}
```

### 참고 답안

```js
function solution(numbers, direction) {
    direction === "right" ? numbers.unshift(numbers.pop()) : numbers.push(numbers.shift());
    return numbers;
}
```

## 120845 - 주사위의 개수

```js
function solution(box, n) {
    return box.map((l) => Math.trunc(l / n)).reduce((acc, curr) => acc * curr);
}
```

### 피드백

* 별도의 `map` 없이 `reduce`에서 `Math.trunc(curr / n)` 처리를 하면 더 깔끔하다.

## 120846 - 합성수 찾기

```js
const prime = [
    2, 3, 5, 7, 11, 13, 17, 19, 23, 29,
    31, 37, 41, 43, 47, 53, 59, 61, 67,
    71, 73, 79, 83, 89, 97,
];

function solution(n) {
    // subtract 1 for 1
    return n - prime.filter((p) => p <= n).length - 1;
}
```

### 아이디어 & 풀이

* 합성수는 1과 소수가 아닌 수이므로 n에서 n까지의 소수의 개수와 1에 해당하는 1을 빼준 값을 반환한다.
* 100까지의 소수는 많지 않아서 직접 작성한 뒤 `filter`를 이용해 그 개수를 구했지만 범위가 넓어지면 `n`까지의 소수의 개수를 구하는 함수를 별도로 작성해 푸는 게 나을 것 같다.

## 120847 - 최댓값 만들기 (1)

```js
function solution(numbers) {
    numbers.sort((a, b) => b - a);
    return numbers[0] * numbers[1];
}
```

## 120848 - 팩토리얼

```js
const factorial = [1, 2, 6, 24, 120, 720, 5040, 40320, 362880, 3628800];

function solution(n) {
    return factorial.filter((f) => f <= n).length;
}
```

## 120849 - 모음 제거

```js
function solution(my_string) {
    return [...my_string].filter((c) => !/a|e|i|o|u/.test(c)).join("");
}
```

### 참고 답안

```js
function solution(my_string) {
    return my_string.replace(/[aeiou]/g, "");
}
```

* `replace`를 사용하면 더 간단하게 작성할 수 있다.

## 120850 - 문자열 정렬하기 (1)

```js
function solution(my_string) {
    return [...my_string]
        .map((c) => parseInt(c))
        .filter((n) => Number.isInteger(n))
        .sort((a, b) => a - b);
}
```

### 참고 답안

```js
function solution(my_string) {
    return my_string
        .match(/\d/g)
        .map((n) => Number(n));
        .sort((a, b) => a - b)
}
```

* 정규 표현식을 사용해 숫자만 남긴 뒤 변환 및 정렬을 수행한 풀이이다.

## 120851 - 숨어있는 숫자의 덧셈 (1)

```js
function solution(my_string) {
    return my_string
        .match(/\d/g)
        .map((n) => Number(n))
        .reduce((acc, curr) => acc + curr);
}
```

## 120852 - 소인수분해

```js
function solution(n) {
    const r = Math.ceil(n ** 0.5);
    const answer = [];

    let i = 2;

    while (i <= r) {
        if (!(n % i)) {
            answer.push(i);
            n /= i;
        } else {
            i += 1;
        }
    }

    if (n > 1) answer.push(n);

    return [...new Set(answer)];
}
```

## 120853 - 컨트롤 제트

```js
function solution(s) {
    return s
        .replace(/-*\d+ Z/g, "")
        .split(" ")
        .map((n) => Number(n))
        .reduce((acc, curr) => acc + curr);
}
```

### 참고 답안

```js
function solution(s) {
    const stack = [];

    s.split(" ").forEach((target) => {
        if (target === "Z") stack.pop();
        else stack.push(+target);
    });

    return stack.length ? stack.reduce((acc, cur) => acc + cur) : 0;
}
```

* stack을 이용한 풀이다. 위의 풀이보다 더 빠르게 실행된다.

## 120854 - 배열 원소의 길이

```js
function solution(strlist) {
    return strlist.map((s) => s.length);
}
```

## 120860 - 직사각형 넓이 구하기

```js
function solution(dots) {
    const [[x1, y1], [x2, y2], [x3, y3], [x4, y4]] = dots;
    const xs = [x1, x2, x3, x4].sort((a, b) => a - b);
    const ys = [y1, y2, y3, y4].sort((a, b) => a - b);

    return (xs.pop() - xs[0]) * (ys.pop() - ys[0]);
}
```

### 피드백

* 직접 구조분해를 하는 것보다 `map` 등을 이용해서 `x`배열과 `y`배열을 구성하는 게 더 깔끔할 것 같다.
* `sort` 하지 않고 `min`과 `max`를 사용해도 된다.

```js
function solution(dots) {
    const x = []
    const y = [];

    for (const pos of dots) {
        x.push(pos[0]);
        y.push(pos[1]);
    }

    return (Math.max(...x) - Math.min(...x)) * (Math.max(...y) - Math.min(...y));
}
```

### 120861 - 캐릭터의 좌표

```js
const keyMap = {
    up: [0, 1],
    down: [0, -1],
    left: [-1, 0],
    right: [1, 0],
};

function solution(keyinput, board) {
    const xEdge = (board[0] - 1) / 2;
    const yEdge = (board[1] - 1) / 2;

    return keyinput.reduce(
        (acc, curr) => {
            const nx = acc[0] + keyMap[curr][0];
            const ny = acc[1] + keyMap[curr][1];

            return -xEdge <= nx && nx <= xEdge && -yEdge <= ny && ny <= yEdge ? [nx, ny] : acc;
        },
        [0, 0]
    );
}
```

## 120862 - 최댓값 만들기 (2)

```js
function solution(numbers) {
    numbers.sort((a, b) => a - b);
    return Math.max(
        numbers[0] * numbers[1],
        numbers[numbers.length - 1] * numbers[numbers.length - 2]
    );
}
```

## 120863 - 다항식 더하기

```js
function solution(polynomial) {
    const num = [0, 0];
    polynomial
        .replace(/(?<!\d)x/g, "1x")
        .split(" + ")
        .forEach((term) => {
            num[term.includes("x") ? 0 : 1] += parseInt(term);
        });

    return `${num[0] ? `${num[0] === 1 ? "" : num[0]}x` : ""}${num[0] * num[1] ? " + " : ""}${
        num[1] || ""
    }`;
}
```

### 피드백

* `[x항 계수, 상수항]`의 값을 수식으로 만드는 과정을 더 깔끔하게 정리하고 싶은 데 잘 떠오르지 않는다.

## 120864 - 숨어있는 숫자의 덧셈 (2)

```js
function solution(my_string) {
    return my_string.match(/\d+/g)?.reduce((acc, curr) => acc + Number(curr), 0) || 0;
}
```

### 피드백

```js
function solution(my_string) {
    return my_string.split(/\D+/).reduce((acc, cur) => acc + Number(cur), 0);
}
```

* `\d`와 `match`하는 것을 찾는 것 대신 `\D`로 split하면 `undefined`가 반환돼서 발생하는 오류를 방지할 수 있다.

## 120866 - 안전지대

```js
function solution(board) {
    const n = board.length;
    const dx = [-1, 0, 1, -1, 0, 1, -1, 0, 1];
    const dy = [1, 1, 1, 0, 0, 0, -1, -1, -1];
    const safe = Array.from(new Array(n), () => new Array(n).fill(0));

    board.forEach((row, y) =>
        row.forEach((col, x) => {
            if (col) {
                for (let i = 0; i < 9; i += 1) {
                    const nx = x + dx[i];
                    const ny = y + dy[i];
                    if (nx < 0 || nx >= n || ny < 0 || ny >= n || safe[ny][nx]) continue;
                    safe[ny][nx] = 1;
                }
            }
        })
    );

    return safe.map((row) => row.filter((n) => !n).length).reduce((acc, curr) => acc + curr);
}
```

### 아이디어 & 풀이

* `0`으로 채워진 `safe` 배열을 만든 뒤 `board`를 순회하면서 그 값이 1인 지점과 이를 둘러싼 8개의 지점의 `safe` 값을 1로 바꾼다.
* `safe`의 각 배열에서 1을 필터링 한 뒤 남은 원소의 개수를 구해 각 열의 0의 개수를 구하고 이를 `reduce`를 이용해 더한 뒤 반환한다.

### 참고 답안

```js
function solution(board) {
    let around = [
        [-1, 0],
        [-1, -1],
        [-1, 1],
        [0, -1],
        [0, 1],
        [1, 0],
        [1, -1],
        [1, 1],
    ];
    let safeCount = 0;

    board.forEach((row, y) =>
        row.forEach((col, x) => {
            if (col === 1) return;
            around.some(([oy, ox]) => board[oy + y]?.[ox + x]) ? false : safeCount++;
        })
    );

    return safeCount;
}
```

* `board`를 순회하면서 각 지점의 주변에 지뢰가 있는지 확인한다.
* 지뢰가 있는지 확인할 때 배열의 `some` 메소드를 사용해 지뢰가 있는(truthy) 즉시 `true`를 반환해 다음으로 넘어가고 지뢰가 없어 해당 구문이 `false`를 반환할 때만 `safeCount++`가 실행되도록 한다.
    * 삼항 연산자에서 `?` 다음의 `false`는 실질적으로 아무런 역할도 하지 않는다. `around.some(...) || safeCount++` 등의 방식으로 작성하는 것도 가능하다.
    * [Array.prototype.some()](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/some) by MDN

## 120868 - 삼각형의 완성조건 (2)

```js
function solution(sides) {
    return sides[0] + sides[1] - Math.abs(sides[0] - sides[1]) - 1;
}
```

### 아이디어 & 풀이

* 다른 한 변의 길이는 두 변의 합보다 작고 두 변의 차보다 커야한다.
* 추가로 각 변을 길이에 따라 `max`, `min`이라고 할 때 두 변의 차는 `max - min`이므로 결과적으로 `min * 2 - 1`이 된다.

## 120869 - 외계어 사전

```js
function solution(spell, dic) {
    return dic.filter(
        (word) => word.length === spell.length && spell.every((c) => word.includes(c))
    ).length
        ? 1
        : 2;
}
```

### 참고 답안

```js
function solution(spell, dic) {
    return dic.some((s) => spell.sort().toString() == [...s].sort().toString()) ? 1 : 2;
}
```

* `sort`를 사용한 뒤 단어를 직접 비교할 수도 있다.

## 120871 - 저주의 숫자 3

```js
function solution(n) {
    return new Array(n * 3)
        .fill(0)
        .map((_, i) => i)
        .filter((n) => n % 3 && !n.toString().includes("3"))[n - 1];
}
```

## 120875 - 평행

```js
const pairs = [
    [0, 1, 2, 3],
    [0, 2, 1, 3],
    [0, 3, 1, 2],
];

function solution(dots) {
    for (const pair of pairs) {
        const [i, j, k, l] = pair;
        if (
            (dots[i][0] - dots[j][0]) * (dots[k][1] - dots[l][1]) ===
            (dots[k][0] - dots[l][0]) * (dots[i][1] - dots[j][1])
        ) {
            return 1;
        }
    }
    return 0;
}
```

### 피드백

* 기울기를 구하는 함수와 기울기를 비교하는 함수를 따로 작성하면 조금 더 구조적으로 작성할 수도 있을 것 같다.

## 120876 - 겹치는 선분의 길이

```js
function solution(lines) {
    let count = 0;
    const min = Math.min(...lines.map((l) => l[0]));
    const max = Math.max(...lines.map((l) => l[1]));

    for (let i = min; i < max; i += 1) {
        lines.filter(([a, b]) => a <= i && i + 1 <= b).length > 1 && count++;
    }

    return count;
}
```

### 아이디어 & 풀이

* 선분이 걸쳐있는 전체 범위 `min` ~ `max`를 구한다.
* `min`부터 `max`까지 단위 길이가 1인 각 구간에 대해 해당 구간이 주어진 각 선분에 포함되는지 확인해서 포함하는 경우만 필터링 한다. 해당 구간을 포함하는 선분이 두 개 이상이면 선분의 길이 `count`를 1 증가시킨다.

### 참고 답안

```js
function solution(lines) {
    const contained = new Array(200).fill(0);
    lines.forEach(([a, b]) => {
        for (let i = a; i < b; i += 1) contained[i + 100]++;
    });

    return contained.reduce((acc, curr) => (curr > 1 ? acc + 1 : acc), 0);
}
```

* -100부터 100까지의 각 단위 구간에 걸쳐있는 선분의 개수를 저장하는 `contained` 배열을 만든다.
* `lines`의 각 구간에 대해 해당 구간에 걸쳐있는 부분의 `contained`값을 1 증가시킨다.
    * `a`, `b`의 범위가 -100 ~ 100까지 이므로 0점을 100으로 잡는다. 즉 `i`에 대해 `i + 100`의 값을 변경시킨다.
* `contained`를 모두 변경하면 `contained`중 2이상의 값을 갖는 경우에만 값을 1씩 증가시켜 반환한다.

## 120878 - 유한소수 판별하기

```js
function getGcd(a, b) {
    if (b === 0) return a;
    return getGcd(b, a % b);
}

function solution(a, b) {
    const gcd = getGcd(a, b);

    let div = b / gcd;
    while (div !== 1) {
        if (!(div % 2)) {
            div /= 2;
        } else if (!(div % 5)) {
            div /= 5;
        } else {
            return 2;
        }
    }
    return 1;
}
```

### 피드백

* 2와 5로 나누는 과정을 다음과 같이 더 깔끔하게 구현할 수 있다.

    ```js
    while (b % 2 === 0) b /= 2;
    while (b % 5 === 0) b /= 5;

    return b === 1 ? 1 : 2;
    ```

* 새로운 `div`를 정의하지 않고 그냥 `b`자체를 계산해도 된다.

## 120880 - 특이한 정렬

```js
function solution(numlist, n) {
    return numlist.sort((a, b) => Math.abs(a - n) - Math.abs(b - n) || b - a);
}
```

## 120882 - 등수 매기기

```js
function solution(score) {
    const sorted = score.map((s, i) => [s[0] + s[1], i]).sort((a, b) => b[0] - a[0]);

    let rank = 1;
    let max = sorted[0][0];
    return sorted
        .map(([s, o], i) => {
            if (s < max) {
                rank = i + 1;
                max = s;
            }
            return [rank, o];
        })
        .sort((a, b) => a[1] - b[1])
        .map((s) => s[0]);
}
```

### 피드백

* 기존 `score` 배열의 순서를 유지하려고 불필요한 `sort`를 너무 많이한 것 같다.

### 참고 답안

```js
function solution(score) {
    let avg = score.map((v) => (v[0] + v[1]) / 2);
    let sorted = [...avg].sort((a, b) => b - a);
    return avg.map((v) => sorted.indexOf(v) + 1);
}
```

* 평균 점수를 sort한 `sorted` 배열을 따로 만든 뒤 `indexOf`를 사용해 현재 점수의 `sorted` 내에서의 인덱스를 구하면 된다.

```js
function solution(score) {
    return score.map(
        (el) => score.filter((v) => (v[0] + v[1]) / 2 > (el[0] + el[1]) / 2).length + 1
    );
}
```

* 자신의 순위는 영어, 수학 점수의 합이 나보나 많은 사람의 수 + 1이다.
* `filter`를 이용해서 현재 순회하는 사람의 평균 점수(`el`)보다 평균 점수(`v`)가 높은 사람만 남긴 뒤 그 배열의 길이 + 1을 반환하도록 `map`한 결과를 반환한다.

## 120883 - 로그인 성공?

```js
function solution(id_pw, db) {
    for (const [id, pw] of db) {
        if (id !== id_pw[0]) continue;
        if (pw === id_pw[1]) return "login";
        return "wrong pw";
    }
    return "fail";
}
```

### 참고 답안

```js
function solution(id_pw, db) {
    const [id, pw] = id_pw;
    const map = new Map(db);
    return map.has(id) ? (map.get(id) === pw ? "login" : "wrong pw") : "fail";
}
```

* `db`를 id(key): pw(value) 꼴의 map으로 만든 뒤 `map` 내에 주어진 `id`가 있는지, 해당 `id`가 있다면 그 `id`에 대한 값과 `pw`가 일치하는지 확인해서 경우에 따라 알맞은 값을 반환한다.

## 120884 - 치킨 쿠폰

```js
function getCoupon(coupon) {
    if (coupon < 10) return 0;
    return Math.trunc(coupon / 10) + getCoupon(Math.trunc(coupon / 10) + (coupon % 10));
}

function solution(chicken) {
    return getCoupon(chicken);
}
```

### 참고 답안

```js
function solution(chicken) {
    return Math.trunc((chicken - 1) / 9);
}
```

* 처음 치킨을 10마리 시키면 쿠폰 10개로 서비스 한 마리와 쿠폰 한 개를 얻을 수 있다.
* 이 이후부터는 현재 소지하고 있는 쿠폰에 치킨 9마리를 추가로 시켜 받은 쿠폰을 합쳐 서비스 한 마리를 시킬 수 있고 이전과 같은 상황을 연쇄적으로 만들 수 있다.
* 즉 처음 10개를 제외하면 치킨 9마리만 시켜도 서비스 치킨을 받을 수 있으므로 이 연쇄과정 안에서 받을 수 있는 서비스 치킨의 수는 `(chicken - 10) / 9`와 같다. 여기에 처음 10마리를 시켰을 때 받은 서비스 한 마리를 더하면 된다.
* 결과적으로 내가 받을 수 있는 서비스 치킨의 수는 `(chicken - 10) / 9 + 1`이고 이를 계산해서 정리하면 `(chicken - 1) / 9`와 같다.
* `Math.trunc`를 이용해서 소숫점 부분은 절삭한다.
* 풀이 참고: [Challenge#39_2023.07.18: 치킨 쿠폰 🍗 #39](https://github.com/dawn-chung27/programmers_challenge/discussions/39)

## 120885 - 이진수 더하기

```js
function solution(bin1, bin2) {
    return (parseInt(bin1, 2) + parseInt(bin2, 2)).toString(2);
}
```

## 120886 - A로 B 만들기

```js
function solution(before, after) {
    return [...before].sort().join("") === [...after].sort().join("") ? 1 : 0;
}
```

## 120887 - k의 개수

```js
function solution(i, j, k) {
    return Array(j - i + 1)
        .fill(0)
        .map((_, idx) => i + idx)
        .join("")
        .split("")
        .filter((c) => c === k.toString()).length;
}
```

## 120888 - 중복된 문자 제거

```js
function solution(my_string) {
    return [...new Set([...my_string])].join("");
}
```

### 피드백

* `my_string`을 `Set`으로 만들 때 spread 하지 않아도 된다. `[...new Set(my_string)]`

## 120889 - 삼각형의 완성조건 (1)

```js
function solution(sides) {
    const [l, a, b] = sides.sort((a, b) => b - a);

    return l < a + b ? 1 : 2;
}
```

## 120890 - 가까운 수

```js
function solution(array, n) {
    const idx = array.sort((a, b) => a - b).findIndex(num => num >= n);
    
    if (idx === 0) return array[0];
    if (idx === -1) return array[array.length - 1];
    if (array[idx] - n < n - array[idx - 1]) return array[idx];
    return array[idx - 1];
}
```

### 참고 답안

```js
function solution(array, n) {
    return array.sort((a, b) => Math.abs(n - a) - Math.abs(n - b) || a - b)[0];
}
```

* `n`과의 차이 값을 기준으로 오름차순으로 정렬하도록 `sort`한 뒤 가장 첫 값을 반환한다.
* `n`과의 차이 값이 같을 경우 더 작은 값을 반환해야 하므로 `Math.abs(n - a) - Math.abs(n - b)`이 0을 반환할 때는 `a - b`값을 사용해 더 작은 값이 앞으로 가도록 해준다.

## 120891 - 369게임

```js
function solution(order) {
    return [...`${order}`].filter((n) => +n && !(n % 3)).length;
}
```

### 피드백

* 필터 조건을 다음과 같이 작성할 수도 있다. `n => mySet.has(+n)`

### 참고 답안

```js
// 풀이 1
function solution(order) {
    return [...order.toString().matchAll(/[3|6|9]/g)].length;
}

// 풀이 2
function solution(order) {
    return order.toString().split(/[369]/).length - 1;
}
```

* 정규 표현식을 사용한 풀이이다.
* 위의 풀이보다 풀이 시간이 비교적 느린 것 같다.

## 120892 - 암호 해독

```js
function solution(cipher, code) {
    return [...cipher].filter((_, i) => !((i + 1) % code)).join("");
}
```

## 120893 - 대문자와 소문자

```js
function solution(my_string) {
    const lower = my_string.toLowerCase();
    return [...lower].map((c, i) => (c === my_string[i] ? c.toUpperCase() : c)).join("");
}
```

## 120894 - 영어가 싫어요

```js
const strToNum = {
    zero: 0,
    one: 1,
    two: 2,
    three: 3,
    four: 4,
    five: 5,
    six: 6,
    seven: 7,
    eight: 8,
    nine: 9,
};

function solution(numbers) {
    return +numbers.replaceAll(
        /zero|one|two|three|four|five|six|seven|eight|nine/g,
        (numstr) => strToNum[numstr]
    );
}
```

### 피드백

* 굳이 `replaceAll`을 쓰지 않고 `replace`를 써도 된다.

### 참고 답안

```js
function solution(numbers) {
    return Number(
        ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"].reduce(
            (acc, curr, i) => acc.replaceAll(curr, i),
            numbers
        )
    );
}
```

* 별도의 매핑 객체를 만들지 않고 배열의 인덱스를 활용한 풀이이다.

## 120895 - 인덱스 바꾸기

```js
function solution(my_string, num1, num2) {
    const strArr = [...my_string];
    [strArr[num1], strArr[num2]] = [strArr[num2], strArr[num1]];

    return strArr.join("");
}
```

### 아이디어 & 풀이

* 문자열을 각 문자의 배열로 만든 뒤 구조분해 할당을 이용해 swap해 다시 문자열로 합친다.

## 120896 - 한 번만 등장한 문자

```js
function solution(s) {
    return [...s]
        .sort()
        .join("")
        .replaceAll(/(.)\1+/g, "");
}
```

* `(.)\1+`는 연속된 동일 문자를 나타내는 정규 표현식이다.

### 참고 답안

```js
function solution(s) {
    let res = [];
    for (let c of s) {
        if (s.indexOf(c) === s.lastIndexOf(c)) res.push(c);
    }

    return res.sort().join("");
}
```

* 특정 문자가 처음 등장하는 인덱스와 마지막에 등장하는 인덱스가 같으면 해당 문자는 한 개만 있는 것이므로 결과 배열에 넣는다.
* 결과 배열을 정렬한 뒤 문자열로 묶어 반환한다.

## 120897 - 약수 구하기

```js
function solution(n) {
    const answer = [];
    const r = n ** 0.5;

    for (let i = 1; i <= r; i += 1) {
        if (n % i === 0) {
            answer.push(i);
            answer.push(n / i);
        }
    }

    return [...new Set(answer)].sort((a, b) => a - b);
}
```

### 아이디어 & 풀이

* `n`이 제곱수일 경우 같은 수가 중복해서 들어갈 수 있기 때문에 `answer`를 `Set`으로 바꿔 중복을 제거해주어야 한다.

## 120898 - 편지

```js
function solution(message) {
    return message.length * 2;
}
```

## 120899 - 가장 큰 수 찾기

```js
function solution(array) {
    const max = Math.max(...array);

    return [max, array.indexOf(max)];
}
```

## 120902 - 문자열 계산하기

```js
function solution(my_string) {
    let op = "+";
    return my_string.split(" ").reduce((acc, curr) => {
        if (curr === "+" || curr === "-") {
            op = curr;
            return acc;
        } else {
            return op === "+" ? +acc + +curr : +acc - +curr;
        }
    }, 0);
}
```

### 참고 답안

```js
function solution(my_string) {
    const answer = [];

    let sign = 1;
    my_string.split(" ").forEach((ch) => {
        if (ch === "+") {
            sign = 1;
        } else if (ch === "-") {
            sign = -1;
        } else {
            stack.push(ch * sign);
        }
    });

    return stack.reduce((acc, curr) => acc + curr, 0);
}
```

* `eval(my_string)`이 가장 간단한 답변이지만 `eval` 사용은 지양하는 것이 좋다.
* 각 문자를 순회하면서 부호에 따라 뒤의 수에 1 또는 -1을 곱해주며 숫자로만 배열을 새로 구성한 뒤 전부 더해 결과를 반환한다.

## 120903 - 배열의 유사도

```js
function solution(s1, s2) {
    return s1.filter((e) => s2.includes(e)).length;
}
```

## 120904 - 숫자 찾기

```js
function solution(num, k) {
    return [...num.toString()].indexOf(k.toString()) + 1 || -1;
}
```

## 120905 - n의 배수 고르기

```js
function solution(n, numlist) {
    return numlist.filter((num) => !(num % n));
}
```

## 120906 - 자릿수 더하기

```js
function solution(n) {
    return [...n.toString()].reduce((acc, curr) => acc + Number(curr), 0);
}
```

## 120907 - OX퀴즈

```js
function solution(quiz) {
    return quiz.map((eqn) => {
        const [a, op, b, _, res] = eqn.split(" ");
        const sign = op === "+" ? 1 : -1;

        return Number(a) + sign * b === Number(res) ? "O" : "X";
    });
}
```

## 120908 - 문자열안에 문자열

```js
function solution(str1, str2) {
    return str1.includes(str2) ? 1 : 2;
}
```

## 120909 - 제곱수 판별하기

```js
function solution(n) {
    return Number.isInteger(n ** 0.5) ? 1 : 2;
}
```

## 120910 - 세균 증식

```js
function solution(n, t) {
    return n * 2 ** t;
}
```

### 참고 답안

```js
function solution(n, t) {
    return n << t;
}
```

* 시프트 연산자를 사용했다.
* [왼쪽 시프트 (<<)](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Operators/Left_shift) by MDN

## 120911 - 문자열 정렬하기 (2)

```js
function solution(my_string) {
    return [...my_string.toLowerCase()].sort().join("");
}
```

## 120912 - 7의 개수

```js
function solution(array) {
    return array.map((n) => n.toString().split("7").length - 1).reduce((acc, curr) => acc + curr);
}
```

### 피드백

```js
function solution(array) {
    return array.join("").split("7").length - 1;
}
```

* 총 개수를 세는 것이므로 수를 하나의 문자열로 합친 뒤 `7`로 `split`하는 것이 훨씬 간결하다.

## 120913 - 잘라서 배열로 저장하기

```js
function solution(my_str, n) {
    const answer = [];
    for (let i = 0; i < my_str.length; i += n) {
        answer.push(my_str.slice(i * n, (i + 1) * n));
    }

    return answer;
}
```

### 참고 답안

```js
function solution(my_str, n) {
    return my_str.match(new RegExp(`.{1,${n}}`, "g"));
}
```

* 정규 표현식을 이용한 풀이이다.

## 120921 - 문자열 밀기

```js
function solution(A, B) {
    const n = A.length;
    for (const i in B) {
        if (A.slice(n - i) + A.slice(0, n - i) === B) return Number(i);
    }

    return -1;
}
```

### 참고 답안

```js
function solution(A, B) {
    return (B + B).indexOf(A);
}
```

* `A`를 밀어서 `B`를 만들 수 있는 경우 `B`를 두 번 더한 문자열 내에 `A`가 포함된다.
* `B + B` 내에서 `A`가 시작하는 지점이 `B`를 만들기 위해 `A`를 민 횟수와 같고 포함되지 않을 경우 자동으로 `-1`을 출력한다.

## 120922 - 종이 자르기

```js
function solution(M, N) {
    return M * N - 1;
}
```

### 아이디어 & 풀이

* M x N의 종이를 조각내기 위해 필요한 가위질의 횟수를 그려서 세어보면 `(M - 1) + ((N - 1) * M) = M * N - 1` 임을 알 수 있다.

## 120923 - 연속된 수의 합

```js
function solution(num, total) {
    return new Array(num).fill(0).map((_, i) => (total - (num * (num - 1)) / 2) / num + i);
}
```

### 아이디어 & 풀이

반환하는 배열의 첫 값을 `n`이라고 했을 때 반환되는 배열은 `[n, n + 1, ..., n + num - 1]` 이를 모두 더한 값이 `total`이다. 이를 계산해서 `n`을 구하면 다음과 같다.

$$
\sum_{k=0}^{num - 1} (n + k) = n(num) + \sum_{k=1}^{num - 1} k = n(num) + {(num - 1)(num - 1 + 1) \over 2} = total\\
n = {total - num(num - 1)/2 \over num}
$$

`n + 0`을 초기값으로 1씩 증가하는 배열을 반환하면 되므로 `num`개의 원소를 갖는 배열을 만든 뒤 인덱스를 이용해 `n + i`를 반환하면 된다.

### 피드백

* 초기값 `n`을 다음과 같이 구할 수도 있다: `Math.ceil(total / num - Math.floor(num / 2))`

## 120924 - 다음에 올 숫자

```js
function solution(common) {
    if (common[1] - common[0] === common[2] - common[1]) {
        return common[common.length - 1] + common[1] - common[0];
    } else {
        return (common[common.length - 1] * common[1]) / common[0];
    }
}
```

## 120956 - 옹알이 (1)

```js
function solution(babbling) {
    return babbling.map((s) => s.replace(/aya|ye|woo|ma/g, "")).filter((s) => s === "").length;
}
```
