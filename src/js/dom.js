window.onload = () => {
  
  checkAuthState((user)=>{
    if(user){
      start.style.display = "none";
      app.style.display = "block";
      logout.style.display = "block";
      readPostFromDatabase();
    }else{
      start.style.display = "block";
      app.style.display = "none";
      settingProfile.style.display = "none";
      logout.style.display = "none";
    }
  });

  document.getElementById('registerButton').addEventListener('click',
  (evento)=>{
    evento.preventDefault();
    const emailFromUser = emailTextfield.value;
    const passwordFromUser = passwordTextfield.value;
    registerUser(emailFromUser, passwordFromUser);
  })

  document.getElementById('loginButton').addEventListener('click',
  (evento)=>{
    evento.preventDefault();
    const emailFromUser = emailTextfield.value;
    const passwordFromUser = passwordTextfield.value;
    loginUser(emailFromUser, passwordFromUser);
  })
//se
  document.getElementById('sign-google').addEventListener('click',
  (evento)=>{
    evento.preventDefault();
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then(function(result) {
      // This gives you a Google Access Token. You can use it to access the Google API.
      var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      console.log(user);
      // ...
    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
      console.log(errorCode + errorMessage + email + credential)
    });
  })

  document.getElementById('logout').addEventListener('click',
  (evento)=>{
    evento.preventDefault();
    firebase.auth().signOut().then(function() {
      // Sign-out successful.
    }).catch(function(error) {
      // An error happened.
    });
  })

  document.getElementById('stateButton').addEventListener('click',
  (evento)=>{
    evento.preventDefault();
    const contect = textareaContect.value;
    const radios = document.getElementsByName('state');
    for (var i = 0, length = radios.length; i < length; i++){
      if (radios[i].checked){
        statusRadio = radios[i].value;
        break;
      }
    }
    registerPost(contect, statusRadio);
  })
};

const readPostFromDatabase = () => {
  readPost((post)=>{
    postContainer.innerHTML = postContainer.innerHTML + 
    `<h3>${post.val().post}</h3>
     <h6>${post.val().status}</h6>`; 
  });
}


document.getElementById('save-settings').addEventListener('click',
  (evento)=>{
  evento.preventDefault();
  const emailFromUser = email.value;
  const usernameFromUser = username.value;
  const sportFromUser = sport.value;
  settingsPage(emailFromUser, usernameFromUser,sportFromUser);

})
document.getElementById('settingProfile').addEventListener('click',
  (evento)=>{
    evento.preventDefault();
    start.style.display = "none";
    app.style.display = "none";
    settingProfile.style.display = "block";
    logout.style.display = "none";
  })




