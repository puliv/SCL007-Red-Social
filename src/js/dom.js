window.onload = () => {
  
  checkAuthState((user)=>{
    if(user){
      start.style.display = "none";
      app.style.display = "block";
    }else{
      start.style.display = "block";
      app.style.display = "none";
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

  document.getElementById('logout').addEventListener('click',
  (evento)=>{
    evento.preventDefault();
    firebase.auth().signOut().then(function() {
      // Sign-out successful.
    }).catch(function(error) {
      // An error happened.
    });
  })
};
