var client = algoliasearch('JD256SSXSD', '645cadc9c306b19f70bac41e09ad2ecc');
var index = client.initIndex('rcdocsindex');
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
        var searchResult = '';
        // iterating to find the key that matched the input value
        for (var key in suggestion._highlightResult) {
          // To find the text which has the matched characters with the input value
          if (suggestion._highlightResult[key].matchLevel === 'full') {
            var content = suggestion._highlightResult[key].value;
            var start = content.indexOf("<em>") + 4;
            var end = content.indexOf("</em>");
            searchResult = content.substr(start, end - start) + content.substr(end + 5, 30);

            if (key.startsWith("page_heading")) {
                suggestion.link = suggestion.page_map[key];
            } else {
              suggestion.link = suggestion.page_baselink;
            }

            break;
          }
        }
        return searchResult + '<br>' + '<p>' + suggestion.main_section +
          '  <svg width="6" height="10" viewBox="0 0 6 10"><path fill="#6D86A5" d="M0 10l6-5-6-5" fill-rule="evenodd"/></svg>  ' +
          suggestion.sub_section + '</p>';
      }
    }
  }
]).on('autocomplete:selected', function (event, suggestion) {
  window.location = suggestion.link;
});
