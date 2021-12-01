// MODAL POPUP - Início
function openLoginForm() {
    document.body.classList.add("showLoginForm")
}
function openLoginForm2() {
    document.body.classList.add("showLoginForm2")
}
function openLoginForm3(id, idUser) {

    var urlAtiv = `http://localhost:5432/getAtividade/${idUser}`;
    // REQUISICAO ATIV
    var foo = { id: id };
    $.ajax({
        dataType: "text",
        url: urlAtiv,
        type: "GET",
        data: foo,
        header: { "Content-Type": "application/text" },
    }).done(function (data) {
        var Atividades = JSON.parse(data);
        document.body.classList.add("showLoginForm3")
        const secretInput = document.getElementById("chave_edit")
        document.getElementById("txt_nome_ativ2").value = Atividades.nome
        document.getElementById("txt_descricao_ativ2").value = Atividades.descricao
        document.getElementById("txt_horario_ativ2").value = Atividades.horario
        secretInput.innerHTML = `<input type="text" id="txt_secret" name="${id}"/>`

    })



}
function openLoginForm4() {
    document.body.classList.add("showLoginForm4")
}
function closeLoginForm() {
    document.body.classList.remove("showLoginForm")
    document.body.classList.remove("showLoginForm2")
    document.body.classList.remove("showLoginForm3")
    document.body.classList.remove("showLoginForm4")
}
// MODAL POPUP - Fim