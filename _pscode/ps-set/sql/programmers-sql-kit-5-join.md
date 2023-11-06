---
layout  : article
title   : "프로그래머스 SQL 고득점 Kit: JOIN"
summary : 
date    : 2023-11-06 01:51:23 +0900
updated : 2023-11-06 02:25:29 +0900
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
