---
layout  : article
title   : "생활코딩: Git2 CLI 버전관리"
summary : 
date    : 2020-06-24 10:15:18 +0900
updated : 2020-12-03 21:02:31 +0900
tag     : git draft
toc     : true
public  : true
parent  : [[/git/opent-git-cli]]
latex   : false
---
* TOC
{:toc}

> 이 글은 생활코딩의 [Git CLI - 버전관리](https://opentutorials.org/course/3839) 강의내용을 복습하기 위해 작성한 글입니다.
>
> * 제가 필요한 부분 위주로 확인하면서 정리하고 있어 글에 덜 작성된 부분이 있을 수 있습니다.
> * 글 작성 후 원 강의의 내용이 수정되거나 내용을 이해하기 위한 개인적인 설명이나 해석이 있을 수 있습니다. 되도록 원 강의를 참고해주시길 바랍니다.
> * 잘못된 부분이 있다면 댓글이나 그 외 편하신 방법으로 알려주시면 감사하겠습니다.

* CLI: Command Line Interface
* Original Git: 다른 여러 git 프로그램의 기반.
* 명령어를 통해 자동화가 가능하고 GUI를 제어할 수 없는 서버환경에서도 사용 가능하다.

## 1. 설치

홈페이지에서 설치

## 2. 버전 관리의 시작

```zsh
git init [프로젝트 directory이름]
```

* e.g., `git init .`: 현재폴더에서 git을 시작

* 프로젝트 directory에 `.git` directory가 생기고 여기에 버전 관련 데이터를 저장한다.

## 3. 버전의 생성

### Git system의 구조

|Working tree||Staging Area||Repository|
|:---:|:---:|:---:|:---:|:---:|
|버전으로 만들어지지 않은 작업물||버전을 만드려는 파일||버전이 저장되는 곳 (git)|

### 파일을 생성한 뒤 저장

```zsh
git status
```

* Git(working tree)의 상태를 출력

* 처음 `git status`를 하면 untracked file이 감지된다. 파일은 최초로 한 번 commit 해줘야 추적을 시작한다.

```zsh
git add [파일이름]
```

* 파일을 commit하기 위해 Staging area에 올린다.

* `git status`를 입력해서 변경사항을 확인한다. Changes to be commited 내역이 출력.

```zsh
git commit
```

* 현재 Staging area에 있는 파일로 버전을 생성한다.

* Message를 입력할 수 있는 창이 뜨면 변경 내용을 요약해서 message를 입력한다.
* `-m` option을 이용하면 별도의 에디터 창을 띄우지 않고 message를 입력할 수 있다.
    * e.g., `git commit -m "Message 1"`: Commit message를 "Message 1"으로 해서 commit.

```
git log
```

* 지금까지 버전의 history를 열람한다.

* `q`로 빠져나온다.

### 여러파일을 하나의 버전으로 만들기

하나의 프로젝트에서 여러개의 파일을 관리하는 경우

```zsh
git add [파일이름 1]
git add [파일이름 2]

git commit
```

* 추가하려는 모든 파일을 `git add`를 이용해 순차적으로 모두 Staging area로 올린 후

* 한번에 commit한다.

* `git log`에서 파일별 tracking을 보고 싶으면 `--state`등의 option을 이용한다.

## 4. 버전간의 차이점 비교

버전과 버전 사이의 차이점을 비교하면 의사결정을 보다 쉽게 할 수 있다.

* `git diff`: 버전이 이전에서 어떻게 변했는지 표시해서 보여준다.
* `git log -p`: 각 버전의 변경 사항을 보여준다.

## 5. Checkout과 시간여행

버전관리: 의미있는 변경점을 기록하고 '이동'할 수 있는 기능

* 각 버전마다 고유한 'commit id'를 갖는다.
* 현재 `Master`를 가리키고 있는 `HEAD`를 특정 시점의 commit으로 이동시켜 그 시점으로 이동한다.

```zsh
git checkout [원하는 시점의 commit id]
```

* commit id가 가리키는 commit으로 이동한다.

* `git log`로 확인해보면 `HEAD`가 입력한 commit 옆에 위치해있고 파일을 열어서 해당 시점의 버전인 것을 확인할 수 있다.
* `git checkout Master`로 다시 `Master`로 이동할 수 있다.
    * 현재 강의에서 Master는 가장 최신 상태를 의미

## 6. 보충수업

* `git add [Directory이름]`을 입력하면 directory 아래의 모든 파일을 add한다.
* `git commit`에 `-a` 옵션을 이용하면 해당 파일을 add한 뒤 commit한다.
    * e.g., `git commit -am "Message 1"`: Message 1을 commit message로 입력하면서 add & commi만
    * untracked 상태인 파일은 add하지 않는다.
* Commit할 때 사용할 editor를 바꾸고 싶으면 `git config`에서 설정한다. 자세한 사항은 검색해서 알아보기.

## 7. 버전 삭제: git reset

```
git reset [commit id]
```

* 입력한 commit id로 돌아간다.

* `--hard`옵션을 이용하면 이동하기 전의 버전과 '수정된 파일'까지 삭제한다.

## 8. 버전 되돌리기: git revert

Version 1, 2, 3, 4가 있을 때, Version 4에서 3으로 이동하기 위해서는:

* `git reset [version 3의 commit id]`를 입력
    * reset 후 log를 보면 version 4의 log가 삭제 되어있다.
* `git revert [version 4의 commit id]`를 입력
    * 입력하면 text editor가 열리고 revert 되는 버전이 쓰여있고 추가적으로 이유 등을 적어줄 수 있다.
    * revert 후 log를 보면 version 4의 log 다음에 버전을 되돌린 새로운 log가 생성되어있다.
    * version 3과 다른 새로운 commit id를 갖는다.
    * 상태가 version 3와 같은 새로운 commit을 생성한 것으로 볼 수 있을 것 같다.

* `git revert`는 이전 version의 변화를 취소하는 것에 가깝기 때문에 한 version씩 순차적으로 돌아가야한다.
    * 건더뛰면 충돌(conflict)이 발생.

## 9. 수업을 마치며

추가적으로 알아볼 수 있는 것들.

버전관리의 핵심은 비교 →

* diff tool: 차이점을 비교하는 여러 도구들. git외에도 다양한 도구들이 존재하며 의사결정에 도움을 준다.

그 외 git의 기능들

* `.git ignore`: 버전관리에 포함하지 않을 파일들을 넣어두는 곳
* `branch`: 저장소를 여러 상태로 공존하게 해주는 도구
* `tag`: 기억하기 어려운 commit id 대신 붙이는 이름
* `back up`: git 자체의 backup 장치.
