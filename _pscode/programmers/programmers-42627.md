---
layout  : article
title   : Programmers_42627 디스크 컨트롤러
summary : 
date    : 2024-03-22 21:48:48 +0900
updated : 2024-03-27 22:49:17 +0900
tag     : ps-js
toc     : true
public  : true
parent  : [[Programmers-Index]]
latex   : false
---
* TOC
{:toc}

> 이 글은 프로그래머스의 [42627번](https://programmers.co.kr/learn/courses/30/lessons/42627) 문제를 풀이한 것을 모아놓은 글입니다.
>
> 일종의 연습 기록이며 제가 정답을 받은 코드와 참고할만한 다른 코드를 같이 기록합니다. 필요한 경우 코드에 대한 해설을 기록합니다만 코드는 통과했어도 해설은 틀릴 수 있기 때문에 가볍게 참고해주시길 부탁드립니다. 피드백은 편하신 방법으로 자유롭게 주시면 감사하겠습니다.

## 테스트 케이스

| 인풋                                   | 아웃풋 |
| -------------------------------------  | ------ |
| [[0, 3], [1, 9], [2, 6], [30, 3]]      | 7      |
| [[0, 10], [2, 10], [9, 10], [15, 2]]   | 14     |
| [[0, 10], [4, 10], [5, 11], [15, 2]]   | 15     |
| [[0, 10], [2, 12], [9, 19], [15, 17]]  | 25     |
| [[10, 10], [30, 10], [50, 2], [51, 2]] | 6      |
| [[0, 1]]                               | 1      |
| [[0, 1], [0, 1], [0, 1]]               | 2      |
| [[0, 1], [0, 1], [0, 1], [0, 1]]       | 2      |
| [[1000, 1000]]                         | 1000   |
| [[0, 1], [1000, 1000]]                 | 500    |
| [[100, 100], [1000, 1000]]             | 550    |

## 2024.03.22

| 테스트    | 통과 | 시간   | 메모리 |
| --------  | ---- | ------ | ------ |
| 테스트 1  | 통과 | 4.28ms | 36.7MB |
| 테스트 2  | 통과 | 3.04ms | 36.3MB |
| 테스트 3  | 통과 | 3.03ms | 36.1MB |
| 테스트 4  | 통과 | 2.43ms | 34MB   |
| 테스트 5  | 통과 | 3.99ms | 36.4MB |
| 테스트 6  | 통과 | 0.55ms | 33.4MB |
| 테스트 7  | 통과 | 3.82ms | 34MB   |
| 테스트 8  | 통과 | 1.95ms | 33.8MB |
| 테스트 9  | 통과 | 1.49ms | 33.9MB |
| 테스트 10 | 통과 | 4.75ms | 36.7MB |
| 테스트 11 | 통과 | 0.57ms | 33.5MB |
| 테스트 12 | 통과 | 0.45ms | 33.6MB |
| 테스트 13 | 통과 | 0.44ms | 33.4MB |
| 테스트 14 | 통과 | 0.37ms | 33.5MB |
| 테스트 15 | 통과 | 0.37ms | 33.5MB |
| 테스트 16 | 통과 | 0.25ms | 33.4MB |
| 테스트 17 | 통과 | 0.20ms | 33.5MB |
| 테스트 18 | 통과 | 0.25ms | 33.5MB |
| 테스트 19 | 통과 | 0.24ms | 33.5MB |
| 테스트 20 | 통과 | 0.16ms | 33.5MB |

| 단계              | 시작 시각 | 끝난 시각 | 걸린 시간 |
| ----------------- | --------- | --------- | --------- |
| 문제 이해         | 21:49:23  | 21:51:31  |           |
| 풀이 생각         | 21:51:33  | 21:53:34  |           |
| 코딩              | 21:53:36  | 22:18:31  |           |
| 풀이 생각         | 12:37:55  | 13:13:25  |           |
| 코딩              | 21:26:54  | 22:06:30  |           |
| 풀이 확인 후 코딩 | 22:58:03  | 23:33:29  |           |
| 디버그            | 10:45:02  | 11:15:53  |           |

```js
// 최소 힙 구현 
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
        if (this.heap.length === 0) return [null, null];

        const min = this.heap[0];
        this.heap[0] = this.heap.pop();
        this.bubbleDown();

        return min;
    }

    bubbleUp() {
        let currIdx = this.size() - 1;
        let parentIdx = this.getParentIdx(currIdx);

        // 노드의 구성이 [요청 시간, 실행 시간]이므로 1번 인덱스인 실행 시간을 비교
        while (currIdx > 0 && this.heap[currIdx][1] < this.heap[parentIdx][1]) {
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
                this.heap[leftIdx][1] < this.heap[currIdx][1]) ||
            (rightIdx < this.size() &&
                this.heap[rightIdx][1] < this.heap[currIdx][1])
        ) {
            const smallerIdx =
                rightIdx >= this.size() ||
                this.heap[leftIdx][1] < this.heap[rightIdx][1]
                    ? leftIdx
                    : rightIdx;

            this.swap(currIdx, smallerIdx);
            currIdx = smallerIdx;
            leftIdx = this.getLeftIdx(currIdx);
            rightIdx = this.getRightIdx(currIdx);
        }
    }
}

function solution(jobs) {
    const jobsHeap = new MinHeap();
    let timeLapsed = 0; // 현재 시간
    let timeSum = 0; // 누적 요청 후 종료까지 걸린 시간 
    let jobIdx = 0; // jobs 순회용 인덱스

    // 현재 시간 이전에 요청된 프로세스만 힙에 push하도록 요청시간을 기준으로 오름차순 정렬 
    jobs.sort((a, b) => a[0] - b[0]);
    while (jobIdx < jobs.length || jobsHeap.size()) {
        // 현재 시간 이전에 요청된 프로세스를 힙에 posh
        while (jobIdx < jobs.length && jobs[jobIdx][0] <= timeLapsed) {
            jobsHeap.push(jobs[jobIdx]);
            jobIdx++;
        }

        // 수행 시간이 최소인 프로세스를 pop
        const [startTime, processTime] = jobsHeap.pop();
        // 프로세스가 pop된 경우
        if (processTime) {
            // 누적 시간과 현재 시간을 업데이트 
            timeSum += timeLapsed - startTime + processTime;
            timeLapsed += processTime;
        // 수행할 프로세스가 없는 경우
        } else {
            // 현재 시간을 증가
            timeLapsed++;
        }
    }

    // 누적 시간을 프로세스 수로 나누어 평균 시간을 반환
    return Math.floor(timeSum / jobs.length);
}
```

### 아이디어 & 풀이

프로세스가 진행될 수록 현재 실행하는 프로세스의 실행 시간만큼 이미 요청된 프로세스의 대기시간이 길어진다. 그러므로 프로세스가 요청된 뒤 종료되기까지 걸리는 시간을 최소화 하기 위해서는 현재 상태에서 가장 빠르게 끝낼 수 있는, 즉 실행 시간이 가장 작은 프로세스부터 실행한다.

실행 시간이 최소인 프로세스를 가져오기 위해 힙 자료구조를 사용한다. 일반적인 `MinHeap`과 동일하게 구현하되 넣고 꺼내는 값이 `[요청시간, 실행 시간]`형태의 배열이므로 값을 push 하거나 pop 하고 재정렬할 때 이를 고려할 수 있도록 코드를 수정해주어야 한다.

* pop 할 때 `this.heap()`에 원소가 존재하지 않는 경우 값을 동일한 형태로 반환할 수 있도록 반환값을 `[null, null]`로 수정한다.
* 최소값의 기준값은 프로세스의 실행 시간 이므로 값을 재정렬할 때 비교하는 값은 `this.heap[idx][1]`이다.
* 위 경우 인덱스가 범위 밖으로 벗어나 `this.heap[idx]`가 존재하지 않으면 `[1]`에 접근할 때 런타임 에러가 발생하므로 값을 비교할 때 인덱스가 범위 밖으로 벗어나지 않는지 확인해주어야 한다.
    * `bubbleUp` 과정에서 현재 노드와 부모 노드의 값을 배교할 때는 현재 노드의 인덱스가 0보다 큰지 확인하고 있다.
    * `bubbleDown` 과정에서는 왼쪽 자식 노드와 오른쪽 자식 노드를 비교하게 되는데 조건에서 왼쪽 자식 노드 '혹은' 오른쪽 자식 노드의 인덱스가 범위 안에 있는지 확인하고 있어 경우에 따라 오른쪽 자식 노드가 존재하지 않으면 `rightIdx`는 인덱스 범위 밖으로 벗어날 수 있다. 이를 방지하기 위해 `rightIdx`가 인덱스 범위 밖인 경우에도 `leftIdx` 값을 선택하도록 조건을 추가해주어야 한다.

이미 요청된 프로세스만 수행할 수 있으므로 요청 시간이 현재 시간보다 작은 값들만 힙에 push 해야 한다.

* `timeLapsed`라는 변수를 만들어 현재 시간을 관리한다.
* 주어진 프로세스 `jobs`를 요청 시간에 대해 오름차순으로 정리한 뒤 이를 순회하면서 요청 시간이 경과시간 `TimeLapsed` 이하이면 힙에 push한다.

그리고 힙에서 프로세스를 꺼내, 요청 후 종료 시간을 계산해 `timeSum`에 추가하고 프로세스가 진행된 시간만큼 `timeLapsed`의 값을 증가시킨다.

* 요청 후 종료 시간은 프로세스가 수행되기까지 걸린 시간 (현재 시간 `timeLapsed`에서 프로세스가 요청된 시간 `startTime`을 뺀 값)에 프로세스의 수행시간 `processTime`을 더한 값이다.
* 만약 요청된 프로세스를 다 수행해 힙에 남은 프로세스가 없는 경우, 즉 반환 값이 `null`로 구성되어 있는 경우 이후의 프로세스를 요청받기 위해 `timeLapsed`를 증가시킨다.

위의 과정을 모든 프로세스를 다 수행할 때까지 반복한다.

* 힙에 남아있는 원소가 없더라도 아직 요청되지 않은 프로세스가 있을 수 있으므로 모든 `jobs`를 다 순회해야 한다는 조건도 포함해야 한다.

### 디버그

* `this.heap[idx][1]` 에 접근하는 과정에서 `this.heap[idx]`가 존재하지 않아 `undefined`가 반환되면서 런타임 에러가 발생했다.
* 마지막 원소가 왼쪽 자식 노드라 오른쪽 자식 노드가 존재하지 않는 상황에서, `bubbleDown`시 자식 노드중 더 작은 값을 알기 위해 왼쪽 자식 노드와 오른쪽 자식 노드를 비교할 때 위의 오류가 발생하게 되었다. 이 과정에서 오른쪽 노드가 존재하는지 확인하는 조건을 추가해 해결했다.

### 피드백

* 현재 시간에서 요청이 들어오지 않은 프로세스는 수행할 수 없으므로 다음 프로세스를 고르는 선택지에서 제외해야 하는데 문제를 잘못 이해해서 이를 고려하느라 계속 잘못된 로직을 구성하고 있었다.
