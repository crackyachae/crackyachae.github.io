---
layout  : article
title   : Programmers_코딩 기초 트레이닝
summary : 
date    : 2023-08-16 22:11:18 +0900
updated : 2023-09-04 22:56:21 +0900
tag     : ps-js
toc     : true
public  : true
parent  : [[/ps-set/basic]]
latex   : true
---
* TOC
{:toc}

> 이 글은 프로그래머스의 [코딩 기초 트레이닝](https://school.programmers.co.kr/learn/challenges/training) 문제를 자바스크립트(JavaScript)으로 풀이한 것을 모아놓은 글입니다.
>
> 일종의 연습 기록이며 제가 정답을 받은 코드와 참고할만한 다른 코드를 같이 기록합니다. 필요한 경우 코드에 대한 해설을 기록합니다만 코드는 통과했어도 해설은 틀릴 수 있기 때문에 가볍게 참고해주시길 부탁드립니다. 피드백은 편하신 방법으로 자유롭게 주시면 감사하겠습니다.
>
> 정렬은 문제번호를 기준으로 되어있으며 문제명으로 검색해서 조회하는 것을 추천드립니다.

## 181878 - 원하는 문자열 찾기

```js
function solution(myString, pat) {
    return +myString.toLowerCase().includes(pat.toLowerCase());
}
```

## 181879 - 길이에 따른 연산

```js
function solution(num_list) {
    return num_list.length >= 11
        ? num_list.reduce((a, c) => a + c)
        : num_list.reduce((a, c) => a * c);
}
```

### 피드백

```js
function solution(num_list) {
    return num_list.reduce((a, c) => (num_list.length >= 11 ? a + c : a * c));
}
```

* 분기점을 `reduce` 안으로 넣으면 코드가 훨씬 간결해지는데 최대 배열의 길이가 짧아서 분기점을 `reduce` 함수 안으로 넣어도 괜찮을 것 같다.

## 181880 - 1로 만들기

```js
function solution(num_list) {
    let count = 0;

    num_list.forEach((n) => {
        while (n !== 1) {
            n = n % 2 ? (n - 1) / 2 : n / 2;
            count += 1;
        }
    });

    return count;
}
```

### 참고 답안

```js
function solution(num_list) {
    return num_list.map((v) => v.toString(2).length - 1).reduce((a, c) => a + c);
}
```

* 문제에서 수행한 연산은 수를 2진수로 바꿨을 때 한 자리수를 없애는 것과 같다.
* 즉, 각 수를 1로 만드는 데 필요한 연산의 횟수는 해당 수를 이진수로 바꿨을 때 이진수의 자리수 - 1이다.
* `map`을 이용해 배열을 각 수를 1로 만드는 데 필요한 연산 수로 변환한 뒤 이를 `reduce`를 이용해 더하면 모든 수를 1로 만들기 위해 필요한 연산의 수를 구할 수 있다.

## 181881 - 조건에 맞게 수열 변환하기 2

```js
function solution(arr) {
    let answer = 0;

    while (arr.length) {
        arr = arr.filter((n) => (n >= 50) ^ n % 2).map((n) => (n >= 50 ? n / 2 : n * 2 + 1));
        answer += 1;
    }

    return answer - 1;
}
```

## 181882 - 조건에 맞게 수열 변환하기 1

```js
function solution(arr) {
    return arr.map((n) => (n >= 50 && !(n % 2) ? n / 2 : n < 50 && n % 2 ? n * 2 : n));
}
```

## 181883 - 수열과 구간 쿼리 1

```js
function solution(arr, queries) {
    queries.forEach(([s, e]) => {
        for (let i = s; i <= e; i += 1) {
            arr[i] += 1;
        }
    });

    return arr;
}
```

## 181884 - n보다 커질 때까지 더하기

```js
function solution(numbers, n) {
    return numbers.reduce((acc, curr) => (acc <= n ? acc + curr : acc));
}
```

* 최대 배열 길이가 길지 않아서 `reduce`를 사용해 끝까지 순회했는데 배열 길이가 길 경우는 `while`문을 사용해서 최댓값을 넘기 전까지만 순회하는 게 나을 것 같다.

## 181885 - 할 일 목록

```js
function solution(todo_list, finished) {
    return todo_list.filter((_, i) => !finished[i]);
}
```

## 181886 - 5명씩

```js
function solution(names) {
    return names.filter((_, i) => !(i % 5));
}
```

## 181887 - 홀수 vs 짝수

```js
function solution(num_list) {
    const oe = [0, 0];
    num_list.forEach((n, i) => {
        oe[i % 2] += n;
    });

    return Math.max(...oe);
}
```

## 181888 - n개 간격의 원소들

```js
function solution(num_list, n) {
    return num_list.filter((_, i) => !(i % n));
}
```

## 181889 - n 번째 원소까지

```js
function solution(num_list, n) {
    return num_list.slice(0, n);
}
```

## 181890 - 왼쪽 오른쪽

```js
function solution(str_list) {
    const lIdx = str_list.indexOf("l");
    const rIdx = str_list.indexOf("r");

    if (lIdx === rIdx) return [];
    if (lIdx < 0) return str_list.slice(rIdx + 1);
    if (rIdx < 0) return str_list.slice(0, lIdx);

    return lIdx < rIdx ? str_list.slice(0, lIdx) : str_list.slice(rIdx + 1);
}
```

### 참고 답안 1

```js
function solution(str_list) {
    for (let i = 0; i < str_list.length; i++) {
        if (str_list[i] === "l") return str_list.slice(0, i);
        if (str_list[i] === "r") return str_list.slice(i + 1);
    }
    return [];
}
```

* 괜히 l과 r의 인덱스를 찾아서 경우를 나누는 것보다 정직하게 순회하면서 l과 r을 만나는 경우에 알맞은 답을 반환하고 순회가 끝날 때까지 조건을 만족하지 못하면 `[]`을 반환하는 게 훨씬 깔끔하고 빠르다.

### 참고 답안 2

```js
function solution(str_list) {
    const i = str_list.findIndex((str) => /l|r/.test(str));

    if (i === -1) return [];
    return str_list[i] === "l" ? str_list.slice(0, i) : str_list.slice(i + 1);
}
```

* 인덱스를 사용하고 싶으면 정규표현식을 사용하면 간단하다.

## 181891 - 순서 바꾸기

```js
function solution(num_list, n) {
    return [...num_list.slice(n), ...num_list.slice(0, n)];
}
```

## 181892 - n 번째 원소부터

```js
function solution(num_list, n) {
    return num_list.slice(n - 1);
}
```

## 181893 - 배열 조각하기

```js
function solution(arr, query) {
    let answer = arr;
    query.forEach((q, i) => {
        answer = i % 2 ? answer.slice(q) : answer.slice(0, q + 1);
    });

    return answer;
}
```

## 181894 - 2의 영역

```js
function solution(arr) {
    const idx = [];
    arr.forEach((n, i) => {
        if (n === 2) {
            idx.push(i);
        }
    });

    return idx.length ? arr.slice(idx[0], idx[idx.length - 1] + 1) : [-1];
}
```

### 참고 답안

```js
function solution(arr) {
    const from = arr.indexOf(2);
    const end = arr.lastIndexOf(2);

    return from === -1 ? [-1] : arr.slice(from, end + 1);
}
```

* `indexOf`는 찾는 첫 번째 원소의 index를 `lastIndexOf`는 마지막 원소의 index를 반환하므로 이를 이용해서 `slice` 하면 된다.
* `lastIndexOf`를 사용하면 뒤에서부터 탐색하므로 모든 원소를 순회하는 것보다 훨씬 효율적이다.

## 181895 - 배열 만들기 3

```js
function solution(arr, intervals) {
    const [[a1, b1], [a2, b2]] = intervals;
    return [...arr.slice(a1, b1 + 1), ...arr.slice(a2, b2 + 1)];
}
```

## 181896 - 첫 번째로 나오는 음수

```js
function solution(num_list) {
    return num_list.findIndex((n) => n < 0);
}
```

## 181897 - 리스트 자르기

```js
function solution(n, slicer, num_list) {
    const [a, b, c] = slicer;

    const start = n === 1 ? 0 : a;
    const end = n === 2 ? num_list.length : b;
    const gap = n === 4 ? c : 1;

    return num_list.slice(start, end + 1).filter((_, i) => !(i % gap));
}
```

### 피드백

각 케이스마다 `slice`한 결과를 각각 반환하는 게 더 깔끔할 수도 있을 것 같다.

```js
function solution(n, slicer, num_list) {
    const [a, b, c] = slicer;

    switch (n) {
        case 1:
            return num_list.slice(0, b + 1);
        case 2:
            return num_list.slice(a);
        case 3:
            return num_list.slice(a, b + 1);
        case 4:
            return num_list.slice(a, b + 1).filter((_, idx) => !(idx % c));
    }
}
```

## 181898 - 가까운 1 찾기

```js
function solution(arr, idx) {
    return arr.findIndex((b, i) => b && i >= idx);
}
```

### 참고 답안

```js
function solution(arr, idx) {
    return arr.indexOf(1, idx);
}
```

* `indexOf` 메소드를 사용했다. 두 번째 인자는 탐색을 시작할 인덱스 값이다.

## 181899 - 카운트 다운

```js
function solution(start_num, end_num) {
    return new Array(start_num - end_num + 1).fill(0).map((_, i) => start_num - i);
}
```

## 181900 - 글자 지우기

```js
function solution(my_string, indices) {
    const strArr = [...my_string];
    indices.forEach((i) => {
        strArr.splice(i, 1, "-");
    });
    return strArr.join("").split("-").join("");
}
```

### 참고 답안

```js
function solution(my_string, indices) {
    return [...my_string].filter((c, i) => !indices.includes(i)).join("");
}
```

* `filter` 메소드를 사용해 인덱스가 `indices`에 포함되어있는지 확인하는 게 훨씬 간결하다.

## 181901 - 배열 만들기 1

```js
function solution(n, k) {
    return new Array(Math.trunc(n / k)).fill(k).map((n, i) => (i + 1) * n);
}
```

## 181902 - 문자 개수 세기

```js
function solution(my_string) {
    const answer = new Array(52).fill(0);
    [...my_string].forEach((c) => {
        const idx = c.charCodeAt(0) - (c.charCodeAt(0) > 90 ? 71 : 65);
        answer[idx] += 1;
    });

    return answer;
}
```

### 참고 답안

```js
function solution(my_string) {
    const alpha = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    const answer = new Array(52).fill(0);

    [...my_string].forEach((c) => {
        answer[alpha.indexOf(c)] += 1;
    });

    return answer;
}
```

## 181903 - qr code

```js
function solution(q, r, code) {
    return [...code].filter((_, i) => i % q === r).join("");
}
```

## 181904 - 세로 읽기

```js
function solution(my_string, m, c) {
    return [...my_string].filter((w, i) => !((i % m) - (c - 1))).join("");
}
```

### 피드백

조건을 `i % m === c - 1`로 적는 게 조금 더 명확한 것 같다.

### 참고 답안

```js
function solution(my_string, m, c) {
    my_string
        .match(new RegExp(`.{${m}}`, "g"))
        .map((v) => v[c - 1])
        .join("");
}
```

* 정규표현식을 이용한 풀이이다.

## 181905 - 문자열 뒤집기

```js
function solution(my_string, s, e) {
    return (
        my_string.slice(0, s) +
        [...my_string.slice(s, e + 1)].reverse().join("") +
        my_string.slice(e + 1)
    );
}
```

## 181906 - 접두사인지 확인하기

```js
function solution(my_string, is_prefix) {
    return Number(my_string.slice(0, is_prefix.length) === is_prefix);
}
```

### 참고 답안

```js
function solution(my_string, is_prefix) {
    return +my_string.startsWith(is_prefix);
}
```

* `startWith` 메소드를 사용했다.

## 181907 - 문자열의 앞의 n글자

```js
function solution(my_string, n) {
    return my_string.slice(0, n);
}
```

## 181908 - 접미사인지 확인하기

```js
function solution(my_string, is_suffix) {
    return Number(my_string.slice(my_string.length - is_suffix.length) === is_suffix);
}
```

### 참고 답안

```js
function solution(my_string, is_suffix) {
    return my_string.endsWith(is_suffix) ? 1 : 0;
}
```

## 181909 - 접미사 배열

```js
function solution(my_string) {
    return Array(my_string.length)
        .fill(my_string)
        .map((str, i) => str.slice(i))
        .sort();
}
```

## 181910 - 문자열의 뒤의 n글자

```js
function solution(my_string, n) {
    return [...my_string].slice(my_string.length - n).join("");
}
```

### 참고 답안

```js
function solution(my_string, n) {
    return my_string.slice(-1 * n);
}
```

## 181911 - 부분 문자열 이어 붙여 문자열 만들기

```js
function solution(my_strings, parts) {
    return my_strings.map((str, i) => str.slice(parts[i][0], parts[i][1] + 1)).join("");
}
```

## 181912 - 배열 만들기 5

```js
function solution(intStrs, k, s, l) {
    return intStrs.map((n) => Number(n.slice(s, s + l))).filter((n) => n > k);
}
```

## 181913 - 문자열 여러 번 뒤집기

```js
function solution(my_string, queries) {
    let ans = my_string;
    queries.forEach(([s, e]) => {
        ans = ans.slice(0, s) + [...ans.slice(s, e + 1)].reverse().join("") + ans.slice(e + 1);
    });

    return ans;
}
```

## 181914 - 9로 나눈 나머지

```js
function solution(number) {
    return [...number].reduce((acc, curr) => acc + Number(curr), 0) % 9;
}
```

## 181915 - 글자 이어 붙여 문자열 만들기

```js
function solution(my_string, index_list) {
    return index_list.map((idx) => my_string[idx]).join("");
}
```

## 181916 - 주사위 게임 3

```js
function solution(a, b, c, d) {
    const set = new Set([a, b, c, d]);
    const arr = [a, b, c, d].sort((a, b) => b - a);

    // 4개 모두 동일 [p, p, p, p]
    if (set.size === 1) {
        return arr[0] * 1111;
    }
    if (set.size === 2) {
        // 3개 동일 [p, p, p, q], [q, p, p, p]
        if (arr[1] === arr[2]) {
            return (10 * arr[1] + (arr[0] + arr[3] - arr[1])) ** 2;
            // 2개씩 동일 [p, p, q, q]
        } else {
            return (arr[1] + arr[2]) * Math.abs(arr[1] - arr[2]);
        }
    }
    // 2개만 동일 [p, p, q, r] [q, p, p, r], [q, r, p, p]
    if (set.size === 3) {
        const arrMulti = arr.reduce((acc, curr) => acc * curr);
        const setMulti = [...set].reduce((acc, curr) => acc * curr);
        const p = arrMulti / setMulti;

        return arrMulti / p ** 2;
    }

    return arr[3];
}
```

### 참고 답안

* [TODO] 추후에 확인해보기.

## 181917 - 간단한 논리 연산

```js
function solution(x1, x2, x3, x4) {
    return (x1 || x2) && (x3 || x4);
}
```

## 181918 - 배열 만들기 4

```js
function solution(arr) {
    const stk = [];
    let i = 0;

    while (i < arr.length) {
        if (stk.length && stk[stk.length - 1] >= arr[i]) {
            stk.pop();
        } else {
            stk.push(arr[i]);
            i += 1;
        }
    }

    return stk;
}
```

## 181919 - 콜라츠 수열 만들기

```js
function solution(n) {
    const answer = [n];
    let x = n;

    while (x !== 1) {
        x = x % 2 ? 3 * x + 1 : x / 2;
        answer.push(x);
    }

    return answer;
}
```

### 참고 답안

```js
function solution(n, arr = []) {
    arr.push(n);

    if (n === 1) return arr;
    if (n % 2 === 0) return solution(n / 2, arr);
    return solution(3 * n + 1, arr);
}
```

* 재귀를 이용한 풀이이다.

## 181920 - 카운트 업

```js
function solution(start_num, end_num) {
    return Array(end_num - start_num + 1)
        .fill(0)
        .map((n, i) => i + start_num);
}
```

## 181921 - 배열 만들기 2

```js
function solution(l, r) {
    const calcL = Math.ceil(l / 5);
    const calcR = Math.floor(r / 5);

    let begin = 2 ** (`${calcL}`.length - 1);
    let end = parseInt(Array(`${calcR}`.length).fill(1).join(""), 2);

    while (Number(begin.toString(2)) < calcL) {
        begin += 1;
    }
    while (Number(end.toString(2)) > calcR) {
        end -= 1;
    }

    if (begin >= end) {
        return [-1];
    }

    return Array(end - begin + 1)
        .fill(0)
        .map((n, i) => Number((i + begin).toString(2)) * 5);
}
```

### 참고 답안

* [TODO] 추후에 확인해보기.

## 181922 - 수열과 구간 쿼리 4

```js
function solution(arr, queries) {
    queries.forEach(([s, e, k]) => {
        for (let i = s; i < e + 1; i += 1) {
            if (!(i % k)) arr[i] += 1;
        }
    });

    return arr;
}
```

## 181923 - 수열과 구간 쿼리 2

```js
function solution(arr, queries) {
    return queries.map(([s, e, k]) => {
        const filtered = arr.slice(s, e + 1).filter((n) => n > k);

        return filtered.length ? Math.min(...filtered) : -1;
    });
}
```

## 181924 - 수열과 구간 쿼리 3

```js
function solution(arr, queries) {
    queries.forEach(([i, j]) => {
        const tmp = arr[i];
        arr[i] = arr[j];
        arr[j] = tmp;
    });

    return arr;
}
```

### 참고 답안

```js
function solution(arr, queries) {
    queries.forEach(([a, b]) => {
        [arr[a], arr[b]] = [arr[b], arr[a]];
    });
    return arr;
}
```

* 구조분해할당을 이용해 swap을 더 간단하게 할 수 있다.

## 181925 - 수 조작하기 2

```js
function solution(numLog) {
    const rev_op = {
        1: "w",
        "-1": "s",
        10: "d",
        "-10": "a",
    };

    return numLog.reduce((acc, curr, i) => (i ? acc + rev_op[`${curr - numLog[i - 1]}`] : ""), "");
}
```

### 참고 답안

```js
function solution(numLog) {
    const convert = {
        1: "w",
        "-1": "s",
        10: "d",
        "-10": "a",
    };

    return numLog
        .slice(1)
        .map((v, i) => {
            return convert[v - numLog[i]];
        })
        .join("");
}
```

* 첫 원소는 `slice`로 제외시킨 후 `map`을 이용해서 변환한 뒤 `join`으로 문자열로 묶는 것이 더 깔끔한 것 같다.

## 181926 - 수 조작하기 1

```js
function solution(n, control) {
    const operation = {
        w: 1,
        s: -1,
        d: 10,
        a: -10,
    };

    [...control].forEach((c) => {
        n += operation[c];
    });

    return n;
}
```

## 181927 - 마지막 두 원소

```js
function solution(num_list) {
    const last = num_list[num_list.length - 1];
    const before = num_list[num_list.length - 2];

    num_list.push(last > before ? last - before : last * 2);

    return num_list;
}
```

### 참고 답안

```js
function solution(num_list) {
    const [a, b] = [...num_list].reverse();
    return [...num_list, a > b ? a - b : a * 2];
}
```

* 불필요한 과정이 많긴 하지만 코드 자체는 깔끔해서 답안을 첨부.

## 181928 - 이어 붙인 수

```js
function solution(num_list) {
    let odd = 0;
    let even = 0;

    num_list.forEach((n) => {
        if (n % 2) {
            odd = odd * 10 + n;
        } else {
            even = even * 10 + n;
        }
    });

    return odd + even;
}
```

### 아이디어 & 풀이

문자열과 숫자 사이의 형변환을 최소화 하기 위해서 숫자를 순서대로 이어붙이는 과정을 기존 수에 10을 곱한 뒤 현재 값을 더하는 것으로 대신했다.

## 181929 - 원소들의 곱과 합

```js
function solution(num_list) {
    const times = num_list.reduce((acc, curr) => acc * curr);
    const sum = num_list.reduce((acc, curr) => acc + curr);

    return times < sum ** 2 ? 1 : 0;
}
```

## 181930 - 주사위 게임 2

```js
function solution(a, b, c) {
    const count = new Set([a, b, c]).size;

    if (count === 1) {
        return (a + b + c) * (a ** 2 + b ** 2 + c ** 2) * (a ** 3 + b ** 3 + c ** 3);
    }
    if (count === 2) {
        return (a + b + c) * (a ** 2 + b ** 2 + c ** 2);
    }

    return a + b + c;
}
```

## 181931 - 등차수열의 특정한 항만 더하기

```js
function solution(a, d, included) {
    return included.reduce((acc, curr, i) => (curr ? acc + a + d * i : acc), 0);
}
```

## 181932 - 코드 처리하기

```js
function solution(code) {
    let mode = 0;
    let ret = "";

    [...code].forEach((c, i) => {
        if (c === "1") {
            mode = Number(!mode);
        } else if (!(mode ^ i % 2)) {
            ret += c;
        }
    });

    return ret === "" ? "EMPTY" : ret;
}
```

## 181933 - flag에 따라 다른 값 반환하기

```js
function solution(a, b, flag) {
    return flag ? a + b : a - b;
}
```

## 181934 - 조건 문자열

```js
function solution(ineq, eq, n, m) {
    if (eq === '=' && n === m) return 1
    if (ineq === '<' && n < m) return 1
    if (ineq === '>' && n > m) return 1
    return 0
}
```

* `n`과 `m`이 같은 경우를 먼저 처리하면 케이스를 한 개 줄일 수 있다.

### 참고 답안 1

```js
const operations = {
    ">=": (n, m) => n >= m,
    "<=": (n, m) => n <= m,
    ">!": (n, m) => n > m,
    "<!": (n, m) => n < m,
};

function solution(ineq, eq, n, m) {
    const op = operations[ineq + eq];
    return Number(op(n, m));
}
```

* 연산 기호를 key로 하고 수행할 비교 연산의 화살표 함수를 value로 하는 객체를 생성해 수행할 연산을 깔끔하게 가져올 수 있다.

### 참고 답안 2

```js
function solution(ineq, eq, n, m) {
    const str = (n + ineq + eq + m).replace("!", "");
    return answer = eval(str) ? 1 : 0;
}
```

* `replace`와 `eval`을 사용해 주어진 연산기호 자체를 수식으로 이용한다.

## 181935 - 홀짝에 따라 다른 값 반환하기

```js
function solution(n) {
    return n % 2 ? ((n + 1) / 2) ** 2 : (n * (n + 1) * (n / 2 + 1)) / 3;
}
```

### 아이디어 & 풀이

자연수의 합과 제곱수의 합의 공식을 사용한다.

$$
\sum_{k=1}^{n} k = n(n+1) / 2 \\
\sum_{k=1}^{n} k^2 = n(n+1)(2n+1) / 6
$$

* n(n은 홀수) 이하의 홀수의 합을 구하는 식은 다음과 같이 구할 수 있다.

    $$
    \sum_{k=1}^{l} 2k - 1 \quad (l = {n + 1 \over 2}) \\
    $$

* 위 식을 계산해서 n이하의 홀수의 합을 n에 관한 식으로 정리하면

    $$
    \sum_{k=1}^{l} 2k - 1 = 2 \sum_{k=1}^{l}k - \sum_{k=1}^{l}1 = 2 \times {l(l+1) \over 2} - l = l^2 = ({n + 1 \over 2})^2
    $$

* 같은 방식으로 n(n은 짝수) 이하의 짝수의 제곱의 합을 n에 관한 식으로 정리하면

    $$
    \sum_{k=1}^{l} (2k)^2 = 4 \sum_{k=1}^{l}k^2 = 4 \times {l(l+1)(2l+1) \over 6} = {2 \over 3} \times ({n\over 2})({n\over 2}+1)(l+1) = ({l \over 3})({l\over 2}+1)(l+1)
    $$

n의 나머지를 확인해서 짝/홀수 여부를 확인한 뒤 각 경우에 따른 계산 값을 반환하면 된다.

## 181936 - 공배수

```js
function solution(number, n, m) {
    return number % n === 0 && number % m === 0 ? 1 : 0;
}
```

### 참고 답안

```js
function solution(number, n, m) {
    return +!(number % n || number % m);
}
```

* `number`가 `n`과 `m`의 공배수일 경우에만 `(number % n || number % m)`의 구문이 `0`을 반환한다.
* 위는 조건과 반대의 결과를 반환하므로 `!`를 사용해서 결과를 뒤집는다.
* 위 과정에서 `0`은 `true`로 `1`은 `false`로 변환되므로 이를 다시 `+`로 숫자로 변환한다.
    * `Number(true) === 1`, `Number(false) === 0` 이다.

## 181937 - n의 배수

```js
function solution(num, n) {
  return num % n ? 0 : 1;
}
```

## 181938 - 두 수의 연산값 비교하기

```js
function solution(a, b) {
    const ab = `${a}${b}`;
    return Math.max(ab, 2 * a * b);
}
```

## 181939 - 더 크게 합치기

```js
function solution(a, b) {
    const str_a = a.toString();
    const str_b = b.toString();

    return Math.max(str_a + str_b, str_b + str_a);
}
```

### 참고 답안

```js
function solution(a, b) {
    return Math.max(Number(`${a}${b}`), Number(`${b}${a}`));
}
```

## 181940 - 문자열 곱하기

```js
function solution(my_string, k) {
    return Array(k).fill(my_string).join("");
}
```

### 참고 답안

```js
function solution(my_string, k) {
    return my_string.repeat(k);
}
```

## 181941 - 문자 리스트를 문자열로 변환하기

```js
function solution(arr) {
    return arr.join("");
}
```

## 181942 - 문자열 섞기

```js
function solution(str1, str2) {
    let answer = "";
    const l = str1.length;

    for (let i = 0; i < l; i += 1) {
        answer += str1[i] + str2[i];
    }

    return answer;
}
```

### 참고 답안

```js
function solution(str1, str2) {
    return [...str1].map((x, i) => x + str2[i]).join("");
}
```

* `map`과 `join`을 이용해서 간결하게 작성한 풀이.

## 181943 - 문자열 겹쳐쓰기

```js
function solution(my_string, overwrite_string, s) {
    let answer = [...my_string];
    const len = overwrite_string.length;

    for (let i = 0; i < len; i += 1) {
        answer[i + s] = overwrite_string[i];
    }

    return answer.join("");
}
```

## 181944 - 홀짝 구분하기

### 문제 풀이에 앞서

181944번 부터 181952번 문제의 답변은 입출력을 위한 템플릿을 제외하고 다음 코드의 `{code}` 부분만 작성합니다.

```js
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let input = [];

rl.on('line', function (line) {
    // 입력받은 line을 적절한 input으로 처리하는 코드.
    // 문제마다 다르므로 참고를 위해 주석으로 작성합니다.
    input = line.split(' ');
}).on('close', function () {
    // {code}
});
```

### 181944 문제 답변

```js
// input = line.split(' ');

n = Number(input[0]);
console.log(`${n} is ${n % 2 ? "odd" : "even"}`);
```

## 181945 - 문자열 돌리기

```js
// input = [line];

str = input[0];
console.log([...str].join("\n"));

```

## 181946 - 문자열 붙여서 출력하기

```js
// input = line.split(' ');

str1 = input[0];
str2 = input[1];
console.log(str1 + str2);

```

## 181947 - 덧셈식 출력하기

```js
// input = line.split(" ");

console.log(`${input[0]} + ${input[1]} = ${Number(input[0]) + Number(input[1])}`);
```

## 181948 - 특수문자 출력하기

```js
console.log("!@#$%^&*(\\'\"<>?:;");
```

## 181949 - 대소문자 바꿔서 출력하기

```js
// input = [line];

str = input[0];
let converted = "";

str.split("").forEach((char) => {
    const upperChar = char.toUpperCase();
    // char is upper
    if (char === upperChar) {
        converted += char.toLowerCase();
        // char is lower
    } else {
        converted += upperChar;
    }
});

console.log(converted);

```

### 참고 답안

```js
// input = [...line];

console.log(
    input.map((char) => (/[a-z]/.test(char) ? char.toUpperCase() : char.toLowerCase())).join("")
);
```

* 대소문자 여부 확인을 정규표현식을 이용해서 했다.
* 로직분리에 삼항연산자를 사용해서 보다 간결하게 작성했다.

## 181950 - 문자열 반복해서 출력하기

```js
// input = line.split(' ');

str = input[0];
n = Number(input[1]);

const strs = Array(n).fill(str).join("");
console.log(strs);
```

## 181951 - a와 b 출력하기

```js
// input = line.split(' ');

console.log(`a = ${input[0]}\nb = ${input[1]}`);
```

## 181952 - 문자열 출력하기

```js
// input = [line];

str = input[0];
console.log(str);
```
