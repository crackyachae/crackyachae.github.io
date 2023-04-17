---
layout  : article
title   : jest-dom custom matcher
summary : jest-dom의 README의 custom matcher를 정리하자
date    : 2023-03-16 23:14:59 +0900
updated : 2023-03-17 15:40:03 +0900
tag     : 
toc     : true
public  : true
parent  : [[/react-library/react-testing-library]]
latex   : false
---
* TOC
{:toc}

> 이 글은 [jest-dom README 문서](https://github.com/testing-library/jest-dom) 중 Custom Matcher의 내용을 복습하기위해 내용을 번역 정리한 글입니다.
>
> 내용을 이해하기 위한 개인적인 설명이나 해석이 있을 수 있기 때문에 되도록 원문을 참고해주시길 바랍니다.
> 잘못된 부분이 있다면 댓글이나 그 외 편하신 방법으로 알려주시면 감사하겠습니다.

## `toBeDisabled`

```ts
toBeDisabled()
```

* 요소의 비활성화 여부를 확인한다.
* 다음과 같은 요소를 [비활성화](https://html.spec.whatwg.org/multipage/semantics-other.html#disabled-elements)할 수 있다.
    * `button`, `input`, `select`, `textarea`, `optgroup`, `option`, `fieldset`, 사용자 지정 요소.
* 비활성화할 수 있는 요소이면서 `disabled` 속성이 있는 경우 요소를 비활성화된 것으로 간주한다.
* 또한 자신의 상위 요소가 위의 케이스에 해당하는 경우에도 일치한다.

### Examples

```html
<button data-testid="button" type="submit" disabled>submit</button>
<fieldset disabled><input type="text" data-testid="input" /></fieldset>
<a href="..." disabled>link</a>
```

```javascript
expect(getByTestId('button')).toBeDisabled()
expect(getByTestId('input')).toBeDisabled()
expect(getByText('link')).not.toBeDisabled()
```

## `toBeEnabled`

```ts
toBeEnabled()
```

* `toBeDisabled`와 반대의 경우에 해당한다.
* `not.toBeDisabled()` 처럼 동작한다. 테스트에서 중복 부정을 피하기 위해 사용한다.

## `toBeEmptyDOMElement`

```ts
toBeEmptyDOMElement()
```

* 요소에 표시되는 콘텐츠가 없는지 여부를 확인한다.
* 주석은 무시하고 요소에 공백이 포함되어 있는 경우는 일치하지 않는다.

### Examples

```html
<span data-testid="not-empty"><span data-testid="empty"></span></span>
<span data-testid="with-whitespace"> </span>
<span data-testid="with-comment"><!-- comment --></span>
```

```javascript
expect(getByTestId('empty')).toBeEmptyDOMElement()
expect(getByTestId('not-empty')).not.toBeEmptyDOMElement()
expect(getByTestId('with-whitespace')).not.toBeEmptyDOMElement()
```

## `toBeInTheDocument`

```ts
toBeInTheDocument()
```

* 해당 요소가 document에 존재하는지 여부를 확인한다.

### Examples

```html
<span data-testid="html-element"><span>Html Element</span></span>
<svg data-testid="svg-element"></svg>
```

```javascript
expect(
  getByTestId(document.documentElement, 'html-element'),
).toBeInTheDocument()
expect(getByTestId(document.documentElement, 'svg-element')).toBeInTheDocument()
expect(
  queryByTestId(document.documentElement, 'does-not-exist'),
).not.toBeInTheDocument()
```

## `toBeInvalid`

```ts
toBeInvalid()
```

* 요소가 현재 invalid 한지 확인한다.
* 다음과 같은 경우에 요소가 invalid 하다.
    * [`aria-invalid` 속성](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques/Using_the_aria-invalid_attribute)가 존재하면서 그 값이 없는 경우.
    * `aria-invalid` 속성의 값이 `"true"`인 경우.
    * form 요소에서 [`checkValidity()`](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5/Constraint_validation)의 결과가 `false`인 경우.

### Examples

```html
<input data-testid="no-aria-invalid" />
<input data-testid="aria-invalid" aria-invalid />
<input data-testid="aria-invalid-value" aria-invalid="true" />
<input data-testid="aria-invalid-false" aria-invalid="false" />

<form data-testid="valid-form">
  <input />
</form>

<form data-testid="invalid-form">
  <input required />
</form>
```

```javascript
expect(getByTestId('no-aria-invalid')).not.toBeInvalid()
expect(getByTestId('aria-invalid')).toBeInvalid()
expect(getByTestId('aria-invalid-value')).toBeInvalid()
expect(getByTestId('aria-invalid-false')).not.toBeInvalid()

expect(getByTestId('valid-form')).not.toBeInvalid()
expect(getByTestId('invalid-form')).toBeInvalid()
```

## `toBeRequired`

```ts
toBeRequired()
```

* 요소가 현재 required 상태인지 확인한다.
* 요소는 `required` or `aria-required="true"` 속성을 갖고있는 경우에 required 상태이다.

### Examples

```html
<input data-testid="required-input" required />
<input data-testid="aria-required-input" aria-required="true" />
<input data-testid="conflicted-input" required aria-required="false" />
<input data-testid="aria-not-required-input" aria-required="false" />
<input data-testid="optional-input" />
<input data-testid="unsupported-type" type="image" required />
<select data-testid="select" required></select>
<textarea data-testid="textarea" required></textarea>
<div data-testid="supported-role" role="tree" required></div>
<div data-testid="supported-role-aria" role="tree" aria-required="true"></div>
```

```javascript
expect(getByTestId('required-input')).toBeRequired()
expect(getByTestId('aria-required-input')).toBeRequired()
expect(getByTestId('conflicted-input')).toBeRequired()
expect(getByTestId('aria-not-required-input')).not.toBeRequired()
expect(getByTestId('optional-input')).not.toBeRequired()
expect(getByTestId('unsupported-type')).not.toBeRequired()
expect(getByTestId('select')).toBeRequired()
expect(getByTestId('textarea')).toBeRequired()
expect(getByTestId('supported-role')).not.toBeRequired()
expect(getByTestId('supported-role-aria')).toBeRequired()
```

## `toBeValid`

```ts
toBeValid()
```

* 요소의 값이 valid한 상태인지 확인한다.
* 다음과 같은 경우에 요소가 valid 하다.
    * [`aria-invalid` 속성](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques/Using_the_aria-invalid_attribute)가 없는 경우
    * `aria-invalid` 속성의 값이 `"false"`인 경우
    * form 요소에서 [`checkValidity()`](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5/Constraint_validation)의 값이 `true`인 경우

### Examples

```html
<input data-testid="no-aria-invalid" />
<input data-testid="aria-invalid" aria-invalid />
<input data-testid="aria-invalid-value" aria-invalid="true" />
<input data-testid="aria-invalid-false" aria-invalid="false" />

<form data-testid="valid-form">
  <input />
</form>

<form data-testid="invalid-form">
  <input required />
</form>
```

```javascript
expect(getByTestId('no-aria-invalid')).toBeValid()
expect(getByTestId('aria-invalid')).not.toBeValid()
expect(getByTestId('aria-invalid-value')).not.toBeValid()
expect(getByTestId('aria-invalid-false')).toBeValid()

expect(getByTestId('valid-form')).toBeValid()
expect(getByTestId('invalid-form')).not.toBeValid()
```

## `toBeVisible`

```ts
toBeVisible()
```

* 요소가 현재 사용자에게 보이는 상태인지 확인한다.
* 다음의 조건을 **모두** 만족해야만 visible한 요소이다.
    * document에 존재해야 한다.
    * css의 `display` 속성이 `none`이 아니어야 한다.
    * css의 `visibility` 속성이 `hidden`이나 `collapse`가 아니어야 한다.
    * css의 `opacity` 속성 값이 `0`이 아니어야 한다.
    * 부모 요소 역시 visible 해야 한다.
    * [`hidden`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/hidden) 속성을 포함하지 않아야 한다.
    * `<details />` 요소의 경우 `open` 속성을 포함해야 한다.

### Examples

```html
<div data-testid="zero-opacity" style="opacity: 0">Zero Opacity Example</div>
<div data-testid="visibility-hidden" style="visibility: hidden">
  Visibility Hidden Example
</div>
<div data-testid="display-none" style="display: none">Display None Example</div>
<div style="opacity: 0">
  <span data-testid="hidden-parent">Hidden Parent Example</span>
</div>
<div data-testid="visible">Visible Example</div>
<div data-testid="hidden-attribute" hidden>Hidden Attribute Example</div>
<details>
  <summary>Title of hidden text</summary>
  Hidden Details Example
</details>
<details open>
  <summary>Title of visible text</summary>
  <div>Visible Details Example</div>
</details>
```

```javascript
expect(getByText('Zero Opacity Example')).not.toBeVisible()
expect(getByText('Visibility Hidden Example')).not.toBeVisible()
expect(getByText('Display None Example')).not.toBeVisible()
expect(getByText('Hidden Parent Example')).not.toBeVisible()
expect(getByText('Visible Example')).toBeVisible()
expect(getByText('Hidden Attribute Example')).not.toBeVisible()
expect(getByText('Hidden Details Example')).not.toBeVisible()
expect(getByText('Visible Details Example')).toBeVisible()
```

## `toContainElement`

```typescript
toContainElement(element: HTMLElement | SVGElement | null)
```

* 요소가 다른 요소를 자식 요소로 갖는지 여부를 확인한다.

### Examples

```html
<span data-testid="ancestor"><span data-testid="descendant"></span></span>
```

```javascript
const ancestor = getByTestId('ancestor')
const descendant = getByTestId('descendant')
const nonExistantElement = getByTestId('does-not-exist')

expect(ancestor).toContainElement(descendant)
expect(descendant).not.toContainElement(ancestor)
expect(ancestor).not.toContainElement(nonExistantElement)
```

## `toContainHTML`

```typescript
toContainHTML(htmlText: string)
```

* 요소가 HTML 요소를 나타내는 문자열을 포함하는지 여부를 확인한다.
* 문자열은 유효한 html을 포함해야 하며, 불완전한 html을 포함해서는 안된다.

### Examples

```html
<span data-testid="parent"><span data-testid="child"></span></span>
```

```javascript
// These are valid uses
expect(getByTestId('parent')).toContainHTML('<span data-testid="child"></span>')
expect(getByTestId('parent')).toContainHTML('<span data-testid="child" />')
expect(getByTestId('parent')).not.toContainHTML('<br />')

// These won't work
expect(getByTestId('parent')).toContainHTML('data-testid="child"')
expect(getByTestId('parent')).toContainHTML('data-testid')
expect(getByTestId('parent')).toContainHTML('</span>')
```

> 일반적인 경우 사용할 필요가 없을 가능성이 높다. 사용자가 브라우저에서 앱을 어떻게 인식하는지에 대한 관점에서 테스트하는 것이 권장되므로 이 matcher를 사용해 특정 DOM 구조에 대한 테스트를 하는 것은 권장되지 않는다.
>
> 테스트 중인 코드가 외부 소스에서 가져온 html을 렌더링하는 경우에 해당 html의 유효성을 검사하기 위한 방안으로는 유용할 수 있다. 코드가 의도한 대로 사용되었는지 확인하려는 경우에 유용할 수 있다.
>
> 사용자가 제어하는 DOM 구조를 확인하는 데 사용해서는 안 되며 대신 `toContainElement`를 사용하는 것이 권장된다.

## `toHaveAccessibleDescription`

```typescript
toHaveAccessibleDescription(expectedAccessibleDescription?: string | RegExp)
```

* 요소가 예상되는 [accessible description](https://w3c.github.io/accname/)를 갖는지 확인한다.

* Accessible description으로 사용될 정확한 문자열을 전달하거나 정규 표현식을 전달하거나 또는 [expect.stringContaining](https://jestjs.io/docs/en/expect.html#expectnotstringcontainingstring)이나 [expect.stringMatching](https://jestjs.io/docs/en/expect.html#expectstringmatchingstring-regexp)를 사용해 부분적으로 일치시킬 수도 있다.

### Examples

```html
<a
  data-testid="link"
  href="/"
  aria-label="Home page"
  title="A link to start over"
  >Start</a
>
<a data-testid="extra-link" href="/about" aria-label="About page">About</a>
<img src="avatar.jpg" data-testid="avatar" alt="User profile pic" />
<img
  src="logo.jpg"
  data-testid="logo"
  alt="Company logo"
  aria-describedby="t1"
/>
<span id="t1" role="presentation">The logo of Our Company</span>
```

```ts
expect(getByTestId('link')).toHaveAccessibleDescription()
expect(getByTestId('link')).toHaveAccessibleDescription('A link to start over')
expect(getByTestId('link')).not.toHaveAccessibleDescription('Home page')
expect(getByTestId('extra-link')).not.toHaveAccessibleDescription()
expect(getByTestId('avatar')).not.toHaveAccessibleDescription()
expect(getByTestId('logo')).not.toHaveAccessibleDescription('Company logo')
expect(getByTestId('logo')).toHaveAccessibleDescription(
  'The logo of Our Company',
)
```

## `toHaveAccessibleName`

```typescript
toHaveAccessibleName(expectedAccessibleName?: string | RegExp)
```

* 요소가 예상되는 [accessible name](https://w3c.github.io/accname/)를 갖는지 확인한다.
* 대표적인 예로 form 요소나 button이 정확히 labelled 되었는지 확인할 때 유용하다.

* accessible name으로 사용될 정확한 문자열을 전달하거나 정규 표현식을 전달하거나 또는 [expect.stringContaining](https://jestjs.io/docs/en/expect.html#expectnotstringcontainingstring)이나 [expect.stringMatching](https://jestjs.io/docs/en/expect.html#expectstringmatchingstring-regexp)를 사용해 부분적으로 일치시킬 수도 있다.

### Examples

```html
<img data-testid="img-alt" src="" alt="Test alt" />
<img data-testid="img-empty-alt" src="" alt="" />
<svg data-testid="svg-title"><title>Test title</title></svg>
<button data-testid="button-img-alt"><img src="" alt="Test" /></button>
<p><img data-testid="img-paragraph" src="" alt="" /> Test content</p>
<button data-testid="svg-button"><svg><title>Test</title></svg></p>
<div><svg data-testid="svg-without-title"></svg></div>
<input data-testid="input-title" title="test" />
```

```javascript
expect(getByTestId('img-alt')).toHaveAccessibleName('Test alt')
expect(getByTestId('img-empty-alt')).not.toHaveAccessibleName()
expect(getByTestId('svg-title')).toHaveAccessibleName('Test title')
expect(getByTestId('button-img-alt')).toHaveAccessibleName()
expect(getByTestId('img-paragraph')).not.toHaveAccessibleName()
expect(getByTestId('svg-button')).toHaveAccessibleName()
expect(getByTestId('svg-without-title')).not.toHaveAccessibleName()
expect(getByTestId('input-title')).toHaveAccessibleName()
```

## `toHaveAttribute`

```typescript
toHaveAttribute(attr: string, value?: any)
```

* 주어진 요소가 특정 속성을 갖는지 확인한다. 또한 선택적으로 해당 속성이 특정 값을 갖거나 [expect.stringContaining](https://jestjs.io/docs/en/expect.html#expectnotstringcontainingstring) 이나 [expect.stringMatching](https://jestjs.io/docs/en/expect.html#expectstringmatchingstring-regexp)를 사용해 특정 값과 부분적으로 일치하는지 확인할 수도 있다.

### Examples

```html
<button data-testid="ok-button" type="submit" disabled>ok</button>
```

```javascript
const button = getByTestId('ok-button')

expect(button).toHaveAttribute('disabled')
expect(button).toHaveAttribute('type', 'submit')
expect(button).not.toHaveAttribute('type', 'button')

expect(button).toHaveAttribute('type', expect.stringContaining('sub'))
expect(button).toHaveAttribute('type', expect.not.stringContaining('but'))
```

## `toHaveClass`

```typescript
toHaveClass(...classNames: string[], options?: {exact: boolean})
```

* 주어진 요소가 특정 `class` 속성 값으로 특정 클래스를 갖는지 여부를 확인한다.
* 최소한 한 개 이상의 클래스 값을 입력해야 하며 그렇지 않으면 class가 없다고 표시된다.

### Examples

```html
<button data-testid="delete-button" class="btn extra btn-danger">
  Delete item
</button>
<button data-testid="no-classes">No Classes</button>
```

```javascript
const deleteButton = getByTestId('delete-button')
const noClasses = getByTestId('no-classes')

expect(deleteButton).toHaveClass('extra')
expect(deleteButton).toHaveClass('btn-danger btn')
expect(deleteButton).toHaveClass('btn-danger', 'btn')
expect(deleteButton).not.toHaveClass('btn-link')

expect(deleteButton).toHaveClass('btn-danger extra btn', {exact: true}) // to check if the element has EXACTLY a set of classes
expect(deleteButton).not.toHaveClass('btn-danger extra', {exact: true}) // if it has more than expected it is going to fail

expect(noClasses).not.toHaveClass()
```

## `toHaveFocus`

* 요소가 focus 되어있는지 여부를 확인한다.

### Examples

```html
<div><input type="text" data-testid="element-to-focus" /></div>
```

```javascript
const input = getByTestId('element-to-focus')

input.focus()
expect(input).toHaveFocus()

input.blur()
expect(input).not.toHaveFocus()
```

## `toHaveFormValues`

```typescript
toHaveFormValues(expectedValues: {
  [name: string]: any
})
```

* form이나 fieldset에 지정된 이름에 대한 form 컨트롤을 포함하는지, 지정된 값을 갖지 확인한다.

> 이 matcher는 form과 fieldset 요소에서만 호출할 수 있다는 것을 짚고 넘어가는 것이 중요하다.
>
> 이를 통해 form과 fieldset의 [.elements](https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement/elements) 속성을 활용하여 그 안에 있는 모든 form 컨트롤을 안정적으로 가져올 수 있다.
>
> 또한 사용자가 둘 이상의 `form`을 포함하는 컨테이너를 제공하는 경우에 서로 관련이 없고 심지어 서로 충돌할 수 있는 form 컨트롤이 섞일 가능성도 방지할 수 있다.

이 matcher는 form 컨트롤 유형에 따라 그 값을 얻게되는 특수성을 추상화한다. 예를 들어 `<input>` 요소에는 `value` 속성이 있지만 `<select>` 요소에는 속성이 없다.

* `<input type="number">` 요소는 문자열 대신 **숫자**로 그 값을 반환한다.
* `<input type="checkbox">` 요소:
    * `name` 속성을 포함한 체크박스 한 개만 있으면 이는 **boolean**으로 취급된다. 체크박스가 checked 상태이면 `true`를 그렇지 않으면 `false`를 반환한다.
    * `name` 속성을 포함한 체크박스 두 개 이상이면 이들은 다함께 하나의 form 컨트롤로 여겨지며, 모든 선택된 체크박스의 값을 포함하는 **배열**을 반환한다.
* `<input type="radio">` 요소는 `name` 속성으로 묶여 하나의 form 컨트롤로 여겨진다. 이 form 컨트롤은 그룹 내의 선택된 라디오 버튼의 `value` 속성에 해당하는 **문자열** 값을 반환한다.
* `<input type="text">` 요소는 값을 **문자열**로 반환한다. 또한 위에서 명시적인 다른 규칙을 다루지 않은 다른 `type` 속성을 갖는 `<input>` 요소도 이 경우에 해당한다. (e.g. `search`, `email`, `date`, `password`, `hidden`, etc.)
* `multiple` 속성이 없는 `<select>` 요소는 선택된 `option`의 `value` 속성값에 해당하는 **문자열**로 값을 반환하며 선택된 값이 없는 경우에는 `undefined`를 반환한다.
* `<select multiple>` 요소는 모든 [selected options](https://developer.mozilla.org/en-US/docs/Web/API/HTMLSelectElement/selectedOptions)의 값을 포함하는 **배열**로 값을 반환한다.
* `<textarea>` 요소는 노드 내용과 일치하는 값을 **문자열**로 반환한다.

위의 규칙을 사용하면, 예를 들어, 단일 선택 컨트롤에서 라디오 버튼 그룹을 사용하도록 쉽게 전환할 수 있다. 또는 다중 선택 컨트롤에서 체크박스 그룹 사용으로 전환할 수도 있다. 이 matcher가 비교하는 데 사용하는 양식 값의 결과 집합은 동일하다.

### Examples

```html
<form data-testid="login-form">
  <input type="text" name="username" value="jane.doe" />
  <input type="password" name="password" value="12345678" />
  <input type="checkbox" name="rememberMe" checked />
  <button type="submit">Sign in</button>
</form>
```

```javascript
expect(getByTestId('login-form')).toHaveFormValues({
  username: 'jane.doe',
  rememberMe: true,
})
```

## `toHaveStyle`

```typescript
toHaveStyle(css: string | object)
```

* 요소가 특정 css 속성과 값을 갖는지 여부를 확인한다.
* 전달한 예상 속성중 일부가 아닌 *모든* 예상 속성 값이 일치해야만 일치하는 것으로 판단한다.

### Examples

```html
<button
  data-testid="delete-button"
  style="display: none; background-color: red"
>
  Delete item
</button>
```

```javascript
const button = getByTestId('delete-button')

expect(button).toHaveStyle('display: none')
expect(button).toHaveStyle({display: 'none'})
expect(button).toHaveStyle(`
  background-color: red;
  display: none;
`)
expect(button).toHaveStyle({
  backgroundColor: 'red',
  display: 'none',
})
expect(button).not.toHaveStyle(`
  background-color: blue;
  display: none;
`)
expect(button).not.toHaveStyle({
  backgroundColor: 'blue',
  display: 'none',
})
```

## `toHaveTextContent`

```typescript
toHaveTextContent(text: string | RegExp, options?: {normalizeWhitespace: boolean})
```

* 주어진 node가 text content를 갖는지 여부를 확인한다.
* 이 동작은 요소뿐만 아니라 text node와 fragment에도 적용된다.

* `string` 인자가 전달되면, node content의 일부와 일치하는지 확인한다. 대소문자는 구분된다.
    * 대소문자를 구분하지 않고 비교하려면, `/i` 수정자와 함께 `RegExp`를 사용하면 된다.
    * content 전체를 비교하려면 `RegExp`를 사용하면 된다.

### Examples

```html
<span data-testid="text-content">Text Content</span>
```

```javascript
const element = getByTestId('text-content')

expect(element).toHaveTextContent('Content')
expect(element).toHaveTextContent(/^Text Content$/) // to match the whole content
expect(element).toHaveTextContent(/content$/i) // to use case-insensitive match
expect(element).not.toHaveTextContent('content')
```

## `toHaveValue`

```typescript
toHaveValue(value: string | string[] | number)
```

* 주어진 form 요소가 특정 값을 갖는지 확인한다.
* `<input>`, `<select>`, `<textarea>` 요소에 적용할 수 있으며, [`toBeChecked`](#tobechecked)나 [`toHaveFormValues`](#tohaveformvalues)을 사용해서만 의미있게 확인할 수 있는 `<input type="checkbox">`와 `<input type="radio">`는 제외된다.
* 그 외의 모든 form 요소는 [`toHaveFormValues`](#tohaveformvalues)에서 사용되는 알고리즘과 같은 알고리즘을 사용해서 값이 일치하는지 확인한다.

### Examples

```html
<input type="text" value="text" data-testid="input-text" />
<input type="number" value="5" data-testid="input-number" />
<input type="text" data-testid="input-empty" />
<select multiple data-testid="select-number">
  <option value="first">First Value</option>
  <option value="second" selected>Second Value</option>
  <option value="third" selected>Third Value</option>
</select>
```

```javascript
const textInput = getByTestId('input-text')
const numberInput = getByTestId('input-number')
const emptyInput = getByTestId('input-empty')
const selectInput = getByTestId('select-number')

expect(textInput).toHaveValue('text')
expect(numberInput).toHaveValue(5)
expect(emptyInput).not.toHaveValue()
expect(selectInput).toHaveValue(['second', 'third'])
```

## `toHaveDisplayValue`

```typescript
toHaveDisplayValue(value: string | RegExp | (string|RegExp)[])
```

* 주어진 form 요소가 화면에 표시된(사용자에게 보이는) 특정 값을 갖는지 확인한다.
* `<input>`, `<select>`, `<textarea>` 요소에 적용할 수 있으며, [`toBeChecked`](#tobechecked)나 [`toHaveFormValues`](#tohaveformvalues)을 사용해서만 의미있게 확인할 수 있는 `<input type="checkbox">`와 `<input type="radio">`는 제외된다.

### Examples

```html
<label for="input-example">First name</label>
<input type="text" id="input-example" value="Luca" />

<label for="textarea-example">Description</label>
<textarea id="textarea-example">An example description here.</textarea>

<label for="single-select-example">Fruit</label>
<select id="single-select-example">
  <option value="">Select a fruit...</option>
  <option value="banana">Banana</option>
  <option value="ananas">Ananas</option>
  <option value="avocado">Avocado</option>
</select>

<label for="multiple-select-example">Fruits</label>
<select id="multiple-select-example" multiple>
  <option value="">Select a fruit...</option>
  <option value="banana" selected>Banana</option>
  <option value="ananas">Ananas</option>
  <option value="avocado" selected>Avocado</option>
</select>
```

```javascript
const input = screen.getByLabelText('First name')
const textarea = screen.getByLabelText('Description')
const selectSingle = screen.getByLabelText('Fruit')
const selectMultiple = screen.getByLabelText('Fruits')

expect(input).toHaveDisplayValue('Luca')
expect(input).toHaveDisplayValue(/Luc/)
expect(textarea).toHaveDisplayValue('An example description here.')
expect(textarea).toHaveDisplayValue(/example/)
expect(selectSingle).toHaveDisplayValue('Select a fruit...')
expect(selectSingle).toHaveDisplayValue(/Select/)
expect(selectMultiple).toHaveDisplayValue([/Avocado/, 'Banana'])
```

## `toBeChecked`

```typescript
toBeChecked()
```

* 주어진 요소가 checked 상태인지 확인한다.
* `checkbox`나 `radio` 타입의 `input`과 `ckeckbox`나 `radio` `role`을 갖는 요소, `"true"` 나 `"false"` 같은 유효한 `aria-checked` attribute 를 갖는 `switch` 요소에 적용할 수 있다.

### Examples

```html
<input type="checkbox" checked data-testid="input-checkbox-checked" />
<input type="checkbox" data-testid="input-checkbox-unchecked" />
<div role="checkbox" aria-checked="true" data-testid="aria-checkbox-checked" />
<div
  role="checkbox"
  aria-checked="false"
  data-testid="aria-checkbox-unchecked"
/>

<input type="radio" checked value="foo" data-testid="input-radio-checked" />
<input type="radio" value="foo" data-testid="input-radio-unchecked" />
<div role="radio" aria-checked="true" data-testid="aria-radio-checked" />
<div role="radio" aria-checked="false" data-testid="aria-radio-unchecked" />
<div role="switch" aria-checked="true" data-testid="aria-switch-checked" />
<div role="switch" aria-checked="false" data-testid="aria-switch-unchecked" />
```

```javascript
const inputCheckboxChecked = getByTestId('input-checkbox-checked')
const inputCheckboxUnchecked = getByTestId('input-checkbox-unchecked')
const ariaCheckboxChecked = getByTestId('aria-checkbox-checked')
const ariaCheckboxUnchecked = getByTestId('aria-checkbox-unchecked')
expect(inputCheckboxChecked).toBeChecked()
expect(inputCheckboxUnchecked).not.toBeChecked()
expect(ariaCheckboxChecked).toBeChecked()
expect(ariaCheckboxUnchecked).not.toBeChecked()

const inputRadioChecked = getByTestId('input-radio-checked')
const inputRadioUnchecked = getByTestId('input-radio-unchecked')
const ariaRadioChecked = getByTestId('aria-radio-checked')
const ariaRadioUnchecked = getByTestId('aria-radio-unchecked')
expect(inputRadioChecked).toBeChecked()
expect(inputRadioUnchecked).not.toBeChecked()
expect(ariaRadioChecked).toBeChecked()
expect(ariaRadioUnchecked).not.toBeChecked()

const ariaSwitchChecked = getByTestId('aria-switch-checked')
const ariaSwitchUnchecked = getByTestId('aria-switch-unchecked')
expect(ariaSwitchChecked).toBeChecked()
expect(ariaSwitchUnchecked).not.toBeChecked()
```

## `toBePartiallyChecked`

```typescript
toBePartiallyChecked()
```

* 주어진 요소가 부분적으로(partially) checked 상태인지 확인한다.
* `checkbox` 타입의 `input`과 `ckeckbox` `role`과 `aria-checked="mixed"`를 함께 갖는 요소, `indeterminate` 값이 `true`로 지정된 `checkbox` 타입의 `input`에 적용할 수 있다.

### Examples

```html
<input type="checkbox" aria-checked="mixed" data-testid="aria-checkbox-mixed" />
<input type="checkbox" checked data-testid="input-checkbox-checked" />
<input type="checkbox" data-testid="input-checkbox-unchecked" />
<div role="checkbox" aria-checked="true" data-testid="aria-checkbox-checked" />
<div
  role="checkbox"
  aria-checked="false"
  data-testid="aria-checkbox-unchecked"
/>
<input type="checkbox" data-testid="input-checkbox-indeterminate" />
```

```javascript
const ariaCheckboxMixed = getByTestId('aria-checkbox-mixed')
const inputCheckboxChecked = getByTestId('input-checkbox-checked')
const inputCheckboxUnchecked = getByTestId('input-checkbox-unchecked')
const ariaCheckboxChecked = getByTestId('aria-checkbox-checked')
const ariaCheckboxUnchecked = getByTestId('aria-checkbox-unchecked')
const inputCheckboxIndeterminate = getByTestId('input-checkbox-indeterminate')

expect(ariaCheckboxMixed).toBePartiallyChecked()
expect(inputCheckboxChecked).not.toBePartiallyChecked()
expect(inputCheckboxUnchecked).not.toBePartiallyChecked()
expect(ariaCheckboxChecked).not.toBePartiallyChecked()
expect(ariaCheckboxUnchecked).not.toBePartiallyChecked()

inputCheckboxIndeterminate.indeterminate = true
expect(inputCheckboxIndeterminate).toBePartiallyChecked()
```

## `toHaveErrorMessage`

```typescript
toHaveErrorMessage(text: string | RegExp)
```

* 주어진 요소가 [ARIA error message](https://www.w3.org/TR/wai-aria/#aria-errormessage)를 갖는지 확인한다.
* `aria-errormessage`를 사용해 사용자 정의 오류 메시지를 포함한 다른 요소를 참조한다.
    * id는 **한 개만** 사용할 수 있다.
    * 작성자는 반드시 `aria-invalid`를 `aria-errormessage`와 함께 사용해야 한다.
    * [`aria-errormessage` spec](https://www.w3.org/TR/wai-aria/#aria-errormessage).
* 공백은 normalized 된다.
* `string` 인자가 전달되면, 오류 메시지 전체와 일치하는지 확인한다. 대소문자는 구분된다.
    * 대소문자를 구분하지 않고 비교하려면, `/i` 수정자와 함께 `RegExp`를 사용하면 된다.
    * 오류 메시지의 일부를 비교하려면 `RegExp`나 `expect.stringContaining("partial string")`를 사용한다.

### Examples

```html
<label for="startTime"> Please enter a start time for the meeting: </label>
<input
  id="startTime"
  type="text"
  aria-errormessage="msgID"
  aria-invalid="true"
  value="11:30 PM"
/>
<span id="msgID" aria-live="assertive" style="visibility:visible">
  Invalid time: the time must be between 9:00 AM and 5:00 PM
</span>
```

```javascript
const timeInput = getByLabel('startTime')

expect(timeInput).toHaveErrorMessage(
  'Invalid time: the time must be between 9:00 AM and 5:00 PM',
)
expect(timeInput).toHaveErrorMessage(/invalid time/i) // to partially match
expect(timeInput).toHaveErrorMessage(expect.stringContaining('Invalid time')) // to partially match
expect(timeInput).not.toHaveErrorMessage('Pikachu!')
```

## Deprecated matchers

* `toBeEmpty`
    * [`toBeEmptyDOMElement`](#tobeemptydomelement)를 대신 사용한다.
* `toBeInTheDOM`
    * [`toBeInTheDocument`](#tobeinthedocument)를 대신 사용한다.
* `toHaveDescription`
    * [`toHaveAccessibleDescription`](#tohaveaccessibledescription)를 대신 사용한다.
