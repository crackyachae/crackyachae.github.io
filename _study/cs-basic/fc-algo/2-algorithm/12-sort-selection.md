---
layout  : article
title   : "Chapter 12. 기본 정렬 알고리즘: 선택 정렬(Selection Sort)"
summary : 
date    : 2021-05-13 19:26:04 +0900
updated : 2021-05-13 19:59:10 +0900
tag     : 
toc     : true
public  : true
parent  : [[/cs-basic/fc-algo/2-algorithm]]
latex   : true
---
* TOC
{:toc}

> 이 글은 패스트 캠퍼스 [기술면접 완전 정복 올인원 패키지 Online](https://fastcampus.co.kr/dev_online_algo) 'Chapter 12. 정렬: 선택 정렬(Selection Sort)'의 강의내용을 정리하기 위해 강의 자료를 기반으로 작성한 글입니다.
>
> 강의 노트는 강의 구매자에게만 제공되는 자료이긴 하지만 잔재미 코딩의 [5. 대표적인 정렬3: 선택 정렬 (selection sort)](https://www.fun-coding.org/Chapter12-selectionsorting.html)에서 동일한 자료를 제공하고 있기 때문에 해당 자료를 기반으로 정리한 글을 작성해서 올립니다. 혹시 문제가 되는 경우 바로 내릴 예정이니 알려주시면 감사하겠습니다.
>
> 내용을 이해하기 위한 개인적인 설명이나 해석이 있을 수 있기 때문에 되도록 원문을 참고해주시길 바랍니다.
> 잘못된 부분이 있다면 댓글이나 그 외 편하신 방법으로 알려주시면 감사하겠습니다.

## 1. 선택 정렬 (selection sort) 이란?

* 다음과 같은 순서를 반복하며 정렬하는 알고리즘
* 주어진 데이터 중, 최솟값을 찾음
* 해당 최솟값을 데이터 맨 앞에 위치한 값과 교체함
* 맨 앞의 위치를 뺀 나머지 데이터를 동일한 방법으로 반복함

> 직접 눈으로 보면 더 이해가 쉽다: https://visualgo.net/en/sorting

![selection sort](/post-img/fc-algo-algorithm-12-sort-selection/Selection-Sort-Animation.gif)

출처: https://en.wikipedia.org/wiki/Selection_sort

## 2. 어떻게 코드로 만들까?

### 데이터가 두 개일 때

프로그래밍 연습: 데이터가 두 개일 때 동작하는 선택 정렬 알고리즘을 함수로 만들어보세요

| 단계   | 0   |     |     | 1   |     |
| ------ | --- | --- | --- | --- | --- |
| 인덱스 | 0   | 1   |     | 0   | 1   |
| 숫자   | 9   | 1   |     | 1   | 9   |

* 0 ~ 1번까지 인덱스 중 최솟값은 1이다.
* 0번 값인 9와 1번 값인 1을 바꾼다.

### 데이터가 세 개일 때

프로그래밍 연습: 데이터가 세 개일 때 동작하는 선택 정렬 알고리즘을 함수로 만들어보세요

| 단계   | 0   |     |     |     | 1   |     |     |
| ------ | --- | --- | --- | --- | --- | --- | --- |
| 인덱스 | 0   | 1   | 2   |     | 0   | 1   | 2   |
| 숫자   | 9   | 1   | 7   |     | 1   | 9   | 7   |

* 0 ~ 2번까지 인덱스 중 최솟값은 1이다.
* 0번 값인 9와 1번 값인 1을 바꾼다.

| 단계   | 2   |     |     |
| ------ | --- | --- | --- |
| 인덱스 | 0   | 1   | 2   |
| 숫자   | 3   | 7   | 9   |

* 1 ~ 2번까지 인덱스 중 최솟값은 7이다.
* 1번 값인 9와 2번 값인 7을 바꾼다.

### 데이터가 네 개일 때

프로그래밍 연습: 데이터가 네 개일 때 동작하는 선택 정렬 알고리즘을 함수로 만들어보세요

| 단계   | 0   |     |     |     |     | 1   |     |     |     |
| ------ | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 인덱스 | 0   | 1   | 2   | 3   |     | 0   | 1   | 2   | 3   |
| 숫자   | 9   | 3   | 2   | 1   |     | 1   | 3   | 2   | 9   |

* 0 ~ 3번까지 인덱스 중 최솟값은 1이다.
* 0번 값인 9와 3번 값인 1을 바꾼다.

| 단계   | 1   |     |     |     |     | 2   |     |     |     |
| ------ | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 인덱스 | 0   | 1   | 2   | 3   |     | 0   | 1   | 2   | 3   |
| 숫자   | 1   | 3   | 2   | 9   |     | 1   | 2   | 3   | 9   |

* 1 ~ 3번까지 인덱스 중 최솟값은 2이다.
* 1번 값인 3과 2번 값인 2를 바꾼다.

| 단계   | 2   |     |     |     |
| ------ | --- | --- | --- | --- |
| 인덱스 | 0   | 1   | 2   | 3   |
| 숫자   | 1   | 2   | 3   | 9   |

* 2 ~ 3번까지 인덱스 중 최솟값은 3이다.
* 2번 값인 3이 최솟값이므로 값이 자리를 바꾸지 않는다.

## 3. 알고리즘 구현

1. `for stand in range(len(data_list) - 1)` 로 반복
1. `lowest = stand` 로 놓고,
1. `for num in range(stand, len(data_list)) stand` 이후부터 반복
    * 내부 반복문 안에서 `data_list[lowest] > data_list[num]` 이면,
        * `lowest = num`
1. `data_list[num], data_list[lowest] = data_list[lowest], data_list[num]`

```python
def selection_sort(data):
    # 데이터의 길이(n) - 1번 반복한다. 
    for stand in range(len(data) - 1):
        # 최솟값을 기준점(현재 인덱스)로 지정한다.
        lowest = stand
        # 기준점 다음부터 data의 마지막 원소까지 순회하면서
        for index in range(stand + 1, len(data)):
            # 기준점의 data 값이 현재 data값보다 크면
            if data[lowest] > data[index]:
                # 최솟값을 현재 인덱스로 바꾼다.
                lowest = index
        # 기준점의 값과 최솟값을 바꾼다.
        data[lowest], data[stand] = data[stand], data[lowest]
    return data

# 테스트 코드
import random

data_list = random.sample(range(100), 10)

selection_sort(data_list)
# [9, 12, 13, 24, 53, 55, 69, 80, 87, 98]
```

## 4. 알고리즘 분석

* 반복문이 두 개 $O(n^2)$
    * 실제로 상세하게 계산하면, $n(n−1) / 2$
