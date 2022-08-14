---
layout  : article
title   : Auto Close Tag
summary : 
date    : 2020-04-05 17:09:43 +0900
updated : 2020-04-05 17:09:43 +0900
tag     : vscode extension draft
toc     : true
public  : true
parent  : [[/tools/vscode/ext]]
latex   : false
---
* TOC
{:toc}

> 이 글은 Visual Studio Market Place의 [Auto Close Tag](https://marketplace.visualstudio.com/items?itemName=formulahendry.auto-close-tag) 확장프로그램의 소개 페이지를 읽으면서 개인적으로 번역한 글입니다.
>
> * 제가 필요한 부분 위주로 확인하면서 정리하고 있어 글에 덜 작성된 부분이 있을 수 있습니다.
> * 글 작성 후 원문의 내용이 수정되거나 내용을 이해하기 위한 개인적인 설명이나 해석이 있을 수 있습니다. 되도록 원문을 참고해주시길 바랍니다.
> * 잘못된 부분이 있다면 댓글이나 그 외 편하신 방법으로 알려주시면 감사하겠습니다.
>
> version 0.5.6 기준 작성

Visual Studio IDE나 Sublime Text 처럼 자동으로 HTML/XML 닫는 태그를 생성한다.

## Note

From VS Code 1.16, it has [built-in close tag support](https://code.visualstudio.com/updates/v1_16#_html-close-tags) for HTML, Handlebars and Razor files. This extension is enabled for other languages like XML, PHP, Vue, JavaScript, TypeScript, JSX, TSX and so on. It is configurable.

## Features

* Opening 태그의 괄호를 닫을 때 자동으로 closing 태그를 생성한다.
* Closing 태그가 삽입되면 커서는 opening 태그와 closing 태그 사이에 위치한다.
* 자동으로 닫히지 않을 태그의 목록을 설정할 수 있다.
* Self-closing 태그도 자동으로 닫힌다.
* Sublime Text 3 방식의 자동 태그 닫힘을 지원한다.
* 태그를 직접 닫기위해 키보드 단축기나 Command Palette를 사용한다.

## Usage

Opening 태그의 괄호를 닫으면 closing 태그가 자동으로 셍긴다.

![usage]( /post-img/vscode-ext-auto-close-tag/111096838-c78c4200-8583-11eb-9e99-a8395f0ad390.gif )

태그를 직접 닫고 싶으면 `Alt+.` (Mac은 `Cmd+Alt+.`)을 입력하거나 `F1`을 누르고 `Close Tag`를 선택하거나 입력하면 된다.

![close tag]( /post-img/vscode-ext-auto-close-tag/111096845-cb1fc900-8583-11eb-95c7-b138d48184d5.gif )

## Sublime Text 3 Mode

Sublime Text 3 처럼 `</`를 적었을 때 close tag 생성하고 싶으면 다음 설정을 `true`로 바꾸면 된다:

```json
{
    "auto-close-tag.SublimeText3Mode": true
}
```

해당 설정의 기본값은 false이다.

![sublime text 3]( /post-img/vscode-ext-auto-close-tag/111096846-cc50f600-8583-11eb-9e6e-ba44be0e5aa1.gif )

## Configuration

* close 태그를 자동으로 넣고 싶으면 `auto-close-tag.enableAutoCloseTag` 값을 `true`로 바꾼다.
    * Default: `true`

```json
{
    "auto-close-tag.enableAutoCloseTag": true
}
```

* Self-closing 태그를 자동으로 닫기 위해서는 다음 설정값을 `true`로 바꾼다.
    * Example: `<br`을 입력하고 `/`를 입력하면 `>`가 자동으로 추가
    * Default: `true`

```json
{
    "auto-close-tag.enableAutoCloseSelfClosingTag": true
}
```

* `auto-close-tag.activationOnLanguage`에 extension을 적용시키고 싶은 언어의 목록을 작성할 수 있다.
    * 모든 언어에 활성화 하고 싶으면 `["*"]`를 사용하면 된다.
    * Default:
  
```json
{
    "quto-close-tag.activationOnLanguage": [
        "xml",
        "php",
        "blade",
        "ejs",
        "jinja",
        "javascript",
        "typescript",
        "typescriptreact",
        "palintext",
        "markdown",
        "vue",
        "liquid",
        "erb",
        "lang-cfml",
        "cfml",
        "HTML (Eex)"
    ]
}
```

> **Note:** 설정에는 [VS Code](https://github.com/Microsoft/vscode/tree/master/extensions)에 정의되어 있는 언어id 를 사용해야한다. [Javascript definition](https://github.com/Microsoft/vscode/blob/master/extensions/javascript/package.json)을 예로 들면, `.js`나 `.es6`를 위해서는 `javascript`를, `.jsx`를 위해서는 `javascriptreact`를 사용해야한다. 즉, 이 extension을 `.js` 파일에 활성화 시키고 싶으면 settings.json에 `javascript`를 추가해야한다.

* 자동 닫힘 설정을 하지 않을 태그의 리스트도 설정할 수 있다.
    * [W3C spec](https://html.spec.whatwg.org/multipage/syntax.html#syntax-elements)의 HTML void element가 기본값으로 설정되어 있고 사용자가 수정할 수 있다.

```json
{
    "auto-close-tag.excludedTags": [
        "area",
        "base",
        "br",
        "col",
        "command",
        "embed",
        "hr",
        "img",
        "input",
        "keygen",
        "link",
        "meta",
        "param",
        "source",
        "track",
        "wbr"
    ]
}
```

* `auto-close-tage.fullMode`: Visual Studio와 Sublime Text mode 모두를 활성화 시킬지 여부를 결정한다.
    * 기본값은 `false`
