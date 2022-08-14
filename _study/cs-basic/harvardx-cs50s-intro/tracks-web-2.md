---
layout  : article
title   : Tracks_Web 2
summary : 
date    : 2020-05-09 13:37:56 +0900
updated : 2020-05-26 00:47:38 +0900
tag     : draft
toc     : true
public  : true
parent  : [[/cs-basic/harvardx-cs50s-intro]]
latex   : false
---
* TOC
{:toc}

{% raw %}

> 이 글은 CS50 x 2020의 [tracks web](https://cs50.harvard.edu/x/2020/tracks/web/) 강의내용을 복습하기 위해 작성한 글입니다.
>
> 내용을 이해하기 위한 개인적인 설명이나 해석이 있을 수 있기 때문에 되도록 원문을 참고해주시길 바랍니다.
> 잘못된 부분이 있다면 댓글이나 그 외 편하신 방법으로 알려주시면 감사하겠습니다.

## Flask

지금까지 웹 페이지를 만들고 파일로 저장해서 HTTP 서버를 통해 반환시키는 법을 배웠다.

더 나아가서, 웹 서버나 어플리케이션을 이용하면 웹 페이지의 콘텐츠를 동적으로 생성하고 제어할 수 있다.

### Flask and Route

Python의 framework중 하나인 **_Flask_**의 다양한 기능을 사용해 웹 서버를 작성할 수 있다.

Flask를 사용할 `application.py`파일을 만들어보자. (관습적으로 `application.py`를 파일명으로 사용)

```py
# Flask library를 import
from flask import Flask

# 객체를 Flask를 app에 할당
app = Flask(__name__)

# route와 해당 route에 접근했을 때 실행될 함수를 적어줌
# Web app에서 "/"route로 갔을 때 index function을 실행: Hello world! 표시
@app.route("/")
def index():
    return "Hello, world!"

```

* route는 웹 서버에서 이동할 위치를 나타내는 역할을 한다. 예를 들어 구글의 '검색기능'은 `https://google.com` 주소 뒤에 route인 `/search`를 추가로 입력해서 이동.

* `/`: 가장 상위 (default) directory
* route에 접근했을 때 실행될 함수를 바로 아래 함께 적어줘야 한다.

Terminal에서 `flask run`을 입력하면 `application.py`를 찾아서 실행.

Route를 여러개 만들 수 있으며 각 route마다 함수와 반환값을 다르게 작성해서 이동하는 주소에 따라 다른 콘텐츠가 표시되도록 할 수 있다.

```py
# /goodbye route를 설정: url/goodbye로 이동하면 bye function을 실행: Goodbye! 표시
@app.route("/goodbye")
def bye():
    return "Goodbye!"
```

### Template

`return`에는 어떤 콘텐츠든 표시할 수 있으며 `html`태그도 적용시킬 수 있다.

표시할 내용이 많을 경우 `template` 파일(i.e `html`파일)을 별도로 작성해 표시한다.

```py
# template을 사용하기 위해 render_template function을 import
from flask import Flask, render_template

# index.html을 작성한 뒤 render해서 함수값 반환시 표시.
@app.route("/")
def index():
    return render_template("index.html")
```

```html
<!-- index.html -->
<!DOCTYPE HTML>

<html>
    <head>
        <title>Hello!</title>
    </head>
    <body>
        Hello, world!
    </body>
</html>
```

### Variables

위의 예시는 여전히 static한 `html`페이지 밖에 표시하지 못한다.

**Jinja2**라는 템플릿 엔진을 이용하면 `html`파일에 변수를 입력한 뒤 `render_template` function으로 값을 전달할 수 있다.

```py
from flask import Flask, render_template

@app.route("/")
def index():
    # html에 쓰인 name이라는 변수의 값으로 Emma를 전달
    return render_template("index.html", name="Emma")
```

```html
<!-- index.html -->
<!-- jinja2 템플릿으로 name 변수 입력 -->
<body>
    Hello, {{ name }}!
</body>
```

* 변수를 입력하려면 겹중괄호(`{{ }}`)를 사용한다.

### Random Number

변수와 `random`라이브러리를 이용해서 웹 페이지가 random number를 표시하게 할 수 있다.

```py
# random library를 import
import random
from flask import Flask, render_template

@app.route("/")
def index():
    # 1과 10사이의 random number를 number에 할당
    number = random.randint(1, 10)
    # number(오른쪽)에 입력된 값을 html의 number(왼쪽) 변수로 전달.
    return render_template("index.html", number=number)
```

```html
<!-- index.html -->
<body>
    Your random number is {{ number }}
</body>
```

Random number와 Jinja2 템플릿의 condition 기능을 이용해서 동전 뒤집기 기능도 만들 수 있다.

```py
import random
from flask import Flask, render_template

@app.route("/")
def index():
    # 0 또는 1을 전달 
    number = random.randint(0, 1)
    return render_template("index.html", number=number)
```

```html
<!-- index.html -->
<body>
    {% if number == 1 %}
        Your coin flip is HEADS.
    {% else %}
        Your coin flip is TAILS.
    <!-- need end -->
    {% endif %}
</body>
```

### Form

서버에 데이터를 전송할 수 있는 form을 만들 수도 있다.

새로운 route를 만든 뒤 그 route로 form을 제출하면 `request` library를 이용해 route에서 입력받은 form data를 사용할 수 있다.

```html
<!-- index.html -->
<body>
    <!-- form을 submit했을 때 hello route를 request -->
    <form action="/hello">
        <!-- 이름을 입력받을 text input을 만든 뒤 참조를 위해 name속성 지정 -->
        <input name="name" type="text">
        <input type="submit">
    </form>
</body>
```

```py
import random
# request function을 import
from flask import Flask, render_template, request

@app.route("/hello")
def hello():
    # name 속성값이 'name'인 input field에 적힌 값을 request 함수를 이용해 가져와서 name 변수에 할당
    name = request.args.get("name")
    # name 변수(오른쪽)의 값을 hello.html의 name 변수(오른쪽)로 전달
    return render_template("hello.html", name=name)
```

```html
<!-- hello.html -->
<body>
    Hello, {{ name }}!
</body>
```

실행하면 입력받은 이름이 "Hello," 뒤에 표시되고 url이 출력할 name을 parameter로 받고 있는 것을 확인할 수 있다.

추가적으로 아무것도 입력하지 않고 submit 했을 때 "Hello,"라는 미완성의 문장이 표시되는 것을 방지하기 위해 python의 조건문을 이용한다.

```py
import random
from flask import Flask, render_template, request

@app.route("/hello")
def hello():
    name = request.args.get("name")
    # name에 입력값이 없을 경우 failure.html을 반환
    if not name:
        return render_template("failure.html")
    return render_template("hello.html"n name=name)
```

```html
<!-- failure.html -->
<body>
    You must provide a name!
</body>
```

### Layout

Template을 만들때 핵심 콘텐츠 주변의 `html`코드는 거의 동일하기 때문에 template의 template역할을 하는 `layout.html`파일을 만들어 사용하면 유용하다.

공유되는 태그들은 그대로 적어주고 콘텐츠가 달라지는 부분을 특별한 블록으로 표시.

```html
<!-- layout.html -->
<!-- 공통적으로 사용되는 html -->
<html>
    <head>
        <title>Hello</title>
    </head>>

    <body>
        <!-- 콘텐츠마다 내용이 달라지는 부분 -->
        \{% block body \%}
        \{% endblock \%}
    </body>
</html>>
```

개별 `html`파일에는 `layout.html`을 사용한다는 표시를 한 뒤 `layout.html`에 만들어 놓은 `block`에 맞춰 콘텐츠를 채우면 된다.

```html
<!-- index.html -->
<!-- layout.html을 template으로 사용 -->
{% extends "layout.html" %}

<!-- block body에 해당하는 콘텐츠 -->
{% block body %}
    <form action="/hello">
        <input name="name" type="text">
        <input type="submit">
    </form>
{% endblock %}

<!-- hello.html-->
{% extends "layout.html" %}

{% block body %}
    hello, {{ name }}!
{% endblock %}

<!-- failure.html -->
{% extends "layout.html" %}

{% block body %}
    You must provide a name!
{% endblock %}
```

각 페이지에 CSS를 따로 적용하고 싶으면 새로운 `block`을 `layout.html`과 각 `html`파일에 추가한다.

```html
<!-- layout.html -->
<!DOCTYPE html>

<html>
    <head>
        <title>Hello</title>
        <style>
            <!-- style block -->
            {% block style%}
            {% endblock %}
        </style>>
    </head>>

    <body>
        {% block body %}
        {% endblock %}
    </body>
</html>>
```

```html
<!--failure.html -->
{% extends "layout.html" %}

{% block style %}
    body {
        color: red;
    }
{% endblock %}

{% block body %}
    You must provide a name!
{% endblock %}
```

### Tasks

Task를 추가하고 표시하는 Web app

우선 task를 표시하고 추가할 페이지의 기본 틀을 잡는다.

```py
from flask import Flask, render_template, request

app = Flask(__name__)

# Tasks의 목록을 보여주는 tasks.html을 표시
@app.route("/")
def tasks():
    return render_template("tasks.html")

# Tasks를 추가하기 위한 add.html을 표시
@app.route("/add")
def add():
    return render_template("add.html")
```

```html
<!-- tasks.html -->
{% extends "layout.html" %}

{% block body %}
    <h1>Tasks</h1>
    <!-- 임시 task 목록 -->
    <ul>
        <li>item one</li>
        <li>item two</li>
        <li>item three</li>
    </ul>

    <!-- Task를 추가하는 add.html로 이동 --> 
    <a href="/add">Create a New Task</a>
{% endblock %}
```

`add.html`에서 form에 입력받은 data를 사용하려면 data를 post method로 전달해야한다

```html
<!-- add.html -->
{% extends "layout.html" %}

{% block body %}
    <!-- Post method를 사용해서 입력받은 data를 /add route로 전송 --> 
    <form action="/add" method="post">
        <input name="task" type="text" placeholder="Task Name" >
        <input type="submit">
    </form>
{% endblock %}
```

그렇게 되면 `add` function은 `GET` request로 들어온 form element 자체는 웹 페이지에 표시하고 `POST` request로 입력받은 새 task도 처리해야한다.

우선 입력받을 tasks를 저장할 list todos를 만들고 `add` function이 두 종류의 request에 각각 대응할 수 있도록 수정한다.

```py
from flask import Flask, redirect, render_template, request

app = Flask(__name__)

# Empty list todos를 생성
todos = []

@app.route("/")
def tasks():
    return render_template("tasks.html")

# add가 여러 request methods를 수용한다는 것을 명시
@app.route("/add", methods=["GET", "POST"])
def add():
    # Request method가 GET일 경우 add.html을 표시
    if request.method == "GET":
        return render_template("add.html")
    else:
        # Request method가 POST일 경우
        # name의 속성값을 task로 갖는 element의 data를 todo에 저장
        todo = request.form.get("task")
        # todo를 list todos에 추가
        todos.append(todo)
        return redirect("/")
```

마지막으로 todos에 저장해놓은 task들을 `tasks.html` 페이지에 목록 element로 작성한다.

```py
from flask import Flask, redirect, render_template, request

app = Flask(__name__)

todos = []

@app.route("/")
def tasks():
    # list todos를 tasks.html의 todos 변수로 전달
    return render_template("tasks.html", todos=todos)
```

```html
<!-- tasks.html -->
{% extends "layout.html" %}

{% block body %}
    <h1>Tasks</h1>
    <ul>
        <!-- loop todos -->
        {% for todo in todos %}
            <li>{{ todo }}</li>
        {% endfor %}
    </ul>
{% endblock %}
```

추가로, 내용이 없는 task를 입력하지 않도록 input field에 text가 있을때만 버튼을 활성화 시키는 기능을 javaScript로 만들 수 있다.

```html
<!-- add.html -->
{% extends "layout.html" %}

{% block body %}
    <form action="/add" method="post">
        <input id="task" name="task" type="text" placeholder="Task Name">
        <input id="submit" type="summit">
    </form>

    <!-- submit 버튼 활성화 관련 JavaScript -->
    <script>
        /* onkeyup event handler 이용. 키를 눌른 후 놓을 때 마다 function 실행 */
        document.querySelector('#task').onkeyup = function() {
            if (document.querySelector('#task').value === '') {
                /* summit 버튼을 비활성화 */
                document.querySelector('#submit').disable = true;
            } else {
                document.querySelector('#submit').disable = false;
            }
        }
    </script>
{% endbolck %}
```

웹 서버를 종료하고 다시 시작하면 todos 변수를 empty list로 initialize하기 때문에 이전의 task목록이 사라진다.

이를 해결하고 data를 별도로 저장하거나 수정하기 위해 다음으로 SQL database를 결합하여 사용하는 법을 배운다.

## Databases

지금까지 만든 웹 서버는 모든 사용자에게 동일한 웹 페이지를 보여준다. 예를 들어 Task app은 global variable에 task들이 저장되어 있어서 웹 서버를 이용하는 모든 사용자가 각각 입력한 tasks가 하나의 목록에 동시에 표시된다.

하지만 웹 사이트 중에는 로그인을 해서 각 사용자마다 고유한 정보를 제공하는 것들도 있다.

이는 [전에](Week-8_Information.md) 언급했듯이 웹 사이트가 웹 브라우저에 cookie를 제공하기 때문에 가능한데 cookie를 제공함으로서 server가 사용자마다 고유한 **session** (사용자가 웹 사이트와 interaction하기 위한 data)을 갖도록 한다.

### Sessions in Flask

Flask의 session을 사용하면 session이라는 global variable을 사용해서 안에 있는 todos를 읽고, 설정하고, 수정할 수 있다. Session variable은 응답을 요청한 사용자의 쿠키를 이용해서 사용자에게 맞춤으로 제공된다.

```py
# flask에서 session과 관련된 function들을 import
from flask import Flask, redirect, render_template, request, session
from flask_session import Session

app = Flask(__name__)

# global variable 대신 session dictionary로 data를 저장

# session이 영구적으로 지속되지 않도록 함 (기본값인 31일이 지나면 사라진다)
app.config["SESSION_PERMANENT"] = False
# session의 data를 저장하는 곳을 app을 돌리고 있는 web server의 file system(i.e CS50 IDE)으로 지정
app.config["SESSION_TYPE"] = "filesystem"

Session(app)

@app.route("/")
def tasks():
    # 이미 만들어진 list가 없으면 빈 list를 새로 생성
    if "todos" not in session:
        session["todos"] = []
    # template의 todos로 session의 todos를 보냄
    return render_template("tasks.html", todos=session["todos"])

@app.route("/add", methods=["GET", "POST"])
def add():
    if request.method == "GET":
        return render_template("add.html")
    else:
        todo = request.form.get("task")
        session["todos"].append(todo)
        return redirect("/")
```

### Database

보다 복잡한 data를 다루기 위해서는 session object 대신 database를 만들어서 관리하는 것이 보다 효율적이다.

Database를 사용해서 login 정보를 관리하는 registration app을 만들 수 있다.

```sql
/* 빈 lecture.db 파일을 만든 뒤 sqlite3로 실행 */
sqlite3 lecture.db

/* table 생성 */
CREAT TABLE 'registrants' (
    'id' INTEGER PRIMARY KEY,
    'name' VARCHAR(255),
    'email' VARCHAR(255)
)

/* db에 data 입력 후 확인 */
INSERT INTO registrants (name, emmail) VALUES ('Alice', 'alice@example.com');
SELECT * FROM registrants;
```

```py
# CS50에서 SQL library import
from cs50 import SQL
from flask import Flask, render_template

app = Flask(__name__)

# sqlite로 lecture.db를 실행할 수 있도록 함
db = SQL("sqlite:///lecture.db")

@app.route("/")
def index():
    # db의 모든 내용을 변수 rows에 할당한 뒤 template의 rows로 보냄
    rows = db.execute("SELECT * FROM registrants")
    return render.template("index.html", rows=rows)
```

```html
<!-- index.html -->
<html>
    <head>
        <title>Registrants</title>
    </head>
    <body>
        <h1>Registrants</h1>
        <ul>
            <!-- rows의 각 row를 iterate 하면서 <li> element 생성 -->
            {% for row in rows %}
                <!-- each row는 dictionary 형식으로 넘어옴-->
                <li>{{ row["name"] }} ({{ row["email"] }})</li>
            {% endfor %}
        </ul>
    </body>
</html>
```

### Registration

Data를 읽어오는 것 뿐만 아니라 새 data를 추가할 수도 있다.

```py
from cs50 import SQL
from flask import Flask, redirect, render_template

app = Flask(__name__)

db = SQL("sqlite:///lecture.db")

@app.route("/")
def index():
    rows = db.execute("SELECT * FROM registrants")
    return render.template("index.html", rows=rows)

@app.route("/register", methods=["GET", "POST"])
def register():
    if request.method == "GET":
        return render.template("register.html")
    else:
        # request method가 post인 경우
        name = request.form.get("name")
        email = request.form.get("email")

        # 입력받은 값을 table에 입력
        # query안에 literally including string을 넣으면 injection attack이 발생할 가능성이 있기 때문에 placeholder를 사용
        db.execute("INSERT INTO registrants (name, email) VALUES (:name, :email)", name=name, email=email)
        # main으로 redirect
        return redirect("/")
```

```html
<!-- index.html에 register페이지로 가는 버튼 추가 -->
<a href="/register">Register</a>

<!-- register.html -->
<html>
    <head>
        <title>Registrants</title>
    </head>
    <body>
        <h1>Register</h1>

        <form action="/register" method="post">
            <input type="text" name="name" placeholder="Name">
            <input type="text" name="email" placeholder="Email Address">
            <input type="submit">
        </form>
    </body>
</html>
```

마무리로 `layout.html`을 작성해 template 파일들을 정리하고 `name`이나 `email`을 입력하지 않았을 때 error message를 표시하는 페이지를 만든다.

```html
<!-- apology.html -->
{% extends "layout.html" %}

{% block body %}
    <h1>Sorry!</h1>

    <div>
        {{ message }}
    </div>

    <a href="/">Go Back</a>
{% endblock %}
```

```py
@app.route("/register", methods=["GET", "POST"])
def register():
    if request.method == "GET":
        return render.template("register.html")
    else:
        name = request.form.get("name")
        # name이 존재하지 않는 경우
        if not name:
            # apology.html에 'you must provide a name 전달'
            return render_template("/apology", message="you must provide a name")
        email = request.form.get("email")
        # email이 존재하지 않는 경우
        if not email:
            # apology.html에 'you must provide an email address 전달'
            return render_template("/apology", message="you must provide an email address")

        db.execute("INSERT INTO registrants (name, email) VALUES (:name, :email)", name=name, email=email)
        return redirect("/")
```

## Finance

Problem Set 2: 여러 기능을 포함하는 Finance web app 만들기

### 과제 제출 후 추가

구매/판매/보유 항목이 사용자 마다 다르게 나타나야 하는데 그렇지 않은 문제가 있었다. (동일한 track table 공유 중)

지금 Flask와 session 자체를 잘 모르고 있는 상태라 Flask Session이 동일한 table을 user마다 다르게 생성하고 관리하는 기능이 있는데 강의에서 다루지 않은건가 싶어서 검색을 해봤지만 적절한 설명을 찾지 못했다.

그렇다면 user마다 다른 table을 만들거나 하나의 table에 id를 구분할 column을 따로 만들어서 해결해야 할 것 같았고, 관련 내용을 찾다 비슷한 기능의 web app을 flask로 만드는 과정을 설명해놓은 tutorial을 찾았다. 읽어보니 후자인 것 같아 id column을 추가해서 수정했다.

이렇게 되면 session은 그냥 id를 담아놓는 전역 변수정도로 밖에 안 쓰이는 거라... 정확한 역할은 잘 모르겠다. 저거 자체가 중요한건가?

## 참고

* [Flask 공식 튜토리얼 따라하기 #1](https://blog.outsider.ne.kr/1329) by Outsider's Dev Story

**Creating a Web App From Scratch Using Python Flask and MySQL** by Jay in envato-tuts

* [Part: 1](https://code.tutsplus.com/ko/tutorials/creating-a-web-app-from-scratch-using-python-flask-and-mysql--cms-22972)
* [Part: 2](https://code.tutsplus.com/ko/tutorials/creating-a-web-app-from-scratch-using-python-flask-and-mysql-part-2--cms-22999)
* [Part: 3](https://code.tutsplus.com/ko/tutorials/creating-a-web-app-from-scratch-using-python-flask-and-mysql-part-3--cms-23120)
* [Part: 4](https://code.tutsplus.com/ko/tutorials/creating-a-web-app-from-scratch-using-python-flask-and-mysql-part-4--cms-23187)
* [Part: 5](https://code.tutsplus.com/ko/tutorials/creating-a-web-app-from-scratch-using-python-flask-and-mysql-part-5--cms-23384)
* [Part: 6](https://code.tutsplus.com/ko/tutorials/creating-a-web-app-from-scratch-using-python-flask-and-mysql-part-6--cms-23402)
* [Part: 7](https://code.tutsplus.com/ko/tutorials/creating-a-web-app-from-scratch-using-python-flask-and-mysql-part-7--cms-23518)
* [Part: 8](https://code.tutsplus.com/ko/tutorials/creating-a-web-app-from-scratch-using-python-flask-and-mysql-part-8--cms-23593)
* 연재 중단

{% endraw %}
