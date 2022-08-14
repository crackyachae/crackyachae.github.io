---
layout  : article
title   : 템플릿 기본서 (Template primer)
summary : 
date    : 2022-01-22 12:17:33 +0900
updated : 2022-01-22 16:19:39 +0900
tag     : draft
toc     : true
public  : true
parent  : [[/js-library/express/mdn-learn-web-server-3/7-express-tutorial-5]]
latex   : false
---
* TOC
{:toc}

> 이 글은 MDN Learn web development의 [Express web framework (Node.js/JavaScript)](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs) 중 [Template primer](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/Displaying_data/Template_primer)의 내용을 번역 및 정리한 글입니다.
>
> * 제가 필요한 부분 위주로 확인하면서 정리하고 있어 글에 덜 작성된 부분이 있을 수 있습니다.
> * 글 작성 후 원문의 내용이 수정되거나 내용을 이해하기 위한 개인적인 설명이나 해석이 있을 수 있습니다. 되도록 원문을 참고해주시길 바랍니다.
> * 잘못된 부분이 있다면 댓글이나 그 외 편하신 방법으로 알려주시면 감사하겠습니다.

템플릿은 템플릿이 렌더링 될 때 데이터가 들어갈 곳을 나타내는 자리 표시자(placeholder)와 함께 출력(output) 파일의 *구조*나 레이아웃을 정의하는 텍스트 파일이다 (*Express*에서는 템플릿을 *뷰(views)*라고 한다).

## Express 템플릿 선택 (Express template choices)

