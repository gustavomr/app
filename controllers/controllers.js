app.controller('LoginCtrl', function($scope,$http, $window) {

   $scope.user = {};
   $scope.mensagem = ""; 

   $scope.login = function(user) {
   $http.post('http://localhost:8080/api/open' + '/login', user).success(function(response,status, headers, config) {
	  sessionStorage.token = headers('Authorization');
	  $http.defaults.headers.common['Authorization'] = sessionStorage.token;
    })
};

  $scope.register = function(user) {
 	$http.post('http://localhost:8080/api/open' + '/account',user)
	.success(function(data){
	    $scope.user = {};
	    $scope.mensagem = "User registered with suceess";
            $window.location.href = '#about';
            }).error(function(error){
            $scope.mensagem = error.message;
         });
};


 $scope.logout = function () {
 $http.put('http://localhost:8080/api/secured' + '/logout').success(function(data){
                                                                  			delete sessionStorage.token;
                                                                  		}).error(function(error){
                                                                  			$scope.erro = error;
                                                                  		});


  };

 $scope.isauthenticated = function() {
   return sessionStorage.token;
  };
 
});