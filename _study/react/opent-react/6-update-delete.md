---
layout  : article
title   : 6. Update & Detele 기능 구현
summary : 
date    : 2020-12-02 12:24:32 +0900
updated : 2020-12-15 02:20:38 +0900
tag     : draft
toc     : true
public  : true
parent  : [[/react/opent-react]]
latex   : false
---
* TOC
{:toc}

> 이 글은 생활코딩의 [Update & Delete 기능 구현](https://opentutorials.org/module/4058/24861) 강의내용을 복습하기 위해 작성한 글입니다.
>
> * 제가 필요한 부분 위주로 확인하면서 정리하고 있어 글에 덜 작성된 부분이 있을 수 있습니다.
> * 글 작성 후 원문의 내용이 수정되거나 내용을 이해하기 위한 개인적인 설명이나 해석이 있을 수 있습니다. 되도록 원문을 참고해주시길 바랍니다.
> * 잘못된 부분이 있다면 댓글이나 그 외 편하신 방법으로 알려주시면 감사하겠습니다.

## Update 구현

read + create

CreateContent를 기반으로 UpdateContent를 생성한다.

```js
// UpdateContent.js

import React, { Component } from 'react';

class UpdateContent extends Component{

  render(){
    // App.js에서 보낸 update 대상이 잘 들어왔나 확인.
    console.log(this.props.data);
    console.log('UpdateContent render');

    return (
      <article>
        {/* header만 Update로 변경 */}
        <h2>Update</h2>
        <form action="/create_process" method="post"
          onSubmit={function(e){
            e.preventDefault();
            this.props.onSubmit(
              e.target.title.value,
              e.target.desc.value
            );
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
      </article>
    );
  }
}

export default UpdateContent; 
```

mode가 update인 경우를 추가하고

리팩토링 함
render에 존재하던 mode에 따라 content를 조작하던 코드를 별도의 getContent 함수로 빼서 Return
create와 read가 공유하성 있는 코드를 getReadContent 함수로 별도로 빼서 작성

```js
// App.js
...
import UpdateContent from "./components/UpdateContent"
...

class App extends Component {
  constructor(props){
    ...
  }

  // 6. getReadContent 함수 생성.
  // 현재 선택한 id와 동일한 값의 id를 갖는 content의 object를 반환
  getReadContent(){
    var i = 0;
      while(i < this.state.contents.length){
        var data = this.state.contents[i];
        if(data.id === this.state.selected_content_id) {
          return data;
          break;
        }
        i = i + 1;
      }
  }

  // 2. getContent 함수로 분리
  getContent(){
    var _title, _desc, _article = null;

    if(this.state.mode ===  'welcome'){ ... } 
    else if(this.state.mode === 'read'){
      // 7. getReadContent 사용
      var _content = this.getReadContent();
      _article = <ReadContent title={_content.title} desc={_content.desc}></ReadContent>
    }
    else  if(this.state.mode === 'create'){ ... } 

    // 1. mode가 update인 경우 생성
    else  if(this.state.mode === 'update'){
      // 5. UpdateContent의 대상으로 현재 선택된 content의 정보를 보내줘야함.
      // mode가 read일 때와 동일한 코드를 사용하면 되기 때문에 이를 별도의 함수로 빼서 사용.
      // 7. getReadContent 사용
      _content = this.getReadContent();
      _article = <UpdateContent data={_content} onSubmit={function(_title, _desc){
        // create를 복제, 이후 수정 예정
        this.max_content_id = this.max_content_id+1;
        var _contents = this.state.contents.concat(
          {id:this.max_content_id, title:_title, desc:_desc}
        )
        this.setState({
          contents:_contents
        });
      }.bind(this)}></UpdateContent>
    }
    // 3. _article을 반환해줘야함
    return _article;
  }

  render() {
    console.log('App render');

    return (
      <div className="App">
        <Subject> </Subject>
        <TOC></TOC>
        <Control></Control>

        {/* 4. _article 변수를 직접 받는 것 대신 */}
        {/* getContent 함수를 수행해서 return 값인 _article를 출력 */}
        {this.getContent()}
      </div>
    );
  }
}
export default App;
```

## Update 구현: form 작업

React Guide (MAIN CONCEPT)의 form 부분을 참고

```js
// UpdateContent.js

import React, { Component } from 'react';

class UpdateContent extends Component{

  // 2. props를 사용하면 props 값은 read only이기 때문에 수정이 불가능하다.
  // 받아온 data를 사용하기 위해서는 우선 가변적인 data인 state 상태로 바꿔줘야한다.
  constructor(props){
    super(props);
    this.state = {
      // 6. id 값 입력
      id:this.props.data.id,
      title:this.props.data.title,
      desc:this.props.data.desc
    }
    // 5. binding 상태로 바꿔줌
    this.inputFormHandler = this.inputFormHandler.bind(this);
  }
  inputFormHandler(e){
    this.setState({[e.target.name]: e.target.value});
  }
  
  render(){
    console.log('UpdateContent render');

    return (
      <article>
        <h2>Update</h2>
        <form action="/create_process" method="post"
          onSubmit={function(e){
            e.preventDefault();
            this.props.onSubmit(
              // 7. state를 이용해서 수정
              this.state.id,
              this.state.title,
              this.state.desc
            );
          }.bind(this)}
        >
          <p>
            {/* 6. 업데이트 대상 지정 */}
            <input type="hidden" name="id" value={this.state.id}></input>
            <input 
              type="text" 
              name="title" 
              placeholder="title"
              // 1. 기존의 data를 수정하는 것이므로 이를 값으로 띄워서 보여줘야함.
              value={this.state.title}
              // 3. 위의 value 값을 수정한다고 state 값이 바뀌지는 않는다.
              // input값을 바꿨을 때 state 값이 바뀌도록 해줘야한다.
              onChange={function(e){
                // event 객체의 target인 input 태그의 value 값이 변하는 것을 console에 출력
                // 입력한 값이 한글자씩 console에 출력되는 것을 볼 수 있다.
                console.log(e.target.value);
                // 4. state의 title을 변경한 값으로 변경.
                this.setState({title: e.target.value});
              }.bind(this)}
            ></input>
          </p>
          <p>
            <textarea 
              onChange={function(e){
                this.setstate({desc: e.target.value});
              }.bind(this)}
              name="desc" 
              placeholder="description" 
              {/* textarea 태그 안에 입력하면 안되고 value 값으로 줘야함 */}
              value={this.state.desc}></textarea>
          </p>
          <p>
            <input type="submit"></input>
          </p>
        </form>
      </article>
    );
  }
}
```

onChange를 일일히 계속 만드는 것은 비효율적이므로
별도의 함수로 만듦

```js
onchange={function(e){
  this.setstate({title: e.target.value});
}.bind(this)}

/* 다음과 같이 변경 */

inputFormHandler(e){
  this.setState({[e.target.name]: e.target.value});
}.bind(this)}

onChange={this.inputFormHandler.bind(this)}
```

## Update 구현: state 변경

다음 강의 추가
업데이트를 하려면 어디를 업데이트 할 것인지에 대한 식별자가 필요

```js
getContent(){
  var _title, _desc, _article = null;

  if(this.state.mode ===  'welcome'){ ... } 
  else if(this.state.mode === 'read'){
    var _content = this.getReadContent();
    _article = <ReadContent title={_content.title} desc={_content.desc}></ReadContent>
  }
  else  if(this.state.mode === 'create'){ 
    _article = <CreateContent onSubmit={function(_title, _desc){
      this.max_content_id = this.max_content_id+1;

      // 9. create 부분도 동일하게 변경.
      /* var _contents = this.state.contents.concat(
        {id:this.max_content_id, title:_title, desc:_desc}
      ) */
      var _contents = Array.from(this.state.contents);
      _contents.push({id:this.max_content_id, title:_title, desc:_desc});

      this.setState({
        contents:_contents,
        // 10. create의 경우도 mode를 read로 바꾸고
        mode:'read',
        // selected content를 생성한 content로 지정
        selected_content_id:this.max_content_id
      });
    }.bind(this)}></CreateContent>
  } 

  else  if(this.state.mode === 'update'){
    _content = this.getReadContent();
    // UpdateContent.js 에서 parameter에 id를 추가했으므로 이부분도 수정
    _article = <UpdateContent data={_content} onSubmit={
      function(_id, _title, _desc){
      // 8. 이건 create 시에만 content의 id값을 증가시켜 생성하기 위한 것이므로 제거
      // this.max_content_id = this.max_content_id+1;

      // 추가할 것이 아니고 수정할 것이기 때문에 코드 변경
      /* var _contents = this.state.contents.concat(
        {id:this.max_content_id, title:_title, desc:_desc}
      ) */

      // 우선 this.state.contents를 복제
      var _contents = Array.from(this.state.contents);
        var i = 0;
        while(i < _contents.length){
          // 일치하는 대상에 대해 수정한 값으로 변경
          if(_contents[i].id === _id) {
            _contents[i] = {id:_id, title:_title, desc:_desc};
            break;
          }
          i = i + 1;
        }
        this.setState({
          contents:_contents,
          // 9. 내용 update 후 mode를 read로 변경
          mode:'read'
        });
    }.bind(this)}></UpdateContent>
  }
  // 3. _article을 반환해줘야함
  return _article;
}
```

## Delete 구현

create 구현이 끝났으니 다시 App의 mode default를 welcome 상태로 변경

```js
// App.js

render() {
  console.log('App render');
  return (
    <div className="App">
      <Subject></Subject>
      <TOC></TOC>
      <Control onChangeMode={function(_mode){

        // 버튼을 눌렀을 때 mode가 delete면 삭제
        if(_mode === 'delete'){
          // 정말로 삭제할 것인지 확인: 사용자가 확인을 누르면 true, 취소를 누르면 false 반환
          if(window.confirm('really?')){
            // contents 복제
            var _contents = Array.from(this.state.contents);
            var i = 0;
            while(i < _contents.length){
              if(_contents[i].id === this.state.selected_content_id){
                // contents 삭제 (i번째부터 1개)
                // _contents의 원본을 수정.
                _contents.splice(i,1);
                break;
              }
              i = i + 1;
            }
            // contents 수정사항 반영
            this.setState({
              contents:_contents
              mode:'welcome',
            });
            // 삭제 되었음을 알려줌.
            alert('deleted!');
          }
        } else {
          this.setState({
            mode:_mode
          });
        }
      }.bind(this)}></Control>
      {this.getContent()}
    </div>
  );
}

export default App;
```
