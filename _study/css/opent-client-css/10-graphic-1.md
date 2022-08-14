---
layout  : article
title   : "10. 그래픽: 배경, 필터"
summary : 
date    : 2020-03-26 12:04:55 +0900
updated : 2020-03-27 02:03:16 +0900
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

## 배경 (Background)

Element의 배경을 설정하는 기능

### 배경색 및 이미지

```css
div {
    background-color: color; /*배경 색 변경*/
    background-image: url("\relative\path.png"); /*배경 이미지 변경*/
}
```

* 배경색과 이미지는 중첩해서 적용할 수 있다.

* 이미지에 투명한 부분이 있거나 태그 영역을 가득 채우지 않으면 배경색이 보인다.

### 배경 이미지 속성

배경 이미지를 변경할 수 있는 속성

```css
div {
    background-image: url("\relative\path.png");
    background-repeat: no-repeat; 
    background-attachment: fixed;
    background-size: 150px 100px;
    background-position: left top;

    /*속성 축약형*/
    background: color image repeat attachment;
}
```

#### Background-repeat

* 배경 이미지의 반복 여부를 결정

| 속성값      | 의미                       |
| ----------- | -------------------------- |
| `repeat`    | 배경을 반복 (default)      |
| `no-repeat` | 배경을 반복하지 않음       |
| `repeat-x`  | 배경을 x축 방향으로만 반복 |
| `repeat-y`  | 배경을 y축 방향으로만 반복 |

#### Background-attachment

* 배경 이미지의 스크롤 여부를 결정

| 속성값    | 의미                                                                                    |
| --------- | --------------------------------------------------------------------------------------- |
| `fixed`   | 배경이 움직이지 않음                                                                    |
| `scroll`  | 배경이 element와 같이 움직임. element 내부에서 scroll하면 배경이미지는 스크롤 되지 않음 |
| `local`   | 배경이 element와 같이 움직임. element 내부에서 scroll하면 배경이미지도 스크롤           |
| `initial` | 기본값                                                                                  |
| `inherit` | 부모의 값을 상속받음                                                                    |

#### Background-size

* 배경 이미지의 크기를 결정

| 속성값    | 의미                                                                                                                                        |
| --------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| `auto`    | 이미지 크기 유지                                                                                                                            |
| 수치 입력 | `px`로 절댓값을 입력하거나 `%`로 비율을 입력 <br> 값을 하나만 입력하면 width 크기로 지정이 되며 length는 원본이미지의 비율에 따라 결정된다. |
| `cover`   | 이미지가 화면 전체를 채우도록 크기 설정                                                                                                     |
| `contain` | 화면 내에 이미지 전체가 들어갈 수 있도록 크기 설정                                                                                          |
| `initial` | 기본값                                                                                                                                      |
| `inherit` | 부모의 값을 상속받음                                                                                                                        |

#### Background-position

* 배경 이미지의 위치를 지정

| 속성값     | 의미                                                                                           |
| ---------- | ---------------------------------------------------------------------------------------------- |
| 방향 입력  | 해당 방향에 위치 <br> 수평방향: `left` `right` `center` <br> 수직방향: `top` `bottom` `center` |
| 수치 입력  | `px`로 절댓값을 입력하거나 `%`로 비율을 입력                                                   |
| `repeat-x` | 배경을 x축 방향으로만 반복                                                                     |
| `repeat-y` | 배경을 y축 방향으로만 반복                                                                     |

## 필터 (Filter)

원본 이미지는 유지하면서 코드를 통해서 이미지에 효과를 주는 기능

### Vendor prefix

* 속성을 실험적으로 지원하는 경우 특정 browser에서 해당 속성을 인식할 수 있도록 붙여주는 접두사

* `-vendor_prefix-property: value;` 형태로 적는다.
* Browser 마다 vendor prefix를 다르게 해서 적고 마지막에 표준 속성을 적어주어야 한다.

| Vendor prefix | browser           |
| ------------- | ----------------- |
| `-webkit-`    | Safari, Chrome    |
| `-moz-`       | Firefox           |
| `-o-`         | Opera             |
| `-ms-`        | Internet Explorer |

### 필터(Filter)

* 속성값으로 적용할 필터의 종류와 적용 값을 적는다. `filter: effect(value)`

* 이미지 뿐만 아니라 문자에도 적용할 수 있다.
* 자세한 필터종류는 [참고](##참고)의 사이트들을 참고.

```css
img {
    /*image에 grayscale을 100%로 적용*/
    -webkit-filter: grayscale(100%);
    -o-filter: grayscale(100%);
    filter: grayscale(100%)
}

h1 {
    /*제목(text)에 blur를 1px로 적용*/
    -webkit-filter: blur(1px);
    -o-filter: blur(1px);
    filter: blur(1px);
}
```

## 참고

* [background 속성](https://ofcourse.kr/css-course/background-%EC%86%8D%EC%84%B1) by ofcourse

* [Filter](https://developer.mozilla.org/ko/docs/Web/CSS/filter) by MDN web docs
* [Image Effects with CSS](https://bennettfeely.com/image-effects/) by Bennett Feely
* [Filter](https://css-tricks.com/almanac/properties/f/filter/) by CSS-TRICKS
* [벤더 프리픽스](http://tcpschool.com/css/css3_module_vendorPrefix) by TCP SCHOOL
