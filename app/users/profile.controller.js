angular.module('angularfireSlackApp')
.controller('ProfileCtrl', function($state, md5, auth, profile, $scope, $firebaseArray) {
	var profileCtrl = this;
  var usersRef = firebase.database().ref('users');

	profileCtrl.profile = profile;

	profileCtrl.updateProfile = function() {
	profileCtrl.profile.emailHash = md5.createHash(auth.email);
	profileCtrl.profile.$save().then(function () {
	  $state.go('channels');
	});
	}

  profileCtrl.imgs = $firebaseArray(usersRef.child(profile.$id+'/profilePhoto'));
  
  var _validFileExtensions = [".jpg", ".jpeg", ".bmp", ".gif", ".png"];

  profileCtrl.uploadProfilePhoto = function() {
    var sFileName = $("#uProfilePhoto").val();
    if (sFileName.length > 0) {
      var fileValid = false;
      for (var j = 0; j < _validFileExtensions.length; j++) {
        var sCurExtension = _validFileExtensions[j];
        if (sFileName.substr(sFileName.length - sCurExtension.length, sCurExtension.length).toLowerCase() == sCurExtension.toLowerCase()) {
          fileValid = true;
          var filesSelected = document.getElementById("uProfilePhoto").files;
          if (filesSelected.length > 0) {
            var fileToLoad = filesSelected[0];

            var fileReader = new FileReader();

            fileReader.onload = function(fileLoadedEvent) {
              var textAreaFileContents = document.getElementById(
                "textAreaFileContents"
              );

              profilePhotoData = {
                date: firebase.database.ServerValue.TIMESTAMP,
                base64: fileLoadedEvent.target.result
              }

              profileCtrl.profile.profilePhoto = profilePhotoData;
              profileCtrl.profile.$save();
              profileCtrl.message = "Profile photo updated successfully!";
            };

            fileReader.readAsDataURL(fileToLoad);
          }
          break;
        }
      }

      if (!fileValid) {
        alert('File is not valid');
        return false;
      }
    }
    return true;
  }

});

