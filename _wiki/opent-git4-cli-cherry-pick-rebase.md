---
layout  : wiki
title   : Git4 CLI Cherry Pick & Rebase
summary : 
date    : 2020-12-08 10:17:51 +0900
updated : 2020-12-15 02:18:42 +0900
tag     : git draft
toc     : true
public  : true
parent  : [[opent-git-cli]]
latex   : false
---
* TOC
{:toc}

> 이 글은 강의를 들으면서 기록한 뒤 정리를 전혀 하지않은 문서입니다. 이후에 정리된 뒤 참고하시는 것을 추천합니다.

## Cherry-pick의 개념과 기본사용법

새롭게 `git init`을 한 뒤

topic branch를 만들어

branch를 master와 topic 두 개를 유지

master에 `m1`, `m2`, topic에 `t1`, `t2`, `t3` commit을 생성

```
* (HEAD -> topic) t3
* t2
* t1
| * (master) m2
| * m1
|/
* (topic) init
```

master branch에서 `ls` 하면
init.txt, m1, m2

topic branch에서 `ls` 하면
init.txt, t1, t2, t3

현재 master branch인 m2에서 작업하고 있는데 t2에서 작업한 내용(t2 파일)을 가져오고 싶다.

기존의 상태에서 t2의 '변화'를 가져와 merge

우선 병합될 branch로 checkout 해야한다.
현재위치: m2
```
* (topic) t3
* t2
* t1
| * (HEAD -> master) m2
| * m1
|/
* (topic) init
```

t2 버전을 cherrypick
```
git cherry-pick [t2의 commit id]
```

`ls`로 파일을 보면
init.txt m1 m2 t2

```
* (HEAD -> master) t2
* m2
* m1
| * (topic) t3
| * t2
| * t1
|/
* (topic) init
```

## rebase의 개념과 기본 사용법

```
a b c ─┬─ m1 m2 ∙∙∙ master
       └─ t1 t2 ∙∙∙ topic
```
master와 topic의 base는 둘 다 c

master를 topic으로 rebase하면 master의 base가 c가 아닌 t2로 이동.

선형적으로 git log를 구성할 수 있다.

```
a b c ─┬
       └─ t1 t2 - m1 m2
```

cherrypick 과 동일한 상황에서,

```
* (topic) t3
* t2
* t1
| * (HEAD -> master) m2
| * m1
|/
* (topic) init
```

rebase를 시키려는 branch로 이동

master branch를 이동시킬 예정이므로 master branch로 이동한다.
```
git checkout master
```

현재 branch의 base를 현재 topic branch가 가리키고 있는 commit으로 바꾼다.
-> [2020.12.08 10:44] 이 때 topic branch가 가리키고 있는 commit은 그 branch의 마지막 commit인가?

master branch의 각 commit별 변경사항을 순차적으로 병합한다.

1. 우선 t2에 m1 commit의 변경 내용을 병합한 commit을 이어서 형성.
2. 거기에 다시 m2 commit의 변경 내용을 병합한 commit을 이어서 형성.

```
git rebase topic
```
각각의 commit이 순차적으로 반영되었다는 것을 보여준다.
Applying: m1
Applying: m2

```
* (HEAD -> master) m2
* m1
* (topic) t3
* t2
* t1
* init
```

rebase 하기 전후의 m1, m2 commit을 비교하면 두 commit의 변경사항 (각각 m1, m2 파일 추가)은 같지만 그 변경사항이 발생하는 working copy가 다르다.
rebase 전: c + m1, c + m1 + m2
rebase 후: c + t1 + t2 + m1, c + t1 + t2 + m1 + m2

rebase는 원격 저장소로 push하기 이전까지 할 수 있다.
-> [2020.12.08 11:08] 아예 기능적으로 안되는건지 꼬이면 골치아파지니까 잘 안하는건지.

branch가 유지되고 있는 상황에서 두 commit을 merge한 최종 결과와 rebase한 결과는 같아야한다.

## Cherry-pick 충돌의 원인과 해결

