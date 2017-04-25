var client = algoliasearch('JD256SSXSD', '645cadc9c306b19f70bac41e09ad2ecc');
var index = client.initIndex('shippableRCDocs');
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
            var start = suggestion._highlightResult[key].value.indexOf("<em>");
            var end = suggestion._highlightResult[key].value.indexOf("</em>");
            searchResult = suggestion._highlightResult[key].value.substring(start - 10, end + 30);
          }
        }
        return suggestion.main_section + '<br>' +
          suggestion.sub_section + '<br>' +
          searchResult;
      }
    }
  }
]).on('autocomplete:selected', function (event, suggestion) {
  window.location = suggestion.page_link;
});
