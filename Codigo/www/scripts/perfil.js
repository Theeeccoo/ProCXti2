let User
let Users
const SessionID = JSON.parse(window.localStorage.getItem("SessionID"));



function ValidarSession() {


    if (SessionID == null) {
        Swal.fire({

            icon: 'error',
            title: 'Faça o login!',
            showConfirmButton: false,
            timer: 1500,

        }).then(result => {
            window.location.href = 'login.html'
        })

    } else {
        Users = JSON.parse(window.localStorage.getItem("users"));
        User = Users[SessionID]
    }
}

ValidarSession()

function verificarData()
{
    Users = JSON.parse(window.localStorage.getItem("users"));
    UsuarioAtual = Users[SessionID]


    var data = new Date();
    const dia = data.getDate()
        const mes = data.getMonth()
        const ano = data.getFullYear()
        dataAtual = `${dia}/${mes}/${ano}`

        if(UsuarioAtual.lastSeen != 'dataAtual'){
            ativs = JSON.parse(window.localStorage.getItem(`atividades${SessionID}`));
            
            if(ativs != null){
             
            
             let  ArrayAtividadesFeitas = []
               
             //Esse map povoa um novo array com as informações das atividades feitas na ultima data de 
             //atividade diferente da do dia atual e reseta o array de atividades do local storage sendo a
             //propriedade "checked" delas sendo false
               const newAtivs = ativs.map(ativ=>{
                

               ArrayAtividadesFeitas = [...ArrayAtividadesFeitas,{nome:ativ.nome,realizada:ativ.checked}]                  
 
                  return {...ativ,checked:false}
               }
              
               )
               localStorage.setItem(`atividades${SessionID}`,JSON.stringify(newAtivs));

               atividadesFeitas = JSON.parse(window.localStorage.getItem(`atividadesRealizadas${SessionID}`));

               objAtividadesFeitas = {data:UsuarioAtual.lastSeen, ArrayAtividadesFeitas}

               if(atividadesFeitas == null){
                localStorage.setItem(`atividadesRealizadas${SessionID}`,JSON.stringify([objAtividadesFeitas]));
               }else{
                   atividadesFeitas.push(objAtividadesFeitas)
                   localStorage.setItem(`atividadesRealizadas${SessionID}`,JSON.stringify(atividadesFeitas));
               }
               
            }
        }
}

verificarData()

function ListarUsuario() {

    const titulo = document.getElementById('titulo_entrada')


    titulo.innerHTML = `Suas atividades, ${User.name}`


}
ListarUsuario()

function ListarAtividades(){

    const Atividades = JSON.parse(window.localStorage.getItem(`atividades${SessionID}`))

    const titulo = document.getElementById('titulo_atividades')
    const block_ativ = document.getElementById('Atividades')

    
    

    if(Atividades == null || Atividades == []){
        titulo.innerHTML = `Você ainda não tem atividades...`
        
    }else{
        titulo.innerHTML =''
        let obj =''
 Atividades.map(ativ=>{
     
    obj += `
<div class='col-12 col-md-4 box-atividades' >
<h5>${ativ.nome}</h5>

        <button class='delete-atividade' onclick="deletarAtividade(${ativ.id})" ><i class='fas fa-times'></i></button>
        <button class='delete-atividade' onclick="openLoginForm3(${ativ.id})"><i class="far fa-edit"></i></button>
        <div class='col-12 col-lg-8'>
          <p class='descricao'>
          ${ativ.descricao}
          </p>
        </div>
        <h6>Horário:</h6>
        <p class='horario'>${ativ.horario}</p>
        <input type='checkbox' onchange="isChecked(${ativ.id})" name='' id='' class='check' />
        </div> `  }
    

        )
        
        block_ativ.innerHTML = obj


        
    }
}
ListarAtividades()


function sucesso(){
    Swal.fire({
  
        icon: 'success',
        title: 'Atividade registrada com sucesso',
        showConfirmButton: false,
        timer: 1500,

      })

    document.body.classList.remove("showLoginForm") 
    document.body.classList.remove("showLoginForm2") 
    ListarAtividades()
}


function criarAtividades() {

    const nome = document.getElementById("txt_nome_ativ").value
    const horario = document.getElementById("txt_horario_ativ").value
    const descricao = document.getElementById("txt_descricao_ativ").value
   

    if (nome != '' || horario != '' || descricao != '') {
        
      
        const Atividades = JSON.parse(window.localStorage.getItem(`atividades${SessionID}`))

        if(Atividades == null || Atividades == []){
            const NovaAtividade = {
                id:0,
                nome:nome,
                horario:horario,
                descricao:descricao,
                checked:false
    
            }
            const AtividadesArray = [NovaAtividade]
            localStorage.setItem(`atividades${SessionID}`,JSON.stringify(AtividadesArray));

           sucesso()
        }
        else{
            const NovaAtividade = {
                id:Atividades.length,
                nome:nome,
                horario:horario,
                descricao:descricao,
                checked:false
    
            }

            Atividades.push(NovaAtividade)
            localStorage.setItem(`atividades${SessionID}`,JSON.stringify(Atividades));

          sucesso();
        }

    }else{
        Swal.fire({
  
            icon: 'warning',
            title: 'Preecha todos os campos',
            showConfirmButton: false,
            timer: 1500,
        
          })
    }
}


$(document).ready(function () {
    $('#btn-duvida').click(function () {
        $('#span1').toggleClass('frente');
        $('#span2').toggleClass('frente');
        $('#span3').toggleClass('frente');
    })
})
