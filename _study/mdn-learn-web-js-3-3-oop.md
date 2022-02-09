---
layout  : article
title   : 객체 지향 프로그래밍 (Object-oriented programming)
summary : 
date    : 2022-01-22 21:15:56 +0900
updated : 2022-01-24 16:43:44 +0900
tag     : 
toc     : true
public  : true
parent  : [[mdn-learn-web-js]]
latex   : false
---
* TOC
{:toc}

> 이 글은 MDN Learn web development의 [Introducing JavaScript objects](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects) 중 [Object-oriented programming](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Object-oriented_programming)의 내용을 번역 및 정리한 글입니다.
>
> * 제가 필요한 부분 위주로 확인하면서 정리하고 있어 글에 덜 작성된 부분이 있을 수 있습니다.
> * 글 작성 후 원문의 내용이 수정되거나 내용을 이해하기 위한 개인적인 설명이나 해석이 있을 수 있습니다. 되도록 원문을 참고해주시길 바랍니다.
> * 잘못된 부분이 있다면 댓글이나 그 외 편하신 방법으로 알려주시면 감사하겠습니다.

객체 지향 프로그래밍(OOP, Object-oriented programming)은 자바(Java), C++을 포함한 많은 프로그래밍 언어의 프로그래밍 패러다임 기반이다. 이 글에서는 OOP 기본 개념의 개요를 제공할 것이다. 세 가지 주요 개념을 설명할 것이다: **클래스(classes)와 인스턴스(instance), 상속(inheritance), 캡슐화(encapsulation)**.

지금은 특별히 자바스크립트에 대한 참조 없이 이런 개념들을 설명할 것이며, 모든 예제는 의사 코드로(psuedocode) 제공된다.

> Note: 정확하게 말하면, 여기서 설명하는 기능은 클래스 기반(class-based) 혹은 "전통적인(classical)" OOP라고 하는 특정 스타일의 OOP의 기능이다. 사람들이 OOP에 대해 말할 때, 일반적으로는 이 유형을 의미한다.

그다음 자바스크립트의 생성자와 프로토타입 체인이 이 OOP 개념과 어떻게 연관되어있고 다른지 살펴볼 것이다. 그다음 다음 글에서는 객체 지향 프로그래밍을 더 쉽게 구현할 수 있는 자바스크립트의 몇 가지 추가 가능에 대해 살펴볼 것이다.

객체 지향 프로그래밍은 시스템을 각 시스템의 특정한 측면을 나타내는 객체의 모음으로 모델링하는 것에 대한 것이다. 객체는 함수(혹은 메소드)와 데이터 모두를 포함한다. 객체는 이를 사용하려는 다른 코드에 공용 인터페이스를 제공하지만, 자체적인 개인적 내부 상태도 유지한다: 이는 시스템의 다른 부분이 객체 안에서 무슨 일이 일어나는지 신경 쓸 필요가 없다는 것을 의미한다.

## 클래스와 인스턴스 (Classes and instances)

OOP에서, 객체의 관점에서 문제를 모델링할 때, 시스템에서 갖추(have)고 싶은 객체의 종류를 나타내는 추상적인 정의를 생성한다.

예를 들어, 학교를 모델링한다면, 교수를 나타내는 객체를 갖추고 싶을 것이다. 모든 교수는 공통된 속성을 갖는다:

* 모두가 이름과 그들이 가르치는 과목을 갖고 있다.
* 또한, 모든 교수가 특정한 행위를 할 수도 있다.
    * 예를 들어, 과제(paper)를 채점(grade)하거나,
    * 연초에 학생들에게 자신을 소개할 수도 있다.

그러므로 `Professor`는 현재 시스템의 **클래스(class)**가 될 수 있고, 해당 클래스의 정의에는 모든 교수가 갖는 데이터와 메소드가 나열되어 있다.

그러므로 `Professor` 클래스는 의사 코드로 다음과 같이 적을 수 있다:

