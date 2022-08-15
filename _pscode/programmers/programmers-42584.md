---
layout  : article
title   : Programmers_42584 주식가격
summary : 
date    : 2021-04-26 15:02:34 +0900
updated : 2021-04-27 00:04:28 +0900
tag     : ps-python
toc     : true
public  : true
parent  : [[/programmers]]
latex   : false
---
* TOC
{:toc}

> 이 글은 프로그래머스의 [42584번](https://programmers.co.kr/learn/courses/30/lessons/42584) 문제를 파이썬(Python)으로 풀이한 것을 모아놓은 글입니다.
>
> 일종의 연습 기록이며 제가 정답을 받은 코드와 참고할만한 다른 코드를 같이 기록합니다. 필요한 경우 코드에 대한 해설을 기록합니다만 코드는 통과했어도 해설은 틀릴 수 있기 때문에 가볍게 참고해주시길 부탁드립니다. 피드백은 편하신 방법으로 자유롭게 주시면 감사하겠습니다.

## 2021.04.26

| 테스트           | 경과 시간      |
| ---------        | -------------- |
| 정확성 테스트 1  | 0.01ms         |
| 정확성 테스트 2  | 0.05ms         |
| 정확성 테스트 3  | 0.56ms         |
| 정확성 테스트 4  | 0.65ms         |
| 정확성 테스트 5  | 0.75ms         |
| 정확성 테스트 6  | 0.03ms         |
| 정확성 테스트 7  | 0.36ms         |
| 정확성 테스트 8  | 0.44ms         |
| 정확성 테스트 9  | 0.03ms         |
| 정확성 테스트 10 | 0.90ms         |
| 효율성 테스트 1  | 64.27ms        |
| 효율성 테스트 2  | 51.90ms        |
| 효율성 테스트 3  | 82.43ms        |
| 효율성 테스트 4  | 58.96ms        |
| 효율성 테스트 5  | 37.47ms        |

| 단계      | 시작 시각 | 끝난 시각 | 걸린 시간 |
| --------- | --------- | --------- | --------- |
| 문제 이해 | 15:02:48  | 15:04:02  |           |
| 풀이 생각 | 15:03:59  | 15:12:36  |           |
| 코딩      | 15:12:39  | 15:22:35  |           |
| 디버깅    | 15:22:37  | 15:31:45  |           |

```python
from collections import deque

def solution(prices):
    prices = deque(prices)
    answer = []
    
    while prices:
        # 가장 앞의 원소를 pop 한다.
        now = prices.popleft()
        # 남아있는(now보다 뒤에 있는) prices의 가격 p와 그 인덱스 i에 대해:
        for i, p in enumerate(prices):
            # 현재 값보다 작은 값 p가 있으면
            # (값이 감소하면)
            if p < now:
                # p의 인덱스 + 1을 answer에 append 한다.
                answer.append(i + 1)
                break
        # 값이 감소하지 않으면
        else:
            # pop하고 남은 prices의 길이를 answer에 append 한다.
            answer.append(len(prices))
    return answer
```

### 아이디어 & 풀이

자료구조 '큐'를 이용하는 문제이다.

가격(`prices`)을 큐로 만들어 관리한다.

* `prices`의 인덱스를 '시점'으로 그 인덱스의 값을 해당 시점에서의 가격으로 보면 된다.
* 앞에서 부터 가격을 `pop` 해서 뒤의 가격과 비교한다.

해당 주식이 떨어지지 않은 시간(`answer`)는 다음과 같이 구성하면 된다.

* 이후에 가격이 감소하는 주식: '가격이 감소한 시점의 인덱스 - 해당 주식의 인덱스'
    * 두 인덱스를 비교할 때 해당 주식은 인덱스 0에서 `pop` 한 상태이기 때문에 인덱스를 -1로 볼 수있다.
    * 그러므로 위의 값은 '가격이 감소한 시점의 인덱스 + 1'과 같다.
* 이후에 가격이 감소하지 않는 주식: '마지막 인덱스 - 해당 주식의 인덱스'로 앞으로 남은 원소의 개수로 볼 수 있다.

### 디버그

* while문 밖에서 `enumerate`를 이용해 `prices`를 선언했더니 while문 안에서 `prices`의 원소가 pop 되어도 각 원소의 인덱스값 변화가 반영되지 않아 `append(i)`에서 처음 선언할 때 지정된 인덱스 값이 들어가 결괏값이 틀리게 나왔었다.
    * while문 안에서 원소가 pop 될 때마다 `enumerate`를 다시 실행하도록 수정했다 .

### 피드백

* `enumerate`로 인덱스를 관리하는 것보다 따로 `count` 변수를 생성해서 사용하는 것(참고 답안 1)이 조금 더 빨랐다.
* 자료량이 많아졌을 때는 스택을 사용하는 것(참고 답안 2)이 가장 효율이 높았다.

    | 테스트           | 내 답안 | 풀이 1  | 풀이 2  |
    | ---------------- | ------- | ------- | ------- |
    | 정확성 테스트 1  | 0.01ms  | 0.01ms  | 0.01ms  |
    | 정확성 테스트 2  | 0.05ms  | 0.04ms  | 0.07ms  |
    | 정확성 테스트 3  | 0.56ms  | 0.49ms  | 0.48ms  |
    | 정확성 테스트 4  | 0.65ms  | 0.52ms  | 0.59ms  |
    | 정확성 테스트 5  | 0.75ms  | 0.70ms  | 0.76ms  |
    | 정확성 테스트 6  | 0.03ms  | 0.02ms  | 0.03ms  |
    | 정확성 테스트 7  | 0.36ms  | 0.28ms  | 0.33ms  |
    | 정확성 테스트 8  | 0.44ms  | 0.35ms  | 0.41ms  |
    | 정확성 테스트 9  | 0.03ms  | 0.03ms  | 0.03ms  |
    | 정확성 테스트 10 | 0.90ms  | 0.65ms  | 0.82ms  |
    | 효율성 테스트 1  | 64.27ms | 57.94ms | 33.84ms |
    | 효율성 테스트 2  | 51.90ms | 47.87ms | 25.02ms |
    | 효율성 테스트 3  | 82.43ms | 72.49ms | 40.21ms |
    | 효율성 테스트 4  | 58.96ms | 51.49ms | 30.86ms |
    | 효율성 테스트 5  | 37.47ms | 34.48ms | 20.81ms |

## 참고 답안 1

```python
from collections import deque

def solution(prices):
    prices = deque(prices)
    answer = []

    while prices:
        now = prices.popleft()
        count = 0
        # prices의 원소에 대해 count를 1씩 증가시키고
        for i in prices:
            # 현재 값보다 큰 값이 나타나면
            if now > i:
                # count에 1을 더한 뒤
                count += 1
                # break 한다.
                break
            count += 1

        answer.append(count)

    return answer
```

### 아이디어 & 풀이

기본적인 과정은 위의 답과 비슷하다.

시점 값을 얻기 위해 `enumerate`로 인덱스를 이용하는 것 대신 `count` 변수를 추가로 정의해 반복할 때마다 더해나갔다.

## 참고 답안 2

```python
# https://tngusmiso.tistory.com/34를 참고했다.
def solution(prices):
    # 가격이 감소할 때까지 걸린 시간을 저장하는 배열이다.
    # 각 인덱스 i에 대해  len(prices)에서 1과 i를 빼준 값으로 초기화한다.
    answer = [len(prices) - 1 - i for i in range(len(prices))]
    
    # 가격이 아직 감소하지 않은 주식의 시점(인덱스)을 담는 스택이다.
    stack = [0]
    
    # prices의 각 인덱스를 순회하면서 (i.e. 시간을 경과시키면서)
    for i in range(1, len(prices)):
        # 스택에 원소가 존재하는 동안
        while stack:
            # 스택의 마지막 원소를 index로 저장한다.
            # (스택 안에서 최대 가격 값을 갖는 주식의 인덱스)
            index = stack[-1]
            
            # 주식 가격이 감소했다면
            if prices[index] > prices[i]:
                # answer를 수정하고
                # 가격이 감소할 때까지 걸리는 시간은 현재 시간(i) - 해당 가격이었던 시간(index)
                answer[index] = i - index
                # stack의 마지막 원소를 제거한다.
                stack.pop()
            
            # 가격이 감소하지 않았다면 다음 인덱스(시간)로 넘어갈 수 있도록 break 한다.
            else:
                break
        
        # 현재 가격의 인덱스(시간)를 스택에 추가한다.
        stack.append(i)
        
    return answer

```

### 아이디어 & 풀이

자료구조 '스택'을 이용했다.

스택은 해당 시점의 값이 아니라 '값이 아직 감소하지 않은 주식'을 모아놓기 위한 용도로 사용됐다.

* 예를 들어 주식(`prices`)값이 `[1, 2, 3, 4, 5, 1]` 라고 했을 때, `2, 3, 4, 5` '각각'에 대해 `1`까지 도달한 시간을 계산하는 것이 아니라
* `2, 3, 4, 5`를 쌓아 나가다 값이 처음으로 줄어드는 `1`인 시점에'만' 그 시점을 '기준'으로 지금까지 각 가격이 유지된 시간을 구하는 것이다.
* 이때, 두 가격이 나타난 '시간'차를 구해야 하기 때문에, 스택에 가격 값이 아닌 그 가격 값이 나타난 시점(인덱스)을 입력한다.
    * 가격은 `prices[인덱스(i.e. 스택의 각 원소)]`로 접근할 수 있다.

우선, 편의를 위해 스택이 각 가격의 인덱스가 아닌 각 가격 값을 담고 있다고 가정하고 설명해보자.

* 스택은 다음과 같이 동작한다.
    * 우선 `prices`의 가장 처음 값을 스택에 넣는다.
    * `prices`의 다음 값으로 이동해서 스택의 '마지막 값'과 비교한다.
        * 현재 값이 크면 현재 값을 스택에 넣고
        * 현재 값이 작으면 스택의 마지막 값(현재 값과 비교한 값)부터 pop 한다.
* 스택은 다음과 같은 성질을 갖는다.
    * 스택의 가격 값은 오름차순으로, 마지막 값이 최댓값이다.
        * 매번 현재 가격과 비교해서 떨어졌을 경우 pop 하기 때문에 가격은 오름차순으로 생성된다.
    * 그러므로 스택의 마지막 값과 비교해서 현재 가격이 감소하지 않았다면 스택의 이전 값에 대해서도 크다는 것을 보장할 수 있다.

스택을 이용하면 문제 해결 로직을 다음과 같이 짤 수 있다.

* 시간(인덱스)을 증가시키면서 현재 가격 값과 스택의 마지막 값을 비교한다.
* 현재 값이 크면 이 값을 스택에 추가한다.
* 현재 값이 작으면 스택의 마지막 값부터 현재 값보다 큰 모든 스택의 값을 순서대로 pop 한다.
    * 스택이기 때문에 그냥 pop 한 뒤 값을 비교하는 것을 반복만 해 줘도 자연스럽게 값이 점차 작아지면서 비교하게 된다.
    * 각 스택의 값을 pop 할 때, 현재 시간(인덱스)과 pop 한 스택 값의 시간(인덱스)의 차이를 `answer`에 저장한다.
    * pop 한 스택 값의 인덱스와 동일한 인덱스에 저장하면 된다.
* 여기까지 완료하면 한 번이라도 가격이 감소하는 모든 주식에 대해서 `answer`의 각 위치에 값이 채워진다.
* 가격이 감소하지 않는 주식은 따로 `answer`의 각 자리에 값을 채워준다.
    * 해당 시점 뒤에 남은 원소의 수 초 만큼 값이 감소하지 않기 때문에 `len(prices)`에서 1과 자신의 인덱스(시간)를 빼준 값으로 채워주면 된다.
    * 애초에 `answer`를 초기화할 때 모든 원소를 이처럼 채우고 중간에 가격이 감소하는 주식만 위의 방법으로 해당 값을 바꿔주면 효율적이다.

위의 예시를 입력했을 때 `[1, 2, 3, 4, 5, 1]` 동작을 큐와 비교해보자.

* 큐의 경우 각 원소의 비교 대상을 정리하면 다음과 같다.

    | 원소 | 비교 대상       | 횟수 |
    | ---  | --------------- | ---- |
    | `1`  | `2, 3, 4, 5, 1` | 5    |
    | `2`  | `3, 4, 5, 1`    | 4    |
    | `3`  | `4, 5, 1`       | 3    |
    | `4`  | `5, 1`          | 2    |
    | `5`  | `1`             | 1    |

* 스택의 경우 각 원소의 비교 대상을 정리하면 다음과 같다.
    * 현재 시간의 원소일 때 스택 마지막 값과 비교하고,
    * 스택 안의 원소일 때 스택 마지막 값으로서 현재 시간의 원소와 비교한다.

    | 원소 | 비교 대상(스택 안) | 비교 대상(스택 밖) | 횟수 |
    | ---  | ------------------ | ------------------ | ---- |
    | `1`  |                    | `1`                | 1    |
    | `2`  | `1`                | `1`                | 2    |
    | `3`  | `2`                | `1`                | 2    |
    | `4`  | `3`                | `1`                | 2    |
    | `5`  | `4`                | `1`                | 2    |
    | `1`  | `5`                |                    | 1    |

* 입력되는 주식 가격에 따라 다르겠지만 연속적으로 증가하는 주식이 많고 주식 가격이 크게 떨어져서 한 번에 많은 스택을 pop 할수록 스택이 훨씬 효율적으로 동작한다는 것을 확인할 수 있다.