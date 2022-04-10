---
layout  : article
title   : 배열 (Arrays)
summary : 
date    : 2021-12-05 12:06:14 +0900
updated : 2021-12-05 15:51:23 +0900
tag     : draft
toc     : true
public  : true
parent  : [[mdn-learn-web-js]]
latex   : false
---
* TOC
{:toc}

> 이 글은 MDN Learn web development의 [JavaScript First Step](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/First_steps) 중 [Arrays](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/First_steps/Arrays)의 내용을 번역 및 정리한 글입니다.
>
> * 제가 필요한 부분 위주로 확인하면서 정리하고 있어 글에 덜 작성된 부분이 있을 수 있습니다.
> * 글 작성 후 원문의 내용이 수정되거나 내용을 이해하기 위한 개인적인 설명이나 해석이 있을 수 있습니다. 되도록 원문을 참고해주시길 바랍니다.
> * 잘못된 부분이 있다면 댓글이나 그 외 편하신 방법으로 알려주시면 감사하겠습니다.

## 배열이란 (What is an array?)

## 배열 만들기 (Creating arrays)

배열은 대괄호와 쉼표로 구분된 항목들로 이루어져 있다.

1. 쇼핑 목록을 배열에 저장하고 싶다고 가정하자. 콘솔에 다음의 코드를 붙여넣어 보자:

    ```js
    let shopping = ['bread', 'milk', 'cheese', 'hummus', 'noodles'];
    console.log(shopping);
    ```

2. 위의 예제에서, 각 항목은 문자열이지만, 배열에는 다양한 데이터 유형 - 문자열, 숫자, 객체, 심지어 다른 배열까지 - 을 저장할 수 있다. 또한 하나의 배열 안에 여러 데이터 유형을 섞을 수도 있다 - 하나의 배열에는 숫자만, 다른 배열에는 문자열만 저장하도록 제한할 필요가 없다. 예를 들어:

    ```js
    let sequence = [1, 1, 2, 3, 5, 8, 13];
    let random = ['tree', 795, [0, 1, 2]];
    ```

3. 다음으로 진행하기 전에 몇 개의 예제를 더 만들어 보자.

## 배열의 길이 찾기 (Finding the length of an array)

문자열의 길이를 찾는 것과 정확히 같은 방법으로 배열의 길이(얼마나 많은 항목이 배열에 들어있는지)를 알아낼 수 있다 - `length` 속성을 사용한다. 다음을 시도해보자:

```js
let shopping = ['bread', 'milk', 'cheese', 'hummus', 'noodles'];
console.log(shopping.length);  // 5
```

## 배열 항목에 접근하고 항목을 수정하기 (Accessing and modifying array items)

