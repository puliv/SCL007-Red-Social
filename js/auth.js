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
const registerUser = (emailFromUser, passwordFromUser) => {
    firebase.auth().createUserWithEmailAndPassword(emailFromUser, passwordFromUser)
        .then((user) => {
            alert("Usuario registrado");
        })
        .catch((error) => {
            alert("Error > " + error.message);
        });
 }
 
 const loginUser =(emailFromUser, passwordFromUser) => {
    firebase.auth().signInWithEmailAndPassword(emailFromUser, passwordFromUser)
    .then((user) => {
        console.log("Usuario logeado > " + JSON.stringify(user));
    })
    .catch((error)  => {
        alert("Error > " + error.message);
    });
 }
