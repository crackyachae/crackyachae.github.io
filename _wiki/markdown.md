---
layout  : wiki
title   : 마크다운(markdown) 사용법
summary : 글 작성의 기본이되는 마크다운을 익혀보자
date    : 2019-02-29 14:17:12 +0900
updated : 2019-03-02 22:03:05 +0900
tag     : markdown
toc     : true
public  : true
parent  : [[Blog]]
latex   : false
---
* TOC
{:toc}

# 1. 마크다운이란

## 1.1 마크다운
마크다운은 웹에서 글을 쉽게 읽고 작성하기 위해 고안된 언어(혹은 툴)로 일반 텍스트(plain text) 형태로 쓴 글을 HTML로 바꿔준다.

즉, 마크다운은 두 가지 단계로 이루어져 있다고 볼 수 있는데

1. 일반 텍스트로 작성하여 문법(syntax)을 형성하고 
2. 형식을 갖춘 일반 텍스트를 HTML로 변환한다. 이때 Perl로 만들어진 소프트웨어 툴을 사용한다.

## 1.2 마크다운의 장단점
마크다운 디자인의 기본적인 목적이자 장점은 태그나 별도의 formatting instruction 없이 일반 텍스트만으로 글을 구성하여 발행 할 수 있다는 것이다. 작성 자체도 직관적이고 쉽게 할 수 있으며 HTML 등의 다른 문법에 본 내용 외의 formatting instruction이 적기 때문에 본 내용의 가독성도 높다.

하지만 기능이 제한적이기 때문에, 부족한 기능은 HTML 태그로 대신해 작성해야 한다.

## 1.3 마크다운의 사용
티스토리처럼 사이트에서 마크다운 에디터를 지원하는 경우 해당 에디터를 사용하여 작성하면 된다.

추후 작성

# 2. 마크다운 문법(Syntax)

## 2.1 제목(Headers)

### 2.1.1 Setext-style Headers
\=(equal signs) 혹은 \-(dashes)를 사용하여 밑줄을 그어 표현한다. 기호의 개수는 상관없다.

| 항목                        | 마크다운 코드                  |
| ------------------------- | ------------------------ |
| First level header \<h1>  | `Header 1`<br> `======`  |
| Second level header \<h2> | `Header 2` <br> `------` |

```markdown
This is an H1
======

This is an H2
------
```

># This is an H1
>## This is an H2

### 2.1.2 Atx-style headers

문장의 처음에 1-6개의 해시 문자(hash characters)를 적어서 header lever 1-6을 표현한다. 해시 문자를 적은 뒤 반드시 한 칸 띄어주어야 적용된다.
  
| 항목                        | 마크다운 코드           |
| ------------------------- | ----------------- |
| First level header \<h1>  | `# Header 1`      |
| Second level header \<h2> | `## Header 2`     |
| Third level header \<h3>  | `### Header 3`    |
| Fourth level header \<h4> | `#### Header 4`   |
| Fifth level header \<h5>  | `##### Header 5`  |
| Sixth level header \<h6>  | `###### Header 6` |

```markdown
# This is an H1
## This is an H2
### This is an H3
#### This is an H4
##### This is an H5
###### This is an H6
```

># This is an H1
>## This is an H2
>### This is an H3
>#### This is an H4
>##### This is an H5
>###### This is an H6

### 2.1.3 목차 생성

문서 내에 사용된 헤딩 태그를 이용하여 {:toc} 입력시 목차를 자동으로 생성할 수 있다.

## 2.2 내용 작성
### 2.2.1 단락(Paragraphs), 줄 바꿈(Line breaks)

단락(Paragraph): 하나 이상의 연속 된 텍스트들 사이에 한 개 이상의 빈 줄이 있어야 하며 빈 줄은 공백(spaces)과 탭(tabs)을 제외하고는 아무것도 포함하지 않아야 한다.

