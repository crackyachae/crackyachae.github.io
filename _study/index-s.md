---
layout  : wikiindex
title   : 공부를 합니다
toc     : true
public  : true
comment : false
regenerate: true
---

## [[Blog]]
* markdown

## [[CS-Basic]]

### harvardx-cs50s-intro
* harvardx-cs50s-intro-0-scratch
* harvardx-cs50s-intro-1-c
* harvardx-cs50s-intro-2-array
* harvardx-cs50s-intro-5-data-structures
* harvardx-cs50s-intro-6-python
* harvardx-cs50s-intro-7-sql
* harvardx-cs50s-intro-8-information
* harvardx-cs50s-intro-tracks-web-1
* harvardx-cs50s-intro-tracks-web-2

### smu-data-structure

## [[Git]]
* git-memos

### opent-git-cli
* opent-git1-cli
* opent-git2-cli-version-control
* opent-git3-cli-backup
* opent-git4-cli-collaborate
* opent-git4-cli-cherry-pick-rebase

### opent-github
* opent-github-lec]]

## [[JavaScript]]
* javascript-links

### opent-web2-js
* opent-web2-js-1-intro
* opent-web2-js-2-html-meet-js
* opent-web2-js-5-datatype-6-var
* opent-web2-js-7-using-css
* opent-web2-js-10-program
* opent-web2-js-11-condition
* opent-web2-js-15-refactor
* opent-web2-js-16-array-loop
* opent-web2-js-21-function
* opent-web2-js-24-object
* opent-web2-js-27-file-split
* opent-web2-js-28-library-framework
* opent-web2-js-29-ui-api-30-end

### opent-client-web-js
* opent-client-web-js-1-webjs-3-js-in-html
* opent-client-web-js-4-object-model
* opent-client-web-js-5-bom
* opent-client-web-js-6-dom-1
* opent-client-web-js-6-dom-2
* opent-client-web-js-6-dom-3
* opent-client-web-js-6-dom-4

### flanagan-js-def-guide
* flanagan-js-def-guide-1-intro
* flanagan-js-def-guide-2-lexical-struct
* flanagan-js-def-guide-3-type-val-var
* flanagan-js-def-guide-4-exp-op
* flanagan-js-def-guide-8-fnc

### mdn-async-js
* mdn-async-js-1-general-async
* mdn-async-js-2-intro-async-js
* mdn-async-js-3-timeout-interval
* mdn-async-js-4-promise
* mdn-async-js-5-async-await

### mdn-js-ref
* mdn-js-ref-template-literal

## [[JS-Library]]
* js-library-links

### react
* react-links

#### opent-react
* opent-react-1-env
* opent-react-2-component
* opent-react-3-state
* opent-react-4-event.md
* opent-react-5-create.md
* opent-react-6-update-delete.md
* opent-react-7-end.md

#### vlpt-react
* vlpt-react-basic
    * vlpt-react-basic-4-jsx-5-props-6-cond-render
    * vlpt-react-basic-7-state-8-input
    * vlpt-react-basic-10-ref-11-array
    * vlpt-react-basic-13-array-edit
    * vlpt-react-basic-16-effect
    * vlpt-react-basic-17-memo-18-callback-19-reactmemo
    * vlpt-react-basic-20-reducer

## [[Mathematics]]

### hyu-linear-algebra
* hyu-linear-algebra-2-3-linear-independence
* hyu-linear-algebra-2-4-four-subspaces
* hyu-linear-algebra-2-6-linear-transformations
* hyu-linear-algebra-3-3-proj-least-squares
* hyu-linear-algebra-3-4-gram-schmidt
* hyu-linear-algebra-4-2-properties-of-det
* hyu-linear-algebra-4-3-form-for-determinant
* hyu-linear-algebra-4-4-app-of-determinants
* hyu-linear-algebra-5-2-diagonalization
* hyu-linear-algebra-5-3-difference-eqn
* hyu-linear-algebra-5-4-differential-eqn
* hyu-linear-algebra-5-5-complex-matrix

## [[Problem-Solving]]
* problem-solving-links

### boj
* boj-set-py-basic
* boj-set-js-basic

### codeup
* codeup-set-py-basic

## [[Style-Sheet]]

### css
* css-links

### opent-client-css
* opent-client-css-1-intro
* opent-client-css-3-meet-html
* opent-client-css-4-selector
* opent-client-css-6-typo
* opent-client-css-7-harmony
* opent-client-css-9-layout-1
* opent-client-css-9-layout-2
* opent-client-css-9-layout-3
* opent-client-css-9-layout-4
* opent-client-css-9-layout-5
* opent-client-css-10-graphic-1
* opent-client-css-10-graphic-2
* opent-client-css-11-motion
* opent-client-css-12-refactor
* opent-client-css-13-library

## [[Tools]]

### terminal

#### opent-posix1-cli
* opent-posix1-cli-lec

### vim
* vim-links
* vim-learning

### vscode
* vscode-links

#### vscode-docs
* vscode-docs-getstarted-settings
    * vscode-docs-getstarted-settings-default
* vscode-docs-editor-codebasics

#### vscode-ext
* vscode-ext-auto-close-tag
* vscode-ext-auto-rename-tag

## [[Web-Basic]]

### mdn-getting-started-web

{% comment %}
## blog posts
<div>
    <ul>
{% for post in site.posts %}
    {% if post.public != false %}
        <li>
            <a class="post-link" href="{{ post.url | prepend: site.baseurl }}">
                {{ post.title }}
            </a>
        </li>
    {% endif %}
{% endfor %}
    </ul>
</div>
{% endcomment %}
