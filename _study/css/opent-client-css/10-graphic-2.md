---
layout  : article
title   : "10. 그래픽: 혼합, 변형, SVG"
summary : 
date    : 2020-04-05 23:54:26 +0900
updated : 2020-04-28 16:09:41 +0900
tag     : draft
toc     : true
public  : true
parent  : [[/css/opent-client-css]]
latex   : false
---
* TOC
{:toc}

> 이 글은 생활코딩의 [그래픽](https://opentutorials.org/course/2418/13591) 강의내용을 복습하기 위해 강의 자료를 기반으로 작성한 글입니다.
>
> * 제가 필요한 부분 위주로 확인하면서 정리하고 있어 글에 덜 작성된 부분이 있을 수 있습니다.
> * 글 작성 후 원 강의의 내용이 수정되거나 내용을 이해하기 위한 개인적인 설명이나 해석이 있을 수 있습니다. 되도록 원 강의를 참고해주시길 바랍니다.
> * 잘못된 부분이 있다면 댓글이나 그 외 편하신 방법으로 알려주시면 감사하겠습니다.

## 혼합 (Blend)

이미지와 element를 혼합해서 새로운 이미지를 만들어 내는 기법

* 원본을 유지한 채 코드를 통해서 효과를 주기 때문에 각 element의 특성을 유지하거나 동적 element를 만들어 사용자와 상호작용 하기에도 용이하다.
* 예를 들어 텍스트를 '텍스트 자체'로 유지가 가능하기 때문에 복사, 검색 등이 가능

### Background-blend-mode

배경(background) 끼리 blend

```css
.blend {
    /* blend 할 색상 */
    /* 색상 표현: rgba (RED, BLUE, GREEN, 투명도) */
    background-color: rbga(255, 0, 0, 0.5);

    /* blend 할 이미지 */
    background-img: url('sample.jpg');

    /* blend 설정: 색상과 이미지를 color mode로 blend */
    background-blend-mode: color;
}
```

`:hover`를 이용해서 element 위에 마우스가 올라갔을 때 blend 효과가 나타나도록 할 수도 있다.

```css
.blend:hover {
    /* blend 색상의 투명도를 1로 높여서 결과를 다르게 함 */
    background-color: rgba(255, 0, 0, 1);
    
    /* 마우스가 올라갔을 때 전환을 부드럽게 해주는 효과 - 추후 강의 */
    transition: background-color 5s;
}
```

### Mix-blend-mode

Content 사이에 blend를 적용할 수도 있다.

```html
<div class="blend">
    <h1> title </h1>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi vitae.
</div>
```

```css
body {
    /* blend할 배경 이미지 */
    background-image: url('image.jpg');
}

.blend {
    font-size: 2rem;
    color: red;

    /* body의 배경 이미지와 class가 blend인 element (text)를 screen모드로 blend */
    mix-blend-mode: screen;
}
```

## 변형 (Transform)

Element의 크기, 위치, 모양을 변경하는 속성

### Transform

`transform` 속성 값으로 변형 종류를 적은 뒤 괄호 안에 정도를 표기한다.

```css
h1 {
    /* x축 방향으로 2배 늘림 */
    transform: scaleX(2);
}
```

x축, y축 방향을 별도로 지정할 수 있는 변형이 많으며 x, y축 방향으로 모두 변형시키고 싶으면 한 줄안에 적어야한다.

```css
h1 {
    /* 두 번째 줄의 y축 방향 변형만 적용됨 */
    transform: scaleX(2);
    transform: scaleY(2);

    /* x, y축 방향 모두 변형이 적용됨 */
    transform: scaleX(2) scaleY(2);
}
```

* 그 외 효과는 [강좌 페이지](https://opentutorials.org/course/2418/13684)의 codepen 자료를 참조
* Transform 종류에 따른 단위는 [MDN web docs transform](https://developer.mozilla.org/en-US/docs/Web/CSS/transform)의 syntax에서 확인
    * e.g) Rotate<angle>: deg(degree), rad, turn 등

### Transform-origin

효과가 적용 될 기준을 지정.

```css
hl {
    /* 왼쪽 상단을 기준으로 x축 100% y축 0인 지점 */
    /* 즉, 오른쪽 상단이 변형 기준 */
    transform-origin: 100% 0 0;
    
    /* 왼쪽 상단이 변형 기준 */
    transform-origin: left top;
}
```

## SVG

벡터(Vector) 이미지를 표현하기 위한 포맷

### Vector vs Bitmap

* Bitmap: pixel로 이루어져 있어 확대하면 이미지가 깨진다. (e.g `.jpeg`, `.png` 등)

* Vector: 점과 선의 연결정보로 되어있어 확대해도 이미지가 깨지지 않는다. (e.g `.ai`, `.svg` 등)

### svg

svg도 다른 비트맵 이미지 처럼 `img` 태그를 이용해서 삽입한다.

```html
<!-- png 파일 삽입 -->
<img scr="image.png">

<!-- svg 파일 삽입 -->
<img src="image.svg">
```

배경 이미지로 svg파일을 사용

```html
<body>
    <div class="svg"></div>
</body>
```

```css
.svg {
    background-image: url(image.svg);
}
```

### svg 파일 만들기

svg 파일을 텍스트 에디터로 열어보면 몇 개의 태그와 태그 속성 값으로 되어있다. (XML 마크업 이용)

빈 svg 파일을 만든 뒤 svg 태그 안에 만들고 싶은 도형과 속성을 적어서 svg 파일을 만든다.

```xml
<svg width="210" height="210">    
    <rect x="5" y="5" width="200" height="200" style="fill:blue; stroke:red;stroke-width=10px">
</svg>
```

* rect: 직사각형

* style 속성 값이 직사각형을 시각적으로 보이게 하는 부분
* 테두리(stroke)를 지정한 경우 stroke 두께에 맞춰서 위치를 지정해주어야 한다.
* 도형이 잘리지 않도록 `<svg>`의 `width`, `height` 모두 200+10로 지정.

## 참고

Blend

* [background-blend-mode](https://developer.mozilla.org/ko/docs/Web/CSS/background-blend-mode) by MDN web docs
* [mix-blend-mode](https://developer.mozilla.org/ko/docs/Web/CSS/mix-blend-mode) by MDN web docs

Transform

* [CSS3 Transform](https://poiemaweb.com/css3-transform) by Poiemaweb
* [CSS3 트랜스폼](https://webclub.tistory.com/432) by by Jaehee's WEBCLUB
