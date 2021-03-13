---
layout  : wiki
title   : Git Memos
summary : 따로 정리하기는 애매한, 직접 써보면서 알게 된 Git
date    : 2020-08-27 16:41:19 +0900
updated : 2020-12-07 11:53:03 +0900
tag     : git memo rough
toc     : true
public  : true
parent  : [[Git]]
latex   : false
---
* TOC
{:toc}

## commit --amend (2020.08.27)
마지막 commit의 commit message 수정 

```zsh
git commit --amend
```
+ 가장 마지막으로 작성한 commit의 commit message를 수정한다
+ 명령어를 입력하면 마지막 commit 문서가 텍스트 에디터로 열리고 이를 수정하여 저장하면 된다.

```zsh
git commit --amend -m "new commit message"
```
+ commit 할 때와 동일하게 `-m` 옵션을 사용하면 텍스트 에디터를 사용하지 않고 메시지를 바로 변경할 수 있다.

### 참고
+ [Git Commit Message 바꾸는 방법](http://tech.javacafe.io/2018/03/01/how-to-change-git-commit-message/) by Javascfe Tech Blog
+ [마지막 Commit Message 수정하기](http://dudmy.net/git/2020/02/26/changing-commit-message/) by DUDMY HOME

## config - core.quotepath (2020.08.27)

```
git config --global core.quotepath false
```
+ `core.quotepath`는 일반적이지 않은(unusual) 문자를 backslash나 byte (0x80보다 큰 값에 대해서)를 이용해 escape 시킬지 여부를 결정하는 설정이다.
+ 이 값을 `false`로 지정하면 0x80보다 큰 값이 더 이상 unusual 하다고 여겨지지 않으며, escape 되지 않고 그대로 출력된다.
+ 그러므로 기존(default: `true`)에 숫자로 escape 되던 한글 문자가 escape 되지 않고 그대로 출력된다.

### 참고
+ [git 한글 파일명 사용 문제 고치기 core.quotepath](https://edykim.com/ko/post/git-fix-problem-using-filename-core.quotepath/) by 매일 성장하기

## fsck (2020.08.27)

```
git fsck --full
```


### 참고
+ [git fsck](https://git-scm.com/docs/git-fsck) by git
+ [Repairing and recovering broken git repositories](https://git.seveas.net/repairing-and-recovering-broken-git-repositories.html) by Git cookbook
+ [저장소가 망가졌는지 검사하기](https://namhyung.github.io/git-user-manual-ko/#toc_45) by kernel

## gitignore (2020.08.27)
+ 그 목록을 작성해놓은 놓은 파일이 `.gitignore`이며 프로젝트의 최상위 폴더에 만들어주면 바로 적용된다.

### gitignore 파일 생성

```zsh
vim .gitignore
```
+ 프로젝트의 최상위 폴더 (`.git`이 위치한 폴더)에 `.gitignore`파일을 생성한다.
+ 자신이 사용하는 텍스트 에디터(e.g., vim)를 이용해 파일을 생성한다. 

### gitignore에 파일 목록 작성

+ 제외할 특정 폴더나 파일 이름, 확장자 목록을 작성해준다.

|문법|의미|
|---|---|
|`filename.ext`|파일 이름이 filename이고 확장자가 ext인 특정 파일을 제외|
|`*.ext`|확장자가 ext인 모든 파일을 제외|
|`foldername/`| 폴더 이름이 foldername인 폴더의 모든 파일을 제외|
|`#`|주석|

Example

```zsh
# Directories
/bin/
target/

# Compiled class file
*.class

# Log file
*.log

# Package Files 
*.jar
*.warD1
*.nar
*.ear
*.zip
*.tar.gz
*.rar
```

### gitignore commit, push 하기

```zsh
git add .
git commit -m "git ignore add"
git push
```   

+ `.gitignore` 파일을 commit 한 뒤 push 하면 원격저장소에도 적용된다.

```zsh
git rm -r --cached .
```
+ gitignore가 적용되지 않는 경우 다음과 같이 캐시를 정리해주고 다시 시도한다.

### 참고
+ [gitignore 파일 설정 및 반영](https://m.blog.naver.com/simpolor/221065977618) by 	Simpolor
+ [collection of gitignore templates](https://github.com/github/gitignore) by github
+ [gitignore 파일 생성기](https://www.toptal.com/developers/gitignore) by Toptal

## index.lock (2020.08.27)
fatal: Unable to create '[repository root]/.git/index.lock': File exists

Another git process seems to be running in this repository ...
```

+ git add나 commit을 진행하다가 비정상적으로 git이 종료된 뒤, 다시 add나 commit을 하려고 할 때 발생하는 error message.

```zsh
rm -f ./.git/index.lock
```
+ error message 첫 줄을 참고하여 `index.lock` 파일을 제거해주면 정상 작동한다.

### 참고
+ [Another git process seems to be running in this repository](https://yunyoung1819.tistory.com/35) by Yun Young's Programming Blog!
+ [또 다른 git 프로세스가 이 저장소에서 실행중인 것 같습니다.](https://www.it-swarm.dev/ko/git/또-다른-git-프로세스가이-저장소에서-실행중인-것-같습니다/825730232/)

## reset (2020.08.27)

```zsh
git reset HEAD [파일 이름]
```
+ 현재 staging area에 존재하는 파일을 HEAD로 reset 시키면 unstaged 상태로 돌려놓는 것과 같다. 
+ [파일 이름]을 별도로 적지 않으면 현재 staging area에 올라가 있는 모든 파일을 unstage 시킨다.

```zsh
git reset HEAD^
```
+ 특정 파일을 빠뜨리거나 너무 이른 타이밍에 commit을 한 경우에도 `reset`을 이용해 commit을 취소할 수 있다.
+ 별도의 옵션을 적지 않으면 commit을 취소하고 commit 했던 파일을 보존하되 unstage 상태로 돌려놓는다.

### 참고
+ [git add 취소하기, git commit 취소하기, git push 취소하기](https://gmlwjd9405.github.io/2018/05/25/git-add-cancle.html) by Heee's Development Blog

## show (2020.08.27)

```zsh
git show
```
+ 가장 최근 commit의 정보를 확인한다.
+ commit hash, commit message, 변경된 파일 목록, 변경 내용 등을 확인할 수 있다.

```zsh
git show [commit hash or pointer]
```
+ 명령어 뒤에 특정 commit hash 값을 입력하거나 포인터 (e.g., HEAD)를 입력해서 특정 commit의 정보를 확인할 수도 있다.

### 참고
+ [08. git show 명령으로 커밋 정보 탐색](https://wikidocs.net/17172) by WikiDocs

## clone HTTP vs SSH (2020.12.03)

`git clone`할 때 파일을 전송에 암호화를 어떤 방식으로 할 것인가를 결정하는 것 같다.

+ [4.1 Git 서버 - 프로토콜](https://git-scm.com/book/ko/v2/Git-서버-프로토콜) by git

전체 설정처럼 유지하는 것이 아니라 파일을 전송하는 그 시점에 결정하는 것이고, clone은 자주 하지 않기 때문에 내용 자체는 문제의 중심이 아니었다는 것을 깨달음.

핵심은, push & pull 때 매번 인증해야하는 불편함을 해소하는 것. 이 때문에 key를 한 번 등록해서 사용하는 SSH와 매번 계정 정보를 입력하는 HTTP를 결정하는 것인데 HTTP를 사용할 때 계정정보를 저장해 매번 입력하지 않는 방법이 있다.
+ [7.14 Git 도구 - Credential 저장소](https://git-scm.com/book/ko/v2/Git-도구-Credential-저장소) by git-scm
+ [뭘로 Clone해야해? SSH vs HTTP?](https://develoduck.tistory.com/10) by devduck
+ [Git pull/push 시 Password 물어보지 않도록 설정하기(credential.helper)](https://www.hahwul.com/2018/08/22/git-credential-helper/) by HAHWUL
+ [git push시 '매번 github 인증정보 묻지 않기' 설정](https://readpost.co/post/git-push시-매번-github-인증정보-묻지-않기-설정--mU) by readpost

일단 사용해보고 push가 잦아서 계정 입력이 불편할 경우 `osxkeychain` 모드로 설정할 예정