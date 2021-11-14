---
layout  : article
title   : 자바스크립트는 무엇인가? (What is JavaScript?)
summary : 
date    : 2021-11-02 16:39:35 +0900
updated : 2021-11-14 15:15:11 +0900
tag     : draft 
toc     : true
public  : true
parent  : [[mdn-js-tutorials-beginners]]
latex   : false
---
* TOC
{:toc}

> 이 글은 MDN Learn web development의 [JavaScript First Step](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/First_steps) 중 [What is JavaScript?](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/First_steps/What_is_JavaScript)의 내용을 번역 및 정리한 글입니다.
>
> * 제가 필요한 부분 위주로 확인하면서 정리하고 있어 글에 덜 작성된 부분이 있을 수 있습니다.
> * 글 작성 후 원문의 내용이 수정되거나 내용을 이해하기 위한 개인적인 설명이나 해석이 있을 수 있습니다. 되도록 원문을 참고해주시길 바랍니다.
> * 잘못된 부분이 있다면 댓글이나 그 외 편하신 방법으로 알려주시면 감사하겠습니다.

JavaScript를 넓게 둘러보면서 JavaScript는 무엇이고, 무엇을 하는지에 대해 알아보자.

## 둘러보기 (A high-level definition)

### 자바스크립트란

자바스크립트는 복잡한 기능을 웹페이지에 구현할 수 있도록 해주는 스크립트 혹은 프로그래밍 언어이다.

* 매 순간 웹 페이지는 단지 앉아서 고정된(static) 정보를 표시하는 것 이상의 것을 수행한다.

복잡한 기능의 예시:

* 적절한 때에 갱신된 내용
* 상호작용적인 지도
* 움직이는 2D/3D 그래픽
* 비디오 주크박스를 스크롤

우리는 위의 기능들에 자바스크립트가 관여했다고 확신(bet)할 수 있다.

### HTML + CSS + JavaScript

자바스크립트는 HTML, CSS와 함께 표준 웹 기술의 마지막(third) 단계로 세 개의 요소는 각각의 위에 유기적으로 구성되어 있다.

간단한 텍스트 레이블을 만드는 과정을 통해 이를 살펴보자.

* 우선 HTML로 마크업을 작성해 텍스트 레이블에 구조와 목적을 부여한다.

    ```html
    <p>Player 1: Chris</p>
    ```

* CSS를 추가해 예쁘게 꾸며준다.

    ```css
    p {
      font-family: 'helvetica neue', helvetica, sans-serif;
      letter-spacing: 1px;
      text-transform: uppercase;
      text-align: center;
      border: 2px solid rgba(0,0,200,0.6);
      background: rgba(0,0,200,0.3);
      color: rgba(0,0,200,0.6);
      box-shadow: 1px 1px 2px rgba(0,0,200,0.4);
      border-radius: 10px;
      padding: 3px 10px;
      display: inline-block;
      cursor:pointer;
    }
    ```

* 마지막으로 약간의 자바스크립트로 동적인 기능을 추가한다.

    ```js
    const para = document.querySelector('p');

    para.addEventListener('click', updateName);

    function updateName() {
      let name = prompt('Enter a new name');
      para.textContent = 'Player 1: ' + name;
    }
    ```

## 실제로 무엇을 할 수 있는가? (So what can it really do?)

### 코어 자바스크립트

클라이언트 사이드(client-side)의 코어(core) 자바스크립트는 다음과 같은 일을 할 수 있게 해주는 프로그래밍 기능들로 구성되어 있다.

위에서 작성한 예시와 함께 살펴보자.

```js
const para = document.querySelector('p');

para.addEventListener('click', updateName);

function updateName() {
  let name = prompt('Enter a new name');
  para.textContent = 'Player 1: ' + name;
}
```

* 변수 안에 값을 저장할 수 있다.

```js
// 새로운 이름을 입력하길 요청한 뒤
// 입력받은 이름을 name이라는 변수에 저장한다.
let name = prompt('Enter a new name');
```

* 프로그래밍에서 '문자열(strings)'이라고 불리는 문자 조각들을 다룰 수 있다.

```js
// "Player 1: " 이라는 문자열을 변수 name과 결합해 "Player 1: Chris"을 만든다.
para.textContent = 'Player 1: ' + name;
```

* 웹 페이지의 특정 이벤트에 반응(response)하는 코드를 작성할 수 있다.

