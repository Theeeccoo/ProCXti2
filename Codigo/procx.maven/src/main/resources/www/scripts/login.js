localStorage.setItem('SessionID',JSON.stringify(null));

function login(){

    const email = document.getElementById("txt_login_email").value;
    const senha = document.getElementById("txt_login_senha").value;

    if(email == '' || senha == ''){
        Swal.fire({
            icon: 'warning',
            title: 'Preecha todos os campos',
            showConfirmButton: false,
            timer: 1500,
        })
    } else if (email.includes("'") || email.includes("|") || email.includes("&") || email.includes("*") || email.includes('"') || email.includes("=") || senha.includes("'") || senha.includes("|") || senha.includes("&") || senha.includes("*") || senha.includes('"') || senha.includes("=")){
        Swal.fire({
            icon: 'warning',
            title: 'Nem começa fião',
            showConfirmButton: false,
            timer: 1500,
        })
    }else{
        var dados = {senha: senha};
        url = 'http://localhost:5432/usuario/' + email;

        $.ajax({

            dataType: "text",
            url: url,
            type: "GET",
            data: dados,
            header: { "Content-Type": "application/text" },


        }).done(function(data){
            var userData;
            userData = JSON.parse(data);
            

            if(userData.senha == null){
                Swal.fire({
                    icon: 'error',
                    title: 'Email ou senha errados',
                    showConfirmButton: false,
                    timer: 1500,
                })
                console.clear();
            }else{
                Swal.fire({

                    icon: 'success',
                    title: 'Credenciais corretas',
                    showConfirmButton: false,
                    timer: 1500,
                }).then(function () {
                    localStorage.setItem('SessionID',JSON.stringify(userData.id));


                    urlUpdate = `http://localhost:5432/usuarioLogin/${userData.id}`;

                    $.ajax({

                        dataType: "text",
                        url: urlUpdate,
                        type: "POST",
                        data: null,
                        header: { "Content-Type": "application/text" },

                    }).done(function(){
                        //window.location.replace("http://127.0.0.1:5500/Codigo/procx.maven/src/main/resources/layout/perfil.html#" + userData.id);
                        window.location.replace("https://theeeccoo.github.io/ProCXti2/Codigo/procx.maven/src/main/resources/layout/perfil.html#" + userData.id);


                    }).fail(function (error){
                        console.error(error);
                    })
                })
            }

        }).fail(function () {
            Swal.fire({
                icon: 'error',
                title: 'Email ou senha errados',
                showConfirmButton: false,
                timer: 2000,
            })
            console.clear();
        })

    }
}