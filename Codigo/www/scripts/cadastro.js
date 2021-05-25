let Uf;
let City;

function listar() {


    fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados').then(estados => estados.json())
        .then(data => {



            estado = document.getElementById('select_uf');

            estado.innerHTML = data.map(estado => {


                return `<option name='' id=''>${estado.sigla}</option>`

            })
        })




}

listar()



function getCities(event) {

    const valor = event.target.value;

    Uf = valor;

    fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${valor}/municipios`).then(estados => estados.json())
        .then(data => {

        

            cities = document.getElementById('select_city');

            cities.innerHTML = data.map(city => {


                return `<option name='' id=''>${city.nome}</option>`

            })
        })
}

function setUf(event) {
    City = event.target.value;

}

function cadastrar() {

    const nome = document.getElementById("txt_nome").value
    const email = document.getElementById("txt_email").value
    const senha = document.getElementById("txt_senha").value

    if (nome == '' || email == '' || senha == '' || Uf == undefined || City == undefined) {
        
  Swal.fire({
  
    icon: 'warning',
    title: 'Preecha todos os campos',
    showConfirmButton: false,
    timer: 1500,

  })
    } else {

        const user = {
            id:0,
            name: nome,
            email: email,
            senha:senha,
            uf:Uf,
            city:City  ,
            lastSeen: null

        }
        const Users = JSON.parse(window.localStorage.getItem("users"))
         
        if(Users == null){
         
            const usersArray = [user]
            localStorage.setItem('users',JSON.stringify(usersArray));

            Swal.fire({
  
                icon: 'success',
                title: 'Cadastrado com sucesso',
                showConfirmButton: false,
                timer: 3000,
      
              }).then(result=>{
                window.location.href= 'login.html'
              })

            
        }else{
            user.id = Users.length;
            Users.push(user)
            localStorage.setItem('users',JSON.stringify(Users));
            Swal.fire({
  
                icon: 'success',
                title: 'Cadastrado com sucesso',
                showConfirmButton: false,
                timer: 1500,
      
              }).then(result=>{
                window.location.href= 'login.html'
              })

        }

        
    }


}

//let idlocal = JSON.parse(window.localStorage.getItem("idlocal"));
// localStorage.setItem('categorias',JSON.stringify(CategoriaMae));



