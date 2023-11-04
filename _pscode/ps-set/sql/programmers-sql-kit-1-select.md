---
layout  : article
title   : "프로그래머스 SQL 고득점 Kit: SELECT"
summary : 
date    : 2023-11-03 23:29:16 +0900
updated : 2023-11-04 13:45:40 +0900
tag     : 
toc     : true
public  : true
parent  : [[/ps-set/sql]]
latex   : false
---
* TOC
{:toc}

> 이 글은 프로그래머스 SQL 고득점 Kit의 [SELECT](https://school.programmers.co.kr/learn/courses/30/parts/17042) 문제를 MySQL로 풀이한 것을 모아놓은 글입니다.
>
> 일종의 연습 기록이며 제가 정답을 받은 코드와 참고할만한 다른 코드를 같이 기록합니다. 필요한 경우 코드에 대한 해설을 기록합니다만 코드는 통과했어도 해설은 틀릴 수 있기 때문에 가볍게 참고해주시길 부탁드립니다. 피드백은 편하신 방법으로 자유롭게 주시면 감사하겠습니다.
>
> 순서는 처음 공부하는 입장에서 풀기 쉬웠던 순서로 정리했습니다.

## 59034 - 모든 레코드 조회하기 [Level 1]

```sql
SELECT *
FROM ANIMAL_INS
ORDER BY ANIMAL_ID
```

## 59403 - 동물의 아이디와 이름 [Level 1]

```sql
SELECT ANIMAL_ID, NAME
FROM ANIMAL_INS
ORDER BY ANIMAL_ID
```

## 59035 - 역순 정렬하기 [Level 1]

```sql
SELECT NAME, DATETIME
FROM ANIMAL_INS
ORDER BY ANIMAL_ID DESC
```

* 내림차순 정렬에는 `DESC` 키워드를 사용한다.

## 59404 - 여러 기준으로 정렬하기 [Level 1]

```sql
SELECT ANIMAL_ID, NAME, DATETIME
FROM ANIMAL_INS
ORDER BY NAME, DATETIME DESC
```

## 133024 - 인기있는 아이스크림 [Level 1]

```sql
SELECT FLAVOR
FROM FIRST_HALF
ORDER BY TOTAL_ORDER DESC, SHIPMENT_ID
```

## 59405 - 상위 n개 레코드 [Level 1]

```sql
SELECT NAME
FROM ANIMAL_INS
ORDER BY DATETIME
LIMIT 1
```

* 출력 개수를 제한하고 싶을 때는 `LIMIT` 키워드를 사용한다.

## 59036 - 아픈 동물 찾기 [Level 1]

```sql
SELECT ANIMAL_ID, NAME
FROM ANIMAL_INS
WHERE INTAKE_CONDITION = 'Sick'
ORDER BY ANIMAL_ID
```

## 59037 - 어린 동물 찾기 [Level 1]

```sql
SELECT ANIMAL_ID, NAME
FROM ANIMAL_INS
WHERE INTAKE_CONDITION != 'Aged'
ORDER BY ANIMAL_ID
```

## 131112 - 강원도에 위치한 생산공장 목록 출력하기 [Level 1]

```sql
SELECT FACTORY_ID, FACTORY_NAME, ADDRESS
FROM FOOD_FACTORY
WHERE ADDRESS LIKE '강원도%'
ORDER BY FACTORY_ID
```

* `LIKE`를 사용하면 특정 문자열을 포함하도록 조건을 줄 수 있다 `%`은 0개 이상의 문자를 의미한다.

## 132203 - 흉부외과 또는 일반외과 의사 목록 출력하기 [Level 1]

```sql
SELECT
    DR_NAME,
    DR_ID,
    MCDP_CD,
    DATE_FORMAT(HIRE_YMD, '%Y-%m-%d') AS HIRE_YMD
FROM
    DOCTOR
WHERE
    MCDP_CD = 'CS'
    OR MCDP_CD = 'GS'
ORDER BY
    HIRE_YMD DESC,
    DR_NAME
```

* `DATE_FORMAT`을 이용해서 날짜를 원하는 형식으로 출력할 수 있다.

## 131535 - 조건에 맞는 회원수 구하기 [Level 1]

```sql
SELECT
    COUNT(*) AS USERS
FROM
    USER_INFO
WHERE
    YEAR(JOINED) = 2021
    AND 20 <= AGE
    AND AGE <= 29
```

* `COUNT`를 사용하면 항목의 개수를 표시한다.
* `YEAR`을 이용해서 날짜에서 연도만 추출할 수 있다.

## 132201 - 12세 이하인 여자 환자 목록 출력하기 [Level 1]

```sql
SELECT
    PT_NAME,
    PT_NO,
    GEND_CD,
    AGE,
    IFNULL(TLNO, "NONE") AS TLNO
FROM
    PATIENT
WHERE
    AGE <= 12
    AND GEND_CD = "W"
ORDER BY
    AGE DESC,
    PT_NAME
```

* `NULL` 값을 `NONE`으로 바꾸고 싶을 때 `IFNULL`을 사용한다.
* 정렬 기준을 여러 개 주고 싶을 때는 순차적으로 작성하면 된다.

## 144853 - 조건에 맞는 도서 리스트 출력하기 [Level 1]

```sql
SELECT
    BOOK_ID,
    DATE_FORMAT(PUBLISHED_DATE, '%Y-%m-%d') AS PUBLISHED_DATE
FROM
    BOOK
WHERE
    CATEGORY = '인문'
    AND YEAR(PUBLISHED_DATE) = 2021
ORDER BY
    PUBLISHED_DATE
```

## 151136 - 평균 일일 대여 요금 구하기 [Level 1]

```sql
SELECT
    ROUND(AVG(DAILY_FEE)) AS AVERAGE_FEE
FROM
    CAR_RENTAL_COMPANY_CAR
WHERE
    CAR_TYPE = 'SUV'
```

* `AVG` 함수를 이용해서 항목의 평균을 구할 수 있다.
    * 평균을 구하는 `AVG`, 개수를 구하는 `COUNT`, 최소/최대를 구하는 `MIN/MAX` 등을 집계함수라고 한다.
* `ROUNT`를 이용해서 값을 반올림 할 수 있다.

## 131120 - 3월에 태어난 여성 회원 목록 출력하기 [Level 2]

```sql
SELECT
    MEMBER_ID,
    MEMBER_NAME,
    GENDER,
    DATE_FORMAT(DATE_OF_BIRTH, '%Y-%m-%d') AS DATE_OF_BIRTH
FROM
    MEMBER_PROFILE
WHERE
    MONTH(DATE_OF_BIRTH) = 3
    AND GENDER = 'W'
    AND TLNO IS NOT NULL
ORDER BY
    MEMBER_ID
```

## 133025 - 과일로 만든 아이스크림 고르기 [Level 1]

```sql
SELECT
    FIRST_HALF.FLAVOR
FROM
    FIRST_HALF
    LEFT JOIN ICECREAM_INFO ON FIRST_HALF.FLAVOR = ICECREAM_INFO.FLAVOR
WHERE
    TOTAL_ORDER > 3000
    AND INGREDIENT_TYPE = 'fruit_based'
ORDER BY
    TOTAL_ORDER DESC
```

## 164673 - 조건에 부합하는 중고거래 댓글 조회하기 [Level 1]

```sql
SELECT
    TITLE,
    REPLY.BOARD_ID,
    REPLY_ID,
    REPLY.WRITER_ID,
    REPLY.CONTENTS,
    DATE_FORMAT(REPLY.CREATED_DATE, '%Y-%m-%d') AS CREATED_DATE
FROM
    USED_GOODS_BOARD AS BOARD
    JOIN USED_GOODS_REPLY AS REPLY ON BOARD.BOARD_ID = REPLY.BOARD_ID
WHERE
    BOARD.CREATED_DATE LIKE '2022-10-%'
ORDER BY
    REPLY.CREATED_DATE,
    TITLE
```

* '게시글' 작성일이 2022년 10월 이어야 한다.

## 131536 - 재구매가 일어난 상품과 회원 리스트 구하기 [Level 2]

```sql
SELECT
    USER_ID,
    PRODUCT_ID
FROM
    ONLINE_SALE
GROUP BY
    USER_ID,
    PRODUCT_ID
HAVING
    COUNT(*) > 1
ORDER BY
    USER_ID,
    PRODUCT_ID DESC
```

* 중복된 항목을 묶어서 표시할 때는 `GROUP BY`를 사용한다.
* `GROUP BY`를 사용했을 때 조건을 걸고 싶으면 `HAVING` 구문을 사용한다.

## 131537 - 오프라인/온라인 판매 데이터 통합하기 [Level 4]

```sql
SELECT
    DATE_FORMAT(SALES_DATE, '%Y-%m-%d') AS SALES_DATE,
    PRODUCT_ID,
    USER_ID,
    SALES_AMOUNT
FROM
    ONLINE_SALE
WHERE
    MONTH(SALES_DATE) = 3
UNION
ALL
SELECT
    DATE_FORMAT(SALES_DATE, '%Y-%m-%d') AS SALES_DATE,
    PRODUCT_ID,
    NULL AS USER_ID,
    SALES_AMOUNT
FROM
    OFFLINE_SALE
WHERE
    MONTH(SALES_DATE) = 3
ORDER BY
    SALES_DATE,
    PRODUCT_ID,
    USER_ID
```

* `UNION`을 사용해 두 테이블의 결과를 하나의 테이블로 합쳐서 나타낼 수 있다.
    * 각각의 SELECT 문으로 선택된 필드의 개수, 타입, 순서가 같아야 한다.
    * `UNION ALL`을 사용하면 기본적으로 중복되는 레코드를 제거한다.
* `WHERE`문은 테이블 마다 각각 적용해주어야 하는 것 같다.

## 131118 - 서울에 위치한 식당 목록 출력하기 [Level 4]

```sql
SELECT
    INFO.REST_ID,
    REST_NAME,
    FOOD_TYPE,
    FAVORITES,
    ADDRESS,
    ROUND(AVG(REVIEW_SCORE), 2) AS SCORE
FROM
    REST_INFO AS INFO
    JOIN REST_REVIEW AS REVIEW ON INFO.REST_ID = REVIEW.REST_ID
GROUP BY
    REST_ID
HAVING
    ADDRESS LIKE '서울%'
ORDER BY
    SCORE DESC,
    FAVORITES DESC
```
