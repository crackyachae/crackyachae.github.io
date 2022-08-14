---
layout  : article
title   : 4. 이벤트
summary : 
date    : 2020-12-01 01:03:51 +0900
updated : 2020-12-15 02:20:21 +0900
tag     : draft
toc     : true
public  : true
parent  : [[/react/opent-react]]
latex   : false
---
* TOC
{:toc}

> 이 글은 생활코딩의 [이벤트](https://opentutorials.org/module/4058/24740) 강의내용을 복습하기 위해 작성한 글입니다.
>
> * 제가 필요한 부분 위주로 확인하면서 정리하고 있어 글에 덜 작성된 부분이 있을 수 있습니다.
> * 글 작성 후 원문의 내용이 수정되거나 내용을 이해하기 위한 개인적인 설명이나 해석이 있을 수 있습니다. 되도록 원문을 참고해주시길 바랍니다.
> * 잘못된 부분이 있다면 댓글이나 그 외 편하신 방법으로 알려주시면 감사하겠습니다.

## 이벤트, stats, props 그리고 render 함수

이벤트는 state, props, event 세 개가 상호작용 하면서 만든다.

헤더와 목록의 링크를 클릭했을 때, 그것에 상호작용해서 다른 컨텐트가 로드되도록 하는 예시

우선 헤더에 링크를 추가한다.

```js
// Subject.js
import React, { Component } from 'react';

class Subject extends Component {
  render() {
    return (
      <header>
        <h1><a href="/">{this.props.title}</a></h1>
        {this.props.sub}
      </header>        
    );
  }
}

export default Subject;
```

Subject component의 헤더를 클릭하면,
App.js의 state 값이 바뀌고, 그 값이 Content의 props에 전달되도록 함.

state setting 먼저

```js
// App.js
class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      // mode 지정
      mode: 'welcome',
      subject: {title:'Web' sub:'World wide web'}
      // welcome 상태일 때 출력할 콘텐츠 작성
      welcome: {title:'Welcome', desc:'Hello, React!!'}
      contents: [
        {id:1, title:'HTML', desc:'HTML is for information'},
        {id:2, title:'CSS', desc:'CSS is for design'},
        {id:3, title:'JavaScript', desc:'JavaScript is for interaction'},
      ]
    }
  }

  render() {

    // console.log를 이용해 state가 바뀔 때 다시 render가 되는지 확인한다.
    console.log('App render');

     var _title, _desc = null;

     if(this.state.mode ===  'welcome'){
       _title = this.state.welcome.title;
       _desc = this.state.welcome.desc;
     } else if(this.state.mode === 'read'){
       _title = this.state.contents[0].title;
       _desc = this.state.contents[0].desc;
     }
 
    return (
      <div className="App">
        <Subject 
          title={this.state.subject.title}
          sub={this.state.subject.sub}>
        </Subject>
        <TOC data={this.state.contents}></TOC>
        <Content title={_title} desc={_desc}></Content>>
      </div>        
    );
  }
}
```

```js
// content.js
import React, { Component } from 'react';

class Content extends Component {
  render() {
    console.log('Content render');
    return (
      <article>
        <h2>{this.props.title}</h2>
        {this.props.desc}
    </article>
    );
  }
}

export default Content;
```

react에서는 props나 state의 값이 바뀌면 그 state를 갖는 component의 render 함수가 다시 호출된다.
화면이 다시 그려진다.

state의 mode를 read로 바꿔주면 else if문 쪽이 출력되면서 Content의 props로 들어가는 값이 바뀌면서 콘텐트가 바뀐다.

content.js 앞 글쪽에 다시 정리해줘야 할것 같다.

## event 설치

subject 안에 있는 버튼을 클릭했을 때 subject 밖의 다른 component를 조작하려고 하는데

다른 component 사이에 상호작용 하는게 어렵기 때문에 우선 Subject component를 App 내부에 다시 만들어줌

```js
import React, { Component } from 'react';
import TOC from "./components/TOC";
import Content from "./components/Content"
import Subject from "./components/Subject"
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      mode:'read',
      subject:{title:'WEB', sub:'World Wid Web!'},
      welcome:{title:'Welcome', desc:'Hello, React!!'},
      contents:[
        {id:1, title:'HTML', desc:'HTML is for information'},
        {id:2, title:'CSS', desc:'CSS is for design'},
        {id:3, title:'JavaScript', desc:'JavaScript is for interactive'}
      ]
    }
  }

  render() {
    console.log('App render');
    var _title, _desc = null;
    if(this.state.mode ===  'welcome'){
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
    } else if(this.state.mode === 'read'){
      _title = this.state.contents[0].title;
      _desc = this.state.contents[0].desc;
    }
    return (
      <div className="App">
        {/* <Subject 
          title={this.state.subject.title} 
          sub={this.state.subject.sub}>
        </Subject> */}
        <header>
          <h1><a href="/" onClick={function(e){
            console.log(e);
            e.preventDefault();
          }}>{this.state.subject.title}</a></h1>
          {this.state.subject.sub}
        </header>
        <TOC data={this.state.contents}></TOC>
        <Content title={_title} desc={_desc}></Content>
      </div>
    );
  }
}
export default App;

```

`<header>`의 link (`<a>`)를 클릭했을 때 상호작용 하도록 하고 싶음

기존의 자바스크립트는 `<a>`에 onclick 작성

```html
<a href="/" onclick=...>
```

React 문법은 조금 다르다. 우선 click event를 `onClick` 으로 작성
link를 클릭했을 때, function(e)를 실행

```js
<a href="/" onClick={function(){
  alert('hi');
}}>
```

알람창이 표시된 후 확인을 누르면 페이지가 reload 되는 문제 발생. href 속성값이 현재 페이지로 이동시키기 때문에.

a의 기본동작 (href의 속성값으로 이동)이 작동하지 않도록 해야함

```js
<a ref="/" onClick={function(e){
  console.log(e);
  debugger;
}}>
```

onClich 시 실행되는 함수의 첫 번째 parameter로 event 객체를 전달.

debugger;는 프로그램 실행시 해당 지점에서 실행을 멈춘다. 크롬 개발자도구가 열려있을 경우 source탭에서 여러 정보를 파악할 수 있다.

event객체의 preventDefault를 (이벤트가 발생한 태그의 기본 동작을 막는다.) 이용

```js
<a href="/" onClick={function(e){
  console.log(e);
  e.preventDefault();
}}>
```

## event에서 state 변경하기

header를 클릭하면 APP component의 mode값을 welcome 으로 변경

```js
<a href="/" onClick={function(e){
  console.log(e);
  e.preventDefault();
  this.state.mode = 'welcome';
}}>
```

이렇게 작성하면 에러 발생

2가지 문제 때문
event function안에서 this는 이전에 가리키던 component가 아니고 아무 값도 세팅되어있지 않다 state undefined
function이 끝나는 다음에 bind(this) 를 붙여서 해결

state mode를 바꾸기 위해서는 대입 연산자를 사용하지 않음
setState method 이용 인자로 바꾸고 싶은 state를 입력한다.

```js
<a href="/" onClick={function(e){
  console.log(e);
  e.preventDefault();
  this.setState({
    mode:'welcome';
  })
}.bind(this)}>
```

### bind 함수 이해하기

render 함수 안에서 this는 component 자신을 가리킨다.
class App 의 render함수 안에서는 App을 가리킴

onClick의 값으로 정의한 function 안의 this는 undefined 되어있다.

```js
var obj = {name:'egoing'};

function bindTest({
  console.log(this.name);
})

bindTest();
```

를 하면 bindTest는 현재 속해있는 object가 없기 때문에 undefined 상태

```js
var bindTest2 = bindTest.bind(obj);

bindTest2(); //=> egoing
```

를 입력해주면 bindTest와 동일하면서 안에서 this가 obj인 함수를 새로 형성하게 된다.

그래서 bind를 이용해서 새로 만든 bindTest2를 실행하면 egoing이 결과로 나온다.

### setState 함수 이해하기

component를 생성할 때는 위 처럼 대입연산자를 이용해도 상관 없음

```js
this.state.mode = 'welcome';
```

과 같이 바꾸면 react 몰래 (외적으로 라고 생각하면되나) mode를 변경하는 것.

실제로 state의 mode는 바뀌지만 react 외적으로 바꿨기 떄문에 react가 인식하지 못하는 것이다.
mode를 바꾸면 render가 다시 시행되면서 console에 log가 표시되어야 하는데 위처럼 입력하면 render가 새로 되지 않음

## Component 이벤트 만들기

다시 Subject component를 원래대로 돌려놓고

사용자가 링크를 클릭했을 때, 이벤트를 설치하기 위해서는

Subject component에 onChangePage 라는 이벤트가 있어서
Subject component에서 링크를 클릭하면 이벤트에 설치한 함수를 호출되도록 만드려고한다.

```js
//App.js

class App extends Component {
  ...

  render() {
    ...

    return (
      <div className="App">
        <Subject 
          title={this.state.subject.title} 
          sub={this.state.subject.sub}

          // event 작성. 이걸 실제 event라고 할 수 있을까 event 발생시 수행할 함수 아닌가?
          onChangePage={function(){
            this.setState({mode:'welcome'});
          }.bind(this)}
        >
        </Subject>
        <TOC data={this.state.contents}></TOC>
        <Content title={_title} desc={_desc}></Content>
      </div>
    );
  }
}

export default App;
```

onChangePage는 props를 통해서 사용자에게 전달되므로

Subject component에서 App.js 로부터 props를 통해 전달받은 함수를 호출
this.props.onChangePage()

```js
// Subject.js
import React, { Component } from 'react';

class Subject extends Component {
    render(){
      console.log('Subject render');
      return (
        <header>
            <h1><a href="/" onClick={function(e){ 
              e.preventDefault();
              // onClick event가 발생했을 때
              // 전달받은 함수를 호출
              this.props.onChangePage();
            }.bind(this)}>{this.props.title}</a></h1>
            {this.props.sub}
        </header>  
      );
    }
  }
export default Subject;
```

Content에서도 이벤트가 발생하도록 작성

```js
//App.js

class App extends Component {
  ...

  render() {
    ...

    return (
      <div className="App">
        <Subject 
          title={this.state.subject.title} 
          sub={this.state.subject.sub}

          // event 작성. 이걸 실제 event라고 할 수 있을까 event 발생시 수행할 함수 아닌가?
          onChangePage={function(){
            // state의 mode를 welcome으로 변경
            this.setState({mode:'welcome'});
          }.bind(this)}
        >
        </Subject>
        <TOC 
           onChangePage={function(){
            // state의 mode를 read로 변경
             this.setState({mode:'read'});
           }.bind(this)} 
           data={this.state.contents}
         ></TOC>
        <Content title={_title} desc={_desc}></Content>
      </div>
    );
  }
}
```

```js
// TOC.js
class TOC extends Component {
  render() {
    var lists = [];
    var data = this.props.data;

    var i = 0;
    while(i < data.length){
      lists.push(
        <li key={data[i].id}>
          <a 
            href={"/content/"+data[i].id}
            // onClick event 형성
            onClick={function(e){
              e.preventDefault();
              this.props.onChangePage();
            }.bind(this)}
          >{data[i].title}</a>
        </li>);
      i = i + 1;
    }

    return (...);
  }
}
```

목록의 항목을 선택하면 선택한 항목에 맞는 내용이 표시되게 하려고 함

selecte_content_id를 만들어서 content의 id의 항목과 비교하면서 알맞은 내용을 넣으려고 함.

```js
...

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      mode:'read',
      // selected_content를 추가하고 기본값을 2로 설정
      selected_content_id: 2,
      ...
      contents:[
        {id:1, title:'HTML', desc:'HTML is for information'},
        {id:2, title:'CSS', desc:'CSS is for design'},
        {id:3, title:'JavaScript', desc:'JavaScript is for interactive'}
      ]
    }
  }

  render() {
    console.log('App render');
    var _title, _desc = null;
    if(this.state.mode ===  'welcome'){
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
    }
    // 기존에 첫번째 content 내용으로 지정해놨던 값을
    // selected id에 따라 content를 바꾸도록 수정
    else if(this.state.mode === 'read'){
      var i = 0;
       while(i < this.state.contents.length) {
        var data = this.state.contents[i];
        // data의 id와 selected_content_id 값이 일치할 때
        // data의 title과 desc를 대입
        if(data.id === this.state.selected_content_id) {
          _title = data.title;
          _desc = data.desc;
          break;
        }
        i = i + 1;
      }
    }
    return (
      <div className="App">
        <Subject 
          title={this.state.subject.title} 
          sub={this.state.subject.sub}

          onChangePage={function(){
            this.setState({mode:'welcome'});
          }.bind(this)}
        >
        </Subject>
        <TOC 
           onChangePage={function(id){
             this.setState({mode:'read'});
             // id는 문자로 넘어오기 때문에 Number 함수로 숫자로 바꿔줘야함.
             selected_content_id: Number(id)
           }.bind(this)} 
           data={this.state.contents}
         ></TOC>
        <Content title={_title} desc={_desc}></Content>
      </div>
    );
  }
}
export default App;
```

```js
// TOC.js
class TOC extends Component {
  render() {
    var lists = [];
    var data = this.props.data;

    var i = 0;
    while(i < data.length){
      lists.push(
        <li key={data[i].id}>
          <a 
            href={"/content/"+data[i].id}
            data-id={data[i].id}
            onClick={function(e){
              e.preventDefault();
              this.props.onChangePage(e.target.dataset.id);
            }.bind(this)}
          >{data[i].title}</a>
        </li>);
      i = i + 1;
    }

    return (...);
  }
}
```

event객체에는 target이라는 속성을 갖는다.
target 속성은 event가 발생한 태그 (이경우 a)를 가리킨다.
event가 발생한 태그에 접근하면 그 속성값에도 접근할 수 있기 때문에 data-id 값을 받아올 수 있다. e.target.dataset.id

이를 App.js에서 수행하는 onChangePage 함수의 parameter로 넘겨서 사용할 수 있다.

```js
// TOC.js
class TOC extends Component {
  render() {
    var lists = [];
    var data = this.props.data;

    var i = 0;
    while(i < data.length){
      lists.push(
        <li key={data[i].id}>
          <a 
            href={"/content/"+data[i].id}
            data-id={data[i].id}
            onClick={function(id, e){
              e.preventDefault();
              this.props.onChangePage(id);
            }.bind(this, data[i].id)}
          >{data[i].title}</a>
        </li>);
      i = i + 1;
    }

    return (...);
  }
}
```

bind 함수의 parameter를 이용하는 방법도 있다.
bind의 두 번째 parameter 부터는 순차적으로 수행하는 함수의 첫 번째 parameter 부터 순서대로 온다. event parameter는 가장 뒤에 위치
e.g,
function (prmt1, prmt2, e){}.bind(obj, prmt1, prmt2)
