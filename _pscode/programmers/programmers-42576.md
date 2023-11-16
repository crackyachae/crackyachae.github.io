---
layout  : article
title   : Programmers_42576 완주하지 못한 선수
summary : 
date    : 2023-11-14 18:36:52 +0900
updated : 2023-11-15 17:42:04 +0900
tag     : ps-js
toc     : true
public  : true
parent  : [[Programmers-Index]]
latex   : false
---
* TOC
{:toc}

> 이 글은 프로그래머스의 [42576번](https://programmers.co.kr/learn/courses/30/lessons/42576) 문제를 JavaScript로 풀이한 것을 모아놓은 글입니다.
>
> 일종의 연습 기록이며 제가 정답을 받은 코드와 참고할만한 다른 코드를 같이 기록합니다. 필요한 경우 코드에 대한 해설을 기록합니다만 코드는 통과했어도 해설은 틀릴 수 있기 때문에 가볍게 참고해주시길 부탁드립니다. 피드백은 편하신 방법으로 자유롭게 주시면 감사하겠습니다.

## 2023.11.14

정확성 테스트

| 테스트   | 통과 | 시간   | 메모리 |
| -------- | ---  | ------ | ------ |
| 테스트 1 | 통과 | 0.04ms | 33.5MB |
| 테스트 2 | 통과 | 0.04ms | 33.6MB |
| 테스트 3 | 통과 | 0.46ms | 33.6MB |
| 테스트 4 | 통과 | 0.92ms | 33.7MB |
| 테스트 5 | 통과 | 0.63ms | 33.8MB |
| 테스트 6 | 통과 | 0.05ms | 33.6MB |
| 테스트 7 | 통과 | 0.04ms | 33.5MB |

효율성 테스트

| 테스트   | 통과 | 시간     | 메모리 |
| -------- | ---  | -------- | ------ |
| 테스트 1 | 통과 | 42.42ms  | 47.2MB |
| 테스트 2 | 통과 | 94.76ms  | 52.5MB |
| 테스트 3 | 통과 | 109.32ms | 57MB   |
| 테스트 4 | 통과 | 104.75ms | 60.3MB |
| 테스트 5 | 통과 | 95.39ms  | 56.7MB |

| 단계      | 시작 시각           | 끝난 시각           | 걸린 시간 |
| --------- | ------------------- | ------------------- | --------- |
| 코딩      | 2023-11-14 18:35:43 | 2023-11-14 18:45:30 |           |

```js
function solution(participant, completion) {
    participant.sort();
    completion.sort();
    
    for (let i = 0; i < participant.length; i += 1) {
        if (participant[i] !== completion[i]) return participant[i];
    }
}
```

### 아이디어 & 풀이

* 두 배열을 모두 정렬한 뒤 순차적을 비교하면서 이름이 다를 경우 해당 참가자 이름을 출력한다.

## 참고 답안 1

정확성 테스트

| 테스트   | 통과 | 시간   | 메모리 |
| -------- | ---  | ------ | ------ |
| 테스트 1 | 통과 | 0.07ms | 33.5MB |
| 테스트 2 | 통과 | 0.11ms | 33.5MB |
| 테스트 3 | 통과 | 0.35ms | 33.7MB |
| 테스트 4 | 통과 | 0.63ms | 33.9MB |
| 테스트 5 | 통과 | 0.46ms | 33.8MB |
| 테스트 6 | 통과 | 0.06ms | 33.6MB |
| 테스트 7 | 통과 | 0.07ms | 33.4MB |

효율성 테스트

| 테스트   | 통과 | 시간    | 메모리 |
| -------- | ---- | ------  | ------ |
| 테스트 1 | 통과 | 29.83ms | 54.4MB |
| 테스트 2 | 통과 | 31.20ms | 62.4MB |
| 테스트 3 | 통과 | 34.54ms | 67.2MB |
| 테스트 4 | 통과 | 34.92ms | 67.3MB |
| 테스트 5 | 통과 | 27.92ms | 63.4MB |

```js
function solution(participant, completion) {
    const map = new Map();

    for (let i = 0; i < participant.length; i += 1) {
        map.set(participant[i], (map.get(participant[i]) || 0) + 1);
        map.set(completion[i], (map.get(completion[i]) || 0) - 1);
    }

    for (let [name, count] of map) {
        if (count > 0) return name;
    }
}
```

### 아이디어 & 풀이

`participant`와 `completion`을 순회하면서 선수 이름을 key, 해당 이름을 갖는 선수의 count를 value로 한 map을 구성한다. 특정 이름에 대해 `participant`의 경우 count를 1 증가시키고, `completion`은 반대로 1 감소시키면 결과적으로 완주하지 못한 선수의 count 값만 1이 남게 된다.

* `get` 메소드를 이용해서는 해당 이름을 갖는 선수의 count를 가져온다.
    * 해당 선수의 이름이 처음 등장해서 아직 값이 존재하지 않을 때는 `undefined`가 반횐되므로 `|| 0`을 추가로 덧붙여 존재하지 않을 때는 count의 값이 0이 되도록 한다.
* `set`을 이용해 위에서 가져온 count에 1을 더하거나 뺀 값을 을 해당 이름의 value 값으로 다시 지정한다.
* `participant`와 `completion`을 모두 순회하면 구성한 `map`을 순회하면서 count 값이 1인 value의 key 값을 반환한다.

## 참고 답안 2

정확성 테스트

| 테스트   | 통과 | 시간   | 메모리 |
| -------- | ---  | ------ | ------ |
| 테스트 1 | 통과 | 0.08ms | 33.5MB |
| 테스트 2 | 통과 | 0.15ms | 33.6MB |
| 테스트 3 | 통과 | 0.26ms | 33.7MB |
| 테스트 4 | 통과 | 0.37ms | 33.7MB |
| 테스트 5 | 통과 | 0.37ms | 33.7MB |
| 테스트 6 | 통과 | 0.05ms | 33.6MB |
| 테스트 7 | 통과 | 0.06ms | 33.5MB |

효율성 테스트

| 테스트   | 통과 | 시간    | 메모리 |
| -------- | ---- | ------  | ------ |
| 테스트 1 | 통과 | 14.76ms | 53.4MB |
| 테스트 2 | 통과 | 19.54ms | 54.8MB |
| 테스트 3 | 통과 | 20.97ms | 59.7MB |
| 테스트 4 | 통과 | 27.74ms | 67.9MB |
| 테스트 5 | 통과 | 32.19ms | 67.6MB |

```js
function solution(participant, completion) {
    const dict = completion.reduce((obj, t) => ((obj[t] = (obj[t] || 0) + 1), obj), {});
    return participant.find((name) => !dict[name]--);
}
```

### 아이디어 & 풀이

선수 이름을 key, 해당 이름을 갖는 선수의 count를 value로 한 객체를 구성해 `particilant`를 순회하면서 count를 감소 시키는 원리는 위와 동일하다.

* `completion`을 `reduce`로 재구성해서 선수 이름을 key, 해당 이름을 갖는 선수의 count를 value로 하는 객체를 만든다.
* `find`를 이용해 `participant`를 순회하면서 객체의 count 값을 감소시키고 동시에 감소시킨 결과값이 falsy(i.e., 0)가 아닌 값을 반환한다.
