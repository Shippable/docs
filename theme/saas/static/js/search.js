  var client = algoliasearch('JD256SSXSD', '645cadc9c306b19f70bac41e09ad2ecc');
  var index = client.initIndex('rctestindex');
  var autocompleteOptions = {
    hint: true, // auto suggestions on user inputs
    openOnFocus: true // opens the dropdown menu when the input is focused
  };
  var searchOptions = {
    hitsPerPage: 5 // represents the total number of searchResults
  };
  $('#shippable-search').autocomplete(autocompleteOptions, [
    {
      source: function(query, callback) {
        index.search(query, searchOptions,
          function(error, content) {
            if (error) {
              callback([]);
              return;
            }
            callback(content.hits, content);
          }
        );
      },
      displayKey: function (suggestion) {
        return suggestion.main_section;
      },
      templates: {
        suggestion: function(suggestion) {

            var searchResult = suggestion.page_main_heading;
            suggestion.link = suggestion.headings_link_map["page_main_heading"];

            var key =  null;
            var partialMatchObject = null;

            function iterateObject(obj) {
                for (var property in obj) {
                    if (obj.hasOwnProperty(property)) {
                        if (typeof obj[property] == "object") {
                            if (obj[property].hasOwnProperty("matchLevel")
                                && obj[property].matchLevel === "full") {
                                key = property;
                                return obj[property];
                            } else {

                                if ((typeof obj[property] == "object")
                                    && obj[property].hasOwnProperty("matchLevel")
                                    && (obj[property].matchLevel === "partial")
                                    && (partialMatchObject == null)) {
                                    key = property;
                                    partialMatchObject = obj[property];
                                }

                                var val = iterateObject(obj[property]);
                                if (val) {
                                    return val;
                                }
                            }
                        }
                    }
                }
            }

            function findProperty(obj, prop) {
                for (var property in obj) {
                    if (obj.hasOwnProperty(property) && (typeof obj[property] == "object")) {
                        if (property == prop) {
                            return obj[property];
                        } else {
                            var val = findProperty(obj[property], prop);
                            if (val) {
                                return val;
                            }
                        }
                    }
                }
            }

            var matchingObject = iterateObject(suggestion._highlightResult) || partialMatchObject;
            if (matchingObject) {
                matchingObject = findProperty(suggestion._snippetResult, key);

                searchResult = matchingObject.value;
                searchResult = searchResult.replace(/<em>/g, "<font color='DarkBlue'>");
                searchResult = searchResult.replace(/<\/em>/g, "</font>");

                if (key.indexOf("heading") != -1) {
                    suggestion.link = suggestion.headings_link_map[key];
                } else if (key.startsWith("paragraph")) {
                    suggestion.link = suggestion.paragraphs_link_map[key];
                } else if (key.startsWith("list_item")) {
                    suggestion.link = suggestion.listitems_link_map[key];
                } else if (key.startsWith("code")) {
                    suggestion.link = suggestion.code_snippets_link_map[key];
                }
            }

            var sub_section = suggestion.page_main_title ? suggestion.page_main_title : suggestion.sub_section;

            return '<p>' + suggestion.main_section +
                '  <svg width="6" height="10" viewBox="0 0 6 10"><path fill="#6D86A5" d="M0 10l6-5-6-5" fill-rule="evenodd"/></svg>  '
                + sub_section + '</p>'
                + searchResult;
        }
      }
    }
  ]).on('autocomplete:selected', function (event, suggestion) {
    window.location = suggestion.link;
  });
