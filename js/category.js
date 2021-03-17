(function() {
    function getTarget() {
        const thisName = document.getElementById('thisName').value;
        return thisName;
    }

    function getChildren(data) {
        const thisName = getTarget();
        let list = [];

        Object.keys(data)
            .forEach(function(key) {
                const item = data[key];
                if (item.parent == thisName) {
                    item.url = `/${item.collection}/${key}`;
                    item.updated = item.updated.replace(/(^\d{4}.\d{2}.\d{2}).*/, '$1');
                    list.push(item);
                }
            });

        list.sort(function(a, b) {
            return a.title.toLowerCase()
                .localeCompare(b.title.toLowerCase());
        });
        return list;
    }

    function getChildrenHTML(list) {
        let children = '';
        for (let i = 0; i < list.length; i++) {
            const url = list[i].url;
            const title = `<span>${list[i].title}</span>`
            const date = `<div class="post-meta" style="float: right;">${list[i].updated}</div>`;
            const summary = (list[i].summary) ? `<div class="post-excerpt"> - ${list[i].summary}</div>` : '';
            children += `<li><a href="${url}" class="post-link">${title}${date}${summary}</a></li>`;
        }
        return children;
    }

    axios
        .get('/data/wikilist.json', {})
        .then(function(resp) {
            if (resp.data == null) {
                return;
            }
            const list = getChildren(resp.data);
            const html = getChildrenHTML(list);
            document.getElementById('document-list').innerHTML = `<ul class="post-list">${html}</ul>`

            return;
        });
})();
