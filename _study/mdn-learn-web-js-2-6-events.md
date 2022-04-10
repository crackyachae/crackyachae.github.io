---
layout  : article
title   : 이벤트 소개 (Introduction to events)
summary : 
date    : 2021-12-08 12:47:42 +0900
updated : 2021-12-09 01:32:32 +0900
tag     : draft
toc     : true
public  : true
parent  : [[mdn-learn-web-js]]
latex   : false
---
* TOC
{:toc}

> 이 글은 MDN Learn web development의 [JavaScript building blocks](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks) 중 [Introduction to events](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Events)의 내용을 번역 및 정리한 글입니다.
>
> * 제가 필요한 부분 위주로 확인하면서 정리하고 있어 글에 덜 작성된 부분이 있을 수 있습니다.
> * 글 작성 후 원문의 내용이 수정되거나 내용을 이해하기 위한 개인적인 설명이나 해석이 있을 수 있습니다. 되도록 원문을 참고해주시길 바랍니다.
> * 잘못된 부분이 있다면 댓글이나 그 외 편하신 방법으로 알려주시면 감사하겠습니다.

## 일련의 운 좋은 사건들 (A series of fortunate events)

**이벤트(events)**란 지금 프로그래밍하고 있는 시스템에서 일어나는 행위(actions)나 사건(occurrences)이다 — 시스템은 이벤트가 발생할 때 몇몇 종류의 신호를 만들(produce)고 (또는 "촉발(fire)" 시키고), 그 이벤트가 발생할 때 어떤 행위가 자동으로 발생할 수 있는 (즉, 일부 코드가 실행되는) 메커니즘을 제공한다.

웹의 경우, 이벤트는 브라우저 창 안에서 발생하고, 그 안의 특정 항목에 붙어(attached)있는 경향이 있다. 이것은 한 개의 요소일 수도, 요소의 집합일 수도, 현재 탭에서 불러오는 HTML 문서일 수도, 브라우저 창 전체일 수도 있다. 발생하는 이벤트의 유형은 다양하다.

예를 들어:

* 사용자가 특정 요소를 선택하거나 특정 요소 위에 커서를 올려둔다(hover).
* 사용자가 키보드에서 키를 선택한다.
* 사용자가 브라우저 창의 크기를 조절하거나 창을 닫는다.
* 웹 페이지의 로딩이 끝난다.
* 양식(form)이 제출된다.
* 비디오가 재생되거나, 멈추거나, 혹은 끝난다.
* 오류가 발생한다.

