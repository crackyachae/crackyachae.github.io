---
layout  : article
title   : Programmers_42587 프린터
summary : 
date    : 2021-04-25 14:10:33 +0900
updated : 2021-04-25 21:25:16 +0900
tag     : ps-python
toc     : true
public  : true
parent  : [[/programmers]]
latex   : false
---
* TOC
{:toc}

> 이 글은 프로그래머스의 [42587번](https://programmers.co.kr/learn/courses/30/lessons/42587) 문제를 파이썬(Python)으로 풀이한 것을 모아놓은 글입니다.
>
> 일종의 연습 기록이며 제가 정답을 받은 코드와 참고할만한 다른 코드를 같이 기록합니다. 필요한 경우 코드에 대한 해설을 기록합니다만 코드는 통과했어도 해설은 틀릴 수 있기 때문에 가볍게 참고해주시길 부탁드립니다. 피드백은 편하신 방법으로 자유롭게 주시면 감사하겠습니다.

## 2021.04.25

| 테스트    | 경과 시간 |
| --------- | --------- |
| 테스트 1  | 0.62ms    |
| 테스트 2  | 0.95ms    |
| 테스트 3  | 0.06ms    |
| 테스트 4  | 0.04ms    |
| 테스트 5  | 0.01ms    |
| 테스트 6  | 0.11ms    |
| 테스트 7  | 0.11ms    |
| 테스트 8  | 0.68ms    |
| 테스트 9  | 0.03ms    |
| 테스트 10 | 0.13ms    |
| 테스트 11 | 0.45ms    |
| 테스트 12 | 0.03ms    |
| 테스트 13 | 0.40ms    |
| 테스트 14 | 0.01ms    |
| 테스트 15 | 0.02ms    |
| 테스트 16 | 0.05ms    |
| 테스트 17 | 0.59ms    |
| 테스트 18 | 0.03ms    |
| 테스트 19 | 0.57ms    |
| 테스트 20 | 0.09ms    |

```python
from collections import deque

def solution(priorities, location):
    # priority와 인덱스를 튜플로 구성한 뒤
    # 이를 원소로 갖는 wait_list를 deque로 생성한다.
    wait_list = deque([(priorities[i], i) for i in range(len(priorities))])
    order = 0

    # priority의 최댓값을 구한 뒤
    max_p = max(wait_list, key = lambda p: p[0])[0]
    while True:
        # wait_list의 첫 번째 원소에 대해서 다음을 반복해 수행한다.
        # priority가 최댓값이고
        if wait_list[0][0] == max_p: 
            # i는 location과 같으면
            if wait_list[0][1] == location :
                # order를 1 증가시키고 반환한다.
                order += 1
                return order
            # i가 location과 같지 않으면
            else:
                # order를 1 증가시키고
                order += 1
                # 첫 번째 원소를 wait_list에서 제거한 뒤
                wait_list.popleft()
                # priority 최댓값을 다시 구한다.
                max_p = max(wait_list, key = lambda p: p[0])[0]
        # priority가 최댓값과 다르면
        else:
            # pop 한 뒤 리스트 가장 뒤에 넣는다.
            wait_list.append(wait_list.popleft())
```

### 아이디어 & 풀이

자료구조 '큐'를 이용하는 문제이다. 프린트 대기 목록을 큐로 만들어 가장 앞의 문서(i.e., 원소)를 pop 하거나 그 문서를 대기 목록 마지막에 추가할 수 있다.

우선 프린트 대기목록은 `(priority, index)`의 튜플로 구성한다.

* 동일한 중요도를 갖는 문서가 존재할 수 있어서 문서 구분을 위해 인덱스값을 함께 저장한다.
* 인덱스값을 사용하는 이유는 `location`이 `priorities`의 인덱스이기 때문이다.

다음으로 대기목록의 가장 앞에 있는 원소가 중요도가 중요도의 최댓값과 같은지 확인한다.

* 조건을 만족하면 해당 문서를 출력하면 된다.
    * 해당 문서를 출력하면 요청한 문서의 출력 순서가 1만큼 뒤로 밀리기 때문에 `order`를 1 증가시킨다.
* 최댓값이 아니면 해당 문서를 대기목록의 끝으로 `append` 한다.

중요도의 최댓값은 `max`를 이용해서 구한다.

* 대기목록의 원소가 튜플이기 때문에 `max` 함수의 비교 기준이 priority가 될 수 있도록 `key`로 `lambda p: p[0]`를 전달한다.
    * [max()](https://docs.python.org/3/library/functions.html?highlight=divmod#max) by Python Documentation
    * [Python_Get first element with maximum value in list of tuples](https://www.geeksforgeeks.org/python-get-first-element-with-maximum-value-in-list-of-tuples/) by GeeksforGeeks

다음으로 출력하는 문서의 번호가 `location`과 같은지 확인한다.

* 출력하려는 문서가 맞으면 그대로 `order`를 반환한다.
* 출력하려는 문서가 아니면 현재 원소를 `pop` 해 대기목록에서 제거한 뒤 중요도의 최댓값을 다시 계산한다.

### 피드백

* 코드 흐름을 더 깔끔하게 다듬을 수 있었다.
    * 조건문에 들어가자마자 `wait_list`에서 `popleft()`을 먼저 시키고 받아온 값을 이용한다.

        ```python
        max_p = max(wait_list, key = lambda p: p[0])[0]
        while True:
            # + pop first
            now = wait_list.popleft()

            # - if wait_list[0][0] == max_p: 
                # - if wait_list[0][1] == location :
            if now[0] == max_p: 
                if now[1] == location :
                    # ...
                else:
                    order += 1
                    # - wait_list.popleft()
                    max_p = max(wait_list, key = lambda p: p[0])[0]
            else:
                # - wait_list.append(wait_list.popleft())
                wait_list.append(now)
        ```

    * `wait_list`의 `max()` 값도 미리 구하지 말고 현재 원소의 priority와 비교할 때 계산하면 while문 안에 한 번만 작성할 수 있다.

        ```python
        # - max_p = max(wait_list, key = lambda p: p[0])[0]
        while True:
            now = wait_list.popleft()

            # - if now[0] == max_p: 
            if wait_list and now[0] == max(wait_list)[0]: 
                if now[1] == location :
                    # ...
                else:
                    order += 1
                    # - max_p = max(wait_list, key = lambda p: p[0])[0]
            else:
                wait_list.append(now)
        ```

        * `max()`를 구할 때 기본적으로 튜플의 첫 번째 원소를 기준으로 삼기 때문에 굳이 `key`를 따로 넣어줄 필요가 없었다.
        * `popleft()`를 먼저 하게 되면 `wait_list`에 원소가 없는 경우가 생길 수 있기 때문에 `max(wait_list)` 이전에 `wait_list`에 원소가 있는지 먼저 확인해주어야 한다.

## 참고 답안

```python
# 풀이 1
from collections import deque
def solution(priorities, location):
    # enumerate를 이용해 (index, priority)를 갖는 wait_list 리스트를 생성한다.
    d = deque([(i, p) for i, p in enumerate(priorities)])
    answer = 0

    while true:
        # d의 첫 번째 원소를 pop 해 cur에 저장한다.
        cur = d.popleft()
        # d 안에 cur보다 priority가 높은 원소가 있으면
        if any(cur[1] < q[1] for q in d):
            # 다시 cur를 d 마지막에 추가한다.
            d.append(cur)
        # d 안에 cur보다 priority가 높은 원소가 없으면
        else:
            # answer(출력순서)를 1 증가시키고
            answer += 1
            # cur의 인덱스가 location과 같으면
            if cur[0] == location:
                # answer를 반환한다.
                return answer
```

### 아이디어 & 풀이

기본적인 과정은 위의 답과 비슷하다.

대기 목록을 만들 때 `enumerate()`를 사용하면 리스트의 원소를 받아 (순서, 원소값)을 원소로 갖는 리스트를 생성할 수 있다.

* [enumerate()](https://docs.python.org/3/library/functions.html#enumerate) by Python Documentation
* [파이썬 파트7. for in 반복문, range, enumerate](https://wayhome25.github.io/python/2017/02/24/py-07-for-loop/) by 초보몽키의 개발블로그!

`max`를 구하지 않고 `any()`를 이용해 대기 목록 안에 현재 문서보다 큰 우선순위를 가진 원소가 있는지 확인할 수 있다.

* [any()](https://docs.python.org/3/library/functions.html#any) by Python Documentation
* [05-5 내장함수](https://wikidocs.net/32#any) by 점프 투 파이썬

이 외에 다른 방식으로 풀이한 것은 [[boj-1966]]{백준 1966번} 문제의 참고 답안을 참고하면 된다.
