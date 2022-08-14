---
layout  : article
title   : Chapter 06. 스택(Stack)
summary : 
date    : 2021-04-20 17:17:01 +0900
updated : 2021-04-20 18:22:30 +0900
tag     : 
toc     : true
public  : true
parent  : [[/cs-basic/fc-algo/1-data-structure]]
latex   : false
---
* TOC
{:toc}

> 이 글은 패스트 캠퍼스 [기술면접 완전 정복 올인원 패키지 Online](https://fastcampus.co.kr/dev_online_algo) 'Chapter 06. 스택(Stack)'의 강의내용을 정리하기 위해 강의 자료를 기반으로 작성한 글입니다.
>
> 강의 노트는 강의 구매자에게만 제공되는 자료이긴 하지만 잔재미 코딩의 [5. 대표적인 자료구조: 스택 (Stack)](https://www.fun-coding.org/Chapter06-stack-live.html)에서 동일한 자료를 제공하고 있기 때문에 해당 자료를 기반으로 정리한 글을 작성해서 올립니다. 혹시 문제가 되는 경우 바로 내릴 예정이니 알려주시면 감사하겠습니다.
>
> 내용을 이해하기 위한 개인적인 설명이나 해석이 있을 수 있기 때문에 되도록 원문을 참고해주시길 바랍니다.
> 잘못된 부분이 있다면 댓글이나 그 외 편하신 방법으로 알려주시면 감사하겠습니다.

## 꼭 알아둬야 할 자료 구조: 스택 (Stack)
  
* 데이터를 제한적으로 접근할 수 있는 구조
    * 한쪽 끝에서만 자료를 넣거나 뺄 수 있는 구조
* 가장 나중에 쌓은 데이터를 가장 먼저 빼낼 수 있는 데이터 구조
* 큐와 비슷하지만 넣고 빼는 순서가 다르다.
    * 큐: FIFO 정책
    * 스택: LIFO 정책

## 1. 스택 구조

* 스택은 LIFO(Last In, Fisrt Out) 또는 FILO(First In, Last Out) 데이터 관리 방식을 따름
    * LIFO: 마지막에 넣은 데이터를 가장 먼저 추출하는 데이터 관리 정책
    * FILO: 처음에 넣은 데이터를 가장 마지막에 추출하는 데이터 관리 정책
    * 굳이 이 두 단어를 써서 잘 표현하지 않는다. 그냥 스택이라고 하는 편인 것 같다.
* 대표적인 스택의 활용
    * 컴퓨터 내부의 프로세스 구조의 함수 동작 방식
* 주요 기능
    * `push()`: 데이터를 스택에 넣기
    * `pop()`: 데이터를 스택에서 꺼내기

> Visualgo 사이트에서 시연해보며 이해하기 (push/pop만 클릭해보며): https://visualgo.net/en/list

## 2. 스택 구조와 프로세스 스택

* 스택 구조는 프로세스 실행 구조의 가장 기본
* 함수 호출 시 프로세스 실행 구조를 스택과 비교해서 이해 필요

```python
# 재귀 함수
def recursive(data):
    if data < 0:
        print ("ended")
    else:
        print(data)
        # 자기 함수 자신을 다시 호출한다.
        recursive(data - 1)
        print("returned", data)        

recursive(4)

# 출력 결과
# 4
# 3
# 2
# 1
# 0
# ended
# returned 0
# returned 1
# returned 2
# returned 3
# returned 4
```

| 프로세스 스택 | 함수          |
| :-----------: | ------------  |
| -1            | recursive(-1) |
| 0             | recursive(0)  |
| 1             | recursive(1)  |
| 2             | recursive(2)  |
| 3             | recursive(3)  |
| 4             | recursive(4)  |

* `recursive(4)`가 가장 먼저 호출되고 그 안에서 `data`를 출력한 뒤 `recursive(data - 1)`에 의해 `recursive(3)`이 호출된다.
    * `recursive(3)`이 호출되면 프로세스 스택에서 `recursive(4)` 상단에 저장된다.
* 위 과정이 반복되면서 `data`를 하나씩 줄이면서 프로세스 스택을 쌓아 나간다.
* `data`가 `-1`이 되면 `data < 0`을 만족하므로 `ended`를 출력하고 함수를 종료하면서 프로세스 스택에서 pop 된다.
* 이는 `recursive(0)` 안에서 `recursive(data - 1)`이 실행된 것과 같으므로
    * 그 아래의 `print('returned', data)`로 `0`을 출력하고 함수를 종료하면 다시 `recursive(0)`이 프로세스 스택에서 pop 된다.
* 프로세스 스택에 쌓여있는 `data`에 대해 이를 반복한다.

## 3. 자료 구조 스택의 장단점

### 장점

* 구조가 단순해서, 구현이 쉽다.
* 데이터 저장/읽기 속도가 빠르다.

### 단점 (일반적인 스택 구현 시)

* 데이터 최대 개수를 미리 정해야 한다.
    * 파이썬의 경우 재귀 함수는 1000번까지만 호출이 가능함
* 저장 공간의 낭비가 발생할 수 있음
    * 미리 최대 개수만큼 저장 공간을 확보해야 함
    * 그 개수만큼 저장공간을 항상 사용하지 않기 때문에 남은 저장공간은 낭비된다고 볼 수 있다.

> 스택은 단순하고 빠른 성능을 위해 사용되므로, 보통 배열 구조를 활용해서 구현하는 것이 일반적임. 이 경우, 위에서 열거한 단점이 있을 수 있음

## 4. 파이썬 리스트 기능에서 제공하는 메서드로 스택 사용해보기

`append(push)`, `pop` 메서드 제공

```python
data_stack = list()

data_stack.append(1)
data_stack.append(2)

data_stack # [1, 2]
data_stack.pop() # 2, 가장 마지막에 들어간 원소
```

## 5. 프로그래밍 연습

### 연습 1: 리스트 변수로 스택을 다루는 pop, push 기능 구현해보기 (pop, push 함수 사용하지 않고 직접 구현해보기)

```python
stack_lsit = list()

# push 함수 구현
def push(data):
    stack_list.append(data)

# pop 함수 구현
def pop:
    # 리스트의 마지막 원소는
    # 리스트 크기에 상관없이 항상 [-1]로 접근할 수 있다.
    data = stack_list[-1]
    del stack_list[-1]
    return data

# 10개의 원소(인덱스)를 스택에 넣는다.
for index in range(10):
    push(index)

pop() # 9
```
