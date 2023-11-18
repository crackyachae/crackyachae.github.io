---
layout  : article
title   : Programmers_42842 카펫
summary : 
date    : 2023-11-18 13:58:35 +0900
updated : 2023-11-18 15:16:43 +0900
tag     : ps-js
toc     : true
public  : true
parent  : [[Programmers-Index]]
latex   : false
---
* TOC
{:toc}

> 이 글은 프로그래머스의 [42842번](https://programmers.co.kr/learn/courses/30/lessons/42842) 문제를 JavaScript로 풀이한 것을 모아놓은 글입니다.
>
> 일종의 연습 기록이며 제가 정답을 받은 코드와 참고할만한 다른 코드를 같이 기록합니다. 필요한 경우 코드에 대한 해설을 기록합니다만 코드는 통과했어도 해설은 틀릴 수 있기 때문에 가볍게 참고해주시길 부탁드립니다. 피드백은 편하신 방법으로 자유롭게 주시면 감사하겠습니다.

## 2023.11.18

| 테스트    | 통과 | 시간   | 메모리 |
| --------- | ---- | ------ | ------ |
| 테스트 1  | 통과 | 0.05ms | 33.4MB |
| 테스트 2  | 통과 | 0.04ms | 33.6MB |
| 테스트 3  | 통과 | 0.04ms | 33.6MB |
| 테스트 4  | 통과 | 0.04ms | 33.6MB |
| 테스트 5  | 통과 | 0.04ms | 33.5MB |
| 테스트 6  | 통과 | 0.04ms | 33.5MB |
| 테스트 7  | 통과 | 0.06ms | 33.6MB |
| 테스트 8  | 통과 | 0.04ms | 33.5MB |
| 테스트 9  | 통과 | 0.04ms | 33.5MB |
| 테스트 10 | 통과 | 0.04ms | 33.5MB |
| 테스트 11 | 통과 | 0.04ms | 33.5MB |
| 테스트 12 | 통과 | 0.07ms | 33.6MB |
| 테스트 13 | 통과 | 0.04ms | 33.5MB |

| 단계      | 시작 시각           | 끝난 시각           | 걸린 시간 |
| --------- | ------------------- | ------------------- | --------- |
| 문제 이해 | 2023-11-18 14:00:56 | 2023-11-18 14:01:59 |           |
| 풀이 생각 | 2023-11-18 14:02:01 | 2023-11-18 14:09:30 |           |
| 코딩      | 2023-11-18 14:09:39 | 2023-11-18 14:20:57 |           |

```js
function solution(brown, yellow) {
    // a^2 - ((brown - 4) / 2)a + yellow = 0
    const coeff = (brown - 4) / 2;
    const a = (coeff + (coeff ** 2 - 4 * yellow) ** 0.5) / 2;
    const b = yellow / a;

    return [Math.max(a, b) + 2, Math.min(a, b) + 2];
}
```

### 아이디어 & 풀이

노란색 타일이 이루는 직사각형의 변의 길이를 각각 `a`, `b`라고 하자. 그러면 전체 타일이 이루는 직사각형의 변의 길이는 `a + 2`, `b + 2`이다. 즉,

* 노란색 타일의 개수 `yellow`는 a x b 이다.
* 갈색 타일의 개수 `brown`은 (a + 2) x (b + 2)에서 노란색 타일의 개수 a x b를 뺀 값이다.

이를 이용해 `a`와 `b`를 구하는 과정은 다음과 같다.

* 우선 위의 내용을 식으로 정리하면 다음과 같다.

    $$
    \begin{aligned}
        & (a + 2) \times (b + 2) - a \times b = \text{brown} & \quad \cdots \quad (1) \\
        & a \times b = \text{yellow} & \quad \cdots \quad (2)
    \end{aligned}
    $$

* (1)번 식을 정리하면

    $$
    \begin{aligned}
        & b + 2(a + b) + 4 - ab \\ & = 2(a + b) + 4 = \text{brown}
    \end{aligned}
    $$

* 이고 결과적으로 다음과 같은 두 식을 얻을 수 있다.

    $$
    \begin{aligned}
        & a + b = {\text{brown} - 4 \over 2} & \quad \cdots \quad (1) \\
        & a \times b = \text{yellow} & \quad \cdots \quad (2)
    \end{aligned}
    $$

* 두 식을 연립하면 `a`에 대한 방정식을 구할 수 있다.

    $$
    \begin{aligned}
        & ab = a({\text{brown} - 4 \over 2} - a) = \text{yellow} \\
        & a(a - {\text{brown} - 4 \over 2}) = -\text{yellow} \\
        & a^2 - ({\text{brown} - 4 \over 2})a + \text{yellow} = 0
    \end{aligned}
    $$

* 근의 공식을 이용해서 위 방정식의 해를 구하면 다음과 같이 `a`를 구할 수 있다.

    $$
    a = {({\text{brown} - 4 \over 2}) + \sqrt{({\text{brown} - 4 \over 2})^2 - 4\times\text{yellow}} \over 2}
    $$

* `a`의 값과 (1)번 식 또는 (2)번 식을 이용해서 `b`도 구할 수 있다.

마지막으로 전체 타일의 크기를 큰 변부터 반환해야 하므로

* `max`와 `min` 메소노드를 이용해 `a`와 `b`를 순서에 맞춰 나열한 뒤
* `a`와 `b`는 노란색 타일 영역의 길이이므로 각 값에 2을 더해서 반환하면 된다.

## 참고 답안

| 테스트    | 통과 | 시간   | 메모리 |
| --------- | ---- | ------ | ------ |
| 테스트 1  | 통과 | 0.07ms | 33.5MB |
| 테스트 2  | 통과 | 0.04ms | 33.5MB |
| 테스트 3  | 통과 | 0.21ms | 33.4MB |
| 테스트 4  | 통과 | 0.04ms | 33.4MB |
| 테스트 5  | 통과 | 0.04ms | 33.4MB |
| 테스트 6  | 통과 | 0.15ms | 33.4MB |
| 테스트 7  | 통과 | 0.24ms | 33.5MB |
| 테스트 8  | 통과 | 0.21ms | 33.5MB |
| 테스트 9  | 통과 | 0.20ms | 33.4MB |
| 테스트 10 | 통과 | 0.22ms | 33.5MB |
| 테스트 11 | 통과 | 0.04ms | 33.5MB |
| 테스트 12 | 통과 | 0.04ms | 33.4MB |
| 테스트 13 | 통과 | 0.06ms | 33.4MB |

```js
function solution(brown, yellow) {
    for (let v = 3; v ** 2 <= brown + yellow; v += 1) {
        const h = Math.floor((brown + yellow) / v);
        if ((h - 2) * (v - 2) === yellow) {
            return [h, v];
        }
    }
}
```

### 아이디어 & 풀이

완전 탐색을 이용해 푸는 방법이다.

* 한 변을 최솟값인 3에서 부터 증가시키면서
    * 최솟값에서 증가시키므로 이 변이 상대적으로 길이가 짧은 세로 `v`에 해당한다.
* 전체 타일의 개수(i.e., `brown + yellow`)를 이용해 가로 변 `h`의 길이를 구한 뒤
* 각 변에서 2를 빼 곱한 값이 노란 타일의 개수와 같으면 두 변을 반환한다.
