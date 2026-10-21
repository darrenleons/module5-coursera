// ajax-utils.js
// Small helper for GET requests. Exposes $ajaxUtils.sendGetRequest.
(function (global) {
  var ajaxUtils = {};

  // Returns an HTTP request object
  function getRequestObject() {
    if (global.XMLHttpRequest) {
      return new XMLHttpRequest();
    }
    global.alert("Ajax is not supported!");
    return null;
  }

  // Makes an Ajax GET request to 'requestUrl'.
  // When the response is ready, 'responseHandler' is called with the
  // response text (or the parsed JSON when 'isJsonResponse' is true).
  ajaxUtils.sendGetRequest = function (requestUrl, responseHandler, isJsonResponse) {
    var request = getRequestObject();
    request.onreadystatechange = function () {
      handleResponse(request, responseHandler, isJsonResponse);
    };
    request.open("GET", requestUrl, true);
    request.send(null);
  };

  function handleResponse(request, responseHandler, isJsonResponse) {
    if (request.readyState === 4 && request.status === 200) {
      // Default to JSON when the flag is not specified
      if (isJsonResponse === undefined) {
        isJsonResponse = true;
      }

      if (isJsonResponse) {
        responseHandler(JSON.parse(request.responseText));
      } else {
        responseHandler(request.responseText);
      }
    }
  }

  global.$ajaxUtils = ajaxUtils;
})(window);