```
class Professor
    properties
        name
        teaches
    methods
        grade(paper)
        introduceSelf()
```

이는 `Professor` 클래스를 다음과 함께 정의한다:

* 두 개의 데이터 속성: `name`과 `teaches`
* 두 개의 메소드: 과제를 채점하는 `grade()`, 자신을 소개하는 `introduceSelf()`

클래스는 그 자체로는 아무것도 하지 않는다. 클래스는 그 유형의 특정(concrete) 객체를 만들기 위한 일종의 템플릿이다. 여기서 생성한 구체적인 교수 각각은 `Professor` 클래스의 **인스턴스(instance)**라고 한다. 인스턴스를 생성하는 과정은 **생성자(constructor)**라고 하는 특별한 함수가 수행한다. 새로운 인스턴스에서 초기화하고 싶은 내부 모든 상태 값을 생성자에 전달한다.

일반적으로, 생성자는 클래스 정의의 일부분에 작성하고, 주로 클래스 자체와 같은 이름을 갖는다:

```
class Professor
    properties
        name
        teaches
    constructor
        Professor(name, teaches)
    methods
        grade(paper)
        introduceSelf()
```

해당 (예제의) 생성자는 두 개의 매개 변수를 전달받아 새 특정 교수를 생성할 때 `name`과 `teaches` 속성을 초기화할 수 있다.

이제 교수를 생성할 수 있는 생성자가 준비됐(have)다. 프로그래밍 언어는 주로 `new` 키워드를 사용해 생성자가 호출되고 있다는 신호를 보낸다.

```
walsh = new Professor('Walsh', 'Psychology')
lillian = new Professor('Lillian', 'Poetry')

walsh.teaches  // 'Psychology'
walsh.introduceSelf()  // 'My name is Professor Walsh, and I will be your Psychology professor'

lillian.teaches  // 'Poetry'
lillian.introduceSelf()  // 'My name is Professor Lillian, and I will be your Poetry professor'
```

위 예제는 모두 `Professor` 클래스의 인스턴스인 두 객체를 생성한다.

## 상속 (Inheritance)

예제 학교에서 학생도 나타내고 싶다고 가정해보자. 교수와는 다르게 학생들은 과제를 채점할 수 없고, 특정 과목을 가르치지도 않지만, 특정 학년에 소속되어있다.

하지만, 학생은 이름이 있고 자신을 소개하고 싶을 수도 있다. 그러므로 학생 클래스의 정의를 다음과 같이 작성할 수 있다:

```
class Student
    properties
        name
        year
    constructor
        Student(name, year)
    methods
        introduceSelf()
```

만약 학생과 교수가 일부 속성을 공유한다는 사실을, 혹은 더 정확하게는, 어느 정도 수준에서는 이들이 *같은 종류*라는 사실을 나타낼 수 있다면 유용할 것이다. **상속(Inheritance)**을 통해서 이를 나타낼 수 있다.

학생과 교수가 모두 사람이며, 사람은 이름이 있고 자신을 소개하고 싶다는 사실을 관찰하는 것부터 시작한다. 그런 다음 사람의 모든 공통 속성을 정의한 새로운 클래스 `Person`을 정의하여 이를 모델링할 수 있다. 그러면 `Professor`와 `Student`는 모두 `Person`에서  **파생(derive)**되어 그들의 다른(extra) 속성을 추가할 수 있다:

```
class Person
    properties
        name
    constructor
        Person(name)
    methods
        introduceSelf()

class Professor : extends Person
    properties
        teaches
    constructor
        Professor(name, teaches)
    methods
        grade(paper)
        introduceSelf()

class Student : extends Person
    properties
        year
    constructor
        Student(name, year)
    methods
        introduceSelf()
```

이 경우 `Person`은 두 `Professor`와 `Student`의 **상위 클래스(superclass)** 또는 **부모 클래스(parent class)**라고 할 수 있다. 반대로 `Professor`와 `Student`는 `Person`의 **하위 클래스(subclass)** 또는 **자식 클래스(child class)**이다.

