---
layout  : article
title   : Programmers_코딩 테스트 입문
summary : 
date    : 2023-08-16 22:11:27 +0900
updated : 2023-09-04 23:45:10 +0900
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