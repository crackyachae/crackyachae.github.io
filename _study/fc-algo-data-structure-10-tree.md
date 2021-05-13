---
layout  : article
title   : Chapter 10. 트리(Tree)
summary : 
date    : 2021-04-21 23:04:18 +0900
updated : 2021-04-22 16:01:49 +0900
tag     : 
toc     : true
public  : true
parent  : [[fc-algo-data-structure]]
latex   : true
---
* TOC
{:toc}

> 이 글은 패스트 캠퍼스 [기술면접 완전 정복 올인원 패키지 Online](https://fastcampus.co.kr/dev_online_algo) 'Chapter 10. 트리(Tree)'의 강의내용을 정리하기 위해 강의 자료를 기반으로 작성한 글입니다.
>
> 강의 노트는 강의 구매자에게만 제공되는 자료이긴 하지만 잔재미 코딩의 [9. 대표적인 자료구조: 트리](https://www.fun-coding.org/Chapter10-tree.html)에서 동일한 자료를 제공하고 있기 때문에 해당 자료를 기반으로 정리한 글을 작성해서 올립니다. 혹시 문제가 되는 경우 바로 내릴 예정이니 알려주시면 감사하겠습니다.
>
> 내용을 이해하기 위한 개인적인 설명이나 해석이 있을 수 있기 때문에 되도록 원문을 참고해주시길 바랍니다.
> 잘못된 부분이 있다면 댓글이나 그 외 편하신 방법으로 알려주시면 감사하겠습니다.

## 1. 트리 (Tree) 구조

* 트리: Node와 Branch를 이용해서, 사이클을 이루지 않도록 구성한 데이터 구조
* 실제로 어디에 많이 사용되나?
* 트리 중 이진 트리 (Binary Tree) 형태의 구조로, 탐색(검색) 알고리즘 구현을 위해 많이 사용됨

## 2. 알아둘 용어

| 분류  | 용어 | 설명 |
| --- | --- | --- |
| 기본| Node | 트리에서 데이터를 저장하는 기본 요소 (데이터와 다른 연결된 노드에 대한 Branch 정보 포함)
| 노드 종류 | Root Node | 트리 맨 위에 있는 노드
| | Parent Node | 어떤 노드의 다음 레벨에 연결된 노드
|| Child Node | 어떤 노드의 상위 레벨에 연결된 노드
| | Leaf Node (Terminal Node) | Child Node가 하나도 없는 노드
| | Sibling (Brother Node) | 동일한 Parent Node를 가진 노드
| 트리 특성 | Level | 최상위 노드를 Level 0으로 하였을 때, 하위 Branch로 연결된 노드의 깊이를 나타냄
| | Depth | 트리에서 Node가 가질 수 있는 최대 Level

![tree](/post-img/fc-algo-data-structure-10-tree/10-1_tree.png)

## 3. 이진 트리와 이진 탐색 트리 (Binary Search Tree)

* 이진 트리: 노드의 최대 Branch가 2인 트리
* 이진 탐색 트리 (Binary Search Tree, BST): 이진 트리에 다음과 같은 추가적인 조건이 있는 트리
    * 왼쪽 노드는 해당 노드보다 작은 값, 오른쪽 노드는 해당 노드보다 큰 값을 가지고 있음!

![binary search tree insertion animation](/post-img/fc-algo-data-structure-10-tree/binary-search-tree-insertion-animation.gif)

(출처: https://www.mathwarehouse.com/programming/gifs/binary-search-tree.php#binary-search-tree-insertion-node)

## 4. 자료 구조 이진 탐색 트리의 장점과 주요 용도

* 주요 용도: 데이터 검색(탐색)
* 장점: 탐색 속도를 개선할 수 있음
* 단점은 이진 탐색 트리 알고리즘 이해 후에 살펴보기로 함

### 이진 트리와 정렬된 배열 간의 탐색 비교

![binary search tree sorted array animation](/post-img/fc-algo-data-structure-10-tree/binary-search-tree-sorted-array-animation.gif)

(출처: https://www.mathwarehouse.com/programming/gifs/binary-search-tree.php#binary-search-tree-insertion-node)

## 5. 파이썬 객체지향 프로그래밍으로 링크드 리스트 구현하기

### 5.1. 노드 클래스 만들기

```python
class Node:
    def __init__(self, value):
        self.value = value
        self.left = None
        self.right = None
```

### 5.2. 이진 탐색 트리에 데이터 넣기

이진 탐색 트리 조건에 부합하게 데이터를 넣어야 함

```python
class NodeMgmt:
    def __init__(self, head):
        # root 노드를 head로 지정
        self.head = head

    def insert(self, value):
        self.current_node = self.head
        while True:
            # 받아온 값보다 현재 노드의 값이 더 크고
            # (받아온 값이 더 작으므로 왼쪽으로 이동해야 한다)
            if value < self.current_node.value:
                # 왼쪽에 노드가 존재하면
                if self.current_node.left != None:
                    # 왼쪽 노드로 이동한다.
                    self.current_node = self.current_node.left
                # 존재하지 않으면
                else:
                    # 현재 노드의 왼쪽에 받아온 값으로 새 노드를 만들어서 연결한다.
                    self.current_node.left = Node(value)
                    break
            # 받아온 값이 더 크고
            # (오른쪽으로 이동해야 한다)
            else:
                # 오른쪽에 노드가 존재하면
                if self.current_node.right != None:
                    # 오른쪽 노드로 이동한다.
                    self.current_node = self.current_node.right
                # 존재하지 않으면
                else:
                    # 현재 노드의 오른쪽에 받아온 값으로 새 노드를 만들어서 연결한다.
                    self.current_node.right = Node(value)

# 테스트
# Root 노드를 생성한다.
head = Node(1)
# Root 노드로 이진 탐색 트리를 만들고
BST = NodeMgmt(head)
# 값이 2인 노드를 집어넣는다.
BST.insert(2)
```

### 5.3. 이진 탐색 트리 탐색

```python
class NodeMgmt:
    # ... init, insert 함수
    
    def search(self, value):
        self.current_node = self.head
        # 현재 노드가 존재하는 동안
        while self.current_node:
            # 현재 노드의 값이 받아온 값과 일치하면
            if self.current_node.value == value:
                # True를 반환한다.
                return True
            # 현재 값보다 받아온 값이 더 작으면,
            elif value < self.current_node.value:
                # 왼쪽으로 이동한다.
                self.current_node = self.current_node.left
            # 현재 값보다 받아온 값이 더 크면
            else:
                # 오른쪽으로 이동한다.
                self.current_node = self.current_node.right
        # 모든 노드를 순회할 동안 일치하는 값이 없는 경우
        # False를 반환한다.
        return False        

# 테스트
head = Node(1)
BST = NodeMgmt(head)
BST.insert(2)
BST.insert(3)
BST.insert(0)
BST.insert(4)
BST.insert(8)

BST.search(8) # True
BST.search(2) # True
BST.search(-1) # False
```

### 5.4. 이진 탐색 트리 삭제

매우 복잡함. 경우를 나누어서 이해하는 것이 좋음

#### 5.4.1. Leaf Node 삭제 (Chile Node가 없을 때)

* Leaf Node: Child Node가 없는 Node
* 삭제할 Node의 Parent Node가 삭제할 Node를 가리키지 않도록 한다.

![tree remove leaf](/post-img/fc-algo-data-structure-10-tree/10-2_tree_remove_leaf.png)

#### 5.4.2. Child Node 가 하나인 Node 삭제

* 삭제할 Node의 'Parent Node'가 삭제할 Node의 'Child Node'를 가리키도록 한다.
    * 삭제할 Node의 전후 Node를 연결해주는 것으로 이해하면 된다.

![tree remove one child](/post-img/fc-algo-data-structure-10-tree/10-3_tree_remove_1child.png)

#### 5.4.3. Child Node가 두 개인 Node 삭제

* 삭제할 Node의 오른쪽 자식(삭제할 Node보다 큰 값) 중, 가장 작은 값을 삭제할 Node의 Parent Node가 가리키도록 한다.
    * 삭제할 Node의 오른쪽 자식 선택
    * 오른쪽 자식의 가장 왼쪽에 있는 Node를 선택
    * 해당 Node를 삭제할 Node의 Parent Node의 왼쪽 Branch가 가리키게 함
    * 해당 Node의 왼쪽 Branch가 삭제할 Node의 왼쪽 Child Node를 가리키게 함
    * 해당 Node의 오른쪽 Branch가 삭제할 Node의 오른쪽 Child Node를 가리키게 함
    * 만약 해당 Node가 오른쪽 Child Node를 가지고 있었을 경우에는
        * (가장 왼쪽 Node이기 때문에 왼쪽 Child Node는 갖지 않는다)
        * 해당 Node의 본래 Parent Node의 왼쪽 Branch가 해당 오른쪽 Child Node를 가리키게 함
        * 즉, 해당 Node를 기준으로 Parent Node가 삭제한 Node 자리로 이동하는 자신 대신, 오른쪽 Childe Node를 가리키는 것이다.
* 삭제할 Node의 왼쪽 자식(삭제할 Node보다 작은 값) 중, 가장 큰 값을 삭제할 Node의 Parent Node가 가리키도록 한다.
    * 위의 경우와 방향과 대소만 반대로 해 주면 된다.

![tree remove two child](/post-img/fc-algo-data-structure-10-tree/10-4_tree_remove_2child.png)

> 위처럼 큰 덩어리의 문제를 세부적으로 나눠서 이해하는 것을 divide and conquer 라고 한다.

### 5.5. 이진 탐색 트리 삭제 코드 구현과 분석

#### 5.5.1 삭제할 Node 탐색

* 삭제할 Node가 없는 경우도 처리해야 함
* 이를 위해 삭제할 Node가 없는 경우는 False를 반환하고, 함수를 종료시킴

```python
# 앞으로 작성할 예시들은 NodeMgmt 클래스 안에 작성한다고 생각하면 된다.

# 먼저 delete 함수부터 작성한다.
# def delete(self, value)

    # 입력값을 갖는 Node를 찾았는지 여부를 나타내는 변수
    searched = False
    
    # 현재 노드
    self.current_node = self.head
    # 현재 노드의 Parent Node
    # 노드를 삭제하려면 해당 노드의 부모 노드에서 삭제해야 하기 때문에 필요하다.
    self.parent = self.head
    while self.current_node:
        # 현재 노드의 값이 입력받은 value와 동일하면
        if self.current_node.value == value:
            # searched를 True로 바꾸고 break
            searched = True
            break
        # 입력받은 값이 현재 노드의 값보다 작으면
        elif value < self.current_node.value:
            # 부모 노드를 현재 노드로 바꿔주고
            self.parent = self.current_node
            # 현재 노드는 현재 노드의 왼쪽 노드로 바꿔준다.
            self.current_node = self.current_node.left
        # 반대의 경우에는
        else:
            self.parent = self.current_node
            # 현재 노드를 현재 노드의 오른쪽 노드로 바꿔준다.
            self.current_node = self.current_node.right
    
    # 값을 찾지 못했으면
    if searched == False:
        # False를 반환하고 종료한다.
        return False
    
    ### 이후부터 Case들을 분리해서, 코드 작성
```

#### 5.5.2. Case 1: 삭제할 Node가 Leaf Node인 경우

![remove leaf node code](/post-img/fc-algo-data-structure-10-tree/10-5_tree_remove_leaf_code.png)

```python
# def delete(self,value)를 이어서 작성한다.
# self.current_node가 삭제할 Node, self.parent는 삭제할 Node의 Parent Node인 상태

    # 현재 노드의 왼쪽과 오른쪽 노드 모두 None일 때
    if  self.current_node.left == None and self.current_node.right == None:
        # 입력받은 value가 부모 노드의 값보다 작으면
        if value < self.parent.value:
            # 부모 노드의 왼쪽 노드를 None으로 설정한다.
            self.parent.left = None
        # 반대의 경우,
        else:
            # 부모 노드의 오른쪽 노드를 None으로 설정한다.
            self.parent.right = None
        # 현재 노드를 삭제한다.
        del self.current_node
```

#### 5.5.2. Case 2: 삭제할 Node가 Child Node를 한 개 가지고 있을 경우

![tree remove one child node code](/post-img/fc-algo-data-structure-10-tree/10-6_tree_remove_1child_code.png)

```python
# def delete(self,value)를 이어서 작성한다.
    
    # 현재 노드의 왼쪽에만 Child Node가 존재할 때
    if self.current_node.left != None and self.current_node.right == None:
        # 입력받은 value가 부모 노드의 값보다 작으면
        if value < self.parent.value:
            # 부모 노드의 왼쪽에 (현재 노드 대신) 현재 노드의 왼쪽(자식) 노드를 연결한다.
            self.parent.left = self.current_node.left
        # 크면
        else:
            # 부모 노드의 오른쪽에 현재 노드의 왼쪽 노드를 연결한다.
            self.parent.right = self.current_node.left
    # 현재 노드의 오른쪽에만 Child Node가 존재할 때
    elif self.current_node.left == None and self.current_node.right != None:
        # 입력받은 value가 부모 노드의 값보다 작으면
        if value < self.parent.value:
            # 부모 노드의 왼쪽에 (현재 노드 대신) 현재 노드의 오른쪽(자식) 노드를 연결한다.
            self.parent.left = self.current_node.right
        else:
            # 부모 노드의 오른쪽에 현재 노드의 오른쪽 노드를 연결한다.
            self.parent.right = self.current_node.right
```

#### 5.5.3. Case3-1: 삭제할 Node가 Child Node를 두 개 가지고 있을 경우 (삭제할 Node가 Parent Node 왼쪽에 있을 때)

![tree remove two child - left node code](/post-img/fc-algo-data-structure-10-tree/10-7_tree_remove_2child_code_left.png)

* 기본 사용 가능 전략
    * 삭제할 Node의 오른쪽 자식 중, 가장 작은 값을 삭제할 Node의 Parent Node가 가리키도록 한다.
    * 삭제할 Node의 왼쪽 자식 중, 가장 큰 값을 삭제할 Node의 Parent Node가 가리키도록 한다.
* 기본 사용 가능 전략 중, 1번 전략을 사용하여 코드를 구현하기로 함
    * 경우의 수가 또다시 두 가지가 있음
        * Case 3-1-1: 삭제할 Node가 Parent Node의 왼쪽에 있고, 삭제할 Node의 오른쪽 자식 중, 가장 작은 값을 가진 Node의 Child Node가 '없을 때'
        * Case 3-1-2: 삭제할 Node가 Parent Node의 왼쪽에 있고, 삭제할 Node의 오른쪽 자식 중, 가장 작은 값을 가진 Node의 오른쪽에 Child Node가 '있을 때'
            * 가장 작은 값을 가진 Node의 Child Node가 왼쪽에 있을 경우는 없음, 왜냐하면 왼쪽 Node가 있다는 것은 해당 Node보다 더 작은 값을 가진 Node가 있다는 뜻이기 때문임

```python
# def delete(self,value)를 이어서 작성한다.

    # case 3
    # 현재 노드의 왼쪽과 오른쪽 모두에 Chile Node가 존재할 때
    if self.current_node.left != None and self.current_node.right != None:
        # case 3-1
        # 입력받은 value가 부모 노드의 값보다 작으면
        if value < self.parent.value:
            # 현재(삭제할) 노드를 대체할 노드(change_node)를 '오른쪽'에서 찾아야한다. 
            # 우선 change_node를 현재 노드의 오른쪽 노드로 지정.
            self.change_node = self.current_node.right
            # change_node 역시 제거해서 옮겨야 하므로 change_node의 부모도 알아야한다.
            # change_node_parent를 현재 노드의 오른쪽 노드로 지정
            self.change_node_parent = self.current_node.right
            
            # change_node의 왼쪽 노드가 None일 때까지 
            while self.change_node.left != None:
                # change_node의 parent를 change_node로 옮기고
                self.change_node_parent = self.change_node
                # change_node는 자신의 '왼쪽'으로 이동한다.
                self.change_node = self.change_node.left
            
            # change_node의 오른쪽 노드가 None이 아니면
            if self.change_node.right != None:
                # change_node의 부모의 왼쪽이 change_node가 아닌 해당 노드의 오른쪽 노드를 가리키게 한다.
                self.change_node_parent.left = self.change_node.right
            # None이면
            else:
                # change_node의 부모의 왼쪽에 아무것도 연결하지 않는다.
                # (그냥 해당 노드를 끊어낸다.)
                self.change_node_parent.left = None
            
            # 삭제할 노드의 부모노드의 왼쪽에 change_node를 연결한다.
            self.parent.left = self.change_node
            # change_node의 오른쪽에 삭제할 노드의 오른쪽 노드를 연결한다.
            self.change_node.right = self.current_node.right
            # change_node의 왼쪽에 삭제할 노드의 왼쪽 노드를 연결한다.
            self.change_node.left = self.change_node.left
```

#### 5.5.4. Case 3-2: 삭제할 Node가 Child Node를 두 개 가지고 있을 경우 (삭제할 Node가 Parent Node 오른쪽에 있을 때)

![tree remove two child - right node code](/post-img/fc-algo-data-structure-10-tree/10-8_tree_remove_2child_code_right.png)

* 기본 사용 가능 전략
    * 삭제할 Node의 오른쪽 자식 중, 가장 작은 값을 삭제할 Node의 Parent Node가 가리키도록 한다.
    * 삭제할 Node의 왼쪽 자식 중, 가장 큰 값을 삭제할 Node의 Parent Node가 가리키도록 한다.
* 기본 사용 가능 전략 중, 1번 전략을 사용하여 코드를 구현하기로 함
    * 경우의 수가 또다시 두 가지가 있음
        * Case 3-2-1: 삭제할 Node가 Parent Node의 오른쪽에 있고, 삭제할 Node의 오른쪽 자식 중, 가장 작은 값을 가진 Node의 Child Node가 없을 때
        * Case 3-2-2: 삭제할 Node가 Parent Node의 오른쪽에 있고, 삭제할 Node의 오른쪽 자식 중, 가장 작은 값을 가진 Node의 오른쪽에 Child Node가 있을 때
            * 가장 작은 값을 가진 Node의 Child Node가 왼쪽에 있을 경우는 없음, 왜냐하면 왼쪽 Node가 있다는 것은 해당 Node보다 더 작은 값을 가진 Node가 있다는 뜻이기 때문임

PIC

```python
        # case 3-2
        # 입력받은 value가 부모 노드의 값보다 크면
        # 현재 노드가 parent의 오른쪽에 있다는 것 빼고 동일하다.
        # 즉 코드 자체가 거의 동일하다.
        else:
            self.change_node = self.current_node.right
            self.change_node_parent = self.current_node.right
            while self.change_node.left != None:
                self.change_node_parent = self.change_node
                self.change_node = self.change_node.left
            if self.change_node.right != None:
                self.change_node_parent.left = self.change_node.right
            else:
                self.change_node_parent.left = None
           
            # 삭제할 노드의 부모 노드의 오른쪽에 change_node를 연결한다.
            self.parent.right = self.change_node
            self.change_node.left = self.current_node.left
            self.change_node.right = self.current_node.right
```

#### 5.5.5. 파이썬 전체 코드 구현

```python
class Node:
    def __init__(self, value):
        self.value = value
        self.left = None
        self.right = None

class NodeMgmt:
    def __init__(self, head):
        self.head = head

    def insert(self, value):
        self.current_node = self.head
        while True:
            if value < self.current_node.value:
                if self.current_node.left != None:
                    self.current_node = self.current_node.left
                else:
                    self.current_node.left = Node(value)
                    break
            else:
                if self.current_node.right != None:
                    self.current_node = self.current_node.right
                else:
                    self.current_node.right = Node(value)
                    break
    
    def search(self, value):
        self.current_node = self.head
        while self.current_node:
            if self.current_node.value == value:
                return True
            elif value < self.current_node.value:
                self.current_node = self.current_node.left
            else:
                self.current_node = self.current_node.right
        return False        
    
    # 완성된 delete 메소드
    def delete(self, value):
        # 삭제할 노드 탐색
        searched = False
        self.current_node = self.head
        self.parent = self.head
        while self.current_node:
            if self.current_node.value == value:
                searched = True
                break
            elif value < self.current_node.value:
                self.parent = self.current_node
                self.current_node = self.current_node.left
            else:
                self.parent = self.current_node
                self.current_node = self.current_node.right

        if searched == False:
            return False

        # case 1
        if  self.current_node.left == None and self.current_node.right == None:
            if value < self.parent.value:
                self.parent.left = None
            else:
                self.parent.right = None

        # case 2
        elif self.current_node.left != None and self.current_node.right == None:
            if value < self.parent.value:
                self.parent.left = self.current_node.left
            else:
                self.parent.right = self.current_node.left
        elif self.current_node.left == None and self.current_node.right != None:
            if value < self.parent.value:
                self.parent.left = self.current_node.right
            else:
                self.parent.right = self.current_node.right        
        
        # case 3
        elif self.current_node.left != None and self.current_node.right != None:
            # case 3-1
            if value < self.parent.value:
                self.change_node = self.current_node.right
                self.change_node_parent = self.current_node.right
                while self.change_node.left != None:
                    self.change_node_parent = self.change_node
                    self.change_node = self.change_node.left
                if self.change_node.right != None:
                    self.change_node_parent.left = self.change_node.right
                else:
                    self.change_node_parent.left = None
                self.parent.left = self.change_node
                self.change_node.right = self.current_node.right
                self.change_node.left = self.change_node.left
            # case 3-2
            else:
                self.change_node = self.current_node.right
                self.change_node_parent = self.current_node.right
                while self.change_node.left != None:
                    self.change_node_parent = self.change_node
                    self.change_node = self.change_node.left
                if self.change_node.right != None:
                    self.change_node_parent.left = self.change_node.right
                else:
                    self.change_node_parent.left = None
                self.parent.right = self.change_node
                self.change_node.right = self.current_node.right
                self.change_node.left = self.current_node.left

        return True
```

참고: http://ejklike.github.io/2018/01/09/traversing-a-binary-tree-1.html

#### 5.5.6. 파이썬 전체 코드 테스트

* random 라이브러리 활용
    * random.randint(첫 번째 숫자, 마지막 숫자): 첫 번째 숫자부터 마지막 숫자 사이에 있는 숫자를 랜덤하게 선택해서 반환
        * 예: random.randint(0, 99): 0에서 99까지 숫자 중 특정 숫자를 랜덤하게 선택해서 반환해줌

```python
# 0~999 숫자 중에서 임의로 100개를 추출해서, 이진 탐색 트리에 입력, 검색, 삭제
import random

# 0~999 중, 100개의 숫자 랜덤 선택
# 중복을 피하기 위해 set()를 이용한다.
bst_nums = set()
while len(bst_nums) != 100:
    # 0 ~ 999 사이의 숫자 중 100개를 set에 추가한다.
    # 추가할 때 중복은 자동으로 방지된다.
    # (그래서 실제로 실행이 100번 이상 될 확률이 높다)
    bst_nums.add(random.randint(0, 999))

# 입력한 100개의 숫자를 확인한다.
print (bst_nums)

# 선택된 100개의 숫자를 이진 탐색 트리에 입력, 임의로 루트 노드는 500을 넣기로 함
# 중간값을 넣어야 tree가 좌우 균형 있게 생성될 확률이 높기 때문이다.
head = Node(500)
binary_tree = NodeMgmt(head)
for num in bst_nums:
    binary_tree.insert(num)

# 입력한 100개의 숫자 검색 (검색 기능 확인)
# 이진 탐색 트리를 제대로 구현했으면 bst_nums의 모든 원소를 트리에서 찾을 수 있어야 하기 때문에 아무것도 출력되지 않아야 한다.
for num in bst_nums:
    # 검색 결과가 False이면
    if binary_tree.search(num) == False:
        # 경고문을 출력한다.
        print ('search failed', num)

# 입력한 100개의 숫자 중 10개의 숫자를 랜덤 선택
delete_nums = set()
# bst_nums를 리스트 타입으로 변경
bst_nums = list(bst_nums)
while len(delete_nums) != 10:
    # bst_nums중 무작위로 10개를 고른다.
    delete_nums.add(bst_nums[random.randint(0, 99)])

# 선택한 10개의 숫자를 삭제 (삭제 기능 확인)
# 이진 탐색 트리를 제대로 구현했으면 delete_nums의 모든 원소를 트리에서 찾을 수 있어야 하기 때문에 아무것도 출력되지 않아야 한다.
for del_num in delete_nums
    if binary_tree.delete(del_num) == False:
        print('delete failed', del_num)
```

## 6. 이진 탐색 트리의 시간 복잡도와 단점

### 6.1. 시간 복잡도 (탐색 시)

* depth (트리의 높이)를 h라고 표기한다면, $O(h)$
* n개의 노드를 가진다면, $h = log2n$ 에 가까우므로, 시간 복잡도는 $O(logn)$
    * 참고: 빅오 표기법에서 $logn$ 에서의 log의 밑은 10이 아니라, 2입니다.
        * 한번 실행 시마다, 50%의 실행할 수도 있는 명령을 제거한다는 의미. 즉 50%의 실행 시간을 단축할 수 있다는 것을 의미함

![binary search tree sorted array animation](/post-img/fc-algo-data-structure-10-tree/binary-search-tree-sorted-array-animation.gif)

(출처: https://www.mathwarehouse.com/programming/gifs/binary-search-tree.php#binary-search-tree-insertion-node)

### 6.2. 이진 탐색 트리 단점

* 평균 시간 복잡도는 $O(logn)$ 이지만,
    * 이는 트리가 균형 잡혀 있을 때의 평균 시간복잡도이며,
    * 다음 예와 같이 구성되어 있을면, 최악의 경우는 링크드 리스트 등과 동일한 성능을 보여줌 ($O(n)$)

![binary search tree worst case](/post-img/fc-algo-data-structure-10-tree/10-9_worstcase_bst.png)
