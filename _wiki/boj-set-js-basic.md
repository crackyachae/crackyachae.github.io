---
layout  : wiki
title   : BOJ_JavaScript 배우기 (1~50)
summary : 
date    : 2021-03-04 17:33:55 +0900
updated : 2021-03-04 16:05:20 +0900
tag     : 
toc     : true
public  : true
parent  : [[boj]]
latex   : false
---
* TOC
{:toc}

automata님이 만드신 Python 배우기 문제집을 JS로 풀이

### Problem list
1000, 1001, 1008, 1789, 1934, 2163, 2476, 2480, 2525, 2530, 2557, 2558, 2588, 2675, 2753, 2754, 2884, 2914, 2935, 3009, 3046, 4101, 5063, 5086, 5355, 5717, 7287, 7567, 8958, 9498, 9506, 9610, 10039, 10102, 10103, 10156, 10162, 10214, 10430, 10699, 10757, 10817, 10869, 10886, 10988, 10998, 11021, 11022, 11557, 11653

### 입출력 관련
+ 입력은 `FileSystem`,
+ 출력은 `console.log()`를 이용한다.

```js
const fs = require("fs");
// stdin에서 입력을 받아 string으로 변환한다.
const input = fs.readFileSync("/dev/stdin").toString() //단어나 문장 단위로 구분할 경우 .split('sep') 이용
```
백준에서는 이 입력 방식을 권장하고 있지만 `/dev/stdin`의 경로가 모든 곳에서 적용되는 것은 아니기 때문에 그 외의 경우에는 `Readline`을 쓰는 것을 권장한다.

## 2557	Hello World	
Hello World!를 출력하시오.

```js
console.log("Hello World!");
```

## 1000	A+B
```js
```
## 10998	A×B
```js
```
## 1001	A-B
```js
```
## 1008	A/B
```js
```
## 10869	사칙연산
```js
```
## 10430	나머지
```js
```
## 2558	A+B - 2
```js
```
## 2588	곱셈	
```js
```
## 3046	R2	
```js
```
## 2163	초콜릿 자르기	
```js
```
## 11021	A+B - 7	
```js
```
## 11022	A+B - 8	
```js
```
## 10699	오늘 날짜
```js
```
## 7287	등록
```js
```
## 2525	오븐 시계	
```js
```
## 2530	인공지능 시계	
```js
```
## 2914	저작권	
```js
```
## 5355	화성 수학	
```js
```
## 2675	문자열 반복	
```js
```
## 2935	소음	
```js
```
## 9498	시험 성적
```js
```
## 10817	세 수	
```js
```
## 11653	소인수분해	
```js
```
## 1789	수들의 합	
```js
```
## 2753	윤년
```js
```
## 10039	평균 점수	
```js
```
## 1934	최소공배수	
```js
```
## 2480	주사위 세개	
```js
```
## 4101	크냐?	
```js
```
## 10156	과자	
```js
```
## 3009	네 번째 점	
```js
```
## 2476	주사위 게임	
```js
```
## 2754	학점계
```js
```
## 2884	알람 시계	
```js
```
## 7567	그릇	
```js
```
## 5063	TGN	
```js
```
## 10102	개표	
```js
```
## 10886	0 = not cute / 1 = cute	
```js
```
## 10988	팰린드롬인지 확인하기	
```js
```
## 5086	배수와 약수	
```js
```
## 5717	상근이의 친구들	
```js
```
## 9610	사분면	
```js
```
## 8958	OX퀴즈	
```js
```
## 9506	약수들의 합	
```js
```
## 10162	전자레인지	
```js
```
## 10103	주사위 게임	
```js
```
## 10214	Baseball	
```js
```
## 11557	Yangjojang of The Year	
```js
```
## 10757	큰 수 A+B
```js
```