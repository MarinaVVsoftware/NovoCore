var fetch = require("isomorphic-fetch");
var Dropbox = require("dropbox").Dropbox;

function DropboxInstance(config) {
  var dropbox = new Dropbox({
    accessToken: config.key,
    fetch: fetch
  });

  /* Si falla dropbox arroja un objeto error */
  if (!dropbox.error) return dropbox;
  else return null;
}

module.exports = DropboxInstance;
