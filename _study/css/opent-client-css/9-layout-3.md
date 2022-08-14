---
layout  : article
title   : "9. 레이아웃: 포지션, Flex"
summary : 
date    : 2020-03-05 10:58:28 +0900
updated : 2020-04-28 16:08:35 +0900
tag     : draft
toc     : true
public  : true
parent  : [[/css/opent-client-css]]
latex   : false
---
* TOC
{:toc}

> 이 글은 생활코딩의 [레이아웃](https://opentutorials.org/course/2418/13402) 강의내용을 복습하기 위해 강의 자료를 기반으로 작성한 글입니다.
>
> * 제가 필요한 부분 위주로 확인하면서 정리하고 있어 글에 덜 작성된 부분이 있을 수 있습니다.
> * 글 작성 후 원 강의의 내용이 수정되거나 내용을 이해하기 위한 개인적인 설명이나 해석이 있을 수 있습니다. 되도록 원 강의를 참고해주시길 바랍니다.
> * 잘못된 부분이 있다면 댓글이나 그 외 편하신 방법으로 알려주시면 감사하겠습니다.

## 포지션 (Position)

요소(element)의 위치를 결정하는 속성.

| 속성 값    |설명                                                                                                                                                                                                                                                  |
| ---------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `static`   | 태그와의 관계에 의해 결정되는 요소의 기본적인 위치. 포지션 속성의 default 값이며 offset 값을 무시한다.                                                                                                                                                |
| `relative` | Static위치를 기준으로 offset 값만큼 이동.                                                                                                                                                                                                             |
| `absolute` | - Positioned\* 된 조상(ancestor) 요소를 기준으로 offset 값만큼 이동. <br> - Positioned 된 조상이 없으면 `<body>` 태그를 기준으로 offset 값만큼 이동한다. <br> - absolute 값이 적용된 자손(descendant) 요소는 조상 요소에서 벗어난 것처럼 된다\*\*\*. |
| `fixed`    | 화면을 기준으로 offset 값만큼 이동해서 위치한 뒤 스크롤의 이동에 상관없이 그 위치에 고정(fixed)되어 있는다.                                                                                                                                           |

* position의 속성 값이 static이 아닌 요소\*.
* 강의에서는 웹페이지의 왼쪽 위의 모서리를 기준으로 offset값만큼 이동한다고 먼저 설명했지만 positioned 된 조상을 기준으로 움직이는 것이 핵심적인 내용이고 조건을 만족하는 조상이 없는 경우 `<body>` 태그를 기준으로 offset값만큼 이동하는 것으로 보인다\*\*.
* 강의에서는 조상-자손 관계가 끊어진다고 표현했으나 조상 요소의 박스 부피가 자식 요소를 포함하지 않는 것 처럼 줄어들고 자식 요소의 width가 100%가 아니게 되는 것 외의 속성 값들은 대부분 상속받는 것으로 보인다\*\*\*.

```css
<style>
 선택자{
   position: 속성 값
  
   /* offset 값 작성**** */
   left: 100px;
   top: 100px;
 }
</style>
```

* left와 right 값이 동시에 적혀있으면 left를 top과 bottom값이 동시에 적혀있으면 top을 우선적으로 반영한다\*\*\*\*.

## Flex

요소(element)의 크기나 위치를 조절하여 레이아웃을 효과적으로 구성하는 데 쓰이는 속성이다.

* 이전까지는 레이아웃 구성을 위해 `<Table>`태그 혹은 `position`, `float` 속성을 사용했다.
* Flex의 등장으로 위의 방법을 사용할 때 나타나는 다양한 문제들을 해결하고 보다 간단한 방식으로 레이아웃을 구성할 수 있게 되었다.

### Flex의 구성

Flex는 컨테이너(container)와 아이템(items)으로 구성되어있고 여러 개의 item을 하나의 container가 감싸고 있는 형태이다.

* Container나 items의 역할을 할 태그는 정해져 있지 않지만, container와 items는 부모(parent)-자식(child) 관계에 있어야 한다\*.
* Container와 item에 부여한 속성과 속성값에 따라 item을 다양하게 정렬하여 레이아웃을 구성한다. container와 item에 적용하는 속성은 구분되어있다.

| 항목      | 속성                                                                                       |
| --------- | ------------------------------------------------------------------------------------------ |
| container | display, flex-direction, flex-wrap, flex-flow, justify-content, align-items, align-content |
| items     | order, flex-grow, flex-shrink, flex-basis, flex, align-self                                |

* 편의를 위해 예시에서는 부모 태그로 class 값이 container인 태그를 자식 태그는 class 값이 item인 태그를 사용한다\*.

### Flex Container

* Flex를 사용하기 위해서 우선 container에서 `display` 속성값을 `display: flex`로 지정해준다.

* 다음으로 `flex-direction` 속성값을 지정해 item이 배열되는 방식을 결정한다. 이때 결정되는 item의 배열 방향을 주 축(main-axis), 주 축에 수직인 방향을 교차 축(cross-axis)이라고 한다.

```css
.container{
 display: flex;
 flex-direction: row;
}
```

`flex-direction`의 속성값은 다음과 같다.

| 속성값         | 의미                                      |
| -------------- | ----------------------------------------- |
| row            | items를 왼쪽에서부터 수평 방향으로 배열   |
| row-reverse    | items를 오른쪽에서부터 수평 방향으로 배열 |
| column         | items를 위에서부터 수직 방향으로 배열     |
| column-reverse | items를 아래서부터 수직 방향으로 배열     |

### Flex Items (flex 속성)

Flex는 Item의 **주 축 방향**의 너비를 설정하는 속성으로 다음과 같이 구분된다.

| 속성        | 의미                                                     | 기본값 |
| ----------- | :------------------------------------------------------- | ------ |
| flex-grow   | Container를 배분하는 item들의 너비 비율을 지정           | 0      |
| flex-shrink | Container의 너비가 줄 때 각 item의 너비 감소 비율을 지정 | 1      |
| flex-basis  | 공간 배분 전 Item의 너비를 특정 값으로 지정              | auto   |
| flex        | 위의 세 속성을 축약하여 기재                             |        |

#### flex-grow

`flex-grow` 속성을 이용해 총 container 크기를 배분해서 각 아이템의 너비로 지정할 수 있고 속성값의 비율에 따라 너비를 갖는다.

```css
/* 예를 들어 세 개의 item이 있다고 가정 */
.items{ flex-grow: 1; }
```

> 각 item이 container 너비의 1/3만큼씩 갖는다

```css
.items{ flex-grow: 1; }
.items:nth-child(2) { flex-grow: 2; }
```

> 1, 3번 item은 container 너비의 1/4만큼을 2번 item은 1/2만큼을 갖는다. (1:2:1의 비율)

#### flex-shrink

Container의 너비가 item 너비의 합보다 작아져서 item에 닿게 되면 동시에 item도 container와 함께 줄어든다.
이때, `flex-shrink`의 속성값의 비율이 각 item이 줄어드는 정도를 결정한다. (0은 줄어들지 않음.)

```css
.items{ flex-shrink: 1; }
```

> 각 item이 균등하게 줄어든다.

```css
.items:nth-child(1) { flex-shrink: 0; }
.items:nth-child(2) { flex-shrink: 1; }
.items:nth-child(3) { flex-shrink: 2; }
```

> 1번 item은 줄어들지 않고 2, 3번 아이템은 1:2의 비율로 줄어든다.

#### flex-basis

Container의 공간을 `flex-grow` 속성으로 배분하기 전에 각 item이 갖는 너비를 지정할 수 있다.

```css
.items:nth-child(2) { flex-basis: 200px; }
```

> 2번째 item의 기본 너비 값을 200px로 지정

#### flex

`flex: grow shrink basis` 순으로 축약하여 적는다.

```css
.item {
  flex: 1 1 200px /* grow:1 shrink:1 basis: 200px */
}
```

### flex의 속성들

속성값에 따라 어떻게 배열되는지는 해당 강의 가장 아래 CODEPEN으로 작성한 예시를 확인.

#### Container의 속성들

| 속성            | 의미                                                                             |
| --------------- | :------------------------------------------------------------------------------- |
| flex-direction  | items가 배열될 주 축과 방향을 설정                                               |
| flex-wrap       | items의 줄 바꿈 여부와 줄 바꿈시 정렬 위치를 설정                                |
| align-items     | items가 한 줄일 때 교차 축 방향으로의 배열 방식을 설정                           |
| justify-content | items 사이의 간격을 포함해 주 축의 배열 방식을 설정                              |
| align-content   | items가 여러 줄일 때 줄 사이의 간격을 포함해 교차 축 방향으로의 배열 방식을 설정 |

#### Items의 속성들

| 속성       | 의미                                                            |
| ---------- | :-------------------------------------------------------------- |
| order      | item들의 순서를 지정 (HTML 구조와 상관없이 순서 지정할 수 있다) |
| flex       | item의 주 축 방향의 너비를 설정                                 |
| align-self | 각 item의 배열 방식을 설정                                      |

## 참고

* [CSS 포지션(position)](https://www.zerocho.com/category/CSS/post/5864f3b59f1dc000182d3ea1) by ZeroCho
* [[CSS] 포지션(position) 속성강좌](https://keichee.tistory.com/277) by 정직한 블로그
* [CSS Flex(Flexible Box) 완벽 가이드](https://heropy.blog/2018/11/24/css-flexible-box/) by HEROPY Tech
* [A Complete Guide to Flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)
* [flexbox로 만들 수 있는 10가지 레이아웃](https://d2.naver.com/helloworld/8540176) by NAVER D2
