---
layout  : article
title   : JSON으로 작업하기 (Working with JSON)
summary : 
date    : 2022-02-14 14:36:23 +0900
updated : 2022-02-15 13:13:18 +0900
tag     : draft
toc     : true
public  : true
parent  : [[/javascript/mdn-learn-web-js-3]]
latex   : false
---
* TOC
{:toc}

> 이 글은 MDN Learn web development의 [Introducing JavaScript objects](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects) 중 [Working with JSON](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/JSON)의 내용을 번역 및 정리한 글입니다.
>
> * 제가 필요한 부분 위주로 확인하면서 정리하고 있어 글에 덜 작성된 부분이 있을 수 있습니다.
> * 글 작성 후 원문의 내용이 수정되거나 내용을 이해하기 위한 개인적인 설명이나 해석이 있을 수 있습니다. 되도록 원문을 참고해주시길 바랍니다.
> * 잘못된 부분이 있다면 댓글이나 그 외 편하신 방법으로 알려주시면 감사하겠습니다.

JavaScript Object Notation(JSON)은 자바스크립트 객체 문법으로 구조화된 데이터를 표현하기 위한 문자 기반의 표준 포맷이다. 일반적으로 웹 애플리케이션에서 데이터를 전송할 때 사용한다 (e.g., 웹 페이지에 표시할 수 있도록, 서버에서 클라이언트로 데이터를 전송하거나, 그 반대). JSON은 마주칠 일이 꽤 잦을 테니, 이 글에서는 JSON 안의 데이터에 접근할 수 있도록 JSON을 파싱하고 JSON을 생성하는 법을 포함해 자바스크립트로 JSON을 다루는데 필요한 모든 것을 알려줄 것이다.

## 아니 그래서, 대체 JSON은 뭘까? (No, really, what is JSON?)

