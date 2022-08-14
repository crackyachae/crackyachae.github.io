---
layout  : overview
title   : "Express Tutorial Part 5: 도서관 데이터를 표시하기 (Displaying library data)"
summary : 
date    : 2022-01-19 20:39:24 +0900
updated : 2022-02-26 20:42:39 +0900
tag     : 
toc     : true
public  : true
parent  : [[/js-library/express/mdn-learn-web-server-3]]
latex   : false
---
* TOC
{:toc}

## Description

MDN Express 튜토리얼의 다섯번째 파트로 내용이 많아 내용을 여러 개의 하위 항목으로 나눈 것 같다.

* 주소: https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/Displaying_data

### 개요 (Overview)

이전 튜토리얼 글에서, 데이터베이스와 상호작용 하는 데 사용할 수 있는 [Mongoose model](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/mongoose)을 정의하고, 첫 도서관 레코드를 생성했다. 다음으로 지역 도서관 웹사이트에 필요한 [모든 라우트를 생성](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/routes)했지만, "더미 컨트롤러" (페이지에 접근했을 때 "not implemented" 메시지만을 반환하는 뼈대 컨트롤러 함수이다) 함수를 사용했다.

다음 단계는 도서관 정보를 *표시하는* 페이지를 적절히 구현하는 것이다 (이후의 글에서 정보를 생성, 수정, 혹은 삭제하기 위한 양식을 포함하는 페이지를 구현하는 방법을 살펴 볼 것이다). 여기에는 이전의 모델을 사용해 레코드를 가져오는 컨트롤러 함수를 갱신하고 사용자에게 정보를 표시하기 위한 템플릿을 정의하는 작업이 포함된다.

컨트롤러 함수에서 비동기 작업을 관리하는 법과 Pug를 사용해 템플릿을 작성하는 방법을 설명하는 개요/입문서 항목을 제공하는 것으로 시작할 것이다. 그 다음 각 "읽기 전용" 페이지에서 사용하는 특별하거나 새로운 기능에 대한 간단한 설명과 함께 이들을 구현해 볼 것이다.

이 글의 끝날 쯤에는 라우트, 비동기 함수, 뷰, 모델이 실제로 어떻게 작동하는지 전반적으로 이해할 수 있게 될 것이다.

## Progress

1. [X] 2022.01.19 Asynchronous flow control using async
1. [X] 2022.01.22 Template primer
1. [X] 2022.01.22 The LocalLibrary base template
1. [X] 2022.02.09 Home page
1. [X] 2022.02.17 Book list page
1. [X] 2022.02.17 BookInstance list page
1. [X] 2022.02.18 Date formatting using luxon
1. [X] 2022.02.26 Author list page and Genre list page challenge
1. [X] 2022.02.26 Genre detail page
1. [X] 2022.02.26 Book detail page
1. [X] 2022.02.26 Author detail page
1. [X] 2022.02.26 BookInstance detail page and challenge
