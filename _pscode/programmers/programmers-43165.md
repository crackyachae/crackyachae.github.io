---
layout  : article
title   : Programmers_43165 타겟 넘버
summary : 
date    : 2023-12-01 14:04:42 +0900
updated : 2024-03-14 17:32:03 +0900
tag     : ps-js
toc     : true
public  : true
parent  : [[Programmers-Index]]
latex   : false
---
* TOC
{:toc}

> 이 글은 프로그래머스의 [43165번](https://programmers.co.kr/learn/courses/30/lessons/43165) 문제를 JavaScript로 풀이한 것을 모아놓은 글입니다.
>
> 일종의 연습 기록이며 제가 정답을 받은 코드와 참고할만한 다른 코드를 같이 기록합니다. 필요한 경우 코드에 대한 해설을 기록합니다만 코드는 통과했어도 해설은 틀릴 수 있기 때문에 가볍게 참고해주시길 부탁드립니다. 피드백은 편하신 방법으로 자유롭게 주시면 감사하겠습니다.

## 2023.12.01

| 테스트   | 통과 | 시간    | 메모리 |
| -------- | ---- | ------  | ------ |
| 테스트 1 | 통과 | 14.84ms | 35.5MB |
| 테스트 2 | 통과 | 24.53ms | 35.5MB |
| 테스트 3 | 통과 | 0.21ms  | 33.5MB |
| 테스트 4 | 통과 | 0.44ms  | 33.5MB |
| 테스트 5 | 통과 | 2.77ms  | 35.5MB |
| 테스트 6 | 통과 | 0.55ms  | 33.6MB |
| 테스트 7 | 통과 | 0.23ms  | 33.4MB |
| 테스트 8 | 통과 | 1.15ms  | 35.5MB |

| 단계      | 시작 시각 | 끝난 시각 | 걸린 시간 |
| --------- | --------- | --------- | --------- |
| 문제 이해 | 14:06:27  | 14:07:14  |           |
| 풀이 생각 | 14:07:15  | 14:11:38  |           |
| 코딩      | 14:11:40  | 14:16:02  |           |

```js
function solution(numbers, target) {
    let count = 0;

    function dfs(idx, num) {
        // 마지막 수까지 계산이 끝났으면
        if (idx === numbers.length) {
            // 계산 결과가 target과 같은지 확인
            // 같은 경우에만 count를 증가
            num === target ? count++ : false;
            return;
        }
        // 현재 수를 각각 더하고 뺀 값과 함께 다음 수로 진행
        dfs(idx + 1, num + numbers[idx]);
        dfs(idx + 1, num - numbers[idx]);
    }

    dfs(0, 0);
    return count;
}
```

### 아이디어 & 풀이

DFS를 사용해 `numbers`각 수를 순회하면서 해당 값을 더하거나 빼면서 진행한 뒤 마지막 수까지 계산이 끝났을 떄 그 값이 `target`같은지 판단한다.

* `idx`를 이용해 `number`의 값을 순회한다. `dfs` 함수를 통해 다음 수로 진행할 때 `idx`를 한 개 증가시켜 전달하면 된다.
* `num`을 이용해 현재까지 수를 더하거나 뺀 결과값을 전달한다. 지금까지 계산한 수(`num`)에 현재 값(`numbers[idx]`)를 더한 값과 뺀 값을 각각 다른 함수에 전달하면 된다.
