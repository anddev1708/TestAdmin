// Initialize Firebase
var config = {
  apiKey: "AIzaSyBpSs8pOBmT0fAGkTjKgvcNW_ZxE76ntzE",
  authDomain: "travelbook-452ba.firebaseapp.com",
  databaseURL: "https://travelbook-452ba.firebaseio.com",
  projectId: "travelbook-452ba",
  storageBucket: "travelbook-452ba.appspot.com",
  messagingSenderId: "33912540936"
};
firebase.initializeApp(config);
var feedApp = angular.module('feedDataApp', ['ngRoute', 'firebase']);
// Config route
feedApp.config(function($routeProvider) {
	$routeProvider
		.when('/home', {
      title : 'Home page',
			templateUrl: 'home/home.html',
			controller: 'feedListController'
		})
    .when('/category', {
      title : 'Category page',
			templateUrl: 'category/category.html',
			controller: 'categoryController'
		})
		.when('/edit/:id', {
      title : 'Edit page',
			templateUrl: 'edit/edit.html',
			controller: 'showDetailController'
		})
    .when('/test', {
      templateUrl: 'test/test.html',
      controller : 'testController'
    })
    .otherwise({
			redirectTo: '/home'
		});
});

// Home controller here
feedApp.controller('feedListController', function ($scope, $firebaseArray) {
    var ref = firebase.database().ref().child("feeds");
    $scope.feedsList = $firebaseArray(ref);
    // $scope.feedsList.$loaded()
    // .then(function(data){
    //     angular.forEach(data, function(value, key) {
    //         console.log('key='+key+', value='+angular.toJson(value));
    //     })
    // });
    // Function add data to firebase
    $scope.save = function () {

        $scope.feedsList.$add({
            Name: $scope.feedsList.Name,
            Url: $scope.feedsList.Url,
            Description: $scope.feedsList.Description
        }).then(function(ref) {
          // var id = ref.key;
          // console.log("added record with id " + id);
        });

        $(":text").val('');
    }
});
// showDetaiController : show detai feed
feedApp.controller('showDetailController', function($scope, $firebaseArray){
    $scope.message = "Xin chao cac ban";
});

// testController here
feedApp.controller('testController', function($scope, $firebaseArray){
    $scope.message = "Xin chao cac ban";
});

// categoryController :
feedApp.controller('categoryController', function($scope, $firebaseObject, $firebaseArray){

    // $scope.feedsList.$loaded()
    // .then(function(data){
    //     angular.forEach(data, function(value, key) {
    //         console.log('key='+key+', value='+angular.toJson(value));
    //     })
    // });
    // Function add data to firebase
    var ref = firebase.database().ref().child("category");
    $scope.categoryList = $firebaseArray(ref);
    $scope.newCategory = {};

    $scope.save = function () {

      var obj = $firebaseObject(ref);
      obj.$scope.newCategory.Url = "";
      obj.$save().then(function(ref) {
        var id = ref.key;
      }, function(error) {
        console.log("Error:", error);
      });


      // $scope.categoryList.$save();

        // $scope.categoryList.$add({
        //     Name: $scope.categoryList.Name,
        //     Url: $scope.categoryList.Url,
        // }).then(function(ref) {
        //   // var id = ref.key;
        //   // console.log("added record with id " + id);
        // });

        $(":text").val('');
    }
});
