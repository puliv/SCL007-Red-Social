const  settingsPage =(email,username,birthdate,sport)=>{
    firebase.database().ref("users/" + firebase.auth().currentUser.uid).update({
        email:email,
        userName: username,
        birthdate: birthdate,
        sport: sport
    })
    .then(() => {
        alert(username + " sus datos se registraron correctamente");
    })
    .catch((error)  => {
        console.error("Error > " + error.message);
    });
}

const registerPost = (postText, postStatus,email) => {
    const newPostKey = firebase.database().ref('users/post/').child('post').push().key;
    firebase.database().ref(`users/${firebase.auth().currentUser.uid}/post/${newPostKey}`).set({
      post : postText,
      status : postStatus,
      email: email
    }).then(() => {
        alert(firebase.auth().currentUser.email + " se ha publicado");
    })
    .catch((error)  => {
        console.error("Error > " + error.message);
    });
};

const readPost = (onPostChange) => {
    const postRef = firebase.database().ref(`users/${firebase.auth().currentUser.uid}/post`);
    postRef.on('child_added', (post)=> {
        onPostChange(post);
    });
  };