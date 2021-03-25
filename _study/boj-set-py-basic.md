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

> 이 글은 백준 온라인 저지의 [Python 배우기 (1~50)](https://www.acmicpc.net/workbook/view/459)를 파이썬(Python)으로 풀이한 것을 모아놓은 글입니다.
>
> 일종의 연습 기록이며 제가 정답을 받은 코드와 참고할만한 다른 풀이를 같이 기록합니다. 필요한 경우 풀이에 대한 해설을 기록합니다만 풀이는 통과했어도 해설은 정답이 아닐 수 있어서 가볍게 참고해주시길 부탁드립니다. 피드백은 편하신 방법으로 자유롭게 주시면 감사하겠습니다.

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
print(a + b)
```

## 10998 A×B

```python
a, b = map(int, input().split())
print(a * b)
```

## 1001 A-B

```python
a, b = map(int, input().split())
print(a - b)
```

## 1008 A/B

```python
a, b = map(int, input().split())
print(a / b)
```

## 10869 사칙연산

```python
a, b = map(int, input().split())
print(a + b, a - b, a * b, a // b, a % b, end="\n")
```

## 10430 나머지

```python
a, b, c = map(int, input().split())
print((a + b) % c, (a % c + b % c) % c, (a * b) % c, (a % c * b % c) % c, sep="\n")
```

## 2558 A+B - 2

```python
a = int(input())
b = int(input())
print(a + b)
```

## 2588 곱셈

```python
a = int(input())
b = input()

for i in reversed(b):
    print(a * int(i))
print(a * int(b))

# 다른 답안 1
a = int(input())
b = list(map(int, list(input())))

for i in range(3):
    print(a * b[2 - i])
print(a * (100 * b[0] + 10 * b[1] + b[2]))

# 다른 답안 2
a = int(input())
b = int(input())

print(a * (b % 10), a * ((b // 10) % 10), a * (b // 100), a * b)
```

* `reversed`를 사용해서 조금 오래 걸린 것 같다.

## 3046 R2

```python
R1, S = map(int, input().split())
print(S * 2 - R1)
```

## 2163 초콜릿 자르기

```python
m, n = map(int, input().split())
print(n * m - 1)
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
    print(f"Case #{i+1}: {c[i][0] + c[i][1]}")

# 다른 답안 1
import sys

n = int(input())

for n in range(n):
    a, b = map(int, sys.stdin.readline().split())
    print(f"Case #{n+1}: {a+b}")
```

* 출력을 입력을 받을 때마다 해도 괜찮은 것 같다.
* 상위 정답은 대부분 `sys.stdin.readline()`을 사용하고 있다. 속도 때문인 것 같다.

## 11022 A+B - 8

```python
n = int(input())

for i in range(n):
    a, b = map(int, input().split())
    print(f"Case #{i+1}: {a} + {b} = {a+b}")
```

## 10699 오늘 날짜

```python
import datetime

print(datetime.datetime.now().strftime("%Y-%m-%d"))

# 시간대 지정
from datetime import datetime, timedelta, timezone

KST = timezone(timedelta(hours=9))
print(datetime.now(KST).strftime("%Y-%m-%d"))
```

* 채점 서버 시간대가 UTC인데 `datetime.datetime.now()`로 timezone을 별도로 전달하지 않아도 서울의 날짜를 반환하는 건가?
    * 위의 코드로 정답처리가 되긴 했는데 이게 UTC 날짜와 KST 날짜가 일치해서 그런 것인지 아니면 원래 없이 작성해도 채점 서버 시간대랑 상관없이 서울 시간으로 출력이 되는지 모르겠다.
    * 전자일 것 같은데 찾아본 다른 사람들의 풀이는 모두 timezone 입력 없이 작성해서 헷갈린다.
    * 날짜가 갈리는 시간대에 테스트를 해봐야겠다.

## 7287 등록

```python
print("14")
print("crackyachae")
```

* 사이트에서 데이터를 받아와야 할 줄 알았는데 그냥 현재 계정정보를 보고 직접 타이핑해서 출력하는 것이었다.

## 2525 오븐 시계

```python
h, m = map(int, input().split())
t = int(input())
print((h + ((m + w) // 60)) % 24, (m + w) % 60)

# 다른 답안 1
h, m = map(int, input().split())
t = h * 60 + m + int(input())
print(t // 60 % 24, t % 60)

# 다른 답안 2
# * : unpacking, (a, b)를 a, b 각각 출력되게 해주는 역할인 것 같다.
# divmod(a, b) : a를 b로 나눈 몫과 나머지를 (quotient, remainder) 꼴로 반환
# a = (eval(input().replace(" ", '*60+')) + int(input())) % 1440
    # input().replace(" ", '*60+'): 첫 줄에 받은 값 (h m) 사이의 공백을 *60+로 대체해서 → h*60+m
    # + int(input()): 둘째 줄에 받은 값을 추가로 더해
    # eval()로 실행
# b = 60
print(*divmod((eval(input().replace(" ", "*60+")) + int(input())) % 1440, 60))
```

* 시간 조건을 고려하지 않아서 처음에 틀렸다. 항상 문제의 '조건'을 챙기자.
* 다른 답안 2 참고
    * [몫과 나머지 - divmod](https://programmers.co.kr/learn/courses/4008/lessons/12732) by 파이썬을 파이썬답게 강의
    * [[파이썬/Python] divmod와 언패킹(unpacking)을 활용하여 몫과 나머지 구하기](https://mong9data.tistory.com/18) by 몽구의 우당탕탕 개발공부
    * [divmod](https://docs.python.org/ko/3/library/functions.html#divmod) by Python documentation
    * [[python] 파이썬 eval 함수 정리 및 예제](https://blockdmask.tistory.com/437) by 개발자 지망생
    * [eval](https://docs.python.org/ko/3/library/functions.html#eval) by Python documentation

## 2530 인공지능 시계

```python
h, m, s = map(int, input().split())
t = h * 3600 + m * 60 + s + int(input())
print(t // 3600 % 24, t % 3600 // 60, t % 3600 % 60)

# 다른 답안 1
h, m, s = map(int, input().split())
t = int(input())

s += t

m += s // 60
s = s % 60

h += m // 60
m = m % 60

h = h % 24

print(h, m, s, end="")
```

* sec는 그냥 `%60`만 한 번 해주면 되는 것이었다.

## 2914 저작권

```python
A, I = map(int, input().split())
print(A * (I - 1) + 1)
```

* 평균값이 올림 한 값이므로 평균값 `I`가 주어지면 실제 평균값은 $I-1 \lt avg \le I$
* 수록곡 수가 A일 때 저작권이 있는 멜로디 수는 $A(I-1) \lt melody \le AI$
* 멜로디 수의 최솟값은 $A(I-1) + 1$

## 5355 화성 수학

```python
T = int(input())

for i in range(T):
    exp = input().split()
    n = float(exp[0])
    for i in range(1, len(exp)):
        if exp[i] == "@":
            n *= 3
        elif exp[i] == "%":
            n += 5
        elif exp[i] == "#":
            n -= 7
    print("{:.2f}".format(n))

# 다른 답안 1
t = int(input())

for _ in range(t):
    s = input().split()
    a = float(s[0])
    for x in s[1:]:
        if x == "@":
            a *= 3
        elif x == "%":
            a += 5
        else:
            a -= 7
    print("%.2f" % a)
```

* `i` 번수를 사용하지 않는 반복문에서는 `_`로 표기해도 된다.
* range를 `list[1:]`로 작성해도 된다.

## 2675 문자열 반복

```python
T = int(input())

for _ in range(T):
    R, S = input().split()
    for c in S:
        print(c * int(R), end="")
    print()
```

* `int`로 변환한 값을 한 번만 써도 되면 사용할 때 변환해야겠다.

## 2935 소음

```python
A = input()
op = input()
B = input()
print(eval(A + op + B))

# 다른 풀이 1
# 이게 정석적인 것 같다.
a = int(input())
p = input()
b = int(input())
if p == "+":
    print(a + b)
elif p == "*":
    print(a * b)
```

## 9498 시험 성적

```python
s = int(input())
if s >= 90:
    print("A")
elif s >= 80:
    print("B")
elif s >= 70:
    print("C")
elif s >= 60:
    print("D")
else:
    print("F")
```

## 10817 세 수

```python
a, b, c = map(int, input().split())
if a < b:
    if b < c:
        print(b)
    else:
        if a < c:
            print(c)
        else:
            print(a)
else:
    if a < c:
        print(a)
    else:
        if b < c:
            print(c)
        else:
            print(b)

# 다른 풀이 1
# 한 줄로 적으면 print(sorted(map(int,input().split()))[1])
a = map(int, input().split())
print(sorted(a)[1])
```

* Sort 함수를 쓰는 게 느릴 것 같아서 사용하지 않았는데 아니었다. 등수 높은 코드 대부분이 `sorted`를 사용했다.
    * `sorted`는 리스트를 오름차순으로 정리한다.
    * [sorting HOW TO](https://docs.python.org/ko/3/howto/sorting.html) by Python HOWTOs
    * [python sorted 에 대해서.](http://blog.weirdx.io/post/50236) by ash84 @ 이상한 모임

## 11653 소인수분해

```python
N = int(input())
if N == 1:
    quit(0)
else:
    i = 2
    # N이 1이 될 때 까지 수행
    while N > 1:
        if N % i == 0:
            print(i)
            N //= i
        else:
            i += 1

# 다른 풀이 1 (56ms)
n = int(input())
i = 2
r = int(n ** 0.5)

# i가 자신의 제곱근이 될 때까지 수행
while i <= r:
    # n이 i로 나누어떨어지면
    while not n % i:
        # i를 출력하고
        print(i)
        # n을 n을 i로 나눈 값으로 변경
        n //= i
    # 더 i로 나뉘지 않으면 i를 증가
    i += 1
# 소인수분해가 되지 않는 수(소수)인 경우
# 1보다 크면 출력 (1은 출력 안 하기 위함)
if n > 1:
    print(n)
```

* 오름차순으로 소인수분해 하면 어차피 소수가 아닌 수들은 그 전에 작은 소수에 의해서 나뉘었을 것이므로 그냥 순차 증가하면서 체크했다.
* 함수가 아니라서 `N == 1`일 때 `return` 사용이 불가능했다. 대신 `quit`을 사용했다.
    * [Python return statement error “ 'return' outside function”](https://stackoverflow.com/questions/7842120/python-return-statement-error-return-outside-function) by Stackoverflow
* 입력한 수의 제곱근까지만 체크하는 게 속도에 영향을 가장 많이 미친 것 같다. (내 풀이 1744ms, 다른 풀이 56ms)
    * 특히, 큰 소수가 N으로 주어졌을 때 차이가 크게 난 것 같다.
    * 약수가 존재할 경우 자신의 제곱근을 기준으로 대칭적으로 존재하기 때문에 제곱근까지만 검사해도 된다.
    * [[내가 보려고 적는 파이썬] 소수 판별(에라토스테네스의 체)](https://velog.io/@koyo/python-is-prime-number) by koyo.log
* `N`이 `1`인 경우를 먼저 하나의 경우로 다루는 것보다 소인수분해를 한 뒤 소인수분해가 안 되는 `N` 중에서 `1`을 제외(출력하지 않음)하는 게 더 깔끔한 것 같다.
* 제곱근까지 모든 수를 체크하는 것 보다 소인수 분해가 끝나는 `N == 1`인 순간에 반복을 그만두는 게 효율적이라고 생각했는데 `N == 1`을 체크하는 것 때문에 오히려 더 오래 걸리는 것 같다.
    * 1회 테스트해 봤을 때 검사하지 않았을 때 64ms, 했을 때 72ms

    ```python
    N = int(input())
    r = int(N ** 0.5)
    i = 2

    while i <= r:
        while not N % i:
            print(i)
            N //= i
        # N이 1이 되었을 때 break
        if N == 1:
            break
        i += 1
    if N > 1:
        print(N)
    ```

## 1789 수들의 합

```python
N = int(input())
s = 0
i = 1

while True:
    s += i
    if s > N:
        break
    i += 1
print(i - 1)

# 다른 풀이 1
# S = int(input())
# n = (-1 + sqrt(1+8S)) / 2
#   = ((8S+1)**0.5 - 1) / 2
# 더한 수의 개수는 [n] 이므로 int(n)을 출력
print(int(((8 * int(input()) + 1) ** 0.5 - 1) / 2))
```

* 서로 다른 N개의 자연수를 더해서 주어진 값 S를 만들 때 N이 최댓값을 가지려면 최대한 작은 값의 수를 더해나가야 한다.
    * 그러므로 $1 + \cdots + N \le S \lt 1 + \cdots + N + 1$인 N을 출력하면 된다.
* 다른 풀이는 대부분 등차수열의 합을 나타내는 식을 이용해서 풀었다.
  $$
  S = {n(n+1) \over 2} = {n^2+n \over 2} \\
  n^2+n-2S = 0 \\
  n = {-1 \sqrt{1 + 8S)} \over 2}
  $$
    * S가 N까지의 합보다 '크'거나 같기 때문에 $\text{N = n.xxx}$ 이므로 $N = [n]$

## 2753 윤년

```python
y = int(input())

if y % 4 == 0:
    if y % 100 == 0:
        if y % 400 == 0:
            print(1)
        else:
            print(0)
    else:
        print(1)
else:
    print(0)

# 다른 풀이 1
a = int(input())
if a % 4 == 0 and a % 100 != 0 or a % 400 == 0:
    print(1)
else:
    print(0)
```

* 조건을 한꺼번에 적는 게 좋을 것 같았는데 빠르게 생각이 안 나서 그냥 제출했다. 더 고민해볼 걸 그랬다.
    * 4로 나누어떨어지면서 100으로는 나누어떨어지지 않아야 하므로 두 조건은 `and`로 묶고
    * 400으로 나누어떨어지는 것은 그 외의 조건이므로 `or`로 묶어 이 경우에만 `1`을 출력한다.

## 10039 평균 점수

```python
s = 0
for _ in range(5):
    n = int(input())
    if n >= 40:
        s += n
    else:
        s += 40
print(s // 5)

# 다른 풀이 1
S = 0

for i in range(5):
    s = int(input())
    if s < 40:
        s = 40
    S += s
print(S // 5)

# 다른 풀이 2
s = 0
for i in range(5):
    s += max(40, int(input()))
print(int(s / 5))
```

* 다른 풀이 1은 score가 입력값 `s`가 40보다 작은 경우 `s`에 40을 대입했다.
    * 이게 더 제시한 문제를 충실히 구현한 것 같다.
* 다른 풀이 2는 조건문 대신 `max`를 이용했다.

## 1934 최소공배수

```python
T = int(input())

for _ in range(T):
    A, B = map(int, input().split())
    s = 1
    for i in range(2, int(min(A, B) + 1)):
        while A % i == 0 and B % i == 0:
            s *= i
            A //= i
            B //= i
    print(s * A * B)

# 다른 풀이 1
import sys
input = sys.stdin.readline

# 최대 공약수를 구하는 함수
def gcd(a, b):
    # 두 값 중 큰 값이 첫 번째 인자(나뉘는 수)로 전달되게 함
    if a < b:
        return gcd(b, a)
    # 재귀 종결조건
    # a가 b로 나누어떨어지는 경우 b가 최대 공약수
    if a % b == 0:
        return b
    # 나누는 수 b와 a를 b로 나눈 나머지에 대해 다시 실행
    return gcd(b, a % b)

T = int(input())
for t in range(T):
    a, b = map(int, input().split())
    # (a, b의 최대 공약수) = a * b / (a, b의 최소 공배수)
    sys.stdout.write(str(int(a * b / gcd(a, b))) + "\n")
```

* 두 수 중 작은 수까지 모든 정수에 대해 공약수 `s`를 구해서 풀었는데 코드 효율이 많이 떨어졌다.
* 다른 풀이는 대부분 유클리드 호제법과 최대공약수를 이용해서 구현했다.
    * 두 수 A, B의 최소공배수는 'A * B // 최대공약수' 이다.
    * 최대공약수는 유클리드 호제법을 이용해 빠르게 구할 수 있다.
        * [[GCD 알고리즘] 최대공약수 알고리즘](https://wordbe.tistory.com/entry/GCD-알고리즘-최대공약수-알고리즘) by Wordbe

## 2480 주사위 세개

```python
a, b, c = map(int, input().split())

if a == b and b == c:
    print(10000 + a * 1000)
elif a != b and b != c and c != a:
    print(max(a, b, c) * 100)
else:
    if a == b or a == c:
        print(1000 + a * 100)
    else:
        print(1000 + b * 100)


# 다른 풀이 1
# split을 사용하지 않고 input을 a, b, c에 각각 받는 법 같다.
# a, b, c는 숫자가 아닌 문자로 받았다.
*_, a, b, c = sorted(input())
# [1b, c][index]의 결괏값을 정한다.
    # a, b, c를 문자로 받았기 때문에 "1" + b의 결과는 1b이다.
    # 세 눈이 모두 다른 경우만 a < b < c가 성립해 index 값이 1이 된다.
# slice를 이용해 뒤에 붙일 0의 개수를 정한다.
    # 세 눈이 모두 같은 경우만 a < c가 성립하지 않아 그 값이 0이 된다.
# 경우에 따른 결과 도출은 아래의 설명을 참고한다.
print(["1" + b, c][a < b < c] + "000"[a < c :])

# 다른 풀이 2
# a < b < c
a, b, c = sorted(map(int, input().split()))
# [c, b + 10, b * 10 + 100][index]의 결괏값을 정한다.
# index: [a, b, c].count(b) - 1 
    # [a, b, c]중 b와 같은 값의 개수를 구한 뒤
    # index는 0부터 시작해야 하므로 1을 빼준다.
# 경우에 따른 결과 도출은 아래의 설명을 참고한다.
print([c, b + 10, b * 10 + 100][[a, b, c].count(b) - 1] * 100)
```

다른 풀이 대부분 주어진 값을 정렬해서 사용했다 (`a < b < c`).

* 주어진 값을 정렬하면 a, b, c는 다음과 같은 성질을 갖는다.
    * `c`는 최댓값이다
    * `b`는 중간에 있는 값이므로 같은 눈이 존재하는 경우 반드시 그 값 중 하나이다.
* 입력받은 값을 정렬했을 때 각 경우에 따른 결괏값은 다음과 같다.
    |경우|결괏값|
    |:---:|:---:|
    |같은 눈 없음|`c00`|
    |같은 눈 2개|`1b00`|
    |같은 눈 3개|`1b000`|

다른 풀이 1과 2 모두 리스트의 인덱스 표기법을 이용해서 풀었다.

* 다른 풀이 1은 대소관계의 참(1), 거짓(0) 결과를 이용해서 인덱스를 결정했다. 리스트:
    |경우|`a < b < c`|`[1b, c]` 값|`a < c`|`"000"` 값|비고|
    |:---:|:---:|:---:|:---:|:---:|:---:|
    |같은 눈 없음|1|`c`|1|`"000"[1:]` → `"00"`|`"c" + "00"` → `c00`|
    |같은 눈 2개|0|`1b`|1|`"000"[1:]` → `"00"`|`"1b" + "00"` → `1b00`|
    |같은 눈 3개|0|`1b`|0|`"000"[0:]` → `"000"`|`"1b" + "000"` → `1b000`|
* 다른 풀이 2는 가운데 있는 `b`의 개수를 이용해 인덱스를 결정했다.
    |경우|`[a, b, c]`|`.count(b)`|인덱스|값|비고|
    |:---:|:---:|:---:|:---:|:---:|:---:|
    |같은 눈 없음|`[a, b, c]`|1|0|`c`|`c * 100` → `c00`|
    |같은 눈 2개|`[a, b, b]`<br>`[b, b, c]`|2|1|`b + 10`|`(10 + b) * 100` → `1b00`|
    |같은 눈 3개|`[b, b, b]`|3|2|`b * 10 + 100`|`(100 + b * 10) * 100` → `1b000`|
* 이 외의 풀이도 구현 방식은 차이가 있지만, 핵심은 전체적으로 비슷했다.

## 4101 크냐?

```python
while True:
    a, b = map(int, input().split())
    if a == 0:
        break
    print(["No", "Yes"][a > b])
```

* 종료가 아닌 입력은 양의 정수만 들어오기 때문에 마지막 입력 체크 조건을 `a == 0`만 했다.
    * `a == 0 and a == b`로 하면 조건에 부합한다.
    * `not (a + b)`가 제일 깔끔할 것 같다.

## 10156 과자

```python
K, N, M = map(int, input().split())
print([0, K * N - M][K * N > M])

# 다른 풀이 1
a, b, c = map(int, input().split())
d = a * b - c
d = int(d)
if d >= 0:
    print(d)
else:
    print("0")

# 다른 풀이 2
a, b, c = map(int, input().split())
print(max(0, a * b - c))
```

* 경우가 간단해서 if문을 이용해서 정석적으로 풀어도 괜찮은 것 같다.
* 필요한 돈 보다 가진 돈이 많을 경우 결괏값이 음수가 나오기 때문에 `max`로 값을 결정하도록 해도 된다.
