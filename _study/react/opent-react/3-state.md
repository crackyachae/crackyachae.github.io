---
layout  : article
title   : 3. State
summary : 
date    : 2020-11-30 12:04:53 +0900
updated : 2020-12-27 23:08:39 +0900
tag     : draft
toc     : true
public  : true
parent  : [[/react/opent-react]]
latex   : false
---
* TOC
{:toc}

> 이 글은 생활코딩의 [State](https://opentutorials.org/module/4058/24738) 강의내용을 복습하기 위해 작성한 글입니다.
>
> * 제가 필요한 부분 위주로 확인하면서 정리하고 있어 글에 덜 작성된 부분이 있을 수 있습니다.
> * 글 작성 후 원문의 내용이 수정되거나 내용을 이해하기 위한 개인적인 설명이나 해석이 있을 수 있습니다. 되도록 원문을 참고해주시길 바랍니다.
> * 잘못된 부분이 있다면 댓글이나 그 외 편하신 방법으로 알려주시면 감사하겠습니다.

## Props와 State

React에서는 component를 보다 효율적으로 조작하기 위해 내부와 외부의 조작 방식을 구분해놓았다.

* component를 외부적으로 조작할 때는 `props`를
* 내부적으로 component의 상태를 관리할 때는 `state`를 사용한다.

$$
Probs \rightarrow
\begin{bmatrix}
  & &  \\
  & State & \\
  & & \\
\end{bmatrix}
$$

이해를 돕기 위해 component를 하나의 제품으로 보자. 이 제품을 만든 '구현자'와 제품을 사용하는 '사용자'가 있다고 할 때,

* 사용자가 제품을 조작하기 위한 장치 (User interface)를 `props`
* 구현자의 제품 제작을 위한 내부적 장치 (API)를 `state`로 볼 수 있다.

불필요한 정보가 component 밖으로 노출되지 않도록 `props`와 `state`를 엄격히 구분하여 사용해야 한다.

## State

앞의 예시에서 `<Subject>`의 content가 hard coded 되어있어 사용자에게 그대로 노출이 된다는 문제가 있다.

```js
/* App.js */
import Subject from "./components/Subject"

// ...

class App extends Component {
  render() {
    return (
      <div className="App">
        {/* title과 sub의 내용이 hard coded */}
        <Subject title="WEB" sub="world wide web!"></Subject>
        <TOC></TOC>
        <Content></Content>
      </div>        
    );
  }
}

export default App
```

state를 이용해 이를 개선해보자.

```js
// App.js
class App extends Component {

  // render 이전에 component를 초기화 하고 싶다면
  // constructor 안에 초기 설정을 작성
  constructor(props) {
    super(props);

    // state 값을 초기화
    // subject property에 title과 sub property를 갖는 객체를 부여
    this.state = {
      subject: {title:'Web' sub:'World wide web'}
    }
  }

  render() {
    return (
      <div className="App">
        {/* 초기화 한 state의 subject property에 접근하여
          * 이를 <Subject>의 props 값으로 사용 */}
        <Subject 
          title={this.state.subject.title}
          sub={this.state.subject.sub}>
        </Subject>
        <TOC></TOC>
        <Content></Content>
      </div>        
    );
  }
}
```

`props` 값이 quote로 싸여있으면 문자열 자체로 입력되기 때문에 코드의 값을 쓰기 위해서는 `{}`로 감싸주어야 한다.

```js
// title의 값: this.state.subject.title
<Subject
  title="this.state.subject.title"
/>

// title의 값: WEB
<Subject
  title={this.state.subject.title}
/>
```

예시에서는 `App.js`의 `state`를 `<Subject>`의 `props` 값으로 전달하고 있다. 이처럼 `state`와 `props`는 상위 component의 상태 변화를 하위 component로 전달하는 수단이기도 하다.

## Key

`<TOC>` component로 state를 이용하도록 수정해보자.

```js
// App.js
class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      subject: {title:'Web' sub:'World wide web'}
      // state에 contents property를 추가.
      // id, title, desc를 담은 객체를 원소로 갖는 배열.
      contents: [
        {id:1, title:'HTML', desc:'HTML is for information'},
        {id:2, title:'CSS', desc:'CSS is for design'},
        {id:3, title:'JavaScript', desc:'JavaScript is for interaction'},
      ]
    }
  }

  render() {
    return (
      <div className="App">
        <Subject 
          title={this.state.subject.title}
          sub={this.state.subject.sub}>
        </Subject>
        {/* state의 contents (array 전체)를 props로 전달 */}
        <TOC data={this.state.contents}></TOC>
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
    // App.js의 this.state.contents
    // 세 개의 원소(객체)로 이뤄진 배열이다.
    var data = this.props.data;

    // data array의 원소로 담긴 배열을 이용해 
    // li element를 생성해서 list 배열에 담는 것을 반복.
    var i = 0;
    while(i < data.length){
      lists.push(<li><a href={"/content/"+data[i].id}>{data[i].title}</a></li>);
      i = i + 1;
    }

    return (
      <nav>
        <ul>
          {lists}
        </ul>
      </nav>
    );
  }
}
```

위와 같이 코드를 작성한 뒤 실행하면 콘솔에 에러 메시지가 발생한다.

이는 React에서 배엻을 이용해 복수의 element를 생성할 때는 원활한 작동을 위해 각 element가 `key`라는 특수한 `props`를 가지도록 강제되기 때문이다.

위의 `list.push...` 부분의 `<li>` element에 `key`를 `props`로 추가해주고 그 값을 각 `data` 원소의 `id` 값으로 지정해준다.

```js
// Before
lists.push(<li><a href={"/content/"+data[i].id}>{data[i].title}</a></li>);

// set key
lists.push(<li key={data[i].id}><a href={"/content/"+data[i].id}>{data[i].title}</a></li>);
```
