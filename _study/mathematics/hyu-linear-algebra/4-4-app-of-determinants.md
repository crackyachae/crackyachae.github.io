---
layout  : article
title   : 4.4 Applications of Determinants
summary : 
date    : 2020-08-13 17:19:38 +0900
updated : 2020-08-15 15:06:49 +0900
tag     : draft
toc     : true
public  : true
parent  : [[/mathematics/hyu-linear-algebra]]
latex   : true
---
* TOC
{:toc}

> 이 글은 KOCW의 한양대학교 선형대수 '17강 판별식의 응용' 강의내용을 복습하기 위해 Gilbert Strang의 [Linear Algebra and Its Applications](https://books.google.co.kr/books?id=8QVdcRJyL2oC) 4.4장과 강의노트를 기반으로 작성한 글입니다.
>
> * 제가 필요한 부분 위주로 확인하면서 정리하고 있어 글에 덜 작성된 부분이 있을 수 있습니다.
> * 글 작성 후 원 서적의 내용이 수정되거나 내용을 이해하기 위한 개인적인 설명이나 해석이 있을 수 있습니다. 되도록 원 서적을 참고해주시길 바랍니다.
> * 잘못된 부분이 있다면 댓글이나 그 외 편하신 방법으로 알려주시면 감사하겠습니다.

네 개의 major determinant application

## 1. Computation of $A^{-1}$

Cofactor matric $C$에 대해서 A^{-1}은 cofactor matrix $C$를 $detA$로 나눈 것이다.

$$
A^{-1} = {C^T \over detA}, \quad (A^{-1})_{ij} = {C_{ij} \over detA}
$$

위 식을 입증하기 위해서는 $AC^T = (detA)I$임을 보여야한다.

$$
\begin{bmatrix}
  a_{11} & \cdots & a_{1n} \\
  \vdots &  & \vdots \\
  a_{n1} & \cdots & a_{nn} \\
\end{bmatrix}
\begin{bmatrix}
  C_{11} & \cdots & C_{1n} \\
  \vdots &  & \vdots \\
  C_{n1} & \cdots & C_{nn} \\
\end{bmatrix}
=
\begin{bmatrix}
  detA & \cdots & 0 \\
  \vdots &  & \vdots \\
  0 & \cdots & detA \\
\end{bmatrix}
$$

### Diagonal entries

* 첫 columnn의 $C_{11}, \dots, C_{1n}$은 $a_{11}, \dots, a_{1n}$과 곱해져서 diagonal 에 $detA$를 만든다.
* 이와 같이 $A$의 모든 row는 그에 맞는 cofactors와 곱해 diagonal에 $detA$를 만든다.

### off-diagonal entries

* off-diagonal의 경우 모두 모두 0이다.
* 예를들어 첫 번째 row의 $a_{1j}$ entry와 두 번째 row의 $C_{2j}$를 곱하면

$$
a_{11}C_{21} + a_{12}C_{22} + \cdots + a_{1n}C_{2n} = 0
$$

* 이는 $A$와 같으면서 second row만 $A$의 first row와 같은, 새로운 matrix $B$ 의 determinant를 구하는 것으로 볼 수 있는데, 그러면 matrix $B$는 동일한 두 row를 갖게 되므로 determinant 값이 0이 된다.
    * $C_{21}$과 곱하는 $a$는 두 번쨰 row의 첫 번째 성분인데 그 값이 $a_{11}$이기 때문에 $a_{21}$과 $a_{11}$이 같다.

$$
a_{11}C_{21} + a_{12}C_{22} + \cdots + a_{1n}C_{2n} =
\begin{vmatrix}
  a_{11} & \cdots & a_{1n} \\
  a_{11} & \cdots & a_{1n} \\
  \vdots &  & \vdots \\
  a_{n1} & \cdots & a_{nn} \\
\end{vmatrix} = 0
$$

## 2. The Solution of $Ax=b$

### Cramer's rule

* $x = A^{-1}b$의 $j$번째 componenent는 $detB_j$와 $detA$의 비와 같다.

$$
x_j = {detB_j \over detA}, \quad where \quad B_j =
\begin{bmatrix}
  a_{11} & a_{12} & b_1 & a_{1n} \\
  \vdots & \vdots & \vdots & \vdots \\
  a_{11} & a_{12} & b_1 & a_{1n}
\end{bmatrix}
\text{ has } b \text{ in column } j
$$

* $detB_j$를 $j$번째 column (= $b$)에 해당하는 cofactor로 expand 하면

$$
detB_j = b_1C_{1j} + b_2C_{2j} + \cdots + b_nC_{nj}
$$

* $detB_j$는 product $C^Tb$의 j번째 component와 같고
* 이를 $detA$로 나누면 $x_j$를 얻을 수 있다.
* 즉 $x$의 componenet는 두 determinant($detA$, $detB_j$)의 비율과 같다.

$$
x = A^{-1}b = {C^Tb \over detA} =
{1 \over detA}
\begin{bmatrix}
  C_{11} & C_{21} & \cdots & C_{n1} \\
  C_{12} & C_{22} & \cdots & C_{n2} \\
  \vdots & \vdots & \ddots & \vdots \\
  C_{11} & C_{21} & \cdots & C_{n1}
\end{bmatrix}
\begin{bmatrix}
  b_1 \\
  b_2 \\
  \vdots \\
  b_n
\end{bmatrix}
$$

## 3. The Volumnet of a Box

### Right angled box

* box의 edge length의 product가 box의 volume이다.
* $\text{volume} = l_1 l_2 \cdots l_n$

matrix A의 row가 box의 edge일 때,

$$
A =
\begin{bmatrix}
  & & \\
  a_1 & a_2 & \cdots \\
  & &
\end{bmatrix}, \qquad
\vert a_1 \vert = l_1, \quad \vert a_2 \vert = l_2, \quad \cdots, \qquad
a_i \perp a_j \\
$$

$detA$로 부터 $l_1l_2 \cdots l_n$을 구하려면

$$
AA^T =
\begin{bmatrix}
  row\ 1 \\
  row\ 2 \\
  \vdots \\
  row\ n
\end{bmatrix}
\begin{bmatrix}
  r & & r \\
  o & & o \\
  w & \cdots & w \\
  & & \\
  1 & & n
\end{bmatrix}
=

\begin{bmatrix}
  l_1^2 & & 0 \\
   &  & \\
   & \ddots & \\
   & & \\
  0 & & l_n^2
\end{bmatrix}
$$

$$
\text{Rightangle case} \qquad l_1^2 l_2^2 \cdots l_n^2 = det(AA^T) = (detA)(detA^T) = (detA)^2
$$

* 위 식의 양변에 square root를 취하면 A의 determinant는 volumne과 같다.
* $detA = l_1 l_2 \cdots l_n$ for right angled box

### Parallelogram

![volume of parallelogram]( /post-img/hyu-linear-algebra-4-4-app-of-determinants/111249858-b7da2f80-864f-11eb-9e9a-a794e19b05bf.png )

right angled가 아닌 box, 대표적으로 parallelogram의 volumne은 base $l$과 height $h$를 곱한 값이다.

* 길이가 $h$인 vector $b-p$는 matrix의 두 번째 row $b$에서 이를 첫 번째 row에 projection한 $p$를 뺀 것이다.
* determinant는 row 2에서 상수배한 row 1을 빼도 변하지 않으므로, 위와 같은 방식으로 parallelogram을 rectangle case로 바꾼 뒤 determinant 값을 구해 volumne을 알 수 있다.
* n dimension으로 확장하더라도 Gram-Schmidt process를 이용해 orthogonal row로 구성된 right angled case로 바꿀 수 있다.
