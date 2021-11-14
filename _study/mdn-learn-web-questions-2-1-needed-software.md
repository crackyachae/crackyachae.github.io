---
layout  : article
title   : 웹사이트를 만들기 위해서 필요한 소프트웨어 (What software do I need to build a website?)
summary : 
date    : 2021-11-12 23:17:06 +0900
updated : 2021-11-12 23:51:06 +0900
tag     : draft
toc     : true
public  : true
parent  : [[mdn-learn-web-questions]]
latex   : false
---
* TOC
{:toc}

> 이 글은 MDN Learn web development의 [Common question](https://developer.mozilla.org/en-US/docs/Learn/Common_questions) 중 [What software do I need to build a website?](https://developer.mozilla.org/en-US/docs/Learn/Common_questions/What_software_do_I_need)의 내용을 번역 및 정리한 글입니다.
>
> * 제가 필요한 부분 위주로 확인하면서 정리하고 있어 글에 덜 작성된 부분이 있습니다.
> * 글 작성 후 원문의 내용이 수정되거나 내용을 이해하기 위한 개인적인 설명이나 해석이 있을 수 있습니다. 되도록 원문을 참고해주시길 바랍니다.
> * 잘못된 부분이 있다면 댓글이나 그 외 편하신 방법으로 알려주시면 감사하겠습니다.

## 요약 (Summary)

## 더 깊게 알아보기 (Deeper dive)

### 웹 페이지를 생성하고 편집하기 (Creating and editing webpages)

### 웹에 파일 업로드하기 (Uploading files on the Web)

웹 사이트를 사람들에게 보여줄 준비가 되었으면, 웹 서버에 웹 페이지를 업로드해야 한다. 당신은 다양한 제공자로부터 서버의 공간을 살 수 있다.

* [How much does it cost to do something on the web?](https://developer.mozilla.org/en-US/docs/Learn/Common_questions/How_much_does_it_cost)를 참고하자

어떤 제공자를 사용할 지 정했다면, 제공자가 주로 SFTP(파일 전송 프로토콜) URL 형식으로 된 접근 정보, 사용자 이름, 그 외 그들의 서버에 연결하기 위해 필요한 다른 정보들을 메일로 보내 줄 것이다. (S)FTP는 이제 다소 오래된 방식이며 RSync나 Git/Github 등 다른 업로드 시스템이 유명해지기 시작했다는 점을 염두에 두자.

> Note: FTP는 본질적으로 불안정하다. 호스팅 제공자가 안전한 연결 방식을 사용하도록 허락하는지 확실히 해야 한다. e.g. SSH를 기반으로 한 SFTP나 RSync

### 웹사이트 보기 (Browsing websites)

그러나 몇몇 브라우저는 특정한 운영체제에서만 동작하기 때문에 테스트하는 것이 복잡해진다.

* 애플의 사파리는 iOS와 Max OS 에서만 동작하는 반면에,
* 인터넷 익스플로러는 윈도우에서만 동작한다.

이를 해결하기 위해 Browsershots나 Browserstack 같은 서비스를 이용하는 것이 좋다.

* Browsershots은 다양한 브라우저에서 웹 사이트의 스크린샷이 어떻게 보이는지 제공한다.
* Browserstack은 사이트를 대부분의 환경에서 테스트할 수 있도록 실제 가상머신에 완전한 원격 접근을 제공한다.

그 외에 자신의 가상 머신을 설치해도 되지만 약간의 전문지식이 필요하다.
