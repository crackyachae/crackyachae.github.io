---
layout  : article
title   : Chapter 05. 큐(Queue)
summary : 
date    : 2021-04-20 14:22:46 +0900
updated : 2021-04-20 15:01:56 +0900
tag     : 
toc     : true
public  : true
parent  : [[/cs-basic/fc-algo/1-data-structure]]
latex   : false
---
* TOC
{:toc}

> 이 글은 패스트 캠퍼스 [기술면접 완전 정복 올인원 패키지 Online](https://fastcampus.co.kr/dev_online_algo) 'Chapter 05. 큐(Queue)'의 강의내용을 정리하기 위해 강의 자료를 기반으로 작성한 글입니다.
>
> 강의 노트는 강의 구매자에게만 제공되는 자료이긴 하지만 잔재미 코딩의 [4. 대표적인 자료구조: 큐 (Queue)](https://www.fun-coding.org/Chapter05-queue-live.html)에서 동일한 자료를 제공하고 있기 때문에 해당 자료를 기반으로 정리한 글을 작성해서 올립니다. 혹시 문제가 되는 경우 바로 내릴 예정이니 알려주시면 감사하겠습니다.
>
> 내용을 이해하기 위한 개인적인 설명이나 해석이 있을 수 있기 때문에 되도록 원문을 참고해주시길 바랍니다.
> 잘못된 부분이 있다면 댓글이나 그 외 편하신 방법으로 알려주시면 감사하겠습니다.

## 꼭 알아둬야 할 자료 구조: 큐 (Queue)

* 줄을 서는 행위와 유사한 자료구조
* 컴퓨터의 운영 체제나 인터넷의 네트워킹에서도 많이 사용된다.

## 1. 큐 구조

* 가장 먼저 넣은 데이터를 가장 먼저 꺼낼 수 있는 구조
    * 음식점에서 가장 먼저 줄을 선 사람이 제일 먼저 음식점에 입장하는 것과 동일
    * FIFO(First-In, First-Out) 또는 LILO(Last-In, Last-Out) 방식으로 스택과 꺼내는 순서가 반대
        * FIFO가 더 많이 쓰이는 편이다.

## 2. 알아둘 용어

* Enqueue: 큐에 데이터를 넣는 기능
* Dequeue: 큐에서 데이터를 꺼내는 기능

> Visualgo 사이트에서 시연해보며 이해하기 (enqueue/dequeue 만 클릭해보며): https://visualgo.net/en/list

## 3. 파이썬 queue 라이브러리 활용해서 큐 자료 구조 사용하기

> 참고하는 정도로만 학습하면 된다.

실제로 복잡한 프로그램을 제작할 때 큐를 사용해야 한다면 파이썬에서 제공하는 queue 라이브러리를 사용하면 된다.

* queue 라이브러리에는 다양한 큐 구조로 `Queue()`, `LifoQueue()`, `PriorityQueue()` 제공
* 일반적인 큐(FIFO, LILO) 외에 다양한 정책이 적용된 큐들이 있음
* 프로그램을 작성할 때 프로그램에 따라 적합한 자료 구조를 사용
    * `Queue()`: 가장 일반적인 큐 자료 구조
    * `LifoQueue()`: 나중에 입력된 데이터가 먼저 출력되는 구조 (스택 구조라고 보면 됨)
    * `PriorityQueue()`: 데이터마다 우선순위를 넣어서, 우선순위가 높은 순으로 데이터 출력

### 3.1. `Queue()`로 큐 만들기 (가장 일반적인 큐, FIFO(First-In, First-Out))

```python
import queue

data_queue = queue.Queue() # FIFO, LIFO queue

# 데이터를 넣을 때: enqueue
data_queue.put("funcoding")
data_queue.put(1)
data_queue.qsize() # 2 (funcoding과 1, 2개)

# 데이터를 뺄 때: dequeue
data_queue.get() # funcoding (첫 번째로 넣은 funcoding 이 출력)
data_queue.qsize() # 1
data_queue.get() # 1
data_queue.qsize() # 0
```

### 3.2. `LifoQueue()`로 큐 만들기 (LIFO(Last-In, First-Out))

마지막에 넣은 것이 가장 먼저 추출되는 큐

```python
import queue

data_queue = queue.LifoQueue()
  
# 데이터를 넣을 때: enqueue
data_queue.put("funcoding")
data_queue.put(1)
data_queue.qsize() # 2 (funcoding과 1, 2개)

# 데이터를 뺄 때: dequeue
data_queue.get() # 1
```

### 3.3. `PriorityQueue()`로 큐 만들기

```python
import queue

data_queue = queue.PriorityQueue()

# 데이터를 넣을 떄: enqueue
# 인자를 튜플로 넣어주고 튜플의 '첫' 번째 원소로 우선순위를 넣어준다. (우선순위, 콘텐츠) 순서
data_queue.put((10, "korea"))
data_queue.put((5, 1))
data_queue.put((15, "china"))
data_queue.qsize() # 3

# 데이터를 뺄 때: dequeue
data_queue.get() # (5, 1) # 우선순위가 가장 먼저인(작은) 1
data_queue.get() # (10, 'korea') # 우선순위가 두 번째인 korea
```

## 참고: 어디에 큐가 많이 쓰일까?

* 멀티 태스킹을 위한 프로세스 스케줄링 방식을 구현하기 위해 많이 사용됨 (운영체제 참조)

> 큐의 경우에는 장단점보다는 (특별히 언급되는 장단점이 없음), 큐의 활용 예로 프로세스 스케줄링 방식을 함께 이해해두는 것이 좋음

## 4. 프로그래밍 연습

### 연습 1: 리스트 변수로 큐를 다루는 enqueue, dequeue 기능 구현해보기

```python
queue_list = list()

# enqueue 함수 구현
def enqueue(data):
    queue_list.append(data)

# dequeue 함수 구현
def dequeue():
    data = queue_list[0]
    del queue_list[0]
    return data
    
# 10개의 원소(인덱스)를 큐에 넣는다.
for index in range(10):
    enqueue(index)
len(queue_list) # 10

dequeue() # 0
dequeue() # 1
dequeue() # 2
```
