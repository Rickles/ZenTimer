angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $interval, $ionicPlatform, MediaSrv) {
  
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});
  
  $scope.mediaError = function () {
    alert('mediaError');
  }

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
  $scope.wakeLock = 'bright';
  $scope.needs_wakeLock = true;
  $scope.sounds = {
    time: '../audio/2-tones-4up.wav',
    warning: '../audio/chime-mid.wav',
    rest: '../audio/Pleasant_Tone.wav'
  };
  // $ionicPlatform.ready(function(){

  // });

  // if (Media) {
  //   $scope.sounds = {
  //     time: new Audio("../audio/2-tones-4up.wav"),
  //     warning: new Audio("../audio/HighChime.wav"),
  //     rest: new Audio("../audio/Attention_Tone.wav")
  //   }
  // } else {
    // $scope.sounds = {
    //   time: MediaSrv.loadMedia("../audio/2-tones-4up.wav"),
    //   warning: MediaSrv.loadMedia("../audio/HighChime.wav"),
    //   rest: MediaSrv.loadMedia("../audio/Attention_Tone.wav")
    // }
  // }
  // $scope.currentTime.minuteString = $scope.settingsData.time*60;
  $interval(function () {
    if ($scope.timerStatus !== 'paused') {
      $scope.currentTime.seconds--;
      if ($scope.currentTime.seconds === $scope.settingsData.warning) {
        $scope.timerStatus = 'warning';
        MediaSrv.loadMedia($scope.sounds[$scope.timerStatus]).then(function(media){
          media.play();
        });
      }
      if ($scope.currentTime.seconds === 0) {
        if ($scope.settingsData.rest > 0 && $scope.timerStatus !== 'rest') {
          $scope.timerStatus = 'rest';
          $scope.currentTime.seconds = $scope.settingsData.rest;
        } else {
          $scope.currentTime.seconds = $scope.settingsData.time*60;
          $scope.timerStatus = 'time';
        }
        MediaSrv.loadMedia($scope.sounds[$scope.timerStatus]).then(function(media){
          media.play();
        });
      }
      if ($scope.needs_wakeLock) {
        if ($scope.wakeLock === 'bright') {
          window.powerManagement.acquire(function() {
            $scope.needs_wakeLock = false;
          });
        } else if ($scope.wakeLock === 'dim') {
          window.powerManagement.dim(function() {
            $scope.needs_wakeLock = false;
          });
        } else if ($scope.wakeLock === 'none') {
          window.powerManagement.release(function() {
            $scope.needs_wakeLock = false;
          });
        }
      }
    } else {
      window.powerManagement.release(function() {
        $scope.needs_wakeLock = false;
      });
    }

  },1000);
  // Wakelock
  // $timeout(function () {
  //   window.powerManagement.dim(function() {
  //     console.log('Wakelock acquired');
  //   }, function() {
  //     console.log('Failed to acquire wakelock');
  //   });
  // }, 3000);
  $scope.resetTimer = function () {
    $scope.timerStatus = 'time';
    $scope.currentTime.seconds = $scope.settingsData.time*60;
    $scope.togglePlayPause();
  }
  $scope.togglePlayPause = function () {
    if ($scope.timerStatus !== 'paused') {
      $scope.formerStatus = $scope.timerStatus;
      $scope.timerStatus = 'paused';
    } else {
      $scope.timerStatus = $scope.formerStatus;
      $scope.formerStatus = '';
    }
    $scope.needs_wakeLock = true;
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
  $scope.togglePlayPause();
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
})
// for media plugin : http://plugins.cordova.io/#/package/org.apache.cordova.media
.factory('MediaSrv', function($q, $ionicPlatform, $window){
  var service = {
    loadMedia: loadMedia,
    getStatusMessage: getStatusMessage,
    getErrorMessage: getErrorMessage
  };

  function loadMedia(src, onError, onStatus, onStop){
    var defer = $q.defer();
    $ionicPlatform.ready(function(){
      var mediaSuccess = function(){
        if(onStop){onStop();}
      };
      var mediaError = function(err){
        _logError(src, err);
        if(onError){onError(err);}
      };
      var mediaStatus = function(status){
        if(onStatus){onStatus(status);}
      };

      if($ionicPlatform.is('android')){src = '/android_asset/www/' + src.replace('../','');}
      defer.resolve(new $window.Media(src, mediaSuccess, mediaError, mediaStatus));
    });
    return defer.promise;
  }

  function _logError(src, err){
    alert(src);
    console.error('media error', {
      code: err.code,
      message: getErrorMessage(err.code)
    });
  }

  function getStatusMessage(status){
    if(status === 0){return 'Media.MEDIA_NONE';}
    else if(status === 1){return 'Media.MEDIA_STARTING';}
    else if(status === 2){return 'Media.MEDIA_RUNNING';}
    else if(status === 3){return 'Media.MEDIA_PAUSED';}
    else if(status === 4){return 'Media.MEDIA_STOPPED';}
    else {return 'Unknown status <'+status+'>';}
  }

  function getErrorMessage(code){
    if(code === 1){return 'MediaError.MEDIA_ERR_ABORTED';}
    else if(code === 2){return 'MediaError.MEDIA_ERR_NETWORK';}
    else if(code === 3){return 'MediaError.MEDIA_ERR_DECODE';}
    else if(code === 4){return 'MediaError.MEDIA_ERR_NONE_SUPPORTED';}
    else {return 'Unknown code <'+code+'>';}
  }

  return service;
});
