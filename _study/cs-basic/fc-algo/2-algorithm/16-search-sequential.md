---
layout  : article
title   : "Chapter 16. 탐색 알고리즘: 순차 탐색(Sequential Search)"
summary : 
date    : 2021-05-18 11:54:38 +0900
updated : 2021-05-18 12:06:30 +0900
tag     : 
toc     : true
public  : true
parent  : [[/cs-basic/fc-algo/2-algorithm]]
latex   : true
---
* TOC
{:toc}

> 이 글은 패스트 캠퍼스 [기술면접 완전 정복 올인원 패키지 Online](https://fastcampus.co.kr/dev_online_algo) 'Chapter 16. 탐색 알고리즘: 순차 탐색(Sequential Search)'의 강의내용을 정리하기 위해 강의 자료를 기반으로 작성한 글입니다.
>
> 강의 노트는 강의 구매자에게만 제공되는 자료이긴 하지만 잔재미 코딩의 [10. 탐색 알고리즘1: 순차 탐색 (Sequential Search)](https://www.fun-coding.org/Chapter16-seqsearch.html)에서 동일한 자료를 제공하고 있기 때문에 해당 자료를 기반으로 정리한 글을 작성해서 올립니다. 혹시 문제가 되는 경우 바로 내릴 예정이니 알려주시면 감사하겠습니다.
>
> 내용을 이해하기 위한 개인적인 설명이나 해석이 있을 수 있기 때문에 되도록 원문을 참고해주시길 바랍니다.
> 잘못된 부분이 있다면 댓글이나 그 외 편하신 방법으로 알려주시면 감사하겠습니다.

## 1. 순차 탐색 (Sequential Search) 이란?

* 탐색은 여러 데이터 중에서 원하는 데이터를 찾아내는 것을 의미
* 데이터가 담겨있는 리스트를 앞에서부터 하나씩 비교해서 원하는 데이터를 찾는 방법

### 프로그래밍 연습

임의 리스트가 다음과 같이 rand_data_list로 있을 때, 원하는 데이터의 위치를 리턴하는 순차 탐색 알고리즘 작성해보기

* 원하는 데이터가 리스트에 없으면 -1을 리턴

데이터 준비: data_list 10개 만들기

```python
from random import *

rand_data_list = list()
for num in range(10):
    # 1부터 100까지의 수 한 개를 생성해 rand_data_list에 추가한다.
    rand_data_list.append(randint(1, 100))

rand_data_list
# [71, 63, 75, 33, 6, 37, 81, 79, 3, 29]
```

```python
def sequencial(data_list, search_data):
    # data_list의 index를 순회하면서
    for index in range(len(data_list)):
        # 해당 인덱스의 값이 search_data와 같으면
        if data_list[index] == search_data:
            # 해당 인덱스를 반환한다.
            return index
    # 일치하는 것이 없으면
    # -1을 반환한다. 
    return -1

sequencial(rand_data_list, 4) # -1
```

## 2. 알고리즘 분석

* 최악의 경우 리스트 길이가 n일 때, n번 비교해야 함
    * $O(n)$
