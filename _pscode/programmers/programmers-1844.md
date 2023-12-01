---
layout  : article
title   : Programmers_1844 게임 맵 최단거리
summary : 
date    : 2023-12-01 14:38:52 +0900
updated : 2023-12-01 18:22:04 +0900
tag     : ps-js
toc     : true
public  : true
parent  : [[Programmers-Index]]
latex   : false
---
* TOC
{:toc}

> 이 글은 프로그래머스의 [1844번](https://programmers.co.kr/learn/courses/30/lessons/1844) 문제를 JavaScript로 풀이한 것을 모아놓은 글입니다.
>
> 일종의 연습 기록이며 제가 정답을 받은 코드와 참고할만한 다른 코드를 같이 기록합니다. 필요한 경우 코드에 대한 해설을 기록합니다만 코드는 통과했어도 해설은 틀릴 수 있기 때문에 가볍게 참고해주시길 부탁드립니다. 피드백은 편하신 방법으로 자유롭게 주시면 감사하겠습니다.

## 2023.12.01

정확성 테스트

| 테스트    | 통과 | 시간   | 메모리 |
| --------  | ---- | ------ | ------ |
| 테스트 1  | 통과 | 0.24ms | 33.5MB |
| 테스트 2  | 통과 | 0.20ms | 33.5MB |
| 테스트 3  | 통과 | 0.23ms | 33.4MB |
| 테스트 4  | 통과 | 0.23ms | 33.5MB |
| 테스트 5  | 통과 | 0.23ms | 33.5MB |
| 테스트 6  | 통과 | 0.26ms | 33.5MB |
| 테스트 7  | 통과 | 0.25ms | 33.5MB |
| 테스트 8  | 통과 | 0.30ms | 33.4MB |
| 테스트 9  | 통과 | 0.24ms | 33.5MB |
| 테스트 10 | 통과 | 0.26ms | 33.6MB |
| 테스트 11 | 통과 | 0.23ms | 33.4MB |
| 테스트 12 | 통과 | 0.32ms | 33.5MB |
| 테스트 13 | 통과 | 0.23ms | 33.5MB |
| 테스트 14 | 통과 | 0.23ms | 33.4MB |
| 테스트 15 | 통과 | 0.23ms | 33.5MB |
| 테스트 16 | 통과 | 0.22ms | 33.5MB |
| 테스트 17 | 통과 | 0.23ms | 33.5MB |
| 테스트 18 | 통과 | 0.09ms | 33.4MB |
| 테스트 19 | 통과 | 0.09ms | 33.4MB |
| 테스트 20 | 통과 | 0.09ms | 33.5MB |
| 테스트 21 | 통과 | 0.09ms | 33.5MB |

효율성 테스트

| 테스트   | 통과 | 시간    | 메모리 |
| -------- | ---- | ------  | ------ |
| 테스트 1 | 통과 | 12.49ms | 38.1MB |
| 테스트 2 | 통과 | 6.01ms  | 37.7MB |
| 테스트 3 | 통과 | 8.44ms  | 38.2MB |
| 테스트 4 | 통과 | 27.38ms | 37.6MB |

| 단계      | 시작 시각           | 끝난 시각           | 걸린 시간 |
| --------- | ------------------- | ------------------- | --------- |
| 문제 이해 | 2023-12-01 16:35:21 | 2023-12-01 16:36:26 |           |
| 풀이 생각 | 2023-12-01 16:36:30 | 2023-12-01 16:39:38 |           |
| 코딩      | 2023-12-01 16:39:41 | 2023-12-01 16:59:28 |           |
| 디버깅    | 2023-12-01 17:13:14 | 2023-12-01 17:57:37 |           |

```js
function solution(maps) {
    const dx = [1, 0, -1, 0];
    const dy = [0, 1, 0, -1];
    const n = maps.length;
    const m = maps[0].length;

    // BFS
    const queue = [[0, 0, 1]];

    while (queue.length) {
        const [x, y, count] = queue.shift();

        // 종결 조건
        if (x === m - 1 && y === n - 1) {
            return count;
        }

        // dx, dy를 미리 선언해놓고 인덱스를 증가시키면서 상하좌우 각 지점을 확인한다.
        for (let i = 0; i < 4; i += 1) {
            const nx = x + dx[i];
            const ny = y + dy[i];

            // 다음 지점이 map 안에 있고 해당 지점이 벽이 아니면
            if (0 <= nx && nx < m && 0 <= ny && ny < n && maps[ny][nx]) {
                // 다음 지점을 queue에 삽입
                queue.push([nx, ny, count + 1]);
                // 다음 지점은 다시 방문하지 않도록 벽으로 변경한다.
                // 원래 visited를 별도로 선언해서 사용하지만
                // 여기선 동일한 역할을 하는 벽이 있기 때문에 이를 이용.
                maps[ny][nx] = 0;
            }
        }
    }

    return -1
}
```

### 아이디어 & 풀이

BFS로 출발 지점부터 한 칸씩 나아가면서 count를 증가시키고 다음 칸이 상대편(`m - 1`, `n - 1`)과 같으면 count를 반환한다.

* BFS는 출발 지점에서 상하좌우의 다음 지점으로 한 칸씩 나아가면서 각 칸을 확인하기 때문에 처음으로 도달하는 상대편의 위치까지의 거리(`count`)가 최단거리다.

BFS는 queue를 이용해 구현한다.

* 현재로부터 상하좌우 지점을 확인하기 위해 각 지점에 해당하는 `dx`, `dy`를 선언해 이를 인덱스로 이용해 순회하면서 상하좌우에 접근한다.
* 보편적으로 쓰는 `visited` 배열 대신에 기존의 `maps`에서 접근 불가능한 영역을 벽(`0`)으로 관리하고 있으므로 이를 이용한다. 방문한 지점은 벽으로 변경한다.

### 디버그

DFS로 풀 경우 효율성 테스트에서 초과가 난다.

* BFS는 현재 진행중인 길이 최소라는 것을 보장할 수 있어 끝 부분에 도달했을 때 바로 탐색을 종료할 수 있지만
* DFS는 하나의 경로를 우선으로 탐색한 뒤 갈림길로 다시 돌아와 다른 경로를 다시 탐색하게 되며, 이는 모든 경로를 탐색하면서 각 경로 길이를 비교해 최솟값을 구해야 하므로 BFS에 비해 실행이 오래걸릴 수 밖에 없다.

<details>
<summary> 작성했던 코드 </summary>>

```js
function solution(maps) {
    const dx = [1, 0, -1, 0];
    const dy = [0, 1, 0, -1];
    const n = maps.length;
    const m = maps[0].length;

    if (!maps[n - 2]?.[m - 1] && !maps[n - 1]?.[m - 2]) return -1;

    const visited = Array.from(Array(n), () => Array(m).fill(false));
    let min = n * m + 1;

    function dfs(x, y, count) {
        if (x === m - 1 && y === n - 1) {
            min = Math.min(min, count);
            return;
        }

        for (let i = 0; i < 4; i += 1) {
            const nx = x + dx[i];
            const ny = y + dy[i];

            if (0 <= nx && nx < m && 0 <= ny && ny < n && !visited[ny][nx] && maps[ny][nx]) {
                visited[ny][nx] = true;
                count++;
                dfs(nx, ny, count);
                visited[ny][nx] = false;
                count--;
            }
        }
        return;
    }
    dfs(0, 0, 1);

    return min === n * m + 1 ? -1 : min;
}
```

</details>

### 피드백

* queue를 사용하는 BFS 보다는 stack이나 재귀를 사용하는 DFS가 기본적으로 실행이 더 빨라서 인접한 영역을 탐색하는 문제에서는 큰 고민 없이 DFS를 위주로 썼는데 문제에 따라 DFS와 BFS중 더 적절한 걸 써야할 것 같다.
* 위와 같은 최단거리 문제는 BFS를 사용해야 한다.
