let User
let Users

var userData = {};
var userAtiv = {};

let id = location.href.split("#")[1];
const SessionID = JSON.parse(window.localStorage.getItem("SessionID"));

function redirect() {
    window.location.replace("http://127.0.0.1:5500/Codigo/procx.maven/src/main/resources/layout/alterar.html#" + id);
}





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
        url = `http://localhost:5432/user/${id}`
        $.ajax({
            dataType: "text",
            url: url,
            type: "GET",
            data: null,
            header: { "Content-Type": "application/text" },
        }).done(function (data) {
            userData = JSON.parse(data);
            ListarUsuario()
        })
    }
}

ValidarSession();

function getMonthDays(m) {

    if (m == 3 || m == 5 || m == 8 || m == 10) {
        return 30
    } else if (m == 0 || m == 2 || m == 4 || m == 6 || m == 7 || m == 9 || m == 11) {
        return 31
    } else if (m == 1) {
        return 28
    }


}


// function verificarDiasData() {

//     //Users = JSON.parse(window.localStorage.getItem("users"));
//     //UsuarioAtual = Users[SessionID]
//     //ativsFeitas = JSON.parse(window.localStorage.getItem(`atividadesRealizadas${SessionID}`));

//     var ativsFeitas = {};
//     var urlAtiv = `http://localhost:5432/atividades/${id}`;

//     // REQUISICAO ATIV
//     $.ajax({
//         dataType: "text",
//         url: urlAtiv,
//         type: "GET",
//         data: null,
//         header: { "Content-Type": "application/text" },
//     }).done(function (data) {

//         let ativs = JSON.parse(data);
//         ativsFeitas = ativs.filter(function (ele) {
//             return ele.estado_Atividade == true;
//         })

//         // REQUISICAO USER
//         url = `http://localhost:5432/user/${id}`
//         $.ajax({
//             dataType: "text",
//             url: url,
//             type: "GET",
//             data: null,
//             header: { "Content-Type": "application/text" },
//         }).done(function (data) {

//             userData = JSON.parse(data);
//             console.log(userData);

//             if (ativs == null || ativs == [] || ativsFeitas == null) {
//                 return
//             } else {

//                 var data = new Date();
//                 const dia = data.getDate()
//                 const mes = data.getMonth() + 1
//                 const ano = data.getFullYear()
//                 dataAtual = `${ano}/${mes}/${dia}`
//                 let cont = 0

//                 arrayLastSeen = (userData.dataLogin).replaceAll('/Date(', '').replaceAll(')/', '').split(" ")[0].replaceAll("-", "/").split("/");
//                 console.log(arrayLastSeen);
//                 const diaEsperado = Number(arrayLastSeen[2]) + 1
//                 const dataEsperada = `${arrayLastSeen[0]}/${arrayLastSeen[1]}/${diaEsperado}`
//                 console.log(dataEsperada)

//                 newAtivsFeitas = [...ativsFeitas]

//                 if (userData.dataLogin != dataAtual && dataAtual != dataEsperada) {
//                     const newObjj = ativsFeitas[ativsFeitas.length - 1]
//                     newObjj.ArrayAtividadesFeitas.map(atv => { atv.estado_Atividade = false })
//                     if (Number(arrayLastSeen[2]) == ano && Number(arrayLastSeen[1]) != mes) {

//                         if (mes - Number(arrayLastSeen[1]) == 1) {


//                             cont += 30 - Number(arrayLastSeen[0]) + dia


//                             for (let i = Number(arrayLastSeen[0]) + 1; i <= getMonthDays(arrayLastSeen[1]); i++) {


//                                 newAtivsFeitas.push({
//                                     ...newObjj, data: `${i}/${arrayLastSeen[1]}/${arrayLastSeen[2]}`
//                                 })

//                             }
//                             for (let i = 1; i < dia; i++) {
//                                 newAtivsFeitas.push({
//                                     ...newObjj, data: `${i}/${mes}/${ano}`
//                                 })
//                             }

//                             console.log(newAtivsFeitas, '1')
//                             localStorage.setItem(`atividadesRealizadas${SessionID}`, JSON.stringify(newAtivsFeitas));
//                         } else {

