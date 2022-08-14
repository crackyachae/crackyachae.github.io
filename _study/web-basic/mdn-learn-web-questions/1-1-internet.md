---
layout  : article
title   : 인터넷은 어떻게 동작하는가 (How does the Internet work?)
summary : 
date    : 2021-11-11 22:51:01 +0900
updated : 2021-11-12 15:58:45 +0900
tag     : draft
toc     : true
public  : true
parent  : [[/web-basic/mdn-learn-web-questions]]
latex   : false
---
* TOC
{:toc}

> 이 글은 MDN Learn web development의 [Common question](https://developer.mozilla.org/en-US/docs/Learn/Common_questions) 중 [How does the Internet work?](https://developer.mozilla.org/en-US/docs/Learn/Common_questions/How_does_the_Internet_work)의 내용을 번역 및 정리한 글입니다.
>
> * 제가 필요한 부분 위주로 확인하면서 정리하고 있어 글에 덜 작성된 부분이 있을 수 있습니다.
> * 글 작성 후 원문의 내용이 수정되거나 내용을 이해하기 위한 개인적인 설명이나 해석이 있을 수 있습니다. 되도록 원문을 참고해주시길 바랍니다.
> * 잘못된 부분이 있다면 댓글이나 그 외 편하신 방법으로 알려주시면 감사하겠습니다.

## 요약 (Summary)

인터넷은 웹의 뼈대로 웹이 동작하도록 해주는 기술적인 기반이다. 가장 기본적인 것은, 인터넷은 컴퓨터들이 서로 통신할 수 있는 거대한 네트워크라는 것이다.

인터넷을 뒷받침하는 다양한 기술은 시간을 따라 발전해왔지만, 인터넷이 작동하는 방식 자체는 크게 변하지 않았다: 인터넷은 모든 컴퓨터를 서로 연결하고, 어떤 일이 있어도 연결 상태를 유지할 수 있는 방법이다.

## 활동적 학습 (Active Learning)

* [How the internet Works in 5 minutes](https://www.youtube.com/watch?v=7_LPdttKXPc): 인터넷 기초를 이해할 수 있는 5분짜리 비디오 by Aaron Titus.
* [How does the Internet work?](https://www.youtube.com/watch?v=x3c1ih2NJEg): 구체적인 시각 자료가 있는 8분짜리 비디오.

## 더 깊게 알아보기 (Deeper dive)

### 간단한 네트워크 (A simple network)

두 개의 컴퓨터가 통신을 해야 할 때, 이들을 물리적(보통 이더넷 케이블을 이용해서) 또는 무선으로 (예를 들어, WiFi 나 Bluetooth 시스템) 연결해야 한다. 현대의 모든 컴퓨터는 이런 연결방식 중 하나로 연결을 유지한다.

> Note: 이후의 글에서는 유선 케이블에 관해서만 이야기 하지만 무선 네트워크도 동일하게 동작한다.

이와 같은 연결망은 두 대의 컴퓨터에 한정되지 않는다. 원하는 만큼 컴퓨터를 연결할 수 있지만 (컴퓨터가 많아질수록) 연결 상황은 빠르게 복잡해진다.

* 예를 들어 10개의 컴퓨터를 연결하기 위해서는 컴퓨터당 9개의 플러그와 45개의 케이블이 필요하다.

#### 라우터 (router)

이런 문제를 해결하기 위해 네트워크상의 각 컴퓨터는 *라우터(router)* 라고 하는 작고 특별한 컴퓨터에 연결되어있다.

라우터는 단 하나의 일만을 수행한다: 특정 컴퓨터에서 보낸 메시지를 올바른 목적지 컴퓨터에 전달해주는 것이다.

* 예를 들어 컴퓨터 B에게 메시지를 보내려면 컴퓨터 A가 메시지를 라우터로 보내야 하며, 라우터는 메시지를 컴퓨터 B로 전달하면서 컴퓨터 C로는 전달되지 않도록 한다.

시스템에 라우터를 추가하게 되면 10개의 컴퓨터로 이루어진 네트워크는 10개의 케이블만 있으면 된다. 각 컴퓨터에는 하나의 플러그만 있어도 되며 10개의 플러그가 달린 라우터가 필요하다.

### 네트워크 속의 네트워크 (A network of networks)

더 많은 컴퓨터를 연결해보자. 수백, 수천, 수십억 대의 컴퓨터를 연결하기 위해서는 어떻게 해야 할까.

하나의 라우터를 그렇게 확장할 수는 없지만, 라우터도 다른 것들과 마찬가지로 '컴퓨터'이므로 라우터끼리도 연결할 수 있다.

여러 개의 컴퓨터를 라우터에 연결하고 라우터를 라우터끼리 연결해서 네트워크를 무한하게 확장할 수 있다.

* 하나의 라우터에 연결된 여러 컴퓨터를 작은 네트워크로, 라우터끼리 연결해서 생성한 네트워크를 큰 네트워크로 볼 수 있는 것 같다.
* 네트워크 속의 네트워크.

#### 모뎀 (modem)

위의 네트워크는 우리가 인터넷이라고 부르는 것에 매우 가깝긴 하지만 한 가지 문제가 있다. 자신의 집과 전 세계 다른 집 사이에 케이블을 연결하는 것이 불가능하다는 것이다.

이 문제를 해결하기 위해 생각해보면 이미 자신의 집에 연결된 케이블들이 존재한다. 바로 전력과 전화선이다. 전화 시설은 각 집과 세계의 어느 다른 집을 이미 연결하고 있고 이것은 지금 우리에게 필요한 완벽한 배선이다.

네트워크를 전화 시설과 연결하기 위해선, *모뎀(modem)* 이라는 특별한 장비가 필요하다. 모뎀은 우리 네트워크의 정보를 전화 시설에서 처리할 수 있는 정보나 그 반대의 경우로 바꿔준다.

#### ISP (Internet Service Provider)

이제 네트워크를 전화 시설에 연결했다. 다음 단계는 지금의 네트워크에서 원하는(want to reach) 네트워크로 메시지를 보내는 것이다.

그렇게 하기 위해 네트워크를 인터넷 서비스 제공 업체 (Internet Service Provider, ISP)에 연결한다. ISP는 서로 연결되어 있으면서 다른 ISP의 라우터에도 접근할 수 있는 *특별한 라우터*를 관리하는 회사이다.

따라서 우리 네트워크에서 출발한 메시지는 ISP 네트워크의 네트워크를 통해 목표 네트워크로 전달된다. 인터넷은 이러한 전체 네트워크 인프라로 구성됩니다.

### 컴퓨터 찾기 (Finding computers)

#### IP 주소

컴퓨터에 메시지를 보내려면 메시지를 받을 컴퓨터를 특정해야 한다.

따라서 네트워크에 연결된 모든 컴퓨터에는 자신을 특정하는 IP 주소(IP는 인터넷 프로토콜을 의미한다)라는 고유한 주소가 있다.

IP 주소는 점으로 구분된 네 개의 숫자로 구성되어있다.

* 예: 192.168.2.10.

#### 도메인 이름 (domain name)

컴퓨터는 이 주소로 다른 컴퓨터를 찾아가는 데 문제가 없다. 그러나 사람들은 이와 같은 형태의 주소를 기억하기 어렵다. 그래서 이를 쉽게 읽을 수 있도록, IP 주소를 사람이 읽을 수 있는 도메인 이름(domain name) 이라고 하는 별칭을 지어준다.

* 예를 들어 'google.com'은 IP 주소 '173.194.121.32'를 나타내기 위한 도메인 이름이다.

도메인 이름은 인터넷 너머에 있는 컴퓨터에 도달할 수 있는 가장 쉬운 방법이라고 할 수 있다.

### 인터넷과 웹 (Internet and the web)

웹 브라우저를 사용하여 웹을 탐색할 때 일반적으로 도메인 이름을 사용해 웹 사이트에 접속한다. 하지만 이것이 인터넷과 웹이 같다는 것을 의미하지는 않는다.

앞에서 보았듯이 인터넷은 수십억 대의 컴퓨터를 모두 연결하는 기술 기반이다. 인터넷은 (기술적) 기반이며, 웹은 그 기반 위에 구축된 서비스이다.

* 이 컴퓨터 중 일부는 (웹 서버라고 불린다) 웹 브라우저로 웹 브라우저가 이해할 수 있는 메시지를 보낼 수 있다.

웹뿐만 아니라 인터넷 위에 구축된 다른 서비스(이메일, IRC 등)도 있다는 것을 알아야 한다.

### 인트라넷과 엑스트라넷 (Intranets and Extranets)

#### 인트라넷

인트라넷(Intranet)은 특정 조직의 구성원에게만 제한적으로 공개된 *사적인* 네트워크이다. 일반적으로 구성원들이 공유된 자료(resources)에 안전하게 접근하고, 협업하고, 소통할 수 있는 포탈을 제공하기 위해 사용된다.

예를 들어, 조직의 인트라넷은

* 부서나 팀 정보를 공유하기 위한 웹 페이지나
* 중요한 문서나 파일을 관리하기 위한 공유 드라이브
* 비즈니스 관리 작업을 수행하기 위한 포탈
* 위키, 토론 게시판 및 관리 시스템과 같은 공동 작업 도구 등을 호스팅할 수 있다.

#### 엑스트라넷

엑스트라넷(Extranet)은 인트라넷과 유사하지만, 사적인 네트워크의 일부나 전부를 다른 조직과 공유하고 협업하기 위해 개방해놓았다는 차이점이 있다. 특히 비즈니스적으로 가깝게 일하는 클라이언트나 이해관계자에게 정보를 안전하게 공유하기 위해 사용된다.

이들의 역할은 인트라넷이 제공하는 것과 자주 비슷하다.

* 정보와 파일의 공유
* 협업 도구, 토론 게시판 등

인트라넷과 엑스트라넷 모두 동일한 종류의 인터넷 기반시설 위에서 동작하고, 동일한 프로토콜을 사용한다. 그러므로 여기에는 승인된 멤버들만 접근할 수 있으며 다른 물리적 장소에 있는 멤버들을 연결하기 위해 사용된다.