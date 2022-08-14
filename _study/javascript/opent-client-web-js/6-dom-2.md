---
layout  : article
title   : "6. DOM (Document Object Model): HTMLElement, HTMLCollection, jQuery 객체"
summary : 
date    : 2020-06-11 16:17:19 +0900
updated : 2020-07-26 21:34:55 +0900
tag     : draft
toc     : true
public  : true
parent  : [[/javascript/opent-client-web-js]]
latex   : false
---
* TOC
{:toc}

> 이 글은 생활코딩의 [DOM](https://opentutorials.org/course/1375/6655) 강의내용을 복습하기 위해 강의 자료를 기반으로 작성한 글입니다.
>
> * 제가 필요한 부분 위주로 확인하면서 정리하고 있어 글에 덜 작성된 부분이 있을 수 있습니다.
> * 글 작성 후 원 강의의 내용이 수정되거나 내용을 이해하기 위한 개인적인 설명이나 해석이 있을 수 있습니다. 되도록 원 강의를 참고해주시길 바랍니다.
> * 잘못된 부분이 있다면 댓글이나 그 외 편하신 방법으로 알려주시면 감사하겠습니다.

## HTMLElements

`getElements *` 로 얻은 객체가 무엇인지 정확히 알아야 적절한 method나 property를 사용할 수 있다.

`constructor` method를 이용해서 객체에 대한 정보를 얻을 수 있다. (e.g., `countructor.name`: 선택한 객체의 유형명)

```js
var li = document.getElementById('active');
console.log(li.constructor.name); // => HTMLLIElement

var lis = document.getElementsByTagName('li');
console.log(lis.constructor.name); // => HTMLCollection
```

### HTMLElement

`HTMLElement` 객체를 세분화해서 보기.

```js
/* <li id = "list"> element */
var target = document.getElementById('list');
console.log(target.constructor.name); // => HTMLLIElement
 
/* <a id = "anchor"> element */
var target = document.getElementById('anchor');
console.log(target.constructor.name); // => HTMLAnchorElement
 
/* <input type = "button" id = "button"> element */
var target = document.getElementById('button');
console.log(target.constructor.name); // => HTMLInputElement
```

* Element 종류에 따라 반환하는 객체의 종류가 다르다.
* 이는 각 element마다 다른 종류의 속성값을 갖기 때문이다.

각 element 객체의 속성을 확인한 뒤 접근해서 사용할 수 있다.

* e.g., Anchor element: `href` 속성을 갖는다.

  ```js
  var target = document.getElementById('anchor');
  // target.href로 anchor element의 href 속성에 접근
  target.href = ...; 
  ```

각 객체의 속성은 [W3C Recommandation](https://www.w3.org/TR/2003/REC-DOM-Level-2-HTML-20030109/html)에서 확인할 수 있다.

`HTMLLIElement`와 `HTMLAnchorElement`를 보면 `:HTMLElement` 부분을 공통으로 갖는다.

```js
/* HTMLLIElement */
interface HTMLLIElement : HTMLElement {
           attribute DOMString       type;
           attribute long            value;
};

/* HTMLAnchorElement */
interface HTMLAnchorElement : HTMLElement {
           attribute DOMString       accessKey;
                    ... 중략
           attribute DOMString       type;
  void               blur();
  void               focus();
};
```

* 이는 두 객체 모두 `HTMLElement`의 자식객체라는 것을 의미하고 (i.e., `HTMLElement`가 두 객체의 부모객체)

* `HTMLElement`의 property를 공통적으로 갖는다.
* 이를 `HTMLElement`의 property를 '상속'받는다고 표현한다.

### DOM Tree

DOM 객체는 위의 `HTMLElement`객체 처럼 하나의 부모객체에서 여러 개의 자식객체가 뻗어나오는 구조로 되어있다.

이를 DOM Tree라고 한다. (사진 출처: [stanford edu](http://www.stanford.edu/class/cs98si/slides/the-document-object-model.html))

![DOM Tree]( /post-img/opent-client-web-js-6-dom-2/111182778-99921680-85f2-11eb-841f-ec582fc5adc9.png )

* 자식 객체는 부모 객체의 property를 상속받는다.

## HTMLCollection

`HTMLElement`와 다르게 여러 개의 element를 return해야하는 경우에 사용하는 객체

* 목록이 실시간으로 변경된다는 특징을 갖는다.

### Console.group()

Console에 출력할 때 하나의 group으로 묶어서 출력

```js
console.group('before'); // group이름을 'before'로 지정
//group 해서 출력할 코드 내용
var lis = document.genElementsByTagnName('li');
for(var i = 0; i < lis.length, i++) {
  console.log(lis[i]);
}
console.groupEnd());
```

```js
// 두 번째 element의 부모 Node로 가서 두 번째 element를 제거
lis[1].parentNode.removeChild(lis[1]); 
```

* lis를 다시 출력하지 않아도 객체에 바로 반영이 된다.

```js
for(var i = 0; i < lis.length, i++) {
  console.log(lis[i]);
}
```

* 실제로 다시 출력해보면 element가 한 개 줄어든 것을 확인할 수 있다.

## jQuery 객체

jQuery함수를 return한 결과는 'jQuery 객체'이다.

* jQuery 객체는 선택한 element를 처리할 수 있는 property를 가지고 있으며
* 몇 가지 특성이 있다.

### 암시적 반복

* DOM과 다르게 jQuery함수로 선택한 jQuery 객체 element 전체에 반복적으로 method를 실행한다.

* 반복은 값을 설정할 때만 동작하고 가져올 때는 첫 번째 element 값만 가져온다.

```js
// li에 jQuery 객체를 할당
var li = $('li');
// element의 text-decoration 속성값을 underline으로 변경
li.css('text-decoration', 'underline');
```

* 명시하지 않아도 `li`의 모든 element에 대해 css 설정값을 바꾸는 것을 반복한다.

* css는 element의 css 값을 설정하는 method이다.
    * argument가 한 개면 해당 argument 속성의 값을 가져온다.
        * e.g., `li.css('text-decoration')` element의 text-decoration 속성값을 가져온다.
    * argument가 두 개면 첫 argument 속성의 값을 두 번째 argument로 바꾼다.
        * e.g., `li.css('text-decoration', 'underline')` element의 text-decoration 속성값을 underline으로 바꾼다.

### 체이닝 (Chaining)

* jQuery 객체는 그 method의 결과로 다시 jQuery 객체를 반환하기 떄문에

* 선택한 element에 대해 연속적으로 method를 실행할 수 있다.

```js
// element의 color 속성값을 red로 변경한 뒤
// text-decoration 속성값을 underline으로 변경
li.css('color', 'red').css('text-decoration', 'underline');
```

### 조회결과

jQuery 객체는 유사배열의 형태이기 때문에 객체의 각 element에 index로 접근 가능하다.

```js
var li = $('li');
console.log(li[0]) // li중 첫 번째 element 출력
```

jQuery 객체의 element 종류를 조회해보면

```js
for (var i = 0; i < lis.length; i++){
  console.log(li[i].constructor); // => HTMLLIElement
}
```

* 즉 jQuery에 담겨있는 element는 DOM 객체임을 확인할 수 있다.

* jQuery 객체의 element는 DOM 객체기 때문에 jQuery method를 사용할 수 없다.
    * e.g., `li[i].css('color', 'red')` 사용 불가.
* 각 element에 jQuery method를 적용하기 위해서는 element를 다시 jQuery 함수로 이용해 jQuery 객체로 바꿔줘야 한다.
    * e.g., `$(li[i]).css('color', 'red')`
    * 이 예시처럼 DOM 객체를 직접 jQuery 함수의 argument로 넣을 수도 있다.

객체의 element를 `map()`을 이용해서 조회할 수도 있다.

* `map`: jQuery 객체의 element를 한 개씩 순회하면서 넘어간다.

```js
var li = $('li');
li.map(function(index, elem) {
  console.log(index, elem);
  $(elem).css('color', 'red');
})
```

* `function (index, elem)`이 map의 argument로 들어가고 element를 순회할 떄 마다 호출된다.

### jQuery 객체 API

api.jquery.com 사이트에 각 api의 사용 가이드가 나와있다. 필요하거나 중요한 항목이 생겼을 때 참고.
