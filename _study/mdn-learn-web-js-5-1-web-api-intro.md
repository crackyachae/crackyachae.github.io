---
layout  : article
title   : Web API 소개 (Introduction to web APIs)
summary : 
date    : 2022-03-10 21:04:22 +0900
updated : 2022-03-11 15:28:53 +0900
tag     : draft
toc     : true
public  : true
parent  : [[mdn-learn-web-js]]
latex   : false
---
* TOC
{:toc}

> 이 글은 MDN Learn web development의 [Client-side web APIs](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Client-side_web_APIs) 중 [Introduction to web APIs](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Client-side_web_APIs/Introduction)의 내용을 번역 및 정리한 글입니다.
>
> * 제가 필요한 부분 위주로 확인하면서 정리하고 있어 글에 덜 작성된 부분이 있을 수 있습니다.
> * 글 작성 후 원문의 내용이 수정되거나 내용을 이해하기 위한 개인적인 설명이나 해석이 있을 수 있습니다. 되도록 원문을 참고해주시길 바랍니다.
> * 잘못된 부분이 있다면 댓글이나 그 외 편하신 방법으로 알려주시면 감사하겠습니다.

우선 대략적인 수준(high level)에서부터 API를 살펴볼 것이다 - 이들은 무엇인지, 어떤 방식으로 동작하는지, 자신의 코드에서 이들을 어떻게 사용하는지, 어떻게 구성되어 있는지? 또한, API의 다양한 메인 클래스가 무엇이고, 어떤 용도를 갖는지도 살펴볼 것이다.

## API는 무엇인가? (What are APIs?)

애플리케이션 프로그래밍 인터페이스(APIs)는 개발자들이 복잡한 기능을 더 쉽게 만들 수 있도록 해주는 프로그래밍 언어로 된 구조체(constructs)이다. API는 복잡한 코드를 사용자에게서 추상화해내어 그곳에서 사용할 수 있는 더 쉬운 문법을 제공한다.

실례로, 집, 아파트, 혹은 다른 주거지의 안의 전기 공급 장치를 생각해보자. 집에서 가전제품을 사용하고 싶을때, 이를 콘센트에 꽂아 넣기만 하면 기기가 작동한다. 사람들은 기기를 전원 공급 장치에 직접 연결하려고 하지 않는다 - 그렇게 하는 것은 매우 비효율적이고, 전기기사가 아닌 사람이 이를 시도하는 것은 어렵고, 위험하다.

같은 방식으로, 어떤 3D 그래픽을 프로그래밍하고 싶을 때, 컴퓨터의 GPU나 다른 그래픽 함수를 다루는 저수준의 코드(예를 들어 C나 C++)로 직접 작성해 시도하는 것보다 자바스크립트나 파이썬 같은 고수준(high-level)의 언어로 작성된 API로 수행하는 것이 훨씬 쉽다.

