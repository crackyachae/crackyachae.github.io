---
layout  : article
title   : 0. Scratch
summary : 
date    : 2020-03-06 10:12:39 +0900
updated : 2021-02-06 10:35:23 +0900
tag     : draft
toc     : true
public  : true
parent  : [[/cs-basic/harvardx-cs50s-intro]]
latex   : false
---
* TOC
{:toc}

> 이 글은 CS50 x 2020의 [weeks 0](https://cs50.harvard.edu/x/2020/weeks/0/) 강의내용을 복습하기 위해 [강의 노트](https://cs50.harvard.edu/x/2020/notes/0/)를 기반으로 작성한 글입니다.
>
> 내용을 이해하기 위한 개인적인 설명이나 해석이 있을 수 있기 때문에 되도록 원문을 참고해주시길 바랍니다.
> 잘못된 부분이 있다면 댓글이나 그 외 편하신 방법으로 알려주시면 감사하겠습니다.

## Welcome

이 코스에서 궁극적으로 중요한 것은 코스가 끝났을 때 자신의 실력을 다른 수강생과 비교하는 것이 아니다. 그 보다는 이 코스를 시작할 때의 자신과 끝날 때의 자신을 비교하는 것이 중요하다.

## What is computer science?

컴퓨터 과학(computer science)은 근본적으로 **문제를 해결하는(problem-solving)** 것이다.

우리는 이 문제해결 과정을

* 우리 문제의 세부 내용인 특정 입력(input)을 가져다
* 우리 문제의 해결 방법인 출력(output)을 만들어내는 과정으로 볼 수 있다.
* 이 가운데에 있는 블랙박스(black box)가 바로 컴퓨터 과학이다.

![from input to output](/post-img/harvardx-cs50s-intro-0-scratch/110982706-33b44d80-83ac-11eb-94de-0107ab7208c9.png)

표준 방식으로 정보를 저장하거나 사용(work)하기 위해서는 우리의 입력을 나타낼 방법이 필요하다.

## Binary

가장 낮은 단계(lowest level)에서 컴퓨터는 정보(data)를 이진법(binary)으로 저장한다. 이진법은 0과 1 두 숫자밖에 존재하지 않는 수 체계이다.

예를 들어 우리는 다음의 수가 백삼십이라는 것을 안다.

```
1 2 3
```

* `3`은 일의 자리에, `2`는 십의 자리에, `1`은 백의 자리에 있다.

* 그러므로 `123`은 100 x 1 + 10 x 2 + 1 x 3 == 100 + 20 + 3 = 123이다.
* 자리마다 사용할 수 있는 숫자가 총 열 개이기 때문에 각 자릿수는 10의 거듭제곱을 나타낸다.

이진법에서는 두 개의 숫자만 갖기 때문에 각 자릿수는 2의 거듭제곱을 나타낸다.

```
4 2 1
0 0 0
```

* 이 수는 똑같이(still) 0이다.

```
4 2 1
0 1 1
```

* 이진수를 `0 1 1`로 바꾸면 십진수로는 3이다.

이진법이 컴퓨터에 적합한(make sense) 이유는 우리가 켜고 끄는 것(on or off)밖에 할 수 없는 전기로 전원을 공급하기 때문이다.

컴퓨터 안에는 트랜지스터(transistor)라고 불리는 수억 개의 스위치가 전기를 저장하고 있다. 각 스위치는 켜지거나 꺼진 상태로 비트(bit)를 나타낸다. 충분한 수의 비트가 있으면 컴퓨터는 어떤 **수**라도 셀 수 있다. 그중에서도 특히 8bit가 모이면 하나의 바이트(byte)를 이룬다.

## Representing data

그렇다면 **숫자**가 아닌 **문자**는 어떻게 나타내야 할까. 문자를 나타내기 위해서는 어떤 수를 문자에 대응(map)시켜야 할지 결정해야 한다.

오래전에 사람들이 모여 [아스키(ASCII)](https://en.wikipedia.org/wiki/ASCII)라고 불리는 표준 매핑(mapping)을 정했다.

* 예를 들어 문자 'A'는 숫자 '65'이고 'B'는 '66'이다.
* 매핑은 문장부호와 기호도 포함하고 있다.
* 예를 들어 `HI!`라는 메시지는 실제로는 각각 `72 73 33`의 값이고 이를 다시 이진수로 나타내면 `1001000 1001001 100001`이다.

이처럼 낮은 레벨(low-level)로 구현(implementation)된 것을 (e.g., 이진수) 높은 레벨(high-level)로 구현해 나타내는 것을 *추상화(abstraction)* 라고 한다.

* 위의 예시는 `1001000 1001001 100001`이라는 값을 `HI!`라는 메시지로 추상화했다고 볼 수 있다.

이 외의 강세 기호(accent marks), 이모지(emoji) 등은 또 다른 표준인 [유니코드(Unicode)](https://en.wikipedia.org/wiki/Unicode)에 포함된다.

* 우리가 이모지를 받을 때 컴퓨터는 실제로 `128514`와 같은 (이진수로 `11111011000000010`) 숫자를 받는다.

**이미지(image)** 역시 여러 개의 작은 정사각 점으로 이루어져 있다. 각 점은 RGB라고 하는 시스템에서 이진수로 표현되어있다. RGB 시스템은 픽셀(pixel)마다 빨강(red), 초록(green), 파랑(blue) 빛에 해당하는 값이 각각 주어져 있으며 각 색상을 다른 양으로 혼합해 다양한 색상을 만들 수 있다.

예를 들어 빨강, 초록, 파랑에 아래와 같은 값을 주면 연한 노란색으로 합쳐진다.

![rbg example](/post-img/harvardx-cs50s-intro-0-scratch/110982856-62cabf00-83ac-11eb-8ad4-8a151fe4b654.png)
![rgb combined](/post-img/harvardx-cs50s-intro-0-scratch/110982863-64948280-83ac-11eb-8a5d-25da96932bc9.png)

컴퓨터 프로그램은 코드의 문맥에 따라 이진법으로 표현된 숫자가 숫자, 문자, 픽셀 중 어떤 것으로 해석되어야 할지 판단한다.

## Algorithms

이제 우리는 입력과 출력을 표현할 수 있게 되었다.

앞의 사진에서 입력과 출력 사이의 블랙박스(black box)는 알고리즘(algorithms)을 포함한다. 알고리즘은 문제를 해결하기 위한 단계별 명령(instruction)이다.

![algorithms in blackbox](/post-img/harvardx-cs50s-intro-0-scratch/110982868-665e4600-83ac-11eb-992d-68f69c2f0a96.png)

예를 들어 우리가 (알파벳 순으로 정리된) 전화번호부에서 Mike Smith를 찾는다고 생각해보자. Mike Smith를 찾기 위해서 우리는

* Mike Smith를 찾거나 책의 끝에 도달할 때까지 책을 처음부터 한 페이지씩 넘길 수 있다.
* 책을 한 번에 두 페이지씩 넘길 수도 있지만 지나칠 경우 이전 페이지로 돌아가야 한다.
* 가장 효과적인 방법은 전화번호부의 중간지점을 펼쳐 Mike가 왼쪽이나 오른쪽 중 어디에 있는지 결정한 뒤 필요 없는 절반을 찢어버리는 것이다. 이처럼 범위를 반으로 줄여나가는 것을 매번 반복하면 봐야 할 페이지가 1,024장이라도 열 번의 반복만으로 한 페이지만을 남길 수 있다.

실제로 각 알고리즘의 효율을 그래프로 나타낼 수 있다.

![efficiency graph for each algorithm](/post-img/harvardx-cs50s-intro-0-scratch/110982877-68c0a000-83ac-11eb-9dca-b2f19f42a5b4.png)

* 첫 번째 방법인 한 페이지를 한 번에 넘기는 방법은 빨간색 선처럼 나타난다. 문제를 해결하기 위한 시간은 문제의 크기가 커질수록 선형적으로(linearly) 증가한다.
* 두 페이지를 한 번에 넘기는 두 번째 방법은 노란색 선처럼 나타난다. 기울기가 완만하지만, 여전히 선형적으로 증가한다.
* 마지막 방법은 초록색 선처럼 나타난다. 이는 로그적인(logarithmic) 형태를 보이며 문제의 크기가 커질수록 해결 시간은 더 천천히 증가한다.

## Pseudo code

우리는 위의 사례로 *의사 코드(pseudo code)*를 작성할 수 있다.

의사 코드는 사람의 언어로 알고리즘을 표현한 비공식적인 문법(informal syntax)이다.

```
1  Pick up phone book
2  Open to middle of phone book
3  Look at page
4  If Smith is on page
5      Call Mike
6  Else if Smith is earlier in book
7      Open to middle of left half of book
8      Go back to line 3
9  Else if Smith is later in book
10     Open to middle of right half of book
11     Go back to line 3
12 Else
13     Quit
```

* 이 중 동사로 시작하거나 행동을 의미하는 것들을 *함수(functions)* 라 부른다.
    * `Pick up`, `Open to`, `Look at`, `Call`, `Quit` 등
* 경로를 결정하는 갈래(branches) 존재하는데 이를 *조건(conditions)* 이라 부른다.
    * `If`, `Else if`, `Else`
* 우리가 어느 경로를 택할지 결정하는 질문은 *부울 표현식(boolean expressions)* 이라 부른다. 부울 표현식의 결과는 참(true)혹은 거짓(false)으로 나타난다.
    * `Smith is on page`, `Smith is earlier in book`, `Smite is later in book`
* 마지막으로 프로그램의 일부를 반복할 수 있도록 코드 순환을 만드는 단어들이 있다. 이를 *루프(loops)* 라 부른다.
* `Go back to line 3`

## Scratch

위에서 배운 블록(building blocks)을 이용해 프로그램을 만들 수 있다.

* 함수
* 조건
* 부울 표현식
* 반복

우리는 그래픽 프로그래밍 언어(graphical programming language)인 [스크래치(Scratch)](https://scratch.mit.edu)를 사용할 것이다. 스크래치는 명령을 포함한 블록을 드래그 앤드 드롭(drag and drop)해서 사용한다. C, 파이선(Python), 자바스크립트(JavaScript) 같은 텍스트 프로그래밍 언어(textual programming language)로는 나중에 옮겨 갈 예정이다.

스크래치를 포함한 위의 언어는 다음과 같은 조금 더 강력한 기능을 갖는다.

* 변수(variables): 특정 값을 저장하고 바꿀 수 있는 기능(ability).
* 스레드(threads): 우리의 프로그램이 한 번에 여러 개의 일을 처리할 수 있는 기능.
* 이벤트(events): 프로그램에서의 변화나 입력에 반응할 수 있는 기능.

스크래치는 다음과 같은 환경을 갖는다.

* 왼쪽: 함수, 변수, 그 외 다른 개념에 해당하는 퍼즐 조각들이 나열되어있다. 이 조각들을 중앙의 명령 영역(instruction area)으로 드래그 앤드 드롭해서 사용한다.
* 오른쪽: 우리가 만든 프로그램을 사람들에게 보여주는 스테이지(stage)가 존재한다. 배경, 캐릭터(스크래치에서는 스프라이트(sprites)로 부른다) 등을 바꿀 수 있다.

> 이후 내용은 스크래치 구현 실습이기 때문에 정리는 생략합니다. 원문 혹은 동영상 강의를 참고해주시길 바랍니다.
