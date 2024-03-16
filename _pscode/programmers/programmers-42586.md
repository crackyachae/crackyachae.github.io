---
layout  : article
title   : Programmers_42586 기능개발
summary : 
date    : 2024-03-09 17:56:39 +0900
updated : 2024-03-14 17:28:45 +0900
tag     : ps-js
toc     : true
public  : true
parent  : [[Programmers-Index]]
latex   : false
---
* TOC
{:toc}

> 이 글은 프로그래머스의 [42586번](https://programmers.co.kr/learn/courses/30/lessons/42586) 문제를 자바스크립트(JavaScript)로 풀이한 것을 모아놓은 글입니다.
>
> 일종의 연습 기록이며 제가 정답을 받은 코드와 참고할만한 다른 코드를 같이 기록합니다. 필요한 경우 코드에 대한 해설을 기록합니다만 코드는 통과했어도 해설은 틀릴 수 있기 때문에 가볍게 참고해주시길 부탁드립니다. 피드백은 편하신 방법으로 자유롭게 주시면 감사하겠습니다.

## 2024.03.09

| 테스트    | 통과 | 시간   | 메모리 |
| --------- | ---- | ------ | ------ |
| 테스트 1 |통과 |0.07ms| 33.6MB|
| 테스트 2 |통과 |0.19ms| 33.6MB|
| 테스트 3 |통과 |0.16ms| 33.5MB|
| 테스트 4 |통과 |0.13ms| 33.5MB|
| 테스트 5 |통과 |0.07ms| 33.4MB|
| 테스트 6 |통과 |0.08ms| 33.4MB|
| 테스트 7 |통과 |0.14ms| 33.6MB|
| 테스트 8 |통과 |0.05ms| 33.4MB|
| 테스트 9 |통과 |0.21ms| 33.6MB|
| 테스트 10 |통과 |0.14ms| 33.4MB|
| 테스트 11 |통과 |0.07ms| 33.4MB|

| 단계      | 시작 시각 | 끝난 시각 | 걸린 시간 |
| --------- | --------- | --------- | --------- |
| 문제 이해 | 17:57:38  | 17:58:59  |           |
| 풀이 생각 | 17:59:01  | 18:00:53  |           |
| 코딩      | 18:10:57  | 18:15:15  |           |

```js
function solution(progresses, speeds) {
    const answer = [];
    let prevLeftDays = Math.ceil((100 - progresses[0]) / speeds[0]);
    let count = 1;

    for (let i = 1; i < progresses.length; i += 1) {
        const leftDays = Math.ceil((100 - progresses[i]) / speeds[i]);
        if (prevLeftDays >= leftDays) {
            count += 1;
        } else {
            answer.push(count);

            prevLeftDays = leftDays;
            count = 1;
        }
    }
    answer.push(count);

    return answer;
}
```

### 아이디어 & 풀이

작업을 완료하는 데 걸리는 날짜를 구한 뒤 각 태스트에 걸리는 날짜를 비교하면서 각 배포마다 배포할 수 있는 작업의 수를 구한다.

* 남은 날짜는 100에서 현재 작업의 `progresses` 값을 뺀 값을 `speeds`로 나눈 값이다.
* 각 값을 순회하면서 남은 날짜를 계산해 이전 작업의 `prevLeftDays` 보다 작거나 같으면 해당 작업과 같이 배포해야 하므로 `count` 값을 1 증가시킨다.
* 그보다 크면 이전까지의 작업을 배포해야 하므로 지금까지 구한 `count`를 `answer`에 추가하고 새로운 배포를 위해 값을 지정한다.
    * `prevLeftDays`는 현재의 `leftDays`로 바꾸고
    * `count` 값을 1로 초기화한다.
* 마지막으로 계산된 `count`는 반복문이 종료되므로 별도로 `answer`에 추가해주어야 한다.

### 피드백

* 참고 답안과 같이 남은 작업 기한인 `days`를 `map`을 이용해 먼저 계산하고 이를 순회하면서 `answer`를 채워 나가면 보다 간결한 코드를 작성할 수 있다.
* 이러면 순회를 두 번 하게 되므로 `O(2n)`이 되어 위처럼 작성했는데 실행 속도에 큰 차이는 없는 것 같다.

## 참고 답안

| 테스트    | 통과 | 시간   | 메모리 |
| --------- | ---- | ------ | ------ |
| 테스트 1  | 통과 | 0.07ms | 33.4MB |
| 테스트 2  | 통과 | 0.16ms | 33.4MB |
| 테스트 3  | 통과 | 0.18ms | 33.5MB |
| 테스트 4  | 통과 | 0.16ms | 33.4MB |
| 테스트 5  | 통과 | 0.06ms | 33.5MB |
| 테스트 6  | 통과 | 0.07ms | 33.4MB |
| 테스트 7  | 통과 | 0.16ms | 33.6MB |
| 테스트 8  | 통과 | 0.07ms | 33.5MB |
| 테스트 9  | 통과 | 0.16ms | 33.5MB |
| 테스트 10 | 통과 | 0.16ms | 33.6MB |
| 테스트 11 | 통과 | 0.07ms | 33.5MB |

```js
function solution(progresses, speeds) {
    let answer = [0];
    let days = progresses.map((progress, index) =>
        Math.ceil((100 - progress) / speeds[index])
    );
    let Day = days[0];

    for (let i = 0, j = 0; i < days.length; i += 1) {
        if (days[i] <= prevDay) {
            answer[j] += 1;
        } else {
            prevDay = days[i];
            answer[++j] = 1;
        }
    }

    return answer;
}
```
