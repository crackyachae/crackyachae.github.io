---
layout  : article
title   : Tracks_Web 1
summary : 
date    : 2020-05-07 15:05:38 +0900
updated : 2020-05-14 10:30:12 +0900
tag     : draft
toc     : true
public  : true
parent  : [[/cs-basic/harvardx-cs50s-intro]]
latex   : false
---
* TOC
{:toc}

> 이 글은 CS50 x 2020의 [tracks web](https://cs50.harvard.edu/x/2020/tracks/web/) 강의내용을 복습하기 위해 작성한 글입니다.
>
> 내용을 이해하기 위한 개인적인 설명이나 해석이 있을 수 있기 때문에 되도록 원문을 참고해주시길 바랍니다.
> 잘못된 부분이 있다면 댓글이나 그 외 편하신 방법으로 알려주시면 감사하겠습니다.

## Introduction

인터넷에서 실행되는 프로그램을 만들어보기 위한 track이다.

인터넷의 기본과 어떻게 동작하는지를 먼저 배운 뒤, HTML, CSS, JavaScript와 같은 인터넷에서의 언어, 웹 페이지를 application으로 바꾸기 위한 Python에서의 framework와 SQL에 대해 배운다.

## HTTP

컴퓨터는 네트워크를 이용해 서로에게 메시지를 주고 받으면서 소통한다.

가장 기본적으로 메시지를 주고 받기위해 따라야 하는 규칙인 standard protocol이 존재한다.  인터넷의 standard protocol은 **TCP/IP** 로 Transmission Control Protocol과 Internet Protocl이다.

### IP Address

보다 쉽게 이해하기 위해 이를 수신자와 발신자의 주소가 적혀있는 편지를 주고 받는 상황으로 생각해볼 수 있다.

인터넷에는 각 컴퓨터가 **IP address**를 가지며 일반적으로 `#.#.#.#`의 형식을 따른다.
즉, 우리가 보내려는 digital envelope에는 메시지를 보내고 싶은 컴퓨터의 주소인 `1.2.3.4`와 답장을 받을 수 있도록 우리의 주소인 `5.6.7.8`이 써져있다.

위에서 사용한 IP 주소는 각 자리의 숫자가 1 byte로 총 32 bits이다. 이는 4 billion개 정도로 굉장히 많지만 전 세계의 device의 수가 이를 넘어가면서 32-bit를 사용하는 protocol인 IPv4\* 뿐만 아니라 128-bit를 사용하는 IPv6도 사용하기 시작했다.

\* 아마 IP version 4

### Port Number

Digital envelope에는 수신자의 주소 뿐만 아니라 **port number**도 정확히 적어주어야 한다.

Port number는 특정 서비스나 이메일, 웹 페이지, 파일과 같은 메시지의 유형을 알려주는 숫자로 `1.2.3.4:80`과 같이 IP address뒤에 붙여서 적는다. 이를 이용해 수신자의 컴퓨터가 들어오는 메시지에 맞춰 적절한 프로그램을 사용할 수 있다.  

대표적인 port number로는 다음과 같은 것들이 있다:

| Service | Port  |
| :-----: | :---: |
|   FTP   |  21   |
|  SMTP   |  25   |
|  HTTP   |  80   |

### DNS

하지만 우리가 일반적으로 방문하는 웹 사이트의 주소는 `example.com`과 같은 형태로 위와 다르다.  이는 **DNS (Domain Name System)** 을 사용해 도메인 이름을 입력해도 서버의 IP address가 응답할 수 있도록 도메인 이름과 IP 주소를 mapping했기 때문이다.

다음과 같이 예시를 들어볼 수 있다:

|     URL     |  IP Address   |
| :---------: | :-----------: |
| google.com  | 172.217.7.206 |
| Harvard.edu | 23.22.75.102  |
|  Yale.edu   | 104.16.243.4  |

### HTTP

URL을 정확히 표시하면 `http://www.example.com`의 형태이고 이 때 HTTP는 또 다른 protocol인 HyperText Transfer Protocol의 약자로 digital envelope 안의 콘텐츠 유형을 나타낸다.

HTTP로 요청된 콘텐츠는 다음과 같은 모습이다:

```
GET / HTTP/1.1
Host: www.example.com
...
```

* `GET`: 현재 무엇을 할 것인가를 나타내는 parameter로 `GET`은 말 그대로 무엇인가를 '얻을' 때 쓰인다.

* `/`: 가장 상위폴더인 root를 의미한다.
* `HTTP/1.1`: 현재 사용하고자 하는 protocol의 버전이다.
* `Host`: 요청을 보낼 사이트의 주소이다.
* 그 외에 중요도가 낮은 추가 정보들이 존재한다.

요청에 대한 응답은 다음과 같은 모습이다:

```
HTTP/1.1 200 OK
Content-Type: text/html
...
```

* `200 OK`: 현재 HTTP의 상태를 나타내는 코드로 `200`은 `OK`를 의미한다.

* `Content-Type`: 현재 콘텐츠의 유형을 설명하는 부분으로 웹 페이지가 `HTML`을 사용해서 웹 페이지의 콘텐츠를 표시하고 있음을 알 수 있다.

대표적인 status code로는 다음과 같은 것들이 있다:

| Status Code |        Status         |
| :---------: | :-------------------: |
|     200     |          OK           |
|     301     |   Moved Permenantly   |
|     403     |       Forbidden       |
|     404     |       Not Found       |
|     500     | Internal Server Error |

크롬 개발자 도구의 "Network" 탭에 들어간 뒤 `google.com`에 접속해서 첫 항목인 `google.com`을 확인하면 우리가 보낸 Request Header과 서버로 부터 받은 Response Headers를 확인할 수 있다.

![response headers](post-img/harvardx-cs50s-intro-tracks-web-1/111032060-eb4d6c00-844d-11eb-9a30-ecd5f5216de2.png)

* 첫 response는 `301 Moved Permanently`로 일반적인 URL 형식은 `www`로 시작하기 때문에 `http://www.google.com`으로 이동한다.
* 다음으로 우리는 다시 `https://www.google.com`으로 이동한다. `https`는 보안된 버전의 HTTP이다.
* 마지막으로 `https://www.google.com` 확인해보면 status code가 `200 OK` 이다.

## HTML

다음으로, 실제 우리가 얻는 데이터를 보기위해 크롬 개발자 도구의 "Source" 탭으로 가면 HTML을 볼 수 있다. HTML(HyperText Markup Language)은 웹 페이지에 텍스트를 기반으로 한 콘텐츠를 만드는 언어이다.

간단한 HTML 페이지의 구성은 다음과 같다:

```html
<!DOCTYPE html>

<html>
    <head>
        <title>
            Hello!
        </title>
    </head>
    <body>
        Hello World!
    </body>
</html>
```

* `<!DOCTYPE html>`: 브라우저에게 현재 페이지의 버전과 형식을 알린다.
* `<html>`: HTML 콘텐츠가 시작.
    * HTML은 여러 tag들이 중첩되어 tree structure를 이루고 있다.
    * 대부분의 tag는 opening tag와 closing tag가 쌍을 이루고 있어 페이지의 구성을 파악할 수 있다.
    * `<tag>`: opening tag, `</tag>`: closing tag
* `<head>`: 웹 페이지에 대한 정보인 metadata를 포함하는 영역
    * `<title>`: 웹 페이지의 제목을 정의하는 태그로 웹 브라우저의 탭에 그 내용이 표시된다.
* `<body>`: 브라우저에 표시되는 콘텐츠들을 포함하는 영역

위 예시의 `<body>` 영역에 다양한 태그들을 사용해서 콘텐츠를 채울 수 있다.

### Image

이미지를 삽입하기 위해서는 `<img>` 태그를 사용한다.

`<img>` 태그는 추가적인 parameter인 속성(attributes)를 추가해야햔다.

```html
<img src="cat.jpg" alt="cats">
```

* `scr`: 이미지의 source를 나타내는 속성

* `cat.jpg` 사용할 이미지 소스로 `scr`의 속성값이다.
* 필수적이진 않지만 이미지가 모종의 이유로 표시되지 않을 때 이를 대신할 alternative text를 `alt`로 입력할 수 있다.

이미지 안에 다른 태그가 존재할 필요가 없기 때문에 `<img>` 태그는 closing 태그가 존재하지 않는다.

### Link

페이지 사이를 연결하기 위한 링크를 만들기 위해서는 anchor 태그인 `<a>` 태그를 사용한다.

`<a>` 태그에는 `href` 속성을 사용해서 이동하고자 하는 URL을 속성값으로 사용한다.

```html
<a href="https://harverd.edu">Harverd</a>
```

URL로 이동하기 위한 텍스트는 아무거나 쓸 수 있고, 악용될 여지가 있으므로 링크를 타고 이동할 때 URL에 신경써야한다.

```html
<!-- Bank of America와 유사한 bank.html 페이지를 만들어 놓고 Bank of Americal인 척 하는 경우 -->
Visit <a href="bank.html">Bank of America</a>
```

### Header and Paragraphs

`<p>` 태그를 이용해 문단(paragraphs)을 추가하거나 `<h1>`, `<h2>` 등의 태그를 이용해 제목(header) element를 추가한다.

```html
<h1>This is header</h1>

<p>This is paragraph 1.</p>
<p>This is paragraph 2.</p>
<p>This is paragraph 3.</p>
```

### table의타내기 위한 element가 존재하므로 그것을 사용하는 것이 좋다

* `<tr>`

표를 만들기 위해서는 `<table>` 태그를 사용한다.

```html
<table>
  <tr>
    <td>cell 1</td>
    <td>cell 2</td>
    <td>cell 3</td>
  </tr>
  <tr>
    <td>cell 4</td>
    <td>cell 5</td>
    <td>cell 6</td>
  </tr>
</table>
```

* 표 전체는 `<table>` 태그로 생성한다.

* 표의 행은 `<table>` 태그 안에 `<tr>`태그로 생성한 뒤 그 안에 `<td>` 태그로 열을 구분해 각 셀의 내용을 입력한다.

### Form

형식 문서(form)은 `<input>` 태그를 사용해서 만든다.

```html
<form>
  <input type="text">
  <input type="submit" value="Submit Form">
</form>
```

* `type`의 속성값에 따라 element의 종류가 달라진다.
    * `text`: 텍스트를 입력할 수 있는 element
    * `submit`: 제출 버튼 역할을 하는 element

form이 제대로 작동하기 위해서는 form이 행할 기능을 추가해줘야 한다.
예를 들어 [Google 검색](https://www.google.com/search)을 이용해서 submit한 text의 구글 검색 결과를 표시하는 form을 만들 수 있다.

`text`를 검색해서 넘어가는 구글의 검색 결과 페이지의 주소를 확인해보면 원 주소 뒤에 `?q=text`이 붙는다.

* `?`: 일부 HTTP에서 parameter를 얻는(GET)다는 것을 의미낸다.
* `q`: query의 의미로 parameter 역할.
* `text`: value

이를 이용해서 `<form>`에 다음과 같은 속성을 줘 submit 버튼을 누르면 `https://www.google.search?q=text`로 이동하는 form을 만들 수 있다.

```html
<form action="https://www.google.com/search" method="get">
  <input name="q" type="text">
  <input type="submit" value="Submit Form">
</form>
```

이 외에도 다양한 태그들이 존재하며 검색을 통해 알아보면 된다.

## CSS

웹 페이지를 꾸미기 위해서는 CSS(Cascading Style Sheets)라는 다른 언어를 사용한다.

### Style Attribute

우선 HTML에 `style`이라는 속성과 그 값을 `style="color: blue;"`와 같이 입력한다. 이처럼 `style`에 입력한 key-value로 이루어진 속성값은 브라우저가 element를 표시하는 방식을 바꾼다.

```html
<body>
  <h1 style="color: blue;">Hello, world!</h1>
  <p style="color: blue;">This is my web page.</p>
</body>
```

`<body>`에 style을 추가하면 `<body>`에 속한 모든 element가 그 스타일을 상속(inherit)받아 똑같이 적용된다. 별도로 다른 속성값을 갖고있는 element에는 상속되지 않는다.

```html
<!-- h1과 p의 내용 모두 파란색 -->
<body style="color: blue;">
  <h1>Hello, world!</h1>
  <p>This is my web page.</p>
</body>

<!-- h1은 빨간색, p는 파란색 -->
<body style="color: blue;">
  <h1 sytle="color: red;" >Hello, world!</h1>
  <p>This is my web page.</p>
</body>
```

문단 정렬이나 font의 크기도 바꿀 수 있고 여러개의 속성 값을 semicolon(`;`)으로 구분해서 한 번에 적을 수도 있다.

```html
<body style="color: blue;">
  <h1>Helllo, world!</h1>
  <p style="text-align: center; font-size: large;">This is my web page.</p>
</body>
```

### Selector

웹 페이지에는 동일한 종류의 element가 여러개 쓰일 수 있고 `<head>`영역에 `<style>` 태그를 추가해서 공통된 style 목록을 추가할 수 있다.

예를 들어 모든 `h2` element만 특정한 style을 갖도록 설정할 수 있다.

```html
<head>
  <style>
    h2
    {
      text-align: center;
      color: blue;
    }
  </style>
</head>

<body>
  <h1>Hello, world!</h1>

  <h2>Subsection 1</h2>

  <p>This is some text.</p>

  <h2>Subsection 2</h2>
</body>
```

### Class

다양한 종류의 element에 동일한 style을 적용시키고 싶다면 **class**를 설정해주어야 한다.

* 마치 이름표처럼 element의 종류나 그 수에 상관없이 class를 부여할 수 있다.
    * 하나의 element에 여러개의 class를 부여할 수도 있다.
    * 여러개의 class는 공백(space)으로 구분한다.
* `class="title"`처럼 class 속성에 원하는 속성값을 정해서 원하는 element에 적어주면 된다.

CSS에서는 `.title` 사용해서 해당 class 값을 가진 모든 element를 선택할 수 있다.

```html
<head>
  <style>
    .title
    {
      text-align: center;
    }
    .green
    {
      color: green;
    }
  </style>
</head>

<!-- class가 title인 h1, h2에 효과 적용 -->
<body>
  <h1 class="title green">Hello, world!</h1>

  <h2 class="title">Subsection 1</h2>

  <p class="green">This is some text.</p>

  <h2 class="title">Subsection 2</h2>
</body>
```

### Link

CSS 파일을 별도의 `style.css`로 나눠서 html에 포함시킬 수도 있다. 이렇게 하면 모든 웹 페이지가 동일한 style을 공유할 수 있게된다.

`<link>`태그를 이용해서 html파일에 연결시키면 되며 여러개의 다른 CSS파일을 포함시키는 것도 가능하다.

```html
<head>
  <link rel="stylesheet" href="style.css">
</head>
```

```css
/* style.css */
.title
{
  text-align: center;
}
.green
{
  color: green;
}
```

### Table

CSS로 table의 style을 바꿀 수 있다.

```css
/* table 전체 테두리 설정 */
table
{
  border: 1px solid black;
  /* 겹테두리를 없애줌 */
  border-collapse: collapse;
}
/* 각 cell의 테두리 설정 */ 
td
{
  border: 1px solid black;

  /* cell에 여백을 준다. */
  padding: 5px;
}
```

table의 header를 표시하기 위해 첫 행에 `header` class를 줘서 설정할 수도 있지만 html에 table의 header를 나타내기 위한 `<th>` element가 존재하므로 그것을 사용하는 것이 좋다.

```html
<table>
  <tr>
    <th>header 1</th>
    <th>header 2</th>
    <th>header 3</th>
  </tr>
  <tr>
    <td>cell 1</td>
    <td>cell 2</td>
    <td>cell 3</td>
  </tr>
</table>
```

### Libraries

다른 사람들이 만들어 놓은 여러 CSS library를 사용하면 보편적을 사용되는 element와 style을 빠르게 적용할 수 있다.

대표적으로 [Bootstrap](https://getbootstrap.com)의 documentation으로 가면 우리가 Bootstrap의 CSS파일을 사용할 수 있도록 하는 `<link>` element를 제공하고 있다.

* Documentation에는 우리가 사용할 수 있는 여러 components와 그 style을 바꿀 수 있는 class들이 있다.
* 주로 보이는 `<div>` HTML element는 평범한 container나 section으로 쓰이는 태그로 해당되는 semantic 태그가 없는 element에 사용된다.

## JavaScript

사용자와 상호작용 할 수 있는 웹 사이트를 만들기 위해서는 브라우저에서 웹 페이지를 바꾸는 code를 실행하기 위한 programming language가 필요하다.

그 역할을 하는 것이 JavaScript로 이전에 배운 C와 유사한 문법으로 작동한다.

### Variable

```c
/* C */
int counter = 0;
counter = counter + 1;
counter += 1;
counter++;
```

```js
/* JavaScript */ 
let counter = 0;
counter = counter + 1;
counter += 1;
counter++;
```

* C와 다르게 Data type을 명시해 줄 필요가 없다. 모든 변수에 `let` 사용

### Conditions & Loops

```c
/* C & JavaScript: Conditions */
if (x < y)
{

}
else if
{

}
else
{

}

/* C & JavaScript: Conditions */
while (true)
{

}
```

* 조건문과 `while` 반복문은 C와 JavaScript에서 동일하다.

```c
/* C: for Loops*/
for (int i = 0; i < 50; i++)
{

}
```

```js
/* JavaScript: for Loops */
for (let i = 0; i < 50; i++)
{

}
```

* `for` 반복문도 형식은 동일하고 `i`변수 선언만 다르게 해준다.

### Functions

```c
/* C */
void cough(int n)
{

}
```

```js
/* JavaScript */
function cough(n)
{

}
```

* JavaScript는 function과 parameter의 type을 선언 할 필요가 없다.

* function type 대신 `function`만 선언

### DOM (Document Object Model)

웹 페이지의 구조를 보면 현재 element 안에 nested된 element들은 현재 element와 node로 연결되어 현재 element의 child element로 존재한다. 예를 들어 `<html>`태그 안에는 `<body>` 태그와 `<head>` 태그가 존재하며 `<head>` 태그는 `<title>` 태그를 포함한다. 이를 이미지로 나타내면 아래와 같고 아는 tree의 형태이다.

![tree structure](/post-img/harvardx-cs50s-intro-tracks-web-1/111032061-ec7e9900-844d-11eb-88ca-ae41bb0ab106.png)

* 사각형: Elements (Tags)
* 모서리가 둥근 사각형: Contents

이와 같은 구조를 Document Object Model이라고 하고 JavaScript를 이용하면 페이지를 새로고침 할 필요 없이 이 구조를 수정할 수 있다.

### JavaScript in Browser

`<head>` 태그 안에 `<script>` 태그를 사용하면 웹 페이지에서 JavaScript를 사용할 수 있다.

예를 들어, 웹 페이지에 경고창을 띄우기 위해서는 built-in function인 `alert()`를 호출해 사용한다.

```html
<script>
  /* Says hello when visiting web page */
  alert('Hello!');
</script>
```

* String은 `''`나 `""` 모두를 이용해서 감쌀 수 있지만 일관되게 유지하는 것이 좋다.
* CS50 IDE에서 파일을 저장한 뒤 `http-server` 명령어를 이용해 서버를 작동시켜 만든 웹 페이지를 확인할 수 있다.

특정 행위를 수행했을 때만 함수를 호출하도록 form(i.e submit 버튼)을 추가할 수도 있다.

```js
/* button을 눌렀을 때만 alert가 뜨도록 함수를 생성 */
function greet()
{
  alert('Hello!')
}
```

```html
<form onsubmit="greet(); return false;">
  <input type="submit">
</form>
```

* `onsubmit`: Submit 했을 때만 속성값이 동작.

* `return false`: form이 함수를 호출한 뒤 submit한 페이지로 넘어가는 기본 동작(default behavior)을 막기 위해 `false`를 반환하도록 지정한다.

Form에 text 입력을 만들고 JavaScript가 입력받은 값을 이용해 사용자에 맞춘 text를 출력할 수도 있다.
조건문을 사용해서 입력이 없는 경우에 대응할 수 있다.

```js
function greet()
{
  /* id가 name인 element의 value 속성값을 name 변수에 저장 */
  let name = document.querySelector('#name').value

  /* 조건문 사용: 아무것도 입력하지 않을 경우 name이 world가 되도록 함 */
  /* JavaScript는 === 사용 */
  if (name === '')
  {
    name = 'world';
  }
  /* Hello, '입력받은 이름'! 출력 */
  alert('Hello, ' + name + '!');
}
```

```html
<form onsubmit="greet(); return false;">
  <!-- text input에 id 부여 -->
  <input type="text" id="name">
  <input type="submit">
</form>
```

* Text를 입력받는 element를 특정하기 위해 속성으로 id를 부여한다. `id="name"`
* JavaScript에서 `document.querySelector('#name')`를 이용해 특정한 query를 만족시키는(e.g `#name`) element를 document에서 선택한다.
* `.value` 선택한 element의 value값을 알아낸다.

### Manipulation

DOM으로부터 content를 읽어들이는 것 뿐만 아니라 `innerHTML` 속성을 이용해 element의 content를 직접 변경할 수도 있다.

```js
function greet()
{
  let name = document.querySelector('#name').value
  if (name === '')
  {
    name = 'world';
  }

  /* 선택 element의 내용을 대입 값으로 변경 */
  document.querySelector('#result').innerHTML = 'Hello, ' + name + '!'
}
```

```html
<!-- 위와 동일하게 특정 <div> 태그를 referencing하기 위해 id를 지정 -->
<div id="result">
  Hello!
</div>
```

### Counter

버튼을 누를 때 마다 값이 증가하는 변수인 counter를 생성.

```js
let counter = 0;

function increment()
{
  /* counter 변수를 1 증가시킴 */
  counter++;
  /* DOM의 내용을 update */
  document.querySelector('#result').innerHTML = counter;
}
```

```html
<!-- submit 버튼 -->
<form onsubmit="increment(); return false;">
  <input type="submit">
</form>

<!-- 내용 -->
<div id="result">
  0
</div>
```

### Console

브라우저에서도 변수를 변경하거나 함수를 호출하는 일을 할 수 있다.

크롬(Chrome) 브라우저에서 보기 > 개발자 > 개발자 도구로 간 뒤 **console** 탭을 이용하면 입력한 JavaScript 코드가 페이지에서 실행된다.

웹 페이지의 JavaScript 코드에 오류가 있을 때도 console에 그 내용이 표시된다.

### Style Change

페이지의 style을 바꿀 수도 있다.

웹 페이지의 배경색을 변경시키는 세 개의 버튼을 만든 뒤 버튼이 눌렸을 때 웹 페이지의 배경색 style이 바뀌도록 하기 위해서:

* 버튼의 onclick property를 함수로 지정해서 버튼이 눌리면 함수가 호출되도록 한다.
    * 이 때 대입 값을 `function() { ... }`의 꼴로 직접 적으면 함수의 이름이 없는 anonymous function을 만들어 사용할 수 있다.
    * 여러번 동작할 필요가 없는 함수를 정의하는데 유용하다.
* 각 함수에서 querySelector로 `body` 태그를 선택한 뒤 `style`의 `backgroundColor` 속성을 원하는 색상으로 지정하면 된다.

```js
/* 변수를 이용해 반복을 줄일 수 있음 */
let body = document.querySelector('body')

/* Onclick: 버튼을 클릭했을 때 */
/* id가 특정 색상인 버튼을 클릭했을 때 배경색을 해당 색상으로 변경 */
document.querySelector('#red').onclick = function() {
  document.querySelector('body').style.backgroundColor = 'red';
}
document.querySelector('#green').onclick = function() {
  document.querySelector('body').style.backgroundColor = 'green';
}
document.querySelector('#blue').onclick = function() {
  document.querySelector('body').style.backgroundColor = 'blue';
}
```

```html
<!-- R, G, B 버튼 -->
<button id="red">R</button>
<button id="green">G</button>
<button id="blue">B</button>
```

코드를 위의 순서로 입력하면 동작하지 않는다.

* console에서 원인을 찾아보면 id가 red인 element가 있음에도 onclick을 수행할 대상이 NULL상태여서 수행 불가하다는 오류가 표시된다.
* 이는 코드가 위에서 아래로 가기 때문에 버튼 element보다 JavaScript 코드가 먼저 나와서 버튼을 인식하지 못했기 때문이다.

해결하는 방법은 여러가지지만 가장 간단하게는 `<script>` 코드가 버튼 코드보다 아래 위치하도록 순서를 바꿔 해결할 수 있다.

### Event Handler

`onclick` 함수는 어떤 이벤트(event)가 발생했을 때 호출되는 **event handler**이다.

Event handler는 여러 종류가 있고 다른 예로 dropdown 메뉴(i.e `<select>` element)의 다른 옵션을 선택했을 때 호출되는 `onchange`가 있다. `onchange`를 이용해서 선택한 dropdown 메뉴에 따라 폰트의 크기가 바뀌는 함수를 만들 수 있다.

```js
/* font의 크기를 this의 값으로 설정 */
document.querySelector('select').onchage = function() {
  document.querySelector('p').style.fontSize = this.value;
}
```

```html
<p>Thie is some text.</p>

<!-- dropdown메뉴를 생성하는 select element -->
<select>
  <option value="large">Large Text</option>
  <!-- selected를 사용하면 default로 선택되어있음 -->
  <option value="initial" selected>Medium Text</option>
  <option value="small">Small Text</option>
</select>
```

* `this`는 함수가 호출 된 맥락을 포함하는 특별한 변수로 볼 수 있고 이 경우 `onchange` event handler를 촉발시킨 대상(이벤트)를 가리킨다.
* 즉 handler function 안의 `this.value`는 방금 선택 된 `<option>`의 `value`를 의미한다.

### Update Automatically (Period)

웹 페이지의 contents를 `window.setInterval`을 이용해 일정 시간마다 바꿀 수 있다. `window.setInterval`은 특정 함수를 일정 시간마다 호출하는 함수이다.

이를 이용해서 `body`의 visibility(visible, hidden)를 바꾸는 `blink()` 함수를 만들 수 있다.

```js
function blink()
{
  let body = document.querySelector('body');

  if (body.style.visiblity === 'hidden')
  {
    body.style.visibility = 'visible';
  }
  else
  {
    body.style.visibility = 'hidden';
  }

  /* arguments: what function, how often in ms */
  window.setInverval(blink, 500)
}
```

```html
hello, world!
```

### Seperate File

CSS 파일처럼 JavaScript도 코드를 `blink.js`와 같은 개별 파일로 분리한 뒤 `<script src="blink.js">`를 이용해 HTML 파일에 포함시킬 수 있다.

### Location

마지막으로 `navigator.geolocation.getCurrentPosition`을 이용해서 브라우저에 사용자의 위치를 표시할 수 있다.

* `getCurrentPosition`의 argument로는 callback function을 넘겨주어야 하고 넘겨준 함수는 `getCurrentPosition`이 실행을 마치면 호출된다.
* Callback function에서 얻은 위치의 좌표를 페이지에 적도록 해준다.

```js
navigator.geolocation.getCurrentPosition(function(position) {
  document.write(position.coords.latitude + ', ' + position.coords.longitude
  );
});
```

## Homepage

Problem Set 1: HTML, CSS, JavaScript로 Homepage를 만들기
