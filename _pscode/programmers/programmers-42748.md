---
layout  : article
title   : Programmers_42746 K번째수
summary : 
date    : 2023-04-14 17:08:59 +0900
updated : 2024-03-14 17:29:31 +0900
tag     : ps-js
toc     : true
public  : true
parent  : [[/programmers]]
latex   : false
---
* TOC
{:toc}

> 이 글은 프로그래머스의 [42748번](https://school.programmers.co.kr/learn/courses/30/lessons/42748) 문제를 자바스크립트(JavaScript)으로 풀이한 것을 모아놓은 글입니다.
>
> 일종의 연습 기록이며 제가 정답을 받은 코드와 참고할만한 다른 코드를 같이 기록합니다. 필요한 경우 코드에 대한 해설을 기록합니다만 코드는 통과했어도 해설은 틀릴 수 있기 때문에 가볍게 참고해주시길 부탁드립니다. 피드백은 편하신 방법으로 자유롭게 주시면 감사하겠습니다.

## 2023.04.14

| 테스트   | 통과 | 시간   | 메모리 |
| ---      | ---  | ---    | ---    |
| 테스트 1 | 통과 | 0.15ms | 33.4MB |
| 테스트 2 | 통과 | 0.09ms | 33.5MB |
| 테스트 3 | 통과 | 0.09ms | 33.5MB |
| 테스트 4 | 통과 | 0.08ms | 33.5MB |
| 테스트 5 | 통과 | 0.09ms | 33.5MB |
| 테스트 6 | 통과 | 0.08ms | 33.5MB |
| 테스트 7 | 통과 | 0.12ms | 33.5MB |

| 단계      | 시작 시각 | 끝난 시각 | 걸린 시간 |
| --------- | --------- | --------- | --------- |
| 문제 이해 | 17:28:35  | 17:29:12  |           |
| 코딩      | 17:29:14  | 17:35:25  |           |

```js
function solution(array, commands) {
    const [i, j, k] = commands;
    const answer = [];

    commands.forEach((command) => {
       const [i, j, k] = command
       answer.push(array.slice(i - 1, j).sort((a, b) => a - b)[k - 1])
    })

    return answer
}
```

### 아이디어 & 풀이

### 피드백

* `forEach`로 `answer`에 결과값을 넣어주는 대신 아예 `map`을 사용해도 된다.
