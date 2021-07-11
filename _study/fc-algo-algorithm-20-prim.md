---
layout  : article
title   : "Chapter 20. 최소 신장 트리의 이해: 프림 알고리즘(Prim's Algorithm)"
summary : 
date    : 2021-07-05 19:13:53 +0900
updated : 2021-07-07 23:03:25 +0900
tag     : 
toc     : true
public  : true
parent  : [[fc-algo-algorithm]]
latex   : true
---
* TOC
{:toc}

> 이 글은 패스트 캠퍼스 [기술면접 완전 정복 올인원 패키지 Online](https://fastcampus.co.kr/dev_online_algo) 'Chapter 20. 최소 신장 트리의 이해: 프림 알고리즘(Prim's Algorithm)'의 강의내용을 정리하기 위해 강의 자료를 기반으로 작성한 글입니다.
>
> 강의 노트는 강의 구매자에게만 제공되는 자료이긴 하지만 잔재미 코딩의 [7. 최소 신장 트리 (Prim's algorithm)](https://www.fun-coding.org/Chapter20-prim-live.html)에서 동일한 자료를 제공하고 있기 때문에 해당 자료를 기반으로 정리한 글을 작성해서 올립니다. 혹시 문제가 되는 경우 바로 내릴 예정이니 알려주시면 감사하겠습니다.
>
> 내용을 이해하기 위한 개인적인 설명이나 해석이 있을 수 있기 때문에 되도록 원문을 참고해주시길 바랍니다.
> 잘못된 부분이 있다면 댓글이나 그 외 편하신 방법으로 알려주시면 감사하겠습니다.

## 1. 프림 알고리즘 (Prim's algorithm)

* 대표적인 최소 신장 트리 알고리즘
    * Kruskal’s algorithm (크루스칼 알고리즘), Prim's algorithm (프림 알고리즘)

### 프림 알고리즘

* 시작 정점을 선택한 후,
* 정점에 인접한 간선 중 최소 간선으로 연결된 정점을 선택하고,
* 해당 정점에서 다시 최소 간선으로 연결된 정점을 선택하는 방식으로 최소 신장 트리를 확장해가는 방식

### Kruskal's algorithm 과 Prim's algorithm 비교

* 둘 다, 탐욕 알고리즘을 기초로 하고 있음 (당장 눈앞의 최소 비용을 선택해서, 결과적으로 최적의 솔루션을 찾음)
* 크루스칼 알고리즘은 '전체 간선' 중에서 가장 가중치가 작은 간선부터 선택하면서 MST를 구함
* 프림 알고리즘은 특정 정점에서 시작, '해당 정점에 연결된 간선' 중 가장 가중치가 작은 간선을 선택,
    * 즉 정점을 확장해가면서 '현재 MST를 구성하고 있는 정점들에 연결된 간선' 중에서 가장 가중치가 작은 간선을 택하는 방식으로 MST를 구함

## 2. 그림으로 이해하는 프림 알고리즘

1. 임의의 정점을 선택, '연결된 노드 집합'에 삽입
1. 선택된 정점에 연결된 간선들을 '간선 리스트'에 삽입
1. 간선 리스트에서 최소 가중치를 가지는 간선부터 추출해서,
    * 해당 간선에 연결된 인접 정점이 '연결된 노드 집합'에 이미 들어 있다면, 건너뜀(cycle 발생을 막기 위함)
    * 해당 간선에 연결된 인접 정점이 '연결된 노드 집합'에 들어 있지 않으면, 해당 간선을 선택하고, 해당 간선 정보를 '최소 신장 트리'에 삽입
1. 추출한 간선은 간선 리스트에서 제거
1. 간선 리스트에 더 이상의 간선이 없을 때까지 3~4번을 반복

![prim 1](/post-img/fc-algo-algorithm-20-prim/1_prim1.png)

위 그림의 진행 과정은 다음과 같다. 붉은색이 지금까지 연결된 노드와 간선을 나타낸다.

1. 임의의 정점 A를 선택한다.
    * A를 '연결된 노드 집합(파란 테두리 처리)'에, A에 연결된 두 간선을 '간선 리스트(빨간 줄 처리)'에 삽입한다.
    * 간선 리스트의 두 간선 중 최소 가중치를 갖는 것은 가중치가 5인 A - D를 잇는 간선이다.
    * 이를 간선 리스트에서 추출한 뒤 이 간선으로 A와 연결된 D를 연결된 노드 집합에 삽입한다.
2. D에 대해서 위의 과정을 반복한다.
    * D에 연결된 세 간선(6, 7, 9)을 간선 리스트에 삽입한다.
    * 간선 리스트 중 D - F를 잇는 간선이 최소 가중치(6)를 가지므로 추출한다.
    * D와 위의 간선으로 연결된 F를 연결된 노드 집합에 삽입한다.

![prim 2](/post-img/fc-algo-algorithm-20-prim/2_prim2.png)

3. F에 대해서 위의 과정을 반복한다.
    * F에 연결된 두 간선(8, 11)을 간선 리스트에 삽입한다.
    * 간선 리스트 중 A - B를 잇는 간선이 최소 가중치(7)를 가지므로 추출한다.
        * 동일한 가중치를 갖는 D - E를 선택해도 상관없다.
    * 연결된 노드 집합 안의 A와 위의 간선으로 연결된 B를 연결된 노드 집합에 삽입한다.
4. B에 대해서 위의 과정을 반복한다.
    * B에 연결된 간선(8)을 간선 리스트에 삽입한다. 다른 간선은 이미 이전에 간선 리스트에 추가되었다.
    * 간선 리스트 중 B - E를 잇는 간선이 최소 가중치(7)를 가지므로 추출한다.
    * B와 위의 간선으로 연결된 E를 연결된 노드 집합에 삽입한다.

![prim 3](/post-img/fc-algo-algorithm-20-prim/3_prim3.png)

5. E에 대해서 위의 과정을 반복한다.
    * E에 연결된 간선(5, 9)을 간선 리스트에 삽입한다. 다른 간선은 이미 이전에 간선 리스트에 추가되었다.
    * 간선 리스트 중 E - C를 잇는 간선이 최소 가중치(5)를 가지므로 추출한다.
    * E와 위의 간선으로 연결된 C를 연결된 노드 집합에 삽입한다.
6. C에 대해서 위의 과정을 반복한다.
    * C의 모든 간선이 간선 리스트에 추가된 상태이므로 간선은 더 추가하지 않는다.
    * 간선 리스트 중 E - D(7), B - C(8), E - F(8), B - D(9) 순으로 최소 가중치를 가지므로 추출하지만 연결하면 사이클이 형성되기 때문에 노드를 연결하지는 않는다.
    * 위의 간선을 추출하고 남는 간선 E - G, F - G 중 최소 가중치(9)를 갖는 E - G를 추출한다.
    * 연결된 노드 집합 안의 E와 위의 간선으로 연결된 G를 연결된 노드 집합에 삽입한다.
    * 모든 노드가 연결되었으므로 종료한다.

## 3. 프림 알고리즘 (Prim's algorithm) 코드 작성

### 참고: heapq 라이브러리 활용을 통해 우선순위 큐 사용하기

`heapq.heappush`를 통해 데이터를 heap 형태로 넣을 수 있음 (0번 인덱스를 우선순위로 인지함)

```python
import heapq

queue = []
graph_data = [[2, 'A'], [5, 'B'], [3, 'C']]

for edge in graph_data:
    heapq.heappush(queue, edge)

for index in range(len(queue)):
    print(heapq.heappop(queue))
    # 출력 결과
    # [2, 'A']
    # [3, 'C']
    # [5, 'B']

print(queue)
# []
# 모두 pop 했기 때문에 queue에 남아있는 원소가 없다.
```

`heapq.heapify()` 함수를 통해 리스트 데이터를 heap 형태로 한 번에 변환할 수 있음 (0번 인덱스를 우선순위로 인지함)

```python
import heapq

graph_data = [[2, 'A'], [5, 'B'], [3, 'C']]

heapq.heapify(graph_data)

for index in range(len(graph_data)):
    print(heapq.heappop(graph_data))
    # 출력 결과
    # [2, 'A']
    # [3, 'C']
    # [5, 'B']

print(graph_data)
# []
```

### 참고: collections 라이브러리의 defaultdict 함수 활용하기

`defaultdict` 함수를 사용해서, key에 대한 value를 지정하지 않았을 시, 빈 리스트로 초기화하기

```python
from collections import defaultdict

list_dict = defaultdict(list)

print(list_dict['key1'])
# []
# key1에 대한 value를 별도로 지정하지 않았지만
# error를 출력하지 않고 key1으로 초기화한 결과를 출력
```

### 프림 알고리즘 파이썬 코드

1. 모든 간선 정보를 저장 (`adjacent_edges`)
1. 임의의 정점을 선택, '연결된 노드 집합(`connected_nodes`)'에 삽입
1. 선택된 정점에 연결된 간선들을 간선 리스트(`candidate_edge_list`)에 삽입
1. 간선 리스트(`candidate_edge_list`)에서 최소 가중치를 가지는 간선부터 추출해서,
    * 해당 간선에 연결된 인접 정점이 '연결된 노드 집합'에 이미 들어 있다면, 건너뜀(cycle 발생을 막기 위함)
    * 해당 간선에 연결된 인접 정점이 '연결된 노드 집합'에 들어 있지 않으면, 해당 간선을 선택하고, 해당 간선 정보를 '최소 신장 트리(mst)'에 삽입
        * 해당 간선에 연결된 인접 정점의 간선 중, '연결된 노드 집합(`connected_nodes`)' 에 없는 노드와 연결된 간선들만 간선 리스트(`candidate_edge_list`) 에 삽입
            * '연결된 노드 집합(`connected_nodes`)' 에 있는 노드와 연결된 간선들을 간선 리스트에 삽입해도, 해당 간선은 스킵 될 것이기 때문임
            * 어차피 스킵 될 간선을 간선 리스트(`candidate_edge_list`)에 넣지 않으므로 해서, 간선 리스트(`candidate_edge_list`)에서 최소 가중치를 가지는 간선부터 추출하기 위한 자료구조 유지를 위한 effort를 줄일 수 있음 (예, 최소 힙 구조 사용)
1. 선택된 간선은 간선 리스트에서 제거
1. 간선 리스트에 더 이상의 간선이 없을 때까지 3~4번을 반복

```python
# 간선 정보
myedges = [
    (7, 'A', 'B'), (5, 'A', 'D'),
    # 중복된 간선은 추가로 작성하지 않는다.
    # e.g., (7, B, A)는 중복이기 때문에 따로 작성하지 않음.
    (8, 'B', 'C'), (9, 'B', 'D'), (7, 'B', 'E'),
    (5, 'C', 'E'),
    (7, 'D', 'E'), (6, 'D', 'F'),
    (8, 'E', 'F'), (9, 'E', 'G'),
    (11, 'F', 'G')
]


from collections import defaultdict
from heapq import *

def prim(start_node, edges):
    # 최소 신장 트리 간선 리스트
    mst = list()
    # 각 노드를 key로 해당 노드에 연결된 간선 리스트를 value로 하는 딕셔너리
    adjacent_edges = defaultdict(list)
    
    # 그래프 구성
    for weight, n1, n2 in edges:
        adjacent_edges[n1].append((weight, n1, n2))
        adjacent_edges[n2].append((weight, n2, n1))

    # 연결된(최소 신장 트리에 포함된) 노드의 집합
    connected_nodes = set(start_node)
    # 최솟값을 고를 간선 후보
    # 출발 노드에 연결된 간선 리스트로 초기화한다.
    candidate_edge_list = adjacent_edges[start_node]
    # 최소 가중치를 갖는 간선을 추출하기 위해 간선 리스트를 heapify 한다.
    heapify(candidate_edge_list)

    # 간선 리스트 후보가 존재하는 동안
    while candidate_edge_list:
        # 최소 가중치 간선 리스트를 pop 한 뒤
        weight, n1, n2 = heappop(candidate_edge_list)
        
        # 현재 정점(n1)의 인접 정점(n2)이 connected_nodes에 없으면
        if n2 not in connected_nodes:
            # 이를 추가한 뒤
            connected_nodes.add(n2)
            # 해당 간선을 mst에 추가한다.
            mst.append((weight, n1, n2))
            
            # 추가한 정점(n2)에 연결된 간선 리스트에 대해
            for edge in adjacent_edges[n2]:
                # 그 간선이 연결하는 정점이 connected_nodes에 없을 때만
                # (connected_nodes에 존재하면 어차피 mst에 들어갈 수 없기 때문에)
                if edge[2] not in connected_nodes:
                    # 해당 간선 리스트를 후보에 추가한다.
                    heappush(candidate_edge_list, edge)

    # mst를 반환한다.
    return mst


prim ('A', myedges)
# 출력 결과
# [(5, 'A', 'D'),
#  (6, 'D', 'F'),
#  (7, 'A', 'B'),
#  (7, 'B', 'E'),
#  (5, 'E', 'C'),
#  (9, 'E', 'G')]
```

## 4. 시간 복잡도

최악의 경우, 간선이 $E$ 개일 때, while 구문에서 모든 간선에 대해 반복하고, 최소 힙 구조를 사용하므로 $O(E\log E)$ 시간 복잡도를 가짐

### 참고: 개선된 프림 알고리즘

간선이 아닌 '노드'를 중심으로 우선순위 큐를 적용하는 방식

* 간선보다 노드의 수가 더 적다.
* 노드마다 key 값을 갖는다.

#### 개선된 프림 알고리즘

* 초기화
    * `정점: key` 구조를 만들어놓고, 특정 정점의 key 값은 0, 이외의 정점들의 key 값은 무한대(`inf`)로 놓음.
    * 모든 `정점: key` 값은 우선순위 큐에 넣음
* 가장 key 값이 적은 `정점: key`를 추출한 후
    * pop 하므로 해당 `정점: key` 정보는 우선순위 큐에서 삭제됨
    * extract min 로직이라고 부름
* 해당 정점의 인접한 정점들에 대해 그 '정점의 key 값'과 그 '정점을 연결하는 간선의 가중치 값'을 비교하여 가중치 값이 key 값값보다 작으면 해당 `정점: key` 값을 갱신
    * `정점: key` 값 갱신 시, 우선순위 큐는 최소 key 값을 가지는 `정점: key`를 루트 노드로 올려놓도록 재구성함
        * 원래는 heap에 원소를 push 하거나 pop 할 때 재정렬이 일어나는데, 값을 '갱신' 할 때도 재정렬을 하도록 하는 것.
        * decrease key 로직이라고 부름
    * `정점: key`를 갱신한 간선의 정보를 따로 저장해 놓고 해당 `정점: key`를 pop 할 때, 그 정점을 잇는 간선을 `mst`에 추가한다.

#### 개선된 프림 알고리즘 구현 시 고려 사항

* 우선순위 큐(최소 힙) 구조에서, 이미 들어가 있는 데이터의 값 변경 시, 최솟값을 가지는 데이터를 루트 노드로 올려놓도록 재구성하는 기능이 필요함
* 구현 복잡도를 줄이기 위해, `heapdict` 라이브러리를 통해, 해당 기능을 간단히 구현

```python
from heapdict import heapdict

def prim(graph, start):

    # 최소 간선 리스트
    mst = list()
    # 정점: key를 원소로 하는 최소 힙
    keys = heapdict()
    # 해당 노드를 어느 노드의 간선이 갱신했는가를 저장
    # pi[B] = A: B가 A로부터 나온 간선에 의해 업데이트됨
    pi = dict() 
    # 전체 가중치의 합을 저장할 변수
    total_weight = 0
    
    # 초기화
    for node in graph.keys():
        keys[node] = float('inf')
        pi[node] = None
    keys[start], pi[start] = 0, start

    # keys의 원소가 존재하는 동안
    while keys:
        # key 값이 최소인 노드와 key 값을 pop 한다.
        current_node, current_key = keys.popitem()
        # 간선을 리스트에 추가한다.
        mst.append([pi[current_node], current_node, current_key])
        # weight를 추가
        total_weight += current_key
        
        # 현재 노드의 인접한 노드에 대해
        for adjacent, weight in mygraph[current_node].items():
            # 해당 노드가 keys에 존재하고 (이미 pop 되지 않았고)
            # 그 노드로 향하는 간선의 가중치가, 해당 노드의 key 값보다 작으면
            if adjacent in keys and weight < keys[adjacent]:
                # 해당 노드의 key 값을 간선의 가중치로 갱신
                # keys의 재정렬이 자동으로 일어난다.
                keys[adjacent] = weight
                # 해당 노드를 갱신시킨 노드를 현재 노드로 바꾼다.
                pi[adjacent] = current_node
    
    return mst, total_weight


mygraph = {
    'A': {'B': 7, 'D': 5},
    'B': {'A': 7, 'D': 9, 'C': 8, 'E': 7},
    'C': {'B': 8, 'E': 5},
    'D': {'A': 5, 'B': 9, 'E': 7, 'F': 6},
    'E': {'B': 7, 'C': 5, 'D': 7, 'F': 8, 'G': 9},
    'F': {'D': 6, 'E': 8, 'G': 11},
    'G': {'E': 9, 'F': 11}
}
mst, total_weight = prim(mygraph, 'A')

print('MST:', mst)
# MST: [['A', 'A', 0], ['A', 'D', 5], ['D', 'F', 6], ['A', 'B', 7], ['D', 'E', 7], ['E', 'C', 5], ['E', 'G', 9]]
print('Total Weight:', total_weight)
# Total Weight: 39
```

### 개선된 프림 알고리즘의 시간 복잡도: $O(E\log V)$

* 노드 수: $V$, 간선 수: $E$

위 코드를 세 부분으로 나눠서 시간 복잡도를 보면

* 최초 key 생성 시간 복잡도 (초기화): $O(V)$
* while 구문과 keys.popitem() 의 시간 복잡도는 $O(V\log V)$
    * while 구문은 V(노드 개수)번 실행됨
    * heap에서 최소 key 값을 가지는 노드 정보 추출 시(pop)의 시간 복잡도: $O(\log V)$
* for 구문의 총 시간 복잡도는 $O(E\log V)$
    * for 구문은 while 구문 반복 시에 결과적으로 총 최대 간선의 수 $E$만큼 실행 가능 $O(E)$
    * for 구문 안에서 key 값 변경 시마다 heap 구조를 변경해야 하며, heap에는 최대 V 개의 정보가 있으므로 $O(\log V)$

> 일반적인 heap 자료 구조 자체에는 본래 heap 내부의 데이터 우선순위 변경 시, 최소 우선순위 데이터를 루트 노드로 만들어주는 로직은 없음. 이를 decrease key 로직이라고 부름, 해당 로직은 `heapdict` 라이브러리를 활용해서 간단히 적용 가능

따라서 총 시간 복잡도는 $O(V + V\log V + ElogV)$ 이며,

* $O(V)$는 전체 시간 복잡도에 큰 영향을 미치지 않으므로 삭제,
* E > V이므로 (최대 V2 = E가 될 수 있음), $O((V + E)\log V)$ 는 간단하게 $O(ElogV)$ 로 나타낼 수 있음
