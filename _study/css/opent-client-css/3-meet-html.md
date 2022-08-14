---
layout  : article
title   : 3. HTML과 CSS가 만나는 법
summary : 
date    : 2020-04-23 21:26:19 +0900
updated : 2020-04-28 20:59:15 +0900
tag     : draft
toc     : true
public  : true
parent  : [[/css/opent-client-css]]
latex   : false
---
* TOC
{:toc}

> 이 글은 생활코딩의 [HTML과 CSS가 만나는 법](https://opentutorials.org/course/2418/13342) 강의내용을 복습하기 위해 강의 자료를 기반으로 작성한 글입니다.
>
> * 제가 필요한 부분 위주로 확인하면서 정리하고 있어 글에 덜 작성된 부분이 있을 수 있습니다.
> * 글 작성 후 원 강의의 내용이 수정되거나 내용을 이해하기 위한 개인적인 설명이나 해석이 있을 수 있습니다. 되도록 원 강의를 참고해주시길 바랍니다.
> * 잘못된 부분이 있다면 댓글이나 그 외 편하신 방법으로 알려주시면 감사하겠습니다.

## `<h1>` 태그의 색상을 바꾸는 두 가지 방법

1. 태그에 직접 입력

   ```html
   <!-- style: 속성 뒤의 값을 CSS로 적용하라는 'HTML' 속성 -->
   <!-- {color:red}: CSS 문법 -->
   <h1 style = "color: red"> text </h1>
   ```

2. Style 태그 안에 입력

   ```html
   <!-- <style>: 태그 안의 값을 CSS로 적용하라는 'HTML' 태그 -->
   <!-- {color:red}: CSS 문법 -->
   <style>
       h1{color: red;}
   </style>
   ```
