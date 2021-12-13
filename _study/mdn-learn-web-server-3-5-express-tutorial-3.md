---
layout  : article
title   : Express Tutorial Part 3: (Mongoose와 함께) 데이터베이스를 사용하기 (Using a Database (with Mongoose))
summary : 
date    : 2021-12-09 14:20:05 +0900
updated : 2021-12-13 22:02:32 +0900
tag     : draft
toc     : true
public  : true
parent  : [[mdn-learn-web-server-3]]
latex   : false
---
* TOC
{:toc}

> 이 글은 MDN Learn web development의 [Express web framework (Node.js/JavaScript)](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs) 중 [Express Tutorial Part 3: Using a Database (with Mongoose)](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/mongoose)의 내용을 번역 및 정리한 글입니다.
>
> * 제가 필요한 부분 위주로 확인하면서 정리하고 있어 글에 덜 작성된 부분이 있을 수 있습니다.
> * 글 작성 후 원문의 내용이 수정되거나 내용을 이해하기 위한 개인적인 설명이나 해석이 있을 수 있습니다. 되도록 원문을 참고해주시길 바랍니다.
> * 잘못된 부분이 있다면 댓글이나 그 외 편하신 방법으로 알려주시면 감사하겠습니다.

## 개요 (Overview)

지역 도서관 웹 사이트를 통해

* 도서관 직원은 책과 대여자의 정보를 저장하고,
* 도서관 회원은
    * 책을 찾아보고 검색해,
    * 빌릴 수 있는 여분이 남았는지 확인하고,
    * 이를 예약하거나 대여한다.

정보를 효율적으로 저장하고 가져오기 위해서 이런 정보를 *데이터베이스(database)* 에 저장할 것이다.

Express 앱은 다양한 데이터베이스를 사용할 수 있고, 읽고, 쓰고, 수정하고, 삭제하는 (CRUD) 작업을 할 수 있는 몇 가지 방법을 제공한다. 이번 튜토리얼에서는 사용할 수 있는 몇 가지 선택지에 대한 간략한 개요를 제공하고, 특정 메커니즘 선택해 더 자세히 알아볼 것이다.

## 어떤 데이터베이스를 사용할 수 있을까? (What databases can I use?)

### 사용할 수 있는 데이터베이스

* Express 앱은 Node가 지원하는 어떤 데이터베이스 메커니즘이든 사용할 수 있다.
    * Express 자체는 데이터베이스 관리를 위한 어떤 특별한 추가 행동/요구사항도 정의하지 않는다.
