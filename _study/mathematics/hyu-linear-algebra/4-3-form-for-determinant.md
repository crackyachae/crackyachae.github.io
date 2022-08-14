---
layout  : article
title   : 4.3 Formulas For the Determinant
summary : 
date    : 2020-07-10 16:44:07 +0900
updated : 2020-07-14 18:25:12 +0900
tag     : draft
toc     : true
public  : true
parent  : [[/mathematics/hyu-linear-algebra]]
latex   : true
---
* TOC
{:toc}

> 이 글은 KOCW의 한양대학교 선형대수 '16강 판별식의 공식' 강의내용을 복습하기 위해 Gilbert Strang의 [Linear Algebra and Its Applications](https://books.google.co.kr/books?id=8QVdcRJyL2oC) 4.3장과 강의노트를 기반으로 작성한 글입니다.
>
> * 제가 필요한 부분 위주로 확인하면서 정리하고 있어 글에 덜 작성된 부분이 있을 수 있습니다.
> * 글 작성 후 원 서적의 내용이 수정되거나 내용을 이해하기 위한 개인적인 설명이나 해석이 있을 수 있습니다. 되도록 원 서적을 참고해주시길 바랍니다.
> * 잘못된 부분이 있다면 댓글이나 그 외 편하신 방법으로 알려주시면 감사하겠습니다.

첫 번째 formular는 이미 전에 언급이 되었다. Row operation으로 $D$의 pivot을 구했을 때:

> $A$가 invertible하면 $PA = LDU$, $detP = \pm1$이다.
> $$detA = \pm\ detL\ detD\ detU = \pm \text{ (product of the pivots)}$$

* $\pm$ 부호는 row exchange의 횟수에 따라 결정된다. (even or odd)
* Triangular factor는 $detL = detU = 1$이고
* $detD = d_1 \cdots d_n$

**Example**

$$
\begin{bmatrix}
    2 & -1 & & & \\
    -1 & 2 & -1 & & \\
    & -1 & 2 & \cdot & \\
    & & \cdot & \cdots & -1 \\
    & & & -1 & 2
\end{bmatrix}
= LDU
= L
\begin{bmatrix}
    2 & & & & \\
    & 3/2 & & & \\
    & & 4/3 & & \\
    & & & \cdot & \\
    & & & & (n+1)/n \\
\end{bmatrix}
U
$$

* 예시와 같은 matrix를 sparse matrix라고 한다.
* $detA = 2 \cdot (3/2) \cdot (4/3) \cdots (n+1/n) = n+1$

Determinant의 property 1-3으로 부터 일반적으로 잘 알려진 $n=2$, $n=3$인 square matrix의 determinant formula를 도출해보자.

* 우선, matrix의 row를 각 coordinate 방향의 vector로 분해한다.
  $$
  \begin{bmatrix}
      a & b
  \end{bmatrix}
  = \begin{bmatrix}
      a & 0
  \end{bmatrix}
    * \begin{bmatrix}
      0 & b
  \end{bmatrix}

  \qquad and \qquad

  \begin{bmatrix}
      c & d
  \end{bmatrix}
  = \begin{bmatrix}
      c & 0
  \end{bmatrix}
    * \begin{bmatrix}
      0 & d
  \end{bmatrix}
  $$
* Property 1 (property of linearity)을 각 row에 적용한다.
  $$
  \begin{aligned}
  \begin{vmatrix}
      a & b \\
      c & d
  \end{vmatrix}
  &= \begin{vmatrix}
      a & 0 \\
      c & d
  \end{vmatrix}
    * \begin{vmatrix}
      0 & b \\
      c & d
  \end{vmatrix} \\

  &= \begin{vmatrix}
      a & 0 \\
      c & 0
  \end{vmatrix}
    * \begin{vmatrix}
      a & 0 \\
      0 & d
  \end{vmatrix}
    * \begin{vmatrix}
      0 & b \\
      c & 0
  \end{vmatrix}
    * \begin{vmatrix}
      0 & b \\
      0 & d
  \end{vmatrix} \\
  &= ad - bc
  \end{aligned}
  $$
    * 두 개의 row가 동일한 coordinate 방향에 있으면, 즉 column에 zero vector가 있으면 그 matrix의 determinant는 0이 된다.
    * Determinant가 0이 되지 않기 위해서는 nonzero term이 모두 다른 column에 있어야 한다.
* $n$개의 nonzero determinant를 배분하는 방법은 $n!$개이다.
    * Example: 3 by 3 matrix의 경우 $3! = 6$개의 determinants 존재
    $$
    \begin{aligned}
    \begin{vmatrix}
        a_{11} & a_{12} & a_{13} \\
        a_{21} & a_{22} & a_{23} \\
        a_{31} & a_{23} & a_{33} \\
    \end{vmatrix}
    & =
    \begin{vmatrix}
        a_{11} & & \\
        & a_{22} & \\
        & & a_{33} \\
    \end{vmatrix}
    +
    \begin{vmatrix}
        & a_{12} & \\
        & & a_{23} \\
        a_{31} & & \\
    \end{vmatrix}
    +
    \begin{vmatrix}
        & & a_{13} \\
        a_{21} & & \\
        & a_{32} & \\
    \end{vmatrix}
    \\
    & \quad +
    \begin{vmatrix}
        a_{11} & & \\
        & & a_{23} \\
        & a_{32} & \\
    \end{vmatrix}
    +
    \begin{vmatrix}
        & a_{12} & \\
        a_{21} & & \\
        & & a_{33} \\
    \end{vmatrix}
    +
    \begin{vmatrix}
        & & a_{13} \\
        & a_{22} & \\
        a_{31} & & \\
    \end{vmatrix}
    \end{aligned}
    $$
* $a_{ij}$를 factoring out하면,
  $$
  \begin{aligned}
    \begin{vmatrix}
        a_{11} & a_{12} & a_{13} \\
        a_{21} & a_{22} & a_{23} \\
        a_{31} & a_{23} & a_{33} \\
    \end{vmatrix}
    &=
    a_{11}a_{22}a_{33}
    \begin{vmatrix}
        1 & & \\
        & 1 & \\
        & & 1 \\
    \end{vmatrix}
    +
    a_{12}a_{23}a_{31}
    \begin{vmatrix}
        & 1 & \\
        & & 1 \\
        1 & & \\
    \end{vmatrix}
    +
    a_{13}a_{21}a_{32}
    \begin{vmatrix}
        & & 1 \\
        1 & & \\
        & 1 & \\
    \end{vmatrix}
    \\
    & \quad+
    a_{11}a_{23}a_{32}
    \begin{vmatrix}
        1 & & \\
        & & 1 \\
        & 1 & \\
    \end{vmatrix}
    +
    a_{12}a_{21}a_{33}
    \begin{vmatrix}
        & 1 & \\
        1 & & \\
        & & 1 \\
    \end{vmatrix}
    +
    a_{13}a_{22}a_{31}
    \begin{vmatrix}
        & & 1 \\
        & 1 & \\
        1 & & \\
    \end{vmatrix}
    \\
  &=\sum_{\alpha, \beta, \gamma} a_{1\alpha}a_{2\beta}a_{3\gamma}(\text{det}P_{\alpha, \beta, \gamma})
  \end{aligned}
  $$

결과적으로 일반적인 n by n matrix의 determinants는
  $$
  \text{Big Formula} \qquad
  \text{det}A = \sum_{\text{all }P's} (a_{1\alpha}a_{2\beta} \cdots a_{n\nu})\text{det}P
  $$

* n by n matrix의 계산은 number $(1, \dots, n)$이 이룰 수 있는 모든 $n!$개의 permutation $(\alpha, \dots, \nu)$을 합산한다.
* $\text{det}P$는 row exchange 횟수에 따라 짝수번이면 $+1$, 홀수번이면 $-1$이 된다.

Property 3에 의하면 n by n matrix의 determinant는 first row인 $a_{11}, a_{12}, \dots, a_{1n}$에 depend하다.

* 모든 $(a_{1\alpha}a_{2\beta} \cdots a_{n\nu})$ term중 $a_{11}$을 포함하는 경우를 생각해보자.
    * 첫 column($\alpha = 1$)을 제외하면 남은 column은 $(2, \dots ,n)$이 이루는 순열 $(\beta,\dots,\nu)$이다.
    * 남은 term $(a_{2\beta} \cdots a_{n\nu})$을 하나의 coefficient로 합쳐 표현하면 위의 term을 $a_{11}C_{11}$와 같은 꼴로 나타낼 수 있다.
    * 이 때, $a_{11}$의 coefficient $C_{11}$은 row1과 column1이 제거된 sub-matrix의 determinant와 같다.

  $$
  \text{Cofactor of }a_{11} \qquad C_{11} = \sum(a_{2\beta} \cdots a_{n\nu})\text{det}P = \text{det(sub matrix of A)}
  $$

* 이와 같은 방식으로 모든 term을 나타내면
  $$
  \text{Cofactors along row 1} \qquad
  \text{det}A = a_{11}C_{11} + a_{12}C_{12} + \cdots + a_{1n}C_{1n}
  = \sum_{j=1}^n a_{ij}C_{ij}
  $$

**Example**

For 3 by 3 cases

$$
\begin{aligned}
\begin{vmatrix}
    a_{11} & a_{12} & a_{13} \\
    a_{21} & a_{22} & a_{23} \\
    a_{31} & a_{23} & a_{33} \\
\end{vmatrix}
&=
\begin{vmatrix}
    a_{11} & & \\
    & a_{22} & a_{23} \\
    & a_{23} & a_{33} \\
\end{vmatrix}
+
\begin{vmatrix}
    & a_{12} & \\
    a_{21} & & a_{23} \\
    a_{31} & & a_{33} \\
\end{vmatrix}
+
\begin{vmatrix}
    & & a_{13} \\
    a_{21} & a_{22} & \\
    a_{31} & a_{23} & \\
\end{vmatrix} \\
&= a_{11}(a_{22}a_{33}-a_{23}a_{32}) + a_{12}(a_{23}a_{31}-a_{21}a_{33}) + a_{13}(a_{21}a_{32}-a_{22}a_{31})
\end{aligned}
$$

## Expansion of $\text{det}A$ in Cofactors

* 동일한 term에서 어떤 row나 column도 두 번 쓰일 수 없다.
* Cofactor $C_{1j}$를 만들 때 첫 번째 row와 j번째 column은 이미 $a_{ij}$가 차지하고 있다.
* 이는 Cofactor $C_{1j}$는 완전히 다른 column에만 연관(depend)이 있다는 것을 의미한다.
* Cofactor를 만드는 submatrix $M_{1j}$는 기존의 matrix에서 $row 1$과 $column j$를 제거해 만든다.

$$
\text{Cofactors of row 1} \qquad C_{1j} = (-1)^{1+j}\text{det}M_{1j}
$$

이를 확장해서 다른 어떤 $row i$에도 적용할 수 있다.

* row $1$과 row $i$를 exchange해서 증명 가능하다.

>$$
>\begin{matrix}
>\text{det}A = a_{i1}c_{i1} + a_{i2}C_{i2} + \cdots + a_{in}C_{in} \\
>C_{ij} = (-1)^{i+j}\text{det}M_{ij}
>\end{matrix}
>$$

**Exmaple**

$$
A4 =
\begin{bmatrix}
2 & -1 & 0 & 0 \\
-1 & 2 & -1 & 0 \\
0 & -1 & 2 & -1 \\
0 & 0 & -1 & 2
\end{bmatrix}
$$

계산이 쉽도록 $a_{ij} = 0$이 많은 $i$번째 row를 선택한다. 예시의 경우 $row\ 1$

$$
\begin{aligned}
\text{det}A_4
&=
2\begin{vmatrix}
    2 & -1 & 0 \\
    -1 & 2 & -1 \\
    0 & -1 & 2
\end{vmatrix}
-
(-1)\begin{vmatrix}
    -1 & -1 & 0 \\
    0 & 2 & -1 \\
    0 & -1 & 2
\end{vmatrix}
\\
&=
2\begin{vmatrix}
    2 & -1 & 0 \\
    -1 & 2 & -1 \\
    0 & -1 & 2
\end{vmatrix}
-
\begin{vmatrix}
    2 & -1 \\
    -1 & 2
\end{vmatrix}
\\
&= 2 \cdot detA_3 - detA_2 = 2(4) - 3 = 5
\end{aligned}
$$

이 matrix에서는 $A_5, A_6, A_n$에서도 동일한 관계가 반복된다.

$$
\text{Recursion by cofactors} \qquad detA_n = 2(detA_{n-1}) - detA_{n-2}
$$
