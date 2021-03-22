---
layout  : article
title   : CodeUp_Python 기초 100제 (6001~6098)
summary : CodeUp 기초 100제를 파이썬과 자바스크립트로 풀어보자
date    : 2021-02-09 22:49:47 +0900
updated : 2021-03-05 17:56:02 +0900
tag     : ps-python ps-javascript
toc     : true
public  : true
parent  : [[codeup]]
latex   : false
---
* TOC
{:toc}

> 이 글은 [코드업 기초 100제](https://codeup.kr/problemsetsol.php?psid=33)를 파이썬(Python)과 자바스크립트(JavaScript)로 풀이한 것을 모아놓은 글입니다.
>
> 일종의 연습 기록이며 자바스크립트 코드는 코드업에서 채점을 지원하고 있지 않아 통과 여부는 알 수 없습니다. 작성 후 파이썬 모범 풀이를 기반으로 검토와 수정은 할 예정이지만 틀린 부분이 있을 수 있기 때문에 혹시라도 참고하실 분들은 가볍게 훑는 수준으로 부탁드립니다. 피드백은 편하신 방법으로 자유롭게 주시면 감사하겠습니다.

### 문제집 정보

* 문제집: [코드업 기초 100제](https://codeup.kr/problemsetsol.php?psid=33)
* Problem list: 6001 ~ 6098

## 6001

```python
print("Hello")
```

```js
console.log("Hello");
```

## 6002

```python
print("Hello World")
```

```js
console.log("Hello World");
```

## 6003

```python
# 1
print("Hello")
print("World")

# 2
print("Hello\nWorld")
```

* 두 풀이의 차이점이 무엇인지 어떤 풀이가 더 나은지는 잘 모르겠다.

```js
// 1
console.log('Hello')
console.log('World')

// 2
console.log(`Hello
             World`)

// 3
console.log('Hello\nWorld')
```

## 6004

```python
print("'Hello'")
```

* 문자열을 나타내는데 작은따옴표와 큰따옴표 모두 쓸 수 있으며 쌍으로 인식하기 때문에 문자열 안에 작은따옴표가 들어가면 큰따옴표로 감싸주면 된다.
  * [Single and Double Quotes | Python](https://www.geeksforgeeks.org/single-and-double-quotes-python/) by GeeksforGeeks

```js
console.log("'Hello'")
```

## 6005

```python
print('"Hello World"')
```

* 역슬래시 이스케이프(backslash escape)를 사용하는 것도 모범답안에 있지만, 가독성 면에서는 작은따옴표가 더 좋을 것 같다.

```js
console.log('"Hello World"')
```

## 6006

```python
print("\"!@#$%^&*()\'")

# 모범 답안 1
print("\"!@#$%^&*()'")

# 모범 답안 2
print('"!@#$%^&*()\'')
```

* 큰따옴표로 감쌌기 때문에 작은따옴표 앞에는 역슬래시(\\)를 안 붙여도 된다.

```js
console.log("\"!@#$%^&*()'")
```

## 6007

```python
print('"C:\\Download\\\'hello\'.py"')

# 모범 답안
print("\"C:\Download\\\'hello\'.py\"")
```

* 왜 `C:` 다음에 역슬래시 이스케이프 안 해줘도 되는건지 모르곘다.

```js
console.log("\"C:\\Download\\\'hello\'.py\"")
```

* 자바스크립트는 파이썬 모범답안과 동일하게 출력하면 `C:` 다음의 역슬래시가 제대로 출력되지 않는다.

## 6008

```python
print('print("Hello\\nWorld")')

# 모범 답안
print("print(\"Hello\\nWorld\")")
```

```js
console.log('print("Hello\\nWorld")')
```

## 6009

```python
a = input()
print(a)
```

```js
const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.on("line", (line) => {
  console.log(line);
  rl.close();
}).on("close", () => {
  process.exit();
});
```

> 이후에 아래의 입출력 코드를 사용하는 자바스크립트 코드는 `// I/O Template` 이라고 작성한 뒤, 아래 코드의 `{ Code }` 부분만 작성합니다.

```js
const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on("line", (line) => {
  // { Code }
  rl.close();
}).on("close", () => {
  process.exit();
});
```

## 6010

```python
n = int(input())
print(n)
```

* `input` 함수는 기본적으로 받아오는 값이 문자열이기 때문에 `int()`를 이용해서 정수로 변환해주어야 한다.

```js
const n = +line
console.log(n);
```

* 자바스크립트에서 숫자 변환은 `Number()`를 사용해도 되지만 `+` 기호를 이용해서 변환하는 것을 더 자주 사용하는 것 같다.

## 6011

```python
f = float(input())
print(f)
```

```js
// I/O Template
const n = +line
console.log(n);
```

* 자바스크립트에서는 정수와 실수 모두 `Number`이기 때문에 6010번 문제와 답이 동일하다.

## 6012

```python
a = int(input())
b = int(input())
print(a)
print(b)

# 모범 답안
a = input() 
b = input()
print(a)
print(b)
```

* `int`로 변환 안해도 정답으로 인정된다.

```js
const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let input = [];
let i = 0;

rl.on("line", (line) => {
  input[i] = +line;
  i++;
  if (i === 2) {
    console.log(input[0]);
    console.log(input[1]);
    rl.close();
  }
}).on("close", () => {
  process.exit();
});
```

* 뭔가 주먹구구로 하는 느낌이다. 일단 파이썬에서도 개수를 2개로 정해서 입력받고 출력하는 거니까 이렇게 해도 되곘지?

## 6013

```python
a = input()
b = input()
print(b)
print(a)
```

```js
const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let input = [];
let i = 0;

rl.on("line", (line) => {
  input[i] = line;
  i++;
  if (i === 2) {
    console.log(input[1]);
    console.log(input[0]);
    rl.close();
  }
}).on("close", () => {
  process.exit();
});
```

## 6014

```python
# 1
f = float(input())
print(f)
print(f)
print(f)

# 2
a = float(input())
print(f"{a}\n{a}\n{a}")
```

* 두 번째 것 실행시켜보면 잘 되는데 계속 통과가 안 됐다.
  * 코드업에서 채점을 python 3.5로 해서 그런 것 같다. 포맷 문자열은 python 3.6부터 사용할 수 있는 기능.

```js
// I/O Template
console.log(line);
console.log(line);
console.log(line);
```

## 6015

```python
a, b = input().split()
print(a)
print(b)
```

* [str.split](https://docs.python.org/ko/3/library/stdtypes.html#str.split)

```js
// I/O Template
const [a, b] = line.split(" ");
console.log(+a);
console.log(+b);
```

* 파이썬 `split()` 함수에서 구분자로 아무것도 입력하지 않을 때 기본 구분자(separator)는 공백이지만 자바스크립트는 구분자로 아무것도 입력하지 않으면 입력한 문자열 전체를 한 개의 원소로 갖는 배열을 반환하기 때문에 주의해야 한다.
  * [String.prototype.split()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split) by MDN references
* 파이썬과 비슷하게 구조분해 문법을 사용해서 각 상수에 값을 나눠받을 수 있다.
  * [Destructuring assignment](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment) by MDN references
  * [06. 비구조화 할당 (구조분해) 문법](https://learnjs.vlpt.us/useful/06-destructuring.html) by 벨로퍼트와 함께하는 모던 자바스크립트

## 6016

```python
a, b = input().split()
print(b)
print(a)
```

```js
// I/O Template
const [a, b] = line.split(" ");
console.log(b, a);
```

## 6017

```python
a = input()
print(a, a, a)
```

* `print()` 함수는 기본적으로 인자(argument) 사이에 공백을 추가한다.
  * [7.1.3. Manual String Formatting](https://docs.python.org/ko/3/tutorial/inputoutput.html#manual-string-formatting) by Python Tutorial

```js
// I/O Template
console.log(line, line, line);
```

## 6018

```python
a, b = input().split(':')
print(a, b, sep=':')
```

* 출력하는 인자 사이의 문자를 공백에서 바꾸려면 원하는 문자를 `sep` 값으로 넘겨준다.
  * [input()](https://docs.python.org/3/library/functions.html)

```js
// I/O Template
const time = line.split(":");
console.log(time.join(":"));
```

* `join()`을 이용해서 배열의 원소들을 하나의 문자열로 합칠 수 있다.
  * [Array.prototype.join()](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/join) by MDN references

## 6019

```python
y, m, d = input().split('.')
print(d, m, y, sep='-')
```

```js
// I/O Template
const date = line.split(".");
console.log(id.join("-"));
```

## 6020

```python
f, e = input().split('-')
print(f, e, sep='')
```

```js
// I/O Template
const id = line.split("-");
console.log(date.join(""));
```

## 6021

```python
w = input()
print(w[0])
print(w[1])
print(w[2])
print(w[3])
print(w[4])

# use iteration
w = input()
for i in range(5):
  print(w[i])
```

```js
// I/O Template
console.log(line[0]);
console.log(line[1]);
console.log(line[2]);
console.log(line[3]);
console.log(line[4]);

// use iteration
// I/O Template
for (const i in line) {
  console.log(line[i]);
}
```

## 6022

```python
d = input()
print(d[0:2], d[2:4], d[4:6])
```

* `slice` 문법을 사용해서 원하는 범위의 원소만 받아올 수 있다.
  * [slice()](https://docs.python.org/3/library/functions.html?highlight=slice#slice)
  * [Understanding slice notation](https://stackoverflow.com/questions/509211/understanding-slice-notation) by stackoverflow
  * [[Python] 파이썬 슬라이싱(slicing) 기본과 예제](https://twpower.github.io/119-python-list-slicing-examples) by TWpower's Tech Blog

```js
// I/O Template
const y = line.slice(0, 2);
const m = line.slice(2, 4);
const d = line.slice(4, 6);
console.log(y, m, d);
```

* [Array.prototype.slice()](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/slice)

## 6023

```python
h, m, s = input().split(':')
print(m)
```

```js
// I/O Template
const [h, m, s] = line.split(":");
console.log(m);
```

## 6024

```python
w1, w2 = input().split()
print(w1, w2, sep='')

# 모범 답안
a, b = input().split()
print(a + b)
```

```js
// I/O Template
const [w1, w2] = line.split(" ");
console.log(w1 + w2);
```

## 6025

```python
a, b = input().split()
c = int(a) + int(b)
print(c)
```

```js
// I/O Template
const [n1, n2] = line.split(" ");
console.log(+n1 + +n2);
```

## 6026

```python
n1 = input()
n2 = input()
print(float(n1) + float(n2))
```

```js
// I/O Template
const [n1, n2] = line.split(" ");
const f = +n1 + +n2;
console.log(f);
```

* 0.9와 0.1의 합이 1.0이 아니라 1이 나오는데 자릿수를 맞춰주는 메소드(method)는 따로 없는 것 같다.
* 소수점 아랫부분을 문자열로 받아서 그 길이를 `toFixed()`로 넘기면 될 것 같긴 한데 더 간단한 방법이 있나 찾아봐야겠다.

## 6027

```python
# 1
a = input() 
print('{:x}'.format(int(a)))

# 2
a = input()
hex = format(int(a), 'x')
print(hex)
```

* 모범 답안에서 제시된 방법은 오래된 문법 이어서 아래의 `str.format`을 사용할 것을 권장하고있다.
  * [printf-style String Formatting](https://docs.python.org/3/library/stdtypes.html#printf-style-string-formatting)
  * [str.format](https://docs.python.org/3/library/stdtypes.html#str.format)
    * [Format String Syntax](https://docs.python.org/3/library/string.html#formatstrings)
  * [format()](https://docs.python.org/3/library/functions.html#format)
* [[파이썬] 2진수, 8진수, 16진수 다루기](https://www.daleseo.com/python-int-bases/) by Dale Seo

```js
// I/O Template
const hex = (+line).toString(16);
console.log(hex);
```

* [Number.prototype.toString()](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Number/toString) by MDN references

## 6028

```python
# 1
a = input() 
print('{:X}'.format(int(a)))

# 2
a = input()
hex = format(int(a), 'X')
print(hex)
```

```js
// I/O Template
const hex = (+line).toString(16).toUpperCase();
console.log(hex);
```

## 6029

```python
# 1
a = input() 
print('{:o}'.format(int(a, 16)))

# 2
a = input()
oct = format(int(a, 16), 'o')
print(oct)
```

```js
// I/O Template
const hex = parseInt(line, 16);
const oct = hex.toString(8);
console.log(oct);
```

* [parseInt()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/parseInt) by MDN references

## 6030

```python
n = ord(input())
print(n)
```

* [ord()](https://docs.python.org/3/library/functions.html#ord)

```js
// I/O Template
const n = line.charCodeAt(0);
console.log(n);
```

* [String.prototype.charCodeAt()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/charCodeAt) by MDN references

## 6031

```python
n = int(input())
print(chr(n))
```

```js
// I/O Template
const c = String.fromCharCode(+line);
console.log(c);
```

* [String.fromCharCode()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/fromCharCode) by MDN references

## 6032

```python
n = int(input())
print(-n)
```

```js
// I/O Template
const n = +line;
console.log(-n);
```

## 6033

```python
n = ord(input())
print(chr(n + 1))
```

```js
// I/O Template
const n = line.charCodeAt(0);
const c = String.fromCharCode(n + 1);
console.log(c);
```

## 6034

```python
a, b = input().split()
print(int(a) - int(b))
```

```js
// I/O Template
const [a, b] = line.split(" ");
console.log(+a - +b);
```

## 6035

```python
a, b = input().split()
print(float(a) * float(b))
```

```js
// I/O Template
const [a, b] = line.split(" ");
console.log(+a - +b);
```

## 6036

```python
w, n = input().split()
print(w * int(n))
```

```js
// I/O Template
const [w, n] = line.split(" ");
let s = "";
for (let i = 0; i < +n; i++) {
  s = s.concat(w);
}
console.log(s);
```

* [String.prototype.concat()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/concat) by MDN references

## 6037

```python
n = input()
s = input()
print(s * int(n))
```

```js
const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];
let i = 0;

rl.on("line", (line) => {
  input[i] = line;
  i++;
  if (i === 2) {
    let s = "";
    for (let j = 0; j < +input[0]; j++) {
      s = s.concat(input[1]);
    }
    console.log(s);
    rl.close();
  }
}).on("close", () => {
  process.exit();
});
```

## 6038

```python
a, b = input().split()
print(int(a)**int(b))
```

* [Numeric Types](https://docs.python.org/3/library/stdtypes.html#numeric-types-int-float-complex)

```js
// I/O Template
const [a, b] = line.split(" ");
console.log(+a ** +b)
```

* [Exponentiation (**)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Exponentiation) by MDN references

## 6039

```python
a, b = input().split()
print(float(a)**(float(b)))
```

```js
// I/O Template
const [a, b] = line.split(" ");
console.log(+a ** +b)
```

* 6038번 문제와 동일하다.

## 6040

```python
a, b = input().split()
print(int(a) // int(b))
```

* [// floor division](https://python-reference.readthedocs.io/en/latest/docs/operators/floor_division.html) by Python Reference
* [Floor Division](https://www.educative.io/edpresso/floor-division) by Edpresso

```js
// I/O Template
const [a, b] = line.split(" ");
const div = Math.floor(+a / +b);
console.log(div);
```

* [Division](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Division)
* [Math.floor()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/floor)

## 6041

```python
a, b = input().split()
print(int(a) % int(b))
```

```js
// I/O Template
const [a, b] = line.split(" ");
console.log(+a % +b)
```

## 6042

```python
f = input()
r = round(float(f), 2)
print(r)
```

```js
// I/O Template
const r = (+line).toFixed(2);
console.log(+r);
```

## 6043

```python
f1, f2 = input().split()
f = float(f1) / float(f2)
print('{:.3f}'.format(f))
```

```js
// I/O Template
const [f1, f2] = line.split(" ");
const f = (+f1 / +f2).toFixed(3);
console.log(+f);
```

## 6044

```python
a, b = input().split()
n_a = int(a)
n_b = int(b)
print(n_a + n_b)
print(n_a - n_b)
print(n_a * n_b)
print(n_a // n_b)
print(n_a % n_b)
print(round(n_a / n_b, 2))
```

```js
// I/O Template
const [a, b] = line.split(" ");
const n_a = +a;
const n_b = +b;
console.log(n_a + n_b);
console.log(n_a - n_b);
console.log(n_a * n_b);
console.log(Math.floor(n_a / n_b));
console.log(n_a % n_b);
console.log(+(n_a / n_b).toFixed(2));
```

## 6045

```python
a, b, c = input().split()
sum = (int(a) + int(b) + int(c))
avg = round(sum / 3, 2)
print(sum, avg)
```

```js
// I/O Template
const [a, b, c] = line.split(" ");
const sum = +a + +b + +c;
const avg = (sum / 3).toFixed(2);
console.log(sum, +avg);
```

## 6046

```python
n = int(input())
print(n << 1)
```

```js
// I/O Template
const n = +line;
console.log(n << 1);
```

* [Left shift (<<)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Left_shift) by MDN References

## 6047

```python
a, n = input().split()
print(int(a) << int(n))
```

```js
// I/O Template
const [a, n] = line.split(" ");
console.log(+a << +n);
```

## 6048

```python
a, b = input().split()
if (int(a) < int(b)):
  print(True)
else:
  print(False)

# 모범 답안
a, b = input().split()
a = int(a)
b = int(b)
print(a < b)
```

```js
// I/O Template
const [a, b] = line.split(" ");
console.log(+a < +b);
```

* 자바스크립트의 `true`와 `false` 키워드는 첫 글자가 소문자이기 때문에 모범답안과 같은 방식으로 작성하면 `true`, `false`가 출력된다.

## 6049

```python
a, b = input().split()
print(int(a) == int(b))
```

```js
// I/O Template
const [a, b] = line.split(" ");
console.log(+a === +b);
```

* [Strict equality (===)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Strict_equality) by MDN references

## 6050

```python
a, b = input().split()
print(int(a) <= int(b))
```

```js
// I/O Template
const [a, b] = line.split(" ");
console.log(+a <= +b);
```

## 6051

```python
a, b = input().split()
print(int(a) != int(b))
```

```js
// I/O Template
const [a, b] = line.split(" ");
console.log(+a !== +b);
```

## 6052

```python
n = int(input())
print(bool(n))
```

```js
// I/O Template
const n = +line;
console.log(Boolean(n));
```

* `!!`를 사용해서 boolean으로 바꿀 수도 있다.
  * [2 Ways to Convert Values to Boolean in JavaScript](https://www.samanthaming.com/tidbits/19-2-ways-to-convert-to-boolean/)

## 6053

```python
b = bool(int(input()))
print(not b)
```

```js
// I/O Template
const b = Boolean(+line);
console.log(!b);
```

* [Logical NOT (!)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_NOT) by MDN references

## 6054

```python
a, b = input().split()
b1 = bool(int(a))
b2 = bool(int(b))
print(b1 and b2)
```

```js
// I/O Template
const [a, b] = line.split(" ");
const b1 = Boolean(+a);
const b2 = Boolean(+b);
console.log(b1 && b2);
```

* [Logical AND (&&)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_AND) by MDN references

## 6055

```python
a, b = input().split()
b1 = bool(int(a))
b2 = bool(int(b))
print(b1 or b2)
```

```js
// I/O Template
const [a, b] = line.split(" ");
const b1 = Boolean(+a);
const b2 = Boolean(+b);
console.log(b1 || b2);
```

* [Logical OR (||)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_OR) by MDN references

## 6056

```python
a, b = input().split()
c = bool(int(a)) 
d = bool(int(b)) 
print((c and (not d)) or ((not c) and d))
```

```js
// I/O Template
const [a, b] = line.split(" ");
const c = Boolean(+a);
const d = Boolean(+b);
console.log((c && !d) || (!c && d));
```

## 6057

```python
a, b = input().split()
c = bool(int(a)) 
d = bool(int(b)) 
print((c and d) or ((not c) and (not d)))

# 다른 모범 답안
a, b = input().split()
c = bool(int(a)) 
d = bool(int(b)) 
print(c == d)
```

```js
// I/O Template
const [a, b] = line.split(" ");
const c = Boolean(+a);
const d = Boolean(+b);
console.log((c && d) || (!c && !d));
```

## 6058

```python
a, b = input().split()
c = bool(int(a)) 
d = bool(int(b)) 
print((not c) and (not d))

# 다른 모범 답안
a, b = input().split()
c= bool(int(a))
d= bool(int(b))
print(not (c or d))
```

```js
// I/O Template
const [a, b] = line.split(" ");
const c = Boolean(+a);
const d = Boolean(+b);
console.log(!c && !d);
```

## 6059

```python
n = int(input())
print(~n)
```

```js
// I/O Template
n = +line;
console.log(~n);
```

* [Bitwise NOT (~)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Bitwise_NOT) by MDN references

## 6060

```python
a, b = input().split()
print(int(a) & int(b))
```

```js
// I/O Template
const [a, b] = line.split(" ");
console.log(+a & +b);
```

* [Bitwise AND (&)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Bitwise_AND) by MDN references

## 6061

```python
a, b = input().split()
print(int(a) | int(b))
```

```js
// I/O Template
const [a, b] = line.split(" ");
console.log(+a | +b);
```

* [Bitwise OR (|)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Bitwise_OR) by MDN references

## 6062

```python
a, b = input().split()
print(int(a) ^ int(b))
```

```js
// I/O Template
const [a, b] = line.split(" ");
console.log(+a ^ +b);
```

## 6063

```python
a, b = input().split()
c = int(a)
d = int(b)
print(c if (c > d) else d)
```

```js
// I/O Template
const [a, b] = line.split(" ");
const c = +a;
const d = +b;
console.log(c > d ? c : d);
```

* [Conditional (ternary) operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_Operator) by MDN references

## 6064

```python
a, b, c = input().split()
# 문자 a를 정수로 바꾸어 다시 a에 저장.
a = int(a)
b = int(b)
c = int(c)
d = a if a < b else b
e = c if c < d else d
print(e)
```

```js
// I/O Template
let [a, b, c] = line.split(" ");
a = +a;
b = +b;
c = +c;
d = a < b ? a : b;
e = c < d ? c : d;
console.log(e);
```

## 6065

```python
a, b, c = input().split()
if int(a) % 2 == 0:
  print(a)
if int(b) % 2 == 0:
  print(b)
if int(c) % 2 == 0:
  print(c)
```

```js
// I/O Template
const [a, b, c] = line.split(" ");
if (+a % 2 === 0) {
  console.log(+a);
}
if (+b % 2 === 0) {
  console.log(+b);
}
if (+c % 2 === 0) {
  console.log(+c);
}
```

## 6066

```python
a, b, c = input().split()
if int(a) % 2 == 0:
  print("even")
else:
  print("odd")
if int(b) % 2 == 0:
  print("even")
else:
  print("odd")
if int(c) % 2 == 0:
  print("even")
else:
  print("odd")
```

```js
// I/O Template
const [a, b, c] = line.split(" ");
if (+a % 2 === 0) {
  console.log("even");
} else {
  console.log("odd");
}
if (+b % 2 === 0) {
  console.log("even");
} else {
  console.log("odd");
}
if (+c % 2 === 0) {
  console.log("even");
} else {
  console.log("odd");
}
```

* 아직 함수는 사용하지 않기 때문에 단순하게 작성했다.

## 6067

```python
n = int(input())
if n < 0:
  if n % 2 == 0:
    print('A')
  else:
    print('B')
else:
  if n % 2 == 0:
    print('C')
  else:
    print('D')
```

```js
// I/O Template
const n = +line;
if (n < 0){
  if (n % 2 == 0) {
    console.log("A");
  } else {
    console.log("B");
  }
} else {
  if (n % 2 == 0) {
    console.log("C");
  } else {
    console.log("D");
  }
}
```

## 6068

```python
n = int(input())
if n >= 90:
  print('A')
elif n >= 70:
  print('B')
elif n >= 40:
  print('C')
else:
  print('D')
```

```js
// I/O Template
const n = +line;
if (n >= 90) {
  console.log("A");
} else if (n >= 70) {
  console.log("B");
} else if (n >= 40) {
  console.log("C");
} else {
  console.log("D");
}
```

## 6069

```python
c = input()
if c == 'A':
  print('best!!!')
elif c == 'B':
  print('good!!')
elif c == 'C':
  print('run!')
elif c == 'D':
  print('slowly~')
else:
  print('what?')
```

```js
// I/O Template
if (line === "A") {
  console.log("best!!!");
} else if (line === "B") {
  console.log("good!!");
} else if (line === "C") {
  console.log("run!");
} else if (line === "D") {
  console.log("slowly~");
} else {
  console.log("what?");
}
```

## 6070

```python
n = int(input())
y = n // 3
if y == 1:
  print("spring")
elif y == 2:
  print("summer")
elif y == 3:
  print("fall")
else:
  print("winter")
```

```js
// I/O Template
y = Math.floor(+line / 3);
if (y === 1) {
  console.log("spring");
} else if (y === 2) {
  console.log("summer");
} else if (y === 3) {
  console.log("fall");
} else {
  console.log("winter");
}
```

## 6071

```python
while (True):
  n = int(input()) 
  if n == 0:
    break
  print(n)
```

```js
// I/O Template
if (+line === 0) {
  rl.close();
}
console.log(+line);
```

* [do...while](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/do...while) by MDN references

## 6072

```python
n = int(input())
while n > 0:
  print(n)
  n -= 1
```

```js
// I/O Template
n = +line;
while (n > 0) {
  console.log(n);
  n--;
}
```

## 6073

```python
n = int(input())
while n > 0:
  n -= 1
  print(n)
```

```js
// I/O Template
n = +line;
while (n > 0) {
  n--;
  console.log(n);
}
```

## 6074

```python
n = ord(input())
a = ord('a')
while a <= n:
  print(chr(a), end=' ')
  a += 1
print() # 마지막 줄바꿈용
```

```js
// I/O Template
// 1
const n = line.charCodeAt(0);
let a = "a".charCodeAt(0);
while (a <= n) {
  process.stdout.write(String.fromCharCode(a) + " ");
  a++;
}
console.log(); // 마지막 줄바꿈용

// 2
const n = line.charCodeAt(0);
let a = "a".charCodeAt(0);
let word = ""; 
while (a <= n) {
  word = word.concat(String.fromCharCode(a), " ");
  a++;
}
console.log(word);

// Using array
// 출력 마지막에 공백없이 출력할 수 있다.
const n = line.charCodeAt(0);
let a = "a".charCodeAt(0);
const word = []; 
while (a <= n) {
  word.push(String.fromCharCode(a));
  a++;
}
console.log(word.join(" "));
```

* 개행없이 터미널에 출력하고 싶으면 `process.stdout.write()`를 사용한다.
  * [How to print console without trailing newline in Node.js ?](https://www.geeksforgeeks.org/how-to-print-console-without-trailing-newline-in-node-js/) by GeeksforGeeks
  * [Difference between process.stdout.write and console.log in NodeJS](https://www.geeksforgeeks.org/difference-between-process-stdout-write-and-console-log-in-nodejs/) by GeeksforGeeks
* 파이썬처럼 `end`를 지정할 수 있는 것 같지는 않다.

## 6075

```python
n = int(input())
i = 0
while i <= n:
  print(i)
  i += 1
```

```js
// I/O Template
n = +line;
let i = 0;
while (i <= n) {
  console.log(i);
  i++;
}
```

## 6076

```python
n = int(input())
for i in range(n+1):
  print(i)
```

```js
// I/O Template
n = +line;
for (const i of Array(n + 1).keys()) {
  console.log(i);
}
```

* [for...in](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...in) by MDN references
* [Does JavaScript have a method like “range()” to generate a range within the supplied bounds?](https://stackoverflow.com/questions/3895478/does-javascript-have-a-method-like-range-to-generate-a-range-within-the-supp) by Stackoverflow

## 6077

```python
n = int(input())
sum = 0
for i in range(1, n+1):
  if i % 2 == 0:
    sum += i
print(sum)
```

```js
// I/O Template
n = +line;
let sum = 0;
for (const i of [...Array(n).keys()].map((i) => i + 1)) {
  if (i % 2 === 0) {
    sum += i;
  }
}
console.log(sum);
```

* 위처럼 `range()`와 유사하게 작성할 수 있지만 for 문을 이용해서 작성하는 게 더 간단할 것 같다.

## 6078

```python
while True:
  c = input()
  print(c)
  if c == "q":
    break
```

```js
// I/O Template
console.log(line);
if (line === "q") {
  rl.close();
} 
```

## 6079

```python
n = int(input())
s = 0
i = 0
while True:
  s += i
  if s >= n:
    print(i)
    break
  i += 1

# 모범 답안 
n = int(input())
s = 0
t = 0
while s < n :
  t = t + 1
  s = s + t
print(t)
```

```js
// I/O Template
n = +line;
let s = 0;
let i = 0;
while (s < n) {
  i++;
  s += i;
}
console.log(i);
```

## 6080

```python
n, m = input().split()
n = int(n)
m = int(m)
for i in range(1, n+1) :
  for j in range(1, m+1) :
    print(i, j)
```

```js
// I/O Template
const [n, m] = line.split(" ");j
for (let i = 1; i <= +n; i++) {
  for (let j = 1; j <= +m; j++) {
    console.log(i, j);
  }
}

// range와 유사하게
const [n, m] = line.split(" ");
for (const i of [...Array(+n).keys()].map((i) => i + 1)) {
  for (const j of [...Array(+m).keys()].map((i) => i + 1)) {
    console.log(i, j);
  }
}
```

## 6081

```python
h = int(input(), 16)
for i in range(1, int('F', 16) + 1):
  print('{:X}*{:X}={:X}'.format(h, i, h * i))
```

```js
// I/O Template
const h = parseInt(line, 16);
const f = parseInt("F", 16);
for (let i = 1; i <= f; i++) {
  console.log(
    `${h.toString(16).toUpperCase()}*${i.toString(16).toUpperCase()}=${(h * i)
      .toString(16)
      .toUpperCase()}`
  );
}
```

## 6082

```python
n = int(input())
for i in range(1, n + 1):
  m = i % 10
  if m != 0 and m % 3 == 0:
    print("X", end=" ")
  else:
    print(i, end=" ")
print() # 마지막 줄바꿈용

# 모범 답안
n = int(input())

for i in range(1, n+1) :
  if i % 10 == 3 or i % 10 == 6 or i % 10 == 9 :
    print("X", end=' ')
  else :
    print(i, end=' ')
```

```js
// I/O Template
n = +line;
for (let i = 1; i <= n; i++) {
  const m = i % 10;
  if (m !== 0 && m % 3 === 0) {
    process.stdout.write("X ");
  } else {
    process.stdout.write(`${i} `);
  }
}
console.log(); // 마지막 줄바꿈용
```

## 6083

```python
r, g, b = input().split()
r = int(r)
g = int(g)
b = int(b)
for i in range(r):
  for j in range(g):
    for k in range(b):
      print(i, j, k)
print(r * g * b)
```

```js
// I/O Template
const [r, g, b] = line.split(" ");
for (const i of Array(+r).keys()) {
  for (const j of Array(+g).keys()) {
    for (const k of Array(+b).keys()) {
      console.log(i, j, k);
    }
  }
}
console.log(+r * +g * +b);
```

## 6084

```python
h, b, c, s = input().split()
h = int(h)
b = int(b)

print('{:.1f} MB'.format((h * b * c * s) / (8 * 1024 * 1024)))

# 모범 답안
h, b, c, s = input().split()

h = int(h)
b = int(b)
c = int(c)
s = int(s)

print(round(h * b * c * s / 8 / 1024 / 1024, 1), "MB")
```

```js
// I/O Template
const [h, b, c, s] = line.split(" ");
const size = ((+h * +b * +c * +s) / 8 / 1024 / 1024).toFixed(1);

console.log(`${size} MB`);
```

## 6085

```python
w, h, b = input().split()
w = int(w)
h = int(h)
b = int(b)

print('{:.2f} MB'.format((w * h * b) / (8 * 1024 * 1024)))
```

* 6084번 문제의 모범답안처럼 `round()`를 사용하려고 했었는데 자릿수를 늘리는 것은 안 되는 것 같다.

```js
// I/O Template
const [w, h, b] = line.split(" ");
const size = ((+w * +h * +b) / (8 * 1024 * 1024)).toFixed(2);

console.log(`${size} MB`);
```

## 6086

```python
n = int(input())
s = 0
i = 0

while True:
  i += 1
  s += i
  if s >= n:
    print(s)
    break
```

```js
// I/O Template
const n = +line;
let s = 0;
let i = 0;

while (true) {
  i++;
  s += i;
  if (s >= n) {
    console.log(s);
    break;
  }
}
```

## 6087

```python
n = int(input())

for i in range(1, n + 1):
  if (i % 3 != 0):
    print(i, end=" ")
print() # 마지막 줄바꿈용
```

```js
// I/O Template
n = +line;

for (let i = 1; i <= n; i++) {
  if (i % 3 !== 0) {
    process.stdout.write(`${i} `);
  }
}
console.log(); // 마지막 줄바꿈용
```

## 6088

```python
a, d, n = input().split()
a = int(a)
d = int(d)
n = int(n)

for i in range(1, n):
  a += d
print(a)

# 모범 답안
a, d, n = input().split()

a = int(a)
d = int(d)
n = int(n)

s = a
for i in range(2, n + 1):
  s += d

print(s)
```

* 실제로 `a`에 `d`를 처음 합한 수는 두 번째 항이기 때문에 `range` 범위를 2 ~ n으로 잡은 것 같다.

```js
// I/O Template
const [a, d, n] = line.split(" ");
let s = +a;
for (let i = 2; i <= +n; i++) {
  s += +d;
}
console.log(s);
```

## 6089

```python
a, r, n = input().split()
a = int(a)
r = int(r)
n = int(n)

for i in range(2, n + 1):
  a *= r
print(a)
```

* 이번엔 모범답안 `range` 1 ~ n - 1로 잡았네...

```js
// I/O Template
const [a, r, n] = line.split(" ");
let s = +a;
for (let i = 2; i <= +n; i++) {
  s += +r;
}
console.log(s);
```

## 6090

```python
a, m, d, n = input().split()
a = int(a)
m = int(m)
d = int(d)
n = int(n)

for i in range(2, n + 1):
  a = a * m + d
print(a)
```

```js
// I/O Template
const [a, m, d, n] = line.split(" ");
let s = +a;
for (let i = 2; i <= +n; i++) {
  s = s * +m + +d;
}
console.log(s);
```

## 6091

```python
a, b, c = input().split()
a = int(a)
b = int(b)
c = int(c)
i = 1

while True:
  if i % a == 0 and i % b == 0 and i % c == 0:
    print(i)
    break
  i += 1
```

```js
// I/O Template
const [a, b, c] = line.split(" ");
let i = 1;

while (true) {
  if (i % +a === 0 && i % +b === 0 && i % +c === 0) {
    console.log(i);
    break;
  }
  i++;
}
```

## 6092

```python
n = int(input())
w = input().split()
c = [0 for i in range(23)]

for i in range(n):
  num = int(w[i]) - 1
  c[num] += 1

for i in range(23):
  print(c[i], end=" ")

print() # 마지막 줄바꿈용

# 모범 답안
n = int(input())
a = input().split()

for i in range(n) :
  a[i] = int(a[i])

d = []
for i in range(24) :
  d.append(0)

for i in range(n) :
  d[a[i]] += 1

for i in range(1, 24) :
  print(d[i], end=' ')
```

* `split()`의 결과를 변수 한 개로 받으면 구분된 값들의 list로 저장된다.
* [Python – Initialize empty array of given length](https://www.geeksforgeeks.org/python-initialize-empty-array-of-given-length/)

```js
const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];
let i = 0;

rl.on("line", (line) => {
  input[i] = line;
  i++;
  if (i === 2) {
    n = +input[0];
    w = input[1].split(" ");
    c = new Array(23).fill(0);

    for (let j = 0; j < n; j++) {
      c[w[j] - 1] += 1;
    }
    for (let j = 0; j < 23; j++) {
      process.stdout.write(`${c[j]} `);
    }
    console.log(); // 마지막 줄바꿈용
    rl.close();
  }
}).on("close", () => {
  process.exit();
});
```

* [Most efficient way to create a zero filled JavaScript array?](https://stackoverflow.com/questions/1295584/most-efficient-way-to-create-a-zero-filled-javascript-array) by stackoverflow
* [Creating and filling Arrays of arbitrary lengths in JavaScript](https://2ality.com/2018/12/creating-arrays.html) by 2ality
* [Array.prototype.fill()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/fill) by MDN references

## 6093

```python
n = int(input())
w = input().split()

for i in range(n - 1, -1, -1):
  print(int(w[i]), end=" ")
print() # 마지막 줄바꿈용
```

```js
const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];
let i = 0;

rl.on("line", (line) => {
  input[i] = line;
  i++;
  if (i === 2) {
    n = +input[0];
    w = input[1].split(" ");

    for (let j = n - 1; j >= 0; j--) {
      process.stdout.write(`${w[j]} `);
    }
    console.log(); // 마지막 줄바꿈용
    rl.close();
  }
}).on("close", () => {
  process.exit();
});
```

## 6094

```python
n = int(input())
w = input().split()
min = int(w[0])

for i in range(n):
  now = int(w[i])
  if now < min:
    min = now
print(min)
```

```js
const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];
let i = 0;

rl.on("line", (line) => {
  input[i] = line;
  i++;
  if (i === 2) {
    n = +input[0];
    w = input[1].split(" ");
    min = +w[0];

    for (let j = 0; j < n; j++) {
      now = +w[i];
      if (now < min) {
        min = now;
      }
    }
    console.log(min);
    rl.close();
  }
}).on("close", () => {
  process.exit();
});
```

## 6095

```python
n = int(input())
g = [[0 for i in range(19)] for j in range(19)]

for i in range(n):
  x, y = input().split()
  g[int(x) - 1][int(y) - 1] = 1

for i in range(19):
  for j in range(19):
    print(g[i][j], end=" ")
  print()
```

* [Python | Using 2D arrays/lists the right way](https://www.geeksforgeeks.org/python-using-2d-arrays-lists-the-right-way/) by GeeksforGeeks
* [파이썬 2차원 배열 초기화 : 얕은 복사만 조심하면 된다](https://codingdog.tistory.com/entry/파이썬-2차원-배열-초기화-얕은-복사만-조심하면-된다) by 강아지의 코딩공부

```js
const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let g = new Array(19).fill().map(() => Array(19).fill(0)); 
let input = [];
let c = 0;

rl.on("line", (line) => {
  input[c] = line;
  if (c === +input[0]) {
    for (let i = 0; i < +input[0]; i++) {
      const [x, y] = input[i + 1].split(" ");
      g[+x - 1][+y - 1] = 1;
    }

    for (let i = 0; i < 19; i++) {
      for (let j = 0; j < 19; j++) {
        process.stdout.write(`${g[i][j]} `);
      }
      console.log();
    }
    rl.close();
  }
  c++;
}).on("close", () => {
  process.exit();
});
```

* [JavaScript Pitfalls & Tips: 2D Array, Matrix](https://sanori.github.io/2019/05/JavaScript-Pitfalls-Tips-2D-Array-Matrix/) by Sanori's Blog
* 대소비교나 연산 과정에서 자동으로 문자에서 숫자로 변환되는 것 같은데 변환을 명시하는게 좋을지 아니면 자동으로 변환되는 것을 이용하는게 좋을지 모르겠다.
  * e.g. `i < input[0]`이나 `g[x - 1][y - 1]` 으로만 적어도 숫자로 변환해 인식하는 것 같다.

## 6096

```python
g = [[] for i in range(19)]

for i in range(19):
  g[i] = input().split()

for i in range(19):
  for j in range(19):
    g[i][j] = int(g[i][j])

n = int(input())

for i in range(n):
  x, y = input().split()
  # index는 0부터 시작하기 때문
  x = int(x) - 1
  y = int(y) - 1

  for j in range(19):
    if g[x][j] == 0:
      g[x][j] = 1
    else:
      g[x][j] = 0
    
    if g[j][y] == 0:
      g[j][y] = 1
    else:
      g[j][y] = 0

for i in range(19):
  for j in range(19):
    print(g[i][j], end=" ")
  print()
```

```js
const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const g_size = 19;
let g = [[]];
let input = [];
let c = 0;

rl.on("line", (line) => {
  g[c] = line.split(" ");

  if (c >= g_size) {
    new_c = c - g_size;
    input[new_c] = line;
  }

  if (c === +input[0] + g_size) {
    for (let i = 0; i < g_size; i++) {
      for (let j = 0; j < g_size; j++) {
        g[i][j] = +g[i][j];
      }
    }

    for (let i = 0; i < +input[0]; i++) {
      const [x, y] = input[i + 1].split(" ");
      nx = +x - 1;
      ny = +y - 1;

      for (let j = 0; j < g_size; j++) {
        if (g[x][j] === 0) {
          g[x][j] = 1;
        } else {
          g[x][j] = 0;
        }
        if (g[j][y] === 0) {
          g[j][y] = 1;
        } else {
          g[j][y] = 0;
        }
      }
    }

    for (let i = 0; i < g_size; i++) {
      for (let j = 0; j < g_size; j++) {
        process.stdout.write(`${g[i][j]} `);
      }
      console.log();
    }
    rl.close();
  }
  c++;
}).on("close", () => {
  process.exit();
});
```

## 6097

```python
h, w = input().split()
h = int(h)
w = int(w)
g = [[0 for i in range(w)] for j in range(h)]

n = int(input())
for i in range(n):
  l, d, x, y = input().split()
  l = int(l)
  d = int(d)
  x = int(x) - 1
  y = int(y) - 1

  # 가로
  if d == 0:
    for j in range(l):
      g[x][y + j] = 1
  # 세로
  else:
    for j in range(l):
      g[x + j][y] = 1

for i in range(h):
  for j in range(w):
    print(g[i][j], end=" ") 
  print()
```

```js
const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const before_count = 1; // number of row before input count
let size;
let input = [];
let c = 0;

rl.on("line", (line) => {
  if (c < before_count) {
    size = line;
  } else {
    input[c - before_count] = line;
  }

  if (c === +input[0] + before_count) {
    const [h, w] = size.split(" ")
    let g = new Array(+h).fill().map(() => Array(+w).fill(0)); 

    const n = +input[0];
    for (let i = 0; i < n; i++) {
      const [l, d, x, y] = input[i + 1].split(" ");
      nx = +x - 1;
      ny = +y - 1;

      if (+d === 0) {
        for (let j = 0; j < +l; j++) {
          g[nx][ny + j] = 1;
        }
      } else {
        for (let j = 0; j < +l; j++) {
          g[nx + j][ny] = 1;
        }
      }
    }

    for (let i = 0; i < +h; i++) {
      for (let j = 0; j < +w; j++) {
        process.stdout.write(`${g[i][j]} `);
      }
      console.log();
    }
    rl.close();
  }
  c++;
}).on("close", () => {
  process.exit();
});
```

## 6098

```python
m = [[] for i in range(10)]
for i in range(10):
  m[i] = input().split()

for i in range(10):
  for j in range(10):
    m[i][j] = int(m[i][j])

x = 1
y = 1
while True:
  if m[x][y] == 2:
    m[x][y] = 9
    break

  m[x][y] = 9
  if x == 9 or y == 9:
    break

  if m[x][y + 1] == 0 or m[x][y + 1] == 2:
    y += 1
  elif m[x + 1][y] == 0 or m[x + 1][y] == 2:
    x += 1
  else:
    break

for i in range(10):
  for j in range(10):
    print(m[i][j], end=" ")
  print()
```

```js
const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const m_size = 10;
let m = [[]];
let c = 0;

rl.on("line", (line) => {
  m[c] = line.split(" ");

  if (c === m_size - 1) {
    for (let i = 0; i < m_size; i++) {
      for (let j = 0; j < m_size; j++) {
        m[i][j] = +m[i][j];
      }
    }

    let x = 1;
    let y = 1;

    while (true) {
      if (m[x][y] === 2) {
        m[x][y] = 9;
        break;
      }

      m[x][y] = 9;

      if (x === 9 || y === 9) {
        break;
      }

      if (m[x][y + 1] == 0 || m[x][y + 1] == 2) {
        y += 1;
      } else if (m[x + 1][y] == 0 || m[x + 1][y] == 2) {
        x += 1;
      } else {
        break;
      }
    }

    for (let i = 0; i < m_size; i++) {
      for (let j = 0; j < m_size; j++) {
        process.stdout.write(`${m[i][j]} `);
      }
      console.log();
    }
    rl.close();
  }
  c++;
}).on("close", () => {
  process.exit();
});
```
