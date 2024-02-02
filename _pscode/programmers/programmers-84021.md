---
layout  : article
title   : Programmers_84021 퍼즐 조각 채우기
summary : 
date    : 2024-01-12 10:47:55 +0900
updated : 2024-02-02 22:32:05 +0900
tag     : ps-js
toc     : true
public  : true
parent  : [[Programmers-Index]]
latex   : false
---
* TOC
{:toc}

> 이 글은 프로그래머스의 [84021번](https://programmers.co.kr/learn/courses/30/lessons/84021) 문제를 자바스크립트(JavaScript)으로 풀이한 것을 모아놓은 글입니다.
>
> 일종의 연습 기록이며 제가 정답을 받은 코드와 참고할만한 다른 코드를 같이 기록합니다. 필요한 경우 코드에 대한 해설을 기록합니다만 코드는 통과했어도 해설은 틀릴 수 있기 때문에 가볍게 참고해주시길 부탁드립니다. 피드백은 편하신 방법으로 자유롭게 주시면 감사하겠습니다.

## 2024.01.12

| 테스트    | 통과 | 시간     | 메모리 |
| --------- | ---- | ------   | ------ |
| 테스트 1  | 통과 | 3.65ms   | 34.5MB |
| 테스트 2  | 통과 | 3.64ms   | 34.5MB |
| 테스트 3  | 통과 | 3.27ms   | 34.5MB |
| 테스트 4  | 통과 | 5.80ms   | 34.4MB |
| 테스트 5  | 통과 | 2.80ms   | 34.4MB |
| 테스트 6  | 통과 | 33.31ms  | 43.4MB |
| 테스트 7  | 통과 | 28.84ms  | 43.1MB |
| 테스트 8  | 통과 | 53.96ms  | 42.5MB |
| 테스트 9  | 통과 | 25.85ms  | 39.9MB |
| 테스트 10 | 통과 | 130.36ms | 48.5MB |
| 테스트 11 | 통과 | 335.62ms | 47.1MB |
| 테스트 12 | 통과 | 145.50ms | 46.3MB |
| 테스트 13 | 통과 | 193.64ms | 46.2MB |
| 테스트 14 | 통과 | 4.88ms   | 34.8MB |
| 테스트 15 | 통과 | 1.19ms   | 33.6MB |
| 테스트 16 | 통과 | 1.77ms   | 33.6MB |
| 테스트 17 | 통과 | 1.34ms   | 33.7MB |
| 테스트 18 | 통과 | 1.33ms   | 33.7MB |
| 테스트 19 | 통과 | 1.09ms   | 33.5MB |
| 테스트 20 | 통과 | 0.94ms   | 33.6MB |
| 테스트 21 | 통과 | 0.72ms   | 33.5MB |
| 테스트 22 | 통과 | 1.10ms   | 33.4MB |

| 단계      | 시작 시각           | 끝난 시각           | 걸린 시간 |
| --------- | ------------------- | ------------------- | --------- |
| 문제 이해 | 2024-01-12 10:48:38 | 2024-01-12 10:51:35 |           |
| 풀이 생각 | 2024-01-12 10:52:44 | 2024-01-12 11:00:15 |           |
| 코딩 1    | 2024-01-12 11:01:13 | 2024-01-12 11:31:02 |           |
| 코딩 2    | 2024-01-12 11:41:20 | 2024-01-12 12:32:19 |           |
| 코딩 3    | 2024-01-12 13:20:47 | 2024-01-12 13:59:35 |           |
| 코딩 4    | 2024-02-02 21:14:33 | 2024-02-02 22:11:58 |           |

```js
// DFS로 연결된 칸(빈 공간 혹은 블록)의 좌표를 구해 반환하는 함수
function getShape(startX, startY, base, target) {
    const stack = [[startX, startY]];
    const shape = [[startX, startY]];
    const delta = [
        [1, 0],
        [0, 1],
        [-1, 0],
        [0, -1],
    ];

    while (stack.length) {
        const [x, y] = stack.pop();
        delta.forEach(([dx, dy]) => {
            if (base[y + dy]?.[x + dx] === target) {
                const [nx, ny] = [x + dx, y + dy];
                base[ny][nx] = Number(!target);
                stack.push([nx, ny]);
                shape.push([nx, ny]);
            }
        });
    }
    return shape;
}

// 모양 비교를 위해 해당 모양을 감싸는 박스를 생성하는 함수
// 왼쪽 위를 (0, 0)으로 1이 모양에 해당하는 부분, 0이 해당하지 않는 부분
function createBox(shape) {
    const [minX, minY, maxX, maxY] = shape.reduce(
        (acc, curr) => [
            Math.min(acc[0], curr[0]),
            Math.min(acc[1], curr[1]),
            Math.max(acc[2], curr[0]),
            Math.max(acc[3], curr[1]),
        ],
        [...shape[0], ...shape[0]]
    );
    const normalized = shape.map(([x, y]) => [x - minX, y - minY]);
    const box = Array.from(new Array(maxY - minY + 1), () =>
        new Array(maxX - minX + 1).fill(0)
    );
    normalized.forEach(([x, y]) => (box[y][x] = 1));

    return box;
}

// 블록을 90도 회전시키는 함수
function rotate90(shape) {
    return shape.map(([x, y]) => [-y, x]);
}

// 두 박스가 일치하는지 확인하는 함수
function isEqual(a, b) {
    if (a.length !== b.length || a[0].length !== b[0].length) return false;
    return a.every((row, j) => row.every((col, i) => col === b[j][i]));
}

// 공간에 블록을 끼워넣을 수 있는지 확인하는 함수
// 블록을 90도씩 돌려가면서 piece의 box와 블록의 box가 일치하면 true를 반환
function isFit(a, b) {
    const boxA = createBox(a);

    for (let i = 0; i < 4; i += 1) {
        const boxB = createBox(b);
        if (isEqual(boxA, boxB)) return true;
        b = rotate90(b);
    }
    return false;
}

function solution(game_board, table) {
    const spaces = [];
    const pieces = [];
    for (let y = 0; y < game_board.length; y += 1) {
        for (let x = 0; x < game_board[0].length; x += 1) {
            if (!game_board[y][x]) {
                game_board[y][x] = 1;
                spaces.push(getShape(x, y, game_board, 0));
            }
            if (table[y][x]) {
                table[y][x] = 0;
                pieces.push(getShape(x, y, table, 1));
            }
        }
    }

    // 공간과 블록의 사용 여부를 확인하는 배열
    const spaceUsed = new Array(spaces.length).fill(0);
    const pieceUsed = new Array(pieces.length).fill(0);

    // 사용된 블록의 개수
    let count = 0;
    spaces.forEach((space, i) => {
        pieces.forEach((piece, j) => {
            if (!spaceUsed[i] && !pieceUsed[j] && isFit(space, piece)) {
                count += piece.length;
                spaceUsed[i] = 1;
                pieceUsed[j] = 1;
            }
        });
    });

    return count;
}
```

### 아이디어 & 풀이

우선 공간/블록 덩어리의 좌표들을 파악한다.

* `game_board`와 `table`을 순회하면서
* 각 좌표를 `getShape`에 전달해 해당 좌표를 포함한 공간/블록 덩어리를 반환 받아 `spaces`/`pieces`에 집어 넣는다.
    * DFS로 상하좌우로 나아가며 인접한 공간(0)/블록(1)을 모을 수 있으며
    * 이 과정에서 모인 공간/블록은 다시 사용되지 않도록 반대(공간의 경우 1, 조각의 경우 0)로 채워준다.

공간 덩어리의 집합 `spaces`와 블록 덩어리의 집합 `pieces`를 순회하면서 `isFit` 함수로 각 공간에 블록을 넣을 수 있는지 확인한다.

* 블록과 공간의 위치한 절대 좌표는 다르므로 이를 비교하기 위해 `createBox`를 이용해 각각을 좌상단을 (0, 0)으로 하는 직사각 박스로 감싸준다.
    * 타겟인 블록 혹은 공간이 위치한 부분을 1, 아닌 부분을 0으로
* `isEqual` 함수를 이용해 두 박스가 같은지 비교한다.
* 블록은 회전시킬 수 있으므로 박스가 일치하지 않는 경우 `rotate90` 함수를 이용해 블록을 90도 회전시킨 뒤 다시 박스로 감싸 비교하는 과정을 반복한다.
* 360도 회전시키는 동안 블록이 일치하면 `true`를 일치하지 않으면 `false`를 반환한다.

공간에 블록을 넣을 수 있으면 해당 블록의 크기를 `count`에 추가한 뒤 모든 공간과 블록을 순회하면 `count`를 반환한다.

### 피드백

* 실행이 너무 느리다. 속도 면에서 개선할 수 있는 부분이나 더 나은 로직이 있는지 확인해봐야할 것 같다.
