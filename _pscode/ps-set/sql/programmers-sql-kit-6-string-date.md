---
layout  : article
title   : "프로그래머스 SQL 고득점 Kit: String, Date"
summary : 
date    : 2023-11-07 00:36:57 +0900
updated : 2023-11-07 03:01:45 +0900
tag     : draft
toc     : true
public  : true
parent  : [[/ps-set/sql]]
latex   : false
---
* TOC
{:toc}

> 이 글은 프로그래머스 SQL 고득점 Kit의 [String, Date](https://school.programmers.co.kr/learn/courses/30/parts/17047) 문제를 MySQL로 풀이한 것을 모아놓은 글입니다.
>
> 일종의 연습 기록이며 제가 정답을 받은 코드와 참고할만한 다른 코드를 같이 기록합니다. 필요한 경우 코드에 대한 해설을 기록합니다만 코드는 통과했어도 해설은 틀릴 수 있기 때문에 가볍게 참고해주시길 부탁드립니다. 피드백은 편하신 방법으로 자유롭게 주시면 감사하겠습니다.
>
> 순서는 처음 공부하는 입장에서 풀기 쉬웠던 순서로 정리했습니다.

## 157343 - 특정 옵션이 포함된 자동차 리스트 구하기 [Level 1]

```sql
SELECT CAR_ID, CAR_TYPE, DAILY_FEE, OPTIONS
FROM CAR_RENTAL_COMPANY_CAR
WHERE OPTIONS LIKE '%네비게이션%'
ORDER BY CAR_ID DESC
```

## 151138 - 자동차 대여 기록에서 장기/단기 대여 구분하기 [Level 1]

```sql
SELECT
    HISTORY_ID,
    CAR_ID,
    DATE_FORMAT(START_DATE, '%Y-%m-%d') AS START_DATE,
    DATE_FORMAT(END_DATE, '%Y-%m-%d') AS END_DATE,
    IF(
        DATEDIFF(END_DATE, START_DATE) + 1 >= 30,
        '장기 대여',
        '단기 대여'
    ) AS RENT_TYPE
FROM
    CAR_RENTAL_COMPANY_RENTAL_HISTORY
WHERE
    START_DATE LIKE '2022-09%'
ORDER BY
    HISTORY_ID DESC
```

* `DATEDIFF`를 이용하면 첫 날짜에서 두 번째 날짜를 뺀 일수를 알 수 있다.

### 디버그

* 당일 대여해서 당일 반납하는 경우도 대여일은 하루이므로 `DATEDIFF` 값에 1을 더해주어야 한다.

## 59414 - DATETIME에서 DATE로 형 변환 [Level 2]

```sql
SELECT ANIMAL_ID, NAME, DATE_FORMAT(DATETIME, "%Y-%m-%d")
FROM ANIMAL_INS
ORDER BY ANIMAL_ID
```

## 59047 - 이름에 el이 들어가는 동물 찾기 [Level 2]

```sql
SELECT ANIMAL_ID, NAME
FROM ANIMAL_INS
WHERE NAME LIKE '%el%' AND ANIMAL_TYPE = "Dog"
ORDER BY NAME
```

## 59046 - 루시와 엘라 찾기 [Level 2]

```sql
SELECT ANIMAL_ID, NAME, SEX_UPON_INTAKE
FROM ANIMAL_INS
WHERE NAME IN ('Lucy', 'Ella', 'Pickle', 'Rogan', 'Sabrina', 'Mitty')
ORDER BY ANIMAL_ID
```

## 59409 - 중성화 여부 파악하기 [Level 2]

```sql
SELECT
    ANIMAL_ID,
    NAME,
    IF(SEX_UPON_INTAKE LIKE 'intact%', 'X', 'O') AS 중성화
FROM
    ANIMAL_INS
```

## 131529 - 카테고리 별 상품 개수 구하기 [Level 2]

```sql
SELECT LEFT(PRODUCT_CODE, 2) AS CATEGORY, COUNT(*) AS PRODUCTS
FROM PRODUCT
GROUP BY CATEGORY
ORDER BY CATEGORY
```

* `LEFT`를 이용하면 문자열 중 앞의 일부를 가져올 수 있다.

## 157342 - 자동차 평균 대여 기간 구하기 [Level 2]

```sql
SELECT
    CAR_ID,
    ROUND(AVG(DATEDIFF(END_DATE, START_DATE) + 1), 1) AS AVERAGE_DURATION
FROM
    CAR_RENTAL_COMPANY_RENTAL_HISTORY
GROUP BY
    CAR_ID
HAVING
    AVERAGE_DURATION >= 7
ORDER BY
    AVERAGE_DURATION DESC,
    CAR_ID DESC
```

## 164672 - 조건에 부합하는 중고거래 상태 조회하기 [Level 2]

```sql
SELECT
    BOARD_ID,
    WRITER_ID,
    TITLE,
    PRICE,
    CASE
        WHEN STATUS = 'SALE' THEN '판매중'
        WHEN STATUS = 'RESERVED' THEN '예약중'
        WHEN STATUS = 'DONE' THEN '거래완료'
    END STATUS
FROM
    USED_GOODS_BOARD
WHERE
    CREATED_DATE LIKE '2022-10-05'
ORDER BY
    BOARD_ID DESC
```

* `CASE`를 이용해서 특정 열의 항목들을 각 케이스마다 다른 값으로 치환해줄 수 있다.

## 59411 - 오랜 기간 보호한 동물(2) [Level 3]

```sql
SELECT
    INS.ANIMAL_ID,
    INS.NAME
FROM
    ANIMAL_INS AS INS
    JOIN ANIMAL_OUTS AS OUTS ON INS.ANIMAL_ID = OUTS.ANIMAL_ID
ORDER BY
    DATEDIFF(OUTS.DATETIME, INS.DATETIME) DESC
LIMIT
    2
```

## 131113 - 조건별로 분류하여 주문상태 출력하기 [Level 3]

```sql
SELECT ORDER_ID, PRODUCT_ID, DATE_FORMAT(OUT_DATE, "%Y-%m-%d") AS OUT_DATE,
CASE
    WHEN OUT_DATE <= "2022-05-01" THEN "출고완료"
    WHEN OUT_DATE > "2022-05-01" THEN "출고대기"
    ELSE "출고미정"
    END "출고여부"
FROM FOOD_ORDER
ORDER BY ORDER_ID
```

### 디버그

* `OUT_DATE`를 `DATE_FORMAT`이 아닌 `IFNULL`을 이용해서 처리하면 답이 맞지 않는다.

## 157341 - 대여 기록이 존재하는 자동차 리스트 구하기 [Level 3]

```sql
SELECT
    DISTINCT CAR.CAR_ID
FROM
    CAR_RENTAL_COMPANY_CAR AS CAR
    JOIN CAR_RENTAL_COMPANY_RENTAL_HISTORY AS HISTORY ON CAR.CAR_ID = HISTORY.CAR_ID
WHERE
    CAR_TYPE = '세단'
    AND MONTH(START_DATE) = 10
ORDER BY
    CAR_ID DESC
```

## 164671 - 조회수가 가장 많은 중고거래 게시판의 첨부파일 조회하기 [Level 3]

```sql
SELECT CONCAT('/home/grep/src/', BOARD_ID, '/', FILE_ID, FILE_NAME, FILE_EXT) AS FILE_PATH
FROM USED_GOODS_FILE
WHERE BOARD_ID = (
    SELECT BOARD_ID
    FROM USED_GOODS_BOARD
    ORDER BY VIEWS DESC
    LIMIT 1
)
ORDER BY FILE_ID DESC
```

* `CONCAT`을 이용해서 문자열을 합칠 수 있다.

## 164670 - 조건에 맞는 사용자 정보 조회하기 [Level 3]

```sql
SELECT
    USER_ID,
    NICKNAME,
    CONCAT(CITY, " ", STREET_ADDRESS1, " ", STREET_ADDRESS2) AS '전체주소',
    CONCAT(LEFT(TLNO, 3), '-', MID(TLNO, 4, 4), "-", RIGHT(TLNO, 4)) AS '전화번호'
FROM
    USED_GOODS_USER
WHERE
    USER_ID IN (
        SELECT WRITER_ID
        FROM USED_GOODS_BOARD
        GROUP BY WRITER_ID
        HAVING COUNT(*) >= 3
    )
ORDER BY
    USER_ID DESC
```
