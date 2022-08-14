---
layout  : article
title   : 5.5 Complex Matrix
summary : 
date    : 2020-11-18 19:35:32 +0900
updated : 2020-11-27 14:41:11 +0900
tag     : draft
toc     : true
public  : true
parent  : [[/mathematics/hyu-linear-algebra]]
latex   : true
---
* TOC
{:toc}

> 이 글은 KOCW의 한양대학교 선형대수 '22강 복소행렬과 에르미트행렬' 강의내용을 복습하기 위해 Gilbert Strang의 [Linear Algebra and Its Applications](https://books.google.co.kr/books?id=8QVdcRJyL2oC) 5.5장과 강의노트를 기반으로 작성한 글입니다.
>
> * 제가 필요한 부분 위주로 확인하면서 정리하고 있어 글에 덜 작성된 부분이 있을 수 있습니다.
> * 글 작성 후 원 서적의 내용이 수정되거나 내용을 이해하기 위한 개인적인 설명이나 해석이 있을 수 있습니다. 되도록 원 서적을 참고해주시길 바랍니다.
> * 잘못된 부분이 있다면 댓글이나 그 외 편하신 방법으로 알려주시면 감사하겠습니다.

space $C^n$: $n$개의 complex components로 이루어진 vector space

* Addition과 multiplication은 real space와 동일하게 한다.
* Length는 real space와 다른 방법으로 구해야한다.

예를 들어 $C^2$의 vector $(1,i)$의 length를 구할 때,

* 기존의 방법으로는 length가 $1^2 + i^2 = 0$ 이 되지만
* 실제 길이의 제곱은 $1^2 + \lvert i \lvert ^2 = 2$ 이다.

즉 length를 계산하는 방법이 다음과 같이 바뀐다.

$$
\lVert x \lVert ^2 = \lvert x_1 \lvert^2 + \cdots +  \lvert x_n \lvert ^2
$$

## Complex Numbers and Their Conjugates

![complex plane]( /post-img/hyu-linear-algebra-5-5-complex-matrix/111249861-b872c600-864f-11eb-8c3b-f07a5c4f4b0a.png )

* Complex number: $a + ib$
    * $a$: real number
    * $ib$: imaginary number ($b$는 real, $i^2 = -1$)

* Complex conjugate (of $a + ib$): $a - ib$
    * 기존의 complex number의 imaginary part 부호가 반대인 숫자.
    * 기존의 complex number를 real axix에 대해 반사시킨 것과 같다.
    * bar 혹은 star notation을 이용해 나타낸다: $\overline{a + ib} = (a + ib)^* = a - ib$

* Absolute value: complex number $a + ib$와 그 complex conjugate $a - ib$를 곱한 값이다.
    * distance $r$이 $a + ib$ 의 absolute value 이다.
$$
\text{Absolute value} \qquad (a + ib)(a - ib) = a^2 + b^2 = r^2 \\
\text{distance} \qquad r = \lvert a + ib \lvert = \sqrt{a^2 + b^2}
$$

* Polar form: $r$과 trigonometry를 이용해 $a$와 $b$를 나타낼 수 있다.
    * $a = rcos\theta, \ b = rsin\theta$
$$
\text{Polar form} \qquad a + ib= r(cos\theta + isin\theta) = re^{i\theta}, \quad
\theta = tan^{-1}(b/a)
$$

## Lengths and Transposes in the Complex Case

complex vector space $C^n$는 $n$개의 complex components로 이루어진 vector $x$를 포함한다.

$$
\text{Complex vector} \qquad x =
\begin{bmatrix}
  x_1 \\ x_2 \\ \vdots \\ x_n
\end{bmatrix}
\quad
\text{with components}
\quad
x_j = a_j + ib_j
$$

### Length

vector의 length는 위의 새로운 length definition에 의해 각 component $x_j^2$는 modulus $\lvert x_j \lvert ^2$로 바꾸면

$$
\text{Length squared} \qquad \lVert x \lVert ^2 = \lvert x_1 \lvert^2 + \cdots +  \lvert x_n \lvert ^2
$$

Real vector에서 볼 수 있었던 length와 inner product 사이의 연관성은 complex vector에서도 유지된다. 새롭게 정의한 length에 맞기 위해서는 inner product를 수정해주어야 한다.

* inner product를 구하는 첫 번째 vector를 conjugate 해주면 된다.

$$
\text{Inner product} \qquad \overline{x}^Ty = \overline{x}_1y_1 + \cdots + \overline{x}_ny_n
$$

* 기본적으로 $\overline{x}^Ty \ne \overline{y}^Tx$
* $\overline{x}^Ty$이 real number 일 경우 $\overline{x}^Ty = \overline{y}^Tx$

이를 이용해 위의 length를 다시 나타내면
$$
\begin{aligned}
  \lVert x \lVert ^2 & = \lvert x_1 \lvert^2 + \lvert x_2 \lvert^2 + \cdots +  \lvert x_n \lvert ^2 \\
  & = \overline{x}_1x_1 + \overline{x}_2x_2 + \cdots + \overline{x}_nx_n \\
  & = \overline{x}^Tx
\end{aligned}
$$

### Hermitian

Inner product를 표현하기 위해 사용한 bar (for conjugate)와 $T$ (for transpose) notation을 conjugate transpose 한 개로 표현할 수 있다. 기호로는 윗첨자 $H$를 사용한다.

$$
\text{A Hermitian} \qquad A^H = \overline{A}^T \quad \text{has entries} \quad (A^T)_{ij} = \overline{A_{ji}}
$$

$$
\text{Conjugate transpose} \qquad
\begin{bmatrix}
  2 + i & 3i \\
  4 - i & 5 \\
  0 & 0
\end{bmatrix} ^H =
\begin{bmatrix}
  2 - i & 4 + i & 0 \\
  -3i & 5 & 0
\end{bmatrix}
$$

정리하면, vector $x = (x_1, x_2, \cdots, x_n)$에 대해
>
> * $x$와 $y$의 inner product는 $\overline{x}^Ty$ 이다. Orthogonal vector는 $\overline{x}^Ty = 0$을 만족한다.
> * $x$의 squared length: $\lVert x \lVert^2 = x^Hx = \lvert x_1 \lvert^2 + \cdots + \lvert x_n \lvert ^2$
> * $(AB)^H = B^HA^H$ 이다. ($(AB)^T = B^TA^T$를 conjugate)

## Hermitial Matrices

* With real components: Symmetric matrix $A^T = A$
* With complex components: Hermitial matrix $A^H = A$

자신의 conjugate transpose와 동일한 matrix $A$를 Hermitial matrix라고 한다.

$$
\text{Hermitian matrix} \qquad A =
\begin{bmatrix}
  2 & 3 - 3i \\
  3 + 3i & 5
\end{bmatrix} = A^H
$$

* Diagonal entry는 conjugation에 의해 바뀌면 안되므로 항상 real 이다.
* Off diagonal entry는 $a_{ij} = \overline{a_{ji}}$를 만족한다.

### Properties of Hermitian matrix

Hermitian matrix의 property는 symmetric matrix의 property와 동일하다. 실제로 real인 symmetric matrix는 Hermitian 이라고 할 수 있다.

> 1. $A = A^H$ 이면 $x^HAx$는 real 이다.

*Proof*

1 by 1 matrix (= scalar number) $x^HAx$를 conjugate 시키면
$$
(x^HAx)^H = x^HA^Hx = x^HAx
$$
conjugate 값이 자신과 같으면 real number 이다.

위의 martix가 correlation matrix $R = A^HA$ 인 경우,
$$
x^HRx = x^HA^HAx = (Ax)^HAx = \lVert Ax \lVert ^2 \gt 0
$$

> 2. $A = A^H$ 이면 모든 eigenvalue는 real 이다.

*Proof*

complex vector $x$에 대해 $Ax = \lambda x$ 이므로 양 변에 $x^H$를 곱하면
$$
\begin{aligned}
  x^HAx & = x^H\lambda x \\
  & = \lambda x^Hx = \lambda \lVert x \lVert ^2 \\
  \lambda & = {x^HAx \over \lVert x \lVert ^2}
\end{aligned}
$$

* 첫 번째 property 에서 $x^HAx$ 가 real 이고
* $\lVert x \lVert ^2$ 역시 $x$ 의 length로 real 이다.

결과적으로 $\lambda$ 는 real 이다.

correlation matrix $R = A^HA$의 경우 positive eigenvalue를 갖는다.
$$
{\lVert Ax \lVert ^2 \over \lVert x \lVert ^2} = \lambda \gt 0
$$

> 3. 다른 두 eigenvalue로 부터 온 Hermitian matrix의 eigenvector는 서로 orthogonal (& independent) 하다.

*Proof*

$Ax_1 = \lambda_1x_1, \ Ax_2 = \lambda_2x_2 \ (\lambda_1 \ne \lambda_2)$ 를 만족하는 $A = A^H$ 의 eigenvector 에 대해

$$
\begin{aligned}
  (Ax_1)^Hx_2 & = x_1^HA^Hx_2 = x_1^HAx_2 = x_1^H\lambda_2x_2 = \lambda_2x_1^Hx_2 \\
  & = (\lambda_1x_1)^Hx_2 = x_1^H\lambda_1^Hx_2 = \lambda_1x_1^Hx_2
\end{aligned} \\
$$

위의 두 식에서
$$
(\lambda_1 - \lambda_2)x_1^Hx_2 = 0
$$

$\lambda_1 \ne \lambda_2$ 이므로 $x_1^Hx_2 = 0$ 이다.

### Choose unit eigenvectors

eigenvector를 length가 1인 unit vector로 골라 (orthonormal vectors) matrix를 구성 할 수 있다.

$A$가 real symmetric matrix 일 경우,

* property 2에 의해 eigenvalue는 real이고
* property 3에 의해 eigenvector는 orthogonal하다.
* 이 때 eigenvector를 unit vector로 구성하면

$$
\begin{aligned}
  A & = S\Lambda S^{-1} = Q\Lambda Q^{-1} = Q\Lambda Q^T \\
  & =
  \begin{bmatrix}
    \lvert & & \lvert \\
    x_1 & \cdots & x_n \\
    \lvert & & \lvert
  \end{bmatrix}
  \begin{bmatrix}
    \lambda_1 & & \\
    & \ddots & \\
    & & \lambda_n
  \end{bmatrix}
  \begin{bmatrix}
    - & x_1^T & - \\
    & \vdots & \\
    - & x_n^T & - \\
  \end{bmatrix} \\
  & = \lambda_1x_1x_1^T + \lambda_2x_2x_2^T  + \cdots + \lambda_nx_nx_n^T
\end{aligned}
$$

* $Q: \text{orthogonal matrix} \\$
* $QQ^T = I \quad \rightarrow \quad Q^{-1} = Q^T$

### Spectral theorem

위의 $A = \lambda_1x_1x_1^T + \lambda_2x_2x_2^T  + \cdots + \lambda_nx_nx_n^T$를 *spectral* theorem 이라고 한다.

* matrix $A$를 서로 orthogonal한 eigenvector 로 one-dimensional projection 한 것의 combination으로 볼 수 있다.
* 이 때, eigenvalue가 각 eigenvector 가 matrix의 어느 정도를 차지하고 있는지를 나타내는 가중치(weight) 역할을 한다.

geometry 나 mechanics 에서는 이를 *principal axis theorem* 이라고 하며 ellipse에서 주 축 (axes)를 올바르게 구하기 위해 쓰인다.

* 가중치인 $\lambda$가 큰 component를 principal component 라고 한다.
* principal component 들이 기존의 matrix를 더 잘 approximate 하는 componenet 이기 때문에 이를 찾아 n-dimensional의 vector 공간을 간소화 할 수 있다 (data compression)

**Remark**

* matrix $A$가 real 이면 그 eigenvalue와 eigenvector 역시 real이다.
    * $(A-\lambda I)x = 0$ 을 풀 수 있으며 그 과정에서 elimination 을 사용할 수 있다.
    * 하지만 $A$가 symmetric 하지 않으면 eigenvector가 orthogonal 하다는 것은 보장할 수 없다.
* matrix $A$가 real 이면 모든 complex eigenvalues 는 conjugate pair 이어야 한다.
    * $Ax = \lambda x$ and $A\overline{x} = \overline{\lambda}\overline{x}$
    * $a + ib$ 가 real matrix의 eigenvalue 이면 $a - ib$ ($b \ne 0$) 도 그 matrix의 eigenvalue.

## Unitary Matrix

orthogonormal columns 로 구성된 complex matrix를 *unitary matrix* 라고 한다.

* Hermitian (symmetric) matrix 를 real number에 비교했던 것 처럼
* unitary (orthogonal) matrix는 unit circle* 위의 number에 비교할 수 있다.

\* absolute value가 1인 complex number를 나타내는 circle

$$
\text{Unitary matrix} \qquad  U^HU = I, \quad UU^H = I, \quad and \quad U^H = U^{-1}
$$

### Properties of unitary matrix

> 1. U has no effect on inner products, angles and lengths

*Proof*
$$
\begin{aligned}
  \text{Inner product} \qquad & (Ux)^H(Uy) = x^HU^HUy = x^Hy \\
  \text{Length unchanged} \qquad &\lVert Ux \lVert ^2 = (Ux)^H(Ux) = x^HU^HUx = x^Hx = \lVert x \lVert^2
\end{aligned}
$$

> 2. Every eigenvalue of U has absolute value $\lvert \lambda \lvert = 1$

*Proof*
$$
\begin{aligned}
  Ux & = \lambda x \\
  \lVert Ux \lVert & = \lVert \lambda x \lVert =
  \lvert \lambda \lvert \lVert x \lVert \\
  & = \lVert x \lVert (\text{length preserved})
\end{aligned}
$$

$$
\lvert \lambda \lvert \lVert x \lVert = \lVert x \lVert
\quad \rightarrow \quad
\lvert \lambda \lvert = 1
$$

> 3. 다른 값의 eigenvalue에 대응하는 eigenvectors는 orthonormal 하다.

*Proof*
$$
Ux_1 = \lambda_1x_1, \quad Ux_2 = \lambda_2x_2, \quad (\lambda_1 \ne \lambda_2)
$$

이 둘의 inner product를 구하면

$$
\begin{aligned}
  (Ux_1)^H(Ux_2) & = (\lambda_1x_1)^H(\lambda_2x_2) = \overline{\lambda_1}\lambda_2x_1^Hx_2 \\
  & = x_1^Hx_2 \ (\text{by property 1})
\end{aligned}
$$

$$
\overline{\lambda_1}\lambda_2x_1^Hx_2 = x_1^Hx_2
\quad \rightarrow \quad
(\overline{\lambda_1}\lambda_2 - 1)x_1^Hx_2 = 0
$$

위의 식에서 $\overline{\lambda_1}\lambda_2 = 1$ 혹은 $x_1^Hx_2 = 0$ 이고, property 2에서 $\overline{\lambda_1}\lambda_1 = 1$ 이고 두 eigenvector의 값은 달라야 하므로 전자는 만족할 수 없다.

결과적으로 $x_1^Hx_2 = 0$ 이고 $x_1$과 $x_2$는 orthogonal 하다.

### Skew-Hermitian

강의에서 다루지 않음.
