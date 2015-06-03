angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $interval) {
  
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});
  
  // Form data for the settings modal
  $scope.settingsData = {
    time: .25,
    warning: 10,
    rest: 5,
    rounds: 0
  };
  $scope.currentTime = {seconds: $scope.settingsData.time*60};
  $scope.timerStatus = 'time';
  $scope.formerStatus = '';
  // $scope.currentTime.minuteString = $scope.settingsData.time*60;
  $interval(function () {
    if ($scope.timerStatus !== 'paused') {
      $scope.currentTime.seconds--;
      if ($scope.currentTime.seconds === $scope.settingsData.warning) {
        $scope.timerStatus = 'warning';
      }
      if ($scope.currentTime.seconds === 0) {
        if ($scope.settingsData.rest > 0 && $scope.timerStatus !== 'rest') {
          $scope.timerStatus = 'rest';
          $scope.currentTime.seconds = $scope.settingsData.rest;
        } else {
          $scope.currentTime.seconds = $scope.settingsData.time*60;
          $scope.timerStatus = 'time';
        }
      }
    }
  },1000)

  $scope.togglePlayPause = function () {
    if ($scope.timerStatus !== 'paused') {
      $scope.formerStatus = $scope.timerStatus;
      $scope.timerStatus = 'paused';
    } else {
      $scope.timerStatus = $scope.formerStatus;
      $scope.formerStatus = '';
    }
  }
  // Create the settings modal that we will use later
  $ionicModal.fromTemplateUrl('templates/settings.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the settings modal to close it
  $scope.closeSettings = function() {
    $scope.modal.hide();
  };

  // Open the settings modal
  $scope.settings = function() {
    $scope.modal.show();
  };

  // Perform the settings action when the user submits the settings form
  $scope.doSettings = function() {
    angular.forEach($scope.settingsData, function (value, key) {
      $scope.settingsData.key = parseInt(value);
    });
    console.log('Doing settings', $scope.settingsData);

    // Simulate a settings delay. Remove this and replace with your settings
    // code if using a settings system
    $timeout(function() {
      $scope.closeSettings();
    }, 500);
  };
})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})
.filter('secondsToDateTime', function() {
    return function(seconds) {
        var currentDate = new Date(1970, 0, 1).setSeconds(seconds);
        return currentDate;
    };
});
