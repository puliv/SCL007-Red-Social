window.onload = () => {
  checkAuthState((user) => {
    if (user) {
      sign_off_btn.style.display = "block";
      start.style.display = "none";
      readPostFromDatabase();
    } else {
      start.style.display = "block";
      sign_off_btn.style.display = "none";
      setting_profile.style.display = "none";
      app.style.display = "none";
    }
  });

  //boton registrarse
  document.getElementById('register_btn').addEventListener('click',
    (event) => {
      event.preventDefault();
      const emailFromUser = text_email.value;
      const passwordFromUser = text_password.value;
      registerUser(emailFromUser, passwordFromUser);
      setting_profile.style.display = "block";
    })
  //guardar datos del perfil
  document.getElementById('save_settings').addEventListener('click',
    (evento) => {
      evento.preventDefault();
      const emailFromUser = firebase.auth().currentUser.email;
      const usernameFromUser = username.value;
      const birthdateFromUser = birthdate.value;
      const sportFromUser = sport.value;
      settingsPage(emailFromUser, usernameFromUser, birthdateFromUser, sportFromUser);
      setting_profile.style.display = "none";
      app.style.display = "block";
    })
  //boton iniciar sesion
  document.getElementById('login_btn').addEventListener('click',
    (event) => {
      event.preventDefault();
      const emailFromUser = text_email.value;
      const passwordFromUser = text_password.value;
      loginUser(emailFromUser, passwordFromUser);
      app.style.display = "block";
    })
  //boton iniciar sesion con google
  document.getElementById('sign_google_btn').addEventListener('click',
    (event) => {
      event.preventDefault();
      loginUserGoogle();
      app.style.display = "block";
    })
  //boton iniciar sesion con facebook
  document.getElementById('sign_facebook_btn').addEventListener('click',
    (event) => {
      event.preventDefault();
      loginUserFacebook();
      app.style.display = "block";
    })
  //boton cerrar sesion
  document.getElementById('sign_off_btn').addEventListener('click',
    (event) => {
      event.preventDefault();
      signOff();
    })
  //boton publicar 
  document.getElementById('state_button').addEventListener('click',
    (event) => {
      event.preventDefault();
      const contect = textareaContect.value;
      const radios = document.getElementsByName('state');
      const email = firebase.auth().currentUser.email;
      for (let i = 0; i < radios.length; i++) {
        if (radios[i].checked) {
          statusRadio = radios[i].value;
          break;
        }
      }
      registerPost(contect, statusRadio, email);
    })
  const readPostFromDatabase = () => {
    postContainer.innerHTML = "";
    readPost((post) => {
      postContainer.innerHTML +=
        `<h6>Publicación de:${post.val().email}</h6>
               <input type="text" value="${post.val().post}">
               <h6>${post.val().status}</h6>
               <h6>${post.key}</h6>
               <button type="button" id="${post.key}">Comentar</button>
               <button type="button" id="delete_btn${post.key}" class="deletePost">Eliminar</button>
               <button id="edit_${post.key}" type="button" >Editar</button>
               <button id="${post.key}" type="button" rel="icon">like</button>`;
      //hago una coleccion de botones con los key
      let coleccButton = document.getElementsByClassName("deletePost");
      for (let i = 0; i < coleccButton.length; i++) {
        coleccButton[i].addEventListener("click", deletePost);
      }
      
    });

  }

};
//para agregar foto al perfil
// document.getElementById('perfilName').innerHTML = `<div class="col-7"><p class="perfil-name">${firebase.auth().currentUser.displayName ? firebase.auth().currentUser.displayName : "Anonimo"}</p></div>
//<div class="col-5"><img class="perfil-image" src=${firebase.auth().currentUser.photoURL ? firebase.auth().currentUser.photoURL : "./assets/user11.png"} alt="imagen usuario"></div>`