줄 바꿈(Line break): 공백을 두 번 입력해서 줄 바꿈을 하는 방식으로 단락을 표현할 수도 있다.

| 항목               | 마크다운 코드 |
| ---------------- | ------- |
| Paragraph \<p>   | 예시 참고   |
| Line break \<br> | 예시 참고   |

```markdown
Paragraph 1

Paragraph 2
```

>Paragraph 1
>Paragraph 2

```markdown
Paragraph 1  <!--contain 2 spaces-->
Paragraph 2
```

>Paragraph 1  
>Paragraph 2

### 2.2.2 강조(Emphasis)

`*(asterisks)` 혹은 `_(underscores)`로 강조하고 싶은 글자를 감싸서 표현한다.

| 항목           | 마크다운 코드                |
| ------------ | ---------------------- |
| 기울임 (Italic) | `*text* or _text_`     |
| 두껍게 (Bold)   | `**text** or __text__` |
| 취소선          | `~text~`               |
| 밑줄           | `<u>text</u>`          |

```markdown
이탤릭체는 *single asterisks* 혹은 _single underscore_ 를 사용한다.  
볼드체는 **double asterisks** 혹은 __double underscores__ 사용한다.  
별표와 언더바를 혼용하여 **_두꺼운 기울임체_** 를 사용할 수 있다. 

취소선은 ~물결 표시~를 사용한다.
밑줄은 HTML과 동일하게 <u>\<u>태그를</u> 사용한다.
```

>이탤릭체는 *single asterisks* 혹은 _single underscore_ 를 사용한다.  
>볼드체는 **double asterisks** 혹은 __double underscores__ 사용한다.  
>별표와 언더바를 혼용하여 **_두꺼운 기울임체_** 를 사용할 수 있다.
>
>취소선은 ~물결 표시~를 사용한다.
>밑줄은 HTML과 동일하게 <u>u태그를</u> 사용한다.

### 2.2.3 이스케이프 (Backslash Escapes)

마크다운 문법에서 특별한 용도로 사용되는 문자를 본래(literal)의 문자로 사용하고 싶으면 앞에 \(backslash)를 붙인다.

다음과 같은 문자에 적용할 수 있다.

