---
layout  : article
title   : Programmers_87694 아이템 줍기
summary : 
date    : 2024-01-10 17:15:52 +0900
updated : 2024-01-11 04:00:37 +0900
tag     : ps-js draft
toc     : true
public  : true
parent  : [[Programmers-Index]]
latex   : false
---
* TOC
{:toc}

> 이 글은 프로그래머스의 [87694번](https://programmers.co.kr/learn/courses/30/lessons/87694) 문제를 자바스크립트(JavaScript)으로 풀이한 것을 모아놓은 글입니다.
>
> 일종의 연습 기록이며 제가 정답을 받은 코드와 참고할만한 다른 코드를 같이 기록합니다. 필요한 경우 코드에 대한 해설을 기록합니다만 코드는 통과했어도 해설은 틀릴 수 있기 때문에 가볍게 참고해주시길 부탁드립니다. 피드백은 편하신 방법으로 자유롭게 주시면 감사하겠습니다.

## 2024.01.10

| 테스트    | 통과 | 시간   | 메모리 |
| --------- | ---- | ------ | ------ |
| 테스트 1  | 통과 | 0.30ms | 33.5MB |
| 테스트 2  | 통과 | 0.31ms | 33.5MB |
| 테스트 3  | 통과 | 0.48ms | 33.4MB |
| 테스트 4  | 통과 | 0.29ms | 33.5MB |
| 테스트 5  | 통과 | 0.29ms | 33.5MB |
| 테스트 6  | 통과 | 0.30ms | 33.5MB |
| 테스트 7  | 통과 | 0.57ms | 33.5MB |
| 테스트 8  | 통과 | 0.79ms | 33.4MB |
| 테스트 9  | 통과 | 1.55ms | 33.7MB |
| 테스트 10 | 통과 | 0.98ms | 33.8MB |
| 테스트 11 | 통과 | 1.41ms | 33.7MB |
| 테스트 12 | 통과 | 0.94ms | 33.7MB |
| 테스트 13 | 통과 | 1.04ms | 33.7MB |
| 테스트 14 | 통과 | 1.17ms | 33.6MB |
| 테스트 15 | 통과 | 1.23ms | 33.6MB |
| 테스트 16 | 통과 | 0.96ms | 33.6MB |
| 테스트 17 | 통과 | 0.97ms | 33.8MB |
| 테스트 18 | 통과 | 1.12ms | 33.7MB |
| 테스트 19 | 통과 | 1.68ms | 33.9MB |
| 테스트 20 | 통과 | 1.33ms | 33.9MB |
| 테스트 21 | 통과 | 1.13ms | 33.8MB |
| 테스트 22 | 통과 | 1.10ms | 33.7MB |
| 테스트 23 | 통과 | 1.32ms | 34MB   |
| 테스트 24 | 통과 | 1.96ms | 33.8MB |
| 테스트 25 | 통과 | 1.25ms | 33.6MB |
| 테스트 26 | 통과 | 0.81ms | 33.6MB |
| 테스트 27 | 통과 | 0.85ms | 33.7MB |
| 테스트 28 | 통과 | 0.86ms | 33.7MB |
| 테스트 29 | 통과 | 1.47ms | 33.7MB |
| 테스트 30 | 통과 | 0.85ms | 33.7MB |

| 단계      | 시작 시각           | 끝난 시각           | 걸린 시간 |
| --------- | ------------------- | ------------------- | --------- |
| 문제 이해 | 2024-01-10 17:17:44 | 2024-01-10 17:21:40 |           |
| 풀이 생각 | 2024-01-10 17:21:41 | 2024-01-10 17:49:50 |           |
| 코딩      | 2024-01-10 17:49:53 | 2024-01-10 18:32:12 |           |
| 디버깅    | 2024-01-10 20:16:13 | 2024-01-10 20:37:40 |           |

```js
function solution(rectangle, characterX, characterY, itemX, itemY) {
    // 다른 사각형의 안에 있는 점인지 확인하는 함수
    function isInside(idx, x, y) {
        for (let i = 0; i < rectangle.length; i += 1) {
            if (i === idx) continue;

            const [minX, minY, maxX, maxY] = rectangle[i];
            if (2 * minX < x && x < 2 * maxX && 2 * minY < y && y < 2 * maxY) {
                return true;
            }
        }
        return false;
    }

    // canVisit 배열 생성
    const [maxX, maxY] = rectangle.reduce(
        (acc, curr) => [Math.max(acc[0], curr[2]), Math.max(acc[1], curr[3])],
        [0, 0]
    );
    const canVisit = Array.from(new Array(2 * (maxY + 1)), () => new Array(2 * (maxX + 1)).fill(0));

    rectangle.forEach(([minX, minY, maxX, maxY], i) => {
        for (let x = 2 * minX; x <= 2 * maxX; x += 1) {
            [2 * minY, 2 * maxY].forEach((y) => {
                if (!isInside(i, x, y)) {
                    canVisit[y][x] = 1;
                }
            });
        }
        for (let y = 2 * minY; y <= 2 * maxY; y += 1) {
            [2 * minX, 2 * maxX].forEach((x) => {
                if (!isInside(i, x, y)) {
                    canVisit[y][x] = 1;
                }
            });
        }
    });

    // BFS (경로 탐색)
    canVisit[characterY * 2][characterX * 2] = 0;

    const queue = [[characterX * 2, characterY * 2, 0]];
    const dx = [1, 0, -1, 0];
    const dy = [0, 1, 0, -1];

    while (queue.length) {
        const [x, y, count] = queue.shift();

        if (x === 2 * itemX && y === 2 * itemY) return count / 2;

        for (let i = 0; i < 4; i += 1) {
            const nx = x + dx[i];
            const ny = y + dy[i];

            if (canVisit[ny]?.[nx]) {
                canVisit[ny][nx] = 0;
                queue.push([nx, ny, count + 1]);
            }
        }
    }
}
```

### 아이디어 & 풀이

이동할 수 있는 경로의 좌표를 나타내는 `canVisit` 배열을 생성해 해당 좌표들을 BFS로 탐색하면서 `count`를 증가시키다 목적지(아이템의 좌표)에 도달하면 `count`를 반환한다.

이동할 수 있는 경로의 좌표인 `canVisit` 배열은 다음과 같이 구한다.

* `rectangle`을 순회하면서 x좌표의 최댓값(`maxX`)과 y좌표의 최댓값(`maxY`)를 구한다.
* 가로가 0 ~ `maxX`까지 있고 세로가 0~`maxY`까지 있는 이차원 배열을 선언해 모든 원소의 값을 0으로 초기화한다.
* `rectangle`을 순회하면서 직사각형의 변에 해당하는 좌표들의 값을 1로 바꾼다.
* 이때, 특정 직사각형의 변에 존재하는 좌표더라도 해당 좌표가 다른 직사각형의 내부에 포함되면 이동 경로에 포함되지 않는다.
    * 이를 거르기 위해 특정 좌표(`x`,`y`)가 다른 직사각형의 내부에 포함되는지 여부를 확인하는 `isInside` 함수를 별도로 작성해 `isInside` 값이 `false`인 경우만 `canVisit`의 값을 1로 바꾼다.

BFS는 `queue`를 이용해 구현한다.

* `queue`의 원소는 현재 좌표와 지금까지 이동한 거리 `[x, y, count]`로 구성한다.
* `queue`에서 꺼낸 좌표가 item의 좌표와 같은지 확인한 뒤 같으면 `count`를 반환하고 같지 않으면 탐색을 진행한다.
* 탐색은 특정 좌표에서 상하좌우의 좌표로 나아가는 방식으로 진행하며 현재 좌표의 상하좌우 좌표중에서 경로에 해당하는, 즉 `canVisit`의 값이 1인 좌표만 `queue`에 삽입한다.
* 이미 지나온 좌표를 다시 방문하는 것을 방지하기 위해 `queue`에 삽입하는 좌표의 `canVisit`값은 0으로 바꾼다.

해당 방법대로 구현하면 엣지 케이스로 인한 오류가 발생한다.

* 두 좌표가 인접(거리가 1)한 경우 경로가 아닌데도 좌표 사이를 이동할 수 있다 (다른 두 직사각형 사이에 발생).
    * 입출력 예시 1번을 예로 들었을 때, 위의 조건대로면 현재 지점이 (3, 5)일 때 `queue`에 (3, 6)이 삽입되지만 (3, 5)와 (3, 6) 사이는 이동할 수 없으므로 최종 지점에 도착했을 때 지나온 경로의 길이가 달라지게 된다.
* 이를 방지하기 위해 한 칸씩 이동하는 것은 유지한채 사각형의 크기를 두 배씩 키워야 한다.
    * 각 사각형을 두 배로 키워 `canVisit`을 구성하면 경로상에 존재하는 좌표 사이의 간격은 1로 유지되면서, 위의 오류 상황이 발생하는 좌표간의 거리는 2로 증가하므로 1씩 이동할 때 오류가 발생하지 않게 된다.
    * 사각형이 두 배가되면 양상은 유지된 채 이동하는 경로의 길이만 두 배 증가하므로 `count`를 반환할 때 2로 나누어 반환하면 된다.

### 디버그

* 경로 상에 놓여있지 않은 인접한 두 좌표에 의해 경로가 틀어져서 오류가 발생하는 경우를 고려하지 못했다.
* 두 배 증가시켜서 진행하는 방법은 검색으로 바로 확인.

### 피드백

* 직사각형의 변을 따라 `canVisit`값을 채우는 로직을 더 간결하게 작성할 수 있을 것 같다.

## 참고 답안

| 테스트    | 통과 | 시간   | 메모리 |
| --------- | ---- | ------ | ------ |
| 테스트 1  | 통과 | 0.49ms | 33.6MB |
| 테스트 2  | 통과 | 0.32ms | 33.5MB |
| 테스트 3  | 통과 | 0.32ms | 33.5MB |
| 테스트 4  | 통과 | 0.34ms | 33.5MB |
| 테스트 5  | 통과 | 0.36ms | 33.5MB |
| 테스트 6  | 통과 | 0.35ms | 33.5MB |
| 테스트 7  | 통과 | 0.45ms | 33.6MB |
| 테스트 8  | 통과 | 0.43ms | 33.5MB |
| 테스트 9  | 통과 | 0.59ms | 33.6MB |
| 테스트 10 | 통과 | 0.56ms | 33.5MB |
| 테스트 11 | 통과 | 0.59ms | 33.5MB |
| 테스트 12 | 통과 | 0.59ms | 33.5MB |
| 테스트 13 | 통과 | 0.57ms | 33.6MB |
| 테스트 14 | 통과 | 0.51ms | 33.5MB |
| 테스트 15 | 통과 | 0.49ms | 33.6MB |
| 테스트 16 | 통과 | 0.69ms | 33.5MB |
| 테스트 17 | 통과 | 0.54ms | 33.6MB |
| 테스트 18 | 통과 | 0.56ms | 33.4MB |
| 테스트 19 | 통과 | 0.60ms | 33.6MB |
| 테스트 20 | 통과 | 0.60ms | 33.6MB |
| 테스트 21 | 통과 | 0.58ms | 33.5MB |
| 테스트 22 | 통과 | 0.53ms | 33.5MB |
| 테스트 23 | 통과 | 0.81ms | 33.5MB |
| 테스트 24 | 통과 | 0.54ms | 33.5MB |
| 테스트 25 | 통과 | 0.49ms | 33.5MB |
| 테스트 26 | 통과 | 0.48ms | 33.6MB |
| 테스트 27 | 통과 | 0.48ms | 33.6MB |
| 테스트 28 | 통과 | 0.50ms | 33.5MB |
| 테스트 29 | 통과 | 0.75ms | 33.5MB |
| 테스트 30 | 통과 | 0.49ms | 33.5MB |

```js
function solution(rectangle, characterX, characterY, itemX, itemY) {
    const MAX = 52;
    const isOnRect = Array.from({ length: MAX }, () => Array(MAX).fill(0));
    rectangle.forEach(([minX, minY, maxX, maxY]) => {
        for (let x = minX; x < maxX; x++) {
            for (let y = minY; y < maxY; y++) {
                isOnRect[x][y] = 1;
            }
        }
    });

    // BFS
    const visited = isOnRect.map(() => Array(MAX).fill(false));
    const queue = new Set([[0, characterX, characterY]]);
    for (const nowSet of queue) {
        queue.delete(nowSet);
        const [count, x, y] = nowSet;

        visited[x][y] = true;
        if (x === itemX && y === itemY) return count;

        const delta = [[-1, -1], [0, -1], [-1, 0], [0, 0]];
        const [leftBottom, bottom, left, now] = delta.map(
            ([dx, dy]) => isOnRect[x + dx]?.[y + dy] ?? 0
        );

        // move left
        if (leftBottom !== left && !visited[x - 1][y])
            queue.add([count + 1, x - 1, y]);
        // move bottom
        if (leftBottom !== bottom && !visited[x][y - 1])
            queue.add([count + 1, x, y - 1]);
        // move top
        if (left !== now && !visited[x][y + 1]) queue.add([count + 1, x, y + 1]);
        // move right
        if (bottom !== now && !visited[x + 1][y])
            queue.add([count + 1, x + 1, y]);
    }
}
```

### 아이디어 & 풀이

> TODO
