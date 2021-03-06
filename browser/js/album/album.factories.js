
juke.factory('StatsFactory', function ($q) {
  var statsObj = {};
  statsObj.roundDown = function (duration) {
    return Math.floor(duration/60);
  };
  statsObj.totalTime = function (album) {
    var audio = document.createElement('audio');
    return $q(function (resolve, reject) {
      var sum = 0;
      var n = 0;
      function resolveOrRecur () {
        if (n >= album.songs.length) resolve(sum);
        else audio.src = album.songs[n++].audioUrl;
      }
      audio.addEventListener('loadedmetadata', function () {
        sum += audio.duration;
        resolveOrRecur();
      });
      resolveOrRecur();
    });
  };
  return statsObj;
});

juke.factory('AlbumFetcher', function($http) {
  var FetcherObj = {};
    FetcherObj.fetchAll = function () {
      return $http.get('/api/albums')
      .then(function (res) { return res.data; });
    };
    FetcherObj.fetchById = function(albumId) {
      return $http.get('/api/albums/' + albumId)
      .then(function (res) { return res.data; });
    };
  return FetcherObj;
});
