angular.module('angularfireSlackApp')
	.factory('Auth', function($firebaseAuth) {
		var auth = $firebaseAuth();

		return auth;
	})
	.config(function(){
	  var config = {
	    apiKey: "AIzaSyADJQXL2FXFWmyYYutisY2PZ4rkjQhJmpU",
	    authDomain: "fireslack-78579.firebaseapp.com",
	    databaseURL: "https://fireslack-78579.firebaseio.com",
	    storageBucket: "fireslack-78579.appspot.com",
	    messagingSenderId: "942451179437",
	  };
	  firebase.initializeApp(config);
	});