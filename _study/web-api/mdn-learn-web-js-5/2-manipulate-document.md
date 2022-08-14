---
layout  : article
title   : 문서 조작하기 (Manipulating documents)
summary : 
date    : 2022-03-11 15:30:10 +0900
updated : 2022-03-11 21:51:14 +0900
tag     : draft
toc     : true
public  : true
parent  : [[/web-api/mdn-learn-web-js-5]]
latex   : false
---
* TOC
{:toc}

> 이 글은 MDN Learn web development의 [Client-side web APIs](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Client-side_web_APIs) 중 [Manipulating documents](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Client-side_web_APIs/Manipulating_documents)의 내용을 번역 및 정리한 글입니다.
>
> * 제가 필요한 부분 위주로 확인하면서 정리하고 있어 글에 덜 작성된 부분이 있을 수 있습니다.
> * 글 작성 후 원문의 내용이 수정되거나 내용을 이해하기 위한 개인적인 설명이나 해석이 있을 수 있습니다. 되도록 원문을 참고해주시길 바랍니다.
> * 잘못된 부분이 있다면 댓글이나 그 외 편하신 방법으로 알려주시면 감사하겠습니다.

웹 페이지와 앱을 만들 때 가장 흔하게 하려고 하는 것은 어떤 방식으로 문서 구조를 조작하는 것이다. 이는 일반적으로 문서 객체 모델 (Document Object Model, DOM)을 사용해서 이뤄진다. 문서 객체 모델은 HTML과 스타일링 정보를 통제하기 위한 API 모음으로 [`Document`](https://developer.mozilla.org/en-US/docs/Web/API/Document) 객체를 많이 사용한다. 이 글에서는 환경을 흥미로운 방식으로 바꿀 수 있는 다른 흥미로운 API와 함께 DOM을 사용하는 방법을 자세히 살펴볼 것이다.

## 웹 브라우저의 중요한 부분 (The important parts of a web browser)

웹 브라우저는 움직이는 부분이 많은 매우 복잡한 소프트웨어의 조각으로, 그중 많은 부분은 웹 개발자가 자바스크립트를 사용해 통제하거나 조작할 수 없다. 이런 제한을 좋지 않은 것으로 생각할 수도 있지만, 브라우저는 좋은 이유로, 대부분 보안을 중심으로 잠겨있다. 만약 웹사이트가 저장된 비밀번호나 다른 민감한 정보에 접근하여, 당신인 것처럼 웹 사이트에 로그인할 수 있다고 상상해보자.

제한에도 불구하고, Web API는 여전히 웹 페이지로 많은 것을 할 수 있도록 많은 기능에 접근할 수 있게 허락해준다. 사용자가 코드에서 정기적으로 참조하게 될, 몇 가지 확실한 것(bits)들이 있다 - 웹 페이지를 보는 것과 직접적으로 연관된 브라우저의 주요한 부분을 나타내는 다음의 그림을 참고해보자:

![document, window, navigator of browser](/post-img/mdn-learn-web-js-5-2-manipulate-document/document-window-navigator.png)

* 윈도우(window)는
    * 웹페이지가 로드되는 브라우저 탭이다; 이는 자바스크립트에서 [`Window`](https://developer.mozilla.org/en-US/docs/Web/API/Window) 객체로 나타난다.
    * 이 객체에서 사용할 수 있는 메소드를 사용하면 윈도우 크기를 반환하거나 ([`Window.innerWidth`](https://developer.mozilla.org/en-US/docs/Web/API/Window/innerWidth)와 [`Window.innerHeight`](https://developer.mozilla.org/en-US/docs/Web/API/Window/innerHeight)을 보자), 해당 윈도우에 로드된 문서를 조작하거나, 해당 문서에 특정된 데이터를 클라이언트 측에 저장하거나 (예를 들어 로컬 데이터베이스나 기타 저장 메커니즘을 사용하는 것),현재 윈도우에 이벤트 핸들러를 부착하는 등을 할 수 있다.

* 네비게이터(navigator)는
    * 웹에 존재하는 브라우저(i.e. 사용자 에이전트)의 상태와 id를 나타낸다.
    * 자바스크립트에서, 이는 [`Navigator`](https://developer.mozilla.org/en-US/docs/Web/API/Navigator) 객체로 나타난다.
    * 이 객체를 사용해 사용자가 선호하는 언어, 사용자 웹캠의 미디어 스트림 등을 가져올 수 있다.

* (브라우저의 DOM에 의해 나타나는) 문서(document)는
    * 윈도우에 로드된 실제 페이지로, 자바스크립트에서는 [`Document`](https://developer.mozilla.org/en-US/docs/Web/API/Document) 객체로 나타난다.
    * 이 객체를 사용하면 문서를 구성하는 HTML과 CSS의 정보를 반환하거나 조작할 수 있다.
    * 예를 들어 DOM의 요소에 대한 참조를 얻거나, 그 요소의 텍스트 내용을 바꾸거나, 새로운 스타일을 적용하거나, 새 요소를 만들고 현재 요소의 자식으로 추가하거나, 완전히(altogether) 삭제하는 것까지 할 수 있다.

이 글에서는 대부분 문서를 조작하는 데 집중할 것이지만, 그 외의 다른 유용한 부분도 몇 가지 보여줄 것이다.

## 문서 객체 모델 (The document object model)

현재 브라우저 탭 중 하나에 로드된 문서는 문서 객체 모델로 나타난다. 문서 객체 모델은 HTML 구조에 프로그래밍 언어로 더 쉽게 접근할 수 있도록 브라우저에 의해 만들어진 "트리 구조"의 심상(representation)이다 - 예를 들어 브라우저는 페이지가 렌더링 될 때 자체적으로 이를 사용해 스타일링과 기타 정보를 올바른 요소에 적용하고, 개발자는 해당 페이지가 렌더링 된 수 자바스크립트로 DOM을 조작할 수 있다.

간단한 예제 페이지를 [dom-example.htm](https://github.com/mdn/learning-area/blob/main/javascript/apis/document-manipulation/dom-example.html)에 만들어두었다 ([실제 실행 예제도 봐보자](https://mdn.github.io/learning-area/javascript/apis/document-manipulation/dom-example.html)). 이것을 브라우저에서 열어보자 - 이는 이미지와 링크를 포함한 단락이 존재하는 [`<section>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/section) 요소를 포함하는 매우 간단한 페이지이다. HTML 소스 코드는 다음과 같이 나타난다:

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Simple DOM example</title>
  </head>
  <body>
      <section>
        <img src="dinosaur.png" alt="A red Tyrannosaurus Rex: A two legged dinosaur standing upright like a human, with small arms, and a large head with lots of sharp teeth.">
        <p>Here we will add a link to the <a href="https://www.mozilla.org/">Mozilla homepage</a></p>
      </section>
  </body>
</html>
```

다른 한편으로 DOM은 다음과 같이 나타난다:

```
├─ DOCTYPE: html
└─ HTML
   ├─ HEAD
   ⎪  ├─ #text:
   ⎪  ├─ META charset="utf-8"
   ⎪  ├─ #text:
   ⎪  ├─ TITLE
   ⎪  ⎪  └─ #text: Simple DOM example
   ⎪  └─ #text:
   ├─ #text:
   └─ BODY
      ├─ #text:
      ├─ SECTION
      ⎪  ├─ #text:
      ⎪  ├─ IMG src="dinosaur.png" alt="A red Tyrannosaurus Rex: A two legged dinosaur standing upright like a human, with small arms, and a large head with lots of sharp teeth."
      ⎪  ├─ #text:
      ⎪  ├─ P
      ⎪  ⎪  ├─ #text: Here we will add a link to the
      ⎪  ⎪  └─ A href="https://www.mozilla.org/"
      ⎪  ⎪     └─ #text: Mozilla homepage
      ⎪  └─ #text:
      └─ #text:
```

> Note: DOM 트리 다이어그램은 Ian Hickson의 [Live DOM viewer](https://software.hixie.ch/utilities/js/live-dom-viewer/)를 사용해서 만들었다.

## 직접 해보기: 기본 DOM 조작 (Active learning: Basic DOM manipulation)

DOM 조작에 대해 배우기 위해, 실제 예제부터 시작해보자.

1. 로컬 저장소에 [dom-example.html page](https://github.com/mdn/learning-area/blob/main/javascript/apis/document-manipulation/dom-example.html)와 페이지와 함께 쓰일 [이미지](https://github.com/mdn/learning-area/blob/main/javascript/apis/document-manipulation/dinosaur.png)를 복사하자.
1. `<script></script>` 요소를 닫는 `</body>` 태그 바로 위에 추가한다.
1. DOM 안의 요소를 조작하기 위해서는, 이를 먼저 선택하고, 변수 안에 요소에 대한 참조를 저장해야 한다. script 요소 안에 다음의 코드를 추가하자:

    ```js
    const link = document.querySelector('a');
    ```

1. 이제 변수 안에 요소에 대한 참조가 저장되어 있고, 이를 사용 가능한 속성과 메소드를 사용해 조작하기 시작할 수 있다 (이들은, [`<a>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a) 요소의 경우는 [`HTMLAnchorElement`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLAnchorElement)와 같은 인터페이스에, 좀 더 일반적인 경우 부모 인터페이스 [`HTMLElement`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement)나, DOM의 모든 노드를 나타내는 [`Node`](https://developer.mozilla.org/en-US/docs/Web/API/Node)에 정의되어 있다). 우선, [`Node.textContent`](https://developer.mozilla.org/en-US/docs/Web/API/Node/textContent) 속성의 값을 갱신해 링크 안의 텍스트를 바꿔보자. 다음의 코드를 이전 코드 아래에 추가하자:

    ```js
    link.textContent = 'Mozilla Developer Network';
    ```

1. 링크를 클릭했을 때 잘못된 곳으로 이동하지 않도록 링크가 가리키고 있는 URL을 바꿔야 한다. 다음의 코드를, 다시 이전 코드의 아래에 추가하자:

    ```js
    link.href = 'https://developer.mozilla.org';
    ```

자바스크립트의 많은 다른 요소처럼, 요소를 선택해 해당 참조를 변수에 저장하는 방법은 다양하다는 것에 유의하자.

* [Document.querySelector()](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector)가 권장되는 최신 접근 방식이다. CSS 선택자를 사용해 요소를 선택할 수 있기 때문에 편리하다.
* 위의 `querySelector()` 호출은 문서에 나타난 첫 번째 [`<a>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a) 요소를 선택할 것이다.
* 만약 여러 요소를 선택해 처리하고 싶으면 선택자와 일치하는 문서의 모든 요소를 선택하는 [`Document.querySelectorAll()`](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelectorAll)를 사용해, [`NodeList`](https://developer.mozilla.org/en-US/docs/Web/API/NodeList)라는 [배열](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/First_steps/Arrays)과 유사한 객체에 이들에 대한 참조를 저장할 수 있다.

다음과 같이, 요소에 대한 참조를 가져오는 데 사용할 수 있는 오래된 메소드들도 있다:

* [`Document.getElementById()`](https://developer.mozilla.org/en-US/docs/Web/API/Document/getElementById
    * 주어진 `id` 속성값으로 요소를 선택한다, e.g. `<p id="myId">My paragraph</p>`.
    * ID는 매개변수로 함수에 전달된다, i.e. `const elementRef = document.getElementById('myId')`
* [`Document.getElementsByTagName()`](https://developer.mozilla.org/en-US/docs/Web/API/Document/getElementsByTagName)
    * 페이지의 주어진 유형과 같은 모든 요소를 포함하는 배열과 유사한 객체를 반환한다, 예를 들어 `<p>`, `<a>` 등.
    * 요소 유형은 매개변수로 함수에 전달된다, i.e. `const elementRefArray = document.getElementsByTagName('p')`.

이 두 메소드는 이전 브라우저에서 `querySelector()`과 같은 최신 메소드보다 더 잘 동작하지만, 그만큼 편리하지 않다. 더 찾을 수 있는 다른 것이 있는지 살펴보자!

### 새로운 노드를 생성하고 배치하기 (Creating and placing new nodes)

위의 내용에서 DOM 조작으로 할 수 있는 일을 약간 맛 보았지만, 더 나아가서 새로운 요소를 어떻게 만들 수 있는지 살펴보자.

1. 현재 예제로 돌아가, [`<section>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/section) 요소에 대한 참조를 가져오는 것부터 시작하자 - 기존 스크립트 가장 아래에 다음의 코드를 추가한다 (다른 코드에도 똑같이 수행한다):

    ```js
    const sect = document.querySelector('section');
    ```

1. 이제 [`Document.createElement()`](https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement)를 사용해 새로운 단락을 만들고, 이전과 같은 방식으로 일부 텍스트 내용을 추가(give)하자:

    ```js
    const para = document.createElement('p');
    para.textContent = 'We hope you enjoyed the ride.';
    ```

1. 이제 새로운 단락을 [`Node.appendChild()`](https://developer.mozilla.org/en-US/docs/Web/API/Node/appendChild)를 사용해 section 마지막에 추가할 수 있다:

    ```js
    sect.appendChild(para);
    ```

1. 이 부분의 마지막으로, 링크를 포함(sits inside)한 단락에 텍스트 노드를 추가해 문장을 멋지게 완성(round off)해보자. 먼저, [`Document.createTextNode()`](https://developer.mozilla.org/en-US/docs/Web/API/Document/createTextNode)를 사용해 텍스트 노드를 만든다:

    ```js
    const text = document.createTextNode(' — the premier source for web development knowledge.');
    ```

1. 이제 링크를 포함한 단락에 대한 참조를 가져와, 텍스트 노드를 추가한다:

    ```js
    const linkPara = document.querySelector('p');
    linkPara.appendChild(text);
    ```

이것이 DOM에 노드를 추가하기 위해 필요한 것의 대부분이다 - 동적인 인터페이스를 만들 때 이 메소드를 많이 사용할 것이다 (이후에 몇몇 예제를 살펴볼 것이다).

### 요소를 이동시키고 제거하기 (Moving and removing elements)

노드를 이동시키거나 DOM에서 완전히(altogether) 제거할 때(times)가 있을 것이다. 이것은 완벽하게 가능하다.

만약 링크가 있는 단락을 section 가장 아래로 옮기고 싶다면, 이렇게 할 수 있다:

```js
sect.appendChild(linkPara);
```

이 코드는 단락을 section 가장 아래로 이동시킨다. 이 코드가 단락의 두 번째 복사본을 만든다고 생각할 수 있지만 그렇지 않다 - `linkPara`는 해당 단락의 유일한 참조이다. 복사본을 만들어 추가하고 싶다면, [`Node.cloneNode()`](https://developer.mozilla.org/en-US/docs/Web/API/Node/cloneNode)를 대신 사용해야 한다.

노드를 제거하는 것도, 제거하려는 노드와 그 부모의 참조를 알고있다면(have) 꽤 간단하다. 현재 예제에서는 다음과 같이 [`Node.removeChild()`](https://developer.mozilla.org/en-US/docs/Web/API/Node/removeChild)를 사용한다:

```js
sect.removeChild(linkPara);
```

꽤 흔한 경우로, 오직 제거하려는 자신의 참조에만 의존해 노드를 제거하고 싶을 때는, [`Element.remove()`](https://developer.mozilla.org/en-US/docs/Web/API/Element/remove)를 사용할 수 있다:

```js
linkPara.remove();
```

이 메소드는 이전 브라우저에서는 지원되지 않는다. 이전 부라우저는 노드 자신을 제거하라고 얘기할 메소드를 갖지 않아, 다음과 같이 해야 한다:

```js
linkPara.parentNode.removeChild(linkPara);
```

위의 코드를 현재 예제의 코드에 추가해보자.

### 스타일 조작하기 (Manipulating styles)

자바스크립트를 통해 다양한 방법으로 CSS 스타일을 조작할 수 있다.

첫 시작으로, [`Document.stylesheets`](https://developer.mozilla.org/en-US/docs/Web/API/Document/styleSheets)를 사용해서 문서에 첨부되어있는 모든 스타일 시트의 목록을 얻을 수 있고, 배열과 유사한 객체인 [CSSStyleSheet](https://developer.mozilla.org/en-US/docs/Web/API/CSSStyleSheet) 객체를 반환한다. 그다음 스타일을 원하는 대로 추가/제거할 수 있다. 하지만, 이는 스타일을 조작하는 다소 고지식하고 어려운 방식이기 때문에 이 기능을 더 알아보지(expand on) 않을 것이다. 훨씬 쉬운 방법이 있다.

첫 번째 방법은 동적으로 스타일을 바꾸고 싶은 요소에 직접 인라인 스타일을 추가하는 것이다. 이는 문서 안의 각 요소의 인라인 스타일 정보를 담고 있는 [`HTMLElement.style`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/style) 속성을 통해 할 수 있다. 이 객체의 속성을 설정해 요소의 스타일을 직접 수정할 수 있다.

1. 하나의 예로, 현재 진행 중인 예제에 다음의 코드를 추가해보자:

    ```js
    para.style.color = 'white';
    para.style.backgroundColor = 'black';
    para.style.padding = '10px';
    para.style.width = '250px';
    para.style.textAlign = 'center';
    ```

1. 페이지를 다시 불러오면, 단락에 해당 스타일이 적용된 것을 볼 수 있을 것이다. 해당 단락을 브라우저의 [Page Inspector/DOM inspector](https://developer.mozilla.org/en-US/docs/Tools/Page_Inspector)에서 보면, 이 코드들이 실제로 문서에 인라인 스타일을 추가하고 있다는 것을 볼 수 있다:

    ```html
    <p style="color: white; background-color: black; padding: 10px; width: 250px; text-align: center;">We hope you enjoyed the ride.</p>
    ```

> Note: CSS 스타일을 작성할 때 자바스크립트 속성 버전은 소문자 카멜 케이스로, CSS 버전은 하이픈으로 연결되어 작성되었다는 것에 유의하자 (e.g. `backgroundColor` 대 `background-color`). 이들을 혼용해서 사용하지 않도록 하자, 그러지 않으면 작동하지 않을 것이다.

문서의 스타일을 동적으로 조작하는 또 다른 흔한 방법이 있고, 지금 살펴볼 것이다.

1. 이전에 자바스크립트에 추가한 다섯 줄의 코드를 제거하자.
1. 다음을 HTML [`<head>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/head) 안에 추가하자:

    ```html
    <style>
    .highlight {
      color: white;
      background-color: black;
      padding: 10px;
      width: 250px;
      text-align: center;
      }
    </style>
    ```

1. 이제 일반적인 HTML 조작을 위한 매우 유용한 메소드를 살펴볼(turn to) 것이다 - [`Element.setAttribute()`](https://developer.mozilla.org/en-US/docs/Web/API/Element/setAttribute) - 이 메소드는 두 개의 인자를 받는다, 해당 요소에서 설정하고 싶은 속성과, 해당 속성이 지정하고 싶은 값. 지금 경우에서는 현재 단락의 클래스 명을 highlight로 지정할 것이다:

    ```js
    para.setAttribute('class', 'highlight');
    ```

1. 페이지를 새로고침하면, 아무 변화도 보지 못할 것이다 - CSS는 여전히 단락 요소에 적용되어 있지만, 이번 경우에는 인라인 CSS 스타일이 아닌 현재 CSS 규칙에 의해 선택된 클래스를 부여해 적용한다.

어떤 방식을 선택할지는 당신에게 달려있다; 둘 다 장단점이 있다. 첫 번째 메소드는 설정해야 할 것이 적고 간단하게 사용하기 좋지만, 두 번째 메소드가 더 깔끔하다 (CSS와 자바스크립트를 혼용하지 않고, 나쁜 관행으로 여겨지는 인라인 스타일을 사용하지 않는다). 더 크고 복잡한 앱을 만들기 시작하면, 두 번째 방법을 더 많이 사용하기 시작할 것이지만, 이건 정말로 당신에게 달려있다.

이쯤에서, 실제로 유용한 그 어떤 일도 하지 못했다! 자바스크립트를 사용해서 정적인 콘텐츠를 만드는 것에는 아무 핵심(point)이 없다 - 자바스크립트를 사용하지 않고 그냥 HTML에 작성하는 것이 나을 것이다. 자바스크립트는 HTML보다 더 복잡하고, 자바스크립트로 콘텐츠를 생성하는 것은 이와 관련된 다른 문제점(issue)들을 갖는다 (검색 엔진에서 가독성이 좋지 않은 등).

다음 섹션에서는 더 실질적인 DOM API 사용에 대해서 살펴볼 것이다.

> Note: [dom-example.html의 완성 버전](https://github.com/mdn/learning-area/blob/main/javascript/apis/document-manipulation/dom-example-manipulated.html) 데모를 GitHub에서 찾을 수 있다 ([실제 실행 예제도 봐보자](https://mdn.github.io/learning-area/javascript/apis/document-manipulation/dom-example-manipulated.html)).

## 직접 해보기: 동적인 쇼핑 목록 (Active learning: A dynamic shopping list)

이 도전에서는 양식 입력창과 버튼을 사용해 동적으로 항목을 목록에 추가하는 간단한 쇼핑 목록 예제를 만들 것이다. 항목을 입력창에 추가하고 버튼을 누르면:

* 아이템이 리스트에 나타나야 한다.
* 각 항목에 눌러서 해당 항목을 목록에서 제거할 수 있는 버튼이 있어야 한다.
* 입력창을 비우고 포커스 시켜 다른 항목을 입력하기 위해 준비해야 한다.

완성된 데모는 다음과 같이 보일 것이다:

![shopping list](/post-img/mdn-learn-web-js-5-2-manipulate-document/shopping-list.png)

예제를 완성하려면 아래의 단계를 따라가고, 목록이 위에서 설명한 것처럼 작동할 수 있도록 하자.

1. 시작으로 [shopping-list.html](https://github.com/mdn/learning-area/blob/main/javascript/apis/document-manipulation/shopping-list.html) 시작 파일을 다운로드받아, 그 복사본을 어딘가에 만든다. 이 파일은 최소한의 CSS, 레이블, 입력창, 버튼을 포함한 목록, 빈 목록, [`<script>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script) 요소를 포함하고 있는 것을 볼 수 있을 것이다. 모든 추가 내용은 script 안에 작성할 것이다.
2. 목록([`<ul>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/ul)), [`<input>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input), [`<button>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button) 요소의 참조를 저장할 세 개의 변수를 생성한다.
3. 클릭 된 버튼에 대한 응답으로 실행할 [함수](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Functions)를 생성한다.
4. 함수의 body 안에서는, 입력 요소의 현재 [값](https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement#properties)을 변수에 저장하는 것으로 시작한다.
5. 다음으로, 입력 요소의 값을 빈 문자열 - `''` - 로 지정해 입력 요소를 비운다.
6. 세 개의 새 요소를 생성한다 - 목록 항목([`<li>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/li)), [`<span>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/span), [`<button>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button), 그리고 이를 변수에 저장한다.
7. span과 button을 목록 항목의 자식으로 추가한다.
8. span의 텍스트 내용은 이전에 저장한 입력 요소의 값으로, 버튼의 텍스트 내용은 'Delete'로 설정한다.
9. 목록 항목을 목록의 자식으로 추가한다.
10. 제거(delete) 버튼에 이벤트 핸들러를 추가해, 버튼이 클릭 됐을 때 버튼이 포함된 목록 항목 전체가 삭제되도록 한다.
11. 마지막으로, [`focus()`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/focus) 메소드를 사용해 입력 요소에 집중해 다음 쇼핑 목록 항목을 입력할 준비를 한다.

> Note: 작성하다 막히면, [완성된 쇼핑 리스트](https://github.com/mdn/learning-area/blob/main/javascript/apis/document-manipulation/shopping-list-finished.html)를 확인해보자 ([실제 실행 예제도 봐보자](https://mdn.github.io/learning-area/javascript/apis/document-manipulation/shopping-list-finished.html)).
