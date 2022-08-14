---
layout  : article
title   : USER GUIDE_Basic Editing
summary : 
date    : 2020-04-09 14:41:52 +0900
updated : 2021-05-20 11:22:15 +0900
tag     : draft
toc     : true
public  : true
parent  : [[/tools/vscode/docs]]
latex   : false
---
* TOC
{:toc}

> 이 글은 Visual Studio Code Documentation [Basic Editing](https://code.visualstudio.com/docs/editor/codebasics) 를 읽으면서 개인적으로 번역한 글입니다.
>
> * 제가 필요한 부분 위주로 확인하면서 정리하고 있어 글에 덜 작성된 부분이 있을 수 있습니다.
> * 글 작성 후 원문의 내용이 수정되거나 내용을 이해하기 위한 개인적인 설명이나 해석이 있을 수 있습니다. 되도록 원문을 참고해주시길 바랍니다.
> * 잘못된 부분이 있다면 댓글이나 그 외 편하신 방법으로 알려주시면 감사하겠습니다.

Visual Studio Code는 에디터(editor)로써 생산적으로 소스 코드를 편집하기 위한 기능을 포함한다. 이 글은 사용자가 에디터의 기본 기능을 익히고 코드를 다룰 수 있도록 도와준다.

## Keyboard shortcuts

높은 생산성을 위해서는 손을 키보드에 유지하는 것이 중요하다. VS Code에는 다양한 keyboard shortcut이 있고 이를 customize 할 수 있다.

* [Keyboard Shortcuts Reference](https://code.visualstudio.com/docs/getstarted/keybindings#_keyboard-shortcuts-reference) - Reference sheet을 다운로드하고 가장 많이 사용되는 단축키를 익힐 수 있다.
* [Install a Keymap extension](https://code.visualstudio.com/docs/getstarted/keybindings#_keymap-extensions) - Keymap extension을 설치해서 Sublime Text, Atom, Vim등의 이전 에디터를 VS Code에서 사용할 수 있다.
* [Customize Keyboard Shortcuts](https://code.visualstudio.com/docs/getstarted/keybindings#_customizing-shortcuts) - 기본 단축키를 바꿀 수 있다.

## Multiple selections (multi-cursor)

VS Code는 동시에 빠르게 편집할 수 있도록 multiple cursor를 지원한다. 원하는 지점을 `Alt+Click`하면 커서를 추가할 수 있다. 각 커서는 위치해 있는 문맥(context)에 따라 독립적으로 움직인다. `Ctrl+Alt+Down`이나 `Ctrl+Alt+Up`로 현재 커서의 아래나 위에 커서를 추가할 수 있다.

> Note: NVIDIA와 같은 graphic card driver가 이 단축키를 덮어쓸 수 있다.

![multi cursor]( /post-img/vscode-docs-editor-codebasics/111096101-251f8f00-8582-11eb-90d6-074e83959269.gif )

`Ctrl+D`는 커서가 있는 단어나 현재 선택 항목의 다음을 선택한다.

![multi cursor word]( /post-img/vscode-docs-editor-codebasics/111096106-281a7f80-8582-11eb-88e7-b0dedfa3727c.gif )

> Tip: `Ctrl+Shift+L`을 이용해서 현재 선택한 텍스트와 동일한 텍스트 전부를 선택 할 수 있다.

### Multi-cursor modifier

`editor.multiCursorModifier` 설정에서 multiple cursor를 적용하기 위한 modifier key를 기존 `Alt+Click`에서 macOS는 `Cmd+Click`, Windows와 Linux는 `Ctrl+Click`로 바꿀 수 있다. 이를 통해 Sublime Text나 Atom 같은 다른 에디터를 사용하던 사용자도 자신에게 익숙한 keyboard modifier를 사용할 수 있다.

설정에서 다음처럼 설정할 수 있다.

* `ctrlCmd` - Windows에서는 `Ctrl`, macOS에서는 `Cmd`로 설정.
* `alt` - 현재 기본값인 `Alt`.

이 설정을 빨리 전환할 수 있도록 **Selection** 메뉴에도 **Use Ctrl+Click for Multi-Cursor** 항목이 있다.

이 설정과 충돌하지 않도록 **Go To Definition**과 **Open Link** 항목도 수정해주어야 한다. 예를 들어, 설정값이 `CtrlCmd`일 경우 multiple cursor은 `Ctrl/Cmd+Click`으로 더할 수 있으니 opening link나 going to definition은 `Alt+Click`로 접근할 수 있다.

### Shrink/expand selection

`Shift+Alt+Left`나 `Shift+Alt+Right`로 선택 영역을 빠르게 축소하거나 확장할 수 있다.

다음은 `Shift+Alt+Right`를 이용해서 선택영역을 확장하는 예시이다:

![expand selection]( /post-img/vscode-docs-editor-codebasics/111096109-29e44300-8582-11eb-9614-e452f53b9786.gif )

## Column (box) selection

커서를 한 구석에 놓고 `Shift+Alt`를 누른채 반대쪽 구석으로 드래그한다:

![column selection]( /post-img/vscode-docs-editor-codebasics/111096111-29e44300-8582-11eb-9b88-2f8b0be68574.gif )

> Note: Multi-cursor modifier로 `Ctrl/Cmd`를 사용하면 `Shift+Alt`대신 `Shift+Ctrl/Cmd`를 사용해야한다.

macOS와 Windows에서는 다음과 같은 기본 키 조합으로도 column selection을 할 수 있다. (Linux는 불가)

| Key                       | Command                 | Command ID                   |
| ------------------------- | ----------------------- | ---------------------------- |
| `Ctrl+Shift+Alt+Down`     | Column Select Down      | `cursorColumnSelectDown`     |
| `Ctrl+Shift+Alt+Up`       | Column Select Up        | `cursorColumnSelectUp`       |
| `Ctrl+Shift+Alt+Left`     | Column Select Left      | `cursorColumnSelectLeft`     |
| `Ctrl+Shift+Alt+Right`    | Column Select Right     | `cursorColumnSelectRight`    |
| `Ctrl+Shift+Alt+PageDown` | Column Select Page Down | `cursorColumnSelectPageDown` |
| `Ctrl+Shift+Alt+PageUp`   | Column Select Page Up   | `cursorColumnSelectPageUp`   |

필요한 경우 `keybindings.json` 파일을 수정해서 더 편한 키로 설정할 수 있다.

## Save / Auto Save

기본적으로, 변경사항을 disk에 저장하고 싶다면 `Ctrl+S`를 누르면 된다.

그 외에도 `Auto Save`를 쉽게 켤 수 있으며 지정된 시간이 지나거나 에디터를 집중적으로 사용하지 않는 경우 변경사항을 저장한다. Auto Save 옵션을 켜면 별도로 파일을 저장하는 행위를 할 필요가 없어진다. `Auto Save`를 켜는 가장 쉬운 방법은 **File** > **Auto Save** 항목(toggle)을 이용하는 것이다. 이것을 눌러서 딜레이 후 저장 여부를 켜거나 끌 수 있다.

`Auto Save`를 보다 자세히 설정하려면 사용자(User) 혹은 작업영역(Workspace) 설정을 열어서 관련된 설정을 찾으면 된다:

* `files.autoSave`: 는 다음과 같은 값을 가질 수 있다:
    * `off` - auto save를 사용하지 않는다.
    * `afterDelay` - 설정된 시간이 지나면 파일을 저장한다. (기본값 1000ms)
    * `onFocusChange` - 에디터에서 작업하고 있는 파일(dirty file)에서 벗어나면 파일을 저장한다.
    * `onWindowChange` - VS Code 창에서 벗어나면 파일을 저장한다.
* `files.autoSaveDelay`: `file.autoSave`가 `afterDelay`로 설정되어있을 때 auto save를 수행할 시간 간격 (delay)을 milliseconds 단위로 설정한다. 기본값은 1000ms

## Hot Exit

일반적으로 VS Code를 종료(exit)하면 저장되지 않은 변경사항은 보존(remember)된다. Hot exit은 어플리케이션이 **File** > **Exit** (macOS의 경우 **Code** > **Quit**) 을 통해 종료되거나 마지막 창을 닫을 때 실행된다.

`files.hotExit`에서 hot exit을 설정할 수 있다:

* `off`: Hot exit을 사용하지 않는다.
* `onExit`: 어플리케이션이 종료되면 hot exit이 실행된다. 이는 Windows/Linux 에서 마지막 창이 닫히거나 **Command Palette**에서 `workbench.action.quit` 명령이 실행될 때이다. 모든 창과 backup이 다음 실행시 그대로 복원된다.
* `onExitAndWindowClose`: Hot exit이 어플리케이션을 종료할 때 뿐만 아니라 마지막 창이 아니더라도 폴더가 열려있는 창이라면 적용된다. 폴더창을 종료하기 이전과 같이 복원하고 싶으면 `window.restoreWindows`를 `all`로 설정하면 된다.

Hot exit에 오류가 발생하면 모든 백업이 standard install location인 다음 폴더에 저장된다:

* **Windows** `%APPDATA%\Code\Backups`
* **macOS** `$HOME/Library/Application Support/Code/Backups`
* **Linux** `$HOME/.config/Code/Backups`

## Find and Replace

VS Code에서는 현재 문서에서 빠르게 텍스트를 찾고 바꿀 수 있다. `Ctrl+F`를 눌러 Find Widget을 에디터에 열고 단어를 검색하면 검색한 결과가 에디터, overview ruler, 미니맵에 강조되어 표시된다.

Find input box 왼쪽의 arrow를 누르면 Replace input box가 열리면서 replace mode로 바꿀 수 있다.

현재 문서에서 일치하는 결과가 한 개 이상일 경우 Find Widget의 input box에 머무른 상태에서  `Enter`와 `Shift+Enter`를 눌러서 각각 다음, 이전 결과로 이동할 수 있다.

### Seed Search String From Selection

Find Widget이 열려있으면 에디터에서 선택된 텍스트를 input box로 가져간다. 빈 공간이 선택 될 경우 커서 아래에 있는 단어를 input box로 가져간다.

![seed search]( /post-img/vscode-docs-editor-codebasics/111096114-2a7cd980-8582-11eb-9573-493708c9640c.gif )

이 기능은 `editor.find.seedSearchStringFromSelection` 설정값을 `False`로 바꿔서 끌 수 있다.

### Find In Selection

기본적으로 찾기 기능은 에디터의 전체 파일을 대상으로 실행되지만 선택한 영역에 한해 실행할 수도 있다. 이 기능은 Find Widget의 hamburger icon을 눌러서 켤 수 있다.

![find in selection]( /post-img/vscode-docs-editor-codebasics/111096115-2b157000-8582-11eb-9bc9-fb489893bc9d.gif )

이 기능을 기본값으로 하고 싶으면 `edit.find.autoFindInSelection`을 `true`로 바꿔주면 된다.

### Advanced find and replace options

Find Widget에는 일반 텍스트를 찾고 바꾸는 것 외에도 세 개의 고급 검색 옵션이 있다:

* Match Case
* Match Whole Word
* Regular Expression
Replace input box는 case preserving* 기능을 지원하며 Preserve Case (**AB**) 버튼을 눌러 켤 수 있다.

>e.g. `text`를 `word`로 바꿀 때:
>
>||변경전|변경후|
>|---|:---:|:---:|
>|case preserving `on`|`text` and `Text`|`word` and `Word`|
>|case preserving `off`|`text` and `Text`|`word` and `word`|

### Multiline support and Find Widget resizing

Find input box나 Replace input box에서 텍스트를 붙여넣기 해서 여러 줄의 텍스트를 검색할 수 있다. `Ctrl+Enter`를 누르면 input box에서 다음 줄로 넘어갈 수 있다.

![multi line search]( /post-img/vscode-docs-editor-codebasics/111096118-2bae0680-8582-11eb-97fb-e41b73781174.gif )

길이가 긴 텍스트를 검색할 때는 Find Widget이 너무 작을 수 있다. 왼쪽의 sash를 드래그해서 Find Widget을 키우거나 더블클릭해 최대 크기로 키우고 다시 기본 사이즈로 돌아올 수 있다.

![resize find widget]( /post-img/vscode-docs-editor-codebasics/111096120-2bae0680-8582-11eb-8f6b-cdce4bd55deb.gif )

## Search across file
