#!/usr/bin/env node

const YAML = require('yamljs');
const fs = require('fs');
const path = './_wiki'
const list = [];

getFiles('./_wiki', 'wiki', list);
getFiles('./_posts', 'blog', list);

const dataList = list.map(function collectData(file) {

    const data = fs.readFileSync(file.path, 'utf8');
    return parseInfo(file, data.split('---')[1]);

}).filter(function removeNullData(row) {

    return row != null;

}).filter(function removePrivate(row) {

    return row.public != 'false';

}).sort(function sortByFileName(a, b) {

    return a.fileName.toLowerCase().localeCompare(b.fileName.toLowerCase());

});

const tagMap = {};

dataList.forEach(function collectTagMap(data) {
    if (!data.tag) {
        return;
    }
    data.tag.forEach(function(tag) {
        if (!tagMap[tag]) {
            tagMap[tag] = [];
        }
        tagMap[tag].push({
            fileName: data.fileName,
            // updated: data.updated || data.date,
        });
    });
});

for (tag in tagMap) {
    tagMap[tag].sort(function sortByFileName(a, b) {
        return a.fileName.toLowerCase().localeCompare(b.fileName.toLowerCase());
    });
}
saveTagMap(tagMap);

const pageMap = {};
dataList.sort(function(a, b) {
    return a.url.toLowerCase().localeCompare(b.url.toLowerCase());
}).forEach(function(page) {

    pageMap[page.fileName] = {
        type: page.type,
        title: page.title,
        summary: page.summary,
        parent: page.parent,
        url: page.url,
        updated: page.updated || page.date,
        children: [],
    };

});

dataList.forEach(function(page) {
    if (page.parent && page.parent != 'index') {

        var parent = pageMap[page.parent];

        if (parent && parent.children) {
            parent.children.push(page.fileName);
        }
    }
});

savePageList(pageMap);

saveTagFiles(tagMap, pageMap);

saveTagCount(tagMap);

function saveTagMap(tagMap) {
    fs.writeFile("./_data/tagMap.yml", YAML.stringify(tagMap), function(err) {
        if (err) {
            return console.log(err);
        }
        console.log("tagMap saved.");
    });
}

/**
 * tag ????????? ?????? ????????? ?????????.
 * ??? ?????? ????????? ????????? json ????????? ?????? ??????.
 * ?????? ?????? math ?????? ????????? ????????? ./data/tag/math.json ????????? ???????????????.
 * json ????????? ????????? fileName??? collection?????? ????????????.
 * ????????? GNU.json ????????? ?????????.
 *
{
  "fileName": "agile",
  "collection": {
    "agile": {
      "type": "wiki",
      "title": "?????????(agile)??? ?????? ????????? ??????",
      "summary": "",
      "parent": "software-engineering",
      "url": "/wiki/agile",
      "updated": "2020-01-20 21:57:44 +0900",
      "children": []
    },
    "Tompson-s-rule-for-first-time-telescope-makers": {
      "type": "wiki",
      "title": "????????? ?????? (Telescope Rule)",
      "summary": "4?????? ???????????? ?????? ????????? 6?????? ???????????? ????????? ??????, 6?????? ????????? ?????? ????????? ????????? ??? ?????????",
      "parent": "proverb",
      "url": "/wiki/Tompson-s-rule-for-first-time-telescope-makers",
      "updated": "2019-11-24 09:36:53 +0900",
      "children": []
    }
  }
}
 */
function saveTagFiles(tagMap, pageMap) {
    for (let tag in tagMap) {
        var map = {
            fileName: tag,
            collection: {}
        };
        var tagData = tagMap[tag];
        for (var i in tagData) {
            var fileName = tagData[i].fileName;
            map.collection[fileName] = pageMap[fileName]
        }

        fs.writeFile("./data/tag/" + tag + ".json", JSON.stringify(map), function(err) {
            if (err) {
                return console.log(err);
            }
        });
    }
}

/**
 * ?????? ????????? ?????? ?????? ????????? ?????? ./_data/tagCount.yml ????????? ????????????.
 * ?????? ACM ????????? ?????? ????????? 1??? ??????, agile ????????? ?????? ????????? 5??? ????????? tagCount.yml ????????? ????????? ?????? ????????? ?????? ??????.
-
    name: ACM
    size: 1
-
    name: agile
    size: 5
 */
function saveTagCount(tagMap) {
    var list = [];
    for (var tag in tagMap) {
        list.push({
            name: tag,
            size: tagMap[tag].length
        });
    }
    var sortedList = list.sort((a, b) =>
        a.name.toLowerCase().localeCompare(b.name.toLowerCase()));

    fs.writeFile("./_data/tagCount.yml", YAML.stringify(sortedList), function(err) {
        if (err) {
            return console.log(err);
        }
        console.log("tagCount saved.");
    });
}

function savePageList(pageMap) {
    fs.writeFile("./_data/pageMap.yml", YAML.stringify(pageMap), function(err) {
        if (err) {
            return console.log(err);
        }
        console.log("pageMap saved.");
    });
}

function parseInfo(file, info) {
    if (info == null) {
        return undefined;
    }
    const obj = {};
    obj.fileName = file.name.replace(/\.md$/, '');
    obj.type = file.type;

    const rawData = info.split('\n');

    rawData.forEach(function(str) {
        const result = /^\s*([^:]+):\s*(.+)\s*$/.exec(str);

        if (result == null) {
            return;
        }

        const key = result[1].trim();
        const val = result[2].trim().replace(/\[{2}|\]{2}/g, '');

        obj[key] = val;
    });

    if (file.type === 'blog') {
        obj.url = '/blog/' + obj.date.replace(/^(\d{4})-(\d{2})-(\d{2}).*$/, '$1/$2/$3/');
        obj.url += obj.fileName.replace(/^(\d{4}-\d{2}-\d{2}-)?(.*)$/, '$2');
    } else if (file.type === 'wiki') {
        obj.url = '/wiki/' + obj.fileName;
    }

    if (obj.tag) {
        obj.tag = obj.tag.split(/\s+/);
    }

    const mtime = fs.statSync(file.path).mtime;
    obj.modified = mtime;

    return obj;
}

function isDirectory(path) {
    return fs.lstatSync(path).isDirectory();
}

function isMarkdown(fileName) {
    return /\.md$/.test(fileName);
}

function getFiles(path, type, array) {

    fs.readdirSync(path).forEach(function(fileName) {

        const subPath = path + '/' + fileName;

        if (isDirectory(subPath)) {
            return getFiles(subPath, type, array);
        }
        if (isMarkdown(fileName)) {
            const obj = {
                'path': path + '/' + fileName,
                'type': type,
                'name': fileName,
                'children': [],
            };
            return array.push(obj);
        }
    });
}