//                             let mesesFaltando = []
//                             for (let i = Number(arrayLastSeen[1]); i < mes; i++) {
//                                 mesesFaltando.push(i)
//                             }

//                             mesesFaltando.map(mess => {
//                                 if (mess == mesesFaltando[0]) {

//                                     for (let i = Number(arrayLastSeen[0]) + 1; i <= getMonthDays(mesesFaltando[0]); i++) {
//                                         newAtivsFeitas.push({
//                                             ...newObjj, data: `${i}/${mess}/${arrayLastSeen[2]}`
//                                         })
//                                     }




//                                 } else {
//                                     for (let i = 1; i <= getMonthDays(mess); i++) {
//                                         newAtivsFeitas.push({
//                                             ...newObjj, data: `${i}/${mess}/${arrayLastSeen[2]}`
//                                         })
//                                     }


//                                 }

//                             })

//                             for (let i = 1; i < dia; i++) {
//                                 newAtivsFeitas.push({
//                                     ...newObjj, data: `${i}/${mes}/${arrayLastSeen[2]}`
//                                 })

//                             }
//                             localStorage.setItem(`atividadesRealizadas${SessionID}`, JSON.stringify(newAtivsFeitas));
//                             console.log(newAtivsFeitas, '2')
//                         }
//                     } else if (Number(arrayLastSeen[2]) == ano && Number(arrayLastSeen[1]) == mes) {
//                         for (let i = Number(arrayLastSeen[0]) + 1; i < dia; i++) {
//                             newAtivsFeitas.push({
//                                 ...newObjj, data: `${i}/${mes}/${arrayLastSeen[2]}`
//                             })

//                         }
//                         localStorage.setItem(`atividadesRealizadas${SessionID}`, JSON.stringify(newAtivsFeitas));
//                         console.log(newAtivsFeitas, '3')
//                     }

//                 }

//             }

//         })
//         console.log(ativsFeitas);


//     })

// }
//verificarDiasData()

// function verificarData() {
//     Users = JSON.parse(window.localStorage.getItem("users"));
//     UsuarioAtual = Users[SessionID]


//     var data = new Date();
//     const dia = data.getDate()
//     const mes = data.getMonth()
//     const ano = data.getFullYear()
//     dataAtual = `${dia}/${mes}/${ano}`

//     if (UsuarioAtual.lastSeen != dataAtual) {
//         ativs = JSON.parse(window.localStorage.getItem(`atividades${SessionID}`));

//         if (ativs != null) {


//             let ArrayAtividadesFeitas = []

//             //Esse map povoa um novo array com as informações das atividades feitas na ultima data de 
//             //atividade diferente da do dia atual e reseta o array de atividades do local storage sendo a
//             //propriedade "checked" delas sendo false
//             const newAtivs = ativs.map(ativ => {


//                 ArrayAtividadesFeitas = [...ArrayAtividadesFeitas, { nome: ativ.nome, realizada: ativ.checked }]

//                 return { ...ativ, checked: false }
//             }

//             )
//             localStorage.setItem(`atividades${SessionID}`, JSON.stringify(newAtivs));

//             atividadesFeitas = JSON.parse(window.localStorage.getItem(`atividadesRealizadas${SessionID}`));

//             objAtividadesFeitas = { data: UsuarioAtual.lastSeen, ArrayAtividadesFeitas }

//             if (atividadesFeitas == null) {
//                 localStorage.setItem(`atividadesRealizadas${SessionID}`, JSON.stringify([objAtividadesFeitas]));
//             } else {
//                 atividadesFeitas.push(objAtividadesFeitas)
//                 localStorage.setItem(`atividadesRealizadas${SessionID}`, JSON.stringify(atividadesFeitas));
//             }

//         }
//     }
// }

// verificarData()

function ListarUsuario() {

    const titulo = document.getElementById('titulo_entrada')

    titulo.innerHTML = `Suas atividades, ${userData.nome.split(" ")[0]}`;


}

