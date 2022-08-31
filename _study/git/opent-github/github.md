---
layout  : article
title   : 생활코딩_Github
summary : 
date    : 2020-06-24 14:51:38 +0900
updated : 2020-12-03 21:23:11 +0900
tag     : git draft
toc     : true
public  : true
parent  : [[/git/opent-github]]
latex   : false
---
* TOC
{:toc}

> 이 글은 생활코딩의 [github](https://opentutorials.org/module/4636) 강의내용을 복습하기 위해 작성한 글입니다.
>
> * 제가 필요한 부분 위주로 확인하면서 정리하고 있어 글에 덜 작성된 부분이 있을 수 있습니다.
> * 글 작성 후 원 강의의 내용이 수정되거나 내용을 이해하기 위한 개인적인 설명이나 해석이 있을 수 있습니다. 되도록 원 강의를 참고해주시길 바랍니다.
> * 잘못된 부분이 있다면 댓글이나 그 외 편하신 방법으로 알려주시면 감사하겠습니다.

### Git의 이해 (vs. dropbox)

|Dropbox||Git||
|:---:|:---:|:---:|:---:|
| Dropbox server <br> `dropbox.com` | 파일에 어디서든 접근 가능하도록 <br> 올린 파일을 저장 | Git server <br> e.g., `github.com`| 버전정보, `.git`파일 등을 저장하는 곳. <br> Git의 원격저장소 |
| Dropbox client | 사용자가 파일을 업/다운로드 하기위해 <br> 실행시키는 프로그램 | Git Client||

Github은 현재 절대 다수의 개발자가 이용하고 있기 때문에 우선적으로 배울만한 가치가 있다.

## 1. 저장소 생성

가장 먼저 할 일: 프로젝트를 저장할 저장소(repository)를 생성

* Create repository 혹은 프로필 옆의 `+`버튼으로 생성한다.

1. Repository 이름을 설정
2. 종류를 선택: Public or Private
   * Public: opensource 프로젝트, 누구나 열람 가능
   * Private: 자신, 초대한 사람만 열람 가능

다른 repository 살펴보기:

* 검색해서 다른 개발자의 repository를 방문한다.
* 다음과 같은 지표들을 활용해 프로젝트가 활발하고 좋은 프로젝트인지 판단할 수 있다.
    * Commit: 만들어진 버전의 수, 누르면 지금까지의 변경사항(버전)을 조회할 수 있다.
    * Star: 좋아요 수
    * Watch: 구독하고 있는 사람의 수
    * Fork: 다른 사람이 복제해간 횟수
* 해당 프로젝트를 사용하고 싶으면 'clone or download'를 눌러 다운로드 한다.
* 지표 하단의 가장 큰 박스는 이 프로젝트를 이루고 있는 파일들이다.

## 2. 버전 생성과 관리

### 버전 생성

* 파일을 작성(create new file)하거나 수정(edit icon)하면 아래 commit을 위한 섹션이 있다.
* 수정사항을 기록한 뒤 commit changes를 눌러 버전을 셍성한다.

* 파일 업로드(upload files)를 이용하면 작업한 여러 파일들을 한 번에 올리고 수정사항을 기록할 수 있다.
* 이미 존재하는 파일을 수정해서 다시 업로드해 commit하면 이전에서 '바뀐' 부분만 기록한다.

### 버전 관리

* Commit에 들어가면 이전까지 commit한 내용을 볼 수 있다.

* 각 commit을 다시 누르면 자세한 수정 사항이 표시된다.
    * 하단에 댓글을 달거나 문서 line의 왼쪽 `+`버튼을 눌러 그 line에 대한 댓글을 달 수도 있다.

## 3. Git 구경하기

[[opent-git2-cli-version-control]]{이전강의}에서 배운 부분은 자세히 적지 않는다.

1. Git 설치한다.
2. Git과 github 저장소를 연결힌다.
   * 'clone or download' 버튼을 눌러서 clone with ... 아래의 주소를 복사한다.
   * `git clone [저장소 주소] [가져올 directory]`로 Local directory와 github 저장소를 연결한다..
3. Local(내 컴퓨터)에서 수정한 뒤 git으로 commit 한다.
4. `git push`를 이용해서 원격 저장소에 반영한다. (동기화)

## 4. 동료 초대하기

협업의 시작.

* Settings - manage access에서 invite a collaborator를 눌러 초대할 수 있다.
* 초대하려는 사람의 계정이나 메일을 입력하면 초대장이 전송된다.
* 상대방이 초대를 수락하면 완료.

## 5. Issue

Issue는 해당 프로젝트의 문제점에 대해 의논하기 위한 게시판이다.

* New issue 버튼으로 새로운 issue를 작성한다.
    * Assignees: issue를 담당할 담당자를 지정한다.
    * Label: issue의 종류를 분류한다.
* Submit new issue를 이용해 작성한 issue를 등록한다.
* Issue가 해결되면 close issue를 눌러 논의를 종료한다.

## 6. 수업을 마치며

더 공부해볼 내용들

* wiki: 프로젝트와 관련된 지식(e.g., 사용설명서 등)을 관리하는 곳.
* insight: 현재 프로젝트의 현황과 통계를 볼 수 있다.
    * fork: 해당 프로젝트를 복제하는 기능으로 insight의 fork에서는 fork한 사람의 내역을 보여준다.
* pull request: 프로젝트를 다른 사람이 외부에서 수정한 뒤 프로젝트에 반영해달라고 요청한 내역을 볼 수 있다.
* action: push가 됐을 때 입력 탭에 입력한 코드를 실행한다.
* project: 해야할 일, 현재 진행중인 issue등을 정리해서 제공한다.
