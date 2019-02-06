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
        .then((user) => {
            alert("Usuario registrado");
        })
        .catch((error) => {
            alert("Error > " + error.message);
        });
}

const loginUser =(email, password) => {
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then((user) => {
        console.log("Usuario logeado > " + JSON.stringify(user));
    })
    .catch((error)  => {
        console.error("Error > " + error.message);
    });
}