여기에서 (그리고 MDN [이벤트 참조](https://developer.mozilla.org/en-US/docs/Web/Events) 문서를 보는 것에서) 발생할 수 있는 이벤트의 종류가 많다는 것을 알 수 있다.

이벤트에 반응하려면 이벤트에 **이벤트 핸들러(event handler)**를 부착해야 한다.

* 이벤트 핸들러는 이벤트가 발생했을 때 실행되는 (주로 프로그래머가 만든 자바스크립트 함수인) 코드 블록이다.
* 이런 코드 블록이 이벤트에 반응해서 실행되도록 정의할 때, 이를 **이벤트 핸들러를 등록한다**고 한다.

> Note: 이벤트 핸들러는 종종 **이벤트 리스너(event listeners)** 라고도 한다 - 엄밀히 하면 이 둘은 함께 작동하는 것이지만 목적을 위해서는 거의 혼용해서 사용할 수 있다(interchangeable). 리스너는 발생한 이벤트를 수신하고, 핸들러는 발생한 이벤트에 반응해서 실행되는 코드이다.

### 간단한 예제 (A simple example)

### 이건 그냥 웹 페이지가 아니다 (It's not just web pages)

이벤트는 자바스크립트의 특징이 아니다 - 대부분의 프로그래밍 언어는 일종의 이벤트 모델을 갖고 있으며, 이 모델들은 종종 자바스크립트와는 다른 방식으로 작동한다. 사실, 웹 페이지를 위한 자바스크립트의 이벤트 모델은 다른 환경에서 쓰이는 자바스크립트의 이벤트 모델과도 다르다.

예를 들어,

Node.js는 개발자가 자바스크립트를 사용해 네트워크와 서버 측 애플리케이션을 만들(build) 수 있도록 해주는 매우 유명한 자바스크립트 런타임이다.

* Node.js 이벤트 모델은 이벤트를 수신하는 리스너(listener)와 이벤트를 주기적으로 송신하는 이미터(emitter)에 의존한다
* (웹 브라우저와) 그렇게 달라 보이지는 않지만, 코드는 꽤 다르며,
    * 이벤트 리스너를 등록하기 위해서는 `on()`과 같은 함수를,
    * 한 번 실행된 후에 등록을 해제하는 이벤트 리스너를 등록하기 위해서는 `once()`와 같은 함수를 사용한다.
* [HTTP 연결 이벤트 문서](https://nodejs.org/docs/latest-v12.x/api/http.html#http_event_connect)는 좋은 예제를 제공한다.

WebExtension 이라는 기술을 사용하면 자바스크립트로 크로스 브라우저 애드온(cross-browser add-ons) - 브라우저의 기능을 강화한다 - 을 만들 수도 있다.

* 이벤트 모델은 웹의 이벤트 모델과 비슷하지만, 약간 다르다
* 이벤트 리스너 속성이 camel-case로 적혀있고 (`onmessage` 대신 `onMessage`과 같이),
* 이를 `addListener` 함수와 연결해야 한다.
* [runtime.onMessage](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/runtime/onMessage#examples) 페이지에서 예제를 확인하자.

## addEventListener() 사용하기 (Using addEventListener())

웹 페이지에서 이벤트 핸들러를 추가하기 위한 추천 메커니즘은 `addEventListener()`를 사용하는 것이다:

```js
const btn = document.querySelector('button');

function random(number) {
  return Math.floor(Math.random() * (number+1));
}

btn.addEventListener('click', () => {
  const rndCol = `rgb(${random(255)}, ${random(255)}, ${random(255)})`;
  document.body.style.backgroundColor = rndCol;
});
```

`addEventListener()` 함수 안에는, 두 개의 매개변수를 지정한다: 핸들러를 등록하고 싶은 이벤트의 이름과, 이에 대한 반응으로 실행하고 싶은 핸들러 함수를 구성하는 코드이다.

이것처럼 핸들러 함수를 별개의 이름을 갖는 함수로 만들어도 된다:

```js
const btn = document.querySelector('button');

function random(number) {
  return Math.floor(Math.random() * (number+1));
}

// 핸들러 함수
function changeBackground() {
  const rndCol = `rgb(${random(255)}, ${random(255)}, ${random(255)})`;
  document.body.style.backgroundColor = rndCol;
}

// 핸들러 함수 등록
btn.addEventListener('click', changeBackground);
```

### 다른 이벤트를 수신하기 (Listening for other events)

버튼 요소에서 발생할 수 있는 다른 이벤트도 많다. 경험해보자.

`click` 이벤트를 다음의 다른 값들로 차례로 바꿔보고, 예제에서 그 결과를 관찰해보자:

* focus와 blur — 버튼이 포커스되고 포커스가 해제되었을 때 색상이 바뀐다; 탭 버튼을 눌러 버튼에 포커스를 주고 다시 탭 버튼을 눌러 버튼에서 포커스를 제거해보자. 이들은 종종 양식 필드(form field)가 포커스되어 정보를 기재(fill)하는 것에 대한 정보를 표시하기 위해 사용되거나, 양식 필드에 틀린 값을 적었을 때 에러 메시지를 표시하는 데 사용된다.
* dblclick — 버튼이 더블 클릭 되었을 때만 색상이 바뀐다.
* mouseover와 mouseout — 각각 마우스 포인터가 버튼 위에 올라가 있거나, 버튼에서 벗어났을 때 색상이 바뀐다.

`click`과 같은 일부 이벤트는 대부분의 요소에서 사용할 수 있다. 다른 이벤트들은 좀 더 특정되어있고, 특정 상황에서만 유용하기도 하다: 예를 들어, play 이벤트는 `<video>`와 같은 일부 요소에서만 쓸 수 있다.

### 리스너를 제거하기 (Removing listeners)

`addEventListener()`로 이벤트 핸들러를 추가했다면, `removeEventListener()` 메소드를 이용해 다시 제거할 수 있다.

예를 들어, 이것은 `changeBackground()` 이벤트 핸들러를 제거한다:

```js
btn.removeEventListener('click', changeBackground);
```

이벤트 핸들러는 `AbortSignal`을 `addEventListenr()`에 전달한 뒤 나중에 `AbortSignal`을 소유한 컨트롤러에서 `abort()`를 호출해 제거할 수도 있다.

예를 들어, `AbortSignal`로 제거할 수 있는 이벤트 핸들러를 등록하려면:

```js
const controller = new AbortController();

btn.addEventListener('click', () => {
  const rndCol = `rgb(${random(255)}, ${random(255)}, ${random(255)})`;
  document.body.style.backgroundColor = rndCol;
}, { signal: controller.signal }); // 이 핸들러에 AbortSignal을 전달
```

그러면 위의 코드로 생성된 이벤트 핸들러는 이렇게 제거할 수 있다:

```js
ontroller.abort(); // 이 컨트롤러와 연관된 어떤/모든 이벤트 핸들러를 제거한다
```

작은 프로그램에서는 오래되고 더 쓰지 않는 이벤트 핸들러를 정리(clean up)하는 것이 필수적이지 않지만, 더 크고 복잡한 프로그램에서는, 이걸로 효율성을 향상할 수 있다. 또한, 이벤트 핸들러를 제거하는 기능을 사용하면 다른 상황에서 다른 동작을 수행하는 동일한 버튼을 가질 수 있다. 핸들러를 추가하거나 제거하기만 하면 된다.

### 하나의 이벤트에 여러 리스너를 추가하기 (Adding multiple listeners for a single event)

`addEventListener()`를 한 번 이상 호출하고 서로 다른 핸들러를 제공해 한 개의 이벤트에 여러 처리기를 가질 수 있다.

```js
myElement.addEventListener('click', functionA);
myElement.addEventListener('click', functionB);
```

요소를 클릭했을 때 두 함수 모두 실행될 것이다.

### Learn more

## 다른 이벤트 리스너 메커니즘 (Other event listener mechanisms)

이벤트 핸들러를 등록하는데 `addEventListener()`를 사용하는 것을 추천했다. 이것은 가장 강력한 메소드이고, 복잡한 프로그램으로 확장하기에도 가장 좋다. 그러나, 이벤트 핸들러를 등록하는 다른 두 가지 방법이 더 있다: 이벤트 핸들러 속성과 인라인 이벤트 핸들러.

### 이벤트 핸들러 속성 (Event handler properties)

이벤트를 발생시킬 수 있는 (버튼 같은) 객체도 일반적으로 `on`과 그 뒤에 이벤트 종류(이름으)로 이뤄진 명칭의 속성을 갖는다. 예를 들어, 요소는 `onclick` 프로퍼티를 갖는다. 이것은 *이벤트 핸들러 속성*이라고 한다. 이벤트를 수신하기 위해서, 이 속성에 핸들러 함수를 할당해야 한다.

예를 들어, 임의의 색상 예제를 이렇게 다시 작성할 수 있다:

```js
const btn = document.querySelector('button');

function random(number) {
  return Math.floor(Math.random() * (number+1));
}

btn.onclick = () => {
  const rndCol = `rgb(${random(255)}, ${random(255)}, ${random(255)})`;
  document.body.style.backgroundColor = rndCol;
}
```

또한, 핸들러 속성을 명명된 함수로 설정할 수도 있다:

```js
const btn = document.querySelector('button');

function random(number) {
  return Math.floor(Math.random() * (number+1));
}

function bgChange() {
  const rndCol = `rgb(${random(255)}, ${random(255)}, ${random(255)})`;
  document.body.style.backgroundColor = rndCol;
}

btn.onclick = bgChange;
```

이벤트 핸들러 속성으로는 하나의 이벤트에 둘 이상의 핸들러를 추가할 수 없다. 예를 들어, 하나의 요소에 `addEventListener('click', handler)`는 두 번째 인자로 다른 함수를 지정해 여러 번 호출할 수 있다:

```js
element.addEventListener('click', function1);
element.addEventListener('click', function2);
```

이벤트 핸들러 속성의 경우 속성을 설정한 이후에 속성을 (추가로) 설정하려고 하면 이전의 속성을 덮어쓰기 때문에 위처럼 하지 못한다.

```js
element.onclick = function1;
element.onclick = function2;
```

### 인라인 이벤트 핸들러 - 사용하지 말자 (Inline event handlers — don't use these)

이 방법은 나쁜 관행으로 인식된다. 만약 뭔가를 굉장히 빠르게 해야 할 때 이벤트 핸들러 속성(attribute)을 사용하는게 쉬워 보일 수도 있지만, 그 대상은 빠른 속도로 관리하기 어렵고 비효율적이게 된다.

* 우선, 읽기 어려워지기 때문에 HTML과 자바스크립트를 섞어서 작성하는 것은 좋은 생각이 아니다.
    * 자바스크립트를 별도로 유지하는 것이 좋은 방법이고, 이 경우 이 (하나의) 파일을 여러 HTML 문서에 적용할 수 있다.
* 하나의 (HTML) 파일 안에서도 인라인 이벤트 핸들러는 좋은 방법(idea)이 아니다.
    * 버튼이 한 개라면 괜찮지만, 만약 100개라면? 파일에 100개의 속성을 추가해야 한다; 이 경우 유지보수는 빠르게 악몽처럼 변할 것이다.
    * 자바스크립트를 사용하면 이런 것을 사용해 버튼이 몇 개가 있든 페이지의 모든 버튼에 이벤트 핸들러 함수를 쉽게 추가할 수 있다:

    ```js
    const buttons = document.querySelectorAll('button');

    for (const button of buttons) {
    button.addEventListener('click', bgChange);
    }
    ```

* 마지막으로 많은 일반적인 서버 환경설정에서는 보안상의 이유로 인라인 자바스크립트를 사용할 수 없다.

## 이벤트 객체 (Event objects)

때때로, 이벤트 핸들러 함수 안에서, `event`, `evt`, `e`와 같은 이름으로 지정된 매개 변수를 볼 것이다. 이들은 **이벤트 객체(event object)**라고 불리고, 추가 기능과 정보를 제공하기 위해 자동으로 이벤트 핸들러로 전달된다.

예를 들어, 임의의 색상 예제를 다시 작성해보자:

```js
const btn = document.querySelector('button');

function random(number) {
  return Math.floor(Math.random() * (number+1));
}

function bgChange(e) {
  const rndCol = `rgb(${random(255)}, ${random(255)}, ${random(255)})`;
  e.target.style.backgroundColor = rndCol;
  console.log(e);
}

btn.addEventListener('click', bgChange);
```

여기서, 함수 안에, 이벤트 객체 **e**가 포함되어 있고, 함수 안에서 `e.target` - 버튼 자신의 배경색 스타일을 설정하고 있다는 것을 볼 수 있다. 이벤트 객체의 `target` 속성은 항상 이벤트가 발생한 요소를 가리킨다. 그러므로, 이 예제에서는, 페이지가 아니라 버튼의 임의의 배경색을 설정한다.

> Note: 이벤트 객체의 원하는 어떤 이름을 사용해도 된다 - 이벤트 핸들러 함수 안에서 참조할 수 있는 이름을 선택하면 된다.

`e/evt/event`가 짧고 기억하기 쉽기 때문에 개발자들이 가장 일반적으로 사용한다. 항상 일관적으로 쓰는 것이 좋다 - 스스로에게도, 가능하다면 다른 사람들에게도.

### 그 외 이벤트 객체의 속성들 (Extra properties of event objects)

대부분의 이벤트 객체는 이벤트 객체에서 사용할 수 있는 표준 속성과 메소드 집합을 갖는다; 전체 목록을 보려면 [Event](https://developer.mozilla.org/en-US/docs/Web/API/Event) 참조를 봐보자.

일부 이벤트 객체는 특정 이벤트 유형과 관련된 부가적인 속성을 추가한다. 예를 들어 keydown 이벤트는 사용자가 키를 눌렀을 때 발생한다. 이 이벤트의 객체는 KeyboardEvent로 어떤 키를 눌렀는지 알려주는 `key` 속성을 갖는 특별한 `Event` 객체이다.

```html
<input id="textBox" type="text"></input>
<div id="output"></div>
```

```js
const textBox = document.querySelector("#textBox");
const output = document.querySelector("#output");
textBox.addEventListener('keydown', event => output.textContent = `You pressed "${event.key}".`);
```

텍스트 박스에 입력해보고 결과를 봐보자

## 기본 동작을 방지하기 (Preventing default behavior)

때때로, 이벤트가 기본적으로 수행하는 동작을 방지하고 싶은 상황을 마주할 수도 있다.

가장 일반적인 예시는, 사용자 정의 등록 양식과 같은 웹 양식이다.

* 세부 사항을 기재하고 제출 버튼을 눌렀을 때, 기본(natural) 동작은
* 처리할 데이터가 서버의 특정 페이지로 제출되고,
* 브라우저가 어떤 종류의 "성공 안내(message)" 페이지로 (다른 페이지가 지정되지 않았다면 같은 페이지로) 이동하는 것이다.

문제는 사용자가 데이터를 올바르게 제출하지 않았을 때 발생한다

* 개발자로서, 이것이 서버에 제출되는 것을 막고, 무엇이 잘못되었고 이를 맞게 고치려면 무엇을 해야 하는지 알려주는 오류 메시지를 전달하고 싶을 것이다.
* 일부 브라우저는 자동 양식 데이터 유효성 검사 기능을 제공하지만, 많은 브라우저가 그러지 않기 때문에, 이런 기능에 의존하지 말고 스스로 유효성 검사를 구현하는 것이 좋다.

간단한 예제를 봐보자.

먼저, 사용자에게 성과 이름을 입력하도록 요청하는 간단한 HTML 양식이다:

```html
<form>
  <div>
    <label for="fname">First name: </label>
    <input id="fname" type="text">
  </div>
  <div>
    <label for="lname">Last name: </label>
    <input id="lname" type="text">
  </div>
  <div>
     <input id="submit" type="submit">
  </div>
</form>
<p></p>
```

이제 일부 자바스크립트를 봐보자 - 여기서는 텍스트 필드가 비어 있는지를 확인하는 제출 이벤트(제출 이벤트는 양식이 제출되었을 때 양식에서 발생한다)의 핸들러 안에 매우 간단한 검사를 구현했다.

```js
const form = document.querySelector('form');
const fname = document.getElementById('fname');
const lname = document.getElementById('lname');
const para = document.querySelector('p');

form.onsubmit = function(e) {
  if (fname.value === '' || lname.value === '') {
    e.preventDefault();
    para.textContent = 'You need to fill in both names!';
  }
}
```

* 만약 텍스트 필드가 비어있으면
* 이벤트 객체에서 - 양식 제출을 멈추는 - `preventDefault()`를 호출하고
* 사용자에게 무엇이 잘못됐는지를 알려주는 오류 메시지를 양식 아래의 문단에 표시한다.

## 이벤트 버블링과 캡처링 (Event bubbling and capture)

이벤트 버블링과 캡처링은 브라우저가 중첩된 요소를 대상으로 하는 이벤트를 처리하는 단계(phases)를 설명하는 용어이다.

### 부모 요소에 리스너를 설정하기 (Setting a listener on a parent element)

다음과 같은 웹 페이지를 고려해보자:

```html
<div id="container">
  <button>Click me!</button>
</div>
<pre id="output"></pre>
```

여기에서 버튼은 또 다른 요소, `<div>` 요소 안에 있다. 여기서 `<div>` 요소는 이것이 포함하는 요소의 **부모(parent)** 요소이다. 만약 클릭 이벤트 핸들러를 부모에게 추가하고 버튼을 클릭하면 어떤 일이 발생할까?

```js
const output = document.querySelector('#output');
function handleClick(e) {
  output.textContent += `You clicked on a ${e.currentTarget.tagName} element\n`;
}

const container = document.querySelector('#container');
container.addEventListener('click', handleClick);
```

사용자가 버튼을 클릭했을 때 부모 요소가 클릭 이벤트를 발생시키는 것을 볼 수 있다:

```
You clicked on a DIV element
```

이건 납득할 수 있다: 버튼은 `<div>` 안에 있어, 버튼을 클릭하면 암시적으로 버튼 요소를 안에 포함하고 있는 요소를 클릭하는 것이다.

### 버블링 예제 (Bubbling example)

이벤트 리스너를 버튼*과* 부모 요소 모두에 추가하면 어떻게 될까?

```html
<body>
  <div id="container">
    <button>Click me!</button>
  </div>
  <pre id="output"></pre>
</body>
```

클릭 이벤트 핸들러를 버튼과 그 부모 요소(`<div>`), 그리고 이 둘을 모두 포함하는 `<body>` 요소에 추가해보자:

```js
const output = document.querySelector('#output');
function handleClick(e) {
  output.textContent += `You clicked on a ${e.currentTarget.tagName} element\n`;
}

const container = document.querySelector('#container');
const button = document.querySelector('button');

document.body.addEventListener('click', handleClick);
container.addEventListener('click', handleClick);
button.addEventListener('click', handleClick);
```

사용자가 버튼을 클릭하면 세 요소 모두 클릭 이벤트를 발생시키는 것을 볼 수 있다:

```
You clicked on a BUTTON element
You clicked on a DIV element
You clicked on a BODY element
```

이 경우에서:

* 버튼에서 클릭이 먼저 발생하고
* 다음에 그 부모 요소(`<div>` 요소)에서 클릭이 발생하고
* 다음에 `<div>` 요소의 부모 요소(`<body>` 요소)에서 클릭이 발생한다.

우리는 이를 이벤트가 클릭 된 가장 안쪽의 요소부터 **전달돼 올라(bubbles up)**간다고 얘기(describe)한다.

이런 동작은 유용하지만 예상치 못한 문제를 야기할 수도 있다. 다음 영역에서 이것이 야기할 수 있는 문제를 살펴보고 해결책을 찾을 것이다.

### 비디오 플레이어 예제 (Video player example)

이 예제는 `<video>` 요소가 안에 있는 `<div>`를 보여주고 숨긴다:

```html
<button>Display video</button>

<div class="hidden">
  <video>
    <source src="https://raw.githubusercontent.com/mdn/learning-area/master/javascript/building-blocks/events/rabbit320.mp4" type="video/mp4">
    <source src="https://raw.githubusercontent.com/mdn/learning-area/master/javascript/building-blocks/events/rabbit320.webm" type="video/webm">
    <p>Your browser doesn't support HTML5 video. Here is a <a href="rabbit320.mp4">link to the video</a> instead.</p>
  </video>
</div>
```

`<button>`을 클릭했을 때, `<div>`의 클래스 속성을 `hidden`에서 `showing`으로 바꿔 비디오를 표시한다.

```js
const btn = document.querySelector('button');
const videoBox = document.querySelector('div');

function displayVideo() {
  if(videoBox.getAttribute('class') === 'hidden') {
    videoBox.setAttribute('class','showing');
  }
}

btn.addEventListener('click', displayVideo);
```

그다음 몇몇 `click` 이벤트 핸들러를 추가한다 - 첫 번째는 `<div>`에 두 번째는 `<video>`에 추가한다:

```js
videoBox.addEventListener('click', () => videoBox.setAttribute('class', 'hidden'));

const video = document.querySelector('video');

video.addEventListener('click', () => video.play());
```

이제 비디오 밖의 `<div>` 영역을 선택하면, 박스는 다시 숨겨지고 비디오 자체를 선택하면, 비디오가 재생되기 시작해야 한다.

하지만 문제가 있다 - 지금, 비디오를 선택했을 때 비디오는 재생되기 시작하지만, 동시에 `<div>`도 다시 숨겨지게 된다. 이것은 비디오가 `<div>` 안에 있기 때문이다 - 비디오는 `<div>`의 일부이다 - 그러므로 비디오를 선택하면 실제로 위의 이벤트 핸들러가 *모두* 실행된다.

### 버블링과 캡처링 설명 (Bubbling and capturing explained)

부모 요소를 갖는 요소에서 이벤트가 발생했을 때 (이 경우 `<video>`가 `<div>`를 부모로 갖는다), 최신 브라우저는 세 개의 다른 단계(phase)를 실행한다 - **캡처링(capturing)** 단계 **대상(target)** 단계, **버블링(bubbling)** 단계.

**캡처링** 단계에서는:

* 브라우저가 요소의 가장 바깥쪽 조상(`<html>`)에 캡처링 단계에 대한 `click` 이벤트 핸들러가 등록되어있는지 확인하고, 만약 그렇다면 핸들러를 실행한다.
* 그다음 이벤트가 `<html>` 요소 안의 다음 요소로 이동하고, 같은 일을 하고, 그리고 다음 요소에서, 실제로 선택된 요소의 바로 위 부모 요소에 도달할 때까지 이를 계속 반복한다.

**대상** 단계에서는:

* 브라우저가 `target` 속성이 `click` 이벤트를 위한 이벤트 핸들러가 등록되어있는지 확인하고, 만약 그렇다면 핸들러를 실행한다.
* 그다음, `bubbles` 값이 `true` 이면, 선택한 요소의 바로 위 부모 요소로 이벤트를 전달하고, 그리고 다음 요소에서, `<html>` 요소에 도달할 때까지 이를 계속 반복한다. 반대로, `bubbles` 값이 `false`이면, 이벤트를 대상의 어떤 조상 요소로도 전달하지 않는다.

**버블링** 단계에서는 **캡처링** 단계와 정확히 반대의 일이 발생한다:

* 브라우저가 선택한 요소의 바로 위 부모 조상에 버블링 단계에 대한 `click` 이벤트 핸들러가 등록되어있는지 확인하고, 만약 그렇다면 핸들러를 실행한다.
* 그다음 이벤트가 선택한 요소의 바로 위 부모 조상 요소로 이동하고, 같은 일을 하고, 그리고 다음 요소에서, `<html>` 요소에 도달할 때까지 이를 계속 반복한다.

최근 브라우저에서는 기본적으로 모든 핸들러가 버블링 단계에 대해 등록되어있다. 그러므로 현재 예제에서, 비디오를 선택하면, 이벤트가 `<video>` 요소에서 `<html>` 요소로 다음의 방식을 따라 전달(bubbles)된다:

* `video` 요소의 `click` 핸들러를 찾고 이를 실행해, 비디오가 먼저 재생되기 시작한다.
* 그다음, `videoBox` 요소의 `click` 핸들러를 찾고 이를 실행해, 비디오도 숨겨진다.

### stopPropagation()으로 문제를 고치기 (Fixing the problem with stopPropagation())

비디오 예제에서 봤듯이, 이것은 굉장히 성가신 행동일 수도 있지만, 이걸 막을 방법이 존재한다!

표준 `Event` 객체는 여기에 사용할 수 있는 `stopPropagation()` 이라는 함수를 갖고,

* 이것이 핸들러의 이벤트 객체에서 호출되면,
* 첫 번째 핸들러는 실행되지만,
* 그 위의 요소(chain)로는 이벤트가 전파되지 않아,
* 더는 핸들러가 실행되지 않는다.

그러므로 이전 코드 블록의 두 번째 핸들러 함수를 이처럼 바꿔서 현재 문제를 해결할 수 있다:

```js
video.addEventListener('click', e => {
  e.stopPropagation();
  video.play();
});
```

> Note: 왜 성가시게 캡처링과 버블링 모두를 사용할까? 브라우저들의 호환성이 지금보다 훨씬 좋지 않던 이전 시절에, Netscape는 오직 이벤트 캡처링만을, Internet Explorer는 오직 이벤트 버블링만을 사용했다. W3C가 이 동작을 표준화하고 합의하는 것을 시도하기로 했을 때, 양쪽을 다 포함하는 이 시스템을 선택하게 되었고, 이들이 현대 브라우저에 구현된 것이다.

### 이벤트 위임 (Event delegation)

실제로 버블링은 귀찮기만 한 것이 아니다: 매우 유용할 수도 있다.

특히 버블링은 **이벤트 위임(event delegation)** 이라는 관행을 가능하게 한다.

* 이 관행에서, 사용자가 수많은 자식 요소 중 하나와 상호작용할 때 일부 코드가 실행되기를 원하면,
* 하위 요소에 개별적으로 이벤트 리스너를 설정할 필요 없이 이벤트 리스너를 부모 요소에 설정하고,
* 발생하는 이벤트를 이들의 부모 요소로 전달(bubble up)한다.

사용자가 버튼을 클릭했을 때 페이지 전체의 배경색을 설정하는 첫 번째 예제로 돌아가 보자. 대신, 페이지가 16개의 타일로 나뉘어 있고, 사용자가 각 타일을 클릭했을 때 그 타일을 임의의 색상으로 설정하고 싶다고 가정하자.

HTML은 다음과 같다:

```html
<div id="container">
  <div class="tile"></div>
  <div class="tile"></div>
  <div class="tile"></div>
  <div class="tile"></div>
  <div class="tile"></div>
  <div class="tile"></div>
  <div class="tile"></div>
  <div class="tile"></div>
  <div class="tile"></div>
  <div class="tile"></div>
  <div class="tile"></div>
  <div class="tile"></div>
  <div class="tile"></div>
  <div class="tile"></div>
  <div class="tile"></div>
  <div class="tile"></div>
</div>
```

타일의 크기와 위치를 정하기 위한 약간의 CSS도 작성한다:

```css
.tile {
  height: 100px;
  width: 25%;
  float: left;
}
```

이제 자바스크립트에서 각 타일에 클릭 이벤트 핸들러를 추가할 수도 있다. 하지만 더 간단하고 효율적인 선택지는 클릭 이벤트 핸들러를 부모에 설정하고 그 핸들러가 사용자가 타일을 클릭했을 때도 실행되도록 이벤트 버블링에 의존하는 것이다:

```js
function random(number) {
  return Math.floor(Math.random()*number);
}

function bgChange() {
  const rndCol = `rgb(${random(255)}, ${random(255)}, ${random(255)})`;
  return rndCol;
}

const container = document.querySelector('#container');

container.addEventListener('click', event => event.target.style.backgroundColor = bgChange());
```

> Note: 이 예제에서 이벤트의 대상 요소(즉, 가장 안쪽의 요소)를 얻기 위해 `event.target`을 사용했다. 만약 이 이벤트를 발생시킨 요소(이 경우 컨테이너)에 접근하고 싶다면 `event.currentTarget`을 사용할 수 있다.
