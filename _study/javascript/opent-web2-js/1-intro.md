---
layout  : article
title   : 1. 수업의 목적
summary : 
date    : 2020-04-30 13:19:52 +0900
updated : 2020-04-30 13:33:23 +0900
tag     : draft
toc     : true
public  : true
parent  : [[/javascript/opent-web2-js]]
latex   : false
---
* TOC
{:toc}

> 이 글은 생활코딩의 [수업의 목적](https://opentutorials.org/course/3085/18868) 강의내용을 복습하기 위해 강의 자료를 기반으로 작성한 글입니다.
>
> * 제가 필요한 부분 위주로 확인하면서 정리하고 있어 글에 덜 작성된 부분이 있을 수 있습니다.
> * 글 작성 후 원 강의의 내용이 수정되거나 내용을 이해하기 위한 개인적인 설명이나 해석이 있을 수 있습니다. 되도록 원 강의를 참고해주시길 바랍니다.
> * 잘못된 부분이 있다면 댓글이나 그 외 편하신 방법으로 알려주시면 감사하겠습니다.

## 1. 수업의 목적

* JavaScript를 이용하면 사용자의 행위에 반응하도록 만들 수 있다. (상호작용)
* 웹 페이지는 브라우저에 한 번 출력되면 바뀔 수 없지만 (e.g. `<body>` 태그는 계속 `<body>`태그를 유지) JavaScript를 이용하면 디자인에 변화를 줄 수 있다.

### Example

사용자가 버튼을 클릭했을 때 웹 페이지의 배경과 글씨 색을 바꿀 수 있다.

* night button: 배경 검정색, 글씨 흰색
* day button: 배경 흰색, 글씨 검정색

```html
<!-- night 버튼을 클릭하면 배경색을 검정으로 전환 -->
<input type = "button" value = "night" onclick = "
document.querySelector('body').style.backgroundColor = 'black'; ">
```

* `input type = "button" value = "night"`: 글씨가 night이 써진 버튼 생성
* `onclick`: 클릭했을 때 속성값을 실행, 속성값으로 JavaScript를 갖는다.
* `document.querySelector('body')`: 웹 페이지의 `<body>`태그를 선택
* `.style.backgroundColor = 'black';`: 배경색을 검정으로 변경

브라우저의 개발자 도구에서 버튼을 클릭할 때 코드가 바뀌는 것을 볼 수 있다.
