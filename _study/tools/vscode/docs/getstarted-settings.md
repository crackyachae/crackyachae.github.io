---
layout  : article
title   : GET STARTED_User and Workspace Settings
summary : 
date    : 2020-03-15 23:26:31 +0900
updated : 2021-02-07 20:25:19 +0900
tag     : vscode docs draft
toc     : true
public  : true
parent  : [[/tools/vscode/docs]]
latex   : false
---
* TOC
{:toc}

> 이 글은 Visual Studio Code Documentation [User and Workspace Settings](https://code.visualstudio.com/docs/getstarted/settings) 를 읽으면서 개인적으로 번역한 글입니다.
>
> * 제가 필요한 부분 위주로 확인하면서 정리하고 있어 글에 덜 작성된 부분이 있을 수 있습니다.
> * 글 작성 후 원문의 내용이 수정되거나 내용을 이해하기 위한 개인적인 설명이나 해석이 있을 수 있습니다. 되도록 원문을 참고해주시길 바랍니다.
> * 잘못된 부분이 있다면 댓글이나 그 외 편하신 방법으로 알려주시면 감사하겠습니다.

Visual Studio Code의 설정에서 VS Code의 편집기(editor)나 사용자 인터페이스(use interface) 등 다양한 기능들을 수정할 수 있다.

![hero]( /post-img/vscode-docs-getstarted-settings/111094880-8db93c80-857f-11eb-9ede-badb56ec4d0f.png )

VS Code 설정은 두 가지 영역으로 나뉜다.

* 사용자 설정(User Settings): 사용자가 연 모든 VS Code에 전체적으로 적용되는 설정.
* 작업영역 설정(Workspace Settings): 작업영역 내에 저장된 설정으로 해당 작업영역이 열려있을 때만 적용된다.

작업영역 설정이 사용자 설정보다 우선적으로 적용된다. 각 프로젝트마다 다르고 해당 프로젝트에 참여하는 개발자간에 공유가 가능하다.

> **NOTE**: VS Code의 "작업 영역"은 일반적으로 프로젝트의 Root폴더이다. 작업 영역 설정값과, debugging, task은 configuration은 .vscode 폴더 안의 root에 저장된다. Multi-root workspaces라는 기능을 이용하면 하나의 작업 영역에 둘 이상의 root 폴더를 가질 수도 있다.

## Creating User and Workspace Settings

사용자 및 작업영역 설정은 다음과 같이 들어갈 수 있다.

* Windows/Linux: File > Preferences > Settings
* macOS: Code > Preferences > Settings

Command Palette (`Ctrl+Shift+P`) 에서 **Preferences: Open Settings**나 단축키 (`ctrl+,`)를 이용해도 된다.

아래의 예시에서는 color theme과 icon theme을 바꿨다.

![settings]( /post-img/vscode-docs-getstarted-settings/111094887-901b9680-857f-11eb-8986-74847a7231bc.png )

설정을 바꾸면 바로 reload된다. 바뀐 설정 값은 editor에서 처럼 *파란 줄*로 표시된다. 톱니 아이콘을 누르면 JSON과 같은 copy setting이나 기본 값으로 재설정하는 context menu가 나온다.

> **NOTE**: 작업영역 설정은 팀 내에서 프로젝트의 구체적인 설정값을 공유할 때 유용하다.

## Settings editor

설정 창을 열어서 변경하고자 하는 설정을 검색하거나 찾을 수 있다. 검색창을 이용해서 검색하면 검색어에 부합한 내용을 띄우고 강조하면서 부합하지 않는 것들은 제외하기 때문에 찾고자 하는 내용을 빠르고 쉽게 찾을 수 있다.

![settings-search]( /post-img/vscode-docs-getstarted-settings/111094890-90b42d00-857f-11eb-8f98-1accaf429f51.png )

### Edit settings

각 세팅 값은 **checkbox**, **input**, **drop-down**을 이용해서 수정할 수 있다. 글자를 수정하거나 바꾸고 싶은 옵션을 선택해서 원하는 값으로 바꾸면 된다.

![settings-edit]( /post-img/vscode-docs-getstarted-settings/111094893-914cc380-857f-11eb-8a2b-ba91c4ee9b45.png )

### Settings groups

기본 설정 값은 찾기 쉽도록 group으로 묶여있다. 가장 위쪽의 **Commonly Used** group은 자주 customize되는 항목들이다.

![settings-groups]( /post-img/vscode-docs-getstarted-settings/111094897-91e55a00-857f-11eb-84cd-8771061b8fb2.png )

그 아래는 VS Code와 함께 제공되는 기본 설정을 옮겨놓은 것이다.

## Settings file location

VS Code는 기본적으로 설정 창을 제공하지만 **Open Settings (JSON)** command를 이용하거나 `workbench.settings.editor`설정으로 기본 설정 창을 바꿔서 `settings.json` 파일을 바꿀 수 있다.

운영체제에 따른 사용자 설정 파일의 위치는 다음과 같다.

* **Windows** %APPDATA%\Code\User\settings.json
* **macOS** $HOME/Library/Application Support/Code/User/settings.json
* **Linux** $HOME/.config/Code/User/settings.json
작업영역 설정 파일은 root 폴더의 `.vscode`폴더 안에 있다.

> **NOTE**: Multi-root Workspace의 경우 작업영역 설정은 workspace configuration 파일 안에 있다.

## Language specific editor settings

Editor의 언어를 customize하기 위해서는 **Command Palette** (`Ctrl+Shift+P`)에서  global command인 **Preferences: Configure Language Specific Settings**를 실행시켜 (command id: `workbench.action.configureLanguageBasedSettings`) language picker를 연다. 원하는 언어를 선택하면 설정창에 해당 설정을 추가할 수 있는 언어 항목이 열린다.

![pref-config-lang-settings]( /post-img/vscode-docs-getstarted-settings/111094898-927df080-857f-11eb-897a-1198b72a28e3.png )

![lang-selection]( /post-img/vscode-docs-getstarted-settings/111094899-93168700-857f-11eb-9665-00c4ca210155.png )

![lang-based-settings]( /post-img/vscode-docs-getstarted-settings/111094900-93168700-857f-11eb-9843-5dbdf06c9cf1.png )

열려있는 파일 타입에 대한 editor를 customize하고 싶으면 VS Code창 오른쪽 아래의 Status Bar Language Mode를 클릭하면 된다. 그러면 **Configure 'language_name' language based settings**으로 Langauge Mode picker가 열린다. 원하는 언어를 선택하면 설정창에 해당 설정을 추가할 수 있는 언어 항목이 열린다.

Language based setting은 `settings.json`파일을 직접 열어서 할 수도 있다. 다른 설정 방법과 마찬가지로 작업영역 설정에 파일을 옮겨서 작업영역에 설정을 적용할 수도 있다. 사용자 설정과 작업영역 설정이 겹치면 우선순위를 작업영역 설정에 두고 병합된다.

아래의 예시는 언어 모드를 `typescript`와 `markdown`로 해서 editor를 customize한 예시이다.

```json
{
  "[typescript]": {
    "editor.formatOnSave": true,
    "editor.formatOnPaste": true
  },
  "[markdown]": {
    "editor.formatOnSave": true,
    "editor.wordWrap": "on",
    "editor.renderWhitespace": "all",
    "editor.acceptSuggestionOnEnter": "off"
  }
}
```

설정시 IntelliSense를 사용해 허용되는 language based settings를 찾는데 도움을 받을 수 있다. 모든 Editor 설정이 지원되고 일부 non-editor 설정도 지원된다.

## Settings and security

일부 설정에서는 VS Code가 특정한 작업을 수행하기 위해 실행 파일을 직접 지정할 수 있다. 예를 들어 Integrated Terminal이 사용할 shell의 종류를 고를 수 있다. 보안을 위해 이런 설정은 작업영역이 아닌 사용자 설정에서만 정의할 수 있다.

작업영역 설정에서 지원하지 않는 설정 값은 다음과 같다.

* `git.path`
* `terminal.integrated.shell.linux`
* `terminal.integrated.shellArgs.linux`
* `terminal.integrated.shell.osx`
* `terminal.integrated.shellArgs.osx`
* `terminal.integrated.shell.windows`
* `terminal.integrated.shellArgs.windows`
* `terminal.external.windowsExec`
* `terminal.external.osxExec`
* `terminal.external.linuxExec`

작업영역 설정에서 위의 목록에 있는 것을 정의하면 경고 메시지가 표시된 후 이후의 값을 항상 무시한다.

## Default settings

아래 링크는 VS Code의 기본 세팅 값이다. 설정 창의 default values에서도 볼 수 있다.

[[vscode-docs-getstarted-settings-default]]

## Common questions

### VS Code says "Unable to write settings."

"Unable to write settings. Please open User Settings to correct errors/warnings in the file and try again." 이와 같은 error message가 표시되면 `settings.json`파일이 잘못되거나 파일에 오류가 있다는 뜻이다. 오류는 comma나 설정 값이 없는 간단한 것일 수도 있다. 설정 창을 열면 **File** > **Preferences** > **Settings** (macOS는 **Code** > **Preferences** > **Settings**) (`ctrl+,`) 오류가 붉은 밑줄로 표시되어있는 것을 볼 수 있다.

### How can I reset my user settings?

VS Code를 기본 값으로 돌리는 가장 간단한 방법은 `settings.json` 파일을 삭제하는 것이다. 두 개의 중괄호 안에 있는 모든 내용을 지운 뒤 파일을 저장하면 VS Code가 가본 값으로 돌아갈 것이다.

### When does it make sense to use workspace settings?

작업영역은 Custom이 필요하지만 다른 VS Code 프로젝트에는 영향을 미치고 않을 때 사용하면 된다. 좋은 예로 특정 언어의 linting rules가 있다.
