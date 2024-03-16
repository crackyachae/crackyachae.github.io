---
layout  : article
title   : Programmers_87946 피로도
summary : 
date    : 2023-11-28 20:06:18 +0900
updated : 2024-03-14 17:24:51 +0900
tag     : ps-js
toc     : true
public  : true
parent  : [[Programmers-Index]]
latex   : false
---
* TOC
{:toc}

> 이 글은 프로그래머스의 [87946번](https://programmers.co.kr/learn/courses/30/lessons/87946) 문제를 JavaScript로 풀이한 것을 모아놓은 글입니다.
>
> 일종의 연습 기록이며 제가 정답을 받은 코드와 참고할만한 다른 코드를 같이 기록합니다. 필요한 경우 코드에 대한 해설을 기록합니다만 코드는 통과했어도 해설은 틀릴 수 있기 때문에 가볍게 참고해주시길 부탁드립니다. 피드백은 편하신 방법으로 자유롭게 주시면 감사하겠습니다.

## 2023.11.28

| 테스트    | 통과 | 시간     | 메모리 |
| --------- | ---- | ------   | ------ |
| 테스트 1  | 통과 | 0.41ms   | 33.7MB |
| 테스트 2  | 통과 | 0.41ms   | 33.7MB |
| 테스트 3  | 통과 | 1.31ms   | 33.9MB |
| 테스트 4  | 통과 | 0.83ms   | 34MB   |
| 테스트 5  | 통과 | 3.91ms   | 37.9MB |
| 테스트 6  | 통과 | 20.44ms  | 46.7MB |
| 테스트 7  | 통과 | 81.64ms  | 73.9MB |
| 테스트 8  | 통과 | 90.85ms  | 73MB   |
| 테스트 9  | 통과 | 1.24ms   | 33.9MB |
| 테스트 10 | 통과 | 25.69ms  | 47MB   |
| 테스트 11 | 통과 | 0.57ms   | 33.7MB |
| 테스트 12 | 통과 | 102.67ms | 73.2MB |
| 테스트 13 | 통과 | 91.28ms  | 71.2MB |
| 테스트 14 | 통과 | 83.88ms  | 71.7MB |
| 테스트 15 | 통과 | 83.53ms  | 73MB   |
| 테스트 16 | 통과 | 21.81ms  | 46.8MB |
| 테스트 17 | 통과 | 81.66ms  | 71.7MB |
| 테스트 18 | 통과 | 0.42ms   | 33.6MB |
| 테스트 19 | 통과 | 0.81ms   | 33.9MB |

| 단계        | 시작 시각 | 끝난 시각 | 걸린 시간 |
| ----------- | --------- | --------- | --------- |
| 문제 이해   | 20:07:31  | 20:10:53  |           |
| 풀이 생각 1 | 20:10:55  | 20:20:09  |           |
| 코딩 1      | 20:20:12  | 20:24:16  |           |
| 풀이 생각 2 | 20:31:50  | 20:34:02  |           |
| 코딩 2      | 20:34:12  | 20:41:51  |           |

```js
function getPermutations(arr, n) {
    const results = [];
    if (n === 1) return arr.map((el) => [el]);

    arr.forEach((fixed, index, origin) => {
        const rest = [...origin.slice(0, index), ...origin.slice(index + 1)];
        const permutations = getPermutations(rest, n - 1);
        const attached = permutations.map((el) => [fixed, ...el]);
        results.push(...attached);
    });

    return results;
}

function getCount(k, dungeons) {
    return dungeons.reduce((acc, curr) => {
        if (k >= curr[0]) {
            k -= curr[1];
            return acc + 1;
        }
        return acc;
    }, 0);
}

function solution(k, dungeons) {
    let max = 0;
    getPermutations(dungeons, dungeons.length).forEach((dun) => {
        max = Math.max(max, getCount(k, dun));
    });

    return max;
}
```

### 아이디어 & 풀이

* 방문하는 던전의 수는 최대 8개 이므로 모든 던전에 순차적으로 방문하는 경우의 수를 순열로 구한 뒤 (`getPermutations` 사용)
* 각 순서에 따라 방문했을 때 방문할 수 있는 던전의 수를 구해 (`getCount` 사용)
* 이중 최댓값을 구해 반환한다.

### 피드백

* 완전 탐색으로, 던전이 8개인 경우 던전의 순열을 구성하는 것도 이를 순회하는 것도 매우 오래 걸린다.

## 참고 답안 1

| 테스트    | 통과 | 시간    | 메모리 |
| --------- | ---- | ------  | ------ |
| 테스트 1  | 통과 | 0.25ms  | 33.6MB |
| 테스트 2  | 통과 | 0.24ms  | 33.6MB |
| 테스트 3  | 통과 | 0.23ms  | 33.5MB |
| 테스트 4  | 통과 | 0.47ms  | 33.7MB |
| 테스트 5  | 통과 | 1.79ms  | 34.5MB |
| 테스트 6  | 통과 | 7.30ms  | 41MB   |
| 테스트 7  | 통과 | 22.76ms | 41.1MB |
| 테스트 8  | 통과 | 39.19ms | 43.2MB |
| 테스트 9  | 통과 | 0.36ms  | 33.6MB |
| 테스트 10 | 통과 | 3.04ms  | 38.2MB |
| 테스트 11 | 통과 | 0.30ms  | 33.5MB |
| 테스트 12 | 통과 | 4.22ms  | 38.4MB |
| 테스트 13 | 통과 | 0.75ms  | 33.9MB |
| 테스트 14 | 통과 | 0.39ms  | 33.7MB |
| 테스트 15 | 통과 | 0.30ms  | 33.5MB |
| 테스트 16 | 통과 | 0.29ms  | 33.6MB |
| 테스트 17 | 통과 | 0.40ms  | 33.6MB |
| 테스트 18 | 통과 | 0.22ms  | 33.5MB |
| 테스트 19 | 통과 | 0.32ms  | 33.5MB |

```js
function solution(k, dungeons) {
    return Math.max(
        ...dungeons.map(([min, used], i) =>
            k < min
                ? 0
                : solution(k - used, [...dungeons.slice(0, i), ...dungeons.slice(i + 1)]) + 1
        ),
        0
    );
}
```

### 아이디어 & 풀이

각 던전을 순회하면서 다음을 재귀적으로 수행한다.

* 해당 던전에 방문했을 때 남아있는 피로도 `k`가 최소 피로도 `min` 보다 크거나 같으면
* 남은 던전들로 새 던전 배열을 구성했을 때 현재 피로도 `k`에서 소모 피로도 `used`를 뺀 값으로 방문할 수 있는 최대 개수에 1을 더한 값을 반환한다.
* 현재 피로도가 최소 피로도보다 작아 방문할 수 없는 경우 0을 반환한다.

보다 간단한 코드로, 각 던전 목록을 순회하면서 현재 피로도로 방문할 수 없는 던전의 경우 재귀를 진행하지 않고 해당 케이스를 drop 하기 때문에 위의 순열을 구해서 모든 경우를 방문하는 것보다 더 효율적으로 완전탐색을 수행할 수 있다.

## 참고 답안 2

| 테스트    | 통과 | 시간    | 메모리 |
| --------- | ---- | ------  | ------ |
| 테스트 1  | 통과 | 0.27ms  | 33.4MB |
| 테스트 2  | 통과 | 0.17ms  | 32.9MB |
| 테스트 3  | 통과 | 0.19ms  | 33.1MB |
| 테스트 4  | 통과 | 0.37ms  | 33MB   |
| 테스트 5  | 통과 | 0.52ms  | 33.3MB |
| 테스트 6  | 통과 | 17.51ms | 36.6MB |
| 테스트 7  | 통과 | 24.00ms | 36.6MB |
| 테스트 8  | 통과 | 6.23ms  | 36.3MB |
| 테스트 9  | 통과 | 0.17ms  | 33.4MB |
| 테스트 10 | 통과 | 0.53ms  | 33.3MB |
| 테스트 11 | 통과 | 0.17ms  | 33.3MB |
| 테스트 12 | 통과 | 1.44ms  | 36.2MB |
| 테스트 13 | 통과 | 0.30ms  | 33.4MB |
| 테스트 14 | 통과 | 0.22ms  | 33MB   |
| 테스트 15 | 통과 | 0.17ms  | 33.4MB |
| 테스트 16 | 통과 | 0.17ms  | 33.4MB |
| 테스트 17 | 통과 | 0.21ms  | 33.4MB |
| 테스트 18 | 통과 | 0.21ms  | 33.4MB |
| 테스트 19 | 통과 | 0.20ms  | 33.4MB |

```js
function solution(k, dungeons) {
    const N = dungeons.length;
    const visited = new Array(N).fill(0);
    let max = 0;

    function dfs(k, count) {
        max = Math.max(count, max);

        for (let i = 0; i < N; i += 1) {
            if (k >= dungeons[i][0] && !visited[i]) {
                visited[i] = 1;
                dfs(k - dungeons[i][1], count + 1);
                visited[i] = 0;
            }
        }
    }

    dfs(k, 0);
    return max;
}
```

### 아이디어 & 풀이

DFS를 이용해 완전 탐색을 수행한 풀이이다. 각 던전을 순회하면서 다음을 반복한다.

* `visited` 배열을 구성해 현재 각 던전의 방문 여부를 확인한다.
* 현재 피로도가 최소 피로도보다 크거나 같고 해당 던전을 아직 방문하지 않았을 경우,
    * 현재 던전의 `visited`값을 1(방문)로 바꾸고 현재 방문한 던전의 피로도를 차감한 뒤 현재의 방문 여부와 남은 피로도로 다음 던전을 방문하기 위해 던전을 순회하면서 방문 여부를 확인한다.
* 이후 다시 같은 depth에서 순회할 때는 해당 던전을 방문하지 않은 상태여야 하므로 `visited`의 값을 다시 0으로 바꾼다.
* 매 순회를 반복할 때마다 방문한 던전 `max`의 값을 최댓값으로 변경한다.