[JSON](https://developer.mozilla.org/en-US/docs/Glossary/JSON)은 [Douglas Crockford](https://en.wikipedia.org/wiki/Douglas_Crockford)가 대중화시킨 자바스크립트 객체 문법을 따르는 문자 기반의 데이터 포맷이다. JSON은 자바스크립트 객체 리터럴 구문과 매우 유사하지만, 자바스크립트와 상관없이(independently) 사용할 수 있으며, 많은 프로그래밍 환경에서 JSON을 읽고 (parse) 생성할 수 있다.

JSON은 문자열의 형태로 존재한다 - 네트워크를 통해 데이터를 전송할 때 유용하다. 데이터에 접근하기 위해서는 JSON을 네이티브 자바스크립트 객체로 변환해주어야 한다. 이는 큰 문제는 아니다 - 자바스크립트는 이 두 사이를 변환할 수 있는 메소드를 갖는 전역 [JSON](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON) 객체를 제공한다.

> Note: 문자열에서 네이티브 객체로 변환하는 것은 *역직렬화(deserialization)*라고 한다. 반대로 네트워크를 통해 전달될 수 있도록 네이티브 객체를 문자열로 바꾸는 것은 *직렬화(serialization)*라고 한다.

JSON 문자열은 `.json` 확장자를 가진 단순 텍스트 파일에 저장할 수 있고, [MIME 타입](https://developer.mozilla.org/en-US/docs/Glossary/MIME_type)은 `application/json` 이다.

### JSON 구조 (JSON structure)

위에서 설명했듯이, JSON은 자바스크립트 객체 리터럴 형태와 매우 유사한 문자열이다. JSON 안에는 표준 자바스크립트 객체처럼 기본 데이터 타입을 포함할 수 있다 - 문자열, 숫자, 배열, 부울, 다른 객체 리터럴. 이렇게 하면 다음과 같이 데이터 계층 구조를 구성할 수 있다:

```json
{
  "squadName": "Super hero squad",
  "homeTown": "Metro City",
  "formed": 2016,
  "secretBase": "Super tower",
  "active": true,
  "members": [
    {
      "name": "Molecule Man",
      "age": 29,
      "secretIdentity": "Dan Jukes",
      "powers": [
        "Radiation resistance",
        "Turning tiny",
        "Radiation blast"
      ]
    },
    {
      "name": "Madame Uppercut",
      "age": 39,
      "secretIdentity": "Jane Wilson",
      "powers": [
        "Million tonne punch",
        "Damage resistance",
        "Superhuman reflexes"
      ]
    },
    {
      "name": "Eternal Flame",
      "age": 1000000,
      "secretIdentity": "Unknown",
      "powers": [
        "Immortality",
        "Heat Immunity",
        "Inferno",
        "Teleportation",
        "Interdimensional travel"
      ]
    }
  ]
}
```

만약 이 문자열을 자바스크립트 프로그램에 불러오고, 예시로 `superHeroes`라는 이름의 변수에 파싱하면, [자바스크립트 객체 기본](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Basics) 글에서 보았던 것과 같은 점/브라켓 표기법으로 객체 안의 데이터에 접근할 수 있게 된다. 예를 들어:

```js
superHeroes.homeTown
superHeroes['active']
```

더 아래 계층의 데이터에 접근하려면, 필요한 속성 명과 배열 인덱스를 함께 연결(chain)하면 된다. 예를 들어, `members` 목록의 두 번째 영웅의 세 번째 초능력(superpower)에 접근하려면 이렇게 하면 된다:

```js
superHeroes['members'][1]['powers'][2]
```

1. 우선 변수 이름은 — `superHeroes`이다.
1. 그 안에서 `members` 속성에 접근하려면 `["members"]`를 입력한다.
1. `members`는 객체로 구성된 배열이다. 배열의 두 번째 객체에 접근할 것이므로 [1]을 입력한다.
1. 이 객체에서 `powers` 속성에 접근하려면 ["powers"]를 입력한다.
1. `powers` 속성 안에는 위에서 선택한 `hero`의 능력들을 포함한 배열이 있다. 세 번째 것을 선택해야 하므로 [2]를 입력한다.

> Note: 위에서 본 JSON을 [JSONTest.html](https://mdn.github.io/learning-area/javascript/oojs/json/JSONTest.html) 예제의 변수에서 사용할 수 있도록 만들었다 ([소스 코드](https://github.com/mdn/learning-area/blob/main/javascript/oojs/json/JSONTest.html)를 참고하자). 이 파일을 불러오고 브라우저의 자바스크립트 콘솔에서 이 변수 안의 데이터에 접근해보자.

### JSON에서의 배열 (Arrays as JSON)

위에서 JSON 텍스트는 기본적으로 문자열 안의 자바스크립트의 객체와 비슷하게 생겼다고 얘기했다. 우리는 또한, JSON을 객체로 / 객체를 JSON으로 변환할 수도 있다. 예를 들어, 아래의 코드도 유효한 JSON이다:

```json
[
  {
    "name": "Molecule Man",
    "age": 29,
    "secretIdentity": "Dan Jukes",
    "powers": [
      "Radiation resistance",
      "Turning tiny",
      "Radiation blast"
    ]
  },
  {
    "name": "Madame Uppercut",
    "age": 39,
    "secretIdentity": "Jane Wilson",
    "powers": [
      "Million tonne punch",
      "Damage resistance",
      "Superhuman reflexes"
    ]
  }
]
```

위 예제는 완전히 정상적인(valid) JSON이다. 예를 들어 `[0]["powers"][0]`처럼 배열의 인덱스로 시작해 (파싱된 버전의) 배열 항목에 접근하면 된다.

### 그 외 참고사항 (Other notes)

* JSON은 단지(purely) 데이터 형식이 지정된 문자열이다 - 오직 속성만 포함할 수 있고, 메소드는 불가능하다.
* JSON의 문자열과 속성 이름 전후에는 큰따옴표만을 사용해야 한다. JSON 문자열 전체를 감쌀 때를 제외하고는 작은따옴표는 유효하지 않다.
* 쉼표나 콜론을 잘못 배치하는 사소한 실수로도 JSON 파일이 잘못되어 작동하지 않을 수 있다. (생성 프로그램이 올바르게 작동하는 이상, 컴퓨터가 생성한 JSON은 오류를 포함하기 어렵긴 하지만) 사용하려는 데이터가 유효한지 주의 깊게 검사해야 한다. [JSONLint](https://jsonlint.com) 같은 애플리케이션을 사용해 JSON의 유효성 검사를 할 수 있다.
* JSON은 객체나 배열뿐만 아니라, JSON 내부에 포함할 수 있는 모든 형태의 데이터 타입을 취할 수 있다. 즉, 예를 들어, 단일 문자열이나 숫자 또한 유효한 JSON이 된다.
* 객체 속성이 따옴표로 묶이지 않을 수도 있는 자바스크립트의 코드와는 달리, JSON에서는 따옴표로 묶인 문자열만 속성으로 사용할 수 있다.

## 활동적 학습: JSON 예제를 다뤄 보기 (Active learning: Working through a JSON example)

이제, 예제를 통해 웹사이트에서 JSON 형식의 데이터를 어떻게 사용할 수 있는지 살펴보자.

### 시작하기 (Getting started)

처음으로, 로컬 저장소에 [heroes.html](https://github.com/mdn/learning-area/blob/main/javascript/oojs/json/heroes.html) 와 [style.css](https://github.com/mdn/learning-area/blob/main/javascript/oojs/json/style.css) 파일을 복사하자. 뒤 파일은 페이지를 꾸밀 간단한 CSS를 포함하고, 앞 파일은 간단한 본문(body) HTML과 이 예제에서 작성할 자바스크립트 코드를 포함할 `<script>` 요소를 포함한다.

```html
<header>

</header>

<section>

</section>

<script>

</script>
```

Github의 https://mdn.github.io/learning-area/javascript/oojs/json/superheroes.json에 사용 가능한 JSON 데이터를 만들어놓았다.

JSON을 스크립트 안에 불러와서, 멋진 DOM 조작을 일부 사용해 다음과 같이 표시할 것이다:

[img]

### 최상위 함수 (Top-level function)

최상위 함수는 다음과 같이 생겼다:

```js
async function populate() {

  const requestURL = 'https://mdn.github.io/learning-area/javascript/oojs/json/superheroes.json';
  const request = new Request(requestURL);

  const response = await fetch(request);
  const superHeroes = await response.json();

  populateHeader(superHeroes);
  populateHeroes(superHeroes);
}
```

JSON을 가져오기 위해서, [Fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)라는 API를 사용한다. 이 API를 사용하면 네트워크가 자바스크립트를 통해 서버에 리소스(e.g. 이미지, 텍스트, JSON, HTML 스니펫까지도)를 요청할 수 있고, 이는 페이지 전체를 다시 불러올 필요 없이 내용 일부를 갱신할 수 있다는 것을 의미한다.

위의 함수에서 처음 네 줄은 Fetch API를 사용해 서버에서 JSON을 가져온다:

* GitHub URL을 저장하기 위한 변수 `requestURL`을 선언한다.
* URL을 사용해 새로운 [`Request`](https://developer.mozilla.org/en-US/docs/Web/API/Request) 객체를 초기화한다.
* [`fetch()`](https://developer.mozilla.org/en-US/docs/Web/API/fetch) 함수를 사용해 네트워크 요청을 만들고, 이것이 [`Response`](https://developer.mozilla.org/en-US/docs/Web/API/Response) 객체를 반환한다.
* `Response` 객체의 [`json()`](https://developer.mozilla.org/en-US/docs/Web/API/Response/json) 함수를 사용해 응답을 JSON으로 가져온다.

> Note: `fetch()` API는 **비동기적(asynchronous)**이다. 다음 모듈에서 비동기 함수에 대한 많은 것을 배우게 될 거지만, 지금은 fetch API를 사용하는 함수명의 전에 [`async`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function) 키워드를, 모든 비동기 함수를 호출하기 이전에 [`await`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await) 키워드를 붙이면 된다.

모든 것이 끝나면, `superHeroes` 변수가 JSON에 기반한 자바스크립트 객체를 포함할 것이다. 그러면 그다음에 이 객체를 호출되는 두 함수에 전달한다 - 첫 번째 함수는 `<header>`를 올바른 데이터로 채우고, 두 번째는 팀의 각 영웅에 대한 정보 카드를 생성해 `<section>`에 삽입한다.

### 헤더를 채우기 (Populating the header)

이제 JSON 데이터를 검색해서 자바스크립트 객체로 변환했으므로, 위에서 언급한 두 함수를 작성해서 이를 활용해보자. 우선, 이전 코드 아래에 다음의 함수 정의를 추가하자.

```js
function populateHeader(obj) {
  const header = document.querySelector('header');
  const myH1 = document.createElement('h1');
  myH1.textContent = obj['squadName'];
  header.appendChild(myH1);

  const myPara = document.createElement('p');
  myPara.textContent = `Hometown: ${obj['homeTown']} // Formed: ${obj['formed']}`;
  header.appendChild(myPara);
}
```

여기서 우선 [`createElement()`](https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement)로 [`<h1>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/Heading_Elements) 요소를 만들고, [textContent](https://developer.mozilla.org/en-US/docs/Web/API/Node/textContent)를 객체의 `squadName` 속성과 같게 설정한 뒤, [`appendChild()`](https://developer.mozilla.org/en-US/docs/Web/API/Node/appendChild)를 사용해서 헤더에 이를 추가한다. 그 다음에 문단으로도 매우 비슷한 동작을 수행한다: 문단을 생성하고, 텍스트 내용을 설정하고, 헤더에 추가한다. 유일한 차이점은 텍스트가 객체의 `homeTown`과 `formed` 속성을 모두 포함한 [템플릿 리터럴](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals)로 설정한다는 것이다.

### 영웅 정보 카드 만들기 (Creating the hero information cards)

다음으로, 코드의 아래에 수퍼히어로 카드를 생성하고 표시하는 다음 함수를 추가한다.

```js
function populateHeroes(obj) {
  const section = document.querySelector('section');
  const heroes = obj['members'];

  for (const hero of heroes) {
    const myArticle = document.createElement('article');
    const myH2 = document.createElement('h2');
    const myPara1 = document.createElement('p');
    const myPara2 = document.createElement('p');
    const myPara3 = document.createElement('p');
    const myList = document.createElement('ul');

    myH2.textContent = hero.name;
    myPara1.textContent = `Secret identity: ${hero.secretIdentity}`;
    myPara2.textContent = `Age: ${hero.age}`;
    myPara3.textContent = 'Superpowers:';

    const superPowers = hero.powers;
    for (const power of superPowers) {
      const listItem = document.createElement('li');
      listItem.textContent = power;
      myList.appendChild(listItem);
    }

    myArticle.appendChild(myH2);
    myArticle.appendChild(myPara1);
    myArticle.appendChild(myPara2);
    myArticle.appendChild(myPara3);
    myArticle.appendChild(myList);

    section.appendChild(myArticle);
  }
}
```

시작으로, 자바스크립트 객체의 `members` 프로퍼티를 새 변수에 저장한다. 이 배열은 각 영웅의 정보를 갖는 여러 객체를 포함한다.

다음으로, [for...of loop](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Looping_code#the_for...of_loop)를 사용해 배열의 각 객체를 순회한다. 각각에 대해:

1. 몇 개의 새로운 요소를 생성한다: 한 개의 `<article>`, 한 개의 `<h2>`, 세 개의 `<p>`, 한 개의 `<ul>`.
1. `<h2>`가 영웅의 `name`을 포함하도록 설정한다.
1. 세 단락을 영웅들의 `secretIdentity`, `age`, 그리고 목록으로 정보를 소개하기 위한 "Superpowers:" 라는 문장으로 채운다.
1. `superPowers` 라는 새로운 변수 안에 `powers` 속성을 저장한다 - `powers`는 현재 영웅의 초능력(superpower)을 나열한 배열을 포함한다.
1. 현재 영웅의 초능력을 순회하기 위해 또 다른 `for...of` 반복문을 사용한다 - 항목마다 `<li>` 요소를 생성하고, 그 안에 초능력을 넣은 다음, `appendChild()`를 사용해 `<ul>`요소(`myList`) 안에 `listItem`를 넣는다.
1. 마지막으로 할 일은 `<article>` (`myArticle`) 안에 `<h2>`, `<p>`, `<ul>`을 추가한 뒤, `<article>`을 `<section>` 안에 추가한다. 항목들이 추가되는 순서가 HTML 내에서 보이는 순서와 같기 때문에 중요하다.

> Note: 예제를 수행하는 데 문제를 겪고 있다면, [heroes-finished.html](https://github.com/mdn/learning-area/blob/main/javascript/oojs/json/heroes-finished.html) 코드를 참조하자 ([실제 실행 예제](https://mdn.github.io/learning-area/javascript/oojs/json/heroes-finished.html)도 살펴보자.)

> Note: 만약 자바스크립트 객체에 접근하기 위한 점/괄호 표기법을 따르는 데 문제를 겪고 있다면, 자바스크립트를 볼 때처럼 다른 탭이나 텍스트 에디터에서 [superheroes.json](https://mdn.github.io/learning-area/javascript/oojs/json/superheroes.json) 파일을 열어 참조하는 것이 도움이 될 것이다. 또한 점/괄호 표기법에 대한 추가 정보를 위해 [자바스크립트 객체 기본](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Basics) 게시글을 다시 확인해봐도 된다.

### 최상위 함수를 호출하기 (Calling the top-level function)

마지막으로, 최상위 `populate()` 함수를 호출해야 한다:

```js
populate();
```

## 객체와 문자 사이의 변환 (Converting between objects and text)

위의 예제는 `response.json()`을 사용해 네트워크 응답을 자바스크립트 객체로 직접 변환했기 때문에 자바스크립트 객체에 접근하는 측면에서는 간단했다.

하지만 때로는 이렇게 운이 좋지 않기도 하다 - 어떨 때는 가공되지 않은(raw) JSON 문자열을 받아, 직접 객체로 변환해야 할 때도 있다. 그리고 네트워크를 통해 자바스크립트 객체를 보내고 싶다면, 이를 보내기 전에 JSON(하나의 문자열)으로 변환해야 한다. 다행스럽게도, 이 두 문제는 웹 개발에서 매우 흔해서 다음의 두 메소드를 포함하는 내장 [JSON](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON) 객체를 브라우저에서 사용할 수 있다:

* [`parse()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse): JSON 문자열을 매개변수로 받아, 이에 상응하는 자바스크립트 객체를 반환한다.
* [`stringfy()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify): 객체를 매개변수로 받아, 동일한 JSON 문자열을 반환한다.

첫 번째 메소드는 [heroes-finished-json-parse.html](https://mdn.github.io/learning-area/javascript/oojs/json/heroes-finished-json-parse.html) 예제의 동작에서 볼 수 있다 ([소스 코드](https://github.com/mdn/learning-area/blob/main/javascript/oojs/json/heroes-finished-json-parse.html)를 참고하자) - 이것은 다음의 사항을 제외하고는 이전에 만든 예제와 정확히 같은 일을 한다:

* 응답의 [`text()`](https://developer.mozilla.org/en-US/docs/Web/API/Response/text) 메소드를 호출해 응답을 JSON 대신 텍스트로 가져온다.
* 그다음으로 `parse()`를 사용해 텍스트를 자바스크립트 객체로 변환한다.

핵심 코드 스니펫은 이것과 같다:

```js
async function populate() {

  const requestURL = 'https://mdn.github.io/learning-area/javascript/oojs/json/superheroes.json';
  const request = new Request(requestURL);

  const response = await fetch(request);
  const superHeroesText = await response.text();

  const superHeroes = JSON.parse(superHeroesText);
  populateHeader(superHeroes);
  populateHeroes(superHeroes);

}
```

예상했겠지만, `stringify()` 는 반대의 방식으로 동작한다. 다음의 코드를 브라우저의 자바스크립트 콘솔에 한 줄씩 입력해 보면서 그 동작을 확인해보자:

```js
let myObj = { name: "Chris", age: 38 };
myObj
let myString = JSON.stringify(myObj);
myString
```

여기서는 자바스크립트 객체를 생성한 뒤, 무엇을 포함하고 있는지 확인하고, 이를 `stringify()`를 사용해 JSON 문자열로 변환해 - 반환 값을 새 변수에 저장한다 - 이를 다시 확인한다.
