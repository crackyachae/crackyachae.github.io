---
layout  : article
title   : 7. SQL
summary : 
date    : 2020-04-12 22:03:16 +0900
updated : 2020-04-16 14:43:41 +0900
tag     : draft
toc     : true
public  : true
parent  : [[/cs-basic/harvardx-cs50s-intro]]
latex   : false
---
* TOC
{:toc}

> 이 글은 CS50 x 2020의 [weeks 7](https://cs50.harvard.edu/x/2020/weeks/7/) 강의내용을 복습하기 위해 [강의 노트](https://cs50.harvard.edu/x/2020/notes/7/)를 기반으로 작성한 글입니다.
>
> 내용을 이해하기 위한 개인적인 설명이나 해석이 있을 수 있기 때문에 되도록 원문을 참고해주시길 바랍니다.
> 잘못된 부분이 있다면 댓글이나 그 외 편하신 방법으로 알려주시면 감사하겠습니다.

## Spreadsheets

Database는 데이터(data)를 저장할 수 있는 application으로 Google Sheets 등이 이에 해당한다.

예를들어 학생들에게 좋아하는 TV show와 장르를 물어보는 Google Form을 만들어 응답을 수집한 뒤 확인하면 spreadsheets는 다음과 같은 세 개 열의 데이터를 갖는다: "Tilestamp", "title", "genres"

이를 CSV 파일로 다운받아 python으로 데이터를 분석하는 프로그램을 작성할 수 있다.

1\. 파일을 열어 각 행의 TV Show 제목을 출력

```python
# csv library를 import
import csv

# filename.csv를 read 모드로 열어 file에 저장
with open("filename.csv", "r") as file:
    # file(csv파일)의 data를 Dictionary형태로 reader에 저장
    reader = csv.DictReader(file)

    # reader 각 행마다 "title" key에 해당하는 value(TV Show 제목)를 출력
    for row in reader:
        print(row["title"])
```

2\. 각 TV Show별 응답 횟수를 계산해서 출력

```python
import csv

# TV Show의 제목과 응답 횟수를 기록하기 위한 dictionary를 만듦
counts = {}

with open("filename.csv", "r") as file:
    reader = csv.DictReader(file)

    for row in reader:
        # title에 이번 행의 TV Show 제목을 입력
        title = row["title"]
        # 해당 TV Show가 counts dictonary에 존재하면 해당 TV Show의 count 횟수를 증가
        if title in counts:
            count[title] += 1
        # 존재하지 않으면 해당 TV Show를 count값 1로 counts dictionary에 입력.
        else:
            count[title] = 1

# .items()를 이용하여 counts의 key(title)와 value(count)를 모두 출력
for title, count in counts.items():
    # seperation을 " | "로 지정, default: " "
    print(title, count, sep=" | ")
```

3\. 각 TV Show별 응답 횟수를 정렬

```python
# Counts를 title에 대해 sorting해서 출력
for title, count in sorted(counts.item()):
    print(title, count, sep=" | ")
```

count 값에 대해 sorting되도록 하려면

```python
# item을 받아서 두 번째 item(.items()의 경우 value 값)을 반환하는 함수를 정의
def f(item):
    return item[1]

# sorted의 key parameter는 값을 비교하기 전에 각 element에 적용할 함수를 지정
# key값으로 f를 넘기면 count를 반환하기 때문에 count를 기준으로 정렬 
# reverse parameter를 True로 두면 역순(내림차순)으로 정리
for title, count in sorted(counts.items(), key=f, reverse=True):
    print(title, count, sep=" | ")
```

적용할 function이 간단할 경우 key값으로 직접 적을 수 있다. `f` function은 다음과 같이 적는다.

```python
# item을 받아서 item[1]을 반환하는 임의의 함수 lambda를 key값으로 지정
for title, count in sorted(counts.items(), key=lambda item: item[1], reverse=True):
```

## SQL

Python이 아닌 다른 언어를 사용해서 데이터를 분석할 수 있다. Terminal window의 `sqlite3`는 SQL(sequel로 발음)이란 언어를 사용할 수 있는 command-line 프로그램이다.

우선 터미널에 다음과 같은 command를 수행해서 `favorites.db`라는 이름의 새로운 database를 만들고 위의 CSV 파일을 "favorites"라는 table로 불러올 수 있다.

```bash
# sqlite를 실행해서 favorite.db를 생성
~/ $ sqlite3 favorites.db

# csv 모드로 변경 후 csv파일을 favorites라는 이름의 table로 가져옴
sqlite> .mode csv
sqlite> .import "filename.csv" favorites
```

이제 SQL을 이용해서 data를 분석할 수 있다.

1\. favorites table에서 title을 출력

```sql
-- FROM: 데이터를 가져 올 대상, SELECT: 출력할 column을 선택
sqlite> SELECT title FROM favorites;

--결과
title
Dynasty
The Office
Blindspot
24
Friends
psych
Veep
Survivor
...
```

2\. 결과를 sorting해서 출력

```sql
-- ORDER BY: sorting 할 대상 지정
sqlite> SELECT title FROM favorites ORDER BY title;

--결과
title
/
24
9009
Adventure Time
Airplane Repo
Always Sunny
Ancient Aliens
...
```

3\. Title별 응답 횟수를 함께 표시

```sql
-- GROUP BY: 해당 항목을 기준으로 공통 항목을 갖는 요소를 묶어서 한 번에 표현 
-- title과 응답 횟수인 COUNT(title)을 표시하되 공통된 항목은 한 번에 표시
sqlite> SELECT title, COUNT(title) FROM favorites GROUP BY title;

--결과
title | COUNT(title)
/ | 1
24 | 1
9009 | 1
Adventure Time | 1
Airplane Repo | 1
Always Sunny | 1
Ancient Aliens | 1
...
```

결과를 sorting하고 표시할 항목을 제한 할 수도 있다.

```sql
-- AS: 항목의 이름을 변경, LIMIT: 데이터를 해당 개수만 출력
-- COUNT(title)을 n으로 바꾸고 n에 따라 내림차순(DESC)으로 정렬해서 10개까지만 표시
sqlite> SELECT title, COUNT(title) AS n FROM favorites GROUP BY title ORDER BY n DESC LIMIT 10;

--결과
title | n
The Office | 30
Friends | 20
Game of Thrones | 20
Breaking Bad | 14
Black Mirror | 9
Rick and Morty | 9
Brooklyn Nine-Nine | 5
Game of thrones | 5
No | 5
Prison Break | 5
```

이처럼 SQL을 이용하면 데이터를 저장한 뒤 CSV보다 직관적이고 빠르게 이용할 수 있다.

`.schema`를 입력하면 table을 이루고 있는 데이터의 형식을 확인할 수 있다.

```sql
sqlite> .schema

-- 결과
CREATE TABLE favorites(
    "Timestamp" TEXT,
    "title" TEXT,
    "genres" TEXT
);
```

Data를 다루는데 필요한 동작은 네 가지이며 SQL에서 이를 수행하기 위한 명령어는 다음과 같다:

| Operation | SQL Command | 설명          |
| --------- | :---------: | :-----:       |
| `CREATE`  | `INSERT`    | 데이터를 생성 |
| `READ`    | `SELECT`    | 데이터를 선택 |
| `UPDATE`  | `UPDATE`    | 데이터를 수정 |
| `DELETE`  | `DELETE`    | 데이터를 삭제 |

SQL도 다른 언어처럼 data를 저장할 공간을 최적화하기 위해 data type을 지정한다.
| Data types |                            | 설명                                    |
| ---------- | -------------------------- | ------------------------------------- |
| `BLOB`     |                            | 파일 같은 raw binary data                 |
| `INTEGER`  | `smallint`                 |                                       |
|            | `integer`                  |                                       |
| `NUMERIC`  | `boolean`                  |                                       |
|            | `date`                     |                                       |
|            | `datetime`                 |                                       |
|            | `numeric(scale,precision)` | floating-point imprecision을 해결할 수 있다. |
|            | `time`                     |                                       |
|            | `timestamp`                |                                       |
| `REAL`     | `real`                     | floating-point value에 이용.             |
|            | `double precision`         |                                       |
| `TEXT`     | `char(n)`                  | n개의 문자로 이루어진 텍스트                      |
|            | `varchar(n)`               | 최대 n개의 문자로 이루어진 텍스트                   |
|            | `text`                     |                                       |

### CREATE

우선 `CREATE TABLE table (column type, ...);` 명령어로 table을 생성한다.

table을 생성하면 다음과 같은 함수를 이용해 값을 계산할 수 있다:

| Function   | 의미                      |
| ---------- | ----------------------- |
| `AVG`      |                         |
| `COUNT`    |                         |
| `DISTINCT` | 복제 없이 distint value를 얻음 |
| `MAX`      |                         |
| `MIN`      |                         |

필요한 경우 function과 결합해서 사용할 수 있는 operation들도 있다:

| Operation  | 의미                   |
| ---------- | -------------------- |
| `WHERE`    | 다음의 조건을 만족하는 항목으로 제한 |
| `LIKE`     | 특정 문자를 포함하는 항목으로 제한  |
| `LIMIT`    |                      |
| `GROUP BY` |                      |
| `ORDER BY` |                      |
| `JOIN`     | 여러 table의 데이터들을 결합   |

### UPDATE

`UPDATE table SET column=value WHERE condition;` 명령어로 데이터를 수정할 수 있고 condition에 따라 0개 이상의 rows를 포함한다.

예를 들어 `UPDATE favorites SET title = "The Office" WHERE title LIKE "%office"`를 입력하면 "office"를 포함하는 모든 단어를 "The Office"로 수정한다.

* `LIKE %office`: %office를 포함하는 (%는 임의의 문자)
* `WHERE title`: title에 대해서
* `SET title` = "The Office" title을 The Office로 바꾼다

### DELETE

`DELETE FROM table WHERE conditon;` 명령어로 조건과 일치하는 rows를 제거할 수 있다.

예를 들어 `DELETE FROM favorites WHERE title = "Friends";`를 입력하면 제목이 "Friends"인 rows를 모두 삭제한다.

모든 table을 삭제하려면 `DROP`을 이용한다.

## IMDb

[IMDB](https://www.imdb.com/interfaces/)에서 TSV(tab-separate values) 파일을 받아 이용해보자.

예를 들어 작품에 대한 기본적인 정보를 담고있는 `title.basics.tsv.gz` 파일을 받으면 다음과 같이 구성되어있다.

| 항목             | 설명                           | Example         |
| -------------- | ---------------------------- | --------------- |
| `tconst`       | 각 작품의 고유한 식별코드               | `tt4786824`     |
| `titleType`    | 작품의 종류                       | `tvSeries`      |
| `primaryTitle` | 주로 사용된 제목                    | `The Crown`     |
| `startYear`    | 발매된 연도                       | `2016`          |
| `genres`       | 장르, 여러개일 경우 comma(,)로 구분되어있다 | `Drama,History` |

`title.basics.tsv` 파일은 첫 열은 위의 항목, 그리고 각 열에 작품에 따른 항목 값이 tab으로 구분되어 있으며 약 6백만개의 열이 존재한다.

우선 python으로 데이터를 다룰 프로그램을 작성하면:

원하는 정보만을 추려서 새로운 csv파일에 옮기는 프로그램

```python
import csv

# 다운받은 TSV 파일을 read 모드로 열어 titles에 저장
with open("title.basics.tsv", "r") as titles:

    # 사용하는 파일이 TSV 파일이므로 CSV library를 이용하되 구분 기준을 tab으로 변경
    # delimiter를 tab(\t)으로 지정
    reader = csv.DictReader(titles, delimiter="\t")

    # 결과를 저장할 CSV 파일을 write모드로 열어 show에 저장
    with open("shows0.csv", "w") as shows:

        # writer 생성
        writer = csv.writer(shows)

        # 첫 row에 column의 header를 작성
        writer.writerow(["tconst", "primaryTitle", "startYear", "genres"])

        for row in reader:

            # Non adult TV Show(type이 tvSeries)에 대해서 
            if row["titleType"] == "tvSeries" and row["isAdult"] == "0":

                # 조건이 여러개인 경우 continue를 이용해서 indentation을 줄일 수 있음
                
                # 발매년도가 "\N"이 아니고
                # "\N"을 그 자체로 인식하기 위해서 앞에 \를 더 붙여줘야 함
                if row["startYear"] == "\\N":
                    continue
                # 1970 이후 발매작인 경우
                # 값 비교를 위해 startYear를 int로 변환
                if int(row["startYear"]) < 1970:
                    continue

                # row를 작성
                writer.writerow([row["tconst"], row["primaryTitle"], row["startYear"], row["genres"]])
```

TV Show만을 추린 csv파일로 특정 Title을 가진 프로그램만 출력하는 프로그램

```python
import csv

# 찾고싶은 타이틀 명을 입력
title = input("Title: ")

with open("shows2.csv", "r") as input:

    reader = csv.DictReader(input)

    for row in reader:

        # 입력받은 title과 각 row primaryTitle을 비교
        # 일치하면 title명, 발매년도, 장르를 출력
        if title.lower() == row["primaryTitle"].lower():
            print(row["primaryTitle"], row["startYear"], row["genres"], sep=" | ")
```

Python에서 SQL database를 연결해서 사용할 수 있고 위와 동일한 작업을 SQL을 이용해서 보다 수월하게 할 수 있다.

```python
# 편의를 위해 cs50 library를 import
import cs50
import csv

# Database를 생성하기 위해 빈 db파일을 열었다 닫음
open(f"shows3.db", "w").close()

# db파일을 SQLite로 open
db = cs50.SQL("sqlite:///shows3.db")

# SQL을 이용해 'shows'라는 table을 생성한 뒤 각 column을 지정
# 'startYear' 외에는 전부 text type
db.execute("CREATE TABLE shows (tconst TEXT, primaryTitle TEXT, startYear NUMERIC, genres TEXT)")

with open("title.basics.tsv", "r") as titles:

    reader = csv.DictReader(titles, delimiter="\t")

    for row in reader:

            # Non adult TV Show(type이 tvSeries)에 대해서 
            if row["titleType"] == "tvSeries" and row["isAdult"] == "0":

                # 발매년도가 "\N"이 아니고
                if row["startYear"] != "\\N":
                    # 1970 이후 발매작인 경우
                    if int(row["startYear"]) >= 1970:
                
                    # show에 각 header에 해당하는 값을 입력
                    # '?'는 C의 `%s` 같은 placeholder
                    db.execute("INSERT INTO shows (tconst, primaryTitle, startYear, genres) VALUES(?, ?, ?, ?)", 
                    row["tconst"], row["primaryTitle"], row["startYear"], row["genres"])
```

table 생성 후 `sqlite3`를 이용해서 원하는 값을 출력할 수 있다.

```sql
-- shows의 전체항목 중 위에서 부터 10개 항목을 표시
SELECT * FROM shows LIMIT 10;

-- shows의 전체 항목의 수를 표시
SELECT COUNT(*) FROM shows;

-- shows에서 startYear가 2019년도인 항목의 수를 표시
SELECT COUNT(*) FROM shows WHERE startYear = 2019;
```

## Multiple tables

Shows table에서 장르는 하나의 column 안에 여러 개의 항목이 함께 존재하기 때문에 특정 장르를 포함하는 항목을 한 번에 표시하기 어렵다.
(e.g genres 값이 Comedy,Drama인 경우 Comedy로 조건을 걸면 표시되지 않음)

Genres를 위한 table을 따로 만들어 이를 해결할 수 있다.

```python
import cs50
import csv

open(f"shows4.db", "w").close()
db = cs50.SQL("sqlite:///shows4.db")

# 2개의 table을 생성: show, genres
# genres table은 shows의 id 항목을 참조하는 shows_id column을 갖는다
db.execute("CREATE TABLE shows (id INT, title TEXT, year NUMERIC, PRIMARY KEY(id))")
db.execute("CREATE TABLE genres (show_id INT, genre TEXT, FOREIGN KEY(show_id) REFERENCES shows(id))")

with open("title.basics.tsv", "r") as titles:

    reader = csv.DictReader(titles, delimiter="\t")

    for row in reader:

        if row["titleType"] == "tvSeries" and row["isAdult"] == "0":

            if row["startYear"] != "\\N":

                startYear = int(row["startYear"])
                if startYear >= 1970:

                    # tconst의 prefix를 제거
                    id = int(row["tconst"][2:])

                    # shows table에 id, primaryTitle, startYear를 입력
                    db.execute("INSERT INTO shows (id, title, year) VALUES(?, ?, ?)", id, row["primaryTitle"], startYear)

                    # 현재 row의 genres가 '\N'이 아닐 경우
                    if row["genres"] != "\\N":
                        # ','로 구분 된 각각의 genres 값에 대해
                        for genre in row["genres"].split(","):
                            # genres table에 현재 title의 id와 genres 값을 입력
                            db.execute("INSERT INTO genres (show_id, genre) VALUES(?, ?)", id, genre)
```

`shows` table에는 더 이상 `genres` column이 존재하지 않는 대신 `genres` table을 별도로 만들었고 `genres` table에는 하나의 show가 여러개(열)의 genres 항목을 갖고 있기 때문에 개별 genre로 검색을 할 수 있다.

다음과 같이 두 table을 결합해서 이용할 수 있다.

```sql
-- genres table에서 genre가 Comedy인 show_id 값들과
-- id가 동일한 값을 갖고 year은 2019인 항목을 shows에서 표시
SELECT * FROM shows WHERE id IN (SELECT show_id FROM genres WHERE genre = "Comedy") AND year = 2019;
```

두 table의 관계를 나타내면 다음과 같다:

![shows and genres table](/post-img/harvardx-cs50s-intro-7-sql/111032051-e25c9a80-844d-11eb-857a-b8d8bdc48422.png)

* `genres` table의 id 값은 `shows` table로 부터 온 것이기 때문에 `show_id`로 명명한다.
* 화살표 모양은 1개의 `shows` table id가 여러개의 `genre`를 가질 수 있다는 것을 의미한다.

IMDb에서 다른 TSV 파일을 받아 table을 보다 폭넓게 결합하여 이용할 수 있다.

![imdb tables](/post-img/harvardx-cs50s-intro-7-sql/111032054-e5578b00-844d-11eb-9bfb-696c0fd7668a.png)

* `people` table에서 온 id는 `person_id`로 표기

공통항목이 있는 두 table을 한 번에 표시할 수 있다.

```sql
-- show table의 id가 genres table의 show_id와 일치하도록
-- shows에 genres를 JOIN 하여 표시
SELECT * FROM shows JOIN genres ON show.id = genres.show_id;
```

공통항목을 이용해서 다른 table의 data로 filtering 할 수 있다.

```sql
-- person_id가 1222인 배우가 출연한 show의 목록을 표시
SELECT * FROM stars WHERE person_id = 1122;

-- people에서 Ellen Degeneres라는 name을 갖는 항목의 id 값을
-- person_id로 갖는 작품 id를 stars에서 표시
-- 배우 id가 아니라 이름으로 stars의 show 목록을 표시한 것
SELECT show_id FROM stars WHERE person_id = (SELECT id FROM people WHERE name = "Ellen Degeneres");

-- 위에서 얻은 show_id 값에 해당하는 show를 표시
-- 배우 이름으로 shows의 show 제목을 표시 한 것
SELECT * FROM shows WHERE id IN (
SELECT show_id FROM stars WHERE person_id = (SELECT id FROM people WHERE name = "Ellen Degeneres"));
```

위의 내용을 다음과 같이 나타낼 수 있다.

```sql
SELECT title FROM people
JOIN stars ON people.id = stars.person_id
JOIN shows ON stars.show_id = shows.id
WHERE name = "Ellen Degeneres"
```

* show의 id 값으로 stars table과 shows table을 결합

* person의 id 값으로 stars table과 people table을 결합
* 결과적으로 people의 name 값으로 shows의 title을 filtering

table을 합치는 것과 관련해서 table의 column에 다음과 같은 type을 지정할 수 있다:

| type          | 설명                                                |
| ------------- | ------------------------------------------------- |
| `PRIMARY KEY` | 항목(row)의 기본적인 identifier로 사용                      |
| `FOREIGN KEY` | 다른 table을 가리키는데 사용                                |
| `UNIQUE`      | table에서 unique 한 column                           |
| `INDEX`       | column의 data를 보다 빠르게 찾을 수 있도록 tree와 비슷한 index를 형성 |

Index는 다음과 같이 만들 수 있다:

```sql
-- person_id column로 person_index라는 index를 생성
CREATE INDEX person_index ON stars (person_id);
```

## Problems

### Race Condition

두 action 사이의 시간 차이가 예상 밖의 결과를 가져오는 것.

Data가 많아지면 condition을 확인하고 그 결과를 반영하는데 시간이 걸리는데, 병렬적으로 동작하는 경우 다른 컴퓨터가 결과가 반영되기 전 상태를 다시 인식하고 동일한 수행을 하게 되는 경우가 대표적이다.

#### Example

```python
rows = db.excute("SELECT likes FROM posts WHERE id=?", id)
likes = row[0]["likes"] 
db.execute("UPDATE posts SET likes = ?", likes + 1)
```

* 주어진 id 게시글의 likes 수를 가져와서 한 개 증가시키는 프로그램

* 2개의 web server가 likes를 update하는 일을 수행할 때 현재 likes가 3개고 동시에 likes가 눌리는 경우를 생각해보자. 이를 두 server가 각각 인식하면 likes를 1개씩 순차적으로 증가시키지 못하고 두 server 모두 3개에서 4개로 높여 실제(5)보다 하나 적게 likes를 증가시키게 된다.

### SQL Injection Attack

타인이 우리의 database를 조작하게 되는 것.

코드를 잘못 설계하면 타인이 프로그램의 동작에 영향을 주는 입력값을 줄 수 있다.

#### Example

```python
# 1
rows = db.execute("SELECT * FROM users WHERE username = ? AND password = ?", username, password)

if len(rows) == 1:
    # Logged in!

# 2
rows = db.execute(f"SELECT * FROM users WHERE username = '{usename} AND password = '{password}'")

if len(rows) == 1:
    # Logged in!
```

* username과 password를 받아 올바른 값일 경우 로그인하는 프로그램

* #1은 문제가 없지만 코드를 #2처럼 입력하는 경우 username의 끝에 `--`를 붙이면 뒷 부분이 주석처리가 되면서 password에 상관 없이 로그인이 되는 문제가 발생한다.
