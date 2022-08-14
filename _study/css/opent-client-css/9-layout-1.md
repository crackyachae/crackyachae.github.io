---
layout  : article
title   : "9. 레이아웃: 인라인 VS 블럭레밸, 박스모델, box-sizing"
summary : 
date    : 2020-04-28 15:53:52 +0900
updated : 2020-04-28 17:00:03 +0900
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

## Inline vs Block level

### `<h1>` vs `<a>`

* `<h1>` 태그는 화면 전체를 사용한다: `<h1>` element 다음에 오는 콘텐츠는 다음 줄에서 부터 시작.
* `<a>` 태그는 다른 콘텐츠 안에 존재할 수 있다: 줄바꿈 없이 본문내에 링크가 걸린 텍스트를 적을 수 있음.

다음과 같은 예시로 각 element가 차지하는 부피를 확인할 수 있다.

```css
h1, a {
    border-width: 5px;
    border-color: red;
    border-style: solid;
}
```

```html
<h1> Header </h1>
<a> link </a>
```

* Block level element: `<h1>` 처럼 줄 전체를 차지하는 태그
* Inline element: `<a>` 처럼 자신의 크기 만큼만 부피를 차지하는 태그

## Display

Display 속성을 이용해서 block level element와 inline element를 바꿀 수 있다.

```css
/* h1 태그를 inline element로 바꿈 */
h1 {
    display: inline;
}

/* a 태그를 block level element로 바꿈 */
a {
    display: block;
}
```

## 박스모델 (Box Model)

### Border

테두리(border)는 박스 모델의 기준선 역할을 하기 때문에 박스의 부피를 보다 용이하게 확인할 수 있다.

```css
p {
    border: 10px solid red;
}
```

### Padding

element 자체가 차지하는 부피를 설정한다.

```css
p {
    padding: 20px;
}
```

### Margin

element를 여러개 배치했을 때 element 사이의 간격, 즉 element 기준선 밖의 여백을 조절한다.

```css
p {
    margin: 20px;
}
```

### Width & Height

현재 Block element가 차지하고 있는 부피를 조절하려면 width와 height값을 조절한다. Inline element에는 적용할 수 없다.

```css
p {
    width: 100px;
    height: 30px;
}
```

## Box-sizing

element의 크기를 지정할 때 보다 쉽게 예측할 수 있는 방법

element의 크기는 `border`의 두께를 포함하지 않기 때문에 박스모델의 크기 예측이 어렵다.

```css
/* Box width를 150px로 설정 */
div {
    width: 150px
}

/* border의 두께가 다르기 때문에 id = "small"인 element와 "large"인 element의 크기가 다름 */
#small {
    border: 10px solid black;
}

#large {
    border: 30px solid black;
}
```

이런 문제는 box-sizing 속성을 바꿔서 해결할 수 있다. 보다 직관적인 편집을 위해 전체 태그(`*`)에 box-sizing을 적용하기도 한다.

```css
/* box-sizing을 border-box로 바꾸면 border을 포함해서 크기를 지정 */
/* default: content-box */
div {
    width: 150px;
    box-sizing: border-box;
}
```

## 참고

* [박스모델](https://poiemaweb.com/css3-box-model) by Poiemaweb
