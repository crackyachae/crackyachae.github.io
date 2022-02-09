---
layout  : article
title   : 자바스크립트의 클래스 (Classes in JavaScript)
summary : 
date    : 2022-02-09 13:14:37 +0900
updated : 2022-02-09 14:20:46 +0900
tag     : draft
toc     : true
public  : true
parent  : [[mdn-learn-web-js]]
latex   : false
---
* TOC
{:toc}

> 이 글은 MDN Learn web development의 [Introducing JavaScript objects](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects) 중 [Classes in JavaScript](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Classes_in_JavaScript)의 내용을 번역 및 정리한 글입니다.
>
> * 제가 필요한 부분 위주로 확인하면서 정리하고 있어 글에 덜 작성된 부분이 있을 수 있습니다.
> * 글 작성 후 원문의 내용이 수정되거나 내용을 이해하기 위한 개인적인 설명이나 해석이 있을 수 있습니다. 되도록 원문을 참고해주시길 바랍니다.
> * 잘못된 부분이 있다면 댓글이나 그 외 편하신 방법으로 알려주시면 감사하겠습니다.

## 클래스와 생성자 (Classes and constructors)

### 클래스

클래스는 [`class`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/class) 키워드를 사용해 선언할 수 있다. 이전 글의 `Person` 클래스 선언은 다음과 같다:

```js
class Person {

  name;

  constructor(name) {
    this.name = name;
  }

  introduceSelf() {
    console.log(`Hi! I'm ${this.name}`);
  }

}
```

이 예제는 `Person` 클래스를 다음과 함께 선언한다:

* `name` 속성
* 객체의 `name` 속성을 초기화하는 데 필요한 `name` 매개변수를 받는 생성자
* `this`로 객체의 속성을 참조할 수 있는 `introduceSelf()` 메소드

위의 `name;` 선언은 선택적이다: 생략할 수 있고, 생성자의 `this.name = name;` 코드가 초기화하기 전에 `name` 속성을 생성할 것이다. 그러나 클래스 선언에 명시적으로 속성을 나열(listing)하면 코드를 보는 사람들이 이 클래스에 어떤 속성이 있는지 더 쉽게 파악할 수 있다.

또한 속성을 선언할 때 `name = '';`와 같은 코드로 속성을 기본값으로 초기화할 수도 있다.

### 생성자

생성자는 [`constructor`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/constructor) 키워드를 사용해 정의한다. 클래스 정의 외의 생성자와 똑같이, 이 키워드는:

* 새로운 객체를 생성한다.
* 새 객체에 `this`를 연결(bind)해 생성자 코드에서 `this`를 참조할 수 있다.
* 생성자 안의 코드를 실행한다.
* 새 객체를 반환한다.

위의 클래스 선언 코드로, 새로운 `Person` 인스턴스를 다음과 같이 생성해 사용할 수 있다:

```js
const giles = new Person('Giles');

giles.introduceSelf(); // Hi! I'm Giles
```

예제의 `Person`처럼 클래스의 이름을 사용해 생성자를 호출한다는 것에 유의하자.

### 생성자를 생략하기 (Omitting constructors)

특별한 초기화를 할 필요가 없으면, 생성자를 생략할 수 있으며, 기본 생성자(default constructor)가 생성된다.

```js
class Animal {

  sleep() {
    console.log('zzzzzzz');
  }

}

const spot = new Animal();

spot.sleep(); // 'zzzzzzz'
```

## 상속 (Inheritance)

위의 `Person` 클래스를 고려해, `Professor` 하위 클래스를 정의해보자.

```js
class Professor extends Person {

  teaches;

  constructor(name, teaches) {
    super(name);
    this.teaches = teaches;
  }

  introduceSelf() {
    console.log(`My name is ${this.name}, and I will be your ${this.teaches} professor.`);
  }

  grade(paper) {
    const grade = Math.floor(Math.random() * (5 - 1) + 1);
    console.log(grade);
  }

}
```

[`extends`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/extends) 키워들 사용해 이 클래스가 다른 클래스를 상속한다는 것을 나타낸다.

`Professor` 클래스에는 새로운 속성인 `teaches`가 추가되므로, 이를 선언한다.

새로운 `Professor`이 생성될 때 `teaches`를 설정하고 싶으니, `name`과 `teaches`를 인자로 받는 생성자를 정의한다. 이 생성자가 가장 먼저 하는 것은 `name` 매개변수를 전달하면서 [`super()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/super) 상위 클래스 생성자를 호출하는 것이다. 그 다음 `Professor` 생성자가 `teaches` 속성을 설정한다.

> Note: 하위 클래스에 자체적인 초기화가 한 개라도 있다면, **반드시** 먼저 `super()`로 상위 클래스 생성자를 호출해 상위 클래스 생성자에게 필요한 매개변수를 전달해야 한다.

또한 위에서는 상위 클래스의 메소드인 `introduceSelf()` 메소드를 재설정(override)하고, 과제를 채점하기 위한 새로운 메소드 `grade()`를 추가한다 (예제의 교수는 그렇게 훌륭하지 않아서, 과제에 임의의 성적을 부여하기만 한다).

이 선언과 함께 이제 교수를 생성하고 사용할 수 있다:

```js
const walsh = new Professor('Walsh', 'Psychology');
walsh.introduceSelf();  // 'My name is Walsh, and I will be your Psychology professor'

walsh.grade('my paper'); // some random grade
```

## 캡슐화 (Encapsulation)

마지막으로, 자바스크립트에 캡슐화가 어떻게 구현되어있는지 살펴보자. 이전의 글에서 `Student` 클래스의 코드를 망치지(breaking) 않고 양궁 수업의 규칙을 바꿀 수 있도록 `Student`의 `year` 속성을 어떻게 비공개(private)로 만들면 좋을지를 논의했었다.

이를 수행하는 `Student` 클래스를 선언하는 것은 다음과 같다:

```js
class Student extends Person {

  #year;

  constructor(name, year) {
    super(name);
    this.#year = year;
  }


  introduceSelf() {
    console.log(`Hi! I'm ${this.name}, and I'm in year ${this.#year}.`);
  }

  canStudyArchery() {
    return this.#year > 1;
  }

}
```

이 클래스 선언에서 `#year`은 [비공개 데이터 속성](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/Private_class_fields)이다. `Student` 객체를 생성할 수 있고, 즉시 `#year` 속성을 사용할 수 있지만, 객체 밖에서 `#year`에 접근하려고 시도하면 브라우저가 에러를 발생시킨다:

```js
const summers = new Student('Summers', 2);

summers.introduceSelf(); // Hi! I'm Summers, and I'm in year 2.
summers.canStudyArchery(); // true

summers.#year; // SyntaxError
```

비공개 데이터 속성은 클래스 선언 안에서 선언되어야 하고 이름은 `#`으로 시작한다.

### 비공개 메소드 (Private methods)

비공개 데이터 속성뿐만 아니라 비공개 메소드도 있다. 비공개 데이터 속성처럼 비공개 메소드의 이름도 `#`으로 시작하고, 객체의 자체 메소드로만 호출될 수 있다:

```js
class Example {

  somePublicMethod() {
    this.#somePrivateMethod();
  }

  #somePrivateMethod() {
    console.log('You called me?');
  }

}

const myExample = new Example();

myExample.somePublicMethod(); // 'You called me?'

myExample.#somePrivateMethod(); // SyntaxError
```