> Note: 추가 설명은 [API glossary entry](https://developer.mozilla.org/en-US/docs/Glossary/API)를 참고하자

### 클라이언트 측 자바스크립트의 API (APIs in client-side JavaScript)

클라이언트 측 자바스크립트는, 특히, 많은 API를 사용할 수 있다 - API는 자바스크립트 언어 자체의 일부는 아니며, 코어 자바스크립트 언어 위에 구축되어 자바스크립트 코드에서 사용할 수 있는 추가적인 초능력(superpowers)을 제공한다. 일반적으로 두 카테고리로 나눠진다:

* **브라우저 API(Browser APIs)**는
    * 웹 브라우저 안에 내장되어 있으며, 브라우저와 주변 컴퓨터 환경의 데이터를 드러내고 이들로 유용하고 복잡한 것들을 수행할 수 있다.
    * 예를 들어, [웹 오디오 API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API)는
        * 오디오 트랙을 가져와, 음량을 바꾸고, 음향 효과를 적용하는 등의 브라우저에서 오디오를 다루기 위한 구조체를 제공한다.
        * 그 뒤(background)에서는, 브라우저가 실제 오디오 처리를 위해 실제로 일부 복잡한 저수준의 코드(e.g. C++ 혹은 Rust)를 사용한다.
        * 그러나, 다시 말하지만, 이런 복잡함은 API에 의해 추상화된다.

* **서드파티 API(Third-party APIs)**는
    * 브라우저에 기본적으로 내장되어 있지는 않으며, 사용자가 웹 어딘가에서 코드와 정보를 가져와야 한다.
    * 예를 들어, [Twitter API](https://developer.twitter.com/en/docs)는
        * 자신의 웹 사이트에 자신의 최근 트윗을 표시할 수 있도록 해준다.
        * Twitter API는 Twitter 서비스를 쿼리하고 특정 정보를 반환하는데 사용할 수 있는 특별한 구조체 모음을 제공한다.

### 자바스크립트, API, 다른 자바스크립트 도구 사이의 관계 (Relationship between JavaScript, APIs, and other JavaScript tools)

자, 위에서, 클라이언트 측 자바스크립트 API가 무엇인지, 자바스크립트 언어와 어떻게 연관되어있는지에 대해 이야기했다. 이를 더 명확하게 하기 위해 요약(recap)해보고, 다른 자바스크립트 도구는 어디에 적합한지 설명해보자:

* 자바스크립트
    * 브라우저에 내장되어 웹 페이지/앱에 기능을 구현하도록 해주는 고-수준의 스크립팅 언어이다.
    * 자바스크립트는 [Node](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/Introduction)와 같은 다른 프로그래밍 환경에서도 사용할 수 있다는 것을 유의하자.
* 브라우저 API
    * 브라우저에 내장되어 자바스크립트 언어 위에 위치하고, 기능을 더 쉽게 구현할 수 있도록 해주는 구조체.
* 서드파티 API
    * 서드파티 플랫폼(e.g. Twitter, Facebook)에 내장되어 해당 플랫폼의 기능을 자신의 웹 페이지에서 사용할 수 있도록 해주는 구조체.
    * 예를 들어, 자신의 웹 페이지에 자신의 최근 트윗을 표시하는 것
* 자바스크립트 라이브러리
    * 일반적으로 웹 페이지에 첨부(attach)하여 공통 기능을 작성하거나 작성 속도를 높일 수 있는 사용자 정의 함수가 포함된 한 개 이상의 자바스크립트 파일.
    * 예시로 jQuery, Mootools, React가 포함된다.
* 자바스크립트 프레임워크
    * 라이브러리의 다음 단계로,
    * HTML, CSS, 자바스크립트, 다른 기술들을 설치한 후 처음(scratch)부터 전체 웹 애플리케이션을 작성하는데 사용하는 패키지라고 할 수(tend to) 있다 (e.g. Angular와 Ember).
    * 라이브러리와 프레임워크의 주된 차이점은 "제어 반전(Inversion of Control)"이다.
        * 라이브러리에서 메소드를 호출하면, 개발자가 이를 제어(control)할 수 있다.
        * 프레임워크를 사용하면, 제어 대상이 역전된다: 프레임워크가 개발자의 코드를 호출한다.

## API는 무엇을 할 수 있는가? (What can APIs do?)

최신 브라우저에는 사용할 수 있는 수많은 API가 있으며 이를 통해 코드에서 다양한 작업을 할 수 있다. [MDN API 인덱스 페이지](https://developer.mozilla.org/en-US/docs/Web/API)를 살펴보면 이를 확인할 수 있다.

### 공통 브라우저 API (Common browser APIs)

특별히, 당신이 사용하게 될 가장 흔한 (그리고 이번 모듈에서 더 자세히 다룰) 브라우저 API의 카테고리는:

* 브라우저에 불러온 **문서를 처리하기 위한 API**.
    * 가장 명백한 예시는 [DOM (Document Object Model) API](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model)로 HTML과 CSS를 조작할 수 있도록 해준다.
        * HTML을 생성하고, 제거하고, 수정하며, 페이지에 새로운 스타일을 동적으로 적용하는 등 .
    * 예를 들어, 페이지에서 팝업 창이나 새로운 콘텐츠가 표시되는 것을 볼 때마다 DOM이 동작하고 있다.
    * [문서 처리하기](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Client-side_web_APIs/Manipulating_documents)에서 이 유형의 API에 대한 더 많은 정보를 찾아보자.

* 웹 페이지의 일부분(small section)을 자체적으로 갱신하기 위해 **서버에서 데이터를 가져오는 API**가 매우 일반적으로 사용된다.
    * 겉으로 보기에는 작은 부분이 사이트의 성능과 동작에는 큰 영향을 미친다
    * 만약 재고 목록이나 가능한 새 스토리의 목록을 갱신해야 할 때, 서버로부터 전체 페이지를 리로드할 필요 없이 이를 즉각적으로 수행한다면 사이트나 앱은 훨씬 더 잘 반응하고 활기찬(snappy) 느낌이 들 수 있다.
    * 이를 위해 사용하는 주된 API는 [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) 지만, 오래된 코드는 [XMLHttpRequest](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest) API를 사용할 수도 있다. 또한 이 기술을 설명하는 **Ajax**라는 용어를 마주칠 수도 있다.
    * 이와 같은 API에 대한 더 많은 정보는 [서버에서 데이터 가져오기](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Client-side_web_APIs/Fetching_data)에서 확인할 수 있다.

* **그래픽을 그리고 처리하는 API**는 브라우저에서 널리 지원되고 있다
    * 가장 유명한 것은 [Canvas](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API)와 [WebGL](https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API)로, 2D, 3D 장면을 생성하기 위해 HTML [`<canvas>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/canvas) 요소 안에 포함된 픽셀 데이터를 프로그래밍적으로 업데이트할 수 있도록 해준다.
    * 예를 들어, 직사각형이나, 원 같은 도형을 그릴 수도 있고, 캔버스에 이미지를 불러올 수 있으며, Canvas API를 사용해 세피아나 흑백 필터를 적용하거나, WebGL을 사용해 조명과 텍스쳐와 함께 복잡한 3D 장면을 생성할 수도 있다.
    * 이런 API는 애니메이션 루프나 만화, 게임처럼 지속해서 장면을 업데이트하기 위한 것들을 생성하기 위한 API([`window.requestAnimationFrame()`](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame)처럼)와 결합해 사용한다.

* [`HTMLMediaElement`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement)와 같은 [**Audio와 Video API**](https://developer.mozilla.org/en-US/docs/Web/Guide/Audio_and_video_delivery), [Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API), [WebRTC](https://developer.mozilla.org/en-US/docs/Web/API/WebRTC_API)는 멀티미디어로 흥미로운 일을 할 수 있도록 해준다.
    * 예를 들어, 오디오와 비디오를 재생하는 사용자 지정 UI 컨트롤을 생성하거나, 설명과 자막 같은 텍스트 트랙을 비디오에 표시하거나, 웹 카메라에서 비디오를 받아(grab) 캔버스를 통해 조작하거나 웹 컨퍼런스의 다른 사람의 컴퓨터에 이를 표시하거나, 오디오 트랙에 효과(게인, 디스토션, 패닝 등)를 추가하는 등.

* **기기(Device) API**는 디바이스 하드웨어와 상호작용할 수 있도록 해준다
    * 예를 들어, [Geolocation API](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API)를 사용해 사용자의 위치를 찾기 위해 기기의 GPS에 접근하는 것.

* **클라이언트 측 저장소(storage) API**는
    * 클라이언트 사이드의 데이터를 저장해, 페이지를 불러오는 사이의 상태를 저장하는 앱을 생성하고, 아마 기기가 오프라인일 때도 동작할 수 있도록 해준다.
    * 몇 가지 가능한 옵션이 있다,
        * e.g. [Web Storage API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API)를 사용한 간단한 이름/값 저장소,
        * 그리고 [IndexedDB API](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API)를 사용한 더 복잡한 데이터베이스 저장소.

### 보편적인 서드파티 API (Common third-party APIs)

서드파티 API는 굉장히 다양하다; 조만간 사용할 가능성이 있는 인기 있는 것 중 일부는 다음과 같다:

* [Twitter API](https://developer.twitter.com/en/docs)는 자신의 웹 사이트에 자신의 최근 트윗을 게시할 수 있도록 해준다.
* [Mapquest](https://developer.mapquest.com)와 [Google Maps API](https://developer.mapquest.com) 같은 Map API를 사용하면 웹 페이지에서 지도와 관련된 모든 것들을 할 수 있도록 해준다.
* [Facebook suite of API](https://developers.facebook.com/docs/)는 앱에 이로운 Facebook 환경시스템중 여러 부분을 사용할 수 있도록 해준다. 예를 들어, Facebook 로그인을 사용해 앱 로그인을 제공하거나, 앱내 결제를 받아들이거나, 맞춤형 광고 캠페인을 표시(rolling out)하는 등.
* [Telegram API](https://core.telegram.org/api)은 봇을 지원할 뿐만 아니라 자신의 웹사이트에 Telegram 채널의 콘텐츠를 삽입할 수 있도록 해준다.
* [YouTube API](https://developers.google.com/youtube/)는 자신의 사이트에 YouTube 비디오를 삽입하고, Youtube를 검색하고, 플레이리스트를 생성하는 등을 할 수 있도록 해준다.
* [Pinterest API](https://developers.pinterest.com)는 핀터레스트 보드와 핀을 웹사이트에 포함하기 위한 관리 도구를 제공한다.
* [Twilio API](https://www.twilio.com)는 음성과 영상 통화 기능을 앱 안에 만들고, 앱에서 SMS/MMS를 보낼 수 있는 기능 등을 제공한다.
* [Mastodon API](https://docs.joinmastodon.org/api/)는 Mastodon 소셜 네트워크의 기능을 프로그래밍적으로 다룰 수 있도록 해준다.

> Note: 서드파티 API에 대한 훨씬 많은 정보를 [Programmable Web API directory](https://www.programmableweb.com/category/all/apis)에서 찾을 수 있다.

## API는 어떻게 동작하는가? (How do APIs work?)

각 자바스크립트 API는 조금씩 다른 방식으로 동작하지만, 일반적으로 공통 기능과 작동하는 방식에 유사한 테마가 있다.

### API는 객체를 기반으로 한다 (They are based on objects)

코드는 한 개 이상의 [자바스크립트 객체](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects)를 사용해서 API와 상호작용한다. 자바스크립트 객체는 API가 사용하는 데이터(객체 속성에 포함)와 API가 제공하는 기능(객체 메소드에 포함)을 위한 보관함(container) 역할을 한다.

> Note: 객체가 동작하는 방식이 익숙하지 않다면, 계속하기 전에 [자바스크립트 객체](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects) 모듈로 돌아가 다시 살펴봐야 한다.

Web Audio API의 예제로 돌아와서 - 이는 많은 객체로 구성된 꽤 복잡한 API이다. 가장 대표적(obvious)인 것은:

* [`AudioContext`](https://developer.mozilla.org/en-US/docs/Web/API/AudioContext). 브라우저 안에서 재생되는 오디오를 조작하는데 사용되는 [오디오 그래프](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Basic_concepts_behind_Web_Audio_API#audio_graphs)를 나타내고, 오디오를 조작할 수 있는 많은 메소드와 속성을 갖는다.

* [`MediaElementAudioSourceNode`](https://developer.mozilla.org/en-US/docs/Web/API/MediaElementAudioSourceNode). 오디오 컨텍스트 안에서 재생하고 조작하려는 음성을 포함하는 [`<audio>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/audio) 요소를 나타낸다.

* [`AudioDestinationNode`](https://developer.mozilla.org/en-US/docs/Web/API/AudioDestinationNode). 오디오의 목적지, 즉 실제로 이를 출력할 컴퓨터의 기기를 나타낸다 - 주로 사용자의 스피커나 헤드폰.

그래서 이 객체들은 어떻게 상호작용할까? [간단한 웹 오디오 예제](https://github.com/mdn/learning-area/blob/main/javascript/apis/introduction/web-audio/index.html)를 살펴보면([실제 실행 예제도 살펴보자](https://mdn.github.io/learning-area/javascript/apis/introduction/web-audio/)), 처음으로 다음의 HTML을 볼 것이다:

```html
<audio src="outfoxing.mp3"></audio>

<button class="paused">Play</button>
<br>
<input type="range" min="0" max="1" step="0.01" value="1" class="volume">
```

* 가장 처음으로 페이지에 MP3를 삽입하는 `<audio>` 요소를 포함한다. 어떤 기본 브라우저 컨트롤도 포함하지 않는다.
* 다음으로, 음악을 재생하고 정지하는 데 사용할 [`<button>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button)과 트랙이 재생되는 동안 음량을 조절하는데 사용할 범위(range) 타입의 [`<input>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input) 요소를 포함한다.

다음으로, 예제의 자바스크립트를 살펴보자.

트랙을 조작할 `AudioContext` 인스턴스를 안에 생성하는 것부터 시작한다:

```js
const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioCtx = new AudioContext();
```

다음으로, `<audio>`, `<button>`, `<input>` 요소에 대한 참조를 저장할 상수를 생성하고, [`AudioContext.createMediaElementSource()`](https://developer.mozilla.org/en-US/docs/Web/API/AudioContext/createMediaElementSource) 메소드를 사용해 오디오 소스를 나타내는 `MediaElementAudioSourceNode`를 만든다 - `<audio>` 요소는 다음에서 재생된다:

```js
const audioElement = document.querySelector('audio');
const playBtn = document.querySelector('button');
const volumeSlider = document.querySelector('.volume');

const audioSource = audioCtx.createMediaElementSource(audioElement);
```

다음으로 버튼을 누르면 재생과 일시정지 사이를 전환하고 노래의 재생이 끝났을 때 플레이어(display)를 초기화하기 위한 몇몇 이벤트 핸들러 포함할 것이다:

```js
// 오디오를 재생/일시정지
playBtn.addEventListener('click', () => {
  // 컨텍스트가 정지된(suspended) 상태인지 확인 (autoplay policy)
  if (audioCtx.state === 'suspended') {
     audioCtx.resume();
  }

  // 트랙이 정지상태이면, 재생
  if (playBtn.getAttribute('class') === 'paused') {
    audioElement.play();
    playBtn.setAttribute('class', 'playing');
    playBtn.textContent = 'Pause'
    // 트랙이 재생상태이면, 정지
} else if (playBtn.getAttribute('class') === 'playing') {
    audioElement.pause();
    playBtn.setAttribute('class', 'paused');
    playBtn.textContent = 'Play';
  }
});

// 만약 트랙 재생이 끝나면 
audioElement.addEventListener('ended', () => {
  playBtn.setAttribute('class', 'paused');
  playBtn.textContent = 'Play'
});
```

> Note: 트랙을 재생하고 일시정지하는데 사용되는 `play()`와 `pause()` 메소드는 Web Audio API의 일부가 아니라는 것을 눈치챘을 것이다; 이들은 [`HTMLMediaElement`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement)의 일부로 Web Audio API와는 다르지만 밀접하게 연관되어있다.

다음으로, [AudioContext.createGain()](https://developer.mozilla.org/en-US/docs/Web/API/BaseAudioContext/createGain) 메소드를 사용해 오디오에 제공되는 음량을 조절하는데 사용되는 [`GainNode`](https://developer.mozilla.org/en-US/docs/Web/API/GainNode) 객체를 만들고, 오디오 슬라이더의 값이 바뀔 때마다 그래프의 게인(음량) 값을 바꾸는 또 다른 이벤트 핸들러를 만들 것이다.

```js
// 음량
const gainNode = audioCtx.createGain();

volumeSlider.addEventListener('input', () => {
  gainNode.gain.value = this.value;
});
```

마지막으로 할 일은 모든 노드 유형에 사용할 수 있는 [`AudioNode.connect()`](https://developer.mozilla.org/en-US/docs/Web/API/AudioNode/connect) 메소드를 사용해 오디오 그래프의 각(different) 노드를 연결하는 것이다.

```js
audioSource.connect(gainNode).connect(audioCtx.destination);
```

오디오는 소스에서 시작해, 오디오의 음량을 조절할 수 있도록 게인 노드에 연결된다. 다음으로 게인 노드가 음성이 컴퓨터에서 재생될 수 있도록 대상(destination) 노드에 연결된다. ([`AudioContext.destination`](https://developer.mozilla.org/en-US/docs/Web/API/BaseAudioContext/destination) 속성은 사용자 컴퓨터의 하드웨어에서 사용할 수 있는 기본 [`AudioDestinationNode`](https://developer.mozilla.org/en-US/docs/Web/API/AudioDestinationNode)를 나타낸다 e.g. 사용자의 스피커).

### 인식 가능한 진입점을 갖는다 (They have recognizable entry points)

API를 사용할 때, API를 위한 진입점이 어디인지 확실히 해야 한다. Web Audio API에서는, 꽤 간단하게 진입점을 파악할 수 있다 - 어떤 오디오를 조작하든 오디오를 조작하기 위해서는 꼭 필요한 [AudioContext](https://developer.mozilla.org/en-US/docs/Web/API/AudioContext)가 진입점이다.

문서 객체 모델 (Document Object Model, DOM) API 역시 간단한 진입점을 갖는다 - DOM API의 기능은 [`Document`](https://developer.mozilla.org/en-US/docs/Web/API/Document) 객체에 포함되어(hanging off)있거나, 사용자가 어떤 방식으로든 영향을 미치려는 HTML 요소의 인스턴스인 경향이 있다, 예를 들어:

```js
const em = document.createElement('em'); // 새로운 요소를 생성한다.
const para = document.querySelector('p'); // 존재하는 p(단락) 요소를 참조한다.
em.textContent = 'Hello there!'; // em에 텍스트 컨텍스트를 부여한다.
para.appendChild(em); // em을 para에 삽입한다.
```

[Canvas API](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API) 역시 대상을 조작하는데 사용할 컨텍스트 객체를 얻는 것에 의존하지만, 이 경우 컨텍스트는 오디오 컨텍스트가 아닌 그래픽 컨텍스트이다. Canvas API의 컨텍스트 객체는 그리려는 [`<canvas>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/canvas) 요소에 대한 참조를 가져와, 그다음 [`HTMLCanvasElement.getContext()`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/getContext) 메소드를 호출해 얻을 수 있다.

```js
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
```

그러면 캔버스에 하고 싶은 모든 것은 컨텍스트 객체의 속성과 메소드([`CanvasRenderingContext2D`](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D)의 인스턴스)를 호출해 수행(achieve)할 수 있다, 예를 들어:

```js
Ball.prototype.draw = function() {
  ctx.beginPath();
  ctx.fillStyle = this.color;
  ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
  ctx.fill();
};
```

> Note: 이 코드가 동작하는 것은 [bouncing balls demo](https://github.com/mdn/learning-area/blob/main/javascript/apis/introduction/bouncing-balls.html)에서 확인할 수 있다 ([실제 실행 예제](https://mdn.github.io/learning-area/javascript/apis/introduction/bouncing-balls.html)도 참고하자).

### 이벤트를 사용해 상태 변화를 처리한다 (They often use events to handle changes in state)

이벤트에 대해서는 이 코스의 [이벤트 소개](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Events) 글에서 이미 다뤘고, 클라이언트 측 웹 이벤트가 무엇이고, 코드에서 어떻게 사용되는지 자세히 살펴봤다. 클라이언트 측 웹 API 이벤트 동작에 대해서 익숙하지 않다면 계속하기 전에 먼저 이 문서를 읽어보자.

일부 웹 API는 이벤트를 포함하지 않지만, 대부분은 몇 개라도 포함한다. 이벤트가 발생했을 때 함수를 실행할 수 있도록 해주는 핸들러 속성은 일반적으로 MDN refenrence 자료에 별도의 "이벤트 핸들러" 섹션으로 나열되어있다.

우리는 이미, 위의 Web Audio API 예제에서 많은 이벤트 핸들러를 봤다.

```js
// 오디오를 재생/일시정지
playBtn.addEventListener('click', () => {
  // 컨텍스트가 정지된(suspended) 상태인지 확인 (autoplay policy)
  if (audioCtx.state === 'suspended') {
     audioCtx.resume();
  }

  // 트랙이 정지상태이면, 재생
  if (playBtn.getAttribute('class') === 'paused') {
    audioElement.play();
    playBtn.setAttribute('class', 'playing');
    playBtn.textContent = 'Pause'
    // 트랙이 재생상태이면, 정지
} else if (playBtn.getAttribute('class') === 'playing') {
    audioElement.pause();
    playBtn.setAttribute('class', 'paused');
    playBtn.textContent = 'Play';
  }
});

// 만약 트랙 재생이 끝나면 
audioElement.addEventListener('ended', () => {
  playBtn.setAttribute('class', 'paused');
  playBtn.textContent = 'Play'
});
```

### 적절한 곳에 추가적인 보안 메커니즘을 갖는다 (They have additional security mechanisms where appropriate)

WebAPI 기능은 자바스크립트와 기타 웹 기술과 같은 보안 고려 사항이 적용되지만 (예를 들어 [same-origin policy](https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy)), 종종 필요한 곳에 추가적인 메커니즘을 갖기도 한다. 예를 들어, 최신 WebAPI 중 일부는 잠재적으로 중요한(sensitive) 데이터를 전송하기 때문에 HTTPS로 제공된 웹 페이지에서만 작동한다 (예시로 [Service Workers](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)와 [Push](https://developer.mozilla.org/en-US/docs/Web/API/Push_API)가 포함된다).

추가로, 일부 WebAPI는 사용자의 코드에서 호출이 이뤄지면 사용자에게 API를 활성화하기 위한 사용 권한을 요청하기도 한다. 예를 들어, [Notifications API](https://developer.mozilla.org/en-US/docs/Web/API/Notifications_API)는 팝업 메시지(dialog) 박스를 사용해 권한을 요청한다:

Web Audio와 [`HTMLMediaElement`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement) API는 [autoplay policy](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Best_practices#autoplay_policy) 라는 보안 메커니즘이 적용된다 - 이는 기본적으로 페이지가 로딩됐을 때, 오디오를 자동으로 재생할 수 없다는 것을 의미한다 - 사용자가 버튼과 같은 컨트롤을 통해 오디오 재생을 시작할 수 있도록 해야 한다. 이는 오디오가 자동 재생되면 일반적으로 굉장히 성가시기 때문이며, 사용자에게 이를 강요해서는 안 된다.

> Note: 브라우저가 얼마나 엄격한가에 따라, 이런 보안 메커니즘은 예제가 로컬에서 작동하지 않도록 할 수도 있다, i.e. 사용자가 로컬 예제 파일을 웹 서버에서 실행하는 대신 브라우저에 로드하는 경우. 이 글을 작성할 때는, Web Audio API 예제는 Google Chrome에서는 로컬로 동작하지 않는다 - 작동하기 전에 GitHub에 업로드 해야 했다.