```
a b c ─┬─ m1 m2 - 'new' ∙∙∙ master
       └─ t1 t2         ∙∙∙ topic
```
상태에서 m2에서 t2의 commit의 변경사항을 cherry pick 해오는 경우,

t1과 t2, m2에 동일하게 존재하는 파일의 내용이 다음과 같이 뒀을 때 t1 (cherrypick 하는 commit의 직전 commit) 을 base로 3way merge 방식으로 이들을 비교하면
```
| line | t1 | t2 | m2 | new |
| ------------------- | --- |
|  1   | c  | c  | c  |  c  |
|  2   | t1 | t1 | m1 |  m1 |
|  3   |    | t2 | m2 |  ?  |
```

1: 전체가 `c`로 변화 없기 때문에 `c`
2: t1과 t2를 비교하면 둘 다 `t1`으로 두 번째 줄은 t2의 변경사항이 아니기 때문에 변화가 없으므로 `m1`을 적어줌
3: t2에서는 `t2`가 생겼고, m2에서는 `m2`가 생겼기 때문에 동일한 부분에 다른 변경값을 가져 충돌 발생.

두 변화 모두 반영해서 `mt2`로 입력한다고 했을 때, 
새로운 commit에 담겨있는 정보는 m2의 내용과, t2에서 발생한 '변경'사항이다. t2 이전의 topic branch의 내용 (e.g., `t1`)은 반영되지 않는다.

conflict은 merge에서 발생한 conflict와 동일하게 표시가 된다.

```
c
m1
<<<<<<< HEAD
t2
===
m2
>>>>>>>
```

직접 수정한뒤 저장하거나 mergetool 사용.

conflict를 해결하면 stage에 올린 뒤 (mergetool은 자동으로 add)
안내되어있는대로 cherry-pick --continue를 입력해 chery-pick을 완료하거나 --abort 옵션으로 변경사항을 반영하지 않을 수도 있다.
--continue를 입력하면 commit message를 입력할 수 있는 창이 뜬다.

## rebase 충돌의 원인과 해결

```
a b c ─┬─ (m1 m2)                           ∙∙∙ master
       └─ t1 t2 t3 - 'new m1' - 'new m2'    ∙∙∙ topic
```

t3에서 git rebase를 하면 우선 HEAD가 t3로 이동한다.

new m1을 만들기 위해서 
base인 c, 반영하려는 m1, 새로운 base인 t3를 3way merge 방식으로 merge한다.
```
| line | c  | m1 | t3 | new |
| ------------------- | --- |
|  1   | c  | c  | c  |  c  |
|  2   |    | m1 | t1 |  ?  |
|  3   |    |    | t2 |  t2 |
|  4   |    |    | t3 |  t3 |
```

m1, t3 모두에서 변경사항이 있는 두번째 줄에서 conflict 발생.

```
c
<<<<<<< HEAD
t1
===
m1
>>>>>>> m1
t2
t3
```

new m2을 만들기 위해서 
base인 m1, 반영하려는 m2, 새로운 base인 new m1을 3way merge 방식으로 merge한다.

```
| line | m1 | m2 | new1 | new2 |
| --------------------- | ---- |
|  1   | c  | c  |  c   |  c   |
|  2   | m1 | m1 |  mt1 |  mt1 |
|  3   |    | m2 |  t2  |  ?   |
|  4   |    |    |  t3  |  t3  |
```

m2, new m1 모두에서 변경사항이 있는 세번째 줄에서 conflict 발생.

```
c
mt1
<<<<<<< HEAD
t2
===
m2
>>>>>>> m2
t2
t3
```

직접 수정한뒤 저장하거나 mergetool 사용한다.

실제로 git rebase를 입력하면
```
first, rewinding head to replay your work on top of it
```
message가 나타나면서 head를 이동시키고
어떤 commit을 merge하고 있는지 나타낸다.

`Applying: m1`

기다리면 
CONFLICT가 발생해서 변경사항을 merge하는데 실패했다는 안내가 뜸.

```
git am --show-current-patch
```
입력하면 현재 변경 사항을 보여준다.

