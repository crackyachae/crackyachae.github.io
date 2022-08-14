---
layout  : article
title   : 5. BOM (Browser Object Model)
summary : 
date    : 2020-05-27 21:58:37 +0900
updated : 2020-05-28 15:24:40 +0900
tag     : draft
toc     : true
public  : true
parent  : [[/javascript/opent-client-web-js]]
latex   : false
---
* TOC
{:toc}

> 이 글은 생활코딩의 [BOM](https://opentutorials.org/course/1375/6628) 강의내용을 복습하기 위해 강의 자료를 기반으로 작성한 글입니다.
>
> * 제가 필요한 부분 위주로 확인하면서 정리하고 있어 글에 덜 작성된 부분이 있을 수 있습니다.
> * 글 작성 후 원 강의의 내용이 수정되거나 내용을 이해하기 위한 개인적인 설명이나 해석이 있을 수 있습니다. 되도록 원 강의를 참고해주시길 바랍니다.
> * 잘못된 부분이 있다면 댓글이나 그 외 편하신 방법으로 알려주시면 감사하겠습니다.

웹 브라우저에 관련된 객체를 모아놓은 것

## 전역객체 Window

모든 객체가 소속된 객체.

Console에 `window`를 입력하면 `window`에 속한 객체들을 볼 수 있다.

* e.g: `window.document`, `window.navigator`, `window.array`

`window`는 전역객체이다. 전역변수나 method가 아닌 일반 함수를 선언하면 모두 `window`에 속하게 된다.

* `alert('Hello world')`는 `window.alert('Hello world')`와 동일
* `a = 1`이면 `window.a`도 값을 1로 갖는다. 즉 `alert(a)`와 `alert(window.a)`는 모두 1을 표시.

## 사용자와 커뮤니케이션 하기

사용자가 입력한 정보를 받아서 처리하는 방법.

### alert

* 메시지를 표시하는 경고창.

* 변수에 담겨있는 값이나 함수가 return하는 값을 확인할 때 주로 사용했다. 요즘은 `console.log`를 많이 쓰는 추세.

```js
/* Hello world가 써진 경고창을 띄운다 */
alert('Hello world');
```

경고창이 떠 있는 동안은 그 다음의 코드가 실행되지 않는다.

```html
<input type="button" value="alert" onclick="alertfnc();">

<script>
    function alertfnc() {
        /* 1이 표시된 경고창의 확인 버튼을 누를 때까지 더 이상 진행되지 않는다. */
        alert(1);
        alert(2);
        alert(3);
    }
</script>
```

### Confirm

* 확인과 취소가 있는 경고창. 확인은 `true`를 취소는 `false`를 반환한다.

* 논리의 흐름을 분기시킬 수 있는 장치역할을한다.

```js
/* ok?가 써진 confirm창 표시 */
confirm('ok?');
```

```html
<input type="button" value="confirm" onclick="confirm_fnc();">

<script>
    function func_confirm() {
        /* 사용자가 확인을 누르면 true - ok 경고창 표시 */
        if(confirm('ok?')){
            alert('ok');
        }
        /* 취소를 누르는 경우 cancel 경고창 표시 */
        else {
            alert('cancel');
        }
    }
</script>
```

### Prompt

* 사용자가 입력한 값을 저장해서 이용할 수 있는 기능.

* 사용자의 입력 값을 return한다.

```js
/* 'id'가 표시되는 text field 입력 창이 표시 */
prompt('id');
```

```html
<body>
    <input type="button" value="prompt" onclick="func_prompt()" />
    <script>
        /* 간단한 로그인 기능 */
        function func_prompt(){
            /* prompt창에 입력한 값이 egoing이면 welcome 경고창 표시 */
            if(prompt('id?') === 'egoing'){
                alert('welcome');
            }
            /* 아니면 fail 경고창 표시 */ 
            else {
                alert('fail');
            }
        }
    </script>
</body>
```

## Location 객체

웹 브라우저에서 눈으로 보이지 않는 요소도 객체화되어있다. (e.g URL)

### 현재 윈도우의 URL 알아내기

```js
/* ,로 구분해서 동시에 두 여러 인자를 출력할 수 있다 */
console.log(location.toString(), location.href);
```

* 둘 다 현재 주소의 url을 출력한다.

* `location.toString()`: location 객체를 string 으로 출력
* `location.href`: location 객체의 `href`값을 출력. 좀 더 선호되는 방식이다.

```js
alert(loaction);
```

* 경고창에 현재 URL을 표시한다.

* `alert`는 문자열만 표시할 수 있기 때문에 `location`을 문자화 한 `location.toString()`이 경고창에 표시되는 것.
* 일반적으로 `console.log(location)`를 입력하면 URL이 아닌 location 객체에 대한 정보가 출력

### URL Parsing

URL을 분해해서 세부적인 property로 제공

| property | 의미 | Example |
| --- | --- | --- |
| `location.protocol` | 혅재 웹 페이지의 URL 프로토콜 | `https` |
| `location.host` | 서버(서비스)의 고유한 주소 | `opentutorials.org` |
| `location.port` | 서버에서 돌아가는 여러 소프트웨어의 종류를 식별하는 숫자 | `8080` |
| `location.pathname` | 구체적인 웹 페이지의 경로 | ...`/904/6634` |
| `location.search` | `?` 뒤의 정보들을 표시 | ...`?id=10` |
| `location.hash` | `#` 뒤의 정보들을 표시 | ...`#abc` |

### URL 변경하기

`location.href`는 현재 URL을 알려줄 뿐만 아니라 입력한 URL로 이동시켜 줄 수도 있다.

```js
/* egoing.net으로 이동 */
location.href = 'https://egoing.net';

/* location 객체만 써도 가능 */
location = 'https://egoing.net';
```

* 사용자를 다른 URL로 이동시켜야 할 때 사용한다.

* `location.href=location.href`를 이용하면 현재 페이지가 reload 된다.
* 다만 `location.reload()`를 사용하는게 더 용이하다.

## Navigator 객체

브라우저의 정보를 제공하는 객체

### Cross Browsing

* 브라우저의 종류는 다양하다: Chrome, Firefox, Internet Explorer, Opera, Safari 등.

* 브라우저에는 W3C와 ECMA에서 정한 웹 표준이 존재하지만 그 외에는 각 브라우저가 다르게 동작할 수 있다.
* 이런 이슈를 **cross browsing** 이슈라고하고 각 브라우저에 적절히 대응할 수 있도록 도와주는 게 navigator 객체이다.

`console.dir`로 객체의 모든 property를 열람할 수 있다.

```js
console.dir(navigator)
```

| property | 의미 |
| --- | --- |
| `appName` | 브라우저의 이름|
| `appVersion` | 브라우저의 정보 |
| `userAgent` | 브라우저가 서버에 신호를 전달할 때 전송하는 정보, User-agent HTTP 헤더의 내용 |
| `platform` | 브라우저가 동작하고 있는 운영체제 |

### 기능 테스트

* 브라우저에 사용하려는 API가 존재하는지 테스트하는 기능

* 브라우저는 계속 변하기 때문에 일일히 Navigator 객체로 대응하는 것은 한계가 있어 기능테스트를 진행한다.

```js
/* Object 객체고 key method를 갖니 않을 때 true가 되어 실행 */
if (!Object.keys) {
    /* Object.keys를 새로 정의 */
    Object.keys = (function () {
        ... 
    }());
}
```

* 브라우저마다 '다르게 동작'하는 것에 대해서는 대응이 불가하다.

## 창 제어

### window.open

새로운 창을 여는 기능

```html
<input type="button" onclick="open1()" value="window.open">
<input type="button" onclick="open2()" value="window.open">
<input type="button" onclick="open3()" value="window.open">
<input type="button" onclick="open4()" value="window.open">
<input type="button" onclick="open5()" value="window.open">
 
<script>
    /* 현재 폴더에 위치한 demo2.html파일을 연다. */
    function open1(){
        window.open('demo2.html');
    }

    /* 두 번째 인자에는 새 페이지가 열리는 방식을 지정한다. */
    function open2(){
        window.open('demo2.html', '_self'); // 현재 스크립트가 실행되는 창
    }
    function open3(){
        window.open('demo2.html', '_blank'); // 새 창
    }
    function open4(){
        window.open('demo2.html', 'ot'); // 동일한 이름의 창이 있다면 그 곳으로 문서가 로드된다.
    }

    /* 세 번째 인자에는 새 창의 크기를 지정한다. */
    function open5(){
        window.open('demo2.html', '_blank', 'width=200, height=200, resizable=no');
    }
</script>
```

### 새 창에 접근

\* 보안상의 이유로 실제 서버의 같은 도메인의 창에서만 작동한다.

```html
<body>
    <input type="button" value="open" onclick="winopen();" />
    <!-- 키를 누를 때 마다 입력된 값을 인자로 winmessage 함수 실행 -->
    <input type="text" onkeypress="winmessage(this.value)" />
    <input type="button" value="close" onclick="winclose()" />

    <script>
    /* demo2.html을 열어서 win에 할당 */
    function winopen(){
        win = window.open('demo2.html', 'ot', 'width=300px, height=500px');
    }
    /* win(demo2.html)에서 id값이 message인 항목을 입력받은 인자 값으로 교체 */
    function winmessage(msg){
        win.document.getElementById('message').innerText=msg;
    }
    /* 창을 닫음 */
    function winclose(){
        win.close();
    }
    </script>
</body>
```

### 팝업차단

브라우저는 웹 사이트가 사용자를 임의로 제어하는 것을 최대한 차단한다.

* 이 전의 예시처럼 하나의 페이지에서 다른 페이지를 제어할 때 도메인이 다른 페이지는 소유자가 다르다고 생각할 수 있기 떄문에 제어할 수 없다.
* `window.open`을 통한 윈도우 팝업도 버튼 클릭 등의 '사용자 인터렉션이 없이' 시행되는 경우는 일차적으로 차단된다.
