let User 
let Users
const SessionID = JSON.parse(window.localStorage.getItem("SessionID"));
function ValidarSession(){
   

    if(SessionID == null){
        Swal.fire({
  
            icon: 'error',
            title: 'Faça o login!',
            showConfirmButton: false,
            timer: 1500,
      
          }).then(result=>{
            window.location.href= 'login.html'
          })
       
    }else{
        Users = JSON.parse(window.localStorage.getItem("users"));
        User = Users[SessionID]
    }
}

ValidarSession()

function ListarUsuario(){
    
    const titulo = document.getElementById('titulo_entrada')
    
   
    titulo.innerHTML = "Bem-vindo " + User.name + "!"
   

}
ListarUsuario()