이를 확인해서 conflict를 해결하면 stage에 올린 뒤 (mergetool은 자동으로 add)
안내되어있는대로 rebase --continue를 입력해 rebase를 계속 진행한다.

그러면 
```zsh
# m1을 마저 apply.
Applying: m1
# m1 applying이 끝나고 바로 m2 apply 시작.
Applying: m2
```
로 m2를 applying 하고 있다는 것이 표시되면서 동일하게 다음 commit을 merge하기 시작한다. 과정은 이전과 동일하다.

## 협업에서 rebase 이용하기

협업할 때 rebase를 이용해서 timeline을 깔끔하게 정리하기

두 지역 저장소를 각각 L (Left)와 R (Right)라고 하자.

L에서 L1 commit을 만들고 push 한다.

```zsh
# L local
* (HEAD -> master, origin/master) L1
```

R 지역저장소에서 지금까지 push 한 내용을 pull해온다.
```zsh
# R local
* (HEAD -> master, origin/master) L1
```

참고로 master는 지역저장소를 origin/master는 원격 저장소를 나타낸다.
+ master: 지역 저장소의 master branch
+ origin/master: 원격 저장소의 master branch

L 지역저장소에서 L2라는 commit을 만들면
```zsh
# L local
* (HEAD -> master) L2
* (origin/master) L1
```
처럼 된다.

이를 push 하면 다시
```zsh
# L local
* (HEAD -> master, origin/master) L2
* L1
```
상태가 된다.

R local 에서 이를 fetch 하면.
```zsh
# R local
* (origin/master) L2
* (HEAD -> master) L1
```

원격 저장소의 변경사항을 local 저장소에 동기화 시킨다.
현재 R local 의 master는 여전히 L1 commit에 위치하고
origin/master는 이전에 L local 에서 업데이트 한 L2 commit을 가리키게 된다.

R local에 이를 반영하려면 merge를 하면 된다.
```zsh
git merge origin/master
```
origin master로 현재 commit을 merge (Fast-forward)
```zsh
# R local
* (HEAD -> master, origin/master) L2
* L1
```

두 local 모두 같은 상태에서 각각 다른 변경사항을 엽데이트 한다.

```zsh
# L local
* (origin/master) L3
* (HEAD -> master) L2
* L1
```
```zsh
# R local
* (origin/master) R1
* (HEAD -> master) L2
* L1
```

L local를 push하고
R local 에서 fecth를 하면

```zsh 
# R local
* (HEAD -> master) R1
| * (origin/master) L3
|/
* L2
* L1
```

이번에는  merge 하면 위처럼 Fast-forward 방식으로 merge되지 않고 새로운 commit을 만들게된다.

```zsh
*   (HEAD -> master) Merge remote-tracking branch 'origin/master'
|\
| * (origin/master) L3
* | R1
|/
* L2
* L1
```
R에서 git push한 뒤 L에서 pull해 동일한 상태로 맞춰주고 마무리.

이렇게 하면 병렬적으로 작업한 모든 내용에 대해 merge commit이 생기면서 log가 쉽게 지저분해진다.

이를 rebase로 해결.

다시 L에서는 L4를 R에서는 R2를 commit한 뒤 L에서 먼저 push 해 이전과 동일한 상황을 만들어준다.

R에서 fetch 하면,

```zsh
* (HEAD -> master) R2
| * (origin/master) L4
|/
*   Merge remote-tracking branch 'origin/master'
|\
| * (origin/master) L3
* | R1
|/
* L2
* L1
```

이 때 단순히 merge 대신 R2를 origin/master로 rebase를 하면,

```
git rebase origin/master
```

```zsh
* (HEAD -> master) R2
* (origin/master) L4
*   Merge remote-tracking branch 'origin/master'
|\
| * (origin/master) L3
* | R1
|/
* L2
* L1
```
R2가 다른 곳에서 먼저 다른 내용으로 편집되었을 여지가 없을 때만 rebase를 사용해야한다. 그러지 않으면 엉망이됨.