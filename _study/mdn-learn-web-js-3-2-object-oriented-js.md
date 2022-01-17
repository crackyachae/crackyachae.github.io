---
layout  : article
title   : 입문자를 위한 객체 지향 자바스크립트 (Object-oriented JavaScript for beginners)
summary : 
date    : 2022-01-10 21:48:27 +0900
updated : 2022-01-12 00:20:16 +0900
tag     : draft
toc     : true
public  : true
parent  : [[mdn-learn-web-js]]
latex   : false
---
* TOC
{:toc}

> 이 글은 MDN Learn web development의 [Introducing JavaScript objects](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects) 중 [Object-oriented JavaScript for beginners](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Object-oriented_JS)의 내용을 번역 및 정리한 글입니다.
>
> * 제가 필요한 부분 위주로 확인하면서 정리하고 있어 글에 덜 작성된 부분이 있을 수 있습니다.
> * 글 작성 후 원문의 내용이 수정되거나 내용을 이해하기 위한 개인적인 설명이나 해석이 있을 수 있습니다. 되도록 원문을 참고해주시길 바랍니다.
> * 잘못된 부분이 있다면 댓글이나 그 외 편하신 방법으로 알려주시면 감사하겠습니다.

## 객체 지향 프로그래밍 - 기초 (Object-oriented programming — the basics)

우선 객체 지향 프로그래밍(Object-oriented Programming, OOP)이 무엇인지 포괄적인 시각(high-level view)에서 간략하게 살펴보자. OOP는 굉장히 쉽게(quickly) 복잡해질 수 있고, 지금 모든 것을 다루면 도움이 되기보다 혼란만 가중할 수 있어, 최대한 간단히 설명할 것이다.

OOP의 기본 개념(idea)은

* 프로그램 안에서 표현하고자 하는 실 세계(real world)의 일들을 객체를 사용해서 만들(model)고/거나,
* 객체를 사용하지 않으면 사용하기 어렵거나 불가능한 기능에 접근하는 간단한 방법을 제공한다는 것이다.

객체에는 만들려는 대상과 이들에게 필요한 기능이나 동작에 대한 정보를 나타내는 관련 데이터와 코드가 포함된다. 객체 데이터(그리고 종종 함수도)는 객체 패키지(이를 가리키는 특별한 이름이 있으며, 때때로 **namespace**라고 불린다)안에 가지런히 저장(공식 용어는 **encapsulated**이다)될 수 있고, 구조화 및 접근이 쉬워진다; 객체는 또한 네트워크를 통해 쉽게 전송될 수 있는 데이터를 저장하는 데도 자주(commonly) 사용된다.

### 객체 템플릿을 정의하기 (Defining an object template)

학교의 학생과 선생님의 정보를 보여주는 간단한 프로그램을 생각해보자. 여기서는 특정 프로그래밍 언어의 맥락이 아닌 일반적인 관점에서 OOP 이론(theory)을 살펴볼 것이다.

시작을 위해, [첫 번째 객체 글](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Basics)에서 다뤘던 사람의 일반적인 데이터와 기능을 정의한 Person 객체 유형으로 돌아가 보자.

한 사람에게서 파악할 수 있는 정보는 많지만 (그들의 주소, 키, 신발 사이즈, DNA 프로필, 여권 번호, 중요한 성격 특성 등 ...), 이 예제에서는

* 이름, 나이, 성별 그리고 취미만을 나타낼 것이고,
* 더불어 이 데이터를 기반으로 이들에 대한 짧은 소개를 작성하고,
* 인사를 할 수 있도록 할 것이다.

이런 과정을 **추상화(abstraction)** — 프로그램의 목적에 따라 쉽게 작업할 수 있도록, 복잡한 것에서 가장 중요한 부분(aspect)만을 추려 이들을 나타내는 간단한 모델을 만드는 것 - 라고 한다.

### 실제 객체를 생성하기 (Creating actual objects)

