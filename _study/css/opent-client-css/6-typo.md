---
layout  : article
title   : 6. 타이포그래피(Typography)
summary : 
date    : 2020-04-28 12:21:35 +0900
updated : 2020-04-28 14:49:42 +0900
tag     : draft
toc     : true
public  : true
parent  : [[/css/opent-client-css]]
latex   : false
---
* TOC
{:toc}

> 이 글은 생활코딩의 [타이포그래피](https://opentutorials.org/course/2418/13356) 강의내용을 복습하기 위해 강의 자료를 기반으로 작성한 글입니다.
>
> * 제가 필요한 부분 위주로 확인하면서 정리하고 있어 글에 덜 작성된 부분이 있을 수 있습니다.
> * 글 작성 후 원 강의의 내용이 수정되거나 내용을 이해하기 위한 개인적인 설명이나 해석이 있을 수 있습니다. 되도록 원 강의를 참고해주시길 바랍니다.
> * 잘못된 부분이 있다면 댓글이나 그 외 편하신 방법으로 알려주시면 감사하겠습니다.

텍스트와 관련된 효과를 지정

## Font-size

폰트의 크기를 지정하며 몇 가지 단위가 존재

| 단위 | 설명                                                      |
| ---  | --------------------------------------------------------- |
| px   | 절대적인 수치(고정), 사용자가 폰트 크기를 조절할 수 없음  |
| em   | 크기가 가변적, 부모 태그의 영향을 받음                    |
| rem  | 크기가 가변적, html 태그에 적용된 font-size의 영향을 받음 |

사용자가 브라우저에서 폰트 사이즈를 설정할 때 px는 영향을 받지 않고 rem은 영향을 받는다.

### Example

```css
/* px */
#name {
    font-size: 16px;
}

/* em */
#name {
    font-size: 1em;
}

/* rem */
#name {
    font-size: 2rem;
}
```

## Color

폰트의 색상을 지정하며 대표적으로 세 가지 방식으로 지정할 수 있다.

| 방법       | 설명                                                          | 예시                                 |
| ---------- | ------------------------------------------------------------- | ------------------------------------ |
| color name | 유명한 색의 경우 고유 이름으로 색상을 지정                    | `red`, `tomato`, `powderblue`        |
| hex number | R, G, B 값을 순서대로 두 자리의 16진수로 표현해서 색상을 지정 | `#FFFFFF`, `#FF00FF`, `#FF0000`      |
| rgb        | R, G, B 값을 순서대로 10진수 숫자로 표현해서 색상을 지정      | `rgb(255,255,255)`, `rgb(255,0,255)` |

### Example

```css
/* color name */
#name {
    color: red;
}

/* hex */
#name {
    color: #FF0000;
}
/* rgb */
#name {
    color: rgb(255, 0, 0);
}
```

## Text-align

문단의 정렬을 지정하며 속성 값은 다음과 같다.

| 속성 값   | 설명        |
| --------- | ----------- |
| `left`    | 왼쪽 정렬   |
| `right`   | 오른쪽 정렬 |
| `center`  | 가운데 정렬 |
| `justify` | 양쪽 정렬   |

### Example

```css
#name {
    text-align: center;
}
```

## Font

그 외 font와 관련된 속성과 속성값

### Font Family

글꼴을 지정.

* 사용한 글꼴이 사용자의 컴퓨터에 없을 경우를 대비해 여러 글꼴을 함께 적어넣기도 한다.
* 앞에 위치한 글꼴이 우선 반영되며 가장 뒤에는 포괄적인 서체 꼴을 명시힌다.
* 글꼴 이름에 띄어쓰기가 있는 경우 따옴표(`""`)로 묶어줘야 한다.

```css
#name {
    /* 폰트 설정: 1순위 - Times New Roman, 2순위 - Times, 서체꼴 - Serif */
    /* 서체 꼴: Seris, Sans-serif, Cursive, Fantasy, Monospace 등 */
    font-family: "Times New Roman", Times, Serif;
}
```

### Font-weight

폰트의 굵기를 지정.

* 대표적으로 `Bold`, `Regular`, `Light` 등의 속성 값을 갖는다.
* 숫자로 표기할 수도 있다. Bold - `700`, Regular - `400`, Light - `300`

```css
#name {
    font-weight: bold;
}
```

### Line-height

줄 간격(행과 행 사이의 간격)을 지정.

* 사용한 폰트 크기의 배수(e.g `1.3`)로 설정하거나
* px 값을 직접 설정하여 고정폭을 줄 수도 있다.

```css
/* 폰트 크기의 배수 */
#name {
    font-size: 12px;
    line-height: 1.2; /* 줄간격 14.4px */
}

/* px */
#name {
    line-height: 14px;
}
```

### Font

* 앞의 폰트 관련 설정들을 축약형으로 기술할 수 있다.

* 설정 값의 순서를 지켜서 기술해야한다.

```css
font: font-style font-variant font-weight font-size/line-height font-family
      |caption|icon|menu|message-box|small-caption|status-bar|initial|inherit;

/* Example */
#name {
    font: bold 5rem/2 arial, helvetica, sans-serif;
}
```

## 웹 폰트

사용자가 웹에서 지정한 폰트를 갖고 있지 않을 경우 서버에서 폰트를 다운로드해서 사용할 수 있도록 하는 것 제공자와 사용자 모두 폰트를 받을 용량을 지불해야하기 때문에 사용시 고려해야 한다 (특히 국문).

### [Google Fonts](https://fonts.google.com/?authuser=1) 이용

* 사이트에서 원하는 폰트를 `+`버튼을 눌러 선택한 뒤 하단의 창을 확인
* `EMBED`탭의 링크를 복사해 `<head>` 태그 아래에 붙여넣기
* "specify in css"에 있는 코드를 `<style>` 태그 아래에 붙여 넣기
* `name {font-family: 폰트명, 계열}`

### Google에서 제공하지 않는 경우

* Font face generator 등을 이용해서 설치용 폰트를 웹 폰트로 변환
    * 저작권 주의
    * 다양한 브라우저에 대응하기 위해 여러 확장자로 변환되어 나온다.
* `preview.html`을 확인하면 `@fontface`에 폰트가 정의되어있고 `<body>`에 기입방식이 적혀있다.
    * `@fontface`에서 정의한 `font-family`의 폰트 이름과 `<body>` 태그에 적힌 `font-family`의 이름이 동일해야 함

## 참고

* [Font](https://developer.mozilla.org/ko/docs/Web/CSS/font) by MDN web docs

* [font 속성](https://ofcourse.kr/css-course/font-속성) by ofcourse
