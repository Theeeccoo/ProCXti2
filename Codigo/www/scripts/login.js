localStorage.setItem('SessionID',JSON.stringify(null));

function login(){

const Email = document.getElementById("txt_login_email").value
const Senha = document.getElementById("txt_login_senha").value

if(Email == ''|| Senha == ''){

  Swal.fire({
  
    icon: 'warning',
    title: 'Preecha todos os campos',
    showConfirmButton: false,
    timer: 1500,

  })
}else{

    const users = JSON.parse(window.localStorage.getItem("users"));

   
    users.map(user =>{
    if(user.email == Email && user.senha == Senha){
        localStorage.setItem('SessionID',JSON.stringify(user.id));
                
          window.location.href= 'perfil.html'

    }

   })
   const SessionID = JSON.parse(window.localStorage.getItem("SessionID"));
  
  if(SessionID == null){
    Swal.fire({
  
      icon: 'error',
      title: 'Login ou senha errados',
      showConfirmButton: false,
      timer: 1500,

    })
  } 
}

}