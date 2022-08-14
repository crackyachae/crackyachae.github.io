---
layout  : article
title   : "9. 레이아웃: Float, 다단"
summary : 
date    : 2020-03-16 15:48:38 +0900
updated : 2020-03-26 21:58:16 +0900
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

## Float

글의 본문 안에 이미지를 삽화로 삽입할 때 사용하는 기능이다. 레이아웃을 잡을 때도 주로 사용한다.

### Float 기본

일반적으로 이미지 `<img>`와 문단 `<p>`를 나란히 배치 할 경우 마크업 순서에 따라 수직방향으로 배치된다.

이는 각 element가 자신의 영역을 차지하고 있는 것으로 볼 수 있다. 즉, 이미지 element가 페이지의 처음영역을 먼저 차지했기 때문에 문단 element는 그 다음에 위치해야 하는 것이다.

```html
<!-- 이미지 다음에 Lorem ipsum 텍스트가 위치 -->

<img src = " ... ">
<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
```

Element를 '띄워서 (float)' element가 차지하고 있던 영역을 무시하고 다음 element를 배치할 수 있게 해 주는 속성이 Float이다.

Float을 이용하면 이미지를 둔(띄운)뒤 옆의 빈 공간에 글을 배치할 수 있다.

```css
/*img 태그에 float값을 left 부여: 이미지를 왼쪽에 띄운다.*/

img{
    float: left;
}
```

`float` 속성이 가질 수 있는 속성값은 다음과 같다.

| 속성값 | 의미                              |
| ------ | --------------------------------- |
| left   | element를 왼쪽에 떠 있도록 위치   |
| right  | element를 오른쪽에 떠 있도록 위치 |
| none   | element를 띄우지 않음 (default)   |

### Clear

`float` 시킨 element 다음의 element들은 float 시킨 element 옆의 공간이 비어있으면 빈 공간을 채우는 방식으로 위치한다.

남아있는 빈 공간을 무시하고 아래에 element를 위치시키려면 `float`의 영향을 받지 않도록 해줘야 하는데 이를 위해 사용하는 속성이 `clear`이다.

다음과 같이 `float`의 영향을 받지 않을 element에 `clear`속성을 적용시킬 수 있다.

```html
<!-- float의 영향을 받는 element -->

<img src = " ... ">
<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>

<!-- float의 영향을 받지 않는 element -->

<p style = "clear: both;">Voluptate minus, obcaecati quia eaque perspiciatis!</p>
```

`clear` 속성이 가질 수 있는 속성값은 다음과 같다.

| 속성값 | 의미                                                               |
| ------ | ------------------------------------------------------------------ |
| left   | 왼쪽에 float해 있는 element의 영향을 받지 않게 함                  |
| right  | 오른쪽에 float해 있는 element의 영향을 받지 않게 함                |
| both   | 왼쪽과 오른쪽 상관 없이 float해 있는 element의 영향을 받지 않게 함 |
| none   | float의 영향을 계속 받음 (default)                                 |

### Float 응용

`float`을 이용해서 Holy grail layout 만들기.

각 element를 순서대로 배치한 뒤 element 사이에 border를 그어준다.

```css
/*navigation을 가장 왼쪽에 위치*/
nav{
    float: left;

    border-right: 1px solid gray; /*nav와 article 사이의 선*/
    margin-left: -1px; /*article의 left border와 일치시키기 위해 margin값을 줌*/
    width: 120px;
}

/*article을 nav 다음에 위치*/
article{
    float: left;

    /*nav와 article 사이의 선; 둘 중 하나에만 그으면 두 element의 크기가 달라졌을 때 border가 중간에서 끊기게 되므로 양쪽 다 그어줌 */ 
    border-left: 1px solid gray; 
    width: 360px;
}

/*aside도 nav-article과 유사하게 작성 (width: 120px)*/
```

Element들을 `float`으로 배열 할 경우, 모든 element를 배치시키기에 창의 폭이 충분하지 못하면 공간이 부족한 element는 줄바꿈된다. 창의 크기에 따라 element가 이동하는 것을 방지하기 위해 nav-article-aside를 담고있는 container의 크기를 고정시켜줘야 한다.

```css
.container{
    width: 600px /*nav-article-aside폭의 합으로 지정*/*
    margin: auto; /*창이 600px보다 클 경우 element들이 창의 중앙에 위치*/
}
```

* 위에서 지정한 nav, article, aside의 크기는 border를 포함하지 않은 값으로 실제 세 element의 폭의 합이 600px보다 클 수 있다. box-sizing을 쓰거나 border를 따로 계산해서 정해주는게 좋다\*.

## 다단 (Multi Column)

화면을 여러개의 열로 나눈 구조.

### 단의 개수

단의 개수를 지정해서 나눌 수 있다.

```css
/*단을 2개로 나눈다*/

.column{
    column-count: 2;
}
```

단의 폭을 지정해서 나눌 수 있다. 현재 화면의 크기에 따라 단의 개수가 결정된다.

```css
/*한 단의 폭이 200px이 되도록 단을 나눈다*/

.column{
    column-width: 200px;
}
```

`column-width`속성과 `column-count` 속성을 동시에 부여하면 `column-width`의 값에 따라 단의 개수를 나누되 `column-count` 값보다 많아지지 않는다.

```css
/*화면 폭이 ~600px 일 때 까지 단이 2개, ~800px일 때 까지 단이 3개이고 그 이후론 창이 커져도 단의 개수가 늘어나지 않는다. (실제로는 단 사이의 공간 때문에 600, 800px보다 큰 값일때 단의 개수가 변한다.)*/

.column{
    column-width: 200px
    column-count: 3;
}
```

특정한 element를 어러 단에 걸쳐서 두고 싶으면 `column-span` 속성을 사용하면 된다.

```html
<style>
    /*class가 column인 element의 단을 4개로 나눔*/
    .column{
        column-count: 4;
    }

    /*제목(h1태그)은 모든 단에 걸쳐서 위치*/
    h1{
        column-span: all;
    }
</style>

<body>
    <div class="column">
        <h1>Lorem ipsum dolor sit amet.</h1>
        consectetur adipisicing elit. Molestiae blanditiis nostrum eum ipsam, ...
    </div>
</body>
```

### 단의 속성

단의 세부 사항을 조절할 수 있는 속성이 있다.

```css
.column{
    
    /*단 사이의 간격*/
    column-gap: 30px;

    /*단 사이의 구분선: column-rule*/
    column-rule-width: 2px; /*구분선 두께*/
    column-rule-style: dashed; /*구분선 종류*/
    column-rule-color: gray; /*구분선 색상*/
    column-rule: 2px dashed gray; /*두께, 종류, 색상 순*/
}    
```

## 참고

* [#5 Floating, Positioning](https://webclub.tistory.com/617) by Jaehee's WEBCLUB
