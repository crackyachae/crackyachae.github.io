---
layout  : article
title   : Chapter 04. 배열(Array)
summary : 
date    : 2021-04-20 11:14:46 +0900
updated : 2021-04-20 14:23:44 +0900
tag     : 
toc     : true
public  : true
parent  : [[/cs-basic/fc-algo/1-data-structure]]
latex   : false
---
* TOC
{:toc}

> 이 글은 패스트 캠퍼스 [기술면접 완전 정복 올인원 패키지 Online](https://fastcampus.co.kr/dev_online_algo) 'Chapter 04. 배열(Array)'의 강의내용을 정리하기 위해 강의 자료를 기반으로 작성한 글입니다.
>
> 강의 노트는 강의 구매자에게만 제공되는 자료이긴 하지만 잔재미 코딩의 [3. 대표적인 자료구조: 배열 (Array)](https://www.fun-coding.org/Chapter04-array-live.html)에서 동일한 자료를 제공하고 있기 때문에 해당 자료를 기반으로 정리한 글을 작성해서 올립니다. 혹시 문제가 되는 경우 바로 내릴 예정이니 알려주시면 감사하겠습니다.
>
> 내용을 이해하기 위한 개인적인 설명이나 해석이 있을 수 있기 때문에 되도록 원문을 참고해주시길 바랍니다.
> 잘못된 부분이 있다면 댓글이나 그 외 편하신 방법으로 알려주시면 감사하겠습니다.

## 꼭 알아둬야 할 자료 구조: 배열 (Array)

* 데이터를 나열하고, 각 데이터를 인덱스에 대응하도록 구성한 데이터 구조
* 파이썬에서는 리스트 타입이 배열 기능을 제공함
    * 파이썬의 리스트가 배열보다 더 편리한 기능을 제공하기 때문에 배열이라는 자료구조 자체를 이해하기에는 조금 어려울 수 있다.

## 1. 배열은 왜 필요할까?

* 같은 종류의 데이터를 차례대로 저장
* 같은 종류의 데이터를 효율적으로 관리하기 위해 사용
    * 한 셀에 한 문자만 넣을 수 있다고 했을 때, 문자열을 나타내기 위해 동떨어져 있는 여러 셀에 중구난방으로 각 문자를 집어넣는 거보다 서로 붙어있는 한 줄의 셀에 차례대로 각 문자를 순서대로 보관하는 것이 더 효율적이다.
    * 붙어있는 각 셀은 자신의 번호(인덱스)를 갖고 있어 각 공간에 접근하는 것이 수월하다.

### 장점

* 빠른 접근 가능
    * 첫 데이터의 위치에서 상대적인 위치로 데이터 접근(인덱스 번호로 접근)

### 단점

* 미리 사용할 양(최대 길이)을 지정해야 함
* 데이터 추가/삭제/수정의 어려움
    * 6칸을 사용할 것이라고 지정하고 STRING을 적어 넣은 후에는 뒤에 추가로 단어를 쓰는 것이 어렵다.
    * STRING을 적어 넣었은 상태에서 중간의 R, I를 제거하면 그 뒤의 N, G를 앞으로 당겨주어야 한다.

## 2. 파이썬과 C언어의 배열 예제

파이썬에서는 배열의 단점을 느끼기 어렵다. C언어와 비교해보면 이를 확인할 수 있다.

### C 언어 예: 영어 단어 저장

```c
# include <stdio.h>

int main(int argc, char * argv[])
{
    // 미리 사용할 공간을 지정: '3', 세 칸 사용할 것이다.
    char country[3] = "US";
    printf ("%c%c\n", country[0], country[1]);
    printf ("%s\n", country);
    return 0;
}
```

### 파이썬 언어 예: 영어 단어 저장

```python
country = 'US'
print (country) # US
```

## 3. 파이썬과 배열

파이썬에서는 리스트로 배열 구현 가능

```python
# 1차원 배열: 리스트로 구현 시
data_list = [1, 2, 3, 4, 5]
print(data_list) # [1, 2, 3, 4, 5]

# 2차원 배열: 리스트로 구현 시

# 대괄호가 이중으로 존재하는 것을 유념하자.
data_list = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
print(data_list) # [[1, 2, 3], [4, 5, 6], [7, 8, 9]]

# 2차원 배열 출력 예시
print (data_list[0]) # [1, 2, 3]
print (data_list[0][0]) # 1
print (data_list[0][1]) # 2
print (data_list[0][2]) # 3
print (data_list[1][0]) # 4
print (data_list[1][1]) # 5
```

## 4. 프로그래밍 연습

연습 1: 위의 2차원 배열에서 9, 8, 7을 순서대로 출력해보기

```python
print (data_list[2][2]) # 9
print (data_list[2][1]) # 8
print (data_list[2][0]) # 7
```

연습 2: 아래의 dataset 리스트에서 전체 이름 안에 M은 몇 번 나왔는지 빈도수 출력하기

```python
dataset = ['Braund, Mr. Owen Harris',
    'Cumings, Mrs. John Bradley (Florence Briggs Thayer)',
    'Heikkinen, Miss. Laina',
    'Futrelle, Mrs. Jacques Heath (Lily May Peel)',
    'Allen, Mr. William Henry',
    'Moran, Mr. James',
    'McCarthy, Mr. Timothy J',
    'Palsson, Master. Gosta Leonard',
    'Johnson, Mrs. Oscar W (Elisabeth Vilhelmina Berg)',
    'Nasser, Mrs. Nicholas (Adele Achem)',
    'Sandstrom, Miss. Marguerite Rut',
    'Bonnell, Miss. Elizabeth',
    'Saundercock, Mr. William Henry',
    'Andersson, Mr. Anders Johan',
    'Vestrom, Miss. Hulda Amanda Adolfina',
    'Hewlett, Mrs. (Mary D Kingcome) ',
    'Rice, Master. Eugene',
    'Williams, Mr. Charles Eugene',
    'Vander Planke, Mrs. Julius (Emelia Maria Vandemoortele)',
    'Masselmani, Mrs. Fatima',
    'Fynney, Mr. Joseph J',
    'Beesley, Mr. Lawrence',
    'McGowan, Miss. Anna "Annie"',
    'Sloper, Mr. William Thompson',
    'Palsson, Miss. Torborg Danira',
    'Asplund, Mrs. Carl Oscar (Selma Augusta Emilia Johansson)',
    'Emir, Mr. Farred Chehab',
    'Fortune, Mr. Charles Alexander',
    'Dwyer, Miss. Ellen "Nellie"',
    'Todoroff, Mr. Lalio']
```

```python
m_count = 0
for data in dataset:
    for index in range(len(data)):
        if data[index] == 'M':
            m_count += 1
print (m_count) # 38
```

## 참고: range 함수

* `range(stop)`: `range(10)`은 0, 1, 2, 3, 4, 5, 6, 7, 8, 9
* `range(start, stop)`: `range(1, 11)`은 1, 2, 3, 4, 5, 6, 7, 8, 9, 10
* `range(start, stop, step)`: `range(0, 20, 2)`은 0, 2, 4, 6, 8, 10, 12, 14, 16, 18
* start, stop, step은 음수로 지정 가능
