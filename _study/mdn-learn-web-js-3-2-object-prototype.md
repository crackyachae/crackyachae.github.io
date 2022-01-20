---
layout  : article
title   : 객체 프로토타입이 (Object prototypes)
summary : 
date    : 2022-01-20 16:32:04 +0900
updated : 2022-01-20 23:28:36 +0900
tag     : draft
toc     : true
public  : true
parent  : [[mdn-learn-web-js]]
latex   : false
---
* TOC
{:toc}

> 이 글은 MDN Learn web development의 [Introducing JavaScript objects](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects) 중 [Object prototypes](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Object_prototypes)의 내용을 번역 및 정리한 글입니다.
>
> * 제가 필요한 부분 위주로 확인하면서 정리하고 있어 글에 덜 작성된 부분이 있을 수 있습니다.
> * 글 작성 후 원문의 내용이 수정되거나 내용을 이해하기 위한 개인적인 설명이나 해석이 있을 수 있습니다. 되도록 원문을 참고해주시길 바랍니다.
> * 잘못된 부분이 있다면 댓글이나 그 외 편하신 방법으로 알려주시면 감사하겠습니다.

## 속성 체인 (The prototype chain)

브라우저 콘솔에서, 다음 객체 리터럴을 만들어보자:

```js
const myObject = {
  city: 'Madrid',
  greet() {
    console.log(`Greetings from ${this.city}`);
  }
}

myObject.greet(); // Madrid의 인사
```

이것은 하나의 데이터 속성, `city`와 하나의 메소드 `greet()`를 갖는 객체이다. 만약 `myObject.`처럼 객체의 이름 *다음에 마침표를* 입력하면, 콘솔이 해당 객체에서 사용할 수 있는 모든 속성의 목록을 표시할 것이다. `city`와 `greet`뿐만 아니라 다른 많은 속성이 있다는 것을 볼 수 있다!

```
__defineGetter__
__defineSetter__
__lookupGetter__
__lookupSetter__
__proto__
city
constructor
greet
hasOwnProperty
isPrototypeOf
propertyIsEnumerable
toLocaleString
toString
toValueOf
```

이 중 하나에 접근해보자:

```js
myObject.hasOwnProperty('city'); // true
```

(아직 `hasOwnProperty()`가 무엇을 하는지는 확실하지 않더라도) 잘 작동한다.

이런 추가 속성들은 무엇이고, 어디서 왔을까?

자바스크립트의 모든 객체에는 **프로토타입(prototype)**이라고 하는 내장 속성이 있다. 프로토타입은 그 자체로 객체이며, 프로토타입은 다시 자체(own) 프로토타입을 가져, **프로토타입 체인(prototype chain)**이라는 것을 만든다. 이 체인은 자체 프로토타입으로 `null`을 갖는 프로토타입에 도달할 때 끝난다.

