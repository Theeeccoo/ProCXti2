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
    
   
    titulo.innerHTML = `Suas atividades, ${User.name}`
   

}
ListarUsuario()

$(document).ready (function () {
    $('#btn-duvida').click(function (){
        $('#span1').toggleClass('frente');
        $('#span2').toggleClass('frente');
        $('#span3').toggleClass('frente');
    })
})
