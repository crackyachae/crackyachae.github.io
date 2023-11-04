---
layout  : article
title   : "프로그래머스 SQL 고득점 Kit: SUM, MAX, MIN"
summary : 
date    : 2023-11-04 21:21:49 +0900
updated : 2023-11-04 21:37:50 +0900
tag     : 
toc     : true
public  : true
parent  : [[/ps-set/sql]]
latex   : false
---
* TOC
{:toc}

> 이 글은 프로그래머스 SQL 고득점 Kit의 [SUM, MAX, MIN](https://school.programmers.co.kr/learn/courses/30/parts/17043) 문제를 MySQL로 풀이한 것을 모아놓은 글입니다.
>
> 일종의 연습 기록이며 제가 정답을 받은 코드와 참고할만한 다른 코드를 같이 기록합니다. 필요한 경우 코드에 대한 해설을 기록합니다만 코드는 통과했어도 해설은 틀릴 수 있기 때문에 가볍게 참고해주시길 부탁드립니다. 피드백은 편하신 방법으로 자유롭게 주시면 감사하겠습니다.
>
> 순서는 처음 공부하는 입장에서 풀기 쉬웠던 순서로 정리했습니다.

## 59415 - 최댓값 구하기 [Level 1]

```sql
SELECT MAX(DATETIME) AS 시간
FROM ANIMAL_INS
```

## 59038 - 최솟값 구하기 [Level 1]

```sql
SELECT MIN(DATETIME) AS 시간
FROM ANIMAL_INS
```

## 131697 - 가장 비싼 상품 구하기 [Level 1]

```sql
SELECT MAX(PRICE) AS MAX_PRICE
FROM PRODUCT
```

## 59406 - 동물 수 구하기 [Level 2]

```sql
SELECT COUNT(*) AS COUNT
FROM ANIMAL_INS
```

## 59408 - 중복 제거하기 [Level 2]

```sql
SELECT COUNT(DISTINCT NAME) AS COUNT
FROM ANIMAL_INS
```

* `DISTINCT`를 사용하면 중복되는 값은 하나만 남긴다.

## 131115 - 가격이 제일 비싼 식품의 정보 출력하기 [Level 2]

```sql
SELECT
    PRODUCT_ID,
    PRODUCT_NAME,
    PRODUCT_CD,
    CATEGORY,
    PRICE
FROM
    FOOD_PRODUCT
ORDER BY
    PRICE DESC
LIMIT
    1
```

* 가격 내림차순으로 정렬한 뒤 한 개만 출력한다.

### 참고 답안

```sql
SELECT
    *
FROM
    FOOD_PRODUCT
WHERE
    PRICE = SELECT MAX(PRICE) FROM FOOD_PRODUCT
```

* 서브쿼리를 이용해서 `PRICE`가 최댓값과 같은 항목만 필터링 한다.
