---
layout  : article
title   : Programmers_42583 다리를 지나는 트럭
summary : 
date    : 2021-04-24 20:50:58 +0900
updated : 2021-04-25 14:10:12 +0900
tag     : ps-python
toc     : true
public  : true
parent  : [[Programmers-Index]]
latex   : false
---
* TOC
{:toc}

> 이 글은 프로그래머스의 [42583번](https://programmers.co.kr/learn/courses/30/lessons/42583) 문제를 파이썬(Python)으로 풀이한 것을 모아놓은 글입니다.
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
