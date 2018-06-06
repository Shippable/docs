var fs = require('fs');
var glob = require('glob');
var readline = require('readline');
var stream = require('stream');
var _ = require('underscore');
var async = require('async');
const yaml = require('js-yaml');

var searchJSON = [];
var filePaths = [];

var SimpleMarkdown = require("simple-markdown");
var mdParse = SimpleMarkdown.defaultBlockParse;

var marked = require('marked');
var renderer = new marked.Renderer();
var he = require('he');
var gbag = null;
var headingCounter = 0;
var listItemsCounter = 0;
var paragraphCounter = 0;
var codeCounter = 0;
var currentHeadingLink = null;

renderer.heading = function (text, level) {
    _addHeading(text);
    return "";
}

renderer.paragraph = function (text) {
    if (text.match(/main_section/g) != null) {
        var arr = text.split(/\r?\n/);

        arr.forEach(function (sections) {
            var parts = sections.split(/:/);

            if (parts[0] === "main_section") {
                gbag.data.main_section = parts[1];
            } else if (parts[0] === "sub_section") {
                gbag.data.sub_section = parts[1];
            } if (parts[0] === "page_main_title") {
                gbag.data.page_main_title = parts[1];
            }
        });
    } else {
        var paragraph = _removeTagsAndExtraWhiteSpace(text);

        if (paragraph.trim().length > 0) {
            // check if sub headings
            if (paragraph.startsWith("#")) {
                // remove #
                paragraph = paragraph.substring(paragraph.match(/^#*/)[0].length);
                _addHeading(paragraph);
            } else {
                paragraphCounter++;
                var property = "paragraph" + paragraphCounter;

                gbag.data.page_paragraphs[property] = paragraph;
                gbag.data.paragraphs_link_map[property] = currentHeadingLink;
            }
        }
    }

    return "";
}

renderer.listitem = function (text) {
    var list_item = _removeTagsAndExtraWhiteSpace(text);

    if (list_item.trim().length > 0) {
        listItemsCounter++;
        var property = "list_item" + listItemsCounter;
        gbag.data.page_listitems[property] = list_item;
        gbag.data.listitems_link_map[property] = currentHeadingLink;
    }

    return "";
}

renderer.code = function (code, language) {
    var code_snippet = _replaceNewLinesWithSpaces(code);

    codeCounter++;
    var property = "code" + codeCounter;
    gbag.data.page_code_snippets[property] = code_snippet;
    gbag.data.code_snippets_link_map[property] = currentHeadingLink;

    return "";
}

function parseDocsYml() {
    glob("../sources/**/*.md", function (err, res) {
        if (err)
            console.log('Error while getting the files');
        filePaths = res;
        async.eachSeries(filePaths,
            function (filePath, callback) {

                headingCounter = 0;
                listItemsCounter = 0;
                paragraphCounter = 0;
                codeCounter = 0;

                var path = filePath;
                var data = {
                    page_name: '',
                    main_section: '',
                    sub_section: '',
                    page_main_title: '',
                    page_main_heading: null,
                    page_headings: new Object(),
                    page_paragraphs: new Object(),
                    page_listitems: new Object(),
                    page_code_snippets: new Object(),
                    page_baselink: '',
                    headings_link_map: new Object(),
                    paragraphs_link_map: new Object(),
                    listitems_link_map: new Object(),
                    code_snippets_link_map: new Object()
                };

                data.page_name = path.replace('docs/sources/', '');
                data.page_name = data.page_name.replace('.md', '');
                data.page_baselink = 'http://docs.shippable.com/' + data.page_name;

                var bag = {
                    filePath: filePath,
                    data: data
                };

                async.series([
                        _parseFileMD.bind(null, bag)
                    ],
                    function (err) {
                        if (err)
                            console.log('Error');
                        return callback();
                    }
                );
            },
            function (err) {
                if (err)
                    console.log('failed');

                var json = JSON.stringify(searchJSON);
                console.log(json);

                fs.writeFile('index.json', json);
            }
        );
    });
}

function _addHeading(text) {
    var heading = _removeExtraWhiteSpace(text);
    var hashTag = heading.replace(/ /g, '-').toLowerCase();
    var link = gbag.data.page_baselink + "/#" + hashTag

    var property = null;
    if (gbag.data.page_main_heading == null) {
        property = "page_main_heading";
        gbag.data.page_main_heading = heading;
    } else {
        headingCounter++;
        property = "heading" + headingCounter;
        gbag.data.page_headings[property] = heading;
    }

    gbag.data.headings_link_map[property] = link;
    currentHeadingLink = link;
}

function _removeTagsAndExtraWhiteSpace(string) {
    var re = /<(?:[^>=]|='[^']*'|="[^"]*"|=[^'"][^\s>]*)*>/gi;
    string = string.replace(re, ' ');
    string = string.replace(/\s\s+/g, ' ');

    return he.decode(_.unescape(string));
}

function _removeExtraWhiteSpace(string) {
    return he.decode(_.unescape(string.replace(/\s\s+/g, ' ')));
}

function _replaceNewLinesWithSpaces(string) {
    return he.decode(_.unescape(string.replace(/[\r\n]+/g," ")));
}

function _parseFileMD(bag, next) {
    fs.readFile(bag.filePath, 'utf8', function(err, contents) {
        // check for empty md file
        var numH1 = (contents.match(/#/g) || []).length;
        if (numH1 > 1) {
            gbag = bag;
            marked(contents, {renderer: renderer});
            searchJSON.push(bag.data);
        }
        return next();
    });
}

var propertyMap = new Object();

function parseMkDocsYml() {
    try {
        const config = yaml.safeLoad(fs.readFileSync('../mkdocs.yml', 'utf8'));
        const indentedJson = JSON.stringify(config, null, 4);
        console.log(indentedJson);
        iterate(config, '')
    } catch (e) {
        console.log(e);
    }

    async.forEach(Object.keys(propertyMap), function (key, callback){
        console.log(key);

        var fileName = "../sources/" + key;
        writeToStartOfFile(fileName, propertyMap[key]);

        // tell async that that particular element of the iterator is done
        callback();

    }, function(err) {
        console.log('iterating done');
    });
}

function writeToStartOfFile(file, pageTitle) {
    var data = fs.readFileSync(file, "utf-8"); //read existing contents into data

    if (data.indexOf("page_main_title") == -1) {

        var buffer = new Buffer("page_main_title: " + pageTitle) + "\n";
        var wstream = fs.createWriteStream(file);

        wstream.on("finish", function() {
        });

        wstream.write(buffer);
        wstream.write(data);
        wstream.end();
    }
}

function iterate(obj, stack) {
    for (var property in obj) {
        if (obj.hasOwnProperty(property)) {
            if (typeof obj[property] == "object") {
                iterate(obj[property], stack + '.' + property);
            } else {
                var value = obj[property].toString();
                if (value.indexOf('.md') > 0) {
                    propertyMap[value.trim()] = property.toString();
                }
            }
        }
    }
}

var prop = null;
function iterateObject(obj) {
    for (var property in obj) {
        if (obj.hasOwnProperty(property)) {
            if (typeof obj[property] == "object") {
                if (obj[property].hasOwnProperty("matchLevel")
                    && obj[property].matchLevel === 'full') {
                    prop = property;
                    return obj[property];
                }  else {
                        var val = iterateObject(obj[property]);
                        if (val) {
                            return val;
                        }
                }
            }
        }
    }
}

parseDocsYml();
parseMkDocsYml();
