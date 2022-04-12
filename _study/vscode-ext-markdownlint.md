---
layout  : article
title   : markdownlint
summary : 
date    : 2021-03-22 14:02:21 +0900
updated : 2021-03-22 23:07:47 +0900
tag     : markdown lint
toc     : true
public  : true
parent  : [[vscode-ext]]
latex   : false
---
* TOC
{:toc}

> 이 글은 Visual Studio Market Place의 [markdownlint](https://marketplace.visualstudio.com/items?itemName=DavidAnson.vscode-markdownlint) 확장프로그램의 소개 페이지를 읽으면서 개인적으로 번역한 글입니다.
>
> 번역 이후에 문서 내용이 변할 수 도 있고 잘못되거나 개인적으로 덧붙인 해석이 있을 수 있기 때문에 되도록 원문을 확인해주시길 바랍니다.
> 잘못된 부분이 있다면 댓글이나 그 외 편하신 방법으로 알려주시면 감사하겠습니다.
>
> version 0.39.0 기준 작성

VS Code를 위한 마크다운 린트, 스타일 체크 도구.

## Intro

마크다운 마크업 언어는 쉽게 읽고, 쓰고, 이해하기 위해서 디자인되었다. 마크다운은 이 목적을 달성했지만 이런 마크다운의 유연성은 장점이자 단점이되었다. 여러 스타일을 사용할 수 있지만 그렇기 때문에 형식이 일관되지 않을 수 있다. 일부 구조체는 파서(parser)가 제대로 동작하지 않을 수 있어 사용을 피해야 한다. 예를 들어 [이 링크는 일반적으로 마크다운에서 문제가 되는 구조체를 보여준다.](https://gist.github.com/DavidAnson/006a6c2a2d9d7b21b025)

markdownlint는 마크다운 파일의 표준과 일관성을 유지하기(encourage) 위한 VS Code 확장 프로그램이다. [markdownlint for Ruby](https://github.com/markdownlint/markdownlint)를 기반으로 하는 [markdownlint for Node.js](https://github.com/DavidAnson/markdownlint)에서 제공한다.

## Install

1. VS Code를 연다.
2. `Ctrl+P`를 눌러 Quick Open dialog를 연다.
3. 확장 프로그램을 찾기 위해 `ext install markdownlinto`를 입력한다.
4. `Install` 버튼을 누른 뒤 `Enable` 버튼을 누른다.

OR

1. `Ctrl+Shift+X`를 눌러 확장프로그램 탭을 연다.
2. `markdownlint`를 입력해 확장프로그램을 찾는다.
3. `Install` 버튼을 누른 뒤 `Enable` 버튼을 누른다.

OR

1. 커맨드 라인 프롬프트를 연다.
2. `code --install-extension DavidAnson.vscode-markdownlink`를 실행한다.

## Use

markdownlint가 설치된 Code에서 마크다운 파일을 수정하면 markdownlint의 규칙을 어긴 행에 *경고*가 표시된다.

* 경고는 초록색 물결 밑줄로 표시(indicate)되고 `Ctrl+Shift+M`을 눌러 에러와 경고가 적힌 대화창을 열 수도 있다.
* 초록색 줄에 마우스를 올려 경고를 보고, `F8`이나 `Shift+F8`을 눌러 모든 경고를 돌 수도 있다.
* 경고에 대한 더 자세한 정보를 알고 싶으면 커서를 줄에 대고 전구 아이콘을 클릭하거나 `Ctrl+.`를 눌러 코드 작업 대화창(code action dialog)를 연다. 대화창의 경고를 클릭하면 해당 규칙의 도움말이 웹 브라우저 창에 표시된다.

> 연습을 위해서는 Dave Johnson의 [Build an Amazing Markdown Editor Using Visual Studio Code and Pandoc](https://thisdavej.com/build-an-amazing-markdown-editor-using-visual-studio-code-and-pandoc/)을 참고하자.

## Rules

#### `MD001` heading-increment/header-increment

* 헤딩(heading)의 단계는 한 번에 한 개씩만 증가해야 한다.

#### ~~`MD002` first-heading-h1/first-header-h1 - First heading should be a top level heading~~

#### `MD003` heading-style/header-style - Heading style

* 동일한 문서 안에서 사용된 헤딩 스타일은 일관되어야 한다.
* Aliases: `heading-style`, `header-style`
* Parameters: `style` (`"consistent"`, `"atx"`, `"atx_closed"`, `"setext"`, `"setext_with_atx"`, `"setext_with_atx_closed"`; default `"consistent"`)

#### `MD004` - Unordered list style

* 동일한 문서 안에서 사용된 순서가 없는 목록(unordered list) 기호 스타일은 일관되어야 한다.
* Aliases: `ul-style`
* Parameter: `style` (`"consistent"`, `"asterisk"`, `"plus"`, `"dash"`, `"sublist"`; default `"consistent"`)

#### `MD005` - Inconsistent indentation for list items at the same level

* 동일한 단계의 목록 아이템은 들여쓰기(indentation)가 동일하게 되어 있어야 한다.
* Aliases: `list-indent`

#### ~~`MD006` ul-start-left - Consider starting bulleted lists at the beginning of the line~~

#### `MD007` - Unordered list indentation

* 목록 아이템은 설정값(기본값: 2)만큼 들여쓰기해야 한다.
* Aliases: `ul-indent`
* Parameters: `indent`, `start_indented` (`number`; default `2`, `boolean`; default `false`)

#### `MD009` - Trailing spaces

* 작성하고 있는 줄 마지막에 예상치 못한 공백(whitespace)이 없어야 한다.
* Aliases: `no-trailing-spaces`
* Parameters: `br_spaces`, `list_item_empty_lines`, `strict` (`number`; default `2`, `boolean`; default `false`, `boolean`; `default false`)

#### `MD010` - Hard tabs

* 들여쓰기에 하드 탭(hard tab)이 아닌 스페이스를 사용해야 한다.
* Aliases: `no-hard-tabs`
* Parameters: `code_blocks` (`boolean`; default `true`)

#### `MD011` - Reversed link syntax

* 링크를 생성할 때 `[]`와 `()`를 반대로 사용하면 안 된다.
* Aliases: `no-reversed-links`

#### `MD012` - Multiple consecutive blank lines

* 문서 안에 연속된 여러 개의 빈 줄이 있으면 안 된다.
* Aliases: `no-multiple-blanks`
* Parameters: `maximum` (number; default `1`)

#### `MD013` - Line length

* 설정된 `line_length`보다(기본값: 80자) 긴 문장이 없어야 한다.
* Aliases: `line-length`
* Parameters: `line_length`, `heading_line_length`, `code_block_line_length`, `code_blocks`, `tables`, `headings`, `headers`, `strict`, `stern` (`number`; default `80` for `*_length`, `boolean`; default `true` (except strict/stern which default false))

#### `MD014` - Dollar signs used before commands without showing output

* 쉘 명령어를 작성한 코드 블록이 있을 때 필요한 경우에만 달러 기호(`$`)를 사용해야 한다.
* Aliases: `commands-show-output`

#### `MD018` - No space after hash on atx style heading

* atx 스타일로 헤딩을 작성할 때 해시(hash) 문자 다음에 공백이 있어야 한다.
* Aliases: no-missing-space-atx

#### `MD019` - Multiple spaces after hash on atx style heading

* atx 스타일로 헤딩을 작성할 때 해시(hash) 문자 한 개보다 많은 공백이 있으면 안 된다.
* Aliases: `no-multiple-space-atx`

#### `MD020` - No space inside hashes on closed atx style heading

* closed atx 스타일로 헤딩을 작성할 때 해시(hash) 문자 안쪽에 공백이 있어야 한다.
* Aliases: `no-missing-space-closed-atx`

#### `MD021` - Multiple spaces inside hashes on closed atx style heading

* closed atx 스타일로 헤딩을 작성할 때 해시(hash) 문자 안쪽에 한 개보다 많은 공백이 있으면 안 된다.
* Aliases: `no-multiple-space-closed-atx`

#### `MD022` - Headings should be surrounded by blank lines

* 헤딩은 전후 최소한 한 개의 빈 줄로 둘러싸여 있어야 한다.
* Aliases: `blanks-around-headings`, `blanks-around-headers`
* Parameters: `lines_above`, `lines_below` `(number`; default `1`)

#### `MD023` - Headings must start at the beginning of the line

* 헤딩은 그 줄의 시작 부분에 작성해야 한다. 즉, 들여쓰기하면 안 된다.
* Aliases: `heading-start-left`, `header-start-left`

#### `MD024` - Multiple headings with the same content

* 한 문서에 같은 텍스트(내용)를 갖는 헤딩이 있으면 안 된다.
* Aliases: `no-duplicate-heading`, `no-duplicate-header`
* Parameters: `siblings_only`, `allow_different_nesting` (`boolean`; default `false`)

#### `MD025` - Multiple top level headings in the same document

* Top-level (i.e., h1) 헤딩은 한 번만 사용해야 한다.
* Aliases: `single-title`, `single-h1`
* Parameters: `level`, `front_matter_title` (`number`; default `1`, `string`; default `"^\s*"?title"?\s*[:=]"`)

#### `MD026` - Trailing punctuation in heading

* 헤딩은 full-width 문장 부호를 그 줄의 마지막 문자로 사용하면 안 된다.
* Aliases: `no-trailing-punctuation`
* Parameters: `punctuation` (`string`; default `".,;:!。，；：！"`)

#### `MD027` - Multiple spaces after blockquote symbol

* 블록 인용구의 `>` 기호 다음에 한 개보다 많은 공백이 있으면 안 된다.
* Aliases: `no-multiple-space-blockquote`

#### `MD028` - Blank line inside blockquote

* 두 개의 블록 인용구가 아무것도 적히지 않은 빈 줄로 나뉘어 있으면 안 된다.
* Aliases: `no-blanks-blockquote`

#### `MD029` - Ordered list item prefix

* 순서가 있는 목록의 prefix는 '1.'로 시작하거나 순차적으로 증가하는 숫자로 이루어져야 한다. 다른 스타일로 변경할 수 있다.
* Aliases: `ol-prefix`
* Parameters: `style` (`"one"`, `"ordered",` `"one_or_ordered",` `"zero"`; default `"one_or_ordered"`)

#### `MD030` - Spaces after list markers

* 목록의 마커와 텍스트 사이의 공백의 수를 결정한다.
* Aliases: `list-marker-space`
* Parameters: `ul_single`, `ol_single`, `ul_multi`, `ol_mult`i (number; default `1`)

#### `MD031` - Fenced code blocks should be surrounded by blank lines

* 펜스 코드 블록(Fenced code blocks)은 빈 줄로 둘러싸여 있어야 한다.
* Aliases: `blanks-around-fences`
* Parameters: `list_items` (`boolean`; default `true`)

#### `MD032` - Lists should be surrounded by blank lines

* 목록은 빈 줄로 둘러싸여 있어야 한다.
* Aliases: `blanks-around-lists`

#### `MD033` - Inline HTML

* 문서에서 raw HTML을 사용하면 안 된다.
    * 특정 HTML 요소를 사용하고 싶다면 '`allowed_elements`' 파라미터를 사용해 추가한다.
* Aliases: `no-inline-htm`l
* Parameters: `allowed_element`s (`array of string`; default `empty`)

#### `MD034` - Bare URL used

* URL은 angle bracket으로 싸여있어야 한다.
* Aliases: `no-bare-urls`

#### `MD035` - Horizontal rule style

* 동일한 문서 안에서 사용된 수평선 스타일은 일관되어야 한다.
* Aliases: `hr-style`
* Parameters: `style` (`"consistent"`, `"---"`, `"***"`, or other string specifying the horizontal rule; default `"consistent"`)

#### `MD036` - Emphasis used instead of a heading

* 강조된 (i.e. 두껍게 혹은 기울임) 텍스트가 구역을 나누고 있어 헤딩으로 대체할 수 있는지 체크한다.
* Aliases: `no-emphasis-as-heading`, `no-emphasis-as-header`
* Parameters: `punctuation` (`string`; default `".,;:!?。，；：！？"`)

#### `MD037` - Spaces inside emphasis markers

* 강조(i.e. 두껍게, 기울임)를 위한 기호와 텍스트 사이에는 공백이 없어야 한다.
* Aliases: `no-space-in-emphasis`

#### `MD038` - Spaces inside code span elements

* Backtick으로 감싸진 코드에서 backtick에 인접한 공백이 있으면 안 된다.
* Aliases: `no-space-in-code`

#### `MD039` - Spaces inside link text

* 링크 텍스트를 앞뒤로 공백이 없어야 한다.
* Aliases: `no-space-in-links`

#### `MD040` - Fenced code blocks should have a language specified

* 펜스 코드 블록의 언어는 반드시 특정되어야 한다.
* Aliases: fenced-code-language

#### `MD041` - First line in file should be a top level heading

* 문서의 첫 번째 줄은 top-level (i.e. h1) 헤딩이어야 한다. 해당 문서가 제목을 갖도록 보장하기 위함이다.
* Aliases: `first-line-heading`, `first-line-h1`
* Parameters: `level`, `front_matter_title` (`number`; default `1`, `string`; default `"^\s*"?title"?\s*[:=]"`)

#### `MD042` - No empty links

* 주소가 없는 링크는 없어야 한다.
* Aliases: `no-empty-links`

#### `MD043` - Required heading structure

* 파일의 헤딩이 규칙에 정해진 헤딩의 배열과 같아야 한다. 특정 헤딩 구조를 강제하기 위해 사용된다.
* Aliases: ``required-headings`,` required-headers
* Parameters: `headings`, `headers` (`array of string`; default `null` for `disabled`)

#### `MD044` - Proper names should have the correct capitalization

* `names` 배열에 지정한 문자열은 지정한 값과 동일한 대소문자 구조를 가져야 한다. 특정 프로젝트나 프로덕트의 이름의 대소문자를 강제하기 위해 사용된다.
* Aliases: `proper-names`
* Parameters: `names`, `code_blocks` (`array of string`; default `null`, `boolean`; default `true`)

#### `MD045` - Images should have alternate text (alt text)

* 이미지는 대체 텍스트(alternate text)를 가져야 한다.
* Aliases: `no-alt-text`

#### `MD046` - Code block style

* 동일한 문서 안에서 사용된 코드 블록 스타일은 일관되어야 한다.
* Aliases: `code-block-style`
* Parameters: `style` (`"consistent"`, `"fenced"`, `"indented"`; default `"consistent"`)

#### `MD047` - Files should end with a single newline character

* 문서 마지막에는 하나의 개행 문자가 있어야 한다.
* Aliases: `single-trailing-newline`

#### `MD048` - Code fence style

* 동일한 문서 안에서 사용된 펜스 코드 블록 스타일은 일관되어야 한다.
* Aliases: `code-fence-style`
* Parameters: `style` (`"consistent"`, `"tilde"`, `"backtick"`; default `"consistent"`)

자세한 사항을 확인하려면 [markdownlint's Rules.md](https://github.com/DavidAnson/markdownlint/blob/main/doc/Rules.md) 파일을 참고하자.

아래의 규칙은 규칙을 위반한 내용이 있는 곳에 커서를 가져간 뒤 `Ctrl+.`을 누르거나 전구 아이콘을 클릭하면 자동으로 수정된다.

* MD004 ul-style
* MD005 list-indent
* MD006 ul-start-left
* MD007 ul-indent
* MD009 no-trailing-spaces
* MD010 no-hard-tabs
* MD011 no-reversed-links
* MD012 no-multiple-blanks
* MD014 commands-show-output
* MD018 no-missing-space-atx
* MD019 no-multiple-space-atx
* MD020 no-missing-space-closed-atx
* MD021 no-multiple-space-closed-atx
* MD022 blanks-around-headings
* MD023 heading-start-left
* MD026 no-trailing-punctuation
* MD027 no-multiple-space-blockquote
* MD030 list-marker-space
* MD031 blanks-around-fences
* MD032 blanks-around-lists
* MD034 no-bare-urls
* MD037 no-space-in-emphasis
* MD038 no-space-in-code
* MD039 no-space-in-links
* MD044 proper-names
* MD047 single-trailing-newline

현재 문서에서 위 규칙을 위반한 내용 전체를 `markdownlint.fixAll`을 실행하거나 Command Palette(`View|Command Palette...` 혹은 `Ctrl+Shift+P`를 누른 뒤 "markdownlint"를 검색)에서 고칠 수 있다. 또는 [키보드 단축키를 바인딩한다.](https://code.visualstudio.com/docs/getstarted/keybindings)

규칙을 위반한 내용을 마크다운 문서를 저장할 때 자동으로 수정하려면 다음과 같이 [VS Code의 `editor.codeActionsOnSave`를 설정한다:](https://code.visualstudio.com/docs/getstarted/settings)

```json
"editor.codeActionsOnSave": {
    "source.fixAll.markdownlint": true
}
```

자동으로 적용된 수정사항은 `Edit|Undo`나 `Ctrl+Z`로 되돌릴 수 있다.

일시적으로(temporarily) 마크다운 문서의 린트를 비활성화시키려면 `markdownlint.toggleLinting` 명령을 실행한다. 린트를 재활성화하려면 다시 `markdownlint.toggleLinting`을 실행한다.

> Note: `markdownlint.toggleLinting` 명령의 효과는 새로운 작업공간이 열리면 초기화된다. 기본값으로는 린트가 활성화된다.

## Configure

### markdownlint.config

많은 파일이 통상적인 80글자 제한보다 긴 줄로 이루어져 있기 때문에 기본 규칙 설정으로 `MD013`/`line-length`를 비활성화하는 것을 권장한다.

```markdown
{
    "MD013": false
}
```

규칙은 프로젝트 폴더 어디든 다음과 같은 파일을 만들어 활성화, 비활성화하거나 사용자 정의 값을 가질 수 있다.

* JSON file: `.markdownlint.jsonc` / `.markdownlint.json` / `.markdownlintrc`
* YAML file: `.markdownlint.yaml` / `.markdownlint.yml`

`.markdownlint{.jsonc,.json,.yaml,.yml,rc}`에 정의된 규칙은 각 폴더에 `.markdownlint{.jsonc,.json,.yaml,.yml,rc}` 파일이 없어도 동일하거나 하위 폴더의 마크다운 파일에도 적용된다.

> Note: `.markdownlint{.jsonc,.json,.yaml,.yml,rc}` 파일은 프로젝트가 열려있을 때만 사용된다. 폴더가 열려있지 않거나 파일이 현재 프로젝트의 일부가 아니면 일반 사용자 또는 작업공간 설정이 적용된다. 이 파일 중 여러 개가 동일한 폴더안에 있다면 `.markdownlint.jsonc`, `. markdownlint.json`, `.markdownlint.yaml`, `.markdownlint.yml`, `.markdownlintrc` 순서로 사용된다.

사용자 정의 설정은 주로 프로젝트 루트폴더의 `.markdownlint.json`에 정의한다:

```json
{
    "default": true,
    "MD003": { "style": "atx_closed" },
    "MD007": { "indent": 4 },
    "no-hard-tabs": false
}
```

어떤 설정 파일이든 `extends` 속성의 값으로 상대 경로를 입력해 다른 설정 파일을 확장할 수 있다:

```json
{
    "extends": "../.markdownlint.json",
    "no-hard-tabs": true
}
```

`extends`를 통해 참조된 파일이 반드시 현재 프로젝트 안에 있을 필요는 없다.

규칙을 VS Code의 [사용자, 작업공간 설정](https://code.visualstudio.com/docs/getstarted/settings)을 이용해 설정할 수도 있다.

앞서 예시로 작성한 설정은 VS Code의 사용자 설정에서는 다음과 같이 작성한다:

```json
{
    "editor.someSetting": true, // 이전에 설정한 다른 설정값
    "markdownlint.config": {
        "default": true,
        "MD003": { "style": "atx_closed" },
        "MD007": { "indent": 4 },
        "no-hard-tabs": false
    }
}
```

사용자 설정에서 `extends`로 참조된 파일 경로는 사용자의 홈 디렉토리(ex: window의 `%USERROFILE%` macOS/Linux의 `$HOME`)에 대한 상대경로로 해석된다. 작업공간 설정에서 `extends`로 참조된 파일은 작업공간 폴더에 대한 상대경로로 해석된다.

설정파일의 위치에 따른 우선순위는 다음과 같다 (내림차순):

* 동일한 디렉토리 안의 `.markdownlint{.jsonc,.json,.yaml,.yml,rc}` 파일
* 부모 디렉토리 안의 `.markdownlint{.jsonc,.json,.yaml,.yml,rc}` 파일
* 프로젝트 루트 안의 `.markdownlint{.jsonc,.json,.yaml,.yml,rc}`
* VS Code의 사용자/작업공간 설정
* 설정 기본값

설정 파일이 한 번 발견되면 그보다 낮은 우선순위를 갖는 위치의 파일들은 무시된다. 모든 위치에서 저장된 변경사항은 즉시 적용된다. `extends`로 참조하고 있는 파일들의 변경사항은 모니터하지 않는다. 마지막 두 위치만 프로젝트 밖의 파일에 적용된다.

규칙 설정과 관련된 더 자세한 정보를 알고 싶다면 [markdownlint's options.config section](https://github.com/DavidAnson/markdownlint#optionsconfig)을 보자. 예시로 [`.markdownlint.jsonc`](https://github.com/DavidAnson/markdownlint/blob/main/schema/.markdownlint.jsonc)나 [`.markdownlint.yaml`](https://github.com/DavidAnson/markdownlint/blob/main/schema/.markdownlint.yaml)를 보면 모든 설정 속성이 기본값으로 지정되어있다.

작업공간이 활성화되어있을 때 `markdownlint.openConfigFile` 명령을 실행하면 작업공간 루트의 `.markdownlint{.jsonc,.json,.yaml,.yml,rc}` 설정 파일을 편집하는 에디터가 열린다. 이 파일 중 어떤 것도 존재하지 않으면 `.markdownlint.json`이 "pending save" 상태로 생성되어 에디터에서 열린다.

### markdownlint.ignore

### markdownlint.run

### markdownlint.customRules

### markdownlint.customRulesAlwaysAllow

## Suppress

개별 경고를 인라인 주석을 이용해 없앨(suppress) 수 있다.

```html
<!-- markdownlint-disable MD037 -->
deliberate space * in * emphasis
<!-- markdownlint-enable MD037 -->
```

아래의 스니펫을 추가로(to help) 이용하는 것이 가능하다 (IntelliSense 추천을 받으려면 `Ctrl+Space`를 누르면 된다):

* markdownlint-disable
* markdownlint-enable
* markdownlint-disable-next-line
* markdownlint-capture
* markdownlint-restore
* markdownlint-disable-file
* markdownlint-enable-file
* markdownlint-configure-file

구체적인 정보를 위해서는 [markdownlint's configuration section](https://github.com/DavidAnson/markdownlint#configuration)를 참고하자.
