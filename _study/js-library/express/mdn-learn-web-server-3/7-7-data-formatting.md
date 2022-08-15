---
layout  : article
title   : Luxon을 사용한 데이터 형식화 (Date formatting using luxon)
summary : 
date    : 2022-02-18 15:30:56 +0900
updated : 2022-02-18 15:31:45 +0900
tag     : draft
toc     : true
public  : true
parent  : [[/js-library/express/mdn-learn-web-server-3/7-express-tutorial-5]]
latex   : false
---
* TOC
{:toc}

> 이 글은 MDN Learn web development의 [Express web framework (Node.js/JavaScript)](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs) 중 [Date formatting using luxon](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/Displaying_data/Date_formatting_using_moment)의 내용을 번역 및 정리한 글입니다.
>
> * 제가 필요한 부분 위주로 확인하면서 정리하고 있어 글에 덜 작성된 부분이 있을 수 있습니다.
> * 글 작성 후 원문의 내용이 수정되거나 내용을 이해하기 위한 개인적인 설명이나 해석이 있을 수 있습니다. 되도록 원문을 참고해주시길 바랍니다.
> * 잘못된 부분이 있다면 댓글이나 그 외 편하신 방법으로 알려주시면 감사하겠습니다.

현재 모델의 기본 날짜 렌더링(의 형식)은 매우 지저분(ugly)하다: *Tue Oct 06 2020 15:49:58 GMT+1100 (AUS Eastern Daylight Time)*. 이번 섹션에서는 `due_date` 필드를 조금 더 익숙한 형식으로 표시할 수 있도록 이전 섹션의 *책 인스턴스 목록* 페이지를 수정하는 방법을 소개할 것이다.

이번에 사용할 방식은 `BookInstance` 모델에 형식화된 날짜를 반환하는 가상 속성을 만드는 것이다. 형식을 지정하는 데는 날짜를 분석(parsing)하고, 유효성을 검사하고, 조작하고, 형식을 지정해, 지역화하기 위한 강력하고, 현대적이며, 친근한 라이브러리인 [luxon](https://www.npmjs.com/package/luxon)을 사용할 것이다.

> Note: Pug 템플릿에서 직접 *luxon*을 사용해 문자열의 형식을 지정하거나, 혹은 몇몇 다른 곳에서 문자열의 형식을 지정할 수도 있다. 가상 속성을 사용하면 지금 `due_date`를 얻는 방식과 정확히 같은 방법으로 형식화된 날짜를 얻을 수 있다.

> Note: 이전에는 데이터 형식 지정을 위해 [moment](https://www.npmjs.com/package/moment) 라이브러리를 사용했다. 하지만 moment가 [자신을 "레거시"라고 했기](https://momentjs.com/docs/#/-project-status/) 때문에 Luxon을 사용하기로 바꿨다. Luxon은 훌륭한 대체 라이브러리를 위한 [moment 프로젝트의 주요 권장 사항](https://momentjs.com/docs/#/-project-status/recommendations/) 중 하나이다.

## Luxon을 설치하기 (Install luxon

다음의 명령을 프로젝트의 루트에 입력한다:

```zsh
npm install luxon
```

## 가상 속성을 생성하기 (Create the virtual property)

1. **./models/bookinstance.js.**을 연다.
1. 페이지의 가장 위에, *luxon*을 불러온다.

    ```js
    const { DateTime } = require("luxon");
    ```

url 속성 바로 다음에 가상 속성 `due_back_formatted`을 추가한다.

```js
BookInstanceSchema
.virtual('due_back_formatted')
.get(function () {
  return DateTime.fromJSDate(this.due_back).toLocaleString(DateTime.DATE_MED);
});
```

> Note: Luxon은 다양한 형식으로 문자열을 불러오고, 미리 정의하거나 자유로운 형식으로 내보낼 수 있다. 이번 경우에는 자바스크립트 날짜 문자열을 불러오기 위해 `fromJSDate()`를 날짜를 `DATE_MED` 형식의 영문으로 내보내기 위해 `toLocaleString()`을 사용한다: Oct 6th, 2020. 다른 형식과 날짜 문자열 국제화를 위해서는 Luxon 문서의 [formatting](https://github.com/moment/luxon/blob/master/docs/formatting.md#formatting) 항목을 참고하자.

## 뷰를 갱신하기 (Update the view)

**/views/bookinstance_list.pug**를 열어 `due_back`을 `due_back_formatted`로 바꾼다.

```pug
      if val.status != 'Available'
        //span  (Due: #{val.due_back} )
        span  (Due: #{val.due_back_formatted} )
```

끝이다. 사이드바의 *All book-instances*로 이동하면, 모든 마감일(due dates)이 훨씬 매력적인 것을 볼 수 있다!
