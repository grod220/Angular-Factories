'use strict';

juke.factory('SidebarFactory', function ($http, $rootScope) {

 var methods = {}

 var albumView = false;
 var albumsView = false;

 methods.showAlbum = function () {
  return albumView;
 }

 methods.showAlbums = function () {
  return albumsView;
 }

 methods.changeView = function (view) {
  view = !view;
  $rootScope.$digest();
 }

  return methods;
}
