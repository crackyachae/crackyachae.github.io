---
layout  : article
title   : Chapter 09. 해시 테이블(Hash Table)
summary : 
date    : 2021-04-21 14:46:31 +0900
updated : 2021-04-21 23:04:03 +0900
tag     : 
toc     : true
public  : true
parent  : [[fc-algo-data-sructure]]
latex   : false
---
* TOC
{:toc}

> 이 글은 패스트 캠퍼스 [기술면접 완전 정복 올인원 패키지 Online](https://fastcampus.co.kr/dev_online_algo) 'Chapter 09. 해시 테이블(Hash Table)'의 강의내용을 정리하기 위해 강의 자료를 기반으로 작성한 글입니다.
>
> 강의 노트는 강의 구매자에게만 제공되는 자료이긴 하지만 잔재미 코딩의 [7. 대표적인 자료구조: 해쉬 테이블 (Hash Table)](https://www.fun-coding.org/Chapter09-hashtable-live.html)에서 동일한 자료를 제공하고 있기 때문에 해당 자료를 기반으로 정리한 글을 작성해서 올립니다. 혹시 문제가 되는 경우 바로 내릴 예정이니 알려주시면 감사하겠습니다.
>
> 내용을 이해하기 위한 개인적인 설명이나 해석이 있을 수 있기 때문에 되도록 원문을 참고해주시길 바랍니다.
> 잘못된 부분이 있다면 댓글이나 그 외 편하신 방법으로 알려주시면 감사하겠습니다.

## 1. 해시 구조

* Hash Table: 키(Key)에 데이터(Value)를 저장하는 데이터 구조
    * Key를 통해 바로 데이터를 받아올 수 있으므로, 속도가 획기적으로 빨라짐
    * 파이썬 딕셔너리(Dictionary) 타입이 해시 테이블의 예: Key를 가지고 바로 데이터(Value)를 꺼냄
    * 보통 배열로 미리 Hash Table 사이즈만큼 생성 후에 사용 (공간과 탐색 시간을 맞바꾸는 기법)
    * 단, 파이썬에서는 해시를 별도 구현할 이유가 없음 - 딕셔너리 타입을 사용하면 됨

## 2. 알아둘 용어

| 용어 | 설명 |
| --- | --- |
| 해시(Hash) | 임의 값을 고정 길이로 변환하는 것 |
| 해시 테이블(Hash Table) | key 값의 연산에 의해 직접 접근이 가능한 데이터 구조 |
| 해싱 함수(Hashing Function) | Key에 대해 산술 연산을 이용해 데이터 위치를 찾을 수 있는 함수 |
| 해시 값(Hash Value) <br> 해쉬 주소(Hash Address) | Key를 해싱 함수로 연산해서, 해쉬 값을 알아내고, 이를 기반으로 해쉬 테이블에서 해당 key에 대한 데이터 위치를 일관성 있게 찾을 수 있음 |
| 슬롯(Slot) | 한 개의 데이터를 저장할 수 있는 공간 |

* 저장할 데이터에 대해 key를 추출할 수 있는 별도 함수도 존재할 수 있음

## 3. 간단한 해시 예

### 3.1. hash table 만들기

참고: 파이썬 list comprehension - https://www.fun-coding.org/PL&OOP5-2.html

```python
hash_table = list([0 for i in range(10)])
hash_table # [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
```

### 3.2. 이번엔 초간단 해시 함수를 만들어봅니다

다양한 해시 함수 고안 기법이 있으며, 가장 간단한 방식이 Division 법 (나누기를 통한 나머지 값을 사용하는 기법)

```python
def hash_func(key):
    # 5로 나눈 나머지를 반환한다.
    # key 값에 상관 없이 고정된 길이로 나온다.
    return key % 5
```

### 3.3. 해시 테이블에 저장해보겠습니다

데이터에 따라 필요하면 key 생성 방법 정의가 필요함

```python
data1 = 'Andy'
data2 = 'Dave'
data3 = 'Trump'
data4 = 'Anthor'

# 각 데이터 첫 글자의 아스키코드를 key로 사용한다.
# ord(): 문자의 ASCII(아스키)코드 반환
print (ord(data1[0]), ord(data2[0]), ord(data3[0])) # 65 68 84
# hash_func의 key로 ord(data1[0])을 넣어준다.
print (ord(data1[0]), hash_func(ord(data1[0]))) # 65 0
print (ord(data1[0]), ord(data4[0])) # 65 65
```

#### 3.3.2. 해시 테이블에 값 저장 예

`data:value` 와 같이 data와 value를 넣으면, 해당 data에 대한 key를 찾아서, 해당 key에 대응하는 해시주소에 value를 저장하는 예

```python
def storage_data(data, value):
    # 받아온 datadml 첫 글자를 아스키코드로 변환한 뒤
    key = ord(data[0])
    # 이를 5로 나눈 나머지를 hash_address에 저장한다.
    hash_address = hash_func(key)
    # hash_table의 인덱스가 hash_address인 곳에 value를 입력한다.
    hash_table[hash_address] = value
```

### 3.4. 해시 테이블에서 특정 주소의 데이터를 가져오는 함수도 만들어봅니다

```python
# 데이터를 hash_table에 저장한다.
storage_data('Andy', '01055553333') # key: 65, address: 0
storage_data('Dave', '01044443333') # key: 68, address: 3
storage_data('Trump', '01022223333') # key: 84, address: 4
```

### 3.5. 실제 데이터를 저장하고, 읽어보겠습니다

```python
def get_data(data):
    # 받아온 data로 key를 구해서
    key = ord(data[0])
    # hash_address를 구한 뒤
    hash_address = hash_func(key)
    # hash_table의 그 위치의 값을 출력한다.
    return hash_table[hash_address]

# 테스트
get_data('Andy') # '01055553333'
```

## 4. 자료 구조 해시 테이블의 장단점과 주요 용도

### 장점

* 데이터 저장/읽기 속도가 빠르다. (검색 속도가 빠르다)
* 해시는 키에 대한 데이터가 있는지(중복) 확인이 쉬움

### 단점

* 일반적으로 저장공간이 좀 더 많이 필요하다.
    * 중복을 피하기 위해 충분한 저장공간을 만들어야 한다.
* 여러 키에 해당하는 주소가 동일할 경우 충돌을 해결하기 위한 별도 자료구조가 필요함
    * e.g., Andy와 Anthor은 동일한 key (i.e., 65)를 갖는다.

### 주요 용도

* 검색이 많이 필요한 경우
* 저장, 삭제, 읽기가 빈번한 경우
* 캐시 구현 시 (중복 확인이 쉽기 때문)

## 5. 프로그래밍 연습

### 연습 1: 리스트 변수를 활용해서 해시 테이블 구현해보기

1. 해시 함수: key % 8
2. 해시 키 생성: hash(data)
    * 파이썬에서 지원하는 내장 함수로 고정된 길이의 값을 반환해준다.

```python
hash_table = list([0 for i in range(8)])

def get_key(data):
    return hash(data)

def hash_function(key):
    return key % 8

def save_data(data, value):
    hash_address = hash_function(get_key(data))
    hash_table[hash_address] = value

def read_data(data):
    hash_address = hash_function(get_key(data))
    return hash_table[hash_address]

# 테스트
save_data('Dave', '0102030200')
save_data('Andy', '01033232200')

read_data('Dave') # '0102030200'

hash_table # ['0102030200', 0, 0, 0, 0, 0, 0, '01033232200']
```

## 6. 충돌(Collision) 해결 알고리즘 (좋은 해시 함수 사용하기)

해시 테이블의 가장 큰 문제는 충돌(Collision)의 경우입니다. 이 문제를 충돌(Collision) 또는 해쉬 충돌(Hash Collision)이라고 부릅니다.

### 6.1. Chaining 기법

개방 해싱 또는 Open Hashing 기법의 하나: 해시 테이블 저장공간 외의 공간을 활용하는 기법
충돌이 일어나면, 링크드 리스트라는 자료 구조를 사용해서, 링크드 리스트로 데이터를 추가로 뒤에 연결해서 저장하는 기법

### 연습 2: 연습 1의 해시 테이블 코드에 Chaining 기법으로 충돌 해결 코드를 추가해보기

1. 해시 함수: key % 8
2. 해시 키 생성: hash(data)

```python
hash_table = list([0 for i in range(8)])

def get_key(data):
    return hash(data)

def hash_function(key):
    return key % 8

def save_data(data, value):
    # 중복을 확인하기 위해 hash의 key를 별도로 저장한다.
    index_key = get_key(data)
    hash_address = hash_function(index_key)
    # 해당 주소의 값이 0이 아니면
    # hash_table을 처음에 0으로 초기화 했기 때문에 값이 존재하는지를 확인하는 것이다.
    # 입력한 값 중에 0이 없다고 가정한다.
    if hash_table[hash_address] != 0:
        # 링크드 리스트를 따로 구현하지 않고 파이썬의 리스트를 사용한다.
        # 각 hash_address마다 파이썬 리스트를 저장한다.
        # 리스트의 인덱스마다
        for index in range(len(hash_table[hash_address])):
            # 그 인덱스의 원소([index_key, value])에 대하여
            # 첫 번째 값(i.e., key)이 위에서 받은 key와 같으면
            if hash_table[hash_address][index][0] == index_key:
                # 그 옆에 받은 value를 대입한다.
                hash_table[hash_address][index][1] = value
                return
        # 중복되는 값이 없으면 리스트에 새로운 원소를 추가한다.
        hash_table[hash_address].append([index_key, value])
    # 아직 데이터가 없으면
    else:
        # [index_key, value] 원소를 갖는 '리스트'를 새로 생성한다.
        hash_table[hash_address] = [[index_key, value]]

def read_data(data):
    index_key = get_key(data)
    hash_address = hash_function(index_key)

    # 해당 주소에 입력된 값이 존재하면 
    if hash_table[hash_address] != 0:
        # 그곳에 저장된 리스트의 원소에 대해
        for index in range(len(hash_table[hash_address])):
            # 일치하는 key가 있다면
            if hash_table[hash_address][index][0] == index_key:
                # 그 값을 반환한다.
                return hash_table[hash_address][index][1]
        # 그 외는 일치하는 값이 없는 것이기 때문에 None을 반환한다.
        return None
    else:
        return None

# 테스트
print (hash('Dave') % 8) # 0
print (hash('Dd') % 8) # 2
print (hash('Data') % 8) # 2, Dd와 Data는 충돌한다.

save_data('Dd', '1201023010')
save_data('Data', '3301023010')
read_data('Dd') # '1201023010'

hash_table

# 출력 결과
# [0,
#  0,
#  [[1341610532875195530, '1201023010'], [-9031202661634252870, '3301023010']],
#  0,
#  0,
#  0,
#  0,
#  0]
```

### 6.2. Linear Probing 기법

* 폐쇄 해싱 또는 Close Hashing 기법의 하나: 해시 테이블 저장공간 안에서 충돌 문제를 해결하는 기법
* 충돌이 일어나면, 해당 hash address의 다음 address부터 맨 처음 나오는 빈 공간에 저장하는 기법
* 저장공간 활용도를 높이기 위한 기법

### 연습 3: 연습 1의 해시 테이블 코드에 Linear Probling 기법으로 충돌 해결 코드를 추가해보기

1. 해시 함수: key % 8
2. 해시 키 생성: hash(data)

```python
hash_table = list([0 for i in range(8)])

def get_key(data):
    return hash(data)

def hash_function(key):
    return key % 8

def save_data(data, value):
    index_key = get_key(data)
    hash_address = hash_function(index_key)
    # 해당 주소에 입력된 값이 존재하면 
    if hash_table[hash_address] != 0:
        # 현재 주소에서 hash_table의 마지막 인덱스까지 순회하면서
        for index in range(hash_address, len(hash_table)):
            # 인덱스에 해당하는 원솟값이 0이라면
            if hash_table[index] == 0:
                # 입력받은 값을 [index_key, value] 형태로 그곳에 저장한다.
                hash_table[index] = [index_key, value]
                return
            # 인덱스에 해당하는 원소의 key 값이 받아온 값과 동일하면,
            elif hash_table[index][0] == index_key:
                # 그 원소의 value 값을 받아온 값으로 업데이트한다.
                hash_table[index][1] = value
                return
    # 존재하지 않으면
    else:
        # 바로 받아온 값을 [index_key, value] 형태로 그곳에 저장한다.
        hash_table[hash_address] = [index_key, value]

def read_data(data):
    index_key = get_key(data)
    hash_address = hash_function(index_key)

    # 해당 주소에 입력된 값이 존재하면
    if hash_table[hash_address] != 0:
        # 그 주소부터 hash_table의 마지막 인덱스까지 순회하면서
        for index in range(hash_address, len(hash_table)):
            # 인덱스에 해당하는 원소의 값이 0이면
            # 받아온 값이 저장된 적이 없다는 것을 의미하기 때문에
            if hash_table[index] == 0:
                # None을 반환한다.
                return None
            # 인덱스에 해당하는 원소의 key 값이 받아온 값과 동일하면,
            elif hash_table[index][0] == index_key:
                # 그 원소의 value 값을 반환한다.
                return hash_table[index][1]
    # 존재하지 않으면
    else:
        # None을 반환한다.
        return None

# 테스트
print (hash('dk') % 8) # 4
print (hash('da') % 8) # 4
print (hash('dc') % 8) # 4

save_data('dk', '01200123123')
save_data('da', '3333333333')

read_data('dk') # 01200123123
read_data('da') # 3333333333
read_data('dc') # 값을 저장하지 않았기 때문에 출력되지 않는다.
```

### 6.3. 빈번한 충돌을 개선하는 기법

* 해시 함수을 재정의 및 해쉬 테이블 저장공간을 확대
* 예:

    ```python
    hash_table = list([None for i in range(16)])

    def hash_function(key):
        return key % 16
    ```

## 참고: 해시 함수와 키 생성 함수

* 파이썬의 hash() 함수는 실행할 때마다, 값이 달라질 수 있음
* 유명한 해시 함수들이 있음: SHA(Secure Hash Algorithm, 안전한 해시 알고리즘)
    * 어떤 데이터도 유일한 고정된 크기의 고정값을 반환해주므로, 해시 함수로 유용하게 활용 가능

### SHA-1

```python
# hashlib 라이브러리를 사용한다.
import hashlib

# 문자열을 binary로 변환해준다. # b'test'로 적을 수도 있다.
data = 'test'.encode()
hash_object = hashlib.sha1()
# 해시값을 hash_object에 저장한다.
hash_object.update(data)
# 저장한 값을 16진수로 받아와 출력한다.
hex_dig = hash_object.hexdigest()
print (hex_dig) # a94a8fe5ccb19ba61c4c0873d391e987982fbbd3
```

### SHA-256

```python
import hashlib

data = 'test'.encode()
# 이 부분만 sha1에서 sha256으로 변경한다.
hash_object = hashlib.sha256()
hash_object.update(data)
hex_dig = hash_object.hexdigest()
print (hex_dig) # 9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08
```

### 연습 4: 연습2의 Chaining 기법을 적용한 해시 테이블 코드에 키 생성 함수를 sha256 해쉬 알고리즘을 사용하도록 변경해보기

1. 해시 함수: key % 8
2. 해시 키 생성: hash(data)

```python
import hashlib

hash_table = list([0 for i in range(8)])

def get_key(data):
        # 해시를 받아오는 부분을 sha256을 사용하도록 변경한다.
        hash_object = hashlib.sha256()
        # data가 문자열이기 때문에 binary로 변경한다.
        hash_object.update(data.encode())
        hex_dig = hash_object.hexdigest()
        # hash_function이 나머지를 이용하는 것이기 때문에
        # 16진수의 문자열을 10진수의 숫자로 반환한다.
        return int(hex_dig, 16)

# ... hash_function, save_data, read_data는 동일하다.

# 테스트
print (get_key('db') % 8) # 1
print (get_key('da') % 8) # 2
print (get_key('dh') % 8) # 2

save_data('da', '01200123123')
save_data('dh', '3333333333')
read_data('dh') # 3333333333
```

## 7. 시간 복잡도

* 일반적인 경우(Collision이 없는 경우)는 O(1)
* 최악의 경우(Collision이 모두 발생하는 경우)는 O(n)

> 해시 테이블의 경우, 일반적인 경우를 기대하고 만들기 때문에, 시간 복잡도는 O(1) 이라고 말할 수 있음

## 검색에서 해시 테이블의 사용 예

* 16개의 배열에 데이터를 저장하고, 검색할 때 O(n)
* 16개의 데이터 저장공간을 가진 위의 해시 테이블에 데이터를 저장하고, 검색할 때 O(1)
