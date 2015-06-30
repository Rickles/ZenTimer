angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $interval, $ionicPlatform, MediaSrv,$ionicPopup, $ionicSlideBoxDelegate) {
  
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.loadSettings = function () {
    var settingsObj = {};
    angular.forEach(DefaultSettingsData, function (value, key) {
      if (localStorage.getItem('version') !== undefined || localStorage.getItem('version') >= DefaultSettingsData['version']) {
        value = localStorage.getItem(key) || value;
      }
      if (Number(value) || Number(value) === 0) {
        value = Number(value);
      } else if (typeof(value) === 'string') {
        if (value.indexOf('{') !== -1) {
          value = JSON.parse(value);
        }
      }
      settingsObj[key] = value;
    });
    return settingsObj;
  }
  $scope.populateSeconds = function (props_arr) {
    props_arr = props_arr || ['time','rest','warning','setup'];
    if (typeof(props_arr) === 'string') {
      props_arr = [props_arr];
    }
    angular.forEach(props_arr, function (value, key) {
      if ($scope.settingsData[value].str.indexOf(':') !== -1) {
        time_arr = $scope.settingsData[value].str.split(':');
        time_arr[0] = Number(time_arr[0]);
        for (var i = 0; i < time_arr.length; i++) {
          if (time_arr.length-1 === i) {
            $scope.settingsData[value].seconds = time_arr[i];
          } else {
            time_arr[i+1] = Number(time_arr[i+1])+(time_arr[i]*60);                        
          }
        };
      } else if (Number($scope.settingsData[value].str) !== NaN) {
        $scope.settingsData[value].seconds = Number($scope.settingsData[value].str);
      }
    });
  }

  var settingsSlideBox;
  $scope.availableSounds = availableSounds;
  $scope.settingOptions = settingOptions;
  // Form data for the settings modal
  // $scope.settingsData = DefaultSettingsData;
  $scope.settingsData = $scope.loadSettings();
  $scope.populateSeconds();

  $scope.currentTime = {seconds: $scope.settingsData.setup.seconds,roundCount:0};
  $scope.timerStatus = 'setup';
  $scope.activeOption = 'time';
  $scope.formerStatus = '';
  $scope.needs_wakeLock = true;
  $scope.sounds = $scope.availableSounds[$scope.settingsData.soundIndex];
  
  $interval(function () {
    if ($scope.timerStatus !== 'paused') {
      $scope.currentTime.seconds--;
      if ($scope.currentTime.seconds === $scope.settingsData.warning.seconds) {
        $scope.timerStatus = 'warning';
        MediaSrv.loadMedia($scope.sounds[$scope.timerStatus]).then(function(media){
          media.setVolume('1.0');
          media.play();
        });
      }
      if ($scope.currentTime.seconds === 0) {
        if ($scope.settingsData.rest.seconds > 0 && $scope.timerStatus !== 'rest' && $scope.timerStatus !== 'setup') {
          $scope.timerStatus = 'rest';
          $scope.currentTime.seconds = $scope.settingsData.rest.seconds;
          if ($scope.settingsData.rounds !== 0) {
            $scope.currentTime.roundCount++;
            if ($scope.currentTime.roundCount === $scope.settingsData.rounds) {
              $scope.resetTimer();
            }
          }
        } else {
          $scope.currentTime.seconds = $scope.settingsData.time.seconds;
          $scope.timerStatus = 'time';
        }
        MediaSrv.loadMedia($scope.sounds[$scope.timerStatus]).then(function(media){
          media.setVolume('1.0');
          media.play();
        });
      }
      if ($scope.needs_wakeLock) {
        if ($scope.settingsData.wakeLock === 'bright') {
          window.powerManagement.acquire(function() {
            $scope.needs_wakeLock = false;
          });
        } else if ($scope.settingsData.wakeLock === 'dim') {
          window.powerManagement.dim(function() {
            $scope.needs_wakeLock = false;
          });
        } else if ($scope.settingsData.wakeLock === 'none') {
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
  },500);
  // },1000);
  // Wakelock
  $scope.$watch('settingsData.wakeLock', function () { $scope.needs_wakeLock = true; }, true);

  $scope.resetTimer = function () {
    $scope.currentTime.seconds = $scope.settingsData.setup.seconds;
    $scope.timerStatus = 'setup';
    $scope.currentTime.roundCount = 0;
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
    if (settingsSlideBox === undefined) {
      settingsSlideBox = $ionicSlideBoxDelegate.$getByHandle('settingsSlideBox');
      settingsSlideBox.enableSlide(false);
    }
  };
  $scope.clearSettings = function () {
    angular.forEach(DefaultSettingsData, function (value, key) {
      $scope.settingsData[key] = value;
      localStorage.setItem(key, value);
    });
  };
  // Perform the settings action when the user submits the settings form
  $scope.doSettings = function() {
    console.log('Doing settings', $scope.settingsData);
    $scope.populateSeconds();
    angular.forEach($scope.settingsData, function (value, key) {
      if (Number(value) || Number(value) === 0) {
        value = Number(value);
      } else if (typeof(value) === 'object') {
        JSON.stringify(value);
        value = JSON.stringify(value);
      }
      $scope.settingsData.key = value;
      localStorage.setItem(key, value);
    });

    $scope.sounds = $scope.availableSounds[$scope.settingsData.soundIndex];
    // Simulate a settings delay. Remove this and replace with your settings
    // code if using a settings system
    $scope.resetTimer();
    $scope.closeSettings();
    $timeout(function() {
      settingsSlideBox.previous();
    }, 500);
  };
  $scope.togglePlayPause();

  $scope.showSettingOptions = function (optionSet) {
    optionSet = optionSet || 'time';
    $scope.activeOption = optionSet;
    settingsSlideBox.next();
  }
  $scope.setSettingOption = function (selectedOption) {
    if (selectedOption) {
      if ($scope.settingsData[$scope.activeOption].str) {
        $scope.settingsData[$scope.activeOption].str = selectedOption;
      } else {
        $scope.settingsData[$scope.activeOption] = selectedOption;
      }
    }
    settingsSlideBox.previous();
  }

})

.controller('SettingsCtrl', function($scope) {

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
      if($ionicPlatform.is('ios')){src = src.replace('../','');}
      defer.resolve(new $window.Media(src, mediaSuccess, mediaError, mediaStatus));
    });
    return defer.promise;
  }

  function _logError(src, err){
    // alert(src);
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
