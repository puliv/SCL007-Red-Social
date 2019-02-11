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

//Borrar un post
let deletePost = firebase.database().ref('users/post/');
let alert = confirm('Seguro deseas eliminar tu comentario?'); 
    if (alert == true) {
        deletePost.remove();
	} else {
        return  null 
    }


//const deletePost = removePost.child('users/post');
    // Delete the file
  //  deletePost.delete().then(function(){
    //}).catch(function(error){
  //  Uh-oh, an error occurred!
  //  });

// Create a reference to the file to delete
//var desertRef = storageRef.child('images/desert.jpg');

// Delete the file
//desertRef.delete().then(function() {
  // File deleted successfully
//}).catch(function(error) {
  // Uh-oh, an error occurred!
//});


