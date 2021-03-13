---
layout  : wiki
title   : Git3 CLI Backup
summary : 
date    : 2020-12-03 21:02:28 +0900
updated : 2020-12-15 02:18:10 +0900
tag     : git draft
toc     : true
public  : true
parent  : [[opent-git-cli]]
latex   : false
---
* TOC
{:toc}

> 이 글은 강의를 들으면서 기록한 뒤 정리를 전혀 하지않은 문서입니다. 이후에 정리된 뒤 참고하시는 것을 추천합니다.

+ 컴퓨터는 고장이 난다는 것은 확실하다.
+ 정보를 다른 컴퓨터에 저장해서 한 대의 컴퓨터가 고장나도 다른 컴퓨터의 저장된 것을 이용해 복수할 수 있어야함
+ 각각의 컴퓨터는 멀리 떨어져 있어야함.
+ 순수한 Git의 가능을 이용해서 Backup을 하는 것.

.git 파일을 포함해 프로젝트 파일 전체를 파일저장 서비스에 올려 놓는 식으로 간단하게 백업할 수 있다.

백업하는 방법
+ 자유롭지만 어려운 방법: 직접 백업 서버를 구축
+ 제한적이지만 쉬운 방법: 호스팅 서비스. 인터넷에 연결되어서 원격으로 사용할 수 있는 서버를 임대.
  + git hosting: 로컬 저장소의 버전을 업로드 할 원격저장소를 임대.
  + 채택!

git hosting을 이용해서 backup

## 1. 수업의 목표와 용어정리

|| Backup | process ||
|---|:---:|:---:|:---:|
| 백업 (backup) <br> 복제(clone) | 지역 저장소 <br> (Local Repository) | ----- push ----> <br> <---- pull ----- | 원격 저장소 <br> (Remote Repository) |
|||||

백업과 복제를 이용하면 여러개의 지역 저장소 간에 동기화를 진행하면서 작업이 가능하다.

이런 작업을 가능하게 해주는 백업 과정의 중심에는 원격저장소가 있다.

원격 저장소를 마련하기 위해 Git hosting 이용

## 2. Git hosting

가장 유명한 서비스: Github

Github과 함께 Gitlab도 함께 알아봄. (2018년 기준 비공개 저장소 (private repository) 요금이 무제한이고 framework가 open-source)

## 3. 저장소 생성

[Github](https://github.com)이나 [Gitlab](https://about.gitlab.com) 으로 이동해서 계정 생성후 로그인.


Github: 로그인 후 왼쪽의 Repositories에서 New 버튼을 눌러 저장소 생성
Gitlab: 로그인 후, 우측 상단의 New Project 버튼을 눌러 저장소 생성

저장소의 이름과 설명 작성.

Public/Private 설정
Public: 오픈소스 프로젝트. 공개 저장소
Private: 비공개 저장소.

## 4. 공부의 방향

앞으로 배울 내용에 대한 브리핑

|| Local → Remote | Remote → Local |
| :---: | :---: | :---: |
| HTTP | ✓ | ✓ |
| SSH | | |

Local → Remote: 지역 저장소와 원격 저장소를 연걸
Remote → Local: 원격 저장소의 내용을 새로운 지역 저장소에 복제

저장소들 간에 파일을 주고받기 위해서는 통신이 필요하다.
통신 방법
HTTP 보안적으로 부족, 조금 불편, 배울필요 x
SSH 보안적으로 강력하고 편리하지만 배워야 할 것이 많다.

HTTP를 이용해서 저장소 통신을 학습.

## 5. 원격저장소와 연결

지역 저장소를 HTTP를 이용해서 원격 저장소로 연결

원격 저장소와 관련된 명령어는 remote

```zsh
git remote add [원격 저장소의 주소]
```

원격 저장소의 주소는 HTTP에 체크해서 주소를 복사

주소를 매번 기억해서 입력하기 어렵구, 하나의 지역 저장소에 여러개의 원격 저장소가 연결되어 있을 수 있기 때문에 
각각의 원격 저장소에마다 별명을 붙일 수 있음

```zsh
git remote add [원격 저장소의 별칭] [원격 저장소의 주소]
```
관습적으로 origin을 많이 쓴다.

```zsh
git remote -v
```
git remote를 입력하면 만든 원격 저장소의 별칭이 출력되고
-v 옵션을 붙이면 주소까지 확인할 수 있다.

## 6. git push

```zsh
git push
```

명령어를 입력하면 업로드 절차가 시작

처음 시행시 error 메시지가 표시되는데 그대로 copy해서 붙여넣으면 된다.

```zsh
git push --set-upstream origin master
```

기본적으로 어떤 원격 저장소와 연결할 것인가를 설정하는 명령어

origin의 master로 업로드

입력해주면 아이디를 인증하도록 안내가 된다.
계정 정보를 입력해주면 된다.

process가 끝나고 원격 저장소를 새로고침해서 확인해보면 된다.

이제부터 수정 사항을 저장하고 버전을 만든 뒤 push하는 것을 반복하는 것을 통해서 원격저장소에 변경사항을 backup

## 7. git clone

원격 저장소의 파일을 복제해 지역 저장소로 가져오기

원격 저장소의 clone with HTTPS의 주소를 복사한 뒤

```zsh
git clone [복사한 주소] [생성할 폴더명]
```

폴더명 입력은 필수는 아니며 지정하고 싶은 경우에만 입력해주면 되고
입력하지 않으면 원격 저장소의 repository 이름으로 생성된다.

## 8. git pull

원격 저장소의 내용을 가져오기 위해서는

```zhs
git pull
```

여러대의 컴퓨터를 사용하는 경우
push - 수정 - commint - push
순으로 작업을 하면 된다.

## 9. git과 open source

git 홈페이지의 souce code 버튼을 입력하면 git의 github repository로 이동

이를 zip파일로 다운로드 하거나 clone 해오면 이를 우리 컴퓨터에서 사용할 수 있다.

현재 많은 open source들이 github 등의 사이트를 통해 hosting되고있기 때문에
git을 사용하게 되었다는 것은 이를 다룰 수 있는 기초를 닦은 것과 같다고 할 수 있다.

## 10. 수업을 마치며

공부해볼만한 주제들

+ SSH: 인증과 관련해서 원격 저장소와 통신할 때 마다 인증을 해야하는 불편함을 해결할 수 있다.
  + 저장소 간에 통신할 때 자동으로 로그인이 가능
+ Git hosting 기능을 꼼꼼하게 살펴보기.
  + e.g., issue tracker: 프로젝트 하면서 발생한 이슈를 관리하는 게시판.

원격 저장소를 다룰 수 있게 되었다면 협업을 할 수 있는 준비가 된 것.

공동 프로젝트의 중심에는 버전관리 시스템이 존재.

협업 때는 동시에 작업을 했을 때 생기는 충돌이 문제. 

협업 파트에서는 이를 방지하는 법을 주로 다룬다.