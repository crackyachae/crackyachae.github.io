---
layout  : article
title   : PS 기초 이론 메모
summary : 글이 되기는 부족한 간단한 PS 기초 이론 관련 메모들
date    : 2023-08-16 15:48:47 +0900
updated : 2023-08-16 15:48:47 +0900
tag     : memo
toc     : true
public  : true
parent  : [[/ps-basic]] 
latex   : false
---
* TOC
{:toc}

## JavaScript 입출력

자세한 내용은 [[Javascript로 정리하는 이코테] 0. JavaScript 입력받기 & 풀이 로직 분리](https://gyyeom.tistory.com/109)를 참고

백준에서는 주로 `fs` 모듈의 `readFileSync`를 사용한다.

```js
const fs = require('fs');
let input = fs.readFileSync("/dev/stdin").toString().trim();

console.log(input);
```

* 문제마다 들어오는 입력이 다르므로 위의 `let input = fs.readFileSync("/dev/stdin").toString().trim();` 행을 입력에 맞게 변형해서 사용한다.
    * 예를 들어 여러줄의 입력을 받는 경우 `.trim()` 뒤에 `.split("\n")`을 추가

`readline` 모듈을 사용할 수도 있다.

* 콘솔에서 실시간으로 입력을 받을 때는 `readline` 모듈을 사용하는데 코딩테스트는 대부분 입력 전체가 한 번에 주어지므로 `fs` 모듈보다 복잡하고 느린 `readline` 모듈을 굳이 사용하지 않는다.

```js
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.on('line', function(line) {
  //입력받을 값 처리
  console.log(line);

  rl.close();
}).on("close", function() {
  //문제 풀이 로직
  process.exit();
});
```
