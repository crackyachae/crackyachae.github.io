---
layout  : article
title   : 클린 코드 - 로버트 C. 마틴
summary : 애자일 소프트웨어 장인 정신
date    : 2023-01-10 20:53:16 +0900
updated : 2023-01-10 20:55:03 +0900
tag     : book
toc     : true
public  : true
parent  : [[/cs-basic]]
latex   : false
---
* TOC
{:toc}

## Review

## Summary

> 유명한 책이라 그런지 이미 다양한 요약정리 글들이 존재한다.
>
> * [Clean Code](https://kwosu87.gitbooks.io/clean-code/content/) by kwosu87
> * [Clean Code](https://catsbi.oopy.io/69d08818-656d-4fd3-a9c5-f06ba67a64c3) by Catsbi's Dlog
>     * 두 글이 가장 깔끔하게 정리가 되어있다고 생각한다.
> * [클린 코드: 애자일 소프트웨어 장인정신](https://saseungmin.github.io/reading_books_record_repository/docs/clean/clean-code/table-of-contents) by saseungmin
>     * 윗 문서보다 내용을 조금 더 자세하게 다루고 있다.
> * [클린코드](https://nahwasa.com/category/Study/클린코드) by Nahwasa
>     * 자신의 생각과 이해한 방식을 함께 적어두었다.
> * [Clean Code 정리](https://csupreme19.github.io/development/2022/01/03/clean-code.html) by Seunghoon Choi
>     * 코드 예시가 가장 많다.

<details>
    <summary>클린코드 체크리스트</summary>

#### 2장 의미 있는 이름

* 의도를 분명히 밝혀라: 주석이 필요한 변수는 좋은 변수가 아니다.
* 그릇된 정보를 피하라
* 의미 있게 구분하라: noise word를 쓰지 말자
* 발음하기 쉬운 이름을 사용하라
* 검색하기 쉬운 이름을 사용하라
* 인코딩(변수에 부가 정보를 덧붙여 표기하는 것)을 피하라
* 자신의 기억력을 자랑하지 마라
* 클래스 이름: 명사, 명사구
* 메서드 이름: 동사, 동사구
* 기발한 이름은 피하라
* 한 개념에 한 단어를 사용하라
* 말장난을 하지 마라
* 해법 영역에서 가져온 이름을 사용하라
* 문제 영역에서 가져온 이름을 사용하라
* 의미 있는 맥락을 추가하라
* 불필요한 맥락을 없애라

</details>

### 마음가짐

* 1장 깨끗한 코드. 4쪽

> 나중은 결코 오지 않는다. - 르블랑의 법칙[^leblanc]

* 1장 깨끗한 코드. 19쪽

> 캠프장은 처음 왔을 때보다 더 깨끗하게 해놓고 떠나라[^boy-scout]
>
> 한꺼번에 많은 시간과 노력을 투자해 코드를 정리할 필요가 없다. 변수 이름 하나를 개선하고, 조금 긴 함수 하나를 분할하고, 약간의 중복을 제거하고, 복잡한 if문 하나를 정리하면 충분하다.

* 2장 의미 있는 이름, 26쪽

> 불용어[^noise-word]는 중복이다.

## Links

* [ryanmcdermott/clean-code-javascript](https://github.com/ryanmcdermott/clean-code-javascript)
    * 책에서 소개하는 방법론들을 JavaScript에 적용시켜 작성한 글.
    * 번역: [qkraudghgh/clean-code-javascript-ko](https://github.com/qkraudghgh/clean-code-javascript-ko)
* [labs42io/clean-code-typescript](https://github.com/labs42io/clean-code-typescript)
    * 책에서 소개하는 방법론들을 TypeScript에 적용시켜 작성한 글.
    * 번역: [clean-code-typescript](https://738.github.io/clean-code-typescript/) by 738
    * 번역 저장소: [738/clean-code-typescript](https://github.com/738/clean-code-typescript)

## 주석

[^leblanc]: Later equals never - LeBlanc's law
[^boy-scout]: 보이스카우트 규칙, Leave the campground cleaner than you found it.
[^noise-word]: noise word
