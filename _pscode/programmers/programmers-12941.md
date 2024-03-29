---
layout  : article
title   : Programmers_12941 최솟값 만들기
summary : 
date    : 2023-11-13 17:03:32 +0900
updated : 2023-11-15 15:38:01 +0900
tag     : ps-js
toc     : true
public  : true
parent  : [[Programmers-Index]]
latex   : false
---
* TOC
{:toc}

> 이 글은 프로그래머스의 [12941번](https://programmers.co.kr/learn/courses/30/lessons/12941) 문제를 JavaScript로 풀이한 것을 모아놓은 글입니다.
>
> 일종의 연습 기록이며 제가 정답을 받은 코드와 참고할만한 다른 코드를 같이 기록합니다. 필요한 경우 코드에 대한 해설을 기록합니다만 코드는 통과했어도 해설은 틀릴 수 있기 때문에 가볍게 참고해주시길 부탁드립니다. 피드백은 편하신 방법으로 자유롭게 주시면 감사하겠습니다.

## 2023.11.13

정확성  테스트

| 테스트    | 통과 | 시간   | 메모리 |
| --------- | ---- | ------ | ------ |
| 테스트 1  | 통과 | 0.05ms | 33.5MB |
| 테스트 2  | 통과 | 0.21ms | 33.4MB |
| 테스트 3  | 통과 | 0.18ms | 33.6MB |
| 테스트 4  | 통과 | 0.18ms | 33.5MB |
| 테스트 5  | 통과 | 0.18ms | 33.6MB |
| 테스트 6  | 통과 | 0.26ms | 33.5MB |
| 테스트 7  | 통과 | 0.17ms | 33.5MB |
| 테스트 8  | 통과 | 0.19ms | 33.5MB |
| 테스트 9  | 통과 | 0.18ms | 33.5MB |
| 테스트 10 | 통과 | 0.18ms | 33.5MB |
| 테스트 11 | 통과 | 0.15ms | 33.6MB |
| 테스트 12 | 통과 | 0.15ms | 33.5MB |
| 테스트 13 | 통과 | 0.18ms | 33.4MB |
| 테스트 14 | 통과 | 0.15ms | 33.6MB |
| 테스트 15 | 통과 | 0.15ms | 33.4MB |
| 테스트 16 | 통과 | 0.15ms | 33.6MB |

효율성  테스트

| 테스트   | 통과 | 시간   | 메모리 |
| -------- | ---- | ------ | ------ |
| 테스트 1 | 통과 | 0.73ms | 33.4MB |
| 테스트 2 | 통과 | 0.77ms | 33.4MB |
| 테스트 3 | 통과 | 0.67ms | 33.5MB |
| 테스트 4 | 통과 | 0.66ms | 33.5MB |

```js
function solution(A, B) {
    A.sort((a, b) => a - b);
    B.sort((a, b) => b - a);

    return A.reduce((acc, curr, idx) => acc + curr * B[idx], 0);
}
```

### 아이디어 & 풀이

두 배열의 수를 곱한 뒤 더했을 때 값이 최소가 되려면 가장 큰 수와 가장 작은 수를 곱해 더해나가야 한다.

* 주어진 두 배열을 하나는 오름차순 다른 하나는 내림차순 정리한 뒤 첫 항부터 순회하면서 곱한 값을 더해 반환한다.

### 피드백

* 막연히 생각했을 때 작은 수와 작은 수를 곱해서 작아지는 값보다 큰 수와 큰 수를 곱해서 커지는 값이 더 크기 떄문에 큰 수와 작은 수를 곱해서 더해야 한다고 생각했는데 왜 이게 항상 성립하는지는 잘 모르겠다.
