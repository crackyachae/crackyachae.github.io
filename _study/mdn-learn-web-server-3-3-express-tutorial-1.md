---
layout  : article
title   : "Express Tutorial: 지역 도서관 웹사이트 (The Local Library website)"
summary : 
date    : 2021-11-29 22:38:43 +0900
updated : 2021-11-30 00:09:43 +0900
tag     : draft
toc     : true
public  : true
parent  : [[mdn-learn-web-server]]
latex   : false
---
* TOC
{:toc}

> 이 글은 MDN Learn web development의 [Express web framework (Node.js/JavaScript)](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs) 중 [Express Tutorial: The Local Library website](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/Tutorial_local_library_website)의 내용을 번역 및 정리한 글입니다.
>
> * 제가 필요한 부분 위주로 확인하면서 정리하고 있어 글에 덜 작성된 부분이 있을 수 있습니다.
> * 글 작성 후 원문의 내용이 수정되거나 내용을 이해하기 위한 개인적인 설명이나 해석이 있을 수 있습니다. 되도록 원문을 참고해주시길 바랍니다.
> * 잘못된 부분이 있다면 댓글이나 그 외 편하신 방법으로 알려주시면 감사하겠습니다.

## 개요 (Overview)

MDN "지역 도서관" Express (Node) 튜토리얼에 온 것을 환영한다. 이 튜토리얼에서는 지역 도서관의 카탈로그를 관리하는 웹 사이트를 개발해본다.

이 튜토리얼 시리즈에서는

* *Express 애플리케이션 생성기* 도구를 사용해 웹사이트 뼈대와 애플리케이션을 만든다.
* Node 웹 서버를 시작하고 멈춘다.
* 데이터베이스를 사용해 애플리케이션의 데이터를 저장한다.
* 다른 정보의 요청에 대한 라우트와 브라우저에 표시될 HTML 형태로 데이터를 렌더링할 템플릿 ("뷰")를 만든다.
* 양식을 다룬다.
* 운영 환경(production)에 애플리케이션을 배포한다.

이 주제 중 일부는 이미 배웠고, 다른 주제들도 간단히 다뤘다. 이 튜토리얼 시리즈가 끝날 때면, 간단한 Express 앱을 스스로 만들 수 있을 정도로 충분히 알게 될 것이다.

## 로컬 라이브러리 웹사이트 (The LocalLibrary website)

*지역도서관(LocalLibrary)*은 이 튜토리얼 시리즈 코스를 따라 만들고 발전시킬 웹사이트의 이름이다.

이 웹사이트의 목적은

* 사용자가 대여할 수 있는(available) 책을 찾아보고
* 자신의 계정을 관리할 수 있는 작은 지역 도서관의 온라인 카탈로그를 제공하는 것이다.

이 예제는 필요한 만큼 더 많거나 적은 세부 정보를 표시할 수 있고, 거의 모든 Express 기능을 보여주는 데 사용할 수 있어서 선택됐다.

더 중요한 것은 웹 사이트에서 필요한 기능을 따라 가이드를 제공해줄 수 있다는 점이다:

* 처음 몇 개의 튜토리얼 글에서는 도서관 회원이 어떤 책을 대여할 수 있는지 알아보는 데 사용할 수 있는 간단한 *찾아보기 전용(browse-only)* 라이브러리를 정의한다. 이를 통해 거의 모든 웹 사이트에서 공통적인 작업을 접할(explore) 수 있다:
    * 데이터베이스에서 콘텐츠를 읽고 표시하는 것
* 과정을 진행하면서 도서관 예제는 자연스럽게 심화된 웹사이트 기능을 보이도록 확장한다.
    * 예를 들어 새 책을 생성하기 위해 라이브러리를 확장하고 이를 양식을 사용하거나 사용자 인증을 지원하는 방법을 보여주기 위해 사용할 수 있다.

이 예제는 확장성이 매우 높은 예제이지만, Express를 빠르게 시작하고 실행하는 데 도움이 될 최소한의 정보만 나타내고 싶기 때문에 이를 *지역* 도서관으로 지정했다.

* 그 결과로, 책, 책의 사본, 저자, 그 외 핵심 정보에 대한 정보만 저장할 수 있다.
* 그 외 도서관이 빌려줄 수 있는 다른 항목에 대한 정보를 저장하거나, 여러 개의 도서관 사이트나 다른 "큰 도서관" 기능을 지원하기 위해 필요한 인프라를 제공하지는 않는다.

## 막혔을 때 소스를 찾을 수 있는 곳 (I'm stuck, where can I get the source?)

튜토리얼을 따라 진행(work)할 때, 각 지점에서 복사해 붙여넣을 수 있는 적절한 코드 스니펫이 제공되고 스스로 확장해볼 수 있는 다른 코드도 (안내와 함께) 있을 예정이다.

모든 코드 스니펫을 복사해 붙여넣는 대신 이를 직접 입력해보면, 다음번에 비슷한 내용을 작성할 때 코드에 더 익숙할 수 있어서 장기적으로 도움이 될 것이다.

진행하다 막혔다면 [이 Github에서](https://github.com/mdn/express-locallibrary-tutorial) 완성된(fully developed) 웹사이트를 볼 수 있다.
