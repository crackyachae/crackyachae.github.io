---
layout  : article
title   : Express Tutorial Part 6: 양식 작업하기 (Working with forms)
summary : 
date    : 2022-03-28 14:35:50 +0900
updated : 2022-03-28 22:25:21 +0900
tag     : draft
toc     : true
public  : true
parent  : [[/js-library/express/mdn-learn-web-server-3]]
latex   : false
---
* TOC
{:toc}

> 이 글은 MDN Learn web development의 [Express web framework (Node.js/JavaScript)](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs) 중 [Express Tutorial Part 6: Working with forms](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/forms)의 내용을 번역 및 정리한 글입니다.
>
> * 제가 필요한 부분 위주로 확인하면서 정리하고 있어 글에 덜 작성된 부분이 있을 수 있습니다.
> * 글 작성 후 원문의 내용이 수정되거나 내용을 이해하기 위한 개인적인 설명이나 해석이 있을 수 있습니다. 되도록 원문을 참고해주시길 바랍니다.
> * 잘못된 부분이 있다면 댓글이나 그 외 편하신 방법으로 알려주시면 감사하겠습니다.

## 개요 (Overview)

[HTML 양식](https://developer.mozilla.org/en-US/docs/Learn/Forms)은 서버에 제출하기 위해 사용자로부터 정보를 수집하는 데 사용하는 웹 페이지의 하나 이상의 필드/위젯 그룹이다. 폼 양식에는 다양한 종류의 데이터를 입력할 수 있는 적절한 입력 양식이 있어서 사용자의 입력을 수집하는 유연한 메커니즘이라고 할 수 있다 - 텍스트 박스, 체크 박스, 라디오 버튼, 날짜 선택기 등. 또한, 양식은 사이트 간 요청 위조 방지 기능을 통해 `POST` 요청으로 데이터를 전송할 수 있어 서버와 데이터를 공유하는 비교적 안전한 방식이다.

양식을 다루는 것은 복잡할 수 있다! 개발자는 양식을 위한 HTML을 작성하고, 서버(그리고 아마 브라우저에서도)에서 입력된 데이터를 검증하고 적절히 수정(sanitize)하고, 유효하지 않은 필드가 있다면 사용자에게 안내하기 위해 오류 메시지와 함께 양식을 다시 게시해야 하고, 데이터가 성공적으로 제출됐을 때는 이를 처리해야 하고, 마지막으로 성공을 안내하기 위해 어떤 방식으로 사용자에게 응답해야 한다.

이 튜토리얼에서는, 위의 동작이 Express에서 어떻게 수행되는지 보여줄 것이다. 그 과정에서 사용자가 도서관의 항목을 생성, 수정, 삭제할 수 있도록 지역 도서관 웹사이트를 확장할 것이다.

> Note: 아직 특정 라우트를 인증된 사용자에게만 제한하는 방법을 살펴보지 않았으므로, 이 시점에서는 모든 사용자가 데이터베이스를 변경할 수 있다.

### HTML 양식 (HTML Forms)

첫 번째로 [HTML 양식](https://developer.mozilla.org/en-US/docs/Learn/Forms)에 대한 간단한 개요를 살펴보자. 어떤 "팀" 이름을 입력하기 위한 한 개의 텍스트 입력과 관련 레이블이 있는 간단한 HTML을 생각해보자:

![form example name field](/post-img/mdn-learn-web-server-3-8-express-tutorial-6/form_example_name_field.png)

해당 양식은 `<form>...</form>` 태그 안에 요소의 모음으로 HTML에 정의되어 있으며, `type="submit"`의 `input` 요소를 최소한 한 개 포함한다.

```html
<form action="/team_name_url/" method="post">
    <label for="team_name">Enter name: </label>
    <input id="team_name" type="text" name="name_field" value="Default name for team.">
    <input type="submit" value="OK">
</form>
```

여기서는 팀 이름을 입력하기 위한 딱 한 개의 (텍스트) 필드만 포함하고 있지만, 양식은 몇 개의 다른 입력 요소와 이들의 관련 레이블을 포함할 수 있다. 필드의 `type` 속성은 어떤 종류의 위젯을 표시할지 정의한다. 필드의 `name`과 `id`는 JavaScript/CSS/HTML에서 필드를 식별하기 위해 사용되고, `value`는 필드가 처음 표시될 때 필드의 초깃값을 정의하기 위해 사용된다. 일치하는 팀 레이블은 `label` 태그를 사용해 지정하며(위의 "Enter name"을 보자), `for` 필드는 연관된 입력의 `id` 값을 포함한다.

`submit` 입력은 (기본적으로) 버튼으로 표시된다 - 이 버튼은 사용자가 다른 입력 요소에 포함된 데이터를(이 경우에는, `team_name`만) 서버에 올리기 위해 누를 수 있다. 양식 속성은 데이터를 보내는 데 사용될 HTTP `method`와 서버에 있는 데이터 목적지 (`action`)을 정의한다:

* `action`: 양식이 제출됐을 때 데이터를 처리하기 위해 보내는 리소스/URL. 이 값이 설정되지 않으면 (혹은 빈 문자열로 설정되면), 양식은 현재 페이지의 URL로 다시 제출된다.
* `method`: 데이터를 전송하는 데 사용할 HTTP 메소드: `POST` 혹은 `GET`
    * `POST` 메소드가 사이트 간 위조 요청 공격에 더 안전(resistant)한 편이기 때문에 데이터가 서버 데이터베이스를 변경시킬 때에는 항상 `POST` 메소드를 사용해야 한다.
    * `GET` 메소드는 사용자의 데이터를 변경하지 않는 양식에만 사용되어야 한다 (e.g. 검색창). 주로 북마크나, URL 공유를 사용하고 싶을 때 추천한다.

### 양식 처리 과정 (Form handling process)

양식 처리는 모델에 대한 정보를 표시하기 위해 배웠던 것과 같은 기술을 모두 사용한다: 라우트는 모델의 데이터 읽기를 포함해, 필요한 데이터베이스 동작을 수행하는 컨트롤러 함수에 요청을 전송하고, HTML 데이터를 생성해 반환한다. 일을 좀 더 복잡하게 만드는 것은 서버는 사용자가 제공한 데이터를 처리할 수 있어야 하고, 문제가 있다면 오류 정보와 함께 양식을 다시 표시해야 한다는 점이다.

양식 요청을 처리하기 위한 과정 흐름도(process flowchart)가 아래 나타나 있고, 양식을 포함하는 페이지의 요청(초록색으로 보인다)에서 시작한다.

![web server form handling](/post-img/mdn-learn-web-server-3-8-express-tutorial-6/web_server_form_handling.png)

위의 다이어그램에 나타난 것처럼, 양식을 다루는 코드가 주로 해야 할 일은:

1. 사용자가 처음 요청할 때 기본 양식을 표시한다.
    * 양식이 빈 필드를 포함하거나 (e.g. 새로운 레코드를 만드는 경우), 초깃값으로 미리 채워져 있을 수도 있다 (e.g. 레코드를 수정하거나, 유용한 기본 초깃값이 있는 경우).
1. 사용자가 제출한 데이터를, 일반적으로 HTTP `POST` 요청으로 받는다.
1. 데이터의 유효성을 검증하고 삭제(sanitize)한다.
1. 유효하지 않은 데이터가 있으면, 양식과 - 이번에는 사용자가 채운 값으로 - 문제 필드에 대한 오류 메시지를 표시한다.
1. 모든 데이터가 유효하면, 필요한 동작을 수행한다(e.g. 데이터베이스에 데이터를 저장하거나, 안내 이메일을 보내거나, 검색 결과를 반환하거나, 파일을 업로드하는 등).
1. 모든 동작이 완료되면, 사용자를 다른 페이지로 이동(redirect)시킨다.

양식을 다루는 코드는 초기 양식을 표시에는 `GET` 라우트를, 양식 데이터의 유효성 검증과 처리에는 같은 경로의 `POST` 라우트를 사용해 구현하는 경우가 많다. 이것이 이 튜토리얼에서 사용할 접근 방식이다.

Express 자체적으로는 양식을 다루는 조작을 위한 특정 지원을 제공하지는 않지만, 미들웨어를 사용해 양식의 `POST`와 `GET` 매개변수를 처리하고, 그 값을 검증/삭제할 수 있다.

### 유효성 검증과 수정 (Validation and sanitization)

양식 데이터는 저장되기 전에 그 유효성을 검증하고 필요한 경우 수정해야 한다.

* 유효성 검사는 입력된 값이 각 필드에 적절한지 (올바른 범위, 형식 등을 갖는지) 그리고 모든 필요한 필드에 값이 채워졌는지 확인한다.
* Sanitization은 잠재적으로 서버에 악성 콘텐츠를 보내는 데 사용될 수 있는 데이터의 문자를 수정하거나 교체한다.

이 튜토리얼에서는, 유명한 [express-validator](https://www.npmjs.com/package/express-validator) 모듈을 사용해 양식 데이터의 유효성 검증과 수정을 모두 수행할 것이다.

#### 설치 (Installation)

다음의 명령을 프로젝트의 루트에서 실행해 모듈을 설치한다.

```zsh
npm install express-validator
```

#### express-validator 사용하기 (Using express-validator)

> Github의 [express-validator](https://express-validator.github.io/docs/#basic-guide) 가이드는 좋은 API에 대한 개요를 제공한다. 모든 기능([스키마 유효성 검사](https://express-validator.github.io/docs/schema-validation.html)를 사용하는 것과 [사용자 정의 유효성 검사를 생성하는](https://express-validator.github.io/docs/custom-validators-sanitizers.html) 것을 포함해서)에 대해 알고 싶다면 이 문서를 읽는 것을 추천한다. 아래에서는 지역 저장소에 유용한 일부만 다룰 것이다.

현재 컨트롤러에서 유효성 검사를 사용하려면, 아래와 같이 [express-validator](https://www.npmjs.com/package/express-validator) 모듈에서 가져올 특정 함수를 지정해야 한다:

```js
const { body,validationResult } = require('express-validator');
```

사용할 수 있는 함수가 많고, 요청 매개변수, 본문(body), 헤더, 쿠키 등에서 온 데이터, 혹은 이 모든 것을 한 번에 확인하고 수정할 수 있다. 이 튜토리얼에서는 (위에서 "require"한 것처럼) `body`와 `validationResult`를 우선으로 사용할 것이다.

해당 함수들은 아래와 같이 정의되어 있다:

* [`body([fields, message])`](https://express-validator.github.io/docs/check-api.html#bodyfields-message): 테스트가 실패했을 때 표시할 선택적인 오류 메시지와 함께 유효성을 검사하고/하거나 수정할 요청 본문 (`POST` 매개변수) 안의 필드를 지정한다. 검증 및 수정 기준은 `body()` 메소드에 데이지 체인 되어있다. 예를 들어, 아래의 코드에서 가장 먼저 "name" 필드를 확인하고, 유효성 검사 오류는 "Empty name"이라는 오류 메시지를 설정된다고 정의한다. 그다음 수정(sanitization) 메소드 `trim()`을 호출해 문자열 시작과 끝의 공백을 제거하고, 다음으로 `isLength()`를 사용해 결과 문자열이 비어있지 않는지 확인한다. 마지막으로, `escape()`를 호출해 자바스크립트 사이트 간 스크립팅 공격에 사용될 수 있는 HTML 문자를 변수에서 제거한다.

    ```js
    body('name', 'Empty name').trim().isLength({ min: 1 }).escape()
    ```

    이 테스트는 age 필드가 유효한 날짜인지 확인하고, `optional()`을 사용해 null과 빈 문자열이 유효성 검사에 실패하지 않도록 지정한다.

    ```js
    body('age', 'Invalid age').optional({ checkFalsy: true }).isISO8601().toDate(),
    ```

    또한 다른 유효성 검사를 데이지 체인하고, 앞의 유효성 검사를 통과(true)했을 때 표시할 메시지를 추가할 수도 있다.

    ```js
    body('name').trim().isLength({ min: 1 }).withMessage('Name empty.')
        .isAlpha().withMessage('Name must be alphabet letters.'),
    ```

* [`validationResult(req)`](https://express-validator.github.io/docs/validation-result-api.html#validationresultreq): 유효성 검사를 실행해, `validation` 결과 객체의 형태로 오류를 사용할 수 있게 해준다. 이는 아래와 같이 별개의 콜백에서 호출된다:

    ```js
    (req, res, next) => {
        // 요청에서 유효성 검사 오류를 가져온다.
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            // 에러가 있다. 수정된 값과 오류 메시지와 함께 양식을 렌더링한다.
            // 오류 메시지는 `errors.array()`를 사용해서 배열 안에 반환된다.
            }
        else {
            // 양식의 데이터가 유효하다.
        }
    }
    ```

    위에서는 유효성 검사 결과의 `isEmpty()` 메소드를 사용해 오류가 있었는지를 확인하고, `array()` 메소드를 사용해 오류 메시지를 얻는다. 더 많은 정보를 위해서 [Validation Result API](https://express-validator.github.io/docs/validation-result-api.html)를 참고하자.

유효성 검증과 수정 체인은 Express 라우트 핸들러에 전달되어야 하는 미들웨어이다 (우리는 컨트롤러를 통해 이를 간접적으로 하고 있다). 미들웨어가 실행되면 각 유효성 검사/수정기가 지정된 순서로 실행된다.

아래에서 지역 도서관 양식을 구현할 때 몇몇 실제 예를 다룰 것이다.

### 양식 디자인 (Form design)

도서관의 많은 모델은 서로 연관되어있다/의존적이다 - 예를 들어, `Book`은 `Author`를 필요로 하고, 한 개 이상의 `Genre`도 가질 것이다. 이것은 사용자가 다음을 희망할 때 이를 어떻게 처리하는지에 대한 의문을 낳는다:

* 연관된 객체가 아직 존재하지 않을 때 새 객체를 만드는 것 (예를 들어, 저자 객체가 아직 정의되지 않은 책)
* 다른 객체에서 여전히 사용되는 객체를 제거하는 것 (예를 들어, 여전히 `Book`에서 사용되는 `Genre`를 제거)

이 프로젝트에서는 양식이 다음과 같은 것만 할 수 있도록 단순화한다:

* 이미 존재하는 객체를 사용해 새로운 객체를 생성한다 (그러므로 사용자가 `Book` 객체를 생성하려고 할 때 어떤 `Author`나 `Genre` 인스턴스도 필요로 하지 않는다).
* 다른 객체에서 참조하고 있지 않은 객체를 제거한다 (즉 예를 들어, 연관된 모든 `BookInstance` 객체를 제거할 때까지는 `Book`을 제거할 수 없다).

> Note: 더 튼튼한(robust) 구현을 통해 새로운 객체를 만들 때 의존적인 객체를 생성하거나, 객체를 어느 때나 삭제할 수 있을 수  있다(예를 들어, 의존적인 객체를 제거하거나, 제거된 객체의 참조를 데이터베이스에서 제거하는 것을 통해).

### 라우트 (Routes)

양식 처리 코드를 구현하기 위해, 같은 URL 패턴을 보이는 두 개의 라우트가 필요하다. 첫 번째(`GET`) 라우트는 새로운 빈 양식을 표시하는 데 사용된다. 두 번째 라우트(`POST`)는 사용자가 입력한 데이터의 유효성을 검사하고, 그다음 정보를 저장한 뒤, (만약 데이터가 유효하면) 상세 페이지로 이동(redirecting)하거나 (데이터가 유효하지 않으면) 오류와 함께 양식을 다시 표시한다.

([이전 튜토리얼](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/routes)에서) 이미 모든 모델의 생성 페이지를 **/routes/catalog.js**에 생성해놓았다. 예를 들어, 장르 라우트는 아래와 같이 보인다:

```js
// 장르를 생성하기 위한 GET 요청. 장르를 표시하는 라우트 이전에 와야 한다는 것에 유의하자 (id를 사용)
router.get('/genre/create', genre_controller.genre_create_get);

// 장르를 생성하기 위한 POST 요청.
router.post('/genre/create', genre_controller.genre_create_post);
```

## Express 양식 하위 글 (Express forms subarticles)

다음의 하위 글은 예제 애플리케이션에 필요한 양식을 추가하는 과정을 안내한다. 다음 튜토리얼로 이동하기 전에 각각을 읽고 해보자.

1. [장르 생성 양식](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/forms/Create_genre_form) - `Genre` 객체를 생성하는 페이지를 정의
1. [저자 생성 양식](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/forms/Create_author_form) - `Author` 객체를 생성하는 페이지를 정의
1. [책 생성 양식](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/forms/Create_book_form) - `Book` 객체를 생성하는 페이지를 정의
1. [책 인스턴스 생성 양식](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/forms/Create_BookInstance_form) - `BookInstance` 객체를 생성하는 페이지를 정의
1. [저자 제거 양식](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/forms/Delete_author_form) - `Author` 객체를 제거하는 페이지를 정의
1. [책 수정 양식](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/forms/Update_Book_form) - `Book` 객체를 수정하는 페이지를 정의
