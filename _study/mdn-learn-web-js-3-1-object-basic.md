---
layout  : article
title   : JavaScript 객체 기본 (JavaScript object basics)
summary : 
date    : 2022-01-10 14:26:42 +0900
updated : 2022-01-10 21:47:29 +0900
tag     : draft
toc     : true
public  : true
parent  : [[mdn-learn-web-js]]
latex   : false
---
* TOC
{:toc}

> 이 글은 MDN Learn web development의 [Introducing JavaScript objects](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects) 중 [JavaScript object basics](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Basics)의 내용을 번역 및 정리한 글입니다.
>
> * 제가 필요한 부분 위주로 확인하면서 정리하고 있어 글에 덜 작성된 부분이 있을 수 있습니다.
> * 글 작성 후 원문의 내용이 수정되거나 내용을 이해하기 위한 개인적인 설명이나 해석이 있을 수 있습니다. 되도록 원문을 참고해주시길 바랍니다.
> * 잘못된 부분이 있다면 댓글이나 그 외 편하신 방법으로 알려주시면 감사하겠습니다.

## 객체 기본 (Object basics)

객체는 연관된 데이터 및/혹은 기능(functionality)의 모음이다. 일반적으로 여러 변수와 함수로 (객체 안에 있을 때는 프로퍼티와 메소드라고 부른다) 구성된다. 예제를 통해서 실제로 어떻게 보이는지 알아(understand)보자.

