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
              <button id="${post.key}" type="button" >Comentar</button>
              <button id="edit_${post.key}" type="button" >Editar</button>`;
      console.log(post.key);
      document.getElementById(post.key).addEventListener('click',
        (event) => {
          event.preventDefault();
          alert("entro al boton comentar///" + post.key);
        })
      document.getElementById('edit_' + post.key).addEventListener('click',
        (event) => {
          event.preventDefault();
          alert("entro al boton editar///" + post.key);
 
 
        })
    });
  }
 
 };