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

객체는 연관된 데이터 및/혹은 기능(functionality)(일반적으로 여러 변수와 함수로 구성되어 있으며 - 객체 안에 있을 때는 프로퍼티와 메소드라고 부른다)의 모음이다. 예제를 통해서 실제로 어떻게 보이는지 알아(understand)보자.

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
  gender: 'male',
  interests: ['music', 'skiing'],
  bio: function() {
    alert(this.name[0] + ' ' + this.name[1] + ' is ' + this.age + ' years old. He likes ' + this.interests[0] + ' and ' + this.interests[1] + '.');
  },
  greeting: function() {
    alert('Hi! I\'m ' + this.name[0] + '.');
  }
};
```

저장하고 새로고침 한 뒤, 브라우저 개발자 도구의 자바스크립트 콘솔에 다음 중 일부를 입력해보자.

```js
person.name
person.name[0]
person.age
person.interests[1]
person.bio()
person.greeting()
```

이제 객체 내부에 몇 가지 데이터와 기능이 있으며, 간단하고 멋진 구문으로 이들에 접근할 수 있다!

> Note: 만약 여기까지 진행하는 데 어려움이 있다면, 코드를 예제 완성 파일과 비교해보자 — [oojs-finished.html](https://github.com/mdn/learning-area/blob/main/javascript/oojs/introduction/oojs-finished.html) (그리고 [실시간 예제](https://mdn.github.io/learning-area/javascript/oojs/introduction/oojs-finished.html)도 확인해보자). 실시간 예제(라이브 버전)에서는 빈 화면만 보이겠지만, 괜찮다 — 다시, 개발자 도구를 열고 객체 구조를 확인하기 위해 위의 명령어를 입력해보자.

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

```js
const person = {
  // 속성
  name: ['Bob', 'Smith'],
  age: 32,
  gender: 'male',
  interests: ['music', 'skiing'],

  // 메소드
  bio: function() {
    alert(this.name[0] + ' ' + this.name[1] + ' is ' + this.age + ' years old. He likes ' + this.interests[0] + ' and ' + this.interests[1] + '.');
  },
  greeting: function() {
    alert('Hi! I\'m ' + this.name[0] + '.');
  }
};
```

* 처음 네 항목은 데이터 항목으로, 객체의 **속성(properties)**이라고 부른다.
* 마지막 두 항목은 객체가 데이터를 갖고 어떤 일을 할 수 있도록 해주는 함수로, 객체의 **메소드(methods)**라고 부른다.

이런 객체는 **객체 리터럴(object literal)**이라고 부른다 - 객체를 생성할 때 객체의 콘텐츠를 말 그대로 작성한다. 객체 리터럴은 클래스로부터 생성(instantiated)된 객체와는 다르다. 이 방식은 뒤에서 살펴볼 예정이다.

예를 들어 데이터베이스에 넣을 요청을 서버에 보내는 것과 같이, 일련의 구조화되고 연관된 데이터 항목을 일정 방법으로 전송하고 싶을 때, 매우 일반적으로 객체 리터럴을 사용해서 객체를 생성한다. 하나의 객체를 전송하는 것이 각 항목을 개별적으로 전송하는 것보다 훨씬 효율적이며, 개별 항목을 이름으로 구분하려는 경우에도 배열보다 사용(work)하기 더 쉽다.

## 점 표기법 (Dot notation)

### 하위 namespaces (Sub-namespaces)

## 괄호 표기법 (Bracket notation)

## 객체 멤버 설정하기 (Setting object members)

지금까지는 객체 멤버를 가져오는(또는 얻는) 방법만 살펴보았다 - 다음과 같이 설정하고 싶은 멤버를 (점이나 대괄호 표기법을 사용해) 선언해서 객체 멤버의 값을 설정(갱신)하는 것도 가능하다:

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

앞으로 보게 될 [입문자를 위한 객체 지향 자바스크립트](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Object-oriented_JS) 문서에서 보게 될 것처럼, 생성자를 만들기 시작하고, 그 외의 것을 할 때 `this`는 매우 유용하다 - 객체 멤버의 컨텍스트가 바뀌는 경우에도 (예를 들어, 두 개의 다른 `person` 객체 인스턴스가 다른 이름값을 가지고, 이들에게 인사할 때 각자의 이름을 사용하고 싶은 경우에) 언제나 정확한 값이 사용되도록 보장해준다.

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

* `person1.greeting()` 은 "Hi! I'm Chris."를 출력한다.
* 반면 `person2.greeting()` 은 "Hi! I'm Deepti."를 출력한다.

앞서 말했듯이, `this` 은 실행 중인 코드가 속해있는 객체와 같다 - 객체 리터럴을 직접 작성해서 사용하는 경우에는 별로 유용하지 않지만, 객체를 동적으로 생성하는 경우(예를 들면 생성자를 사용하는 경우)에는 매우 유용하다. 이 부분은 다음에 더 명확해질 것이다.

## 당신은 객체를 계속 사용해 왔다 (You've been using objects all along)
