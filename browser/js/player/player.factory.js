'use strict';

juke.factory('PlayerFactory', function ($http, $rootScope) {
 var methods = {};

  var audio = document.createElement('audio');
  var playing = false;
  var currentSong = null;
  var currentSongList = null;
  var progress = 0;

  methods.start = function (song, songlist) {
    methods.pause();
    playing = true;
    // resume current song
    audio.src = song.audioUrl;
    audio.load();
    // if (song === currentSong) return audio.play();
    // enable loading new song
    currentSong = song;
    currentSongList = songlist;
    audio.play();
  };

  methods.pause = function () {
    audio.pause();
    playing = false;
  };

  methods.resume = function () {
    audio.play();
    playing = true;
  };

  methods.isPlaying = function () {
    return playing;
  };

  methods.getCurrentSong = function () {
    return currentSong;
  };

  methods.next = function () {
    var nextSong;
    currentSongList.forEach(function (elem, i, array) {
      if (elem.id === currentSong.id) {
        nextSong = array[i + 1];
      }
    });

    if (!nextSong) {
      nextSong = currentSongList[0];
    }

    methods.start(nextSong, currentSongList);
  };

  methods.prev = function () {
    var prevSong;
    currentSongList.forEach(function (elem, i, array) {
      if (elem.id === currentSong.id) {
        prevSong = array[i - 1];
      }
    });

    if (!prevSong) {
      prevSong = currentSongList[currentSongList.length-1];
    }

    methods.start(prevSong, currentSongList);
  };

  // function seek (decimal) {
  //   audio.currentTime = audio.duration * decimal;
  // }

  methods.getProgress = function () {
    return progress;
  };

  audio.addEventListener('timeupdate', function () {
    progress = audio.currentTime / audio.duration;
    if (methods.isPlaying) {
      $rootScope.$digest();
    }
  });


  audio.addEventListener('ended', function () {
    methods.next();
  });

 return methods;
});
