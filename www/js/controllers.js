angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {
  $scope.mainData = {};
})

.controller('SearchCtrl', function($scope, $state) {
    $scope.search = function() {
        console.log($scope.mainData.searchText);
        $state.go('app.result', {searchText: $scope.mainData.searchText})
    }
})

.controller('ResultCtrl', function($scope, $stateParams, api) {
        if (!$scope.mainData.searchText) $scope.mainData.searchText = $stateParams.searchText;

        console.log($stateParams.searchText);

        api.searchVenue($stateParams.searchText, function(data) {
            $scope.venues = data.response.venues;
            console.log(data);
        })
})

    .controller('VenueCtrl', function($scope, $stateParams, api) {
        var venueID = $stateParams.venueId;

        api.getVenue(venueID, function(data) {
            $scope.venue = data.response.venue;

            if ($scope.venue.photos.groups[0]) {

                $scope.venue.thumbnail = $scope.venue.photos.groups[0].items[0].prefix + '40x40' + $scope.venue.photos.groups[0].items[0].suffix;
                $scope.venue.photo = $scope.venue.photos.groups[0].items[1].prefix + '300x300' + $scope.venue.photos.groups[0].items[1].suffix;

            }
        })
    })
;
