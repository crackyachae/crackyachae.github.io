---
layout  : article
title   : Drawing text
summary : 
date    : 2021-06-11 23:20:57 +0900
updated : 2021-06-12 00:11:33 +0900
tag     : draft
toc     : true
public  : true
parent  : [[mdn-canvas-tutorial]]
latex   : false
---
* TOC
{:toc}

> 이 글은 MDN Web API의 [Canvas Tutorial](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial) 중 [Drawing text](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Drawing_text)의 내용을 번역 및 정리한 글입니다.
>
> * 제가 필요한 부분 위주로 확인하면서 정리하고 있어 글에 덜 작성된 부분이 있을 수 있습니다.
> * 글 작성 후 원문의 내용이 수정되거나 내용을 이해하기 위한 개인적인 설명이나 해석이 있을 수 있습니다. 되도록 원문을 참고해주시길 바랍니다.
> * 잘못된 부분이 있다면 댓글이나 그 외 편하신 방법으로 알려주시면 감사하겠습니다.

이번에는 캔버스에 텍스트를 작성(draw)하는 방법을 알아보자.

## Drawing text

캔버스 렌더링 컨텍스트(canvas rendering context)는 텍스트를 렌더링하는 두 가지 방법을 제공한다.

* `fillText(text, x, y [, maxWidth])`
    * 주어진 위치(x, y)에 주어진 텍스트를 채운다. 옵션값으로 최대 폭(width)을 정할 수 있다.
* `strokeText(text, x, y [, maxWidth])`
    * 주어진 위치(x, y)에 주어진 텍스트의 윤곽선을 그린(stroke)다.  옵션값으로 최대 폭(width)을 정할 수 있다.

### A `fillText` example

텍스트를 현재의 `fillStyle`을 이용해 채운다.

```js
function draw() {
  // 2d 렌더링 컨텍스트를 생성한다
  let ctx = document.getElementById('canvas').getContext('2d');
  // 폰트 옵션을 지정한다.
  ctx.font = '48px serif';
  // Hello world 라는 내부가 채워진 글씨를 (10, 50)에 작성한다.
  ctx.fillText('Hello world', 10, 50);
}
```

> 예제 실행 결과를 확인하거나 실제로 코드를 조작해보면서 테스트하고 싶다면 [원문](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Drawing_text#a_filltext_example)을 참고하시길 바랍니다.

### A `strokeText` example

텍스트를 현재의 `strokeStyle`을 이용해 채운다.

```js
function draw() {
  // 2d 렌더링 컨텍스트를 생성한다
  let ctx = document.getElementById('canvas').getContext('2d');
  // 폰트 옵션을 지정한다.
  ctx.font = '48px serif';
  // Hello world 라는 윤곽선만 그려진 글씨를 (10, 50)에 작성한다.
  ctx.strokeText('Hello world', 10, 50);
}
```

> 예제 실행 결과를 확인하거나 실제로 코드를 조작해보면서 테스트하고 싶다면 [원문](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Drawing_text#a_stroketext_example)을 참고하시길 바랍니다.

## Styling text

이미 위의 예제에서 텍스트를 기본 크기보다 약간 키우기 위해 `font` 속성을 지정했다. 텍스트가 캔버스에 표시되는 방식을 조정할 수 있는 속성은 이 외에도 더 있다.

* `font = value`
    * 텍스트를 작성(draw)할 때 사용되는 현재 텍스트의 스타일이다. 값은 문자열이며 CSS `font` 프로퍼티와 동일한 형식이 사용된다. 기본값은 10px의 sans-serif 폰트이다.
* `textAlign = value`
    * 텍스트 정렬을 설정한다.
    * 사용 가능한 값: `start`, `end`, `left`, `right`, `center`. 기본값은 `start` 이다.
* `textBaseline = value`
    * 베이스라인 정렬을 설정한다.
    * 사용 가능한 값: `top`, `hanging`, `middle`, `alphabetic`, `ideographic`, `bottom`. 기본값은 `alphabetic` 이다.
* `direction = value`
    * 글자의 방향을 설정한다.
    * 사용 가능한 값: `ltr`, `rtl`, `inherit`. 기본값은 `inherit` 이다.

만약 CSS를 사용해본 적이 있다면 이 속성들이 익숙할 것이다.

[WHATWG](https://whatwg.org)의 다음 예제 다이어그램은 `textBaseline` 속성이 지원하는 다양한 베이스라인을 보여준다.

![baselines](/post-img/mdn-canvas-tutorial-4-drawing-text/baselines.png)

### A textBaseline example

아래의 코드를 수정하면서 캔버스에서 어떻게 바뀌는지 실시간으로 확인해보자.

```js
ctx.font = '48px serif';
ctx.textBaseline = 'hanging';
ctx.strokeText('Hello world', 0, 100);
```

> 예제 실행 결과를 확인하거나 실제로 코드를 조작해보면서 테스트하고 싶다면 [원문](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Drawing_text#a_textbaseline_example)을 참고하시길 바랍니다.

## Advanced text measurements

텍스트를 조금 더 자세히 알고 싶은 경우에, 다음의 메소드를 이용하면 텍스트를 측정할 수 있게 해준다.

* `measureText()`
    * 현재 텍스트 스타일로 특정 텍스트를 그렸을 때의 폭(픽셀 단위)을 포함하는 `TextMetrics` 객체를 반환한다.

다음의 코드는 어떻게 텍스트를 측정하고 텍스트의 폭을 구하는지 보여준다.

```js
function draw() {
  let ctx = document.getElementById('canvas').getContext('2d');
  // 측정하고 싶은 텍스트를 measureText의 인자로 넘기고
  // 그 측정 결과인 반환 값을 text에 저장한다.
  let text = ctx.measureText('foo'); // TextMetrics object
  // text의 width를 확인한다.
  text.width; // 16;
}
```

## Gecko-specific notes

Gecko(Firefox, Firefox OS, Mozilla 기반 에플리케이션의 렌더링 엔진)에서는 캔버스에 텍스트를 그리기 위한 일부 prefixed APIs가 초기 버전으로 구현되어 있다. 이들은 지금 사용되지 않아 제거되었거나 더는 작동이 보장되지 않는다.
