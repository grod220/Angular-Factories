'use strict';

juke.controller("AlbumsCtrl", function (AlbumFetcher, $scope) {

  AlbumFetcher.fetchAll()
    .then(function (albums) {
      albums.forEach(function (album) {
        album.imageUrl = '/api/albums/' + album.id + '/image';
        AlbumFetcher.fetchById(album.id)
        .then(function (singleAlbum) {
          album.songCount = singleAlbum.songs.length;
        })
      })
      $scope.albums = albums;
    })
})
