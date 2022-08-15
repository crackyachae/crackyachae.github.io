---
layout  : article
title   : 4.1 Intro & 4.2 Properties of the Determinant
summary : 
date    : 2020-06-26 09:37:12 +0900
updated : 2021-09-26 15:28:44 +0900
tag     : draft
toc     : true
public  : true
parent  : [[/mathematics/hyu-linear-algebra]]
latex   : true
---
* TOC
{:toc}

> 이 글은 KOCW의 한양대학교 선형대수 '15강 행렬의 판별식' 강의내용을 복습하기 위해 Gilbert Strang의 [Linear Algebra and Its Applications](https://books.google.co.kr/books?id=8QVdcRJyL2oC) 4.1장, 4.2장과 강의노트를 기반으로 작성한 글입니다.
>
> * 제가 필요한 부분 위주로 확인하면서 정리하고 있어 글에 덜 작성된 부분이 있을 수 있습니다.
> * 글 작성 후 원 서적의 내용이 수정되거나 내용을 이해하기 위한 개인적인 설명이나 해석이 있을 수 있습니다. 되도록 원 서적을 참고해주시길 바랍니다.
> * 잘못된 부분이 있다면 댓글이나 그 외 편하신 방법으로 알려주시면 감사하겠습니다.

## Introduction

### Four main uses of determinants

1. Invertibility test
   * $A$의 *determinant*가 *zero*이면 $A$는 *singular*하다.
   * $det A \ne 0$이면 $A^{-1}$이 존재한다. ($A$가 invertible)
2. A의 determinant는 n-dimensional space 안 box의 *volumne*과 같다.
   * e.g., $\int\!\!\int\!\!\int f(x,y,z)dV$의 little cube $dV = dxdydz$를 cylindrical coordinate로 바꿀 때,
   $$
   \begin{matrix}
   x &=& rcos\theta \\
   y &=& rsin\theta \\
   z &=& z
   \end{matrix}
   $$
   * Volume element는 $Jdrd\theta dz$가 된다.
   * $J$는 *Jacobian determinant*로 stretching factor 역할을 한다.
   $$
   J =
   \begin{vmatrix}
      {\partial x \over \partial r} & {\partial x \over \partial\theta} & {\partial x \over \partial z} \\
      {\partial y \over \partial r} & {\partial y \over \partial\theta} & {\partial y \over \partial z} \\
      {\partial z \over \partial r} & {\partial z \over \partial\theta} & {\partial z \over \partial z} \\
   \end{vmatrix} =
   \begin{vmatrix}
       cos\theta & rsin\theta & 0 \\
       sin\theta & rcos\theta & 0 \\
       0 & 0 & 1
   \end{vmatrix}
   = r \quad\text{(for cylindrical)}
   $$
3. *determinant* $=$ $\pm$ (*product of the pivots*)
   * Elimination의 순서와 상관 없이 pivot의 곱의 절댓값은 일정하다.
   * Sign 변화는 row exchange 과정에서 생긴다.
4. Determinant로 $A^{-1}b$에서 $b$의 각 element의 영향($x_i$)을 측정할 수 있다. : *Cramer's rule*

## Properties of the Determinant

Determinant는 가장 간단한 세 개의 특성으로 정의될 수 있다.

* 예시는 2 by 2 matrix case
  $$
  det
  \begin{bmatrix}
    a & b \\
    c & d
  \end{bmatrix} =
  \begin{vmatrix}
    a & b \\
    c & d
  \end{vmatrix} =
  ad- bc
  $$

>1. Identity matrix의 determinant는 1이다.

  $$
  detI = 1 \quad
  \begin{vmatrix}
    1 & 0 \\
    0 & 1
  \end{vmatrix}
  = 1 \qquad and \qquad
  \begin{vmatrix}
    1 & 0 & 0 \\
    0 & 1 & 0 \\
    0 & 0 & 1
  \end{vmatrix} = 1
  $$

>2. 두 개의 row를 서로 바꾸면 determinant의 sign이 바뀐다.

  $$
  \begin{vmatrix}
    c & d \\
    a & b
  \end{vmatrix}
  = cb-ad = -
  \begin{vmatrix}
    a & b \\
    c & d
  \end{vmatrix}
  $$

>3. Determinant는 첫 번째 row에 *linearly* depend하다.

  $$
  \begin{matrix}
  \text{Add vectors in row 1} \qquad &
  \begin{vmatrix}
    a+a' & b+b' \\
    c & d
  \end{vmatrix} =
  \begin{vmatrix}
    a & b \\
    c & d
  \end{vmatrix} +
  \begin{vmatrix}
    a' & b' \\
    c & d
  \end{vmatrix}
  \\
  \text{Multiply by t in row 1} \qquad &
  \begin{vmatrix}
    ta & tb \\
    c & d
  \end{vmatrix} = t
  \begin{vmatrix}
    a & b \\
    c & d
  \end{vmatrix}
  \end{matrix}
  $$

* 모든 row의 연산이 아니라 첫 번째 행의 연산에만 해당된다는 것에 주의해야한다.
    * $det(A+B) \ne det(A)+det(B)$
    * $det(tA) \ne tdet(A)$

<br>

위의 세 basic rulerty로 부터 additional한 property를 도출해낼 수 있다.

>4. $A$의 row중 두 개가 같으면 $detA = 0$이다. (by rule 2)
>
* 같은 두 개의 row를 바꾼 matrix를 $A'$이라고 했을 때,
* Prop. 2에 의해서 $det A' = -det A$, $A=A'$이므로 $detA = detA'$
* $detA=0$

>5. 하나의 row에서 다른 row의 multiple을 빼더라도 determinant는 변하지 않는다. (by rule 3)
>
* determinant는 row operation에도 변하지 않는다.
   $$
   \begin{vmatrix}
      a - lc & b - ld \\
      c & d
   \end{vmatrix} =
   \begin{vmatrix}
      a & b \\
      c & d
   \end{vmatrix} +
   \begin{vmatrix}
      -lc & -ld \\
      c & d
   \end{vmatrix} =
   \begin{vmatrix}
      a & b \\
      c & d
   \end{vmatrix}
   $$

>6. $A$에 *rows of zero*가 있으면 $detA=0$이다.

  $$
  detA =
  \begin{vmatrix}
    0 & 0 \\
    c & d
  \end{vmatrix} =
  \begin{vmatrix}
    0 & 0 \\
    c & d
  \end{vmatrix} +
  \begin{vmatrix}
    0 & 0 \\
    c & d
  \end{vmatrix} =
  det A + det A
  $$

>7. $A$가 triangular matrix이면 $detA$는 *diagonal entries* $a_{11}, a_{22}, \cdots, a_{nn}$의 곱이다.

* *proof* : 모든 diagonal entry가 0이 아니면 Gaussian elimination을 이용해 모든 off-diagonal element를 제거할 수 있다. 이 때 rule 5에 의해 determinant는 변하지 않는다.
* $detD = (a_{11}a_{22} \cdots a_{nn}) detI = a_{11}a_{22} \cdots a_{nn} \quad \text{for diagonal matrix}$ (by rule 3)

>8. $A$가 *singular*이면 $detA = 0$이다. $A$가 *non-singular(invertible)* 이면 $detA \ne 0$이다.

* $A$가 singular이면 elimination 결과 $U$에 zero row가 생긴다. $detA = detU = 0$

>9. $det(AB) = det(A) \cdot det(B)$

* For particular case $detA^{-1} = {1 \over detA}$
* 증명은 $d(A) = det(AB) / det(B)$를 정의한 뒤 결과가 $det(A)$와 같음을 밝히면 된다. 자세한 내용은 서적 참고

>10. $det(A^T) = det(A)$

* Factorization을 하면 $PA=LDU$이다. 양 변의 determinant를 구하면 rule9에 의해 다음과 같다
  $$ detPdetA = detLdetDdetU $$
* $PA = LDU$를 transposing하여 determinant를 구하면
  $$ detA^TdetP^T = detU^TdetD^TdetL^T $$
* $L, U, L^T, U^T$의 determinant는 모두 1이고, $D=D^T$이다.
* $P$의 경우 $PP^T=1$이므로 $detTdetP^T = 1$로 $detP$와 $detP^T$는 1이나 -1로 같다.
* 결과적으로 $detA = detA^T$이다.

<br>

2020.06.26 11:55 작성. 2020.07.10 최종 수정.
