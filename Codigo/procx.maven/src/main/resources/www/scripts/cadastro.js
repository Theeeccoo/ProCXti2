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

    var nameValidator = /^[a-záàâãéèêíïóôõöüúçñ' ]{5,}$/i;
    const nome = document.getElementById("txt_nome").value;
    const email = document.getElementById("txt_email").value;
    const senha = document.getElementById("txt_senha").value;
    if (nome == '' || (!nameValidator.test(nome)) || (email == '' || ((email.includes("@") == false) || (email.includes(".com") == false))) || senha == '' || Uf == undefined || City == undefined) {

        Swal.fire({

            icon: 'warning',
            title: 'Preecha todos os campos corretamente',
            showConfirmButton: false,
            timer: 1500,

        })

    } else {
        Swal.fire({

            icon: 'success',
            title: 'Cadastrado com sucesso',
            showConfirmButton: false,
            timer: 3000,
        }).then(function () {

            var data = { nome: nome, email: email, senha: senha };
            $.ajax({
                dataType: "text",
                url: 'http://localhost:5432/usuario',
                type: "POST",
                data: data,
                header: { "Content-Type": "application/text"},
            }).done(function () {

                window.location.replace("http://127.0.0.1:5500/Codigo/procx.maven/src/main/resources/layout/login.html");

            }).fail(function (error) {
                console.log(error);
            })


        })

    }
}


//let idlocal = JSON.parse(window.localStorage.getItem("idlocal"));
// localStorage.setItem('categorias',JSON.stringify(CategoriaMae));



