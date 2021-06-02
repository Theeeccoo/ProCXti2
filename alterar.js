function save_user(name, senha, email){
    const SessionID = JSON.parse(window.localStorage.getItem('SessionID'))
    var userdata = JSON.parse(window.localStorage.getItem('users'));
    const index = userdata.findIndex(user => user.id == SessionID)
    if(name != "") userdata[index].name = name;
    if(senha != "") userdata[index].senha = senha;
    if(email != "") userdata[index].email = email;
    localStorage.setItem('users',JSON.stringify(userdata));
}

function ListarUsuario(){
    const SessionID = JSON.parse(window.localStorage.getItem("SessionID"));
    const Users = JSON.parse(window.localStorage.getItem("users"));

const User = Users[SessionID]

    document.getElementById('txt_nome').value = User.name 
    document.getElementById('txt_email').value = User.email 
    document.getElementById('txt_senha').value = User.senha
    document.getElementById('txt_uf').value = User.uf
    document.getElementById('txt_city').value = User.city


}

document.getElementById('alterar').addEventListener("click",function(){
    save_user(
    document.getElementById('txt_nome').value,
    document.getElementById('txt_senha').value,
    document.getElementById('txt_email').value
    );
});


ListarUsuario()
