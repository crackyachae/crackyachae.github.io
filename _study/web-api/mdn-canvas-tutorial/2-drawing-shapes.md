---
layout  : article
title   : Drawing shapes with canvas
summary : 
date    : 2021-06-08 14:31:02 +0900
updated : 2021-06-09 00:09:34 +0900
tag     : draft
toc     : true
public  : true
parent  : [[/web-api/mdn-canvas-tutorial]]
latex   : false
---
* TOC
{:toc}

> 이 글은 MDN Web API의 [Canvas Tutorial](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial) 중 [Drawing shapes with canvas](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Drawing_shapes)의 내용을 번역 및 정리한 글입니다.
>
> * 제가 필요한 부분 위주로 확인하면서 정리하고 있어 글에 덜 작성된 부분이 있을 수 있습니다.
> * 글 작성 후 원문의 내용이 수정되거나 내용을 이해하기 위한 개인적인 설명이나 해석이 있을 수 있습니다. 되도록 원문을 참고해주시길 바랍니다.
> * 잘못된 부분이 있다면 댓글이나 그 외 편하신 방법으로 알려주시면 감사하겠습니다.

이제 캔버스에 그림을 그리는 방법을 구체적으로 알아보자. 이 글을 마지막까지 읽으면 사각형, 삼각형, 선, 아치, 곡선 등의 기본적인 도형을 그리는 방법을 익힐 수 있다. 캔버스 위에 물체를 그리는 데는 경로(path)를 다루는 것이 필수적이므로 이것이 어떻게 이뤄지는지도 다룰 예정이다.

## The grid

그림을 그리기 시작하기에 앞서, 캔버스 그리드(canvas grid) 혹은 좌표 공간(coordinate space)에 대해 먼저 알아야 한다.

앞서 다뤘던 HTML skeleton의 캔버스 요소는 가로, 세로 각각 150픽셀이다.

기본 그리드가 표시된 캔버스를 봐보자.

* 기본적으로 그리드의 1단위는 캔버스의 1픽셀과 같다.
* 이 그리드의 원점은 왼쪽 위의 (0, 0) 이다.
* 모든 요소는 이 원점을 기준으로 위치한다.

이를 위 그림에 적용하면

* 파란 사각형의 좌측상단은 왼쪽에서 x 픽셀, 위에서 y 픽셀 떨어진 것으로 볼 수 있고
* 이 사각형의 좌표는 (x, y)가 된다.

이 튜토리얼 후반부에서 원점을 이동하는 방법과 그리드를 회전하고 같은 비율로 확대/축소할 수 있는지도 알아볼 것이지만, 일단은 기본에 충실하도록 한다.

## Drawing rectangles

SVG와 다르게, 캔버스는 오직 두 개의 기본(primitive) 도형만을 제공한다. 바로 직사각형과 경로(선으로 연결된 점들의 모임) 이다. 다른 모든 도형은 무조건 하나 혹은 하나 이상의 경로를 합쳐 만들어야 한다. 다행히, 우리는 경로를 그리는 여러 함수(function)를 갖고 있으며 이를 이용해 아주 복잡한 도형들도 그릴 수 있다.

우선, 직사각형을 봐 보자. 캔버스 위에 직사각형을 그리는 데에는 세 가지 함수(function)가 사용된다.

* `fillRect(x, y, width, height)`
    * 색칠된 직사각형을 그린다.
* `strokeRect(x, y, width, height)`
    * 직사각형 윤곽선을 그린다.
* `clearRect(x, y, width, height)`
    * 직사각형의 특정 부분을 지운다. 지워진 부분은 완전히 투명해진다.

세 함수는 모두 같은 매개변수를 가지며 다음과 같다.

* `x`와 `y`: 캔버스의 왼쪽 위에서 사각형의(원점으로부터 상대적인) 위치
* `width`와 `height`: 사각형의 크기

이전의 `draw()` 함수를 위의 세 함수를 사용할 수 있도록 수정해보자.

### Rectangular shape example

```js
function draw() {
  let canvas = document.getElementById('canvas');
  if (canvas.getContext) {
    let ctx = canvas.getContext('2d');

    // (25, 25)에서부터 100px 정사각형을 그린다.
    ctx.fillRect(25, 25, 100, 100);
    // (45, 45)에서부터 60px 정사각형을 지운다.
    ctx.clearRect(45, 45, 60, 60);
    // (50, 50)에서부터 50px 정사각 윤곽선을 그린다.
    ctx.strokeRect(50, 50, 50, 50);
  }
}
```

* `fillRect()` 함수는 가로세로 100픽셀 사이즈의 검정 사각형을 그린다.
* 다음으로 `clearRect()` 함수는 정사각형 중앙에서  60x60픽셀의 사각형을 지운다.
* `strokeRect()`은 이 빈 사각형 안에 50x50픽셀 사이즈의 윤곽선을 그린다.

다음 섹션의 경로 함수와는 다르게, 모든 세 개의 직사각형 함수는 캔버스에 '바로' 그릴 수 있다.

