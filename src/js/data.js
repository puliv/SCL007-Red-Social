const registerPost = (postText, postStatus) => {
    const newPostKey = firebase.database().ref('users/post/').child('post').push().key;
    firebase.database().ref(`users/post/${newPostKey}`).set({
      post : postText,
      status : postStatus
    });
};

const readPost = (onPostChange) => {
    const postRef = firebase.database().ref('users/post');
    postRef.on('child_added', (post)=> {
        onPostChange(post);
    });
  };

const  settingsPage =(email,username,sport)=>{
    firebase.database().ref("users/" + firebase.auth().currentUser.uid).update({
        email: email,
        userName: username,
        sport: sport
    });
}