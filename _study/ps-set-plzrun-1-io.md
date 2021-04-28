---
layout  : article
title   : "Plzrun_알고리즘 문제풀이(PS) 시작하기: 입출력"
summary : BOJ 입출력 문제를 파이썬으로 풀어보자
date    : 2021-04-14 00:06:38 +0900
updated : 2021-04-15 00:33:10 +0900
tag     : ps-python
toc     : true
public  : true
parent  : [[ps-basic]]
latex   : false
---
* TOC
{:toc}

> 이 글은 [알고리즘 문제풀이(PS) 시작하기](https://plzrun.tistory.com/entry/알고리즘-문제풀이PS-시작하기)에서 입출력 문제로 추천하는 문제를 파이썬(Python)으로 풀이한 것을 모아놓은 글입니다. 문제 풀이는 각 번호의 링크로 이동해 참고해주시길 바랍니다.

### 문제 목록

* 백준 온라인 저지: 1000, 1924, 2438, 2439, 2440, 2441, 2442, 2445, 2446, 2522, 2557, 2558, 2739, 2741, 2742, 8393, 10818, 10950, 10951, 10952, 10953, 10991, 10992, 11021, 11022, 11718, 11719, 11720, 11721

| 사이트 | 문제                       | 문제 제목               | 난이도          |
| ------ | -------------------------- | ----------------------- | --------------- |
| 백준   | [[wiki3:boj-2557]]{2557}   | Hello World             | 🥉 브론즈 3티어 |
| 백준   | [[wiki3:boj-1000]]{1000}   | A+B                     | 🥉 브론즈 3티어 |
| 백준   | [[wiki3:boj-2558]]{2558}   | A+B - 2                 | 🥉 브론즈 3티어 |
| 백준   | [[wiki3:boj-10950]]{10950} | A+B - 3                 | 🥉 브론즈 3티어 |
| 백준   | [[wiki3:boj-10951]]{10951} | A+B - 4                 | 🥉 브론즈 3티어 |
| 백준   | [[wiki3:boj-10952]]{10952} | A+B - 5                 | 🥉 브론즈 3티어 |
| 백준   | [[wiki3:boj-10953]]{10953} | A+B - 6                 | 🥉 브론즈 2티어 |
| 백준   | [[wiki3:boj-11021]]{11021} | A+B - 7                 | 🥉 브론즈 3티어 |
| 백준   | [[wiki3:boj-11022]]{11022} | A+B - 8                 | 🥉 브론즈 3티어 |
| 백준   | [[wiki3:boj-11718]]{11718} | 그대로 출력하기         | 🥉 브론즈 3티어 |
| 백준   | [[wiki3:boj-11719]]{11719} | 그대로 출력하기 2       | 🥉 브론즈 1티어 |
| 백준   | [[wiki3:boj-11720]]{11720} | 숫자의 합               | 🥉 브론즈 2티어 |
| 백준   | [[wiki3:boj-11721]]{11721} | 열 개씩 끊어 출력하기   | 🥉 브론즈 2티어 |
| 백준   | [[wiki3:boj-2741]]{2741}   | N 찍기                  | 🥉 브론즈 3티어 |
| 백준   | [[wiki3:boj-2742]]{2742}   | 기찍 N                  | 🥉 브론즈 3티어 |
| 백준   | [[wiki3:boj-2739]]{2739}   | 구구단                  | 🥉 브론즈 3티어 |
| 백준   | [[wiki3:boj-1924]]{1924}   | 2007년                  | 🥉 브론즈 1티어 |
| 백준   | [[wiki3:boj-8393]]{8393}   | 합                      | 🥉 브론즈 5티어 |
| 백준   | [[wiki3:boj-10818]]{10818} | 최소, 최대              | 🥉 브론즈 3티어 |
| 백준   | [[wiki3:boj-2438]]{2438}   | 별 찍기 - 1             | 🥉 브론즈 3티어 |
| 백준   | [[wiki3:boj-2439]]{2439}   | 별 찍기 - 2             | 🥉 브론즈 3티어 |
| 백준   | [[wiki3:boj-2440]]{2440}   | 별 찍기 - 3             | 🥉 브론즈 3티어 |
| 백준   | [[wiki3:boj-2441]]{2441}   | 별 찍기 - 4             | 🥉 브론즈 3티어 |
| 백준   | [[wiki3:boj-2442]]{2442}   | 별 찍기 - 5             | 🥉 브론즈 3티어 |
| 백준   | [[wiki3:boj-2445]]{2445}   | 별 찍기 - 8             | 🥉 브론즈 3티어 |
| 백준   | [[wiki3:boj-2522]]{2522}   | 별 찍기 - 12            | 🥉 브론즈 3티어 |
| 백준   | [[wiki3:boj-2446]]{2446}   | 별 찍기 - 9             | 🥉 브론즈 3티어 |
| 백준   | [[wiki3:boj-10991]]{10991} | 별 찍기 - 16            | 🥉 브론즈 3티어 |
| 백준   | [[wiki3:boj-10992]]{10992} | 별 찍기 - 17            | 🥉 브론즈 3티어 |