```js
// click 이벤트를 사용해 버튼이 클릭된지 감지하고
// 텍스트 레이블을 갱신하는 코드를 실행한다.
para.addEventListener('click', updateName);

// 텍스트 레이블을 갱신하는 코드
function updateName() {
  // ...
}
```

이외에도 자바스크립트로 더 많은 것들을 할 수 있다.

더 흥미로운 것은, 자바스크립트가 '클라이언트 사이드 위'에서 작성되었을 때 수행할 수 있는 기능들이다. 소위 **Application Programming Interfaces (APIs)**라 불리는 다양한 기능들은 사용자의 코드에 추가적인 강력한 기능을 제공할 수 있다.

### Application Programming Interfaces (API)

* API는 이미 만들어져 특정 기능을 수행하는 코드의 집합체(building block)이다. 이를 사용해 구현하기 어렵거나 불가능한 프로그램들을 간단하게 구현할 수 있다.
* 가구를 만들기 위해서 직접 디자인을 하고, 재료를 구하고, 재단해서 못을 박는 등의 일을 일일이 다 하는 대신, 가구 만들기 키트를 사용하는 것과 같다.

API는 일반적으로 다음의 두 종류로 구분된다.

#### Browser API

웹 브라우저에 설치되어있는 API로, 주변 컴퓨터 환경의 데이터를 드러내고 유용하고 복잡한 일들을 할 수 있도록 해준다.

* **DOM (Document Object Model) API**는 동적으로 페이지의 스타일을 정하는 등 HTML과 CSS를 알맞게 조정할 수 있도록 해준다.
    * 팝업창이 나타나거나 위의 예시처럼 새로운 콘텐츠들이 표시되는 매 순간이 모두 DOM이 행동한 결과라고 볼 수 있다.
* **Geolocation API**는 지리적인 정보를 검색한다.
    * 이는 Google Maps이 위치를 찾고 지도에 표시할 수 있는 이유이다.
