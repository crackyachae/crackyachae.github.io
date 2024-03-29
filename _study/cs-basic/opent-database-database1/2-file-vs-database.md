---
layout  : article
title   : 2. file vs database
summary : 
date    : 2022-11-17 23:56:19 +0900
updated : 2022-11-18 00:17:35 +0900
tag     : 
toc     : true
public  : true
parent  : [[/cs-basic/opent-database-database1]]
latex   : false
---
* TOC
{:toc}

강의 목표

* 앞으로 만들어질 DATABASE 2 (각 데이터베이스 제품의 세부 강의) 수업들이 공통으로 다루게 될 예제에 대한 설명
* 가장 간단한 데이터를 저장하는 방법인 file이 데이터베이스화되어가는 과정

파일에 저장한 데이터를 다루는 법을 살펴보면

* 새로 만들기 - 텍스트 문서를 클릭하면 텍스트 파일을 생성한다.
* 텍스트 파일을 열고 필요한 내용(본문, 날짜, 작성자 등)을 작성해서 저장 후 끈다.
* 이와 동일한 방법으로 여러 파일을 생성할 수 있고 이 방식이 문제가 있는 것은 아니지만, 하려는 일에 따라서 이 방식이 불편할 수 있다.

예를 들어 생성한 파일이 많다고 생각했을 때 파일의 형식으로는 다음의 동작을 수행하기 어렵다.

* 작성 내용에 특정 작성자를 포함하고 있는 파일만을 찾는 것.
    * 검색기능을 이용할 수 있지만 작성자가 아닌 다른 내용에 찾으려는 조건을 포함하고 있을 수 있어 정확하지 않을 수 있다.
* 입력한 날짜의 순서에 따라서 각 파일을 정렬하는 것.
* 입력한 내용 중 특정 정보만 보고 나머지 정보를 숨기는 것.

엑셀과 같은 스프레드시트를 이용하면 위의 문제를 해결할 수 있다.

* 스프레드시트의 데이터 탭의 필터 기능을 사용해 특정 작성자의 행만을 남길 수 있다.
* 데이터 탭의 정렬 기능을 사용해 날짜의 순서에 따라서 각 행을 정렬할 수 있다.
* 특정 정보를 감추거나 특정 정보만 보고 싶으면 필요 없는 열을 숨김처리할 수 있다.

스프레드 시트처럼 구조적으로 데이터를 저장하면 파일에 비해 데이터를 가공하는 것이 훨씬 쉽다.

* 스프레드시트는 파일에서 데이터베이스로 가는 길목에 있다고 볼 수 있다.
* 데이터베이스라고 할 수는 없지만, 데이터베이스의 성질을 가지고 있다고 할 수 있다.

전문적인 데이터베이스 소프트웨어는 프로그래밍적으로 데이터를 추가, 수정, 삭제, 읽어오는 기능을 지원한다.

* 위 기능들을 자동화할 수 있다는 점이 소프트웨어들이 갖는 중대한 장점이다.
