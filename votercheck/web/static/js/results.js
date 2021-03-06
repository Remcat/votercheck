
var Results = function(resultsElement) {
  resultsElement.html('');
  resultsElement.text("Searching...");

  this.showResults = function(resultDatas) {
    resultsElement.html('');

    if (!resultDatas.matches) {
      this.showError();
      return;
    }

    if (resultDatas.matches.length == 0) {
      resultsElement.text('No matches found.');
      resultsElement.append('<p>');
      resultsElement.append(document.createTextNode("Make sure to enter all your information correctly."));
      return;
    }

    var fields = [['last_name', 'Last Name'],
                  ['middle_name', 'M'],
                  ['first_name', 'First Name'],
                  ['zip', 'Zip Code'],
                  ['status', 'Status'],
                  ['status_why', 'Status Reason'],
                  ['purged', 'Purged Date', 'date'],
                  ['inactive', 'Inactive Date', 'date']];

    var header = $('<div class="result-header"></div>');
    fields.forEach(function(i) {
      var field = $('<div class="result-field"/>');
      field.text(i[1]);
      field.addClass(i[0]);
      for (var extra = 2; extra < i.length; extra++) {
        field.addClass(i[extra]);
      }
      header.append(field);
    });
    resultsElement.append(header);

    var isOdd = false;

    resultDatas.matches.forEach(function(data) {
      var resultDiv = $('<div class="result"></div>')
      resultDiv.addClass(isOdd ? 'odd' : 'even');
      isOdd = !isOdd;

      fields.forEach(function(i) {
        var field = $('<div class="result-field"/>');
        field.addClass(i[0]);

        for (var extra = 2; extra < i.length; extra++) {
          field.addClass(i[extra]);
        }

        var span = $('<span/>');
        span.attr('title', i[1] + ': ' + data[i[0]]);
        span.text(data[i[0]]);
        field.append(span);
        resultDiv.append(field);
      });
      resultsElement.append(resultDiv);
    });

    if (resultDatas.count > resultDatas.matches.length) {
      var resultDiv = $('<div class="result"></div>')
      resultDiv.text("Showing " + resultDatas.matches.length + " / " + resultDatas.count);
      resultsElement.append(resultDiv);
    }
  };

  this.showError = function() {
    resultsElement.text("Error");
  };
};
