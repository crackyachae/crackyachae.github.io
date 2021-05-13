---
layout  : article
title   : Chapter 17. 그래프 이해와 자료구조
summary : 
date    : 2021-05-05 14:44:54 +0900
updated : 2021-05-05 15:16:26 +0900
tag     : 
toc     : true
public  : true
parent  : 
latex   : false
---
* TOC
{:toc}

> 이 글은 패스트 캠퍼스 [기술면접 완전 정복 올인원 패키지 Online](https://fastcampus.co.kr/dev_online_algo) 'Chapter 17. 그래프 이해와 자료구조'의 강의내용을 정리하기 위해 강의 자료를 기반으로 작성한 글입니다.
>
> 강의 노트는 강의 구매자에게만 제공되는 자료이긴 하지만 잔재미 코딩의 [1. 그래프 이해](https://www.fun-coding.org/Chapter17-graph-live.html)에서 동일한 자료를 제공하고 있기 때문에 해당 자료를 기반으로 정리한 글을 작성해서 올립니다. 혹시 문제가 되는 경우 바로 내릴 예정이니 알려주시면 감사하겠습니다.
>
> 내용을 이해하기 위한 개인적인 설명이나 해석이 있을 수 있기 때문에 되도록 원문을 참고해주시길 바랍니다.
> 잘못된 부분이 있다면 댓글이나 그 외 편하신 방법으로 알려주시면 감사하겠습니다.

## 1. 그래프(Graph)란?

* 그래프는 실제 세계의 현상이나 사물을 정점(Vertex) 또는 노드(Node)와 간선(Edge)로 표현하기 위해 사용

#### 예제: 집에서 회사로 가는 경로를 그래프로 표현한 예

![graph example](/post-img/fc-algo-algorithm-17-graph/1_graph.png)

## 2. 그래프(Graph) 관련 용어

| 용어                        | 설명                                                                                       |
| --------------------------- | ------------------------------------------------------------------------------------------ |
| 노드 (Node)                 | 위치를 말함, 정점(Vertex)이라고도 함                                                       |
| 간선 (Edge)                 | 위치 간의 관계를 표시한 선으로 노드를 연결한 선이라고 보면 됨 (link 또는 branch라고도 함) |
| 인접 정점 (Adjacent Vertex) | 간선으로 직접 연결된 정점(또는 노드)                                                       |

참고 용어

| 용어                    | 설명                                                   |
| ----------------------- | ------------------------------------------------------ |
| 정점의 차수 (Degree)    | 무방향 그래프에서 하나의 정점에 인접한 정점의 수       |
| 진입 차수 (In-Degree)   | 방향 그래프에서 외부에서 오는 간선의 수                |
| 진출 차수 (Out-Degree)  | 방향 그래프에서 외부로 향하는 간선의 수                |
| 경로 길이 (Path Length) | 경로를 구성하기 위해 사용된 간선의 수                  |
| 단순 경로 (Simple Path) | 처음 정점과 끝 정점을 제외하고 중복된 정점이 없는 경로 |
| 사이클 (Cycle)          | 단순 경로의 시작 정점과 종료 정점이 동일한 경우        |

* 단순 경로 (A - B - C)

![simple path](/post-img/fc-algo-algorithm-17-graph/2_simplepath.png)

## 3. 그래프(Graph) 종류

### 무방향 그래프(Undirected Graph)

* 방향이 없는 그래프
* 간선을 통해, 노드는 양방향으로 갈 수 있음
* 보통 노드 A, B가 연결되어 있으면, (A, B) 또는 (B, A)로 표기

![undirected graph](/post-img/fc-algo-algorithm-17-graph/3_undirectedgraph.png)

### 방향 그래프(Directed Graph)

* 간선에 방향이 있는 그래프
* 보통 노드 A, B가 A -> B로 가는 간선으로 연결되어 있을 경우, <A, B>로 표기 (<B, A>는 B -> A로 가는 간선이 있는 경우이므로 <A, B>와 다름)
* 가중치 그래프 (Weighted Graph) 또는 네트워크 (Network)
* 간선에 비용 또는 가중치가 할당된 그래프

![directed graph](/post-img/fc-algo-algorithm-17-graph/4_directedgraph.png)

### 가중치 그래프(Weighted Graph) 또는 네트워크(Network)

* 간선에 비용 또는 가중치가 할당된 그래프

![weighted graph](/post-img/fc-algo-algorithm-17-graph/5_weightedgraph.png)

### 연결 그래프(Connected Graph)와 비연결 그래프(Disconnected Graph)

* 연결 그래프(Connected Graph): 무방향 그래프에 있는 모든 노드에 대해 항상 경로가 존재하는 경우
* 비연결 그래프(Disconnected Graph): 무방향 그래프에서 특정 노드에 대해 경로가 존재하지 않는 경우
    * 비연결 그래프 예
    * ![disconnected graph](/post-img/fc-algo-algorithm-17-graph/6_disconnectedgraph.png)

### 사이클(Cycle) 과 비순환 그래프(Acyclic Graph)

* 사이클(Cycle)
    * 단순 경로의 시작 노드와 종료 노드가 동일한 경우
* 비순환 그래프(Acyclic Graph)
    * 사이클이 없는 그래프
    * 비순환 그래프 예
    * ![acyclic graph](/post-img/fc-algo-algorithm-17-graph/7_acyclicgraph.png)
* 완전 그래프(Complete Graph)
    * 그래프의 모든 노드가 서로 연결된 그래프
    * 완전 그래프 예
    * ![complete graph](/post-img/fc-algo-algorithm-17-graph/8_completegraph.png)

## 4. 그래프와 트리의 차이

트리는 그래프 중에 속한 특별한 종류(추가적인 제약사항을 더 갖는다)라고 볼 수 있음

|                 | 그래프                                               | 트리                                            |
| --------------- | ---------------------------------------------------- | ----------------------------------------------- |
| 정의            | 노드와 노드를 연결하는 간선으로 표현되는 자료 구조   | 그래프의 한 종류, 방향성이 있는 비순환 그래프   |
| 방향성          | 방향 그래프, 무방향 그래프 둘 다 존재함              | 방향 그래프만 존재함                            |
| 사이클          | 사이클 가능함, 순환 및 비순환 그래프 모두 존재함     | 비순환 그래프로 사이클이 존재하지 않음          |
| 루트 노드       | 루트 노드 존재하지 않음                              | 루트 노드 존재함                                |
| 부모/자식 관계  | 부모 자식 개념이 존재하지 않음                       | 부모 자식 관계가 존재함                         |
