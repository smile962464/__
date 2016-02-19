(function (global, $, Rx) {

  function searchTB (term) {
    return $.ajax({
      url: 'http://suggest.taobao.com/sug',
      dataType: 'jsonp',
      data: {
        // format: 'json',
        code: 'utf-8',
        q: term
      }
    }).promise();
  }

  function main() {
    var $input = $('#textInput'),
        $results = $('#results');

    // Get all distinct key up events from the input and only fire if long enough and distinct
    var keyup = Rx.Observable.fromEvent($input, 'keyup')
      .map(function (e) {
        return e.target.value; // Project the text from the input
      })
      .filter(function (text) {
        return text.length > 2; // Only if the text is longer than 2 characters
      })
      .debounce(250 /* Pause for ms */ )
      .distinctUntilChanged(); // Only if the value has changed

    var searcher = keyup.flatMapLatest(searchTB);

    searcher.subscribe(
      function (data) {
        $results
          .empty()
          .append ($.map(data.result, function (v) { return $('<li>').text(v); }));
      },
      function (error) {
        $results
          .empty()
          .append($('<li>'))
          .text('Error:' + error);
      });
  }

  $(main);

}(window, jQuery, Rx));
