---
layout  : article
title   : "Chapter 12. 기본 정렬 알고리즘: 삽입 정렬(Insertion Sort)"
summary : 
date    : 2021-05-05 02:23:39 +0900
updated : 2021-05-13 19:25:43 +0900
tag     : 
toc     : true
public  : true
parent  : [[fc-algo-algorithm]]
latex   : true
---
* TOC
{:toc}

> 이 글은 패스트 캠퍼스 [기술면접 완전 정복 올인원 패키지 Online](https://fastcampus.co.kr/dev_online_algo) 'Chapter 12. 정렬: 삽입 정렬(Insertion Sort)'의 강의내용을 정리하기 위해 강의 자료를 기반으로 작성한 글입니다.
>
> 강의 노트는 강의 구매자에게만 제공되는 자료이긴 하지만 잔재미 코딩의 [4. 대표적인 정렬2: 삽입 정렬 (insertion sort)](https://www.fun-coding.org/Chapter12-insertionsorting.html)에서 동일한 자료를 제공하고 있기 때문에 해당 자료를 기반으로 정리한 글을 작성해서 올립니다. 혹시 문제가 되는 경우 바로 내릴 예정이니 알려주시면 감사하겠습니다.
>
> 내용을 이해하기 위한 개인적인 설명이나 해석이 있을 수 있기 때문에 되도록 원문을 참고해주시길 바랍니다.
> 잘못된 부분이 있다면 댓글이나 그 외 편하신 방법으로 알려주시면 감사하겠습니다.

## 1. 삽입 정렬 (insertion sort) 이란?

* 삽입 정렬은 두 번째 인덱스부터 시작
* 해당 인덱스(key 값) 앞에 있는 데이터(B)부터 비교해서 key 값이 더 작으면, B값을 뒤 인덱스로 복사
* 이를 key 값이 더 큰 데이터를 만날 때까지 반복, 그리고 큰 데이터를 만난 위치 바로 뒤에 key 값을 이동

직접 눈으로 보면 더 이해가 쉽다: https://visualgo.net/en/sorting

![insertion sort](/post-img/fc-algo-algorithm-12-sort-insert/Insertion-sort-example.gif)

출처: https://commons.wikimedia.org/wiki/File:Insertion-sort-example.gif

## 2. 어떻게 코드로 만들까? (결국 프로그래밍으로 일반화할 수 있게 하는 것)

> 알고리즘 연습 방법에 기반해서 단계별로 생각해봅니다.

### 데이터가 두 개 있을 때

프로그래밍 연습: 데이터가 두 개일 때 동작하는 삽입 정렬 알고리즘을 함수로 만들어보세요

* 0번 5는 비교할 대상이 없으므로 그냥 둔다.

| 단계   | 0   |     |     | 0   |     |
| ------ | --- | --- | --- | --- | --- |
| 인덱스 | 0   | 1   |     | 0   | 1   |
| 숫자   | 5   | 3   |     | 3   | 5   |

* 1번 3의 적절한 위치를 찾는다.
* 0번과 비교했을 때 3 < 5 이므로 자리를 바꾼다.

### 데이터가 세 개 있을 때

프로그래밍 연습: 데이터가 세 개일 때 동작하는 선택 정렬 알고리즘을 함수로 만들어보세요

* 0번 5는 비교할 대상이 없으므로 그냥 둔다.

| 단계   | 0   |     |     |     | 1   |     |     |
| ------ | --- | --- | --- | --- | --- | --- | --- |
| 인덱스 | 0   | 1   | 2   |     | 0   | 1   | 2   |
| 숫자   | 5   | 3   | 2   |     | 3   | 5   | 2   |

* 1번과 0번을 비교했을 때 3 < 5 이므로 자리를 바꾼다.

| 단계   | 2   |     |     |     | 3   |     |     |
| ------ | --- | --- | --- | --- | --- | --- | --- |
| 인덱스 | 0   | 1   | 2   |     | 0   | 1   | 2   |
| 숫자   | 3   | 2   | 5   |     | 2   | 3   | 5   |

* 2번과 1번을 비교했을 때 2 < 5 이므로 자리를 바꾼다.
* 1번과 0번을 비교했을 때 2 < 3 이므로 자리를 바꾼다.
* 5와 3은 이미 앞에서 정렬했으므로 비교하지 않아도 된다.

### 데이터가 네 개 있을 때

프로그래밍 연습: 데이터가 네 개일 때 동작하는 선택 정렬 알고리즘을 함수로 만들어보세요

* 0번 5는 비교할 대상이 없으므로 그냥 둔다.

| 단계   | 0   |     |     |     |     | 1   |     |     |     |
| ------ | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 인덱스 | 0   | 1   | 2   | 3   |     | 0   | 1   | 2   | 3   |
| 숫자   | 5   | 3   | 2   | 4   |     | 3   | 5   | 2   | 4   |

* 1번과 0번과 비교했을 때 3 < 5 이므로 자리를 바꾼다.

| 단계   | 2   |     |     |     |     | 3   |     |     |     |
| ------ | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 인덱스 | 0   | 1   | 2   | 3   |     | 0   | 1   | 2   | 3   |
| 숫자   | 3   | 2   | 5   | 4   |     | 2   | 3   | 5   | 4   |

* 2번과 1번을 비교했을 때 2 < 5 이므로 자리를 바꾼다.
* 1번과 0번을 비교했을 때 2 < 3 이므로 자리를 바꾼다.

| 단계   | 4   |     |     |     |
| ------ | --- | --- | --- | --- |
| 인덱스 | 0   | 1   | 2   | 3   |
| 숫자   | 2   | 3   | 4   | 5   |

* 3번과 2번을 비교했을 때 4 < 5 이므로 자리를 바꾼다.
* 2번과 1번을 비교했을 때 4 > 3 이므로 자리를 바꾸지 않는다.
* 앞은 이미 정렬되어 있어서 더 비교할 필요 없이 바로 종료한다.

## 3. 알고리즘 구현

### 특이점 찾아보기

* n개의 리스트가 있는 경우 최대 n - 1번의 로직을 적용한다.
    * n - 1번의 턴을 돈다.
* 로직을 1번 적용할 때마다 각 인덱스 번호에서 시작해서 하나씩 인덱스값을 줄여가면서 처음까지 비교한다.
    * `range`로 구현하는 법

        ```python
        for index in range(10, 1, -1):
            print (index)

        # 출력 결과
        # 10
        # 9
        # 8
        # 7
        # 6
        # 5
        # 4
        # 3
        # 2
        ```

* 기준과 그 앞의 수를 비교했을 때 자리를 바꾸지 않아도 되면 비교를 종료한다.

### 이를 반영한 코드 흐름

1. `for stand in range(len(data_list))`로 반복
1. `key = data_list[stand]`
1. `for num in range(stand, 0, -1)` 반복
    * 내부 반복문 안에서 `data_list[stand] < data_list[num - 1]` 이면,
    * `data_list[num - 1], data_list[num] = data_list[num], data_list[num - 1]`

```python
def insertion_sort(data):
    # 데이터의 길이(n) - 1번 반복한다.
    for index in range(len(data) - 1):
        # 반복마다 data의 인덱스 + 1부터 1까지 1씩 줄여가면서
        for index2 in range(index + 1, 0, -1):
            # 현재 데이터의 값이 그 이전의 값보다 작으면
            # 현재 인덱스와 그것에서 1을 뺀 인덱스를 이용하기 때문에 index + 1 ~ 1까지 비교했던 것.
            if data[index2] < data[index2 - 1]:
                # 두 값을 교환한다.
                data[index2], data[index2 - 1] = data[index2 - 1], data[index2]
            # 값이 크면
            else:
                # 현재 반복을 종료한다.
                break
    return data

# 테스트 코드
import random

data_list = random.sample(range(100), 50)
print (insertion_sort(data_list))
# [1, 2, 3, 5, 8, 9, 10, 11, 14, 16, 17, 20, 22, 23, 32, 33, 34, 36, 40, 43, 46, 47, 49, 50, 51, 53, 56, 57, 60, 61, 62, 64, 65, 67, 68, 71, 72, 74, 75, 81, 82, 83, 85, 86, 89, 90, 91, 93, 96, 99]
```

## 4. 알고리즘 분석

* 반복문이 두 개 $O(n^2)$
    * 최악의 경우, $n(n−1) / 2$
    * 버블 정렬과 동일한 복잡도를 갖는다.
* 완전 정렬이 되어 있는 상태라면 최선은 $O(n)$

> 이해가 안 가면, 이 코드를 보면서 이해하기: https://goo.gl/XKBXuk