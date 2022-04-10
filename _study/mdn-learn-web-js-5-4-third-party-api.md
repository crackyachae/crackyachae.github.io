---
layout  : article
title   : 서드파티 API (Third-party APIs)
summary : 
date    : 2022-03-14 21:20:41 +0900
updated : 2022-03-15 16:10:38 +0900
tag     : draft
toc     : true
public  : true
parent  : [[mdn-learn-web-js]]
latex   : false
---
* TOC
{:toc}

> 이 글은 MDN Learn web development의 [Client-side web APIs](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Client-side_web_APIs) 중 [Third-party APIs](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Client-side_web_APIs/Third_party_APIs)의 내용을 번역 및 정리한 글입니다.
>
> * 제가 필요한 부분 위주로 확인하면서 정리하고 있어 글에 덜 작성된 부분이 있을 수 있습니다.
> * 글 작성 후 원문의 내용이 수정되거나 내용을 이해하기 위한 개인적인 설명이나 해석이 있을 수 있습니다. 되도록 원문을 참고해주시길 바랍니다.
> * 잘못된 부분이 있다면 댓글이나 그 외 편하신 방법으로 알려주시면 감사하겠습니다.

지금까지 배운 API는 브라우저에 내장되어 있지만, 모든 API가 그런 것은 아니다. Google Maps, Twitter, Facebook, PayPal 등과 같은 많은 거대한 웹사이트와 서비스는 개발자가 이들의 데이터(e.g. twitter 스트림을 자신의 블로그에 표시)와 서비스(e.g.자신의 사이트에 사용자가 로그인할 때 Facebook 로그인을 사용)를 사용할 수 있도록 API를 제공한다. 이 글은 브라우저 API와 서드파티 API 사이의 차이점을 살펴보고, 서드파티 API의 몇 가지 전형적인 사용법(uses)을 보여준다.

## 서드파티 API란? (What are third party APIs?)

서드파티 API는 서드파티 - 일반적으로 Facebook, Twitter, Google과 같은 회사들 - 가 자바스크립트를 통해 이들의 기술에 접근하고, 이를 사이트에 사용할 수 있도록 제공하는 API이다. 가장 대표적인(obvious) 예시는 페이지에 사용자 정의 지도를 표시하기 위해 mapping API를 사용하는 것이다.

간단한 Mapquest API 예제를 봐보고, 이를 서드파티 API가 브라우저 API와 어떻게 다른지 설명하는데 사용할 것이다.

