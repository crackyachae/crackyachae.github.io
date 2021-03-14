---
layout  : wiki
title   : CodeUp_Python 기초 100제 (6001~6098)
summary : 
date    : 2021-02-09 22:49:47 +0900
updated : 2021-03-05 17:56:02 +0900
tag     : 
toc     : true
public  : true
parent  : [[codeup]]
latex   : false
---
* TOC
{:toc}

> [코드업 기초 100제](https://codeup.kr/problemsetsol.php?psid=33)를 자바스크립트(JavaScript)로 작성한 것을 모아놓은 글입니다. 일종의 연습 기록이며 코드업에서 자바스크립트 채점을 지원하고 있지 않아 통과 여부는 결과는 알 수 없습니다. 작성 후 코드업에서 제공하는 다른 언어의 정답을 기반으로 검토 및 수정은 진행할 예정이지만 틀린 부분이 훨씬 많을 수 있기 때문에 혹시라도 참고하실 분들은 정말 가볍게 훑는 수준으로 부탁드립니다. 피드백은 편하신 방법으로 자유롭게 주시면 감사하겠습니다.

## 6001
print( )를 이용해 단어 `Hello` 를 출력해보자.
```python
print("Hello")
```
```js
console.log("Hello");
```
+ [자바스크립트 출력](http://www.tcpschool.com/javascript/js_intro_output)
  + 깔끔하게 터미널 창에 출력하는 경우가 없어서 애매하다. 
  + 예시는 보통 출력없이 함수를 구현하는게 대부분인 것 같다.
  + 가끔 예시중에 `console.log()`를 사용하는 경우가 있고 위 방법중에 가장 깔끔한 것 같아서 `console.log()` 사용.

## 6002
공백( )을 포함한 문장을 출력한다. 문장 `Hello World` 를 출력해보자.

```python
print("Hello World")
```
```js
console.log("Hello World");
```

## 6003
줄을 바꿔 출력하는 출력문을 연습한다. 다음과 같이 줄을 바꾼 문장을 출력해보자.
```
Hello
World
```
```python
# 1
print("Hello")
print("World")

# 2
print("Hello\nWorld")
```
+ 뭐가 더 나은 건지는 모르겠다. 둘 다 모범 소스로 되어있긴 하다.
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
작은따옴표(')(single quotation mark)가 들어있는 출력문을 연습한다. 문장 `'Hello'`를 출력해보자.

```python
print("'Hello'")
```
+ [Single and Double Quotes | Python](https://www.geeksforgeeks.org/single-and-double-quotes-python/) by GeeksforGeeks
  + 문자열을 나타내는데 작은따옴표와 큰따옴표 모두 쓸 수 있으며 쌍으로 인식하기 때문에 문자열 안에 작은따옴표가 들어가면 큰따옴표로 감싸주면 된다.
```js
console.log("'Hello'")
```
## 6005
큰따옴표(")(double quotation mark)가 포함된 출력문을 연습한다. 문장 `"Hello World"`를 출력해보자.

```python
print('"Hello World"')
```
+ backslash escape `\`을 사용하는 것도 모범답안에 있지만, 가독성 면에서는 작은따옴표가 더 좋을 것 같다.
```js
console.log('"Hello World"')
```

## 6006
특수문자를 출력한다. 문장 `"!@#$%^&*()'`를 출력해보자.

```python
print("\"!@#$%^&*()\'")

# 모범 답안 1
print("\"!@#$%^&*()'")

# 모범 답안 2
print('"!@#$%^&*()\'')
```
+ 큰따옴표로 감쌌으니까 작은따옴표 앞에는 backslash 안 붙여도 되는구나.
```js
console.log("\"!@#$%^&*()'")
```

## 6007
윈도우 운영체제의 파일 경로를 출력한다. 파일 경로에는 특수문자들이 포함된다. 다음 경로 `"C:\Download\'hello'.py"`를 출력해보자.

```python
print('"C:\\Download\\\'hello\'.py"')

# 모범 답안
print("\"C:\Download\\\'hello\'.py\"")
```
+ 왜 `C:` 다음에 backslash escape 안 해줘도 되는 거지?
```js
console.log("\"C:\\Download\\\'hello\'.py\"")
```
+ JS는 파이썬 모범답안으로 출력하면 `C:` 다음의 backslash가 제대로 출력되지 않는다.

## 6008
다음과 같은 python프로그램의 소스코드를 출력해보자. `print("Hello\nWorld")`

```python
print('print("Hello\\nWorld")')

# 모범 답안
print("print(\"Hello\\nWorld\")")
```
```js
console.log('print("Hello\\nWorld")')
```

## 6009
변수에 문자 1개를 저장한 후 변수에 저장되어 있는 문자를 그대로 출력해보자.

```python
a = input()
print(a)
```
+ [input()](https://docs.python.org/3/library/functions.html)
+ [Python / input() / 사용자가 입력한 값을 변수에 저장하는 함수](https://www.codingfactory.net/10085) by Coding Factory
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
+ [Window.prompt()](https://developer.mozilla.org/en-US/docs/Web/API/Window/prompt)
  + [“prompt not defined” using node from command line?](https://stackoverflow.com/questions/24291909/prompt-not-defined-using-node-from-command-line) by stackoverflow
  + 웹 브라우저에 포함된 함수이기 때문에 node js 환경에서는 사용불가.
  + 런타임 에러(runtime error)가 발생한다.
+ [[백준/Node.js] Node.js 입력 받기](https://velog.io/@exploit017/백준Node.js-Node.js-입력-받기) by mj.log
+ [Readline](https://nodejs.org/api/readline.html) 이용
  + [readline.createInterface(options)](https://nodejs.org/api/readline.html#readline_readline_createinterface_options)
    + [Readable streams](https://nodejs.org/api/stream.html#stream_readable_streams)
    + [Writable streams](https://nodejs.org/api/stream.html#stream_writable_streams)
  + [Event: line](https://nodejs.org/api/readline.html#readline_event_line)
  + [Node.js 입력 받기](https://wooooooak.github.io/node.js/2018/09/26/Node.js-입력-받기/) by 쾌락코딩
  ```js
  // readline module을 불러온다.
  const readline = require("readline");
  // readline.Interface 인스턴스를 생성한다.
  // 옵션은 input은 stdin(터미널), output은 stdout(터미널)으로 설정.
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  // line event 발생시
  // line event는 input stream이 end-of-line 입력(\n, \r, or \r\n)을 받았을 때 발생한다.
  // 주로 엔터(Enter)나 리턴(Return) 키를 눌렀을 때 발생한다.
  rl.on("line", function(line) {
    // hello ! [입력한 값]을 출력
    console.log("hello !", line);
    // readline interface를 닫음
    rl.close();
  // close event 발생시
  }).on("close", function() {
    // process를 종료
    process.exit();
  });
  ```
+ [fs](https://nodejs.org/api/fs.html) 이용
  + [fs.readFileSync(path[, options])](https://nodejs.org/api/fs.html#fs_fs_readfilesync_path_options)
  + [언어 도움말](https://www.acmicpc.net/help/language) by BAE/\<JOON> ONLINE JUDGE
  + [백준 알고리즘 Node.js 입출력 정리](https://mingcoder.me/2020/01/15/Programming/etc/acmicpc-nodejs-input/) by mingcoder
  ```js
  // fs module을 불러옴
  const fs = require("fs");
  // stdin에서 입력을 받아 string으로 변환한다.
  const input = fs.readFileSync("/dev/stdin").toString() //단어나 문장 단위로 구분할 경우 .split('sep') 이용

  console.log(input);
  ```
  + 이 방법은 터미널에서 제대로 돌아가지 않아서 일단은 사용하지 않는다. 왜인지 알아봐야겠다.


> 이후에 아래의 입출력 코드를 사용하는 코드는 `// I/O Template` 이라고 작성한 뒤, 아래 코드의 `{ Code }` 부분만 작성한다.
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
변수에 정수값을 저장한 후 변수에 저장되어 있는 값을 그대로 출력해보자.

```python
n = int(input())
print(n)
```
+ `input` 함수는 기본적으로 받아오는 값이 문자열이기 때문에 `int()`를 이용해서 정수로 변환해주어야 한다.
```js
const n = +line
console.log(n);
```
+ JS에서 숫자 변환은 `Number()`를 사용해도 되지만 `+` 기호를 이용해서 변환하는 것을 더 자주 사용하는 것 같다.

## 6011
변수에 실수값을 저장한 후 변수에 저장되어 있는 값을 그대로 출력해보자

```python
f = float(input())
print(f)
```
```js
// I/O Template
const n = +line
console.log(n);
```
+ JS 에서는 정수와 실수 모두 `Number`이기 때문에 6010번 문제와 답이 동일하다.

## 6012
정수(integer) 2개를 입력받아 줄을 바꿔 출력해보자.

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
+ 왜 `int`로 변환 안해도 되는 거지?
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
+ 뭔가 엄청 주먹구구로 하는 느낌이다. 일단 파이썬에서도 개수를 2개로 정해서 입력받고 출력하는거니까 아렇게 해도 되곘지.

## 6013
문자(character) 2개를 입력받고, 순서를 바꿔 한 줄씩 출력해보자.

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
실수(real number) 1개를 입력받아 줄을 바꿔 3번 출력해보자.

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
+ 두 번째 것 왜 계속 통과 안되지. 실행시켜보면 잘 되는데.
  + 채점을 python 3.5로 해서 그런 것 같다. 포맷 문자열은 python 3.6부터 사용할 수 있는 기능.
```js
// I/O Template
console.log(line);
console.log(line);
console.log(line);
```

## 6015
공백을 두고 입력된정수(integer) 2개를 입력받아 줄을 바꿔 출력해보자. 

```python
a, b = input().split()
print(a)
print(b)
```
+ [str.split](https://docs.python.org/ko/3/library/stdtypes.html#str.split)
```js
// I/O Template
const [a, b] = line.split(" ");
console.log(+a);
console.log(+b);
```
+ [String.prototype.split()](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/String/split) by MDN references
+ [Destructuring assignment](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment) by MDN references
+ [06. 비구조화 할당 (구조분해) 문법](https://learnjs.vlpt.us/useful/06-destructuring.html) by 벨로퍼트와 함께하는 모던 자바스크립트

## 6016
공백을 두고 문자(character) 2개를 입력받아 순서를 바꿔 출력해보자.

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
정수(integer), 실수, 문자(character), 문자열(string) 등 1개만 입력받아 한 줄로 3번 출력해보자. 

```python
a = input()
print(a, a, a)
```
+ [7.1.3. Manual String Formatting](https://docs.python.org/ko/3/tutorial/inputoutput.html#manual-string-formatting) by Python Tutorial
  + `print()` 함수는 기본적으로 인자(argument) 사이에 공백을 추가한다.
```js
// I/O Template
console.log(line, line, line);
```

## 6018
24시간 시:분 형식으로 시간이 입력될 때, 그대로 출력하는 연습을 해보자.
```python
a, b = input().split(':')
print(a, b, sep=':')
```
+ [input()](https://docs.python.org/3/library/functions.html)
  + 출력하는 인자 사이의 문자를 공백에서 바꾸려면 원하는 문자를 `sep` 값으로 넘겨준다.
```js
// I/O Template
const time = line.split(":");
console.log(time.join(":"));
```
+ [Array.prototype.join()](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/join) by MDN references

## 6019
"연도.월.일"을 입력받아 "일-월-연도" 순서로 바꿔 출력해보자.

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
주민번호를 입력받아 형태를 바꿔 출력해보자.

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
알파벳과 숫자로 이루어진 단어 1개가 입력된다. 5개의 문자로 이루어진 단어를 입력받아 단어의 각 문자를 한 줄에 한 문자씩 분리해 출력해보자.

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
6자리의 연월일(YYMMDD)을 입력받아 나누어 출력해보자.

```python
d = input()
print(d[0:2], d[2:4], d[4:6])
```
+ [Understanding slice notation](https://stackoverflow.com/questions/509211/understanding-slice-notation) by stackoverflow
+ [slice()](https://docs.python.org/3/library/functions.html?highlight=slice#slice)
+ [[Python] 파이썬 슬라이싱(slicing) 기본과 예제](https://twpower.github.io/119-python-list-slicing-examples) by TWpower's Tech Blog
```js
// I/O Template
const y = line.slice(0, 2);
const m = line.slice(2, 4);
const d = line.slice(4, 6);
console.log(y, m, d);
```
+ [Array.prototype.slice()](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/slice)

## 6023
시:분:초 형식으로 시간이 입력될 때 분만 출력해보자.

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
알파벳 문자와 숫자로 이루어진 단어 2개를 입력받아 순서대로 붙여 출력하는 프로그램을 작성해보자.

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
정수 2개를 입력받아 합을 출력하는 프로그램을 작성해보자.

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
실수 2개를 입력받아 합을 출력하는 프로그램을 작성해보자.

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
+ 0.9와 0.1의 합이 1.0이 아니라 1이 나오는데 자릿수를 맞춰주는 메소드는 따로 없는 것 같다.
+ 소수점 아래 부분을 문자열로 받아서 그 길이를 `toFixed()`로 넘기면 될 것 같긴한데 더 간단한 방법이 있나 찾아봐야겠다.

## 6027
10진수를 입력받아 16진수(hexadecimal)로 출력해보자. 소문자 형태 문자열로 출력.

```python
# 1
a = input() 
print('{:x}'.format(int(a)))

# 2
a = input()
hex = format(int(a), 'x')
print(hex)
```
+ [printf-style String Formatting](https://docs.python.org/3/library/stdtypes.html#printf-style-string-formatting)
  + 오래된 문법 이어서 아래의 `str.format`을 사용할 것을 권장하고있다.
+ [str.format](https://docs.python.org/3/library/stdtypes.html#str.format)
  + [Format String Syntax](https://docs.python.org/3/library/string.html#formatstrings)
+ [format()](https://docs.python.org/3/library/functions.html#format)
+ [[파이썬] 2진수, 8진수, 16진수 다루기](https://www.daleseo.com/python-int-bases/) by Dale Seo
```js
// I/O Template
const hex = (+line).toString(16);
console.log(hex);
```
+ [Number.prototype.toString()](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Number/toString) by MDN references

## 6028
10진수를 입력받아 16진수(hexadecimal)로 출력해보자. 대문자 형태 문자열로 출력.

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
16진수를 입력받아 8진수(octal)로 출력해보자.

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
+ [parseInt()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/parseInt) by MDN references

## 6030
영문자 1개를 입력받아 10진수 유니코드(Unicode) 값으로 출력해보자.

```python
n = ord(input())
print(n)
```
+ [ord()](https://docs.python.org/3/library/functions.html#ord)
```js
// I/O Template
const n = line.charCodeAt(0);
console.log(n);
```
+ [String.prototype.charCodeAt()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/charCodeAt)

## 6031
10진 정수 1개를 입력받아 유니코드 문자로 출력해보자.

```python
n = int(input())
print(chr(n))
```
```js
// I/O Template
const c = String.fromCharCode(+line);
console.log(c);
```
+ [String.fromCharCode()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/fromCharCode)

## 6032
정수 1개 입력받아 부호 바꾸기

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
문자 1개를 입력받아 그 다음 문자를 출력해보자. 

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
정수 2개(a, b)를 입력받아 a에서 b를 뺀 차를 출력하는 프로그램을 작성해보자. 

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
실수 2개(f1, f2)를 입력받아 곱을 출력하는 프로그램을 작성해보자.

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
단어와 반복 횟수를 입력받아 여러 번 출력해보자.

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
+ [String.prototype.concat()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/concat) by MDN references

## 6037
반복 횟수와 문장을 입력받아 여러 번 출력해보자.

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
정수 2개(a, b)를 입력받아 a를 b번 곱한 거듭제곱을 출력하는 프로그램을 작성해보자.

```python
a, b = input().split()
print(int(a)**int(b))
```
+ [Numeric Types](https://docs.python.org/3/library/stdtypes.html#numeric-types-int-float-complex)
```js
// I/O Template
const [a, b] = line.split(" ");
console.log(+a ** +b)
```
+ [Exponentiation (**)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Exponentiation) by MDN references

## 6039
실수 2개(f1, f2)를 입력받아 f1을 f2번 거듭제곱한 값을 출력하는 프로그램을 작성해보자.

```python
a, b = input().split()
print(float(a)**(float(b)))
```
```js
// I/O Template
const [a, b] = line.split(" ");
console.log(+a ** +b)
```
+ 6038번 문제와 동일

## 6040
정수 2개(a, b) 를 입력받아 a를 b로 나눈 몫을 출력해보자.

```python
a, b = input().split()
print(int(a) // int(b))
```
+ [// floor division](https://python-reference.readthedocs.io/en/latest/docs/operators/floor_division.html) by Python Reference
+ [Floor Division](https://www.educative.io/edpresso/floor-division) by Edpresso
```js
// I/O Template
const [a, b] = line.split(" ");
const div = Math.floor(+a / +b);
console.log(div);
```
+ [Division](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Division)
+ [Math.floor()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/floor)

## 6041
정수 2개(a, b) 를 입력받아 a를 b로 나눈 나머지를 출력해보자.

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
실수 1개를 입력받아 소숫점 이하 두 번째 자리까지의 정확도로 반올림한 값을 출력해보자.

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
실수 2개(f1, f2)를 입력받아 f1 을 f2 로 나눈 값을 출력해보자. 이 때 소숫점 넷째자리에서 반올림하여 무조건 소숫점 셋째 자리까지 출력한다.

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
정수 2개(a, b)를 입력받아 합, 차, 곱, 몫, 나머지, 나눈 값을 자동으로 계산해보자. (단 0 <= a, b <= 2147483647, b는 0이 아니다.)
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
정수 3개를 입력받아 합과 평균을 출력해보자. 단, -2147483648 ~ +2147483647.

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
정수 1개를 입력받아 2배 곱해 출력해보자. 

```python
n = int(input())
print(n << 1)
```
```js
// I/O Template
const n = +line;
console.log(n << 1);
```
+ [Left shift (<<)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Left_shift) by MDN References

## 6047
정수 2개(a, b)를 입력받아 a를 $2^b$배 곱한 값으로 출력해보자. $0\le a \le 10, 0 \le b \le 10$

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
두 정수(a, b)를 입력받아 a가 b보다 작으면 True 를, a가 b보다 크거나 같으면 False 를 출력하는 프로그램을 작성해보자.

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
+ JS의 `true`와 `false` 키워드는 첫 글자도 소문자이기 때문에 모범답안과 같은 방식으로 작성하면 `true`, `false`가 출력된다.

## 6049
두 정수(a, b)를 입력받아 a와 b의 값이 같으면 True 를, 같지 않으면 False 를 출력하는 프로그램을 작성해보자.

```python
a, b = input().split()
print(int(a) == int(b))
```
```js
// I/O Template
const [a, b] = line.split(" ");
console.log(+a === +b);
```
+ [Strict equality (===)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Strict_equality) by MDN references

## 6050
두 정수(a, b)를 입력받아 b의 값이 a의 값 보다 크거나 같으면 True 를, 같지 않으면 False 를 출력하는 프로그램을 작성해보자.
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
두 정수(a, b)를 입력받아 a의 값이 b의 값과 서로 다르면 True 를, 같으면 False 를 출력하는 프로그램을 작성해보자.

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
정수가 입력되었을 때, True/False 로 평가해주는 프로그램을 작성해보자.

```python
n = int(input())
print(bool(n))
```
```js
// I/O Template
const n = +line;
console.log(Boolean(n));
```
+ `!!`를 사용해서 boolean으로 바꿀 수도 있다.
  + [2 Ways to Convert Values to Boolean in JavaScript](https://www.samanthaming.com/tidbits/19-2-ways-to-convert-to-boolean/)

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
+ [Logical NOT (!)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_NOT) by MDN references

## 6054
2개의 정수값이 입력될 때, 그 불 값이 모두 True 일 때에만 True 를 출력하는 프로그램을 작성해보자. 

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
+ [Logical AND (&&)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_AND) by MDN references

## 6055
2개의 정수값이 입력될 때, 그 불 값이 하나라도 True 일 때에만 True 를 출력하는 프로그램을 작성해보자.

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
+ [Logical OR (||)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_OR) by MDN references

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
2개의 정수값이 입력될 때, 그 불 값(True/False) 이 서로 같을 때에만 True 를 출력하는 프로그램을 작성해보자.

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
2개의 정수값이 입력될 때, 그 불 값(True/False) 이 모두 False 일 때에만 True 를 출력하는 프로그램을 작성해보자.

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
입력 된 정수를 비트단위로 참/거짓을 바꾼 후 정수로 출력해보자.

```python
n = int(input())
print(~n)
```
```js
// I/O Template
n = +line;
console.log(~n);
```
+ [Bitwise NOT (~)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Bitwise_NOT)

## 6060
입력된 정수 두 개를 비트단위로 and 연산한 후 그 결과를 정수로 출력해보자.

```python
a, b = input().split()
print(int(a) & int(b))
```
```js
// I/O Template
const [a, b] = line.split(" ");
console.log(+a & +b);
```
+ [Bitwise AND (&)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Bitwise_AND)

## 6061
입력된 정수 두 개를 비트단위로 or 연산한 후 그 결과를 정수로 출력해보자.

```python
a, b = input().split()
print(int(a) | int(b))
```
```js
// I/O Template
const [a, b] = line.split(" ");
console.log(+a | +b);
```
+ [Bitwise OR (|)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Bitwise_OR)

## 6062
입력된 정수 두 개를 비트단위로 xor 연산한 후 그 결과를 정수로 출력해보자.

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
입력된 두 정수(a, b) 중 큰 값을 출력하는 프로그램을 작성해보자. 단, 3항 연산을 사용한다.

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
+ [Conditional (ternary) operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_Operator) by MDN references

## 6064
입력된 세 정수 a, b, c 중 가장 작은 값을 출력하는 프로그램을 작성해보자. 단, 3항 연산을 사용한다.

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
3개의 정수(a, b, c)가 입력되었을 때, 짝수만 출력해보자.

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
3개의 정수(a, b, c)가 입력되었을 때, 짝(even)/홀(odd)을 출력해보자.

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
+ 아직 함수는 사용하지 않기 때문에 단순하게 작성.

## 6067
0이 아닌 정수 1개가 입력되었을 때, 음(-)/양(+)과 짝(even)/홀(odd)을 구분해 분류해보자. 
|||
|---|---|
| 음수이면서 짝수이면 | A |
| 음수이면서 홀수이면 | B |
| 양수이면서 짝수이면 | C |
| 양수이면서 홀수이면 | D |

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
점수(정수, 0 ~ 100)를 입력받아 평가를 출력해보자. 

평가 기준
| 점수 범위 | 평가 |
|---|---|
| 90 ~ 100 | A |
| 70 ~   89 | B |
| 40 ~   69 | C |
| 0 ~   39 | D |

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
평가를 문자(A, B, C, D, ...)로 입력받아 내용을 다르게 출력해보자. 

평가 내용
| 평가 | 내용 |
| --- | --- |
| A | best!!! |
| B | good!! |
| C | run! |
| D | slowly~ |
| 나머지 문자들 | what?  |

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
월이 입력될 때 계절 이름이 출력되도록 해보자. 

| 월 | 계절 이름 |
| --- | --- |
| 12, 1, 2 | winter |
| 3, 4, 5 | spring |
| 6, 7, 8 | summer |
| 9, 10, 11 | fall  |

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
임의의 정수가 줄을 바꿔 계속 입력된다. -2147483648 ~ +2147483647, 단 개수는 알 수 없다.

0이 아니면 입력된 정수를 출력하고, 0이 입력되면 출력을 중단해보자

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
+ [do...while](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/do...while)

## 6072
정수(1 ~ 100) 1개가 입력되었을 때 카운트다운을 출력해보자.

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
정수(1 ~ 100) 1개가 입력되었을 때 카운트다운을 출력해보자. 

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
영문 소문자(a ~ z) 1개가 입력되었을 때, a부터 그 문자까지의 알파벳을 순서대로 출력해보자. 

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
+ [How to print console without trailing newline in Node.js ?](https://www.geeksforgeeks.org/how-to-print-console-without-trailing-newline-in-node-js/) by GeeksforGeeks
  + 개행없이 터미널에 출력하고 싶으면 `process.stdout.write()`를 사용한다.
  + 파이썬처럼 `end`를 지정할 수 있는 것 같지는 않다.
+ [Difference between process.stdout.write and console.log in NodeJS](https://www.geeksforgeeks.org/difference-between-process-stdout-write-and-console-log-in-nodejs/)

## 6075
정수(0 ~ 100) 1개를 입력받아 0부터 그 수까지 순서대로 출력해보자.

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
정수(0 ~ 100) 1개를 입력받아 0부터 그 수까지 순서대로 출력해보자. (for문 사용)

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
+ [for...in](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...in) by MDN references
+ [Does JavaScript have a method like “range()” to generate a range within the supplied bounds?](https://stackoverflow.com/questions/3895478/does-javascript-have-a-method-like-range-to-generate-a-range-within-the-supp) by Stackoverflow

## 6077
정수(1 ~ 100) 1개를 입력받아 1부터 그 수까지 짝수의 합을 구해보자.

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
+ `range()`와 유사하게 하면 이렇게 되긴 하는데 차라리 일반적으로 하는게 더 간단할 것 같기도하다.

## 6078
영문 소문자 'q'가 입력될 때까지 입력한 문자를 계속 출력하는 프로그램을 작성해보자. 

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
1, 2, 3 ... 을 계속 더해 나갈 때, 그 합이 입력한 정수(0 ~ 1000)보다 같거나 작을 때까지만 계속 더하는 프로그램을 작성해보자.

즉, 1부터 n까지 정수를 계속 더해 나간다고 할 때, 어디까지 더해야 입력한 수보다 같거나 커지는 지를 알아보고자하는 문제이다. 

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
1부터 n까지, 1부터 m까지 숫자가 적힌 서로 다른 주사위 2개를 던졌을 때, 나올 수 있는 모든 경우를 출력해보자.

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
A, B, C, D, E, F 중 하나가 입력될 때, 1부터 F까지 곱한 16진수 구구단의 내용을 출력해보자.

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
3 6 9 게임의 왕이 되기 위한 369 마스터 프로그램을 작성해 보자. 

30 보다 작은 정수 1개가 입력된다. 1 부터 그 수까지 순서대로 공백을 두고 수를 출력하는데, 3 또는 6 또는 9가 포함 되어있는 수인 경우, 그 수 대신 영문 대문자 X 를 출력한다. 

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
빨강(r), 초록(g), 파랑(b) 각 빛의 가짓수가 주어질 때, 주어진 rgb 빛들을 섞어 만들 수 있는 모든 경우의 조합(r g b)과 만들 수 있는 색의 가짓 수를 계산해보자.   

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
필요한 저장 용량을 계산하는 프로그램을 작성해보자.

h, b, c, s 가 공백을 두고 입력된다. h는 48,000이하, b는 32이하(단, 8의배수), c는 5이하, s는 6,000이하의 자연수이다. 필요한 저장 공간을 MB 단위로 바꾸어 출력한다. 단, 소수점 첫째 자리까지의 정확도로 출력하고 MB를 공백을 두고 출력한다. 

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
이미지의 가로 해상도 w, 세로 해상도 h, 한 픽셀을 저장하기 위한 비트 b 가 주어질 때, 압축하지 않고 저장하기 위해 필요한 저장 용량을 계산하는 프로그램을 작성해 보자.

w, h, b 가 공백을 두고 입력된다. 단, w, h는 모두 정수이고 1~1024 이다. b는 40이하의 4의 배수이다. 필요한 저장 공간을 MB 단위로 바꾸어 출력한다. 단, 소수점 셋째 자리에서 반올림하여 둘째 자리까지 출력한다.

```python
w, h, b = input().split()
w = int(w)
h = int(h)
b = int(b)

print('{:.2f} MB'.format((w * h * b) / (8 * 1024 * 1024)))
```
+ 위의 모범답안과 동일하게 `round()`를 사용하려고 했었는데 자리수를 늘리는 것은 안되는 것 같다.
```js
// I/O Template
const [w, h, b] = line.split(" ");
const size = ((+w * +h * +b) / (8 * 1024 * 1024)).toFixed(2);

console.log(`${size} MB`);
```

## 6086
1, 2, 3 ... 을 순서대로 계속 더해 합을 만드는데, 그 합이 입력한 정수보다 작을 동안만 계속 더하는 프로그램을 작성해보자.

즉, 1부터 n까지 정수를 하나씩 더해 합을 만드는데, 어디까지 더해야 입력한 수보다 같거나 커지는지 알아보고자 하는 문제이다. 하지만, 이번에는 그 때 까지의 합을 출력해야 한다.

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
1부터 입력한 정수까지 1씩 증가시켜 출력하는 프로그램을 작성하되, 3의 배수인 경우는 출력하지 않도록 만들어보자.

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
시작 값(a), 등차(d), 몇 번째인지를 나타내는 정수(n)가 입력될 때 n번째 수를 출력하는 프로그램을 만들어보자.

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
+ 실제로 `a`에 `d`를 처음 합한 수는 2번째 항이기 때문에 `range` 범위를 2 ~ n으로 잡은 것 같다.
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
시작 값(a), 등비(r), 몇 번째인지를 나타내는 정수(n)가 입력될 때 n번째 수를 출력하는 프로그램을 만들어보자.

```python
a, r, n = input().split()
a = int(a)
r = int(r)
n = int(n)

for i in range(2, n + 1):
  a *= r
print(a)
```
+ 이번엔 모범답안 `range` 1 ~ n - 1로 잡았네...
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
시작 값(a), 곱할 값(m), 더할 값(d), 몇 번째인지를 나타내는 정수(n)가 입력될 때, n번째 수를 출력하는 프로그램을 만들어보자.

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
같은 날 동시에 가입한 3명의 사람들이 온라인 채점시스템에 들어와 문제를 푸는 날짜가 매우 규칙적이라고 할 때, 다시 모두 함께 문제를 풀게 되는 그날은 언제일까?

같은 날 동시에 가입한 인원 3명이 규칙적으로 방문하는, 방문 주기가 공백을 두고 입력된다. (단, 입력값은 100이하의 자연수이다.) 3명이 다시 모두 함께 방문해 문제를 풀어보는 날(동시 가입/등업 후 며칠 후?)을 출력한다.

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
출석 번호를 n번 무작위로 불렀을 때, 각 번호(1 ~ 23)가 불린 횟수를 각각 출력해보자. 

첫 번째 줄에 출석 번호를 부른 횟수인 정수 n이 입력된다. (1 ~ 10000) 두 번째 줄에는 무작위로 부른 n개의 번호(1 ~ 23)가 공백을 두고 순서대로 입력된다. 1번부터 번호가 불린 횟수를 순서대로 공백으로 구분하여 한 줄로 출력한다. 

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
+ `split()`의 결과를 변수 한 개로 받으면 구분된 값들의 list로 저장된다.
+ [Python – Initialize empty array of given length](https://www.geeksforgeeks.org/python-initialize-empty-array-of-given-length/)
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
+ [Most efficient way to create a zero filled JavaScript array?](https://stackoverflow.com/questions/1295584/most-efficient-way-to-create-a-zero-filled-javascript-array) by stackoverflow
+ [Creating and filling Arrays of arbitrary lengths in JavaScript](https://2ality.com/2018/12/creating-arrays.html) by 2ality
+ [Array.prototype.fill()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/fill) by MDN references

## 6093
출석 번호를 n번 무작위로 불렀을 때, 부른 번호를 거꾸로 출력해 보자.

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
출석 번호를 n번 무작위로 불렀을 때, 가장 빠른 번호를 출력해 보자.

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
바둑판(19 * 19)에 n개의 흰 돌을 놓는다고 할 때, n개의 흰 돌이 놓인 위치를 출력하는 프로그램을 작성해보자.

바둑판에 올려 놓을 흰 돌의 개수(n)가 첫 줄에 입력된다. 둘째 줄 부터 n+1 번째 줄까지 힌 돌을 놓을 좌표(x, y)가 n줄 입력된다. n은 10이하의 자연수이고 x, y 좌표는 1 ~ 19 까지이며, 똑같은 좌표는 입력되지 않는다. 흰 돌이 올려진 바둑판의 상황을 출력한다. 흰 돌이 있는 위치는 1, 없는 곳은 0으로 출력한다. 

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
+ [Python | Using 2D arrays/lists the right way](https://www.geeksforgeeks.org/python-using-2d-arrays-lists-the-right-way/) by GeeksforGeeks
+ [파이썬 2차원 배열 초기화 : 얕은 복사만 조심하면 된다](https://codingdog.tistory.com/entry/파이썬-2차원-배열-초기화-얕은-복사만-조심하면-된다) by 강아지의 코딩공부
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
+ [JavaScript Pitfalls & Tips: 2D Array, Matrix](https://sanori.github.io/2019/05/JavaScript-Pitfalls-Tips-2D-Array-Matrix/) by Sanori's Blog
+ 대소비교나 연산 과정에서 자동으로 문자에서 숫자로 변환되는 것 같은데 변환을 명시하는게 좋을지 아니면 자동으로 변환되는 것을 이용하는게 좋을지 모르겠다.
  + e. g., `i < input[0]`이나 `g[x - 1][y - 1]` 으로만 적어도 숫자로 변환해 인식하는 것 같다.

## 6096
십자 뒤집기는 그 위치에 있는 모든 가로줄 돌의 색을 반대(1->0, 0->1)로 바꾼 후, 다시 그 위치에 있는 모든 세로줄 돌의 색을 반대로 바꾸는 것이다. 어떤 위치를 골라 집자 뒤집기를 하면, 그 위치를 제외한 가로줄과 세로줄의 색이 모두 반대로 바뀐다. 

바둑판(19 * 19)에 흰 돌(1) 또는 검정 돌(0)이 모두 꽉 채워져 놓여있을 때, n개의 좌표를 입력받아 십(+)자 뒤집기한 결과를 출력하는 프로그램을 작성해보자.

바둑알이 깔려 있는 상황이 19 * 19 크기의 정수값으로 입력된다. 십자 뒤집기 횟수(n)가 입력된다. 십자 뒤집기 좌표가 횟수(n) 만큼 입력된다. 단, n은 10이하의 자연수이다. 

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
격자판을 채운 막대의 모양을 출력하는 프로그램을 만들어보자.

첫 줄에 격자판의 세로(h), 가로(w) 가 공백을 두고 입력되고, 두 번째 줄에 놓을 수 있는 막대의 개수(n), 세 번째 줄부터 각 막대의 길이(l), 방향(d), 좌표(x, y)가 입력된다. 모든 막대를 놓은 격자판의 상태를 출력한다. 막대에 의해 가려진 경우 1, 아닌 경우 0으로 출력한다. 단, 각 숫자는 공백으로 구분하여 출력한다. 

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
미로 상자에 넣은 개미는 먹이를 찾았거나, 더 이상 움직일 수 없을 때까지 오른쪽 또는 아래쪽으로만 움직였다.

미로 상자의 구조가 0(갈 수 있는 곳), 1(벽 또는 장애물)로 주어지고, 먹이가 2로 주어질 때, 성실한 개미의 이동 경로를 예상해보자.

단, 맨 아래의 가장 오른쪽에 도착한 경우, 더 이상 움직일 수 없는 경우, 먹이를 찾은 경우에는 더이상 이동하지 않고 그 곳에 머무른다고 가정한다. 미로 상자의 테두리는 모두 벽으로 되어 있으며, 개미집은 반드시 (2, 2)에 존재하기 때문에 개미는 (2, 2)에서 출발한다. 

10*10 크기의 미로 상자의 구조와 먹이의 위치가 입력된다. 성실한 개미가 이동한 경로를 9로 표시해 출력한다. 

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