먼저, [oojs.html](https://github.com/mdn/learning-area/blob/main/javascript/oojs/introduction/oojs.html) 파일의 로컬 복사본을 만든다. 이 파일에는 소스 코드를 작성하기 위한 작은 [`<script>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script) 요소가 포함되어있다. 우리는 기본 객체 문법을 탐구하기 위한 기반으로 이 파일을 사용할 것이다. 예제를 따라 하는 동안은 반드시 [개발자 도구의 자바스크립트 콘솔](https://developer.mozilla.org/en-US/docs/Learn/Common_questions/What_are_browser_developer_tools#the_javascript_console)을 열어두고, 몇몇 명령어를 직접 입력할 준비가 되어있어야 한다.

다른 자바스크립트 요소들과 마찬가지로, 객체를 생성하는 것은 변수를 정의하고 초기화하는 것으로 시작한다. 다음의 코드를 파일 안에 있는 자바스크립트 코드 아래(oojs.html 파일의 `<script>` 태그 사이)에 입력하고 저장한 뒤 새로 고침 해보자:

```js
const person = {};
```

이제 브라우저의 [자바스크립트 콘솔](https://developer.mozilla.org/en-US/docs/Learn/Common_questions/What_are_browser_developer_tools#the_javascript_console)을 열고 `person`을 입력한 다음 `Enter`/`Return`을 눌러보자. 아래 줄 중 하나와 유사한 결과가 표시된다.

```
[object Object]
Object { }
{ }
```

축하한다, 방금 첫 객체를 만들었다. 하지만 이것은 빈 객체여서 실제로 할 수 있는 건 많지 않다. 파일에서 자바스크립트 객체를 다음과 같이 수정해보자.

```js
const person = {
  name: ['Bob', 'Smith'],
  age: 32,
  bio: function() {
    console.log(`${this.name[0]} ${this.name[1]} is ${this.age} years old.`);
  },
  introduceSelf: function() {
    console.log(`Hi! I'm ${this.name[0]}.`);
  }
};
```

저장하고 새로고침 한 뒤, 브라우저 개발자 도구의 자바스크립트 콘솔에 다음 중 일부를 입력해보자.

```js
person.name
person.name[0]
person.age
person.bio()
person.introduceSelf()
```

이제 객체 내부에 몇 가지 데이터와 기능이 있으며, 간단하고 멋진 구문으로 이들에 접근할 수 있다!

그래서 무슨 일이 일어나고 있는 걸까?

객체는 각기 다른 이름(e.g. 위 예시의 `name` 과 `age`)과 값(e.g. `['Bob', 'Smith']` 과 `32`)을 갖는 여러 멤버로 구성된다. 각 이름/값 쌍은 쉼표로 구분해야 하며, 이름과 값은 콜론으로 구분된다. 해당 구문은 항상 다음의 패턴을 따른다:

```js
const objectName = {
  member1Name: member1Value,
  member2Name: member2Value,
  member3Name: member3Value
};
```

객체를 구성하는 멤버의 값은 어떤 것이라도 될 수 있다 - 위에서 만든 person 객체는 문자열, 숫자, 두 개의 배열과 두 개의 함수를 갖는다.

* 처음 네 항목은 데이터 항목으로, 객체의 **속성(properties)**이라고 부른다.
* 마지막 두 항목은 객체가 데이터를 갖고 어떤 일을 할 수 있도록 해주는 함수로, 객체의 **메소드(methods)**라고 부른다.

객체의 멤버가 함수일 때는 구문을 더 간단히 쓸 수 있다. `bio: function()` 대신 `bio()`라고 작성할 수 있다. 다음과 같이:

```js
const person = {
  // 속성
  name: ['Bob', 'Smith'],
  age: 32,

  // 메소드
  bio() {
    console.log(`${this.name[0]} ${this.name[1]} is ${this.age} years old.`);
  },
  introduceSelf() {
      console.log(`Hi! I'm ${this.name[0]}.`);
  }
};
```

지금부터는 위의 예제처럼 더 짧은 구문을 사용할 것이다.

이런 객체는 **객체 리터럴(object literal)**이라고 부른다 - 객체를 생성할 때 객체의 콘텐츠를 말 그대로 작성한다. 객체 리터럴은 클래스로부터 생성(instantiated)된 객체와는 다르다. 이 방식은 뒤에서 살펴볼 예정이다.

예를 들어 데이터베이스에 넣을 요청을 서버에 보내는 것과 같이, 일련의 구조화되고 연관된 데이터 항목을 일정 방법으로 전송하고 싶을 때, 매우 일반적으로 객체 리터럴을 사용해서 객체를 생성한다. 하나의 객체를 전송하는 것이 각 항목을 개별적으로 전송하는 것보다 훨씬 효율적이며, 개별 항목을 이름으로 구분하려는 경우에도 배열보다 사용(work)하기 더 쉽다.

## 점 표기법 (Dot notation)

### 객체 속성으로서의 객체 (Objects as object properties)

## 괄호 표기법 (Bracket notation)

## 객체 멤버 설정하기 (Setting object members)

지금까지는 객체 멤버를 가져오는(또는 **얻는**) 방법만 살펴보았다 - 다음과 같이 설정하고 싶은 멤버를 (점이나 대괄호 표기법을 사용해) 선언해서 객체 멤버의 값을 **설정**(갱신)하는 것도 가능하다:

```js
person.age = 45;
person['name']['last'] = 'Cratchit';
```

위의 코드를 입력한 다음, 객체 멤버 값을 다음과 같이 다시 가져와 어떻게 바뀌었는지 확인해보자:

```js
person.age
person['name']['last']
```

객체 멤버를 설정하는 것은 단지 기존에 존재하는 속성이나 메소드의 값을 설정하는 것에서 그치(stop)지 않는다; 완전히 새로운 멤버를 생성할 수도 있다. JS 콘솔에서 다음을 시도해보자:

```js
person['eyes'] = 'hazel';
person.farewell = function() { alert("Bye everybody!"); }
```

이제 새로운 멤버를 테스트해보자:

```js
person['eyes']
person.farewell()
```

대괄호 표현의 이점(useful aspect) 중 하나는 멤버의 값뿐만 아니라, 멤버 이름까지도 동적으로 변경할 수 있다는 것이다.

만약 사용자가 두 개의 텍스트 입력에 멤버 이름과 값을 입력해서 people 데이터에 사용자 정의 값 유형을 저장할 수 있도록 하고 싶다고 가정해보자. 그 값은 다음과 같이 얻어올 수 있을 것이다:

```js
let myDataName = nameInput.value;
let myDataValue = nameValue.value;
```

그러면 person 객체에 다음과 같이 새 멤버의 이름과 값을 추가할 수 있다:

```js
person[myDataName] = myDataValue;
```

제대로 동작하는지 확인하려면, 다음의 코드를 `person` 객체의 닫는 대괄호 바로 아래에 추가해보자:

```js
let myDataName = 'height';
let myDataValue = '1.75m';
person[myDataName] = myDataValue;
```

이제 저장하고 새로 고침한 뒤 텍스트 입력창에 다음 코드를 입력해보자:

```js
person.height
```

점 표기법으로는 리터럴 멤버 이름만 받을 수 있고, 이름을 가리키는 변수는 받을 수 없어서, 위의 방법으로 객체에 속성을 추가하지 못한다.

## "this"는 무엇일까? (What is "this"?)

지금까지의 메소드에서 약간 이상한 점을 발견했을 수도 있다. 다음을 예제로 봐보자:

```js
greeting: function() {
  alert('Hi! I\'m ' + this.name.first + '.');
}
```

아마 "this"가 뭔지 궁금할 것이다. `this` 키워드는 지금 동작하고 있는 코드가 안에 적혀있는 현재 객체를 가리킨다 - 그러므로 이 경우 `this`는 `person`과 동일하다. 그러면 왜 `person`을 직접 쓰지 않았을까?

한 개의 객체 리터럴만 생성하는 경우에는 `this`가 그다지 유용하지 않다. 하지만 두 개 이상의 객체를 만들 경우, `this`가 생성하는 모든 객체에서 동일한 메소드 정의를 사용할 수 있도록 해준다.

무엇을 의미하는지 간략화된 person 객체를 가지고 설명해보자:

```js
const person1 = {
  name: 'Chris',
  greeting: function() {
    alert('Hi! I\'m ' + this.name + '.');
  }
}

