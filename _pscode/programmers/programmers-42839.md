---
layout  : article
title   : Programmers_42839 소수 찾기
summary : 
date    : 2023-11-17 00:43:54 +0900
updated : 2023-11-17 22:46:37 +0900
tag     : ps-js
toc     : true
public  : true
parent  : [[Programmers-Index]]
latex   : false
---
* TOC
{:toc}

> 이 글은 프로그래머스의 [42839번](https://programmers.co.kr/learn/courses/30/lessons/42839) 문제를 JavaScript로 풀이한 것을 모아놓은 글입니다.
>
> 일종의 연습 기록이며 제가 정답을 받은 코드와 참고할만한 다른 코드를 같이 기록합니다. 필요한 경우 코드에 대한 해설을 기록합니다만 코드는 통과했어도 해설은 틀릴 수 있기 때문에 가볍게 참고해주시길 부탁드립니다. 피드백은 편하신 방법으로 자유롭게 주시면 감사하겠습니다.

## 2023.11.17

| 테스트    | 통과 | 시간    | 메모리 |
| --------- | ---- | ------  | ------ |
| 테스트 1  | 통과 | 3.43ms  | 33.7MB |
| 테스트 2  | 통과 | 9.93ms  | 37.2MB |
| 테스트 3  | 통과 | 2.93ms  | 33.6MB |
| 테스트 4  | 통과 | 8.38ms  | 38.1MB |
| 테스트 5  | 통과 | 34.88ms | 49.1MB |
| 테스트 6  | 통과 | 3.41ms  | 33.5MB |
| 테스트 7  | 통과 | 3.72ms  | 33.7MB |
| 테스트 8  | 통과 | 31.89ms | 50.4MB |
| 테스트 9  | 통과 | 4.94ms  | 33.6MB |
| 테스트 10 | 통과 | 12.16ms | 38.1MB |
| 테스트 11 | 통과 | 4.75ms  | 34.2MB |
| 테스트 12 | 통과 | 4.33ms  | 34.4MB |

| 단계        | 시작 시각           | 끝난 시각           | 걸린 시간 |
| ---------   | ------------------- | ------------------- | --------- |
| 문제 이해   | 2023-11-17 00:44:49 | 2023-11-17 00:45:20 |           |
| 풀이 생각 1 | 2023-11-17 00:45:22 | 2023-11-17 00:55:21 |           |
| 코딩 1      | 2023-11-17 00:55:23 | 2023-11-17 01:20:20 |           |
| 풀이 생각 2 | 2023-11-17 18:48:15 | 2023-11-17 18:59:04 |           |
| 코딩 2      | 2023-11-17 18:59:05 | 2023-11-17 19:18:12 |           |
| 코딩 3      | 2023-11-17 19:18:16 | 2023-11-17 19:26:45 |           |
| 디버깅      | 2023-11-17 19:27:00 | 2023-11-17 19:33:44 |           |

```js
function isPrime(num) {
    if (num === 0 || num === 1) return false;

    const r = num ** 0.5;
    let i = 2;

    while (i <= r) {
        if (!(num % i)) return false;
        else i += 1;
    }
    return true;
}

const getPermutations = function (arr, n) {
    const results = [];
    if (n === 1) return arr.map((el) => [el]);

    arr.forEach((fixed, index, origin) => {
        const rest = [...origin.slice(0, index), ...origin.slice(index + 1)];
        const permutations = getPermutations(rest, n - 1);
        const attached = permutations.map((el) => [fixed, ...el]);
        results.push(...attached);
    });

    return results;
};

function solution(numbers) {
    const prime = new Set([]);
    const nums = [...numbers];
    for (let n = 1; n <= numbers.length; n += 1) {
        getPermutations(nums, n).forEach((arr) => {
            const num = +arr.join("");
            if (isPrime(num)) prime.add(num);
        });
    }
    return prime.size;
}
```

### 아이디어 & 풀이

주어진 `numbers`에 대해서 선택하는 수의 개수 `n`을 한 개씩 늘려가면서 다음을 반복한다.

* `numbers`의 수 중 `n`개를 선택해 숫자를 만든 뒤
* 해당 수가 소수인지 확인해 소수면 set인 `prime`에 집어넣는다.
    * 중복 방지를 위해서 set으로 만들었다.
* 마지막으로 `size`를 이용해 `prime`의 원소의 개수를 반환한다.

숫자를 만들 때는 순열을 이용해 만들어야 한다. python에는 순열, 조합 라이브러리가 존재하지만 JavaScript의 경우 직접 구현해주어야 한다. 위의 풀이에서는 `getPermutations`라는 함수로 구현했으며 구현하는 방법은 다음의 글을 참고했다.

* [[알고리즘] 순열과 조합, 재귀함수 이해하기(JavaScript)](https://pul8219.github.io/algorithm/algorithm-permutation-and-combination/) by Woldan

소수를 확인하는 함수는 `isPrime`이라는 함수로 구현했으며 다음과 같이 구현했다.

* 입력받은 수가 0 또는 1일 경우 소수가 아니므로 `false`를 반환한다.
* 입력받은 수가 2 이상일 경우 2부터 입력받은 수의 제곱근까지 숫자를 1씩 증가시키면서 입력받은 수가 나누어 떨어지는지 확인한다.
    * 특정 수가 나누어 떨어질 때는 나뉘는 수가 쌍을 이루게 되므로 제곱근까지만 확인해도 된다.
* 나누어 떨어지는 경우 바로 `false`를 반환하고 모든 수까지 순회하는 동안 나누어 떨어지지 않으면 입력받은 수는 소수이므로 `true`를 반환한다.
