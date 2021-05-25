// MODAL POPUP - Início
function openLoginForm(){
    document.body.classList.add("showLoginForm")
}
function closeLoginForm(){
    document.body.classList.remove("showLoginForm") 
    document.body.classList.remove("showLoginForm2") 
    document.body.classList.remove("showLoginForm3")
}
function openLoginForm2(){
    document.body.classList.add("showLoginForm2")
}
function openLoginForm3(id){
    document.body.classList.add("showLoginForm3")
    const secretInput = document.getElementById("chave_edit")

    secretInput.innerHTML = ` <input type="time" id="txt_secret" name="${id}"/>`
}
// MODAL POPUP - Fim