const person2 = {
  name: 'Deepti',
  greeting: function() {
    alert('Hi! I\'m ' + this.name + '.');
  }
}
```

이 예제에서, 메소드의 코드는 각 경우에서 정확히 같지만,

* `person1.greeting()` 은 "Hi! I'm Chris."를 출력하고
* 반면 `person2.greeting()` 은 "Hi! I'm Deepti."를 출력한다.

이것은 객체 리터럴을 직접 작성해서 사용하는 경우에는 별로 유용하지 않지만, **생성자(constructure)**를 사용해서 한 개의 객체 정의로부터 두 개 이상의 객체를 만들기 시작할 때에는 필수적일 것이며, 이것이 다음 섹션에서 다룰 주제이다.

## 생성자 소개 (Introducing constructors)

한 개의 객체만 생성해야 하는 경우에는 객체 리터럴을 사용해도 괜찮지만, 이전 섹션에서처럼, 두 개 이상을 만들어야 할 때는, 객체 리터럴을 사용하는 것이 심히 부적절하다. 만드는 모든 객체마다 같은 코드를 계속 작성해야 하고, 객체의 일부 속성을 바꾸고 싶을 때는 - `height` 속성을 추가하는 것처럼 - 모든 객체를 수정해야 한다는 것을 기억해야 한다.

객체의 "형태(shape)"를 정의한 다음 - 객체가 가질 수 있는 메소드와 속성의 집합 - 서로 다른 속성에 대한 값을 갱신하면서, 원하는 만큼의 객체를 생성하는 방법이 필요(would like)하다.

이것의 첫 번째 버전은 그냥 함수이다:

```js
function createPerson(name) {
  const obj = {};
  obj.name = name;
  obj.introduceSelf = function() {
    console.log(`Hi! I'm ${this.name}.`);
  };
  return obj;
}
```

이 함수는 호출할 때마다 새로운 객체를 만들어 반환한다. 이 객체는 두 멤버를 가질 것이다:

* 속성인 `name`
* 메소드인 `introduceSelf()`

`createPerson()`은 매개 변수 `name`을 가져가 `name` 속성의 값을 설정하지만, `introduceSelf()` 메소드의 값은 이 함수를 이용해서 만든 모든 객체에서 같다는 것을 확인하자. 이것은 객체를 만드는 매우 일반적인 패턴이다. `introduceSelf()`를 정의에서 `this`를 사용할 수 있는 것이 어떻게 우리가 만드는 모든 객체에서 같은 코드를 사용할 수 있도록 해주는지 확인할 수 있다.

이제 해당 정의를 재사용해서, 우리가 원하는 만큼 객체를 만들 수 있다:

```js
const salva = createNewPerson('Salva');
salva.name;
salva.introduceSelf();

const frankie = createNewPerson('Frankie');
frankie.name;
frankie.introduceSelf();
```

이것은 충분히 잘 작동하지만, 약간 장황한 편이다: 빈 객체를 만들고, 이를 초기화한 뒤, 반환해야 한다. 더 나은 방법은 **생성자(constructor)**를 사용하는 것이다. 생성자는 그냥 `new` 키워드를 사용해서 호출하는 함수이다. 생성자를 호출하면, 그것은:

* 새로운 객체를 만들고
* `this`를 이 새 객체에 연결해, 생성자 코드에서 `this`를 참조할 수 있도록 한 뒤
* 생성자의 코드를 실행해
* 새 객체를 반환할 것이다.

일반적으로 생성자는 대문자로 시작하고 해당 생성자로 만들 객체의 유형에 따라 이름을 지정한다. 그러므로 위의 예제를 다음과 같이 다시 작성할 수 있다:

```js
function Person(name) {
  this.name = name;
  this.introduceSelf = function() {
    console.log(`Hi! I'm ${this.name}.`);
  }
}
```

`Person()`을 생성자로 호출하기 위해서, `new`를 사용한다:

```js
const salva = new Person('Salva');
salva.name;
salva.introduceSelf();

const frankie = new Person('Frankie');
frankie.name;
frankie.introduceSelf();
```

## 당신은 객체를 계속 사용해 왔다 (You've been using objects all along)