`introduceSelf()`는 세 개의 모든 클래스에서 정의되어있다는 것을 발견할 수 있을 것이다. 그 이유는 모든 사람이 자신을 소개하고  싶어 하지만 그 방식은 모두 다르기 때문이다:

```
walsh = new Professor('Walsh', 'Psychology')
walsh.introduceSelf()  // 'My name is Professor Walsh, and I will be your Psychology professor'

summers = new Student('Summers', 1)
summers.introduceSelf() // 'My name is Summers, and I'm in the first year'
```

학생 *또는* 교수가 아닌 사람들을 위한 기본 `introduceSelf()`도 구현되어있을 것이다.

```
pratt = new Person('Pratt')
pratt.introduceSelf() // 'My name is Pratt'
```

이 기능 - 메소드의 이름이 같지만 다른 클래스에 구현되어있을 때 - 은 **다형성(polymorphism)**이라고 한다. 하위 클래스의 메소드가 상위 클래스의 버전을 대체할 때, 하위 클래스가 상위 클래스의 버전을 **재정의(overrides)**한다고 말한다.

## 캡슐화 (Encapsulation)

객체는 이들을 사용하려는 다른 코드에 인터페이스를 제공하지만, 자신들의 내부 상태는 유지한다. 객체의 내부 상태는 **비공개(private)**로 유지되는데, 이는 다른 객체가 아닌 객체 자체의 메소드로만 이들에 접근할 수 있다는 것을 의미한다. 객체의 내부 상태를 비공개로 유지하고, 일반적으로 공용(public) 인터페이스와 사적인 내부 상태 사이를 명확하게 구분하는 것을 캡슐화라고 한다.

이 기능은 프로그래머가 객체를 사용하는 모든 코드를 찾아서 수정할 필요 없이 객체의 내부 구현을 변경할 수 있도록 해주기 때문에 유용하다: 이 기능은 객체와 나머지 시스템 사이의 방화벽 같은 역할을 한다.

예를 들어, 학생들이 2학년(second year) 이상이면 양궁을 배울 수 있다고 가정해보자. 단순히 학생의 `year` 속성을 나타내(expose)서 이를 구현할 수 있고, 다른 코드로 학생들이 해당 수업(course)을 수강할 수 있는지 결정하기 위해 이를 검사할 수 있다.

```
if (student.year > 1) {
    // allow the student into the class
}
```

문제는 학생들이 양궁을 공부할 수 있는 기준을 바꾸기로 한다면 - 예를 들어 부모나 보호자의 허락이 필요하다면 - 현재 시스템에서 이 테스트를 수행하는 모든 곳을 수정해야 한다. 이 경우 로직을 한 곳에서 구현할 수 있도록, `Student` 객체에서 `canStudyArchery()` 메소드를 사용하는 것이 더 낫다:

```
class Student : extends Person
    properties
       year
    constructor
        Student(name, year)
    methods
       introduceSelf()
       canStudyArchery() { return this.year < 1 }
```

```
if (student.canStudyArchery()) {
    // allow the student into the class
}
```

이 방식으로는, 양궁을 공부하는 것에 대한 규칙을 바꾸고 싶다면, `Student` 클래스만 수정하면 되고, 모든 코드는 여전히 작동할 것이다.

많은 객체 지향 언어에서 일부 속성을 `private`으로 만들어 다른 코드가 객체의 내부 상태에 접근하는 것을 막을 수 있다. 이러면 객체 밖의 코드가 객체 내부에 접근하려고 할 때 오류가 발생한다:

```
class Student : extends Person
    properties
       private year
    constructor
        Student(name, year)
    methods
       introduceSelf()
       canStudyArchery() { return this.year < 1 }

student = new Student('Weber', 1)
student.year // error: 'year' is a private property of Student
```

이런 접근을 강제하지 않는 언어에서, 프로그래머들은 이름을 밑줄로 시작하는 것과 같은 명명 규칙(naming convention)을 사용해 속성이 비공개여야 하는지 나타낸다.

