---
layout  : article
title   : 29. UI vs API / 30. 수업을 마치며
summary : 
date    : 2020-05-07 22:34:38 +0900
updated : 2020-05-07 22:43:09 +0900
tag     : draft
toc     : true
public  : true
parent  : [[/javascript/opent-web2-js]]
latex   : false
---
* TOC
{:toc}

> 이 글은 생활코딩의 [UI vs API](https://opentutorials.org/course/3085/18887), [수업을 마치며](https://opentutorials.org/course/3085/18888) 강의내용을 복습하기 위해 강의 자료를 기반으로 작성한 글입니다.
>
> * 제가 필요한 부분 위주로 확인하면서 정리하고 있어 글에 덜 작성된 부분이 있을 수 있습니다.
> * 글 작성 후 원 강의의 내용이 수정되거나 내용을 이해하기 위한 개인적인 설명이나 해석이 있을 수 있습니다. 되도록 원 강의를 참고해주시길 바랍니다.
> * 잘못된 부분이 있다면 댓글이나 그 외 편하신 방법으로 알려주시면 감사하겠습니다.

## 29. UI vs API

* **UI (User Interface)**: 사용자가 시스템을 제어하기 위해서 사용하는 조작장치 (e.g 버튼)
* **API (Application Programming Interface)**: 애플리케이션을 만들기 위해서 프로그래밍 할 때 사용하는 조작장치 (e.g js의 alert) <br>
  웹 페이지에 경고창을 만들기 위해서 사용하는 alert 함수는 경고창을 실행하는 조작장치로서 브라우저에 미리 만들어 놓은 기능이다.

우리는 이번 수업을 통해 UI만 사용했던 사용자에서 JavaScript를 통해 API까지 사용할 수 있는 사람이 되었다.

## 30. 수업을 마치며

이제 학습을 그만두고 프로젝트를 시작할 때.

* 프로젝트를 시작할 때 모든 개념을 한 번에 사용하려고 하지 말자. 최소한의 정도로만 (i.e. 순서에 따라서 문제를 해결하는 것)
* 그러다 한계가 찾아올 때 배웠던 기능 (e.g 반복문, 조건문, 함수 등)을 조금씩 적용해보자.
* 그리고 또 다시 한계가 찾아올 때가 새로운 공부를 시작할 때이다.

### 새로운 공부를 위한 Keywords

* `document, DOM` 객체: 웹 페이지의 태그를 변경하고 싶을 때 두 객체의 method와 property를 이용
* `window` 객체: 웹 브라우저 자체를 조작하고 싶을 때 window 객체의 method와 property를 이용
* `Ajax`: 웹 페이지의 정보를 reload 없이 변경하고 싶을 때
* `cookie`: 웹 페이지가 reload 되어도 정보를 유지하고 싶을 때
* `offline web application`: 인터넷 없이 웹/앱을 작동시키고 싶을 때
* `webRTC`: 화상통신 웹/앱 관련
* `speech API`: 음성을 이용한 동작을 하고 싶을 때