| 항목              | 기호  | 항목               | 기호  |
| --------------- | --- | ---------------- | --- |
| backtick        | \`  | backslash        | \\  |
| asterisk        | \*  | hash mark        | \#  |
| underscore      | \_  | plus sign        | \+  |
| curly braces    | \{} | dash (hyphen)    | \-  |
| square brackets | \[] | dot              | \.  |
| parentheses     | \() | exclamation mark | \!  |

```markdown
\*Literal asterisks\*
\# Literal hash mark 
```

>\*Literal asterisks\*
>\# Literal hash mark 

### 2.2.4 링크(Links)

링크는 인라인(inline) 링크, 참조(reference) 링크 두 가지 방법으로 작성할 수 있다. 문서 내에서 URL 자체를 입력하거나 주소를 \<>(angle brackets) 으로 감싸면 해당 URL로의 링크가 걸린다.

동일한 서버의 local resource를 지정하고 싶으면 URL 대신 relative path를 이용하면 된다.

| 항목     | 마크다운 코드                                                                     |
| ------ | --------------------------------------------------------------------------- |
| 인라인 링크 | `[Text](URL "optional link title")`                                         |
| 참조 링크  | `[Text][reference_id]` <br><br> `[reference_id]: URL "optional link title"` |
| 일반 링크  | `<URL>`                                                                     |

```markdown
[야채크래커 홈페이지](https://crackyachae.tistory.com/ "야채크래커의 부스러기") <!--인라인 링크-->
이 글은 [Study][study]의 [git & blog][5] 카테고리 안에 쓰여 있습니다. <!--참조 링크-->

티스토리: <https://www.tistory.com/>

<!--참조된 id는 참조한 링크와 한 줄 이상 떨어져 있어야 하는 것 같다-->
[study]: https://crackyachae.tistory.com/category/공부를%20합니다 "category-Study"
[5]: https://crackyachae.tistory.com/category/공부를%20합니다/깃%20&%20블로그%20(Git%20&%20Blog)
```

>[야채크래커 홈페이지](https://crackyachae.tistory.com/ "야채크래커의 부스러기") <!--인라인 링크-->
>
>이 글은 [Study][study]의 [git & blog][5] 카테고리 안에 쓰여 있습니다. <!--참조 링크-->
>
>티스토리: <https://www.tistory.com/>
>
>[study]: https://crackyachae.tistory.com/category/공부를%20합니다 "category-Study"
>[5]: https://crackyachae.tistory.com/category/공부를%20합니다/깃%20&%20블로그%20(Git%20&%20Blog)

## 2.3 이미지(Image)
앞에 느낌표가 붙는 것 외에는 링크와 동일한 방법으로 작성하며 인라인, 참조 방식 모두 가능하다. 

| 항목  | 마크다운 코드                                                                                       |
| --- | --------------------------------------------------------------------------------------------- |
| 인라인 | `![Alt text](path/to/img.jpg "optional image title")`                                         |
| 참조  | `![Alt text][reference_id]` <br><br> `[reference_id]: path/to/img.jpg "optional image title"` |

대체 텍스트(Alternative text): 이미지가 오류에 의해 표시되지 않을 때 대신 나타나는 텍스트

```markdown
![야채크래커_kor](https://k.kakaocdn.net/dn/MXRBz/btqCrOBBGRB/rJvO1B4tB0vSfEtGjNhrX0/img.png "야채크래커")
![야채크래커_eng][eng]

[name]:  https://k.kakaocdn.net/dn/SmRVn/btqCrjIBUxt/oK8juBIE6bCzGxhh18Xrr0/img.png
```
>![야채크래커_kor](https://k.kakaocdn.net/dn/MXRBz/btqCrOBBGRB/rJvO1B4tB0vSfEtGjNhrX0/img.png "야채크래커")
>![야채크래커_eng][eng]

[eng]:  https://k.kakaocdn.net/dn/SmRVn/btqCrjIBUxt/oK8juBIE6bCzGxhh18Xrr0/img.png

이미지에 링크를 걸기 위해서는 마크다운 이미지 코드를 링크 코드로 묶어준다.
```markdown
[![Alt text](path/to/img.jpg "optional image title")](url)
```
```markdown
[![야채크래커](https://k.kakaocdn.net/dn/bO6Zzg/btqCpQfN9DM/f7sO260V9XgM6ScMhVU3e0/img.png)](https://crackyachae.tistory.com/)
```

>[![야채크래커](https://k.kakaocdn.net/dn/bO6Zzg/btqCpQfN9DM/f7sO260V9XgM6ScMhVU3e0/img.png)](https://crackyachae.tistory.com/)


## 2.4 목록(Lists)
### 2.4.1 순서가 있는 목록(Ordered lists)

순서가 필요한 목록은 앞에 숫자 다음에 점을 찍어서 만들 수 있다. 점 앞의 숫자에 상관없이 순차적으로 번호를 매겨서 표시된다.

```markdown
1. ordered list 1
1. ordered list 2
1. ordered list 3
```

>1. ordered list 1
>1. ordered list 2
>1. ordered list 3

### 2.4.2 순서가 없는 목록(Disordered lists)

\*(asterisks), \+(plus sign), \-(hyphen)를 사용해서 목록을 표시할 수 있다.
계층을 나누고 싶으면 앞에 탭(tab)을 넣으면 된다.
적은 기호에 상관없이 계층에 따라 표시된다.

```markdown
*  disordered first level list 1 using asterisk
    * disordered second level list 1 using asterisk
    + disordered second level list 2 using plus sign
    - disordered second level list 3 using pyphen
    
*  disordered first level list 2 using asterisk
    + disordered second level list 1 using asterisk
    	- disordered third level list 1 using hyphen
```

>*  disordered first level list 1 using asterisk
>    * disordered second level list 1 using asterisk
>    + disordered second level list 2 using plus sign
>    - disordered second level list 3 using pyphen
>    
>*  disordered first level list 2 using asterisk
>    + disordered second level list 1 using asterisk
>    	- disordered third level list 1 using hyphen

## 2.5 블록 인용구 (Block quotes)
문장 앞에 \>(right angle bracket)을 넣어서 블록 인용구를 표시할 수 있다.
문장마다 넣어 주는 것이 보기 좋지만, 문단의 첫 줄 앞에만 넣어도 괜찮다.


기호의 개수를 조절해서 블록 인용구를 중첩해 사용할 수 있다.


블록 인용구 안에 헤더, 목록과 같은 다른 마크다운 요소를 사용할 수 있다.

```markdown
> This is the first level of quoting 
>
>> This is _nested_ block quote
>>> This is **triple nested** quote
```

> This is the first level of quoting 
>
>> This is _nested_ block quote
>>> This is **triple nested** quote

## 2.6 코드(Code)
### 2.6.1 인라인 코드(Inline code)

코드를 \`(backtick quotes)으로 감싼다.

```markdown
`lnline code`
```

>`lnline code`

### 2.6.2 코드 블럭(Code block)

코드를 세 개 이상의 \`(backtick quotes)로 감싸거나 줄 가장 앞에 공백(space) 4칸 혹은 탭(tab)을 삽입한다. \` 옆에 언어를 명시해주면 해당 언어의 syntax highlight가 적용된다.

````markdown
```c
int num = 1;
printf("first way: using ``` code ```");
```
````

>```c
>int num = 1;
>printf("first way: using ``` code ```");
>```

## 2.7 표(Table)
---
3개 이상의 \-(hyphen)을 이용하여 행을 만들면 헤더 셀을 구분할 수 있다.
헤더 셀을 구분할 때 :(colons) 기호로 셀 안의 내용을 정렬 할 수 있다.
표 안에서 텍스트 효과를 줄 수 있다.

```markdown
| Header 1 | Header 2 | Header 3 | Header 4 |
| -------- | :------- | :------: | -------: |
| 설정값      | 왼쪽 정렬    |  가운데 정렬  |   오른쪽 정렬 |
| 텍스트 효과   | _기울임_    | **두껍게**  |    ~취소선~ |
```

>| Header 1 | Header 2 | Header 3 | Header 4 | 
>| --- | :-- | :-: | --: |
>| 설정값 | 왼쪽 정렬 | 가운데 정렬 | 오른쪽 정렬 |
>| 텍스트 효과 | _기울임_ | **두껍게** | ~취소선~ |

가장 좌측과 가장 우측에 있는 | (vertical bar) 기호는 생략할 수 있다.
표 내부 줄 바꿈은 지원하지 않기 때문에 직접 \<br> 태그를 입력해 주어야 한다.

## 2.8 수평선(Horizontal rules)
\*(asterisks), \-(hyphens), \_(underscore) 기호를 3개 이상 입력하여 수평선을 그을 수 있다.

```markdown
*** <!--asterisks-->

* * * <!--asterisks with spaces-->

--- <!--hyphens-->

___ <!--underscores-->
```

>***
>
>* * * 
>
>--- 
>
>___ 

## 참고
+ [Markdown](https://daringfireball.net/projects/markdown/) by John Gruber
+ [MarkDown 사용법 총정리](https://heropy.blog/2017/09/30/markdown/) by HEROPY Tech
+ [마크다운(MARKDOWN) 문법 사용법](https://eungbean.github.io/2018/06/11/How-to-use-markdown/) by EUNGBEAN
+ [기술 글쓰기 1 - Markdown과 친해지기](http://www.hakawati.co.kr/405) by Hakawati Security Lab

