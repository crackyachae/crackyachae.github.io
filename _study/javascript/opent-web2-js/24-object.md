---
layout  : article
title   : 24-26. 객체
summary : 
date    : 2020-05-05 17:12:58 +0900
updated : 2020-05-05 21:26:19 +0900
tag     : draft
toc     : true
public  : true
parent  : [[/javascript/opent-web2-js]]
latex   : false
---
* TOC
{:toc}

> 이 글은 생활코딩의 [객체 예고](https://opentutorials.org/course/3085/18884), [객체](https://opentutorials.org/course/3085/18853), [객체 활용](https://opentutorials.org/course/3085/18885) 강의내용을 복습하기 위해 강의 자료를 기반으로 작성한 글입니다.
>
> * 제가 필요한 부분 위주로 확인하면서 정리하고 있어 글에 덜 작성된 부분이 있을 수 있습니다.
> * 글 작성 후 원 강의의 내용이 수정되거나 내용을 이해하기 위한 개인적인 설명이나 해석이 있을 수 있습니다. 되도록 원 강의를 참고해주시길 바랍니다.
> * 잘못된 부분이 있다면 댓글이나 그 외 편하신 방법으로 알려주시면 감사하겠습니다.

## 24. 객체 예고

객체의 다면적인 기능 중 '정리정돈'의 역할에 초점을 맞춰서 설명

정리 정돈을 위한 변수, 함수도 그 수가 많아지면 관리가 어렵다. → 객체를 이용하면 연관된 변수와 함수를 하나로 묶어서 관리할 수 있다.

지금까지 만든 `nightDayHandler` 함수를 보면 색상을 바꾸는 모든 코드가 night과 day에서 중복된다.

우선, 함수를 여러개로 분할해서 중복을 줄일 수 있다.

* 함수명이 같으면 가장 아래있는 함수만 실행되기 때문에 함수를 여러개 사용할 때는 이름을 다르게 적어줘야한다.
* 함수명은 함수 기능을 파악할 수 있도록 적는게 좋다.

```js
/* Body의 Color를 매개변수 color로 변경 */
function bodySetColor(color) {
    document.querySelector('body').style.color = color;
}

/* Body의 backgroundColor를 매개변수 color로 변경 */
function bodySetBackgroundColor(color) {
    document.querySelector('body').style.backgroundColor = color;
}

/* 웹 페이지의 모든 <a> link를 매개변수 color로 변경 */
function linksSetColor(color) {
    var alist = document.querySelectorAll('a');

    var i = 0;
    while (i < alist.length) {
        alist[i].style.color = color;
        i = i + 1;
    }
}

/* 본 실행 함수 */
function nightDayHandler(self) {
    if(self.value === night) {
        bodySetBackgroundColor('black');
        bodySetColor('white');
        self.value = 'day';
        linksSetColor('powderblue');
    }
    else {...}
}
```

세 함수끼리 공유하고 있는 항목이 있으면 객체를 이용해서 보다 효율적으로 함수를 구분하고 사용할 수 있다.

예를 들어, 위의 본 실행 함수를 객체를 이용하면 다음과 같이 나타낼 수 있다.

```js
function nightDayHandler(self) {
    if(self.value === night) {
        body.SetBackgroundColor('black');
        body.SetColor('white');
        self.value = 'day';
        links.SetColor('powderblue');
    }
    else {...}
}
```

* 객체를 사용하면 컴퓨터 탐색기의 폴더처럼 공통된 항목으로 묶이는 것들에 접근할 수 있다.
* `.`을 찍어서 나타냈던 항목이 객체와 연관되어 있음을 알 수 있다.

## 25. 객체

### 객체의 쓰기와 읽기

배열이 순서대로 정보를 저장하는 것이라면 객체는 순서 '없이' 정보를 저장하는 수단으로 볼 수 있다. 순서는 없지만 각 항목을 꺼내서 사용할 필요가 있기 때문에 항목마다 '이름표'를 부여한다.

```js
/* {}를 이용해서 객체를 정의 */
/* "이름표" : "항목" 꼴로 작성 */
var coworkers = {
    "programmer" : "egoing",
    "designer" : "leezche"
};
```

객체의 안의 데이터를 이용하기 위해서는 `.` (object access operator)를 이용한다.

```js
/* coworkers 객체 안의 programmer에 해당하는 값: egoing */
document.write("programmer: " + coworkers.programmer);

/* coworkers 객체 안의 designer에 해당하는 값: leezche */
document.write("designer: " + coworkers.designer);
```

객체 안에 데이터를 추가할 수 있다.

```js
/* coworkers 객체 안에 bookkeeper에 대응하는 값으로 duru를 추가 */
coworkers.bookkeeper = "duru";

/* 이름표에 띄어쓰기가 있으면 대괄호를 이용한다 */
coworkers["data scientist"] = "taeho";
```

### 객체와 반복문

반복문을 사용해서 객체 안의 모든 데이터를 확인할 수 있다.

```js
/* key는 객체 안의 이름표를 나타낸다 */
/* 객체 안의 key를 순차적으로 바꿔가면서 {} 안의 코드를 실행 */
for (var key in coworkers) {
    document.write(key + ' : ' + coworkers[key] + '<br>')
}
```

위의 코드를 실행하면 다음과 같이 출력한다.

```
programmer : egoing
designer : leezche 
bookkeeper : duru
data scientist : taeho
```

### Property와 Method

객체에는 모든 데이터 타입 뿐만 아니라 함수도 담을 수 있다. 함수를 정의할 때 현재 함수가 소속되어있는 객체를 `this`로 쓸 수 있다. `this`를 사용하면 소속된 객체의 이름이 바뀌는 경우에도 문제 없이 작동하므로 유용하다.

```js
/* coworkers 객체 안에 이름이 showAll인 함수를 정의 */
coworkers.showAll = function() {
    for (var key in this) {
        document.write(key + ' : ' + this[key] + '<br>')
    }
}

/* 함수를 호출 */
coworkers.showAll();
```

* 위의 코드에서 `showAll`처럼 객체에 소속된 함수를 **method**라고 하고
* `programmer`, `designer`등 객체에 소속된 변수를 **property**라고 한다.

## 26. 객체 활용

1. 각 함수를 적용되는 대상에 따라 다른 객체 안에 정의한다.

   ```js
   var body = {
       setColor: function(color) {
           document.querySelector('body').style.color = color;
       },

       setBackgroundColor: function(color) {
           document.querySelector('body').style.backgroundColor = color;
       }
   }

   var links = {
       setColor: function(color) {
           var alist = document.querySelectorAll('a');

           var i = 0;
           while (i < alist.length) {
               alist[i].style.color = color;
               i = i + 1;
           }
       }
   }
   ```

2. 본 함수에서 객체를 사용하여 함수를 호출한다.

   ```js
   function nightDayHandler(self) {
       if(self.value === night) {
           body.setBackgroundColor('black');
           body.setColor('white');
           self.value = 'day';
           links.setColor('powderblue');
       }
       else {...}
   }
   ```
