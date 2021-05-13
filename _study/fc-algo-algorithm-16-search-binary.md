---
layout  : article
title   : "Chapter 16. 탐색 알고리즘: 이진 탐색(Binary Search)"
summary : 
date    : 2021-05-05 12:17:13 +0900
updated : 2021-05-05 14:44:27 +0900
tag     : 
toc     : true
public  : true
parent  : 
latex   : true
---
* TOC
{:toc}

> 이 글은 패스트 캠퍼스 [기술면접 완전 정복 올인원 패키지 Online](https://fastcampus.co.kr/dev_online_algo) 'Chapter 12. 배열(Array)'의 강의내용을 정리하기 위해 강의 자료를 기반으로 작성한 글입니다.
>
> 강의 노트는 강의 구매자에게만 제공되는 자료이긴 하지만 잔재미 코딩의 [11. 탐색 알고리즘2: 이진 탐색 (Binary Search)](https://www.fun-coding.org/Chapter16-binarysearch.html)에서 동일한 자료를 제공하고 있기 때문에 해당 자료를 기반으로 정리한 글을 작성해서 올립니다. 혹시 문제가 되는 경우 바로 내릴 예정이니 알려주시면 감사하겠습니다.
>
> 내용을 이해하기 위한 개인적인 설명이나 해석이 있을 수 있기 때문에 되도록 원문을 참고해주시길 바랍니다.
> 잘못된 부분이 있다면 댓글이나 그 외 편하신 방법으로 알려주시면 감사하겠습니다.

## 1. 이진 탐색 (Binary Search) 이란?

* 탐색할 자료를 둘로 나누어 해당 데이터가 있을 만한 곳을 탐색하는 방법

다음 문제를 먼저 생각해보자

![sort example](/post-img/fc-algo-algorithm-16-search-binary/1_binarysearch.png)

* 정렬이 되어있다는 것이 중요하다.
* 중간을 확인했을 때 60이 들어 있다면 그 보다 오른쪽의 병을 확인한다.
* 오른쪽의 병 중 중간을 확인했을 때 75가 들어있다면 그 보다 왼쪽의 병을 확인한다.
* 이런 식으로 중간을 조사해가면서 원하는 수에 근접해가는 방식이다.

### 이진 탐색의 이해 (순차 탐색과 비교하며 이해하기)

![binary vs linear search](/post-img/fc-algo-algorithm-16-search-binary/2_binary-and-linear-search-animations.gif)

[저작자] by penjee.com [이미지 출처](https://blog.penjee.com/binary-vs-linear-search-animated-gifs/)

* 이진 탐색이 순차 탐색보다 훨씬 더 빠르다.

## 2. 분할 정복 알고리즘과 이진 탐색

* 분할 정복 알고리즘 (Divide and Conquer)
    * Divide: 문제를 하나 또는 둘 이상으로 나눈다.
    * Conquer: 나눠진 문제가 충분히 작고, 해결이 가능하다면 해결하고, 그렇지 않다면 다시 나눈다.
* 이진 탐색
    * Divide: 리스트를 두 개의 서브 리스트로 나눈다.
    * Comquer
        * 검색할 숫자 (search) > 중간값이면, 뒷부분의 서브 리스트에서 검색할 숫자를 찾는다.
        * 검색할 숫자 (search) < 중간값이면, 앞부분의 서브 리스트에서 검색할 숫자를 찾는다.
* 분할 정복에서 재귀를 많이 사용하기 때문에 이진 탐색도 재귀 용법으로 작성할 수 있다.

## 3. 어떻게 코드로 만들까?

이진 탐색은 데이터가 정렬돼있는 상태에서 진행

데이터가 [2, 3, 8, 12, 20] 일 때,

* `binary_search(data_list, find_data)` 함수를 만들고
    * `find_data`는 찾는 숫자
    * `data_list`는 데이터 리스트
    * `data_list`의 중간값을 `find_data`와 비교해서
        * `find_data < data_list의 중간값` 라면
                * 맨 앞부터 `data_list`의 중간까지 에서 다시 `find_data` 찾기
        * `data_list의 중간값 < find_data` 이라면
            * `data_list`의 중간부터 맨 끝까지 다시 `find_data` 찾기
        * 그렇지 않다면, `data_list`의 중간값은 `find_data` 인 경우로, `return data_list 중간위치`

## 4. 알고리즘 구현

```python
def binary_search(data, search):
    # 중간 과정 확인을 위해 data를 출력해서 확인한다.
    print (data)
    # data의 길이가 1이고, 검색하려는 숫자(search)가 data에 남은 수와 같으면
    if len(data) == 1 and search == data[0]:
        # True를 반환한다.
        return True
    # data의 길이가 1이고, search가 data에 남은 수와 다르면
    if len(data) == 1 and search != data[0]:
        # False를 반환한다.
        return False
    if len(data) == 0:
        return False

    # 중간을 정하고
    medium = len(data) // 2
    # search가 data의 중간값과 같으면
    if search == data[medium]:
        # True를 반환한다.
        return True
    else:
        # search가 중간값보다 크면
        if search > data[medium]:
            # 중간값 다음부터 끝까지 다시 조사한다.
            return binary_search(data[medium+1:], search)
        # 작으면
        else:
            # 처음부터 중간값 이전까지 다시 조사한다.
            return binary_search(data[:medium], search)

# 테스트 코드
import random
data_list = random.sample(range(100), 10)
data_list # [69, 65, 18, 71, 11, 10, 42, 68, 36, 89]
 
# 이진 탐색을 위해 원본 리스트를 정렬한다.
data_list.sort()
data_list # [10, 11, 18, 36, 42, 65, 68, 69, 71, 89]

binary_search(data_list, 66)

# 출력 결과
# [10, 11, 18, 36, 42, 65, 68, 69, 71, 89]
# [68, 69, 71, 89]
# [68, 69]
# [68]
# False
```

## 5. 알고리즘 분석

n개의 리스트를 매번 2로 나누어 1이 될 때까지 비교 연산을 k 회 진행

* $n \times {1\over2} \times {1\over2} \times {1\over2} \cdots = n \times {1\over2}^k = 1$
* $n = 2^k \rightarrow log_2n = log_22k = k$
* 빅 오 표기법으로는 k + 1 이 결국 최종 시간 복잡도임 (1이 되었을 때도, 비교 연산을 한번 수행)
    * 결국 $O(log_2n + 1)$ 이고, 2와 1, 상수는 삭제되므로, $O(logn)$

### 프로그래밍 연습

다음 10000개의 데이터를 삽입 정렬, 퀵 정렬로 정렬하는 함수를 각각 만들어보고, 각각의 정렬 시간을 출력하기

#### 참고

```python
# 데이터 세트 생성하기
import random
data_list = random.sample(range(100000), 10000)

# 현재 시각 구하기
import datetime
print (datetime.datetime.now())
```
