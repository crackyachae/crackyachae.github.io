---
layout  : article
title   : Next.js에 대하여 (About Next.js)
summary : 
date    : 2023-01-11 16:36:27 +0900
updated : 2023-01-12 18:08:09 +0900
tag     :
toc     : true
public  : true
parent  : [[/react-library/nextjs/learn-course]]
latex   : false
---
* TOC
{:toc}

> 이 글은 Next.js에서 제공하는 learn course의 [FOUNDATION](https://nextjs.org/learn/foundations/) 중 [About Next.js](https://nextjs.org/learn/foundations/about-nextjs)의 내용을 번역 및 정리한 글입니다.
>
> * 제가 필요한 부분 위주로 확인하면서 정리하고 있어 글에 덜 작성된 부분이 있을 수 있습니다.
> * 글 작성 후 원문의 내용이 수정되거나 내용을 이해하기 위한 개인적인 설명이나 해석이 있을 수 있습니다. 되도록 원문을 참고해주시길 바랍니다.
> * 잘못된 부분이 있다면 댓글이나 그 외 편하신 방법으로 알려주시면 감사하겠습니다.

## 개요(Introduction)

Next.js를 효율적으로 사용하기 위해서는 JavaScript, React 및 연관된 웹 개발 개념들에 익숙해지는 것이 도움이 됩니다. 하지만 JavaScript와 React는 광범위한 주제죠. 그렇다면 언제 Next.js를 사용할 준비가 되었다는 것을 어떻게 알 수 있을까요?

Next.js 기초 코스에 오신 것을 환영합니다! 이 초심자를 위한(beginner-friendly), 예제 중심의 코스는 Next.js를 위한 필수 지식을 안내합니다. 당신은 JavaScript 애플리케이션에서 시작해서 순차적으로 React와 Next.js로 단계별로 옮겨가는 간단한 프로젝트를 만들 것입니다.

각 섹션은 이전의 결과물로부터 만들어지므로 당신이 이미 알고 있는 것을 고려해 어디서부터 시작할지 결정할 수 있습니다.

> 이 튜토리얼은 HTML, CSS, JavaScript에 대한 지식을 갖추고 React에 대한 지식은 갖추지 못하고 있다는 것을 전제로 합니다. 당신이 이미 React에 익숙하다면 [Getting Started with Next.js](https://nextjs.org/learn/foundations/from-react-to-nextjs/getting-started-with-nextjs) 섹션이나 [Create your first Next.js app](https://nextjs.org/learn/basics/create-nextjs-app)으로 넘어가도 됩니다.

### 논의에 합류하세요 (Join the Conversation)

만약 Next.js나 이 코스와 연관된 궁금증이 생긴다면, 우리의 [Discord](https://discord.com/invite/Q3AsD4efFC) 커뮤니티에 문의하세요.

시작해봅시다!

## Next.js는 무엇인가요? (What is Next.js)

Next.js는 빠르게 **웹 애플리케이션**을 만들기 위한 빌딩 블록을 제공하는 유연한  **React 프레임워크**입니다. 그러나 이것은 정확히 무엇을 의미할까요? React와 Next.js가 무엇인지, 그리고 이것이 어떻게 도움이 될 수 있는지에 대해 좀 더 자세히 알아봅시다.

### 웹 애플리케이션의 빌딩 블록

최신 애플리케이션을 만들 때 고려해야 할 몇가지 것들이 있습니다. 예를 들어:

* **사용자 인터페이스** - 사용자가 애플리케이션을 어떻게 소비하고 애플리케이션과 어떻게 상호작용 할 것인가.
* **라우팅** - 사용자가 어떻게 애플리케이션의 다른 부분을 탐색할 것인가.
* **데이터 가져오기(Fetching)** - 데이터가 어디에 존재(live)하고 어떻게 가져올 것인가.
* **렌더링** - 정적 혹은 동적 콘텐츠를 언제 그리고 어디에 렌더링 할 것인가.
* **통합(Integrations)** - 어떤 서드파티 서비스 (CMS, 인증, 결제 등)를 사용하고 어떻게 이들을 연결할 것인가.
* **기반(Infrastructure)** - 애플리케이션 코드를 어디에 배포하고, 저장하고 어디에서 실행할 것인가 (서버리스, CDN, Edge 등).
* **성능(Performance)** - 최종 사용자(end-user)를 위해 어떻게 애플리케이션을 최적화할 것인가.
* **확장성(Scalability)** - 애플리케이션이 어떻게 팀, 데이터, 트래픽 증가(grow)에 대응(adapt)할 것인가.
* **개발자 경험** - 팀의 애플리케이션 구축 및 유지보수 경험.

당신은 애플리케이션의 각 부분에 대해 직접 해결책을 구축할지 아니면 라이브러리나 프레임워크와 같은 다른 도구를 사용할지 결정해야 합니다.

### React는 무엇인가요?

[React](https://beta.reactjs.org)는 양방향(interactive) **사용자 인터페이스**를 구축하기 위한 JavaScript **라이브러리**입니다.

사용자 인터페이스라 함은, 사용자가 화면에서 보고 상호작용하는 요소를 의미합니다.

![user-interface](https://nextjs.org/static/images/learn/foundations/user-interface.png)

라이브러리라 함은, React는 UI를 구축하기 위한 유용한 함수들을 제공하지만, 애플리케이션에서 이 함수들을 어디에 사용할 것인지는 개발자에게 맡긴다는 것을 의미합니다.

React의 성공 요인중 일부는 React가 구축 애플리케이션의 다른 측면에 대해 상대적으로 제약이 없다(unopinionated)[^unopinionated]는 것입니다. 이로 인해 서드파티 도구와 솔루션 생태계가 번성(flourishing)하게 되었습니다.

하지만, 이는 또한, 바닥부터 완전한 React 애플리케이션을 구축하려면 약간의(some) 노력이 필요하다는 것을 의미합니다. 개발자들은 요구사항에 맞는 도구를 구성하고 솔루션을 수정(reinventing)하는 데 시간을 투자해야 합니다.

### Next.js는 무엇인가요?

Next.js는 웹 애플리케이션을 만드는데 필요한 빌딩 블록을 제공하는 React **프레임워크**입니다.

프레임워크라 항은, Next.js가 React에 필요한 도구와 설정을 처리하고(handle), 애플리케이션을 위한 추가적인 구성, 기능, 그리고 최적화를 제공한다는 것을 의미합니다.

![next-app](https://nextjs.org/static/images/learn/foundations/next-app.png)

React를 사용해 UI를 구축하고, 라우팅, 데이터 가져오기, 통합과 같은 일반적인 애플리케이션 요구사항을 해결하기 위해 -개발자 및 최종 사용자의 경험을 모두 개선하는 동시에- 점진적으로(incrementally) Next.js 기능을 도입할 수 있습니다.

당신이 개인 개발자든 더 큰 팀의 일부이든 상관없이, React와 Next.js를 활용(leverage)해 완전히 상호작용적이면서, 매우 역동적이고, 성능이 좋은 웹 애플리케이션을 구축할 수 있습니다.

다음 강의에서는, React와 Next.js를 시작하는 방법에 대해 논의해 볼 예정입니다.

## 주석

[^unopinionated]: [컴퓨터 용어로서의 opinionated(편향적)의 의미](https://www.clien.net/service/board/cm_app/13558026) by enujekim @클리앙
