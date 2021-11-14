---
layout  : article
title   : Basic usage of canvas
summary : 
date    : 2021-05-31 19:33:17 +0900
updated : 2021-06-08 14:28:12 +0900
tag     : draft
toc     : true
public  : true
parent  : [[mdn-canvas-tutorial]]
latex   : false
---
* TOC
{:toc}

> 이 글은 MDN Web API의 [Canvas Tutorial](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial) 중 [Basic usage of canvas](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Basic_usage)의 내용을 번역 및 정리한 글입니다.
>
> * 제가 필요한 부분 위주로 확인하면서 정리하고 있어 글에 덜 작성된 부분이 있을 수 있습니다.
> * 글 작성 후 원문의 내용이 수정되거나 내용을 이해하기 위한 개인적인 설명이나 해석이 있을 수 있습니다. 되도록 원문을 참고해주시길 바랍니다.
> * 잘못된 부분이 있다면 댓글이나 그 외 편하신 방법으로 알려주시면 감사하겠습니다.

## The `<canvas>` element

```html
<canvas id="tutorial" width="150" height="150"></canvas>
```

캔버스 요소는 그림을 그리기 위한 HTML 요소이다.

* 스크립트 언어(e.g., JavaScript)를 사용해 그림을 그린다.
* 예를 들어 그래프, 사진, 간단한 애니메이션 등을 만들 수 있다.

`<canvas>`는`src`, `alt` 속성이 없다는 것 외에는 `<img>` 요소와 비슷하다.

* `width`, `height` 두 속성값만을 갖는다.
    * 두 속성값은 필수로 입력해야 하는 것은 아니며
    * 기본값은 너비는 300px, 높이는 150px 이다.

스타일 속성의 `width`, `height`이나 CSS를 이용해서 캔버스 크기를 조절할 수도 있지만 `width`, `height` '속성'과는 구분해야 한다.

* 웹 페이지에서 보이는 캔버스 크기는 캔버스 '스타일'의 `width`, `height` 값에 영향을 받는다.
* 캔버스 안의 '내용(content)'은 캔버스의 `width`, `height` 속성에 영향을 받는다.
* 캔버스 속성과, 캔버스 스타일의 `width`, `height` 비율이 일치하지 않으면 캔버스 안의 콘텐츠 비율이 왜곡되어 나타난다.

