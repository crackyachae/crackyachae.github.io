---
layout  : article
title   : "6. DOM (Document Object Model): Node 객체"
summary : 
date    : 2020-07-26 21:09:44 +0900
updated : 2020-07-28 21:44:50 +0900
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

## Node 객체

DOM의 최상위에 있는 객체. DOM의 모든 객체는 Node 객체를 상속받는다.

### 주요기능

* 관계: 각 Node 객체 사이의 관계를 부여
    * `Node.childNodes`
    * `Node.firstChild`
    * `Node.lastChild`
    * `Node.nextSibling`
    * `Node.previousSibling`
    * `Node.contains()`
    * `Node.hasChildNodes()`
* 노드의 종류: 각 Node(구성요소)가 어떤 카테고리에 속하는지 알려줌
    * `Node.nodeType`
    * `Node.nodeName`
* 값: Node 객체의 값을 제공
    * `Node.nodeValue`
    * `Node.textContent`
* 자식관리: Node 객체의 자식을 관리(추가 혹은 제거)
    * `Node.appendChild()`
    * `Node.removeChild()`

### Node 관계 API

Node 사이의 관계를 알 수 있는 API

```html
<body id = "start">
    <ul>
    ...
    </ul>
    <script>
    ...
    </script>
</body>
```

```js
var start = document.getElementById('start');
```

#### Node.firstChild

첫 번째 자식노드

```js
start.firstChild // => #text
```

* Text node: 태그 사이에 직접 적힌 text (e.g., `<a>html</a>`의 `html`)

* `<body>` 옆의 공백 또는 줄바꿈 등의 문자 때문에 first child가 text로 나오게 된다.
* `<ul>`을 바로 붙여서 쓰면 first child가 `<ul>`로 표시된다.

#### Node.nextSibling

다음 형제 노드

```js
// body의 첫 자식의 다음 자식을 변수 ul에 담음
start.firstChild.nextSibling // => <ul>
```

* `<body>`의 child node는 바로 옆의 `#text`

* `#text`의 다음 sibling은 `<ul>` element

#### Node.parentNode

부모노드

```js
start.firstChilde.parentNode // => <body>
```

* `#text`의 부모 node

#### Node.childNodes

자식노드들을 유사 배열에 담아서 return

```js
start.childeNodes // => [#text, <ul>, #text, <script>, ...]
```

* 유사배열이므로 index notation이나 `.length()` method를 사용할 수 있다.

### Node 종류 API

선택한 node의 종류를 파악하기 위해 사용하는 API

* 노드의 종류: Node의 종류에 따라 정해진 상수가 존재한다.
  |Node name|Node number|
  |---|---|
  |`ELEMENT_NODE` | 1 |
  |`TEXT_NODE` | 3 |
  |`COMMENT_NODE` | 8 |
* 다음의 코드를 이용해 모두 조회할 수 있다.

  ```js
  for(var name in Node){
     console.log(name, Node[name]);
  }
  ```

#### Node.nodeType

node의 type(종류)를 return한다.

```js
// <body>의 node type은 1: ELEMENT
start.nodeType // => 1

// body의 first child (줄바꿈 문자)의 node type은 3: TEXT
body.firstChild.nodeType // => 3
```

상수 대신 해당되는 type 명칭을 사용할 수 있다.

```js
body.nodeType === 1; // => true
body.nodeType === Node.ELEMENT_NODE // => true
```

#### Node.nodeName

node의 name(이름)을 return한다.

```js
body.nodeName // => BODY
body.firstChild.nodeName // => #text
```

#### 재귀함수를 이용한 Node 조회

```js
/* traverse 함수 */
// target: 탐색하는 root element
// callback: element를 탐색할 때 마다 실행하는 함수
function traverse(target, callback){
    if(target.nodeType === 1){
        callback(target);

        // c: target의 자식 elements
        var c = target.childNodes;
        for(var i=0; i<c.length; i++){
            // 현재 target의 각 자식 element를 다시 인자로 전달
            traverse(c[i], callback);       
        }   
    }
}
// traverse 함수의 target을 start로, callback argument를 하단의 함수로 전달.
traverse(document.getElementById('start'), function(elem){
    /* callback 함수로 전달되는 function*/
    // elem 출력
    console.log(elem);

    // elem중 node name이 A인 <a> element만 배경색을 blue로 출력
    if(elem.nodeName === 'A'){
        elem.style.background = blue;
    }
});
```

