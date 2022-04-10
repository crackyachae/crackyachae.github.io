---
layout  : article
title   : 서버 측 웹 프레임워크 (Server-side web frameworks)
summary : 
date    : 2021-11-16 00:40:56 +0900
updated : 2021-11-17 01:02:06 +0900
tag     : 
toc     : true
public  : true
parent  : [[mdn-learn-web-server]]
latex   : false
---
* TOC
{:toc}

> 이 글은 MDN Learn web development의 [Server-side website programming first steps](https://developer.mozilla.org/en-US/docs/Learn/Server-side/First_steps) 중 [Server-side web frameworks](https://developer.mozilla.org/en-US/docs/Learn/Server-side/First_steps/Web_frameworks#overview)의 내용을 번역 및 정리한 글입니다.
>
> * 제가 필요한 부분 위주로 확인하면서 정리하고 있어 글에 덜 작성된 부분이 있을 수 있습니다.
> * 글 작성 후 원문의 내용이 수정되거나 내용을 이해하기 위한 개인적인 설명이나 해석이 있을 수 있습니다. 되도록 원문을 참고해주시길 바랍니다.
> * 잘못된 부분이 있다면 댓글이나 그 외 편하신 방법으로 알려주시면 감사하겠습니다.

## 개요 (Overview)

서버 측 웹 프레임워크("웹 애플리케이션 프레임워크"라고도 하는)는 웹 애플리케이션을 쉽게 작성하고,  유지보수하고, 확장(scale)할 수 있도록 하는 소프트웨어 프레임워크이다.

웹 프레임워크는 다음과 같은 일반적인 웹 개발 작업을 단순화하는 도구와 라이브러리를 제공한다.

* 적절한 핸들러로 URL을 라우팅
* 데이터베이스와의 상호작용
* 유저 인증과 세션 지원
* 출력 형식 (e.g. HTML, JSON, XML) 지정
* 웹 공격에 대한 보안 강화 같은

## 웹 프레임워크가 할 수 있는 일 (What can a web framework do for you?)

### HTTP 요청과 응답을 직접 다루기 (Work directly with HTTP requests and responses)

웹 프레임워크는 HTTP 요청과 응답을 다룰(work with) 서버 측 코드를 작성하는 문법을 단순하게 작성할 수 있도록 해준다.

* 이는 해야 하는 일이 쉬워지고
* 저수준(low-level)의 네트워크 기본 요소(primitives)가 아닌 고수준(high-level)의 코드를 사용해 더 쉽게 상호작용할 수 있다는 것을 의미한다.

아래의 예시는 Django (Python) 웹 프레임워크가 어떻게 작동하는지를 보여준다.

모든 "view" 함수(요청 핸들러)는  요청 정보를 포함한 `HttpRequest` 객체를 받고, 형식을 갖춘 결과물(output, 이번 경우에선 문자열)을 포함한 `HttpResponse` 객체를 반환한다.

```python
# Django 의 view 함수
from django.http import HttpResponse

def index(request):
    # HttpRequest(요청)를 얻는다.
    # 요청의 정보를 이용해 작업을 수행한다.
    # HttpResponse를 반환한다.
    return HttpResponse('Output string to return')
```

### 요청을 적절한 핸들러에 라우팅하기 (Route requests to the appropriate handler)

대부분의 사이트는 각각의(distinct) URL을 통해 여러 개의 다른 리소스에 접근할 수 있도록 제공한다.

하나의 함수로 이 모든 걸 처리하려면 유지 보수가 매우 힘들기 때문에, 웹 프레임워크는 URL 패턴을 특정 핸들러 함수에 매핑하는 간단한 메커니즘을 제공한다. 또한 이런 접근 방식은 기본 코드를 변경하지 않고도 특정 기능을 제공하기 위한 URL을 바꿀 수 있기 때문에 유지 보수 측면에서도 유용하다.

각각의 프레임워크는 다른 매핑 메커니즘을 사용한다.

예를 들어, Flask (Python) 웹 프레임워크는 데코레이터를 사용해 view 함수에 경로를 추가한다.

```python
@app.route("/")
def hello():
    return "Hello World!"
```

반면에 Django 는 개발자가 URL 패턴과 view 함수 사이에 URL 매핑 목록을 정의할 것으로 예상한다.

```python
urlpatterns = [
    url(r'^$', views.index),
    # example: /best/myteamname/5/
    url(r'^(?P<team_name>\w.+?)/(?P<team_number>[0-9]+)/$', views.best),
]
```

### 요청 데이터에 쉽게 접근하기 (Make it easy to access data in the request)

데이터는 HTTP 응답에서 다양한 방법으로 인코딩될 수 있다.

* 서버에서 파일이나 데이터를 가져오는 HTTP `GET` 요청은 URL 매개변수나 URL 구조 내에서 필요한(required) 데이터를 인코딩할 수 있다.
* 서버의 리소스를 업데이트하기 위한 HTTP `POST` 요청은 요청 본문 내에 업데이트 정보를 "POST data"로 포함한다.
* 또한, HTTP 요청은 현재 세션이나 사용자에 대한 정보도 클라이언트 측 쿠키 안에 포함할 수 있다.

웹 프레임워크는 위의 정보에 접근하기 위해 프로그래밍 언어에 적합한 메커니즘을 제공한다.

* 예를 들어 Django 가 모든 view 함수에 전달하는 `HttpRequest` 객체는 대상 URL, 요청 유형 (e.g. HTTP `GET`), `GET` 또는 `POST` 매개 변수, 쿠키와 세션 데이터 등에 접근하기 위한 메소드와 속성을 포함한다.
* Django는 URL 매퍼(mapper)에 "캡처 패턴"을 정의해 URL 구조로 인코딩된 정보를 전달할 수도 있다 (위 섹션의 마지막 코드 조각을 참고하자).

### 데이터베이스 접근의 추상화 및 단순화 (Abstract and simplify database access)

웹 사이트는 데이터베이스를 사용해 사용자와 공유할 정보와 사용자에 대한 정보 모두를 저장한다. 웹 프레임워크는 종종 데이터베이스의 읽기, 쓰기, 쿼리, 삭제 작업을 추상화하는 데이터베이스 계층(layer)을 제공한다. 이런 추상 계층을 객체 관계형 매퍼(Object-Relational Mapper, ORM)라고 한다.

ORM을 사용하면 두 가지 장점이 있다:

* 데이터베이스를 사용하는 코드를 변경할 필요 없이 기본 데이터베이스를 교체할 수 있다.
    * 이를 통해 개발자는 용도에 따라 각각 다른 데이터베이스의 특성에 맞춰 최적화할 수 있다.
* 프레임워크 안에서 기본적인 데이터의 유효성 검사를 구현할 수 있다.
    * 이를 통해 데이터를 올바른 유형의 데이터베이스 필드에 저장하는지
    * 데이터가 올바른 형식인지 (e.g. 이메일 주소)
    * 어떤 방식으로든 악의적이지 않은지 (크래커는 특정 코드 패턴을 사용하여 데이터베이스 레코드를 지우는 것과 같은 나쁜 일을 할 수 있다) 쉽고 안전하게 확인할 수 있다.

예를 들어 Django 웹 프레임워크는 ORM을 제공하며, 레코드 구조를 모델로 정의하기위해 사용하는 객체를 참조한다.

* 모델은 저장될 필드 *유형*을 지정하고, 저장할 수 있는 정보에 대해 필드 수준의 유효성 검사를 제공할 수 있다.
    * e.g. 이메일 입력란은 유효한 이메일 주소만 허용한다.
* 또한 필드 정의는 최대 크기, 기본값, 선택 목록 옵션, 문서를 위한 도움말, 양식의 레이블 텍스트 등을 지정할 수도 있다.
* 모델은 코드와 별도로 변경될 수 있는 구성 설정이므로 기본 데이터베이스에 대한 어떤 정보도 명시하지 않는다.

아래의 첫 번째 코드 스니펫은 `Team` 객체에 대한 매우 간단한 Django 모델을 보여준다.

* 이 객체는 팀 이름과 팀의 레벨을 문자 필드로 저장하고 각 레코드에 저장될 최대 문자 수를 지정한다.
* `team_level`은 선택 필드이므로 표시할 선택 항목과 저장할 데이터 사이의 매핑을 기본값과 함께 제공한다.

```python
#best/models.py

from django.db import models

class Team(models.Model):
    team_name = models.CharField(max_length=40)

    TEAM_LEVELS = (
        ('U09', 'Under 09s'),
        ('U10', 'Under 10s'),
        ('U11', 'Under 11s'),
        ...  #list our other teams
    )
    team_level = models.CharField(max_length=3,choices=TEAM_LEVELS,default='U11')
```

Django 모델은 데이터베이스 검색을 위한 간단한 쿼리 API를 제공한다.

* 이는 다른 기준(e.g. 정확(exact), 대소문자를 구분하지 않음(case-insensitive), 더 큼(greather than) 등)을 사용해 한 번에 여러 개의 필드와 일치시킬 수 있고
* 복잡한 명령문(예를 들어, 팀 이름이 "Fr"로 시작하거나 "al"로 끝나는 U11팀에 대한 검색을 지정할 수 있다)을 지원할 수 있다.

두 번째 코드 스니펫은 U09의 모든 팀을 표시하는 view 함수(리소스 핸들러)를 보여준다.

* 이 경우 `team_level` 필드가 정확히 'U09' 텍스트를 갖는 모든 레코드를 필터링하도록 지정한다.
* 이 기준이 필드 이름과 일치 유형을 두 개의 밑줄로 구분한 인수(team_level__exact)로 어떻게 `filter()` 함수에 전달되는지 확인하자.

```python
#best/views.py

from django.shortcuts import render
from .models import Team

def youngest(request):
    list_teams = Team.objects.filter(team_level__exact="U09")
    context = {'youngest_teams': list_teams}
    return render(request, 'best/index.html', context)
```

### Rendering data

웹 프레임워크는 종종 템플릿 시스템을 제공한다.

* 템플릿 시스템은 페이지가 생성될 때 데이터가 추가되는 자리 표시자를 사용해 결과(output) 문서의 구조를 지정한다.
* 템플릿은 보통 HTML로 만들지만, 다른 유형의 문서로 작성할 수도 있다.

웹 프레임워크는 보통 저장된 데이터를 JSON, XML을 포함한 다른 형식으로 쉽게 생성 할 수 있는 메커니즘을 제공한다.

{% raw %}

예를 들어, Django 템플릿 시스템은 "double-handlebars" 문법(e.g. `{{ variable_name }}`)을 사용해 변수를 지정할 수 있으며 이 변수들은 페이지가 렌더링 될 때 view 함수에서 전달된 값들로 대체된다. 또한 템플릿 시스템은 템플릿에 전달된 목록 값 순회(iterating)와 같은 간단한 동작을 수행할 수 있는 다양한 표현식(e.g. `{% expression %}`)을 지원한다

> Note: 다른 대부분의 템플릿 시스템들은 비슷한 문법을 사용한다, e.g. Jinja2 (Python), handlebars (JavaScript), moustache (JavaScript) 등.

아래의 코드 스니펫은 템플릿이 어떻게 작동하는지 보여준다.

이전 섹션에 사용한 "youngest team" 예제를 계속 보면,

* HTML 템플릿은 view에서 `youngest_teams`라고 하는 목록 변수를 전달한다.
* HTML 뼈대 안에는
    * 먼저 `youngest_teams`가 있는지 확인하고
    * (`youngest_teams`가 존재한다면) for 반복문을 순회하는 표현식이 있다.
* 반복할 때마다 템플릿은 목록 아이템 안에 있는 팀의 `team_name` 값을 표시한다.

```jinja
#best/templates/best/index.html

<!DOCTYPE html>
<html lang="en">
<body>

 {% if youngest_teams %}
    <ul>
    {% for team in youngest_teams %}
        <li>{{ team.team_name }}</li>
    {% endfor %}
    </ul>
{% else %}
    <p>No teams are available.</p>
{% endif %}

</body>
</html>
```

{% endraw %}

### 웹 프레임워크를 선택하는 방법 (How to select a web framework)

#### 학습 노력 (Effort to learn)

#### 생산성 (Productivity)

#### 프레임워크/프로그래밍 언어의 성능 (Performance of the framework/programming language)

#### 캐싱 지원 (Caching support)

#### 확장성 (Scalability)

#### 웹 보안 (Web security)

## 프레임워크 추천 (A few good web frameworks?)

### Django (Python)

### Flask (Python)

### Express (Node.js/JavaScript)

Express는 Node.js (Node는 자바스크립트를 실행하기 위한 브라우저 없는(browserless) 환경이다)를 위한 빠르고, 독점적이지 않으며(unopinionated), 유연한 미니멀 웹 프레임워크이다. Express는 웹과 모바일 애플리케이션을 위한 강력한 기능 모음과 유용한 HTTP 메소드 및 미들웨어를 제공한다.

Express는 굉장히 유명한데

* 부분적으로는 Express를 통해 클라이언트 측의 자바스크립트 웹 프로그래머들이 서버 측 개발로 쉽게 넘어올 수 있었기 때문이고
* 다른 부분적으로 Express가 자원 효율적(resource-efficient)이기 때문이다.
    * 기반이 되는(underlying) 노드 환경은 모든 새로운 웹 요청에 대해 각각(separate)의 처리 과정(process)을 생성하지 않고 하나의 스레드 안에서 가벼운 멀티 태스킹을 사용해 요청을 처리한다.

Express는 미니멀한 웹 프레임워크이므로 사용하려는 모든 컴포넌트가 통합되어(incorporate)있지는 않다.

* 예를 들어, 데이터베이스 접근과 사용자 및 세션 지원은 다른 독립적인 라이브러리를 통해 제공한다.
* 훌륭한 독립 컴포넌트들이 많지만, 때로는 어떤 것이 특정 목적에 가장 적합한지 알아내는 것이 어려울 수 있다.

많은 서버 측과 풀스택 프레임워크들이 Express를 기반으로 하고 있다.

### Deno (JavaScript)

### Ruby on Rails (Ruby)

### Laravel (PHP)

### ASP.NET

### Mojolicious (Perl)

### Spring Boot (Java)
