let id = location.href.split("#")[1];

function redirect() {
    //window.location.replace("http://127.0.0.1:5500/Codigo/procx.maven/src/main/resources/layout/perfil.html#" + id);
    window.location.replace("https://theeeccoo.github.io/ProCXti2/Codigo/procx.maven/src/main/resources/layout/perfil.html#" + id);

}

function save_user(name, senha, email) {

    if (name == '' || senha == '' || email == '') {
        Swal.fire({

            icon: 'warning',
            title: `Preencha todos os campos corretamente`,
            showConfirmButton: false,
            timer: 1500,

        })
    } else if (name.includes("'") || name.includes("|") || name.includes("&") || name.includes("*") || name.includes('"') || name.includes("=") || email.includes("'") || email.includes("|") || email.includes("&") || email.includes("*") || email.includes('"') || email.includes("=") || senha.includes("'") || senha.includes("|") || senha.includes("&") || senha.includes("*") || senha.includes('"') || senha.includes("=")) {
        Swal.fire({
            icon: 'warning',
            title: 'Nem começa fião',
            showConfirmButton: false,
            timer: 1500,
        })
    } else {

        var dados = { id: id, email: email, nome: name, senha: senha };
        url = `http://localhost:5432/usuario/${id}`;
        $.ajax({
            dataType: "text",
            url: url,
            type: "POST",
            data: dados,
            header: { "Content-Type": "application/text" },
        }).done(function () {

            Swal.fire({

                icon: 'success',
                title: `Dados alterados com sucesso`,
                showConfirmButton: false,
                timer: 1500,

            })

        }).fail(function (error) {
            console.error(error);
        })
    }
}


function ListarUsuario() {
    var dados = { id: id };
    url = `http://localhost:5432/user/${id}`;
    $.ajax({
        dataType: "text",
        url: url,
        type: "GET",
        data: dados,
        header: { "Content-Type": "application/text" },
    }).done(function (data) {
        var userData;

        userData = JSON.parse(data);

        document.getElementById('txt_nome').value = userData.nome
        document.getElementById('txt_email').value = userData.email
        document.getElementById('txt_senha').value = userData.senha
        //document.getElementById('txt_uf').value = User.uf
        //document.getElementById('txt_city').value = User.city

    }).fail(function (error) {
        console.error(error);
    })
}

document.getElementById('alterar').addEventListener("click", function () {
    save_user(
        document.getElementById('txt_nome').value,
        document.getElementById('txt_senha').value,
        document.getElementById('txt_email').value
    );
});


ListarUsuario()
