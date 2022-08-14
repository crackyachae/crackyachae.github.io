---
layout  : article
title   : 7. 수업을 마치며
summary : 
date    : 2020-12-02 17:07:19 +0900
updated : 2020-12-15 02:20:04 +0900
tag     : draft
toc     : true
public  : true
parent  : [[/react/opent-react]]
latex   : false
---
* TOC
{:toc}

> 이 글은 생활코딩의 [수업을 마치며](https://opentutorials.org/module/4058/24740) 강의내용을 복습하기 위해 작성한 글입니다.
>
> * 제가 필요한 부분 위주로 확인하면서 정리하고 있어 글에 덜 작성된 부분이 있을 수 있습니다.
> * 글 작성 후 원문의 내용이 수정되거나 내용을 이해하기 위한 개인적인 설명이나 해석이 있을 수 있습니다. 되도록 원문을 참고해주시길 바랍니다.
> * 잘못된 부분이 있다면 댓글이나 그 외 편하신 방법으로 알려주시면 감사하겠습니다.

더 공부해볼만한 내용

* immutable: 구현을 단순하게 유지해서 더 높은 복잡성이 도전하는 것
    * 너무 자유롭게 변경할 수 있으면 문제가 발생할 수 있음
    * 객체를 immutable하게 유지해주는 라이브러리 존제 immuterble.js
* Router: 현재 우리의 web app 은 하나의 URL 로 모든 페이지를 다룸
    * 페이지가 변할 때 마다 network를 다시 불러오지 않는 장점
    * URL 만으로 페이지에 접근할 수 없다는 단점이 있다.
    * React Router URL에 따라서 적당한 component가 로드되게 하고
    * 해당 페이지로 접근할 수 있는 퍼머링크를 제공할 수 있다
* create-react-app을 조작
    * npm run eject
* redux
    * react component가 많아지면 component 간의 교류가 굉장히 까다로워 진다.
    * 중앙에 데이터 저장소를 만들고 모든 컴포너트를 연걸
* react server side rendering
    * 서버 쪽에서 웹 페이지를 완성한 후에 클라이언트로 완성된 html을 전송
    * 초기 구동시간 단축
    * 로딩이 필요없다는 특성도 유지할 수 있음
* react native
    * react와 같은 방식으로 native app을 제작할 수 있다.  
