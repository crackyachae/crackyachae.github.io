---
layout  : wiki
title   : Git4 CLI 협업
summary : 
date    : 2020-12-05 11:52:35 +0900
updated : 2020-12-15 02:18:58 +0900
tag     : git draft
toc     : true
public  : true
parent  : [[opent-git-cli]]
latex   : false
---
* TOC
{:toc}

> 이 글은 강의를 들으면서 기록한 뒤 정리를 전혀 하지않은 문서입니다. 이후에 정리된 뒤 참고하시는 것을 추천합니다.

+ Git을 이용하면 서로 다른 사람이 각각의 저장소에서 작업을 한 뒤 이것을 모아 하나의 프로젝트를 만들 수 있다.

# git으로 혼자 작업하기

혼자 git을 이용해 작업하는 방법을 되돌아보기

```zsh
git init a
cd a
```
a 라는 폴더를 생성해서 git을 시작한 뒤 a로 이동

```zsh
nano work.txt
```
nano를 이용해서 work.txt를 생성한다.

```zsh
git add work.txt
```
파일을 생성한 add한 뒤

```zsh
git commit -m "work 1"
```
work 1로 commit

백업을 위해 github에 원격 저장소를 마련

```zsh
git remote add origin [원격 저장소 주소]
```

원격 저장소를 폴더와 연결

```zsh
git push -u origin master
```
지역 저장소의 master를 원격 저장소의 master와 연결하면서 push

# git으로 같이 작업하기 

git을 이용해서 함께 작업하는 방법

협업에 참여하는 사람에게 권한을 주고 저장소에 접근할 수 있도록 허용.

github의 collaborator 기능을 이용한다.

github에 push를 하려면 권한이 있어야함

github의 [Settings - Collaborators & teams]로 이동해서 collaborator의 github 계정을 입력한 뒤 add collaborator를 눌러 collaborator를 추가

초대된 사람의 이메일 계정으로 invitation 메일이 도착하고
view invitaion 버튼을 누르면 github에서 invitation 을 수락하거나 거절할 수 있는 페이지로 이동한다.
Accept invitation을 눌러 초대를 승인

collaborator의 지역 저장소에 프로젝트의 원격 저장소를 clone
```zsh
git clone [원격 저장소 주소] b
```
b라는 이름의 폴더에 원격 저장소를 복제

```zsh
cd b
```
b라는 directory로 이동

# git push & pull

지역 저장소에 새롭게 추가된 버전을 원격 저장소로 push하고 원격 저장소의 내용을 지역 저장소로 pull하는 방법

a
 
a가 work.txt 파일 수정

```zsh
# work.txt of a
1
2a
```

```zsh
git commit -am "work 2a"
```

```zsh 
git push
```

b

pull을 잊어버리고 수정해서 push를 한 경우

```zsh
# work.txt of b
1
2b
```

```zsh
git commit -am "work 2b"
git push
```

git이 push를 reject 한 뒤 원격 저장소에 수정사항이 있음을 안내한다.

git pull을 해주면

```zsh
git pull
```

현재 원격 저장소에 수정된 부분과 지역 저장소에서 수정된 부분이 충돌이 발생한다.

```zsh
# work.txt
1
<<<<<< HEAD 
2b
=======
2a
>>>>>>> [Commit id]
```

파일을 열어서 수동으로 수정하거나 mergetool을 사용한다.

충돌을 해결했음을 알리기 위해 commit

```zsh
git add work.txt
git commit
```

충돌이 발생했기 때문에 commit 할 때 이 사실을 commit message에 자동으로 생성.

```zsh
git l
```
을 통해 현재 상태를 조회하면 a, b의 상태가 merge 되었음을 볼 수 있다.

push와 pull 자주 해줘야 서로 충돌이 일어나지 않는다

작업하기 전에 반드시 pull을 통해서 업데이트를 확인하는 것이 좋은 습관이다.

# git pull vs fetch, 그리고 원격 브랜치

pull과 fetch의 차이점인 아래 공식의 의미를 알아보자
```zsh
git pull = git fetch + git merge FETCH_HEAD
```

기존의
```zsh
git pull -> commit -> push
```
의 과정은

```zsh
git fetch -> git merge FETCH_HEAD -> commit -> push
```
와 같은 과정이다

`git l`로 log를 출력했을 때

```zsh
(HEAD -> master, origin/master)
```
master: 지역 저장소의 master branch
origin/master: origin 원격저장소의 master branch

지역저장소의 파일을 수정한 뒤 commit하고 git log를 살펴보면

```zsh
* (HEAD -> master) work 3a
*   (origin/master) Merge branch 'master' ...
```
으로 지역 저장소의 master branch의 commit이 origin/master branch보다 1 commit 앞서게 된다

실제로 `git status`로 확인해보면
현재 지역저장소의 branch가 origin/master branch보다 1 commit 앞선다는 message와 함께 push 할 것을 권한다.

```zsh
your branch is ahead of 'origin/master' by 1 commit
```

`git push`를 한뒤 다시 `git l`로 log를 조회하면 origin/master branch가 현재 master branch로 이동해있는 것을 알 수 있다.
```zsh
* (HEAD -> master, origin/master) work 3a
*   Merge branch 'master' ...
```

다른 지역 저장소에서 이 변경사항을 받기 위해 

`git fetch`를 입력하면 work 3a의 변경사항이 `work.txt`에 반영되지 않는다

`git l`로 조회해보면 이번엔 origin/master가 master 를 앞어있다.

```zsh
*  (origin/master, origin/HEAD) work 3a
*   (HEAD -> master) Merge branch 'master' ...
```

`git status`로 확인해보면
현재 지역저장소의 branch가 origin/master branch보다 1 commit 뒤에 있다는 message와 함께 pull 할 것을 권한다.

```zsh
your branch is behind 'origin/master' by 1 commit
```

`git pull`을 하거나 `git merge origin/master`를 통해 origin/master를 master로 merge 해도된다.

git pull = git patch (원격 저장소 update) + git merge origin/master

fetch 후 merge 할 때, 병합할 branch를 매번 지정하는 것이 귀찮은데

```zsh
cat .git/FETCH_HEAD
```
을 입력해서 해당 파일을 조회하면 가장 최근의 merge한 대상이 적혀있다.

```zsh
git fetch; git merge FETCH_HEAD
```
를 입력하면 해당 파일의 내용에 따라 가장 최근에 fetch했던 것을 merge시켜준다.

# 수업을 마치며 

code review, Gerrit
개발자들의 코드 품질을 상호 검증하는 프로그램 
push하면 원격저장소로 전달되기 전에 투표소르 올라감. 투표를 하고 의견을 나누고 반영 여부를 결정

또한 Github이나 Gitlab 같은 git hosting 도구도 협업을 위한 여러 기능을 제공
github: issue tracker

