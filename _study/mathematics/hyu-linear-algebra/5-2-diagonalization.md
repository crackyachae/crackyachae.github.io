---
layout  : article
title   : 5.1 Intro & 5.2 Diagonalization of a Matrix
summary : 
date    : 2020-09-17 23:02:35 +0900
updated : 2020-10-14 14:02:10 +0900
tag     : draft
toc     : true
public  : true
parent  : [[/mathematics/hyu-linear-algebra]]
latex   : true
---
* TOC
{:toc}

> 이 글은 KOCW의 한양대학교 선형대수 '18강 고유값과 고유벡터 및 대각화' 강의내용을 복습하기 위해 Gilbert Strang의 [Linear Algebra and Its Applications](https://books.google.co.kr/books?id=8QVdcRJyL2oC) 5.1장, 5.2과 강의노트를 기반으로 작성한 글입니다.
>
> * 제가 필요한 부분 위주로 확인하면서 정리하고 있어 글에 덜 작성된 부분이 있을 수 있습니다.
> * 글 작성 후 원 서적의 내용이 수정되거나 내용을 이해하기 위한 개인적인 설명이나 해석이 있을 수 있습니다. 되도록 원 서적을 참고해주시길 바랍니다.
> * 잘못된 부분이 있다면 댓글이나 그 외 편하신 방법으로 알려주시면 감사하겠습니다.

## 5.1 Introduction

first half of linear algebra: $Ax = b$

second half: $Ax = \lambda x$

* 여전히 matrix를 simplify해서 해결
* matrix를 diagonal로 simplify
* no more row exchanges: elimination은 eigenvalue($\lambda$)를 바꾸기 때문
* determinant를 이용

### Fundamental equation

$$Ax = \lambda x$$

* number $\lambda$: matrix $A$의 *eigenvalue*
* vector $x$: matrix $A$의 *eigenvector*

## The Solution of $Ax = \lambda x$

$\lambda x$를 $\lambda Ix$로 생각하면 $Ax = \lambda x$를 다음과 같이 쓸 수 있다.

$$
(A-\lambda I)x = 0
$$

위와 같은 문제의 key는 다음과 같다.

* vector $x$는 $A-\lambda x$의 nullspace이다.
* number $\lambda$는 $A-\lambda x$가 nullspace를 가질 수 있는 값으로 선택된다.

모든 matrix는 nullspace를 갖지만 목표는 *nonzero* eigenvector $x$를 구하는 것이다.

* $x=0$인 equation의 solution으로서 가치가 거의 없다.
* 관심이 있는 것은 nonzero eigenvector $x$를 만드는 특정한 값 $\lambda$이다.
* 즉, $A - \lambda I$가 singular이어야 한다.

> number $\lambda$는 $A-\lambda I$가 singular일 때만 $A$의 eigenvalue이다.
> $$ det(A-\lambda I) = 0 $$
> 각 $\lambda$는 eigenvector $x$와 연관이 있다
> $$ (A-\lambda I)x = 0 \qquad or \qquad Ax=\lambda x $$

**Example**

$$
\begin{aligned}
  \text{Subtract } \lambda I & \quad
  A = \begin{bmatrix}
    4 & {-5} \\
    2 & {-3}
  \end{bmatrix}
  , \quad
  A-\lambda I =
  \begin{bmatrix}
    4-\lambda & {-5} \\
    2 & {-3-\lambda}
  \end{bmatrix}
\\
  \text{Determinant} & \quad
  det(A-\lambda I) = (4-\lambda)(-3-\lambda)+10 = \lambda^2-\lambda-2
\end{aligned}
$$

위 polynomial의 근이 determinant를 0으로 만드는 eigenvalue 값이다.

$$
\lambda = 2 \quad or \quad \lambda = -1
$$

* Singular인 (i.e. determinant = 0) $A-\lambda I$의 nullspace 에는 nonzero vector $x$가 존재한다.

$$
\begin{aligned}
  \lambda _1 = -1: & \qquad (A-\lambda _1I)x =
  \begin{bmatrix}
    5 & -5 \\
    2 & -2
  \end{bmatrix}
  \begin{bmatrix}
    y \\ z
  \end{bmatrix} =
  \begin{bmatrix}
    0 \\ 0
  \end{bmatrix},
  \qquad
  x_1 =
  \begin{bmatrix}
    1 \\ 1
  \end{bmatrix}
  \\
  \lambda _2 = 2: & \qquad (A-\lambda _1I)x =
  \begin{bmatrix}
    5 & -5 \\
    2 & -2
  \end{bmatrix}
  \begin{bmatrix}
    y \\
    z
  \end{bmatrix} =
  \begin{bmatrix}
    0 \\
    0
  \end{bmatrix},
  \qquad
  x_2 =
  \begin{bmatrix}
    5 \\
    2
  \end{bmatrix}
\end{aligned}
$$

* $A-\lambda _1I$의 column은 $x_2$의 $A-\lambda_2I$의 columne은 $x_1$의 multiple이다.
    * 2 by 2 matrix에서 유용

$A-\lambda I$의 nullspace는 (i.e., eigenspace) 모두 $Ax = \lambda x$를 만족한다. 위의 예시에서 eigenspace는 $x_1 = (1,1)$, $x_2 = (5,2)$를 지나는 line이다.

### Steps in solving $Ax = \lambda x$

1. Compute the determinant of $A-\lambda I$
   * diagonal을 따라서 $\lambda$을 뺀 matrix로 determinant는 $n$ degree polynomial이다.
2. Find the roots of this polynomial
   * $n$개의 근이 $A$의 eigenvalue
3. For each eigenvalue solve the equation $(A-\lambda I)x = 0$
   * determinant가 zero이므로 nonzero $x$가 존재하며 이것이 eigenvector이다.

**Example 3**

$A$가 triangular인 경우
$
A =
\begin{bmatrix}
  1 & 4 & 5 \\
  0 & 3\over4 & 6 \\
  0 & 0 & 1\over2
\end{bmatrix}
$

$A$가 triangular이면 eigenvalue는 main diagonal에 존재한다.

$$
det (A=\lambda I) =
\begin{vmatrix}
  1 - \lambda & 4 & 5 \\
  0 & {3\over4} - \lambda & 6 \\
  0 & 0 & {1\over2} - \lambda
\end{vmatrix}
= (1-\lambda)({3\over4}-\lambda)({1\over2}-\lambda)
$$

determinant가 diagonal entry의 곱이므로 determinant를 0으로 만드는 $\lambda$값은

$$
\lambda = 1, \quad \lambda = {3\over4}, \quad or \quad \lambda = {1\over2}
$$

위의 예시로부터 알 수 있는 한 가지 핵심은 $A$를 eigenvalue 변화'없이' diagonal이나 triangular matrix로 바꾸는 것이다.

다만, eigenvalue 자체를 구하기는 어렵고

* Gaussian elimination은 이 경우엔 소용이 없다.
* eigenvalue를 구할 수 있는 별도의 formula도 존재하지 않는다.

eigenvalue에 대한 몇 가지 간단한 정보를 얻을 수 있다: sum & product

> n개의 eigenvalue의 **합(sum)** 은 n개의 diagonal entry의 합과 같다.
> $$ \text{Trace of} \quad A = \lambda_1 + \cdots + \lambda_n = a_{11} + \cdots + a_{nn} $$
> n개의 eigenvalue의 **곱(product)** 은 $A$의 **determinant**와 같다
> $$ \text{Determinant of} \quad  A = \lambda_1 \cdots \lambda_n = product\ of\ pivots$$

***proof***

$det(A-\lambda I) = 0$이 n개의 근 $\lambda_1 , \lambda_2, \cdots, \lambda_n$을 갖는다고 가정하자.

$$
\begin{aligned}
  det(A-\lambda I) & = (\lambda_1 - \lambda)(\lambda_2 - \lambda)\cdots(\lambda_n - \lambda) = 0 \\
  & = (-\lambda)^n + (\lambda_1 + \lambda_r + \cdots + \lambda_n)(-\lambda)^{n-1} + \cdots + \lambda_1\lambda_2\cdots\lambda_n
  \\
  & \cdots (1)
  \\
  det(A-\lambda I) & =
  \begin{vmatrix}
    a_{11}-\lambda & a_{12} & \cdots & a_{1n} \\
    a_{21} & a_{22}-\lambda & \cdots & a_{2n} \\
    \vdots & \vdots & \ddots & \vdots \\
    a_{n1} & a_{n2} & \cdots & a_{nn}-\lambda
  \end{vmatrix}
\end{aligned}
$$

* (1)에서 $\lambda = 0$일 경우 $det(A-\lambda I) = det A =\lambda_1\lambda_2\cdots\lambda_n$

$det(A-\lambda I)$를 다음과 같이 나타낼 수도 있다.

$$
det(A-\lambda I)
= (a_{11}-\lambda)C_{11} + a_{12}C_{12} + \cdots + a_{1n}C_{1n}
$$

여기서,

$$
\begin{aligned}
  C_{11} & = (-1)^{1+1}
  \begin{vmatrix}
    a_{22}-\lambda & a_{23} & \cdots & a{2n} \\
    a_{32} & a_{33}-\lambda & \cdots & a_{3n} \\
    \vdots & \vdots & \ddots & \vdots \\
    a_{n2} & a_{n3} & \cdots & a_{nn}-\lambda \\
  \end{vmatrix}
  \\
  & = (-\lambda)^{n-1} + (\cdots)(-\lambda)^{n-2} + \cdots
  \\
  C_{12} & = (-1)^{1+2}
  \begin{vmatrix}
    a_{21} & a_{23} & \cdots & a{2n} \\
    a_{31} & a_{33}-\lambda & \cdots & a_{3n} \\
    \vdots & \vdots & \ddots & \vdots \\
    a_{n1} & a_{n3} & \cdots & a_{nn}-\lambda \\
  \end{vmatrix}
  \\
  & = a_{21}(-\lambda)^{n-2} + (\cdots)(-\lambda)^{n-3} + \cdots
\end{aligned}
$$

이므로 (1)의 $(-\lambda)^n$과 $(-\lambda)^{n-1}$ 항은 $(a_{11}-\lambda)C_{11}$에서만 발생한다.

정리하면,

$$
\begin{aligned}
  det(A-\lambda I)
  & = (a_{11}-\lambda)(a_{22}-\lambda) \cdots (a_{n-1n-1}-\lambda)(a_{nn}-\lambda)+ \cdots \\
  & = (-\lambda)^n + (a_{11}+a_{22}+\cdots+a_{nn})(-\lambda)^{n-1}+\cdots \\
  & \cdots (2)
\end{aligned}
$$

* (1) = (2)에서 모든 $(-\lambda)^1$, $(-\lambda)^2$, $\cdots$, $(-\lambda)^n$에 대해서
  $$
  \sum_{i=1}^n \lambda_i = \sum_{i=1}^n a_{ii}
  $$

## Eigshow

강의에서 다루지 않음.

## 5.2 Diagonalization of a Matrix

* Another matrix decomposition method.
* The eigenvectors diagonalize a matrix.

n개의 linearly independent eigenvector ($e_i$) 를 갖는 n by n matrix $A$를 가정하자. (i.e., $Ae_i = \lambda e_i$)

이 eigenvector를 column으로 하는 matrix $S$에 대해 $S^{-1}AS$ 는 diagonal matrix $\Lambda$ 이다.

$$
S =
\begin{bmatrix}
  \vert & \vert & & \vert \\
  e_1 & e_2 & \cdots & e_n \\
  \vert & \vert & & \vert
\end{bmatrix},
\qquad
S^{-1}AS = \Lambda =
\begin{bmatrix}
  \lambda_1 & & \\
  & \lambda_2 & \\
  & & \ddots & \\
  & & & \lambda_n
\end{bmatrix}
$$

* $S$: eigenvector matrix
* $\Lambda$: eigenvalue matirx

***proof***

$$
\begin{aligned}
  AS = A
  \begin{bmatrix}
    \vert & \vert & & \vert \\
    e_1 & e_2 & \cdots & e_n \\
    \vert & \vert & & \vert
  \end{bmatrix}
  & =
  \begin{bmatrix}
    \vert & \vert & & \vert \\
    \lambda_1 e_1 & \lambda_2 e_2 & \cdots & \lambda_n e_n \\
    \vert & \vert & & \vert
  \end{bmatrix}
  \\
  & =
  \begin{bmatrix}
    \vert & \vert & & \vert \\
    e_1 & e_2 & \cdots & e_n \\
    \vert & \vert & & \vert
  \end{bmatrix}
  \begin{bmatrix}
    \lambda_1 & & \\
    & \lambda_2 & \\
    & & \ddots & \\
    & & & \lambda_n
  \end{bmatrix}
  \\
  & = S\Lambda
\end{aligned}
$$

$S$는 모든 column (eigenvector)이 independent 하다고 가정했으므로 invertible 하다.

$$
AS = S\Lambda, \quad or \quad S^{-1}AS = \Lambda, \quad or \quad A=S\Lambda S^{-1}
$$

이를 만족하는 matrix $S$가 존재할 때 $A$는 diagonalizable 하다.

**Remark 1**

Matrix $A$의 eigenvalue가 모두 다르면 ($\lambda_1, \lambda_2, \cdots, \lambda_n$이 distinct), n개의 eigenvector은 모두 independent 하다.

***proof***

n개의 eigenvector $e_1, \cdots, e_n$ 중, $e_1$이 linearly dependent 하다고 가정해보자.

$$
e_1 = c_2e_2 + \cdots +c_ne_n \cdots (1)
$$

(1)의 양변에 matrix $A$를 곱하면

$$
\begin{aligned}
  Ae_1 & = A(c_2e_2 + \cdots +c_ne_n)
  \\
  \lambda_1e_1& = c_2\lambda_2e_2 + \cdots +c_n\lambda_ne_n
  \\
  & \cdots (2)
\end{aligned}
$$

(1)의 양변에 $\lambda_1$을 곱하면

$$
\begin{aligned}
  \lambda_1e_1 & = \lambda_1(c_2e_2 + \cdots +c_ne_n)
  \\
  & = c_2\lambda_1e_2 + \cdots +c_n\lambda_1e_n
  \\
  & \cdots (3)
\end{aligned}
$$

(2)와 (3)은 $\lambda_1e_1$으로 같으므로

$$
c_2(\lambda_1-\lambda_2)e_2 + c_3(\lambda_1-\lambda_3)e_3 + \cdots + c_n(\lambda_1-\lambda_n)e_n = 0
$$

For distinct $\lambda_i$, $c_2 = c_3 = \cdots = c_n = 0$

$e_1$은 linearly independent 하다.

**Remark 2**

Diagonalizing matrix $S$는 unique 하지 않다. eigenvector $e$는 상수배 되어도 (multiplied by a constant) 계속 eigenvector이다.

**Remark 3**

$S$의 eigenvector와 $\Lambda$의 eigenvalue의 순서는 같다.

$$
\begin{bmatrix}
  \vert & \vert & & \vert \\
  e_1 & e_2 & \cdots & e_n \\
  \vert & \vert & & \vert
\end{bmatrix}
\begin{bmatrix}
  \lambda_1 & & \\
  & \lambda_2 & \\
  & & \ddots & \\
  & & & \lambda_n
\end{bmatrix}
$$

위의 $e_i$와 $e_j$의 순서가 바뀌면 $\lambda_i$와 $\lambda_j$의 순서도 바뀐다.

**Remark 4**

모든 matrix가 n개의 linearly independent vector를 갖는 것이 아니므로, 모든 matrix가 diagonalizable 한 것은 아니다.

중복된 eigenvalue가 존재하면 diagonalizable 하지 않을 수 있다.

$$
A =
\begin{bmatrix}
  0 & 1 \\
  0 & 0
\end{bmatrix},
\qquad
det(A-\lambda I) = \lambda^2 = 0,
\qquad
\lambda_1 = \lambda_2 = 0
$$

이 경우 $A$의 eigenvalue는 (1,0)의 multiple이다.

$$
x =
\begin{bmatrix}
  c \\ 0
\end{bmatrix}
$$

Independent eigenvector가 한 개밖에 존재하지 않기 때문에 $S$를 만들 수 없다.

유의해아 할 점은 diagonalization이 되지 않는 이유가 $\lambda = 0$ 이기 때문이 아니라 $\lambda_1 = \lambda_2$ 이기 때문이라는 점이다.

> $A$의 **diagonalizability** 는 **enough eigenvector** 에 의해 결정된다. <br>
> $A$의 **invertibility** 는 **nonzero eigenvalue** 에 의해 결정된다.

* Diagonalizability와 invertibility는 아무 관계가 없고
* Diagonalization은 중복된(repeated) eigenvalue가 존재 할 때만 불가능하다.
    * 이 경우에도 항상 불가능 한 것은 아니다.
    * e.g., $A=I$ 이면 eigenvalue는 모두 1로 반복되지만 $A$는 항상 diagonal 하다.

## Examples of Diagonalization

**Example 1**

$$
\text{for projection matrix }
A =
\begin{bmatrix}
  {1\over2} & {1\over2} \\
  {1\over2} & {1\over2}
\end{bmatrix}
$$

$$
\begin{matrix}
  det(A-\lambda I) = 0,
  \quad
  \lambda = 1 \quad or \quad \lambda = 0,
  \quad \Lambda =
  \begin{bmatrix}
    1 & 0 \\
    0 & 0
  \end{bmatrix}
  \\
  S=
  \begin{bmatrix}
    1 & 1 \\
    1 & -1
  \end{bmatrix}, \quad
  AS = S\Lambda =
  \begin{bmatrix}
    1 & 0 \\
    1 & 0
  \end{bmatrix},
  \quad S^{-1}AS = \Lambda
\end{matrix}
$$

**Example 2**

$$
\text{for rotation matrix }
K =
\begin{bmatrix}
  0 & -1 \\
  1 & 0
\end{bmatrix}
$$

$$
\begin{matrix}
  det(K-\lambda I) = \lambda^2 + 1 = 0\\
  \quad
  \lambda = i \quad or \quad \lambda = -i
  \\
  S=
  \begin{bmatrix}
    1 & 1 \\
    -i & i
  \end{bmatrix} \quad and \quad
  S^{-1}KS =
  \begin{bmatrix}
    i & 0 \\
    0 & -i
  \end{bmatrix}
\end{matrix}
$$

* Real matrix를 표현하기 위해 complex number가 필요할 수도 있다.
* Real space $R^n$에 존재하는 eigenvalue의 수가 적으면, $C^n$ space에서 생각해야한다.

## Powers and Products: $A^k$ and $AB$

$A^2$의 eigenvalue는 $\lambda_1^2, \lambda_2^2, \cdots, \lambda_n^2$ 이고, $A$의 eigenvector는 $A^2$의 eigenvector와 동일하다.

$Ax = \lambda x$에서 시작하면

$$
A^2x = A\lambda x = \lambda Ax = \lambda^2x
$$

Diagonalization 과정이서도 동일한 결과를 얻을 수 있다.

$$
(S^{-1}AS)(S^{-1}AS) = S^{-1}A^2S = \Lambda^2
$$

정리하면,

* eigenvalues of $A^k$: $\lambda_i^k$
* eigenvector of $A^k$: $S$

$S$가 $A$를 diagonalize 하면 $A^k$ 역시 diagonalize 할 수 있다.

$$
\Lambda^k = (S^{-1}AS)(S^{-1}AS)\cdots(S^{-1}AS) = S^{-1}A^kS
$$

$A$가 invertible하면 inverse ($k=-1$)인 경우에도 성립한다.

* $A^{-1}$의 eigenvalue는 $1/\lambda_i$

$$
if \quad Ax = \lambda x \quad then \quad x = \lambda A^{-1}x \quad and \quad {1\over\lambda}x = A^{-1}x
$$

*optional*

두 matrix의 product (e.g., $AB$)에 대해서는 성립하지 않는다.

$A$의 eigenvalue를 $\lambda$, $B$의 eigenvalue를 $\mu$라고 할 때 다음과 같이 $AB$의 eigenvalue가 $\lambda\mu$라고 잘못 생각할 수 있다.

$$
\text{False Proof} \quad ABx = A\mu x = \mu Ax = \mu\lambda x
$$

$A$와 $B$가 동일한 eigenvector $x$를 공유하고 있다고 가정하고 있지만 실제로는 그렇지 않기 때문이다.

이는 역으로, $AB$의 eigenvalue가 $\lambda\mu$가 되려면 동일한 eigenvector $x$를 공유하고 있어야 한다는 것을 의미한다.

> Diagonalizable matrix는 $AB = BA$일 때만 동일한 eigenvector matrix $S$를 공유한다.

***Proof***

동일한 matrix $S$가 $A = S\Lambda_1S^{-1}$와 $B = S\Lambda_2S^{-1}$를 diagonalize할 때,

$$
\begin{matrix}
  AB = S\Lambda_1S^{-1}S\Lambda_2S^{-1} = S\Lambda_1\Lambda_2S^{-1} \\
  BA = S\Lambda_2S^{-1}S\Lambda_1S^{-1} = S\Lambda_2\Lambda_1S^{-1}
\end{matrix}
$$

Diagonal matrix는 항상 commute 하므로

$$
\Lambda_1\Lambda_2 = \Lambda_2\Lambda_1 \\
AB = BA
$$

반대 방향으로는,

$$
\begin{matrix}
  Ax = \lambda x \\
  (AB)x = (BA)x = B(Ax) = B\lambda x = \lambda Bx \\
  A(Bx) = \lambda (Bx)
\end{matrix}
$$

$x$와 $Bx$ 모두 동일한 eigenvector $\lambda$ 를 공유하는 $A$의 eigenvector 이다.

편의를 위해서 $A$의 eigenvalue가 distinct 하다고 가정하면, $Ax = \lambda x$를 만족하는 각 eigenspace는 모두 one-dimensional* 이므로 $Bx$는 $x$의 multiple이어야 한다. (i.e., $Bx = \mu x$)

결과적으로, $x$는 $B$의 eigenvector다.

## 참고

* [If the eigenvalues are distinct then the eigenspaces are all one dimensional](https://math.stackexchange.com/questions/234689/if-the-eigenvalues-are-distinct-then-the-eigenspaces-are-all-one-dimensional)*

\> 정리

* eigenvalue가 distinct 하면
* $Ax_i = \lambda_ix_i$를 만족하는 $x_i$는 모두 independent하고
* 특정 eigenvalue $\lambda_i$에 대응하는 eigenvector들은 하나의 vector $x_i$로만 이루어져야 한다.
    * $x_i$가 eigenvector이면 $kx_i$도 eigenvector 이므로 이들이 모여서 eigenspace를 이루는 것.
    * 특정 eigenvalue에 대한 eigenspace와 $A$의 diagonalization을 위한 eigenvector matrix를 헷갈리지 말아야 한다.
    * Matrix $A$의 eigenvector matrix $S$의 dimension이 n인 것이지 각 eigenvalue에 대한 eigenspace의 dimension은 1이고 이런 eigenspace가 n개 있는 것.
* 즉, 동일한 $\lambda$에 대한 $x$는 one dimensional이어야 하므로, $Ax = \lambda x$, $A(Bx)=\lambda (Bx)$에서 $Bx$는 $x$의 multiple이어야 하고
* 이를 식으로 나타내면 $Bx = \mu x$ ($\mu$는 상수) 이므로 $x$는 $B$의 eigenvector이다.
* 결과적으로, $A$와 $B$는 동일한 eigenvector $x$를 공유한다.
