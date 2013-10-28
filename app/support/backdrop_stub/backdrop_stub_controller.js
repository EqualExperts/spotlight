define(['support/backdrop_stub/response_fetcher'], function (ResponseFetcher) {

  return function(req, res){
    var fetcher = new ResponseFetcher();
    var json = fetcher.fetch_json(req);
    if (json) {
      return res.json(json);
    } else {
      return res.json({error: "no matching response found"});
    }
  };

});