## 객체 지향 프로그래밍과 자바스크립트 (OOP and JavaScript)

이 글에서는, 자바 및 C++과 같은 언어에 구현된 것과 같은 클래스 기반의, 때로는 "전통적(classical)"이라고 불리는 객체 지향 프로그램의 몇 가지 기본 기능에 대해 설명했다.

이전 두 글에서 코어 자바스크립트의 몇 가지 기능을 살펴봤다: 생성자와 프로토타입. 이 기능들은 위에서 설명한 OOP 개념의 일부와 확실히 관련이 있다.

* 자바스크립트의 **생성자(constructor)**는 클래스 정의와 같은 것을 제공해서, 객체에 들어 있는 모든 메소드를 포함해, 객체의 "형태(shape)"를 한 곳에 정의할 수 있도록 해준다. 하지만 여기에는 프로토타입도 사용될 수 있다. 예를 들어, 메소드가 생성자의 `prototype` 속성에 정의되면, 그 생성자를 사용해서 생성한 모든 객체는 그들의 프로토타입을 통해 해당 메소드를 가져오며, 생성자 안에 이를 정의할 필요가 없다.
* **프로토타입 체인(prototype chain)**은 상속을 구현하는 자연스러운 방법처럼 보인다. 예를 들어, 프로토타입이 `Person`인 `Student` 객체가 있으면, `name`을 상속받고, `introduceSelf()`를 재설정할 수 있다.

그러나 이런 기능과 위에서 설명한 "전통적인" OOP 개념 사이의 차이점에 대해서 이해하는 것도 필요하다. 그중 몇 가지를 여기서 조명(highlight)할 것이다.

첫 번째로,

* 클래스 기반의 OOP에서는, 클래스와 객체는 별도의 두 구조체이며, 객체는 항상 클래스의 인스턴스로 생성된다.
* 또한, 클래스를 정의하기 위해 사용되는 기능과 (클래스 구문 자체), 객체를 인스턴스화 하는데 사용되는 기능 (생성자) 사이에는 차이가 있다.
* 자바스크립트에서는 별도의 클래스 정의 없이, 함수나 객체 리터럴을 사용해서 객체를 만들 수 있고 자주 그렇게 한다. 이들은 전통적인 OOP보다 훨씬 더 가볍게 객체를 다룰 수 있도록 해준다.

두 번째로, 프로토타입 체인이 상속 계층처럼 보이고 어떤 면에서는 그렇게 동작하지만, 그 외의 측면에서는 다르다.

* 하위 클래스가 인스턴스화 되었을 때, 하위 클래스에서 정의된 속성과, 계층 구조 위에 정의된 속성을 결합하는 단일 객체가 생성된다.
* 프로토타입에서는 계층 구조의 각 층(level)이 개별 객체로 나타나고, 이들은 `__proto__` 속성으로 함께 연결되어있다.
* 프로토타입의 동작은 상속보다는 **위임(delegation)**에 가깝다.
    * 위임은 객체가, 어떤 작업을 수행하도록 요청받았을 때, 스스로 해당 작업을 수행하거나 다른 객체(**위임자(delegate)**)에 작업을 대신 수행하도록 요청하는 프로그래밍 패턴이다.
    * 여러 면에서 위임이 상속보다 객체를 결합하는 더 유연한 방식이다 (한 가지로, 런타임에서 위임자를 변경하거나 완전히 교체할 수 있다).

생성자와 프로토타입을 사용해 자바스크립트에 클래스 기반의 OOP 패턴을 구현할 수 있다. 그러나 상속 같은 기능을 구현하기 위해 이들을 직접 사용하는 것은 까다로우며, 자바스크립트는 클래스 기반 OOP의 개념을 더 직접적으로 매핑할 수 있도록 프로토타입 모델 위에 계층화된 추가 기능을 제공한다. 이런 추가 기능이 다음 글의 주제이다.
