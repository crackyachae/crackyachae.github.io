---
layout  : article
title   : Programmers_12977 소수 만들기
summary : 
date    : 2021-04-23 23:08:28 +0900
updated : 2021-04-23 23:31:58 +0900
tag     : ps-python
toc     : true
public  : true
parent  : [[Programmers-Index]]
latex   : false
---
* TOC
{:toc}

>이 글은 프로그래머스의 [12977번](https://programmers.co.kr/learn/courses/30/lessons/12977) 문제를 파이썬(Python)으로 풀이한 것을 모아놓은 글입니다.
>
> 일종의 연습 기록이며 제가 정답을 받은 코드와 참고할만한 다른 코드를 같이 기록합니다. 필요한 경우 코드에 대한 해설을 기록합니다만 코드는 통과했어도 해설은 틀릴 수 있기 때문에 가볍게 참고해주시길 부탁드립니다. 피드백은 편하신 방법으로 자유롭게 주시면 감사하겠습니다.

## 2021.04.23

```python
from itertools import combinations

def is_prime(num):
    if num == 1:
        return 1
    
    r = int(num ** 0.5)
    for i in range (2, r + 1):
        if num % i == 0:
            return 0
    return 1
    
def solution(nums):
    combs = list(combinations(nums, 3))
    count = [is_prime(sum(comb)) for comb in combs]
    answer = sum(count)

    return answer
```

### 풀이 과정

* 소수이면 1, 아니면 0을 반환하는 `is_prime` 함수를 작성한다.
* `combinations`로 입력받은 리스트에서 세 개의 수를 조합한 결과를 받은 뒤
* 각 조합의 원소 합을 `is_prime`의 인자로 넘겨 반환 값으로 `count` 리스트를 구성한다.
    * `count` 리스트는 소수 여부에 따라 `0`과 `1`로 이루어져 있기 때문에 원소를 모두 더하면 원소 합이 소수인 조합의 개수를 구할 수 있다.

### 피드백

* `combinations`는 어차피 iterator를 반환하기 때문에 굳이 `list`로 만들지 않아도 `for ... in`에 사용 가능한 것 같다.
* 세 줄로 작성한 `def solution`을 한 줄로 작성할 수도 있다.
    * 가독성 때문에 적당히 끊고는 싶은데 어느 정도가 적당한지를 잘 모르겠다.

## 참고 답안

```python
# 풀이 1
from itertools import combinations

def prime_number(x):
    answer = 0
    for i in range(1, int(x ** 0.5) + 1):
        if x % i == 0:
            answer += 1
    return 1 if answer == 1 else 0


def solution(nums):
    return sum([prime_number(sum(c)) for c in combinations(nums, 3)])
```
