'use strict'

angular
	.module('simplyTODO', ['ngRoute'])
	.config($routeProvider =>
		$routeProvider
			.when('/', {
				controller: 'MainCtrl',
				templateUrl: 'partials/main.html'
			})
			.when('/list', {
				controller: 'TodoCtrl',
				templateUrl: 'partials/list.html'
			})
		)



	.controller('MainCtrl', function ($scope, $http) {
		$http
			.get('/api/title')
			.then(({data: {title}}) => {
				$scope.title = title
			})
	})


													
  .controller('TodoCtrl', function ($scope, $http) {
    $scope.sendList = () => {
      const list = {
      	Object:      $scope.id,
        job: 				 $scope.job,
        description: $scope.description,
      }

      $http
        .post('/api/lists', list)
        .then(() =>  $scope.lists.push(list))
        .catch(console.error)
    }

	    $http
	      .get('/api/lists')
	      .then(({ data: { lists }}) =>
	        $scope.lists = lists
	      )
	   
			$scope.remove = (listId, index) => { 
				$http
				.post('/api/remove', {listId})
				.then(() => $scope.lists.splice(index, 1))
				console.log(listId)
			  // var index = $scope.lists.indexOf(list);
			  // $scope.lists.splice(index, 1);     
			}

  })

