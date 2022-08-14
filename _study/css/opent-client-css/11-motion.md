---
layout  : article
title   : 11. 모션 그래픽
summary : 
date    : 2020-04-11 15:24:39 +0900
updated : 2020-04-28 16:09:19 +0900
tag     : draft
toc     : true
public  : true
parent  : [[/css/opent-client-css]]
latex   : false
---
* TOC
{:toc}

> 이 글은 생활코딩의 [모션 그래픽](https://opentutorials.org/course/2418/13663) 강의내용을 복습하기 위해 강의 자료를 기반으로 작성한 글입니다.
>
> * 제가 필요한 부분 위주로 확인하면서 정리하고 있어 글에 덜 작성된 부분이 있을 수 있습니다.
> * 글 작성 후 원 강의의 내용이 수정되거나 내용을 이해하기 위한 개인적인 설명이나 해석이 있을 수 있습니다. 되도록 원 강의를 참고해주시길 바랍니다.
> * 잘못된 부분이 있다면 댓글이나 그 외 편하신 방법으로 알려주시면 감사하겠습니다.

## 전환 (Transition)

효과가 변경되었을 때 부드럽게 넘어가도록 처리해주는 기능.

### Transition

마우스로 링크를 클릭했을 때 링크의 위치와 font 크기가 변화는 효과를 설정

```css
a {
    font-size: 3rem;
}

/*마우스로 링크를 클릭했을 때*/
a:active {
    transform: trnaslate (20px, 20px); /*x, y축으로 20px씩 이동*/
    font-size: 2rem; /*font size를 2rem으로 줄임*/
}
```

active 상태로 바뀌는 순간을 transition을 이용해서 자연스럽게 만듬.

```css
a{ 
    /*클릭 전*/
    font-size: 3rem;

    /*transform은 element가 inline이면 동작하지 않아서 display속성을 바꿔주어야 한다.*/ 
    display: inline-block;

    /*적용 대상: a 태그에 적용된 모든 효과에 변화가 있을 때 전환 효과를 적용*/
    transition-property: all; 
    /*적용 시간: 전환이 1초(1s)에 걸쳐서 일어남*/
    transition-duration: 1s;
    /*지연 시간: 전환이 클릭 후 1초(1s)뒤에 시작됨*/
    transition-delay: 1s;

    /*축약형 작성 가능. 개별 속성에 대해 별도로 작성할 수도 있다.*/
    transition: all 0.1s;
    trnasition: font-size 1s, transform 0.1s;
}
```

### Transition Time Function

전환이 일어날 때, 시간에 때라 변화가 적용되는 정도를 다르게 설정할 수 있는 속성.

기본적으로 만들어진 속성 값이 있으며 (e.g. ease, linear등) 시간에 따른 변화 정도를 그래프로 나타낸 뒤, 그래프를 수치화 시켜서 적용시킬 수도 있다.

```css
a {
    /*Time function을 linear로 변경. 기본값은 ease.*/
    transition-time-function: linear;

    /*Time function을 customize*/
    transition-time-function: cubic-bezier(수치 지정);
}
```

[Ceaser](https://matthewlein.com/tools/ceaser)에서 기본 속성값 외에 다양한 time function을 확인하고 해당되는 `cubic-bezier` 값을 사용할 수 있다. Customize도 가능.

### Page Transition

Javascript와 함께 `body`태그에 `transition`을 사용해서 자연스러운 장면전환을 만들 수 있다.

```html
<!--페이지가 로드되면 화면 색을 흰색으로 변경-->
<body
onload="document.querySelector('body').style.backgroundColor='White'">
<body>
```

```css
body {
    background-color: black; /*변경전 배경색: 검정*/
    transition: all 1s; /*1초에 걸쳐서 흰색으로 변경*/
}
```
