// MODAL POPUP - Início
function openLoginForm(){
    document.body.classList.add("showLoginForm")
}
function openLoginForm2(){
    document.body.classList.add("showLoginForm2")
}
function openLoginForm3(id){
   
    const sessionId = JSON.parse(window.localStorage.getItem(`SessionID`))
    const Atividades = JSON.parse(window.localStorage.getItem(`atividades${sessionId}`))

const index = Atividades.findIndex(ativ => ativ.id == id)

    document.body.classList.add("showLoginForm3")
    const secretInput = document.getElementById("chave_edit")
    document.getElementById("txt_nome_ativ2").value = Atividades[index].nome 
    document.getElementById("txt_descricao_ativ2").value = Atividades[index].descricao
    document.getElementById("txt_horario_ativ2").value = Atividades[index].horario


    secretInput.innerHTML =  `<input type="text" id="txt_secret" name="${id}"/>`

}
function openLoginForm4(){
    document.body.classList.add("showLoginForm4")
}
function closeLoginForm(){
    document.body.classList.remove("showLoginForm") 
    document.body.classList.remove("showLoginForm2") 
    document.body.classList.remove("showLoginForm3")
    document.body.classList.remove("showLoginForm4")
}
// MODAL POPUP - Fim