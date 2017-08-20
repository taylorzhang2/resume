
angular.
  module('core.skills').
  factory('Skill', ['$resource',
    function($resource) {
      return $resource('components/data/skills.json', {}, {
        query: {
          method: 'GET',
        }
      })
    }
  ])
