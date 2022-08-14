---
layout  : article
title   : 3.4 Orthogonal Basis and Gram-Schmidt
summary : 
date    : 2020-06-04 12:34:55 +0900
updated : 2021-07-12 17:15:30 +0900
tag     : draft
toc     : true
public  : true
parent  : [[/mathematics/hyu-linear-algebra]]
latex   : true
---
* TOC
{:toc}

> 이 글은 KOCW의 한양대학교 선형대수 '13강 일반최소제곱법과 QR 분할' 및 '14강 함수 공간' 강의내용을 복습하기 위해 Gilbert Strang의 [Linear Algebra and Its Applications](https://books.google.co.kr/books?id=8QVdcRJyL2oC) 3.4장과 강의노트를 기반으로 작성한 글입니다.
>
> * 제가 필요한 부분 위주로 확인하면서 정리하고 있어 글에 덜 작성된 부분이 있을 수 있습니다.
> * 글 작성 후 원 서적의 내용이 수정되거나 내용을 이해하기 위한 개인적인 설명이나 해석이 있을 수 있습니다. 되도록 원 서적을 참고해주시길 바랍니다.
> * 잘못된 부분이 있다면 댓글이나 그 외 편하신 방법으로 알려주시면 감사하겠습니다.

Orthogonal vectors

* independent 하기 때문에
* basis vectors가 될 수 있다.

### Orthonormal

Orthogonal basis vector를 각각 그 길이로 나누면 **orthonormal** basis가 된다.

> Vector $q_1, \dots, q_n$은 다음의 경우 orthonormal하다.
> $$
> q_i^Tq_j =
> \begin{cases}
> 0 \qquad whenever i \neq j, \qquad orthogonality \\
> 1 \qquad whenever i = j, \qquad normalization
> \end{cases}
> $$

Orthonormal한 column을 갖는 matrix는 $Q$로 표기한다.
$$
Q =
\begin{bmatrix}
    \\
    q_1 & q_2 & \cdots & q_n \\
    \\
\end{bmatrix}
$$

## Orthogonal Matrices

$Q$가 orthonormal column을 가지면 $Q^TQ = I$이다.

**Orthogonal matrix**는 orthonormal column을 갖는 square matrix이다.

* 그러면 $Q^T$는 $Q$의 inverse가 된다. $Q^T = Q^{-1}$
* Q가 Rectangular matrix인 경우 $Q^T$는 $Q$의 left inverse

**Example**
Rotation matrix

$\theta$ 만큼 이동하는 axes rotation

$$
Q =
\begin{bmatrix}
    cos\theta & -sin\theta \\
    sin\theta & cos\theta
\end{bmatrix},
\qquad
Q^T=Q^{-1}=
\begin{bmatrix}
    cos\theta & sin\theta \\
    -sin\theta & cos\theta
\end{bmatrix}
$$

* Orthogonal: $cos\theta sin\theta - sin\theta cos\theta = 0$
* Orthonormal: $sin^2\theta + cos^2\theta = 1$

**Example**
Permutation matrix

$$
\text{If} \quad P =
\begin{bmatrix}
    0 & 1 & 0 \\
    0 & 0 & 1 \\
    1 & 0 & 0
\end{bmatrix}
\quad
\text{then}
\quad
P^{-1} = P^T =
\begin{bmatrix}
    0 & 0 & 1 \\
    1 & 0 & 0 \\
    0 & 1 & 0
\end{bmatrix}
$$

기하학적으로 orthogonal matrix $Q$는 rotation matrix와 reflection matrix의 곱이다.

Projection matrix는 연산하는 vector의 길이를 줄이지만, Rotation, reflection을 비롯한 orthogonal matrix들은 vector의 길이(length)를 보존한다.
> $$
> \text{Lengths conservation} \qquad \lVert Qx \lVert = \lVert x \lVert \quad \text {for every vector x.}
> $$

이는 $Q^TQ = I$이기 때문에 가능하다. $\lVert Qx \lVert^2 = (Qx)^T(Qx) = x^TQ^TQx = \lVert x \lVert^2$

Inner product와 angle 역시 보존된다.
>$$
>\text{Inner product or angle conservation} \qquad (Qx)^T(Qy) = x^TQ^TQx = x^Tx
>$$

Basis를 알고 있으면 이를 조합하여 어떤 vector라도 만들어 낼 수 있다. Basis가 orthonormal basis일 경우 이 과정이 매우 간단해진다.

문제는 basis vector의 coefficients를 찾아내는 것이다.

임의의 vector $b$에 대해서,
$$
b = x_1q_1 + x_2q_2 + \cdots + x_nq_n
$$

식의 양 변에 $q_1^T$를 곱하면 왼쪽 항은 $q_q^Tb$가 되고 오른쪽 항은 $x_1q_1^Tq_1$을 제외하고는 모두 사라진다. $q_1^Tq_1 = 1$ 이므로

$$
q_i^Tb = x_i, \qquad
\text{since}
\begin{cases}
    q_i^Tq_j = 0, \quad i \neq j \\
    1, \quad i = j
\end{cases}
$$

그러면 모든 vector $b$를 다음과 같이 나타낼 수 있다.
$$
b = (q_1^Tb)q_1 + (q_2^Tb)q_2 + \cdots + (q_n^Tb)q_n
$$

$Qx = b$ 이므로 $x = Q^{-1}b$이다. $Q^{-1} = Q^T$ 이므로 $x = Q^Tb$로 나타낼 수 있다.

$$
x = Q^Tb =
\begin{bmatrix}
   - & q_1^T & - \\
   & \vdots & \\
   - & q_n^T &-
\end{bmatrix}
\begin{bmatrix}
    \\
    b \\
    \\
\end{bmatrix} =
\begin{bmatrix}
    q_1^Tb \\
    \vdots \\
    q_n^Tb
\end{bmatrix}
$$

**Remark 1**

앞서 vector $b$ line $a$로 projection한 vector를 $(a^Tb/a^Ta)a$로 나타냈었다.

$a$를 $q$로 바꾸면
$$
\text{for } q_i, \quad {q_i^Tb \over {q_i}^Tq_i}q_i = (q_i^Tb)q_i = x_iq
$$

$(q_i^Tb)q_i$는 $b$를 $q_i$로 projection한 것과 같다.

이 관점에서, $b = (q_1^Tb)q_1 + (q_2^Tb)q_2 + \cdots + (q_n^Tb)q_n$는 $b$를 각 $q$에 one-dimensional 하게 projection 한 것의 합으로 볼 수도 있다.

**Remark 2**

$Q^T = Q^{-1}$이므로 $Q^TQ = I$일 뿐만 아니라 $QQ^T=I$이다.

이는 $Q$의 row vector를 각각 inner product 한 것으로 row vector들도 orthogonal하다는 결론을 내릴 수 있다.

즉, square matrix의 column이 orthonormal하면 그 row도 orthonormal하다.

## Rectangular Matrices with Orthogonal Columns

3단원에서 주로 Rectangular A에 대해서 다뤘으므로 orthonormal한 column을 갖는 rectangular matrix에 대해서도 생각해보자.

Column의 개수보다 row의 개수가 많은 $Q$는 ($m>n$) least squares를 이용해서 풀어야한다.

핵심은 여전히 $Q^TQ = I$라는 것이다. $Q^T$는 여전히 $Q$의 left-inverse이다. 그러므로 $Q$가 orthonormal column을 가지면 least-square problem은 보다 쉽게 풀 수 있다.

> $$
> \begin{matrix}
> Qx &=& b & \text{rectangular system with no solution for most b} \\
> Q^TQ\hat{x} &=& Q^Tb & \text{normal equation for the best } \hat{x} \\
> \hat{x} &=& Q^Tb & \hat{x_i} \text{ is } q_i^Tb \\
> p &=& Q\hat{x} & \text{the projection of b is } (q_1^Tb)q_1 + \cdots + (q_n^Tb)q_n \\
> p &=& QQ^Tb & \text{the projection matrix is } P=QQ^T
> \end{matrix}
> $$

$$
QQ^T =
\begin{bmatrix}
    1 & 0 & \cdots & 0 & 0s \\
    0 & 1 & \cdots & 0 & 0s \\
    \vdots & \vdots & \ddots & \vdots & 0s \\
    0 & 0 & \cdots & 1 & 0s \\
    0s & 0s & 0s & 0s & 0s
\end{bmatrix}
=
\begin{bmatrix}
    I_{mxn} & 0s \\
    0s & 0s
\end{bmatrix}
$$

**Example**

$b=(x,y,z)$를 $xy$ plane에 project

$$
q_1 =
\begin{bmatrix}
    1 \\ 0 \\ 0
\end{bmatrix}
\quad and \quad
(q_1^Tb) = x;
\qquad
q_2=
\begin{bmatrix}
    0 \\ 1 \\ 0
\end{bmatrix}
\quad and \quad
(q_2^Tb) = y;
$$

$$
P = q_1q_1^T + q_2q_2^T =
\begin{bmatrix}
    1 & 0 & 0 \\
    0 & 1 & 0 \\
    0 & 0 & 1
\end{bmatrix},
\quad and \quad
Pb =
\begin{bmatrix}
    x \\ y \\ 0
\end{bmatrix}
\quad \text{(xy plane)}
$$

**Example**

least square problem에서 측정한 시간 값의 average가 0일 때 straight line에 fitting하기 위한 matrix가 orthogonal column을 갖는다.

자세한 내용은 서적 참고.

## The Gram-Schmidt Process

임의의 independent vector가 $a, b, c$가 주어졌을 때, 이 vector들을 orthonormal basis라면 굉장히 많은 이점이 생긴다.

Gram-Schmidt process로 vector $a, b, c$에서 orthonormal vector $q_1, q_2, q_3$를 얻을 수 있다.

1. $q_1$은 간단하게 $a$의 방향으로 두면 된다.
   * 크기는 1이 되도록 $a$의 길이로 나눠줘야한다.
   $$
   q_1 = {a \over \lVert a \lVert}, \quad \text{unit vector}
   $$

2. $q_2$는 $q_1$에 orthogonal해야 한다.
   * 그러므로 두 번째 vector $b$가 $q_1$ 방향의 component를 갖고있다면 이를 빼줘야한다.
   $$
   \text{Second vector} \qquad B = b-(q_1^Tb)q_1 = (q_2^Tb)q_2 \quad and \quad q_2=B/\lVert B \lVert
   $$
   * ![get q2 from b]( /post-img/hyu-linear-algebra-3-4-gram-schmidt/111249856-b7da2f80-864f-11eb-8da6-621baf27b863.png )
   * $b = (q_1^Tb)q_1 + (q_2^Tb)q_2$

3. 동일한 방법으로 $q_3$를 구할 수 있다.
   $$
   \text{Third vector} \qquad C = c- (q_1^Tc)q_1 - (q_2^Tc)q_2 = (q_3^Tc)q_3 \quad and \quad q_3 = C/\lVert C \lVert
   $$

이처럼 매번 새로운 vector에서 이미 정해진(settled) 방향의 component를 뺴는 방법을 **Gram-Schmidt process**라고 한다.

주어진 vector ${a_1, \cdots, a_n}$에 대해서

$$
A_j = a_j - \sum_{i=1}^{j-1} (q_i^Ta_j)q_i = (q_j^Ta_j)q_j \\
a_j = \sum_{i=1}^j (q_i^Ta_j)q_i \\
q_j = {A_j \over \lVert A_j \lVert} \quad \text{Normalization}
$$

* 계산 과정에서 a_j가 $A_{j-1}$ 안에 놓여있는 것에 가까워 $A_j$의 크기가 굉장히 작은 경우가 발생한다.
* 이 경우 해당 벡터는 이미 이 전에 모두 포함되어있다 가정하고 다음 벡터로 넘어가면된다.

**Exmaple**

주어진 independent vector $a, b, c$로부터 $q_1, q_2, q_3$를 구해라

$
a =
\begin{bmatrix}
    1 \\ 0 \\ 1
\end{bmatrix}
, \quad
b =
\begin{bmatrix}
    1 \\ 0 \\ 0
\end{bmatrix}
, \quad
c =
\begin{bmatrix}
    2 \\ 1 \\ 0
\end{bmatrix}
$

$$
q_1 = {a \over \lVert a \lVert}
= {1 \over \sqrt{2}}
\begin{bmatrix}
    1 \\ 0 \\ 0
\end{bmatrix}
$$

$$
B = b - (q_1^Tb)q_1 =
\begin{bmatrix}
    1 \\ 0 \\ 0
\end{bmatrix}
- {1 \over \sqrt{2}}
\begin{bmatrix}
    1 \over \sqrt{2} \\ 0 \\ 1 \over \sqrt{2}
\end{bmatrix} =
{1 \over 2}
\begin{bmatrix}
    1 \\ 0 \\ -1
\end{bmatrix}
$$

$$
q_2 = {B \over \lVert B \lVert}
= {1 \over \sqrt{2}}
\begin{bmatrix}
    1 \\ 0 \\ -1
\end{bmatrix}
$$

$$
\begin{aligned}
C &= {c - (q_1^Tc)q_1 - (q_2^Tc)q_2} \\
&=
\begin{bmatrix}
    2 \\ 1 \\ 0
\end{bmatrix}
- \sqrt{2}
\begin{bmatrix}
    1 \over \sqrt{2} \\ 0 \\ 1 \over \sqrt{2}
\end{bmatrix}  
- \sqrt{2}
\begin{bmatrix}
    1 \over \sqrt{2} \\ 0 \\ -1 \over \sqrt{2}
\end{bmatrix} =
\begin{bmatrix}
    0 \\ 1 \\ 0
\end{bmatrix}

\end{aligned}
$$

$$
q_3= {C \over \lVert C \lVert} =
\begin{bmatrix}
    0 \\ 1 \\ 0
\end{bmatrix}
$$

## The Factorization $A=QR$

Column이 $a, b, c$인 matrix $A$로부터 $q_1, q_2, q_3$인 matrix $Q$를 이끌어냈다. $A$로부터 $Q$를 만들기 위해서는 이 둘을 연결해주는 세 번째 matrix가 존재해야한다.

요점은 $a$ vector들을 $q$의 조합으로 표현하는 것이다.

위에서 $b$는 $q_1$, $q_2$의 합으로, 비슷하게 $c$는 $q_1$, $q_2$, $q_3$의 합으로 나타낼 수 있다.

$
b = (q_1^Tb)q_1 + (q_2^Tb)q_2 \\
c = (q_1^Tc)q_1 + (q_2^Tc)q_2 + (q_3^Tc)q_3
$

이를 matrix의 형태로 나타내면 $A$를 새로운 **factorization** $A=QR$으로 나타낼 수 있다.

$$
\text{QR factors}
\qquad
A =
\begin{bmatrix}
    & & \\
    a & b & c \\
    & & \\
\end{bmatrix}=
\begin{bmatrix}
    & & \\
    q_1 & q_2 & q_3 \\
    & & \\
\end{bmatrix}
\begin{bmatrix}
    q_1^Ta & q_1^Tb & q_1^Tc \\
    & q_2^Tb & q_2^Tc \\
    & & q_3^Tc \\
\end{bmatrix} =
QR
$$

* $R$은 upper triangle martix로 nonzero가 diagonal의 오른쪽(right)에 위치하기 때문에 R이라고 부른다.
* $QR$ factorization은 첫 factor $Q$가 orthonormal column이라는 것을 제외하면 $A=LU$와 비슷하다.
* $a, B, C$의 lenght는 $R$의 diagonal 성분과 같다.

$QR$ factorization을 이용하면 $A$의 연산이 쉬워진다.

* $A^TA = R^TQ^TQR = R^TR$
* $A^TA\hat{x} = A^Tb$가 triangular system으로 간단해진다: $R^TR\hat{x} = R^TQ^Tb$

## Function Spaces and Fourier Series

Brief and optional section.

* Vector space를 function space로 확장.
* Gram-Schmidt orthogonalization을 function space에 적용.

### 1. Hilbert Space (Function space)

* n dimensional space $R^n$을 $R^{\infty}$로 확장
* $v = (v_1, v_2, v_3, \dots)$
* Finite length를 갖는 vector만 포함, $\lVert v \lVert^2 = v_1^2 + v_2^2 + \cdots1 < \infty$
* Function is defined in a finite interval

Hilbert space는 $R^\infty$ 안에 있으면서 vector가 finite length를 갖는 vector space이다.

**Vector space of Hilbert space**

* $\lVert v_1 + v_2 \lVert \le \lVert v_1\lVert + \lVert v_2 \lVert \lt \infty \rightarrow \text{addition} \in R^\infty$
* $\lVert cv_1 \lVert = \lVert c \lVert \lVert v_1 \lVert \lt \infty \rightarrow \text{scalar multiplication} \in R^\infty$

### 2. Lengths and Inner Products

특정 구간에서의 continuous function $f$는 그 구간 전체에서 연속적인 component $f(x)$를 갖는 vector로 볼 수 있다.

이 vector의 length는 이전에 사용했던 각 component의 제곱값을 더하는 방식으로는 구할 수 없다. $f$를 구하기 위해서는 summation 방식을 특정 구간에서의 integration으로 바꿔야한다.

**Example**

$f(x) = sinx \quad 0 \le x \le 2\pi$

$$
\lVert f(x) \lVert^2 = \int_0^{2\pi}(f(x))^2\, dx = \int_0^{2\pi} (sinx)^2\, dx = \pi
$$

Summation을 integration으로 대체하는 것을 이용해 두 function의 inner product도 구할 수 있다.

**Exmaple**

$f(x) = sinx,\ g(x)=cosx$

$$
(f, g) =
\int_0^{2\pi}f(x)g(x)\, dx = \int_0^{2\pi} sinx\ cosx\, dx = 0
$$

### 3. Fourier Series

**Series**

* Vector space에 basis vector가 존재한 것 처럼 function space에도 basis function이 존재한다.
* Basis function이 있으면 각 function $x(t)$를 basis function의 combination으로 나타낼 수 있다.
* Function의 경우 combination 대신 **series**라는 명칭을 쓴다.
$$
x(t) = \sum_{i=1}^{\infty} a_ib_i(t)
$$

가장 대표적인 예로 $1, t, t^2, \dots$가 function basis이다. 이들은 independent 하지만 orthogonal 하지않다. Function을 구성하는 orthogonal basis는 대표적으로 sine과 cosine이 있다.

Sine과 cosine을 orthogonal basis function으로 expansion한 function이 **Fourier series**이다.

$$
f(x) = a_0 + \sum_{n=1}^\infty a_ncosnx + \sum_{m=1}^\infty b_msinmx
$$

**Orthogonality**

$m, n$ 은 정수, $(m \ne n, m_1 \ne m_2, n_1 \ne n_2)$

$$
\int_0^{2\pi} cosn_1t\ cosn_2t\, dt = {1 \over 2} \int_0^{2\pi} (cos(n_1+n_2)t + cos(n_1-n_2)t)\, dt = 0
$$

동일한 방식으로,

$$
\int_0^{2\pi} cosnt\ sinmt = 0\\
\int_0^{2\pi} sinm_1t\ sinm_2t = 0
$$

**Coefficients**

* 주어진 basis function에 대해서 특정 function을 나타내는 series coefficients는 unique하다.
* 특정 function의 coefficient를 알면 해당 function을 재현할 수 있다
* Coefficients를 구하기 위해서는 양변에 구하려는 coefficient를 갖는 basis를 곱한 다음에 0부터 2$\pi$까지 integrate하면 된다.

**Example**

$$
f(x) = a_0 + a_1cosx + b_1sinx + a_2cos2x + b_2sin2x + \cdots
$$

$b_1$을 구하기 위해서는 양 변에 $sinx$를 곱한 뒤 0부터 2$\pi$까지 적분한다.

$$
\int_0^{2\pi} f(x)sinx\, dx = a_0\int_0^{2\pi} sin\,dx + a_1\int_0^{2\pi} cosx\ sinx\, dx + b_1\int_0^{2\pi} (sinx)^2\, dx + \cdots
$$

오른쪽 항의 적분값은 자기 자신을 곱한 $sinx$ 항만을 제외하고는 모두 0이된다.

그러므로 $b_1$은
$$
b_1 =
{\int_0^{2\pi} f(x)sinx\, dx \over \int_0^{2\pi} (sinx)^2\,dx} =
{(f, sinx) \over (sinx,sinx)}
$$

### 4. Gram-Schmidt for Functions

Sine과 cosine 외의 basis function이 많지만 주로 orthogonal하지 않다. 가장 간단한 polybomial function $1, x, x^2, \dots$ 역시 orthogonal 하지않아  차수가 높아지면 주어진 function f(x)를 나타내는 matrix를 계산하는것은 불가능에 가깝다.

해결 방법은 Gram-Schmidt를 이용해서 orthogonal한 polynomial basis function을 만드는 것이다.

우선, inverval을 $-1 \le x \le 1$처럼 symmetric하게 잡아준다. 이러면 x의 odd power를 가진 항과 even power를 가진 항이 orthogonal하게 된다.

$$
(1, x) = \int_{-1}^1 x\, dx = 0, \qquad (x,x^2) = \int_{-1}^1 x^3\, dx = 0
$$

Polynomial basis vector $1, x, x^2, \dots$에 대해서 orthogonal basis를 $v_1, v_2, v_3, \dots$ 라고 하자.

$v_1 = 1, v_2 = x$ 이다.
$$
(v_1, v_2) = (1, x) =
\int_{-1}^1 x\, dx = 0 \quad \text{orthogonal}
$$

$v_3$를 구해보면,
$$
v_3 = x^2 - {(1,x^2) \over (1,1)}1 - {(x, x^2) \over (x, x)}x =
x^2 - {\int_{-1}^1x^2\,dx \over \int_{-1}^11\,dx} =
x^2 - {1 \over 3}
$$

$v_1, v_2$와의 inner product를 구해서 확인해보면,

$$
\left( 1, x^2 - {1 \over 3} \right) =
\int_{-1}^1 \left( x^2 - {1 \over 3} \right)\, dx = 0 \\
\left( x, x^2 - {1 \over 3} \right) =
\int_{-1}^1 \left( x^3 - {1 \over 3}x \right)\, dx = 0
$$

### 5. Best Straight Line

수업에서 다루지 않음.

### Summary

Set Hilbert space

$$
x(t) = \lim_{\Delta t \to 0} (x(a), x(a+\Delta t), x(a+2\Delta t), \cdots, x(b)) \rightarrow x(t) \in R^\infty
$$

$$
x(t),\ y(t) \in \mathbb{H} \quad (a \le t \le b)\\
x(t) + y(t) \in \mathbb{H}, \quad \alpha x(t) \in \mathbb{H}
$$

Inner products
$$
(x(t), y(t)) = \lim_{\Delta t \to 0} \sum_{k=0}^\infty x(a+k\Delta t)y(a+ k\Delta t) = \int_a^b x(t)y(t)\, dt
$$

Length
$$
\lVert x(t) \lVert^2 = \int_a^b x^2(t)\, dt
$$

Orthogonality
$$
(x(t), y(t)) =  \int_a^b x(t)y(t)\, dt = 0
$$

Series, Basis functions
$$
x(t) = \sum_{i=1}^\infty a_ib_i(t) \\
x(t) = \sum_{i=1}^\infty (q_i(t),x(t))q_i(t), \quad \text{for orthonormal basis}
$$
