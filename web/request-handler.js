var path = require('path');
var archive = require('../helpers/archive-helpers');
var httpHelper = require('./http-helpers');
var fs = require('fs');

exports.handleRequest = function (req, res) {
  actions[req.method](req,res);
  // res.end(archive.paths.list);
};

var routes = {
  '/': function(req,res){
    // httpHelper.headers['Content-Type'] = 'text/plain'
    // res.writeHead(200,httpHelper.headers);
    // res.end('<input>');

  }
};



var actions = {
  'GET':function(req, res){
    // routes[req.url](req,res);
    if (req.url === '/'){
      fs.readFile('./public/index.html', function(err, data){
        res.writeHead(200, httpHelper.headers);
        res.end(data.toString());
      });
      return;
    }
    var pathName = req.url.slice(1)
    if (pathName.indexOf('www')!== -1){
      archive.isUrlInList(pathName, function(site){
        httpHelper.serveAssets(res, path.join(archive.paths.archivedSites, site), function() {
          console.log('done');
        });
      });
    }

    // if req.url === '/'
      // go to homepage
    // else if req.url is one of our archived sites, then serve up page
    // else 404
  },
  'POST':function(req,res){
    // if archived
      // serve up page
    // else show loading page
    // if ! on list
      // add to list
  }
}
