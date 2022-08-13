---
layout  : article
title   : 2. Arrays
summary : 
date    : 2020-03-06 10:16:12 +0900
updated : 2021-02-25 14:41:23 +0900
tag     : draft
toc     : true
public  : true
parent  : [[/cs-basic/harvardx-cs50s-intro]]
latex   : false
---
* TOC
{:toc}

> 이 글은 CS50 x 2020의 [weeks 2](https://cs50.harvard.edu/x/2020/weeks/2/) 강의내용을 복습하기 위해 [강의 노트](https://cs50.harvard.edu/x/2020/notes/2/)를 기반으로 작성한 글입니다.
>
> 내용을 이해하기 위한 개인적인 설명이나 해석이 있을 수 있기 때문에 되도록 원문을 참고해주시길 바랍니다.
> 잘못된 부분이 있다면 댓글이나 그 외 편하신 방법으로 알려주시면 감사하겠습니다.

## Compiling

앞의 강의에서 C언어로 작성한 소스 코드(source code)를 컴퓨터가 실행시키기 위해서는 이진법의 기계어(machine code)로 **컴파일(compile)** 을해야 한다고 배웠다.

소스 코드를 기계어로 컴파일하는 과정은 몇 단계로 나뉜다.

* 전처리(preprocessing)
* 컴파일(compiling)
* 어셈블(assembling)
* 링크(linking)

### Preprocessing

전처리(preprocessing)는 `#include`처럼 `#`으로 시작하는 줄과 관련 있다.

예를 들어, `#include <cs50.h>`는 `clang`에게 우선 우리의 프로그램에서 사용할 콘텐츠를 포함하고 있는 헤더 파일(header file)을 찾으라고 명령한다. 그러면 `clang`이 헤더 파일의 콘텐츠를 프로그램으로 가져온다.

```c
// Before preprocessing
 
#include <cs50.h>
#include <stdio.h>

int main(void)
{
    string name = get_string("Name: ");
    printf("hello, %s\n", name);
}

// After preprocessing
// cs50.h로부터 가져옴
string get_string(string prompt);
// stdio.h로부터 가져옴
int printf(const char *format, ...);

int main(void)
{
    string name = get_string("Name: ");
    printf("hello, %s\n", name)
}
```

### Compiling

C로 작성한 소스 코드를 어셈블리 코드(assembly code)로 변환한다.

```
...
main:                         # @main
    .cfi_startproc
# BB#0:
    pushq    %rbp
.Ltmp0:
    .cfi_def_cfa_offset 16
.Ltmp1:
    .cfi_offset %rbp, -16
    movq    %rsp, %rbp
.Ltmp2:
    .cfi_def_cfa_register %rbp
    subq    $16, %rsp
    xorl    %eax, %eax
    movl    %eax, %edi
    movabsq    $.L.str, %rsi
    movb    $0, %al
    callq    get_string
    movabsq    $.L.str.1, %rdi
    movq    %rax, -8(%rbp)
    movq    -8(%rbp), %rsi
    movb    $0, %al
    callq    printf
    ...
```

* 이 명령들은 소스 코드보다 낮은 레벨(lower-level)의 언어로 컴퓨터의 CPU가 바로 이해할 수 있는 바이너리 명령(binary instruction)에 가깝다.

* 변수 이름을 이용해 추상화한 것(i.e. 소스 코드)과 다르게 바이트(bytes) 자체로 작동한다.

### Assembling

어셈블리 코드로 된 명령을 바이너리로 변환한다. 바이너리로 된 명령을 기계어라고 하고 이는 CPU가 직접 실행할 수 있다.

### Linking

미리 컴파일해놓은 라이브러리의 콘텐츠를 현재 프로그램의 기계어에 연결한다.

예를 들어 현재 프로그램인 `hello.c`의 기계어에 미리 컴파일해놓은 `cs50.c`와 `printf.c`의 기계어를 연결해 하나의 실행 파일(`a.out`이나 `hello`)로 만드는 작업이다.

## Debugging

버그(bugs)는 제작자가 의도하지 않는 프로그램 에러이다. 이를 찾고 수정하는 과정을 디버깅(debugging)이라고 한다.

## help50 and printf

디버깅을 하기 위해서는 에러 메시지를 참고하거나 디버거(debugger)를 이용한다. CS50 Sandbox나 CS50 IDE는 이와 관련된 몇 가지 기능을 제공한다.

### help50

`help50`: 컴파일할 때 `make`나 `clang` 등의 명령 줄(command-line) 앞에 적으면 터미널에 뜬 에러 메시지를 해석하는 것을 도와준다.

다음과 같이 `buggy0.c`를 작성해보자.

```c
/* buggy0.c */

int main(void)
{
    printf("hello, world\n")
}
```

* 위 프로그램을 `make`로 컴파일하려고 하면 붉은 글씨로 `implicitly declaring library function 'printf'`라는 에러 메시지가 나타난다.

* 에러 메시지를 이해하기 어려울 때, `help50 make buggy0`를 실행하면 실행 결과 마지막에 `printf`를 포함하는 `#include <stdio.h>`를 적지 않았다는 것을 알려준다.

다시, 다음과 같이 `buggy1.c`를 작성해보자.

```c
/* buggy1.c */

#include <stdio.h>

int main(void)
{
    string name = get_string("What's your name?\n");
    printf("hello, world\n")
}
```

* `buggy1.c`를 컴파일하려고 시도하면 다시 많은 에러가 발생하고 첫 에러조차 파악하는 것이 어렵다.

* 그러므로 `help50 make buggy1`을 실행시키면 `string`이 정의되어있지 않기 때문에 `cs50.h`가 필요하다는 것을 알려준다.

> 터미널 창을 깨끗하게 지우기 위해서는 `ctrl + L`을 누르거나 터미널 창에 `clear`를 입력하면 된다.

### Printf

`printf`등으로 중간 과정을 출력해 error를 찾을 수도 있다. 주로 logical한 error를 찾는 데 이용한다.

```c
/* buggy2.c */

#include <stdio.h>

int main(void)
{
    for (int i = 0; i <= 10; i++)
    {
        printf("#\n");
    }
}
```

* `#`을 10번 출력하려고 작성한 위의 프로그램은 실제로 `#`을 11번 출력한다.

* 이처럼 프로그램에 '논리적인 오류(logical error)'가 있을 때는 프로그램은 에러 없이 컴파일되기 때문에 문제의 원인을 파악하기 어렵다.
* 이럴 때는 문제를 파악하는 데 도움이 될 출력 코드(print line)를 추가해볼 수 있다.

```c
#include <stdio.h>

int main(void)
{
    for (int i = 0; i <= 10; i++)
    {
        // print i to check current i
        print("i is now %i", i);
        printf("#\n");
    }
}
```

* 프로그램을 실행하면 `i`가 0에서 시작해서 10이 될 때까지 출력을 반복하기 때문에 `#`이 총 11번 출력된다.

* 이를 해결하기 위해서는 `i`가 10이 되기 전에 멈춰야 하기 때문에 `i <= 10` 대신 `i < 10`을 사용해야 한다.

## debug50

지금부터는 CS50 Sandbox와 유사하지만, 더 많은 기능을 갖는 CS50 IDE를 사용해보자. CS50 IDE는 코드 편집기(code editor)와 터미널을 창뿐만 아니라 디버깅과 협업을 위한 도구까지 있는 온라인 개발 환경이다.

CS50 IDE는 `debug50`라는 디버거를 지원한다. `debug50`를 이용하면 위에서 `printf`를 통해 파악했던 `i`의 상태를 프로그램과 상호작용하면서 확인할 수 있다.

* 우선 프로그램 실행을 멈추고 디버깅을 시작할 *중단점(breakpoint)* 을 정한다. 원하는 line의 숫자 왼편을 클릭해서 설정할 수 있고, 설정하면 빨간 원이 나타난다.
    * 예를 들어 5번째 줄에 중단점을 찍으면 다음과 같이 나타난다.
    * ![breakpoint](/post-img/harvardx-cs50s-intro-2-c/110984238-31eb8980-83ae-11eb-83dd-d93ba918bc53.png)
* 이후에 `debug50 ./buggy2`로 실행하면 디버거 창(panel) 오른쪽에 표시된다.
  ![debugger panel](/post-img/harvardx-cs50s-intro-2-c/110984266-3e6fe200-83ae-11eb-81a1-a5f3952944c2.png)
* 디버거 창을 보면 `Local Variables` 아래 `i`가 있고 현재 그 값이 `0`이라는 것이 보인다.
* 디버거 창에는 몇 가지 조절 버튼이 존재한다.
    * 파란 삼각형은 다음 중단점이나 프로그램의 끝까지 프로그램을 실행한다.
    * 오른쪽으로 굽은 화살표는 다음 줄로 넘어가서 코드를 실행한 뒤 다시 멈춘다.
* 굽은 화살표 버튼을 누르면 `printf`가 있는 줄에 도달하고 한 번 더 누르면 터미널 창에 `#`이 출력된다. 다시 버튼을 누르면 오른쪽의 `i`가 `1`로 증가한다.
* 이런 식으로 프로그램을 한 줄씩 순차적으로 실행하면서 오류를 찾을 수 있다.
* `control + C`를 누르면 디버거가 종료된다.

## check50 and style50

`check50`를 이용하면 CS50에서 정해놓은 가이드라인에 따라 프로그램을 테스트한다.

* `check50 cs50/problems/hello`를 입력하면 `check50`가 `cs50/problems/hello` 인자를 받아서 해당 파일을 업로드 한 뒤 CS50 서버의 프로그램을 이용해 실행하고 시험한다.
* 실제 개발자들도 자신만의 테스트 코드를 작성해서 코드가 제대로 동작하는지 시험한다.

`style50`는 코드가 미적으로 (코드 가독성과 유지보수와 관련) 괜찮은지 판단하는 프로그램이다.

* 예를 들어 필요 없는 공백이 있거나 들여쓰기가 안 되어 있는 경우 이를 표시한다.
* [Style guide](https://cs50.readthedocs.io/style/c)에 판단 기준이 소개되어있다.

간단하게는 고무 오리(rubber duck) 디버깅을 사용할 수도 있다. 고무 오리 디버깅은 우리가 하려는 것을 고무 오리에게 설명하면서 우리가 하려는 것과 고쳐야 할 것을 깨닫는 방법이다.

우리는 문제를 맞게 해결하는 것뿐만 아니라 좋은 디자인의 코드를 작성해야 한다. 좋은 디자인이란 시간, 비용, 메모리(memory) 사이의 트레이드 오프(tradeoff)를 합리적으로 고려해서 우리 프로그램이 돌아가는 방식을 결정하는 것을 말한다.

## Data Types

C에는 다양한 종류(types)의 데이터를 저장하기 위한 변수가 있다.

| type     | size   |
| -------- | ------ |
| `bool`   | 1 byte |
| `char`   | 1 byte |
| `int`    | 4 byte |
| `float`  | 4 byte |
| `long`   | 8 byte |
| `double` | 8 byte |
| `string` | ? byte |

각 데이터 타입은 특정한 크기의 바이트(bytes)를 갖는다. CS50 Sandbox, IDE를 포함한 대부분의 컴퓨터에서 C언어의 타입들은 위와 값은 타입 크기를 갖는다.

## Memory

우리가 사용하는 컴퓨터 안에는 단시간 사용할 데이터를 저장하는 RAM(Random-Access Memory)이 존재한다. 일반적으로 프로그램은 하드 드라이브(Hard drive)(혹은 SSD)에 장 시간동안 저장되지만, 그 프로그램을 열어서 사용할 때는 RAM에 옮긴 뒤 사용한다. RAM은 더 작고 일시적이지만(temporary, 전원이 꺼질 때까지만 유효함) 훨씬 빠르다.

데이터를 저장할 수 있는 RAM의 공간을 바이트가 연속된 격자(grid) 형태로 존재하는 것으로 생각할 수 있다.

* 실제로는 하나의 칩에 수백만 혹은 수십억 정도의 매우 많은 바이트가 존재한다.

![ram](/post-img/harvardx-cs50s-intro-2-c/110984297-4af43a80-83ae-11eb-82f5-06bf032d1def.png)

C언어에서 `char` 타입인 변수를 하나 생성하여 저장하면 위 그림의 박스 중 한 개를 차지하는 것으로 볼 수 있다. `integer`의 경우 4 bytes이므로 네 개를 차지한다. 그리고 각 박스에는 특정한 숫자나 주소가 지정(label)되어있다.

## Arrays

예를 들어 다음과 같이 세 개의 변수를 저장해보자.

```c
#include <stdio.h>

int main(void)
{
    // single quote for a literal character
    char c1 = 'H';
    char c1 = 'I';
    char c1 = '!';
    // double quote for multiple characters together
    printf("%i %c %c\n", c1, c2, c3)
}
```

* 각 문자가 문자 리터럴(literal character)인 것을 나타내기 위해 작은따옴표를 사용해야 한다.

* 컴파일한 결과는 `H I !`로 나타난다.
* 문자(character)는 실제로 숫자이므로 `printf("%i %i %i\n", c1, c2, c3)`로 출력하면 `72 73 33`이 출력된다.
    * 명백하게는 각 문자를 `(int) c1`처럼 변환(cast)해서 출력해야 하지만 이 경우 컴파일러가 자체적으로 처리한다.

이는 메모리 안의 박스 중 세 개를 각각 `c1`, `c2`, `c3`로 표시해서 차지하고 있는 것과 같다. 각 박스는 크기가 1바이트이며 그 안에는 변수의 값을 바이너리의 형태로 저장하고 있다.

`scores0.c`를 살펴보자. `scores0.c`는 데이터 타입이 `int`인 변수를 이용해서 세 숫자의 평균을 구하는 프로그램이다.

```c
#include <stdio.h>

int main(void)
{
    // Scores
    int score1 = 72;
    int score2 = 73;
    int score3 = 33;

    // Print average
    printf("Average: %i\n", (score1 + score2 + score3) / 3);
}
```

* 이를 위해서는 점수(score)마다 일일이 변수를 만들어줘야 하는데 이 경우 변수들을 나중에 사용하기 번거롭다.

C에서는 변수를 더 쉽게 사용할 수 있도록 각 변수를 서로의 바로 다음에(back-to-back) 저장할 수 있다. 이처럼 연속적으로 덩어리져있는 변수들의 목록을 **배열(array)** 라고 한다.

예를 들어 우리는 3개의 정수로 이루어진 배열을 `int scores[3];`와 같이 선언할 수 있다. 다음과 같이 변수를 배열로 선언하고 사용한다.

```c
#include <cs50.h>
#include <stdio.h>

int main(void)
{
    // scores
    // declare array of 3 integers
    int scores[3];

    scores[0] = 72;
    scores[1] = 73;
    scores[2] = 33;

    // Print average
    printf("Average: %i\n", (scores[0] + scores[1] + scores[2]) / 3);
}
```

* 배열은 zero-indexed이다. 이는 첫 번째 원소(element)의 인덱스가 0으로 시작함을 의미한다.

이제 코드를 정리해보자.

위에서 배열의 길이인 3이 반복되어 사용된다. 이 값이 항상 동일한 값을 유지할 수 있도록 상수(constant, fixed value)를 사용해서 수정한다.

```c
#include <cs50.h>
#include <stdio.h>

// Set N as 3 (한 번 값을 지정하면 프로그램 내에서 바뀌지 않음)
const int N = 3;

int main(void)
{
    // scores
    int scores[N]; // use N

    scores[0] = 72;
    scores[1] = 73;
    scores[2] = 33;

    // Print average
    printf("Average: %i\n", (scores[0] + scores[1] + scores[2]) / N); // use N
}
```

* 사용한 `const` 키워드는 컴파일러에 `N`이 값이 프로그램 안에서 절대 바뀌지 않는다는 것을 알려준다.

* 일반적으로 상수 선언은 `main` 함수 밖에서 하고 변수명은 대문자로 작성한다. 컴파일하기 위해 필수적이지는 않지만 다른 사람들이 잘 파악할 수 있도록 해준다.

배열에서는 반복문(loop)을 이용해서 점수를 더하거나 이후에 점수에 다시 접근하는 것을 더 쉽게 할 수 있다.

```c
#include <cs50.h>
#include <stdio.h>

// average 함수 선언
float average(int length, int array[]);

int main(void)
{
    // 입력받을 score의 개수 입력
    int n = get_int("Scores:  ");

    // n개의 score를 받을 array 선언
    int scores[n];
    // score 입력
    for (int i = 0; i < n; i++)
    {
        scores[i] = get_int("Score %i: ", i + 1);
    }

    // Average 출력 (%.1f: 소수점 한 자리 까지) 
    printf("Average: %.1f\n", average(n, scores));
}

// length: score 개수, array: score를 담고있는 array
float average(int length, int array[])
{
    int sum = 0;
    // sum에 length개의 array 항목을 모두 더함
    for (int i = 0; i < length; i++)
    {
        sum += array[i];
    }
    // sum을 length로 나눔
    // 나눈 결과가 정수가 아닐 수 있으므로 모두 float형으로 바꿔서 계산 
    return (float) sum / (float) length;
}
```

메모리에서 위의 배열은 각 점숫값이 `int`형이므로 다음의 그림과 같이 네 칸(four bytes)을 차지한다.

![memory_with_array](/post-img/harvardx-cs50s-intro-2-c/110984341-5a738380-83ae-11eb-934a-1d00d33fa914.png)

## Strings

문자열(string)은 실제로는 문자로 이루어진 배열이다.

* 문자열 `s`가 있다면 문자열의 각 문자는 `s[0]`, `s[1]`과 같은 방식으로 접근할 수 있다.
* 문자열은 특별한 문자인 `\0`으로 끝난다.
    * 이는 모든 비트가 0인 문자로 '널 문자(null character)' 혹은 '널 종결 문자(null terminating character)'라고 불린다.
* 즉 실제로 "Hi!"를 표현하기 위해서는 4 bytes가 필요하다.

![memory_with_string](/post-img/harvardx-cs50s-intro-2-c/110984394-6d865380-83ae-11eb-9ef8-04305097c513.png)

네 개의 문자열로 이루어진 배열은 어떻게 이루어져있는지 보자.

```c
string names[4];
names[0] = "EMMA";
names[1] = "RODRIGO";
names[2] = "BRIAN";
names[3] = "DAVID";

// names의 첫 번째 값을 string(%s)으로 출력
printf("%s\n", names[0]);

// 첫 이름의 각 character를 다시 []를 사용해서 출력
//(names[0])[0]처럼 생각할 수 있다
printf("%c%c%c%c\n", names[0][0], names[0][1], names[0][2], names[0][3]);
```

* 문자열은 널문자에 도달할 때까지 문자열의 각 문자를 `printf`로 반복해서 출력한다.

* 첫 이름은 네 글자이므로 실제로 `names[0][4]`를 `int`형으로 출력하면 `0`이 나타난다.

이 배열의 각 문자는 메모리에 다음과 같이 저장되어있다.

![memory_with_string_array](/post-img/harvardx-cs50s-intro-2-c/110984445-7d9e3300-83ae-11eb-9ee8-3cad6c28954a.png)

이를 다음의 코드(`string0.c`)로 실험해볼 수 있다.

```c
/* string0.c */

#include <cs50.h>
#include <stdio.h>

// strlen을 사용하기 위한 library
#include <string.h>

int main(void)
{
    string s = get_string("Input:  ");
    printf("Output: ");

    // strlen(s): string s의 길이 (문자수)
    // string의 각 문자를 순차적으로 하나씩 출력
    for (int i = 0; i < strlen(s); i++)
    {
        printf("%c", s[i]);
    }
    printf("\n");
}
```

* `s[i] != '\0'`을 조건으로 사용해도 된다. 널 문자가 나올 때까지 출력한다.

`string0`의 디자인을 발전시켜보자. `string0`는 문자열의 길이를 각 문자가 출력된 이후에 매번 확인한다는 점이 조금 비효율적이다. 문자열의 길이는 바뀌지 않기 때문에 다음과 같이 한 번만 체크해도 된다.

```c
#include <cs50.h>
#include <stdio.h>
#include <string.h>

int main(void)
{
    string s = get_string("Input: ");
    printf("Output:\n");
    // 반복문 실행의 처음에 변수 i와 n을 정의
    // n에 문자열의 길이를 저장
    for (int i = 0, n = strlen(s); i < n; i++)
    {
        printf("%c\n", s[i]);
    }
}
```

* 위의 코드는 `n`을 위한 저장공간을 더 필요로하지만, 매번 문자열의 길이를 확인하지 않아도 된다는 장점이 있다.

이제 배운 것을 이용해서 단어를 대문자로 바꾸는(capitalize) 프로그램을 작성해보자.

```c
#include <cs50.h>
#include <stdio.h>
#include <string.h>

int main(void)
{
    string s = get_string("Before: ");
    printf("After:  ");

    // string s의 모든 문자를 순차적으로 대문자로 변경
    for (int i = 0, n = strlen(s); i < n; i++)
    {
        // s[i]가 소문자인 경우 ('a'~'z' 사이에 있는 경우)
        if (s[i] >= 'a' && s[i] <= 'z')
        {
            // s[i]에서 32를 뺀 값을 출력
            // ASCII 에서 동일한 문자의 대문자, 소문자의 차이는 32이다
            printf("%c", s[i] - 32);
        }
        else
        {
            printf("%c", s[i]);
        }
    }
    printf("\n");
}
```

라이브러리를 이용하면 이를 훨씬 간단하게 작성할 수 있다. [man pages](https://man.cs50.io/)에 다양한 라이브러리 함수가 제공되어있다.

```c
#include <cs50.h>
// toupper를 사용하기 위한 library
#include <ctype.h>
#include <stdio.h>
#include <string.h>

int main(void)
{
    string s = get_string("Before: ");
    printf("After:  ");

    for (int i = 0, n = strlen(s); i < n; i++)
    {
        // toupper(s[i]): s[i]를 대문자로 변경
        printf("%c", toupper(s[i]));
    }
    printf("\n");
}
```

## Command-line arguments

`make`나 `clang` 같은 프로그램은 명령 줄(command-line)에서 명령어 뒤에 단어를 추가로 입력한다. (e.g., `file`을 컴파일하기 위해서 `make 'file'`을 입력)

우리가 직접 만든 프로그램도 명령 줄에 입력한 단어를 **명령 줄 인수(command-line argument)** 로 사용할 수 있다.

`argv.c`에서는 `main` 함수를 다음과 같이 바꿨다.

```c
// hello.c를 다음과 같이 작성한 뒤 terminal에 './hello name'을 입력하여 실행
// name에는 출력하고 싶은 아무 문자열이나 쓰면 된다
#include <cs50.h>
#include <stdio.h>

// `main` function이 `argc`, `argv` 두 인수를 받음
int main(int argc, string argv[])
{
    // argument의 개수가 2개가 아닌 경우 (./hello와 name)
    if (argc == 2)
    {
        // command-line argument를 입력하지 않았다는 안내를 출력
        printf("hello, %s\n", argv[1]);
    }
    else
    {
        // argv[1]인 name을 이용하여 'hello, name' 출력
        printf("hello, world\n");
    }
}
```

* `argc`: argument count, 입력된 인자(argument)의 수

* `argv`: 입력된 인자를 담고 있는 문자열 배열
* 첫 인자 `argv[0]`은 실행시키는 프로그램의 이름이다. (e.g `./hello`)

프로그램의 에러를 나타내기 위해 `main` 함수에서 특정 값을 반환할 수 있다. (`main` 함수 앞에 `int`를 적는 이유)

* 일반적으로 정상적으로 프로그램을 마쳤을 때는 `0`을
* 에러가 발생했을 때는 그 외의 수를 반환한다.

```c
#include <cs50.h>
#include <stdio.h>

int main(int argc, string argv[])
{
    if (argc != 2)
    {
        printf("missing command-line argument\n");

        // 문제 발생을 알리기 위해 1을 return하고 종료.
        return 1;
    }
    printf("hello, %s\n", argv[1]);

    // 문제 없음을 알리기 위해 0을 return하고 종료.
    return 0;
}
```

* 프로그램 `main` 함수의 반환 값은 종료 코드(exit code)라고 한다.

* 사용자에게 보이거나 유용하지는 않아도 에러 코드는 복잡한 프로그램에서 어떤 점이 잘못됐는지 파악하는데 도움이 된다.

## Readability

> 과제에 연관된 내용이므로 생략합니다.

## Encryption

> 과제에 연관된 내용이므로 생략합니다.