### 노드변경 API

노드를 추가, 제거, 변경하는 API

#### 노드 추가

* `appendChild(child)`: Node의 마지막 자식으로 주어진 element 추가.
* `insertBefore(newElement, referenceElemenent)`: appendChilde와 동작 방법은 같지만 두 번째 argument로 전달된 element의 앞에 추가.

노드를 추가하기 위해서는 그 전에 element를 생성해야 한다.

* `document` 객체를 이용한다.
* `document.createElement(tagname)`: element node를 추가.
* `document.createTextNode(data)`: text node를 추가.

```html
<ul id="target">
    <li>HTML</li>
    <li>CSS</li>
</ul>
```

```js
/* appendChild를 이용해서 node를 추가하는 함수 */
function callAppendChild(){
    var target = document.getElementById('target');

    // <li> element 생성
    var li = document.createElement('li');
    // 'JavaScript' text element 생성
    var text = document.createTextNode('JavaScript');
    // <li>의 자식노드로 text를 추가
    li.appendChild(text); // => <li>JavaScript</li>
    // <ul> list의 마지막에 <li>JavaScript</li>를 추가
    target.appendChild(li);
}

/* insertBefore를 이용해서 node를 추가하는 함수 */
function callInsertBefore(){
    var target = document.getElementById('target');
    var li = document.createElement('li');
    var text = document.createTextNode('jQuery');
    li.appendChild(text); // => <li>jQuery</li>

    // target의 firstchild (<ul> 옆의 줄바꿈 문자) 앞에 <li>jQuery</li>를 추가
    target.insertBefore(li, target.firstChild);
}
```

#### 노드 제거

* `removeChild(child)`: Child element를 삭제
    * 제거하려는 대상의 '부모'node의 method로 실행해야한다.
    * 부모 node와 자식 node를 모두 알아야한다는 번거로움이 있다.

```html
<ul>
    <li>HTML</li>
    <li>CSS</li>
    <li id="target">JavaScript</li>
</ul>
```

```js
function callRemoveChild(){
    var target = document.getElementById('target');
    // target의 parent node로 이동한 뒤 자식인 target을 제거
    target.parentNode.removeChild(target);
}
```

#### 노드 변경

* `replaceChild(newchild, oldchild)`: old child를 new child로 교체

```html
<ul>
    <li>HTML</li>
    <li>CSS</li>
    <li id="target">JavaScript</li>
</ul>
```

```js
function callReplaceChild(){
    /* <a> element를 생성 */
    var a = document.createElement('a');
    a.setAttribute('href', 'http://opentutorials.org/module/904/6701');
    a.appendChild(document.createTextNode('Web browser JavaScript'));

    var target = document.getElementById('target');
    // target의 first child인 'JavaScript' text를 a로 바꿈
    // <li>JavaScript</li> -> <li><a href = "...">Web browser JavaScript</a></li>
    target.replaceChild(a,target.firstChild);
}
```

### jQuery 노드 변경 API

주로 manipulation 카테고리에 있는 API를 이용한다.

```html
<!-- before -->
<div id = "target">
  content
</div>>

<div id="source">source</div>
```

#### 노드 추가

* `before`, `prepend`, `append`, `after`를 이용한다.

* 사용하는 API에 따라 노드가 추가되는 위치가 다르다.

```
before

<tag>
  prepend
  **** content ****
  append
</tag>

after
```

Example

```js
$('#target').before('<div>before</div>');
$('#target').after('<div>after</div>');
$('#target').prepend('<div>prepend</div>');
$('#target').append('<div>append</div>');
```

```html
<!-- after -->
<div>before</div>

<div id = "target">
  <div>prepend</div>
  content
  <div>append</div>
</div>>

<div>after</div>

<div id="source">source</div>
```

#### 노드 제거

* `remove`: 선택한 element 자체를 제거.

* `empty`: 선택한 element의 text node를 제거.

```js
/* remove */
$('#target').remove();

/* empty */
$('#target').empty();
```

```html
<!-- after remove -->
id가 target인 <div> element 자체가 제거되기 때문에 아무것도 남지 않음

<!-- after empty -->
<div id = "target">
</div>

<div id="source">source</div>
```