function ListarAtividades() {
    var urlAtiv = `http://localhost:5432/AllAtividades/${id}`;

    // REQUISICAO ATIV
    $.ajax({
        dataType: "text",
        url: urlAtiv,
        type: "GET",
        data: null,
        header: { "Content-Type": "application/text" },
    }).done(function (data) {
        let ativs = JSON.parse(data);
        var Atividades = ativs.filter(function (ele) {

            return ele.estado_Atividade == false;

        })
        const titulo = document.getElementById('titulo_atividades')
        const block_ativ = document.getElementById('Atividades')

        if (Atividades == null || Atividades == []) {
            titulo.innerHTML = `Você ainda não tem atividades...`

        } else {
            // ~ Odenação das atividades utilizando um "Bubble Sorter" ~ \\
            if (Atividades.length > 1) { // ~ Só será necessário fazer a ordenação caso existam mais de 1 atividade
                for (let i = 0; i < Atividades.length; i++) {
                    // Atribuição via desestruturação                 ~ Separando o objeto horário em dois apartir do ":"
                    let [arrayHorarioPosterior, arrayMinutoPosterior] = Atividades[i].horario.split(":");
                    for (let j = 0; j < Atividades.length; j++) {
                        // Atribuição via desestruturação               ~ Separando o objeto horário em dois apartir do ":"
                        let [arrayHorarioAnterior, arrayMinutoAnterior] = Atividades[j].horario.split(":");
                        // ~ Verificações necessárias para fazer a ordenação de acordo com o horário ~ \\
                        // Caso a HORA do primeiro seja maior do que a HORA do segundo, "troque o índice" dos dois 
                        if (arrayHorarioAnterior > arrayHorarioPosterior) {
                            aux = Atividades[j]
                            Atividades[j] = Atividades[i]
                            Atividades[i] = aux;
                        }

                        // Caso a HORA do primeiro seja igual a HORA do segundo, verifique os MINUTOS
                        if (arrayHorarioAnterior == arrayHorarioPosterior) {
                            if (arrayMinutoAnterior > arrayMinutoPosterior) {
                                aux = Atividades[j]
                                Atividades[j] = Atividades[i]
                                Atividades[i] = aux;
                            }
                        }
                    }// Fim do FOR interno (J == Atividades.length)
                }// Fim do FOR externo ( I == Atividades.length)
            }
            titulo.innerHTML = ''
            let obj = ''
            Atividades.map(ativ => {

                obj += `
        <div class='col-12 col-md-4 box-atividades' >
        <h5>${ativ.nome}</h5>
        
            <button class='edit-atividade' onclick="openLoginForm3(${ativ.id}, ${id})"><i class="far fa-edit"></i></button>
            <button class='delete-atividade' onclick="deletarAtividade(${ativ.id}, ${ativ.idUSUARIO})" ><i class='fas fa-times'></i></button>
                <div class='col-12 col-lg-8'>
                  <p class='descricao'>
                  ${ativ.descricao}
                  </p>
                </div>
                <h6>Horário:</h6>
                <p class='horario'>${ativ.horario}</p>
                <input type='checkbox' ${ativ.checked ? 'checked' : ''} onchange="isChecked(${ativ.id}, ${ativ.idUSUARIO})" name='' id='${ativ.id}' class='check' />
                </div> ` }

            )

            block_ativ.innerHTML = obj



            mostrarRecompensa();
        }
    }).fail(function () {
        const titulo = document.getElementById('titulo_atividades')
        titulo.innerHTML = `Você ainda não tem atividades...`
    })
}
ListarAtividades()

function deletarAtividade(idAtiv, idUSUARIO) {
    var urlAtiv = `http://localhost:5432/getAtividade/${idUSUARIO}`;

    // REQUISICAO ATIV
    var foo = { id: idAtiv };
    $.ajax({
        dataType: "text",
        url: urlAtiv,
        type: "GET",
        data: foo,
        header: { "Content-Type": "application/text" },
    }).done(function (data) {
        var atividade = JSON.parse(data);
        console.log(atividade.id);
        console.log(atividade);
        var dados = { id: atividade.id };
        urlUpdate = `http://localhost:5432/deleteAtividade/${atividade.idUsuario}`;
        $.ajax({
            dataType: "text",
            url: urlUpdate,
            type: "POST",
            data: dados,
            header: { "Content-Type": "application/text" },

        }).done(function () {

            sucesso('Deletada')
            mostrarRecompensa();
            setTimeout(() => {
                window.location.reload(true);
            }, 1500)

        }).fail(function (error) {
            console.error(error);
        })
    })

}

