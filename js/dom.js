window.onload = () => {
  checkAuthState((user) => {
    if (user) {
      sign_off_btn.style.display = "block";
      start.style.display = "none";
      setting_profile.style.display = "none";
      readPostFromDatabase();
    } else {
      start.style.display = "block";
      foooter.style.display = "none";
      app.style.display = "none";
      setting_profile.style.display = "none";
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
      app.display = "none";

    });
  //guardar datos del perfil
  document.getElementById('save_settings').addEventListener('click',
    (evento) => {
      evento.preventDefault();
      const emailFromUser = firebase.auth().currentUser.email;
      const usernameFromUser = username.value;
      const birthdateFromUser = birthdate.value;
      const sportFromUser = sport.value;
      settingsPage(emailFromUser, usernameFromUser, birthdateFromUser, sportFromUser);
      app.style.display = "block";
    });
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
    readPostPublic((post) => {
      postContainer.innerHTML +=
        `<div id="container_post">
        <div class="col-6" id="email_status">
          <h5>${post.val().email}</h5>
          <h6>${post.val().status}</h6>
        </div>
        <div class="col-6" id="icons">
          <i class="far fa-comment-dots comentPost" title="Comentar publicacion" id="coment_post_btn${post.key}"></i>
          <i class="far fa-trash-alt deletePost" title="Eliminar publicacion" id="delete_btn${post.key}"></i>
        </div>
          <div>  
          <textarea disabled class="txtAreaPost">${post.val().post}</textarea>
          </div>
        <div id"coments">
        </div>
          </div>`;

      //hago una coleccion de botones
      let coleccButton = document.getElementsByClassName("deletePost");
      for (let i = 0; i < coleccButton.length; i++) {
        coleccButton[i].addEventListener("click", deletePost);
      }
      let coleccButtonComent = document.getElementsByClassName("comentPost");
      for (let i = 0; i < coleccButtonComent.length; i++) {
        coleccButtonComent[i].addEventListener("click", comentPost = (key) => {
          const botonId = key.target.getAttribute("id").substring(15, 50);
          const modal = document.getElementById('myModal');
          modal.style.display = "block";
          modal.innerHTML = `
            <div class="modal-content">
              <div class="container">
                <div class="row">
                  <div class="col-12">
                    <input type="hidden" id="key_post_txt" value="${botonId}">
                    <textarea id="coment_post_txt" placeholder="¿Que quieres comentar?"></textarea><br>
                  </div>
                </div>
                <div class="row">
                  <div class="col-6">
                    <button id="coment_post_btn">Comentar</button>
                  </div>
               </div>
              </div>
            </div>`;

          // const comentPostRef = firebase.database().ref(`coments/${botonId}`);
          // comentPostRef.on('child_added', (comentPost) => {

          //   coment.innerHTML += comentPost.val().comentPost
          // });
          window.onclick = function (event) {
            if (event.target == modal) {
              modal.style.display = "none";
            }
          } 
              document.getElementById('coment_post_btn').addEventListener('click',
                (event) => {
                  event.preventDefault();
                  const keyPost = key_post_txt.value;
                  const comentPost = coment_post_txt.value;
                  registerComentPostPublic(keyPost, comentPost);
                  modal.style.display = "none";
                })
            });
          }
        });
      }
    
    };