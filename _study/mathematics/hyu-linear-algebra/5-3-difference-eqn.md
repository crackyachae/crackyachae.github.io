---
layout  : article
title   : 5.3 Difference Equations and Powers $A^k$
summary : 
date    : 2020-10-05 17:38:24 +0900
updated : 2020-10-14 11:35:42 +0900
tag     : draft
toc     : true
public  : true
parent  : [[/mathematics/hyu-linear-algebra]]
latex   : true
---
* TOC
{:toc}

> 이 글은 KOCW의 한양대학교 선형대수 '19강 차분방정식과 고유값'과 '20강 동질최소제곱법의 해와 마르코프 행렬' 강의내용을 복습하기 위해 Gilbert Strang의 [Linear Algebra and Its Applications](https://books.google.co.kr/books?id=8QVdcRJyL2oC) 5.3장과 강의노트를 기반으로 작성한 글입니다.
>
> * 제가 필요한 부분 위주로 확인하면서 정리하고 있어 글에 덜 작성된 부분이 있을 수 있습니다.
> * 글 작성 후 원 서적의 내용이 수정되거나 내용을 이해하기 위한 개인적인 설명이나 해석이 있을 수 있습니다. 되도록 원 서적을 참고해주시길 바랍니다.
> * 잘못된 부분이 있다면 댓글이나 그 외 편하신 방법으로 알려주시면 감사하겠습니다.

### Differnece equation

수열의 일반항 사이의 관계식

$$
u_{k+1} = Au_k\\
u_k = A^ku_k
$$

* finite 한 수의 finite 한 step으로 진행되는 equation.
* 무한한 수의 극소 단계로 진행되는 'differential equation'과 다르다.

**Exmaples**

1. 등차
   $$
   a_{n+2} - 2a_{n+1} + a_n = 0 \\
   a_n = a_1 + (n-1)d
   $$
2. 계차
   $$
   \begin{aligned}
   pa_{n+2} + qa_{n+1} + ra_n & = 0, \quad (p+q+r = 0) \\
   pa_{n+2} - (p+r)a_{n+1} + ra_n & = 0 \\
   p(a_{n+2} - a_{n+1}) & = r(a_{n-1} + a_n) \\
   b_{n_1} = {r\over p}b_n & \rightarrow a_n = a_1 + \sum_{k=1}^{n-1} b_k
   \end{aligned}
   $$
3. general case
   $$
   pa_{n+2} + qa_{n+1} + ra_n = 0, \quad (p+q+r \neq 0) \\
   a_n = c_1(\alpha_1)^2 + c_2(\alpha_2)^2
   $$

## Fibonacci Numbers

$$
\text{Fibonacci numbers} \quad 0, 1, 1, 2, 3, 5, 8, 13 \\
$$

$$
\text{Fibonacci equations} \quad F_{k+2} = F_{k+1} + F_k
$$

'1000'번째 Fibonacci number을 0과 1부터 시작해서 일일히 더해나가지 않고 구하기 위해서는 위의 difference equation의 해를 구해야 한다.

우선 위의 Fibonacci equation을

* one-step equation인 $u_{k+1} = Au_k$로 나타낼 수 있다.
* 각 step은 $u_k = (F_{k+1}, F_k)$ 로 나타낼 수 있다.

$$
\begin{aligned}
  F_{k+2} & = F_{k+1} + F_k\\
  F_{k+1} & = F_{k+1}
\end{aligned}
\qquad
becomes
\qquad
u_{k+1} =
\begin{bmatrix}
  F_{k+2} \\
  F_{k+1}
\end{bmatrix} =
\begin{bmatrix}
  1 & 1 \\
  1 & 0
\end{bmatrix}
\begin{bmatrix}
  F_{k+1} \\
  F_k
\end{bmatrix} =
Au_k
$$

one-step system $u_{k+1} = Au_k$ 는 $u_0$ 에서 시작해서 각 step마다 $A$를 곱한 것과 같다.

$$
\begin{aligned}
  u_1 & = Au_0 \\
  u_2 & = Au_1 = A^2u_0 \\
  \vdots & \\
  u_{k+1} & = Au_k = A^{k+1}u_0
\end{aligned}
$$

> difference equation의 $u_{k+1} = Au_k$의 solution은 $u_k = A^ku_0$ 이다.

실제로 문제가 되는 것은 $A^k$를 계산하는 것이다.

$A$가 $A = S\Lambda S^{-1}$로 diagonalized 될 수 있다면

$$
u_k = A^ku_0 = (S\Lambda S^{-1})(S\Lambda S^{-1})\cdots(S\Lambda S^{-1})u_0 = S\Lambda^kS^{-1}u_0
$$

이므로 $S^{-1}u_0 = c$ 로 나타내면 solution은 다음과 같다.

$$
u_k = S\Lambda^kc =
\begin{bmatrix}
  \\
  x_1 & \cdots & x_n\\
  \\
\end{bmatrix}
\begin{bmatrix}
  \lambda_1^k & & \\
  & \ddots & \\
  & & \lambda_n^k \\
\end{bmatrix}
\begin{bmatrix}
  c_1 \\
  \vdots \\
  c_n
\end{bmatrix}
= c_1\lambda_1^kx_1 + \cdots + c_n\lambda_n^kx_n
$$

First step을 이용해서 eigenvalue를 구할 수 있다.

$$
A-\lambda I =
\begin{bmatrix}
  1-\lambda & 1 \\
  1 & -\lambda
\end{bmatrix}
\quad has \quad
det(A-\lambda I)=\lambda^2 - \lambda - 1 \\

\text{Two eigenvalues} \quad \lambda_1 = {1+\sqrt{5}\over 2} \quad and \quad \lambda_2 = {1-\sqrt{5}\over 2}
$$

$A-\lambda I$의 second row가 $(1, -\lambda)$ 이므로, eigenvector는 $x=(\lambda, 1)$ 이다. $u_0$는 첫 두 Fibonacci number $F_0=0$, $F_1=1$ 이므로

$$
S^{-1}u_0 =
\begin{bmatrix}
  \lambda_1 & \lambda_2 \\
  1 & 1
\end{bmatrix}^{-1}
\begin{bmatrix}
  1 \\ 0
\end{bmatrix}
\quad gives \quad
c =
\begin{bmatrix}
  1 / (\lambda_1 - \lambda_2) \\
  -1 / (\lambda_1 - \lambda_2)
\end{bmatrix}
= {1\over\sqrt{5}}
\begin{bmatrix}
  1 \\ -1
\end{bmatrix}
$$

위의 $c$가 $u_k = c_1\lambda_1^kx_1 + c_2\lambda_2^kx_2$의 constant이다. 두 eigenvector $x_1$, $x_2$ 모두 second component는 1이므로,

$$
F_k =
{1 \over \sqrt{5}}
\left[ \left({1+\sqrt{5}} \over 2 \right)^k - \left({1-\sqrt{5}} \over 2 \right)^k \right]
$$

결과적으로 1000번째 Fibonacci number는
$$
F_{1000} = \text{nearest integer to }
{1 \over \sqrt{5}} \left({1+\sqrt{5}} \over 2 \right)^{1000}
$$

### Characteristic Equation (강의 추가내용)

$$
\text{Fibonacci equations} \quad F_{k+2} = F_{k+1} + F_k
$$

Fibonacci equation에서 $F_k ~ \lambda^k$ 라고 가정하면,

$$
F_{k+2} - F_{k+1} - F_k = 0 \\
\lambda^{k+2} - \lambda^{k+1} - \lambda^k = 0 \\
$$

$$
\lambda^2 - \lambda - 1 = 0
$$

으로 정리할 수 있는데 이를 characteristic equation 이라고 하고 식으로부터 구한 근이 eigenvalue와 같다.

$$
\lambda_1 = {1+\sqrt{5}\over 2} \quad and \quad \lambda_2 = {1-\sqrt{5}\over 2}
$$

대입하면 $F_k$는 다음과 같이 나타낼 수 있고,

$$
\begin{aligned}
  F_k & =
  c_1\lambda_1^k + c_2\lambda_2^k \\
  & = c_1 \left({1+\sqrt{5}} \over 2 \right)^k - c_2 \left({1-\sqrt{5}} \over 2 \right)^k
\end{aligned}
$$

$F_0=0$, $F_1=1$ 을 이용해서 $c_1$, $c_2$를 구하면 $F_k$를 완성할 수 있다.

만약 characteristic equation의 eigenvalue가 multiple root이면 solution은 다음과 같은 형태가 된다.

* Double root: $F_k = c_1(\lambda)^n + c_2n(\lambda)^n$
* Triple root: $F_k = c_1(\lambda)^n + c_2n(\lambda)^n + c_3n^2(\lambda)^n$

### Least square Problem (강의 추가내용)

앞서 배운 least square problem에서,

$$
Ax = b \qquad
\begin{bmatrix}
  & & \\ & & \\ & A & \\ & & \\ & & \\
\end{bmatrix}
\begin{bmatrix}
  \\ x \\ \\
\end{bmatrix}
= \begin{bmatrix}
  \\ \\ b \\ \\ \\
\end{bmatrix} \\
$$

least square solution을 구하면 다음과 같다.

$$
\begin{aligned}
  A^TAx & = A^Tb \\
  x & = (A^TA)^{-1}A^Tb \\
  J(x) & = min \lVert Ax-b\lVert^2
\end{aligned}
$$

다만 위 식은 $b=0$일 때 (i.e., $Ax = 0$) 이용할 수 없다.

* 이처럼 $b=0$인 경우를 homogeneous equation,
* 아닌 경우 (i.e., $b\neq0$) non-homogeneous equation 이라고 한다.

Homogeneous equation의 least square solution을 구하기 위해서 $\lVert Ax \lVert^2$ 계산해보면,

$$
\lVert Ax \lVert^2 = (Ax)^T(Ax) = x^TA^TAx
$$

$(A^TA)x = \lambda x$ 를 만족하는 $x$가 존재하면

$$
x^TA^TAx = x^T\lambda x = \lambda \lVert x \lVert^2
$$

보다 편한 계산을 위해 $\lVert x \lVert^2 = 1$ 이라고 가정하면 (constraint)

$$
\lVert Ax \lVert^2 = \lambda
$$

로 $\lambda$ 가 minimum이 되는 (A^TA)의 eigenvector $x$가 least square solution이 된다.

* eigenvalue of $A^TA$: error
* eigenvector of $A^TA$: least square solution
* $A^TA$의 eigenvalue는 error 값이므로 항상 0보다 크거나 같다. (i.e., $\lambda \ge 0$)

위에서 임의로 지정한 constraint를 고려해서 minimum을 계산할 수도 있다.

$$
J(x, \lambda) = \lVert Ax \lVert^2 + \lambda(1-\lVert x \lVert^2)
$$

위 식에서 ($\partial J / \partial x) \rightarrow 0$, ($\partial J / \partial \lambda) \rightarrow 0$ 가 되는 값을 구하면 된다.

### Particular solution (강의 추가내용)

$pa_{n+2} + qa_{n+1} + ra_n \ne 0$ 인 경우도 solution을 구할 수 있다.

예를 들어, 다음 식의 경우

$$
pa_{n+2} + qa_{n+1} + ra_n = 2 \left({1\over2}\right)^n
$$

solution은 다음과 같이 나타낸다.

$$
c \left\{ p\left({1\over2}\right)^{n+2} + q\left({1\over2}\right)^{n+1} + r\left({1\over2}\right)^n \right\} = 2 \left({1\over2}\right)^n \\
$$

정리해서 주어진 $p, q, r$에 대해 $c$를 구하면 particular solution을 구할 수 있다.
$$
c \left( {p\over4} + {q\over2} + r \right) = 2
$$

Homogeneous solution과 particular solution을 더하면 General solution을 구할 수 있다.

## Markov Matrices

Markov Matrix는 상태가 변하는 확률 (state transition probability)에 대한 matrix이다.

예를 들어 다음과 같은 상황일 때,

> *매년마다 California 밖의 사람중 ${1\over10}$이 California로 들어오고 California 안의 사람중 ${2\over10}$이 California 밖으로 나간다. California 밖의 사람은 $y_0$, 안의 사람들은 $z_0$명에서 시작한다.*

첫 해가 끝날 때 California 밖과 안의 사람은 다음과 같이 나타낼 수 있다.
$$
\begin{aligned}
  & \text{Difference} \\
  & \text{equation}
\end{aligned}
\qquad
\begin{aligned}
  y_1 = .9y_0 + .2z_0 \\
  z_1 = .1y_0 + .8z_0
\end{aligned}
\quad or \quad
\begin{bmatrix}
  y_1 \\ z_1
\end{bmatrix}
= \begin{bmatrix}
  .9 & .2 \\
  .1 & .8
\end{bmatrix}
\begin{bmatrix}
  y_0 \\ z_0
\end{bmatrix}
$$

위의 예시와 예시의 matrix는 Markov process의 두 가지 중요한 성질을 보여준다.

1. 사람의 수 전체는 유지된다: Markov matri의 각 column의 entry를 더하면 1이 된다.
2. 안과 밖의 사람 수는 negative가 될 수 없다: Matrix는 negative entry를 갖지 않는다.

$u_k = S\Lambda^kS^{-1}u_0$를 이용해서 Markov difference equation을 풀 수 있다.

$$
u_k =
\begin{bmatrix}
  e_1 & e_2
\end{bmatrix}
\begin{bmatrix}
  \lambda_1^k & \\
  & \lambda_2^k
\end{bmatrix}
\begin{bmatrix}
  c_1 \\ c_2
\end{bmatrix}
,\quad
\begin{bmatrix}
  y_k \\ z_k
\end{bmatrix}
= c_1\lambda_1^ke_1 + c_2\lambda_2^ke_2
$$

또한 state transition이 장기화 될 때, population이 'steady state'에 도달하는 것을 보일 수 있다.

우선 $A$를 diagonalize 하면

$$
\begin{aligned}
A-\lambda I =
\begin{bmatrix}
  .9-\lambda & .2 \\
  .1 & .8-\lambda
\end{bmatrix}
\quad has \quad
det(A-\lambda I) = \lambda^2 - 1.7\lambda + .7
\\
\lambda_1 = 1 \quad and \quad \lambda_2 = .7: \qquad
A = S\Lambda S^{-1} =
\begin{bmatrix}
  {2\over3} & {1\over3} \\
  {1\over3} & -{1\over3}
\end{bmatrix}
\begin{bmatrix}
  1 & \\
  & .7
\end{bmatrix}
\begin{bmatrix}
  1 & 1 \\
  1 & -2
\end{bmatrix}
\end{aligned}
$$

$k$년 후의 distribution은

$$
\begin{aligned}
  \begin{bmatrix}
    y_k \\ z_k
  \end{bmatrix}
  & = A^k
  \begin{bmatrix}
    y_0 \\ z_0
  \end{bmatrix}
  =

  \begin{bmatrix}
    {2\over3} & {1\over3} \\
    {1\over3} & -{1\over3}
  \end{bmatrix}
  \begin{bmatrix}
    1^k & \\
    & .7^k
  \end{bmatrix}
  \begin{bmatrix}
    1 & 1 \\
    1 & -2
  \end{bmatrix}
  \begin{bmatrix}
    y_0 \\ z_0
  \end{bmatrix}
  \\
  & = (y_0+z_0)
  \begin{bmatrix}
    {2\over3} \\ {1\over3}
  \end{bmatrix} + (y_0-2z_0)
  \begin{bmatrix}
    {1\over3} \\ -{1\over3}
  \end{bmatrix}
\end{aligned}
$$

오랜 시간이 지날수록 ($k$가 커질수록) $(.7)^k$가 매우 작아진다.

오랜 시간이 지나 limiting state에 도달한 solution $u_\infty = (y_\infty, z_\infty)$는
$$
\text{Steady state} \qquad
\begin{bmatrix}
  y_{\infty} \\ z_\infty
\end{bmatrix}
= (y_0 + z_0)
\begin{bmatrix}
  {2\over3} \\ {1\over3}
\end{bmatrix}
$$

마지막에는 (in the limit) 전체 인구의 $2\over3$은 California 밖에, $1\over3$은 안에 있게된다. 첫 해가 시작할 때, 인구수의 $2\over3$이 밖에 $1\over3$이 안에 있다면 매번 같은 인구수를 유지하게 된다.

$$
\begin{bmatrix}
  .9 & .2 \\
  .1 & .8
\end{bmatrix}
\begin{bmatrix}
  {2\over3} \\ {1\over3}
\end{bmatrix}
=
\begin{bmatrix}
  {2\over3} \\ {1\over3}
\end{bmatrix}
\qquad or \qquad
Au_\infty = u_\infty
$$

이 때, Steady state는 $\lambda = 1$에 상응하는 $A$의 eigenvector이다. $A$를 곱해 다음 step으로 넘어가도 $u_\infty$는 바뀌지 않는다.

위의 예시에서 볼 수 있는 Markov process의 theory는:

> 모든 $a_{ij} \ge 0$를 갖고 각 column의 entry를 더하면 1이되는 Markov matrix $A$에 대해
>
> 1. $\lambda_1 = 1$은 $A$의 eigenvalue이다.
> 2. 그것의 eigenvector $x_1$는 nonnegative이고, 이 eigenvector는 $Ax_1=x_1$인 steady state이다.
> 3. 다른 eigenvalue들은 $\lVert \lambda_i \lVert \le 1$을 만족한다.
> 4. $A$나 $A$의 $k$제곱이 모두 positive entry를 가지면 다른 $\vert \lambda_i \vert$는 1보다 작다.
> 5. $A^ku_0$는 $x_1$의 상수 배로 접근하며 이는 steady state $u_\infty$이다.

## Stability of $u_{k+1} = Au_k$

Fibonacci number과 Markov process의 차이점

* Fibonacci number $F_k$는 점점 커지므로 Fibonacci equation은 *unstable*하다.
* Markov equation의 각 stage를 더하면 1이 되므로 Markov process는 *neutrally stable* 하다.

$k \rightarrow \infty$일 때, $u_{k+1} = Au_k$의 behavior를 살펴보면

* $A$는 diagonalizable
* $u_k$는 combination of pure solution이라 가정

$$
\text{Solution at time k} \qquad u_k = S\Lambda^kS^{-1}u_0 = c_1\lambda_1^kx_1 + \cdots + c_n\lambda_n^kx_n
$$

위 식에서 $u_k$의 grouwth는 $\lambda_i^k$에 의해 결정된다.

즉, Stability는 eigenvalue에 의해 결정된다:
> Difference equation $u_{k+1} = Au_k$는
>
> * 모든 eigenvalue가 $\vert \lambda_i \vert \lt 1$을 만족하면 ***stable***
> * 몇몇 eigenvalue는 $\vert \lambda_i \vert = 1$이고 나머지는 $\vert \lambda_i \vert \lt 1$이면 ***neutrally stable***
> * 최소 하나의 eigenvalue라도 $\vert \lambda_i \vert \gt 1$ 이면 ***unstable***

## Positive Matrices and Applications in Economics

강의에서 다루지 않음
