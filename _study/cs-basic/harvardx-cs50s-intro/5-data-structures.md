---
layout  : article
title   : 5. Data Structures
summary : 
date    : 2020-03-06 10:06:37 +0900
updated : 2020-06-18 11:42:52 +0900
tag     : draft
toc     : true
public  : true
parent  : [[/cs-basic/harvardx-cs50s-intro]]
latex   : false
---
* TOC
{:toc}

> 이 글은 CS50 x 2020의 [weeks 5](https://cs50.harvard.edu/x/2020/weeks/5/) 강의내용을 복습하기 위해 [강의 노트](https://cs50.harvard.edu/x/2020/notes/5/)를 기반으로 작성한 글입니다.
>
> 내용을 이해하기 위한 개인적인 설명이나 해석이 있을 수 있기 때문에 되도록 원문을 참고해주시길 바랍니다.
> 잘못된 부분이 있다면 댓글이나 그 외 편하신 방법으로 알려주시면 감사하겠습니다.

## Pointers

memory가 할당되지 않은 포인터 변수

```c
int main(void)
{
 int *x;
 int *y;

 x = malloc(sizeof(int));

 *x = 42
 *y = 13 // buggy!
}
```

`x`에는 `malloc`을 이용하여 memory를 할당해 주었지만 `y`에는 해주지 않았기 때문에 y의 주소로 가 13을 대입할 수 없다.

## Resizing arrays

* Array로 사용되는 memory는 인접(side-by-side)해있기 때문에 arrays의 크기를 늘리고 싶으면 바로 옆의 memory를 array에 추가해야 한다.

* 이 memory를 이미 다른 data가 사용하고 있을 수가 있으므로 다른 memory를 이용해 크기를 재정의 할 방법을 찾아봐야 한다.

공간에 여유가 있는 다른 영역으로 가 arrays크기만큼 재 할당한 뒤 기존의 array를 복사할 수 있다.

```c
int main(void)
{
 // int형 포인터 list에 sizeof(int) * 3 만큼의 memory를 할당하고 값을 대입

 // 4칸짜리 int array를 만들기 위해 sizeof(int) * 4 만큼 새로운 공간에 memory를 할당
 // list에 직접 다시 할당시키면 기존에 list가 가리키던 memory가 orphaning(접근이 불가능한 상태) 된다
 int *tmp = malloc(4 * sizeof(int));
 
 // memory가 제대로 할당되었는지 확인
 if (tmp == NULL)
 {
  return 1;
 }

 // list array의 숫자를 tmp array로 복사
 for (int i = 0; i < 3; i++)
 {
  tmp[i] = list[i];
 }

 // 4번째 숫자 입력
 tmp[3] = 4;

 // 이전에 사용하던 list의 memory를 free 시킴
 free(list);

 // list포인터가 tmp를 가리키도록 함.
 list = tmp;

 // list array 출력 후 list를 free.
}
```

### realloc

새롭게 memory를 할당하고 기존의 data를 복사해 오는 것을 `realloc`함수를 이용해 할 수 있다.

```c
int main(void)
{
 // int형 포인터 list에 sizeof(int) * 3 만큼의 memory를 할당하고 값을 대입

 // malloc 대신에 realloc 사용
 int *tmp = realloc(4 * sizeof(int));
 
 if (tmp == NULL)
 {
  return 1;
 }

 list = tmp;

 tmp[3] = 4;

 // list array 출력 후 list를 free.
}
```

## Data Structures

* Data structure는 이전과 다르게 memory에 정보를 저장하는 다양한 방식(layout)을 말한다.

* Data structure을 구성하는 목적은 data list 를 만들 때 memory를 보다 적게 사용해서 보다 짧은 시간 안에 data list를 수정하고 정리하기 위함이다.

Data structure를 만들기 위해서는 다음의 notation을 알아야 한다.

| 키워드        | 의미                                                                      |
| ---           | ---                                                                       |
| `struct`      | custom data type을 만든다                                                 |
| `.`           | structure를 구성하고 있는 특정 property에 접근한다                        |
| `*`           | pointer가 가리키는 memory 주소로 접근한다                                 |
| `n->property` | (*n).property와 동일. n이 가리키는 주소에 있는 구조의 property로 접근한다 |

## Linked Lists

* Linked list는 각각 다른 위치의 memory에 흩어져 있는 값들을 연결해 나열된 값을 저장하는 구조로, 크기를 쉽게 확장할 수 있다.

* Linked list를 만들기 위해서는 우리가 저장하려는 값과 다음 element를 가리키는 주소 모두를 저장하기에 충분한 memory가 있어야한다.

우선 이를 만족시키는 struct `node`를 정의

```c
typedef struct node // 처음에 node를 정의해야 struct 안에서 pointer로 사용할 수 있다.
{
 int n; // 저장하려는 값
 struct node *next; // 다음 node struct를 가리키는 포인터
} node;
```

linked list를 만들기 위해서 출발점으로 empty node인 list를 정의한다.

```c
node *list = NULL;
```

\* 가장 마지막 data는 주소값으로 모두 0으로 이루어진 주소인(pointing nowhere) NULL값을 갖는다.

새 element를 생성

```c
// 새 node를 위한 memory를 할당
node *n = malloc(sizeof(node));

if (n != NULL) // 할당이 정상적으로 이루어졌는지 확인
{
 n->number = 2; // 새 node n의 숫자 값을 지정
 n->next = NULL; // 새 node가 가리키는 node 주소를 NULL로 설정
}
```

현재 list의 끝에 새로 만든 element를 추가

```c
// 임시 node tmp를 정의하고 list와 동일한 곳을 가리키게 함
node *tmp = list;

// tmp가 가리키는 곳이 없을 때 까지 현재 가리키는 node의 다음 node를 가리키게 함 (pointer를 따라가는 것)
while (tmp->next != NULL)
{
 tmp = tmp->next;
}

// tmp가 가리키는 node가 새로운 node n을 가리키도록 함
tmp->next = n;
```

만들어진 list 중간에 새로운 element를 추가

```c
// 임시 node tmp를 정의하고 list와 동일한 곳을 가리키게 함
node *tmp = list;

// tmp가 가리키는 node의 숫자가 새로만든 node n의 숫자보다 커질 때 까지 tmp를 다음 노드로 이동.
while (n->number < tmp->number)
{
 tmp = tmp->next;
}

// node n이 tmp가 현재 가리키고 있는 것을 가리킨 뒤, tmp가 n을 가리키게 함.
// list가 n을 먼저 가리키게 되면 list 이후로의 node들에 접근이 불가하게 되므로 조심해야 함.
n->next = tmp->next;
tmp->next = n;
```

* Arrays와는 다르게 linked list에서는 n번째의 값에 임의로 접근하는 것이 불가능하다. (arrays는 back-to-back으로 있기 때문에 가능)
* 특정 값에 접근하기 위해서는 pointer를 처음부터 따라가야 한다.

* 그러므로 수행 시간(running time)은 탐색(search)시 O(n) 자료 삽입(insert)시 O(n)이다.

## More Data Structures

linked list 외에도 다양한 data structure가 존재.

### (Binary Search) Tree

* Tree는 하나의 node가 다른 두 node를 가리키고 있는 구조이다.
* 왼쪽 node는 보다 작은 값을 오른쪽 node는 보다 큰 값을 갖는다.
* 가장 중앙에서 출발지 역할을 하는 node를 root라고 한다.

Tree의 각 branch들이 동일한 구조를 갖고 있으므로 recursively searching을 할 수 있다.

```c
// node pointer가 2개인 node를 정의
typedef struct node
{
 int number;
 struct node *left;
 struct node *right; 
}

bool search(node *tree)
{
 // base case: tree가 아무것도 가리키고 있지 않음
 if (tree == NULL)
 {
  return false;
 }
 
 // tree가 가리키는 숫자가 기준값보다 작은 경우 왼쪽으로 이동
 else if (기준값 < tree->number)
 {
  return search(tree->left);
 }

 // tree가 가리키는 숫자가 기준값보다 큰 경우 오른쪽으로 이동
 else if (기준값 > tree->number)
 {
  return search(tree->right);
 }
 
 // tree가 가리키는 숫자가 기준값과 같은 경우 true를 반환
 else
 {
  return true;
 }
}
```

* linked list와 유사한 방식으로 다른 element의 이동 없이 nodes를 추가할 수 있다.
* 수행 시간은 탐색시 **O(log n)** 자료 삽입시 **O(log n)**으로 memory를 더 사용해서 linked list보다 빠르게 처리할 수 있다.

### Hash Table

* Hash table 수행시간이 constant time에 가까운 data structure이다.
* Hash table은 liked list와 array를 조합하여 만드는데 array는 대상을 분류하는 기준(hash function)이 되고 각 array에 들어있는 linked list는 기준을 만족시키는 element를 갖는다.
* 예를 들어 이름을 정리할 때, 이름의 첫 알파벳을 기준으로 분류하면 array는 순서대로 알파벳 글자를 담고 있고 해당 알파벳으로 시작하는 이름들이 linked list를 이루고 있는 것이다.

* array가 특정 기준에 따라 순차적으로 나열되어 있으므로 random access가 가능하며 해당 항목에 여러 element가 있을 때는 linked list로 연결하기 때문에 효율적이다.
* 이상적인 hash function을 정해서 각 array 항목당 1개의 element를 갖게 되면 수행시간은 O(1)(constant time)이 될 수 있다.
* 예를 들어 동일한 알파벳으로 시작하는 이름이 여러개 있을 경우에 카테고리를 첫 알파벳 두글자, 첫 알파벳 세글자로 점차 세분화 시키면 array 크기는 커지지만 중복이 없애 O(1)에 도달할 수도있다.

* 하지만 결과적으로, 최악의 경우에는 모든 이름이 같은 알파벳으로 시작해 data structure가 single linked list와 같아지기 때문에 hash table의 수행시간은 **O(n)**이다.

### Trie

* Trie는 tree와 비슷하지만 모든 노드가 array인 data structure이다.
* 위와 동일한 예시에서 모든 array에는 알파벳 26글자가 각각 저장되고 각 단어에 대해 단어를 이루는 문자가 순서대로 다음 배열을 가리키는 방식으로 모든 단어를 표현할 수 있다.
* 특정 단어를 찾기 위한 수행 시간은 단어의 길이와 같으며 Big-O event는 가장 긴 길이의 단어를 찾는 시간으로 상수이다 **O(1)**.
* 하지만 이를 위해서는 각 문자에 필요한 memory의 26를 사용해야 한다는 단점이 있다.

## 참고

### Hash Function**

* [Hash function](https://en.wikipedia.org/wiki/Hash_function) by Wikipedia
* [C/HashTables](https://www.cs.yale.edu/homes/aspnes/pinewiki/C(2f)HashTables.html?highlight=%28CategoryAlgorithmNotes%29) by CS Yale Edu
* [해쉬 알고리즘(Hash Algorithm) 요약 정리, 테스트 코드](https://hsp1116.tistory.com/35) by 화투의 개발블로그
* [해싱, 해시함수, 해시테이블](https://ratsgo.github.io/data%20structure&algorithm/2017/10/25/hash/) by ratsgo's blog

### String Hashing**

* [Hash Functions](http://www.cse.yorku.ca/~oz/hash.html)
* [String Hash 함수에 대해](http://egloos.zum.com/rucaus/v/2348565)