* PostgreSQL, MySQL, Redis, SQLite, MongoDB를 포함한
* [많은 유명한 선택지](https://expressjs.com/en/guide/database-integration.html)가 있다.

### 데이터베이스 선택

* 데이터베이스를 선택할 때, 시간 대비 생산성/학습 커브, 성능, 쉬운 복제/백업, 비용, 커뮤니티 지원 등을 고려해야 한다.
* 한 개의 "가장 좋은" 데이터베이스는 정할 수 없지만,
* 지금 만드는 지역 도서관 같은 중소형 규모의 사이트에는 대부분의 유명한 해결책(i.e. 데이터베이스)이 충분히 만족스러울 것이다.

### 데이터베이스와 상호작용하는 최고의 방법 (What is the best way to interact with a database?)

데이터베이스와 상호작용하는 데는 일반적으로 두 가지 방법이 있다:

* 데이터베이스의 네이티브 쿼리 언어(native query language)를 사용 (e.g. SQL)
* Object Data Model ("ODM") 또는 Object Relational Model ("ORM")을 사용.
    * ODM/ORM은 웹사이트의 데이터를 자바스크립트 객체로 나타내며, 이 객체는 기본 데이터베이스에 매핑된다.
    * 어떤 ORM은 특정 데이터베이스에 연결되지만, 다른 ORM은 데이터베이스에 구애받지 않는 백엔드를 제공한다.

#### 상호 작용 방법의 비교

* **SQL**이나 데이터베이스에서 지원하는 쿼리 언어를 사용할 때 성능이 가장 좋다.
* **ODM**은
    * 객체와 데이터베이스 형식 사이를 매핑하는 변환 코드를 사용하고, 이는 가장 효율적인 데이터베이스 쿼리를 사용하지 않을 수도 있어서 종종 느리다.
        * 특히 ODM이 다른 데이터베이스 백엔드를 지원하고, 지원하는 데이터베이스 기능 측면에서 더 큰 타협을 해야 하는 경우에는 더욱더 그렇다.
* **ORM**을 사용했을 때는
    * 프로그래머가 데이터베이스의 맥락(semantics)이 아니라 계속해서 자바스크립트 객체의 관점에서 생각할 수 있다는 이점이 있다.
        * 이는 다른 데이터베이스(동일한 웹사이트에서든 여러 웹사이트에서든 상관없이)들에서 작업해야 하는 경우엔 더욱더 그렇다.
    * 또한 ORM은 데이터의 유효성 확인을 수행할 확실한 공간을 제공한다.

> Note: ODM/ORM을 사용하면 개발 및 유지 보수 비용이 절감된다. 네이티브 쿼리 언어에 매우 익숙하거나 성능이 최우선시되는 것이 아니라면, ODM을 사용하는 걸 적극적으로 고려해야 한다.

### 어떤 ORM/ODM을 사용해야 할까? (What ORM/ODM should I use?)

일반적인 규칙에 따라, 해결책을 선택할 때는 제공되는 기능과 "커뮤니티 활성화 정도"(다운로드 수, 기여자, 버그 리포트, 문서의 질 등)를 모두 고려해야 한다.

이 글을 작성하는 현재에는 Mongoose가 가장 유명한 ODM이며, MongoDB를 데이터베이스로 사용하는 것이 합리적인 선택이다.

## LocalLibrary에 Mongoose와 MongoDb를 사용하기 (Using Mongoose and MongoDb for the LocalLibrary)

*지역 도서관* 예제(와 이 토픽의 나머지)에서 도서관 데이터에 접근하기 위해 [Mongoose ODM](https://www.npmjs.com/package/mongoose)을 사용할 것이다.

Mongoose는 문서 지향 데이터 모델을 사용하는 오픈 소스 NoSQL 데이터베이스인 MongoDB의 프론트 엔드 역할을 한다. MongoDB의 "문서"의 "모음(collection)"은 관계형 데이터베이스의 "행"들의 "표"와 [유사하다](https://docs.mongodb.com/manual/core/databases-and-collections/#collections).

이 ODM과 데이터베이스의 조합은 이들의 문서 저장과 쿼리 시스템이 JSON과 매우 유사해서, 자바스크립트 개발자에게 익숙하기 때문에 Node 커뮤니티에서 굉장히 유명하다.

> Note: Mongoose를 사용하기 위해 반드시 MongoDB를 알아야 할 필요는 없지만 [Mongoose 공식 문서](https://mongoosejs.com/docs/guide.html)의 일부는 MongoDB에 이미 익숙하다면 더 이해하기 쉽다.

### LocalLibrary 모델을 설계하기 (Designing the LocalLibrary models)

모델을 코딩하기 시작하기 전에, 저장할 데이터와 다른 객체 사이의 관계에 대해 생각해보는 시간을 갖는 게 좋다.

* 책에 대한 정보(제목, 요약, 저자, 장르, ISBN)를 저장해야 하고
* 여러 권(multiple copies) 대여할 수 있는 책을 (전역적으로 고유한 ID, 대여 가능 상태, 등과 함께) 보유할 수 있다는 것을 알고 있다.
* 단지 이름을 외에도 더 많은 저자에 대한 정보를 저장해야 할 수도 있고,
* 같거나 비슷한 이름을 갖는 저자가 여러 명 있을 수도 있다.
* 책의 제목, 저자, 장르, 카테고리에 따라 정보를 정렬할 수도 있어야 할 것이다.

모델을 설계할 때, 모든 "객체"(관련된 정보의 모음)에 대해 별도의 모델을 갖는 것이 합리적이다. 이 경우에 이 모델을 위한 명백한 후보로는 책, 책 인스턴스, 저자가 있다.

또한 선택 사항을 웹사이트 자체에 하드 코딩 하는 대신, 선택 목록 옵션(e.g. 선택 사항들의 드롭다운 목록)을 나타낼 모델을 사용하고 싶을 것이다 - 모든 옵션을 미리 알 수 있지 않거나 옵션이 바뀔 수 있는 경우에 권장된다. 좋은 예로는 장르(e.g. 판타지, 과학 소설 등)가 있다.

모델과 필드를 정하면, 그사이의 관계에 대해 생각해봐야 한다.

이를 염두에 뒀을 때, 아래의 UML 관계 다이어그램이 우리가 이 경우에 정의할 모델을 (박스로) 보여준다. 위에서 논의했듯이,

* 책(책에 대한 일반적인 세부 정보),
* 책 인스턴스(시스템에서 빌릴 수 있는 특정 책 실물 여분의 (대여) 상태),
* 저자에 대한 모델을 만들었다.
* 또한, 값이 유동적으로 생성될 수 있도록 장르에 대한 모델도 만들기로 했다.
* `BookInstance:status`에 대한 모델은 만들지 않기로 했다 - 이 값이 변경되지 않을 것이라고 예상되므로 적절한 값을 하드 코딩할 것이다.

각 박스 안에서 모델의 이름, 필드의 이름과 유형, 메소드와 이들의 반환 값의 유형을 볼 수 있다.

또한, 다이어그램은 *multiplicities*를 포함한 모델 사이의 관계도 보여준다. Multiplicities는 각 모델이 속해있는 관계의 (최소와 최대) 개수를 나타내는 다이어그램 위의 숫자이다.

* 예를 들어, 박스 사이의 연결선은 `Book`과 `Genre`가 연관되어있다는 것을 보여준다.
* `Book` 모델에 가까운 숫자는 `Genre`가 0개 이상의 `Book`을 (원하는 만큼) 가질 수 있다는 것을 나타내고,
* `Genre` 옆, 선 반대편 끝의 숫자는 `Book`이 0개 이상의 관련된 `Genre`를 가질 수 있다는 것을 나타낸다.

> Note: 아래 Mongoose primer에서 논의될 것처럼, 필드에서 문서/모델 사이의 관계는 *한 개의* 모델에 정의하는 것이 종종 더 낫다 (다른 모델에서 연결된 `_id`를 검색하면 반대의 관계도 찾을 수 있다). 아래에서 `Book`/`Genre`와 `Book`/`Autor` 사이의 관계는 책 스키마(`Book` schema)에서, `Book`/`BookInstance` 사이의 관계는 책 인스턴스 스키마(`BookInstance` schema)에서 정의하기로 했다. 이 선택은 다소 임의적으로 - 다른 스키마에서 같은 필드를 가질 수 있다.

## Mongoose 입문서 (Mongoose primer)

이 부분에서는 Mongoose를 MongoDB 데이터베이스에 연결하고, 스키마와 모델을 정의하고, 기본 쿼리를 만드는 방법에 대한 개요를 설명한다.

> Note: 이 입문서는 *npm*의 [Mongoose quick start](https://www.npmjs.com/package/mongoose)와 [공식 문서](https://mongoosejs.com/docs/guide.html)의 영향을 많이 받았다.

### Mongoose와 MongoDB를 설치하기 (Installing Mongoose and MongoDB)

Mongoose는 다른 의존성 라이브러리와 같은 방법으로 - NPM을 사용해 프로젝트(**package.json**)에 설치한다. 이를 설치하려면 프로젝트 폴더에서 다음의 명령을 사용하자:

```zsh
npm install mongoose
```

*Mongoose*를 설치하면, MongoDB 데이터베이스 드라이버를 포함해, Mongoose의 의존성 라이브러리가 모두 함께 설치되지만, MongoDB 자체는 설치되지 않는다. MongoDB 서버를 설치하고 싶다면 여러 운영 체제의 [설치파일을 여기서 다운로드](https://www.mongodb.com/try)하고 개인적으로(locally) 설치할 수 있다. 또한, 클라우드 기반의 MongoDB 인스턴스를 사용할 수도 있다.

> Note: 이 튜토리얼에서는 클라우드 기반 *서비스 데이터베이스(database as a service, DBaaS)*인 MongoDB Atlas를 무료 티어로 사용해 데이터베이스를 제공할 예정이다. 이 데이터베이스는 운영 체제에 상관없이 "설치"할 수 있어서 개발에 적합하고, 튜토리얼에 사용하기 합리적이다 (database-as-a-service는 제품 데이터베이스를 사용하기 위한 한 가지 방법이다).

### MongoDB를 연결하기 (Connecting to MongoDB)

*Mongoose*는 MongoDB 데이터베이스에 연결해야 한다. 아래에 보이는 것처럼 `mongoose.connect()`를 사용해 로컬 호스트 데이터베이스에 `require()`하고 연결할 수 있다:

```js
//mongoose 모듈 불러오기
var mongoose = require('mongoose');

//mongoose 연결 기본값 설정
var mongoDB = 'mongodb://127.0.0.1/my_database';
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});

//연결 기본값을 db에 저장
var db = mongoose.connection;

//연결을 오류 이벤트에 결합(bind) (연결 오류 알람을 받기 위해서)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
```

`mongoose.connection`으로 기본 `Connection` 객체를 얻을 수 있다. 연결되면, `Connection` 인스턴스에서 열기(open) 이벤트가 발생한다.

> 추가적인 연결이 필요하면 `mongoose.createConnection()`을 사용하면 된다. 이 메소드는 같은 형태의 데이터베이스 URI(호스트, 데이터베이스, 포트, 옵션 등과 함께)를 `connect()`로 가져가 `Connection` 객체를 반환한다.

### 모델을 정의하고 생성하기 (Defining and creating models)

모델은 `Schema` 인터페이스를 사용해서 *정의한다*. 스키마를 사용해 유효성 검사 요구사항 및 기본값과 함께 각 문서에 저장된 필드를 정의할 수 있다. 또한, 데이터 유형을 더 쉽게 다룰 수 있도록 해주는 정적 및 인스턴스 도움(helper) 메소드와, 다른 필드처럼 사용할 수 있지만 실제로 데이터베이스에 저장되지는 않는 가상의 속성을 정의할 수 있다 (아래에서 조금 더 얘기할 것이다).

그다음 스키마는 `mongoose.model()` 메소드를 사용해 모델로 "컴파일"된다. 모델이 있으면 이를 사용해 지정된 유형의 객체를 찾고, 만들고, 수정하고, 삭제할 수 있다.

> Note: 각 모델은 MongoDB 데이터베이스에서 *문서의 컬렉션(collection of documents)*으로 매핑된다. 이 문서는 모델 `Schema`에 정의된 필드/스키마 유형을 포함한다.

#### 스키마를 정의하기 (Defining schemas)

아래의 코드 조각은 간단한 스키마를 정의하는 방법을 보여준다. 먼저 mongoose를 `require()` 한 뒤, Schema 생성자를 사용해 새 스키마 인스턴스를 만들고, 그 안의 다양한 필드를 생성자의 객체 매개 변수에 정의한다.

```js
//Mongoose를 불러오기
var mongoose = require('mongoose');

//스키마 정의
var Schema = mongoose.Schema;

var SomeModelSchema = new Schema({
  a_string: String,
  a_date: Date
});
```

위의 경우에는 문자열과 날짜 두 필드를 갖는다. 다음 부분에서는, 다른 필드 유형, 유효성 검사, 다른 메소드를 보여줄 예정이다.

#### 모델을 만들기 (Creating a model)

모델은 스키마에서 `mongoose.model()` 메소드를 사용해 만든다:

```js
// 스키마 정의
var Schema = mongoose.Schema;

var SomeModelSchema = new Schema({
  a_string: String,
  a_date: Date
});

// 스키마를 모델로 컴파일
var SomeModel = mongoose.model('SomeModel', SomeModelSchema );
```

첫 번째 인자는 모델에 만들어질 컬렉션의 개별 이름이고 (Mongoose는 위의 모델 *SomeModel*을 위한 데이터베이스 컬렉션을 생성할 것이다), 두 번째 인자는 모델을 만드는 데 사용하고 싶은 스키마이다.

> Note: 모델 클래스를 한 번 정의하면 이를 이용해 레코드(record, 필드의 집합)를 생성하고, 수정하고, 삭제할 수 있고, 모든 레코드나 레코드의 특정 부분을 얻기 위한 쿼리를 실행시킬 수도 있다. 이걸 하는 방법은 [Using models](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/mongoose#using_models) 부분에서 보여줄 것이다.

#### 스키마 유형 (필드) (Schema types (fields))

스키마는 임의의 개수 필드를 가질 수 있다 - 각 필드는 *MongoDB* 안에 저장된 문서의 필드를 나타낸다. 많은 일반적 필드 유형과 이들이 선언된 방법을 보여주는 예제 스키마를 아래에서 확인할 수 있다.

```js
var schema = new Schema(
{
  name: String,
  binary: Buffer,
  living: Boolean,
  updated: { type: Date, default: Date.now() },
  age: { type: Number, min: 18, max: 65, required: true },
  mixed: Schema.Types.Mixed,
  _someId: Schema.Types.ObjectId,
  array: [],
  ofString: [String], // 다른 각 유형의 배열도 가질 수 있다.
  nested: { stuff: { type: String, lowercase: true, trim: true } }
})
```

대부분의 [SchemaTypes](https://mongoosejs.com/docs/schematypes.html)("type:" 다음이나 필드 이름 다음의 설명)은 자명하다. 예외는:

* `ObjectId`: 데이터베이스에 있는 모델의 특정 인스턴스를 나타낸다. 예를 들어, 책은 저자 객체를 나타내기 위해 이것을 사용할 수 있다. 실제로 여기에는 지정된 객체의 고유한 ID(`_id`)가 포함된다. `populate()` 메소드를 사용해 필요할 때 관련 정보를 가져올 수 있다.
* `Mixed`: 임의의 스키마 유형.
* `[]`: 항목의 배열. 이 모델에서는 자바스크립트 배열 연산(push, pop, unshift 등)을 수행할 수 있다. 위의 예제에서는 특정 유형을 지정하지 않은 객체의 배열과, `String` 객체의 배열을 보여주고 있지만, 어떤 유형의 객체 배열이든 가질 수 있다.

또한, 위의 코드는 필드를 선언하는 두 방법을 모두 보여주고 있다:

* 필드 *이름*과 *유형*을 키-값 쌍으로 선언 (i.e. 예시의 필드 `name`, `binary`, `living`과 같이)
* 필드 *이름* 다음에 `type`을 정의하는 객체와 그 외 필드의 다른 *옵션*이 오는 경우. 옵션은 다음과 같은 것들을 포함한다:
    * 기본값
    * 내장된 유효성 검사(e.g. 최대/최솟값)와 사용자 정의 유효성 검사 함수
    * 필드가 필요한지 여부
    * `String` 필드에 자동으로 소문자, 대문자, 공백 제거(trim)을 설정할지 (e.g. `{ type: String, lowercase: true, trim: true }`)

옵션에 대한 더 많은 정보는 [SchemaTypes](https://mongoosejs.com/docs/schematypes.html)(Moongose 문서)에서 확인하자.

#### 유효성 검사 (Validation)

Mongoose는 내장 및 사용자 정의 유효성 검사와 동기적, 비동기적 유효성 검사를 제공한다. 이를 통해 모든 경우에 대해 허용할 수 있는 값의 범위와 유효성 검사를 실패했을 때의 오류 메시지 모두를 지정할 수 있다.

내장된 유효성 검사는 다음의 것들을 포함한다:

* 모든 [SchemaTypes](https://mongoosejs.com/docs/schematypes.html)에는 [필수](https://mongoosejs.com/docs/api.html#schematype_SchemaType-required) 유효성 검사가 내장되어있다. 이는 문서를 저장하기 위해 필드가 제공되어야 하는지 여부를 지정하는 데 사용된다.
* Numbers에는 최소와 최대 유효성 검사가 있다.
* String에는
    * enum: 필드에 허용되는 값의 모음(set)을 지정한다.
    * match: 문자열이 일치해야 하는 정규 표현식을 지정한다.
    * maxLength와 minLength

(Mongoose 문서에서 약간 수정한) 아래의 예제는 일부 유효성 검사 유형과 에러 메시지를 어떻게 지정하는지 보여준다:

```js
var breakfastSchema = new Schema({
  eggs: {
    type: Number,
    min: [6, 'Too few eggs'],
    max: 12,
    required: [true, 'Why no eggs?']
  },
  drink: {
    type: String,
    enum: ['Coffee', 'Tea', 'Water',]
  }
});
```

필드 유효성 검사에 대한 자세한 내용은 [Validation](https://mongoosejs.com/docs/validation.html) (Mongoose 문서)를 참고하자.

#### 가상 속성 (Virtual properties)

가상 속성은 사용자가 만들(get)고 지정(set)할 수 있지만, MongoDB에 유지되지는 않는 문서 속성이다. Getter는 필드 형식을 지정하거나 필드를 결합하는 데 유용하고, setter는 저장을 위해 하나의 값을 여러 개의 값으로 분해하는 데 유용하다. 문서의 예제에서는 성(last name)과 이름(first name) 필드에서 전체 이름(full name) 가상 속성을 구성(및 해체)하고, 이 방법이 매번 템플릿에서 사용될 때마다 전체 이름을 생성하기보다 쉽고 깔끔하다.

> Note: 도서관에서 가상 속성은 경로와 레코드의 `_id` 값을 사용해 각 모델 레코드에 대한 고유한 URL을 정의할 때 사용할 예정이다.

더 많은 정보는 [Virtuals](https://mongoosejs.com/docs/guide.html#virtuals) (Mongoose 문서)를 참고하자.

#### 메소드와 쿼리 조력자 (Methods and query helpers)

스키마는 또한 [인스턴스 메소드](https://mongoosejs.com/docs/guide.html#methods)와 [정적 메소드](https://mongoosejs.com/docs/guide.html#statics), [쿼리 조력자](https://mongoosejs.com/docs/guide.html#query-helpers)를 갖는다.

* 인스턴스와 정적 메소드는 비슷하지만, 인스턴스 메소드는 특정 레코드와 연관되어있고 현재 객체에 접근할 수 있다는 명백한 차이가 있다.
* 쿼리 조력자는 mongoose의 [chainable query builder API](https://mongoosejs.com/docs/queries.html)를 확장할 수 있도록 한다 (예를 들어, `find()`, `findOne()`, `findById()` 메소드에 추가로 "byName" 쿼리를 추가할 수 있게 한다).

### 모델 사용하기 (Using models)

스키마를 만들었으면 이를 사용해 모델을 만들 수 있다.

* 모델은 검색할 수 있는 데이터베이스 안의 문서 모음(collection)을 나타내고,
* 모델의 인스턴스는 저장하고 가져올(retrieve) 수 있는 개별 문서를 나타낸다.

아래에서 간단한 개요를 제공한다. 더 많은 정보는 [Models](https://mongoosejs.com/docs/models.html) (Mongoose 문서)를 참고하자.

#### 문서를 만들고 수정하기 (Creating and modifying documents)

레코드를 만들기 위해서는 모델의 인스턴스를 정의하고 `save()`를 호출해야 한다. 아래의 예제에서는 SomeModel이 이전의 스키마에서 만든 모델(하나의 필드 "name"을 포함한)이라고 가정한다.

```js
// 모델인 SomeModel의 인스턴스를 생성
var awesome_instance = new SomeModel({ name: 'awesome' });

// 콜백을 전달해서 새 모델 인스턴스를 저장
awesome_instance.save(function (err) {
  if (err) return handleError(err);
  // 저장됨!
});
```

(수정, 삭제, 쿼리에 따라) 레코드를 생성하는 것은 비동기적인 동작(operation)이다 - 동작이 완료됐을 때 호출될 콜백을 전달한다. API는 오류-우선 인자 규칙을 사용하므로, 콜백의 첫 인자는 항상 오류 값(혹은 null)이다. 만약 API가 어떤 결과를 반환하면, 이것이 두 번째 인자로 제공된다.

또한 `create()`를 사용해 저장과 동시에 모델 인스턴스를 정의할 수 있다. 콜백은 첫 번째 인자에 대해서는 오류를, 두 번째 인자에 대해서는 새로 생성된 모델 인스턴스를 반환할 것이다.

```js
SomeModel.create({ name: 'also_awesome' }, function (err, awesome_instance) {
  if (err) return handleError(err);
  // 저장됨!
});
```

모든 모델은 관련된 연결(connection)이 있다 (이것이 `mongoose.model()`을 사용할 때의 기본 연결이 된다). 새로운 연결을 생성하고 거기서 `.model()`을 호출해 다른 데이터베이스에 문서를 만든다.

이 새로운 레코드 안의 필드에 점 구문(dot syntax)을 사용해서 접근하고, 그 값을 바꿀 수 있다. 수정된 값을 다시 데이터베이스에 저장하려면 `save()`나 `update()`를 호출해야 한다.

```js
// 점 표기법을 이용해서 모델 필드 값에 접근
console.log(awesome_instance.name); //'also_awsome'이라는 로그가 출력되어야 한다

// 필드를 수정해 레코드를 바꾸고, 다음으로 save()를 호출
awesome_instance.name="New cool name";
awesome_instance.save(function (err) {
   if (err) return handleError(err); // 저장됨!
});
```

#### 레코드를 검색하기 (Searching for records)

쿼리 메소드를 이용해 쿼리 조건을 JSON 문서로 특정해 레코드를 검색할 수 있다. 아래의 코드 조각은 데이터베이스 안에서 테니스를 치는 운동선수를 찾아 운동선수의 *이름(name)*과 *나이(age)* 필드만을 반환하는 방법을 보여준다. 여기서는 하나의 일치하는 필드(스포츠)만 지정하지만, 기준을 더 추가하거나, 기준을 정규 표현식으로 지정하거나, 조건을 모두 제거해 모든 운동선수를 반환하도록 할 수 있다.

```js
var Athlete = mongoose.model('Athlete', yourSchema);

// 테니스를 치는 모든 운동선수를 찾고, '이름(name)'과 '나이(age)' 필드를 선택
Athlete.find({ 'sport': 'Tennis' }, 'name age', function (err, athletes) {
  if (err) return handleError(err);
  // 'athletes'은 조건을 만족하는 운동선수의 목록을 포함한다
})
```

위에서 나타난 것처럼, 콜백을 지정하면, 쿼리가 즉시 실행될 것이다. 검색이 완료될 때 콜백이 호출될 것이다.

> Note: Mongoose의 모든 콜백은 `callback(error, result)`의 패턴을 사용한다. 만약 쿼리를 실행할 때 오류가 발생하면, `error` 매개 변수는 오류 문서를 포함하고 `result`는 null이 될 것이다. 쿼리가 성공적이면 `error` 매개변수가 null이고 `result`는 쿼리의 결과를 포함할 것이다.

> Note: 어떤 결과도 찾지 못하는 것은 검색에서 **오류가 아니라는 것**을 기억하는 것이 중요하다 - 하지만 애플리케이션의 맥락에서는 실패한 경우일 수 있다. 만약 애플리케이션이 값을 찾을 것으로 예상되는 경우, 콜백에서 결과를 확인하거나 (`results==null`) [orFail](https://mongoosejs.com/docs/api.html#query_Query-orFail) 메소드를 쿼리에서 데이지 체인(daisy chain) 방식으로 연결할 수 있다.

콜백을 지정하지 않으면 API는 유형 쿼리의 변수를 반환할 것이다. 이 쿼리 객체를 사용해 쿼리를 작성(build)한 다음 나중에 `exec()` 메소드를 사용해 이를 (콜백과 함께) 실행할 수 있다.

```js
// 테니스를 치는 모든 운동선수를 찾음
var query = Athlete.find({ 'sport': 'Tennis' });

// 'name'과 'age' 필드를 선택
query.select('name age');

// 결과 항목을 5개로 제한
query.limit(5);

// 나이 순서로 정렬
query.sort({ age: -1 });

// 이후에 쿼리를 실행
query.exec(function (err, athletes) {
  if (err) return handleError(err);
  // athletes는 테니스를 치는 5명의 정렬된 선수 목록을 포함한다
})
```

위에서는 `find()` 메소드에서 쿼리 조건을 정의했다. `where()` 함수를 이용해서 이 작업을 수행할 수도 있고, 각 쿼리를 개별적으로 추가하는 대신 점 연산자(`.`)를 사용해 모든 부분 쿼리를 함께 연결할 수도 있다. 아래의 코드 조각은 위와 같은 쿼리로, 나이에 대한 추가 조건이 있다.

```js
Athlete.
  find().
  where('sport').equals('Tennis').
  where('age').gt(17).lt(50). // 추가적인 where 쿼리
  limit(5).
  sort({ age: -1 }).
  select('name age').
  exec(callback); // callback은 콜백 함수의 이름이다
```

[find()](https://mongoosejs.com/docs/api.html#query_Query-find) 메소드는 일치하는 모든 레코드를 가져오지만, 주로(often) 일치하는 하나의 레코드만 가져오고 싶을 것이다. 다음의 메소드는 하나의 레코드를 위한 쿼리이다:

* `findById()`: 문서를 지정된 `id`로 찾는다 (모든 문서는 고유한 `id`를 갖는다).
* `findOne()`: 특정 기준을 만족하는 하나의 문서만 찾는다.
* `findByIdAndRemove()`, `findByIdAndUpdate()`, `findOneAndRemove()`, `findOneAndUpdate()`: `id`나 기준으로 하나의 문서를 찾고, 이를 수정하거나 제거한다. 레코드를 수정하거나 제거하는데 유용한 편의(convenience) 함수이다.

> Note: 조건을 만족하는 항목의 개수를 얻는 데 사용할 수 있는 `count()` 메소드도 있다. 실제 레코드를 가져오지 않고 개수를 세고 싶을 때 유용하다.

쿼리로 할 수 있는 것은 훨씬 더 많다. 더 많은 정보는 [Queries](https://mongoosejs.com/docs/queries.html) (Mongoose 문서)를 참고하자.

#### 연관된 문서로 작업하기 - population (Working with related documents — population)

`ObjectId` 스키마 필드를 사용해서 하나의 문서/모델 인스턴스에서 다른 인스턴스로 참조를 생성하거나 `ObjectIds`의 배열을 사용해서 하나의 문서에서 다수의 문서로 참조를 생성할 수 있다. 필드는 관련된 모델의 id를 저장한다. 관련 문서의 실제 내용이 필요하면 쿼리에서 `populate()` 메소드를 사용해 id를 실제 데이터로 교체할 수 있다.

예를 들어, 다음 스키마는 저자와 작품(stories)을 정의한다. 각 저자는 여러 작품을 가질 수 있어 `ObjectId`의 배열로 나타낼 수 있다. 각 작품은 한 명의 저자만을 가질 수 있다. `ref` 속성은 스키마에 이 필드에 어떤 모델을 지정할 수 있는지 알려준다.

```js
var mongoose = require('mongoose')
  , Schema = mongoose.Schema

var authorSchema = Schema({
  name    : String,
  stories : [{ type: Schema.Types.ObjectId, ref: 'Story' }]
});

var storySchema = Schema({
  author : { type: Schema.Types.ObjectId, ref: 'Author' },
  title    : String
});

var Story  = mongoose.model('Story', storySchema);
var Author = mongoose.model('Author', authorSchema);
```

`_id`값을 지정해서 관련 문서에 대한 참조를 저장할 수 있다. 아래에서 저자 다음으로 작품을 생성한 뒤, 저자의 id를 작품의 저자 필드에 지정한다.

```js
var bob = new Author({ name: 'Bob Smith' });

bob.save(function (err) {
  if (err) return handleError(err);

  // 이제 Bob이 존재하므로, 작품을 생성하자
  var story = new Story({
    title: "Bob goes sledding",
    author: bob._id    // 저자 Bob으로부터의 _id 값을 지정한다. 이 ID는 기본적으로 생성된다.
  });

  story.save(function (err) {
    if (err) return handleError(err);
    // 이제 Bob은 그의 작품을 갖는다
  });
});
```

이제 작품 문서는 저자 문서의 ID에 의해 참조된 저자 값을 갖는다. 스토리 결과에서 저자 정보를 얻기 위해서는 아래 보이는 것처럼 `populate()`를 사용한다.

```js
Story
.findOne({ title: 'Bob goes sledding' })
.populate('author') // 저자 id를 실제 저자 정보로 채운다
.exec(function (err, story) {
  if (err) return handleError(err);
  console.log('The author is %s', story.author.name);
  // "The author is Bob Smith"를 출력
});
```

> Note:  기민한 독자라면 현재 작품에 저자를 추가했지만, 저자의 `stories` 배열에는 아무것도 추가하지 않았다는 것을 알아챘을 것이다. 그렇다면 특정 저자의 모든 작품은 어떻게 얻을 수 있을까? 한 가지 방법은 작품을 작품 배열에 추가하는 것이지만, 그러면 저자와 작품을 연결하는 정보를 유지 보수해야 하는 장소가 두 개 생기게 된다.
>
> 더 나은 방법은 *저자*의 `_id`를 가져와, `find()`를 사용해 모든 작품의 저자 필드에서 작품을 검색하는 것이다.
>
> ```js
> Story
> .find({ author : bob._id })
> .exec(function (err, stories) {
  > if (err) return handleError(err);
  > // Bob의 id를 저자 값으로 갖는 모든 작품을 반환
> });
> ```

지금까지의 내용이 *이 튜토리얼에* 관련된 항목을 작업하는 데 알아야 할 내용의 대부분이다. 더 많은 세부 정보를 알고 싶다면 [Population](https://mongoosejs.com/docs/populate.html) (Mongoose 문서)을 참고하자.

### 파일당 하나의 스키마/모델 (One schema/model per file)

원하는 모든 파일 구조를 사용해서 스키마와 모델을 만들 수 있지만, 각 모델 스키마는 자체 모듈(파일)에 정의한 다음, 모델을 만들기 위해 메소드를 내보내는 것을 강력하게 추천한다. 이는 아래 나타나 있다:

```js
// File: ./models/somemodel.js

//Mongoose를 포함
var mongoose = require('mongoose');

//스키마 정의
var Schema = mongoose.Schema;

var SomeModelSchema = new Schema({
  a_string: String,
  a_date: Date,
});

//"SomeModel" 모델 클래스를 생성하는 함수를 내보낸다
module.exports = mongoose.model('SomeModel', SomeModelSchema );
```

그러면 모델을 다른 파일에서 포함해 즉시 사용할 수 있다. 아래에서 이를 사용해 모든 모델 인스턴스를 얻는 방법을 나타낸다:

```js
//모듈을 포함하는 것만으로 SomeModel 모델을 생성
var SomeModel = require('../models/somemodel')

// 모든 SomeModel 레코드를 찾는데 SomeModel 객체(모델)를 사용
SomeModel.find(callback_function);
```

## MongoDB 데이터베이스를 설정하기 (Setting up the MongoDB database)

이제 Mongoose가 무엇을 할 수 있는지와, 어떻게 모델을 설계하고 싶은지를 어느 정도 이해했으니, *지역도서관* 웹사이트 작업을 시작할 시간이다. 가장 먼저 해야 할 것은 도서관 데이터를 저장하는 데 사용할 MongoDB 데이터베이스를 설정하는 것이다.

튜토리얼을 위해 무료 클라우드 호스팅 [샌드박스](https://www.mongodb.com/pricing) 데이터베이스인 MongoDB Atlas를 사용할 것이다. 이 데이터베이스 티어는 여유량(redundancy)이 없기 때문에 실제 배포하는(production) 웹사이트에는 적합하지 않지만, 개발과 프로토타이핑에는 매우 적합하다.

> Note: MongoDB 데이터베이스를 로컬에 설정하는 것을 선호한다면 [시스템에 맞는 설치파일](https://www.mongodb.com/try/download/community)을 다운받아 설치하면 된다. 연결할 때 지정하는 데이터베이스 URL을 제외하고는 이 글의 이후에 남은 설명도 (MongoDB Atlas를 사용하는 것과) 유사할 것이다. 하지만 Heroku 서비스의 무료 티어는 영구적인 저장소를 제공하지 않기 때문에 [Express Tutorial Part 7: Deploying to production](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/deployment) 튜토리얼에서 원격 데이터베이스가 필요하다는 것을 주의해야 한다. 그러므로 MongoDB Atlas의 사용을 강력하게 추천한다.

> 연결 방법은 계속 바뀌기 때문에 다른 사람이 작성한 최신 글이나 공식 문서를 참고하는 게 더 나을 것 같다.

## Mongoose 설치 (Install Mongoose)

명령 프롬프트를 열고 [지역 도서관 뼈대 웹사이트](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/skeleton_website)를 만든 디렉토리로 이동한다. 위의 [Mongoose Primer](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/mongoose#installing_mongoose_and_mongodb)를 읽을 때 이미 설치하지 않았다면, 다음 명령을 입력해 Mongoose(와 Mongoose의 의존성 라이브러리)를 설치하고 위해 이를 **package.json**에 추가한다.

```zsh
npm install mongoose
```

## MongoDB에 연결하기 (Connect to MongoDB)

(프로젝트 루트의) **/app.js**를 열고 아래의 텍스트를 복사해 *Express 애플리케이션 객체*를 선언한 곳(`var app = express();` 다음)에 붙여넣는다. 데이터베이스 url 문자열('insert_your_database_url_here')을 자신의 데이터베이스를 나타내는 위치 URL로 (i.e. *mongoDB Atlas*에서 가져온 정보를 사용) 대체한다.

```js
//mongoose 연결을 설정
var mongoose = require('mongoose');
var mongoDB = 'insert_your_database_url_here';
mongoose.connect(mongoDB, { useNewUrlParser: true , useUnifiedTopology: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
```

[위의 Monngose primer에서](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/mongoose#connecting_to_mongodb) 얘기한 것처럼, 이 코드는 데이터베이스에 기본 연결을 생성하고 오류 이벤트에 연결한다 (오류가 콘솔에 출력될 수 있도록).

## 지역 도서관 스키마를 정의하기 (Defining the LocalLibrary Schema)

[위에서 얘기한 것처럼](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/mongoose#one_schemamodel_per_file) 각 모델에 별도의 모듈을 정의할 것이다. 프로젝트 루트에 모델을 위한 폴더(**/models**)를 만드는 것을 시작으로, 각 모듈에 대해 별도의 파일을 생성한다:

```
/express-locallibrary-tutorial  //the project root
  /models
    author.js
    book.js
    bookinstance.js
    genre.js
```

### 저자 모델 (Author model)

아래에 보이는 `Author` 스키마 코드를 복사해서 **./models.author.js** 파일에 붙여넣자. 스키마는 저자가 성과 이름에 대해서는 `String` SchemaType을 (필수항목으로 최대 100자) 출생 및 사망일에 대해서는 `Date` 필드를 갖도록 정의했다.

```js
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var AuthorSchema = new Schema(
  {
    first_name: {type: String, required: true, maxLength: 100},
    family_name: {type: String, required: true, maxLength: 100},
    date_of_birth: {type: Date},
    date_of_death: {type: Date},
  }
);

// 저자의 전체 이름에 대한 virtual
AuthorSchema
.virtual('name')
.get(function () {
// 저자가 성 또는 이름값을 갖지 않는 오류를 피하기 위함
// 해당 경우에는 빈 문자열을 반환해 예외를 확실하게 처리한다
  var fullname = '';
  if (this.first_name && this.family_name) {
    fullname = this.family_name + ', ' + this.first_name
  }
  if (!this.first_name || !this.family_name) {
    fullname = '';
  }
  return fullname;
});

// 저자의 수명에 대한 virtual
AuthorSchema.virtual('lifespan').get(function() {
  var lifetime_string = '';
  if (this.date_of_birth) {
    lifetime_string = this.date_of_birth.getYear()).toString();
  }
  lifetime_string += ' - ';
  if (this.date_of_death) {
    lifetime_string += this.date_of_death.getYear()
  }
  return lifetime_string;
});

// 저자의 URL에 대한 virtual
AuthorSchema
.virtual('url')
.get(function () {
  return '/catalog/author/' + this._id;
});

// 모델 내보내기
module.exports = mongoose.model('Author', AuthorSchema);
```

또한 모델의 특정 인스턴스를 가져오는 데 필요한 절대 경로(URL)를 반환하는 AuthorSchema의 "url" virtual도 선언했다 - 템플릿에서 특정 저자에 대한 링크가 필요할 때마다 이 속성을 사용할 예정이다.

> Note: 스키마에서 URL을 virtual로 선언하면 하나의 항목에 대한 URL은 한 곳에서만 수정하면 되기 때문에 이렇게 하는 것은 좋은 생각이다. 지금은 각 모델 인스턴스를 처리할 라우트가 없기 때문에 이 URL을 사용하는 링크가 제대로 작동하지 않는다. 이것은 다음 글에서 설정할 것이다!

모듈 끝에서는 모델을 내보낸다.

### 책 모델 (Book model)

아래에 보이는 `Book` 스키마 코드를 복사해서 **./models.book.js** 파일에 붙여넣자. 대부분은 저자 모델과 비슷하다 - 몇 개의 문자열 필드로 스키마를 선언하고, 특정 책 레코드의 URL을 얻기 위한 virtual을 선언하고, 모델을 내보낸다.

```js
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var BookSchema = new Schema(
  {
    title: {type: String, required: true},
    author: {type: Schema.Types.ObjectId, ref: 'Author', required: true},
    summary: {type: String, required: true},
    isbn: {type: String, required: true},
    genre: [{type: Schema.Types.ObjectId, ref: 'Genre'}]
  }
);

// 책 URL에 대한 virtual
BookSchema
.virtual('url')
.get(function () {
  return '/catalog/book/' + this._id;
});

// 모델 내보내기
module.exports = mongoose.model('Book', BookSchema);
```

여기서 주된 차이점은 다른 모델에 대한 참조를 두 개 만들었다는 것이다:

* author는 단일 `Author` 모델 객체에 대한 참조로 필수이다.
* genre는 단일 `Genre` 모델 객체에 대한 참조이다. 이 객체는 아직 선언하지 않았다!

### 책 인스턴스 모델 (BookInstance model)

마지막으로, 아래에 보이는 `BookInstance` 스키마 코드를 복사해서 **./models.bookinstance.js** 파일에 붙여넣자. `BookInstance`는 누군가 빌리려는 책의 특정 사본(copy)을 나타내며, 사본의 대여 가능 여부, 반납 예정 날짜, "간기(imprint)" (혹은 버전) 세부 사항에 대한 정보를 포함한다.

```js
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var BookInstanceSchema = new Schema(
  {
    book: { type: Schema.Types.ObjectId, ref: 'Book', required: true }, // 연관 책에 대한 참조
    imprint: {type: String, required: true},
    status: {type: String, required: true, enum: ['Available', 'Maintenance', 'Loaned', 'Reserved'], default: 'Maintenance'},
    due_back: {type: Date, default: Date.now}
  }
);

// 책 인스턴스 URL에 대한 virtual
BookInstanceSchema
.virtual('url')
.get(function () {
  return '/catalog/bookinstance/' + this._id;
});

// 모델 내보내기
module.exports = mongoose.model('BookInstance', BookInstanceSchema);
```

이것에서 새로 볼 수 있는 것은 필드 옵션이다:

* `enum`: 이를 통해 허용된 문자열 값을 설정할 수 있다. 이 경우, 책의 대여 가능 상태를 지정하기 위해 사용한다 (`enum`을 사용하면 상태에 대한 오타와 임의의 값을 방지할 수 있다는 것을 의미한다).
* `default`: 유지보수를 위해 새로 만들어진 책 인스턴스의 `status` 기본값을 `Maintenance`로, `due_back` 날짜 값을 `now`로 설정한다 (날짜를 설정할 때 Date 함수를 어떻게 호출할 수 있는지 참고하자).

그 외의 모든 것은 이전의 스키마에서부터 익숙할 것이다.

### 장르 모델 - 도전! (Genre model - challenge!)

**./models/genre.js** 파일을 열어 장르(책의 카테고리, e.g. 이것이 소설 혹은 비소설인지, 로맨스, 군사사 등인지의 여부)를 저장하기 위한 스키마를 생성해보자.

정의는 다른 모델과 매우 비슷할 것이다:

* 모델은 장르를 묘사하는 `name`이라는 `String` SchemaType을 가져야 한다.
* 이 이름은 필수적이며 3자~100자 사이여야 한다.
* 이름이 `url`인 장르의 URL을 위한 virtual을 선언한다.
* 모델을 내보낸다.

## 테스트 - 일부 항목을 생성하기 (Testing — create some items)

이것이 전부이다. 이제 사이트의 모든 모델이 설정되었다!

모델을 테스트하려면 (그리고 예제 책과 다음 글에서 사용할 다른 항목을 만들려면) 각 유형의 항목을 만들 *독립적인* 스크립트를 실행해야 한다.

1. 파일 [populatedb.js](https://raw.githubusercontent.com/hamishwillee/express-locallibrary-tutorial/master/populatedb.js)를 *express-locallibrary-tutorial* 디렉토리(`package.json`과 같은 계층에)에 다운로드(혹은 생성)한다.

    > Note: [populatedb.js](https://raw.githubusercontent.com/hamishwillee/express-locallibrary-tutorial/master/populatedb.js) 가 어떻게 작동하는지 알 필요는 없다; 이건 단지 데이터베이스에 샘플 데이터를 추가할 뿐이다.

1. 다음의 명령을 프로젝트 루트에 입력해 스크립트를 실행하는데 필요한 *async* 모듈을 (이후의 튜토리얼에서 다룰 것이다) 설치한다.

    ```zsh
    npm install async
    ```

1. 명령 프롬프트에서 node를 사용하고 자신의 MongoDB 데이터베이스의 URL을 (`app.js` 에서 *insert_your_database_url_here* 자리 표시자를 대체해 작성한 것과 같은 것이다) 전달해 스크립트를 실행한다.

    ```zsh
    node populatedb <your mongodb url>
    ```

1. 스크립트가 터미널에서 항목들을 생성하는 동시에 출력하면서 끝까지 실행될 것이다.

> Note: mongoDB Atlas(*Collections* 탭에서)의 데이터베이스로 이동하자. 이제 책, 저자, 장르, 북 인스턴스의 개별 컬렉션을 자세히 살펴보고 개별 문서를 확인할 수 있을 것이다.
