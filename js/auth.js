const checkAuthState = (callback) => {
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            console.log("Hay un usuario > " + JSON.stringify(user));
            callback(user);
        } else {
            console.log("No está logueado");
            callback(null);
        }
    })

}
//funcion que registra usuario
const registerUser = (email, password) => {
    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(() => {
            alert("Bienvenida a LAW");
        })
        .catch((error) => {
            alert("Error > " + error.message);
        });
 }

 //funcion iniciar sesion con firebase
 const loginUser =(email, password) => {
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then((user) => {
        console.log("Usuario logeado > " + JSON.stringify(user));
    })
    .catch((error)  => {
        alert("Error > " + error.message);
    });
 }
 //funcion iniciar sesion con google
 const loginUserGoogle =() => {
    let provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then(function(result) {
      let user = result.user;
      console.log(user);
    }).catch(function(error) {
      let errorCode = error.code;
      let errorMessage = error.message;
      let email = error.email;
      let credential = error.credential;
      console.log(errorCode + errorMessage + email + credential)
    });
 }
 //funcion iniciar sesion con facebook
const loginUserFacebook=() => {
    let provider = new firebase.auth.FacebookAuthProvider();
    firebase.auth().signInWithPopup(provider).then(function(result) {
      let user = result.user;
      console.log(user);
    }).catch(function(error) {
      let errorCode = error.code;
      let errorMessage = error.message;
      let email = error.email;
      let credential = error.credential;
      console.log(errorCode + errorMessage + email + credential)
    });
 }
//funcion cerrar sesion
 const signOff =() =>{
    firebase.auth().signOut().then(function() {
    // Sign-out successful.
    }).catch(function(error) {
    // An error happened.
    });
 }
 