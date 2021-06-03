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
    let newUser = []
   if(users != null){
   newUser =  users.map(user =>{
    if(user.email == Email && user.senha == Senha){
        localStorage.setItem('SessionID',JSON.stringify(user.id));
        const data = new Date();
        
        const dia = data.getDate()
        const mes = data.getMonth()
        const ano = data.getFullYear()
        dataCompleta = `${dia}/${mes}/${ano}`
          return {...user,lastSeen:dataCompleta}

    }else{
      return user
    }

   })
  }
   const SessionID = JSON.parse(window.localStorage.getItem("SessionID"));
  
  if(SessionID == null){
    Swal.fire({
  
      icon: 'error',
      title: 'Login ou senha errados',
      showConfirmButton: false,
      timer: 1500,

    })
  } else{
    localStorage.setItem('users',JSON.stringify(newUser));
    window.location.href= 'perfil.html'
  }
}

}