(function() {
    function getTarget() {
        const thisName = document.getElementById('thisName').value;
        return encodeURI(thisName);
    }

    function walkParents(data) {
        let plist = [];
        let target = getTarget();

        for (let i = 0; i < 100; i++) {
            if (target == 'index') {
                break;
            }
            const next = data[target];
            if (!next || !next.parent || next.parent.length < 1) {
                break;
            }
            next['url'] = `/${next.collection}/${target}`
            // 1레벨 상위 부모 문서의 주소
            next['parent'] = next['parent'].replace(/^[/]/, '');
            plist.unshift(next);
            target = encodeURI(next.parent);
        }

        plist.pop();
        return plist;
    }

    function makeHTML(plist) {
        if (plist == null || plist.length < 1) {
            return "";
        }
        let pr = "상위 문서: "
        for (let i = 0; i < plist.length; i++) {
            pr += `<a href="${plist[i].url}">${plist[i].title}</a>`;
            if (i < plist.length - 1) {
                pr += `<span> - </span>`;
            }
        }
        return pr;
    }

    axios.get('/data/wikilist.json', {})
        .then(function(resp) {
            if (resp.data == null) {
                return;
            }
            const plist = walkParents(resp.data);
            document.getElementById('parent-list').innerHTML = makeHTML(plist);

            return;
        });
})();
