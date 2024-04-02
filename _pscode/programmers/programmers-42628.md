---
layout  : article
title   : Programmers_42628 이중우선순위큐
summary : 
date    : 2024-03-27 22:50:29 +0900
updated : 2024-04-02 13:15:41 +0900
tag     : ps-js
toc     : true
public  : true
parent  : [[Programmers-Index]]
latex   : false
---
* TOC
{:toc}

> 이 글은 프로그래머스의 [42628번](https://programmers.co.kr/learn/courses/30/lessons/42628) 문제를 풀이한 것을 모아놓은 글입니다.
>
> 일종의 연습 기록이며 제가 정답을 받은 코드와 참고할만한 다른 코드를 같이 기록합니다. 필요한 경우 코드에 대한 해설을 기록합니다만 코드는 통과했어도 해설은 틀릴 수 있기 때문에 가볍게 참고해주시길 부탁드립니다. 피드백은 편하신 방법으로 자유롭게 주시면 감사하겠습니다.

## 2024.03.27

| 테스트   | 통과 | 시간   | 메모리 |
| -------- | ---- | ------ | ------ |
| 테스트 1 | 통과 | 0.35ms | 33.3MB |
| 테스트 2 | 통과 | 0.42ms | 33.4MB |
| 테스트 3 | 통과 | 0.50ms | 33.3MB |
| 테스트 4 | 통과 | 0.19ms | 33.4MB |
| 테스트 5 | 통과 | 0.35ms | 33.4MB |
| 테스트 6 | 통과 | 0.43ms | 33.4MB |

| 단계              | 시작 시각 | 끝난 시각 | 걸린 시간 |
| ----------------- | --------- | --------- | --------- |
| 문제 이해         | 22:58:46  | 23:01:19  |           |
| 풀이 생각         | 23:52:02  | 00:02:55  |           |
| 코딩 1            | 00:03:13  | 00:16:33  |           |
| 코딩 2            | 22:49:11  | 00:23:03  |           |
| 풀이 확인 후 코딩 | 12:17:25  | 12:51:29  |           |

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
        this.bubbleUp(this.size() - 1);
    }

    pop() {
        if (this.size() === 1) return this.heap.pop();
        if (this.size() === 0) return null;

        const value = this.heap[0];
        this.heap[0] = this.heap.pop();
        this.bubbleDown(0);

        return value;
    }

    remove(num) {
        if (this.size() === 0) return;

        const idx = this.heap.indexOf(num);
        if (idx === this.size() - 1) {
            this.heap.pop();
            return;
        }

        this.heap[idx] = this.heap.pop();
        this.getLeftIdx < this.size()
            ? this.bubbleDown(idx)
            : this.bubbleUp(idx);
    }

    bubbleUp(idx) {
        let currIdx = idx;
        let parentIdx = this.getParentIdx(currIdx);

        while (parentIdx >= 0 && this.heap[currIdx] < this.heap[parentIdx]) {
            this.swap(currIdx, parentIdx);
            currIdx = parentIdx;
            parentIdx = this.getParentIdx(currIdx);
        }
    }

    bubbleDown(idx) {
        let currIdx = idx;
        let leftIdx = this.getLeftIdx(currIdx);
        let rightIdx = this.getRightIdx(currIdx);

        while (
            (leftIdx < this.size() &&
                this.heap[currIdx] > this.heap[leftIdx]) ||
            (rightIdx < this.size() && this.heap[currIdx] > this.heap[rightIdx])
        ) {
            const smallerIdx =
                rightIdx >= this.size() ||
                this.heap[leftIdx] < this.heap[rightIdx]
                    ? leftIdx
                    : rightIdx;

            this.swap(currIdx, smallerIdx);
            currIdx = smallerIdx;
            leftIdx = this.getLeftIdx(currIdx);
            rightIdx = this.getRightIdx(currIdx);
        }
    }
}

function solution(operations) {
    const minQueue = new MinHeap();
    const maxQueue = new MinHeap();

    operations.forEach((operation) => {
        const [op, num] = operation.split(" ");

        if (op === "I") {
            minQueue.push(+num);
            maxQueue.push(-num);
        } else if (operation === "D 1") {
            const max = maxQueue.pop();
            minQueue.remove(-max);
        } else {
            const min = minQueue.pop();
            maxQueue.remove(-min);
        }
    });

    if (minQueue.size() === 0) return [0, 0];

    return [-maxQueue.pop(), minQueue.pop()];
}
```

### 아이디어 & 풀이

최솟값을 pop하는 min heap과 최댓값을 pop하는 max heap을 각각 선언해 관리한다.

* 클래스 자체는 min heap만 구현하되 max heap의 경우 push 혹은 pop 하는 과정에서 값을 반대 부호로 변환해주면 된다.
* Min heap과 max heap 각각에서 값을 pop 할 때 다른 heap에서도 해당 값을 제거해주어야 하므로 `remove` 메소드를 추가로 구현한다.

`remove` 메소드는 다음과 같이 구현할 수 있다.

```js
remove(num) {
    // heap에 원소가 존재하지 않는 경우 return
    if (this.size() === 0) return;

    // 입력 받은 값의 인덱스를 구한다.
    const idx = this.heap.indexOf(num);
    // 해당 원소가 마지막 원소면 해당 원소를 pop 한다.
        // 아래의 로직대로 하면 자기 자신을 대체하는 꼴이 되어
        // 값이 제거되지 않기 때문에 별도로 처리해주어야 한다.
    if (idx === this.size() - 1) {
        this.heap.pop();
        return;
    }

    // 제거할 원소를 현재 heap의 마지막 원소로 대체한다.
    this.heap[idx] = this.heap.pop();
    // 해당 노드의 자식이 있으면 bubble Down을
    // 그렇지 않으면 bubble Up을 해 재정렬한다.
    this.getLeftIdx(idx) < this.size()
        ? this.bubbleDown(idx)
        : this.bubbleUp(idx);
}
```

* 이를 위해 `bubbleUp`과 `bubbleDown`을 중간 지점부터 시작할 수 있도록 시작 인덱스를 입력받을 수 있도록 수정해준다.

### 디버그

* 힙을 하나만 관리하면서 최대, 최솟값을 관리하는 방향으로 풀어보려고 했는데 실패했다.
* `remove` 과정에서 제거할 원소를 현재 heap의 마지막 원소로 대체한 뒤 재정렬하지 않아도 모든 테스트케이스를 통과한다. 이후 최대, 최솟값을 pop하는 과정에서 정렬이 되는 등의 이유로 실제로 문제가 없는 건지 아니면 테스트케이스가 부족해서 그냥 통과가 되는지 잘 모르겠다.

### 피드백

* 해당 문제는 효율성 테스트가 별도로 존재하지 않아 굳이 heap을 사용하지 않고 단순 정렬이나 `Math.min`, `Math.max` 메소드를 사용해도 풀 수 있다.
* [BOJ-7662 이중 우선순위 큐](https://www.acmicpc.net/problem/7662)에서 같은 문제를 더 까다로운 조건으로 풀어볼 수 있다.
