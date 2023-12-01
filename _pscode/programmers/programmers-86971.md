---
layout  : article
title   : Programmers_86971 전력망을 둘로 나누기
summary : 
date    : 2023-11-28 23:49:46 +0900
updated : 2023-11-29 23:47:34 +0900
tag     : ps-js
toc     : true
public  : true
parent  : [[Programmers-Index]]
latex   : false
---
* TOC
{:toc}

> 이 글은 프로그래머스의 [86971번](https://programmers.co.kr/learn/courses/30/lessons/86971) 문제를 파이썬(js)으로 풀이한 것을 모아놓은 글입니다.
>
> 일종의 연습 기록이며 제가 정답을 받은 코드와 참고할만한 다른 코드를 같이 기록합니다. 필요한 경우 코드에 대한 해설을 기록합니다만 코드는 통과했어도 해설은 틀릴 수 있기 때문에 가볍게 참고해주시길 부탁드립니다. 피드백은 편하신 방법으로 자유롭게 주시면 감사하겠습니다.

## 2023.11.28

| 테스트    | 통과 | 시간   | 메모리 |
| --------- | ---- | ------ | ------ |
| 테스트 1  | 통과 | 0.49ms | 33.6MB |
| 테스트 2  | 통과 | 2.69ms | 36.7MB |
| 테스트 3  | 통과 | 3.36ms | 36.7MB |
| 테스트 4  | 통과 | 4.63ms | 36.6MB |
| 테스트 5  | 통과 | 3.80ms | 36.6MB |
| 테스트 6  | 통과 | 0.19ms | 33.4MB |
| 테스트 7  | 통과 | 0.20ms | 33.5MB |
| 테스트 8  | 통과 | 0.47ms | 33.4MB |
| 테스트 9  | 통과 | 0.48ms | 33.5MB |
| 테스트 10 | 통과 | 3.36ms | 36MB   |
| 테스트 11 | 통과 | 1.80ms | 35.9MB |
| 테스트 12 | 통과 | 1.75ms | 36.1MB |
| 테스트 13 | 통과 | 1.85ms | 36MB   |

| 단계      | 시작 시각           | 끝난 시각           | 걸린 시간 |
| --------- | ------------------- | ------------------- | --------- |
| 문제 이해 | 2023-11-29 17:28:33 | 2023-11-29 17:29:38 |           |
| 풀이 생각 | 2023-11-29 17:29:39 | 2023-11-29 17:40:44 |           |
| 코딩      | 2023-11-29 17:40:45 | 2023-11-29 18:12:32 |           |

```js
function solution(n, wires) {
    let min = n;
    const connect = {};

    // Tree 구성
    wires.forEach(([v1, v2]) => {
        connect[v1] ? connect[v1].push(v2) : (connect[v1] = [v2]);
        connect[v2] ? connect[v2].push(v1) : (connect[v2] = [v1]);
    });

    wires.forEach(([v1, v2]) => {
        // v1과 v2의 연결을 끊었을 경우
        // v1 기준으로 연결된 송전탑을 순회하도록 초기화
        const stack = [];
        const visited = new Array(n + 1).fill(false);

        // v1은 방문한 상태 (count: 1, visited 처리)
        let count = 1;
        visited[v1] = true;

        // v2를 제외한 인접한 송전탑을 방문하도록 stack에 push
        // 인접한 송전탑 역시 visited 처리
        connect[v1].forEach((v) => {
            if (v !== v2) {
                visited[v] = true;
                stack.push(v);
            }
        });

        // dfs를 이용해 인접한 송전탑을 순회하면서 count를 증가
        while (stack.length) {
            const now = stack.pop();
            count += 1;
            connect[now].forEach((next) => {
                if (!visited[next]) {
                    visited[next] = true;
                    stack.push(next);
                }
            });
        }

        min = Math.min(min, Math.abs(count - (n - count)));
    });

    return min;
}
```

### 아이디어 & 풀이

`wires`를 순회해면서 각 연결에 대해 해당 연결을 없앴을 때 두 그룹으로 나뉘는 송전탑의 개수의 차를 구해 `min`을 업데이트 한다.

* 각 연결을 없앴을 때 송전탑의 개수는 해당 연결의 시작 송전탑을 기준으로 DFS를 이용해 인접해 있는 송전탑의 개수 `count`를 구한다.
* 인접해 있지 않은 송전탑이 다른 전력망의 송전탑의 개수 이므로 이는 `n - count`이고 두 전력망 송전탑 수의 차이는 `count - (n - count)`의 절댓값이다.

DFS를 이용해 송전탑의 수는 다음과 같이 구한다.

* 방문할 송전탑을 `stack`으로 방문한 송전탑은 `visited`로 관리한다.
* 해제할 연결이 `[v1, v2]`일 때 `v1`일 기준으로 `stack`과 `visited`의 초기값을 구성한다.
    * `v1`은 이미 방문했으므로 `count`는 미리 1로 증가시킨 뒤 `visited[v1]`의 값을 `true`로 변경하고
    * `v2`를 제외한 `v1`과 연결된 송전탑을 `stack`에 push한 뒤 이들의 `visited` 값도 `true`로 변경한다.
* `stack`에 원소가 없을 때까지 다음을 반복한다.
    * 현재 pop 한 송전탑에 대해 `count`를 증가시키고
    * 인접한 송전탑에 대해, 해당 송전탑을 아직 방문하지 않았다면 `stack`에 새로 push 한다.