배열 안의 항목에는 0부터 시작해서 번호가 매겨진다. 이 번호는 항목의 *인덱스(index)*라고 한다. 즉 첫 번째 항목은 인덱스 0, 두 번째는 인덱스 1을 갖는다.  [문자열의 각 문자에 접근했던 것](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/First_steps/Useful_string_methods#retrieving_a_specific_string_character)과 같은 방법으로 대괄호 표기법을 사용하고 항목의 번호를 제공해 배열의 각 항목에 접근할 수 있다.

1. 다음의 코드를 콘솔에 입력하자:

    ```js
    let shopping = ['bread', 'milk', 'cheese', 'hummus', 'noodles'];
    console.log(shopping[0]);
    // returns "bread"
    ```

2. 배열의 한 항목에 새로운 값을 부여해 배열 안의 항목을 수정할 수 있다. 이걸 해보자:

    ```js
    let shopping = ['bread', 'milk', 'cheese', 'hummus', 'noodles'];
    shopping[0] = 'tahini';
    console.log(shopping);
    // shopping will now return [ "tahini", "milk", "cheese", "hummus", "noodles" ]
    ```

3. 배열 안의 배열을 다차원 배열(multidimensional array)이라고 한다. 두 개의 대괄호를 연결해 자신이 그 자체로 또 다른 배열 안에 있는 배열의 항목에 접근할 수 있다. 예를 들어, `random` 배열(이 전 섹션을 보자)의 세 번째 원소인 배열의 항목에 접근하려면 이렇게 하면 된다:

    ```js
    let random = ['tree', 795, [0, 1, 2]];
    random[2][2];
    ```

## 배열에서 항목을 찾기 (Finding items in an array)

항목의 인덱스를 알면 쉽게 찾을 수 있지만, 만약 인덱스를 모르면 어떻게 해야 할까? `indexOf()`로 특정 항목의 인덱스를 찾을 수 있다. 이 메소드는 항목을 인자로 받아 그 항목의 인덱스나, 항목이 배열 안에 없으면 `-1`을 반환한다:

```js
const birds = ['Parrot', 'Falcon', 'Owl'];
console.log(birds.indexOf('Owl'));   //  2
console.log(birds.indexOf('Rabbit')) // -1
```

## 항목을 추가하기 (Adding items)

한 개 이상의 항목을 배열 끝에 추가하려면 `push()`를 사용한다. 배열 끝에 추가할 항목이 한 개 이상 포함해야 한다는 것을 유의하자.

```js
let myArray = ['Manchester', 'Liverpool'];
myArray.push('Cardiff');
console.log(myArray);      // [ "Manchester", "Liverpool", "Cardiff" ]
myArray.push('Bradford', 'Brighton');
console.log(myArray);      // [ "Manchester", "Liverpool", "Cardiff", "Bradford", "Brighton" ]
```

메소드의 호출이 끝나면 새로운 배열의 길이가 반환된다. 새로운 배열의 길이를 변수에 저장하고 싶으면 이렇게 하면 된다:

```js
let myArray = ['Manchester', 'Liverpool'];
let newLength = myArray.push('Bristol');
console.log(myArray);     // [ "Manchester", "Liverpool", "Bristol" ]
console.log(newLength);   // 3
```

배열의 처음에 항목을 추가하고 싶으면 `unshift()`를 사용한다:

```js
let myArray = ['Manchester', 'Liverpool'];
myArray.unshift('Edinburgh');
console.log(myArray);     // [ "Edinburgh", "Manchester", "Liverpool" ]
```

## 항목을 제거하기 (Removing items)

배열에서 마지막 항목을 제거하려면 `pop()`을 사용한다.

```js
let myArray = ['Manchester', 'Liverpool'];
myArray.pop();
console.log(myArray);     // [ "Manchester" ]
```

`pop()` 메소드는 제거된 항목을 반환한다. 이를 새 변수에 저장하려면 이처럼 할 수 있다:

```js
let myArray = ['Manchester', 'Liverpool'];
let removedItem = myArray.pop();
console.log(removedItem);     // "Liverpool"
```

배열의 첫 번째 항목을 제거하려면 `shift()`를 사용한다:

```js
let myArray = ['Manchester', 'Liverpool'];
myArray.shift();
console.log(myArray);     // [ "Liverpool" ]
```

항목의 인덱스 번호를 알면 `splice()`를 이용해서 항목을 제거할 수도 있다:

```js
let myArray = ['Manchester', 'Liverpool', 'Edinburgh', 'Carlisle'];
let index = myArray.indexOf('Liverpool');
if (index !== -1) {
  myArray.splice(index, 1);
}
console.log(myArray);     // [ "Manchester", "Edinburgh", "Carlisle" ]
```

`splice()` 호출에서, 첫 번째 인자는 항목을 제거하기 시작할 위치를, 두 번째 인자는 몇 개의 항목을 제거할 것인지를 나타낸(say)다. 그러므로 한 개 이상의 항목을 제거할 수 있다:

```js
let myArray = ['Manchester', 'Liverpool', 'Edinburgh', 'Carlisle'];
let index = myArray.indexOf('Liverpool');
if (index !== -1) {
  myArray.splice(index, 2);
}
console.log(myArray);     // [ "Manchester", "Carlisle" ]
```

## 모든 항목에 접근하기 (Accessing every item)

배열의 모든 항목에 접근하려는 경우가 매우 잦을 것이다. `for...of` 문을 사용해 이 작업을 수행할 수 있다:

```js
const birds = ['Parrot', 'Falcon', 'Owl'];

for (let bird of birds) {
  console.log(bird);
}
```

때로는 배열 안의 각 항목에 같은 작업을 수행해 변경된 항목으로 이루어진 배열을 얻고(leave) 싶을 수도 있다. `map()`을 이용해 할 수 있다. 아래의 코드는 숫자로 이뤄진 배열을 가져다 각 수를 두 배 증가시킨다:

```js
function double(number) {
  return number * 2;
}

const numbers = [5, 2, 7, 6];
const doubled = numbers.map(double);

console.log(doubled);  // [ 10, 4, 14, 12 ]
```

`map()`에 함수를 전달하고, 배열의 항목마다 이 함수를 호출해 그 항목을 전달한다. 그리고 각 함수 호출의 반환 값을 새로운 배열에 추가하고 마지막으로 이 배열을 반환한다.

때로는 기존의 배열에서 어떤 조건(test)을 만족하는 항목만을 포함하는 새로운 배열을 만들고 싶을 수도 있다. `filter()`를 이용해 할 수 있다. 아래의 코드는 문자열로 이뤄진 배열을 가져다 8글자 미만인 것만 반환한다:

```js
function isLong(city) {
  return city.length > 8;
}

const cities = ['London', 'Liverpool', 'Totnes', 'Edinburgh'];
const longer = cities.filter(isLong);

console.log(longer);  // [ "Liverpool", "Edinburgh" ]
```

`map()`처럼, `filter()` 메소드에도 함수를 전달하고, `filter()`는 배열의 항목마다 이 함수를 호출해, 그 항목을 전달한다. 만약 함수가 `true`를 반환하면, 항목을 새로운 배열에 추가한다. 마지막으로 이 배열을 반환한다.

## 문자열과 배열끼리 변환하기 (Converting between strings and arrays)

종종 거대한 긴 문자열을 포함하는 미가공 데이터(raw data)를 받아, 유용한 항목들을 더 유용한 형식으로 구분한 다음 데이터 테이블에 표시하는 등의 작업을 수행하고 싶을 수 있다. 이를 위해 `split()` 메소드를 사용할 수 있다. 가장 간단한 형태로, 이 메소드는 문자열을 구분할 문자를 한 개의 매개변수로 가져다, 구분자 사이의 하위 문자열을 배열의 항목으로 반환한다.

> Note: 이건 기술적으로는 배열 메소드가 아니라 문자열 메소드지만, 이 지점에서 다루기 적절하기 때문에 배열과 함께 넣었다.

1. 어떻게 작동하는지 보기 위해 `split()`을 갖고 놀아보자. 먼저, 콘솔에 문자열을 만든다:

    ```js
    let myData = 'Manchester,London,Liverpool,Birmingham,Leeds,Carlisle';
    ```

2. 이제 각 쉼표에서 문자열을 나눈다.

    ```js
    let myArray = myData.split(',');
    myArray;
    ```

1. 마지막으로 새로운 배열의 길이를 찾아보고, 몇몇 항목을 가져와 보자:

    ```js
    myArray.length;
    myArray[0]; // the first item in the array
    myArray[1]; // the second item in the array
    myArray[myArray.length-1]; // the last item in the array
    ```

1. `join()` 메소드를 사용해 반대의 작업을 할 수 있다. 다음을 시도해보자:

    ```js
    let myNewString = myArray.join(',');
    myNewString;
    ```

1. 배열을 문자열로 바꾸는 또 다른 방법은 `toString()` 메소드를 사용하는 것이다. `toStrint()`은 아마 `join()`보다 간단하고 매개변수가 필요하지 않지만 좀 더 제한적이다. `join()`으로는 다른 구분자를 지정할 수 있지만 `toString()`은 항상 쉼표를 사용한다. (4단계를 쉼표 대신 다른 문자를 이용해 실행해보자.)

    ```js
    let dogNames = ['Rocket','Flash','Bella','Slugger'];
    dogNames.toString(); // Rocket,Flash,Bella,Slugger
    ```