Express는 다양한 [템플릿 렌더링 엔진](https://expressjs.com/en/guide/using-template-engines.html)과 함께 사용할 수 있다. 이 튜토리얼에서는 [Pug](https://pugjs.org/api/getting-started.html)(이전에는 *Jade*로 알려진)를 템플릿으로 사용할 것이다. Pug는 가장 유명한 노드 템플릿 언어로, 자신을 "[Haml](https://haml.info)에 영향을 많이 받은 HTML 작성을 위한 깨끗하고, 공백에 영향을 받는(whitespace-sensitive) 문법"이라고 설명한다.

템플릿 언어에 따라 레이아웃을 정의하고 데이터를 위한 자리 표시자를 나타내기(marking) 위해 서로 다른 방식을 사용한다 - 일부는 레이아웃을 정의하기 위해 HTML을 사용하고, 다른 일부는 HTML로 트랜스 파일(transpile) 될 수 있는 다른 마크업 형식을 사용한다. Pug는 두 번째 유형이다;

Pug는

* HTML의 *대행(representation)*을 사용하는데,
* 어떤 줄이든 그 줄의 첫 번째 단어가 일반적으로 HTMl 요소를 나타내며,
* 그다음 줄의 들여쓰기(indentation)는 중첩을 나타내는 데 사용된다.

그 결과물로 바로 HTML로 전환(translate)할 수 있지만, 더 간결하고 틀림없이 읽기 쉬운 페이지 정의를 얻는다.

> Note: *Pug*를 사용할 때 단점은 Pug가 들여쓰기와 공백에 민감하다는 것이다 (잘못된 곳에 공백을 추가하면 쓸모없는(unhelpful) 코드 오류를 얻을 수 있다). 하지만 만약 템플릿을 적절하게 배치한다면 코드를 읽고 유지 보수하기 매우 쉬울 것이다.

## 템플릿 구성 (Template configuration)

[뼈대 웹사이트를 생성](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/skeleton_website)했을 때 *지역 도서관* 예제는 [Pug](https://pugjs.org/api/getting-started.html)를 사용해서 구성했다. 웹사이트 **package.json** 파일의 의존성 라이브러리에 Pug 모듈이, **app.js** 파일에 다음 설정이 포함되어있어야 한다.

```js
// View engine setup.
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
```

뷰 디렉토리를 보면 프로젝트의 기본 뷰에 대한 .pug 파일을 볼 수 있을 것이다. 여기에는 홈페이지를 위한 뷰(**index.pug**)와 자체 콘텐츠로 대체하는데 필요한 기본 템플릿(**layout.pug**)에 대한 뷰가 포함된다.

```
/express-locallibrary-tutorial  //the project root
  /views
    error.pug
    index.pug
    layout.pug
```

## 템플릿 구문 (Template syntax)

아래의 예제 템플릿 파일은 Pug의 가장 유용한 기능을 보여준다.

눈여겨볼 첫 번째는 파일이 전형적인 HTML 파일의 구조를 매핑한다는 것이다.

* (대부분) 모든 줄의 첫 번째 단어는 HTML 요소를,
* 들여쓰기는 중첩된 요소를 나타내는 데 쓰인다.
    * 예를 들어, `body` 요소는 `html` 요소 안에, 단락 요소(`p`)들은 `body` 요소 안에 있는 등의 식이다.
* 중첩되지 않은 요소는 (e.g. 개별 단락) 별도의 줄로 있다.

```pug
doctype html
html(lang="en")
  head
    title= title
    script(type='text/javascript').
  body
    h1= title

    p This is a line with #[em some emphasis] and #[strong strong text] markup.
    p This line has un-escaped data: !{'<em> is emphasised</em>'} and escaped data: #{'<em> is not emphasised</em>'}.
      | This line follows on.
    p= 'Evaluated and <em>escaped expression</em>:' + title

    <!-- You can add HTML comments directly -->
    // You can add single line JavaScript comments and they are generated to HTML comments
    //- Introducing a single line JavaScript comment with "//-" ensures the comment isn't rendered to HTML

    p A line with a link
      a(href='/catalog/authors') Some link text
      |  and some extra text.

    #container.col
      if title
        p A variable named "title" exists.
      else
        p A variable named "title" does not exist.
      p.
        Pug is a terse and simple template language with a
        strong focus on performance and powerful features.

    h2 Generate a list

    ul
      each val in [1, 2, 3, 4, 5]
        li= val
```

요소 속성(attributes)은 연관된 요소 다음의 괄호 안에 정의된다. 괄호 안에서, 속성은 쉼표(comma) 또는 공백(whitespace)으로 구분된 속성 이름과 속성값 쌍의 목록으로 정의되어있다. 예를 들어:

* `script(type='text/javascript'), link(rel='stylesheet', href='/stylesheets/style.css')`
* `meta(name='viewport' content='width=device-width initial-scale=1')`

자바스크립트 삽입(injection) 혹은 사이트 간 스크립팅 (cross-site scripting) 공격을 막기 위해 모든 속성값은 *이스케이프* (e.g. "`>`"와 같은 문자는 "`&gt;`"와 같은 동일한 HTML 코드로 변환된다) 된다.

만약 태그 다음에 등호가 오면, 다음의 텍스트는 자바스크립트 *표현식(expression)*으로 처리된다. 예를 들어, 아래의 첫 번째 줄에서, `h1` 태그의 내용은 (파일 안에서 정의되거나 Express에서 템플릿으로 전달될) 변수 `title`이 될 것이다. 두 번째 줄에서는 `title` 변수와 연결된 텍스트 문자열이 단락 내용이다. 두 경우 모두 줄을 *이스케이프*하는 것이 기본 동작이다.

```pug
h1= title
p= 'Evaluated and <em>escaped expression</em>:' + title
```

만약 태그 다음에 등호가 없으면 그 내용은 일반(plain) 텍스트로 처리된다. 일반 텍스트 안에는 아래 보이는 것처럼 `#{}`와 `!{}` 구문을 각각 사용해서 이스케이프 되거나 이스케이프 되지 않은 데이터를 삽입할 수 있다. 또한, 일반 텍스트 안에 로우(raw) HTML도 추가할 수 있다.

```pug
p This is a line with #[em some emphasis] and #[strong strong text] markup.
p This line has an un-escaped string: !{'<em> is emphasised</em>'}, an escaped string: #{'<em> is not emphasised</em>'}, and escaped variables: #{title}.
```

> Note: 대부분의 경우 사용자의 데이터를 (`#{}` 구문을 통해) 항상 이스케이프 하고 싶을 것이다. 신뢰할 수 있는 데이터(e.g. 생성된 레코드의 횟수 등)는 값을 이스케이프 하지 않고 표시될 수도 있다.

줄의 시작에 파이프 ("|") 문자를 사용해 "[일반 텍스트(plain text)](https://pugjs.org/language/plain-text.html)"를 나타낼 수 있다. 예를 들어, 아래에 보이는 추가적인 텍스트는 앞의 앵커(anchor)와 같은 줄에 표시되지만, 링크가 걸리지는 않을 것이다.

```pug
a(href='http://someurl/') Link text
| Plain text
```

Pug에서는 `if`, `else`, `else if`, `unless`를 사용한 조건 연산을 수행할 수 있다 - 예를 들어:

```pug
if title
  p A variable named "title" exists
else
  p A variable named "title" does not exist
```

또한 `each-in` 혹은 `while` 구문을 사용해서 반복(loop/iteration) 연산도 수행할 수도 있다. 아래의 코드 조각에서 변수 목록을 표시하기 위해 배열을 순회(loop)한다 (아래에서 'li='을 사용해 "val"을 변수로 평가한다는 것을 확인하자). 순회(iterate across)하는 값은 템플릿에 변수로 전달될 수도 있다.

```pug
ul
  each val in [1, 2, 3, 4, 5]
    li= val
```

## Extending templates

사이트 전반에 걸쳐, 헤더, 푸터, 내비게이션 등을 위한 표준 HTML 마크업을 포함해서, 모든 페이지에서 공통된 구조를 갖는 것이 일반적이다. 개발자들이 이 "보일러 플레이트(boilerplate)"를 페이지마다 복제하도록 강제하는 대신, *Pug*는 기본 템플릿을 선언하고 각 상세 페이지에서 조금씩 다른 부분을 바꿔(replace)가면서 이를 확장할 수 있도록 해준다.

예를 들어, [뼈대 프로젝트](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/skeleton_website)에서 생성한 기본 템플릿 **layout.pug**는 다음과 같이 생겼다:

```pug
doctype html
html
  head
    title= title
    link(rel='stylesheet', href='/stylesheets/style.css')
  body
    block content
```

`block` 태그는 파생된 템플릿에서 대체될 수 있는 콘텐츠의 섹션을 표시(mark up)하는 데 사용된다 (블록이 다시 정의되지 않는 경우 기본 클래스에서 구현한 것이 사용된다).

(뼈대 프로젝트에서 생성한) 기본 **index.pug**는 기본 템플릿을 재지정하는 방법을 보여준다. `extends` 태그는 사용할 기본 템플릿을 식별하고, 그다음에 `block section_name`을 사용해 재지정할 섹션의 새로운 내용을 나타낸다.

```pug
extends layout

block content
  h1= title
  p Welcome to #{title}
```
