'use strict';

juke.controller('AlbumCtrl', function ($scope, $rootScope, $log, StatsFactory, AlbumFetcher, PlayerFactory) {

  // load our initial data
  AlbumFetcher.fetchAll()
  .then(function (albums) {
    return AlbumFetcher.fetchById(albums[0].id); // temp: get one
  })
  .then(function (album) {
    album.imageUrl = '/api/albums/' + album.id + '/image';
    album.songs.forEach(function (song, i) {
      song.audioUrl = '/api/songs/' + song.id + '/audio';
      song.albumIndex = i;
    });
    StatsFactory.totalTime(album)
    .then(function(duration) {
      album.duration = StatsFactory.roundDown(duration);
    }).catch($log.error);
    $scope.album = album;
  })
  .catch($log.error); // $log service can be turned on and off; also, pre-bound

  // main toggle
  $scope.toggle = function (song) {
    var songList;
    AlbumFetcher.fetchById(song.albumId)
      .then(function (album) {
        songList = album.songs
        console.log(songList);
        if (PlayerFactory.isPlaying() && song === PlayerFactory.getCurrentSong()) {
          PlayerFactory.pause();
        } else if (song !== PlayerFactory.getCurrentSong()) {
          PlayerFactory.start(song, songList);
        } else {
          PlayerFactory.resume();
        }
      })
      .catch($log.error);
  };

  $scope.playing = PlayerFactory.isPlaying;
  $scope.currentSong = PlayerFactory.getCurrentSong;

  // incoming events (from Player, toggle, or skip)
  // $scope.$on('pause', pause);
  // $scope.$on('play', play);
  // $scope.$on('next', next);
  // $scope.$on('prev', prev);

  // functionality
  // function pause () {
  //   $scope.playing = false;
  // }
  // function play (event, song) {
  //   $scope.playing = true;
  //   $scope.currentSong = song;
  // };

  // a "true" modulo that wraps negative to the top of the range
  // function mod (num, m) { return ((num % m) + m) % m; };

  // jump `interval` spots in album (negative to go back, default +1)
  // function skip (interval) {
  //   if (!$scope.currentSong) return;
  //   var index = $scope.currentSong.albumIndex;
  //   index = mod( (index + (interval || 1)), $scope.album.songs.length );
  //   $scope.currentSong = $scope.album.songs[index];
  //   if ($scope.playing) $rootScope.$broadcast('play', $scope.currentSong);
  // };
  // function next () { skip(1); };
  // function prev () { skip(-1); };

});
