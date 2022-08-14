---
layout  : article
title   : 21-23. 함수
summary : 
date    : 2020-05-04 23:52:42 +0900
updated : 2020-05-05 17:59:10 +0900
tag     : draf1
toc     : true
public  : true
parent  : [[/javascript/opent-web2-js]]
latex   : false
---
* TOC
{:toc}

> 이 글은 생활코딩의 [함수 예고](https://opentutorials.org/course/3085/18882), [함수](https://opentutorials.org/course/3085/18851), [함수의 활용](https://opentutorials.org/course/3085/18883) 강의내용을 복습하기 위해 강의 자료를 기반으로 작성한 글입니다.
>
> * 제가 필요한 부분 위주로 확인하면서 정리하고 있어 글에 덜 작성된 부분이 있을 수 있습니다.
> * 글 작성 후 원 강의의 내용이 수정되거나 내용을 이해하기 위한 개인적인 설명이나 해석이 있을 수 있습니다. 되도록 원 강의를 참고해주시길 바랍니다.
> * 잘못된 부분이 있다면 댓글이나 그 외 편하신 방법으로 알려주시면 감사하겠습니다.

## 21. 함수 예고

함수: 많아지고 복잡해진 코드를 정리정돈하는 용도

동일한 JavaScript를 실행하는 버튼이 많아지면 해당 JavaScript를 모든 버튼에서 동일하게 유지하거나 일괄적으로 수정하기 어렵다. → 중복된 JavaScript 코드를 함수로 만들어서 실행.

함수는 다음과 같이 정의한 뒤 사용할 수 있다.

* 세부적인 사항은 이후 강의에서 설명

```js
/* 함수를 정의 */
/* 이전에 onclick의 속성 값으로 입력했던 코드를 잘라내서 붙여 넣는다*/ 
function nightDayHandler (self) {
    var target = document.querySelector('body')

    if(self.value === night) {
        target.style.backgroundColor = 'black';
        target.style.color = 'white';
        self.value = 'day'
    }

    var alist = document.querySelectorAll('a');

    var i = 0;
    while(i < alist.length) {
        alist[i].style.color = 'powderblue';
        i = i + 1;
    }

    /* day인 경우에 대해서도 작성 */
    else {...}
}
```

```html
<!-- 함수를 호출 -->
<input id = "night_day" type = "button" value = "night"
    onclick = "nightDayHandler(this);">
```

함수를 사용하면 다음과 같은 이점이 있다.

* 반복되는 코드의 양을 줄일 수 있다.
* 동일한 기능에 대해서 동일한 코드를 유지할 수 있다.
* 반복되는 기능을 일괄적으로 수정하기에 용이하다.
* 함수 이름을 지정하면 기능을 직관적으로 파악하기 쉽다.

## 22. 함수

### 함수의 기본

함수는 사용하기 위한 문법을 보면,

```js
/* 함수를 정의 */
/* function 함수명의 형태로 적은 뒤 {}안에 코드를 입력 */
function two() {
    document.write('<li>2-1</li>')
    document.write('<li>2-2</li>')
}

/* 함수 호출(사용) */
document.write('<li>1</li>');
/* list 2-1, 2-2를 출력 */
two();
document.write('<li>3</li>');
/* list 2-1, 2-2를 다시 출력 */
two();
```

### 매개변수(parameter)와 인자(argument)

함수는 입력에 따라 출력을 내어준다는 것에서 자판기와 비슷한다. 함수는 인자(argument)를 매개변수(parameter)로 입력 받아서 결과값(result) 내어준다.

이전까지는 별도의 입력값 없이 함수를 실행

```js
/* 1 + 1 만 수행해서 2를 출력하는 함수 */
function onePlusOne() {
    document.write(1 + 1);
}

/* 함수 실행 */
onePlusOne();
```

매개변수를 이용하면 값을 직접 입력해서 더한 결과를 출력할 수 있다.

```js
/* 더하고 싶은 두 수를 left, right라는 매개변수로 가져오는 함수 */
function sum(left, right) {
    /* left와 right를 더한 값을 출력 */
    document.write(left + right);
}

/* 2와 3을 더하는 함수. 5출력 */
/* 함수 호출시 함수로 전달하는 값을 인자라고 한다 */
sum(2, 3);

/* 3과 4를 더하는 함수. 7출력 */
sum(3, 4);
```

더한 결과를 '출력'만 하지 않고 다양한 방법을 사용하고 싶으면 `return`을 이용해서 함수가 결과 값을 대변할 수 있게 한다.

```js
function sum2(left, right) {
    /* left + right를 출력하지 않고 return */
    return left + right;
}

/* sum2(left,right)를 left + right의 표현식처럼 사용할 수 있다 */

/* 5(=2 + 3)를 출력 */
document.write(sum2(2, 3))
/* 5에 <div>태그로 효과를 주면서 출력 */
document.write('<div style = "color: red;">' + sum2(2, 3) + '</div>')
```

`return`이 없다면 예시같이 새로운 기능을 따로 쓰고싶을 때 마다 함수를 새로 정의해야 한다.

## 23. 함수의 활용

함수를 이용해서 night & day handler 리팩토링 할 수 있다.

1. 적절한 이름을 사용해서 함수를 정의한다.

   ```js
   function nightDayHanler() {}
   ```

2. 함수로 만들고 싶은 코드(`onclick`의 속성값)를 함수 내에 붙여넣는다.
   * 코드의 this는 현재 코드가 속해있는 요소를 가리킨다.
   * `onclick`의 속성값으로 있을 때는 `this`가 버튼을 가리켰으나 따로 빼서 함수를 만들면 더 이상 버튼을 가리키지 않는다.

   ```js
   /* this대신 매개변수 self를 받아 사용하고 */
   function nightDayHandler (self) {
       var target = document.querySelector('body')
   
       if(self.value === night) {
           target.style.backgroundColor = 'black';
           target.style.color = 'white';
           self.value = 'day'
       }
   
       var alist = document.querySelectorAll('a');
   
       var i = 0;
       while(i < alist.length) {
           alist[i].style.color = 'powderblue';
           i = i + 1;
       }
   
       /* day인 경우에 대해서도 동일하게 작성 */
       else {...}
   }
   ```

   ```html
   <!-- 버튼에서 함수를 호출하면서 this를 매개변수의 인자로 보내면 해결 가능하다 -->
   <input type = "button" value = "night" onclick = "nightDayHandler(this);"
   ```
