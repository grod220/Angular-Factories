'use strict';

juke.controller('SidebarCtrl', function ($scope, SidebarFactory) {

  $scope.viewAlbums = SidebarFactory.changeView(SidebarFactory.showAlbums())
}
