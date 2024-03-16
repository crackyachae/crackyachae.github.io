---
layout  : article
title   : Programmers_42579 베스트앨범
summary : 
date    : 2023-11-16 00:48:11 +0900
updated : 2024-03-14 17:26:59 +0900
tag     : ps-js
toc     : true
public  : true
parent  : [[Programmers-Index]]
latex   : false
---
* TOC
{:toc}

> 이 글은 프로그래머스의 [42579번](https://programmers.co.kr/learn/courses/30/lessons/42579) 문제를 JavaScript로 풀이한 것을 모아놓은 글입니다.
>
> 일종의 연습 기록이며 제가 정답을 받은 코드와 참고할만한 다른 코드를 같이 기록합니다. 필요한 경우 코드에 대한 해설을 기록합니다만 코드는 통과했어도 해설은 틀릴 수 있기 때문에 가볍게 참고해주시길 부탁드립니다. 피드백은 편하신 방법으로 자유롭게 주시면 감사하겠습니다.

## 2023.11.16

| 테스트    | 통과 | 시간   | 메모리 |
| --------  | ---  | ------ | ------ |
| 테스트 1  | 통과 | 0.24ms | 33.4MB |
| 테스트 2  | 통과 | 0.19ms | 33.6MB |
| 테스트 3  | 통과 | 0.15ms | 33.5MB |
| 테스트 4  | 통과 | 0.21ms | 33.4MB |
| 테스트 5  | 통과 | 0.35ms | 33.5MB |
| 테스트 6  | 통과 | 0.31ms | 33.6MB |
| 테스트 7  | 통과 | 0.55ms | 33.4MB |
| 테스트 8  | 통과 | 0.51ms | 33.6MB |
| 테스트 9  | 통과 | 0.16ms | 33.5MB |
| 테스트 10 | 통과 | 0.34ms | 33.5MB |
| 테스트 11 | 통과 | 0.19ms | 33.6MB |
| 테스트 12 | 통과 | 0.29ms | 33.5MB |
| 테스트 13 | 통과 | 0.31ms | 33.4MB |
| 테스트 14 | 통과 | 0.32ms | 33.5MB |
| 테스트 15 | 통과 | 0.17ms | 33.5MB |

| 단계      | 시작 시각 | 끝난 시각 | 걸린 시간 |
| --------- | --------- | --------- | --------- |
| 문제 이해 | 17:12:52  | 17:14:56  |           |
| 풀이 생각 | 17:14:58  | 17:17:21  |           |
| 코딩      | 17:17:22  | 18:01:09  |           |

```js
function solution(genres, plays) {
    const song_list = {};
    const song_count = {};
    const album = [];

    genres.forEach((gen, i) => {
        if (!song_list[gen]) {
            song_list[gen] = [[i, plays[i]]];
            song_count[gen] = plays[i];
        } else {
            song_list[gen].push([i, plays[i]]);
            song_count[gen] += plays[i];
        }
    });

    for (const songs of Object.values(song_list)) {
        songs.sort((a, b) => b[1] - a[1] || a[0] - b[0]).splice(2);
    }

    Object.keys(song_count)
        .sort((a, b) => song_count[b] - song_count[a])
        .forEach((genre) => {
            album.push(...song_list[genre].map((el) => el[0]));
        });

    return album;
}
```

### 아이디어 & 풀이

장르를 key로 해당 장르의 곡 목록(`[고유 번호, 재생 횟수]`) 배열을 값으로 하는 객체와, 각 장르의 총 재생 수를 값으로 하는 객체를 각각 구성한 뒤 이를 이용해 주어진 조건에 맞는 곡 고유 번호 배열을 반환한다.

* `genre`를 순회하면서 곡 목록 객체인 `song_list`와 장르별 총 재생 수 객체인 `song_count`를 구성한다.
* `song_list`의 각 원소는 `[고유 번호, 재생 횟수]` 꼴로 `genre`순회 후에 재생 횟수와 고유 번호에 따라 정렬한 뒤 `splice`를 이용해 세 번째 원소부터는 모두 제거한다.

객체의 `keys()` 메소드를 이용해 장르를 배열을 가져와 이를 `song_count`의 값을 이용해 정렬한 뒤 이를 순회하면서 정렬된 곡 목록의 고유 번호를 `album` 배열에 삽입한다.

* 곡 목록은 `[고유 번호, 재생 횟수]` 꼴이므로 `map`을 이용해 고유 번호만 남긴뒤 이를 spread 연산자를 이용해 한 번에 `album`의 원소로 `push` 한다.

### 피드백

* 고민해서 더 깔끔하게 작성할 수 있을 것 같다.

## 참고 답안

| 테스트    | 통과 | 시간   | 메모리 |
| --------  | ---  | ------ | ------ |
| 테스트 1  | 통과 | 0.25ms | 33.5MB |
| 테스트 2  | 통과 | 0.20ms | 33.4MB |
| 테스트 3  | 통과 | 0.19ms | 33.5MB |
| 테스트 4  | 통과 | 0.11ms | 33.4MB |
| 테스트 5  | 통과 | 0.34ms | 33.6MB |
| 테스트 6  | 통과 | 0.35ms | 33.5MB |
| 테스트 7  | 통과 | 0.30ms | 33.5MB |
| 테스트 8  | 통과 | 0.28ms | 33.5MB |
| 테스트 9  | 통과 | 0.14ms | 33.4MB |
| 테스트 10 | 통과 | 0.34ms | 33.5MB |
| 테스트 11 | 통과 | 0.25ms | 33.5MB |
| 테스트 12 | 통과 | 0.31ms | 33.5MB |
| 테스트 13 | 통과 | 0.52ms | 33.4MB |
| 테스트 14 | 통과 | 0.54ms | 33.5MB |
| 테스트 15 | 통과 | 0.22ms | 33.5MB |

```js
function solution(genres, plays) {
    const song_count = {};
    genres.forEach((genre, i) => {
        song_count[genre] = (song_count[genre] || 0) + plays[i];
    });

    const listed_count = {};
    return genres
        .map((genre, idx) => ({ genre, count: plays[idx], idx }))
        .sort((a, b) => {
            if (a.genre !== b.genre) return song_count[b.genre] - song_count[a.genre];
            if (a.count !== b.count) return b.count - a.count;
            return a.idx - b.idx;
        })
        .filter((song) => {
            if (listed_count[song.genre] >= 2) return false;
            listed_count[song.genre] = (listed_count[song.genre] || 0) + 1;
            return true;
        })
        .map((song) => song.idx);
}
```

### 아이디어 & 풀이

* `genre` 배열을 `{genre, count, idx}` 꼴의 객체를 원소로 갖는 배열로 `map` 한 뒤
* 각 장르별 총 재생 횟수인 `song_count`객체와, 개별 재생 횟수 `count`, 고유번호 `idx`를 사용해 주어진 조건대로 정렬한다.
* 이후 장르별 수록된 곡의 수인 `listed_count` 객체를 사용해 각 장르에서 최대 2곡까지만 필터링 한 뒤
* `{genre, count, idx}` 꼴의 객체에서 다시 고유 번호(`idx`)만 남기도록 `map` 해 결과를 반환한다.
