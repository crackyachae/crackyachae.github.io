---
layout  : article
title   : Auto Rename Tag
summary : 
date    : 2020-04-05 16:57:28 +0900
updated : 2020-04-05 16:57:28 +0900
tag     : vscode extension draft
toc     : true
public  : true
parent  : [[/tools/vscode/ext]]
latex   : false
---
* TOC
{:toc}

> 이 글은 Visual Studio Market Place의 [Auto Rename Tag](https://marketplace.visualstudio.com/items?itemName=formulahendry.auto-rename-tag) extension의 소개 페이지를 읽으면서 번역한 글입니다.
>
> * 제가 필요한 부분 위주로 확인하면서 정리하고 있어 글에 덜 작성된 부분이 있을 수 있습니다.
> * 글 작성 후 원문의 내용이 수정되거나 내용을 이해하기 위한 개인적인 설명이나 해석이 있을 수 있습니다. 되도록 원문을 참고해주시길 바랍니다.
> * 잘못된 부분이 있다면 댓글이나 그 외 편하신 방법으로 알려주시면 감사하겠습니다.
>
> version 0.1.1 기준 작성

Visual Studio IDE 처럼 쌍을 이루고 있는 HTML/XML 태그의 이름을 자동으로 바꿔준다.

## Notice

규모가 큰 파일을 수정할 때 제대로 동작하지 않는 경우가 있다.

## Features

* 하나의 HTML/XML 태그를 수정하면 그것과 쌍을 이루고 있는 HTML/XML 태그도 수정된다.

## Usage

![usage](/post-img/vscode-ext-auto-rename-tag/111097276-9102f700-8584-11eb-9d50-6290c51adad2.gif)

## Configuration

* `auto-rename-tag.activationOnLanguage`에 extension을 적용시키고 싶은 언어의 목록을 작성할 수 있다.
    * 기본값은 `["*"]`로 모든 언어에 활성화 되어있다:

```json
{
    "auto-rename-tag.activationOnLanguage": [
        "html",
        "xml",
        "php",
        "javascript"
    ]
}
```

> **Note:** 설정에는 [VS Code](https://github.com/Microsoft/vscode/tree/master/extensions)에 정의되어 있는 언어id 를 사용해야한다. [Javascript definition](https://github.com/Microsoft/vscode/blob/master/extensions/javascript/package.json)을 예로 들면, `.js`나 `.es6`를 위해서는 `javascript`를, `.jsx`를 위해서는 `javascriptreact`를 사용해야한다. 즉, 이 extension을 `.js` 파일에 활성화 시키고 싶으면 settings.json에 `javascript`를 추가해야한다.
