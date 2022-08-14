---
layout  : article
title   : 2.4 The Four Fundamental Subspaces
summary : 
date    : 2020-03-13 19:03:42 +0900
updated : 2021-03-24 23:37:35 +0900
tag     : draft
toc     : true
public  : true
parent  : [[/mathematics/hyu-linear-algebra]]
latex   : true
---
* TOC
{:toc}

> 이 글은 KOCW의 한양대학교 선형대수 '8강 벡터공간의 차원과 네 가지 부벡터공간' 강의내용을 복습하기 위해 Gilbert Strang의 [Linear Algebra and Its Applications](https://books.google.co.kr/books?id=8QVdcRJyL2oC) 2.4장과 강의노트를 기반으로 작성한 글입니다.
>
> * 제가 필요한 부분 위주로 확인하면서 정리하고 있어 글에 덜 작성된 부분이 있을 수 있습니다.
> * 글 작성 후 원 서적의 내용이 수정되거나 내용을 이해하기 위한 개인적인 설명이나 해석이 있을 수 있습니다. 되도록 원 서적을 참고해주시길 바랍니다.
> * 잘못된 부분이 있다면 댓글이나 그 외 편하신 방법으로 알려주시면 감사하겠습니다.

**Basis** 를 표기하기 위해서는 systematic한 절차가 필요하다.

Subspace는 Space로 span하는 벡터의 집합\*이나 Space의 vectors가 반드시 충족시켜야하는 조건\*\*으로 표현할 수 있지만 두 경우 모두 벡터집합에 dependent vectors가 포함될 수 있기 때문에 basis를 표현하기에 충분하지 않다.

* column space는 columns들이 span해서 생성 \*
* null space는 Ax = 0을 만족시키는 벡터집합 \*\*

행렬의 basis를 찾는 절차를 알기 위해서 full rank(extreme case)인 경우를 생각해보자.

> Rank가 최대로 클 때, 즉 $r=n\ or\ r=m\ or\ r=m=n$ 일 때, 행렬은 left-inverse $B$ or right-inverse $C$ or two-sided $A^{-1}$를 갖는다.

## Four Fundamental Subspaces

위의 설명을 이해하기 위해서는 우선 m by n 행렬 $A$의 **four subspaces**를 이해해야 한다.

| subspaces                                 | notation | dimension |
| ----------------------------------------- | -------- | --------- |
| column space of $A$                       | $C(A)$   | rank r    |
| nullspace of $A$                          | $N(A)$   | n-r       |
| row space of $A$, column space of $A^T$   | $C(A^T)$ | r         |
| left nullspace of $A$, nullspace of $A^T$ | $N(A^T)$ | m-r       |

* $N(A)$와 $C(A^T)$는 $R^n$의 subspaces이다.
* $N(A^T)$와 $C(A)$는 $R^m$의 subspaces이다.

**Example 1**

$$
A=U=R=\begin{bmatrix} 1 & 0 & 0 \\ 0 & 0 & 0 \end{bmatrix}
$$

* $C(A)$: The line through $\begin{bmatrix} 1 \\ 0 \end{bmatrix}$, dimension: 1
* $C(A^T)$: The line through $\begin{bmatrix} 1 & 0 & 0 \end{bmatrix}^T$, dimension: 1
* $N(A)$: A plane contains $\begin{bmatrix} 0 \\ 1 \\ 0 \end{bmatrix},\ \begin{bmatrix} 0 \\ 0 \\ 1 \end{bmatrix}$, dimension: 2
* $N(A^T)$: A line through $\begin{bmatrix} 0 \\ 1 \end{bmatrix}$, dimension: 1

matrix A와 A를 elimination한 echelon form U에 대해서 four subspaces를 구해보면

$$
A=\begin{bmatrix} 1 & 3 & 3 & 2 \\ 2 & 6 & 9 & 7 \\ -1 & -3 & 3 & 4 \end{bmatrix}\ \rightarrow\ U=\begin{bmatrix} 1 & 3 & 3 & 2 \\ 0 & 0 & 3 & 3 \\ 0 & 0 & 0 & 0 \end{bmatrix}
$$

1. The row space of A

> $U$의 nonzero rows에 해당하는 $A$의 rows가 basis이다. Dimension은 $r$로 pivot (or nonzero rows)의 개수와 같다.

* $A$와 $U$의 row spaces는 같다. (Gaussian Elimination이 row space를 바꾸지 않는다.)
* $A$의 row space는 $U$의 row space와 동일한 dimension과 bases를 갖는다.

2. The nullspace of A

> $Ax=0$에서 r개의 solution만 independent하며 n-r개의 special solution이 nullspace의 basis가 된다.
> Special solutions가 nullspace의 basis이다. nullspace의 dimension은 n-r이다.

* Gaussian Elimination으로 $Ax=0\ \rightarrow\ Ux=0$이 됐을 때 solution은 변하지 않기 때문에 $A$와 $U$의 nullspace는 같다.

$$
Special\ Solutions \quad \begin{matrix}v = 0 \\ y = 1\end{matrix} \quad x_1=\begin{bmatrix} -3 \\ 1 \\ 0 \\ 0 \end{bmatrix}, \quad \begin{matrix}v = 1 \\ y = 0\end{matrix} \quad x_2=\begin{bmatrix} 1 \\ 0 \\ -1 \\ 1 \end{bmatrix}
$$

$c_1x_1+c_2x_2=0\ \rightarrow\ c_1=c_2=0$ for free variables (independent)
$n-r=4-2$ vectors are a basis

3. The column space of A

> Pivot columns(pivots이 있는 column)이 $A$의 column space의 basis이다. Dimension은 rank $r$이다.

* column space의 dimension은 rank $r$로 row space의 dimension과 같다.
* 즉 independent한 columns의 개수와 independent한 rows의 개수가 같다.

4. The left nullspace of A (nullspace of $A^T$)

$$
y^T=\begin{bmatrix} y_1 & \cdots & y_m \end{bmatrix}\begin{bmatrix} A \end{bmatrix}=\begin{bmatrix} 0 & \cdots & 0 \end{bmatrix}
$$

* dimension of $C(A)$ + dimension of $N(A)$ = number of columns= $n$
* dimension of $N(A)$ = $n-r$
* dimension of $C(A^T)$ + dimension of $N(A^T)$ = number of rows= $m$
* dimension of $N(A^T)$ = $m-r$

**Example 2**

$$
A=\begin{bmatrix} 1 & 2 \\ 3 & 6 \end{bmatrix},\ U=\begin{bmatrix} 1 & 2 \\ 0 & 0 \end{bmatrix},\ m=n=2,\ r=1
$$

* column space: all multiples of $\begin{bmatrix} 1 \\ 3 \end{bmatrix}$
* nullspace: all multiples of $\begin{bmatrix} -2 \\ 1 \end{bmatrix}$
$Ax=0,\ x_1+2x_2=0,\ x_1=-2x_2$
* row space: all multiples of $\begin{bmatrix} 1 \\ 2 \end{bmatrix}$
* left nullspace: all multiples of $\begin{bmatrix} -3 \\ 1 \end{bmatrix}$
$A^T=\begin{bmatrix} 1 & 3 \\ 2 & 6 \end{bmatrix}\ \rightarrow\ \begin{bmatrix} 1 & 3 \\ 0 & 0 \end{bmatrix}$
$A^Ty=0,\ y_1+3y_2=0,\ y_1=-3y_2$

## Existence of Inverses

Inverse는 행렬의 rank가 최대로 큰 경우에 존재한다.

m by n matrix $A$에 대해서

* $m \ge n$인 $A$는 left inverse를 갖는다. $r=n,\ A^{-1}A=I_{nxn}$
* $n \ge m$인 $A$는 right inverse를 갖는다. $r=m,\ AA^{-1}=I_{mxm}$
* square matrix인 $A$는 two-sided inverse를 갖는다. $r=m=n,\ AA^{-1}=A^{-1}A=I$

### Exsistence

* Full row rank ($r=m$)인 경우

* Columns가 $R^m$으로 span할 때 $Ax=b$는 모든 $b$에 대해서 적어도 한 개의 solution $x$를 갖는다.
* $A$는 right-inverse $C$를 갖는다. $AC=I_m$ (m by m)
* $AC=I,\ Ax=b\ \rightarrow\ Ax=ACb=b,\ x=Cb$
* 가능한 solution은 $x=Cb$이며 다른 right-inverse가 있으면 다른 solutions도 존재한다. (1 or $\infty$ solution)

### Uniqueness

* Full column rank ($r=n$)인 경우

* Columns가 linearly independent할 때 $Ax=b$는 모든 $b$에 대해서 최대 한 개의 solution $x$를 갖는다.
* A는 left-inverse $B$를 갖는다. $BA=I_n$ (n by n)
* $BA=I,\ Ax=b\ \rightarrow\ x=BAx=Bb,\ x=Bb$ (unique)
* Solution이 존재한다면 $x=Bb$이며 solution이 존재하지 않을 수 있다. (0 or 1 solution)

### One-sided inverse (best left/right inverse)

* $BA=I,\ B=A^{-1}=(A^TA)^{-1}$
* $AC=I,\ C=A^{-1}=(AA^T)^{-1}$

**Example 3**

2 by 3 matrix of rank 2
$$
A=\begin{bmatrix} 4 & 0 & 0 \\ 0 & 5 & 0 \end{bmatrix}
$$

$r=m=2$이므로 right-inverse $C$가 존재한다.

$$
AC=\begin{bmatrix} 4 & 0 & 0 \\ 0 & 5 & 0 \end{bmatrix}\begin{bmatrix} 1/4 & 0 \\ 0 & 1/5 \\ c_{31} & c_{32} \end{bmatrix}=
\begin{bmatrix} 1 & 0 \\ 0 & 1 \end{bmatrix}
$$

$C$의 마지막 rows가 임의의 값으로 이루어져 있으므로 이를 만족하는 right-inverse $C$는 굉장히 많다.
이 중 특정한(best) right-inverse를 고르면

$$
A^T(AA^T)^{-1}=\begin{bmatrix} 4 & 0 & 0 \\ 0 & 5 & 0 \end{bmatrix}\begin{bmatrix} 1/16 & 0 \\ 0 & 1/25 \end{bmatrix}=
\begin{bmatrix} 1/4 & 0 \\ 0 & 1/5 \\ 0 & 0 \end{bmatrix}=C
$$

### Inverse of square matrix

* Rectangular matrix는 existence와 uniquness를 동시에 만족시킬 수 없다.

* 반대로 quare matrix는 두 성질을 하나만 만족시킬 수 없다. (만족시킬 경우 둘 다 만족시켜야 함.)

### Full rank square matrix

> ($r=m=n$)의 invertibility 조건

각 조건은 모두 invertibility에 대한 필요충분조건이다.

1. Columns가 $R^n$으로 span해야한다. 즉 $Ax=b$는 모든 b에 대해 최소 한 개의 solution을 가져야 한다.
2. Columns가 independent해야한다. 즉 $Ax=0$은 오직 $x=0$ 한 개의 solution만 가져야 한다.
3. Rows가 $R^n$으로 span해야한다.
4. Rows가 independent해야한다.
5. Elimination이 모든 n개의 pivot이 존재한 채로 완료되어야 한다. ($PA=LDU$)
6. $A$의 determinant가 zero가 아니어야한다.
7. Zero가 $A$의 eigenvalue가 아니어야한다.
8. $A^TA$가 positive definite 해야한다.
