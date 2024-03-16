---
layout  : article
title   : Programmers_42583 다리를 지나는 트럭
summary : 
date    : 2021-04-24 20:50:58 +0900
updated : 2024-03-14 17:27:24 +0900
tag     : ps-python ps-js
toc     : true
public  : true
parent  : [[/programmers]]
latex   : false
---
* TOC
{:toc}

> 이 글은 프로그래머스의 [42583번](https://programmers.co.kr/learn/courses/30/lessons/42583) 문제를 풀이한 것을 모아놓은 글입니다.
>
> 일종의 연습 기록이며 제가 정답을 받은 코드와 참고할만한 다른 코드를 같이 기록합니다. 필요한 경우 코드에 대한 해설을 기록합니다만 코드는 통과했어도 해설은 틀릴 수 있기 때문에 가볍게 참고해주시길 부탁드립니다. 피드백은 편하신 방법으로 자유롭게 주시면 감사하겠습니다.

## 2021.04.24

| 테스트    | `pop` + 인덱스 | `deque`   |
| --------- | -------------- | --------- |
| 테스트 1  | 13.04ms        | 13.41ms   |
| 테스트 2  | 1495.39ms      | 1526.48ms |
| 테스트 3  | 0.02ms         | 0.02ms    |
| 테스트 4  | 308.91ms       | 370.22ms  |
| 테스트 5  | 9633.70ms      | 9818.12ms |
| 테스트 6  | 1658.53ms      | 1836.67ms |
| 테스트 7  | 7.41ms         | 7.30ms    |
| 테스트 8  | 0.36ms         | 0.40ms    |
| 테스트 9  | 6.37ms         | 6.04ms    |
| 테스트 10 | 0.43ms         | 0.43ms    |
| 테스트 11 | 0.01ms         | 0.01ms    |
| 테스트 12 | 0.40ms         | 0.37ms    |
| 테스트 13 | 2.24ms         | 2.43ms    |
| 테스트 14 | 0.01ms         | 0.01ms    |

| 단계      | 시작 시각 | 끝난 시각 | 걸린 시간 |
| --------- | --------- | --------- | --------- |
| 문제 이해 | 20:51:16  | 20:53:11  |           |
| 풀이 생각 | 20:53:15  | 21:15:30  |           |
| 코딩      | 21:15:31  | 21:36:42  |           |

```python
# pop + 인덱스 사용
def solution(bridge_length, weight, truck_weights):
    counter = 0
    # 다리 위의 트럭을 나타낼 `bridge` 리스트를 만든다.
    bridge = [0 for i in range(bridge_length)]
    
    # 대기하는 트럭이 존재 하는동안
    while truck_weights:
        # 우선 다리 가장 앞의 원소를 빼낸다.
        bridge.pop(0)
        # 남은 다리 위 트럭의 무게의 합과,
        # 대기중인 첫번째 트럭의 무게의 합이 제한을 넘지 않으면
        if sum(bridge) + truck_weights[0] <= weight:
            # 대기중인 첫 번째 트럭을 pop해서 bridge에 넣는다.
            bridge.append(truck_weights.pop(0))
        # 그렇지 않으면
        else:
            # bridge에 0을 넣는다.
            bridge.append(0)
        # 시간을 증가시킨다.
        counter += 1
    
    answer = counter + bridge_length
    return answer
    
# deque 사용
from collections import deque

def solution(bridge_length, weight, truck_weights):
    counter = 0
    bridge = deque([0 for i in range(bridge_length)])
    trucks = deque(truck_weights)
    
    while trucks:
        bridge.popleft()
        if sum(bridge) + trucks[0] <= weight:
            bridge.append(trucks.popleft())
        else:
            bridge.append(0)
        counter += 1
    
    answer = counter + bridge_length
    return answer
```

### 피드백

* 몇몇 케이스가 실행이 오래 걸려서 `deque`를 사용해서 구현한 것과 그렇지 않은 것을 비교해봤는데 큰 차이가 없을 뿐더러 `deque`를 사용한 것이 더 느렸다.
* `truck` weight을 `sum()`을 이용해 매번 구하지 않고 따로 `bridge`의 `current_weight` 변수를 생성해서 관리하는게 속도에 영향을 많이 미치는 것 같다.

| 테스트    | `deque`   | 참고 답안 |
| --------- | --------- | --------- |
| 테스트 1  | 13.41ms   | 0.49ms    |
| 테스트 2  | 1526.48ms | 6.85ms    |
| 테스트 3  | 0.02ms    | 0.01ms    |
| 테스트 4  | 370.22ms  | 5.36ms    |
| 테스트 5  | 9818.12ms | 47.41ms   |
| 테스트 6  | 1836.67ms | 15.72ms   |
| 테스트 7  | 7.30ms    | 0.53ms    |
| 테스트 8  | 0.40ms    | 0.10ms    |
| 테스트 9  | 6.04ms    | 2.42ms    |
| 테스트 10 | 0.43ms    | 0.12ms    |
| 테스트 11 | 0.01ms    | 0.01ms    |
| 테스트 12 | 0.37ms    | 0.22ms    |
| 테스트 13 | 2.43ms    | 0.93ms    |
| 테스트 14 | 0.01ms    | 0.01ms    |

## 참고 답안

```python
from collections import deque

def solution(bridge_length, weight, truck_weights):
    counter = 0
    bridge = deque([0 for i in range(bridge_length)])
    trucks = deque(truck_weights)
    bridge_weight = 0
    
    while trucks:
        current_weight -= bridge.popleft()
        next_weight = current_weight + trucks[0]
        if next_weight <= weight:
            bridge.append(trucks.popleft())
            current_weight = next_weight
        else:
            bridge.append(0)
        counter += 1
    
    answer = counter + bridge_length
    return answer
```

## 2024.03.11

| 테스트    | 통과 | 시간    | 메모리 |
| --------- | ---- | ------  | ------ |
| 테스트 1  | 통과 | 1.20ms  | 33.6MB |
| 테스트 2  | 통과 | 13.30ms | 36.4MB |
| 테스트 3  | 통과 | 0.35ms  | 33.4MB |
| 테스트 4  | 통과 | 9.97ms  | 36.1MB |
| 테스트 5  | 통과 | 18.26ms | 36.5MB |
| 테스트 6  | 통과 | 21.71ms | 36.2MB |
| 테스트 7  | 통과 | 0.53ms  | 33.7MB |
| 테스트 8  | 통과 | 0.25ms  | 33.5MB |
| 테스트 9  | 통과 | 7.01ms  | 36.1MB |
| 테스트 10 | 통과 | 0.45ms  | 33.5MB |
| 테스트 11 | 통과 | 0.08ms  | 33.6MB |
| 테스트 12 | 통과 | 0.55ms  | 33.5MB |
| 테스트 13 | 통과 | 0.71ms  | 33.6MB |
| 테스트 14 | 통과 | 0.19ms  | 33.4MB |

| 단계      | 시작 시각 | 끝난 시각 | 걸린 시간 |
| --------- | --------- | --------- | --------- |
| 문제 이해 | 15:20:34  | 15:24:13  |           |
| 풀이 생각 | 15:24:16  | 15:26:31  |           |
| 코딩      | 15:26:33  | 15:43:36  |           |

```js
function solution(bridge_length, weight, truck_weights) {
    let sec = 1;
    let now_weight = truck_weights[0];
    const queue = [];
    queue.push([truck_weights.shift(), 1]);

    while (queue.length) {
        if (queue[0][1] === bridge_length) now_weight -= queue.shift()[0];
        sec++;
        queue.forEach((truck) => truck[1]++);

        if (!truck_weights.length) continue;
        if (now_weight + truck_weights[0] <= weight) {
            now_weight += truck_weights[0];
            queue.push([truck_weights.shift(), 1]);
        }
    }

    return sec;
}
```

### 아이디어 & 풀이

다리의 상황을 나타내는 `queue`를 만들어 `queue`상에 트럭이 존재하는 동안 시간 `sec`를 증가시키면서 다음의 과정을 반복한다. `queue`의 원소는 다리위에 있는 트럭을 의미하며 `[트럭의 무게, 진행한 거리]`로 구성한다.

* 첫 트럭이 다리의 마지막에 도달하면, 즉 이동한 거리가 `bridge_length`와 같으면 해당 트럭은 `queue`에서 shift 한다.
    * 해당 트럭의 무게를 `now_weight`에서 빼주어야 한다.
* 모든 트럭을 1씩 움직이고 시간을 1 증가시킨다.
* 현재 다리 위의 무게의 합(`now_weight`)에 다음 대기 차량의 무게를 더했을 때 제한보다 적으면 대기 차량을 queue에 추가한다.

모든 과정이 끝나면 경과한 시간 `sec`를 반환한다.

## 참고 답안

| 테스트    | 통과 | 시간   | 메모리 |
| --------- | ---- | ------ | ------ |
| 테스트 1  | 통과 | 0.06ms | 33.5MB |
| 테스트 2  | 통과 | 0.07ms | 33.5MB |
| 테스트 3  | 통과 | 0.10ms | 33.4MB |
| 테스트 4  | 통과 | 0.41ms | 33.5MB |
| 테스트 5  | 통과 | 0.41ms | 33.7MB |
| 테스트 6  | 통과 | 0.33ms | 33.6MB |
| 테스트 7  | 통과 | 0.06ms | 33.5MB |
| 테스트 8  | 통과 | 0.21ms | 33.5MB |
| 테스트 9  | 통과 | 0.59ms | 33.5MB |
| 테스트 10 | 통과 | 0.16ms | 33.5MB |
| 테스트 11 | 통과 | 0.10ms | 33.4MB |
| 테스트 12 | 통과 | 0.26ms | 33.5MB |
| 테스트 13 | 통과 | 0.18ms | 33.4MB |
| 테스트 14 | 통과 | 0.06ms | 33.3MB |

```js
function solution(bridge_length, weight, truck_weights) {
    let sec = 1;
    let now_weight = truck_weights[0];
    const queue = [];
    queue.push([truck_weights.shift(), bridge_length + 1]);

    while (queue.length) {
        if (queue[0][1] === sec) now_weight -= queue.shift()[0];

        if (now_weight + truck_weights[0] <= weight) {
            now_weight += truck_weights[0];
            queue.push([truck_weights.shift(), sec + bridge_length]);
        } else {
            if (queue[0]) sec = queue[0][1] - 1;
        }
        sec++;
    }
    return sec;
}
```

### 아이디어 & 풀이

진행 순서는 위의 풀이와 동일하지만 이동한 거리 대신 해당 트럭이 다리를 벗어나는 시간을 이용한다.

* `queue`의 원소, 즉 트럭의 구성을 `[트럭의 무게, 해당 트럭이 다리를 벗어나는 시간]`으로 구성한다.
* 해당 트럭이 다리를 벗어나는 시간은 현재 시간에 다리의 길이를 더한 값이다. 해당 트럭을 `queue`에 push 할 때 현재 `sec`에 `bridge_length`를 더한 값으로 값을 추가한다.

시간을 사용하면 이전 풀이와 비교했을 때 다음의 이유로 더 빠르게 실행할 수 있다.

* `queue` 상의 모든 트럭을 순회하면서 길이를 증가시키는 과정을 생략할 수 있다.
* 또한 다리의 무게제한 떄문에 첫 트럭이 빠질 때까지 새로운 트럭이 추가되지 못할 경우, 트럭을 한 칸씩 진행시키는 대신 시간을 첫 트럭이 빠져나갈 시점으로 한 번에 이동해 무의미한 반복을 줄일 수 있다.