**객체 인스턴스(object instances)** — 클래스(class)에서 정의된 데이터와 기능을 포함하는 객체 - 는 클래스를 통해서 만들 수 있다. Person 클래스를 통해서, 실제 사람 객체를 생성할 수 있다:

```js
// Class: Person
{
  Name[firstName, lastName]
  Age
  Gender
  Interests
  Bio{"[Name] is [Age] yeears old. They like [interests]"}
  Greeting{"Hi! I'm [Name]"}
}

// Object: person1
{
  // instantiation from Person
  Name[Bob, Smith]
  Age: 32
  Gender: Male
  Interests: Music, Skiing
  Bio{"Bob Smith is 32 yeears old. He likes Music and Skiing."}
  Greeting{"Hi! I'm Bob"}
}

// Object: person2
{
  // instantiation from Person
  Name[Diana, Cope]
  Age: 28
  Gender: Female
  Interests: Kickboxing, Brewing
  Bio{"Diana Cope is 28 yeears old. She likes Kickboxing and Brewing."}
  Greeting{"Hi! I'm Diana"}
}
```

객체 인스턴스가 클래스로부터 만들어질 때, 객체 인스턴스를 만들기 위해 클래스의 **생성자 함수(instructor function)**가 실행된다. 이처럼 클래스로부터 객체 인스턴스를 만드는 과정을 **인스턴스화(instantiation)**라고 한다 - 객체 인스턴스는 클래스로부터 **인스턴스화** 된다.

### 특별한 클래스 (Specialist classes)

이번에는 일반적인 사람이 아니라 — 더 구체적인 유형의 사람인 선생님과 학생이 필요하다. OOP에서는, 다른 클래스를 기반으로 새로운 클래스를 만들 수 있다 - 이런 새로운 **자식 클래스(child classes)**(**하위 클래스(subclasses)**라고도 알려져 있다)는 이들의 **부모 클래스(parent class)**의 데이터와 코드 기능을 **상속(inherit)**하도록 만들 수 있고, 따라서 모든 객체 유형에 공통적인 기능을 복제(똑같이 직접 작성)하지 않고도 다시 사용할 수 있다. 클래스마다 기능이 다른 경우는, 필요할 때마다 해당 클래스에서 직접 원하는(specialized) 기능을 정의할 수 있다.

```js
// Class: Person
{
  // common functionality
  Name[firstName, lastName]
  Age
  Gender
  Interests
  Bio{"[Name] is [Age] yeears old. They like [interests]"}
  // specialized features
  Greeting{"Hi! I'm [Name]"}
}

// Class: Teacher
{
  // common functionality (inherited from Person)
  Name[firstName, lastName]
  Age
  Gender
  Interests
  Bio{"[Name] is [Age] yeears old. They like [interests]"}
  // specialized features
  Subject
  Greeting{"Hello, My name is [Prefix][lastName], and I teach [Subject]."}
}

// Object: Student
// inherited from Person
{
  // common functionality (inherited from Person)
  Name[firstName, lastName]
  Age
  Gender
  Interests
  Bio{"[Name] is [Age] yeears old. They like [interests]"}
 
  // specialized features
  Greeting{"Yo! I'm [firstName]"}
}
```

이것은 매우 유용하다 - 이름, 성별, 나이 등과 같이 선생님과 학생은 많은 공통 특징을 공유하고 있고, 그래서 이런 특징은 한 번만 정의하는 것이 편리하기 때문이다.

또한 각 기능의 정의가 서로 다른 네임 스페이스에 존재하므로 동일한 기능을 서로 다른 클래스에서 별도로 정의할 수도 있다. 예를 들어,

