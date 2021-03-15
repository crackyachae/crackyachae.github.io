---
layout  : wikiindex
title   : wiki
toc     : true
public  : true
comment : false
regenerate: true
---

## [[Blog]]
* [[markdown]]

## [[CS-Basic]]

### [[harvardx-cs50s-intro]]
* [[harvardx-cs50s-intro-0-scratch]]
* [[harvardx-cs50s-intro-1-c]]
* [[harvardx-cs50s-intro-2-c]]
* [[harvardx-cs50s-intro-5-data-structures]]
* [[harvardx-cs50s-intro-6-python]]
* [[harvardx-cs50s-intro-7-sql]]
* [[harvardx-cs50s-intro-8-information]]
* [[harvardx-cs50s-intro-tracks-web-1]]
* [[harvardx-cs50s-intro-tracks-web-2]]

### [[smu-data-structure]]

## [[Environment]]

### [[terminal]]

#### [[opent-posix1-cli]]
* [[opent-posix1-cli-lec]]

### [[vim]]
* [[vim-links]]
* [[vim-learning]]

### [[vscode]]
* [[vscode-links]]

#### [[vscode-docs]]
* [[vscode-docs-getstarted-settings]]
    * [[vscode-docs-getstarted-settings-default]]
* [[vscode-docs-editor-codebasics]]

#### [[vscode-ext]]
* [[vscode-ext-auto-close-tag]]
* [[vscode-ext-auto-rename-tag]]

## [[Git]]
* [[git-memos]]

### [[opent-git-cli]]
* [[opent-git2-cli-version-control]]

### [[opent-github]]
* [[opent-github-lec]]

## [[Mathematics]]

### [[hyu-linear-algebra]]
* [[hyu-linear-algebra-2-3-linear-independence]]
* [[hyu-linear-algebra-2-4-four-subspaces]]
* [[hyu-linear-algebra-2-6-linear-transformations]]
* [[hyu-linear-algebra-3-3-proj-least-squares]]
* [[hyu-linear-algebra-3-4-gram-schmidt]]
* [[hyu-linear-algebra-4-2-properties-of-det]]
* [[hyu-linear-algebra-4-3-form-for-determinant]]
* [[hyu-linear-algebra-4-4-app-of-determinants]]
* [[hyu-linear-algebra-5-2-diagonalization]]
* [[hyu-linear-algebra-5-3-difference-eqn]]
* [[hyu-linear-algebra-5-4-differential-eqn]]
* [[hyu-linear-algebra-5-5-complex-matrix]]

## [[Problem-Solving]]
* [[problem-solving-links]]

### [[boj]]
* [[boj-set-py-basic]]
* [[boj-set-js-basic]]

### [[codeup]]
* [[codeup-set-py-basic]]

## [[Style-Sheet]]

### [[css]]
* [[css-links]]

### [[opent-client-css]]
* [[opent-client-css-1-intro]]
* [[opent-client-css-3-meet-html]]
* [[opent-client-css-4-selector]]
* [[opent-client-css-6-typo]]
* [[opent-client-css-7-harmony]]
* [[opent-client-css-9-layout-1]]
* [[opent-client-css-9-layout-2]]
* [[opent-client-css-9-layout-3]]
* [[opent-client-css-9-layout-4]]
* [[opent-client-css-9-layout-5]]
* [[opent-client-css-10-graphic-1]]
* [[opent-client-css-10-graphic-2]]
* [[opent-client-css-11-motion]]
* [[opent-client-css-12-refactor]]
* [[opent-client-css-13-library]]

---

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

