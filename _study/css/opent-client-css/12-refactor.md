---
layout  : article
title   : 12. 유지보수
summary : 
date    : 2020-04-11 17:36:57 +0900
updated : 2020-04-28 16:09:26 +0900
tag     : draft
toc     : true
public  : true
parent  : [[/css/opent-client-css]]
latex   : false
---
* TOC
{:toc}

> 이 글은 생활코딩의 [유지보수](https://opentutorials.org/course/2418/13467) 강의내용을 복습하기 위해 강의 자료를 기반으로 작성한 글입니다.
>
> * 제가 필요한 부분 위주로 확인하면서 정리하고 있어 글에 덜 작성된 부분이 있을 수 있습니다.
> * 글 작성 후 원 강의의 내용이 수정되거나 내용을 이해하기 위한 개인적인 설명이나 해석이 있을 수 있습니다. 되도록 원 강의를 참고해주시길 바랍니다.
> * 잘못된 부분이 있다면 댓글이나 그 외 편하신 방법으로 알려주시면 감사하겠습니다.

## Link와 Import

동일한 css가 적용된 웹 페이지가 여러개일 때, 수정사항을 일괄적으로 적용할 수 있도록 해준다.

1. 여러개의 웹 페이지에 중복된 css가 있을 때, 중복된 코드를 별도의 css파일 (e.g `style.css`)를 따로 작성한다.
2. `link`나 `import`를 이용해서 웹페이지가 `style.css`를 다운받아 적용할 수 있도록 한다.

   ```html
   <!-- link 이용 -->
   <!-- href에 걸린 파일을 다운 받아서 rel값(css)의 문법에 따라 해석해 적용 -->
   <link rel="stylesheet" href="style.css">
   ```

   ```html
   <!-- import 이용 -->
   <style>
        @import url("style.css")
   </style>
   ```

3. 링크로 `style.css`를 걸어놓은 모든 문서는 `style.css`만 수정하면 일괄적으로 수정된다.

## 코드 경량화 (minify)

* 서버와 클라이언트 사이의 데이터 이동을 줄이기 위해 코드의 불 필요한 부분을 줄이는 것
* 코드를 minify 해주는 다양한 도구들이 있고 대표적으로 [clean-css](https://github.com/jakubpawlowicz/clean-css)를 많이 사용한다.

clean css를 이용하면 코드가 다음과 같이 축약된다.

```css
/*minify전: style.css*/
h1 {
    color: tomato;
}
```

```css
/*minify후: style.min.css*/
/*minify 시킨 파일은 파일명 뒤에 .min을 붙여 표시한다*/
h1{color:tomato}
```

**clean-css**는 다음과 같은 방법으로 사용할 수 있다.

1. [온라인](http://adamburgess.github.io/clean-css-online/)
2. 에디터의 확장 프로그램
3. 명령어 ([node.js](https://opentutorials.org/module/2026/11852)를 이용해서 설치해서 이용)

## CSS 뛰어넘기 (Preprocessor)

css에 보다 편리한 기능을 더한 새로운 언어를 이용한다.

* 해당 언어의 문법(syntax)에 따라 코드를 작성한 뒤 CSS로 변환(compile)하여 사용한다.
* `lesscss`, `sass`, `stylus` 등

## Example: Stylus

예를 들어 `stylus`를 사용하면 다음과 같은 `css` 코드를 보다 편하게 나타낼 수 있다.

```css
/*CSS*/

body{
    font: 14px/1.5 Helvatica, arial, sans-serif;
}
body #logo {
    border-radius: 5px;
}
```

```css
/*Stylus*/

body{
    font: 14px/1.5 Helvatica, arial, sans-serif

    /*body 안의 #logo 태그를 보다 직관적으로 나타내고*/
    /*선택자를 적을 때 상위태그인 body태그를 계속 중복해서 적어주지 않아도 됨*/
    #logo {
        border-radius: 5px
    }
}
```

### Stylus 이용

#### 에디터의 확장 프로그램 (Stylus auto compiler)

* `.styl`파일을 생성하여 stylus로 작성한 뒤 저장하면 이를 compile한 `.css`파일이 생성
* Compile 옵션은 `.styl`파일 상단에 주석처럼 표기해서 조절한다.

```css
/*style.styl*/

/*compile 옵션 설정*/
/*output 파일 이름: style.css. compress(minify 옵션): 켬*/
// out: style.css, compress: true

body {
    color: blue;
    h1 {
        font-size: 10px;
        text-align: center;
    }
}
```

Compile 결과:

```css
/*style.css*/

body{color:blue;} body h1{font-size:10px;text-align:center;}
```

#### 명령어

* `node.js`를 설치한 뒤 `npm`을 이용해서 stylus를 설치한다.

  ```
  npm install stylus -g
  ```

* stylus `.styl`파일명 -o `.css`파일명으로 적어서 `.styl`파일을 `.css`파일로 compile한다.

  ```
  stylus style.styl -o style.css
  ```

* `.styl` 파일명 앞에 -w 옵션을 넣으면(watch를 의미) `style.styl`의 변경사항을 저장할 때마다 자동으로 `style.css`파일을 compile한다.

  ```
  stylus -w style.styl -o style.css
  ```

생성된 `style.css`를 `.html`파일에 링크해서 사용하면 된다.

### Stylus Syntex

Stylus의 기본적인 문법. 예시 및 추가사항은 Stylus 사이트의 [TRY STYLUS ONLINE](https://stylus-lang.com/try.html)을 참고

* Nesting: Selector를 nesting 방식으로 쓸 수 있다.
* Flexible syntax: `;` (semicolon), `{}` (braclet)등을 생략할 수 있다.
* Parent reference: 현재 태그의 parent selector들을 `&`로 대신 표기해서 쓸 수 있다.

  ```css
  /*Stylus*/

  ul
  li a {
    display: block
    color: blue
    padding: 5px
    /*&가 ul li a로 치환*/
    html.ie & {
      padding: 6px
    }
  }
  ```

  ```css
  /*css*/

  ul li a {
      display: block;
      color: #00f;
      padding: 5px;
  }
  html.ie ul li a {
      padding: 6px;
  }
  ```

* Mixins: 함수처럼 동작하는 치환용 code를 만들어 사용할 수 있다.

  ```css
  /*Stylus*/

  /*vendor prefix를 한 번에 쓸 수 있는 border-radius 속성을 만듦*/
  /*val에 값을 넣으면 모든 val로 표시된 모든 속성에 적용*/
  border-radius(val) {
      -webkit-border-radius: val
      -moz-border-radius: val
      border-radius: val
  }
  button {
      border-radius(5px);
  }
  ```

  ```css
  /*css*/

  button {
      -webkit-border-radius: 5px;
      -moz-border-radius: 5px;
      border-radius: 5px;
  }
  ```

* Trnasparent mixins: 위의 가능을 좀 더 css 문법처럼 사용.

   ```css
  /*Stylus*/

  /*val 대신 arguments 이용*/
  border-radius() {
      -webkit-border-radius: arguments
      -moz-border-radius: arguments
      border-radius: arguments
  }
  button {
      border-radius: 5px 10px;
  }
  ```

  ```css
  /*css*/

  button {
      -webkit-border-radius: 5px 10px;
      -moz-border-radius: 5px 10px;
      border-radius: 5px 10px;
  }
  ```

* Variables: Variable을 만들어 값을 입력해서 사용 가능. Variable을 사용하면 일괄 수정에 용이하다.

  ```css
  /*Stylus*/

  #prompt {
      width: w = 200px
      margin-left: -(w / 2)
  }
  ```

  ```css
  /*css*/

  #prompt {
      width: 200px;
      margin-left: -100px;
  }
  ```

* Block property access: 같이 nesting 되어있는 다른 속성의 값을 `@속성명`으로
치환해서 사용할 수 있다.

  ```css
  /*Stylus*/

  #prompt {
      width: w = 200px
      margin-left: -(@width / 2)
  }
  ```

  ```css
  /*css*/

  #prompt {
      width: 200px;
      margin-left: -100px;
  }
  ```
