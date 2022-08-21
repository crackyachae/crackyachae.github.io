;(function() {
    // 화면 상단의 해시태그에 링크를 걸어준다.
    var tags = document.querySelectorAll('.post-tag');
    if(tags == null || tags.length < 1) {
        return;
    }

    for (var i = 0; i < tags.length; i++) {
        var item = tags[i];
        var tagList = item.innerHTML.trim();

        if(/^\s*$/.test(tagList)) {
            continue;
        }
        tagList = tagList.split(/\s+/)
            .map(function(tag) {
                return `<a href="/tag/#${tag}">#${tag}</a>`;
            })
            .join(' ');
        tags[i].innerHTML = tagList;
    }
    return;
})();
;(function() {
    // 본문 전체의 vimwiki 링크를 html 링크로 변환한다.
    var post = document.querySelector('article.post-content');
    let col = window.location.pathname.split("/")[1]

    if(post == null) {
        return;
    }

    (function iterate_node(node) {

        if (/^(?:p|ul|h\d|table)$/i.test(node.tagName)) {

            node.innerHTML = link(node.innerHTML);

        } else { // Node.ELEMENT_NODE
            for (var i = 0; i < node.childNodes.length; i++) {
                iterate_node(node.childNodes[i]);
            }
        }
    })(post);

    function link(content) {
        // {% assign collections = site.collections | sort: 'number' | map: 'label' | shift | join: '", "' %}
        const wiki = ["{{ collections }}"]

        // (주석처리) "\[[escape]]" 와 같이 앞에 "\"가 있다면 "\[\[escape\]\]" 로 바꾸기만 하고 링크는 생성하지 않는다.
        //                            \[[      ]]
        content = content.replace(/\\\[\[(.+?)\]\]/g, '\\[\\[$1\\]\\]');

        // (태그, 타이틀 처리) "[[#tagName#]]{text}"를 <a href="/wiki/tagName#">text</a> 로 replace하여 링크를 만든다.
        //                           [[#           #]]      {            }
        content = content.replace(/\[\[#([^\[\]]+?)#\s*\]\]\{([^\{\}]+?)\}/g,
            '<a href="/tag#$1" class="inner-link labeled-link" data-name="$1"><sup class="tagged-link"/></sup>$2</a>');

        // (태그 처리) "[[#tagName#]]"을 <a href="/wiki/tagName#">tagName</a> 로 replace하여 링크를 만든다.
        //                           [[#           #]]
        content = content.replace(/\[\[#([^\[\]]+?)#\s*\]\]/g,
            '<a href="/tag#$1" class="inner-link labeled-link" data-name="$1"><sup class="tagged-link"/></sup>$1</a>');

        // (위키간 이동 처리) 다른 wiki로 이동하는 경로인 경우 wiki(n): 을 제거하고 col 값을 해당 collection으로 바꾼다.
        content = content.replace(/\[\[?wiki(\d)\:\/?/g, (match, p1) => {
            col = wiki[p1]
            return '[[';
        });

        // (추가 타이틀 처리) 다음과 같은 문자열을 <a href="/wiki/document">document-name</a> 으로 replace하여 링크를 만든다.
        //  [[document]]{document-name}       => <a href="/wiki/document">document-name</a>
        //  [[/document]]{document-name}      => <a href="/wiki/document">document-name</a>
        //  [[/dir/document]]{document-name}  => <a href="/wiki/dir/document">document-name</a>
        content = content.replace(/\[\[\/?([^\[\]]+?)\s*\]\]\{([^\{\}]+?)\}/g,
            `<a href="/${col}/$1" class="inner-link labeled-link" data-name="$1">$2</a>`);

        // "[[document]]"가 있다면 <a href="/wiki/document">document</a> 와 같이 replace하여 링크를 만든다.
        //  예제는 (추가 타이틀 처리)와 거의 비슷하다.
        content = content.replace(/\[\[\/?(.+?)\s*\]\]/g,
            `<a href="/${col}/$1" class="inner-link no-labeled-link" data-name="$1">$1</a>`);

        // (주석처리)에서 이스케이프한 문자열을 본래 표현하려 한 형식으로 되돌린다.
        content = content.replace(/\\\[\\\[(.+?)\\\]\\\]/g, '[[$1]]');

        return content;
    }

})();

;(function() {
    // 파일 이름이 링크 텍스트로 드러난 것을 문서의 타이틀로 교체해준다.
    const list = document.querySelectorAll('.no-labeled-link');

    for (var i = 0; i < list.length; i++) {
        insertTitle(i, list);
    }
    /**
     * 타이틀이 누락된 문서의 타이틀을 가져와 입력해 줍니다.
     */
    function insertTitle(index, list) {
        const item = list[index];
        if (item == undefined) {
            return;
        }
        const target = item.getAttribute('data-name')
            .replace(/#.*$/, '');

        let status = undefined;
        fetch(`/data/metadata/${target}.json`)
            .then(response => {
                status = response.status;
                return response.json()
            })
            .then(function(data) {
                if (data == null) {
                    return;
                }
                item.innerText = data.title;
                return;
            })
            .catch(function(error) {
                item.classList.add('error-link');
                item.innerHTML += `<sub class="link-${status}"></sub>`
                console.log(target, status);
            });
    }
})();

;(function() {
    // 외부 링크에 표시를 달아준다.
    const links = document.links;

    for (let i = 0; i < links.length; i++) {
        const link = links[i];
        const url = link.getAttribute('href');
        if (/^(https?:\/\/)?crackyachae\.github\.io/.test(url) || /^[\/#]/.test(url)) {
            // inner link
        } else {
            // external link
            link.classList.add('external-link')
        }

    }
})();

;(function footnoteToolTip() {
    // 주석에 툴팁을 붙인다
    const noteList = document.querySelectorAll('.footnote');

    for (let i = 0; i < noteList.length; i++) {
        const note = noteList[i];
        const id = note.getAttribute('href')
            .replace(/^#/, "");
        const text = document.getElementById(id).innerText
            .replace(/ ↩.*$/, "");
        note.setAttribute('title', text);
    }
})();