## Drawing paths

경로는 선의 일부에 연결된 점들의 집합으로

* 다양한 도형을 이룰 수 있고,
* 굽(curved)거나 그러지 않을 수 있으며,
* 다양한 두께와 색을 가질 수도 있다.
* 경로나 하위 경로(subpath)는 닫힐(closed) 수 있다.

경로를 이용하여 도형을 만들 때는 몇 가지 추가적인 단계를 거쳐야 한다:

1. 경로를 생성한다.
1. 그리기 명령어(drawing commands)를 사용하여 경로상에 그린다.
1. 경로가 생성되면, 경로를 렌더링하기 위해서 윤곽선을 그리거나 도형 내부를 채울 수 있다.

다음은 위의 단계들을 실행하기 위해 사용되는 함수다:

* `beginPath()`
    * 새로운 경로를 만든다. 경로가 생성되면, 이후 그리기 명령들은 해당 경로를 가리키고 그 경로를 구성하는 데 사용된다.
* Path 메소드 (Path methods)
    * 특정 object의 경로를 설정하는데 사용되는 메소드들이다.
* `closePath()`
    * 현재 하위 경로의 시작 부분으로 향하는 직선을 추가한다.
* `stroke()`
    * 윤곽선을 생성해 도형을 그린다.
* `fill()`
    * 경로의 내부를 채워서 단색 도형(solid shape)을 그린다.

경로를 만들기 위한 첫 번째 단계는 `beginPath()` 를 호출하는 것이다. 내부적으로, 경로는 도형을 이루는 하위경로(선, 호 등)들의 집합으로 이루어져 있다. 이 메소드가 호출될 때마다, 하위 경로의 모음은 초기화되며, 새로운 도형을 그릴 수 있게 된다.

> 현재 열린 path가 비어있으면, 예를 들어 `beginPath()` 메소드를 사용하거나, 캔버스를 새로 생성한 직후, 첫 경로 생성 명령은 실제 동작에 상관없이 `moveTo()`로 여겨진다. 그렇기 때문에 경로를 초기화한 직후에는 항상 명확하게 시작 위치를 설정해 두는 것이 좋다.

두 번째 단계는 실제로 경로가 그려지는 위치를 설정하는 메소드를 호출하는 것이다. 이 내용은 조만간 다룰 예정이다.

세 번째 단계는 선택사항으로 `closePath()` 메소드를 호출하는 것이다. 이 메소드는 현재 점과 시작점을 직선으로 이어서 도형을 닫는다. 이미 도형이 닫혔거나 남은 점이 한 개뿐이라면 메소드는 아무것도 하지 않는다.

> `fill()` 메소드 호출 시, 열린 도형은 자동으로 닫히므로 `closePath()` 메소드를 호출하지 않아도 된다. `stroke()` 메소드에는 해당하지 않는다.

### Drawing a triangle

예를 들어, 삼각형을 그리기 위한 코드는 다음과 같다:

```js
function draw() {
  let canvas = document.getElementById('canvas');
  if (canvas.getContext) {
    let ctx = canvas.getContext('2d');

    // 경로를 초기화한다.
    ctx.beginPath();
    // 시작점을 (75, 50)으로 이동한다.
    ctx.moveTo(75, 50);
    // 이전 포인트와 (100, 75)를 직선으로 잇는다.
    ctx.lineTo(100, 75);
    // 이전 포인트와 (100, 25)를 직선으로 잇는다.
    ctx.lineTo(100, 25);
    ctx.fill();
  }
}
```

