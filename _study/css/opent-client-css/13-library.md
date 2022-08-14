---
layout  : article
title   : 13. 라이브러리 (Library)
summary : 
date    : 2020-04-29 15:34:42 +0900
updated : 2020-06-04 11:02:15 +0900
tag     : 
toc     : true
public  : true
parent  : [[/css/opent-client-css]]
latex   : false
---
* TOC
{:toc}

> 이 글은 생활코딩의 [라이브러리](https://opentutorials.org/course/2418/13470) 강의내용을 복습하기 위해 강의 자료를 기반으로 작성한 글입니다.
>
> * 제가 필요한 부분 위주로 확인하면서 정리하고 있어 글에 덜 작성된 부분이 있을 수 있습니다.
> * 글 작성 후 원 강의의 내용이 수정되거나 내용을 이해하기 위한 개인적인 설명이나 해석이 있을 수 있습니다. 되도록 원 강의를 참고해주시길 바랍니다.
> * 잘못된 부분이 있다면 댓글이나 그 외 편하신 방법으로 알려주시면 감사하겠습니다.

### Fontello

특정 문자에 해당하는 이미지로 이루어진 폰트를 제공하는 사이트.

* 원하는 아이콘을 선택한 뒤 (여러개 선택 가능) `Download webfont`를 누르면 다운로드한다.
* 선택 내역은 `config.json` 파일에 저장되고 선택 내역이 초기화 됐을 때 설정을 눌러 이 파일을 업로드하면 목록을 다시 불러올 수 있다.
* svg 파일을 받아서 사이트에 drag & drop 하면 나만의 아이콘 폰트를 만들 수 있다.

1. `demo.html`을 열어 다운받은 아이콘 리스트를 확인한다.
   * `show codes`를 누르면 각 이미지의 문자 값 (i.e. unicode)를 보여준다.
   * 이 값을 복사해서 `<body>` 부분에 붙여 넣어 사용 할 수 있다.

2. 아이콘을 사용하려는 html파일에 `fontello.css`를 링크 걸어준 뒤 아이콘을 사용할 태그에 `font-family: "fontello";`를 적용한다.
   * 폰트이기 때문에 관련된 속성을 모두 사용할 수 있다.

    ```css
    .font {
        font-family: "fontello";
        color: red;
        font-size: 200px;
    }
    ```

3. 아이콘 사용의 직관성을 높이기 위해 코드가 아닌 이름을 사용 할 수도 있다.
   * `demo.html`의 `show codes`를 체크 해제하면 이름이 표시된다.
   * 다음과 같은 코드로 아이콘을 입력 할 수 있다. `font-family` 속성 없이 아이콘 유지.

    ```html
    <i class = "font name"></i>
    ```

   * `:before`, `:after` pseudo selector를 이용해 태그 전후에 콘텐츠를 추가하는 것을 이용한다.

    ```css
    /* A 전후로 각각 s, e 추가: sAe */
    #test:before {
        content: "s";
    }
    #test:after {
        content: "e";
    }
    ```

    ```html
    <div id=test>A</div>
    ```

   * 지정한 `class`값 전에 아이콘 콘텐츠를 추가하도록 `css` 파일에 지정되어있다.

     ```css
     /* icon- 으로 시작하는 class명의 font-family를 fontello로 설정 */
     /* prefix는 사이트 설정에서 바꿀 수 있다. */
     [class^ = "icon-"]:before, [class* = "icon-"]:before {
         font-family: "fontello";
     }
     ```

4. Font에 animation을 주고 싶으면 `animation.css`를 링크한 뒤 css에 정의된 animation용 class 값을 넣어줌

### Buttons

디자인 된 버튼 라이브러리. Class 이름에 따라 다양한 크기, 형태, 색상의 버튼을 사용한다.

* 홈페이지에서 제공하는 `css`파일을 받아서 사용하려는 페이지에 링크한다.
* 원하는 element에 맞춰 홈페이지에서 안내하는 class 값을 지정해주면 된다.
* dropdown과 같은 동적 효과는 `js` 파일을 별도로 받은 뒤 script를 `<head>` 부분에 넣어준다.

## 참고

* [Fontello](https://www.fontello.com)
* [Buttons](https://www.unicorn-ui.com/buttons)
