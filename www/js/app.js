// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'uiGmapgoogle-maps', 'ngCordova'])

.run(function($ionicPlatform,$rootScope) {
  //$rootScope.url = 'http://www.pdambatang.co.id/'
  $rootScope.url = 'http://pdambatang.co.id/'
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

//Camera
.factory('Camera', ['$q', function($q) {

  return {
    getPicture: function(options) {
      var q = $q.defer();

      navigator.camera.getPicture(function(result) {
        // Do any magic you need
        q.resolve(result);
      }, function(err) {
        q.reject(err);
      }, options);

      return q.promise;
    }
  }
}])
//End camera
  
//Directive
.directive('spinnerOnLoad', function() {
            return {
                restrict: 'A',
                link: function(scope,element){
                    element.on('load', function() {
                        element.parent().find('div').remove();
                    });
                    scope.$watch('ngSrc', function() {
                        element.parent().append('<div class="spinner"><div class="bounce1"></div><div class="bounce2"></div><div class="bounce3"></div></div>');
                    });      
                }
            }
        })
//End directive

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider, $compileProvider) {

  //Bottom tabs
  $ionicConfigProvider.tabs.position('bottom');
  $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|tel):/);
  //End bottom tabs

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:

  .state('tab.dash', {
    url: '/dash',
    views: {
      'tab-dash': {
        templateUrl: 'templates/tab-dash.html',
        controller: 'DashCtrl'
      }
    }
  })
  .state('tab.dash-rinci', {
    url: '/dash/:no',
    views: {
      'tab-dash': {
        templateUrl: 'templates/rincian.html',
        controller: 'RincianCtrl'
      }
    }
  })
  .state('tab.dash-rinci-pict', {
    url: '/dash/:no/:per',
    views: {
      'tab-dash': {
        templateUrl: 'templates/pict.html',
        controller: 'PictCtrl'
      }
    }
  })
  .state('tab.info', {
      url: '/info',
      views: {
        'tab-info': {
          templateUrl: 'templates/tab-info.html',
          controller: 'InfoCtrl'
        }
      }
    })
    .state('tab.info-detail', {
      url: '/info/:id',
      views: {
        'tab-info': {
          templateUrl: 'templates/info-detail.html',
          controller: 'InfoDetailCtrl'
        }
      }
    })

    .state('tab.aduan', {
      url: '/aduan',
      cache:false,
      views: {
        'tab-aduan': {
          templateUrl: 'templates/tab-aduan.html',
          controller: 'AduanCtrl'
        }
      }
    })

    .state('tab.aduan-detail', {
      url: '/aduan/:id',
      views: {
        'tab-aduan': {
          templateUrl: 'templates/aduan-detail.html',
          controller: 'AduanDetailCtrl'
        }
      }
    })

    .state('tab.aduan-buat', {
      url: '/buat/aduan',
      views: {
        'tab-aduan': {
          templateUrl: 'templates/aduan-buat.html',
          controller: 'AduanBuatCtrl'
        }
      }
    })

  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'AccountCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/dash');

});
