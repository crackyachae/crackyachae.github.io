---
layout  : article
title   : Programmers_42747 H-Index
summary : 
date    : 2023-11-08 17:01:00 +0900
updated : 2024-03-14 17:29:23 +0900
tag     : ps-js
toc     : true
public  : true
parent  : [[/programmers]]
latex   : false
---
* TOC
{:toc}

> 이 글은 프로그래머스의 [42747번](https://school.programmers.co.kr/learn/courses/30/lessons/42747) 문제를 자바스크립트(JavaScript)으로 풀이한 것을 모아놓은 글입니다.
>
> 일종의 연습 기록이며 제가 정답을 받은 코드와 참고할만한 다른 코드를 같이 기록합니다. 필요한 경우 코드에 대한 해설을 기록합니다만 코드는 통과했어도 해설은 틀릴 수 있기 때문에 가볍게 참고해주시길 부탁드립니다. 피드백은 편하신 방법으로 자유롭게 주시면 감사하겠습니다.

## 2023.11.08

| 테스트    | 통과 | 시간   | 메모리 |
| ---       | ---  | ---    | ---    |
| 테스트 1  | 통과 | 1.17ms | 33.4MB |
| 테스트 2  | 통과 | 0.91ms | 33.5MB |
| 테스트 3  | 통과 | 0.73ms | 33.4MB |
| 테스트 4  | 통과 | 0.67ms | 33.4MB |
| 테스트 5  | 통과 | 1.36ms | 33.5MB |
| 테스트 6  | 통과 | 0.80ms | 33.5MB |
| 테스트 7  | 통과 | 0.60ms | 33.4MB |
| 테스트 8  | 통과 | 0.52ms | 33.4MB |
| 테스트 9  | 통과 | 0.56ms | 33.5MB |
| 테스트 10 | 통과 | 0.60ms | 33.6MB |
| 테스트 11 | 통과 | 0.79ms | 33.5MB |
| 테스트 12 | 통과 | 0.55ms | 33.5MB |
| 테스트 13 | 통과 | 0.98ms | 33.6MB |
| 테스트 14 | 통과 | 0.76ms | 33.5MB |
| 테스트 15 | 통과 | 0.79ms | 33.4MB |
| 테스트 16 | 통과 | 0.05ms | 33.5MB |

| 단계      | 시작 시각 | 끝난 시각 | 걸린 시간 |
| --------- | --------- | --------- | --------- |
| 문제 이해 | 17:01:48  | 17:03:45  |           |
| 풀이 생각 | 19:07:20  | 19:18:55  |           |
| 코딩      | 19:18:57  | 19:24:49  |           |
| 디버깅    | 19:24:51  | 19:44:57  |           |

```js
function solution(citations) {
    citations.sort((a, b) => b - a);

    let i = 0;
    let count = 0;
    let h = citations[0];

    while (i < citations.length) {
        if (citations[i] === h) {
            count += 1;
            i += 1;
        } else if (citations[i] < h) {
            h -= 1;
        }

        if (h <= count) return h;
    }
    return Math.min(h, count);
}
```

### 아이디어 & 풀이

`citations`를 내림차순으로 sort 한 뒤 최댓값부터 인용수(`h`)를 줄여가면서 해당 값 이상의 인용수를 갖는 논문의 수와 비교한다. 논문의 수는 `citations`을 순회하면서 증가시킨다.

구체적인 진행은 다음과 같다.

* `citations`를 내림차순으로 sort 한 뒤 최댓값을 `h`로 지정한다.
* `citations`를 순회하면서
    * 인용 수가 `h`와 같으면 `count`를 1 증가시키고 `i`를 증가시켜 다음 논문으로 넘어간다.
    * 인용 수가 `h`보다 적으면 `h`를 1 감소시킨다.
* 위의 실행을 한 `h`와 `count`를 비교해 `h`가 `count`와 같아지거나 그보다 작으면 `h`번 이상 인용된 논문이 `h`편 이상이게 되므로 해당 값이 h-index 이다.
* 만약 모든 논문을 전부 순회했는데도 `h <= count`를 만족하지 못하면 `count` 값이 h-index가 된다.

### 디버그

* `citations`를 순회할 때 `i <= citations.length` 까지 순회하면 9번 테스트에서 오류가 발생한다.

### 피드백

* 참고 답안의 풀이가 훨씬 깔끔한 풀이인 것 같다.

## 참고 답안

```js
function solution(citations) {
    return citations.sort((a, b) => b - a).filter((el, idx) => el >= idx + 1).length;
}
```

### 아이디어 & 풀이

`citations`를 내림차순으로 정렬한 뒤 인용수(`el`)가 해당 인용수 이상의 값을 갖는 논문 수 보다 크거나 같은 경우만 필터링 한다.

* `citations`를 오름차순으로 정렬했으므로 자신보다 앞에 있는 값은 모두 자신보다 높은 인용수를 갖고 있다.
* 그러므로 현재 인용수의 순번(`idx + 1`)이 자신보다 같거나 높은 인용수를 갖는 논문의 수이다.
* 즉 필터링한 원소는 모두 인용수가 논문의 개수보다 크거나 같은 수이다.

h-index는 인용수와 그 인용수 이상의 인용수를 갖는 논문의 수 중 더 작은 수이고, 필터링한 논문은 인용수가 논문의 개수보다 크므로 결과적으로 필터링한 논문의 개수가 h-index가 된다.