function editarAtividade() {
    const nome = document.getElementById("txt_nome_ativ2").value
    const descricao = document.getElementById("txt_descricao_ativ2").value
    const horario = document.getElementById("txt_horario_ativ2").value
    const idAtiv = document.getElementById("txt_secret").name


    if (nome == "" || descricao == "" || horario == "") {
        Swal.fire({

            icon: 'warning',
            title: 'Preecha todos os campos',
            showConfirmButton: false,
            timer: 1500,

        })
    }
    else {
        var urlAtiv = `http://localhost:5432/getAtividade/${id}`;

        // REQUISICAO ATIV
        var foo = { id: idAtiv };
        $.ajax({
            dataType: "text",
            url: urlAtiv,
            type: "GET",
            data: foo,
            header: { "Content-Type": "application/text" },
        }).done(function (data) {
            var atividade = JSON.parse(data);
            var dados = { descricao: descricao, Estado_Atividade: atividade.Estado_Atividade, horario: horario, idUsuario: atividade.idUsuario, id: atividade.id, nome: nome };
            urlUpdate = `http://localhost:5432/atividadeUpdate/${atividade.idUsuario}`;
            $.ajax({
                dataType: "text",
                url: urlUpdate,
                type: "POST",
                data: dados,
                header: { "Content-Type": "application/text" },

            }).done(function () {
                document.body.classList.remove("showLoginForm3")
                sucesso("alterada")
                mostrarRecompensa();

            }).fail(function (error) {
                console.error(error);
            })
        })
    }
}
function sucesso(nome) {
    Swal.fire({

        icon: 'success',
        title: `Atividade ${nome} com sucesso`,
        showConfirmButton: false,
        timer: 1500,

    })

    document.body.classList.remove("showLoginForm")
    document.body.classList.remove("showLoginForm2")
    ListarAtividades()
}

function isChecked(idAtiv, idUSUARIO) {
    var urlAtiv = `http://localhost:5432/getAtividade/${idUSUARIO}`;

    // REQUISICAO ATIV
    var foo = { id: idAtiv };
    $.ajax({
        dataType: "text",
        url: urlAtiv,
        type: "GET",
        data: foo,
        header: { "Content-Type": "application/text" },
    }).done(function (data) {
        var atividade = JSON.parse(data);
        atividade.Estado_Atividade = !atividade.Estado_Atividade;
        var dados = { descricao: atividade.descricao, Estado_Atividade: atividade.Estado_Atividade, horario: atividade.horario, idUsuario: atividade.idUsuario, id: atividade.id, nome: atividade.nome };
        urlUpdate = `http://localhost:5432/atividadeUpdate/${atividade.idUsuario}`;
        $.ajax({
            dataType: "text",
            url: urlUpdate,
            type: "POST",
            data: dados,
            header: { "Content-Type": "application/text" },

        }).done(function () {
            mostrarRecompensa();

        }).fail(function (error) {
            console.error(error);
        })
    })
}

function criarAtividades() {
    // RefreshUsers = JSON.parse(window.localStorage.getItem("users"));
    // const count = RefreshUsers[SessionID].ActivitiesAlreadyCreated


    const nome = document.getElementById("txt_nome_ativ").value
    const horario = document.getElementById("txt_horario_ativ").value
    const descricao = document.getElementById("txt_descricao_ativ").value

    if (horario == '' || nome == '' || descricao == '') {

        Swal.fire({

            icon: 'warning',
            title: 'Preecha todos os campos',
            showConfirmButton: false,
            timer: 1500,

        })


    }
    else {
        var urlAtiv = `http://localhost:5432/createAtividade/${id}`;

        // REQUISICAO ATIV
        var dados = { descricao: descricao, horario: horario, nome: nome };
        $.ajax({
            dataType: "text",
            url: urlAtiv,
            type: "POST",
            data: dados,
            header: { "Content-Type": "application/text" },
        }).done(function (data) {
            console.log(data);
            sucesso('criada');
        })
    }

}
function logoff() {
    localStorage.setItem(`SessionID`, null);
}

