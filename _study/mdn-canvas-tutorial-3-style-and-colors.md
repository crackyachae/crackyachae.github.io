---
layout  : article
title   : Applying styles and colors
summary : 
date    : 2021-06-09 11:15:10 +0900
updated : 2021-06-17 22:21:17 +0900
tag     : draft
toc     : true
public  : true
parent  : [[mdn-canvas-tutorial]]
latex   : false
---
* TOC
{:toc}

> 이 글은 MDN Web API의 [Canvas Tutorial](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial) 중 [Applying styles and colors](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Applying_styles_and_colors)의 내용을 번역 및 정리한 글입니다.
>
> * 제가 필요한 부분 위주로 확인하면서 정리하고 있어 글에 덜 작성된 부분이 있을 수 있습니다.
> * 글 작성 후 원문의 내용이 수정되거나 내용을 이해하기 위한 개인적인 설명이나 해석이 있을 수 있습니다. 되도록 원문을 참고해주시길 바랍니다.
> * 잘못된 부분이 있다면 댓글이나 그 외 편하신 방법으로 알려주시면 감사하겠습니다.

Drawing shapes 글에서는 기본선과 채우기 스타일만 사용했다. 이 글에서는 그림을 좀 더 매력적으로 만들 수 있는 캔버스 옵션을 살펴보게 된다. 다른 색상, 선 스타일, 그라디언트, 패턴 및 그림자를 추가하는 방법을 배울 예정이다.

## Colors

지금까지는 그림과 관련된 메소드만 알아봤다. 도형에 색을 칠(apply)하고 싶을 때 사용할 수 있는 두 가지 중요한 속성이 있다: `fillStyle`과  `strokeStyle` 이다.

* `fillStyle = color`
    * 도형을 채우는 색을 설정한다.
* `strokeStyle = color`
    * 도형의 윤곽선 색을 설정한다.

여기서 `color`는 CSS의 `<color>`, 그라디언트 객체, 패턴 객체를 의미한다. 그라디언트 객체와 패턴 객체는 페이지 아래에서 다루기로 한다. 윤곽선과 채움 색의 기본 설정값은 검은색이다(CSS 색상 값 `#000000`).

> `strokeStyle` 또는 `fillStyle` 속성을 설정하면, 새로 설정된 값이 앞으로 그려질 도형의 기본값이 된다. 각 도형에 다른 색을 적용하고 싶을 때마다 `fillStyle` 또는 `strokeStyle` 속성을 다시 적용해야 한다.

명세에 따르면, 위 속성의 속성값으로 입력할 수 있는 유효한 값은 CSS의 `<color>` 값 형식이다. 아래의 예시는 모두 한 가지 색을 다르게 표현한 것이다.

```js
// 아래의 예시는 모두 fillStyle을 '오렌지'색으로 설정한다.

ctx.fillStyle = "orange";
ctx.fillStyle = "#FFA500";
ctx.fillStyle = "rgb(255, 165, 0)";
ctx.fillStyle = "rgba(255, 165, 0, 1)";
```

### A `fillStyle` example

이 예제에서는 for 반복문을 두 번 사용하여 각 색상이 모두 다른 사각형 격자를 그릴 것이다. 결과는 원문의 스크린샷과 같다.

결과물이 만들어지는 과정은 다음과 같다.

* 각 사각형의 RGB 색상 값에서 붉은색과 녹색 값만을 변수 `i`와 `j`를 사용하여 변경한다.
    * 파란색 채널 값은 고정된다.
* 채널 값들을 변경함으로써, 모든 종류의 팔레트를 생성할 수 있다.
* 반복을 진행하면 (increasing the steps) Photoshop에서 사용하는 색상 팔레트와 비슷한 모양을 얻을 수 있다.

```js
function draw() {
  let ctx = document.getElementById('canvas').getContext('2d');
  // 변수 i와
  for (let i = 0; i < 6; i++){
    // j를 0 ~ 5까지 증가시키면서 반복한다.
    for (let j = 0; j < 6; j++){
      // 색상을 설정한다.
      // r, g 값은 255에서 현재 i, j값에 42.5를 곱한 값을 뺀 것
      // b 값은 0으로 고정한다.
      ctx.fillStyle = 'rgb(' + Math.floor(255 - 42.5 * i) + ', ' +
                       Math.floor(255 - 42.5 * j) + ', 0)';
      // i, j에 따라 이동하면서
      // 위에서 지정한 색으로 25x25 사각형을 그린다.
      ctx.fillRect(j * 25, i * 25, 25, 25);
    }
  }
}
```

