---
layout  : article
title   : Programmers_42626 더 맵게
summary : 
date    : 2024-03-21 18:44:31 +0900
updated : 2024-03-22 00:41:11 +0900
tag     : ps-js
toc     : true
public  : true
parent  : [[Programmers-currIdx]]
latex   : false
---
* TOC
{:toc}

> 이 글은 프로그래머스의 [42626번](https://programmers.co.kr/learn/courses/30/lessons/42626) 문제를 풀이한 것을 모아놓은 글입니다.
>
> 일종의 연습 기록이며 제가 정답을 받은 코드와 참고할만한 다른 코드를 같이 기록합니다. 필요한 경우 코드에 대한 해설을 기록합니다만 코드는 통과했어도 해설은 틀릴 수 있기 때문에 가볍게 참고해주시길 부탁드립니다. 피드백은 편하신 방법으로 자유롭게 주시면 감사하겠습니다.

## 2024.03.21

정확성  테스트

| 테스트    | 통과 | 시간   | 메모리 |
| --------  | ---- | ------ | ------ |
| 테스트 1  | 통과 | 0.37ms | 33.4MB |
| 테스트 2  | 통과 | 0.40ms | 33.2MB |
| 테스트 3  | 통과 | 0.66ms | 33.5MB |
| 테스트 4  | 통과 | 0.51ms | 33.6MB |
| 테스트 5  | 통과 | 0.25ms | 33.5MB |
| 테스트 6  | 통과 | 9.64ms | 36.7MB |
| 테스트 7  | 통과 | 4.99ms | 36.7MB |
| 테스트 8  | 통과 | 0.98ms | 33.6MB |
| 테스트 9  | 통과 | 0.79ms | 33.6MB |
| 테스트 10 | 통과 | 6.71ms | 36.6MB |
| 테스트 11 | 통과 | 5.03ms | 36.8MB |
| 테스트 12 | 통과 | 9.76ms | 36.8MB |
| 테스트 13 | 통과 | 5.84ms | 36.7MB |
| 테스트 14 | 통과 | 0.78ms | 33.5MB |
| 테스트 15 | 통과 | 9.34ms | 36.7MB |
| 테스트 16 | 통과 | 0.33ms | 33.4MB |
| 테스트 17 | 통과 | 0.33ms | 33.4MB |
| 테스트 18 | 통과 | 0.28ms | 33.4MB |
| 테스트 19 | 통과 | 0.29ms | 33.4MB |
| 테스트 20 | 통과 | 0.49ms | 33.4MB |
| 테스트 21 | 통과 | 0.38ms | 33.4MB |
| 테스트 22 | 통과 | 0.20ms | 33.4MB |
| 테스트 23 | 통과 | 0.43ms | 33.4MB |
| 테스트 24 | 통과 | 0.40ms | 33.4MB |
| 테스트 25 | 통과 | 0.54ms | 33.2MB |
| 테스트 26 | 통과 | 0.69ms | 33.4MB |

효율성  테스트

| 테스트   | 통과 | 시간     | 메모리 |
| -------- | ---- | ------   | ------ |
| 테스트 1 | 통과 | 82.92ms  | 47.6MB |
| 테스트 2 | 통과 | 146.11ms | 61.1MB |
| 테스트 3 | 통과 | 505.14ms | 101MB  |
| 테스트 4 | 통과 | 74.29ms  | 46MB   |
| 테스트 5 | 통과 | 530.53ms | 102MB  |

| 단계      | 시작 시각 | 끝난 시각 | 걸린 시간 |
| --------- | --------- | --------- | --------- |
| 문제 이해 | 18:44:54  | 18:45:51  |           |
| 풀이 생각 | 18:45:52  | 18:46:55  |           |
| 코딩      | 22:58:06  | 00:25:36  |           |

```js
class MinHeap {
    constructor() {
        this.heap = [];
    }

    size() {
        return this.heap.length;
    }

    swap(idx1, idx2) {
        [this.heap[idx1], this.heap[idx2]] = [this.heap[idx2], this.heap[idx1]];
    }

    getParentIdx(idx) {
        return Math.floor((idx - 1) / 2);
    }
    getLeftIdx(idx) {
        return idx * 2 + 1;
    }
    getRightIdx(idx) {
        return idx * 2 + 2;
    }

    push(value) {
        this.heap.push(value);
        this.bubbleUp();
    }

    pop() {
        if (this.heap.length === 1) return this.heap.pop();
        if (this.heap.length === 0) return null;

        const min = this.heap[0];
        this.heap[0] = this.heap.pop();
        this.bubbleDown();

        return min;
    }

    bubbleUp() {
        let currIdx = this.size() - 1;
        let parentIdx = this.getParentIdx(currIdx);

        while (currIdx > 0 && this.heap[currIdx] < this.heap[parentIdx]) {
            this.swap(currIdx, parentIdx);
            currIdx = parentIdx;
            parentIdx = this.getParentIdx(currIdx);
        }
    }

    bubbleDown() {
        let currIdx = 0;
        let leftIdx = this.getLeftIdx(currIdx);
        let rightIdx = this.getRightIdx(currIdx);

        while (
            (leftIdx < this.size() &&
                this.heap[leftIdx] < this.heap[currIdx]) ||
            (rightIdx < this.size() && this.heap[rightIdx] < this.heap[currIdx])
        ) {
            const smallerIdx =
                this.heap[rightIdx] < this.heap[leftIdx] ? rightIdx : leftIdx;

            this.swap(currIdx, smallerIdx);
            currIdx = smallerIdx;
            leftIdx = this.getLeftIdx(currIdx);
            rightIdx = this.getRightIdx(currIdx);
        }
    }
}

function solution(scoville, K) {
    let count = 0;

    const scovilleHeap = new MinHeap();
    scoville.forEach((score) => {
        scovilleHeap.push(score);
    });

    while (scovilleHeap.size()) {
        const min = scovilleHeap.pop();
        if (min >= K) return count;

        const nextMin = scovilleHeap.pop();
        if (!nextMin) return -1;

        count++;
        scovilleHeap.push(min + nextMin * 2);
    }

    return -1;
}
```

### 아이디어 & 풀이

Heap을 이용한 문제이다. JavaScript의 경우 파이썬과 다르게 내부 라이브러리에 heap 모듈이 존재하지 않으므로 직접 구현해주어야 한다. 다음의 코드를 조합해 Heap을 구현했다.

* [[자료구조] JS로 구현하는 HEAP](https://velog.io/@longroadhome/자료구조-JS로-구현하는-HEAP)
* [[자료구조] JavaScript로 힙(Heap) 구현하기](https://chamdom.blog/heap-using-js/) by chamdom blog
* [Js 정답지입니다](https://school.programmers.co.kr/questions/53892)
    * Heap 구현을 제외한 부분까지 작성되어있으므로 주의하자

Heap을 이용해 다음과 같이 결과를 구할 수 있다.

* 최솟값을 pop 한다. 해당 값이 `K` 이상이면 조건을 만족하므로 `count`를 반환한다.
* `K`보다 작으면 스코빌지수를 섞는 연산을 진행해야 한다.
    * 그 다음으로 작은 최솟값을 pop해
    * `count`를 1 증가시키고 연산한 값을 heap에 push 한다.
* 다만 반복을 heap 내에 원소가 존재하지 않을 때까지 반복하므로 최솟값을 pop 했을 때 이미 남아있는 원소가 없을 수 있다. 이 경우 더이상 조건을 만족할 스코빌 연산 결과가 남아있지 않다는 것을 의미하므로 -1을 반환해주어야 한다.
    * Heap 구현 시 `null`을 반환하도록 했으므로 두 번째로 pop 한 결과가 `null`이면 -1을 반환한다.
