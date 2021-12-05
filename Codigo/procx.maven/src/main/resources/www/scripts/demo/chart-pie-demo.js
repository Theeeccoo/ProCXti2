// Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = 'Nunito', '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#858796';

// Pie Chart Example

function RendmentoGeral() {

    const SessionID = JSON.parse(window.localStorage.getItem("SessionID"));
    //ativsFeitas = JSON.parse(window.localStorage.getItem(`atividadesRealizadas${SessionID}`));
    //ativs = JSON.parse(window.localStorage.getItem(`atividades${SessionID}`));
    var urlAtiv = `http://localhost:5432/AllAtividades/${SessionID}`;

    // REQUISICAO ATIV
    $.ajax({
        dataType: "text",
        url: urlAtiv,
        type: "GET",
        data: null,
        header: { "Content-Type": "application/text" },
    }).done(function (data) {
        let ativs = JSON.parse(data);
        var ativsFeitas = ativs.filter(function (ele) {

            return ele.estado_Atividade == true;

        })
        let cont1 = 0
        let cont2 = 0
        if (ativsFeitas == null) {
            let txt = document.getElementById('aviso')
            if (ativs != null) {
                ativs.map(atv => {
                    if (atv.estado_Atividade == true) { cont1++ } else { cont2++ }
                })
                txt.innerHTML = ''
            } else {

                txt.innerHTML = "<h3>Você não tem atividades cadastradas ainda...</h3>"
            }
        } else {


            for(i = 0; i < ativs.length; i++){
                if(ativs[i].estado_Atividade){
                    cont1++;
                }else{
                    cont2++;
                }
            }
        }

        var ctx = document.getElementById("myPieChart");
        var myPieChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Feitas', 'Não feitas'],
                datasets: [{
                    data: [cont1, cont2],
                    backgroundColor: ['#4e73df', '#1cc88a'],
                    hoverBackgroundColor: ['#2e59d9', '#17a673'],
                    hoverBorderColor: "rgba(234, 236, 244, 1)",
                }],
            },
            options: {
                maintainAspectRatio: false,
                tooltips: {
                    backgroundColor: "rgb(255,255,255)",
                    bodyFontColor: "#858796",
                    borderColor: '#dddfeb',
                    borderWidth: 1,
                    xPadding: 15,
                    yPadding: 15,
                    displayColors: false,
                    caretPadding: 10,
                },
                legend: {
                    display: false
                },
                cutoutPercentage: 80,
            },
        });
    }).fail(function(error){
        console.error(error);
    })
}
RendmentoGeral()