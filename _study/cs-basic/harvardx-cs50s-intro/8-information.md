---
layout  : article
title   : 8. Information
summary : 
date    : 2020-05-07 15:05:32 +0900
updated : 2020-05-07 15:53:25 +0900
tag     : draft
toc     : true
public  : true
parent  : [[/cs-basic/harvardx-cs50s-intro]]
latex   : false
---
* TOC
{:toc}

> 이 글은 CS50 x 2020의 [weeks 8](https://cs50.harvard.edu/x/2020/weeks/8/) 강의내용을 복습하기 위해 [강의 노트](https://cs50.harvard.edu/x/2020/notes/8/)를 기반으로 작성한 글입니다.
>
> 내용을 이해하기 위한 개인적인 설명이나 해석이 있을 수 있기 때문에 되도록 원문을 참고해주시길 바랍니다.
> 잘못된 부분이 있다면 댓글이나 그 외 편하신 방법으로 알려주시면 감사하겠습니다.

## A Look Back

Week 1 - Week 7 강의 내용 복습

## Privacy

Compuper Science는 정보의 저장과 처리에 관한 것이다. 정보를 갖고 할 수 있는 것을 아는 것 만큼 해야 하는 것을 아는 것 역시 중요하다.

### Passwords

예를 들어 우리는 여러 계정을 보호하기 위해 '암호(password)'를 사용한다. 하지만 가장 많이 쓰이는 암호 10위는 매우 간단하다.

```md
1. 123456
2. 123456789
3. qwerty
4. password
5. 111111
6. 12345678
7. abc123
8. 1234567
9. password1
10. 12345
```

더 복잡한 암호를 사용하더라도 현대의 컴퓨터는 매우 빠르게 암호를 알아낼 수 있다.

우리는 단 몇 분만에 가능한 모든 PIN을 체크하는 프로그램을 만들 수 있으며 모든 영어 단어가 들어있는 사전을 이용해서 각각을 체크해볼 수도 있다.

### Cookies

Cookie는 웹 사이트를 방문했을 때 웹 사이트가 컴퓨터에 저장하는 작은 데이터이다. 같은 사이트에 매번 접속할 때 마다 로그인을 하는 것을 방지해주는 것 처럼 유용하게 쓰일 수도 있지만 광고를 하거나 방문자를 추적하는 용도로도 사용될 수 있다.

크롬(Chrome) 브라우저에서 개발자 도구를 이용해 "Network"탭에 들어가면 특정 사이트가 남긴 쿠키를 볼 수 있다.

![Set_cookie](/post-img/harvardx-cs50s-intro-8-information/111032055-e7214e80-844d-11eb-8b6a-88a0a6475d90.png)

"Network"탭의 "Response Headers"에서 구글 웹사이트에서 남긴 쿠키를 확인할 수 있다. 구글은 위의 쿠키로 Google's ad가 있는 다른 웹 사이트에서도 우리를 추적할 수 있다.

네트워크 탭에는 우리가 사용하는 웹 브라우저가 웹 사이트에 요청한 "Request Hearders"도 존재하며 "user-agent" 항목을 표함하고 있는데 이는 우리가 사용하는 웹 브라우저의 버전을 설명한다.

Internet에는 우리가 서버로부터 응답을 받을 수 있도록 우리를 특정하는 IP addressr가 존재한다.

### Soft Delete

Snapchat과 같이 특정 시간 이후 사진을 지워주는 프로그램에서 실제로 데이터를 지우지 않을 수도 있다.

실제로 "soft delete"는 실제 데이터는 저장한 채로 두면서 "deleted" 항목의 값을 "true"로 바꿔 사용자로부터 사진을 숨긴다.

```sql
/* Hard Delete */
DELETE FROM snaps WHERE id = ?;

/* Soft Delete */
UPDATE snaps SET deleted = true WHERE id = ?;
```

### Location

Social media에 올린 본인의 사진도 다른 사람이 우리가 한 일과 같이 있던 사람들을 추적하는데 쓰일 수도 있다.

크롬의 개발자 도구를 이용하면 특정 웹 사이트에서 우리의 위치를 공유하고 화면에 표시하도록 하는 프로그램을 실행시킬 수 있다.

![geolocation](/post-img/harvardx-cs50s-intro-8-information/111032058-ea1c3f00-844d-11eb-87a0-0a9d0c4d87b3.png)

### Tracks

CS50 Final project를 위한 네 개의 track 강의 소개.