> 예제 실행 결과를 확인하거나 실제로 코드를 조작해보면서 테스트하고 싶다면 [원문](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Applying_styles_and_colors#a_fillstyle_example)을 참고하시길 바랍니다.

### A `strokeStyle` example

이번 예제는 위의 예제와 비슷하지만, `strokeStyle` 속성을 사용하여 윤곽선의 색을 바꾼다. 사각형 대신, 원을 그리는 `arc()` 메소드를 사용한다.

```js
  function draw() {
    let ctx = document.getElementById('canvas').getContext('2d');
    for (let i = 0; i < 6; i++) {
      for (let j = 0; j < 6; j++) {
        // 색상을 설정한다.
        // g, b 값은 255에서 현재 i, j 값에 42.5를 곱한 값을 뺀 것
        // r 값은 0으로 고정한다.
        ctx.strokeStyle = 'rgb(0, ' + Math.floor(255 - 42.5 * i) + ', ' +
                         Math.floor(255 - 42.5 * j) + ')';
        // 경로를 초기화한 뒤
        ctx.beginPath();
        // i, j에 따라 원의 중심을 이동하면서
        // 반지름 10의 원 경로를 그린다.
        ctx.arc(12.5 + j * 25, 12.5 + i * 25, 10, 0, Math.PI * 2, true);
        // 그린 경로에 위에서 지정한 색으로 윤곽선을 표시한다.
        ctx.stroke();
      }
    }
  }
```

> 예제 실행 결과를 확인하거나 실제로 코드를 조작해보면서 테스트하고 싶다면 [원문](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Applying_styles_and_colors#a_strokestyle_example)을 참고하시길 바랍니다.

## Transparency

캔버스에는 불투명한 도형을 그리는 것뿐만 아니라, 반투명한 도형도 그릴 수도 있다. `globalAlpha` 값을 설정하거나 윤곽선 또는 채움 스타일에 반투명한 색을 적용하면 된다.

* `globalAlpha = transparencyValue`
    * 이후 캔버스에 그려지는 모든 도형에 특정 투명도 값을 적용한다. 설정하는 값은 0.0(완전히 투명)과 1.0(완전히 불투명) 사이에 있어야 하며, 기본 설정값은 1.0(완전히 투명)이다.

`globalAlpha`는 모두 같은 투명도로 캔버스에 많은 도형을 그릴 때 유용합니다. 하지만, 일반적으로는 도형의 색을 설정할 때마다 각각의 도형에 투명도를 별개로 설정하는 것이 더 유용한 편이다.

`strokeStyle`과 `fillStyle`의 속성값에 CSS rgba 색상값을 적용할 수 있으므로, 투명한 색을 적용하기 위해 아래와 같은 표기법을 사용할 수 있다.

```js
// 외곽선과 채움 스타일에 투명 적용

ctx.strokeStyle = 'rgba(255, 0, 0, 0.5)';
ctx.fillStyle = 'rgba(255, 0, 0, 0.5)';
```

`rgba()` 함수는 `rgb()` 함수와 비슷하지만, 하나의 매개변수를 더 갖는다. 마지막 매개변수는 앞의 특정 색의 투명도 값을 설정한다. 올바른 범위는 0.0(완전히 투명)에서 1.0(완전히 불투명)이다.

### A `globalAlpha` example

이 예제는 다른 색의 네 가지 사각형을 배경에 그린 뒤, 그 위에 반투명한 원을 여러 개 그린다.

예제 진행 과정은 다음과 같다.

* 배경이 되는 네 가지 색의 사각형을 그린다.
* `globalAlpha` 값을 0.2로 설정한다. 이후 그려질 도형에 이 값이 적용된다.
* for 반복문을 사용하여 점점 큰 반지름의 원을 그린다.
* 최종 결과물은 원형 그라디언트가 된다.
    * 반투명한 원이 겹쳐지면서 이미 그린 원의 투명도가 줄게 된다.
    * 반복 횟수가 늘어날수록 많은 원이 그려진 영향 때문에 이미지 중앙의 원에서는 뒷배경의 거의 보이지 않게 된다.

```js
function draw() {
  let ctx = document.getElementById('canvas').getContext('2d');
  
  // 배경을 그린다
  // 노란 사각형
  ctx.fillStyle = '#FD0';
  ctx.fillRect(0, 0, 75, 75);
  // 초록 사각형
  ctx.fillStyle = '#6C0';
  ctx.fillRect(75, 0, 75, 75);
  // 파란 사각형
  ctx.fillStyle = '#09F';
  ctx.fillRect(0, 75, 75, 75);
  // 빨간 사각형
  ctx.fillStyle = '#F30';
  ctx.fillRect(75, 75, 75, 75);
  
  // 색상을 흰색으로 설정한다.
  ctx.fillStyle = '#FFF';

  // 투명값을 설정한다.
  ctx.globalAlpha = 0.2;

  // 반투명한 원을 그린다
  for (var i = 0; i < 7; i++){
    ctx.beginPath();
    // (75, 75)를 중심으로 하는 원을 그린다.
    // 반복할 때마다 반지름이 10 * i 만큼 증가한다.
    ctx.arc(75, 75, 10 + 10 * i, 0, Math.PI * 2, true);
    // 반투명한 흰색을 채운다.
    ctx.fill();
  }
}
```

> 예제 실행 결과를 확인하거나 실제로 코드를 조작해보면서 테스트하고 싶다면 [원문](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Applying_styles_and_colors#a_globalalpha_example)을 참고하시길 바랍니다.

### An example using rgba()

두 번째 예제는 위와 비슷하지만, 겹쳐진 원 대신 불투명도가 증가하는 작은 사각형을 그린다. `rgba()`를 사용하면 각각의 도형마다 윤곽선이나 채움 스타일을 따로따로 설정할 수 있기 때문에, 더 자세하고 유연하게 제어할 수 있다.

```js
function draw() {
  var ctx = document.getElementById('canvas').getContext('2d');

  // 배경을 그린다.
  // 노란색 사각형
  ctx.fillStyle = 'rgb(255, 221, 0)';
  ctx.fillRect(0, 0, 150, 37.5);
  // 초록색 사각형
  ctx.fillStyle = 'rgb(102, 204, 0)';
  ctx.fillRect(0, 37.5, 150, 37.5);
  // 파란색 사각형
  ctx.fillStyle = 'rgb(0, 153, 255)';
  ctx.fillRect(0, 75, 150, 37.5);
  // 빨간색 사각형
  ctx.fillStyle = 'rgb(255, 51, 0)';
  ctx.fillRect(0, 112.5, 150, 37.5);

  // 반투명한 사각형을 그린다.
  for (var i = 0; i < 10; i++) {
    // 투명도가 i + 1 / 10인 흰색으로 색상을 설정한다.
    ctx.fillStyle = 'rgba(255, 255, 255, ' + (i + 1) / 10 + ')';
    for (var j = 0; j < 4; j++) {
      // 각 색상의 배경 사각형으로 이동하면서
      // 위에서 지정한 투명도의 흰색 사각형을 채운다.
      ctx.fillRect(5 + i * 14, 5 + j * 37.5, 14, 27.5);
    }
  }
}
```

> 예제 실행 결과를 확인하거나 실제로 코드를 조작해보면서 테스트하고 싶다면 [원문](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Applying_styles_and_colors#an_example_using_rgba)을 참고하시길 바랍니다.

## Line styles

선의 스타일을 바꿀 수 있는 몇 가지 속성이 있다.

* `lineWidth = value`
    * 이후 그려질 선의 두께를 설정한다.
* `lineCap = type`
    * 선의 끝 모양을 설정한다.
* `lineJoin = type`
    * 선들이 만나는 "모서리"의 모양을 설정한다.
* `miterLimit = value`
    * 두 선이 뾰족한 각을 이뤄 만날 때 접합점의 두께를 제어할 수 있도록, 연결 지점에 제한 값을 설정한다.
* `getLineDash()`
    * 음수가 아닌 짝수를 포함하는 현재 선의 대시 패턴 배열을 반환한다.
* `setLineDash(segments)`
    * 현재 선의 대시 패턴을 설정한다.
* `lineDashOffset = value`
    * 대시 배열이 선의 어디서 시작될지 지정한다.

아래 예제들을 보면 어떻게 동작하는지 이해할 수 있다.

### A `lineWidth` example

이 속성은 현재 선의 두께를 설정한다. 설정값은 반드시 양수이어야 하며, 기본 설정값은 1.0 단위(unit)이다.

선의 두께는 지정된 경로를 중심으로 하는 획(stroke)의 두께다. 이는 경로의 양옆으로, 선 두께의 반 만큼의 영역에 선이 그려진다는 것을 의미한다. 캔버스 좌표는 픽셀을 직접 참조하지 않음으로, 깔끔한(crisp) 수평 및 수직선을 얻기 위해서는 특별히 주의를 기울여야 한다.

아래의 예제에서는, 선의 두께가 점점 증가하는 10개의 직선을 그린다. 가장 왼쪽의 선의 폭이 1.0 단위이다. 경로의 위치(positioning) 때문에 가장 왼쪽의 선과 모든 홀수 폭 두께의 선은 선명하게 보이지 않는다.

```js
function draw() {
  let ctx = document.getElementById('canvas').getContext('2d');
  for (let i = 0; i < 10; i++) {
    // 선의 두께 결정
    ctx.lineWidth = 1 + i;
    ctx.beginPath();
    ctx.moveTo(5 + i * 14, 5);
    ctx.lineTo(5 + i * 14, 140);
    ctx.stroke();
  }
}
```

> 예제 실행 결과를 확인하거나 실제로 코드를 조작해보면서 테스트하고 싶다면 [원문](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Applying_styles_and_colors#a_linewidth_example)을 참고하시길 바랍니다.

선명한 선을 그리려면 경로에 획이 어떻게 생성되는지 이해해야 한다. 아래의 이미지를 보자.

* 격자는 캔버스의 좌표를 나타낸다. 격자선 사이의 사각형은 실제 화면의 픽셀과 같다.
* 첫 번째 이미지에는 (2, 1)에서 (5, 5)까지의 사각형이 채워져 있다.
* 이 사각형 사이(안)의 전체 영역(연한 붉은색)은 픽셀 경계선에 정확히 맞아떨어지기 때문에 채워진 사각형의 가장자리는 선명하게 나타난다.

![canvas grid](/post-img/mdn-canvas-tutorial-3-style-and-colors/1-canvas-grid.png)

이번에는 (3, 1)에서 (3, 5)까지 두께 1.0의 직선 경로를 고려해보자. 두 번째 이미지와 같은 상황이 된다. 이는 위 예제의 두께 1.0인 선에서 발생한 상황과 같다.

* 선을 실제로 채우는 영역(진한 파란색)은 경로 양옆 픽셀의 절반까지만 도달한다(extend).
* 이것은 한 픽셀의 일부만이 채워진다는 것을 의미하고 화면에는 그 근삿값으로 표시된다.
* 그 결과 전체 영역(연한 파란색과 짙은 파란색)이 실제 색상의 절반 정도 어두운 색상으로 채워지게 된다.

이를 방지하려면, 경로를 매우 정확하게 생성해야 한다.

* 두께가 1.0인 선은 경로의 양쪽으로 0.5 단위만큼 칠해진다는 것을 알고 있으니
* 세 번째 이미지처럼 경로를 (3.5, 1)에서 (3.5, 5)로 생성하면 두께 1.0의 선이 완전하고 정확하게 1픽셀 수직선을 채울 수 있다.

> 위의 수직선 그리기 예제에서, Y 위치는 여전히 정수로 된 격자선 위치를 참조하고 있다. 그렇지 않았다면, 선의 끝부분에 반만 채워진 픽셀이 보였을 것이다.
>
> 선의 끝부분은 기본값이 `butt`인 `lineCap` 스타일의 설정값에 따라서도 달라질 수 있다.
>
> * 홀수 두께 선들을 고려해 0.5 픽셀 단위의 좌표로 일관된 획을 계산해야 할 때 `lineCap` 스타일을 `square`로 설정하면 선의 끝부분 주변의 외곽 경계선이 한 픽셀을 꽉 채우도록 자동으로 늘어난다.
> * 경로의 시작과 종료 끝부분만이 이에 영향을 받는다. 만약 `closePath()`로 경로가 닫히면, 시작 지점과 종료 지점은 존재하지 않는다.
> * 대신, 경로 안의 모든 끝점은, 초기 설정값이 `miter`인 `lineJoin` 스타일의 설정값을 사용하여 이전의 부분 경로(segment)나 다음 부분 경로와 이어진다.
>     * 이 과정에서 연결된 부분 경로의 외곽 경계선이 이들의 교차점까지 자동으로 확장된다.
>     * 만약 연결된 부분이 서로 수평이거나 수직이라면 렌더된 획은 각 끝점을 중심으로 하는 픽셀 전체를 채우게 된다.
>
> 위의 추가적인 선 스타일을 실습(demonstrations)해보기 위해서는 다음에 나오는 두 섹션을 보자.

짝수 두께의 선들은 반으로 나누어도 각각의 반이 정수 픽셀값으로 끝나기 때문에 픽셀 중앙이 아닌 픽셀 사이에 경로를 둬도 된다.

Scalable 2D 그래픽으로 작업을 시작하는 것은 약간 힘들지만, 픽셀의 격자와 경로의 위치에 주의를 기울인다면 크기를 조절하거나 어떤 변형을 하더라도 그리려는 이미지가 바르게 보일 것이다. 캔버스를 2배로 키웠을 때 올바른 위치에 그려졌던 1.0 두께의 수직선은 깔끔한 2픽셀 두께의 선이 되며, 올바른 위치에 나타날 것이다.

### A lineCap example

> 작성 예정

### A lineJoin example

> 작성 예정

### A demo of the miterLimit property

> 작성 예정

### Using line dashes

> 작성 예정

## Gradients

> 작성 예정

### A createLinearGradient example

> 작성 예정

### A createRadialGradient example

> 작성 예정

### A createConicGradient example

> 작성 예정

## Patterns

> 작성 예정

### A createPattern example

> 작성 예정

## Shadows

> 작성 예정

### A shadowed text example

> 작성 예정

## Canvas fill rules

> 작성 예정
