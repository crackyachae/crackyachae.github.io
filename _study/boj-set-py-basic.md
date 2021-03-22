---
layout  : article
title   : BOJ_Python 배우기 (1~50)
summary : BOJ 기본문제를 파이썬으로 풀어보자
date    : 2021-03-04 14:44:29 +0900
updated : 2021-03-05 18:16:33 +0900
tag     : ps-python
toc     : true
public  : true
parent  : [[boj]]
latex   : false
---
* TOC
{:toc}

### 문제집 정보

* 문제집: [Python 배우기 (1~50)](https://www.acmicpc.net/workbook/view/459) by automata
* 문제 목록:
1000, 1001, 1008, 1789, 1934, 2163, 2476, 2480, 2525, 2530, 2557, 2558, 2588, 2675, 2753, 2754, 2884, 2914, 2935, 3009, 3046, 4101, 5063, 5086, 5355, 5717, 7287, 7567, 8958, 9498, 9506, 9610, 10039, 10102, 10103, 10156, 10162, 10214, 10430, 10699, 10757, 10817, 10869, 10886, 10988, 10998, 11021, 11022, 11557, 11653

## 2557 Hello World

```python
print("Hello World!")
```

## 1000 A+B

```python
a, b = map(int, input().split())
print(a+b)
```

## 10998 A×B

```python
a, b = map(int, input().split())
print(a*b)
```

## 1001 A-B

```python
a, b = map(int, input().split())
print(a-b)
```

## 1008 A/B

```python
a, b = map(int, input().split())
print(a/b)
```

## 10869 사칙연산

```python
a, b = map(int, input().split())
print(a+b, a-b, a*b, a//b, a%b, end="\n")
```

## 10430 나머지

```python
a,b,c = map(int, input().split())
print((a+b)%c, (a%c + b%c)%c, (a*b)%c,(a%c * b%c)%c, sep='\n')
```

## 2558 A+B - 2

```python
a = int(input())
b = int(input())
print(a+b)
```

## 2588 곱셈

```python
a = int(input())
b = input()
for i in reversed(b):
    print(a*int(i))
print(a*int(b))

# 다른 답안 1
a = int(input())
b = list(map(int,list(input())))
for i in range(3):
    print(a*b[2-i])
print(a*(100*b[0]+10*b[1]+b[2]))

# 다른 답안 2
a = int(input())
b = int(input())

print(a*(b%10),a*((b//10)%10),a*(b//100),a*b)
```

* `reversed`를 사용해서 조금 오래 걸린 것 같다.

## 3046 R2

```python
R1, S = map(int, input().split())
print(S*2-R1)
```

## 2163 초콜릿 자르기

```python
m, n = map(int, input().split())
print(n*m-1)
```

* m x n 초콜릿일 때 자르는 횟수
  * $(m-1) + (n-1) \times m = (n-1) + (m-1) \times n = nm - 1$

## 11021 A+B - 7

```python
n = int(input())
c = [[0 for i in range(2)] for i in range(n)]
for i in range(n):
    c[i][0], c[i][1] = map(int, input().split())
for i in range(n):
    print(f'Case #{i+1}: {c[i][0] + c[i][1]}')

# 다른 답안
import sys

n = int(input())
for n in range(n):
    a, b = map(int, sys.stdin.readline().split())
    print(f'Case #{n+1}: {a+b}')
```

* 출력을 입력을 받을 때마다 해도 괜찮은 것 같다.
* 상위 정답은 대부분 `sys.stdin.readline()`을 사용하고 있다. 속도 때문인 것 같다.

## 11022 A+B - 8

```python
n = int(input())
for i in range(n):
    a, b = map(int, input().split())
    print(f'Case #{i+1}: {a} + {b} = {a+b}')
```
