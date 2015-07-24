var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var request = require('request');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../web/archives/sites'), // added web to path
  list: path.join(__dirname, '../web/archives/sites.txt') // added web to path
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj){
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(callback) {
  // navigate to sites.txt
  // use fs to read in file
  // convert to string, then split on \n
  // call callback on each url
  fs.readFile(exports.paths.list, function(err, data) {
    if (err) { throw err; }
    console.log(data.toString());
    data = data.toString().split('\n');
    _.each(data, function(item){
      console.log('ITEM: ',item);
      if (item !== '') callback(item);
    });
  });
};

exports.isNewUrl = function(url, callback) {
  fs.readFile(exports.paths.list, function(err, data) {
    if (err) { throw err; }
    data = data.toString().split('\n');
    var newUrl = _.every(data, function(item){
      return item !== url;
    });
    if(!newUrl) {
      callback(url);
    } else {
      exports.addUrlToList(url, function(url){
        exports.downloadUrls(url);
      });
    }
    // if (bool){
    //   exports.addUrlToList(url, function(){
    //     //redirect to loading screen
    //   });
    // }
  });
};

exports.addUrlToList = function(url, callback) {
  fs.appendFile(exports.path.list, url+'\n', callback);
};



exports.isUrlInList = function(url, callback) {

  exports.readListOfUrls(function(site) {
    if (site === url) {

      callback(site)
    }
  });
  console.log('TESTING');
};


exports.isUrlArchived = function(url, callback){
  fs.exists(path.join(exports.paths.archivedSites, url), function(urlExists){
    urlExists ? callback(url) : exports.downloadUrls(url); // serve loading page?
  });
};

exports.downloadUrls = function(url) {
  request('http://'+url, function(error, response, body) {
    console.log(url);
    console.log(path.join(exports.paths.archivedSites, url));
    fs.writeFile(path.join(exports.paths.archivedSites, url), body, function(error){
      if (error) throw error;
    });
  });
};

//Code below to test exports.downloadUrls directly from Node
// var request = require('request');
// var fs = require('fs');
// var path = require('path');
// var paths = {
//   archivedSites: path.join('/Users/student/Documents/MKS20-web-historian/archives/sites'),
// };
// var downloadUrls = function(url){
//   request('http://'+url, function(error, response, body){
//     fs.writeFile(path.join(paths.archivedSites, url), body, function(error){
//       if (error) throw error;
//     });
//   });
// };
// downloadUrls('www.cnn.com')
