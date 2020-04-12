// 模板编译 template compile
var html =
    '<div :class="c" class="demo" v‐if="isShow"><span v‐for="item in sz">{{item}}</span></div>';

// parse 会用正则等方式将 template 模板中进行字符串解析，得到指令、class、style 等数据，形成 AST

const ncname = "[a‐zA‐Z_][\w‐.]*";
const singleAttrIdentifier = /([^\s"'<>/=]+)/;
const singleAttrAssign = /(?:=)/;
const singleAttrValues = [
    /"([^"]*)"+/.source,
    /'([^']*)'+/.source,
    /([^\s"'=<>`]+)/.source,
];
const attribute = new RegExp(
    "^\\s*" +
        singleAttrIdentifier.source +
        "(?:\\s*(" +
        singleAttrAssign.source +
        ")" +
        "\\s*(?:" +
        singleAttrValues.join("|") +
        "))?"
);
const qnameCapture = "((?:" + ncname + ":)?" + ncname + ")";
const startTagOpen = new RegExp("^<" + qnameCapture);
const startTagClose = /^\s*(\/?)>/;
const endTag = new RegExp("^<\\/" + qnameCapture + "[^>]*>");
const defaultTagRE = /\{\{((?:.|\n)+?)\}\}/g;
const forAliasRE = /(.*?)\s+(?:in|of)\s+(.*)/;

// 解析 template 采用循环进行字符串匹配的方式，所以每匹配解析完一段
// 我们需要将已经匹配的去掉，头部的指针指向接下来需要匹配的部分。
function advance(n) {
    index += n;
    html = html.substring(n);
}

// 解析起始标签
function parseStartTag() {
    const start = html.match(startTagOpen);
    console.log("start: ", html, start)
    if (start) {
        const match = {
            tagName: start[1],
            // 存放标签内的属性
            attrs: [],
            start: index,
        };
        advance(start[0].length);
        let end, attr;
        while (
            !(end = html.match(startTagClose)) &&
            (attr = html.match(attribute))
        ) {
            advance(attr[0].length);
            match.attrs.push({
                name: attr[1],
                value: attr[3],
            });
        }
        if (end) {
            match.unarySlash = end[1];
            advance(end[0].length);
            match.end = index;
            return match;
        }
    }
}

console.log(parseStartTag())