* 학생의 인사말은 "Yo! I'm [firstName]" (e.g. Yo, I'm Sam)의 형태일 것이고
* 반면에 선생님은 "Hello, My name is [Prefix][lastName], and I teach [Subject]." (e.g. Hello, My name is Mr Griffiths, and I teach Chemistry) 같은 더 격식 있는 형식을 사용할 것이다.

> Note: 혹시 궁금하다면, 여러 객체 타입에 같은 기능을 구현할 수 있는 능력을 멋진 용어로 **다형성(polymorphism)** 이라고 한다.

이제 자식 클래스들로부터 객체 인스턴스를 만들 수 있다. 예를 들어:

```js
// Class: Teacher
{
  Name[firstName, lastName]
  Age
  Gender
  Interests
  Bio{"[Name] is [Age] yeears old. They like [interests]"}
  Subject
  Greeting{"Hello, My name is [Prefix][lastName], and I teach [Subject]."}
}

// Object: teacher 1
// instantiation from Teacher
{
  Name[Dave, Griffiths]
  Age: 31
  Gender: Male
  Interests: football, cookery
  Bio{"Dave Griffiths is 31 yeears old. They like football and cookery."}
  Subject: Math
  Greeting{"Hello, My name is Mr. Griffiths, and I teach math."}
}

// Object: teacher 2
// instantiation from Teacher
{
  Name[Melanie, Hall]
  Age: 26
  Gender: Female
  Interests: playing guitar, archery
  Bio{"Melanie Hall is 26 yeears old. They like playing guitar and archery."}
  Subject: Physics
  Greeting{"Hello, My name is Ms. Hall, and I teach physics."}
}
```

글의 나머지 부분에서는 OOP 이론이 실제 자바스크립트에서 어떻게 적용될 수 있는지 살펴볼 것이다.

## 생성자와 객체 인스턴스 (Constructors and object instances)

자바스크립트는 **생성자 함수(constructor functions)**라는 특별한 함수를 사용해 객체와 그 기능을 정의하고 초기화한다. 보통 얼마나 많은 객체를 생성해야 할지 모르는 경우가 많기 때문에 이런 기능은 유용하다; 생성자는 효율적으로 필요한 만큼 객체를 생성하는 방법을 제공하고, 필요한 데이터와 함수를 추가(attaching)한다.

자바스크립트에서 생성자를 이용해 클래스를 만들고, 클래스에서 객체 인스턴스를 만드는 방법을 알아보자. 가장 먼저 첫 객체 글에서 봤던 [oojs.html](https://github.com/mdn/learning-area/blob/main/javascript/oojs/introduction/oojs.html) 파일의 새로운 로컬 복사본을 만들자.

### 간단한 예제 (A simple example)

1. 일반 함수로 person을 정의하는 방법을 살펴보는 것부터 시작하자. 이 함수를 `script` 요소 안에 추가한다:

    ```js
    function createNewPerson(name) {
      const obj = {};
      obj.name = name;
      obj.greeting = function() {
          alert('Hi! I\'m ' + obj.name + '.');
      };
      return obj;
    }
    ```

1. 이제 이 함수를 호출해서 새로운 person을 만들 수 있다 - 브라우저의 자바스크립트 콘솔에서 다음의 코드를 입력해보자:

    ```js
    const salva = createNewPerson('Salva');
    salva.name;
    salva.greeting();
    ```

    충분히 잘 작동하지만, 약간 너무 장황하다; 객체를 만들려는 걸 아는데, 왜 새로운 빈 객체를 명시적으로 만들고 반환해야 할까? 다행히, 자바스크립트는 생성자 함수의 형태로 편리한 단축 명령을 제공한다 - 하나 만들어보자!

1. 이전의 함수를 다음의 코드로 교체한다:

    ```js
    function Person(name) {
      this.name = name;
      this.greeting = function() {
        alert('Hi! I\'m ' + this.name + '.');
      };
    }
    ```

생성자 함수는 클래스의 자바스크립트 버전이다. 생성자 함수는 함수의 모든 특징을 갖고 있지만, 어떤 값을 반환하거나, 명시적으로 객체를 만들지 않는다는 것에 유의하자 - 기본적으로 속성과 메소드를 정의할 뿐이다. 여기서도 `this` 키워드가 쓰이고 있다는 것에 주목(notice)하자 - 이는 기본적으로 이런 객체 인스턴스 중 하나가 생성될 때마다, 객체의 `name` 속성은 생성자 호출에 전달된 이름값과 같고, `greeting()` 메소드도 생성자 호출에 전달된 이름값을 사용할 거라는 것을 얘기한다.

> Note: 일반적으로, 생성자 함수 이름은 대문자로 시작한다 - 이 규칙은 코드에서 생성자 함수를 더 쉽게 인식할 수 있도록 한다.

그래서 어떻게 생성자 함수를 호출하여 객체들을 만들까?

1. 이전 코드의 아래에 다음의 코드를 추가한다:

    ```js
    let person1 = new Person('Bob');
    let person2 = new Person('Sarah');
    ```

1. 코드를 저장한 뒤 브라우저에서 이를 다시 불러오고, 다음의 코드를 JS 콘솔에 입력해보자:

    ```js
    person1.name
    person1.greeting()
    person2.name
    person2.greeting()
    ```

멋지다! 이제 페이지에 두 객체가 각각 다른 네임 스페이스에 저장되어 생성된 것을 확인할 수 있다 - 이들의 속성과 메소드에 접근하려면, `person1`이나 `person2`로 호출하기 시작해야 한다; 안에 포함된 기능들은 깔끔하게 패키징되어 다른 기능과 서로 충돌하지 않는다. 하지만 같은 `name` 속성과 `greeting()` 메소드를 사용할 수 있다. 이들이 생성될 때 부여받은 각자의 `name` 값을 사용한다는 것에 유의하자; 이것이 `this`를 사용해야 하는 중요한 이유 중 하나이며, 객체는 다른 값이 아닌 자신의 값을 사용한다.

생성자 호출을 다시 살펴보자:

```js
let person1 = new Person('Bob');
let person2 = new Person('Sarah');
```

각 경우, `new` 키워드를 사용하고, 그다음에 함수 이름과 괄호 안에 포함된 필요한 매개변수를 작성해, 브라우저에 새로운 객체 인스턴스를 생성하고 싶다고 전달하고, 그 결과를 변수에 저장한다 - 이는 표준 함수가 호출되는 방식과 매우 유사하다. 각 인스턴스는 다음 정의에 따라 생성된다:

```js
function Person(name) {
  this.name = name;
  this.greeting = function() {
    alert('Hi! I\'m ' + this.name + '.');
  };
}
```

새로운 객체가 생성되면, `person1`과 `person2` 변수는 다음의 객체를 포함한다:

```js
{
  name: 'Bob',
  greeting: function() {
    alert('Hi! I\'m ' + this.name + '.');
  }
}

{
  name: 'Sarah',
  greeting: function() {
    alert('Hi! I\'m ' + this.name + '.');
  }
}
```

생성자 함수를 호출할 때, 매번 `greeting()`을 정의한다는 것을 확인하자. 이 방법은 최선이 아니다. 이를 피하려고 함수를 대신 프로토타입(prototype)에 정의할 수 있으며, 이후에 살펴볼 것이다.

### 완성된 생성자 만들기 (Creating our finished constructor)

위에서 살펴본 예제는 시작을 위한 간단한 예제였을 뿐이다. 더 나아가서 최종(final) `Person()` 생성자 함수를 작성해보자.

1. 지금까지 삽입한 코드를 제거하고, 이 대체 생성자를 추가하자 - 원리는 간단한 예제와 정확히 같지만 약간 더 복잡할 뿐이다:

    ```js
    function Person(first, last, age, gender, interests) {
      this.name = {
         first : first,
         last : last
      };
      this.age = age;
      this.gender = gender;
      this.interests = interests;
      this.bio = function() {
        alert(this.name.first + ' ' + this.name.last + ' is ' + this.age + ' years old. He likes ' + this.interests[0] + ' and ' + this.interests[1] + '.');
      };
      this.greeting = function() {
        alert('Hi! I\'m ' + this.name.first + '.');
      };
    }
    ```

1. 이제 다음 코드를 그 아래에 추가해 생성자로 객체 인스턴스를 만든다:

    ```js
    let person1 = new Person('Bob', 'Smith', 32, 'male', ['music', 'skiing']);
    ```

이제 이전에 했던 것처럼 해당 속성과 메소드에 접근할 수 있다 - JS 콘솔에서 다음 코드를 입력해보자:

```js
person1['age']
person1.interests[1]
person1.bio()
// etc.
```

> Note: 만약 여기까지 진행하는 데 어려움이 있다면, 코드를 예제 완성 파일과 비교해보자 — [oojs-class-finished.html](https://github.com/mdn/learning-area/blob/main/javascript/oojs/introduction/oojs-class-finished.html) (그리고 [실시간 예제](https://mdn.github.io/learning-area/javascript/oojs/introduction/oojs-class-finished.html)도 확인해보자).

### 추가 예제 (Further exercises)

## 객체 인스턴스를 생성하는 다른 방법들 (Other ways to create object instances)

지금까지 객체 인스턴스를 생성하는 두 가지 방법을 살펴봤다 - 객체 리터럴을 선언하는 것과 생성자 함수를 사용하는 것.

이들은 잘 동작하지만(make sense), 다른 방법도 있다 - 웹을 돌아다니다 이들을 마주칠 경우를 대비해 이 방법들에 익숙해지는 것도 좋을 것 같다.

### Object() 생성자 (The Object() constructor)

먼저, `Object()` 생성자를 사용해 새로운 객체를 만들 수 있다. 그렇다, 일반적인 객체에도 빈 객체를 생성하는 생성자가 있다.

1. 다음을 브라우저의 자바스크립트 콘솔에 입력해보자:

    ```js
    let person1 = new Object();
    ```

1. 위 코드는 빈 객체를 `person1` 변수에 저장한다. 그런 다음 원하는 대로 점이나 괄호 표기법을 사용해 이 객체에 속성과 메소드를 추가할 수 있다; 다음의 예제를 콘솔에 입력해보자:

    ```js
    person1.name = 'Chris';
    person1['age'] = 38;
    person1.greeting = function() {
      alert('Hi! I\'m ' + this.name + '.');
    };
    ```

1. 또한 객체 리터럴을 `Object()` 생성자에 매개 변수로 전달해 객체의 속성/메소드를 미리 채울 수도 있다. JS 콘솔에서 이 코드를 입력해보자:

    ```js
    let person1 = new Object({
      name: 'Chris',
      age: 38,
      greeting: function() {
        alert('Hi! I\'m ' + this.name + '.');
      }
    });
    ```

### create() 메소드 사용하기 (Using the create() method)

생성자는 코드에 규칙을 부여하는 데 도움을 준다 - 한 곳에서 생성자를 생성한 다음, 필요에 따라 인스턴스를 생성할 수 있으며, 인스턴스가 어디서 왔는지 확실히 할 수 있다.

하지만 일부는, 특히 적은 수의 객체 인스턴스만을 생성할 때, 생성자를 먼저 만들지 않고 객체 인스턴스를 만들기를 선호한다. 자바스크립트에는 이걸 할 수 있는 `create()`라는 내장 메소드가 있다. 이걸 이용하면, 이미 존재하는 객체를 새로 만들 객체의 프로토타입으로 사용해 새 객체를 만들 수 있다.

1. 이전 섹션에서 완성한 예제를 브라우저에서 열어, 이 코드를 자바스크립트 콘솔창에 입력해보자:

    ```js
    let person2 = Object.create(person1);
    ```

1. 이제 이 코드를 입력해보자

    ```js
    person2.name
    person2.greeting()
    ```

`person1`을 기반으로 `person2`가 만들어진 것을 볼 수 있다 - 새 객체는 원 객체와 같은 프로퍼티와 메소드들을 갖는다.

`create()` 함수의 한 가지 제한은 IE8에서는 지원되지 않는다는 점이다. 따라서 오래된 브라우저까지 지원하고 싶다면 생성자를 사용하는 것이 효과적이다.

`create()` 함수의 효과에 대해서는 다음에 더 살펴볼 것이다.