#### 노드 변경

* `replaceAll`: 변경대상을 argument로 전달받아 변경.

* `replaceWith`: 변경대상을 먼저 지정한 뒤 변경.
  
```js
/* replaceAll */
$('<div>replaceAll</div>').replaceAll('#target');

/* replaceWith */
$('#target').replaceWith('<div>replaceWith</div>');
```

```html
<!-- after replaceAll -->
<div>
  replaceAll
</div>

<div id="source">source</div>

<!-- after replaceWith -->
<div>
  replaceWith
</div>

<div id="source">source</div>
```

#### 노드 복사

* `clone`: 전달받은 객체를 복제.

```js
$('#source').clone().replaceAll('#target');
```

```html
<div id="source">source</div>

<!-- after clone and replaceAll -->
<div id = "source">
  source
</div>

<div id="source">source</div>
```

#### 노드 이동

* 노드를 추가할 때 이용한 API를 이동하는데 쓸 수 있다.

* 해당 API들의 argument로 이동시킬 element를 전달하면 된다.

```js
$('#target').append($('#source'));
```

```html
<!-- after append -->
<div id = "target">
  content
  <div id="source">source</div>
</div>
```

### 문자열로 노드 제어

좀 더 편리하게 node를 조작하는 방법

```html
<ul id="target">
    <li>HTML</li>
    <li>CSS</li>
</ul>
```

```js
var target = document.getElementById('target');
```

#### innerHTML

선택한 node의 자식 node를 읽어오거나 만들 수 있는 API

```js
// <ul>...</ul> 안의 <li> element들을 경고창에 출력
alert(target.innerHTML);

// <ul>...</ul> 안의 <li> element들을 입력한 값으로 바꿈
target.innerHTML = "<li>JavaScript Core</li><li>BOM</li><li>DOM</li>";
```

```html
<!-- after -->
<ul id="target">
    <li>JavaScript Core</li>
    <li>BOM</li>
    <li>DOM</li>
</ul>
```

#### outerHTML

선택한 node를 '포함'해서 자식 node를 읽어오거나 만들 수 있는 API

```js
// <ul>...</ul> element들을 경고창에 출력
alert(target.outerHTML);

// <ul>...</ul> 안의 <li> element들을 입력한 값으로 바꿈
target.outerHTML = "<ol>JavaScript Core><li>BOM</li><li>DOM</li></ol";
```

```html
<!-- after -->
<ol>
    <li>JavaScript Core</li>
    <li>BOM</li>
    <li>DOM</li>
</ol>
```

#### innerText, outerText

선택한 노드의 HTML 태그를 '제외한' 문자열만을 읽어오거나 HTML 코드를 포함한 '문자열'을 추가하는 API

```js
// <ul>...</ul> 안의 <li> element text들을 경고창에 출력
// HTML CSS만 출력
alert(target.innerText);

// <ul>...</ul> 안의 <li> element를 입력한 'text값으로 바꿈
target.innerText = "<li>JavaScript Core</li><li>BOM</li><li>DOM</li>";
```

```html
<!-- after -->
<ul id="target">
  "<li>JavaScript Core</li><li>BOM</li><li>DOM</li>"
</ul>
```

`outerText`는 선택한 노드를 '포함'해서 innerText처럼 동작한다.

#### insertAdjacentHTML

보다 정교하게 문자열로 node를 제어할 때 사용.

node를 추가할 위치를 argument로 지정할 수 있다.

```js
/* beforebegin */
target.insertAdjacentHTML('beforebegin','<h1>Client Side</h1>');
/* afterbegin */
target.insertAdjacentHTML('afterbegin','<li>HTML</li>');
/* beforeend */
target.insertAdjacentHTML('beforeend','<li>JavaScript</li>');
/* afterend */
target.insertAdjacentHTML('afterend','<h1>Server Side</h1>');
```

```html
<!-- before -->
<ul id="target">
  <li>CSS</li>
</ul>

<!-- after -->

<!-- beforebegin -->
<h1>Client Side</h1>
<ul id="target">
  <!-- afterbegin -->
  <li>HTML</li>
  <li>CSS</li>
  <!-- beforeend -->
  <li>JavaScript</li>
</ul>
<!-- afterend -->
<h1>Server Side</h1>
```
