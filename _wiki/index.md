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
* [[harvardx-cs50s-intro-6-python]]
  
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

