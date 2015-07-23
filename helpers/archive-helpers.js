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
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj){
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(callback){
  // navigate to sites.txt
  // use fs to read in file
  // convert to string, then split on \n
  // call callback on each url

  fs.readFile(exports.paths.list, function(err, data){
    if (err) { throw err; }
    console.log(data.toString());
    data = data.toString().split('\n');
    _.each(data, function(item){
      console.log('ITEM ',item);
      if (item !== '') callback(item);
    });
  });
};

// exports.isUrlInList = function(url, callback){
//   var found = false;
//   exports.readListOfUrls(function(site){
//     if (site === url){
//       // callback(site) √
//       // callback(true) ?
//       found = true;
//     }
//   });
//   callback(found); //?
// };

// exports.addUrlToList = function(url, callback){
//   fs.appendFile(exports.path.list, url+'\n', callback); //anonymous?
// };

// exports.isUrlArchived = function(url, callback){
//   fs.exists(path.join(exports.paths.archivedSites, url), function(bool){
//     callback(bool);
//   });
// };

exports.downloadUrls = function(url){
  request('http://'+url, function(error, response, body){
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
