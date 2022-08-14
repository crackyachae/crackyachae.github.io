---
layout  : article
title   : 2.3 Linear Independence, Basis, and Dimension
summary : 
date    : 2020-03-12 13:27:30 +0900
updated : 2021-03-24 23:38:18 +0900
tag     : draft
toc     : true
public  : true
parent  : [[/mathematics/hyu-linear-algebra]]
latex   : true
---
* TOC
{:toc}

> 이 글은 KOCW의 한양대학교 선형대수 '7강 벡터의 선형독립과 기저벡터' 강의내용을 복습하기 위해 Gilbert Strang의 [Linear Algebra and Its Applications](https://books.google.co.kr/books?id=8QVdcRJyL2oC) 2.3장과 강의노트를 기반으로 작성한 글입니다.
>
> * 제가 필요한 부분 위주로 확인하면서 정리하고 있어 글에 덜 작성된 부분이 있을 수 있습니다.
> * 글 작성 후 원 서적의 내용이 수정되거나 내용을 이해하기 위한 개인적인 설명이나 해석이 있을 수 있습니다. 되도록 원 서적을 참고해주시길 바랍니다.
> * 잘못된 부분이 있다면 댓글이나 그 외 편하신 방법으로 알려주시면 감사하겠습니다.

## Linear Independence or Dependence

$c_1v_1 + c_2v_2 + \cdots + c_nv_n = 0$을 만족시키는 경우가 $c_1 = c_2 = \cdots = c_n = 0$밖에 없을 때 (trivial combination), vectors $v_1, v_2, \cdots, v_n$은 **linearly independent**하다. vector $v_k$를 다른 vectors들로 표현할 수 없다.
반대로 nonzero인 $c$가 존재하는 경우 $v$들은 **linearly dependent** 하다.

ex 1) $v_1 = zero\ vector$이면 (벡터 집합 중에 zero vector가 존재하면) 해당 벡터집합은 linearly dependent하다.

ex 2) Triangular matrix의 column들은 linearly independent하다

$$ A =
\begin{bmatrix}
3 & 4 & 2 \\
0 & 1 & 5 \\
0 & 0 & 2
\end{bmatrix}
$$

* 행렬 A의 Gaussian Elimination의 결과로 생긴 nonzero row는 linearly independent하다.
* nonzero pivots를 갖는 columns는 linearly independent 하다.

$$ U =
\begin{bmatrix}
1 & 3 & 3 & 2 \\
0 & 0 & 3 & 1 \\
0 & 0 & 0 & 0
\end{bmatrix} \quad Two\ independent\ rows,\ Two\ independent\ columns
$$

* $R^m$ 안의 n개의 벡터집합은 n > m이면 linearly dependent하다.

## Spanning a Subspace

벡터집합 $v_1, v_2, \cdots, v_n$의 모든 linear combination이 vector space $V$를 이룰 때 벡터집합 $v_1, v_2, \cdots, v_n$이 $V$로 **span**한다고 한다.

ex 3) Vectors $\begin{bmatrix} 1 \\ 0 \\ 0 \end{bmatrix}와 \begin{bmatrix} 0 \\ 1 \\ 0 \end{bmatrix}$은 x-y 평면 (in $R^3$)으로 span한다.

ex 4) Vectors $\begin{bmatrix} 1 \\ 0 \\ 0 \end{bmatrix}와 \begin{bmatrix} 1 \\ 1 \\ 0 \end{bmatrix}$은 x-y 평면 (in $R^3$)으로 span한다.

* 특정 vector space로 span 할 수 있는 vector의 조합은 다양하다.
* 특정 vector space로 span하기 위한 특정 linearly independent vectors의 linear combination은 unique하다.
* 즉, ex 3), ex 4) 모두 x-y 평면으로 span하지만 ex 1), ex 2) 각각이 x-y 평면으로 span하기 위한 linear combination은 unique하다.

## Basis for a Vector Space

Basis는 vector space $V$로 span할 수 있는 최소 개수의 linearly independent vectors를 말한다.

Vector space $V$의 **basis**는 아래 두개의 성질을 동시에 만족시켜야 한다.

1. Vectors가 linearly independent 해야한다.
2. Vertors는 space $V$로 span해야 한다.

* 위의 ex 3), ex 4)는 모두 x-y평면의 basis이다.
* 특정 Vector space $V$의 basis는 unique하지 않다. (Infinitely many)

## Dimension of a Vector Space

Vector space의 $V$의 basis vectors의 개수는 같으며 이를 $V$의 **dimension**이라고 한다.

$$ U =
\begin{bmatrix}
1 & 3 & 3 & 2 \\
0 & 0 & 3 & 1 \\
0 & 0 & 0 & 0
\end{bmatrix} \quad Two-dimensional\ subspace\ of\ R^3
$$

* basis에 비해 너무 크거나 너무 작은 벡터집합을 이용해서 basis를 만들 수 있다.
* Vector space $V$ 안의 임의의 linearly independent set에 다른 vectors를 더하면 basis로 확장시킬 수 있다.
* Vector space $V$ 안의 임의의 spanning set의 불필요한 vectors를 없애면 basis로 축소시킬 수 있다.

## Questions - Answers

Answers at 2020.03.22

### 문제 2.3.16

왜 (0 0 0 1)로 $R^4$ span test하는지

* $R^4$로 span한다면 $V \cdot c=\begin{bmatrix} 0 \\ 0 \\ 0 \\ 1 \end{bmatrix}$을 만족시켜야 하는데 마지막 row가 $0 \cdot c=1$이라 성립할 수 없다. 즉 $R^4$로 span하지 않는다는 반례.

### 문제 2.3.40

왜 미분 방정식의 일반식을 구하는 것이 basis를 구하는 것인지

* 문제의 미분 연산을 행렬으로 나타내면 $A\begin{bmatrix} x \\ y \end{bmatrix} = 0 $이고 nullspace의 basis를 구하는 경우와 같다. 연산을 만족시키면서 independent한 모든 (x y)가 basis이고 이는 주어진 미분 방정식의 일반해이다.
* 주어진 미분방정식은 행렬로 나타내면 정확히 어떻게 되는거지.

### 문제 2.3.33

* 임의의 vector Set $K$가 $V$의 Basis가 되기 위해서는 두 가지 조건,
  1. Linearly independent
  2. spans to $V$를 만족시켜야 하지만 각각 하나의 조건만 주어졌으므로
* 나머지 조건을 만족시키는 $K$의 superset (for independent vector set $K$), 혹은 subset (for $K$ spans to $V$) $S$를 정의해 $S=K$임을 보이면
* $K$가 $V$의 basis 임을 증명할 수 있다.

### 문제 2.3.34

* $V = \{v_1, v_2, v_3\}$와 $W = \{w_1, w_2, w_3\}$이
* $R^5$의 subspace이므로 $K = \{v_1, v_2, v_3, w_1, w_2, w_3\}$는 linearly dependent.
* $c_1v_1 + c_2v_2 + c_3v_3 = -\ (c_4w_1 + c_5w_2, c_6w_3) \ne 0$인 vector a가 존재하고 $V$와 $W$는 이를 공통으로 갖는다.
