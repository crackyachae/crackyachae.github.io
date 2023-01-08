---
layout  : article
title   : Web-api 메모 
summary : 글이 되기는 부족한 간단한 web-api 관련 메모들
date    : 2023-01-08 13:37:00 +0900
updated : 2023-01-08 14:11:47 +0900
tag     : memo
toc     : true
public  : true
parent  : [[/web-api]]
latex   : false
---
* TOC
{:toc}

## Canvas API

> [삽질하기 싫으면 꼭 읽어봐야 할 Canvas 트러블 슈팅](https://ui.toast.com/weekly-pick/ko_20210526) by TOAST UI

안티 앨리어싱(Anti-Aliasing)

* DPR(Device Pixel Ratio) 고려하기
    * `devicePixelRatio`(i.e. DPR)은 CSS 픽셀을 구성하는데 필요한 물리적 픽셀 수이다.
    * 디스플레이마다 DPR 값이 다르므로 canvas를 그릴 때 이를 고려해야 한다.
        * 예를 들어, DPR 기본값은 1, 레티나 디스플레이의 경우 DPR 값은 2이다.
    * DPR 값은 `window.devicePixelRatio`로 확인할 수 있으며 이 값을 이용해 canvas를 그릴 때 canvas 크기를 보정해주어야 한다.

    ```js
    // 메모리에 실제 크기 설정 (픽셀 밀도를 고려하여 크기 조정)
    const dpr = window.devicePixelRatio;

    canvas.width =  width * dpr;
    canvas.height = height * dpr;

    const ctx = canvas.getContext('2d');

    // CSS에서 설정한 크기와 맞춰주기 위한 scale 조정
    ctx.scale(dpr, dpr);
    ```

* 두께가 홀수값(e.g. 1px)인 선 위치 조정하기
    * 두께가 홀수값인 선은 픽셀에 걸쳐서 그려지면서 흐릿하게 보인다.
    * 이를 방지하기 위해 선의 좌표를 0.5만큼 이동하면 픽셀 그리드에 일치하면서 선명한 선을 그릴 수 있다.
    * 이를 보정하는 함수를 작성해 사용할 수 있다.

    ```js
    function crispPixel(pixel, thickness = 1) {
      const halfThickness = thickness / 2;

      return thickness % 2
        ? (isInteger(pixel) ? pixel : Math.round(pixel - halfThickness)) + halfThickness
        : Math.round(pixel);
    }
    ```

캔버스 초기화

* `<canvas>` 요소의 `width`, `height` 값을 직접 변경하면 이미 그려진 Canvas가 초기화된다.
* 이를 고려하지 않으면(e.g. 초기화된 뒤 canvas를 다시 그리는 시간이 길어지는 경우 등) canvas를 재설정하는 과정에서 깜빡거림이 발생할 수 있다.

테두리가 있는 사각형

* 테두리가 있는 사각형을 그리기 위해서는 `strokeRect()`와 `fillRect()` API를 사용한다.
* Canvas에서 선을 그릴 때 두께의 절반인 중심이 되는 부분이 기준 좌표가 된다는 점에 유의해야 한다.
* 위의 이유로 `strokeRect()`로 그린 선의 안쪽 절반은 `fillRect()`로 그린 영역과 겹치게 되고 이 때문에 두 API를 호출하는 순서에 따라 결과물이 달라질 수 있다.
    * `strokeRect()`를 나중에 호출하면 stroke가 앞에 위치하므로 `strokeRect()`에 지정한 온전한 두께의 선이 나타난다.
    * `fillRect()`를 나중에 호출하면 `fillRect()`로 그린 사각형이 앞에 위치하므로 stroke의 안쪽 절반이 이 사각형에 가려지게 된다.