> Note: 자신의 프로토타입을 가리키는 객체의 속성은 `prototype`이라고 부르지 **않는다**. 이 이름은 표준이 아니지만, 실제로 모든 브라우저는 [`__proto__`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/proto)를 사용한다. 객체의 프로토타입에 접근하는 표준 방법은 [`Object.getPrototypeOf()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getPrototypeOf) 메소드를 사용하는 것이다.

객체의 속성에 접근하려고 할 때: 객체 자체에서 해당 속성을 찾을 수 없으면, 객체의 프로토타입에서 해당 속성을 찾는다. 여전히 해당 속성을 찾지 못하면, 프로토타입의 프로토타입에서 찾아보고, 해당 속성을 찾거나 체인의 끝에 도달할 때까지 이를 반복한다. 체인의 끝에 도달하는 경우 `undefined`가 반환된다.

그러므로 `myObject.hasOwnProperty('city')`를 호출할 때, 브라우저는:

* `myObject`에서 `hasOwnProperty`를 찾아보고
* 그곳에서 찾지 못하면, `myObject`의 프로토타입 객체에서 이를 찾아보고
* 그곳에서 `hasOwnProperty`를 발견해 이를 호출한다.

`myObject`의 프로토타입은 무엇일까? `Object.getPrototypeOf()` 함수를 사용해 이를 찾아보자.

```js
console.log(Object.getPrototypeOf(myObject)); // Object {...}
```

이것은 `Object.prototype`이라고 하는 객체로, 모든 객체가 기본적으로 가지고 있는 가장 기본적인 프로토타입이다. `Object.prototype`의 프로토타입은 `null`이므로, 이는 프로토타입 체인의 마지막이다:

객체의 프로토타입이 항상 `Object.prototype`인 것은 아니다. 다음을 시도해보자:

```js
const myDate = new Date();
let object = myDate;

do {  
  object = Object.getPrototypeOf(object);
  console.log(object);

} while (object);

// Date.prototype
// Object {...}
// null
```

이 코드는 `Date` 객체를 생성한 다음, 프로토타입 체인을 따라가면서 프로토타입을 기록한다. 이 예제는 `myDate`의 프로토타입은 `Date.prototype` 객체이고, *그것*의 프로토타입은 `Object.prototype`이라는 것을 보여준다.

실제로, `myDate2.getMonth()`와 같은 익숙한 메소드를 호출하는 것은, `Date.prototype`에 정의된 메소드를 호출하는 것과 같다.

## 속성 가리기 (Shadowing properties)

객체의 프로토타입에 같은 이름의 속성이 정의된 경우 객체에 속성을 정의하면 어떻게 될까? 한 번 봐보자:

```js
const myDate = new Date(1995, 11, 17);

console.log(myDate.getYear()); // 95

myDate.getYear = function() {
  console.log('something else!')
};

console.log(myDate.getYear()); // 'something else!'
```

이것은 프로토타입 체인에 대한 설명을 고려할 때 예상할 수 있다. `getYear()`을 호출하면 브라우저는 먼저 그 이름을 갖는 속성을 `myDate`에서 찾고, `myDate`가 정의되어있지 않을 때만 프로토타입을 확인한다. 그러므로 `getYear()`을 `myDate`에 추가하고 나면, `myDate`에 있는 버전이 호출된다.

이것을 속성 "가리기(shadowing)"라고 한다.

## 프로토타입 설정하기 (Setting a prototype)

자바스크립트에서 객체의 프로토타입을 설정하는 방법은 다양하고, 여기서는 `Object.create()`와 생성자 두 가지를 설명할 것이다.

### Object.create 사용하기 (Using Object.create)

`Object.create()` 메소드는 새로운 객체를 생성하고, 새로운 객체의 프로토타입으로 사용될 객체를 지정하도록 해준다.

여기 예제가 있다:

```js
const personPrototype = {
  greet() {
    console.log('hello!');
  }
}

const carl = Object.create(personPrototype);
carl.greet();  // hello!
```

여기서 `greet()` 메소드를 갖는 `personPrototype`을 생성했다. 그런 다음 `Object.create()`를 사용해 `personPrototype`을 프로토타입으로 갖는 새로운 객체를 생성했다. 이제 `greet()`을 새로운 객체에서 호출할 수 있고, 프로토타입이 이를 구현(provides its implementation)한다.

### 생성자를 사용하기 (Using a constructor)

자바스크립트에서 모든 함수는 `prototype`이라는 속성을 갖는다. 함수를 생성자로 호출하면 이 속성이 새로 생성되는 객체의 프로토타입으로 설정된다 (관습적으로 `__proto__`라는 속성 안에).

그러므로 생성자의 `prototype`을 설정하면, 해당 생성자로 만들어지는 모든 객체에 해당 프로토타입이 있다(given)고 확신할 수 있다.

```js
const personPrototype = {
  greet() {
    console.log(`hello, my name is ${this.name}!`);
  }
}

function Person(name) {
  this.name = name;
}

Person.prototype = personPrototype;
Person.prototype.constructor = Person;
```

여기서 우리는:

* `greet()` 메소드를 갖는 `personPrototype` 객체
* 생성하는 사람의 이름을 초기화하는 `Person` 생성자 함수를 만들었다.

그런 다음 `Person` 함수의 `prototype` 속성이 `personPrototype`을 가리키도록 설정했다.

마지막 줄(`Person.prototype.constructor = Person;`)은 프로토타입의 `constructor` 프로퍼티를 `Person` 객체를 만드는 데 사용하는 함수로 설정한다. `Person.prototype = personPrototype;`을 설정하면 해당 속성(`prototype`의 `constructor` 속성)이 `personPrototype`의 생성자를 가리키기 때문에 이 작업이 필요하다. `personPrototype`은 (`personPrototype`이 객체 리터럴로 생성되었기 때문에) `Person`이 아니라 `Object`이다.

이 코드 다음에, `Person()`을 사용해 만들어진 객체는 `personPrototype`을 그들의 프로토타입으로 갖는다.

```js
const reuben = new Person('Reuben');
reuben.greet(); // hello, my name is Reuben!
```

### 고유 속성 (Own properties)

위에서 `Person` 생성자를 사용해 만든 객체는 두 개의 속성을 갖는다:

* 생성자 안에 설정된 `name` 속성, `Person` 객체에 직접 나타난다
* 프로토타입 안에 설정된 `greet()` 메소드

이런 메소드는 프로토타입에 정의되지만, 데이터 속성은 생성자에 정의되는 패턴을 보는 것은 흔한 일이다. 메소드는 일반적으로 생성하는 모든 객체에서 동일하지만, 데이터 속성의 경우 주로 각 객체가 고유한 값을 갖기를 원하기 때문이다 (여기서 모든 사람이 다른 이름을 갖는 것처럼).

이 예제의 `name`처럼, 객체에 직접 정의된 속성은 **고유 속성(own properties)**이라고 하며, 정적 `Object.hasOwn()` 메소드로 해당 속성이 고유 속성인지 확인할 수 있다.

```js
const irma = new Person('Irma');

console.log(Object.hasOwn(irma, 'name')); // true
console.log(Object.hasOwn(irma, 'greet')); // false
```

> Note: 여기서 비-정적인 `Object.hasOwnProperty()` 메소드를 사용할 수도 있지만, 가능하다면 `Object.hasOwn()`을 사용하는 것을 권장한다.

## 프로토타입과 상속 (Prototypes and inheritance)

프로토타입은 자바스크립트의 강력하고 굉장히 유연한(flexible) 기능으로, 코드를 재사용하고 객체를 결합할 수 있도록 해준다.

특히 프로토타입은 **상속(inheritance)**을 지원한다. 상속은 시스템의 일부 객체가 다른 객체의 특별한(specialized) 버전이라는 프로그래머의 아이디어를 표현할 수 있도록 해주는 객체 지향 프로그래밍 언어의 기능이다.

예를 들어, 학교를 모델링 한다면 *교수*와 *학생*이 있을 수 있다: 이들은 모두 *사람*이므로 몇 가지 공통된 특성을 (예를 들어, 둘 다 이름을 갖는다) 갖지만, 각각 다른(extra) 특성을 추가하거나 (예를 들어, 교수는 그들이 가르치는 과목을 갖는다), 같은 특성을 다른 방법으로 구현할 수도 있다. OOP 시스템에서는 교수와 학생 모두 사람에게서 **상속(inherit)**받았다고 할 수 있다.

자바스크립트에서, `Professor`와 `Student` 객체가 `Person` 프로토타입을 가질 수 있는 경우, 공통 속성은 상속받으면서, 각각 필요한 다른 속성들은 추가하거나 재정의하는 방법을 볼 수 있다.

다음 글에서 객체 지향 프로그래밍 언어의 다른 주요 기능과 함께 상속에 대해 논의하고, 자바스크립트가 이를 지원하는 방법을 살펴볼 것이다.
