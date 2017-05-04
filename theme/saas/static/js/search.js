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

          // iterating to find the key that matched the input value
          var start = 0, end = 0, em;
          for (var key in suggestion._highlightResult) {

            // To find the text which has the matched characters with the input value
            if (suggestion._highlightResult[key].matchLevel === 'full') {

                if (key.indexOf("heading") != -1) {
                    suggestion.link = suggestion.headings_link_map[key];
                } else if (key.startsWith("paragraph")) {
                    suggestion.link = suggestion.paragraphs_link_map[key];
                } else if (key.startsWith("list_item")) {
                    suggestion.link = suggestion.listitems_link_map[key];
                } else if (key.startsWith("code")) {
                    suggestion.link = suggestion.code_snippets_link_map[key];
                } else if (!key.startsWith("sub_sub_section")){
                    continue;
                }

                var content = suggestion._highlightResult[key].value;
                searchResult = "";

                while (searchResult.split(' ').length <= 6) {
                    em = content.indexOf("<em>", start);

                    if (em != -1) {
                        if (start != 0) {
                            // clip text for multiple matches
                            searchResult += content.substr(start, em - start);
                        }

                        start = em + 4;
                        end = content.indexOf("</em>", start);
                        searchResult += content.substr(start, end - start);
                        start = end + 5;
                    } else {
                        searchResult += content.substr(start, content.length - start);
                        break;
                    }
                }

                break;
              }
          }

          var sub_section = suggestion.sub_sub_section ? suggestion.sub_sub_section : suggestion.sub_section;

          return searchResult + '<br>' + '<p>' + suggestion.main_section +
            '  <svg width="6" height="10" viewBox="0 0 6 10"><path fill="#6D86A5" d="M0 10l6-5-6-5" fill-rule="evenodd"/></svg>  '
              + sub_section + '</p>';
        }
      }
    }
  ]).on('autocomplete:selected', function (event, suggestion) {
    window.location = suggestion.link;
  });
