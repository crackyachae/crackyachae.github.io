---
layout  : article
title   : Programmers_42840 모의고사
summary : 
date    : 2023-11-18 13:40:34 +0900
updated : 2023-11-18 13:57:28 +0900
tag     : ps-js
toc     : true
public  : true
parent  : [[Programmers-Index]]
latex   : false
---
* TOC
{:toc}

> 이 글은 프로그래머스의 [42840번](https://programmers.co.kr/learn/courses/30/lessons/42840) 문제를 JavaScript로 풀이한 것을 모아놓은 글입니다.
>
> 일종의 연습 기록이며 제가 정답을 받은 코드와 참고할만한 다른 코드를 같이 기록합니다. 필요한 경우 코드에 대한 해설을 기록합니다만 코드는 통과했어도 해설은 틀릴 수 있기 때문에 가볍게 참고해주시길 부탁드립니다. 피드백은 편하신 방법으로 자유롭게 주시면 감사하겠습니다.

## 2023.11.18

| 테스트    | 통과 | 시간   | 메모리 |
| --------- | ---- | ------ | ------ |
| 테스트 1  | 통과 | 0.09ms | 33.5MB |
| 테스트 2  | 통과 | 0.09ms | 33.5MB |
| 테스트 3  | 통과 | 0.13ms | 33.5MB |
| 테스트 4  | 통과 | 0.09ms | 33.6MB |
| 테스트 5  | 통과 | 0.18ms | 33.5MB |
| 테스트 6  | 통과 | 0.19ms | 33.6MB |
| 테스트 7  | 통과 | 0.59ms | 33.5MB |
| 테스트 8  | 통과 | 0.33ms | 33.5MB |
| 테스트 9  | 통과 | 1.38ms | 37MB   |
| 테스트 10 | 통과 | 0.57ms | 33.5MB |
| 테스트 11 | 통과 | 1.37ms | 36.8MB |
| 테스트 12 | 통과 | 1.26ms | 36.7MB |
| 테스트 13 | 통과 | 0.21ms | 33.5MB |
| 테스트 14 | 통과 | 1.47ms | 36.8MB |

| 단계      | 시작 시각           | 끝난 시각           | 걸린 시간 |
| --------- | ------------------- | ------------------- | --------- |
| 문제 이해 | 2023-11-18 13:42:03 | 2023-11-18 13:42:31 |           |
| 풀이 생각 | 2023-11-18 13:42:32 | 2023-11-18 13:43:01 |           |
| 코딩      | 2023-11-18 13:43:03 | 2023-11-18 13:49:28 |           |

```js
function solution(answers) {
    const ansOne = [1, 2, 3, 4, 5];
    const ansTwo = [2, 1, 2, 3, 2, 4, 2, 5];
    const ansThree = [3, 3, 1, 1, 2, 2, 4, 4, 5, 5];
    const score = new Array(3).fill(0);

    answers.forEach((num, i) => {
        if (num === ansOne[i % 5]) score[0]++;
        if (num === ansTwo[i % 8]) score[1]++;
        if (num === ansThree[i % 10]) score[2]++;
    });

    const max = Math.max(...score);
    return score.reduce((acc, curr, i) => (curr === max ? [...acc, i + 1] : acc), []);
}
```

### 아이디어 & 풀이

* 정답 배열을 하드코딩한 뒤 `answers`를 순회하면서 정답을 비교해 `score`값을 증가시킨다.
* `max`를 이용해 `score` 중 최댓값을 구한 뒤 값이 `max`와 같은 사람의 번호(i.e. `i + 1`)만 정답 배열에 번호를 추가해 반환한다.

### 피드백

* 굳이 복잡하게 `reduce`를 사용하지 않고 정답 배열을 만든 뒤 `forEach`로 순회하면서 정답 배열에 `push`하는 게 더 명료해보일 수도 있을 것 같다.

```js
const answer = [];
score.forEach((n, i) => {
    if (n === max) answer.push(i + 1);
});
```
