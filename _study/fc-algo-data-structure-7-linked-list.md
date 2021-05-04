---
layout  : article
title   : Chapter 07. 링크드 리스트(Linked List)
summary : 
date    : 2021-04-20 18:23:43 +0900
updated : 2021-04-21 12:05:50 +0900
tag     : 
toc     : true
public  : true
parent  : [[fc-algo-data-structure]]
latex   : false
---
* TOC
{:toc}

> 이 글은 패스트 캠퍼스 [기술면접 완전 정복 올인원 패키지 Online](https://fastcampus.co.kr/dev_online_algo) 'Chapter 07. 링크드 리스트(Linked List)'의 강의내용을 정리하기 위해 강의 자료를 기반으로 작성한 글입니다.
>
> 강의 노트는 강의 구매자에게만 제공되는 자료이긴 하지만 잔재미 코딩의 [6. 대표적인 자료구조: 링크드 리스트 (Linked List)](https://www.fun-coding.org/Chapter07-linkedlist-live.html)에서 동일한 자료를 제공하고 있기 때문에 해당 자료를 기반으로 정리한 글을 작성해서 올립니다. 혹시 문제가 되는 경우 바로 내릴 예정이니 알려주시면 감사하겠습니다.
>
> 내용을 이해하기 위한 개인적인 설명이나 해석이 있을 수 있기 때문에 되도록 원문을 참고해주시길 바랍니다.
> 잘못된 부분이 있다면 댓글이나 그 외 편하신 방법으로 알려주시면 감사하겠습니다.

## 1. 링크드 리스트 (Linked List) 구조

* 연결 리스트라고도 함
* 배열은 순차적으로 연결된 공간에 데이터를 나열하는 데이터 구조
    * 미리 연결된 공간을 예약해두어야 한다는 단점이 있다.
* 링크드 리스트는 떨어진 곳에 존재하는 데이터를 화살표로 연결해서 관리하는 데이터 구조
    * 배열의 단점을 보완한 자료구조라 할 수 있다.
* 본래 C언어에서는 주요한 데이터 구조이지만, 파이썬은 리스트 타입이 링크드 리스트의 기능을 모두 지원

### 링크드 리스트 기본 구조와 용어

* 노드(Node): 데이터 저장 단위 (데이터값, 포인터)로 구성
* 포인터(pointer): 각 노드 안에서, 다음이나 이전의 노드와의 연결 정보를 가지고 있는 공간

\* 일반적인 링크드 리스트 형태

![singly linked list](../post-img/fc-algo-data-structure-7-linked-list/7-1_Singly-linked-list.svg.png)
(출처: wikipedia, https://en.wikipedia.org/wiki/Linked_list)

## 2. 간단한 링크드 리스트 예

### Node 구현

* 보통 파이썬에서 링크드 리스트 구현 시, 파이썬 클래스를 활용함
    * 노드 + 포인터의 구조를 만들기 위함이다.
    * 파이썬 객체지향 문법 이해 필요
    * 참고: https://www.fun-coding.org/PL&OOP1-3.html

```python
class Node:
    def __init__(self, data):
        self.data = data
        self.next = None

# 다음 노드의 주소를 인자로 받을 수 있도록 개선
# 초깃값은 None
class Node:
    def __init__(self, data, next=None):
        self.data = data
        self.next = next
```

### Node와 Node 연결하기 (포인터 활용)

```python
node1 = Node(1)
node2 = Node(2)

# node1과 node2를 연결
node1.next = node2

# 링크드 리스트에 접근하기 위한 head(가장 처음 노드) 지정
head = node1
```

### 링크드 리스트로 데이터 추가하기

```python
class Node:
    def __init__(self, data, next=None):
        self.data = data
        self.next = next

# 링크드 리스트에 노드를 추가하는 함수
# 맨 끝의 노드에 새로운 노드를 추가해야 한다.
def add(data):
    node = head
    # 현재 링크드 리스트의 끝으로 이동한다.
    # 노드의 다음이 없을 때(마지막)까지 다음 노드로 이동
    while node.next:
        node = node.next
    # 마지막 노드의 다음에 현재 값으로 생성한 노드를 연결
    node.next = Node(data)

# head를 생성
node1 = Node(1)
head = node1

# 2부터 9까지의 값을 갖는 노드를 추가한다.
for index in range(2, 10):
    add(index)
```

### 링크드 리스트 데이터 출력하기(검색하기)

```python
# 찾고자 하는 링크드 리스트를 head로 지정
node = head

# 노드의 다음이 없을 때(마지막)까지 실행
while node.next:
    # 현재 노드를 출력하고
    print(node.data)
    # 다음 노드로 이동한다.
    node = node.next
# 마지막 노드를 출력한다.
print (node.data)

# 출력 결과
# 1
# 2
# 3
# 4
# 5
# 6
# 7
# 8
# 9
```

## 3. 링크드 리스트의 장단점 (전통적인 C언어에서의 배열과 링크드 리스트)

### 장점

* 미리 데이터 공간을 미리 할당하지 않아도 됨
    * 배열은 미리 데이터 공간을 할당해야 함

### 단점

* 연결(포인터)을 위한 별도 데이터 공간이 필요하므로, 저장공간 효율이 높지 않음
* 연결 정보를 찾는 시간이 필요하므로 접근 속도가 느림
    * 배열은 인덱스로 바로 접근이 가능하다.
* 중간 데이터 삭제 시, 앞뒤 데이터의 연결을 재구성해야 하는 부가적인 작업 필요

## 4. 링크드 리스트의 복잡한 기능 1 (링크드 리스트 데이터 사이에 데이터를 추가)

링크드 리스트는 유지 관리에 부가적인 구현이 필요함

![CPT linked list adding node](../post-img/fc-algo-data-structure-7-linked-list/7-2_CPT-LinkedLists-addingnode.svg.png)
(출처: wikipedia, https://en.wikipedia.org/wiki/Linked_list)

```python
# 현재 노드 상태를 확인한다.
node = head
while node.next:
    print(node.data)
    node = node.next
print (node.data)

# 출력 결과
# 1
# 2
# 3
# 4
# 5
# 6
# 7
# 8
# 9

# 1과 2 사이에 1.5라는 노드를 넣고자 할 때
node3 = Node(1.5)

node = head
search = True

# 1 다음에 넣어야 하기 때문에 우선 값이 1인 노드로 이동한다.
# 노드의 값이 1일 때 이동을 멈춰야 한다.

# search가 True일 동안
while search:
    # 노드의 값이 1이면
    if node.data == 1:
        # search를 False로 바꾸고 반복을 그만둔다.
        # (다음 노드로 이동하지 않는다)
        search = False
    else:
        # 다음 노드로 이동한다.
        node = node.next

# 임시 노드를 생성해서 1이 가리키고 있는 다음 노드(data: 2)를 저장한다.
node_next = node.next
# 1이 가리키는 다음 노드를 node3(data: 1.5)로 지정한다.
node.next = node3
# 노드3이 가리키는 다음 노드를 임시 노드에 넣어놨던 노드(data: 2)로 지정한다.
node3.next = node_next

# 노드를 추가한 뒤 노드를 출력해서 확인한다.
node = head
while node.next:
    print(node.data)
    node = node.next
print (node.data)

# 출력 결과
# 1
# 1.5
# 2
# 3
# 4
# 5
# 6
# 7
# 8
# 9
```

## 5. 파이썬 객체지향 프로그래밍으로 링크드 리스트 구현하기

```python
# 노드를 생성할 수 있는 클래스
class Node:
    def __init__(self, data, next=None):
        self.data = data
        self.next = next

# 노드를 관리할 수 있는 클래스(Node Management)
class NodeMgmt:
    # head를 지정
    def __init__(self, data):
        # 받은 데이터로 맨 앞 노드를 생성하고
        # 이를 클래스의 head로 지정한다.
        self.head = Node(data)

    # 노드를 마지막에 추가
    def add(self, data):
        # head가 없는 경우 받은 데이터로 head를 생성한다.
        if self.head == '':
            self.head = Node(data)
        else:
            # 클래스의 head를 node로 지정한다.
            node = self.head
            while node.next:
                node = node.next
            node.next = Node(data)
        
    # 노드 전체를 출력(description)
    def desc(self):
        node = self.head
        while node:
            print (node.data)
            node = node.next

# 링크드 리스트를 생성
# 0으로 첫 노드를 생성해 head로 지정한다.
linkedlist1 = NodeMgmt(0)
linkedlist1.desc() # 0

# 1~9까지의 값을 갖는 노드를 링크드 리스트에 추가한다.
for data in range(1, 10):
    linkedlist1.add(data)

linkedlist1.desc()

# 출력 결과
# 0
# 1
# 2
# 3
# 4
# 5
# 6
# 7
# 8
# 9
```

## 6. 링크드 리스트의 복잡한 기능2 (특정 노드를 삭제)

다음 코드는 위의 코드에서 delete 메소드만 추가한 것이므로 해당 메소드만 확인하면 됨

```python
class Node:
    def __init__(self, data, next=None):
        self.data = data
        self.next = next

class NodeMgmt:
    # ... head init, add, desc 함수
    
    def delete(self, data):
        # head가 없는 경우
        if self.head == '':
            print ("해당 값을 가진 노드가 없습니다.")
            return
        
        # 경우 1: 삭제하는 노드가 head인 경우
        if self.head.data == data:
            # head 노드를 임시로 변수에 담아두고 (다음에 제거하기 위함)
            temp = self.head
            # 현재 링크드 리스트의 head를 현재 head의 다음 노드로 지정한다.
            # 이전에 head 노드를 임시로 담아두지 않았으면 접근할 수 없게 된다.
            self.head = self.head.next
            # 변수에 담아놓은 head 노드를 제거한다.
            del temp
        # 경우 2: 중간이나 마지막의 노드를 삭제하는 경우
        else:
            node = self.head
            # 다음 노드가 존재하는 동안 반복한다.
            while node.next:
                # 다음 노드의 data가 입력받은 data와 일치하면
                # 즉, 다음 노드가 삭제할 노드이면
                if node.next.data == data:
                    # 다음 노드를 임시로 담아두고
                    temp = node.next
                    # 현재 노드가 다음 노드의 다음 노드를 가리키게 한다.
                    # 마지막 노드를 제거하는 경우 None이 들어가게 된다.
                    node.next = node.next.next
                    # 다음 노드를 제거한다.
                    del temp
                    return
                else:
                    node = node.next

# 테스트
# 테스트를 위해 1개 노드를 만들어 봄
linkedlist1 = NodeMgmt(0)
linkedlist1.desc() # 0

# head가 살아있음을 확인
linkedlist1.head # <__main__.Node at 0x1099fc6a0>

# head를 지워봄(위에서 언급한 경우 1)
linkedlist1.delete(0)

# 다음 코드 실행 시 아무것도 안 나온다는 것은 linkedlist1.head가 정상적으로 삭제되었음을 의미
linkedlist1.head # ''

# 다시 하나의 노드를 만들어봄
linkedlist1 = NodeMgmt(0)
linkedlist1.desc() # 0

# 이번엔 여러 노드를 더 추가해봄
for data in range(1, 10):
    linkedlist1.add(data)

linkedlist1.desc()
# 출력 결과
# 0
# 1
# 2
# 3
# 4
# 5
# 6
# 7
# 8
# 9

# 노드 중에 한 개를 삭제함 (위에서 언급한 경우 2)
linkedlist1.delete(4)

# 특정 노드가 삭제되었음을 알 수 있음
linkedlist1.desc()
# 출력 결과
# 0
# 1
# 2
# 3
# 5
# 6
# 7
# 8
# 9

linkedlist1.delete(9)
linkedlist1.desc()
# 출력 결과
# 0
# 1
# 2
# 3
# 5
# 6
# 7
# 8
```

### 연습 1: 위 코드에서 노드 데이터가 2인 노드 삭제해보기

```python
node_mgmt.delete(2)
node_mgmt.desc()
```

### 연습 2: 위 코드에서 노드 데이터가 특정 숫자인 노드를 찾는 함수를 만들고, 테스트해보기

* 테스트: 임의로 1 ~ 9까지 데이터를 링크드 리스트에 넣어보고, 데이터값이 4인 노드의 데이터 값 출력해보기

```python
class Node:
    def __init__(self, data):
        self.data = data
        self.next = None

class NodeMgmt:
    # ... head init, add, desc, delete 함수

    def search_node(self, data):
        node = self.head
        while node:
            if node.data == data:
                return node
            else:
                node = node.next
                
# 테스트
# 링크드 리스트를 초기화한다.
node_mgmt = NodeMgmt(0)
# 1 ~ 9까지 데이터를 링크드 리스트에 추가한다.
for data in range(1, 10):
    node_mgmt.add(data)

# 데이터 값이 4인 노드를 받아온다.
node = node_mgmt.search_node(4)
# 받아온 노드의 data 값을 출력한다.
print(node.data)
```

## 7. 다양한 링크드 리스트 구조

* 기존 링크드 리스트의 단점
    * 특정 데이터를 찾으려면 무조건 처음부터 찾아야 한다.
    * 뒤쪽에 있는 노드일수록 찾는 데 오래 걸린다.
    * 뒤에서도 검색이 가능하다면 이 시간을 줄일 수 있다.
* 더블 링크드 리스트(Doubly linked list) 기본 구조
    * 이중 연결 리스트라고도 함
    * 장점: 양방향으로 연결되어 있어서 노드 탐색이 양쪽으로 모두 가능

![doubly linked list](../post-img/fc-algo-data-structure-7-linked-list/7-3_Doubly-linked-list.svg.png)
(출처: wikipedia, https://en.wikipedia.org/wiki/Linked_list)

```python
class Node:
    def __init__(self, data, prev=None, next=None):
        # 앞의 노드를 가리키는 prev를 추가한다.
        self.prev = prev
        self.data = data
        self.next = next

class NodeMgmt:
    def __init__(self, data):
        # 받아온 초깃값으로 head를 생성한다.
        self.head = Node(data)
        # 뒤에서 앞으로 이동할 수 있기 때문에 맨 마지막 노드인 tail이 존재한다.
        # head와 동일한 노드로 tail을 지정한다.
        self.tail = self.head

    # 노드를 마지막에 추가하는 함수
    def insert(self, data):
        # head가 없는 경우
        if self.head == None:
            self.head = Node(data)
            self.tail = self.head
        else:
            node = self.head
            # 다음 노드가 존재하지 않을 때(마지막 노드)까지
            while node.next:
                # 다음 노드로 이동한다.
                node = node.next
            # 새로운 노드를 생성한 뒤
            new = Node(data)
            # 현재(마지막) 노드의 다음에 새로 생성한 노드를 연결한다.
            node.next = new
            # 새로운 노드의 이전에 현재 노드를 연결한다.
            new.prev = node
            # 링크드 리스트의 tail을 새로 생성한 노드로 바꾼다.
            self.tail = new

    # 모든 노드를 출력하는 함수
    # 이전과 같다.
    def desc(self):
        node = self.head
        while node:
            print (node.data)
            node = node.next

# 테스트
# 더블 링크드 리스트를 생성하고 값이 0인 노드로 초기화한다.
double_linked_list = NodeMgmt(0)

# 1 ~ 9까지의 값을 갖는 노드를 추가한다.
for data in range(1, 10):
    double_linked_list.insert(data)

# 더블 링크드 리스트의 모든 노드를 출력해서 확인한다.
double_linked_list.desc()

# 출력 결과
# 0
# 1
# 2
# 3
# 4
# 5
# 6
# 7
# 8
# 9
```

### 연습 3: 위 코드에서 노드 데이터가 특정 숫자인 노드 앞에 데이터를 추가하는 함수를 만들고, 테스트해보기

* 더블 링크드 리스트의 tail에서부터 뒤로 이동하며, 특정 숫자인 노드를 찾는 방식으로 함수를 구현하기
* 테스트: 임의로 0 ~ 9까지 데이터를 링크드 리스트에 넣어보고, 데이터값이 2인 노드 앞에 1.5 데이터값을 가진 노드를 추가해보기

```python
class Node:
    def __init__(self, data, prev=None, next=None):
        self.prev = prev
        self.data = data
        self.next = next

class NodeMgmt:
    # ... insert, desc 함수

    # 특정 data를 검색하는 함수
    # 앞(head)에서부터 검색
    def search_from_head(self, data):
        # head가 없는 경우에도 False를 반환한다.
        if self.head == None:
            return False
    
        # 시작점을 head로 지정
        node = self.head
        # 노드가 존재하는 동안
        while node:
            # 현재 노드의 data 값과 입력받은 data 값이 일치하면
            if node.data == data:
                # 그 노드를 반환한다.
                return node
            else:
                node = node.next
        # 일치하는 노드가 없으면 False를 반환한다.
        return False
    
    # 뒤(tail)에서부터 검색
    def search_from_tail(self, data):
        if self.head == None:
            return False
    
        # 시작점을 tail로 지정
        node = self.tail
        while node:
            if node.data == data:
                return node
            else:
                # next로 이동하는 것 대신 prev로 이동하면 된다.
                node = node.prev
        return False
    
    # 특정 값 '앞'에 노드를 추가하는 함수
    def insert_before(self, data, before_data):
        # head가 없는 경우
        if self.head == None:
            # 받아온 값으로 노드를 생성한다.
            self.head = Node(data)
            return True
        else:
            # 뒤에서부터 노드를 살펴본다.
            node = self.tail
            # 현재 노드의 data와 before_data가 일치할 때까지
            while node.data != before_data:
                # 이전 노드로 이동하고
                node = node.prev
                # 노드가 None이면
                # (data 값이 일치하는 노드가 없어서 처음까지 이동하면)
                if node == None:
                    # False를 반환한다.
                    return False
            # 받아온 data로 새로운 노드를 생성한다.
            new = Node(data)
            # 임시 노드를 생성해 현재 노드의 이전 노드를 담아둔다.
            before_new = node.prev

            # >>>>>>>> 예시 풀이
            # 생성한 노드의 prev는 담아둔(이전) 노드를 가리키도록 한다.
            new.prev = before_new
            # 이전 노드의 next가 생성한 노드를 가리키도록 한다.
            before_new.next = new
            # <<<<<<<<

            # >>>>>>>>
            # 이것도 아래 예시처럼 before_new가 None인 경우에 대한 처리를 해줘야 할 것 같다.
            # 생성한 노드의 prev는 담아둔(이전) 노드를 가리키도록 한다.
            new.prev = before_new
            # 이전 노드의 next가 생성한 노드를 가리키도록 한다.
            if new.prev == None:
                self.head = new
            else:
                before_new.next = new
            # <<<<<<<<

            # 생성한 노드의 next가 현재 노드를 가리키도록 한다.
            new.next = node
            # 현재 노드의 prev가 생성한 노드를 가리키도록 한다.
            node.prev = new
            return True

# 테스트
# 더블 링크드 리스트를 생성해 1 ~ 9까지의 노드를 추가한 뒤 출력해서 확인한다.
double_linked_list = NodeMgmt(0)

for data in range(1, 10):
    double_linked_list.insert(data)

double_linked_list.desc()

# 출력 결과
# 0
# 1
# 2
# 3
# 4
# 5
# 6
# 7
# 8
# 9

# 데이터값이 3인 노드를 tail에서부터 찾아서 받아온다.
node_3 = double_linked_list.search_from_tail(3)
# 받아온 노드의 data 값을 출력한다.
node_3.data # 3

# 2 앞에 data 값이 1.5인 노드를 추가한다.
double_linked_list.insert_before(1.5, 2)
# 더블 링크드 리스트의 노드를 출력해서 확인한다.
double_linked_list.desc()

# 출력 결과
# 0
# 1
# 1.5
# 2
# 3
# 4
# 5
# 6
# 7
# 8
# 9

node_3 = double_linked_list.search_from_tail(1.5)
print(node_3.data) # 1.5
```

### 연습 4: 위 코드에서 노드 데이터가 특정 숫자인 노드 뒤에 데이터를 추가하는 함수를 만들고, 테스트해보기

* 더블 링크드 리스트의 head에서부터 다음으로 이동하며, 특정 숫자인 노드를 찾는 방식으로 함수를 구현하기
* 테스트: 임의로 0 ~ 9까지 데이터를 링크드 리스트에 넣어보고, 데이터값이 1인 노드 다음에 1.7 데이터값을 가진 노드를 추가해보기

```python
class Node:
    def __init__(self, data, prev=None, next=None):
        self.prev = prev
        self.data = data
        self.next = next
​
class NodeMgmt:
    # ... init, insert, desc, insert_befor 함수
​
    def insert_after(self, data, after_data):
        if self.head == None:
            self.head = Node(data)
            return True
        else:
            # 앞에서부터 노드를 살펴본다.
            node = self.head
            # 현재 노드의 data와 after_node가 일치할 때까지
            while node.data != after_data:
                # 다음 노드로 이동하고
                node = node.next
                # 노드가 None이면
                # (data 값이 일치하는 노드가 없어서 마지막까지 이동하면)
                if node == None:
                    # False를 반환한다.
                    return False
            # 받아온 data로 새로운 노드를 생성한다.
            new = Node(data)
            # 임시 노드를 생성해 현재 노드의 다음 노드를 받아둔다.
            after_new = node.next
            # 생성한 노드의 prev는 현재 노드를 가리키도록 한다.
            new.prev = node
            # 현재 노드의 next가 생성한 노드를 가리키도록 한다.
            node.next = new
            # 생성한 노드의 next가 담아둔(다음) 노드를 가리키도록 한다.
            new.next = after_new

            # >>>>>>>> 예시 풀이
            # 생성한 노드의 next(node.next)가 None이면
            # (생성한 노드가 마지막 노드였으면)
            if new.next == None:
                # 생성한 노드를 tail로 지정
                self.tail = new
            # <<<<<<<<

            # >>>>>>>> 이렇게 해야 할 것 같다.
            if new.next == None:
                self.tail = new
            else:
                # 담아둔(다음) 노드의 prev가 생성한 노드를 가리키도록 한다.
                # 이거 왜 풀이에 없지
                after_new.prev = new
            # <<<<<<<<

            return True

# 테스트
# 더블 링크드 리스트를 생성해 1 ~ 9까지의 노드를 추가한 뒤 출력해서 확인한다.
node_mgmt = NodeMgmt(0)
for data in range(1, 10):
    node_mgmt.insert(data)

node_mgmt.desc()

# 1 다음에 값이 1.5인 노드를 추가한다.
node_mgmt.insert_after(1.5, 1)
node_mgmt.desc()

# 출력 결과
# 0
# 1
# 1.5
# 2
# 3
# 4
# 5
# 6
# 7
# 8
# 9
```