> 예제 실행 결과를 확인하거나 실제로 코드를 조작해보면서 테스트하고 싶다면 [원문](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Drawing_shapes#drawing_a_triangle)을 참고하시길 바랍니다.

### Moving the pen

가장 유용한 함수 중 하나로, 실제로 아무것도 그리지는 않지만, 위에서 언급된 경로의 일부인 `moveTo()` 함수가 있다. 이것은 펜이나 연필을 종이 위의 한 점에서 들어 옆으로 옮기는 것으로 보는 것이 가장 적절하다.

`moveTo(x, y)`

* 펜을 지정된 좌표인 `x`와 `y`로 옮긴다.

캔버스가 초기화되거나 `beginPath()` 메소드가 호출되었을 때, 일반적으로 새로운 곳에 시작점을 놓기 위해 `moveTo()` 함수를 사용하는 경우가 많다. 또한 연결되지 않은 경로를 그리는데에도 `moveTo()` 함수를 사용 할 수 있다. 아래의 스마일 얼굴을 봐보자.

```js
function draw() {
  let canvas = document.getElementById('canvas');
  if (canvas.getContext) {
     let ctx = canvas.getContext('2d');

    // 경로를 초기화한다.
    ctx.beginPath();
    // (75, 75) 에서 반지름이 50인 원을 그린다.
    ctx.arc(75, 75, 50, 0, Math.PI * 2, true); // Outer circle
    // 펜을 (110, 75)로 이동시킨다.
    ctx.moveTo(110, 75);
    // (110, 75)에서 출발하는 중심이 (75, 75)이고 반지름이 35인 반원을 그린다.
    ctx.arc(75, 75, 35, 0, Math.PI, false);  // Mouth (clockwise)
    // 펜을 (65, 65)로 이동한다.
    ctx.moveTo(65, 65);
    // (65, 65)에서 출발하는 중심이 (60, 65)이고 반지름이 5인 원을 그린다.
    ctx.arc(60, 65, 5, 0, Math.PI * 2, true);  // Left eye
    // 펜을 (95, 65)로 이동한다.
    ctx.moveTo(95, 65);
    // (95, 65)에서 출발하는 중심이 (90, 65)이고 반지름이 5인 원을 그린다.
    ctx.arc(90, 65, 5, 0, Math.PI * 2, true);  // Right eye
    ctx.stroke();
  }
}
```

> 예제 실행 결과를 확인하거나 실제로 코드를 조작해보면서 테스트하고 싶다면 [원문](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Drawing_shapes#moving_the_pen)을 참고하시길 바랍니다.

 `moveTo()`를 사용한 코드 라인을 지우면 연결된 선들을 확인 할 수 있다.

 > `arc()` 함수에 대하여 더 알아보고 싶다면 아래의 Arcs를 확인하면 된다.

### Lines

직선을 그리기 위해서는 `lineTo()` 메소드를 사용한다.

`lineTo(x, y)`

* 현재의 드로잉 위치에서 `x`와 `y`로 지정된 위치까지 선을 그린다.

이 메소드는 선의 끝점의 좌표가 되는 `x`와 `y` 두 개의 인자를 필요로 한다. 시작점은 이전에 그려진 경로에 의해 결정되며, 이전 경로의 끝점이 다음 경로의 시작점이 된다. 시작점은 `moveTo()` 메소드로 변경할 수도 있다.

아래의 예시는 윤곽선 삼각형과 색칠된 삼각형 두 삼각형을 그린다.

```js
function draw() {
  let canvas = document.getElementById('canvas');
  if (canvas.getContext) {
    let ctx = canvas.getContext('2d');

    // Filled triangle
    ctx.beginPath();
    // (25, 25)로 펜을 이동한다
    ctx.moveTo(25, 25);
    // (25, 25)에서 (105, 25)로 직선을 긋는다.
    ctx.lineTo(105, 25);
    // (105, 25)에서 (25, 105)로 직선을 긋는다.
    ctx.lineTo(25, 105);
    // 경로 안에 색을 채운다.
    ctx.fill();

    // Stroked triangle
    ctx.beginPath();
    // (125, 125)로 펜을 이동한다
    ctx.moveTo(125, 125);
    // (125, 125)에서 (125, 45)로 직선을 긋는다.
    ctx.lineTo(125, 45);
    // (125, 45)에서 (45, 125)로 직선을 긋는다.
    ctx.lineTo(45, 125);
    // 경로를 닫는다.
    ctx.closePath();
    // 경로의 윤곽선을 그린다.
    ctx.stroke();
  }
}
```

삼각형을 그리는 과정은 다음과 같다.

* 새로운 경로를 지정하기 위해 `beginPath()` 메소드를 먼저 실행한다.
* 그다음 `moveTo()` 메소드로 시작점을 원하는 위치로 새롭게 지정한다.
* 두 선을 그어 삼각형의 두 면을 그린다.

> 예제 실행 결과를 확인하거나 실제로 코드를 조작해보면서 테스트하고 싶다면 [원문](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Drawing_shapes#lines)을 참고하시길 바랍니다.

예제에서 채워진 삼각형과 윤곽선 삼각형의 차이를 확인할 수 있다.

* 위에 언급했던 것처럼, 경로가 채워질 때는 그 도형이 자동으로 닫히지만
* 윤곽선 삼각형에서는 그렇지 않다.
    * 만약 `closePath()` 메소드를 윤곽선 삼각형 코드에서 지우면, 두 선만 그려지고 완전한 삼각형이 되지 않는다.

### Arcs

> 작성 예정

### Bezier and quadratic curves

> 작성 예정

#### Quadratic Bezier curves

> 작성 예정

#### Cubic Bezier curves

> 작성 예정

### Rectangles

Drawing rectangle에서 봤던, 직사각형을 캔버스에 '직접' 그리는 세 가지 메소드 외에도 `rect()` 메소드가 있다. 이 메소드는 현재 열린 패스에 직사각형 경로를 추가한다.

`rect(x, y, width, height)`

* 왼쪽 위가 (`x`, `y`)이고 폭과 높이가 `width`와 `height`인 직사각형을 그린다.

이 메소드가 실행되기 전에, 매개변수를 (x,y)로 하는 `moveTo()` 메소드가 자동으로 호출된다. 즉, 현재의 펜 위치가 자동으로 기본 좌표로 초기화된다.

### Making combinations

> 작성 예정

## Path2D objects

> 작성 예정

### Path2D example

> 작성 예정

### Using SVG paths

> 작성 예정
