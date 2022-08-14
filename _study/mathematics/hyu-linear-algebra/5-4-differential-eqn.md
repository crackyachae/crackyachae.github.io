---
layout  : article
title   : 5.4 Differential Equations and $e^{At}$
summary : 
date    : 2020-11-13 17:04:56 +0900
updated : 2020-11-14 18:16:20 +0900
tag     : draft
toc     : true
public  : true
parent  : [[/mathematics/hyu-linear-algebra]]
latex   : true
---
* TOC
{:toc}

> 이 글은 KOCW의 한양대학교 선형대수 '21강 연립미분방정식과 행렬' 강의내용을 복습하기 위해 Gilbert Strang의 [Linear Algebra and Its Applications](https://books.google.co.kr/books?id=8QVdcRJyL2oC) 5.4장과 강의노트를 기반으로 작성한 글입니다.
>
> * 제가 필요한 부분 위주로 확인하면서 정리하고 있어 글에 덜 작성된 부분이 있을 수 있습니다.
> * 글 작성 후 원 서적의 내용이 수정되거나 내용을 이해하기 위한 개인적인 설명이나 해석이 있을 수 있습니다. 되도록 원 서적을 참고해주시길 바랍니다.
> * 잘못된 부분이 있다면 댓글이나 그 외 편하신 방법으로 알려주시면 감사하겠습니다.

* Difference equation, $u_k = A^ku_0$의 solution이 $A$에 depend 했다면
* Differential equation, $u(t)=e^{At}u(0)$는 $A$의 exponential에 depend 하다.

$$
\text{Differential equation} \qquad {du\over dt} = Au \\
\text{solution} \qquad u(t) = u(0)e^{At}
$$

### Breef introduction to differential equation

{% raw %}
$$
c_0e^{at} \quad \xrightarrow{{d/dt}} \quad c_0ae^{at} \\
y(t) \quad \xrightarrow{{d/dt}} \quad ay(t) \\
{dy(t) \over dt} = ay(t)
$$
{% endraw %}

Difference equation에서 확장시키면

$$
a_{n+1} - ra_n = 0 \quad \Rightarrow \quad y'(t) - ay(t) = 0 \\
y'(t) = ay(t) \quad \rightarrow \quad y(t) = ce^{at}
$$

다른 방식으로도 해를 구해보면

$$
y'(t) = ay(t) \\
{y'(t)\over y(t)} = a \\
\ln{y(t)} = at + c \\
y(t) = ce^{at}
$$

$y'(t) - ay(t) = 0$

* homogeneous (i.e. LHS = 0) ordinary 1st order differential equation
* solution $y(t) = e^{at}$

Difference equation 과 유사하게 Characteristic equation을 구할 수 있다.

$$
\text{for} \quad y(t) = e^{\lambda t} \\
y' + ay = \lambda e^{\lambda t} + ae^{\lambda t} = 0 \\
\lambda + a = 0
$$

조금 더 복잡한 differential equation 으로

$y'' + ay' + by = 0$

* homogeneous ordinary 2nd order differential equation
* solution $y = c_1e^{\lambda_1 t} + c_2e^{\lambda_2 t}$
* characteristic equation $\lambda^2 + a\lambda +b = 0$

이 있고, 해당 단원에서 주로 보게 될 형태이다.

characteristic equation 이 중근을 갖는 경우 (i.e., $\lambda_1 = \lambda_2 = \lambda$)

* solution $y=c_1e^{\lambda t} + c_2te^{\lambda t}$

### Relationship between eigenvalues an special solutions ($e^{\lambda t}$) of differential equation

$$
{du(t)\over dt} =
\begin{bmatrix}
  a & b \\
  c & d  
\end{bmatrix}
\begin{bmatrix}
  u(t)  
\end{bmatrix}
\quad
\rightarrow
\quad
\begin{bmatrix}
  x'(t) \\ y'(t)
\end{bmatrix} =
\begin{bmatrix}
  ax(t) + by(t) \\
  cx(t) + dy(t)
\end{bmatrix}
\begin{aligned}
  \cdots (1) \\
  \cdots (2)
\end{aligned}
$$

From (2),
$$
x(t) = {1\over c}(y'(t) - dy(t))
$$

이를 (1)에 대입하면,
$$
{1\over c}(y''(t) - dy'(t)) = {a\over c}(y'(t) - dy(t)) + by(t) \\
y''(t) - (a+d)y'(t) + (ad-bc)y(t) = 0
$$

$y(t) = e^{\lambda t}$로 둘 때,

* characteristic equation $\lambda^2 - (a+d)\lambda + (ad-bc) = 0$
* solution $y(t) = c_1e^{\lambda_1 t} = c_2e^{\lambda_2 t}$

Characteristic equation 으로부터 $\lambda$를 구해 solution을 완성할 수 있다.

이를 $A$의 eigenvalue problem 으로 생각하여 풀어보면

$$
det \begin{bmatrix}
  a-\lambda & b \\
  c & d-\lambda
\end{bmatrix} =
(a-\lambda)(d-\lambda)-bc = 0 \\
\lambda^2 - (a + d)\lambda + (ad-bc) = 0
$$

로 위와 동일한 흐름으로 풀어나가게 됨을 알 수 있다.

결과적으로, $du(t)/dt = Au(t)$ 문제는

* solution이 $u(t) = c_1e^{\lambda_1 t}x_1 + c_2e^{\lambda_2 t}x_2$ 이고
* $e^{\lambda t}$ 를 구하기 위해 $A$의 eigenvalue를 찾아야 한다.

### Solving differential equation

$$
{du\over dt} = Au =
\begin{bmatrix}
  -2 & 1 \\
  1 & -2
\end{bmatrix} u
$$

eigenvalue와 eigenvector를 구하면

$$
\lambda_1 = -1, \quad x_1 =
\begin{bmatrix}
  1 \\ 1
\end{bmatrix}
\qquad
and
\qquad
\lambda_1 = -3, \quad x_1 =
\begin{bmatrix}
  1 \\ -1
\end{bmatrix}
$$

solution $u(t)$ 를 구하는 가장 좋은 방법은 $t=0$ 에서 initial vector $u(0)$와 일치하는 general solution을 찾는 것이다.

* general solution은 pure exponential solution의 조합으로 이루어져 있고
* pure exponential solution은 $ce^{\lambda t}x$ 형태의 solution이다.
    * $\lambda$: $A$의 eigenvalue
    * $x$: $A$의 eigenvector
* $u(t) = c_1e^{\lambda_1 t}x_1 + c_2e^{\lambda_2 t}x_2$

현재 예시에서,

$$
\text{Solution} \qquad u(t) = c_1e^{\lambda_1 t}x_1 + c_2e^{\lambda_2 t}x_2
\quad
or
\quad
u =
\begin{bmatrix}
  1 & 1 \\
  1 & -1
\end{bmatrix}
\begin{bmatrix}
  e^{-t} & \\
  & e^{-3t}
\end{bmatrix}
\begin{bmatrix}
  c_1 \\ c_2
\end{bmatrix}
$$

$t=0$ (i.e., $e^0 = 1$) 일 때의 $u(0)$가 $c_1, c_2$를 결정한다.

$$
\text{Initial condition}
\qquad
u(0) = c_1x_1 + c_2x_2 =
\begin{bmatrix}
  1 & 1 \\
  1 & -1
\end{bmatrix}
\begin{bmatrix}
  c_1 \\ c_2
\end{bmatrix} =
Sc
$$

$c = S^{-1}u(0)$ 이므로

$$
u(t) =
\begin{bmatrix}
  1 & 1 \\
  1 & -1
\end{bmatrix}
\begin{bmatrix}
  e^{-t} & \\
  & e^{-3t}
\end{bmatrix}
\begin{bmatrix}
  c_1 \\ c_2
\end{bmatrix} =
S
\begin{bmatrix}
  e^{-t} & \\
  & e^{-3t}
\end{bmatrix}
S^{-1}u(0)
$$

Fundamental formula of this section: $Se^{\Lambda t}S^{-1}u(0)$

$$
u(t) = Se^{\Lambda t}S^{-1}u(0)
\quad
with
\quad
\Lambda =
\begin{bmatrix}
  -1 & \\
  & -3
\end{bmatrix}
\quad
and
\quad
e^{\Lambda t} =
\begin{bmatrix}
  e^{-t} & \\
  & e^{-3}
\end{bmatrix}
$$

### Definition of exponential of matrix

* exponential of diagonal matrix $\Lambda$ ($e^{\Lambda t}$): n개의 $e^{\lambda t}$가 diagonal에 위치한 matrix.
* general matrix $A$의 경우: power series를 이용: $e^x = 1 + x + x^2/2! + x^3/3! + \cdots$

$$
\text{Matrix exponential} \qquad  e^{At} = I + At + {(At)^2 \over 2!} + {(At)^3 \over 3!} + \cdots
$$

위의 series는 항상 converge하고 $e^{At}$는 일반적인 성질을 모두 만족시킨다 (has right properties).

$$
(e^{As})(e^{At}) = (e^{A(s+t)}), \qquad (e^{At})(e^{-At}) = I, \quad and \quad {d\over dt}(e^{At}) = Ae^{At}
$$

또한 differential equation의 solution은 다음과 같이 diagonalization 되어야 한다.

$$
u(t) = e^{At}u(0) = Se^{\Lambda t}S^{-1}u(0)
$$

이는 다음과 같이 증명할 수 있다.

$$
\begin{aligned}
  e^{At}
  & =
  I + S\Lambda S^{-1}t + {S\Lambda^2S^{-1}t^2 \over 2!} + {S\Lambda^3S^{-1}t^3 \over 3!} + \cdots \\
  & = S \left( I + \Lambda t + {(\Lambda t)^2 \over 2!} + {(\Lambda t)^3 \over 3!} + \cdots \right) S^{-1} = Se^{\Lambda t}S^{-1}
\end{aligned}
$$

위의 예시에서

$$
e^{At} = Se^{\Lambda t}S^{-1} =
\begin{bmatrix}
  1 & 1 \\
  1 & -1
\end{bmatrix}
\begin{bmatrix}
  e^{-t} & \\
  & e^{-3t}
\end{bmatrix}
\begin{bmatrix}
  1 & 1 \\
  1 & -1
\end{bmatrix} ^{-1} = {1\over2}
\begin{bmatrix}
  e^{-t} + e^{-3t} & e^{-t} - e^{-3t} \\
  e^{-t} - e^{-3t} & e^{-t} + e^{-3t}
\end{bmatrix}
$$

$e^{At}$ 는 모든 $t$에 대한 결과를 알 수 있지만 series는 계산이 어렵다.

$A$가 diagonalizable해 $Se^{\Lambda t}S^{-1}$로 diagonalize 하면 solution이 n개의 exponential $e^{\lambda t}x$ 의 조합으로 나오기 때문에 보다 쉽게 계산할 수 있다.

> $A$가 diagonalizable 하면 $A=S\Lambda S^{-1}$ 이므로 $du/dt = Au$의 solution은
> $$
> \begin{aligned}
> u{t} & = e^{At}u(0) = Se^{\Lambda t}S^{-1}u(0) \\
> & = \begin{bmatrix}
> \\
> x_1 & \cdots & x_n \\
> \\
> \end{bmatrix}
> \begin{bmatrix}
> e^{\lambda_1t} & & \\
> & \ddots & \\
> & & e^{\lambda_nt} \\
> \end{bmatrix}
> S^{-1}u(0) \\
> & = c_1e^{\lambda_1 t}x_1 + \cdots + c_2e^{\lambda_2 t}x_n = \text{combination of }e^{\lambda t}x
> \end{aligned}
> $$

eigenvector가 n개 미만이라 $A$가 diagonalizable 하지 않으면 충분한 special solution을 찾지 못한다.

Missing solution은 존재는 하지만 pure exponential 보다 복잡하다.

* generalized eigenvector를 포함하고
* $te^{\lambda t}$와 같이 factor를 포함한다.

### Physical interpretation of the equation and its solution

강의에서 다루지 않음.

## Stability of differential equations

강의에서 다루지 않음.
