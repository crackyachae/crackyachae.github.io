---
layout  : article
title   : "프로그래머스 SQL 고득점 Kit: GROUP BY"
summary : 
date    : 2023-11-04 21:39:42 +0900
updated : 2023-11-05 17:47:20 +0900
tag     : draft
toc     : true
public  : true
parent  : [[/ps-set/sql]]
latex   : false
---
* TOC
{:toc}

> 이 글은 프로그래머스 SQL 고득점 Kit의 [GROUP BY](https://school.programmers.co.kr/learn/courses/30/parts/17044) 문제를 MySQL로 풀이한 것을 모아놓은 글입니다.
>
> 일종의 연습 기록이며 제가 정답을 받은 코드와 참고할만한 다른 코드를 같이 기록합니다. 필요한 경우 코드에 대한 해설을 기록합니다만 코드는 통과했어도 해설은 틀릴 수 있기 때문에 가볍게 참고해주시길 부탁드립니다. 피드백은 편하신 방법으로 자유롭게 주시면 감사하겠습니다.
>
> 순서는 처음 공부하는 입장에서 풀기 쉬웠던 순서로 정리했습니다.

## 59040 - 고양이와 개는 몇 마리 있을까 [Level 2]

```sql
SELECT ANIMAL_TYPE, COUNT(*) AS COUNT
FROM ANIMAL_INS
GROUP BY ANIMAL_TYPE
ORDER BY ANIMAL_TYPE
```

## 59041 - 동명 동물 수 찾기 [Level 2]

```sql
SELECT NAME, COUNT(NAME) AS COUNT
FROM ANIMAL_INS
GROUP BY NAME
HAVING COUNT(NAME) >= 2
ORDER BY NAME
```

* `COUNT(*)`은 값이 `NULL`인 행도 포함하므로 `COUNT(COLUMN_NAME)`의 형태로 작성해야 한다.

## 132202 - 진료과별 총 예약 횟수 출력하기 [Level 2]

```sql
SELECT
    MCDP_CD AS 진료과코드,
    COUNT(*) AS 5 월예약건수
FROM
    APPOINTMENT
WHERE
    MONTH(APNT_YMD) = 5
GROUP BY
    MCDP_CD
ORDER BY
    5 월예약건수,
    MCDP_CD
```

## 59412 - 입양 시각 구하기(1) [Level 2]

```sql
SELECT
    HOUR(DATETIME) AS HOUR,
    COUNT(*) AS COUNT
FROM
    ANIMAL_OUTS
GROUP BY
    HOUR
HAVING
    9 <= HOUR
    AND HOUR < 20
ORDER BY
    HOUR
```

## 151137 - 자동차 종류 별 특정 옵션이 포함된 자동차 수 구하기 [Level 2]

```sql
SELECT
    CAR_TYPE,
    COUNT(*) AS CARS
FROM
    CAR_RENTAL_COMPANY_CAR
WHERE
    OPTIONS REGEXP '통풍시트|열선시트|가죽시트'
GROUP BY
    CAR_TYPE
ORDER BY
    CAR_TYPE
```

* 정규 표현식을 이용해 통풍시트, 열선시트, 가죽시트의 값을 옵션에 포함한 값을 필터링 한다.

## 133026 - 성분으로 구분한 아이스크림 총 주문량 [Level 2]

```sql
SELECT
    INGREDIENT_TYPE,
    SUM(TOTAL_ORDER) AS TOTAL_ORDER
FROM
    FIRST_HALF
    JOIN ICECREAM_INFO AS INFO ON FIRST_HALF.FLAVOR = INFO.FLAVOR
GROUP BY
    INGREDIENT_TYPE
ORDER BY
    TOTAL_ORDER
```

* `SUM`을 이용해 GROUP한 행들의 특정 값의 합을 구할 수 있다.

## 131530 - 가격대 별 상품 개수 구하기 [Level 2]

```sql
SELECT
    FLOOR(PRICE / 10000) * 10000 AS PRICE_GROUP,
    COUNT(*) AS PRODUCTS
FROM
    PRODUCT
GROUP BY
    PRICE_GROUP
ORDER BY
    PRICE_GROUP
```

* 범위 안의 값을 하나로 묶기 위해 각 값을 10000으로 나눈 몪에 10000을 곱한 값을 `SELECT` 했다.

## 144855 - 카테고리 별 도서 판매량 집계하기 [Level 3]

```sql
SELECT
    CATEGORY,
    SUM(SALES) AS TOTAL_SALES
FROM
    BOOK
    JOIN BOOK_SALES AS SALES ON BOOK.BOOK_ID = SALES.BOOK_ID
WHERE
    SALES_DATE LIKE '2022-01%'
GROUP BY
    CATEGORY
ORDER BY
    CATEGORY
```

## 164668 - 조건에 맞는 사용자와 총 거래금액 조회하기 [Level 3]

```sql
SELECT
    USER_ID,
    NICKNAME,
    SUM(PRICE) AS TOTAL_SALES
FROM
    USED_GOODS_BOARD AS BOARD
    JOIN USED_GOODS_USER AS USER ON BOARD.WRITER_ID = USER.USER_ID
WHERE
    STATUS = 'DONE'
GROUP BY
    USER_ID
HAVING
    TOTAL_SALES >= 700000
ORDER BY
    TOTAL_SALES
```

## 131123 - 즐겨찾기가 가장 많은 식당 정보 출력하기 [Level 3]

```sql
SELECT
    FOOD_TYPE,
    REST_ID,
    REST_NAME,
    FAVORITES
FROM
    REST_INFO
WHERE
    (FOOD_TYPE, FAVORITES) IN (
        SELECT
            FOOD_TYPE,
            MAX(FAVORITES)
        FROM
            REST_INFO
        GROUP BY
            FOOD_TYPE
    )
ORDER BY
    FOOD_TYPE DESC
```

* `WHERE ... IN ...` 구문 없이 `GROUP BY`와 `MAX(FAVORITES)`로만 쿼리를 짜면 `GROUP BY` 과정에서 최대 즐겨찾기 값을 갖는 가게 정보가 아니라 첫 번째 행의 가게 정보와 최대 즐겨찾기 값을 각각 가져오므로 조건을 만족하지 않는다.
* `WHERE (COLUMN) IN ...` 구문은 지정한 column의 값이 `IN` 뒤의 값과 일치하는 값만 남긴다.
    * 위의 답변에서 `IN` 뒤의 쿼리는 `FOOD_TYPE`별 최대 즐겨찾기 값을 나타내는 table을 생성한다.

## 151139 - 대여 횟수가 많은 자동차들의 월별 대여 횟수 구하기 [Level 3]

```sql
SELECT
    MONTH(START_DATE) AS MONTH,
    CAR_ID,
    COUNT(*) AS RECORDS
FROM
    CAR_RENTAL_COMPANY_RENTAL_HISTORY
WHERE
    8 <= MONTH(START_DATE) AND MONTH(START_DATE) <= 10
    AND CAR_ID IN (
        SELECT CAR_ID
        FROM CAR_RENTAL_COMPANY_RENTAL_HISTORY
        WHERE 8 <= MONTH(START_DATE) AND MONTH(START_DATE) <= 10
        GROUP BY CAR_ID
        HAVING COUNT(*) >= 5
    )
GROUP BY
    MONTH, CAR_ID
ORDER BY
    MONTH, CAR_ID DESC
```

* `WHERE ... IN`을 사용해서 8 ~ 10월 사이에 총 대여건이 5건 이상인 `CAR_ID`에 헤당하는 값만 필터링 한다.
    * 8 ~ 10월 사이에 총 대여건이 5건 이상인 `CAR_ID`는 서브쿼리를 이용해 구현한다.
* 서브쿼리와 메인쿼리 모두에서 월 필터링을 해줘야 한다.

## 157340 - 자동차 대여 기록에서 대여중 / 대여 가능 여부 구분하기 [Level 3]

```sql
SELECT
    CAR_ID,
    MAX(
        IF(
            START_DATE <= '2022-10-16'
            AND '2022-10-16' <= END_DATE,
            "대여중",
            "대여 가능"
        )
    ) AS AVAILABILITY
FROM
    CAR_RENTAL_COMPANY_RENTAL_HISTORY
GROUP BY
    CAR_ID
ORDER BY
    CAR_ID DESC
```

* `IF`문을 이용해 모든 행의 대여중, 대여 가능 여부를 표시한 뒤 `CAR_ID`로 `GROUP BY` 하면서 그중 `MAX`를 표시한다. 대여중과 대여가능중 대여중이 순서상 더 나중으로 큰 값이므로 해당 동일한 `CAR_ID`를 갖는 행중 대여중이 있으면 대여중이 아니면 대여가능이 남게된다.

### 참고 답안

```sql
SELECT CAR_ID, 
    CASE
        WHEN CAR_ID IN (SELECT CAR_ID
                        FROM CAR_RENTAL_COMPANY_RENTAL_HISTORY
                        WHERE '2022-10-16' BETWEEN START_DATE AND END_DATE) THEN '대여중'
        ELSE '대여 가능'
    END "AVAILABILITY"
FROM CAR_RENTAL_COMPANY_RENTAL_HISTORY
GROUP BY CAR_ID
ORDER BY CAR_ID DESC
```

* `CAR_ID` 값으로 `GROUP BY` 할 때 `CASE`를 이용해 대여중과 대여가능 값을 분기한다.
    * `BETWEEN`을 이용해 `2022-10-16`이 `START_DATE`와 `END_DATE` 사이에 있는 `CAR_ID`만 필터링 하고
    * `WHEN ... IN`을 이용해 `CAR_ID`가 그 안에 있는 경우를 판단해 `CASE`의 기준으로 삼는다.
