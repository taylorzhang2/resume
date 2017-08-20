'use strict';

// Declare app level module which depends on views, and components
var app = angular.module('myApp', [
  'ngRoute',
  'myApp.view1',
  'myApp.view2',
  'myApp.version',
  'header',
  'block',
  'resumeBlock',
  'educationBlock',
  'skillsBlock',
  'core',
  'contactBlock',
  'duScroll'
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');
  $locationProvider.html5Mode(true);

  $routeProvider.otherwise({redirectTo: '/'});
}]).
controller('ScrollCtrl', function($scope, $document) {
  var developer = document.getElementById('#developer')
  $scope.categories = ["#header", "#developer", "#resume", "#education", "#skills", "#contact"];
  $scope.index = 0;
  //create directive for these functions
  $scope.toDeveloper = function() {
    $document.scrollToElement(developer,0,1000);
  };
  $scope.scroll = function(element) {
      var el = document.getElementById(element);
      $document.scrollToElement(el, 0, 1000);
  };
  $scope.scrollNext = function() {
    if ($scope.index < $scope.categories.length) {
      var el = document.getElementById($scope.categories[++$scope.index]);
      $document.scrollToElement(el, 0, 1000);
    }
  }
  $scope.scrollPrevious = function() {
    if ($scope.index !== 0) {
      var el = document.getElementById($scope.categories[--$scope.index]);
      $document.scrollToElement(el, 0, 1000);
    }
  }
});
app.directive('up', ['$document', function($document) {
  return {
    controller: 'ScrollCtrl',
    link: function($scope, element, attrs) {
      //get current location
      //scroll to next or previous location
      function getTopElementinView() {
        var re;
        for (var i = 0; i < $scope.categories.length; i++) {
          var el = document.getElementById($scope.categories[i]);
          var inview = inView(el);

          if (inView(el)) {
            return el;
          }

        }
      }

      function inView(el) {
        var rect = el.getBoundingClientRect();
        return (
          rect.bottom >= 0
        );
      }
      element.on('click', function() {
        var el = getTopElementinView();
        console.log(el);
        $document.scrollToElement(el,0,1000);
      })

    }
  };
}]);

app.directive('down', ['$document', function($document) {
  return {
    controller: 'ScrollCtrl',
    link: function($scope, element, attrs) {
      function getBottomElementinView() {
        for (var i = 0; i < $scope.categories.length; i++) {
          var el = document.getElementById($scope.categories[i]);
          if (next(el)) {
            console.log('prev');
            console.log(prev);
            break;
          }
          var prev = el;
        }
        return prev;

      }
      function next(el) {
        var rect = el.getBoundingClientRect();
        //only works if element does not have a bigger height than the viewport
        return (
          rect.top > (window.innerHeight || document.documentElement.clientHeight)
        );
      }
      element.on('click', function() {
        var el = getBottomElementinView();
        if (el !== undefined) {
          console.log(el);
          $document.scrollToElement(el, 0, 1000);
        }

        console.log('bottom');
      });

    }
  }
}])
