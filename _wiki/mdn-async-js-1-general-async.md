---
layout  : wiki
title   : 1. General Asynchronous Programming Concepts
summary : 
date    : 2020-12-14 23:18:15 +0900
updated : 2020-12-14 23:20:48 +0900
tag     : rough
toc     : true
public  : true
parent  : [[mdn-async-js]]
latex   : false
---
* TOC
{:toc}

> 이 글은 MDN Asynchronous JavaScript Tutorial중 [General asynchronous programming concepts](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Concepts)의 내용을 복습하기위해 핵심 내용을 요약 정리한 글입니다.
>
> 내용을 이해하기 위한 개인적인 설명이나 해석이 있을 수 있기 때문에 되도록 원문을 참고해주시길 바랍니다.
> 잘못된 부분이 있다면 댓글이나 그 외 편하신 방법으로 알려주시면 감사하겠습니다.

## Asynchronous?
+ 기본적으로 프로그램은 straght along하게 실행된다. 한 번에 하나의 일만 수행.
+ 함수 A의 결과에 의존하는 다른 함수 B가 있다면 B는 A가 끝날 때 까지 기다려야하고 그 동안 모든 process가 멈추게 된다.
+ 이는 computor가 multi process core를 갖고있다면 특히 비효율적이며 B가 A를 기다리는 동안 다른 일을 처리하는 것이 훨씬 바람직하다. (표현 체크)

## Blocking code
+ browser가 많은 양의 code를 처리하느라 사용자에게 어떤 control도 되돌려주지 않아 browser가 멈춘 것 같아 보이는 것을 'blocking' (from continuing) 이라고 표현한다.
+ 예를 들어 아래의 코드에서 위의 `for`문이 끝날 때 까지는 아래의 코드가 실행되지 않아 버튼을 눌러도 알림창이 뜨지 않는다.
  ```js
  function expensiveOperation() {
    for(let i = 0; i < 1000000; i++) {
      ctx.fillStyle = 'rgba(0,0,255, 0.2)';
      ctx.beginPath();
      ctx.arc(random(0, canvas.width), random(0, canvas.height), 10, degToRad(0), degToRad(360), false);
      ctx.fill()
    }
  }

  fillBtn.addEventListener('click', expensiveOperation);

  alertBtn.addEventListener('click', () =>
    alert('You clicked me!')
  );
  ```

## Thread
+ Thread는 task를 끝내기 위해 사용할 수 있는 process 한 개를 나타낸다.
+ Blocking과 같은 현상은 기본적으로(traditionally) JS가 single thread이기 때문에 나타난다.
+ 이를 해결하기 위해 일부 process를 다른 thread로 (i.e., worker thread) 분리시켜주는 `Web worker`와 같은 tool이 등장했다.

## Asynchronous code
+ `Web worker`는 몇몇 한계를 갖는다.
+ blocking은 방지할 수 있지만 근본적으로 synchronous하게 코드가 수행되기 때문에 여러 process의 결과에 의존하고 있는 function의 경우 다음 process가 실행되는 시점에 단 하나의 process의 결과라도 부족하면 에러가 발생한다.
+ 이러한 문제를 해결하기 위해 브라우저에서 특정 작업을 비동기적으로 실행할 수 있다. Promises 와 같은 기능을 사용하면 모든 필요한 결과가 도착할 때 까지 다음 operation을 시작하지 않고 기다린다.

## 정리
비동기적 프로그래밍이라는 주제인데 내용 자체는 연쇄적(동기적 ?)으로 프로그래밍을 할 수 있는 방법에 집중하고 있어서 헷갈렸다.

+ 비동기 프로그래밍의 핵심 자체는 blocking 없이 여러 process를 병렬적으로 수행하는 것인데
+ 비동기 프로그래밍과 연관된 API를 사용하면 바로 main process에서 벗어나 수행하게 되어있고 문제를 발생시킬 여지가 별로 없어 자세하게 다루지는 않는 것 같다.
+ 오히려 병렬적으로 process를 수행했을 때 너무 일찍 다음 process가 실행 되는 것이 문제의 여지가 많아 이것에 집중하는 느낌.
+ 즉 main process에서는 벗어나 비동기적으로 진행되지만 벗어난 process 자체는 의존하고 있는 다른 process와 연쇄적(동기적?)으로 진행되어야 하기때문에 이를 가능하게 하는 여러 방법에 초점을 맞춰서 내용이 진행되는 것.
+ 물론 main process 밖으로 넘겨 blocking을 방지하는 내용도 다루고 있음.