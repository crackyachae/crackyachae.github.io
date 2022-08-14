---
layout  : article
title   : "9. 레이아웃: 마진 겹침 현상"
summary : 
date    : 2020-04-28 17:06:31 +0900
updated : 2020-04-28 20:57:34 +0900
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

## 마진 겹침 현상 (Margin collapsing)

마진이 특정 값 보다 클 경우 두 요소의 마진 영역이 겹치는 현상

### 마진 겹침 현상이 발생하는 경우

* 두 개의 인접한 태그 (sibling) 사이에서 발생
    * 두 element의 마진 값 중에 작은 값이 상쇄되어 큰 값이 두 element 사이의 간격이 된다.
    * `<li>` 등에 margin을 적용시켰을 때 등간격을 유지할 수 있게 해준다.

* 부모 - 자식 태그 사이에서 발생
    * 부모 태그의 시각적 효과를 주는 요인이 없는 경우에만 발생한다. (e.g `border`, `background`, 블록 안의 텍스트 등)
    * 부모 - 자식 태그의 마진값 중 더 큰 값이 자식 element의 마진값으로 적용

* 빈 element에서 발생 (시각적 효과를 주는 요인이 없는 element)
    * `margin-top`과 `margin-bottom`중 큰 값만 해당 태그의 마진값으로 적용됨

## 참고

* [CSS 마진 상쇄(Margin-collapsing) 원리 완벽 이해](https://velog.io/@raram2/CSS-마진-상쇄Margin-collapsing-원리-완벽-이해) by raram2
