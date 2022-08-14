---
layout  : article
title   : 6. Python
summary : 
date    : 2020-03-20 11:34:38 +0900
updated : 2021-02-25 20:28:52 +0900
tag     : draft
toc     : true
public  : true
parent  : [[/cs-basic/harvardx-cs50s-intro]]
latex   : false
---
* TOC
{:toc}

> 이 글은 CS50 x 2020의 [weeks 6](https://cs50.harvard.edu/x/2020/weeks/6/) 강의내용을 복습하기 위해 [강의 노트](https://cs50.harvard.edu/x/2020/notes/6/)를 기반으로 작성한 글입니다.
>
> 내용을 이해하기 위한 개인적인 설명이나 해석이 있을 수 있기 때문에 되도록 원문을 참고해주시길 바랍니다.
> 잘못된 부분이 있다면 댓글이나 그 외 편하신 방법으로 알려주시면 감사하겠습니다.

## Python Basics

파이썬 코드는 C보다 훨씬 간단하지만, 데이터 과학(data science) 같은 분야의 문제를 해결하는 것도 가능하다.

### Print

`Hello world`를 출력하기 위한 C코드와 파이썬 코드를 비교해보자.

```c
// C

#include <stdio.h>

int main(void)
{
    printf("hello, world\n");
}
```

```python
# python

print("hello, world")
```

* 스탠다드 라이브러리(standard library)를 불러올 필요가 없다.

* 메인 함수(main function)를 선언하지 않아도 된다.
* `Print` 함수 끝에 줄 바꿈 `\n`을 해주지 않아도 된다 (줄 바꿈이 기본값).
* 세미 콜론`;`을 적어주지 않아도 된다.

파이썬은 별도의 컴파일을 거칠 필요가 없는 **인터프리트 언어(interpreted language)** 이기 때문에 `hello.py`로 저장한 코드를 실행하고 싶다면 바로 `python hello.py` 명령으로 프로그램을 실행하면 된다.

### Get string

이번에는 사용자로부터 문자열(string)을 받기 위한 코드를 비교해보자.

```c
// C

#include <cs50.h>

int main(void)
{
    string answer = get_string("What's your name?\n");
    printf("hello, %s\n", answer);
}
```

```python
# Python

import cs50
# or
from cs50 import get_string

answer = get_string("What's your name\n")

# 입력받은 사용자의 이름은 여러 방법으로 출력할 수 있다.

# 방법 1
print("hello, " + answer)

# 방법 2
print("hello,", answer)

# 방법 3
print(f"hello, {answer}")
```

* `#include` 대신에 `import`를 사용해 사용하고 싶은 특정 함수만을 불러온다.

* 데이터 타입을(data type) 특정하지 않고 변수를 선언할 수 있다.
    * 인터프리터(interpreter)가 문맥에 따라 결정한다.
* 문자열은 다양한 방법으로 출력할 수 있다.
    * 방법 1: 두 개의 문자열 `hello,`와 `answer`를 `+`연산자로 결합한 뒤 출력한다.
    * 방법 2: 여러 개의 인자(arguments) `hello,`, `answer`를 동시에 출력한다. 출력될 때 두 인자 사이에 자동으로 공백이 추가된다.
    * 방법 3: 포맷 문자열(format string)을 사용한다. 중괄호`{}`안의 `answer`는 C에서의 `%s`와 비슷한 역할을 한다.
        * 포맷 문자열을 출력하기 위해서는 괄호 `(` 바로 뒤에 `f`를 적어야 한다. 괄호를 적어주지 않은 경우 `hello, {answer}` 그대로 출력된다.

### Increment and initialize a variable

변수를 초기화한 뒤 변수의 값을 1만큼 키우기 위한 코드를 비교해보자.

```c
// C

int counter = 0;

counter = counter + 1;
counter += 1;
counter++;
```

```python
# Python

counter = 0

counter = counter + 1
counter += 1
```

* 연산은 C언어와 동일한 방법으로 한다.

* `++`연산은 python에서 사용할 수 없다.

### Condition

조건에 따라 결과를 다르게 출력하기 위한 코드를 비교해보자.

```c
// C

if (x < y)
{
    printf("x is less than y\n");
}
else if (x > y)
{
    printf("x is greater than y\n");
}
else
{
    printf("x is equal to y\n");
}
```

```python
# Python

if x < y:
    print("x is less than y")
elif x > y:
    print("x is greater than y")
else:
    print("x is equal to y")
```

* 조건을 감싸는 괄호 `()`대신 조건 마지막에 콜론(colon)`:`을 붙여 조건을 표시하고, 조건을 만족할 때 수행할 결과는 중괄호`{}`로 감싸는 대신 `tab`으로 들여 써서 표시한다.

* 들여쓰기(indentation)가 코드의 중첩(nesting)을 결정하기 때문에, C와 다르게 들여쓰기를 정확히 하는 것이 중요하다.
* `else if` 대신에 `elif`를 사용한다.

### Boolean expressions

```C
// C

while (true)
{
    printf("hello, world\n");
}
```

```python
# Python

while True:
    print("hello, world")
```

* `True` (or `False`) 조건의 첫 글자를 대문자로 표기한다.

### Loop

```c
// C

// while 사용
int i = 3;
while (i > 0)
{
    printf("cough\n");
    i--;
}

// for 사용
for (int i = 0; i < 3; i++)
{
    printf("cough\n")
}
```

```python
# Python

# while 사용
i = 3
while i > 0:
    print("cough")
    i -= 1

# for 사용: i를 0, 1, 2로 바꿔가면서 cough를 출력
for i in [0, 1, 2]:
    print("cough")

# range function을 이용해서 간단하게 표기 가능
for i in range(3):
    print("cough")
```

* `for` 이용할 때 반복마다 변하는 `i`의 값을 리스트(list)`[0, 1, 2]`를 이용해서 표현 할 수 있다.

* `range` 함수를 이용하면 리스트로 나타낸 것과 동일하게 반복을 진행할 수 있다.
    * `range(3)`과 `[0, 1, 2]`이 동일하다.
* `range`의 시작을 0이 아닌 다른 숫자로 하고 싶으면 `range(start num, last num + 1)`로 표기한다.
    * `range(1, 4)`와 `[1, 2, 3]`이 동일하다.

### Data types in Python

코드에 명시하지는 않지만 파이썬에도 데이터 타입이 존재한다.

| Data types | 설명                                                                          |
| ---------- | ------------------------------------------------------------------------------|
| `bool`     | 참, 거짓 (`true` or `false`)                                                  |
| `float`    | 실수 (real numbers)                                                           |
| `int`      | 정수 (integers)                                                               |
| `str`      | 문자열 (strings)                                                              |
| `range`    | 연속한 숫자 (sequence of numbers)                                             |
| `list`     | 연속한 가변 값 (sequence of mutable values)                                   |
| `tuple`    | 연속한 불 가변 값 (sequence of immutable values)                              |
| `dict`     | 키(key)와 대응되는 값(value)으로 이루어진 pairs의 모음 <br> hash table과 유사 |
| `set`      | 특정 값의(unique values) 모음                                                 |

자세한 사항은 공식 문서인 docs.python.org 를 참고하면 된다.

## Examples

### Blur an image

`pset4`의 이미지를 불러와서 블러(blur) 시키는 프로그램.

```python
# PIL란 library에서 Image와 ImageFilter 함수를 불러옴
from PIL import Image, ImageFilter

# 불러온 Image의 open을 이용해서 편집할 이미지 불러오기
before = Image.open("bridge.bmp")

# before에 filter를 이용해 불러온 ImageFilter의 BLUR를 적용
after = before.filter(ImageFilter.BLUR)

# after를 out.bmp로 저장.
after.save("out.bmp")
```

### Implement a dictionary

`pset5`의 단어를 받아서 확인하는 프로그램

```python
# words라는 set을 생성
words = set()

# word를 받는 check function
def check(word):

    # 받은 word를 lowercase로 만든 문자열이 words set 안에 존재하면 true를 반환
    if word.lower() in words: 
        return True
    else:
        return False

# dictionary를 받는 load function
def load(dictionary):

    # 받은 dictionary를 read mode로 file에 저장
    file = open(dictionary, "r")

    # file에 line을 한 개씩 읽어갈 때마다 반복
    for line in file:
        # line의 \n으로부터 거꾸로 잘라서(rstrip) words에 add
        words.add(line.rstrip("\n"))
    # file을 닫음
    file.close()
    return True

# words의 길이를 반환하는 size function
def size():
    return len(words)

# unload function
def unload():
    return True
```

* C보다 코드는 간결해졌지만, 속도를 비교해보면 아주 느리다.

### Check multiple conditions

사용자가 입력한 값에 따라 답변을 출력하는 프로그램. 글자 case에 상관없이 Y를 입력하면 Agreed, N을 입력하면 Not agreed를 출력한다.

```python
from cs50 import get_string

s = get_string("Do you agree?\n")

# Y 또는 y를 입력하면 Agreed.를 출력
if s == "Y" or s == "y":
    print("Agreed.")
# N 혹은 n을 입력하면 Not agreed.를 출력
else s == "N" or s == "n"
    print("Not agreed.")
```

* C의 `||`연산자 대신 `or`을 사용한다.

위의 조건을 다음과 같이 표현할 수도 있다.

```python
# s가 []안에 있는 값과 일치하면; Y 혹은 y이면, Agreed.를 출력
if s in ["Y", "y"]:
    print("Agreed.")
# s를 lowercase로 변환한 값이 y와 일치하면 Agreed.를 출력
if s.lower() in ["y"]:
    print("Agreed.")
```

### Make function

cough를 세 번 출력하는 프로그램을 만들어보자.

```python
# 1. cough를 세 번 출력
print("cough")
print("cough")
print("cough")

# 2. cough를 출력하는 것을 세 번 반복
for i in range(3):
    print("cough")

# 3. cough를 출력하는 cough 함수를 정의해서 cough 함수를 세 번 반복
# cough를 정의하기 전에 cough함수를 사용해서 error 발생
for i in range(3):
    cough()

def cough():
    print("cough")

# cough 함수를 main 코드보다 위에 적거나
# main 함수를 위에 쓰고 싶다면 우선 정의한 뒤 이후에 실행해야 한다.
def main():
    for i in range(3):
        cough()
    
def cough():
    print("cough")

main() # main 함수 실행

# 4. cough를 n번 실행하는 함수를 정의해서 n에 3을 입력
def main():
    cough(3)

def cough(n):
    for i in range(n):
        print("cough")

main()
```

* `def`를 이용해서 함수를 정의한다.

양의 정수(Positive integer)를 입력받는 프로그램을 작성해보자.

```python
def main():
  i = get_positive_int()
  print(i)

def get_positive_int():
    while True:
        n = get_int("Positive Integer:")
        if n > 0:
            break
    return n
```

* 파이썬에는 C의 `do-while`문이 존재하지 않는다.

* 파이썬에서 코드를 우선 한 번 실행한 뒤에 조건을 체크하는 반복문을 만들기 위해서는 `while True` 안에 반복하고 싶은 코드를 적어 실행한 후에 조건을 체크해서 `break`하는 방식을 이용한다.
* C와 동일하게 `break`와 `return`을 사용할 수 있다.
* 파이썬에서는 동일한 함수 안이라면 변수가 선언된 위치(nesting) 밖에서도 변수를 사용할 수 있다.

### Print out a row, a column, a plane

행, 열, 평면을 시각적으로 출력하는 프로그램

```python
# 1. 하나의 행 출력 "????"

# 끝에 개행 없이 문자 `?`를 네 번 입력. 마지막줄에 개행
for i in range(4):
    print("?", end="") 
print() # 개행

# 문자열인 '?'에 숫자를 곱해서 반복할 수도 있다
print("?" * 4)
```

* `end`는 문자열의 끝을 가리키며 `print`시 기본값은 `\n`이다. `end="..."`로 내가 원하는 값으로 바꾸거나 아무것도 입력되지 않도록 할 수도 있다.
    * `end` 값을 `""`로 지정해 기본값인 줄 바꿈 문자가 같이 출력되지 않도록 한다.

```python
# 2. 하나의 열 출력  "#"
                      #
                      #

# #룰 세 번 출력
for i in range(3):
    print("#")

# 곱하기 연산 이용 (print에 의한 개행을 없애지 않으면 마지막에 빈 한 줄이 생긴다)
print("#\n" * 3, end="")
```

```python
# 3. 3 x 3 평면 출력 "###"
                      ###
                      ###

# nested loop: 개행 없이 '#' 세 번 출력 후 개행 하는 것을 세 번 반복
for i in range(3):
    for j in range(3):
        print("#", end="")
    print()
```

### Overflow

* 파이썬에서는 integer overflow가 일어나지 않는다.

* 숫자를 키우면 컴퓨터의 메모리를 가득 채울 때까지 계속 커진다.
* Floating-point imprecision 역시 십진수를 필요한 비트만큼 사용해서 나타낼 수 있는 라이브러리를 이용하면 방지할 수 있다.

### List

리스트에 점수를 입력하고 평균을 구하는 프로그램을 작성해보자.

```python
# list score 선언
score = []

# score에 점수 값 추가
score.append(72)
score.append(73)
score.append(33)

# list를 선언할 때 값을 바로 초기화 할 수도 있다
score = [72, 73, 74]

# 평균 계산 (scores의 총합을 scores의 크기로 나눔)
print(f"Average: {sum(scores) / len(scores)}")
```

* 리스트는 대괄호 `[]`를 이용해 선언하고 초기화한다.
* 리스트의 크기는 처음 선언한 원소(element)의 개수로 정해지고 추가할 때마다 자동으로 늘어난다.

리스트를 이용해서 문자열을 출력해보자.

```python
# String 입력
s = get_string("Input: ")

# string 출력
print(s)

# Bracket notation 이용
for i in range(len(s)):
    print(s[i], end="")
print()

# 'iterate*' over each character
# s의 각 character가 끝날 때까지 character 출력을 반복
for c in s:
    print(c, end="")
print()
```

* 파이썬에서도 브라켓 표기법(bracket notation)을 사용할 수 있다.

\* **Iterate**: 컨테이너를 구성하는 원소를 하나씩 반환하면서 각 원소에 대해 동일한 코드를 반복하는 것을 의미한다. 위의 예시에서는 문자열을 구성하고 있는 문자를 차례대로 반환하여 출력한다.

## More features

### Command-line argument

명령 줄(command-line)을 받아서 출력해보자.

```python
# command line을 받기 위해 sys library의 argv를 이용
from sys import argv

# argv: list of strings
# command-line에서 받은 argv의 수만큼 argv를 출력
for i in range(len(argv)):
    print(argv[i])

# iterate over the list
# list의 argument(string)이 끝날 때까지 argument 출력을 반복
for arg in argv:
    print(arg)
```

* `sys` library의 `argv`를 이용해서 명령 줄 인자(command-line argument)를 받을 수 있다.

충분한 명령 줄 인자를 입력받지 못했을 때(하나의 명령 줄 인자만 입력받았을 때) 에러 메시지(error message)를 출력해보자.

```python
from sys import argv, exit

if len(argv) != 2:
    print("missing command-line argument")

    # error를 알리기 위해 1을 반환하고 exit. return과 같은 역할
    exit(1)

print(f"hello, {argv[1]}")

# 정상 작동을 알리기 위해 0을 반환하고 exit.
exit(0)
```

* `sys` library의 `exit`을 이용해서 `return`처럼 값을 반환하고 실행을 종료할 수 있다.

### Linear search

리스트 안의 원소를 확인해서 그 원소의 존재 여부를 확인하는 프로그램을 작성해보자.

```python
import sys

names = ["EMMA", "RODRIGO", "BRIAN", "DAVID"]

if "EMMA" in names:
    print("Found")
    sys.exit(0) # sys library의 exit 함수 사용
print("Not found")
sys.exit(1)
```

* 조건을 적어주는 것만으로 리스트(i.e., `names`) 안의 원소를 탐색할 수 있다.

### Dictionary

```python
# dictionary인 people을 선언 및 초기화
people = {
    "EMMA": "617-555-0100", 
    "RODRIGO": "617-555-0101", 
    "BRIAN": "617-555-0102"
}

if "EMMA" in people:
    # Found와 EMMA의 phone number (617-555-0100) 출력
    print(f"Found {people['EMMA']}")
    sys.exit(0)
print("Not found")
sys.exit(1)
```

* 딕셔너리(Dictionary)는 중괄호 `{}`를 이용해서 선언하고 초기화한다.

* 딕셔너리는 키(key)와 값(value) 한 쌍으로 이루어져 있다.
    * 키와 값은 세미콜론으로, 각 쌍은 쉼표로 구분한다.
* 인덱스(index)가 단어인 배열(array)로 생각할 수 있다.

### String comparison

두 개의 문자열을 입력받아 비교하는 프로그램을 작성해보자.

```python
s = get_string("s: ")
t = get_string("t: ")

if s == t:
    print("Same")
else: 
    print("Different")
```

* 파이썬에서는 비교 연산자 `==`로 문자열을 바로 비교할 수 있다.

```python
s = get_string("s: ")

t = s

print(f"s: {s}")
print(f"t: {t}")
```

* 문자열을 바로 복사하는 것도 가능하다.

### Swap

```python
x = 1
y = 2

print(f"x is {x}, y is {y}")

# swap x and y
x, y = y, x
print(f"x is {x}, y is {y}")
```

* 파이썬에서는 순서를 바꿔서 대입하면 스왑(swqp)할 수 있다.

## Files

csv 파일을 열고 편집하는 프로그램을 작성해보자.

```python
# csv file을 사용하는 데 도움을 주는 library
import csv
from cs50 import get_string

# phonebook.csv file을 append mode로 불러서 file에 저장
file = open("phonebook.csv", "a")

# name과 number를 사용자로부터 입력받음
name = get_string("Name: ")
number = get_string("Number: ")

# csv안의 writer를 이용해서 file로부터 writer를 만든 뒤
writer = csv.writer(file)

# writer에 writerow를 이용해서 입력받았던 name과 number를 기재
# tuple (name, number)를 만들어서 single argument로 writerow에 전달될 수 있도록 함
writer.writerow((name, number))

file.close()
```

```python
# with를 사용해서 file을 이용하는 과정을 간소화
# file close 생략 가능
with open("phonebook.csv", "a") as file:
    writer = csv.writter(file)
    writer.writerow((name, number))
```

## New features

### Regular Expressions

파이썬에는 문자열과 동일시 할 수 있는 패턴인 **정규 표현식(regular expression)** 이 존재한다.

정규 표현식은 다음과 같은 것을 사용해서 작성할 수 있다.

| 표현식 | 동치 대상                              |
| ------ | -------------------------------------- |
| `.`    | 문자 (any characters)                  |
| `.*`   | 0개 이상의 문자 (0 or more characters) |
| `.+`   | 1개 이상의 문자 (1 or more characters) |
| `?`    | 선택적인 것 (something optional)       |
| `^`    | input의 시작 (start of input)          |
| `$`    | input의 끝 (end of input)              |

예를 들어 multiple condition에서 봤던 사용자가 입력한 값에 따라 답변을 출력하는 프로그램을 다음과 같이 만들 수도 있다.

```python
# regular expression을 위한 re library를 import
import re
from cs50 import get_string

s = get_string("Do you agree?\n")

# re.search는 뒤의 입력값 's'에 앞의 입력값 '^y(es)?$'가 있는지 확인한다.
# re.IGNORANCE argument를 추가로 받으면 lettercase를 무시한다.

# 'es'가 optinal한 y; 즉 y 혹은 yes가 입력받은 s에 있으면 조건을 만족한다.
# yes 앞/뒤를 ^와 $로 제한해서 uhhhm, yes 등의 답변은 조건을 만족하지 못하도록 한다.
if re.search("^y(es)?$", s, re.IGNORANCE):
    print ("Agreed.")

# 'o'가 optinal한 n; 즉 n 혹은 no가 입력받은 s에 있으면 조건을 만족한다.
# no 앞/뒤를 ^와 $로 제한한다.
elif re.search("^no?$", s, re.IGNORANCE):
    print("Not agreed.")

# 두 조건 다 만족하지 못하면 아무것도 출력하지 않는다.
```

### Speech Recognition

Google에서 제공하는 `speech_recognition` library를 이용해 음성을 인식해서 출력하거나 응답하는 프로그램을 만들 수 있다.

```python
# speech_recognition library를 불러옴
import speech_recognition

recognizer = speech_recognition.Recognizer()

# 마이크를 이용해서 받은 음성을 source에 저장한 뒤
# 나중에 작성
with speech_recognition.Microphone() as source:
    print("Say something!")
    audio = recognizer.listen(source)
```

```python
# 1. recognizer가 인식한 문자열을 출력
print("Google Speech Recognition thinks you said: ")
print(recognizer.recognize_google(audio))
```

```python
# 2. 인식한 문자열에 따라 다른 대답을 출력

# recognizer가 인식한 문자열을 words에 저장
words = recognizer.recognize_google(audio)

# words에 따른 응답
if "hello" in words:
    print("Hello to you too!")
elif "how are you" in words:
    print("I am well, thanks!")
elif "goodbye" in words:
    print("Goodbye to you too!")
else:
    print("Huh?")
```

```python
# 3. regular expressions를 사용해서 문자열의 일부로 사용

# recognizer가 인식한 문자열을 words에 저장
words = recognizer.recognize_google(audio)

# words가 my name is 이후에 0개 이상의 string이 나오는 형태와 일치하는지 확인
matches = re.search("my name is (.*)", words)

# 일치하면 matches의 두 번째 string (이름)을 Hey에 이어서 출력
if matches:
    print(f"Hey, {matches[1]}.")
else:
    print("Hey you.")
```

## 참고

### Python

* [Python official documentations](https://www.python.org/doc/)
* [Python (programming language)](https://en.wikipedia.org/wiki/Python_(programming_language)) by Wikipedia

### Iteration

* [이터레이터, 이터러블, 이터레이션](https://jiminsun.github.io/2018-05-11/Iteration/) by JIMIN SUN
* [Iterables vs. Iterators vs. Generators](https://nvie.com/posts/iterators-vs-generators/) by Vincent Driessen
