---
layout  : article
title   : 4. 선택자
summary : 
date    : 2020-04-23 21:50:25 +0900
updated : 2020-04-28 21:14:23 +0900
tag     : draft
toc     : true
public  : true
parent  : [[/css/opent-client-css]]
latex   : false
---
* TOC
{:toc}

> 이 글은 생활코딩의 [선택자](https://opentutorials.org/course/2418/13500) 강의내용을 복습하기 위해 강의 자료를 기반으로 작성한 글입니다.
>
> * 제가 필요한 부분 위주로 확인하면서 정리하고 있어 글에 덜 작성된 부분이 있을 수 있습니다.
> * 글 작성 후 원 강의의 내용이 수정되거나 내용을 이해하기 위한 개인적인 설명이나 해석이 있을 수 있습니다. 되도록 원 강의를 참고해주시길 바랍니다.
> * 잘못된 부분이 있다면 댓글이나 그 외 편하신 방법으로 알려주시면 감사하겠습니다.

## 선택자와 선언

```css
li{
    /* 색상: 빨간색 */
    color: red;
    /* 텍스트에 적용된 효과: 없음 */
    text-decoration: none;
}
```

* `li`: 선택자. `{}`안의 효과를 적용할 대상을 지정한다. (e.g. `li`: 모든 `<li>`태그에 대해 적용)
* `color: red`: 선언(declaration). 적용될 효과를 나타내며 속성(property): 값(value)의 꼴로 작성한다.
    * e.g. `color` - 색상을 지정하는 속성 / `red` - color 속성의 값. 색상을 빨간색으로 바꾼다.
* `;`: 세미콜론(semi-colon). 각 선언을 구분하는 구분자 (declaration separator) 역할을 한다.
* 줄바꿈은 영향을 미치지 않는다.

## 선택자의 종류

선택자는 효과를 주려는 '대상'이기 때문에 정확히 지정하는 것이 중요하다.

선택자는 크게 다음과 같이 구분할 수 있다.

| 선택자         | Example    | 설명                                                                                                                 |
| :------------: | :-------:  | :-------------------------------------------------------------------------                                           |
| type selector  | `태그명`   | 한 종류의 태그에 모두 적용                                                                                           |
| class selector | `.class명` | - 여러 항목을 하나로 묶어 효과를 적용하기 위한 선택자. <br> - 여러 종류의 태그에 동시에 적용할 수 있다.              |
| id selector    | `#id명`    | - 한 태그에 고유한 값(id)를 부여하기 위한 선택자. <br> - 웹 페이지에서 특정 id를 사용한 태그는 한 번만 등장해야한다. |

### Example

```css
/* 모든 list (list 1, 2, 3)의 색상을 검정색으로 지정 */
li{
    color: black;
}

/* class 값이 deactive인 list (list 2)의 색상을 회색으로 지정 */
.deactive {
    color: grey;
}

/* id 값이 select인 list (list 3)의 색상을 빨간색으로 지정 */
#select {
    color: red;
}
```

```html
<!-- 일반 li 태그 -->
<li> list 1 </li>

<!-- class값이 deactive인 li 태그 -->
<li class = "deactive"> list 2 </li>

<!-- id 값이 select인 li 태그 -->
<li id = "select"> list 3 </li>
```

`class` 선택자와 `id` 선택자는 특정 element의 선택을 보다 쉽게하기 위한 장치이다.

예를 들어, `li` 태그를 학교 내의 모든 학생이라고 할 때 `class` 선택자는 반의 개념으로 그 반(class)에 소속된 학생(li 태그)의 선택을 보다 쉽게 해준다. `id`태그는 각 학생의 학생 번호의 개념으로 학생(li 태그)중 특정 개인(id)의 선택을 가능하게 해준다.

## 부모-자식 선택자 (Descendent Selector)

* 부모-자식 선택자는 부모 태그를 적은 뒤 한 칸의 공백(space)을 주고 자식 태그를 적어 표현한다.

* 직계(바로 다음 단계) 자식이 아니어도 적용.
* 직계 자손에 적용하려면 공백대신 `>`를 사용한다.

### Example

```html
<ul>
    <li> list 1 </li>
</ul>

<ol id = "lecture">
    <li> list 2 </li>
    <ol>
        <li> list 3 </li>
    </ol>
</ol>
```

```css
/* ul 태그 '안에 있는' li 태그 (list 1)만 빨간색으로 색상 변경 */
ul li {
    color: red;
}

/* lecture id 값을 가진 태그의 자손 li 태그 (list 2, list 3)의 테두리를 설정 */
#lecture li {
    border: 1px solid;
}

/* lecture id 값을 가진 태그의 '직계'자손 li 태그 (list 2)의 테두리를 설정 */
#lecture>li {
    border: 1px solid;
}
```

## 가상 클래스 선택자 (Pseudo Class Selector)

실제로 선택자는 아니지만 element를 보다 세세하게 선택하기 위해 class 선택자 처럼 행동한다.

| 가상 클래스 선택자 | Example     | 설명                                                   |
| :----------------: | :---------: | :----------------------------------------------------- |
| `:active`          | `a:active`  | 링크(`a`)를 클릭해서 활성화 된 경우의 효과 지정        |
| `:hover`           | `a:hover`   | 링크(`a`)에 마우스를 갖다 댔을 때(over) 효과 지정      |
| `:visited`         | `a:visited` | 방문한 적이 있는 링크(`a`)의 효과 지정                 |
| `:link`            | `a:link`    | 방문한 적이 없는 링크(`a`)의 효과 지정                 |
| `:focus`           | `a:focus`   | 링크(`a`)를 선택 (tab키 등을 눌러서) 했을 때 효과 지정 |

## 여러가지 선택자들

[CSS Diner](http://flukeout.github.io)를 이용해서 보다 쉽게 학습할 수 있다.

| 선택자                         | Example                    | 설명                                                                                                 |
| ------------------------------ | -------------------------- | --------------------------------------------------------------------                                 |
| Universal selector             | `*` <br> `plate *`         | 모든 태그 <br> `plate` 및의 모든 태그                                                                |
| Class selector                 | `orange.small`             | `<orange class = "small">`를 선택                                                                    |
| Adjecent sibling selector      | `plate + apple`            | `plate`와 같은 부모를 갖는 태그 중 `plate` 바로 다음에 오는 `apple`                                  |
| General sibling selector       | `bento ~ pickle`           | `bento`와 같은 부모를 갖는 `pickle`                                                                  |
| Child selector                 | `plate > apple`            | `plate` 바로 다음 단계 안의 `apple`                                                                  |
| Only child pseudo-selector     | `*:only-child`             | 전체 태그 중 다른 태그 안에 '단독'으로 있는 자식태그 (sibling 태그가 없어야 함)                      |
| First child pseudo-selector    | `plate orange:first-child` | `plate`안에 있는 `orange`중 첫 번째로 등장하는 것                                                    |
| Nth child pseudo-selector      | `plate:nth-child`          | 다른 태그 안에서 n번째로 위치하고 있는 `plate` 태그 <br> `n`에 숫자 대입                             |
| Nth last child pseudo-selector | `apple:nth-last-child(A)`  | 다른 태그 안에서 뒤로부터 A번째에 위치하고 있는 `apple` 태그 <br> `A`에 숫자 대입. `n`은 숫자 대입 x |
| Last child pseudo-selector     | `.small:last-child`        | 다른 태그 안에서 가장 마지막에 위치하고 있는 class가`small`인 태그                                   |
| First type pseudo-selector     | `apple:first-of-type`      | `apple`중 첫 번째 element                                                                            |
| Nth of type selector           | `plate:nth-of-type(A)`     | `plate`중 `A`번째 element <br> `A`에는 숫자 외에 even, odd, An+B의 일반식도 기입 가능                |
| Only of type selector          | `apple:only-of-type`       | `apple`중 자신과 같은 타입의 sibling이 없는 `apple`                                                  |
| Last of type selector          | `orange:last-of-type`      | `orange`중 가장 마지막에 위치하고 있는 element                                                       |
| Empty selector                 | `bento:empty`              | 자손 element를 갖지 않는 `bento`                                                                     |
| Negation pseudo class          | `not(X)`                   | `X`에 해당하지 않는 모든 element                                                                     |
