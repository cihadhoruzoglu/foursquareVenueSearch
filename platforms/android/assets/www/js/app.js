// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers'])

    .run(function($ionicPlatform) {
        $ionicPlatform.ready(function() {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if(window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }
            if(window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleDefault();
            }
        });
    })

    .factory("api", function($http) {
        var apiUrl          = 'https://api.foursquare.com/v2/',
            clientId        = 'Y4CWC5KQZALA0U5UWRX44C2I5ZXJDXZZIOPSENLNUYNU4YHK',
            clientSecret    = 'C3MEUFC0BY1KIEYRZTFAS1CA1OHBIOQ0Z22KC1E4GU435QZW',
            v               = '20140815';

        return {
            searchVenue: function(searchText, success) {
                $http({
                    url: apiUrl + 'venues/search?',
                    method: "GET",
                    params: {
                        client_id: clientId,
                        client_secret: clientSecret,
                        v: v,
                        near: 'Istanbul,tr',
                        query: searchText
                    }
                })
                    .success(function(data) {
                        success(data);
                    });
            },
            getVenue: function(venueId, success) {
                $http({
                    url: apiUrl + 'venues/' + venueId,
                    method: "GET",
                    params: {
                        client_id: clientId,
                        client_secret: clientSecret,
                        v: v
                    }
                })
                    .success(function(data) {
                        success(data);
                    });
            }
        }
    })

    .config(function($stateProvider, $urlRouterProvider) {
        $stateProvider

            .state('app', {
                url: "/app",
                abstract: true,
                templateUrl: "templates/menu.html",
                controller: 'AppCtrl'
            })

            .state('app.search', {
                url: "/search",
                views: {
                    'menuContent' :{
                        templateUrl: "templates/search.html",
                        controller: "SearchCtrl"

                    }
                }
            })

            .state('app.result', {
                url: "/result/:searchText",
                views: {
                    'menuContent' :{
                        templateUrl: "templates/result.html",
                        controller: "ResultCtrl"
                    }
                }
            })
            .state('app.venue', {
                url: "/venue/:venueId",
                views: {
                    'menuContent' :{
                        templateUrl: "templates/venue.html",
                        controller: 'VenueCtrl'
                    }
                }
            })

            .state('app.single', {
                url: "/playlists/:playlistId",
                views: {
                    'menuContent' :{
                        templateUrl: "templates/venue.html",
                        controller: 'PlaylistCtrl'
                    }
                }
            });
        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/app/search');
    });

