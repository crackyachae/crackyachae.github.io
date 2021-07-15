---
layout  : article
title   : "Chapter 20. 그래프 고급 탐색 알고리즘"
summary : 
date    : 2021-07-04 21:25:32 +0900
updated : 2021-07-05 12:24:05 +0900
tag     : 
toc     : true
public  : true
parent  : [[fc-algo-algorithm]]
latex   : true
---
* TOC
{:toc}

> 이 글은 패스트 캠퍼스 [기술면접 완전 정복 올인원 패키지 Online](https://fastcampus.co.kr/dev_online_algo) 'Chapter 20. 그래프 고급 탐색 알고리즘: 최단 경로 알고리즘 이해'의 강의내용을 정리하기 위해 강의 자료를 기반으로 작성한 글입니다.
>
> 강의 노트는 강의 구매자에게만 제공되는 자료이긴 하지만 잔재미 코딩의 [5. 최단 경로 알고리즘의 이해](https://www.fun-coding.org/Chapter20-shortest-live.html)에서 동일한 자료를 제공하고 있기 때문에 해당 자료를 기반으로 정리한 글을 작성해서 올립니다. 혹시 문제가 되는 경우 바로 내릴 예정이니 알려주시면 감사하겠습니다.
>
> 내용을 이해하기 위한 개인적인 설명이나 해석이 있을 수 있기 때문에 되도록 원문을 참고해주시길 바랍니다.
> 잘못된 부분이 있다면 댓글이나 그 외 편하신 방법으로 알려주시면 감사하겠습니다.

## 1. 최단 경로 문제란?

* 최단 경로 문제란 두 노드를 잇는 가장 짧은 경로를 찾는 문제
* 가중치 그래프(weighted graph)에서 간선(edge)의 가중치 합이 최소가 되도록 하는 경로를 찾는 것이 목적

### 최단 경로 문제 종류

* 단일 출발 및 단일 도착 (single-source and single-destination shortest path problem) 최단 경로 문제
    * 그래프 내의 특정 노드 u에서 출발해서 또 다른 특정 노드 v에 도착하는 가장 짧은 경로를 찾는 문제
* 단일 출발 (single-source shortest path problem) 최단 경로 문제
    * 그래프 내의 특정 노드 u와 그래프 내 다른 '모든' 노드 '각각'의 가장 짧은 경로를 찾는 문제
    > 명확히 하자면, 예를 들어 A, B, C, D라는 노드를 가진 그래프에서 특정 노드를 A라고 한다면, A 외 모든 노드인 B, C, D 각 노드와 A 간에 (즉, A - B, A - C, A - D) 각각 가장 짧은 경로를 찾는 문제를 의미함
* 전체 쌍(all-pair) 최단 경로: 그래프 내의 모든 노드 쌍 (u, v)에 대한 최단 경로를 찾는 문제

## 2. 최단 경로 알고리즘 - 다익스트라 알고리즘

* 가장 유명한 그래프 최단 경로 알고리즘 중 하나이다.
* 다익스트라 알고리즘은 위의 최단 경로 문제 종류 중, 두 번째에 해당
    * 하나의 정점에서 다른 모든 정점 간의 각각 가장 짧은 거리를 구하는 문제

### 다익스트라 알고리즘 로직

* 첫 정점을 기준으로 연결된 정점들을 추가해 가며, 최단 거리를 갱신하는 기법
* 다익스트라 알고리즘은 너비 우선 탐색(BFS)와 유사
    * 첫 정점부터 각 노드 간의 거리를 저장하는 배열을 만든 후, 첫 정점의 인접 노드 간의 거리부터 먼저 계산하면서, 첫 정점부터 해당 노드 간의 가장 짧은 거리를 해당 배열에 업데이트
    * depth에 따라 탐색을 진행한다는 점에서 유사하다.

> 다익스트라 알고리즘의 다양한 변형 로직이 있지만, 가장 개선된 '우선순위 큐'를 사용하는 방식에 집중해서 설명하기로 함

### 우선순위 큐를 활용한 다익스트라 알고리즘

우선순위 큐는 MinHeap 방식을 활용해서, 현재 가장 짧은 거리를 가진 노드 정보를 먼저 꺼내게 됨

1. 첫 정점을 기준으로 배열을 선언하여 첫 정점에서 각 정점까지의 거리를 저장
    * 초기에는 첫 정점의 거리는 0, 나머지는 무한대로 저장함 (`inf` 라고 표현함)
    * 우선순위 큐에 (첫 정점, 거리 0) 만 먼저 넣음
        * 첫 노드를 업데이트한 것으로 볼 수 있다.
1. 우선순위 큐에서 노드를 꺼냄
    * 처음에는 첫 정점만 저장되어 있기 때문에, 첫 정점이 꺼내진다.
    * 첫 정점에 인접한 노드들 각각에 대해, 첫 정점에서 각 노드로 가는 거리와 현재 배열에 저장된 값(i.e., 이전까지의 첫 정점에서 각 정점까지의 거리)을 비교한다.
    * 배열에 저장된 거리보다, 첫 정점에서 해당 노드로 가는 거리가 더 짧을 경우, 배열에 해당 노드의 거리를 업데이트한다.
    * 배열에 해당 노드의 거리가 업데이트된 경우, 우선순위 큐에 넣는다.
        * 결과적으로 너비 우선 탐색 방식과 유사하게, 첫 정점에 인접한 노드들을 순차적으로 방문하게 됨
        * 만약 배열에 기록된 현재까지 발견된 가장 짧은 거리보다, 더 긴 거리(루트)를 가진 (노드, 거리)의 경우에는 해당 노드와 인접한 노드 간의 거리 계산을 하지 않음
1. 2번의 과정을 우선순위 큐에 꺼낼 노드가 없을 때까지 반복한다.

## 3. 예제로 이해하는 다익스트라 알고리즘 (우선순위 큐 활용)

![dijkstra](/post-img/fc-algo-algorithm-20-shortest/1_dijkstra.png)

### 1단계: 초기화

* 첫 정점(e.g., A)을 기준으로 배열을 선언하여 첫 정점에서 각 정점까지의 거리를 저장
    * 초기에는 첫 정점의 거리는 0, 나머지는 무한대로 저장함 (inf 라고 표현함)
    * 우선순위 큐에 (첫 정점(A), 거리 0) 만 먼저 넣음

![dijkstra initialize](/post-img/fc-algo-algorithm-20-shortest/2_dijkstra_initial.png)

### 2단계: 우선순위 큐에서 추출한 (A, 0) [노드, 첫 노드와의 거리]를 기반으로 인접한 노드와의 거리 계산

* 우선순위 큐에서 노드를 꺼냄
    * 처음에는 첫 정점만 저장되어 있기 때문에, 첫 정점인 `(A, 0)`이 꺼내진다.
* 첫 정점에 인접한 노드들 각각에 대해, 첫 정점에서 각 노드로 가는 거리와 현재 배열에 저장된 값(i.e., 이전까지의 첫 정점에서 각 정점까지의 거리)를 비교한다.
    * 배열에 저장된 거리보다, 첫 정점에서 해당 노드로 가는 거리가 더 짧을 경우, 배열에 해당 노드의 거리를 업데이트한다.
* 배열에 해당 노드의 거리가 업데이트된 경우, 우선순위 큐에 넣는다.
    * 결과적으로 너비 우선 탐색 방식과 유사하게, 첫 정점에 인접한 노드들을 순차적으로 방문하게 됨
    * 만약 배열에 기록된 현재까지 발견된 가장 짧은 거리보다, 더 긴 거리(루트)를 가진 (노드, 거리)의 경우에는 해당 노드와 인접한 노드 간의 거리 계산을 하지 않음

> 이전 표에서 보듯이, 첫 정점 이외에 모두 inf 이었었으므로, 첫 정점에 인접한 노드들은 모두 우선순위 큐에 들어가고, 첫 정점과 인접한 노드 간의 거리가 배열에 업데이트됨

위의 설명을 예제에 적용하면 진행은 다음과 같다.

* 그래프에서 A에서 B로 가는 경로의 가중치는 8로, `inf`보다 작기 때문에 배열의 값을 8로 바꾸고 우선순위 큐에 `(B, 8)`을 추가한다.
* 동일하게 C와 D도 각 배열의 값을 그래프에 나타나 있는 가중치 값인 1, 2로 바꾸고 우선순위 큐에 추가한다.
    * 우선순위 큐는 원소를 추가할 때마다 자동으로 거릿값에 따라 오름차순으로 정렬된다.
* 여기까지의 과정이 한 턴(우선순위 큐에서 꺼낸 정점 '한 개'의 인접 정점에 대해 계산을 진행)을 돈 것과 같다.

![dijkstra 2ne step](/post-img/fc-algo-algorithm-20-shortest/3_dijkstra_1st.png)

### 3단계: 우선순위 큐에서 (C, 1) [노드, 첫 노드와의 거리]를 기반으로 인접한 노드와의 거리 계산

* 우선순위 큐가 MinHeap(최소 힙) 방식이므로, 위 표에서 넣어진 `(C, 1)`, `(D, 2)`, `(B, 8)` 중 `(C, 1)`이 먼저 추출됨
* 현재 배열의 값들은 첫 정점인 A에서 해당 정점까지의 거리이다.
    * 그러므로 각 배열의 값을 업데이트할 때는 A부터 해당 정점까지의 거릿값을 비교할 수 있도록 해줘야 한다.
    * 현재 정점은 C로 C에서 각 정점까지의 거리를 알 수 있다.
    * A에서 C까지 거리는 1로, 현재 우선순위 큐에서 추출한 원소의 거릿값과 같다.
* 그러므로 배열의 각 값을 업데이트할 때, A - C의 거리인 1과 C - 각 정점의 거리의 합을 구한 뒤 이를 각 배열의 값과 비교해야 한다.
    * 1단계까지의 A - B 최단 거리는 8인 상태에서, A - C까지의 거리는 1, C에 인접한 B로 가는 거리(i.e., C - B)는 5로 A - C - B는 1 + 5 = 6이다.
        * 이전에 구한 A - B 최단 거리 8보다 더 작기 때문에 이를 배열에 업데이트한다.
        * 배열을 업데이트했으므로 B, 6 (즉 A에서 B까지의 현재까지 발견한 최단 거리) 값을 우선순위 큐에 넣어줌
    * A - D 거리에도 동일하게 적용하면, C - D의 거리는 2로 A - C - D는 1 + 2 = 3이다. 이번에는 A - D의 현재 최단 거리인 2보다 길기 때문에 D의 거리는 업데이트하지 않음
* 이 과정은, 기존에 A에서 각 노드까지의 바로 가는 거리와 C를 거쳐서 가는 거리를 비교하는 과정으로 볼 수 있다.

![dijkstra 3rd step](/post-img/fc-algo-algorithm-20-shortest/4_dijkstra_2nd.png)

### 4단계: 우선순위 큐에서 (D, 2) [노드, 첫 노드와의 거리]를 기반으로 인접한 노드와의 거리 계산

* 지금까지 접근하지 못했던 E와 F 거리가 계산됨
    * A - D까지의 거리인 2 에 D - E가 3이므로 이를 더해서 E, 5
    * A - D까지의 거리인 2 에 D - F가 5이므로 이를 더해서 F, 7

![dijkstra 4th step](/post-img/fc-algo-algorithm-20-shortest/5_dijkstra_3rd.png)

### 5단계: 우선순위 큐에서 (E, 5) [노드, 첫 노드와의 거리]를 기반으로 인접한 노드와의 거리 계산

* A - E 거리가 5인 상태에서, E에 인접한 F에 가는 거리는 1, 즉 A - E - F 는 5 + 1 = 6, 현재 배열에 A - F 최단 거리가 7로 기록되어 있리 때문에, F, 6으로 업데이트
    * 우선순위 큐에 F, 6 추가

![dijkstra 5th step](/post-img/fc-algo-algorithm-20-shortest/6_dijkstra_3-2th.png)

### 6단계: 우선순위 큐에서 (B, 6), (F, 6) 를 순차적으로 추출해 각 노드 기반으로 인접한 노드와의 거리 계산

* 예제의 방향 그래프에서 B 노드는 다른 노드로 가는 루트가 없음
    * 아무런 동작 없이 넘어간다.
* F 노드는 A 노드로 가는 루트가 있으나, 현재 A - A가 0인 반면에 A - F - A는 6 + 5 = 11, 즉 더 긴 거리이므로 업데이트되지 않음

![dijkstra 6th step](/post-img/fc-algo-algorithm-20-shortest/7_dijkstra_4th.png)

### 7단계: 우선순위 큐에서 (F, 7), (B, 8) 를 순차적으로 추출해 각 노드 기반으로 인접한 노드와의 거리 계산

* A - F로 가는 하나의 루트의 거리가 7인 상황이나, 배열에서 이미 A - F로 가는 현재의 최단 거리가 6인 루트의 값이 있는 상황이므로, 더 긴 거리인 F, 7 루트 기반 인접 노드까지의 거리는 계산할 필요가 없음, 그래서 계산 없이 건너뜀.
    * 계산하더라도 A - F 거리가 6인 루트보다 무조건 더 긴 거리가 나올 수밖에 없음
* B, 8도 현재 A - B 거리가 6이므로, 인접 노드 거리 계산이 필요 없음.

> 우선순위 큐를 사용하면 불필요한 계산 과정을 줄일 수 있음

![dijkstra 7th step](/post-img/fc-algo-algorithm-20-shortest/8_dijkstra_5th.png)

### 우선순위 큐 사용 장점

* 지금까지 발견된 가장 짧은 거리의 노드에 대해서 먼저 계산
* 더 긴 거리로 계산된 루트에 대해서는 계산을 건너뛸 수 있음

## 4. 다익스트라 알고리즘 파이썬 구현 (우선순위 큐 활용까지 포함)

### 참고: heapq 라이브러리 활용을 통해 우선순위 큐 사용하기

데이터가 리스트 형태일 경우, 0번 인덱스를 우선순위로 인지, 우선순위가 낮은 순서대로 pop 할 수 있음

```python
import heapq

queue = []

heapq.heappush(queue, [2, 'A'])
heapq.heappush(queue, [5, 'B'])
heapq.heappush(queue, [1, 'C'])
heapq.heappush(queue, [7, 'D'])

print(queue)
# [[1, 'C'], [5, 'B'], [2, 'A'], [7, 'D']]

for index in range(len(queue)):
    print (heapq.heappop(queue))
# 출력 결과
# [1, 'C']
# [2, 'A']
# [5, 'B']
# [7, 'D']
```

### 다익스트라 알고리즘

탐색할 그래프의 시작 정점과 다른 정점들 간의 최단 거리 구하기

![dijkstra](/post-img/fc-algo-algorithm-20-shortest/9_dijkstra.png)

```python
# 그래프
mygraph = {
    'A': {'B': 8, 'C': 1, 'D': 2},
    'B': {},
    'C': {'B': 5, 'D': 2},
    'D': {'E': 3, 'F': 5},
    'E': {'F': 1},
    'F': {'A': 5}
}
```

```python
import heapq

# 그래프와 출발점을 인자로 받음
def dijkstra(graph, start):

    # 그래프의 모든 key에 대해 값을 inf로 초기화
    distances = {node: float('inf') for node in graph}
    # 출발점 - 출발점 거리를 0으로 설정
    distances[start] = 0
    
    queue = []
    # [거리, key] 꼴로 출발점을 우선순위 큐에 push
    heapq.heappush(queue, [distances[start], start])
    
    while queue:
        current_distance, current_node = heapq.heappop(queue)
        
        # pop한 노드의 거리가 현재 배열에서 해당 노드의 최단 거리보다 크면
        # 확인 없이 넘어가도 됨
        if distances[current_node] < current_distance:
            continue
            
        # adjacent: 인접한 노드, weight: 그 노드까지의 거리
        for adjacent, weight in graph[current_node].items():
            distance = current_distance + weight
            
            if distance < distances[adjacent]:
                distances[adjacent] = distance
                heapq.heappush(queue, [distance, adjacent])
                
    return distances


dijkstra(mygraph, 'A')
# {'A': 0, 'B': 6, 'C': 1, 'D': 2, 'E': 5, 'F': 6}
```

### 참고: 최단 경로 출력

탐색할 그래프의 시작 정점과 다른 정점들 간의 최단 거리 및 최단 경로 출력하기

```python
import heapq

# 탐색할 그래프와 시작 정점을 인수로 전달받습니다
def dijkstra(graph, start, end):
    # 시작 정점에서 각 정점까지의 거리를 저장할 딕셔너리를 생성하고, 무한대(inf)로 초기화합니다.
    distances = {vertex: [float('inf'), start] for vertex in graph}

    # 그래프의 시작 정점의 거리는 0으로 초기화 해줌
    distances[start] = [0, start]

    # 모든 정점이 저장될 큐를 생성합니다.
    queue = []

    # 그래프의 시작 정점과 시작 정점의 거리(0)을 최소 힙에 넣어줌
    heapq.heappush(queue, [distances[start][0], start])

    while queue:
        # 큐에서 정점을 하나씩 꺼내 인접한 정점들의 가중치를 모두 확인하여 업데이트합니다.
        current_distance, current_vertex = heapq.heappop(queue)
        
        # 더 짧은 경로가 있다면 무시한다.
        if distances[current_vertex][0] < current_distance:
            continue
            
        for adjacent, weight in graph[current_vertex].items():
            distance = current_distance + weight
            # 만약 시작 정점에서 인접 정점으로 바로 가는 것보다 현재 정점을 통해 가는 것이 더 가까울 경우에는
            if distance < distances[adjacent][0]:
                # 거리를 업데이트합니다.
                distances[adjacent] = [distance, current_vertex]
                heapq.heappush(queue, [distance, adjacent])
    
    path = end
    path_output = end + '->'
    
    while distances[path][1] != start:
        path_output += distances[path][1] + '->'
        path = distances[path][1]
    path_output += start
    print(path_output)
    # F->E->D->A
    
    return distances

# 방향 그래프
mygraph = {
    'A': {'B': 8, 'C': 1, 'D': 2},
    'B': {},
    'C': {'B': 5, 'D': 2},
    'D': {'E': 3, 'F': 5},
    'E': {'F': 1},
    'F': {'A': 5}
}

print(dijkstra(mygraph, 'A', 'F'))
# {'A': [0, 'A'], 'B': [6, 'C'], 'C': [1, 'A'], 'D': [2, 'A'], 'E': [5, 'D'], 'F': [6, 'E']}
```

## 5. 시간 복잡도

위 다익스트라 알고리즘은 크게 다음 두 가지 과정을 거침

* 과정 1: 노드마다 인접한 간선들을 모두 검사하는 과정
* 과정 2: 우선순위 큐에 노드/거리 정보를 넣고 삭제(pop)하는 과정

### 과정별 시간 복잡도

* 과정 1: 각 노드는 최대 한 번씩 방문하므로 (첫 노드와 해당 노드 간의 갈 수 있는 루트가 있는 경우만 해당), 그래프의 모든 간선은 최대 한 번씩 검사
    * 즉, 노드마다 인접한 간선들을 모두 검사하는 과정은 O(E) 시간이 걸림, E는 간선(edge)의 약자
* 과정 2: 우선순위 큐에 가장 많은 노드, 거리 정보가 들어가는 경우, 우선순위 큐에 노드/거리 정보를 넣고, 삭제하는 과정이 최악의 시간이 걸림
    * 우선순위 큐에 가장 많은 노드, 거리 정보가 들어가는 시나리오는 그래프의 모든 간선이 검사될 때마다, 배열의 최단 거리가 갱신되고, 우선순위 큐에 노드/거리가 추가되는 것임
    * 이때 추가는 간선마다 최대 한 번 일어날 수 있으므로, 최대 $O(E)$의 시간이 걸리고, $O(E)$ 개의 노드/거리 정보에 대해 우선순위 큐를 유지하는 작업은 $O(\log E)$가 걸림.
    * 따라서 해당 과정의 시간 복잡도는 $O(\log E)$

### 총 시간 복잡도

* 과정1 + 과정2 = $O(E) + O(E\log E) = O(E + E\log E) = O(E\log E)$

### 참고: 힙의 시간 복잡도

* depth (트리의 높이)를 h라고 표기한다면,
* n개의 노드를 가지는 heap에 데이터 삽입 또는 삭제 시, 최악의 경우 root 노드에서 leaf 노드까지 비교해야 하므로 $h=\log 2n$ 에 가까우므로, 시간 복잡도는 $O(\log n)$