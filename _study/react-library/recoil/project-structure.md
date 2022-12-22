---
layout  : article
title   : Recoil 프로젝트 구조 모범 사례
summary : 
date    : 2022-12-20 22:54:18 +0900
updated : 2022-12-22 14:59:28 +0900
tag     : 
toc     : true
public  : true
parent  : [[/react-library/recoil]]
latex   : false
---
* TOC
{:toc}

> 이 글은 [Recoil Project Structure Best Practices](https://wes-rast.medium.com/recoil-project-structure-best-practices-79e74a475caa)의 내용을 번역 및 정리한 글입니다.
>
> * 제가 필요한 부분 위주로 확인하면서 정리하고 있어 글에 덜 작성된 부분이 있을 수 있습니다.
> * 글 작성 후 원문의 내용이 수정되거나 내용을 이해하기 위한 개인적인 설명이나 해석이 있을 수 있습니다. 되도록 원문을 참고해주시길 바랍니다.
> * 잘못된 부분이 있다면 댓글이나 그 외 편하신 방법으로 알려주시면 감사하겠습니다.

Recoil은 React의 전역 상태 관리를 위한 최고의 해결책이다. Recoil의 컴포넌트 간의 통신에 대한 접근 방식은 가볍고, 간단하며 성능이 뛰어나 Redux 나 RxJS와 같은 이전 라이브러리에 비해 사용자와 개발자 모두에게 더 나은 경험을 제공한다. 하지만 Recoil은 신규(very new) 프로젝트이고 확장성을 고려하여 프로젝트를 설정하는데 기준이 될만한 모범 사례 만들기에는 수년간의 커뮤니티의 참여가 부족하다. 여기서 제시하는 것은 대규모의 React Native와 React Native 웹 하이브리드 애플리케이션에서 가장 잘 작동하는 것으로 확인한 Recoil 설정 방법이다.

## 현재 유행하는(Prevailing) 구조의 문제점

내가 웹에서 본 대부분의 Recoil 예제는 다음과 유사한 구조를 갖는다:

[IMG]

`/src/recoil`에 하나의 디렉토리를 만들어 `/atoms`와 `/selectors`로 나눈다. 이 방법은 괜찮지만, Recoil을 처음 다루기 시작하기에 분명하지(apparent) 않은 근본적인 문제가 있다. 문제가 있는(not ideal) 예제부터 살펴보자.

여기에는 다음의 두 파일: `exampleAtom.ts`와 `exampleSelector.ts`를 나누는 `/atoms`와 `/selectors` 폴더가 있다. 각 파일은 각각 하나의 atom과 selector를 정의한다. `/components.Main.tsx` 파일은 두 파일의 데이터에 어떻게 접근하는지를 보여준다.

Recoil의 전제 중 하나는 큰 데이터 구조를 "atom"이라는 이름의 부분적인 컴포넌트로 나누어 더 나은 성능을 내는(allow) 것이다. 각 컴포넌트는 각 atom을 참조하는 `useRecoilValue`, `useRecoilState` 등의 hooks를 통해 atom을 개별적으로 구독한다. 그러므로, 이 상태 조각(atom)들이 업데이트되면 이들에 연결(attached)되어있는 컴포넌트도 자동으로 리렌더된다.

이런 방식은 우리가 atom을 간단하고 작게 유지하도록 강제하므로 여러 컴포넌트가 모든 컴포넌트가 신경 쓰지 않는 변화가 발생할 수 있는 거대한 데이터 구조를 참조해 필요하지 않을 때도 강제로 리 렌더링 되는 대신, 각자 필요한 데이터 조각들만을 참조할 수 있도록 한다.

이들이 위의 폴더구조와는 무슨 상관일까? 이는 큰 애플리케이션에서는 우리가 *수많은* atom을 가진다는 것을 의미한다. 하나의 atom에 접근해 그 atom 내부의 다른 두 부분 데이터를 사용하는(care about) 두 컴포넌트가 있을 때마다 각 부분 데이터가 바뀔 때 두 컴포넌트 모두 리렌더링 되는 것을 피하고자 atom을 나눠야 할 것이다.

## 파일과 Atom을 명명할 때의 문제점

Recoil 프로젝트에서 보이는 또 다른 문제점은 파일과 데이터 구조의 이름이 나쁘다는 것이다.  종종, atom은 "State" 접미사와 함께, selector는 "Value"와 같이 이름을 작성한다. 예를 들어, 우리의 위의 "example" atom은 "exampleState.ts"로 이 atom의 selector는 "exampleValue.ts"와 같은 이름의 파일로 작성될 것이다. 이런 이름은 Recoil atom과 단시간의(ephemeral) 지역 컴포넌트 상태를 함께 사용하기 시작하면 극명한 혼란을 가져올 것이다. "State"는 React에서 너무 많이 사용되는 용어이며 사용을 피해야한다. "exampleState"는 실제로 그 안에 "상태(state)"를 갖지 않는다. 상태는 React 내부의 `useState()` hook을 사용할 때 얻는 것이다. "Value"는 어떠한가? 해당 파일에서 얻게되는 것을 숨기기(obfuscate)위한 더 일반적인 용어를 생각할 수도 없을만큼 일반적이다.

### 내보내기를 관리하기

atom과 selector 파일의 내보내기는 실제 프로젝트에서 불가피한, 데이터가 커지고 변하면서 생기는 혼란을 방지하기 위해 의도적으로 구조화되어야 한다. Atom은 Recoil의 심장(핵심)이고, 우리는 이들을 "Atom.ts" 파일의 기본 내보내기(default export)로 지정해야 한다.

Selector 파일의 내보내기를 구조화하는 것은 이후의 여러 작업에서 우리 스스로를 구원해줄 기회이다. 너는 수많은 selector를 갖게 될 것이다. 비동기적인 가져오기(fetch) 호출을 통합하든, atom으로부터 원하는 것을 재구성(reshape)해야하든 이 selector는 이후에 몇 배로 증가할 것이며, 이들을 추가, 수정, 제거할 때 코드에 필요한 변경사항을 최소화하고 싶을 것이다. 우리가 신경써야하는 영역은;

1. atom과 selector 파일의 import 구문
2. 이런 변화가 소스 컨트롤과 풀 리퀘스트에서 어떻게 보이는지
3. 개발자 경험
4. 성능

앞의 CodeSandbox 예제에서, "Third.tsx"를 살펴보자. 이 컴포넌트는 "example" atom을 각각의(separate) 세 형태로 사용한다. 하나는 atom의 값을 직접 읽어오는 방식이고, 다른 두 개는 다른 괄호로 값을 채우는 selector를 통하는 방식이다. 최종적인 import 구문은 다음과 같다:

[IMG]

여기서 불러온 모든 세 파일은 각각 자신의 default exports를 사용하고 있으므로, 세 개의 import 구문이 필요하다. 또한 여기서 명명하고 있는 `const`도 약간 부자연스러운 것을 볼 수 있다. `exampleState`의 결과로, "State"를 떼어내고(drop) "example"만을 사용하고 있다.  첫 번째의 "example"과 충돌하므로 selector는 같은 방식으로 명명할 수 없고, 대신 두 selector에는 축약된 "Val"을 붙이는 것으로 타협한다.

Source control과 개발자 경험의 관점에서 이는 괜찮긴 하지만 좋지는 않다. 이런 방식의 파일 명은 다른 엔지니어들이 이해하기 히들 것이다.

이 예제는 설계된 것처럼 보일 수도 있지만 그렇지 않다. 나는 이런 문제를 Recoil 프로젝트에서, 특히 Recoil을 처음 사용하는 개발자들로부터 자주 목격하게 된다.

## 그래서 어떻게 고칠 수 있는가?

우리가 고쳐야 하는 주된 문제는:

1. 파일이 헷갈리는 방식으로 명명된다.
1. 폴더 구조에 유용한 부분이 전혀 보이지 않는다.
1. import 구문이 너무 많다.
1. `useRecoilValue`를 호출했을 때 무엇을 얻을지 알 수 없다.

### 더 나은 명명 컨벤션

위의 1번에 대해서, "State"와 "Value" 접미사를 치워버리자. 이 둘은 모두 과하고 모호하다. 우리는 이를 좀 더 정확한 "Atom"과 "with<Something>"으로 대체할 것이다. 후자의 "with"는 atom을 변형시킨다는 것을 이해하기 위해 한번 더 생각해야(mentally unpack)하는 "Value"보다 우리가 selector로부터 얻는 것이 무엇인지 더 정확하게 설명한다. "With"는 추가적인 단계가 필요하다는 것을 함축하고 있으며 이는 우리가 selector를 사용할 때 수행하는 일을 의미한다. "<Something>"은 기본 get 또는 set 연산을 어떻게 수정할지 설명한다. 위의 예제에서는, (selector를 사용해) 대괄호(bracket)나 괄호(parentheses)를 추가하므로 위의 value들은 "withBrackets.ts" 또는 "withParens.ts"라는 파일로 바뀔 것이다.

### 폴더 구조 수정(refactor)

Atom과 selector를 각각의 폴더로 나누는 것은 중대한 오류이다. 이는 폴더 트리구조가 구현 상세를 기준(base)으로 하고있기 때문이다; 대신, 우리의 폴더가 Recoil의 내부 구조를 따라하고 모든 것이 우리가 관심있는 데이터의 atom을 기반으로 하도록 해보자.

Atom과 selector의 차이점은 atom은 데이터를 위한 기본(raw) getter와 setter를 포함하고 있고, selector는 get이나 set 연산 이전에 어떤 작업을 수행한다. 그러나, *이들은 같은 데이터를 사용한다!* 우리가 어떤 것을 사용하든, 우리는 같은 데이터 조각; 즉 같은 *atom*에 관심이 있다. 그러므로, `/atoms`와 `/selectors` 폴더를 완전히 제거하고 모든 것을 `/recoil` 폴더 바로 아래로 옮길 것이다. `/recoil` 안에 새로운 폴더 `/recoil/example`을 생성해서 atom과 selector 파일 모두를 넣을 것이다.

[IMG]

이 구조를 사용하면 우리가 원하(like)는 대로 가져올 수 있는 옵션을 남겨두면서, `/recoil/example/*.test.ts` 나 `/recoil/example/tests` 처럼 단위 테스트의 위치를 정하기도 쉬워진다.

만약 이후에 특정 데이터의 atom을 별도의 프로젝트나 패키지로 추출하고 싶을 때도, 하나의 폴더를 다른 곳으로 복사하면 모든 연관된 파일을 함께 가져갈 수 있으므로 굉장히 쉽게할 수 있다.

### 내보내기를 재구조화

모든 긴 경로의 atom과 selector의 import 구문을 복제하는 것보다, 딕셔너리 패턴을 사용해 atom의 상위 파일 내부의 단일 atom에 연관된 모든 객체를 모을 것이다. 예를 들어, 다음과 같이 보이는 `/recoil/example/index.ts` 파일을 만들었다:

[IMG]

위의 방식을 사용하면, 세 개의 구문 대신 하나의 구문만으로 불러오도록 간소화할 수 있다:

더 명확해야 할 필요가 있다면 `exampleWithBrackets`나 `exampleWithParens`와 같이 더 긴 이름을 사용해도 상관없다. 여기서는 간결함을 위해 "With"를 쓰지 않을 것이다. With를 쓰지 않으면 타이핑하고, 읽고 이해해야하는 코드가 훨씬 적어진다.

### 더 나은 Selectors

Selector 파일에서, 폴더명과 selector 파일명을 가져다 camel case 형태로 연결해서 default export명과 `key` 값으로 사용했다. 이렇게 하면 같은 이름의 두 atom을 갖지 않게되므로 key 충돌이 일어나지 않는 것이 보장된다. 이 예제에서 결과적으로 지어진 이름은 `exampleWithBrackets`와 `exampleWithParens` 이다.

## 결과

여기에 위에서 설명한 대로 재구성한 완성된 예제 프로가 있다:

우리는 앞서 고려한 모든 항목(boxes)에 체크했다:

1. Import 구문은 간결하고 유연하다.
2. 모든 파일은 구분되어있어 풀 리퀘스트는 명확할 것이고, 파일과 폴더명은 대부분의 git command 결과에 보여지는 경로만 봐도 파일이 어떤 일을 하는지 쉽게 이해할 수 있도록 되었다.
3. 파일의 이름과 위치를 개선해 개발자 경험이 증진되었다. 각 파일은 직접(`/recoil/example/withBrackets.ts`) 혹은 딕셔너리 인덱스(`/recoil/example`) 파일을 통해 불러올 수 있다. 또한 우리는 IDE에서 딕셔너리 패턴을 사용해 일반적이고, 문맥 파괴적인 "index.ts"가 아닌 atom 파일의 이름을 얻을 수 있다.

여기(이 예제에)서 더 나아갈 수 있는 다음 단계는 "example" atom을 각각 구분된 atom 폴더와 파일들을 갖는 "name"과 "value" 두 부분으로 나누는 것이다. 이는 각 컴포넌트가 필요한 데이터의 atom만 구독하므로 둘 중 하나가 변경될 때마다 성능을 향상시킬 수 있지만, 데이터를 분리해야 하는 비용이 든다. Recoil의 성능 패턴은 다른 게시물에서 다룰 예정이며 이 게시물에서는 이름과 구조 패턴에 초점을 맞추도록 한다.

## 결론

Recoil은 React의 전역 상태 관리 경쟁에서 Facebook의 공식 답변이되는 것으로 보인다. 앞으로 몇 년간 Recoil이 더 많은 기능을 추가하고 복잡하거나 성능이 낮은 솔루션을 대체하기 시작하면 Recoil을 배우는 것은 React 개발자들에게 필수가 될 것이다. 여기서 설명한, 라이브러리의 철학을 흉내낸 구조를 사용하면, 어떤 규모의 프로젝트에서든 Recoil을 사용하기 시작해 규모를 잘 키워나갈 수 있다는 것을 알 수 있을 것이다.

앞으로의 게시물에서 Recoil 라이브러리의 더 많은 측면과 Recoil이 어떻게 전역 상태 환경을 바꿔나갈지 살펴볼 것이다.
