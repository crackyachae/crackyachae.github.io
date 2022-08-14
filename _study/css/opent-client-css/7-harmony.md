---
layout  : article
title   : 7. 조화
summary : 
date    : 2020-04-28 14:50:52 +0900
updated : 2020-04-28 15:50:28 +0900
tag     : draft
toc     : true
public  : true
parent  : [[/css/opent-client-css]]
latex   : false
---
* TOC
{:toc}

> 이 글은 생활코딩의 [조화](https://opentutorials.org/course/2418/13410) 강의내용을 복습하기 위해 강의 자료를 기반으로 작성한 글입니다.
>
> * 제가 필요한 부분 위주로 확인하면서 정리하고 있어 글에 덜 작성된 부분이 있을 수 있습니다.
> * 글 작성 후 원 강의의 내용이 수정되거나 내용을 이해하기 위한 개인적인 설명이나 해석이 있을 수 있습니다. 되도록 원 강의를 참고해주시길 바랍니다.
> * 잘못된 부분이 있다면 댓글이나 그 외 편하신 방법으로 알려주시면 감사하겠습니다.

HTML은 중첩된 구조를 갖고있어 하나의 element가 여러 효과의 영향을 받는데 효과가 우선 적용되는 규칙이 존재

## 상속 (Inherit)

부모 element의 효과를 자식 element가 물려받는 것

* HTML의 태그들은 많은 경우 속성을 상속받는데 하위 태그에 일일히 동일한 속성을 지정해주는 것 보다 상위 태그에 속성을 지정해 주는 것이 효율적이기 떄문이다.
* 상속되지 않는게 효율적인 경우는 상속되지 않는다. e.g. `border`
* 속성의 상속 여부: [w3 Full Property Table](https://www.w3.org/TR/CSS21/propidx.html)에서 확인 가능

## Cascading

웹 페이지는 `웹 브라우저 (+ HTML 내재 디자인)` + `웹 페이지 및 컨텐츠 제작자의 디자인` + `사용자가 원하는 디자인`으로 이루어져 있다.

이 세 가지를 조화롭게 결합하는 것이 중요하며 하나의 웹 페이지가 여러 디자인의 영향을 받기 때문에 우선순위가 필요하다. 기본적으로 웹 브라우저 < 사용자 < 저자 디자인 순으로 중요

* 기본적으로 아래에 있는 코드가 우선 적용된다.
* Selector에 따른 속성값 우선순위는 다음과 같다.

| `!important`  | Style attribute   | id selector       | class selector    | type selector |
| :-----------: | :---------------: | :---------------: | :---------------: | :-----------: |
| 최우선        | 해당 태그에만     | 문서에서 한 번    | 문서에서 여러번   | 일반적        |
| More specific | ← - - - - - - - - | - - - - - - - - - | - - - - - - - - → | Less specific |

### Example

```html
<!-- red, powderblue, yellow, blue, green 순으로 우선 순위 -->
<style>
    li {
        color: red !important;
    }

    #idsel {
        color: blue;
    }

    #idsel {
        color: yellow;
    }

    .classsel{
        color: green;
    }
</style>

<body>
    <li id="idsel" class="classsel" style="color: powderblue"> list </li>
</body>
```

## Stylish

기존의 웹 사이트를 수정해 볼 수 있는 기능

* [Chrome extension](https://chrome.google.com/webstore/detail/stylish-custom-themes-for/fjnbnpbmkenffdnngjfgmeleoegfcffe)나 [Stylish](https://userstyles.org) 홈페이지를 이용
* 다른 사람의 테마를 다운 받거나 "write style for"에서 내 테마를 만들 수 있다.

## 참고

* [스타일의 상속과 적용 우선순위](https://poiemaweb.com/css3-inheritance-cascading) by Poiemaweb