> Note: 한 번에 [해당 예제 코드 전체를 얻고](https://developer.mozilla.org/en-US/docs/Learn#getting_our_code_examples) 싶을 수도 있다. 이 경우 각 섹션에서 필요한 예지 파일의 저장소를 검색할 수 있다.

### 이들은 서드파티 서버에 만들어져 있다 (They are found on third-party servers)

브라우저 API는 브라우저에 내장되어 있다 - 자바스크립트에서 바로 접근할 수 있다. 예를 들어, [개요 글에서 봤던](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Client-side_web_APIs/Introduction#how_do_apis_work) Web Audio API는 native [AudioContext](https://developer.mozilla.org/en-US/docs/Web/API/AudioContext) 객체를 통해 접근할 수 있다. 예를 들어:

```js
const audioCtx = new AudioContext();
  ...
const audioElement = document.querySelector('audio');
  ...
const audioSource = audioCtx.createMediaElementSource(audioElement);
// etc.
```

반면에, 서드파티 API는 서드파티 서버에 위치한다. 자바스크립트에서 이들에 접근하려면, 먼저 API 기능을 연결하고, 홈페이지에서 사용할 수 있도록 해야 한다. 이는 Mapquest 예제에서 볼 수 있듯이 일반적으로 먼저 [`<script>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script) 요소를 통해 서버에서 사용할 수 있는 자바스크립트 라이브러리에 연결하는 것을 포함한다.

```html
<script src="https://api.mqcdn.com/sdk/mapquest-js/v1.3.2/mapquest.js" defer></script>
<link type="text/css" rel="stylesheet" href="https://api.mqcdn.com/sdk/mapquest-js/v1.3.2/mapquest.css"/>
```

그러면 해당 라이브러리에서 사용할 수 있는 객체를 사용하기 시작할 수 있다. 예를 들어:

```js
const map = L.mapquest.map('map', {
  center: [53.480759, -2.242631],
  layers: L.mapquest.tileLayer('map'),
  zoom: 12
});
```

여기서 지도 정보를 저장할 변수를 만들고, 그다음 `mapquest.map()` 메소드를 사용해서 새로운 지도를 만들어, 지도를 표시하고 싶은 [`<div>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/div) 요소의 ID('map')와 표시하고 싶은 특정 지도의 세부사항을 포함한 옵션 객체를 매개변수로 받는다. 이 경우에는 지도 중심의 좌표와 보여줄 `map` 타입의 지도 레이어 (`mapquest.tileLayer()` 사용해 생성한다), 그리고 기본 축척(zoom level)을 지정한다.

이것이 Mapquest API가 간단한 지도를 그리는데 필요한 모든 정보이다. 보여주고자 하는 영역에 대한 올바른 지도 타일을 표시하는 것 등의 모든 복잡한 것들은 연결한 서버에서 처리한다.

> Note: 일부 API는 개발자에게 데이터를 받기 위한 특정 URL 패턴의 HTTP 요청을 만들도록 요구하는 방식으로 해당 기능에 대한 접근을 조금 다르게 처리한다. 이는 [이후에 예제로 다룰 예정이며 RESTful API](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Client-side_web_APIs/Third_party_APIs#a_restful_api_—_nytimes)라고 불린다.

### 일반적으로 API 키를 요구한다 (They usually require API keys)

브라우저 API를 위한 보안은 [첫 번째 글에서 논의했던 것처럼](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Client-side_web_APIs/Introduction#they_have_additional_security_mechanisms_where_appropriate) 권한 프롬프트를 통해서 처리(handle)하는 경향이 있다. 이것의 목적은 사용자가 자신이 방문한 웹사이트에서 무슨 일이 일어나는지 알고, 부적절한 방법으로 API를 사용하는 누군가의 희생자가 될 가능성이   작도록 하기 위함이다.

서드파티 API는 약간 다른 권한 시스템을 갖는다 - 개발자 키를 사용해 개발자에게 API 기능에 대한 접근 권한을 허락하는 경향이 있으며, 사용자보다는 API 공급 업체를 보호한다.

Mapquest API 예제에서 다음과 비슷한 코드를 발견할 수 있을 것이다:

```js
L.mapquest.key = 'YOUR-API-KEY-HERE';
```

이 코드는 특정 API 혹은 애플리케이션에서 사용하는 개발자 키를 지정한다 - 애플리케이션의 개발자는 반드시 키를 얻어 API 기능에 대한 접근을 허락하기 위해 자신의 코드에 이를 반드시 포함해야 한다. 현재 예제에서는 자리 표시자만 제공한다.

> Note: 자신만의 예제를 만들 때는, 어떤 모든 자리 표시자의 자리에 자신의 API 키를 사용한다.

다른 API는 키를 약간 다른 방식으로 포함하도록 요구할 수도 있지만, 대부분의 경우 방식은 상대적으로 비슷하다.

키를 요구하면 API 공급자는 API 사용자에게 해당 작업에 대한 책임을 물을 수 있습니다. 개발자가 키를 위해 등록하면, API 제공자에게 알려지며, API로 부적절한 행동을 하기 시작하면 (예를 들어, 사람들의 위치를 추적하거나, API의 작동을 멈추기 위해 많은 요청으로 API를 스팸 처리하려고 시도하는 등) API 제공자가 조치를 할 수 있다. 가장 쉬운 조치는 API 허가(privileges)를 철회하는 것이다.

## Mapquest 예제를 확장하기 (Extending the Mapquest example)

### 지도의 유형을 바꾸기 (Changing the type of map)

### 다른 조작을 추가하기 (Adding different controls)

### 사용자 정의 마커를 추가하기 (Adding a custom marker)

## A RESTful API — NYTimes

다른 API 예제를 봐보자 - [New York Times API](https://developer.nytimes.com). 이 API는 New York Times 뉴스 기사 정보를 가져오고, 이를 사용자의 사이트에 게시할 수 있게 해준다. 이런 유형의 API는 **RESTful API**라고 알려져 있다 - Mapquest에서 한 것처럼 자바스크립트 라이브러리의 기능을 사용해 데이터를 얻어오는 대신, 검색어나 (종종 URL 매개변수로) URL에 인코딩된 다른 속성과 함께 특정 URL의 HTTP 요청을 만들어 데이터를 얻는다. 이는 API에서 마주치는 흔한 패턴이다.

## 서드파티 API를 사용하기 위한 방법 (An approach for using third-party APIs)

아래에서, NYTimes API를 사용하는 방법을 예제로 안내할 것이며, 또한 새로운 API를 다루기 위한 방법으로 사용할 수 있도록 따라 할 일반적인 단계를 제공한다.

### 문서를 찾는다 (Find the documentation)

서드파티 API를 사용하고 싶을 때, API에 어떤 기능이 있는지, 그걸 어떻게 사용하는지 등을 알 수 있도록 문서가 어디 있는지 찾는 것이 필수적이다. New York Times API 문서는 https://developer.nytimes.com/에 있다.

### 개발자 키를 얻는다 (Get a developer key)

대부분의 API는 보안과 책임을 위해 일종의 개발자 키를 요구한다. NYTimes API 키를 등록하기 위해서는 https://developer.nytimes.com/get-started의 안내를 따르자.

1. 기사 검색(Article Search) API를 위한 키를 요청해보자 - 새로운 앱을 만들고, 이를 사용하려는 API로 선택한다 (이름과 설명을 기재하고, "Article Search API" 아래 있는 스위치를 on의 위치로 바꾼 뒤, "Create"를 클릭한다).
1. 결과 페이지에서 API 키를 얻는다.
1. 이제, 예제를 시작하기 위해, [nytimes/start](https://github.com/mdn/learning-area/tree/main/javascript/apis/third-party-apis/nytimes/start) 디렉토리 모든 파일의 복사본을 만든다. 이미 [예제 저장소를 클론했다면](https://developer.mozilla.org/en-US/docs/Learn#getting_our_code_examples), 이미 이 파일들의 복사본을 갖고 있고, javascript/apis/third-party-apis/nytimes/start 디렉토리에서 찾을 수 있을 것이다. 우선 `script.js` 파일이 예제를 설정하기 위해 필요한 많은 변수를 포함하고 있다; 그 아래 필요한 기능을 채울 것이다.

해당 앱은 검색어와 선택적으로 시작 및 종료 날짜를 입력할 수 있게 될 것이며, 문서 검색 API를 쿼리하고 검색 결과를 표시하는 데 사용된다.

### API를 앱에 연결한다 (Connect the API to your app)

첫 번째로, API와 앱 사이를 연결해야 한다. 이 API의 경우, 올바른 URL의 서비스에서 데이터를 요청할 때마다 API 키를 [get](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/GET) 매개변수로 포함해야 한다.

1. 다음의 코드를 찾는다:

    ```js
    const key = 'INSERT-YOUR-API-KEY-HERE';
    ```

    기존(existing) API 키를 이전 섹션에서 얻은 실제 API 키로 교체한다.

1. 다음의 코드를 자바스크립트의 "`// Event listeners to control the functionality`" 주석 아래 추가한다. 이 코드는 양식이 제출될 때(버튼이 눌렸을 때) `submitSearch()`라는 함수를 실행할 것이다.

    ```js
    searchForm.addEventListener('submit', submitSearch);
    ```

1. 이제 이전의 코드 아래 `submitSearch()`와 `fetchResults()` 함수 정의를 추가한다:

    ```js
    function submitSearch(e) {
      pageNumber = 0;
      fetchResults(e);
    }

    function fetchResults(e) {
      // Use preventDefault() to stop the form submitting
      e.preventDefault();

      // Assemble the full URL
      let url = `${baseURL}?api-key=${key}&page=${pageNumber}&q=${searchTerm.value}&fq=document_type:("article")`;

      if (startDate.value !== '') {
        url = `${url}&begin_date=${startDate.value}`;
      };

      if (endDate.value !== '') {
        url = `${url}&end_date=${endDate.value}`;
      };
    }
    ```

`submitSearch()`는 페이지 번호를 0으로 다시 설정하여 시작한 다음 `fetchResults()`를 호출한다. `fetchResults()`는 실제로 양식이 제출되는 것(예제가 제대로 실행되지 못하게 한다)을 막기 위해 먼저 이벤트 객체의 [`preventDefault()`](https://developer.mozilla.org/en-US/docs/Web/API/Event/preventDefault)를 호출한다. 다음으로, 요청을 만들 전체 URL을 합치기 위해 문자열을 조작한다. 먼저 이 데모를 위해 필수적이라고 생각되는 부품을 합치는 것으로 시작한다:

* 기본 URL (`baseURL` 변수에서 가져온다).
* API 키, `api-key` URL 매개변수로 지정된다 (값은 `key` 변수에서 가져온다).
* 페이지 번호, `page` URL 매개변수로 지정된다 (값은 `pageNumber` 변수에서 가져온다).
* 검색어, `q` URL 매개변수로 지정된다. (값은 `serchTerm`의 텍스트 [`<input>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input)에서 가져온다).
* 문서의 유형, `fq` URL 매개변수를 통해 전달된 표현식에 지정된 대로 결과를 반환한다. 이 경우에는 기사(article)를 반환한다.

다음으로, 몇몇 [`if()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/if...else)문을 사용해서 `startDate`와 `endDate` `<input>`들의 값이 채워졌는지를 확인할 것이다. 만약 값이 채워져 있다면, 이들의 값을 각각 `begin_date`와 `end_date` URL 매개변수로 URL에 추가한다.

그러므로, 완성된 URL은 다음과 같이 보일 것이다:

```
https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=YOUR-API-KEY-HERE&page=0&q=cats&fq=document_type:("article")&begin_date=20170301&end_date=20170312
```

> Note: 포함될 수 있는 URL 매개변수에 대한 더 자세한 내용은 [NYTimes developer docs](https://developer.nytimes.com)에서 찾을 수 있다.

> Note: 위의 예제에는 기본적인 양식 데이터 유효성 검사를 포함(have)한다 - 검색어 필드는 양식을 제출하기 전에 채워져야 하고 (`required` 속성을 사용해 할 수 있다), 데이터 필드의 `pattern` 속성값을 지정할 수 있다. 즉 값이 8개의 숫자로 구성되지 않으면 양식이 제출되지 않는다 (`pattern="[0-9]{8}"`). 자세한 내용은 [양식 데이터 유효성 검사](https://developer.mozilla.org/en-US/docs/Learn/Forms/Form_validation)를 참고하자.

### API에 데이터를 요청하기 (Requesting data from the API)

이제 URL을 구성했으니, URL에 대한 요청을 만들어보자. [`Fetch API`](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)를 사용할 것이다.

다음의 코드 블록을 `fetchResults()` 함수 안에, 닫는 괄호 바로 위에 추가하자:

```js
// Use fetch() to make the request to the API
fetch(url)
  .then( response => response.json() )
  .then( json => displayResults(json) )
  .catch( error => console.error(`Error fetching data: ${error.message}`) );
```

여기서 `url` 변수를 [`fetch()`](https://developer.mozilla.org/en-US/docs/Web/API/fetch) 변수에 전달해 요청을 실행하고, 응답 본문(body)을 [`json`](https://developer.mozilla.org/en-US/docs/Web/API/Response/json) 함수를 사용해 JSON으로 변환한 뒤, 다음으로 결과 JSON을 `dieplayResults()` 함수에 전달해 데이터가 UI에 표시되도록 한다. 또한 발생할 수 있는 오류를 감지하고 추적한다.

### 데이터를 표시하기 (Displaying the data)

데이터를 표시하는 방법을 살펴보자. 다음의 함수를 `fetchResults()` 함수 아래 추가한다.

```js
function displayResults(json) {
  while (section.firstChild) {
    section.removeChild(section.firstChild);
  }

  const articles = json.response.docs;

  if (articles.length === 10) {
    nav.style.display = 'block';
  } else {
    nav.style.display = 'none';
  }

  if (articles.length === 0) {
    const para = document.createElement('p');
    para.textContent = 'No results returned.'
    section.appendChild(para);
  } else {
    for (const current of articles) {
      const article = document.createElement('article');
      const heading = document.createElement('h2');
      const link = document.createElement('a');
      const img = document.createElement('img');
      const para1 = document.createElement('p');
      const keywordPara = document.createElement('p');
      keywordPara.classList.add('keywords');

      console.log(current);

      link.href = current.web_url;
      link.textContent = current.headline.main;
      para1.textContent = current.snippet;
      keywordPara.textContent = 'Keywords: ';
      for (const keyword of current.keywords) {
        const span = document.createElement('span');
        span.textContent = `${keyword.value} `;
        keywordPara.appendChild(span);
      }

      if (current.multimedia.length > 0) {
        img.src = `http://www.nytimes.com/${current.multimedia[0].url}`;
        img.alt = current.headline.main;
      }

      article.appendChild(heading);
      heading.appendChild(link);
      article.appendChild(img);
      article.appendChild(para1);
      article.appendChild(keywordPara);
      section.appendChild(article);
    }
  }
};
```

코드가 매우 많다; 단계별로 설명해 보자.

```js
  while (section.firstChild) {
    section.removeChild(section.firstChild);
  }
```

* [`while`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/while) 반복문은 DOM 요소의 모든 내용을 제거하는데 흔하게 사용되는 패턴으로, 이 경우, [`<section>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/section) 요소를 지운다. `<section>`이 첫 번째 자식을 갖는지 계속 확인하고, 만약 그렇다면, 첫 번째 자식을 제거한다. `<section>`이 더는 자식을 갖지 않으면 반복문이 종료된다.

```js
  const articles = json.response.docs;
```

* 다음으로, `article` 변수를 `json.response.docs`와 같게 설정한다 - `json.response.docs`는 검색 결과로 반환된 기사를 나타내는 모든 객체를 포함(holding)하는 배열이다. 이건 순전히 다음 코드를 더 간단하게 하기 위한 것이다.

```js
  if (articles.length === 10) {
    nav.style.display = 'block';
  } else {
    nav.style.display = 'none';
  }
```

* 첫 번째 [`if`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/if...else) 블록은 기사가 10개 반환됐는지 확인하는 것이다 (API는 한 번에 10개의 기사를 반환한다). 만약 그렇다면, 이전 10/다음 10의 페이지네이션 버튼을 포함한 [`<nav>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/nav)를 표시한다. 만약 기사가 10개 미만으로 반환되었다면, 한 페이지에 다 들어갈 수 있으므로, 페이지네이션 버튼을 보여줄 필요가 없다. 페이지네이션 기능은 다음 섹션에서 연결할 것이다.

```js
  if (articles.length === 0) {
    const para = document.createElement('p');
    para.textContent = 'No results returned.'
    section.appendChild(para);
  } 
```

* 다음 `if()` 블록은 반환된 기사가 없는지 확인한다. 만약 그렇다면 어떤 기사도 표시할 필요가 없다 - "No results returned"라는 텍스트를 포함한 [`<p>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/p)를 만들어 `<section>`안에 삽입한다.

```js
  if (articles.length === 0) {
    // ...
  } else {
    for (const current of articles) {
      const article = document.createElement('article');
      const heading = document.createElement('h2');
      const link = document.createElement('a');
      const img = document.createElement('img');
      const para1 = document.createElement('p');
      const keywordPara = document.createElement('p');
      keywordPara.classList.add('keywords');

      console.log(current);

      link.href = current.web_url;
      link.textContent = current.headline.main;
      para1.textContent = current.snippet;
      keywordPara.textContent = 'Keywords: ';

      // ...

      article.appendChild(heading);
      heading.appendChild(link);
      article.appendChild(img);
      article.appendChild(para1);
      article.appendChild(keywordPara);
      section.appendChild(article);
    }
  }
```

* 만약 몇몇 기사가 반환되었다면 우선, 먼저, 각 뉴스 기사를 표시하는데 사용할 모든 요소를 생성하고, 각각에 맞는 내용을 삽입한 뒤, 이들을 적절한 위치의 DOM에 삽입한다. 기사 객체의 어떤 속성에 표시할 올바른 데이터가 포함되어 있는지 확인하기 위해, Article Search API 레퍼런스를 참고했다 ([NYTimes APIs](https://developer.nytimes.com/apis)를 봐보자). 이 작업의 대부분은 꽤 분명하지만, 몇몇은 따로 다룰 만 하다.

    ```js
        for (const keyword of current.keywords) {
          const span = document.createElement('span');
          span.textContent = `${keyword.value} `;
          keywordPara.appendChild(span);
        }
    ```

    * [`for...of`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...of) 반복문을 사용해 각 기사와 관련된 모든 키워드를 거쳐, 각 키워드를 `<p>` 안의 자신만의 [`<span>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/span)에 삽입한다.

    ```js
        if (current.multimedia.length > 0) {
          img.src = `http://www.nytimes.com/${current.multimedia[0].url}`;
          img.alt = current.headline.main;
        }
    ```

    * `if()` 블록(`if(current.multimedia.length > 0) { ... }`)을 사용해 각 기사가 관련된 이미지를 함께 갖는지 확인한다 (일부 기사는 그러지 않는다). 만약 연관된 이미지가 존재하면 첫 이미지만 표시한다 (그러지 않으면 오류가 발생할 것이다).

### 페이지네이션 버튼을 연결하기 (Wiring up the pagination buttons)

페이지네이션 버튼이 작동하도록 하기 위해, `pageNumber` 변수의 값을 증가(혹은 감소)시키고, 그다음 새로운 페이지 URL 매개변수 값을 포함해 fetch 요청을 재-재실행할 것이다. 이는 NYTimes API가 한 번에 10개의 결과만을 반환하기 때문에 작동한다 - 10개 이상의 결과를 사용할 수 있는 경우에는, `page` URL 매개변수를 0으로 설정하면(혹은 어떤 매개변수도 포함하지 않으면) 처음 10(0-9)개가 반환되고, 1로 설정하면 그다음 10(10-19)개를 반환된다.

이는 간단한 페이지네이션 함수를 작성할 수 있도록 해준다.

1. 작성해놓은 [`addEventListener()`](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener) 호출 아래, 다음의 새로운 두 이벤트 리스너를 추가한다. 이 두 이벤트 리스너는 연결된 버튼을 클릭했을 때 `nextPage()`와 `previousPage()` 함수를 호출한다.

    ```js
    nextBtn.addEventListener('click', nextPage);
    previousBtn.addEventListener('click', previousPage);
    ```

1. 이전에 추가한 코드 아래에, 두 함수를 정의하자 - 지금 다음의 코드를 추가하자:

    ```js
    function nextPage(e) {
      pageNumber++;
      fetchResults(e);
    };

    function previousPage(e) {
      if(pageNumber > 0) {
        pageNumber--;
      } else {
        return;
      }
      fetchResults(e);
    };
    ```

    * 첫 번째 함수는 `pageNubmer` 변수를 증가시키고, 그다음에 `fetchResult()` 함수를 다시 호출해 다음 페이지의 결과를 표시한다.
    * 두 번째 함수는 거의 정확히 같은 방식이면서 그 반대로 동작하지만, `pageNumber`를 감소시키기 전에 그 값이 이미 0이 아닌지 확인하는 추가적인 단계가 필요하다 - 음수인 `page` URL 매개변수로 fetch 요청을 실행하면 오류가 발생할 것이다. 만약 `pageNumber`가 이미 0이면, 함수를 [`return`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/return)한다 - 만약 이미 첫 번째 페이지라면 같은 결과를 다시 불러올 필요가 없다.

> Note: [완성된 NYTimes API 예제 코드를 깃헙에서](https://github.com/mdn/learning-area/blob/main/javascript/apis/third-party-apis/nytimes/finished/index.html) 찾을 수 있다 ([실제 실행 예제도 봐보자](https://mdn.github.io/learning-area/javascript/apis/third-party-apis/nytimes/finished/)).

## 유튜브 예제 (YouTube example)
