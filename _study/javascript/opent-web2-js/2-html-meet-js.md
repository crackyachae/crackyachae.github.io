---
layout  : article
title   : 2-4. HTML과 JavaScript의 만남
summary : 
date    : 2020-04-30 13:34:41 +0900
updated : 2020-04-30 13:57:20 +0900
tag     : draft
toc     : true
public  : true
parent  : [[/javascript/opent-web2-js]]
latex   : false
---
* TOC
{:toc}

> 이 글은 생활코딩의 [HTML과 JavaScript의 만남 1 (script 태그)](https://opentutorials.org/course/3085/18778), [HTML과 JavaScript의 만남 2 (이벤트)](https://opentutorials.org/course/3085/18782), [HTML과 JavaScript의 만남 3 (콘솔)](https://opentutorials.org/course/3085/18869) 강의내용을 복습하기 위해 강의 자료를 기반으로 작성한 글입니다.
>
> * 제가 필요한 부분 위주로 확인하면서 정리하고 있어 글에 덜 작성된 부분이 있을 수 있습니다.
> * 글 작성 후 원 강의의 내용이 수정되거나 내용을 이해하기 위한 개인적인 설명이나 해석이 있을 수 있습니다. 되도록 원 강의를 참고해주시길 바랍니다.
> * 잘못된 부분이 있다면 댓글이나 그 외 편하신 방법으로 알려주시면 감사하겠습니다.

## 2. HTML과 JavaScript의 만남: Script 태그

JavaScript는 HTML을 기반으로 동작한다. JavaScript를 전혀 다른 언어인 HTML과 어떻게 같이 사용할 수 있을까

* `<script>`태그를 이용. `<script>`태그 안의 코드는 JavaScript로 해석한다.

```html
<!-- JavaScript를 이용해서 텍스트 작성 -->
<script>
    document.write("Hello world")
</script>
```

### JavaScript vs HTML

텍스트는 HTML에 직접 입력해도 사용할 수 있지만 JavaScript가 HTML에 비해 동적으로 수행할 수 있는 여지가 더 많다.

```html
<!-- HTML: "1+1"로 출력 -->
<p>
    1+1
</p>

<!-- JavaScript: "2"로 출력 -->
<script>
    document.write(1+1)
</script>
```

## 3. HTML과 JavaScript의 만남: 이벤트 (Event)

JavaScript가 사용자와 상호작용하기 위한 핵심기능.

```html
<input type = "button" value = "hi" onclick = "alert('hi')">
```

`onclick`의 속성값을 기억하고 있다가 '클릭했을 때' 코드를 실행

위의 '클릭'처럼 웹 브라우저에서 일어나는 일중 대표적인 것을 추려 **EVENT**라고 한다.

Example: `onclick` - 클릭할 때, `onchange` - 내용 변화가 있을 때, `onkeydown` - 키를 입력했을 때

## 4. HTML과 JavaScript의 만남: 콘솔 (Console)

개발자 도구의 콘솔(console)을 이용하면 웹 페이지가 파일형태가 아니더라도 JavaScript 코드를 간단하게 실행해볼 수 있다.

* **Example** 문자열의 단어 수 세기

  페이지의 글(문자열)을 복사해서 따옴표로 감싼 뒤 `.length`를 붙여 문자열에 포함된 단어의 개수를 셀 수 있다.

  ```JavaScript
  alert('String'.length)
  ```

Console에 입력한 JavaScript는 현재 페이지를 대상으로 작동하기 때문에 유용하게 사용할 수 있다.

* **Example** 현재 게시글의 댓글 랜덤 추첨
  
  해당 서비스의 댓글을 랜덤 추첨하는 코드를 만들거나 가져와서 console에서 실행하면 현재 페이지의 댓글을 랜덤 추첨할 수 있다.

Console과 JavaScript를 이용하면 이미 만들어진 웹 페이지를 보다 효율적으로 활용할 수도 있다.
