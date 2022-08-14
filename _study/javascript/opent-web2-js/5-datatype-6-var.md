---
layout  : article
title   : 5. 데이터 타입 - 문자열과 숫자 / 6. 변수와 대입 연산자
summary : 
date    : 2020-04-30 14:03:50 +0900
updated : 2020-05-01 10:29:07 +0900
tag     : draft
toc     : true
public  : true
parent  : [[/javascript/opent-web2-js]]
latex   : false
---
* TOC
{:toc}

> 이 글은 생활코딩의 [데이터타입 - 문자열과 숫자](https://opentutorials.org/course/3085/18870), [변수와 대입 연산자](https://opentutorials.org/course/3085/18871) 강의내용을 복습하기 위해 강의 자료를 기반으로 작성한 글입니다.
>
> * 제가 필요한 부분 위주로 확인하면서 정리하고 있어 글에 덜 작성된 부분이 있을 수 있습니다.
> * 글 작성 후 원 강의의 내용이 수정되거나 내용을 이해하기 위한 개인적인 설명이나 해석이 있을 수 있습니다. 되도록 원 강의를 참고해주시길 바랍니다.
> * 잘못된 부분이 있다면 댓글이나 그 외 편하신 방법으로 알려주시면 감사하겠습니다.

## 5. 데이터 타입 - 문자열과 숫자

컴퓨터 프로그래밍에서는 데이터를 효과적으로 처리하기 위해 자료형(Data type)을 분류한다.

JavaScript에도 data type이 존재한다.

* Primitive data type: `Boolean`, `Null`, `Undefined`, `Number`, `String`, `Symbol`
* Objects

이 중 가장 자주 쓰이는 `Number`과 `String`을 비교

### Number

숫자를 그대로 입력. 연산이 가능하다.

Console에 `1+1`을 입력하면 결과 값으로 `2`를 반환.

```js
document.write(1+1)
```

`+` 외에도 다른 산술 연산자를 사용해서 계산을 할 수 있다.

* `1 + 1` → `2`
* `2 - 1` → `1`
* `2 * 4` → `8`
* `6 / 2` → `3`

### String

따옴표(`'`, `"`) 안에 `"입력하고 싶은 문자열"`을 입력. 다양한 명령을 이용할 수 있다.

```js
// string의 단어개수 세기: 3 반환
document.write('this is stinrg'.length)

// 모든 string을 대문자로 바꾸기: STRING 반환
document.write('string'.toUpperCase())
```

### Number vs String

`1 + 1`을 입력했을 때 `1`이 number type인 경우와 string type인 경우 차이

```js
// number type: 2가 반환
document.write(1 + 1)

// string type: 1과 1을 나열해서 "11"이 반환
document.write("1" + "1")
```

## 6. 변수와 대입 연산자

**변수**: 대입을 통해서 값이 바뀔 수 있는 element (↔ 상수)

```js
x = 1
y = 1

//x와 y가 각각 1이므로 2를 반환
document.write(x + y)
```

* `x`, `y`: 변수. 특정 값을 대입하면 이후에 변수를 적었을 때 그 값처럼 쓸 수 있다.
* `=`: 대입연산자. 오른쪽 항의 값을 왼쪽 변수에 대입할 때 사용.

변수를 사용하는 이유(이점)은 매우 많으며 대표적으로 특정 값을 일괄적으로 수정하기 용이하다는 점이 있다.

```js
// name에 들어갈 이름을 위의 변수를 수정해서 한 번에 바꿀 수 있다.
var name = 'egoing'
document.write('Hello my name is' + name + '. Call me' + name + '. and More...')
```

2020.05.01 10:09 작성
