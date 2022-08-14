---
layout  : article
title   : "9. 레이아웃: 미디어 쿼리"
summary : 
date    : 2020-03-15 23:57:20 +0900
updated : 2020-04-28 16:09:04 +0900
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

## 미디어 쿼리 (Media Query)

미디어의 상태에 따라 다른 디자인을 가능하게 한다. 반응형 디자인의 핵심.

### 미디어쿼리 기본

미디어 쿼리를 이용하려면 디자인이 변하게 될 **조건**을 정해, 기준에 따라 CSS를 다르게 작성해 줘야한다.

조건은 `<style>`태그 내에 다음과 같이 적을 수 있다.

```css
@media (width: 500px){...}
```

위의 예시는 화면의 크기가 `500px`일 때 중괄호 안의 속성을 적용시킨다.

특정 값이 아니라 범위에서 적용하고 싶으면 조건을 다음과 같이 바꿔주면 된다.

```css
/*width의 '최댓값'이 500px일 때; width가 500px 이하일 때*/
@media (max-width: 500px){...}

/*width의 '최솟값'이 500px일 때; width가 500px 이상일 때*/
@media (min-width: 500px){...}
```

여러 효과가 하나의 태그에 같이 적용되어 있을 경우 아래의 설정에 우선순위를 둔다.

* 500px까지 배경색이 red인 설정이 600px까지 배경색이 green인 설정보다 우선이므로 500px까지는 배경색이 red, 이후로 600px까지는 green.

```css
/*~500px: 배경색 red, 500px ~ 600px: 배경색 green*/

/*~600px: 배경색 green*/
@media (max-width: 600px){
    body{
        background-color: green;
    }
}

/*~500px: 배경색 red*/
@media (max-width: 500px){
    body{
        background-color: red;
    }
}
```

* 600px까지 배경색이 green인 설정이 500px까지 배경색이 red인 설정보다 우선이므로 600px까지 배경색은 항상 green이다.

```css
/*~ 600px: 배경색 green*/

/*~500px: 배경색 red*/
@media (max-width: 500px){
    body{
        background-color: red;
    }
}

/*~600px: 배경색 green*/
@media (max-width: 600px){
    body{
        background-color: green;
    }
}
```

미디어쿼리를 모바일에서 적용하기 위해서는 아래 코드를 `<head>`태그에 넣어주어야 한다.

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

## 미디어쿼리 응용

미디어 쿼리를 이용해서 500px 이하에서 Holy Grail Layout을 다르게 바꾸기. 수평구조로 있던 **navigation - main - aside**를 수직구조로 바꾼다.

```css
/*500px 이하를 조건으로 설정*/
@media (max-width: 500px){

    .content{
        flex-direction: column; /*수평방향(row) 배열을 수직(column)으로 바꿈*/
    }
    .content nav, aside{
        border: none; /*nav - main - aside를 구분하던 border를 제거*/
        flex-basis: auto; /*nav와 aside의 basis(폭) 고정값 제거*/
    }

    /*content 순서 재설정*/
    main{order: 0;}
    nav{order: 1;}
    aside{order: 2;}
}
```

## 참고

* [화면의 크기와 환경을 감지하는 기술, 미디어 쿼리 (Media Queries)](https://ccuram.tistory.com/30) by yucalip

* [Using media queries](https://developer.mozilla.org/en-US/docs/Web/CSS/Media_Queries/Using_media_queries) by MDN web docs
