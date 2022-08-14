---
layout  : article
title   : 5. Create 기능 구현
summary : 
date    : 2020-12-01 22:19:03 +0900
updated : 2020-12-15 02:20:58 +0900
tag     : draft
toc     : true
public  : true
parent  : [[/react/opent-react]]
latex   : false
---
* TOC
{:toc}

> 이 글은 생활코딩의 [Create 기능 구현](https://opentutorials.org/module/4058/24860) 강의내용을 복습하기 위해 작성한 글입니다.
>
> * 제가 필요한 부분 위주로 확인하면서 정리하고 있어 글에 덜 작성된 부분이 있을 수 있습니다.
> * 글 작성 후 원문의 내용이 수정되거나 내용을 이해하기 위한 개인적인 설명이나 해석이 있을 수 있습니다. 되도록 원문을 참고해주시길 바랍니다.
> * 잘못된 부분이 있다면 댓글이나 그 외 편하신 방법으로 알려주시면 감사하겠습니다.

CRUD

지금까지 read에 한정해서 배움

어떻게 React를 통해서 create 할 것인가

## Create 소개

생성 수정 삭제 버튼을 만드는 원소가 세 개인 배열이 추가된다.

create 버튼을 누르면
App의 mode가 create로 바뀌고
Content가 글을 작성할 수 있는 component (CreateContent)로 변경 (form)

form을 작성해서 제출하면 그 content가 App component의 content의 원소로 추가
TOC도 그 에 따라서 업데이트

## Create 구현

### mode 변경

control component 부터 생성

C R U 는 특정한 페이지로 이동해서 operation이 실행
delete의 경우 버튼을 클릭할 때 삭제가 일어나도록 할 것이기 때문에 link로 작성하면 문제가 발생할 수도 있다.
예를 들어 다른 페이지로 미리 넘어가는 외부 프로그램이 설치되어있으면 다른 페이지의 element를 삭제할 수도 있음
input 등의 opeartion element를 사용해야함

component 구조를 보다 빠르게 파악하기 위해서 기존 component의 props 값 표기를 생략했다. 실제 코드 실행시에는 이전과 동일하게 적어주어야함.

```js
...
// Control.js import
import Control from "./components/Control"

class App extends Component {

  constructor(props){
    ...
  }
  render() {
    ...
    return (
      {/* Control 외의 component props 표기 생략 */}
      <div className="App">
        <Subject></Subject>
        <TOC></TOC>
        {/* Control component 추가 */}
        <Control></Control>
        <Content></Content>
      </div>
    );
  }
}
export default App;
```

```js
// Control.js
import React, { Component } from 'react';

class Control extends Component {
    render(){
      console.log('Control render');
      return (
        <ul>
          <li><a href="/create">create</a></li>
          <li><a href="/update">update</a></li>
          {/* delete는 input element로 생성 */}
          <li><input type="button" value="delete">delete</input></li>
        </ul>
      );
    }
  }

export default Control; 
```

버튼 클릭 이벤트를 Control component에 생성

```js
<Control onChangeMode={function(_mode){
  this.setState({
    mode:_mode
  });
}.bind(this)}></Control>
```

```js
//Control.js
import React, { Component } from 'react';

class Control extends Component {
    render(){
      console.log('Control render');
      return (
        <ul>
          <li><a href="/create" onClick={function(e){
            e.preventDefault();
            this.props.onChangeMode('create');
          }.bind(this)}>create</a></li>
          <li><a href="/update" onClick={function(e){
            e.preventDefault();
            this.props.onChangeMode('update');
          }.bind(this)}>update</a></li>
          <li><input  onClick={function(e){
            e.preventDefault();
            this.props.onChangeMode('delete');
          }.bind(this)} type="button" value="delete"></input></li>
        </ul>
      );
    }
  }

export default Control; 
```

### mode 전환 기능

mode가 바뀌면 기존의 Content를 create에서 사용되는 Content로 교체

기존에 만들어놨던 read용 component의 이름도 Content에서 ReadContent로 변경

```js
// Content.js → ReadContent.js
import React, { Component } from 'react';

class ReadContent extends Component{
  render(){
    console.log('ReadContent render');
    return (
    <article>
        <h2>{this.props.title}</h2>
        {this.props.desc}
    </article>
    );
  }
}

export default ReadContent; 
```

CreateContent 생성 form은 추후 작성

```js
// CreateContent.js
import React, { Component } from 'react';

class CreateContent extends Component{
  render(){
    console.log('Content render');
    return (
      <article>
        <h2>Create</h2>
        <form>
          ... 
        </form>
      </article>
    );
  }
}

export default CreateContent; 
```

Content 영역이 가변적으로 바뀔 수 있도록 `{_article}` 이라는 변수로 설정

mode가 welcome이나 read인 경우 _article의 값으로 ReadContent component를 입력

mode가 create인 경우를 추가하고 _article의 값으로 CreateContent component를 입력

```js
// App.js
...
import ReadContent from "./components/ReadContent"
import CreateContent from "./components/CreateContent"
...

class App extends Component {

  constructor(props){
    ...
  }
  render() {
    console.log('App render');

    // _article 초기화
    var _title, _desc, _article = null;

    if(this.state.mode ===  'welcome'){
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
      // _article 값으로 기존의 ReadContent를 입력
      _article = <ReadContent title={_title} desc={_desc}></ReadContent>
    }

    else if(this.state.mode === 'read'){
        ...
      // _article 값으로 기존의 ReadContent를 입력
      _article = <ReadContent title={_title} desc={_desc}></ReadContent>
    }

    // mode가 create인 경우를 추가
    else  if(this.state.mode === 'create'){
      // _article 값으로 CreateContent를 입력
      _article = <CreateContent></CreateContent>
    }

    return (
      <div className="App">
        <Subject></Subject>
        <TOC></TOC>
        <Control></Control>

        {/* Content을 변수로 대체 */}
        {_article}
      </div>
    );
  }
}
export default App;
```

### form 기능 구현

제작시 편의를 위해 mode의 default 값을 create로 변경

```js
constructor(props){
  super(props);
  this.state = {
    mode:'create',
    ...
  }
}
```

form을 입력
placeholder: 아무 내용도 없을 때 표시될 텍스트

action: 정보를 전송할 페이지
method는 url에 노출이 안되도록 post
onSubmit event 호출. submit 버튼을 눌렀을 때 이벤트 호출 (html의 기능)

```js
<form action="/create_process" method="post"
  onSubmit={function(e){
    // 원래 submit 하면 action에 입력한 페이지로 이동하므로 그것을 막아줘야함
    e.preventDefault();
    alert('Submit!!!!!');
  }.bind(this)}
>
  <p><input type="text" name="title" placeholder="title"></input></p>
  <p>
    <textarea name="desc" placeholder="description"></textarea>
  </p>
  <p>
    <input type="submit"></input>
  </p>
</form>
```

### onSubmit 이벤트

submit 했을 때 state의 contents에 form에서 입력한 data를 추가

```js
// App.js
...

class App extends Component {

  constructor(props){
    ...
  }
  render() {
    console.log('App render');

    var _title, _desc, _article = null;

    if(this.state.mode ===  'welcome'){ ... }
    else if(this.state.mode === 'read'){ ... }

    else if(this.state.mode === 'create'){
      _article = <CreateContent onSubmit={function(_title, _desc){
        // add content to this.state.contents
        // 입력 체크용
        console.log(_title, _desc);
      }.bind(this)}></CreateContent>
    }

    return ( ... );
  }
}
export default App;
```

this.props.onSubmit의 parameter로 위의 CreateContent의 onSubmit props 함수에 전달할 두 parameter 값 (_title,_desc)을 입력해야한다.

event 객체에서 title과 desc value에 접근할 수 있는 방법을 찾아야 함.
이번에 e의 target은 form이므로 개발자 도구에서 e.target의 하위 element를 조회해서 찾을 수 있음.

```js
// CreateContent.js
<form action="/create_process" method="post"
  onSubmit={function(e){
    e.preventDefault();
    this.props.onSubmit(
      e.target.title.value,
      e.target.desc.value
    );
    alert('Submit!!!!!');
  }.bind(this)}
>
  <p><input type="text" name="title" placeholder="title"></input></p>
  <p>
    <textarea name="desc" placeholder="description"></textarea>
  </p>
  <p>
    <input type="submit"></input>
  </p>
</form>
```

### content 변경

```js
// App.js
...

class App extends Component {

  constructor(props){
    ...
    // content에 추가하는 값에 id를 편하게 입력 하기위헤 변수로 지정.
    // UI 영향을 주지 않기 때문에 state 밖에 생성.
    this.max_content_id = 3;
    this.state = {...}
  }
  render() {
    console.log('App render');

    var _title, _desc, _article = null;

    if(this.state.mode ===  'welcome'){ ... }
    else if(this.state.mode === 'read'){ ... }

    else if(this.state.mode === 'create'){
      _article = <CreateContent onSubmit={function(_title, _desc){
        // 생성할 content의 id는 
        // 현재 마지막 content의 id 다음 값이기 때문에 1을 더해줌
        this.max_content_id = this.max_content_id+1;

        // DO
        console.log(_title, _desc);
      }.bind(this)}></CreateContent>
    }

    return ( ... );
  }
}

export default App;
```

DO 부분에 content에 입력받은 값을 추가하는 코드를 작성해주어야 한다.

배열의 원소 추가는 push를 이용해서 react 외부에서 직접 한 뒤 react가 이를 반영할 수 있도록 setState를 이용해 현재 변경된 값으로 state의 content를 다시 설정해줘도 되지만 이 경우 이후에 보수 개선이 어려워질 수 있다.

```js
this.state.contents.push(
  {id:this.max_content_id, title:_title, desc:_desc}
);
this.setState(
  contents:this.state.contents
)
```

concat을 사용해서 보다 나은 방법으로 작성할 수 있다.

concat은 concatenate로 object와 입력한 값을 결합한다.

push는 원본을 바꾸지만, concat은 변경사항이 반영된 새로운 배열을 만들어서 return하기 때문에 문제가 발생할 가능성이 적다.

```js
var _contents = this.state.contents.concat(
  {id:this.max_content_id, title:_title, desc:_desc}
)
this.setState({
  contents:_contents
});
```

### shouldComponentUpdate

Push vs Concat

```js
var a = [1, 2];
a.push(3); // a = [1, 2, 3]

var a = [1, 2];
a.concat(3) // a = [1, 2]
var b = a.concat(3);
console.log(a, b); // [1, 2], [1, 2, 3]
```

현재 제작한 프로그램의 불합리한면,

현채 TOC에 표시되는 내용은 contents가 담고있는 배열이다.

배열의 내용이 바뀌면 TOC component의 render method가 호출되는 것을 통해서 TOC가 다시 그려짐
반대로 contents의 내용이 바뀌지 않으면 TOC의 render는 호출되지 않는게 좋다

현재는 contents와 관계없는 이벤트가 발생해도 (e.g., TOC의 목록이나 Control 버튼을 눌러 Content 내용을 바꾸는 경우) TOC가 계속 render 된다

React 에서는 component의 render 함수의 실행 여부를 개발자가 결정할 수 있도록 기능을 제공
shouldComponentUpdate

```js
shouldComponentUpdate() {
  console.log('===> TOC shouldComponentUpdate');
  return true;
}
```

기존에는 부모 component가 render 되면 자식 component도 모두 render 됐는데

shouldComponentUpdate의 return 값을 false로 바꾸면
shouldComponentUpdate는 호출되지만 TOC의 render는 호출되지 않는다.

```js
shouldComponentUpdate() {
  console.log('===> TOC shouldComponentUpdate');
  return true;
}
```

parameter는 두 개

```js
shouldComponentUpdate(newProps, newState) {
  console.log('===> TOC shouldComponentUpdate',
    newProps.data,
    this.props.data
  );
  return true;
}
```

기존의 content가 원소가 세 개인 배열인 상태에서

create를 통해서 contents를 추가시키면

newProps.data는 원소가 네 개인 배열이
this.props.data는 원소가 세 개인 배열이 출력된다.

결과적으로
render 이전에 shouldComponentUpdate가 실행되고
그 반환값이 true면 render가 실행되고 false이면 render가 실행되지 않는다
shouldComponentUpdate의 두 parameter를 통해 현재 값과 이전 값에 각각 접근할 수 있다.

이를 이용해서 props의 값이 변했을 때만 render를 호출하는 구조를 만들 수 있다.

```js
shouldComponentUpdate(newProps, newState) {
  console.log('===> TOC shouldComponentUpdate',
    newProps.data,
    this.props.data
  );

  if(this.props.data === newProps.data){
    return false;
  }
  return true;
}
```

이 때 concat이 아닌 push를 이용하게되면
this.state.contents의 원본을 바꾸게 되므로 this.props.data의 값도 변경 후의 contents 값을 갖게된다.

### immutable

원본을 바꾸지 않는다: 불변성(immutable)

```js
var a = [1,2];
var b = Array.from(a);
console.log(a, b, a===b); // [1,2], [1,2], false

b.push(3);
```

이처럼 애초에 새로운 배열을 a와 동일하게 만들어서 push를 하는 방법도 있다.

```js
vwr newContents = Array.from(this.state.contents);

newContents.push({id:this.max_content_id, title:_title, desc:_desc});
this.setState({
  contents:newContents
});
```

push와 concat은 배열에만 쓸 수 있고, 객체의 경우는 Object.assign을 사용

```js
var a = {name:'egoing'};
var b = Object.assign({}, a);
console.log(a, b, a===b);// {name:"egoing"} {name:"egoing"} false

var b = Object.assign({left:1, right:2}, a);
console.log(a, b, a===b);// {name:"egoing"} {left: 1, right: 2, name: "egoing"} false
```
