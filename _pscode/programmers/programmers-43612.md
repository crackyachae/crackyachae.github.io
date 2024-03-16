---
layout  : article
title   : Programmers_43612 네트워크
summary : 
date    : 2024-01-08 22:18:16 +0900
updated : 2024-03-14 17:32:07 +0900
tag     : ps-js
toc     : true
public  : true
parent  : [[Programmers-Index]]
latex   : false
---
* TOC
{:toc}

> 이 글은 프로그래머스의 [43612번](https://programmers.co.kr/learn/courses/30/lessons/43612) 문제를 자바스크립트(JavaScript)로 풀이한 것을 모아놓은 글입니다.
>
> 일종의 연습 기록이며 제가 정답을 받은 코드와 참고할만한 다른 코드를 같이 기록합니다. 필요한 경우 코드에 대한 해설을 기록합니다만 코드는 통과했어도 해설은 틀릴 수 있기 때문에 가볍게 참고해주시길 부탁드립니다. 피드백은 편하신 방법으로 자유롭게 주시면 감사하겠습니다.

## 2024.01.08

| 테스트    | 통과 | 시간   | 메모리 |
| --------- | ---- | ------ | ------ |
| 테스트 1  | 통과 | 0.25ms | 33.5MB |
| 테스트 2  | 통과 | 0.25ms | 33.6MB |
| 테스트 3  | 통과 | 0.24ms | 33.5MB |
| 테스트 4  | 통과 | 0.41ms | 33.5MB |
| 테스트 5  | 통과 | 0.12ms | 33.5MB |
| 테스트 6  | 통과 | 1.82ms | 36.7MB |
| 테스트 7  | 통과 | 0.26ms | 33.6MB |
| 테스트 8  | 통과 | 0.47ms | 33.5MB |
| 테스트 9  | 통과 | 0.53ms | 33.5MB |
| 테스트 10 | 통과 | 0.59ms | 33.6MB |
| 테스트 11 | 통과 | 3.85ms | 37MB   |
| 테스트 12 | 통과 | 6.21ms | 36.9MB |
| 테스트 13 | 통과 | 1.20ms | 36.7MB |

| 단계      | 시작 시각 | 끝난 시각 | 걸린 시간 |
| --------- | --------- | --------- | --------- |
| 문제 이해 | 22:19:38  | 22:23:55  |           |
| 풀이 생각 | 22:24:10  | 22:24:55  |           |
| 코딩      | 22:24:59  | 22:39:23  |           |

```js
function solution(n, computers) {
    function dfs(begin) {
        const stack = [begin];

        while (stack.length) {
            const i = stack.pop();
            computers[i].forEach((connected, j) => {
                if (connected & (i !== j)) {
                    stack.push(j);
                }
                computers[i][j] = 0;
                computers[j][i] = 0;
            });
        }
    }

    let count = 0;
    for (let i = 0; i < n; i += 1) {
        for (let j = 0; j < n; j += 1) {
            if (computers[i][j]) {
                count += 1;
                dfs(i);
            }
        }
    }

    return count;
}
```

### 아이디어 & 풀이

`computers`를 순회하면서 해당 컴퓨터가 자신 혹은 다른 컴퓨터와 연결된 경우

* 네트워크의 `count`를 1 증가시키고
* 해당 네트워크를 `computers`상에서 없앤다.

네트워크를 `computers`에서 없애기 위해서 DFS를 이용한다.

* `stack`의 가장 마지막 컴퓨터(`i`)에 대해서 해당 컴퓨터와 각 컴퓨터의 연결 여부(`computers[i]`)를 순회하면서
* 순회한 컴퓨터 `j`가 `i`와 연결되어있고, 연결된 컴퓨터가 자신이 아닐 경우에만 다음으로 연결된 컴퓨터를 찾기 위해 `stack`에 `j`를 추가한다.
* 이후 불필요한 탐색을 막기 위해 `computers[i][j]`와 `computers[j][i]`의 값을 모두 0으로 변경해 두 컴퓨터 사이의 연결을 끊는다.

### 피드백

* `computers[i]`를 순회할 때 연결을 끊는 것도 `connected`인 경우에만 하면 되는데 `connected` 내부에 중첩된 조건을 만들고 싶지 않아서 모든 경우에서 `computers[i][j]`와 `computers[j][i]`의 값을 모두 0으로 변경하도록 작성했다.
* 위의 조건을 만족하면서 DFS 내의 코드를 조금 더 깔끔하게 작성하고 싶은데 좋은 방법이 떠오르지 않는다.
