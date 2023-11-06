---
layout  : article
title   : "프로그래머스 SQL 고득점 Kit: JOIN"
summary : 
date    : 2023-11-06 01:51:23 +0900
updated : 2023-11-07 00:36:03 +0900
tag     : draft
toc     : true
public  : true
parent  : [[/ps-set/sql]]
latex   : false
---
* TOC
{:toc}

> 이 글은 프로그래머스 SQL 고득점 Kit의 [JOIN](https://school.programmers.co.kr/learn/courses/30/parts/17046) 문제를 MySQL로 풀이한 것을 모아놓은 글입니다.
>
> 일종의 연습 기록이며 제가 정답을 받은 코드와 참고할만한 다른 코드를 같이 기록합니다. 필요한 경우 코드에 대한 해설을 기록합니다만 코드는 통과했어도 해설은 틀릴 수 있기 때문에 가볍게 참고해주시길 부탁드립니다. 피드백은 편하신 방법으로 자유롭게 주시면 감사하겠습니다.
>
> 순서는 처음 공부하는 입장에서 풀기 쉬웠던 순서로 정리했습니다.

## 144854 - 조건에 맞는 도서와 저자 리스트 출력하기 [Level 2]

```sql
SELECT
    BOOK_ID,
    AUTHOR_NAME,
    DATE_FORMAT(PUBLISHED_DATE, "%Y-%m-%d") AS PUBLISHED_DATE
FROM
    BOOK
    JOIN AUTHOR ON BOOK.AUTHOR_ID = AUTHOR.AUTHOR_ID
WHERE
    CATEGORY = "경제"
ORDER BY
    PUBLISHED_DATE
```

## 131533 - 상품 별 오프라인 매출 구하기 [Level 2]

```sql
SELECT
    PRODUCT_CODE,
    SALES_AMOUNT * PRICE AS SALES
FROM
    PRODUCT
    JOIN (
        SELECT
            PRODUCT_ID,
            SUM(SALES_AMOUNT) AS SALES_AMOUNT
        FROM
            OFFLINE_SALE
        GROUP BY
            PRODUCT_ID
    ) AS SALE ON PRODUCT.PRODUCT_ID = SALE.PRODUCT_ID
ORDER BY
    SALES DESC,
    PRODUCT_CODE
```

## 59043 - 있었는데요 없었습니다 [Level 3]

```sql
SELECT
    INS.ANIMAL_ID,
    INS.NAME
FROM
    ANIMAL_INS AS INS
    JOIN ANIMAL_OUTS AS OUTS ON INS.ANIMAL_ID = OUTS.ANIMAL_ID
WHERE
    INS.DATETIME > OUTS.DATETIME
ORDER BY
    INS.DATETIME
```

## 59044 - 오랜 기간 보호한 동물(1) [Level 3]

```sql
SELECT
    INS.NAME,
    INS.DATETIME
FROM
    ANIMAL_INS AS INS
    LEFT OUTER JOIN ANIMAL_OUTS AS OUTS ON INS.ANIMAL_ID = OUTS.ANIMAL_ID
WHERE
    OUTS.DATETIME IS NULL
ORDER BY
    INS.DATETIME
LIMIT
    3
```

* `LEFT OUTER JOIN`을 사용하면 기존의 테이블에서 join 시키는 테이블에 일치하는 값이 없는 행까지 모두 포함하는 테이블을 반환한다.
    * [[MYSQL] 📚 테이블 조인(JOIN) - 그림으로 알기 쉽게 정리](https://inpa.tistory.com/entry/MYSQL-📚-JOIN-조인-그림으로-알기쉽게-정리) by Inpa Dev
* 그러므로 `LEFT OUTER JOIN`을 사용해 `ANIMAL_INS`를 기준으로 `ANIMAL_OUTS`를 join 시킨 테이블을 생성한 뒤 `ANIMAL_OUTS`의 `DATETIME`이 없는 값만 필터링 하면 아직 입양가지 못한 레코드를 구할 수 있다.

## 59042 - 없어진 기록 찾기 [Level 3]

```sql
SELECT
    OUTS.ANIMAL_ID,
    OUTS.NAME
FROM
    ANIMAL_INS AS INS
    RIGHT OUTER JOIN ANIMAL_OUTS AS OUTS ON INS.ANIMAL_ID = OUTS.ANIMAL_ID
WHERE
    INS.DATETIME IS NULL
ORDER BY
    OUTS.ANIMAL_ID
```

* 이번에는 값이 없는 테이블이 `ANIMAL_INS` 이므로 반대로 `ANIMAL_INS`를 기준으로 `RIGHT OUTER JOIN`을 사용해서 `ANIMAL_OUTS`를 join 시킨다.
    * `ANIMAL_OUTS`를 기준으로 `LEFT OUTER JOIN`을 하는 것도 가능하다.
* `ANIMAL_INS` 레코드의 일부가 유실되었으므로 `ANIMAL_OUTS`에서 값을 조회해 오는 것에 주의해야 한다.

## 59045 - 보호소에서 중성화한 동물 [Level 4]

```sql
SELECT
    INS.ANIMAL_ID,
    INS.ANIMAL_TYPE,
    INS.NAME
FROM
    ANIMAL_INS AS INS
    JOIN ANIMAL_OUTS AS OUTS ON INS.ANIMAL_ID = OUTS.ANIMAL_ID
WHERE
    SEX_UPON_INTAKE LIKE 'INTACT%'
    AND SEX_UPON_OUTCOME NOT LIKE 'INTACT%'
ORDER BY
    INS.ANIMAL_ID
```

## 133027 - 주문량이 많은 아이스크림들 조회하기 [Level 4]

```sql
SELECT
    FLAVOR
FROM
    (
        SELECT FLAVOR, TOTAL_ORDER
        FROM FIRST_HALF
        UNION ALL
        SELECT FLAVOR, TOTAL_ORDER
        FROM JULY
    ) AS JAN_TO_JUL
GROUP BY
    FLAVOR
ORDER BY
    SUM(TOTAL_ORDER) DESC
LIMIT
    3
```

### 참고 풀이

```sql
SELECT
    FIRST_HALF.FLAVOR
FROM
    FIRST_HALF
    JOIN JULY ON FIRST_HALF.FLAVOR = JULY.FLAVOR
GROUP BY
    FLAVOR
ORDER BY
    SUM(FIRST_HALF.TOTAL_ORDER) + SUM(JULY.TOTAL_ORDER) DESC
LIMIT
    3
```

* 굳이 `UNION`을 사용하지 않아도 `JOIN`으로 제한해도 누락되는 값이 없는 것 같다.
* 각 테이블에 중복된 `FLAVOR`가 존재하므로 `GROUP BY` 하면서 누락되는 `TOTAL_ORDER`가 없도록 `SUM` 처리를 해주어야 한다.

## 131117 - 5월 식품들의 총매출 조회하기 [Level 4]

```sql
SELECT
    PRODUCT.PRODUCT_ID,
    PRODUCT_NAME,
    PRICE * AMOUNT AS TOTAL_SALES
FROM
    FOOD_PRODUCT AS PRODUCT
    JOIN (
        SELECT
            PRODUCT_ID,
            SUM(AMOUNT) AS AMOUNT
        FROM
            FOOD_ORDER
        WHERE
            PRODUCE_DATE LIKE '2022-05%'
        GROUP BY
            PRODUCT_ID
    ) AS ALL_ORDER ON PRODUCT.PRODUCT_ID = ALL_ORDER.PRODUCT_ID
GROUP BY
    PRODUCT_ID
ORDER BY
    TOTAL_SALES DESC,
    PRODUCT.PRODUCT_ID
```

## 131124 - 그룹별 조건에 맞는 식당 목록 출력하기 [Level 4]

```sql
SELECT
    PROFILE.MEMBER_NAME,
    REVIEW.REVIEW_TEXT,
    DATE_FORMAT(REVIEW.REVIEW_DATE, "%Y-%m-%d") AS REVIEW_DATE
FROM
    MEMBER_PROFILE PROFILE
    JOIN REST_REVIEW B ON PROFILE.MEMBER_ID = REVIEW.MEMBER_ID
WHERE
    PROFILE.MEMBER_ID = (
        SELECT
            MEMBER_ID
        FROM
            REST_REVIEW
        GROUP BY
            MEMBER_ID
        ORDER BY
            COUNT(*) DESC
        LIMIT
            1
    )
ORDER BY
    REVIEW_DATE,
    REVIEW_TEXT
```

### 피드백

* 서브쿼리로 리뷰를 가장 많이 작성한 사람을 조회했을 때 가장 많이 작성한 사람이 여러명이어서 해당되는 인원만 남기는 쿼리를 작성하기가 어려웠는데 그냥 `LIMIT 1`로 한 사람만 남겨도 되는 것 같다.
* `WHERE ... IN` 구문을 사용하면 `LIMIT`과 `IN` 서브쿼리를 함께 사용할 수 없다면서 오류가 발생한다. 등호를 사용해야 한다.

## 157339 - 특정 기간동안 대여 가능한 자동차들의 대여비용 구하기 [Level 4]

```sql
SELECT
    CAR_ID,
    CAR.CAR_TYPE,
    ROUND(DAILY_FEE * 30 * (100 - DISCOUNT_RATE) / 100) AS FEE
FROM
    CAR_RENTAL_COMPANY_CAR AS CAR
    JOIN (
        SELECT CAR_TYPE, DISCOUNT_RATE
        FROM CAR_RENTAL_COMPANY_DISCOUNT_PLAN
        WHERE DURATION_TYPE = '30일 이상'
    ) AS DIS ON CAR.CAR_TYPE = DIS.CAR_TYPE
WHERE
    CAR_ID NOT IN (
        SELECT CAR_ID
        FROM CAR_RENTAL_COMPANY_RENTAL_HISTORY
        WHERE START_DATE <= '2022-11-30' AND '2022-11-01' <= END_DATE
        ORDER BY CAR_ID
    )
    AND CAR.CAR_TYPE IN ('세단', 'SUV')
GROUP BY
    CAR_ID
HAVING
    500000 <= FEE AND FEE < 2000000
ORDER BY
    FEE DESC,
    CAR_TYPE,
    CAR_ID DESC
```

### 아이디어 & 풀이

각 조건을 잘 구분하여 적용하는 것이 중요하다.

* `자동차 종류가 '세단' 또는 'SUV' 인 자동차`
    * `WHERE ... IN` 구문을 이용해서 `CAR_TYPE` 중 세단과 SUV만 필터링 한다.
* `2022년 11월 1일부터 2022년 11월 30일까지 대여 가능`
    * `CAR_RENTAL_COMPANY_RENTAL_HISTORY` 테이블에서 대여, 반납 시점이 `2022-11-01`과 `2022-11-30` 사이에 걸쳐있으면 대여중이다.
        * `END_DATE`가 `2022-11-01` 이전이면 이미 반납된 차량이고 `START_DATE`가 `2022-11-31` 이후면 아직 대여하지 않은 차량이므로 이 구간과 반대의 구간을 조건으로 잡으면 된다.
    * 현재 대여중인 자동차는 대여할 수 없으므로 `WHERE ... NOT IN` 구문을 사용해 대여중 테이블에 포함되지 않는 `CAR_ID`만 필터링 한다.
* `30일간의 대여 금액이`
    * 할인율이 30일이어야 하므로 `CAR_RENTAL_COMPANY_DISCOUNT_PLAN`을 join 할 때 `DURATION_TYPE`이 `30일 이상`인 값만 필터링 한다.
* `50만원 이상 200만원 미만`
    * 비용 계산 결과인 `FEE`의 값을 필터링 한다.
    * SELECT 이후에 조건을 적용해야 하므로 `GROUP BY`의 `HAVING`을 이용해서 조건을 적용해준다.

### 디버그

* 할인율이 예시의 값으로 고정된 줄 알고 `IF`를 사용해서 고정값으로 계산했는데 케이스마다 별도의 테이블이 주어지는 것이었다.
