---
layout  : article
title   : Posix1 CLI
summary : 
date    : 2020-06-03 14:43:18 +0900
updated : 2020-06-07 16:58:39 +0900
tag     : posix draft
toc     : true
public  : true
parent  : [[/tools/terminal/opent-posix1-cli]]
latex   : false
---
* TOC
{:toc}

> 이 글은 생활코딩의 [POSIX CLI1](https://opentutorials.org/module/3747) 강의내용을 복습하기 위해 작성한 글입니다.
>
> * 제가 필요한 부분 위주로 확인하면서 정리하고 있어 글에 덜 작성된 부분이 있을 수 있습니다.
> * 글 작성 후 원 강의의 내용이 수정되거나 내용을 이해하기 위한 개인적인 설명이나 해석이 있을 수 있습니다. 되도록 원 강의를 참고해주시길 바랍니다.
> * 잘못된 부분이 있다면 댓글이나 그 외 편하신 방법으로 알려주시면 감사하겠습니다.

## Introduction

운영체제(OS)를 제어하는 두 가지 방법:

* GUI(Graphic User Interface)
* CLI(Command Line Interface)

CLI는 '언어'와 비슷한 특성을 갖기 때문에 배우기는 어려워도 자세하고 자동화된 작업을 수행할 수 있으며 컴퓨터의 자원도 적게 소모한다.

**POSIX(Portable Operating System Interface)**

* Unix, Linux, MacOS가 사용하고 있는 Command Line Interface 체계이다.
* Window는 CMD, Powershell이라는 독자적인 방식을 사용한다.

## 1. 명령어 실행 환경 준비

* POSIX 운영체제(Unix, Linux, MacOS)를 사용하는 경우: 그 자체 혹은 Terminal 사용.
* 비 POSIX (Window, iOS, Android)
    * Emulator를 이용하거나
    * POSIX 서버를 구축한 뒤 Secure Shell(SSH)를 이용해서 원격으로 접속한다.

### POSIX

Terminal 실행 후 `pwd`로 현재 위치, `ls`로 현재 위치의 파일을 확인해본다.

### Window

Emulator 설치: 'Cygwin' 혹은 'Git bash'를 추천. 실습에서는 Git bash를 이용한다.

### Android

추후에 필요할 때 수강

## 2. 수업의 목적

컴퓨터의 핵심은 data를 저장하고 이용하는 것 → file과 directory를 관리하는 방법을 배운다.

데이터 처리의 네 가지 원칙: **C**reate **R**ead **U**pdate **D**elete

| CRUD | File | Directory |
| --- | --- | --- |
|Create|`editor`|`mkdir`|
|Read|`editer`, `cat`, `ls`|`ls`|
|Update|`editor`, `mv`|`mv`|
|Delete|`rm`|`rm`|

## 3. 디렉토리의 사용

* `pwd` (print working directory): 내 위치를 파악하기
    * 많은 명령어가 현재 directory를 대상으로하기 때문에 파악하는 것이 중요하다.
    * e.g., `/users/live`
        * 가장 처음의 `/`는 최상위 directory인 root를 의미한다.
    * 기본적으로 terminal을 열었을 때 위치하는 directory를 *home directory*라고 한다.

* `cd` (change directory): 이동
    * `cd /` : Root로 이동
    * `cd /users/live` : /users/live로 이동
    * `cd ~` : home directory로 이동

## 4. 현재 디렉토리의 상태보기와 명령어의 형식

* `ls` (list): 현재 directory의 파일과 directory 이름을 표시 (Read).

* 더 자세한 사용방법을 알고 싶으면 검색하거나 설명서를 참고한다.
    * `명령어 --help` : simple manual을 보여준다. (e.g., `ls --help`)
    * `man 명령어` : 해당 명령어의 manual을 보여준다. (e.g., `man ls`)
    * `q`를 눌러서 실행 화면으로 빠져나올 수 있다.

* `명령어 옵션` 꼴로 명령을 자세하게 실행할 수 있다. 옵션 목록은 manaul 참고
    * e.g., `ls -l` : list in long forman. File, directory 정보를 자세하게 출력한다.

* `touch`: 빈 파일을 생성
    * `touch filename` 꼴로 이용한다. (e.g., `touch helloworld.txt`)
    * 파일명 앞에 `.`을 붙이면 숨김파일처리된다. (e.g., `touch .hidden.txt`)
    * 숨김 파일까지 보고 싶으면 `-a` 옵션을 함께 실행한다.

* 여러 옵션을 동시에 사용하고 싶으면 `ls -a -l`처럼 연속해서 적어주거나 `ls -al`처럼 한번에 적어도 된다.

## 5. 디렉토리의 생로병사

* `mkdir` (make directory): 현재 directory에 새 directory를 생성한다 (Create).
    * e.g., `mkdir posix` : posix directory를 생성한다.

* 새로만든 directory로 이동하려면 `cd directory-이름`를 입력한다.
    * `cd posix`는 `cd ./posix` 와 같으며 `posix` 앞의 `./`이 생략되어있다.
    * `.`는 현재 directory를 의미한다.
    * `./posix`는 `현재-directory/posix`와 같은 의미이다.

* `mv` (move): Directory의 위치나 이름을 변경한다 (Update).
    * e.g., `mv dummy2 dummy`: dummy2 directory를 dummy로 rename.
    * 동일한 directory로 이동하니까 이름을 변경하는 역할을 한다.

* `rm` (remove): Directory를 삭제한다 (Delete).
    * Directory를 제거하려면 그 안에있는 파일까지 전부 제거해야 하기 때문에 `-r` (recursive)옵션으로 실행해줘야한다.
    * e.g., `rm -r dummy` : dummy directory와 그 안의 파일을 전부 삭제

## 6. 절대경로와 상대경로

Root directory로 이동하기 위해서 두 가지 방법을 이용할 수 있다.

* `cd /`로 root directory로 바로 이동
* `cd ..`로 부모 directory를 순차적으로 타고 이동

위의 두 방법은 각각 절대경로와 상대경로를 이용해서 이동 한 것이다.

* 절대경로: 어느 directory에 있든 입력한 경로를 가리치는 것.
* 상대경로: 내 위치에 따라 가리키는 경로가 달라지는 것.
    * `..`와 같은 부모 directory는 현재 directory에 따라 가리키는 dirctory가 달라지므로 상대경로이다.

예를 들어 현재 directory에 있는 `posix` directory로 이동하고 싶을 때

* 절대경로를 이용하면 `cd /users/live/posix`
* 상대경로를 이용하면 `cd ./posix` 를 입력해서 이동할 수 있다.

## 7. 파일 생성과 읽기

파일을 생성하기 위해서는 CLI에서 사용할 수 있는 별도의 text editor가 필요하다.

* Vim, Nano 등이 있으며 강의에서는 Nano를 사용.

* `nano`: 새 파일을 생성.
    * 파일을 생성하면 하단에 다음으로 수행할 수 있는 것들이 표시된다.
    * `^O`: 파일을 저장.
    * `^X`: 편집창 나가기.

* `nano [파일명]`: 해당 파일을 편집창으로 연다.
* `cat [파일명]`: 터미널 자체적으로 파일의 내용을 간단하게 출력.

## 8. 파일 수정과 삭제

* 파일내용을 수정하기 위해서는 `nano [파일명]`으로 파일을 편집창으로 연 뒤, 수정하고 `^O`로 저장.
* 파일 이름이나 위치를 수정하기 위해서는 directory와 똑같이 `mv`를 사용한다.
    * `mv [현재파일명] [바꿀파일명]`, `mv [현재위치] [바꿀위치]`
* 파일 삭제도 directory와 같이 `rm`사용한다.
    * 파일은 `-r` 옵션 없이 바로 파일명 입력해서 삭제.

## 9. GUI vs. CLI

* GUI: 버튼같은 것. 배우고 사용하기 쉽다.
* CLI: 언어같은 것. 배우기는 어렵지만 컴퓨터에게 풍부하고 정확한 의사전달이 가능하다.

CLI를 사용하면 여러가지 작업을 시간의 순서에 따라 진행할 때 훨씬 유용하다

* 작업을 자동화하거나
* 반복되는 작업을 보다 쉽게 해결할 수 있다.

## 10. 순서대로 실행하기

CLI에서 여러 작업을 자동화*하는 방법

* 본질적으로는 프로그래밍을 하는 것과 유사하다.
* \* 다루는 내용 자체는 자동화보다는 여러작업을 한 번에 순차적으로 실행하는 것에 가까운 것 같다.

명령과 명령은 semicolon(;)으로 구분한다.

* 순차적으로 실행하기 위한 기본
* e.g., `mkdir dummy;cd dummy`: dummy 폴더를 만든 뒤 dummy 폴더로 이동.

## 11. 실패하면 멈추기

`;`을 `&&`으로 바꾸면 이전 명령이 정상적으로 수행되어야 다음 명령을 실행한다.

* e.g., `mkdir dummy&&cd dumy&&cd ..`: dummy를 생성해서 dumy로 이동하는게 불가능하므로 `cd ..`는 수행하지 않는다.

## 12. 수업을 마치며

추가적으로 공부해볼만한 주제들

* 여러 명령을 따로 적어놨다 한 번에 실행 (프로그램 자동화)
    * Shell Script
* 내가만든 package(i.e., 프로그램)을 다른사람이 사용하도록 하거나 반대로 남이 만든 package를 이용
    * Package manager
    * e.g., apt-get, yum, homebrew, chocolatey
* 컴퓨터 유지보수 (컴퓨터에 대한 이해)
    * Top, htop, computer architecture
    * Data(storage, memory) & processor(CPU)
* 여러 컴퓨터의 연결관계
    * Network
