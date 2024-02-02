---
layout  : article
title   : Programmers_43164 여행경로
summary : 
date    : 2024-01-11 04:02:06 +0900
updated : 2024-02-02 18:48:32 +0900
tag     : ps-js
toc     : true
public  : true
parent  : [[Programmers-Index]]
latex   : false
---
* TOC
{:toc}

> 이 글은 프로그래머스의 [43164번](https://programmers.co.kr/learn/courses/30/lessons/43164) 문제를 자바스크립트(JavaScript)으로 풀이한 것을 모아놓은 글입니다.
>
> 일종의 연습 기록이며 제가 정답을 받은 코드와 참고할만한 다른 코드를 같이 기록합니다. 필요한 경우 코드에 대한 해설을 기록합니다만 코드는 통과했어도 해설은 틀릴 수 있기 때문에 가볍게 참고해주시길 부탁드립니다. 피드백은 편하신 방법으로 자유롭게 주시면 감사하겠습니다.

## 2024.01.11

| 테스트    | 통과 | 시간    | 메모리 |
| --------- | ---- | ------  | ------ |
| 테스트 1  | 통과 | 16.83ms | 37.6MB |
| 테스트 2  | 통과 | 0.17ms  | 33.6MB |
| 테스트 3  | 통과 | 0.27ms  | 33.6MB |
| 테스트 4  | 통과 | 0.18ms  | 33.5MB |

| 단계      | 시작 시각           | 끝난 시각           | 걸린 시간 |
| --------- | ------------------- | ------------------- | --------- |
| 문제 이해 | 2024-01-11 16:10:29 | 2024-01-11 16:12:00 |           |
| 풀이 생각 | 2024-01-11 16:12:03 | 2024-01-11 16:13:37 |           |
| 풀이 생각 | 2024-01-11 20:18:59 | 2024-01-11 20:57:31 |           |
| 코딩      | 2024-01-11 20:58:42 | 2024-01-11 22:01:36 |           |
| 디버그    | 2024-01-11 22:03:56 | 2024-01-11 22:24:53 |           |

```js
function solution(tickets) {
    let answer = ["ICN"];

    // dfs: 경로 탐색
    function dfs(route, ticketCountMap) {
        // 반환 조건: 지나온 공항의 수가 티켓의 수보다 1개 많음
        if (route.length === tickets.length + 1) {
            answer = route;
            return;
        }

        // 새로운 출발지 지정: route의 마지막 원소
        const departure = route[route.length - 1];

        // 해당 출발지의 도착지(arrivalMap)에 대해
        const arrivals = ticketCountMap.get(departure) ?? [];
        arrivals.forEach((ticketCount, arrival, map) => {
            // 아직 티켓을 전부 소진하지 않았으면
            if (ticketCount) {
                // 티켓을 하나 소진하고
                map.set(arrival, map.get(arrival) - 1);
                // route에 해당 목적지를 추가해 dfs를 실행
                dfs([...route, arrival], ticketCountMap);
                // 순회 시에는 영향을 미치면 안되므로 원상복구
                map.set(arrival, map.get(arrival) + 1);
            }
        });
    }

    // 출발지: 해당 출발지에서 도착할 수 있는 도시 배열의 map을 구성
    const ticketMap = new Map([]);
    tickets.forEach(([a, b]) => {
        ticketMap.set(a, [...(ticketMap.get(a) ?? []), b]);
    });

    const ticketCountMap = new Map([]);
    // 각 출발지에 대해
    ticketMap.forEach((value, key) => {
        const arrivalsMap = new Map([]);
        // 도착 공항을 알파벳의 역순으로 순회하면서
        value
            .sort()
            .reverse()
            .forEach((arrival) =>
                // 도착지별 티켓 개수인 arrival map을 구성
                arrivalsMap.set(arrival, (arrivalsMap.get(arrival) ?? 0) + 1)
            );
        // 해당 arrivalMap을 각 출발지에 매핑
        ticketCountMap.set(key, arrivalsMap);
    });

    dfs(answer, ticketCountMap);
    return answer;
}
```

### 아이디어 & 풀이

공항을 모두 방문해야 하므로 `"ICN"`을 출발지점으로 각 티켓을 dfs로 탐색하면서 지나온 경로를 업데이트 한다.

* 방문한 공항의 수가 티켓의 수보다 1개 많아지면 모든 공항을 방문한 것이므로 route를 반환한다.

공항의 방문 여부를 확인하기 위해 `ticketCount` map을 사용한다.

* 일반적인 DFS에서는 방문 여부를 확인하기 위해 boolean 값인 `isVisited`를 사용하지만 이 문제의 경우 출발지와 도착지가 같은 티켓이 여러장 존재할 수 있으므로 각 출발지의 도착지로 갈 수 있는 티켓의 수를 사용하며 티켓이 모두 소진되면 다시 방문하지 않는다.
* 재귀를 진행하면서 `answer`를 `route`로 업데이트 하면 최종 `answer`는 마지막에 조건을 만족한 `route`가 되므로 map을 구성할 때 공항을 알파벳의 역순으로 등록해야 한다.

### 디버그

* `ticketCountMap.get(departure)`시 마지막 departure의 경우 다른 곳으로 도착하는 티켓이 없다면 `arrivals`가 제대로 된 값이 아니게 되어 `arrivals.forEach`에서 런타임 에러가 발생하므로 꼭 별도로 처리를 해주어야 한다.
* 동일한 출발지와 도착지를 갖는 티켓이 중복으로 존재할 수 있다는 것을 고려해야 한다.

### 피드백

* 알파벳 순으로 순회하면서 처음 조건을 만족할 때 아예 해당 값을 반환해버리면 좋을 것 같다.