예를 들어 다음과 같은 두 캔버스가 있다고 하자 ([Demo](http://jsfiddle.net/3t0gdspy/1/)).

```html
<canvas id="canvas1" style="width: 100px; height: 100px;" width="100" height="100"></canvas>
<canvas id="canvas2" style="width: 200px; height: 100px;" width="100" height="100"></canvas>
```

두 캔버스에 `fillRect`를 이용해 캔버스를 가득 채우는 정사각형을 그린다.

```js
let ctx1 = document.getElementById('canvas1').getContext('2d');
ctx.fillStyle = "blue";
ctx.fillRect(0, 0, 100, 100);

let ctx2 = document.getElementById('canvas2').getContext('2d');
ctx2.fillStyle = "red";
ctx2.fillRect(0, 0, 100, 100);
```

* `canvas1`은 웹 페이지에 100px x 100px의 크기로 나타나고 캔버스를 가득 채우는 파란 정사각형이 캔버스 안에 존재한다.
* `canvas2`는 웹 페이지에 200px x 100px의 크기로 나타나고 캔버스를 가득 채우는 붉은 직사각형이 캔버스 안에 존재한다.
* `canvas2`의 경우 캔버스의 `width`와 `height`은 1:1이지만 이를 캔버스 스타일로 2:1로 늘렸기 때문에 정사각형으로 그린 도형이 가로, 세로 2:1 비율의 직사각형으로 왜곡되어 나타난다.

> 자세한 설명은 다음 두 링크를 참고하자.
>
> * [Canvas is stretched when using CSS but normal with “width” / “height” properties](https://stackoverflow.com/questions/2588181/canvas-is-stretched-when-using-css-but-normal-with-width-height-properties) by stack overflow
> * [HTML5 Canvas의 Size](https://m.blog.naver.com/ads226/220566989379) by 소주한잔 하고픈 날~

이외에도 캔버스 요소에 일반적인 이미지처럼 스타일(margin, border, background…)을 적용할 수 있다.

* 캔버스의 내용에는 영향을 끼치지 않는다.
* 캔버스에 스타일링이 따로 지정하지 않으면 스타일 기본값은 투명이다.
* 구체적인 사용 예시는 [Applying styles and colors](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Applying_styles_and_colors)에서 확인 할 수 있다.

### Fallback content

캔버스를 지원하지 않는 오래된 브라우저들을 위해 `<canvas>` 태그 안에 대체 콘텐츠를 삽입해 대체 콘텐츠(fallback content)를 제공할 수 있다.

* 캔버스를 지원하지 않는 브라우저는 캔버스 컨테이너(i.e., `<canvas></canvas>`를 무시하고 컨테이너 안의 콘텐츠를 렌더링한다.
* 캔버스를 지원하는 브라우저는 컨테이너 안의 내용을 무시하고 캔버스를 정상적으로 렌더링한다.

```html
<canvas id="stockGraph" width="150" height="150">
  current stock price: $3.15 +0.15
</canvas>

<canvas id="clock" width="150" height="150">
  <img src="images/clock.png" width="150" height="150" alt=""/>
</canvas>
```

### Required `</canvas>` tag

대체 콘텐츠가 제공되는 방식 때문에, `<canvas>` 요소는 닫는 태그(`</canvas>`)가 있어야 한다.

닫는 태그가 없으면, 문서의 나머지 내용이 대체 콘텐츠로 간주되어 보이지 않게 된다.

## The rendering context

`<canvas>` 요소는

* 일정한(fixed) 크기의 드로잉 영역을 생성한 뒤,
* 하나 이상의 렌더링 컨텍스트(rendering contexts)를 만들어(expose),
* 보여주려는 내용을 그리고(create) 처리한다.

다양한 종류의 렌더링 컨텍스트가 존재하고, 렌더링 컨텍스트에 따라 다른 렌더링 타입이 제공된다.

* 예를 들어, WebGL은 OpenGL ES를 기반으로 하는 3D 컨텍스트를 사용한다.
* 이 튜토리얼에서는, 2D 렌더링 컨텍스트를 집중적으로 다룬다.

캔버스는 처음에 비어있는 상태이다. 캔버스에 무엇인가를 나타내기 위해서는 우선 스크립트가 랜더링 컨텍스트에 접근한 다음 그곳에 그림을 그려야 한다.

`<canvas>` 요소에는 이를 위한 `getContext()` 메서드가 존재한다.

* `getContext()` 메소드로 렌더링 컨텍스트를 얻거나,
* 렌더링 컨텍스트의 그리기(drawing) 함수를 이용할 수 있다.
* 매개변수로는 '렌더링 컨텍스트 타입'을 지정한다.
    * 본 튜토리얼에서 다루고 있는 2D 그래픽을 그리기 위해서는, 매개변수를 `"2d"`로 지정해 `CanvasRenderingContext2D`를 얻는다.

```js
// tutorial id를 갖는 canvas 요소를 찾는다.
// 요소가 존재하면 canvas 변수로 받아온다.
let canvas = document.getElementById('tutorial');
// canvas의 2d 렌더링 컨텍스트에 접근한다.
let ctx = canvas.getContext('2d');
```

## Checking for support

위에서 캔버스를 지원하지 않는 브라우저를 위해 대체 콘텐츠를 제공하는 것처럼, 스크립트에서도 `getContext()` 메소드의 존재 여부를 테스트해서 캔버스를 지원하지 않는 경우에 대비할 수 있다.

```js
let canvas = document.getElementById('tutorial');

// canvas.getContext가 존재여부 검사
if (canvas.getContext){
  let ctx = canvas.getContext('2d');
  // drawing code here
} else {
  // canvas-unsupported code here
}
```

## A skeleton template

다음은 이후의 예제들의 출발점이 될 최소한의 템플릿이다.

> HTML 안에 스크립트를 직접 삽입하는 것은 권장되지 않지만, 예시를 간결하게 보여주기 위해 사용했다.

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8"/>
    
    <title>Canvas tutorial</title>
    
    <script type="text/javascript">
      <!-- 캔버스를 그리는 함수 -->
      function draw() {
        let canvas = document.getElementById('tutorial');
        if (canvas.getContext) {
          let ctx = canvas.getContext('2d');
        }
      }
    </script>
    
    <style type="text/css">
      canvas { border: 1px solid black; }
    </style>
  </head>
  
  <!-- body의 로딩이 완료되면 draw 함수를 호출한다 -->
  <body onload="draw();">
    <!-- 캔버스 요소 -->
    <canvas id="tutorial" width="150" height="150"></canvas>
  </body>
</html>
```

위 스크립트는 `draw()` 함수를 포함하고 있고 페이지 로딩이 완료될 때 한 번 실행된다.

* 이는 문서가 `load` 이벤트를 수신했을 때 이뤄진다.
* 페이지가 처음 로딩되는 경우에 한해, `window.setTimeout()`, `window.setInterval()` 이나 다른 이벤트 핸들러 등을 이용하여 호출할 수도 있다.

## A simple example

먼저 간단한 예제를 봐보자. 예제에는 두 개의 직사각형이 겹쳐있고 그중 하나는 투명도(alpha transparency)를 갖는다. 이 예제가 어떻게 작동하는지는 나중에 자세히 살펴볼 예정이다.

```html
<!DOCTYPE html>
<html>
 <head>
  <meta charset="utf-8"/>
  
  <script type="application/javascript">
    function draw() {
      var canvas = document.getElementById('canvas');
      // canvas의 getContext가 존재하면
      if (canvas.getContext) {
        // 2d 렌더링 컨텍스트를 만들어
        let ctx = canvas.getContext('2d');

        // rbg(200, 0, 0)의 색상으로
        ctx.fillStyle = 'rgb(200, 0, 0)';
        // 다음의 사각형을 그린다.
        ctx.fillRect(10, 10, 50, 50);

        // 동일한 렌더링 컨텍스트에
        // 투명도 50프로의 rbg(0, 0, 200)의 색상으로
        ctx.fillStyle = 'rgba(0, 0, 200, 0.5)';
        // 다음의 사각형을 그린다.
        ctx.fillRect(30, 30, 50, 50);
      }
    }
  </script>
 </head>
 
 <body onload="draw();">
   <canvas id="canvas" width="150" height="150"></canvas>
 </body>
</html>
```

> 예제 실행 결과를 확인하거나 실제로 코드를 조작해보면서 테스트하고 싶다면 [원문](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Basic_usage#a_simple_example)을 참고하시길 바랍니다.
