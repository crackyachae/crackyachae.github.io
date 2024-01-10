---
layout  : article
title   : Programmers_43163 단어 변환
summary : 
date    : 2024-01-09 16:49:08 +0900
updated : 2024-01-09 18:11:46 +0900
tag     : ps-js
toc     : true
public  : true
parent  : [[Programmers-Index]]
latex   : false
---
* TOC
{:toc}

> 이 글은 프로그래머스의 [43163번](https://programmers.co.kr/learn/courses/30/lessons/43163) 문제를 자바스크립트(JavaScript)으로 풀이한 것을 모아놓은 글입니다.
>
> 일종의 연습 기록이며 제가 정답을 받은 코드와 참고할만한 다른 코드를 같이 기록합니다. 필요한 경우 코드에 대한 해설을 기록합니다만 코드는 통과했어도 해설은 틀릴 수 있기 때문에 가볍게 참고해주시길 부탁드립니다. 피드백은 편하신 방법으로 자유롭게 주시면 감사하겠습니다.

## 2024.01.09

| 테스트    | 통과 | 시간   | 메모리 |
| --------- | ---- | ------ | ------ |
| 테스트 1  | 통과 | 0.15ms | 33.5MB |
| 테스트 2  | 통과 | 0.61ms | 33.6MB |
| 테스트 3  | 통과 | 1.67ms | 36.9MB |
| 테스트 4  | 통과 | 0.26ms | 33.4MB |
| 테스트 5  | 통과 | 0.14ms | 33.4MB |

| 단계      | 시작 시각           | 끝난 시각           | 걸린 시간 |
| --------- | ------------------- | ------------------- | --------- |
| 문제 이해 | 2024-01-09 16:50:04 | 2024-01-09 16:51:48 |           |
| 풀이 생각 | 2024-01-09 16:51:50 | 2024-01-09 16:57:06 |           |
| 코딩      | 2024-01-09 16:57:14 | 2024-01-09 17:22:03 |           |

```js
function canConverted(begin, target) {
    let count = 0;
    [...begin].forEach((c, i) => {
        count += Number(c !== target[i]);
    });

    return count === 1;
}

function solution(begin, target, words) {
    // initialize connection
    const nextWord = Array.from(new Array(words.length), () => []);

    for (let i = 0; i < words.length; i += 1) {
        for (let j = i; j < words.length; j += 1) {
            if (i === j) continue;
            if (canConverted(words[i], words[j])) {
                nextWord[i].push(j);
                nextWord[j].push(i);
            }
        }
    }

    // bfs
    const queue = [];
    const used = Array(words.length).fill(false);

    words.forEach((word, i) => {
        if (canConverted(begin, word)) queue.push([i, 1]);
    });

    while (queue.length) {
        const [now, count] = queue.shift();
        if (words[now] === target) return count;

        used[now] = true;
        nextWord[now].forEach((next) => {
            if (!used[next]) {
                queue.push([next, count + 1]);
            }
        });
    }

    return 0;
}
```

### 아이디어 & 풀이

`begin`에서 출발해 `count`를 증가시켜가며 다음 단어를 탐색하고, 해당 단어가 `target`과 같으면 `count`를 반환한다.

* BFS를 이용해 연결된 단어 중 근접한 단어부터 탐색해야 '가장 짧은' 변환 수를 구할 수 있다.
* 각 단어를 하나의 노드라고 할 때 현재 단어에서 다음 단어로 변환할 수 있으면 두 노드가 연결된 상태로 볼 수 있다.

우선 연결된 노드의 목록을 구성한다.

* 보다 간결한 비교를 위해 연결된 노드의 목록을 구성하는 데에는 각 단어의 '인덱스 값'을 사용한다.
* 입출력 예시 1번을 예로 들면 다음과 같다.
    * `words`배열: `["hot", "dot", "dog", "lot", "log", "cog"]`
    * words중 `0`번째 단어인 `hot`에서 변환될 수 있는 단어는 `dot`과 `lot`이므로 노드의 목록 배열의 `0`번째 원소는 `[1, 3]`이다.
    * 결과적으로 연결된 노드의 목록 배열은 다음과 같이 구성할 수 있다.
        * `[[ 1, 3 ], [ 0, 2, 3 ], [ 1, 4, 5 ], [ 0, 1, 4 ], [ 2, 3, 5 ], [ 2, 4 ]]`
* 두 단어를 인자로 받은 뒤 변환 조건을 만족하는지 여부를 boolean으로 반환하는 `canConverted` 함수를 별도로 작성해 연결된 노드 목록을 구성한다.

BFS는 `queue`를 이용해 구현한다.

* `queue`의 원소는 다음 단어의 인덱스 값과 현재 `count` 값의 배열 `[i, count]`로 구성한다.
* `queue`에서 꺼낸 현재 단어가 `target`과 같은지 확인한 뒤
    * 같으면 바로 `count`를 반환하고
    * 같지 않으면 다음 연결된 단어를 순회하며 해당 단어의 인덱스 값과 현재 `count`에서 1 증가시킨 값을 `queue`에 집어넣는다.
* 이미 확인한 단어를 재확인하는 일을 막기 위해 `used` 배열을 생성해 사용 여부를 표기한다.
