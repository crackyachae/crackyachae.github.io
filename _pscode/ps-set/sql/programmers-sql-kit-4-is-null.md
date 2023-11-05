---
layout  : article
title   : "프로그래머스 SQL 고득점 Kit: IS NULL"
summary : 
date    : 2023-11-06 01:35:32 +0900
updated : 2023-11-06 01:47:29 +0900
tag     : 
toc     : true
public  : true
parent  : [[/ps-set/sql]]
latex   : false
---
* TOC
{:toc}

> 이 글은 프로그래머스 SQL 고득점 Kit의 [IS NULL](https://school.programmers.co.kr/learn/courses/30/parts/17045) 문제를 MySQL로 풀이한 것을 모아놓은 글입니다.
>
> 일종의 연습 기록이며 제가 정답을 받은 코드와 참고할만한 다른 코드를 같이 기록합니다. 필요한 경우 코드에 대한 해설을 기록합니다만 코드는 통과했어도 해설은 틀릴 수 있기 때문에 가볍게 참고해주시길 부탁드립니다. 피드백은 편하신 방법으로 자유롭게 주시면 감사하겠습니다.
>
> 순서는 처음 공부하는 입장에서 풀기 쉬웠던 순서로 정리했습니다.

## 59039 - 이름이 없는 동물의 아이디 [Level 1]

```sql
SELECT ANIMAL_ID
FROM ANIMAL_INS
WHERE NAME IS NULL
ORDER BY ANIMAL_ID
```

## 59407 - 이름이 있는 동물의 아이디 [Level 1]

```sql
SELECT ANIMAL_ID
FROM ANIMAL_INS
WHERE NAME IS NOT NULL
ORDER BY ANIMAL_ID
```

## 131528 - 나이 정보가 없는 회원 수 구하기 [Level 1]

```sql
SELECT COUNT(*) AS USERS
FROM USER_INFO
WHERE AGE IS NULL
```

* `NULL`을 포함해서 행의 수를 세려면 전체(`*`)를 조회해야 한다.

## 131114 - 경기도에 위치한 식품창고 목록 출력하기 [Level 1]

```sql
SELECT
    WAREHOUSE_ID,
    WAREHOUSE_NAME,
    ADDRESS,
    IFNULL(FREEZER_YN, "N")
FROM FOOD_WAREHOUSE
WHERE ADDRESS LIKE '경기도%'
ORDER BY WAREHOUSE_ID
```

* `IFNULL`을 사용하면 특정 항목의 값이 `NULL` 일 때 대신 출력할 값을 정할 수 있다.

## 59410 - NULL 처리하기 [Level 2]

```sql
SELECT
    ANIMAL_TYPE,
    IFNULL(NAME, "No name") AS NAME,
    SEX_UPON_INTAKE
FROM ANIMAL_INS
ORDER BY ANIMAL_ID
```