// Função que adicionará o "Card" de recompensa à tela
function criarRecompensa() {
    let recompensa = document.getElementById('txt_nome_recomp').value; // Variável que receberá o valor digitado pelo usuário
    console.log(recompensa);
    const recompensaArea = document.getElementById('box-recompensa'); // Variável responsável pela div 
    if (recompensa == '') { // Caso input vazio, "SWAL" de: preencha os campos
        Swal.fire({

            icon: 'warning',
            title: 'Preecha todos os campos',
            showConfirmButton: false,
            timer: 1500,

        })
    } else { // Do contrário, preencha com o valor dado pelo usuário
        console.log(id);
        var ulrRecomp = `http://localhost:5432/createRecompensa/${id}`;

        // REQUISICAO ATIV
        var dados = { recompensa: recompensa };
        $.ajax({
            dataType: "text",
            url: ulrRecomp,
            type: "POST",
            data: dados,
            header: { "Content-Type": "application/text" },
        }).done(function (data) {
            let texto = `
            <div class="box-recompensa" id="caixa">
            <h1>${recompensa}</h1>
            <input type="checkbox" class="check" id="checagem" onclick="checkRecompensa()"/>
            </div>  
            `;
            recompensaArea.innerHTML = texto;
            document.getElementById('checagem').disabled = true;
            sucessoRecomp();

        }).fail(function(error){
            console.log(error);
        })
    }
    document.getElementById('txt_nome_recomp').value = ''; // Zerando o valor no input
    mostrarRecompensa();
}

// Função que 
function mostrarRecompensa() {
    let cont = 0;
    const recompensaArea = document.getElementById('caixa');
    //let Atividades = JSON.parse(window.localStorage.getItem(`atividades${SessionID}`));
    var urlAtiv = `http://localhost:5432/AllAtividades/${id}`;

    // REQUISICAO ATIV
    $.ajax({
        dataType: "text",
        url: urlAtiv,
        type: "GET",
        data: null,
        header: { "Content-Type": "application/text" },
    }).done(function (data) {
        let ativs = JSON.parse(data);
        var Atividades = ativs.filter(function (ele) {

            return ele.estado_Atividade == false;

        })
        Atividades.map(ativ => {
            if (ativ.checked) {
                cont++;
            }
        });
        if (cont == Atividades.length) {
            if (recompensaArea != null) {
                recompensaArea.style.opacity = "1";
                document.getElementById('checagem').disabled = false;
                console.log("AAAB");
            }
        } else {
            if (recompensaArea != null) {
                recompensaArea.style.opacity = ".55";
                document.getElementById('checagem').disabled = true;
            }
        }
    })
}
// // Função que tira da tela o "Card" quando o mesmo é "checado" (Clicar no botão check)
function checkRecompensa(){
    const recompensaArea = document.getElementById('box-recompensa');
    recompensaArea.innerHTML = ''; // Esvaziando o espaço da tela
}

// // Função do "SWAL" que mostrará que a recompensa foi registrada com sucesso.
function sucessoRecomp() {
    Swal.fire({

        icon: 'success',
        title: `Recompensa registrada com sucesso`,
        showConfirmButton: false,
        timer: 1500,

    })
    closeLoginForm();
}
// Métodos que mostrarão a mensagem a frente dos inputs dos modais de atividade
$(document).ready(function () {
    $('#btn-duvida').click(function () {
        $('#span1').toggleClass('frente');
        $('#span2').toggleClass('frente');
        $('#span3').toggleClass('frente');
    })
    $('#btn-duvida2').click(function () {
        $('#span4').toggleClass('frente');
        $('#span5').toggleClass('frente');
        $('#span6').toggleClass('frente');
    })
})