* **Canvas와 WebGL API**는 2D와 3D 그래픽을 만들 수 있도록 해준다.
    * 사람들은 이러한 웹 기술을 사용해 다양하고 재미있는 것들을 만들어놓았다 — [Chrome Experiments](https://experiments.withgoogle.com/search?q=WebGL) 와 [webglsamples](https://webglsamples.org)을 봐보자.
* **HTMLMediaElement, WebRTC와 같은 Audio and Video API**는 음악과 비디오를 웹 페이지 상에서 재생하고, 웹캠으로 캡처하고 다른 컴퓨터에 표시하는 등의 멀티미디어를 활용할 수 있는 등의 흥미로운 일들을 할 수 있도록 해준다.

#### Third party API

웹 브라우저에 기본적으로 설치되지 않고 인터넷에서 개인적으로 정보와 코드를 얻어 프로그래밍한 것을 말한다.

* **Twitter API**는 웹 사이트에 가장 최근 트윗을 보여줄 수 있도록 해준다.
* **Google Maps API와 OpenStreetMap API**는 웹 사이트에 원하는 지도를 넣어주고 추가기능을 지원한다.

이외에도 다양한 API들이 존재하지만, 이 강의에서 구체적으로 다루지는 않을 예정이다.

## 웹 페이지에서의 JavaScript (What is JavaScript doing on your page?)

브라우저에서 웹 페이지를 불러올 때 실행 환경(브라우저 탭) 안에서 코드(HTML, CSS, JavaScript)가 실행된다.

* 자바스크립트의 가장 일반적인 용도는 사용자 인터페이스(user interface)를 갱신하기 위해서 DOM(Document Object Model) API를 통해 HTML과 CSS를 수정하는 것이다.
* 위 과정에서 웹 문서의 코드는 페이지에 나타나는 순서대로 로드되어 실행되기 때문에 자바스크립트가 HTML과 CSS보다 먼저 로드되어 실행되면 에러가 발생할 수 있다.

### 브라우저 보안 (Browser security)

각 브라우저 탭들은 코드가 실행되는 개별적인 공간(bucket, 기술적인 용어로는 '실행 환경'이라고 부른다)을 갖는다.

* 이는 대부분의 경우에 각 탭은 완전히 독립적으로 실행되고 한 탭의 코드가 다른 탭이나 웹사이트에 직접 영향을 줄 수 없다는 것을 의미한다.
* 이는 보안 측면에서 안전한 조치로 이러지 않으면 해커들이 다른 웹사이트로부터 정보를 가로채거나 다른 나쁜 짓을 할 수 있다.

> Note: 물론 코드나 정보를 동떨어진 웹사이트나 탭으로 전송할 수 있는 안전한 방식이 존재하지만 지금 과정과는 거리가 멀기 때문에 여기서는 다루지 않는다.

### 자바스크립트 실행 순서 (JavaScript running order)

브라우저가 자바스크립트를 만나면 일반적으로 위에서 아래의 순서로 코드를 실행한다. 이는 코드를 작성할 때 순서에 주의해야 한다는 의미이다.

처음 봤던 자바스크립트 예시로 예를 들어보자.

```js
//HTML 요소 중 p 태그를 선택해 para에 저장
const para = document.querySelector('p');

//para에 저장된 객체가 클릭 되었을 때 updateName 함수를 실행
para.addEventListener('click', updateName);

function updateName() {
  //'Enter a new name'과 입력란 출력하여 입력받은 값을 name에 저장
  let name = prompt('Enter a new name');
  //para(p 태그)에 새로운 문자열 저장
  para.textContent = 'Player 1: ' + name;
}
```

* 먼저 p 태그의 요소를 `para` 변수에 저장한다(1번 줄).
* `para`에 event listener를 붙여(3번 줄)
* p 태그가 클릭되었을 때 `updateName()` 코드 블록(5-8번 줄)이 실행되도록 한다.
* `updateName()` 코드 블록(이렇게 계속 사용할 수 있는 코드 블록을 함수라고 한다)은
    * 사용자에게 새로운 이름을 요청하고
    * 사용자가 입력한 이름을 문단에 넣어 화면의 내용을 갱신한다.

만약 1번 줄과 3번 줄을 바꿨다면 코드는 실행되지 않을 것이다. 대신 브라우저의 개발자 콘솔 창에 다음과 같은 에러가 뜰 것이다.

```
TypeError: para is undefined
```

이는 `para`라는 객체가 아직 정의되지 않았다(존재하지 않는다)는 뜻으로, 존재하지 않는 `para`에는 event listener를 추가할 수 없다.

### 해석형 언어와 컴파일러형 언어 (Interpreted versus compiled code)

프로그래밍의 맥락에서 인터프리터(interpreted)와 컴파일(compiled)이라는 개념은 들어보았을 것이다.

#### 인터프리터 언어(interpreted language)

* 인터프리터 언어는 코드가 위에서 아래로 실행되고, 코드를 실행한 결과가 즉시 반환된다.
* 브라우저에서 코드가 동작하기 전에 코드를 다른 형태로 변형할 필요가 없다.
* 코드가 프로그래머에게 친근한 형태의 문자로 전달되어 이로부터 직접 실행된다.

#### 컴파일 언어 (compiled language)

* 반면에 컴파일 언어는 컴퓨터에서 실행되기 전에 다른 형태로 변환되어야 한다.
* 예를 들면 C/C++과 같은 언어는 기계어(machine code)로 컴파일된 뒤 동작한다.

자바스크립트는 가벼운 인터프리터 언어이다. 웹 브라우저는 자바스크립트 코드를 원래의 문자 형태로 받아 스크립트를 실행한다.

기술적인 관점에서 최근의 자바스크립트 인터프리터는 성능 향상을 위해 **just-in-time compiling** 이라는 기술을 사용한다.

* 스크립트가 사용되는 동안 자바스크립트 소스 코드가 더 빠른 이진(binary) 형태로 컴파일되는 방식으로 코드가 최대한 빠르게 실행된다.
* 하지만 컴파일 과정(compilation)이 런타임(run time)에서 이뤄지기 때문에(미리 이뤄지지 않기 때문에) 자바스크립트는 여전히 인터프리터 언어로 여겨진다.

### 서버 측 코드와 클라이언트 측 코드 (Server-side versus client-side code)

또한 특히 웹 개발의 맥락에서 서버 측(server-side)과 클라이언트(client-side) 측 코드에 대해 들어보았을 것이다.

#### 클라이언트 측 코드

* 클라이언트 측 코드란 '사용자의 컴퓨터'에서 작동하는 코드이다.
* 웹 페이지를 볼 때, 페이지의 클라이언트 측 코드가 사용자의 컴퓨터로 다운로드되어 브라우저가 이를 실행하고 표시한다.
* 이러한 자바스크립트 모듈을 정확히는 **클라이언트 측 자바스크립트(client-side)**라고 한다.

#### 서버 측 코드

* 반면 서버 측 코드는 서버에서 작동되고, 그 '결과'가 다운로드되어 사용자의 브라우저에 표시된다.
* PHP, Python, Ruby, ASP.NET등이 서버 측 웹 언어의 대표적인 예이다.
* 유명한 Node.js란 환경을 통해 자바스크립트 역시 서버 측 언어로 사용할 수 있다.

### 동적과 정적 코드 (Dynamic versus static code)

#### 동적 코드

**동적** 이라는 말은

* 각기 다른 상황에서 웹 페이지/앱의 화면을 갱신하고, 필요한 새로운 콘텐츠를 생성할 수 있는 능력을 말하는 것으로
* 클라이언트 측 자바스크립트와 서버 측 언어 모두를 설명하는 데 쓰인다.
* 서버 측 코드는 서버에서 새로운 콘텐츠를 생성하고
    * e.g. 데이터베이스에서 데이터를 가져오기
* 클라이언트 측 자바스크립트는 클라이언트의 브라우저에 새로운 콘텐츠를 생성한다.
    * e.g. 새로운 HTML 표를 만들어, 서버가 요청한 데이터로 채운 뒤 이를 사용자의 웹 페이지에 표시한다.
* 두 맥락에서 동적의 의미는 미묘한 차이가 있지만, 서로 연관되어 있고, 주로 두 접근법이 함께 동작한다.

#### 정적 코드

콘텐츠가 동적으로 바뀌지 않는 페이지를 **정적**페이지라고 하고 항상 같은 콘텐츠를 보여준다.

## 웹 페이지에 자바스크립트를 넣는 법 (How do you add JavaScript to your page?)

> 본문은 실습 위주로 진행하고 있어서 동작을 직접 확인하고 싶으신 분들은 반드시 본문을 참고해주시기 바랍니다. 이 글에서는 방식만 간단하게 정리합니다.

### HTML 내부의 자바스크립트 (Internal JavaScript)

1. HTML 파일의 `</body>` 태그 직전에 다음의 코드를 추가한다.

    ```html
    <script>

      // JavaScript goes here

    </script>
    ```

1. 원하는 자바스크립트 코드를 `<script></script>` 사이(위의 `// JavaScript goes here`)에 작성하면 해당 코드가 페이지에서 동작한다.

### 외부의 자바스크립트 (External JavaScript)

1. HTML 파일이 있는 디렉토리에 `script.js`라는 자바스크립트 파일을 만든다.
2. 아래의 코드를 HTML 코드에 추가한다.

    ```html
    <!-- script.js를 불러오는 코드 -->
    <script src="script.js"></script>
    ```

3. `script.js` 안에 원하는 자바스크립트 코드를 작성한다.

이 방식은 코드를 구성하기에 좋으며, 여러 HTML 파일에서 재사용할 수 있다. 게다가 거대한 스크립트 본문이 외부로 분리되어 간결해지기 때문에 HTML도 읽기 쉬워진다.

### 인라인 JavaScript 처리기 (Inline JavaScript handlers)

버튼을 클릭할 때마다 함수가 실행되도록 하고 싶을 때 다음과 같이 HTML 코드를 작성할 수 있다.

```html
<button onclick="createParagraph()">Click me!</button>
```

* 자바스크립트 코드인 `createParagraph()` 함수는 `<script>` 태그 안에 작성

하지만 위의 방법은 사용하지 않는 것이 좋다.

* 자바스크립트 코드와 함께 쓰기 때문에 HTML 소스가 더러워지고 비효율적이다.
* 모든 버튼에 각각 `onclick="createParagraph()"` 속성을 포함시켜야 한다.

### 이벤트 리스너의 사용 (Using addEventListener instead)

자바스크립트를 HTML 안에 포함하는 대신 순수하게 자바스크립트만 사용해보자. `addEventListener()` 함수를 사용하면 하나의 명령으로 모든 버튼을 사용(함수를 연결)할 수 있다.

```js
// 모든 <button> 태그를 List 형태로 buttons 변수에 저장
const buttons = document.querySelectorAll('button');

// 복수이기 때문에 for를 사용해 루프를 돌려 // 각 버튼에 함수를 연결한다.
for (let i = 0; i < buttons.length ; i++) {
  buttons[i].addEventListener('click', createParagraph);
}
```

이 코드는 onclick 속성 코드보다 조금 길지만, 페이지 상의 버튼의 개수나, 버튼이 추가되거나 제거되는 것에 상관없이 모든 버튼이 같은 기능을 할 수 있도록 한다.

### 스크립트의 로딩 방법 (Script loading strategies)

작성된 스크립트를 브라우저가 적절한 때에 로딩하는 것에 대해 몇 가지 이슈가 있다.

흔한 문제로 모든 HTML 요소가 순서대로 페이지에 로드된다는 것이다. 자바스크립트를 이용해 페이지의 요소(정확하게는 Document Object Model)를 조작할 때, 자바스크립트 코드가 조작 대상인 HTML 요소보다 '먼저' 로드된다면 코드가 제대로 동작하지 않는다.

실제로 위의 코드 예제중 내부 예제와 외부 예제에서, 자바스크립트는 HTML body가 해석되기 전인 문서의 head 부분에서 로드되고 실행됐다. 이는 에러를 일으킬 수 있고 이를 해결하기 위한 몇 가지 방법이 있다.

#### 내부 자바스크립트 예제

내부 자바스크립트 예제에서는 다음과 같이 구성하면 된다:

```js
document.addEventListener("DOMContentLoaded", function() {
  ...
});
```

* 이 이벤트 리스너는 브라우저의 'DOMContentLoad' 이벤트에 응답한다.
    * 'DOMContentLoad' 이벤트는 HTML body가 완전히 로드되어 해석되었을 때 발생한다.
* 즉 이벤트가 발생하기(HTML body가 모두 로드되기) 전까지는 블록 안의 자바스크립트(함수)가 실행되지 않기 때문에 위의 에러를 피할 수 있다.

#### 외부 자바스크립트 예제

외부 자바스크립트 예제에서는 좀 더 최신의 자바스크립트 기능인 `defer` 속성을 사용해 문제를 해결한다.

* 원래는 HTML 요소를 로딩하다 `<script>` 태그를 만나면 자바스크립트 내용이 모두 실행될 때까지 HTML 로딩이 멈춘다.
* `defer` 속성은 `<script>` 태그에 도달했을 때도 HTML 콘텐츠가 멈추지 않고 다운로드 되도록 유지시킨다.

```html
<script src="script.js" defer></script>
```

위처럼 작성하면 스크립트와 HTML이 동시에 로드되고 작동한다.

> Note: 외부 예제의 경우 `defer` 속성으로 문제를 해결할 수 있기 때문에 `DOMContentLoaded` 이벤트를 사용할 필요가 없다. 하지만 `defer` 속성은 외부 스크립트를 가져올 때만 동작하기 때문에 내부 자바스크립트 예제에서는 `defer`를 사용하지 않았다.

#### 결론

예전 해결책인 스크립트 요소를 body의 마지막(`</body>` 태그 직전)에 넣는 방식이나 `DOMContentLoaded` 이벤트를 사용해도 모든 HTML이 해석된 이후 스크립트가 로드되도록 할 수 있다.

하지만 HTML DOM이 모두 로드될 때까지 스크립트의 로딩과 해석이 완전히 차단된다는 문제가 생긴다. 많은 자바스크립트 코드를 다루는 큰 규모의 사이트에서는 이것이 주된 성능 문제(사이트가 느려짐)를 야기할 수 있기 때문에 `defer`를 사용하는 것이 권장된다.

#### async and defer

실제로 스크립트를 차단하는 문제를 회피할 수 있는 최신 기술은 `async`와 `defer` 두 가지이다. 이 두 사이의 차이점을 살펴보자.

`async` 속성을 사용해서 스크립트를 로드하면

* 페이지의 스크립트를 가져(fetch)오는 동안 렌더링을 중단하지 않고 스크립트가 다운로드 된다.
* 하지만 다운로드가 끝나면 스크립트가 바로 실행되고 그동안은 페이지의 렌더링이 차단된다.
* 이 경우 스크립트의 구체적인 실행 순서가 보장되지 않기 때문에 `async`는 페이지의 스크립트가 각각 독립적으로 실행되고 다른 스크립트에 의존적이지 않을 때 사용하는 것이 좋다.

`defer` 속성을 사용하면

* 스크립트가 페이지에 나타나는 순서대로 로드된다.
* 페이지 콘텐츠가 모두 로드될 때까지 스크립트가 실행되지 않기 때문에 스크립트가 DOM에 의존적일 때(e.g. 스크립트가 페이지에서 한 개 이상의 요소를 수정할 때) 유용하다.

예제를 통해서 비교해보자.

`async`를 사용하고 있기 때문에 세 개의 스크립트가 로드되는 순서를 보장할 수 없다.

```html
<script async src="js/vendor/jquery.js"></script>

<script async src="js/script2.js"></script>

<script async src="js/script3.js"></script>
```

* `jquery.js`가 `script2.js`와 `script3.js` 이전에도, 이후에도 로드될 수 있고 두 스크립트에 `jquery`에 의존적인 함수가 있다면 함수가 실행될 때 `jquery`가 아직 정의되지 않아 에러가 발생할 수 있다.
* `async`는 로드해야 할 배경 스크립트가 여러 개 있고 이걸 최대한 빠르게 가져와야 할 때 사용해야 한다.
    * e.g. 스크립트를 불러오는 동안 게임 인트로, 제목, 로비 등이 차단되지 않은 채 게임이 시작할 때 필요한 게임 데이터 파일을 불러오고 싶을 때.

`defer` 속성을 사용해 로드된 스크립트는 모든 스크립트와 내용이 다운로드 되었을 때 페이지에 나타난 순서대로 실행된다.

```html
<script defer src="js/vendor/jquery.js"></script>

<script defer src="js/script2.js"></script>

<script defer src="js/script3.js"></script>
```

* 이 경우 `jqueyr.js`, `script2.js`, `script3.js`의 순서대로 실행된다.
* 또한 이 스크립트들은 페이지 콘텐츠가 모두 불러와 질 때까지 실행되지 않아 스크립트가 DOM에 의존적일 때(e.g. 스크립트가 페이지에서 한 개 이상의 요소를 수정할 때) 유용하다.

요약하면 :

* `async`와 `defer`은 모두 페이지의 나머지가(DOM, etc) 다운로드되는 동안 브라우저에게 분리된 스레드에서 스크립트를 다운로드하라고 지시하므로 스크립트를 가져오는 동안 페이지 로딩이 차단되지 않는다.
* `async` 속성을 사용한 스크립트는 다운로드가 끝나는 즉시 실행된다. 페이지 렌더링을 막고, 스크립트의 실행 순서를 보장하지 않는다.
* `defer` 속성을 사용한 스크립트는 모든 것이 다운로드가 끝났을 때 나타난 순서에 따라 스크립트를 실행한다.
* 스크립트들이 다른 것에 의존하지 않고 즉시 실행되어야 한다면 `async`를 사용한다.
* 스크립트들이 해석될 때까지 기다려야 하거나 다른 스크립트나 그곳의 DOM에 의존하고 있다면 `defer`를 사용하고 각각의 `<script>` 태그들을 실행하길 원하는 순서대로 작성한다.

## 주석 (Comments)

HTML과 CSS와 같이, 자바스크립트에서도 주석을 작성할 수 있다.

주석은 브라우저가 실행될 때는 무시되며 다른 협업자(와 훗날 코드를 다시 보았을 때 무엇을 했는지 기억하지 못하는 자신)에게 코드가 어떻게 동작하는지 설명하기 위해 존재한다. 주석은 매우 유용하고 (특히 큰 프로젝트에서는) 자주 사용해야 한다.

주석은 두 가지 종류가 있다:

* 두 개의 슬래시(//)를 사용해 다음에 한 줄의 주석을 작성할 수 있다.

    ```js
    // I am a comment
    ```

* \/* 와 \*/를 사용해 그 사이에 여러 줄의 주석을 작성할 수 있다.

    ```js
    /*
      I am also
      a comment
    */
    ```

예시로 이전의 데모 자바스크립트 코드에 다음과 같이 주석을 작성할 수 있다.

```js
// 함수: 새로운 문단을 생성하고 HTML body 마지막에 추가

function createParagraph() {
  let para = document.createElement('p');
  para.textContent = 'You clicked the button!';
  document.body.appendChild(para);
}

/*
  1. 페이지의 모든 버튼의 참조(references)를 배열의 형태로 얻어온다.
  2. 모든 버튼을 순회하면서 각각에 클릭 이벤트 리스너를 추가한다.

  어떤 버튼이 눌려도 createParagraph() 함수가 실행된다.
*/

const buttons = document.querySelectorAll('button');

for (let i = 0; i < buttons.length ; i++) {
  buttons[i].addEventListener('click', createParagraph);
}
```

> Note: 대부분의 경우 주석은 적은 것보다 많은 게 낫지만, 변수가 뭔지 설명하거나(변수명을 더 직관적으로 수정해보자) 매우 간단한 동작을 설명하는(코드가 너무 복잡한 상태일 수 있다) 등 너무 많은 주석을 작성하지 않게 주의해야 한다.
