var client = algoliasearch('JD256SSXSD', '645cadc9c306b19f70bac41e09ad2ecc');
var index = client.initIndex('shippableRCDocs');
$('#shippable-search').autocomplete({ hint: true, openOnFocus: true }, [
  {
    source: function(q, cb) {
      index.search(q, { hitsPerPage: 5 }, function(error, content) {
        if (error) {
          cb([]);
          return;
        }
        cb(content.hits, content);
      });
    },
    displayKey: function (suggestion) {
      return suggestion.main_section;
    },
    templates: {
      suggestion: function(suggestion) {
        var searchResult = '';
        for (var key in suggestion._highlightResult) {
          // skip loop if the property is from prototype
          if (!suggestion._highlightResult.hasOwnProperty(key)) continue;

          if (suggestion._highlightResult[key].matchLevel === 'full') {
            var start = suggestion._highlightResult[key].value.indexOf("<em>");
            var end = suggestion._highlightResult[key].value.indexOf("</em>");
            searchResult = suggestion._highlightResult[key].value.substr(start - 10, end - start + 30);
          }
        }
        return  suggestion.main_section + '<br>' +
          suggestion.sub_section + '<br>' +
          searchResult;
      }
    }
  }
]).on('autocomplete:selected', function (event, suggestion) {
  console.log('event', event);
  console.log('suggestion', suggestion);
  window.location = suggestion.page_link;
});
